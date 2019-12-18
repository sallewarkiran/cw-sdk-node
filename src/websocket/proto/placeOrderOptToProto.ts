import {
  // IPrivateOrder,
  ProtobufBroker
} from '../modules/proto';
import {
  // Balance,
  // Balances,
  FundingType,
  PlaceOrderOpt
} from '../types/trading';
import { privateOrderSideToProto, orderTypeToProto, fundingTypeToProto } from './constants';
import { validateOrderType, validateMonetaryValue, validateOrderSide } from './validators';

export function placeOrderOptToProto(
  orderOpts: Partial<PlaceOrderOpt>
): ProtobufBroker.IPrivateOrder {
  if (orderOpts.type == null || !validateOrderType(orderOpts.type)) {
    throw new Error(`invalid order options: type=${orderOpts.type}`);
  }
  if (orderOpts.type === 'market' && orderOpts.price != null) {
    throw new Error('invalid market order option: price');
  }
  if (
    (orderOpts.type !== 'market' && orderOpts.price == null) ||
    (orderOpts.price != null && !validateMonetaryValue(orderOpts.price))
  ) {
    throw new Error(`invalid order options: price=${orderOpts.price}`);
  }
  if (orderOpts.amount == null || !validateMonetaryValue(orderOpts.amount)) {
    throw new Error(`invalid order options: amount=${orderOpts.amount}`);
  }
  if (orderOpts.side == null || !validateOrderSide(orderOpts.side)) {
    throw new Error(`invalid order options: side=${orderOpts.side}`);
  }
  const fundingType: FundingType = 'spot';
  // if (typeof orderOpts.fundingType === "number") {
  //   fundingType = fundingTypeFromProto[orderOpts.fundingType];
  // }
  // const leverage: string | null = null;
  // if (orderOpts.leverage !== undefined) {
  //   leverage = orderOpts.leverage;
  // }
  // const expireTime: number | null = null;
  // if (orderOpts.expireTime !== undefined) {
  //   expireTime = orderOpts.expireTime.getTime();
  // }
  const priceParams: ProtobufBroker.PrivateOrder.IPriceParam[] = [
    {
      valueString: String(orderOpts.price),
      type: ProtobufBroker.PrivateOrder.PriceParamType.AbsoluteValue
    }
  ];
  return {
    side: privateOrderSideToProto[orderOpts.side],
    type: orderTypeToProto[orderOpts.type],
    fundingType: fundingTypeToProto[fundingType],
    priceParams,
    amountParamString: String(orderOpts.amount)
    // leverage,
    // expireTime
  };
}
