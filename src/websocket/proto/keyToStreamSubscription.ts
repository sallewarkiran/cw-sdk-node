import { ProtobufClient } from '../modules/proto';

export function keyToStreamSubscription(key: string): ProtobufClient.ClientSubscription {
  return ProtobufClient.ClientSubscription.create({
    streamSubscription: ProtobufClient.StreamSubscription.create({
      resource: key
    })
  });
}
