import {
  privateOrderSideToProto,
  privateOrderSideFromProto,
  orderTypeToProto,
  orderTypeFromProto
} from './constants';
import Long from 'long';

import { ProtobufBroker } from '../modules/proto';

export function validateOrderSide(s: string): boolean {
  return typeof privateOrderSideToProto[s] === 'number';
}

export function validateOrderSideProto(s: number): boolean {
  return typeof privateOrderSideFromProto[s] === 'string';
}

export function validateOrderType(t: string): boolean {
  return typeof orderTypeToProto[t] === 'number';
}

export function validateOrderTypeProto(t: ProtobufBroker.PrivateOrder.Type): boolean {
  return typeof orderTypeFromProto[t] === 'string';
}

export function validateMonetaryValue(n: string): boolean {
  return Long.fromString(n).gte(0);
}
