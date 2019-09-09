import {
  EventMarketUpdate,
  EventPairUpdate,
  EventSubscriptionResult,
  EventWSAuthResult,
  EventWSData
} from "./constants";
import { loadStreamCredentials } from "./credentials";
import {
  ProtobufClient,
  ProtobufMarkets,
  ProtobufStream
} from "./modules/proto";
import { StreamOpts } from "./types/client";
import { MarketUpdate } from "./types/markets";
import { PairUpdate } from "./types/pairs";
import logger from "./util/logger";
import proto from "./util/proto";
import WebSocketClient from "./WebSocketClient";

export class StreamClient extends WebSocketClient {
  constructor(opts: StreamOpts) {
    logger.setLevel(opts.logLevel);
    opts = loadStreamCredentials(opts);

    super(opts);

    if (Array.isArray(opts.subscriptions) && opts.subscriptions.length > 0) {
      // Keep track of subscriptions for reconnecting
      opts.subscriptions.forEach(s => {
        this.subscriptions[s] = proto.keyToStreamSubscription(s);
      });
    }

    this.on(EventWSData, (data: Buffer) => {
      try {
        this.streamMessageHandler(ProtobufStream.StreamMessage.decode(data));
      } catch (e) {
        this.error("Failed to deserialize ProtobufStream message");
      }
    });
  }

  public subscribe(keys: string[]): void {
    const subs: ProtobufClient.ClientSubscription[] = [];
    keys.forEach(k => {
      subs.push(proto.keyToStreamSubscription(k));
      this.subscriptions[k] = proto.keyToStreamSubscription(k);
    });
    const subMsg = ProtobufClient.ClientMessage.create({
      subscribe: ProtobufClient.ClientSubscribeMessage.create({
        subscriptions: subs
      })
    });
    this.send(ProtobufClient.ClientMessage.encode(subMsg).finish());
  }

  public unsubscribe(keys: string[]): void {
    const subs: ProtobufClient.ClientSubscription[] = [];
    keys.forEach(k => {
      subs.push(proto.keyToStreamSubscription(k));
      delete this.subscriptions[k];
    });
    const subMsg = ProtobufClient.ClientMessage.create({
      unsubscribe: ProtobufClient.ClientUnsubscribeMessage.create({
        subscriptions: subs
      })
    });
    this.send(ProtobufClient.ClientMessage.encode(subMsg).finish());
  }

  public onPairUpdate(fn: (m: PairUpdate) => void): void {
    this.on(
      EventPairUpdate,
      (pairUpdateProto: ProtobufMarkets.PairUpdateMessage) => {
        const pairUpdate = proto.pairUpdateFromProto(pairUpdateProto);
        if (pairUpdate) {
          fn(pairUpdate);
        }
      }
    );
  }

  public onMarketUpdate(fn: (m: MarketUpdate) => void): void {
    this.on(
      EventMarketUpdate,
      (marketUpdateProto: ProtobufMarkets.MarketUpdateMessage) => {
        const marketUpdate = proto.marketUpdateFromProto(marketUpdateProto);
        if (marketUpdate) {
          fn(marketUpdate);
        }
      }
    );
  }

  // Private message handler for incoming stream data. Messages are then passed
  // to the correct public handler
  private streamMessageHandler(message: ProtobufStream.StreamMessage): void {
    switch (message.body) {
      case "authenticationResult":
        this.emit(EventWSAuthResult, message.authenticationResult);
        break;
      case "marketUpdate":
        this.emit(EventMarketUpdate, message.marketUpdate);
        break;
      case "pairUpdate":
        this.emit(EventPairUpdate, message.pairUpdate);
        break;
      case "subscriptionResult":
        if (message.subscriptionResult) {
          this.unsubscriptionResultHandler(message.subscriptionResult);
        }
        break;
      case "unsubscriptionResult":
        if (message.unsubscriptionResult) {
          this.subscriptionResultHandler(message.unsubscriptionResult);
        }
        break;
      default:
        // unsupported type; no-op
        logger.debug("stream received unsupported proto type");
    }
  }

  private subscriptionResultHandler(
    subResultProto: ProtobufStream.ISubscriptionResult
  ) {
    const subResult = proto.subscriptionResultFromProto(subResultProto);
    if (subResult === null) {
      return;
    }

    if (subResult.failed.length > 0) {
      subResult.failed.forEach(e => {
        this.error(`subscribe failed for "${e.subscription}": ${e.error}`);
      });
    }

    this.emit(EventSubscriptionResult, subResult);
  }

  private unsubscriptionResultHandler(
    unsubResultProto: ProtobufStream.IUnsubscriptionResult
  ) {
    const unsubResult = proto.subscriptionResultFromProto(unsubResultProto);
    if (!unsubResult) {
      return;
    }

    if (unsubResult.failed.length > 0) {
      unsubResult.failed.forEach(e => {
        this.error(`unsubscribe failed for ${e.subscription}: ${e.error}`);
      });
    }
  }
}
