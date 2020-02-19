import { ProtobufMarkets } from '../modules/proto';
import { OrderSide } from '../types/trading';
import { privateOrderSideFromProto } from './constants';

export function sideFromProto(side: number | ProtobufMarkets.Trade.OrderSide): OrderSide | null {
  if (typeof side === 'number') {
    if (privateOrderSideFromProto[side]) {
      return privateOrderSideFromProto[side];
    }
    return null;
  }

  if (side === ProtobufMarkets.Trade.OrderSide.BUYSIDE) {
    return 'buy';
  } else if (side === ProtobufMarkets.Trade.OrderSide.SELLSIDE) {
    return 'sell';
  }

  return 'unknown';
}
