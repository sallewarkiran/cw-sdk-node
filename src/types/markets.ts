export interface MarketUpdate {
  market: Market;
  orderBookSnapshot?: OrderBookSnapshot;
  orderBookDelta?: OrderBookDelta;
  orderBookSpread?: OrderBookSpread;
  trades?: PublicTrade[];
  intervals?: Interval[];
  summary?: Summary;
  sparkline?: Sparkline;
}

export interface Market {
  id: string;
  exchangeID: string;
  currencyPairID: string;
}

export interface Interval {
  period: number;
  ohlc: OHLC;
  closeTime: Date;
  volumeBase: string;
  volumeQuote: string;
}

export interface OHLC {
  open: string;
  high: string;
  low: string;
  close: string;
}

export interface OrderBookSnapshot {
  seqNum: number;
  bids: PublicOrder[];
  asks: PublicOrder[];
}

export interface OrderDeltas {
  set: PublicOrder[];
  remove: string[];
}

export interface PublicOrder {
  price: string;
  amount: string;
}

export interface PublicTrade {
  externalID: string;
  timestamp: Date;
  price: string;
  amount: string;
}

export interface OrderBookDelta {
  seqNum: number;
  bids: OrderDeltas;
  asks: OrderDeltas;
}

export interface OrderDeltas {
  set: PublicOrder[];
  remove: string[];
}

export interface OrderBookSpread {
  timestamp: Date;
  bid: PublicOrder;
  ask: PublicOrder;
}

export interface Summary {
  last: string;
  high: string;
  low: string;
  volumeBase: string;
  volumeQuote: string;
  changeAbsolute: string;
  changePercent: string;
  numTrades: number;
}

export interface Sparkline {
  timestamp: Date;
  price: string;
}
