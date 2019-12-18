import { pairUpdateFromProto } from './pairUpdateFromProto';
import { privateOrderSideFromProto } from './constants';
import { marketUpdateFromProto } from './marketUpdateFromProto';
import { periodFromInt } from './constants';
import { placeOrderOptToProto } from './placeOrderOptToProto';
import { privateOrderFromProto } from './privateOrderFromProto';
import { privatePositionFromProto } from './privatePositionFromProto';
import { privateTradeFromProto } from './privateTradeFromProto';
import { keyToStreamSubscription } from './keyToStreamSubscription';
import { tradeSubscriptionToProto } from './tradeSubscriptionToProto';
import { subscriptionResultFromProto } from './subscriptionResultFromProto';
//import { balancesFromProto } from './balancesFromProto';

const proto = {
  // balancesFromProto,
  pairUpdateFromProto,
  marketUpdateFromProto,
  periodFromInt,
  privateOrderSideFromProto,
  placeOrderOptToProto,
  privateOrderFromProto,
  privateTradeFromProto,
  privatePositionFromProto,
  keyToStreamSubscription,
  tradeSubscriptionToProto,
  subscriptionResultFromProto
};

export default proto;
