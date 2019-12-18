import { ProtobufMarkets } from '../modules/proto';
import { OrderSide } from '../types/trading';
import { privateOrderSideFromProto } from './constants';

export function sideFromProto(side: number | ProtobufMarkets.Trade.Side): OrderSide | null {
  if (typeof side === 'number') {
    if (privateOrderSideFromProto[side]) {
      return privateOrderSideFromProto[side];
    }
    return null;
  }

  if (side === ProtobufMarkets.Trade.Side.BUY) {
    return 'buy';
  }
  return 'sell';
}
