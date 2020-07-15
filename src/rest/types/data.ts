type Description<T> = T & {
  routes: {
    [key: string]: string;
  };
};

type Brief<T> = T & {
  route: string;
};

type AssetBase = {
  id: number;
  symbol: string;
  name: string;
  fiat: boolean;
};

type ExchangeBase = {
  id: number;
  symbol: string;
  name: string;
  active: boolean;
};

type MarketBase = {
  id: number;
  exchange: string;
  pair: string;
  active: boolean;
};

export type AssetBrief = Brief<AssetBase>;
export type AssetDetails = AssetBase & {
  markets: {
    base: MarketBrief[];
    quote: MarketBrief[];
  };
};

export type PairBrief = {
  id: number;
  symbol: string;
  base: AssetBrief;
  quote: AssetBrief;
};

export type PairDetails = PairBrief & {
  markets: MarketBrief[];
};

export type ExchangeDescription = Description<ExchangeBase>;
export type ExchangeBrief = Brief<ExchangeBase>;

export type MarketDescription = Description<MarketBase>;
export type MarketBrief = Brief<MarketBase>;

export type Price = {
  price: number;
};

export type ChangeSummary = {
  percentage: number;
  absolute: number;
};

export type PriceSummary = {
  last: number;
  high: number;
  low: number;
  change: ChangeSummary;
};

export type Summary = {
  price: PriceSummary;
  volume: number;
  volumeQuote: number;
};

/**
 * PublicOrders are arrays of numbers in this order:
 * [ Price, Amount ]
 */
export type PublicOrderRaw = [number, number];

export type OrderBookSnapshotRaw = {
  asks: PublicOrderRaw[];
  bids: PublicOrderRaw[];
  seqNum: number;
};

/**
 * Trades are arrays of numbers in this order:
 * [ ID, Timestamp, Price, Amount ]
 */
export type TradeRaw = [number, number, number, number];
export type Trade = {
  id: number;
  timestamp: number;
  price: string;
  amount: string;
};

export type Period =
  | '1m'
  | '3m'
  | '5m'
  | '15m'
  | '30m'
  | '1h'
  | '2h'
  | '4h'
  | '6h'
  | '12h'
  | '1d'
  | '3d'
  | '1w_Thursday'
  | '1w_Monday';

export type LiquiditySide = {
  base: {
    [period in Period]: string;
  };
  quote: {
    [period in Period]: string;
  };
};

export type MarketOrderBookLiquidity = {
  bid: LiquiditySide;
  ask: LiquiditySide;
};

/**
 * CandleData is an array of numbers in this order:
 * [ CloseTime, OpenPrice, HighPrice, LowPrice, ClosePrice, Volume ]
 */
export type CandleDataRaw = [number, number, number, number, number, number];
export type CandleData = {
  closeTime: number;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  closePrice: string;
  volume: string;
};

export type MarketOHLCRaw = {
  [period in Period]: CandleDataRaw[];
};

export type MarketOHLC = {
  [period in Period]: CandleData[];
};

export type Prices = {
  [marketSymbol: string]: number;
};

export type Summaries = {
  [marketSymbol: string]: Summary;
};
