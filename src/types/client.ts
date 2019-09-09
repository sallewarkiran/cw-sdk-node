export type LogLevel = "debug" | "info" | "warn" | "error" | "disabled";

export interface WebSocketOpts {
  // Settings for authenticating (api key, secret key, endpoint)
  creds: Credentials;

  // Settings for how the client should reconnect if disconnected. This object has a default
  // value which can be overwritten by passing arguments.
  reconnect: ReconnectOpts;

  logLevel?: LogLevel;

  // Used for testing token generation, the client doesn't
  // need to generate this
  nonce?: string;
}

export interface Credentials {
  // apiKey and secretKey are both required. Obtain from https://cryptowat.ch/account/stream-api
  // These defaults will be overwritten by environment variables CW_API_KEY and CW_SECRET_KEY,
  // and environment variables will be overwritten by settings passed to the constructor.
  apiKey: string;
  secretKey: string;
  url: string;
}

export type CredentialsType = "stream" | "trade";

export interface ReconnectOpts {
  // Whether the client should reconnect automatically
  enabled: boolean;

  // Reconnection backoff: if true, then the reconnection time will initially
  // be `timeout`, then will increment by 0.5s with each unsuccessful attempt.
  // It will not exceed maxTimeout.
  backoff: boolean;

  // Initial reconnect timeout (seconds); a minimum of 1 will be used if backoff=false
  timeout: number;

  // The maximum amount of time between reconnect tries (applies to backoff)
  maxTimeout: number;
}

export interface StreamOpts extends WebSocketOpts {
  subscriptions?: string[];
}

export interface TradeOpts extends WebSocketOpts {
  tradeSubscriptions: TradeSubscription[];
}

export interface TradeSubscription {
  marketID: string;
  auth?: TradeSessionAuth;
}

export interface TradeSessionAuth {
  apiKey: string;
  apiSecret: string;
  customerID?: string;
  keyPassphrase?: string;
}

export interface SubscriptionResult {
  subscriptions: string[];
  failed: SubscriptionError[];
}

export interface SubscriptionError {
  subscription: string;
  error: string;
}
