import {
  // IPrivateOrder,
  ProtobufBroker
} from '../modules/proto';
import { PrivateTrade } from '../types/trading';
import { getDateFromMs, getDateFromSecs } from '../../util/helpers';
import { sideFromProto } from './sideFromProto';

export function privateTradeFromProto(trade: ProtobufBroker.IPrivateTrade): PrivateTrade | null {
  if (
    trade.id == null ||
    trade.externalId == null ||
    trade.orderId == null ||
    trade.side == null ||
    !trade.priceString ||
    !trade.amountString
  ) {
    return null;
  }
  let d: Date;
  if (trade.timeMillis && trade.timeMillis > 0) {
    d = getDateFromMs(trade.timeMillis);
  } else if (trade.time != null) {
    d = getDateFromSecs(trade.time);
  } else {
    return null;
  }
  const side = sideFromProto(trade.side);
  if (!side) {
    return null;
  }
  return {
    id: trade.externalId,
    orderID: trade.orderId,
    timestamp: d,
    side,
    price: trade.priceString,
    amount: trade.amountString
  };
}
