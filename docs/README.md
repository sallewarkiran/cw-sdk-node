[cw-sdk-node](README.md)

# cw-sdk-node

## Index

### Enumerations

* [Period](enums/period.md)

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
* [OrderBookSnapshotRaw](README.md#orderbooksnapshotraw)
* [OrderBookState](README.md#orderbookstate)
* [OrderSide](README.md#orderside)
* [OrderType](README.md#ordertype)
* [PairBrief](README.md#pairbrief)
* [PairDetails](README.md#pairdetails)
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

### Functions

* [binarySearchOrders](README.md#binarysearchorders)
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
* [privateTradeFromProto](README.md#privatetradefromproto)
* [sideFromProto](README.md#sidefromproto)
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

### Object literals

* [fundingTypeFromProto](README.md#const-fundingtypefromproto)
* [fundingTypeToProto](README.md#const-fundingtypetoproto)
* [orderTypeFromProto](README.md#const-ordertypefromproto)
* [orderTypeToProto](README.md#const-ordertypetoproto)
* [periodFromInt](README.md#const-periodfromint)
* [privateOrderSideFromProto](README.md#const-privateordersidefromproto)
* [privateOrderSideToProto](README.md#const-privateordersidetoproto)
* [publicOrderSideFromProto](README.md#const-publicordersidefromproto)
* [publicOrderSideToProto](README.md#const-publicordersidetoproto)

## Type aliases

###  Asset

Ƭ **Asset**: *object*

Defined in src/util/types/shared.ts:47

#### Type declaration:

___

###  AssetBrief

Ƭ **AssetBrief**: *Brief‹AssetBase›*

Defined in src/rest/types/data.ts:32

___

###  AssetDetails

Ƭ **AssetDetails**: *AssetBase & object*

Defined in src/rest/types/data.ts:33

___

###  BrokerRequest

Ƭ **BrokerRequest**: *PlaceOrderRequest | CancelOrderRequest*

Defined in src/websocket/types/trading.ts:70

___

###  CandleData

Ƭ **CandleData**: *object*

Defined in src/rest/types/data.ts:144

#### Type declaration:

___

###  CandleDataRaw

Ƭ **CandleDataRaw**: *[number, number, number, number, number, number]*

Defined in src/rest/types/data.ts:143

CandleData is an array of numbers in this order:
[ CloseTime, OpenPrice, HighPrice, LowPrice, ClosePrice, Volume ]

___

###  ChangeSummary

Ƭ **ChangeSummary**: *object*

Defined in src/rest/types/data.ts:67

#### Type declaration:

___

###  CredentialsType

Ƭ **CredentialsType**: *"stream" | "trade" | "REST"*

Defined in src/util/types/credentials.ts:11

___

###  DeltaItem

Ƭ **DeltaItem**: *object*

Defined in src/util/types/shared.ts:52

#### Type declaration:

___

###  Exchange

Ƭ **Exchange**: *object*

Defined in src/util/types/shared.ts:36

#### Type declaration:

___

###  ExchangeBrief

Ƭ **ExchangeBrief**: *Brief‹ExchangeBase›*

Defined in src/rest/types/data.ts:52

___

###  ExchangeDescription

Ƭ **ExchangeDescription**: *Description‹ExchangeBase›*

Defined in src/rest/types/data.ts:51

___

###  FundingType

Ƭ **FundingType**: *"spot" | "margin"*

Defined in src/websocket/types/trading.ts:28

___

###  Instrument

Ƭ **Instrument**: *object*

Defined in src/util/types/shared.ts:30

#### Type declaration:

___

###  LiquiditySide

Ƭ **LiquiditySide**: *object*

Defined in src/rest/types/data.ts:125

#### Type declaration:

___

###  LogLevel

Ƭ **LogLevel**: *"debug" | "info" | "warn" | "error" | "disabled"*

Defined in src/util/logger.ts:4

___

###  Market

Ƭ **Market**: *object*

Defined in src/util/types/shared.ts:41

Defined in src/websocket/types/markets.ts:15

#### Type declaration:

###  currencyPairID

• **currencyPairID**: *number*

Defined in src/websocket/types/markets.ts:18

###  exchangeID

• **exchangeID**: *number*

Defined in src/websocket/types/markets.ts:17

###  id

• **id**: *number*

Defined in src/websocket/types/markets.ts:16

___

###  MarketBrief

Ƭ **MarketBrief**: *Brief‹MarketBase›*

Defined in src/rest/types/data.ts:55

___

###  MarketDescription

Ƭ **MarketDescription**: *Description‹MarketBase›*

Defined in src/rest/types/data.ts:54

___

###  MarketOHLC

Ƭ **MarketOHLC**: *object*

Defined in src/rest/types/data.ts:157

#### Type declaration:

___

###  MarketOHLCRaw

Ƭ **MarketOHLCRaw**: *object*

Defined in src/rest/types/data.ts:153

#### Type declaration:

___

###  MarketOrderBookLiquidity

Ƭ **MarketOrderBookLiquidity**: *object*

Defined in src/rest/types/data.ts:134

#### Type declaration:

___

###  MarketSelector

Ƭ **MarketSelector**: *object | number*

Defined in src/util/types/shared.ts:59

___

###  MarketSymbol

Ƭ **MarketSymbol**: *object*

Defined in src/rest/types/data.ts:57

#### Type declaration:

___

###  OrderBookSnapshotRaw

Ƭ **OrderBookSnapshotRaw**: *object*

Defined in src/rest/types/data.ts:91

#### Type declaration:

___

###  OrderBookState

Ƭ **OrderBookState**: *object*

Defined in src/util/types/shared.ts:7

#### Type declaration:

___

###  OrderSide

Ƭ **OrderSide**: *"buy" | "sell"*

Defined in src/websocket/types/trading.ts:26

___

###  OrderType

Ƭ **OrderType**: *"market" | "limit"*

Defined in src/websocket/types/trading.ts:30

___

###  PairBrief

Ƭ **PairBrief**: *object*

Defined in src/rest/types/data.ts:40

#### Type declaration:

___

###  PairDetails

Ƭ **PairDetails**: *[PairBrief](README.md#pairbrief) & object*

Defined in src/rest/types/data.ts:47

___

###  Price

Ƭ **Price**: *object*

Defined in src/rest/types/data.ts:63

#### Type declaration:

___

###  PriceSummary

Ƭ **PriceSummary**: *object*

Defined in src/rest/types/data.ts:72

#### Type declaration:

___

###  Prices

Ƭ **Prices**: *object*

Defined in src/rest/types/data.ts:161

#### Type declaration:

* \[ **marketSymbol**: *string*\]: number

___

###  PublicOrderRaw

Ƭ **PublicOrderRaw**: *[number, number]*

Defined in src/rest/types/data.ts:89

PublicOrders are arrays of numbers in this order:
[ Price, Amount ]

___

###  Summaries

Ƭ **Summaries**: *object*

Defined in src/rest/types/data.ts:165

#### Type declaration:

* \[ **marketSymbol**: *string*\]: [Summary](interfaces/summary.md)

___

###  Trade

Ƭ **Trade**: *object*

Defined in src/rest/types/data.ts:102

#### Type declaration:

___

###  TradeRaw

Ƭ **TradeRaw**: *[number, number, number, number]*

Defined in src/rest/types/data.ts:101

Trades are arrays of numbers in this order:
[ ID, Timestamp, Price, Amount ]

## Variables

### `Const` DataPerformanceUpdate

• **DataPerformanceUpdate**: *unique symbol* =  Symbol('performance update')

Defined in src/websocket/constants.ts:19

___

### `Const` DataVWAPUpdate

• **DataVWAPUpdate**: *unique symbol* =  Symbol('vwap update')

Defined in src/websocket/constants.ts:18

___

### `Const` EventBalancesUpdate

• **EventBalancesUpdate**: *unique symbol* =  Symbol('balances update')

Defined in src/websocket/constants.ts:25

___

### `Const` EventClientError

• **EventClientError**: *unique symbol* =  Symbol('client error')

Defined in src/websocket/constants.ts:8

___

### `Const` EventMarketUpdate

• **EventMarketUpdate**: *unique symbol* =  Symbol('market update')

Defined in src/websocket/constants.ts:14

___

### `Const` EventOrdersUpdate

• **EventOrdersUpdate**: *unique symbol* =  Symbol('orders update')

Defined in src/websocket/constants.ts:22

___

### `Const` EventPairUpdate

• **EventPairUpdate**: *unique symbol* =  Symbol('pair update')

Defined in src/websocket/constants.ts:15

___

### `Const` EventPositionsUpdate

• **EventPositionsUpdate**: *unique symbol* =  Symbol('positions update')

Defined in src/websocket/constants.ts:24

___

### `Const` EventStateChange

• **EventStateChange**: *unique symbol* =  Symbol('state change')

Defined in src/websocket/constants.ts:9

___

### `Const` EventSubscriptionResult

• **EventSubscriptionResult**: *unique symbol* =  Symbol('subscription result')

Defined in src/websocket/constants.ts:17

___

### `Const` EventTradesUpdate

• **EventTradesUpdate**: *unique symbol* =  Symbol('trades update')

Defined in src/websocket/constants.ts:23

___

### `Const` EventUnsubscriptionResult

• **EventUnsubscriptionResult**: *unique symbol* =  Symbol('unsubscription result')

Defined in src/websocket/constants.ts:16

___

### `Const` EventWSAuthResult

• **EventWSAuthResult**: *unique symbol* =  Symbol('auth result')

Defined in src/websocket/constants.ts:11

___

### `Const` EventWSData

• **EventWSData**: *unique symbol* =  Symbol('websocket data')

Defined in src/websocket/constants.ts:10

___

### `Const` StateConnected

• **StateConnected**: *unique symbol* =  Symbol('connected')

Defined in src/websocket/constants.ts:4

___

### `Const` StateConnecting

• **StateConnecting**: *unique symbol* =  Symbol('connecting')

Defined in src/websocket/constants.ts:3

___

### `Const` StateDisconnected

• **StateDisconnected**: *unique symbol* =  Symbol('disconnected')

Defined in src/websocket/constants.ts:2

___

### `Const` StateWaitingToReconnect

• **StateWaitingToReconnect**: *unique symbol* =  Symbol('disconnected: waiting to reconnect')

Defined in src/websocket/constants.ts:5

___

### `Const` errCancelOrderBadResponse

• **errCancelOrderBadResponse**: *Error* =  new Error('cancel order failed: bad response')

Defined in src/websocket/errors.ts:5

___

### `Const` errConnNotReady

• **errConnNotReady**: *Error* =  new Error(
  "Connection not ready. Did you forget to call 'connect()'?"
)

Defined in src/websocket/errors.ts:8

___

### `Const` errNotInitialized

• **errNotInitialized**: *Error* =  new Error(
  'Trading is not yet initialized. Did you wait for onReady()?'
)

Defined in src/websocket/errors.ts:1

___

### `Const` errPlaceOrderBadResponse

• **errPlaceOrderBadResponse**: *Error* =  new Error('place order failed: bad response')

Defined in src/websocket/errors.ts:4

## Functions

###  binarySearchOrders

▸ **binarySearchOrders**(`orders`: [PublicOrder](interfaces/publicorder.md)[], `price`: string, `startIndex`: number, `reverse`: boolean): *object*

Defined in src/util/helpers.ts:68

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`orders` | [PublicOrder](interfaces/publicorder.md)[] | - |
`price` | string | - |
`startIndex` | number | - |
`reverse` | boolean | false |

**Returns:** *object*

___

###  getDateFromMs

▸ **getDateFromMs**(`n`: number | Long): *Date*

Defined in src/util/helpers.ts:22

**Parameters:**

Name | Type |
------ | ------ |
`n` | number &#124; Long |

**Returns:** *Date*

___

###  getDateFromNs

▸ **getDateFromNs**(`n`: number | Long): *Date*

Defined in src/util/helpers.ts:26

**Parameters:**

Name | Type |
------ | ------ |
`n` | number &#124; Long |

**Returns:** *Date*

___

###  getDateFromSecs

▸ **getDateFromSecs**(`n`: number | Long): *Date*

Defined in src/util/helpers.ts:18

**Parameters:**

Name | Type |
------ | ------ |
`n` | number &#124; Long |

**Returns:** *Date*

___

###  getNumber

▸ **getNumber**(`n`: number | Long): *number*

Defined in src/util/helpers.ts:10

**Parameters:**

Name | Type |
------ | ------ |
`n` | number &#124; Long |

**Returns:** *number*

___

###  getString

▸ **getString**(`n`: number | Long): *string*

Defined in src/util/helpers.ts:14

**Parameters:**

Name | Type |
------ | ------ |
`n` | number &#124; Long |

**Returns:** *string*

___

###  guardIsLong

▸ **guardIsLong**(`value`: number | Long): *value is Long*

Defined in src/util/helpers.ts:6

**Parameters:**

Name | Type |
------ | ------ |
`value` | number &#124; Long |

**Returns:** *value is Long*

___

###  keyToStreamSubscription

▸ **keyToStreamSubscription**(`key`: string): *ClientSubscription*

Defined in src/websocket/proto/keyToStreamSubscription.ts:3

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *ClientSubscription*

___

###  loadRESTCredentials

▸ **loadRESTCredentials**(`opts?`: Partial‹[RESTOpts](interfaces/restopts.md)›): *object*

Defined in src/util/credentials.ts:102

**Parameters:**

Name | Type |
------ | ------ |
`opts?` | Partial‹[RESTOpts](interfaces/restopts.md)› |

**Returns:** *object*

___

###  loadStreamCredentials

▸ **loadStreamCredentials**(`opts`: Partial‹[StreamOpts](interfaces/streamopts.md)›): *[StreamOpts](interfaces/streamopts.md)*

Defined in src/util/credentials.ts:58

**Parameters:**

Name | Type |
------ | ------ |
`opts` | Partial‹[StreamOpts](interfaces/streamopts.md)› |

**Returns:** *[StreamOpts](interfaces/streamopts.md)*

___

###  loadTradeCredentials

▸ **loadTradeCredentials**(`opts`: Partial‹[TradeOpts](interfaces/tradeopts.md)›): *[TradeOpts](interfaces/tradeopts.md)*

Defined in src/util/credentials.ts:80

**Parameters:**

Name | Type |
------ | ------ |
`opts` | Partial‹[TradeOpts](interfaces/tradeopts.md)› |

**Returns:** *[TradeOpts](interfaces/tradeopts.md)*

___

###  marketUpdateFromProto

▸ **marketUpdateFromProto**(`marketUpdate`: MarketUpdateMessage): *[MarketUpdate](interfaces/marketupdate.md) | null*

Defined in src/websocket/proto/marketUpdateFromProto.ts:276

**Parameters:**

Name | Type |
------ | ------ |
`marketUpdate` | MarketUpdateMessage |

**Returns:** *[MarketUpdate](interfaces/marketupdate.md) | null*

___

###  pairUpdateFromProto

▸ **pairUpdateFromProto**(`pairUpdate`: IPairUpdateMessage | null | undefined): *[PairUpdate](interfaces/pairupdate.md) | null*

Defined in src/websocket/proto/pairUpdateFromProto.ts:5

**Parameters:**

Name | Type |
------ | ------ |
`pairUpdate` | IPairUpdateMessage &#124; null &#124; undefined |

**Returns:** *[PairUpdate](interfaces/pairupdate.md) | null*

___

###  placeOrderOptToProto

▸ **placeOrderOptToProto**(`orderOpts`: Partial‹[PlaceOrderOpt](interfaces/placeorderopt.md)›): *IPrivateOrder*

Defined in src/websocket/proto/placeOrderOptToProto.ts:14

**Parameters:**

Name | Type |
------ | ------ |
`orderOpts` | Partial‹[PlaceOrderOpt](interfaces/placeorderopt.md)› |

**Returns:** *IPrivateOrder*

___

###  privateOrderFromProto

▸ **privateOrderFromProto**(`privateOrder`: IPrivateOrder): *[PrivateOrder](interfaces/privateorder.md) | null*

Defined in src/websocket/proto/privateOrderFromProto.ts:11

**Parameters:**

Name | Type |
------ | ------ |
`privateOrder` | IPrivateOrder |

**Returns:** *[PrivateOrder](interfaces/privateorder.md) | null*

___

###  privatePositionFromProto

▸ **privatePositionFromProto**(`position`: IPrivatePosition): *[PrivatePosition](interfaces/privateposition.md) | null*

Defined in src/websocket/proto/privatePositionFromProto.ts:9

**Parameters:**

Name | Type |
------ | ------ |
`position` | IPrivatePosition |

**Returns:** *[PrivatePosition](interfaces/privateposition.md) | null*

___

###  privateTradeFromProto

▸ **privateTradeFromProto**(`trade`: IPrivateTrade): *[PrivateTrade](interfaces/privatetrade.md) | null*

Defined in src/websocket/proto/privateTradeFromProto.ts:9

**Parameters:**

Name | Type |
------ | ------ |
`trade` | IPrivateTrade |

**Returns:** *[PrivateTrade](interfaces/privatetrade.md) | null*

___

###  sideFromProto

▸ **sideFromProto**(`side`: number | Side): *[OrderSide](README.md#orderside) | null*

Defined in src/websocket/proto/sideFromProto.ts:5

**Parameters:**

Name | Type |
------ | ------ |
`side` | number &#124; Side |

**Returns:** *[OrderSide](README.md#orderside) | null*

___

###  sortDeltaItems

▸ **sortDeltaItems**(`i`: [DeltaItem](README.md#deltaitem), `j`: [DeltaItem](README.md#deltaitem), `reverse`: boolean): *number*

Defined in src/util/helpers.ts:49

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

Defined in src/websocket/proto/subscriptionResultFromProto.ts:14

**Parameters:**

Name | Type |
------ | ------ |
`subResult` | ISubscriptionResult &#124; IUnsubscriptionResult |

**Returns:** *[SubscriptionResult](interfaces/subscriptionresult.md) | null*

___

###  symbolString

▸ **symbolString**(`s`: symbol): *string*

Defined in src/util/helpers.ts:31

**Parameters:**

Name | Type |
------ | ------ |
`s` | symbol |

**Returns:** *string*

___

###  tradeSubscriptionToProto

▸ **tradeSubscriptionToProto**(`tradeSubscription`: [TradeSubscription](interfaces/tradesubscription.md)): *ClientSubscription*

Defined in src/websocket/proto/tradeSubscriptionToProto.ts:4

**Parameters:**

Name | Type |
------ | ------ |
`tradeSubscription` | [TradeSubscription](interfaces/tradesubscription.md) |

**Returns:** *ClientSubscription*

___

###  transformSnapshot

▸ **transformSnapshot**(`orderBook`: [OrderBookSnapshotRaw](README.md#orderbooksnapshotraw)): *[OrderBookSnapshot](interfaces/orderbooksnapshot.md)*

Defined in src/util/helpers.ts:35

**Parameters:**

Name | Type |
------ | ------ |
`orderBook` | [OrderBookSnapshotRaw](README.md#orderbooksnapshotraw) |

**Returns:** *[OrderBookSnapshot](interfaces/orderbooksnapshot.md)*

___

###  validateMonetaryValue

▸ **validateMonetaryValue**(`n`: string): *boolean*

Defined in src/websocket/proto/validators.ts:27

**Parameters:**

Name | Type |
------ | ------ |
`n` | string |

**Returns:** *boolean*

___

###  validateOrderSide

▸ **validateOrderSide**(`s`: string): *boolean*

Defined in src/websocket/proto/validators.ts:11

**Parameters:**

Name | Type |
------ | ------ |
`s` | string |

**Returns:** *boolean*

___

###  validateOrderSideProto

▸ **validateOrderSideProto**(`s`: number): *boolean*

Defined in src/websocket/proto/validators.ts:15

**Parameters:**

Name | Type |
------ | ------ |
`s` | number |

**Returns:** *boolean*

___

###  validateOrderType

▸ **validateOrderType**(`t`: string): *boolean*

Defined in src/websocket/proto/validators.ts:19

**Parameters:**

Name | Type |
------ | ------ |
`t` | string |

**Returns:** *boolean*

___

###  validateOrderTypeProto

▸ **validateOrderTypeProto**(`t`: Type): *boolean*

Defined in src/websocket/proto/validators.ts:23

**Parameters:**

Name | Type |
------ | ------ |
`t` | Type |

**Returns:** *boolean*

## Object literals

### `Const` fundingTypeFromProto

### ▪ **fundingTypeFromProto**: *object*

Defined in src/websocket/proto/constants.ts:25

###  0

• **0**: *"spot"* = "spot"

Defined in src/websocket/proto/constants.ts:26

###  1

• **1**: *"margin"* = "margin"

Defined in src/websocket/proto/constants.ts:27

___

### `Const` fundingTypeToProto

### ▪ **fundingTypeToProto**: *object*

Defined in src/websocket/proto/constants.ts:30

###  margin

• **margin**: *number* = 1

Defined in src/websocket/proto/constants.ts:32

###  spot

• **spot**: *number* = 0

Defined in src/websocket/proto/constants.ts:31

___

### `Const` orderTypeFromProto

### ▪ **orderTypeFromProto**: *object*

Defined in src/websocket/proto/constants.ts:35

###  0

• **0**: *"market"* = "market"

Defined in src/websocket/proto/constants.ts:36

###  1

• **1**: *"limit"* = "limit"

Defined in src/websocket/proto/constants.ts:37

___

### `Const` orderTypeToProto

### ▪ **orderTypeToProto**: *object*

Defined in src/websocket/proto/constants.ts:51

###  limit

• **limit**: *number* = 1

Defined in src/websocket/proto/constants.ts:53

###  market

• **market**: *number* = 0

Defined in src/websocket/proto/constants.ts:52

___

### `Const` periodFromInt

### ▪ **periodFromInt**: *object*

Defined in src/websocket/proto/constants.ts:67

###  14400

• **14400**: *[4h](enums/period.md#4h)* =  Period['4h']

Defined in src/websocket/proto/constants.ts:75

###  180

• **180**: *[3m](enums/period.md#3m)* =  Period['3m']

Defined in src/websocket/proto/constants.ts:69

###  1800

• **1800**: *[30m](enums/period.md#30m)* =  Period['30m']

Defined in src/websocket/proto/constants.ts:72

###  21600

• **21600**: *[6h](enums/period.md#6h)* =  Period['6h']

Defined in src/websocket/proto/constants.ts:76

###  259200

• **259200**: *[3d](enums/period.md#3d)* =  Period['3d']

Defined in src/websocket/proto/constants.ts:79

###  300

• **300**: *[5m](enums/period.md#5m)* =  Period['5m']

Defined in src/websocket/proto/constants.ts:70

###  3600

• **3600**: *[1h](enums/period.md#1h)* =  Period['1h']

Defined in src/websocket/proto/constants.ts:73

###  43200

• **43200**: *[12h](enums/period.md#12h)* =  Period['12h']

Defined in src/websocket/proto/constants.ts:77

###  60

• **60**: *[1m](enums/period.md#1m)* =  Period['1m']

Defined in src/websocket/proto/constants.ts:68

###  604800

• **604800**: *[1w](enums/period.md#1w)* =  Period['1w']

Defined in src/websocket/proto/constants.ts:80

###  7200

• **7200**: *[2h](enums/period.md#2h)* =  Period['2h']

Defined in src/websocket/proto/constants.ts:74

###  86400

• **86400**: *[1d](enums/period.md#1d)* =  Period['1d']

Defined in src/websocket/proto/constants.ts:78

###  900

• **900**: *[15m](enums/period.md#15m)* =  Period['15m']

Defined in src/websocket/proto/constants.ts:71

___

### `Const` privateOrderSideFromProto

### ▪ **privateOrderSideFromProto**: *object*

Defined in src/websocket/proto/constants.ts:5

###  0

• **0**: *"sell"* = "sell"

Defined in src/websocket/proto/constants.ts:6

###  1

• **1**: *"buy"* = "buy"

Defined in src/websocket/proto/constants.ts:7

___

### `Const` privateOrderSideToProto

### ▪ **privateOrderSideToProto**: *object*

Defined in src/websocket/proto/constants.ts:10

###  buy

• **buy**: *number* = 1

Defined in src/websocket/proto/constants.ts:12

###  sell

• **sell**: *number* = 0

Defined in src/websocket/proto/constants.ts:11

___

### `Const` publicOrderSideFromProto

### ▪ **publicOrderSideFromProto**: *object*

Defined in src/websocket/proto/constants.ts:15

###  0

• **0**: *"buy"* = "buy"

Defined in src/websocket/proto/constants.ts:16

###  1

• **1**: *"sell"* = "sell"

Defined in src/websocket/proto/constants.ts:17

___

### `Const` publicOrderSideToProto

### ▪ **publicOrderSideToProto**: *object*

Defined in src/websocket/proto/constants.ts:20

###  buy

• **buy**: *number* = 0

Defined in src/websocket/proto/constants.ts:21

###  sell

• **sell**: *number* = 1

Defined in src/websocket/proto/constants.ts:22
