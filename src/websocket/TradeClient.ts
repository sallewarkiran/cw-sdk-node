import uuid from 'uuid/v4';
import {
  EventOrdersUpdate,
  EventPositionsUpdate,
  EventTradesUpdate,
  EventWSAuthResult,
  EventWSData
} from './constants';
import { loadTradeCredentials } from '../util/credentials';
import { ProtobufBroker, ProtobufStream } from './modules/proto';
import SessionTracker from './SessionTracker';
import { TradeOpts } from './types/client';
import {
  BrokerRequest,
  CancelOrderOpts,
  // ExchangeBalances,
  PlaceOrderOpt,
  PrivateOrder,
  PrivatePosition,
  PrivateTrade
} from './types/trading';
import { getNumber } from '../util/helpers';
import logger from '../util/logger';
import proto from './proto';
import WebSocketClient from './WebSocketClient';
import { errNotInitialized, errPlaceOrderBadResponse, errCancelOrderBadResponse } from './errors';

// The number of recent trades kept locally in cache
const tradeCacheLimit = 1000;

// Requests to the trade service time out after 5s
const requestTimeout = 5000;

export class TradeClient extends WebSocketClient {
  // Mapping of market id to private orderUpdates
  public orders: {
    [key: number]: PrivateOrder[];
  };

  // Mapping of market ids to private trades
  public trades: {
    [key: number]: PrivateTrade[];
  };

  // Mapping of market ids to private positions
  public positions: {
    [key: number]: PrivatePosition[];
  };

  // List of balances for each exchange with an active session
  // public balances: ExchangeBalances[];

  private session: SessionTracker;

  constructor(opts: Partial<TradeOpts>) {
    logger.setLevel(opts.logLevel);
    const tradeOpts = loadTradeCredentials(opts);

    super(tradeOpts);

    if (
      !(tradeOpts.tradeSubscriptions instanceof Array) ||
      tradeOpts.tradeSubscriptions.length === 0
    ) {
      throw new Error('Missing parameter: tradeSubscriptions');
    }

    // Keep track of subscriptions for reconnecting
    tradeOpts.tradeSubscriptions.forEach((ts) => {
      this.subscriptions[ts.marketID] = proto.tradeSubscriptionToProto(ts);
    });

    this.session = new SessionTracker(tradeOpts.tradeSubscriptions);

    this.onDisconnect(() => {
      logger.debug('disconnected: resetting session');
      this.session.reset();
    });

    this.on(EventWSData, (data: Buffer) => {
      let dataDecoded: ProtobufBroker.BrokerUpdateMessage | null = null;
      try {
        dataDecoded = ProtobufBroker.BrokerUpdateMessage.decode(data);
      } catch (e) {
        this.error('Failed to deserialize ProtobufBroker message');
        return;
      }
      this.brokerMessageHandler(dataDecoded);
    });

    this.orders = {};
    this.trades = {};
    this.positions = {};
    // this.balances = [];
  }

  public onReady(fn: () => void): void {
    this.session.on('ready', () => {
      fn();
    });
  }

  public onOrdersUpdate(fn: (o: PrivateOrder[]) => void): void {
    this.on(EventOrdersUpdate, (orders) => {
      fn(orders);
    });
  }

  public onTradesUpdate(fn: (t: PrivateTrade[]) => void): void {
    this.on(EventTradesUpdate, (trades) => {
      fn(trades);
    });
  }

  public onPositionsUpdate(fn: (p: PrivatePosition[]) => void): void {
    this.on(EventPositionsUpdate, (positions) => {
      fn(positions);
    });
  }

  public async placeOrder(opts: Partial<PlaceOrderOpt>): Promise<PrivateOrder> {
    if (!this.session.isReady()) {
      throw errNotInitialized;
    }

    if (opts.marketID == null) {
      throw new Error('place order opts missing market id');
    }

    logger.debug('place order request %o', JSON.stringify(opts));
    const startTime = new Date();

    const response = await this.makeRequest(
      opts.marketID,
      ProtobufBroker.PlaceOrderRequest.create({
        order: proto.placeOrderOptToProto(opts)
      }),
      opts.requestID
    );

    if (!response.placeOrderResult || !response.placeOrderResult.order) {
      throw errPlaceOrderBadResponse;
    }

    const po = proto.privateOrderFromProto(response.placeOrderResult.order);
    if (!po) {
      logger.debug('failed to serialize order result %o', response.placeOrderResult.order);
      throw errPlaceOrderBadResponse;
    }

    logger.debug('order placed', `${new Date().getTime() - startTime.getTime()}s`);

    return po;
  }

  public async cancelOrder(opts: CancelOrderOpts): Promise<void> {
    if (typeof opts.orderID !== 'string' || opts.orderID === '') {
      throw new Error(`invalid order id: ${opts.orderID}`);
    }

    logger.debug('sending cancel order request');

    const response = await this.makeRequest(
      opts.marketID,
      ProtobufBroker.CancelOrderRequest.create({
        orderId: opts.orderID
      }),
      opts.requestID
    );

    logger.debug('order resolution %o', response);

    if (!response.cancelOrderResult || response.cancelOrderResult.orderId === null) {
      throw errCancelOrderBadResponse;
    }
  }

  private makeRequest(
    marketID: number,
    request: BrokerRequest,
    requestID?: string
  ): Promise<ProtobufBroker.RequestResolutionUpdate> {
    const reqID = requestID || uuid();

    let brokerRequest: ProtobufBroker.BrokerRequest;
    if (request instanceof ProtobufBroker.PlaceOrderRequest) {
      brokerRequest = ProtobufBroker.BrokerRequest.create({
        id: reqID,
        marketId: Number(marketID),
        placeOrderRequest: request
      });
    } else if (request instanceof ProtobufBroker.CancelOrderRequest) {
      brokerRequest = ProtobufBroker.BrokerRequest.create({
        id: reqID,
        marketId: Number(marketID),
        cancelOrderRequest: request
      });
    } else {
      throw new Error('internal error: invalid request');
    }

    this.send(ProtobufBroker.BrokerRequest.encode(brokerRequest).finish());

    return new Promise((resolve, reject): void => {
      const timeoutTimer = setTimeout(() => {
        reject();
      }, requestTimeout);

      // TODO (wells) look into how "once" works; could this be a memory leak?
      this.once(reqID, (response) => {
        clearTimeout(timeoutTimer);
        if (response.error !== 0) {
          reject(`error: ${response.message}`);
        } else {
          resolve(response);
        }
      });
    });
  }

  private brokerMessageHandler(message: ProtobufBroker.BrokerUpdateMessage): void {
    const marketID = getNumber(message.marketId);

    switch (message.Update) {
      case 'authenticationResult':
        this.emit(EventWSAuthResult, message.authenticationResult);
        break;
      case 'ordersUpdate':
        logger.debug('call orders update handler %o', message);
        if (message.ordersUpdate) {
          this.ordersUpdateHandler(marketID, message.ordersUpdate);
        }
        break;
      case 'tradesUpdate':
        if (message.tradesUpdate) {
          this.tradesUpdateHandler(marketID, message.tradesUpdate);
        }
        break;
      case 'balancesUpdate':
        // logger.debug("balance update %o", JSON.stringify(message));
        // if (message.balancesUpdate) {
        //   this.balancesUpdateHandler(marketID, message.balancesUpdate);
        // }
        break;
      case 'positionsUpdate':
        if (message.positionsUpdate) {
          this.positionsUpdateHandler(marketID, message.positionsUpdate);
        }
        break;
      case 'subscriptionResult':
        if (message.subscriptionResult) {
          this.subscriptionResultHandler(message.subscriptionResult);
        }
        break;
      case 'sessionStatusUpdate':
        if (message.sessionStatusUpdate && !this.session.isModuleReady(marketID, 'initialize')) {
          this.sessionStatusUpdateHandler(marketID, message.sessionStatusUpdate);
        }
        break;
      case 'requestResolutionUpdate':
        if (message.requestResolutionUpdate) {
          this.requestResolutionUpdateHandler(message.requestResolutionUpdate);
        }
        break;

      default:
      // unsupported type; no-op
    }
  }

  private ordersUpdateHandler(marketID: number, ordersUpdate: ProtobufBroker.IOrdersUpdate): void {
    if (ordersUpdate.orders === null || ordersUpdate.orders === undefined) {
      logger.debug('received empty orders update');
      return;
    }

    const newOrders: PrivateOrder[] = [];
    ordersUpdate.orders.forEach((o) => {
      const order = proto.privateOrderFromProto(o);
      if (order != null) {
        newOrders.push(order);
      }
    });

    this.orders[marketID] = newOrders;
    logger.debug('orders update %o', newOrders);

    this.emit(EventOrdersUpdate, newOrders);
    this.session.setModuleReady(marketID, 'orderUpdates');
  }

  private tradesUpdateHandler(marketID: number, tradesUpdate: ProtobufBroker.ITradesUpdate): void {
    if (tradesUpdate.trades === null || tradesUpdate.trades === undefined) {
      return;
    }

    const newTrades: PrivateTrade[] = [];
    tradesUpdate.trades.forEach((tradeProto) => {
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

    logger.debug('trades update %o', newTrades);
    this.emit(EventTradesUpdate, newTrades);
    this.session.setModuleReady(marketID, 'tradeUpdates');
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
    marketID: number,
    positionsUpdate: ProtobufBroker.IPositionsUpdate
  ): void {
    if (positionsUpdate.positions === null || positionsUpdate.positions === undefined) {
      return;
    }

    const newPositions: PrivatePosition[] = [];

    positionsUpdate.positions.forEach((positionProto) => {
      const position = proto.privatePositionFromProto(positionProto);
      if (!position) {
        return;
      }
      newPositions.push(position);
    });

    this.positions[marketID] = newPositions;

    logger.debug('positions update %o', newPositions);
    this.emit(EventPositionsUpdate, newPositions);
    this.session.setModuleReady(marketID, 'positionUpdates');
  }

  private subscriptionResultHandler(subResult: ProtobufStream.ISubscriptionResult): void {
    if (subResult.failed instanceof Array) {
      subResult.failed.forEach((e) => {
        let keyStr = '';
        if (e.key) {
          keyStr = ` for "${e.key}"`;
        }
        this.error(`trading session failed${keyStr}: ${e.error}`);
      });
    }
  }

  private sessionStatusUpdateHandler(
    marketID: number,
    sessionStatusUpdate: ProtobufBroker.ISessionStatusUpdate
  ): void {
    if (sessionStatusUpdate.initialized === true) {
      logger.debug('session initialized');
      this.session.setModuleReady(marketID, 'initialize');
    }
  }

  private requestResolutionUpdateHandler(
    requestResolution: ProtobufBroker.IRequestResolutionUpdate
  ): void {
    logger.debug('request resolution %o', requestResolution);
    if (requestResolution.id != null) {
      this.emit(requestResolution.id, requestResolution);
    }
  }
}
