import {
  // IPrivateOrder,
  ProtobufBroker
} from '../modules/proto';
import { PrivatePosition } from '../types/trading';
import { getDateFromSecs } from '../../util/helpers';
import { privatePositionSideFromProto } from './sideFromProto';

export function privatePositionFromProto(
  position: ProtobufBroker.IPrivatePosition
): PrivatePosition | null {
  if (
    position.id == null ||
    position.time == null ||
    position.side == null ||
    position.avgPriceString == null ||
    position.amountOpenString == null ||
    position.amountClosedString == null ||
    !Array.isArray(position.orderIds) ||
    !Array.isArray(position.tradeIds)
  ) {
    return null;
  }
  const side = privatePositionSideFromProto(position.side);
  if (!side) {
    return null;
  }
  return {
    id: position.id,
    timestamp: getDateFromSecs(position.time),
    side,
    avgPrice: position.avgPriceString,
    amountOpen: position.amountOpenString,
    amountClosed: position.amountClosedString,
    orderIDs: position.orderIds,
    tradeIDs: position.tradeIds
  };
}
