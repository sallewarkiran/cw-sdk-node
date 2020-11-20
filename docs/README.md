[cw-sdk-node - v1.0.0-beta.8](README.md)

# cw-sdk-node - v1.0.0-beta.8

## Index

### Classes

* [OrderBook](classes/orderbook.md)
* [OrderBookWatcher](classes/orderbookwatcher.md)
* [RESTClient](classes/restclient.md)
* [RestError](classes/resterror.md)
* [SessionTracker](classes/sessiontracker.md)
* [SnapshotRetriever](classes/snapshotretriever.md)
* [StreamClient](classes/streamclient.md)
* [TradeClient](classes/tradeclient.md)
* [Updater](classes/updater.md)
* [WebSocketClient](classes/websocketclient.md)

### Interfaces

* [BrokerResponse](interfaces/brokerresponse.md)
* [CancelOrderOpts](interfaces/cancelorderopts.md)
* [CancelOrderResult](interfaces/cancelorderresult.md)
* [Credentials](interfaces/credentials.md)
* [Interval](interfaces/interval.md)
* [MarketUpdate](interfaces/marketupdate.md)
* [OHLC](interfaces/ohlc.md)
* [OrderBookDelta](interfaces/orderbookdelta.md)
* [OrderBookSnapshot](interfaces/orderbooksnapshot.md)
* [OrderBookSpread](interfaces/orderbookspread.md)
* [OrderDeltas](interfaces/orderdeltas.md)
* [Pair](interfaces/pair.md)
* [PairUpdate](interfaces/pairupdate.md)
* [PerformanceUpdate](interfaces/performanceupdate.md)
* [PlaceOrderOpt](interfaces/placeorderopt.md)
* [PriceParam](interfaces/priceparam.md)
* [PrivateOrder](interfaces/privateorder.md)
* [PrivatePosition](interfaces/privateposition.md)
* [PrivateTrade](interfaces/privatetrade.md)
* [PublicOrder](interfaces/publicorder.md)
* [PublicTrade](interfaces/publictrade.md)
* [RESTAllowance](interfaces/restallowance.md)
* [RESTErrorBody](interfaces/resterrorbody.md)
* [RESTOpts](interfaces/restopts.md)
* [RESTResponse](interfaces/restresponse.md)
* [ReconnectOpts](interfaces/reconnectopts.md)
* [Sparkline](interfaces/sparkline.md)
* [StreamOpts](interfaces/streamopts.md)
* [SubscriptionError](interfaces/subscriptionerror.md)
* [SubscriptionResult](interfaces/subscriptionresult.md)
* [Summary](interfaces/summary.md)
* [TradeOpts](interfaces/tradeopts.md)
* [TradeSessionAuth](interfaces/tradesessionauth.md)
* [TradeSubscription](interfaces/tradesubscription.md)
* [TrendlineUpdate](interfaces/trendlineupdate.md)
* [VWAPUpdate](interfaces/vwapupdate.md)
* [WebSocketOpts](interfaces/websocketopts.md)

### Type aliases

* [Asset](README.md#asset)
* [AssetBrief](README.md#assetbrief)
* [AssetDetails](README.md#assetdetails)
* [BrokerRequest](README.md#brokerrequest)
* [CandleData](README.md#candledata)
* [CandleDataRaw](README.md#candledataraw)
* [ChangeSummary](README.md#changesummary)
* [CredentialsType](README.md#credentialstype)
* [DeltaItem](README.md#deltaitem)
* [Exchange](README.md#exchange)
* [ExchangeBrief](README.md#exchangebrief)
* [ExchangeDescription](README.md#exchangedescription)
* [FundingType](README.md#fundingtype)
* [Instrument](README.md#instrument)
* [LiquiditySide](README.md#liquidityside)
* [LogLevel](README.md#loglevel)
* [Market](README.md#market)
* [MarketBrief](README.md#marketbrief)
* [MarketDescription](README.md#marketdescription)
* [MarketOHLC](README.md#marketohlc)
* [MarketOHLCRaw](README.md#marketohlcraw)
* [MarketOrderBookLiquidity](README.md#marketorderbookliquidity)
* [MarketSelector](README.md#marketselector)
* [MarketSymbol](README.md#marketsymbol)
* [OHLCOptions](README.md#ohlcoptions)
* [OrderBookSnapshotRaw](README.md#orderbooksnapshotraw)
* [OrderBookState](README.md#orderbookstate)
* [OrderSide](README.md#orderside)
* [OrderType](README.md#ordertype)
* [PairBrief](README.md#pairbrief)
* [PairDetails](README.md#pairdetails)
* [Period](README.md#period)
* [Price](README.md#price)
* [PriceSummary](README.md#pricesummary)
* [Prices](README.md#prices)
* [PublicOrderRaw](README.md#publicorderraw)
* [Summaries](README.md#summaries)
* [Trade](README.md#trade)
* [TradeRaw](README.md#traderaw)

### Variables

* [DataPerformanceUpdate](README.md#const-dataperformanceupdate)
* [DataVWAPUpdate](README.md#const-datavwapupdate)
* [EventBalancesUpdate](README.md#const-eventbalancesupdate)
* [EventClientError](README.md#const-eventclienterror)
* [EventMarketUpdate](README.md#const-eventmarketupdate)
* [EventOrdersUpdate](README.md#const-eventordersupdate)
* [EventPairUpdate](README.md#const-eventpairupdate)
* [EventPositionsUpdate](README.md#const-eventpositionsupdate)
* [EventStateChange](README.md#const-eventstatechange)
* [EventSubscriptionResult](README.md#const-eventsubscriptionresult)
* [EventTradesUpdate](README.md#const-eventtradesupdate)
* [EventUnsubscriptionResult](README.md#const-eventunsubscriptionresult)
* [EventWSAuthResult](README.md#const-eventwsauthresult)
* [EventWSData](README.md#const-eventwsdata)
* [StateConnected](README.md#const-stateconnected)
* [StateConnecting](README.md#const-stateconnecting)
* [StateDisconnected](README.md#const-statedisconnected)
* [StateWaitingToReconnect](README.md#const-statewaitingtoreconnect)
* [errCancelOrderBadResponse](README.md#const-errcancelorderbadresponse)
* [errConnNotReady](README.md#const-errconnnotready)
* [errNotInitialized](README.md#const-errnotinitialized)
* [errPlaceOrderBadResponse](README.md#const-errplaceorderbadresponse)
* [fundingTypeFromProto](README.md#const-fundingtypefromproto)
* [fundingTypeToProto](README.md#const-fundingtypetoproto)
* [orderTypeFromProto](README.md#const-ordertypefromproto)
* [orderTypeToProto](README.md#const-ordertypetoproto)
* [periodNames](README.md#const-periodnames)
* [privateOrderSideFromProto](README.md#const-privateordersidefromproto)
* [privateOrderSideToProto](README.md#const-privateordersidetoproto)

### Functions

* [binarySearchOrders](README.md#binarysearchorders)
* [createOrderBookWatcher](README.md#createorderbookwatcher)
* [getDateFromMs](README.md#getdatefromms)
* [getDateFromNs](README.md#getdatefromns)
* [getDateFromSecs](README.md#getdatefromsecs)
* [getNumber](README.md#getnumber)
* [getString](README.md#getstring)
* [guardIsLong](README.md#guardislong)
* [keyToStreamSubscription](README.md#keytostreamsubscription)
* [loadRESTCredentials](README.md#loadrestcredentials)
* [loadStreamCredentials](README.md#loadstreamcredentials)
* [loadTradeCredentials](README.md#loadtradecredentials)
* [marketUpdateFromProto](README.md#marketupdatefromproto)
* [pairUpdateFromProto](README.md#pairupdatefromproto)
* [placeOrderOptToProto](README.md#placeorderopttoproto)
* [privateOrderFromProto](README.md#privateorderfromproto)
* [privatePositionFromProto](README.md#privatepositionfromproto)
* [privatePositionSideFromProto](README.md#privatepositionsidefromproto)
* [privateTradeFromProto](README.md#privatetradefromproto)
* [privateTradeSideFromProto](README.md#privatetradesidefromproto)
* [publicTradeSideFromProto](README.md#publictradesidefromproto)
* [sortDeltaItems](README.md#sortdeltaitems)
* [subscriptionResultFromProto](README.md#subscriptionresultfromproto)
* [symbolString](README.md#symbolstring)
* [tradeSubscriptionToProto](README.md#tradesubscriptiontoproto)
* [transformSnapshot](README.md#transformsnapshot)
* [validateMonetaryValue](README.md#validatemonetaryvalue)
* [validateOrderSide](README.md#validateorderside)
* [validateOrderSideProto](README.md#validateordersideproto)
* [validateOrderType](README.md#validateordertype)
* [validateOrderTypeProto](README.md#validateordertypeproto)

## Type aliases

###  Asset

Ƭ **Asset**: *object*

*Defined in [src/util/types/shared.ts:47](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/util/types/shared.ts#L47)*

#### Type declaration:

___

###  AssetBrief

Ƭ **AssetBrief**: *Brief‹AssetBase›*

*Defined in [src/rest/types/data.ts:32](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/rest/types/data.ts#L32)*

___

###  AssetDetails

Ƭ **AssetDetails**: *AssetBase & object*

*Defined in [src/rest/types/data.ts:33](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/rest/types/data.ts#L33)*

___

###  BrokerRequest

Ƭ **BrokerRequest**: *PlaceOrderRequest | CancelOrderRequest*

*Defined in [src/websocket/types/trading.ts:70](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/types/trading.ts#L70)*

___

###  CandleData

Ƭ **CandleData**: *object*

*Defined in [src/rest/types/data.ts:138](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/rest/types/data.ts#L138)*

#### Type declaration:

___

###  CandleDataRaw

Ƭ **CandleDataRaw**: *[number, number, number, number, number, number, number]*

*Defined in [src/rest/types/data.ts:137](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/rest/types/data.ts#L137)*

CandleData is an array of numbers in this order:
[ CloseTime, OpenPrice, HighPrice, LowPrice, ClosePrice, Volume, QuoteVolume ]

___

###  ChangeSummary

Ƭ **ChangeSummary**: *object*

*Defined in [src/rest/types/data.ts:61](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/rest/types/data.ts#L61)*

#### Type declaration:

___

###  CredentialsType

Ƭ **CredentialsType**: *"stream" | "trade" | "REST"*

*Defined in [src/util/types/credentials.ts:11](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/util/types/credentials.ts#L11)*

___

###  DeltaItem

Ƭ **DeltaItem**: *object*

*Defined in [src/util/types/shared.ts:52](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/util/types/shared.ts#L52)*

#### Type declaration:

___

###  Exchange

Ƭ **Exchange**: *object*

*Defined in [src/util/types/shared.ts:36](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/util/types/shared.ts#L36)*

#### Type declaration:

___

###  ExchangeBrief

Ƭ **ExchangeBrief**: *Brief‹ExchangeBase›*

*Defined in [src/rest/types/data.ts:52](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/rest/types/data.ts#L52)*

___

###  ExchangeDescription

Ƭ **ExchangeDescription**: *Description‹ExchangeBase›*

*Defined in [src/rest/types/data.ts:51](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/rest/types/data.ts#L51)*

___

###  FundingType

Ƭ **FundingType**: *"spot" | "margin"*

*Defined in [src/websocket/types/trading.ts:28](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/types/trading.ts#L28)*

___

###  Instrument

Ƭ **Instrument**: *object*

*Defined in [src/util/types/shared.ts:30](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/util/types/shared.ts#L30)*

#### Type declaration:

___

###  LiquiditySide

Ƭ **LiquiditySide**: *object*

*Defined in [src/rest/types/data.ts:119](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/rest/types/data.ts#L119)*

#### Type declaration:

___

###  LogLevel

Ƭ **LogLevel**: *"debug" | "info" | "warn" | "error" | "disabled"*

*Defined in [src/util/logger.ts:4](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/util/logger.ts#L4)*

___

###  Market

Ƭ **Market**: *object*

*Defined in [src/util/types/shared.ts:41](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/util/types/shared.ts#L41)*

*Defined in [src/websocket/types/markets.ts:15](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/types/markets.ts#L15)*

#### Type declaration:

###  currencyPairID

• **currencyPairID**: *number*

*Defined in [src/websocket/types/markets.ts:18](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/types/markets.ts#L18)*

###  exchangeID

• **exchangeID**: *number*

*Defined in [src/websocket/types/markets.ts:17](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/types/markets.ts#L17)*

###  id

• **id**: *number*

*Defined in [src/websocket/types/markets.ts:16](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/types/markets.ts#L16)*

___

###  MarketBrief

Ƭ **MarketBrief**: *Brief‹MarketBase›*

*Defined in [src/rest/types/data.ts:55](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/rest/types/data.ts#L55)*

___

###  MarketDescription

Ƭ **MarketDescription**: *Description‹MarketBase›*

*Defined in [src/rest/types/data.ts:54](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/rest/types/data.ts#L54)*

___

###  MarketOHLC

Ƭ **MarketOHLC**: *object*

*Defined in [src/rest/types/data.ts:152](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/rest/types/data.ts#L152)*

#### Type declaration:

___

###  MarketOHLCRaw

Ƭ **MarketOHLCRaw**: *object*

*Defined in [src/rest/types/data.ts:148](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/rest/types/data.ts#L148)*

#### Type declaration:

___

###  MarketOrderBookLiquidity

Ƭ **MarketOrderBookLiquidity**: *object*

*Defined in [src/rest/types/data.ts:128](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/rest/types/data.ts#L128)*

#### Type declaration:

___

###  MarketSelector

Ƭ **MarketSelector**: *[MarketSymbol](README.md#marketsymbol) | number*

*Defined in [src/util/types/shared.ts:65](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/util/types/shared.ts#L65)*

___

###  MarketSymbol

Ƭ **MarketSymbol**: *object*

*Defined in [src/util/types/shared.ts:59](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/util/types/shared.ts#L59)*

#### Type declaration:

___

###  OHLCOptions

Ƭ **OHLCOptions**: *object*

*Defined in [src/rest/types/data.ts:164](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/rest/types/data.ts#L164)*

#### Type declaration:

___

###  OrderBookSnapshotRaw

Ƭ **OrderBookSnapshotRaw**: *object*

*Defined in [src/rest/types/data.ts:85](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/rest/types/data.ts#L85)*

#### Type declaration:

___

###  OrderBookState

Ƭ **OrderBookState**: *object*

*Defined in [src/util/types/shared.ts:7](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/util/types/shared.ts#L7)*

#### Type declaration:

___

###  OrderSide

Ƭ **OrderSide**: *"buy" | "sell" | "unknown"*

*Defined in [src/websocket/types/trading.ts:26](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/types/trading.ts#L26)*

___

###  OrderType

Ƭ **OrderType**: *"market" | "limit"*

*Defined in [src/websocket/types/trading.ts:30](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/types/trading.ts#L30)*

___

###  PairBrief

Ƭ **PairBrief**: *object*

*Defined in [src/rest/types/data.ts:40](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/rest/types/data.ts#L40)*

#### Type declaration:

___

###  PairDetails

Ƭ **PairDetails**: *[PairBrief](README.md#pairbrief) & object*

*Defined in [src/rest/types/data.ts:47](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/rest/types/data.ts#L47)*

___

###  Period

Ƭ **Period**: *"1m" | "3m" | "5m" | "15m" | "30m" | "1h" | "2h" | "4h" | "6h" | "12h" | "1d" | "3d" | "1w_Thursday" | "1w_Monday"*

*Defined in [src/rest/types/data.ts:103](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/rest/types/data.ts#L103)*

___

###  Price

Ƭ **Price**: *object*

*Defined in [src/rest/types/data.ts:57](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/rest/types/data.ts#L57)*

#### Type declaration:

___

###  PriceSummary

Ƭ **PriceSummary**: *object*

*Defined in [src/rest/types/data.ts:66](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/rest/types/data.ts#L66)*

#### Type declaration:

___

###  Prices

Ƭ **Prices**: *object*

*Defined in [src/rest/types/data.ts:156](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/rest/types/data.ts#L156)*

#### Type declaration:

* \[ **marketSymbol**: *string*\]: number

___

###  PublicOrderRaw

Ƭ **PublicOrderRaw**: *[number, number]*

*Defined in [src/rest/types/data.ts:83](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/rest/types/data.ts#L83)*

PublicOrders are arrays of numbers in this order:
[ Price, Amount ]

___

###  Summaries

Ƭ **Summaries**: *object*

*Defined in [src/rest/types/data.ts:160](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/rest/types/data.ts#L160)*

#### Type declaration:

* \[ **marketSymbol**: *string*\]: [Summary](interfaces/summary.md)

___

###  Trade

Ƭ **Trade**: *object*

*Defined in [src/rest/types/data.ts:96](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/rest/types/data.ts#L96)*

#### Type declaration:

___

###  TradeRaw

Ƭ **TradeRaw**: *[number, number, number, number]*

*Defined in [src/rest/types/data.ts:95](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/rest/types/data.ts#L95)*

Trades are arrays of numbers in this order:
[ ID, Timestamp, Price, Amount ]

## Variables

### `Const` DataPerformanceUpdate

• **DataPerformanceUpdate**: *unique symbol* =  Symbol('performance update')

*Defined in [src/websocket/constants.ts:19](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/constants.ts#L19)*

___

### `Const` DataVWAPUpdate

• **DataVWAPUpdate**: *unique symbol* =  Symbol('vwap update')

*Defined in [src/websocket/constants.ts:18](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/constants.ts#L18)*

___

### `Const` EventBalancesUpdate

• **EventBalancesUpdate**: *unique symbol* =  Symbol('balances update')

*Defined in [src/websocket/constants.ts:25](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/constants.ts#L25)*

___

### `Const` EventClientError

• **EventClientError**: *unique symbol* =  Symbol('client error')

*Defined in [src/websocket/constants.ts:8](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/constants.ts#L8)*

___

### `Const` EventMarketUpdate

• **EventMarketUpdate**: *unique symbol* =  Symbol('market update')

*Defined in [src/websocket/constants.ts:14](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/constants.ts#L14)*

___

### `Const` EventOrdersUpdate

• **EventOrdersUpdate**: *unique symbol* =  Symbol('orders update')

*Defined in [src/websocket/constants.ts:22](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/constants.ts#L22)*

___

### `Const` EventPairUpdate

• **EventPairUpdate**: *unique symbol* =  Symbol('pair update')

*Defined in [src/websocket/constants.ts:15](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/constants.ts#L15)*

___

### `Const` EventPositionsUpdate

• **EventPositionsUpdate**: *unique symbol* =  Symbol('positions update')

*Defined in [src/websocket/constants.ts:24](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/constants.ts#L24)*

___

### `Const` EventStateChange

• **EventStateChange**: *unique symbol* =  Symbol('state change')

*Defined in [src/websocket/constants.ts:9](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/constants.ts#L9)*

___

### `Const` EventSubscriptionResult

• **EventSubscriptionResult**: *unique symbol* =  Symbol('subscription result')

*Defined in [src/websocket/constants.ts:17](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/constants.ts#L17)*

___

### `Const` EventTradesUpdate

• **EventTradesUpdate**: *unique symbol* =  Symbol('trades update')

*Defined in [src/websocket/constants.ts:23](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/constants.ts#L23)*

___

### `Const` EventUnsubscriptionResult

• **EventUnsubscriptionResult**: *unique symbol* =  Symbol('unsubscription result')

*Defined in [src/websocket/constants.ts:16](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/constants.ts#L16)*

___

### `Const` EventWSAuthResult

• **EventWSAuthResult**: *unique symbol* =  Symbol('auth result')

*Defined in [src/websocket/constants.ts:11](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/constants.ts#L11)*

___

### `Const` EventWSData

• **EventWSData**: *unique symbol* =  Symbol('websocket data')

*Defined in [src/websocket/constants.ts:10](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/constants.ts#L10)*

___

### `Const` StateConnected

• **StateConnected**: *unique symbol* =  Symbol('connected')

*Defined in [src/websocket/constants.ts:4](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/constants.ts#L4)*

___

### `Const` StateConnecting

• **StateConnecting**: *unique symbol* =  Symbol('connecting')

*Defined in [src/websocket/constants.ts:3](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/constants.ts#L3)*

___

### `Const` StateDisconnected

• **StateDisconnected**: *unique symbol* =  Symbol('disconnected')

*Defined in [src/websocket/constants.ts:2](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/constants.ts#L2)*

___

### `Const` StateWaitingToReconnect

• **StateWaitingToReconnect**: *unique symbol* =  Symbol('disconnected: waiting to reconnect')

*Defined in [src/websocket/constants.ts:5](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/constants.ts#L5)*

___

### `Const` errCancelOrderBadResponse

• **errCancelOrderBadResponse**: *Error* =  new Error('cancel order failed: bad response')

*Defined in [src/websocket/errors.ts:5](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/errors.ts#L5)*

___

### `Const` errConnNotReady

• **errConnNotReady**: *Error* =  new Error(
  "Connection not ready. Did you forget to call 'connect()'?"
)

*Defined in [src/websocket/errors.ts:8](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/errors.ts#L8)*

___

### `Const` errNotInitialized

• **errNotInitialized**: *Error* =  new Error(
  'Trading is not yet initialized. Did you wait for onReady()?'
)

*Defined in [src/websocket/errors.ts:1](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/errors.ts#L1)*

___

### `Const` errPlaceOrderBadResponse

• **errPlaceOrderBadResponse**: *Error* =  new Error('place order failed: bad response')

*Defined in [src/websocket/errors.ts:4](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/errors.ts#L4)*

___

### `Const` fundingTypeFromProto

• **fundingTypeFromProto**: *object* =  {
  0: 'spot',
  1: 'margin'
} as const

*Defined in [src/websocket/proto/constants.ts:15](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/proto/constants.ts#L15)*

#### Type declaration:

* \[ **key**: *number*\]: [FundingType](README.md#fundingtype)

___

### `Const` fundingTypeToProto

• **fundingTypeToProto**: *object* =  {
  spot: 0,
  margin: 1
} as const

*Defined in [src/websocket/proto/constants.ts:20](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/proto/constants.ts#L20)*

#### Type declaration:

* \[ **key**: *string*\]: number

___

### `Const` orderTypeFromProto

• **orderTypeFromProto**: *object* =  {
  0: 'market',
  1: 'limit'
  // 2: "stoploss",
  // 3: "stoplosslimit",
  // 4: "takeprofit",
  // 5: "takeprofitlimit",
  // 6: "stoplosstakeprofit",
  // 7: "stoplosstakeprofitlimit",
  // 8: "trailingstoploss",
  // 9: "trailingstoplosslimit",
  // 10: "stoplossandlimit",
  // 11: "fillorkill",
  // 12: "settleposition"
} as const

*Defined in [src/websocket/proto/constants.ts:25](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/proto/constants.ts#L25)*

#### Type declaration:

* \[ **key**: *number*\]: [OrderType](README.md#ordertype)

___

### `Const` orderTypeToProto

• **orderTypeToProto**: *object* =  {
  market: 0,
  limit: 1
  // stoploss: 2,
  // stoplosslimit: 3,
  // takeprofit: 4,
  // takeprofitlimit: 5,
  // stoplosstakeprofit: 6,
  // stoplosstakeprofitlimit: 7,
  // trailingstoploss: 8,
  // trailingstoplosslimit: 9,
  // stoplossandlimit: 10,
  // fillorkill: 11,
  // settleposition: 12
} as const

*Defined in [src/websocket/proto/constants.ts:41](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/proto/constants.ts#L41)*

#### Type declaration:

* \[ **key**: *string*\]: number

___

### `Const` periodNames

• **periodNames**: *object* =  {
  '60': '1m',
  '180': '3m',
  '300': '5m',
  '900': '15m',
  '1800': '30m',
  '3600': '1h',
  '7200': '2h',
  '14400': '4h',
  '21600': '6h',
  '43200': '12h',
  '86400': '1d',
  '259200': '3d',
  '604800': '1w_Thursday',
  '604800_Monday': '1w_Monday'
} as const

*Defined in [src/websocket/proto/constants.ts:57](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/proto/constants.ts#L57)*

#### Type declaration:

* \[ **key**: *string*\]: [Period](README.md#period)

___

### `Const` privateOrderSideFromProto

• **privateOrderSideFromProto**: *object* =  {
  0: 'sell',
  1: 'buy'
} as const

*Defined in [src/websocket/proto/constants.ts:5](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/proto/constants.ts#L5)*

#### Type declaration:

* \[ **key**: *number*\]: [OrderSide](README.md#orderside)

___

### `Const` privateOrderSideToProto

• **privateOrderSideToProto**: *object* =  {
  sell: 0,
  buy: 1
} as const

*Defined in [src/websocket/proto/constants.ts:10](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/proto/constants.ts#L10)*

#### Type declaration:

* \[ **key**: *string*\]: number

## Functions

###  binarySearchOrders

▸ **binarySearchOrders**(`orders`: [PublicOrder](interfaces/publicorder.md)[], `price`: string, `startIndex`: number, `reverse`: boolean): *object*

*Defined in [src/util/helpers.ts:68](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/util/helpers.ts#L68)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`orders` | [PublicOrder](interfaces/publicorder.md)[] | - |
`price` | string | - |
`startIndex` | number | - |
`reverse` | boolean | false |

**Returns:** *object*

___

###  createOrderBookWatcher

▸ **createOrderBookWatcher**(`marketSelector`: [MarketSelector](README.md#marketselector), `streamClient`: [StreamClient](classes/streamclient.md), `restClient`: [RESTClient](classes/restclient.md)): *Promise‹[OrderBookWatcher](classes/orderbookwatcher.md)›*

*Defined in [src/orderbook/index.ts:8](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/orderbook/index.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`marketSelector` | [MarketSelector](README.md#marketselector) |
`streamClient` | [StreamClient](classes/streamclient.md) |
`restClient` | [RESTClient](classes/restclient.md) |

**Returns:** *Promise‹[OrderBookWatcher](classes/orderbookwatcher.md)›*

___

###  getDateFromMs

▸ **getDateFromMs**(`n`: number | Long): *Date*

*Defined in [src/util/helpers.ts:22](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/util/helpers.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | number &#124; Long |

**Returns:** *Date*

___

###  getDateFromNs

▸ **getDateFromNs**(`n`: number | Long): *Date*

*Defined in [src/util/helpers.ts:26](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/util/helpers.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | number &#124; Long |

**Returns:** *Date*

___

###  getDateFromSecs

▸ **getDateFromSecs**(`n`: number | Long): *Date*

*Defined in [src/util/helpers.ts:18](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/util/helpers.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | number &#124; Long |

**Returns:** *Date*

___

###  getNumber

▸ **getNumber**(`n`: number | Long): *number*

*Defined in [src/util/helpers.ts:10](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/util/helpers.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | number &#124; Long |

**Returns:** *number*

___

###  getString

▸ **getString**(`n`: number | Long): *string*

*Defined in [src/util/helpers.ts:14](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/util/helpers.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | number &#124; Long |

**Returns:** *string*

___

###  guardIsLong

▸ **guardIsLong**(`value`: number | Long): *value is Long*

*Defined in [src/util/helpers.ts:6](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/util/helpers.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number &#124; Long |

**Returns:** *value is Long*

___

###  keyToStreamSubscription

▸ **keyToStreamSubscription**(`key`: string): *ClientSubscription*

*Defined in [src/websocket/proto/keyToStreamSubscription.ts:3](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/proto/keyToStreamSubscription.ts#L3)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *ClientSubscription*

___

###  loadRESTCredentials

▸ **loadRESTCredentials**(`opts?`: Partial‹[RESTOpts](interfaces/restopts.md)›): *object*

*Defined in [src/util/credentials.ts:102](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/util/credentials.ts#L102)*

**Parameters:**

Name | Type |
------ | ------ |
`opts?` | Partial‹[RESTOpts](interfaces/restopts.md)› |

**Returns:** *object*

___

###  loadStreamCredentials

▸ **loadStreamCredentials**(`opts`: Partial‹[StreamOpts](interfaces/streamopts.md)›): *[StreamOpts](interfaces/streamopts.md)*

*Defined in [src/util/credentials.ts:58](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/util/credentials.ts#L58)*

**Parameters:**

Name | Type |
------ | ------ |
`opts` | Partial‹[StreamOpts](interfaces/streamopts.md)› |

**Returns:** *[StreamOpts](interfaces/streamopts.md)*

___

###  loadTradeCredentials

▸ **loadTradeCredentials**(`opts`: Partial‹[TradeOpts](interfaces/tradeopts.md)›): *[TradeOpts](interfaces/tradeopts.md)*

*Defined in [src/util/credentials.ts:80](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/util/credentials.ts#L80)*

**Parameters:**

Name | Type |
------ | ------ |
`opts` | Partial‹[TradeOpts](interfaces/tradeopts.md)› |

**Returns:** *[TradeOpts](interfaces/tradeopts.md)*

___

###  marketUpdateFromProto

▸ **marketUpdateFromProto**(`marketUpdate`: MarketUpdateMessage): *[MarketUpdate](interfaces/marketupdate.md) | null*

*Defined in [src/websocket/proto/marketUpdateFromProto.ts:276](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/proto/marketUpdateFromProto.ts#L276)*

**Parameters:**

Name | Type |
------ | ------ |
`marketUpdate` | MarketUpdateMessage |

**Returns:** *[MarketUpdate](interfaces/marketupdate.md) | null*

___

###  pairUpdateFromProto

▸ **pairUpdateFromProto**(`pairUpdate`: IPairUpdateMessage | null | undefined): *[PairUpdate](interfaces/pairupdate.md) | null*

*Defined in [src/websocket/proto/pairUpdateFromProto.ts:5](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/proto/pairUpdateFromProto.ts#L5)*

**Parameters:**

Name | Type |
------ | ------ |
`pairUpdate` | IPairUpdateMessage &#124; null &#124; undefined |

**Returns:** *[PairUpdate](interfaces/pairupdate.md) | null*

___

###  placeOrderOptToProto

▸ **placeOrderOptToProto**(`orderOpts`: Partial‹[PlaceOrderOpt](interfaces/placeorderopt.md)›): *IPrivateOrder*

*Defined in [src/websocket/proto/placeOrderOptToProto.ts:14](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/proto/placeOrderOptToProto.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`orderOpts` | Partial‹[PlaceOrderOpt](interfaces/placeorderopt.md)› |

**Returns:** *IPrivateOrder*

___

###  privateOrderFromProto

▸ **privateOrderFromProto**(`privateOrder`: IPrivateOrder): *[PrivateOrder](interfaces/privateorder.md) | null*

*Defined in [src/websocket/proto/privateOrderFromProto.ts:11](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/proto/privateOrderFromProto.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`privateOrder` | IPrivateOrder |

**Returns:** *[PrivateOrder](interfaces/privateorder.md) | null*

___

###  privatePositionFromProto

▸ **privatePositionFromProto**(`position`: IPrivatePosition): *[PrivatePosition](interfaces/privateposition.md) | null*

*Defined in [src/websocket/proto/privatePositionFromProto.ts:9](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/proto/privatePositionFromProto.ts#L9)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | IPrivatePosition |

**Returns:** *[PrivatePosition](interfaces/privateposition.md) | null*

___

###  privatePositionSideFromProto

▸ **privatePositionSideFromProto**(`side`: number): *[OrderSide](README.md#orderside)*

*Defined in [src/websocket/proto/sideFromProto.ts:25](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/proto/sideFromProto.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`side` | number |

**Returns:** *[OrderSide](README.md#orderside)*

___

###  privateTradeFromProto

▸ **privateTradeFromProto**(`trade`: IPrivateTrade): *[PrivateTrade](interfaces/privatetrade.md) | null*

*Defined in [src/websocket/proto/privateTradeFromProto.ts:9](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/proto/privateTradeFromProto.ts#L9)*

**Parameters:**

Name | Type |
------ | ------ |
`trade` | IPrivateTrade |

**Returns:** *[PrivateTrade](interfaces/privatetrade.md) | null*

___

###  privateTradeSideFromProto

▸ **privateTradeSideFromProto**(`side`: number): *[OrderSide](README.md#orderside)*

*Defined in [src/websocket/proto/sideFromProto.ts:14](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/proto/sideFromProto.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`side` | number |

**Returns:** *[OrderSide](README.md#orderside)*

___

###  publicTradeSideFromProto

▸ **publicTradeSideFromProto**(`side`: OrderSide): *[OrderSide](README.md#orderside) | null*

*Defined in [src/websocket/proto/sideFromProto.ts:4](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/proto/sideFromProto.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`side` | OrderSide |

**Returns:** *[OrderSide](README.md#orderside) | null*

___

###  sortDeltaItems

▸ **sortDeltaItems**(`i`: [DeltaItem](README.md#deltaitem), `j`: [DeltaItem](README.md#deltaitem), `reverse`: boolean): *number*

*Defined in [src/util/helpers.ts:49](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/util/helpers.ts#L49)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`i` | [DeltaItem](README.md#deltaitem) | - |
`j` | [DeltaItem](README.md#deltaitem) | - |
`reverse` | boolean | false |

**Returns:** *number*

___

###  subscriptionResultFromProto

▸ **subscriptionResultFromProto**(`subResult`: ISubscriptionResult | IUnsubscriptionResult): *[SubscriptionResult](interfaces/subscriptionresult.md) | null*

*Defined in [src/websocket/proto/subscriptionResultFromProto.ts:14](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/proto/subscriptionResultFromProto.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`subResult` | ISubscriptionResult &#124; IUnsubscriptionResult |

**Returns:** *[SubscriptionResult](interfaces/subscriptionresult.md) | null*

___

###  symbolString

▸ **symbolString**(`s`: symbol): *string*

*Defined in [src/util/helpers.ts:31](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/util/helpers.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`s` | symbol |

**Returns:** *string*

___

###  tradeSubscriptionToProto

▸ **tradeSubscriptionToProto**(`tradeSubscription`: [TradeSubscription](interfaces/tradesubscription.md)): *ClientSubscription*

*Defined in [src/websocket/proto/tradeSubscriptionToProto.ts:4](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/proto/tradeSubscriptionToProto.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`tradeSubscription` | [TradeSubscription](interfaces/tradesubscription.md) |

**Returns:** *ClientSubscription*

___

###  transformSnapshot

▸ **transformSnapshot**(`orderBook`: [OrderBookSnapshotRaw](README.md#orderbooksnapshotraw)): *[OrderBookSnapshot](interfaces/orderbooksnapshot.md)*

*Defined in [src/util/helpers.ts:35](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/util/helpers.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`orderBook` | [OrderBookSnapshotRaw](README.md#orderbooksnapshotraw) |

**Returns:** *[OrderBookSnapshot](interfaces/orderbooksnapshot.md)*

___

###  validateMonetaryValue

▸ **validateMonetaryValue**(`n`: string): *boolean*

*Defined in [src/websocket/proto/validators.ts:27](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/proto/validators.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | string |

**Returns:** *boolean*

___

###  validateOrderSide

▸ **validateOrderSide**(`s`: string): *boolean*

*Defined in [src/websocket/proto/validators.ts:11](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/proto/validators.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`s` | string |

**Returns:** *boolean*

___

###  validateOrderSideProto

▸ **validateOrderSideProto**(`s`: number): *boolean*

*Defined in [src/websocket/proto/validators.ts:15](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/proto/validators.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`s` | number |

**Returns:** *boolean*

___

###  validateOrderType

▸ **validateOrderType**(`t`: string): *boolean*

*Defined in [src/websocket/proto/validators.ts:19](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/proto/validators.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`t` | string |

**Returns:** *boolean*

___

###  validateOrderTypeProto

▸ **validateOrderTypeProto**(`t`: Type): *boolean*

*Defined in [src/websocket/proto/validators.ts:23](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/websocket/proto/validators.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`t` | Type |

**Returns:** *boolean*
