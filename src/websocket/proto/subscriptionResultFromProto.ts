import { ProtobufClient, ProtobufStream } from '../modules/proto';
import { SubscriptionError, SubscriptionResult } from '../types/client';

function keyFromClientSubscription(sub: ProtobufClient.ClientSubscription): string | null {
  if (sub.streamSubscription && sub.streamSubscription.resource) {
    return sub.streamSubscription.resource;
  }
  if (sub.tradeSubscription && sub.tradeSubscription.marketId) {
    return sub.tradeSubscription.marketId;
  }
  return null;
}

export function subscriptionResultFromProto(
  subResult: ProtobufStream.ISubscriptionResult | ProtobufStream.IUnsubscriptionResult
): SubscriptionResult | null {
  if (subResult.failed === null && subResult.subscriptions === null) {
    return null;
  }
  const subscriptions: string[] = [];
  const failed: SubscriptionError[] = [];
  if (subResult.failed instanceof Array) {
    subResult.failed.forEach((e) => {
      if (
        typeof e.error !== 'string' ||
        !(e.subscription instanceof ProtobufClient.ClientSubscription)
      ) {
        return null;
      }
      const sub = keyFromClientSubscription(e.subscription);
      if (sub === null) {
        return null;
      }
      failed.push({
        error: e.error,
        subscription: sub
      });
    });
  }
  return {
    subscriptions,
    failed
  };
}
