import { pairUpdateFromProto } from './pairUpdateFromProto';
import { marketUpdateFromProto } from './marketUpdateFromProto';
import { placeOrderOptToProto } from './placeOrderOptToProto';
import { privateOrderFromProto } from './privateOrderFromProto';
import { privatePositionFromProto } from './privatePositionFromProto';
import { privateTradeFromProto } from './privateTradeFromProto';
import { keyToStreamSubscription } from './keyToStreamSubscription';
import { tradeSubscriptionToProto } from './tradeSubscriptionToProto';
import { subscriptionResultFromProto } from './subscriptionResultFromProto';

const proto = {
  pairUpdateFromProto,
  marketUpdateFromProto,
  placeOrderOptToProto,
  privateOrderFromProto,
  privateTradeFromProto,
  privatePositionFromProto,
  keyToStreamSubscription,
  tradeSubscriptionToProto,
  subscriptionResultFromProto
};

export default proto;
