import { ProtobufBroker } from '../modules/proto';
// import { WebSocketOpts } from "../types/client";

export interface PrivateOrder {
  price: string;
  amount: string;
  side: OrderSide;
  type: OrderType;
  fundingType: FundingType;
  expireTime?: Date;

  // The following are set server-side
  // ID was previously ExternalID
  id: string;
  timestamp: Date;
  amountFilled: string;

  // leverage?: string;
  // currentStop?: number;
  // initialStop?: number;

  // Broker error code; 0 if successful
  // error?: number;
}

export type OrderSide = 'buy' | 'sell' | 'unknown';

export type FundingType = 'spot' | 'margin';

export type OrderType = 'market' | 'limit';
// | "stoploss"
// | "stoplosslimit"
// | "takeprofit"
// | "takeprofitlimit"
// | "stoplosstakeprofit"
// | "stoplosstakeprofitlimit"
// | "trailingstoploss"
// | "trailingstoplosslimit"
// | "stoplossandlimit"
// | "fillorkill"
// | "settleposition";

export interface PlaceOrderOpt {
  marketID: number;
  price?: string; // optional for market orders
  amount: string;
  side: OrderSide;
  type: OrderType;
  // fundingType?: FundingType;
  // leverage?: string;
  // expireTime?: Date;

  // Only used for testing to mock requests
  requestID?: string;
}

export interface CancelOrderOpts {
  marketID: number;
  orderID: string;

  // Only used for testing to mock requests
  requestID?: string;
}

export interface CancelOrderResult {
  marketID: number;
  orderID: string;
}

export type BrokerRequest = ProtobufBroker.PlaceOrderRequest | ProtobufBroker.CancelOrderRequest;

export interface BrokerResponse {
  resolution?: ProtobufBroker.RequestResolutionUpdate;
  error?: Error;
}

export interface PriceParam {
  value: number;
  type: ProtobufBroker.PrivateOrder.PriceParamType;
}

export interface PrivateTrade {
  id: string;
  timestamp: Date;
  orderID: string;
  price: string;
  amount: string;
  side: OrderSide;
}

export interface PrivatePosition {
  id: string;
  timestamp: Date;
  side: OrderSide;
  avgPrice: string;
  amountOpen: string;
  amountClosed: string;
  orderIDs: string[];
  tradeIDs: string[];
}

// export interface Balance {
//   currency: string;
//   amount: string;
// }

// export interface Balances {
//   fundingType: ProtobufBroker.FundingType;
//   balances: Balance[];
// }

// TODO
// export interface Exchange {
//   id: string;
//   name: string;
// }

// export interface ExchangeBalances {
//   [key: string]: string[] | Balance[];
// exchange: Exchange;
// marketIDs: string[];
// spot: Balance[];
// margin: Balance[];
// }
