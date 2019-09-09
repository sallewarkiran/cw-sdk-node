// Connection state change events
export const StateDisconnected = Symbol("disconnected");
export const StateConnecting = Symbol("connecting");
export const StateConnected = Symbol("connected");
export const StateWaitingToReconnect = Symbol("disconnected: waiting to reconnect");

// WebSocket events
export const EventClientError = Symbol("client error");
export const EventStateChange = Symbol("state change");
export const EventWSData = Symbol("websocket data");
export const EventWSAuthResult = Symbol("auth result");

// Stream Client events
export const EventMarketUpdate = Symbol("market update");
export const EventPairUpdate = Symbol("pair update");
export const EventUnsubscriptionResult = Symbol("unsubscription result");
export const EventSubscriptionResult = Symbol("subscription result");
export const DataVWAPUpdate = Symbol("vwap update");
export const DataPerformanceUpdate = Symbol("performance update");

// Trade Client
export const EventOrdersUpdate = Symbol("orders update");
export const EventTradesUpdate = Symbol("trades update");
export const EventPositionsUpdate = Symbol("positions update");
export const EventBalancesUpdate = Symbol("balances update");
