import * as uuid from "uuid/v4";
import {
  EventOrdersUpdate,
  EventPositionsUpdate,
  EventTradesUpdate,
  EventWSAuthResult,
  EventWSData
} from "./constants";
import { loadTradeCredentials } from "./credentials";
import { ProtobufBroker, ProtobufStream } from "./modules/proto";
import SessionTracker from "./SessionTracker";
import { TradeOpts } from "./types/client";
import {
  BrokerRequest,
  CancelOrderOpts,
  // ExchangeBalances,
  PlaceOrderOpt,
  PrivateOrder,
  PrivatePosition,
  PrivateTrade
} from "./types/trading";
import { getString } from "./util/helpers";
import logger from "./util/logger";
import proto from "./util/proto";
import WebSocketClient from "./WebSocketClient";

// The number of recent trades kept locally in cache
const tradeCacheLimit = 1000;

// Requests to the trade service time out after 5s
const requestTimeout = 5000;

export class TradeClient extends WebSocketClient {
  // Mapping of market id to private orders
  public orders: {
    [key: string]: PrivateOrder[];
  };

  // Mapping of market ids to private trades
  public trades: {
    [key: string]: PrivateTrade[];
  };

  // Mapping of market ids to private positions
  public positions: {
    [key: string]: PrivatePosition[];
  };

  // List of balances for each exchange with an active session
  // public balances: ExchangeBalances[];

  private session: SessionTracker;

  constructor(opts: TradeOpts) {
    logger.setLevel(opts.logLevel);
    opts = loadTradeCredentials(opts);

    super(opts);

    if (
      !(opts.tradeSubscriptions instanceof Array) ||
      opts.tradeSubscriptions.length === 0
    ) {
      throw new Error("Missing parameter: tradeSubscriptions");
    }

    // Keep track of subscriptions for reconnecting
    opts.tradeSubscriptions.forEach(ts => {
      this.subscriptions[ts.marketID] = proto.tradeSubscriptionToProto(ts);
    });

    this.session = new SessionTracker(opts.tradeSubscriptions);

    this.session.on("ready", () => {
      logger.debug("trading ready");
    });

    this.onDisconnect(() => {
      logger.debug("disconnected: resetting session");
      this.session.reset();
    });

    this.on(EventWSData, (data: Buffer) => {
      try {
        this.brokerMessageHandler(
          ProtobufBroker.BrokerUpdateMessage.decode(data)
        );
      } catch (e) {
        this.error("Failed to deserialize ProtobufBroker message");
      }
    });

    this.orders = {};
    this.trades = {};
    this.positions = {};
    // this.balances = [];
    logger.debug("%o", this);
  }

  public onReady(fn: () => void): void {
    this.session.on("ready", () => {
      fn();
    });
  }

  public onOrdersUpdate(fn: (o: PrivateOrder[]) => void): void {
    this.on(EventOrdersUpdate, orders => fn(orders));
  }

  public onTradesUpdate(fn: (t: PrivateTrade[]) => void): void {
    this.on(EventTradesUpdate, trades => fn(trades));
  }

  public onPositionsUpdate(fn: (p: PrivatePosition[]) => void): void {
    this.on(EventPositionsUpdate, positions => fn(positions));
  }

  public placeOrder(opts: PlaceOrderOpt): Promise<PrivateOrder> {
    logger.debug("place order request %o", opts);

    if (!this.session.isReady()) {
      throw errNotInitialized;
    }

    const startTime = new Date();

    return new Promise((resolve, reject) => {
      const order = proto.placeOrderOptToProto(opts);
      logger.debug("place order request %o", order);

      this.makeRequest(
        opts.marketID,
        ProtobufBroker.PlaceOrderRequest.create({
          order
        })
      )
        .then(response => {
          if (!response.placeOrderResult || !response.placeOrderResult.order) {
            const msg = "Place order failed: bad response";
            logger.debug(msg);
            reject(new Error(msg));
            return;
          }

          const po = proto.privateOrderFromProto(
            response.placeOrderResult.order
          );
          if (!po) {
            logger.debug(
              "Failed to serialize order result %o",
              response.placeOrderResult.order
            );
            // TODO fix
            process.exit(1);
            reject(new Error("Place order failed: bad response"));
            return;
          }

          const endTime = new Date();
          logger.debug(
            "order placed",
            `${endTime.getTime() - startTime.getTime()}s`
          );

          resolve(po);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  public cancelOrder(opts: CancelOrderOpts): Promise<undefined> {
    return new Promise((resolve, reject) => {
      if (typeof opts.orderID !== "string" || opts.orderID === "") {
        throw new Error(`Order ID is invalid: ${opts.orderID}`);
      }
      this.makeRequest(
        opts.marketID,
        ProtobufBroker.CancelOrderRequest.create({
          orderId: opts.orderID
        })
      )
        .then(response => {
          if (
            !response.cancelOrderResult ||
            response.cancelOrderResult.orderId === null
          ) {
            reject(errBadResponse);
            return;
          }
          resolve();
        })
        .catch(e => reject(e));
    });
  }

  private makeRequest(
    marketID: number,
    request: BrokerRequest
  ): Promise<ProtobufBroker.RequestResolutionUpdate> {
    const requestID = uuid();

    let brokerRequest: ProtobufBroker.BrokerRequest;
    if (request instanceof ProtobufBroker.PlaceOrderRequest) {
      brokerRequest = ProtobufBroker.BrokerRequest.create({
        id: requestID,
        marketId: Number(marketID),
        placeOrderRequest: request
      });
    } else {
      brokerRequest = ProtobufBroker.BrokerRequest.create({
        id: requestID,
        marketId: Number(marketID),
        cancelOrderRequest: request
      });
    }

    this.send(ProtobufBroker.BrokerRequest.encode(brokerRequest).finish());

    return new Promise((resolve, reject) => {
      const timeoutTimer = setTimeout(() => {
        reject();
      }, requestTimeout);
      this.once(requestID, response => {
        clearTimeout(timeoutTimer);
        if (response.error !== 0) {
          reject(`Server response: ${response.message}`);
        } else {
          resolve(response);
        }
      });
    });
  }

  private brokerMessageHandler(
    message: ProtobufBroker.BrokerUpdateMessage
  ): void {
    const marketID = getString(message.marketId);

    switch (message.Update) {
      case "authenticationResult":
        this.emit(EventWSAuthResult, message.authenticationResult);
        break;
      case "ordersUpdate":
        if (message.ordersUpdate) {
          this.ordersUpdateHandler(marketID, message.ordersUpdate);
        }
        break;
      case "tradesUpdate":
        if (message.tradesUpdate) {
          this.tradesUpdateHandler(marketID, message.tradesUpdate);
        }
        break;
      case "balancesUpdate":
        logger.debug("balance update %o", JSON.stringify(message));
        // if (message.balancesUpdate) {
        //   this.balancesUpdateHandler(marketID, message.balancesUpdate);
        // }
        break;
      case "positionsUpdate":
        if (message.positionsUpdate) {
          this.positionsUpdateHandler(marketID, message.positionsUpdate);
        }
        break;
      case "subscriptionResult":
        if (message.subscriptionResult) {
          this.subscriptionResultHandler(message.subscriptionResult);
        }
        break;
      case "sessionStatusUpdate":
        if (message.sessionStatusUpdate) {
          this.sessionStatusUpdateHandler(
            marketID,
            message.sessionStatusUpdate
          );
        }
        break;
      case "requestResolutionUpdate":
        if (message.requestResolutionUpdate) {
          this.requestResolutionUpdateHandler(message.requestResolutionUpdate);
        }
        break;

      default:
      // unsupported type; no-op
    }
  }

  private ordersUpdateHandler(
    marketID: string,
    ordersUpdate: ProtobufBroker.IOrdersUpdate
  ) {
    logger.debug("orders update");
    if (!ordersUpdate.orders) {
      return;
    }

    const newOrders: PrivateOrder[] = [];
    ordersUpdate.orders.forEach(o => {
      const order = proto.privateOrderFromProto(o);
      if (order != null) {
        newOrders.push(order);
      }
    });

    this.session.setModuleReady(marketID, "orders");
    this.orders[marketID] = newOrders;
    this.emit(EventOrdersUpdate, newOrders);
  }

  private tradesUpdateHandler(
    marketID: string,
    tradesUpdate: ProtobufBroker.ITradesUpdate
  ) {
    logger.debug("trades update");
    if (!tradesUpdate.trades) {
      return;
    }

    const newTrades: PrivateTrade[] = [];
    tradesUpdate.trades.forEach(tradeProto => {
      const trade = proto.privateTradeFromProto(tradeProto);
      if (trade) {
        newTrades.push(trade);
      }
    });

    if (!this.trades[marketID]) {
      this.trades[marketID] = [];
    }

    // Add new trades to old trades
    this.trades[marketID] = this.trades[marketID].concat(newTrades);

    // Trim cache if it's over the limit
    if (this.trades[marketID].length > tradeCacheLimit) {
      this.trades[marketID] = this.trades[marketID].slice(0, tradeCacheLimit);
    }

    this.session.setModuleReady(marketID, "trades");
    this.emit(EventTradesUpdate, newTrades);
  }

  // private balancesUpdateHandler(
  //   marketID: string,
  //   balancesUpdate: ProtobufBroker.IBalancesUpdate
  // ) {
  //   if (!balancesUpdate.balances) {
  //     return;
  //   }

  //   // Each balance can apply to multiple markets, so we find the balances index first
  //   let balancesIndex = -1;
  //   for (let i = 0; i < this.balances.length; i++) {
  //     for (const j of this.balances[i].marketIDs) {
  //       if (j === marketID) {
  //         balancesIndex = i;
  //         break;
  //       }
  //     }
  //     if (balancesIndex > -1) {
  //       break;
  //     }
  //   }

  //   if (balancesIndex === -1) {
  //     const exchangeBalances: ExchangeBalances = {
  //       marketIDs: [marketID],
  //       spot: [],
  //       margin: []
  //     };
  //   }

  //   balancesUpdate.balances.forEach(balancesProto => {
  //     const balance = proto.balancesFromProto(balancesProto);
  //     if (!balance) {
  //       return;
  //     }
  //   });

  //   this.session.setModuleReady(marketID, "balances");
  //   logger.debug("balances update");

  //   // TODO update balances cache
  //   // TODO emit exchange balances
  //   // this.emit(EventBalancesUpdate, exchangeBalances);
  // }

  private positionsUpdateHandler(
    marketID: string,
    positionsUpdate: ProtobufBroker.IPositionsUpdate
  ) {
    logger.debug("positions update");
    if (!positionsUpdate.positions) {
      return;
    }

    const newPositions: PrivatePosition[] = [];

    positionsUpdate.positions.forEach(positionProto => {
      const position = proto.privatePositionFromProto(positionProto);
      if (!position) {
        return;
      }
      newPositions.push(position);
    });

    this.session.setModuleReady(marketID, "positions");
    this.positions[marketID] = newPositions;
    this.emit(EventPositionsUpdate, newPositions);
  }

  private subscriptionResultHandler(
    subResult: ProtobufStream.ISubscriptionResult
  ): void {
    if (subResult.failed instanceof Array) {
      subResult.failed.forEach(e => {
        let keyStr = "";
        if (e.key) {
          keyStr = ` for "${e.key}"`;
        }
        this.error(`trading session failed${keyStr}: ${e.error}`);
      });
    }
  }

  private sessionStatusUpdateHandler(
    marketID: string,
    sessionStatusUpdate: ProtobufBroker.ISessionStatusUpdate
  ) {
    if (sessionStatusUpdate.initialized === true) {
      this.session.setModuleReady(marketID, "placeOrder");
    }
  }

  private requestResolutionUpdateHandler(
    requestResolution: ProtobufBroker.IRequestResolutionUpdate
  ) {
    if (requestResolution.id != null) {
      this.emit(requestResolution.id, requestResolution);
    }
  }
}

const errNotInitialized = new Error(
  "Trading is not yet initialized. Did you wait for onReady()?"
);

const errBadResponse = new Error("Bad response");
