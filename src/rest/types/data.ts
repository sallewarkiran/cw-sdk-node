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

export enum Period {
  '1m' = '60',
  '3m' = '180',
  '5m' = '300',
  '15m' = '900',
  '30m' = '1800',
  '1h' = '3600',
  '2h' = '7200',
  '4h' = '14400',
  '6h' = '21600',
  '12h' = '43200',
  '1d' = '86400',
  '3d' = '259200',
  '1w' = '604800_Monday'
}

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

export type OHLCOptions = {
  before?: string,
  after?: string,
  periods?: string
};
