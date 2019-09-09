import {
  ProtobufBroker,
  ProtobufClient,
  ProtobufMarkets,
  ProtobufStream
} from "../modules/proto";
import {
  SubscriptionError,
  SubscriptionResult,
  TradeSubscription
} from "../types/client";
import {
  Interval,
  Market,
  MarketUpdate,
  OHLC,
  OrderBookDelta,
  OrderBookSnapshot,
  OrderBookSpread,
  PublicOrder,
  PublicTrade,
  Sparkline,
  Summary
} from "../types/markets";
import {
  Pair,
  PairUpdate,
  PerformanceUpdate,
  TrendlineUpdate,
  VWAPUpdate
} from "../types/pairs";
import {
  Balance,
  Balances,
  FundingType,
  OrderSide,
  OrderType,
  PlaceOrderOpt,
  PriceParam,
  PrivateOrder,
  PrivatePosition,
  PrivateTrade
} from "../types/trading";
import {
  getDateFromMs,
  getDateFromNs,
  getDateFromSecs,
  getNumber,
  getString
} from "./helpers";
import logger from "./logger";

const orderSides: { [key: number]: OrderSide } = {
  0: "sell",
  1: "buy"
};
const orderSideToProto: { [key: string]: number } = {
  sell: 0,
  buy: 1
};

const fundingTypes: { [key: number]: FundingType } = {
  0: "spot",
  1: "margin"
};

const fundingTypeToProto: { [key: string]: number } = {
  spot: 0,
  margin: 1
};

const orderTypes: { [key: number]: OrderType } = {
  0: "market",
  1: "limit"
  // 2: "stoploss",
  // 3: "stoplosslimit",
  // 4: "takeprofit",
  // 5: "takeprofitlimit",
  // 6: "stoplosstakeprofit",
  // 7: "stoplosstakeprofitlimit",
  // 8: "trailingstoploss",
  // 9: "trailingstoplosslimit",
  // 10: "stoplossandlimit",
  // 11: "fillorkill",
  // 12: "settleposition"
};

const orderTypeToProto: { [key: string]: number } = {
  market: 0,
  limit: 1
  // stoploss: 2,
  // stoplosslimit: 3,
  // takeprofit: 4,
  // takeprofitlimit: 5,
  // stoplosstakeprofit: 6,
  // stoplosstakeprofitlimit: 7,
  // trailingstoploss: 8,
  // trailingstoplosslimit: 9,
  // stoplossandlimit: 10,
  // fillorkill: 11,
  // settleposition: 12
};

enum Period {
  Period1M = 60,
  Period3M = 180,
  Period5M = 300,
  Period15M = 900,
  Period30M = 1800,
  Period1H = 3600,
  Period2H = 7200,
  Period4H = 14400,
  Period6H = 21600,
  Period12H = 43200,
  Period1D = 86400,
  Period3D = 259200,
  Period1W = 604800
}

const periodFromInt: { [key: number]: Period } = {
  60: Period.Period1M,
  180: Period.Period3M,
  300: Period.Period5M,
  900: Period.Period15M,
  1800: Period.Period30M,
  3600: Period.Period1H,
  7200: Period.Period2H,
  14400: Period.Period4H,
  21600: Period.Period6H,
  43200: Period.Period12H,
  86400: Period.Period1D,
  259200: Period.Period3D,
  604800: Period.Period1W
};

function privateOrderFromProto(
  privateOrder: ProtobufBroker.IPrivateOrder
): PrivateOrder | null {
  if (
    !privateOrder.priceParams ||
    !privateOrder.amountParamString ||
    typeof privateOrder.side !== "number" ||
    typeof privateOrder.type !== "number" ||
    typeof orderSides[privateOrder.side] !== "string" ||
    typeof orderTypes[privateOrder.type] !== "string"
  ) {
    logger.error("failed to parse private order %o", privateOrder);
    return null;
  }

  const priceParams: PriceParam[] = [];
  privateOrder.priceParams.forEach(p => {
    if (!p.valueString) {
      return;
    }
    if (!p.type) {
      p.type = ProtobufBroker.PrivateOrder.PriceParamType.AbsoluteValue;
    }
    priceParams.push({
      value: p.valueString,
      type: p.type
    });
  });

  if (priceParams.length === 0) {
    logger.error(
      "parsing private order failed; no price params %o",
      privateOrder
    );
    return null;
  }

  if (privateOrder.amountFilledString === "") {
    privateOrder.amountFilledString = "0.0";
  }

  let fundingType: FundingType = "spot";
  if (typeof privateOrder.fundingType === "number") {
    fundingType = fundingTypes[privateOrder.fundingType];
  }

  let id;
  if (typeof privateOrder.id === "string" && privateOrder.id.length > 0) {
    id = privateOrder.id;
  }

  let timestamp;
  if (typeof privateOrder.time === "number" && privateOrder.time > 0) {
    timestamp = getDateFromSecs(privateOrder.time);
  }

  let expireTime;
  if (
    typeof privateOrder.expireTime === "number" &&
    privateOrder.expireTime > 0
  ) {
    expireTime = getDateFromSecs(privateOrder.expireTime);
  }

  let leverage;
  if (privateOrder.leverage) {
    leverage = privateOrder.leverage;
  }

  let currentStop;
  if (privateOrder.currentStopString) {
    currentStop = privateOrder.currentStopString;
  }

  let initialStop;
  if (privateOrder.initialStopString) {
    initialStop = privateOrder.initialStopString;
  }

  let amountFilled;
  if (privateOrder.amountFilledString) {
    amountFilled = privateOrder.amountFilledString;
  }

  return {
    priceParams,
    amount: privateOrder.amountParamString,
    side: orderSides[privateOrder.side],
    type: orderTypes[privateOrder.type],
    fundingType,

    id,
    timestamp,

    expireTime,
    leverage,
    currentStop,
    initialStop,
    amountFilled
  };
}

function pairUpdateFromProto(
  pairUpdate: ProtobufMarkets.IPairUpdateMessage | null | undefined
): PairUpdate | null {
  if (!pairUpdate || !pairUpdate.pair) {
    return null;
  }

  const pair: Pair = {
    id: getString(pairUpdate.pair)
  };

  if (
    pairUpdate.vwapUpdate &&
    pairUpdate.vwapUpdate.vwap &&
    pairUpdate.vwapUpdate.timestamp
  ) {
    const vwapUpdate: VWAPUpdate = {
      vwap: String(pairUpdate.vwapUpdate.vwap),
      timestamp: getDateFromSecs(pairUpdate.vwapUpdate.timestamp)
    };
    return {
      pair,
      vwapUpdate
    };
  }

  if (
    pairUpdate.performanceUpdate &&
    pairUpdate.performanceUpdate.window &&
    pairUpdate.performanceUpdate.performance
  ) {
    const performanceUpdate: PerformanceUpdate = {
      window: pairUpdate.performanceUpdate.window,
      performance: String(pairUpdate.performanceUpdate.performance)
    };

    return {
      pair,
      performanceUpdate
    };
  }

  if (
    pairUpdate.trendlineUpdate &&
    pairUpdate.trendlineUpdate.window &&
    pairUpdate.trendlineUpdate.time &&
    pairUpdate.trendlineUpdate.price &&
    pairUpdate.trendlineUpdate.volume
  ) {
    const trendlineUpdate: TrendlineUpdate = {
      window: pairUpdate.trendlineUpdate.window,
      timestamp: getDateFromSecs(pairUpdate.trendlineUpdate.time),
      price: pairUpdate.trendlineUpdate.price,
      volume: pairUpdate.trendlineUpdate.volume
    };

    return {
      pair,
      trendlineUpdate
    };
  }

  return null;
}

function marketUpdateFromProto(
  marketUpdate: ProtobufMarkets.MarketUpdateMessage
): MarketUpdate | null {
  if (!marketUpdate.market) {
    return null;
  }
  const market = marketFromProto(marketUpdate.market);
  if (!market) {
    return null;
  }

  if (marketUpdate.orderBookUpdate) {
    const orderBookSnapshot = orderBookSnapshotFromProto(
      marketUpdate.orderBookUpdate
    );
    if (orderBookSnapshot) {
      return {
        market,
        orderBookSnapshot
      };
    }
  }

  if (marketUpdate.orderBookDeltaUpdate) {
    const orderBookDelta = orderBookDeltaFromProto(
      marketUpdate.orderBookDeltaUpdate
    );
    if (orderBookDelta) {
      return {
        market,
        orderBookDelta
      };
    }
  }

  if (marketUpdate.orderBookSpreadUpdate) {
    const orderBookSpread = orderBookSpreadFromProto(
      marketUpdate.orderBookSpreadUpdate
    );
    if (orderBookSpread) {
      return {
        market,
        orderBookSpread
      };
    }
  }

  if (marketUpdate.tradesUpdate) {
    const trades = publicTradesFromProto(marketUpdate.tradesUpdate);
    if (trades) {
      return {
        market,
        trades
      };
    }
  }

  if (marketUpdate.intervalsUpdate) {
    const intervals = intervalsFromProto(marketUpdate.intervalsUpdate);
    if (intervals) {
      return {
        market,
        intervals
      };
    }
  }

  if (marketUpdate.summaryUpdate) {
    const summary = summaryFromProto(marketUpdate.summaryUpdate);
    if (summary) {
      return {
        market,
        summary
      };
    }
  }

  if (marketUpdate.sparklineUpdate) {
    const sparkline = sparklineFromProto(marketUpdate.sparklineUpdate);
    if (sparkline) {
      return {
        market,
        sparkline
      };
    }
  }

  return null;
}

function orderBookSnapshotFromProto(
  orderBookSnapshot: ProtobufMarkets.IOrderBookUpdate
): OrderBookSnapshot | null {
  if (
    orderBookSnapshot.seqNum === null ||
    orderBookSnapshot.seqNum === undefined
  ) {
    return null;
  }

  return {
    seqNum: orderBookSnapshot.seqNum,
    bids: publicOrdersFromProto(orderBookSnapshot.bids),
    asks: publicOrdersFromProto(orderBookSnapshot.asks)
  };
}

function orderBookDeltaFromProto(
  orderBookDelta: ProtobufMarkets.IOrderBookDeltaUpdate
): OrderBookDelta | null {
  if (!orderBookDelta.seqNum) {
    return null;
  }

  let bidSet: PublicOrder[] = [];
  let bidRemove: string[] = [];
  if (orderBookDelta.bids) {
    bidSet = publicOrdersFromProto(orderBookDelta.bids.set);
    if (orderBookDelta.bids.removeStr) {
      bidRemove = orderBookDelta.bids.removeStr;
    }
  }

  let askSet: PublicOrder[] = [];
  let askRemove: string[] = [];
  if (orderBookDelta.asks) {
    askSet = publicOrdersFromProto(orderBookDelta.asks.set);
    if (orderBookDelta.asks.removeStr) {
      askRemove = orderBookDelta.asks.removeStr;
    }
  }

  return {
    seqNum: orderBookDelta.seqNum,
    bids: {
      set: bidSet,
      remove: bidRemove
    },
    asks: {
      set: askSet,
      remove: askRemove
    }
  };
}

function orderBookSpreadFromProto(
  orderBookSpread: ProtobufMarkets.IOrderBookSpreadUpdate
): OrderBookSpread | null {
  if (
    !orderBookSpread.timestamp ||
    !orderBookSpread.bid ||
    !orderBookSpread.ask
  ) {
    return null;
  }

  const bid = publicOrderFromProto(orderBookSpread.bid);
  if (!bid) {
    return null;
  }
  const ask = publicOrderFromProto(orderBookSpread.ask);
  if (!ask) {
    return null;
  }

  return {
    timestamp: getDateFromSecs(orderBookSpread.timestamp),
    bid,
    ask
  };
}

// TODO test this
function publicTradesFromProto(
  tradesUpdate: ProtobufMarkets.ITradesUpdate
): PublicTrade[] | null {
  if (!tradesUpdate.trades) {
    return null;
  }

  const publicTrades: PublicTrade[] = [];

  tradesUpdate.trades.forEach(trade => {
    if (!trade || !trade.externalId || !trade.priceStr || !trade.amountStr) {
      return;
    }

    let timestamp: Date;
    if (trade.timestampNano && trade.timestampNano > 0) {
      timestamp = getDateFromNs(trade.timestampNano);
    } else if (trade.timestampMillis && trade.timestampMillis > 0) {
      timestamp = getDateFromMs(trade.timestampMillis);
    } else if (trade.timestamp && trade.timestamp > 0) {
      timestamp = getDateFromSecs(trade.timestamp);
    } else {
      return;
    }

    publicTrades.push({
      externalID: trade.externalId,
      timestamp,
      price: trade.priceStr,
      amount: trade.amountStr
    });
  });

  return publicTrades;
}

function privateTradeFromProto(
  trade: ProtobufBroker.IPrivateTrade
): PrivateTrade | null {
  if (
    trade.externalId == null ||
    trade.orderId == null ||
    !trade.priceString ||
    !trade.amountString
  ) {
    return null;
  }

  let d: Date;
  if (trade.timeMillis && trade.timeMillis > 0) {
    d = getDateFromMs(trade.timeMillis);
  } else if (trade.time != null) {
    d = getDateFromSecs(trade.time);
  } else {
    return null;
  }

  const side = sideFromProto(trade.side);
  if (!side) {
    return null;
  }

  return {
    id: trade.externalId,
    orderID: trade.orderId,
    timestamp: d,
    side,
    price: trade.priceString,
    amount: trade.amountString
  };
}

function privatePositionFromProto(
  position: ProtobufBroker.IPrivatePosition
): PrivatePosition | null {
  if (
    position.id == null ||
    !position.time ||
    !position.avgPriceString ||
    !position.amountOpenString ||
    !position.amountClosedString ||
    !position.orderIds ||
    !position.tradeIds
  ) {
    return null;
  }

  const side = sideFromProto(position.side);
  if (!side) {
    return null;
  }

  return {
    id: position.id,
    timestamp: getDateFromSecs(position.time),
    side,
    avgPrice: position.avgPriceString,
    amountOpen: position.amountOpenString,
    amountClosed: position.amountClosedString,
    orderIDs: position.orderIds,
    tradeIDs: position.tradeIds
  };
}

function balancesFromProto(
  balances: ProtobufBroker.IBalances
): Balances | null {
  if (!balances.fundingType || !balances.balances) {
    return null;
  }
  const returnBalances: Balances = {
    fundingType: balances.fundingType,
    balances: []
  };

  balances.balances.forEach(balanceProto => {
    const balance = balanceFromProto(balanceProto);
    if (!balance) {
      return;
    }
    returnBalances.balances.push(balance);
  });

  return returnBalances;
}

function balanceFromProto(balance: ProtobufBroker.IBalance): Balance | null {
  if (!balance.currency || !balance.amountString) {
    return null;
  }
  return {
    currency: balance.currency,
    amount: balance.amountString
  };
}

function sideFromProto(side: number | null | undefined): OrderSide | null {
  if (!side) {
    return null;
  }
  if (orderSides[side]) {
    return orderSides[side];
  }
  return null;
}

function intervalsFromProto(
  intervalsUpdate: ProtobufMarkets.IIntervalsUpdate
): Interval[] | null {
  if (!intervalsUpdate.intervals) {
    return null;
  }

  const intervals: Interval[] = [];

  intervalsUpdate.intervals.forEach(intervalProto => {
    const i = intervalFromProto(intervalProto);
    if (i) {
      intervals.push(i);
    }
  });

  return intervals;
}

function intervalFromProto(
  intervalUpdate: ProtobufMarkets.IInterval
): Interval | null {
  if (
    !intervalUpdate.period ||
    !intervalUpdate.closetime ||
    !intervalUpdate.ohlc ||
    !intervalUpdate.ohlc.openStr ||
    !intervalUpdate.ohlc.highStr ||
    !intervalUpdate.ohlc.lowStr ||
    !intervalUpdate.ohlc.closeStr ||
    !intervalUpdate.volumeBaseStr ||
    !intervalUpdate.volumeQuoteStr
  ) {
    return null;
  }

  const period = getPeriod(intervalUpdate.period);
  if (!period) {
    return null;
  }

  const ohlc: OHLC = {
    open: intervalUpdate.ohlc.openStr,
    high: intervalUpdate.ohlc.highStr,
    low: intervalUpdate.ohlc.lowStr,
    close: intervalUpdate.ohlc.closeStr
  };

  return {
    period,
    ohlc,
    closeTime: new Date(getNumber(intervalUpdate.closetime) * 1000),
    volumeBase: intervalUpdate.volumeBaseStr,
    volumeQuote: intervalUpdate.volumeQuoteStr
  };
}

function summaryFromProto(
  summaryUpdate: ProtobufMarkets.ISummaryUpdate
): Summary | null {
  if (
    !summaryUpdate.lastStr ||
    !summaryUpdate.highStr ||
    !summaryUpdate.lowStr ||
    !summaryUpdate.volumeBaseStr ||
    !summaryUpdate.volumeQuoteStr ||
    !summaryUpdate.changeAbsoluteStr ||
    !summaryUpdate.changePercentStr ||
    !summaryUpdate.numTrades
  ) {
    return null;
  }
  return {
    last: summaryUpdate.lastStr,
    high: summaryUpdate.highStr,
    low: summaryUpdate.lowStr,
    volumeBase: summaryUpdate.volumeBaseStr,
    volumeQuote: summaryUpdate.volumeQuoteStr,
    changeAbsolute: summaryUpdate.changeAbsoluteStr,
    changePercent: summaryUpdate.changePercentStr,
    numTrades: summaryUpdate.numTrades
  };
}

function sparklineFromProto(
  sparklineUpdate: ProtobufMarkets.ISparklineUpdate
): Sparkline | null {
  if (!sparklineUpdate.time || !sparklineUpdate.priceStr) {
    return null;
  }
  return {
    timestamp: getDateFromSecs(sparklineUpdate.time),
    price: sparklineUpdate.priceStr
  };
}

function publicOrdersFromProto(
  publicOrders: ProtobufMarkets.IOrder[] | null | undefined
): PublicOrder[] {
  const orders: PublicOrder[] = [];
  if (publicOrders) {
    publicOrders.forEach(order => {
      const publicOrder = publicOrderFromProto(order);
      if (publicOrder !== null) {
        orders.push(publicOrder);
      }
    });
  }
  return orders;
}

function publicOrderFromProto(
  publicOrder: ProtobufMarkets.IOrder
): PublicOrder | null {
  if (!publicOrder.priceStr || !publicOrder.amountStr) {
    return null;
  }
  return {
    price: publicOrder.priceStr,
    amount: publicOrder.amountStr
  };
}

function placeOrderOptToProto(
  orderOpts: PlaceOrderOpt
): ProtobufBroker.IPrivateOrder {
  if (!validateOrderSideProto(orderOpts.side)) {
    throw new Error(`Invalid order parameters: side=${orderOpts.side}`);
  }
  if (!validateOrderTypeProto(orderOpts.type)) {
    throw new Error(`Invalid order parameters: type=${orderOpts.type}`);
  }
  if (orderOpts.price && !checkMonetaryValue(orderOpts.price)) {
    throw new Error(`Invalid order parameters: price=${orderOpts.price}`);
  }
  if (!checkMonetaryValue(orderOpts.amount)) {
    throw new Error(`Invalid order parameters: amount=${orderOpts.amount}`);
  }

  let type: OrderType = "limit";
  if (orderOpts.type !== undefined) {
    type = orderOpts.type;
  }

  const fundingType: FundingType = "spot";
  // if (typeof orderOpts.fundingType === "number") {
  //   fundingType = fundingTypes[orderOpts.fundingType];
  // }

  const leverage: string | null = null;
  // if (orderOpts.leverage !== undefined) {
  //   leverage = orderOpts.leverage;
  // }

  const expireTime: number | null = null;
  // if (orderOpts.expireTime !== undefined) {
  //   expireTime = orderOpts.expireTime.getTime();
  // }

  const priceParams: ProtobufBroker.PrivateOrder.IPriceParam[] = [
    {
      valueString: String(orderOpts.price),
      type: ProtobufBroker.PrivateOrder.PriceParamType.AbsoluteValue
    }
  ];

  return {
    side: orderSideToProto[orderOpts.side],
    type: orderTypeToProto[type],
    fundingType: fundingTypeToProto[fundingType],
    priceParams,
    amountParamString: String(orderOpts.amount),
    leverage,
    expireTime
  };
}

function marketFromProto(market: ProtobufMarkets.IMarket): Market | null {
  if (!market.marketId || !market.exchangeId || !market.currencyPairId) {
    return null;
  }
  return {
    id: getString(market.marketId),
    exchangeID: getString(market.exchangeId),
    currencyPairID: getString(market.currencyPairId)
  };
}

function getPeriod(period: number): Period | null {
  if (periodFromInt[period]) {
    return periodFromInt[period];
  }
  return null;
}

function keyToStreamSubscription(
  key: string
): ProtobufClient.ClientSubscription {
  return ProtobufClient.ClientSubscription.create({
    streamSubscription: ProtobufClient.StreamSubscription.create({
      resource: key
    })
  });
}

function tradeSubscriptionToProto(
  tradeSubscription: TradeSubscription
): ProtobufClient.ClientSubscription {
  let auth = null;
  if (tradeSubscription.auth) {
    auth = ProtobufClient.TradeSessionAuth.create({
      apiKey: tradeSubscription.auth.apiKey,
      apiSecret: tradeSubscription.auth.apiSecret,
      customerId: tradeSubscription.auth.customerID,
      keyPassphrase: tradeSubscription.auth.keyPassphrase
    });
  }
  return ProtobufClient.ClientSubscription.create({
    tradeSubscription: ProtobufClient.TradeSubscription.create({
      marketId: tradeSubscription.marketID,
      auth
    })
  });
}

function keyFromClientSubscription(
  sub: ProtobufClient.ClientSubscription
): string | null {
  if (sub.streamSubscription && sub.streamSubscription.resource) {
    return sub.streamSubscription.resource;
  }
  if (sub.tradeSubscription && sub.tradeSubscription.marketId) {
    return sub.tradeSubscription.marketId;
  }
  return null;
}

function subscriptionResultFromProto(
  subResult:
    | ProtobufStream.ISubscriptionResult
    | ProtobufStream.IUnsubscriptionResult
): SubscriptionResult | null {
  if (subResult.failed === null && subResult.subscriptions === null) {
    return null;
  }

  const subscriptions: string[] = [];
  const failed: SubscriptionError[] = [];

  if (subResult.failed instanceof Array) {
    subResult.failed.forEach(e => {
      if (
        typeof e.error !== "string" ||
        !(e.subscription instanceof ProtobufClient.ClientSubscription)
      ) {
        return null;
      }

      const sub = keyFromClientSubscription(e.subscription);
      if (sub === null) {
        return null;
      }

      failed.push({
        error: e.error,
        subscription: sub
      });
    });
  }

  return {
    subscriptions,
    failed
  };
}

function validateOrderTypeProto(t: string): boolean {
  return typeof orderSideToProto[t] === "number";
}

function validateOrderSideProto(s: string): boolean {
  return typeof fundingTypeToProto[s] === "number";
}

function checkMonetaryValue(n: number): boolean {
  return n > 0;
}

const proto = {
  balancesFromProto,
  pairUpdateFromProto,
  marketUpdateFromProto,
  periodFromInt,
  orderSides,
  placeOrderOptToProto,
  privateOrderFromProto,
  privateTradeFromProto,
  privatePositionFromProto,
  keyToStreamSubscription,
  tradeSubscriptionToProto,
  subscriptionResultFromProto
};

export default proto;
