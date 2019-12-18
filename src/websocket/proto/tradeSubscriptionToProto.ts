import { ProtobufClient } from '../modules/proto';
import { TradeSubscription } from '../types/client';

export function tradeSubscriptionToProto(
  tradeSubscription: TradeSubscription
): ProtobufClient.ClientSubscription {
  let auth = null;
  if (tradeSubscription.auth) {
    auth = ProtobufClient.TradeSessionAuth.create({
      apiKey: tradeSubscription.auth.apiKey,
      apiSecret: tradeSubscription.auth.apiSecret,
      customerId: tradeSubscription.auth.customerID,
      keyPassphrase: tradeSubscription.auth.keyPassphrase
    });
  }
  return ProtobufClient.ClientSubscription.create({
    tradeSubscription: ProtobufClient.TradeSubscription.create({
      marketId: String(tradeSubscription.marketID),
      auth
    })
  });
}
