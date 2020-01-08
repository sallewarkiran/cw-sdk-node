import { ProtobufMarkets } from '../modules/proto';
import {
  MarketUpdate,
  PublicTrade,
  OrderBookSpread,
  Market,
  Sparkline,
  Summary,
  Interval,
  OHLC
} from '../types/markets';
import { sideFromProto } from './sideFromProto';
import { getDateFromSecs, getDateFromNs, getNumber } from '../../util/helpers';
import { periodFromInt } from './constants';
import { PublicOrder, OrderBookSnapshot, OrderBookDelta } from 'util/types/shared';
import { Period } from '../../rest/types/data';

function publicOrderFromProto(publicOrder: ProtobufMarkets.IOrder): PublicOrder | null {
  if (!publicOrder.priceStr || !publicOrder.amountStr) {
    return null;
  }
  return {
    price: publicOrder.priceStr,
    amount: publicOrder.amountStr
  };
}

function publicOrdersFromProto(
  publicOrders: ProtobufMarkets.IOrder[] | null | undefined
): PublicOrder[] {
  const orders: PublicOrder[] = [];
  if (publicOrders) {
    publicOrders.forEach((order) => {
      const publicOrder = publicOrderFromProto(order);
      if (publicOrder !== null) {
        orders.push(publicOrder);
      }
    });
  }
  return orders;
}

function getPeriod(period: number): Period | null {
  if (periodFromInt[period]) {
    return periodFromInt[period];
  }
  return null;
}

function intervalFromProto(intervalUpdate: ProtobufMarkets.IInterval): Interval | null {
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

function sparklineFromProto(sparklineUpdate: ProtobufMarkets.ISparklineUpdate): Sparkline | null {
  if (!sparklineUpdate.time || !sparklineUpdate.priceStr) {
    return null;
  }
  return {
    timestamp: getDateFromSecs(sparklineUpdate.time),
    price: sparklineUpdate.priceStr
  };
}

function summaryFromProto(summaryUpdate: ProtobufMarkets.ISummaryUpdate): Summary | null {
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

function intervalsFromProto(intervalsUpdate: ProtobufMarkets.IIntervalsUpdate): Interval[] | null {
  if (!intervalsUpdate.intervals) {
    return null;
  }

  const intervals: Interval[] = [];

  intervalsUpdate.intervals.forEach((intervalProto) => {
    const i = intervalFromProto(intervalProto);
    if (i) {
      intervals.push(i);
    }
  });

  return intervals;
}

function publicTradesFromProto(tradesUpdate: ProtobufMarkets.ITradesUpdate): PublicTrade[] | null {
  if (!tradesUpdate.trades) {
    return null;
  }

  const publicTrades: PublicTrade[] = [];

  tradesUpdate.trades.forEach((trade: ProtobufMarkets.ITrade) => {
    if (!trade || !trade.externalId || !trade.priceStr || !trade.amountStr) {
      return;
    }

    if (trade.side !== 0 || trade.side !== 1) {
      return;
    }

    const side = sideFromProto(trade.side);
    if (!side) {
      return;
    }

    let timestamp: Date;
    if (trade.timestampNano && trade.timestampNano > 0) {
      timestamp = getDateFromNs(trade.timestampNano);
    } else if (trade.timestamp && trade.timestamp > 0) {
      timestamp = getDateFromSecs(trade.timestamp);
    } else {
      return;
    }

    publicTrades.push({
      externalID: trade.externalId,
      timestamp,
      side: side,
      price: trade.priceStr,
      amount: trade.amountStr
    });
  });

  return publicTrades;
}

function orderBookSpreadFromProto(
  orderBookSpread: ProtobufMarkets.IOrderBookSpreadUpdate
): OrderBookSpread | null {
  if (
    orderBookSpread.timestamp == null ||
    orderBookSpread.bid == null ||
    orderBookSpread.ask == null
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

  const ts = getDateFromSecs(orderBookSpread.timestamp);
  if (ts.getTime() === 0) {
    return null;
  }

  return {
    timestamp: ts,
    bid,
    ask
  };
}

function orderBookDeltaFromProto(
  orderBookDelta: ProtobufMarkets.IOrderBookDeltaUpdate
): OrderBookDelta | null {
  if (orderBookDelta.seqNum == null) {
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

function orderBookSnapshotFromProto(
  orderBookSnapshot: ProtobufMarkets.IOrderBookUpdate
): OrderBookSnapshot | null {
  if (orderBookSnapshot.seqNum == null) {
    return null;
  }

  return {
    seqNum: orderBookSnapshot.seqNum,
    bids: publicOrdersFromProto(orderBookSnapshot.bids),
    asks: publicOrdersFromProto(orderBookSnapshot.asks)
  };
}

function marketFromProto(market: ProtobufMarkets.IMarket): Market | null {
  if (!market.marketId || !market.exchangeId || !market.currencyPairId) {
    return null;
  }
  return {
    id: getNumber(market.marketId),
    exchangeID: getNumber(market.exchangeId),
    currencyPairID: getNumber(market.currencyPairId)
  };
}

export function marketUpdateFromProto(
  marketUpdate: ProtobufMarkets.MarketUpdateMessage
): MarketUpdate | null {
  if (marketUpdate.market == null) {
    return null;
  }
  const market = marketFromProto(marketUpdate.market);
  if (!market) {
    return null;
  }
  if (marketUpdate.orderBookUpdate) {
    const orderBookSnapshot = orderBookSnapshotFromProto(marketUpdate.orderBookUpdate);
    if (orderBookSnapshot) {
      return {
        market,
        orderBookSnapshot
      };
    }
  }
  if (marketUpdate.orderBookDeltaUpdate) {
    const orderBookDelta = orderBookDeltaFromProto(marketUpdate.orderBookDeltaUpdate);
    if (orderBookDelta) {
      return {
        market,
        orderBookDelta
      };
    }
  }
  if (marketUpdate.orderBookSpreadUpdate) {
    const orderBookSpread = orderBookSpreadFromProto(marketUpdate.orderBookSpreadUpdate);
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
