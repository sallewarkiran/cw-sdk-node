import { OrderSide, FundingType, OrderType } from '../types/trading';

// NOTE: the mapping for buy/sell is different for PrivateOrder and PublicTrade
export const privateOrderSideFromProto: { [key: number]: OrderSide } = {
  0: 'sell',
  1: 'buy'
};

export const privateOrderSideToProto: { [key: string]: number } = {
  sell: 0,
  buy: 1
};

export const publicOrderSideFromProto: { [key: number]: OrderSide } = {
  0: 'buy',
  1: 'sell'
};

export const publicOrderSideToProto: { [key: string]: number } = {
  buy: 0,
  sell: 1
};

export const fundingTypeFromProto: { [key: number]: FundingType } = {
  0: 'spot',
  1: 'margin'
};

export const fundingTypeToProto: { [key: string]: number } = {
  spot: 0,
  margin: 1
};

export const orderTypeFromProto: { [key: number]: OrderType } = {
  0: 'market',
  1: 'limit'
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

export const orderTypeToProto: { [key: string]: number } = {
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

export enum Period {
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

export const periodFromInt: { [key: number]: Period } = {
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
