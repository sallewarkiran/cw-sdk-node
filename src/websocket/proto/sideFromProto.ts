import { ProtobufMarkets } from '../modules/proto';
import { OrderSide } from '../types/trading';

export function publicTradeSideFromProto(side: ProtobufMarkets.Trade.OrderSide): OrderSide | null {
  if (side === ProtobufMarkets.Trade.OrderSide.BUYSIDE) {
    return 'buy';
  } else if (side === ProtobufMarkets.Trade.OrderSide.SELLSIDE) {
    return 'sell';
  }

  return 'unknown';
}

export function privateTradeSideFromProto(side: number): OrderSide {
  if (side == 0) {
    return 'sell'
  }
  if (side == 1) {
    return 'buy'
  }

  return 'unknown'
}

export function privatePositionSideFromProto(side: number): OrderSide {
  if (side == 0) {
    return 'sell'
  }
  if (side == 1) {
    return 'buy'
  }

  return 'unknown'
}
