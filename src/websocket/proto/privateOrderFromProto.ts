import {
  // IPrivateOrder,
  ProtobufBroker
} from '../modules/proto';
import { FundingType, PrivateOrder } from '../types/trading';
import { getDateFromSecs } from '../../util/helpers';
import logger from '../../util/logger';
import { validateOrderTypeProto, validateOrderSideProto } from './validators';
import { fundingTypeFromProto, privateOrderSideFromProto, orderTypeFromProto } from './constants';

export function privateOrderFromProto(
  privateOrder: ProtobufBroker.IPrivateOrder
): PrivateOrder | null {
  if (
    !privateOrder.priceParams ||
    !privateOrder.amountParamString ||
    privateOrder.type == null ||
    !validateOrderTypeProto(privateOrder.type) ||
    privateOrder.side == null ||
    !validateOrderSideProto(privateOrder.side)
  ) {
    logger.error('failed to parse private order %o', privateOrder);
    return null;
  }
  if (
    !Array.isArray(privateOrder.priceParams) ||
    privateOrder.priceParams.length < 1 ||
    !privateOrder.priceParams[0].valueString
  ) {
    return null;
  }
  if (privateOrder.amountFilledString === '') {
    privateOrder.amountFilledString = '0.0';
  }
  let fundingType: FundingType = 'spot';
  if (typeof privateOrder.fundingType === 'number') {
    fundingType = fundingTypeFromProto[privateOrder.fundingType];
  }
  const id = privateOrder.id;
  if (id == null || id.length === 0) {
    return null;
  }
  if (privateOrder.time == null || privateOrder.time === 0) {
    return null;
  }
  const timestamp = getDateFromSecs(privateOrder.time);
  let expireTime;
  if (typeof privateOrder.expireTime === 'number' && privateOrder.expireTime > 0) {
    expireTime = getDateFromSecs(privateOrder.expireTime);
  }
  // let leverage = 0;
  // if (privateOrder.leverage) {
  //   leverage = parseFloat(privateOrder.leverage);
  // }
  // let currentStop;
  // if (privateOrder.currentStopString) {
  //   currentStop = privateOrder.currentStopString;
  // }
  // let initialStop;
  // if (privateOrder.initialStopString) {
  //   initialStop = privateOrder.initialStopString;
  // }

  return {
    price: privateOrder.priceParams[0].valueString,
    amount: privateOrder.amountParamString,
    side: privateOrderSideFromProto[privateOrder.side],
    type: orderTypeFromProto[privateOrder.type],
    fundingType,
    id,
    timestamp,
    expireTime,
    // leverage,
    // currentStop,
    // initialStop,
    amountFilled: privateOrder.amountFilledString || '0'
  };
}
