import crypto from 'crypto';
import { EventEmitter } from 'events';
import WebSocket from 'ws';
import {
  EventClientError,
  EventStateChange,
  EventWSAuthResult,
  EventWSData,
  StateConnected,
  StateConnecting,
  StateDisconnected,
  StateWaitingToReconnect
} from './constants';
import { ProtobufClient, ProtobufStream } from './modules/proto';
import { ReconnectOpts, WebSocketOpts } from './types/client';
import { symbolString } from '../util/helpers';
import logger from '../util/logger';
import version from '../version';
import { errConnNotReady } from './errors';

// These will be overwritten by the opts object passed to the constructor
const defaultReconnectOpts: ReconnectOpts = {
  enabled: true,
  backoff: true,
  timeout: 0,
  maxTimeout: 3
};

// Amount to increase backoff every unsuccessful reconnect attempt
const backoffIncrementSecs = 0.5;

// Generate a nonce for api authentication
function getNonce(): string {
  return String(new Date().getTime() * 1000 * 1000);
}

// Generate a token for api authentication
function getToken(key: string, secret: string, nonce: string): string {
  const hmac = crypto.createHmac('sha512', Buffer.from(secret, 'base64'));
  hmac.update(`stream_access;access_key_id=${key};nonce=${nonce};`);
  return hmac.digest('base64');
}

export default class WebSocketClient extends EventEmitter {
  // Map of subscription keys to subscription state *set in the parent class*
  // needed in WSClient for authentication
  public subscriptions: {
    [key: string]: ProtobufClient.ClientSubscription;
  };

  // Handles Websocket connection to the CW Stream service
  private conn: WebSocket | null;

  // Options to use for the connection
  private opts: WebSocketOpts;

  // The current state of the connection
  protected connState: symbol;

  // The number of seconds the client will wait before reconnecting after being disconnected.
  private reconnectTimeout: number;

  // This is used as an internal switch to enable or disable auto-reconnecting
  private reconnectDisabled: boolean;

  // Default to defaultOptions
  constructor(opts: WebSocketOpts) {
    super();
    logger.setLevel(opts.logLevel);

    if (!opts.creds.apiKey) {
      throw new Error('Missing credential apiKey');
    }
    if (!opts.creds.secretKey) {
      throw new Error('Missing credential secretKey');
    }

    // This code merges the supplied reconnect options with the default reconnect options,
    // then sets opts.reconnect to a copy (to avoid modifying defaultReconnectOpts)
    opts.reconnect = Object.assign({}, defaultReconnectOpts, opts.reconnect || {});

    // Minimum reconnect timeout without backoff is 1s
    if (!opts.reconnect.backoff && opts.reconnect.timeout < 1) {
      opts.reconnect.timeout = 1;
    }

    logger.debug('new ws conn %o', opts);

    this.on(EventWSAuthResult, (res: ProtobufStream.IAuthenticationResult) =>
      this.authResultHandler(res)
    );

    this.opts = opts;
    this.conn = null;
    this.reconnectDisabled = false;
    this.reconnectTimeout = opts.reconnect.timeout;
    this.connState = StateDisconnected;
    this.subscriptions = {};
  }

  public connect(): void {
    logger.debug('connecting to %s', this.opts.creds.url);
    this.changeState(StateConnecting);
    this.reconnectDisabled = false;
    this.conn = new WebSocket(this.opts.creds.url as string);

    this.conn.once('open', () => {
      this.authenticate();
    });

    this.conn.on('message', (data: Buffer) => {
      // Heartbeat
      // const bytes = new Uint8Array(data);
      if (data.length === 1 && data[0] === 1) {
        return;
      }
      // Emit protobuf data internally
      this.emit(EventWSData, data);
    });

    this.conn.once('error', () => {
      this.error('Connection failed');
    });

    this.conn.once('close', () => {
      this.changeState(StateDisconnected);
      if (this.opts.reconnect.enabled && !this.reconnectDisabled) {
        this.reconnect();
      }
    });
  }

  public error(e: string): void {
    logger.error(e);
    this.emit(EventClientError, e);
  }

  public onConnect(fn: () => void): void {
    this.on(StateConnected, () => fn());
  }

  public onDisconnect(fn: () => void): void {
    this.on(StateDisconnected, () => fn());
  }

  public onStateChange(fn: (s: string) => void): void {
    this.on(EventStateChange, (newState: string) => fn(newState));
  }

  public onError(fn: (e: Error) => void): void {
    this.on(EventClientError, (err) => fn(err));
  }

  public send(data: Buffer | Uint8Array): void {
    if (!this.conn) {
      throw errConnNotReady;
    }
    this.conn.send(data);
  }

  public disconnect(): void {
    if (!this.conn) {
      throw errConnNotReady;
    }
    this.reconnectDisabled = true;
    this.conn.close();
  }

  public state(): symbol {
    return this.connState;
  }

  public getSubscriptions(): ProtobufClient.ClientSubscription[] {
    const subs: ProtobufClient.ClientSubscription[] = [];
    Object.keys(this.subscriptions).forEach((key) => {
      subs.push(this.subscriptions[key]);
    });
    return subs;
  }

  private authenticate(): void {
    // The client should never supply its own nonce, this is just for tests
    const nonce = this.opts.nonce ? this.opts.nonce : getNonce();
    const authMsg = ProtobufClient.ClientMessage.create({
      apiAuthentication: ProtobufClient.APIAuthenticationMessage.create({
        apiKey: this.opts.creds.apiKey,
        clientSubscriptions: this.getSubscriptions(),
        nonce,
        source: ProtobufClient.APIAuthenticationMessage.Source.NODE_SDK,
        token: getToken(this.opts.creds.apiKey, this.opts.creds.secretKey, nonce),
        version
      })
    });
    logger.debug('sending auth message');
    this.send(ProtobufClient.ClientMessage.encode(authMsg).finish());
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private changeState(newState: symbol, extra?: any): void {
    this.connState = newState;
    if (typeof extra !== 'undefined') {
      logger.debug(symbolString(newState), extra);
      this.emit(newState, extra);
    } else {
      logger.debug('State change: %s', symbolString(newState));
      this.emit(newState);
    }
    this.emit(EventStateChange, newState);
  }

  private authResultHandler(authResult: ProtobufStream.IAuthenticationResult): void {
    switch (authResult.status) {
      case ProtobufStream.AuthenticationResult.Status.AUTHENTICATED:
        logger.debug('authenticated');
        this.changeState(StateConnected);
        break;
      case ProtobufStream.AuthenticationResult.Status.TOKEN_EXPIRED:
        this.error('Authentication failed: token is expired');
        this.disconnect();
        break;
      case ProtobufStream.AuthenticationResult.Status.BAD_NONCE:
        this.error('Authentication failed: invalid nonce');
        this.disconnect();
        break;
      case ProtobufStream.AuthenticationResult.Status.BAD_TOKEN:
        this.error('Authentication failed: invalid token');
        this.disconnect();
        break;
      case ProtobufStream.AuthenticationResult.Status.UNKNOWN:
        this.error('Authentication failed: internal error');
        this.disconnect();
        break;
      default:
        break;
    }
  }

  private reconnect(): void {
    setTimeout(() => {
      if (this.opts.reconnect.backoff) {
        this.reconnectTimeout += backoffIncrementSecs;
        if (this.reconnectTimeout > this.opts.reconnect.maxTimeout) {
          this.reconnectTimeout = this.opts.reconnect.maxTimeout;
        }
      }
      this.connect();
    }, this.reconnectTimeout * 1000);

    // This needs to be after setTimeout so tests work. This is because jest needs to run
    // the mocked timers in the state change callback.
    this.changeState(StateWaitingToReconnect, this.reconnectTimeout);
  }
}
