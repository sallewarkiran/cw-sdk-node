import { OrderSide, FundingType, OrderType } from '../types/trading';
import { Period } from '../../rest/types/data';

// NOTE: the mapping for buy/sell is different for PrivateOrder and PublicTrade
export const privateOrderSideFromProto: { [key: number]: OrderSide } = {
  0: 'sell',
  1: 'buy'
} as const;

export const privateOrderSideToProto: { [key: string]: number } = {
  sell: 0,
  buy: 1
} as const;

export const fundingTypeFromProto: { [key: number]: FundingType } = {
  0: 'spot',
  1: 'margin'
} as const;

export const fundingTypeToProto: { [key: string]: number } = {
  spot: 0,
  margin: 1
} as const;

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
} as const;

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
} as const;

export const periodNames: { [key: string]: Period } = {
  '60': '1m',
  '180': '3m',
  '300': '5m',
  '900': '15m',
  '1800': '30m',
  '3600': '1h',
  '7200': '2h',
  '14400': '4h',
  '21600': '6h',
  '43200': '12h',
  '86400': '1d',
  '259200': '3d',
  '604800': '1w_Thursday',
  '604800_Monday': '1w_Monday'
} as const;
