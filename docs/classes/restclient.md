[cw-sdk-node - v1.0.0-beta.6](../README.md) › [RESTClient](restclient.md)

# Class: RESTClient

## Hierarchy

* **RESTClient**

## Index

### Constructors

* [constructor](restclient.md#constructor)

### Methods

* [getAllowance](restclient.md#getallowance)
* [getAsset](restclient.md#getasset)
* [getAssetByID](restclient.md#getassetbyid)
* [getAssetBySymbol](restclient.md#getassetbysymbol)
* [getExchange](restclient.md#getexchange)
* [getExchangeMarkets](restclient.md#getexchangemarkets)
* [getExchanges](restclient.md#getexchanges)
* [getMarket](restclient.md#getmarket)
* [getMarketByID](restclient.md#getmarketbyid)
* [getMarketBySymbol](restclient.md#getmarketbysymbol)
* [getMarketDescription](restclient.md#getmarketdescription)
* [getMarkets](restclient.md#getmarkets)
* [getOHLC](restclient.md#getohlc)
* [getOrderBookSnapshot](restclient.md#getorderbooksnapshot)
* [getPair](restclient.md#getpair)
* [getPairsIndex](restclient.md#getpairsindex)
* [getPrice](restclient.md#getprice)
* [getSummaries](restclient.md#getsummaries)
* [getSummary](restclient.md#getsummary)
* [getTrades](restclient.md#gettrades)

## Constructors

###  constructor

\+ **new RESTClient**(`options?`: [RESTOpts](../interfaces/restopts.md)): *[RESTClient](restclient.md)*

*Defined in [src/rest/RESTClient.ts:37](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/rest/RESTClient.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`options?` | [RESTOpts](../interfaces/restopts.md) |

**Returns:** *[RESTClient](restclient.md)*

## Methods

###  getAllowance

▸ **getAllowance**(): *[RESTAllowance](../interfaces/restallowance.md)*

*Defined in [src/rest/RESTClient.ts:77](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/rest/RESTClient.ts#L77)*

Returns the most recently retrieved REST allowance data.

**Returns:** *[RESTAllowance](../interfaces/restallowance.md)*

___

###  getAsset

▸ **getAsset**(`assetSelector`: number | string): *Promise‹[Asset](../README.md#asset)›*

*Defined in [src/rest/RESTClient.ts:201](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/rest/RESTClient.ts#L201)*

Returns a single asset.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`assetSelector` | number &#124; string | number|string id of asset (number) or asset symbol (Example: 'btc')  |

**Returns:** *Promise‹[Asset](../README.md#asset)›*

___

###  getAssetByID

▸ **getAssetByID**(`assetId`: number): *Promise‹[Asset](../README.md#asset)›*

*Defined in [src/rest/RESTClient.ts:221](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/rest/RESTClient.ts#L221)*

Returns a single market, with associated routes.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`assetId` | number | number id of specific asset  |

**Returns:** *Promise‹[Asset](../README.md#asset)›*

___

###  getAssetBySymbol

▸ **getAssetBySymbol**(`assetSymbol`: string): *Promise‹[Asset](../README.md#asset)›*

*Defined in [src/rest/RESTClient.ts:213](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/rest/RESTClient.ts#L213)*

Returns a single asset, with associated routes.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`assetSymbol` | string | string symbol for specific requested asset (Examples: 'btc', 'usd', 'eth', 'jpy', etc...)  |

**Returns:** *Promise‹[Asset](../README.md#asset)›*

___

###  getExchange

▸ **getExchange**(`exchangeSymbol`: string): *Promise‹[ExchangeDescription](../README.md#exchangedescription)›*

*Defined in [src/rest/RESTClient.ts:98](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/rest/RESTClient.ts#L98)*

Returns a single exchange, with associated routes.

**`see`** https://cryptowat.ch/docs/api#exchange-details

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`exchangeSymbol` | string | string (example: 'kraken') |

**Returns:** *Promise‹[ExchangeDescription](../README.md#exchangedescription)›*

___

###  getExchangeMarkets

▸ **getExchangeMarkets**(`exchangeSymbol`: string): *Promise‹[MarketDescription](../README.md#marketdescription)[]›*

*Defined in [src/rest/RESTClient.ts:150](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/rest/RESTClient.ts#L150)*

Returns a list of supported markets for a specific exchange.

**`see`** https://cryptowat.ch/docs/api#market-index

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`exchangeSymbol` | string | string (Example: 'kraken') |

**Returns:** *Promise‹[MarketDescription](../README.md#marketdescription)[]›*

___

###  getExchanges

▸ **getExchanges**(): *Promise‹[ExchangeBrief](../README.md#exchangebrief)[]›*

*Defined in [src/rest/RESTClient.ts:89](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/rest/RESTClient.ts#L89)*

Returns a list of all supported exchanges.

**`see`** https://cryptowat.ch/docs/api#pairs-index

**Returns:** *Promise‹[ExchangeBrief](../README.md#exchangebrief)[]›*

___

###  getMarket

▸ **getMarket**(`marketSelector`: [MarketSelector](../README.md#marketselector)): *Promise‹[Market](../README.md#market)›*

*Defined in [src/rest/RESTClient.ts:172](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/rest/RESTClient.ts#L172)*

Returns a single market.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`marketSelector` | [MarketSelector](../README.md#marketselector) | MarketSelector id of market (number) or MarketSymbol (Example: {exchange: 'kraken', base: 'btc', quote:'usd'})  |

**Returns:** *Promise‹[Market](../README.md#market)›*

___

###  getMarketByID

▸ **getMarketByID**(`marketID`: number): *Promise‹[Market](../README.md#market)›*

*Defined in [src/rest/RESTClient.ts:192](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/rest/RESTClient.ts#L192)*

Returns a single market.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`marketID` | number | number id of specific market.  |

**Returns:** *Promise‹[Market](../README.md#market)›*

___

###  getMarketBySymbol

▸ **getMarketBySymbol**(`marketSymbol`: [MarketSymbol](../README.md#marketsymbol)): *Promise‹[Market](../README.md#market)›*

*Defined in [src/rest/RESTClient.ts:184](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/rest/RESTClient.ts#L184)*

Returns a single market.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`marketSymbol` | [MarketSymbol](../README.md#marketsymbol) | MarketSymbol (Example: {exchange: 'kraken', base: 'btc', quote:'usd'})  |

**Returns:** *Promise‹[Market](../README.md#market)›*

___

###  getMarketDescription

▸ **getMarketDescription**(`exchangeSymbol`: string, `pairSymbol`: string): *Promise‹[MarketDescription](../README.md#marketdescription)›*

*Defined in [src/rest/RESTClient.ts:160](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/rest/RESTClient.ts#L160)*

Returns a single market, with associated routes.

**`see`** https://cryptowat.ch/docs/api#market-details

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`exchangeSymbol` | string | string (Example: 'kraken') |
`pairSymbol` | string | string (Example: 'btcusd') |

**Returns:** *Promise‹[MarketDescription](../README.md#marketdescription)›*

___

###  getMarkets

▸ **getMarkets**(): *Promise‹[MarketBrief](../README.md#marketbrief)[]›*

*Defined in [src/rest/RESTClient.ts:123](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/rest/RESTClient.ts#L123)*

Returns a list of all supported markets.

**`see`** https://cryptowat.ch/docs/api#market-index

**Returns:** *Promise‹[MarketBrief](../README.md#marketbrief)[]›*

___

###  getOHLC

▸ **getOHLC**(`exchangeSymbol`: string, `pairSymbol`: string, `options`: [OHLCOptions](../README.md#ohlcoptions)): *Promise‹[MarketOHLC](../README.md#marketohlc)›*

*Defined in [src/rest/RESTClient.ts:232](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/rest/RESTClient.ts#L232)*

Returns a market's OHLC candlestick data.

**`see`** https://cryptowat.ch/docs/api#market-ohlc

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`exchangeSymbol` | string | - | string (Example: 'kraken') |
`pairSymbol` | string | - | string (Example: 'btcusd') |
`options` | [OHLCOptions](../README.md#ohlcoptions) |  {} | Optional - see API documentation |

**Returns:** *Promise‹[MarketOHLC](../README.md#marketohlc)›*

___

###  getOrderBookSnapshot

▸ **getOrderBookSnapshot**(`exchangeSymbol`: string, `pairSymbol`: string): *Promise‹[OrderBookSnapshot](../interfaces/orderbooksnapshot.md)›*

*Defined in [src/rest/RESTClient.ts:259](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/rest/RESTClient.ts#L259)*

Returns a market's order book.

**`see`** https://cryptowat.ch/docs/api#market-orderbook

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`exchangeSymbol` | string | string (Example: 'kraken') |
`pairSymbol` | string | string (Example: 'btcusd') |

**Returns:** *Promise‹[OrderBookSnapshot](../interfaces/orderbooksnapshot.md)›*

___

###  getPair

▸ **getPair**(`pairSymbol`: string): *Promise‹[PairDetails](../README.md#pairdetails)›*

*Defined in [src/rest/RESTClient.ts:115](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/rest/RESTClient.ts#L115)*

Returns a single pair. Lists all markets for this pair.

**`see`** https://cryptowat.ch/docs/api#pair-details

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`pairSymbol` | string | string (example: 'btcusd') |

**Returns:** *Promise‹[PairDetails](../README.md#pairdetails)›*

___

###  getPairsIndex

▸ **getPairsIndex**(): *Promise‹[PairBrief](../README.md#pairbrief)[]›*

*Defined in [src/rest/RESTClient.ts:106](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/rest/RESTClient.ts#L106)*

Returns all pairs (in no particular order).

**`see`** https://cryptowat.ch/docs/api#pairs-index

**Returns:** *Promise‹[PairBrief](../README.md#pairbrief)[]›*

___

###  getPrice

▸ **getPrice**(`exchangeSymbol`: string, `pairSymbol`: string): *Promise‹[Price](../README.md#price)›*

*Defined in [src/rest/RESTClient.ts:274](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/rest/RESTClient.ts#L274)*

Returns a market's last price.

**`see`** https://cryptowat.ch/docs/api#market-price

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`exchangeSymbol` | string | string (Example: 'kraken') |
`pairSymbol` | string | string (Example: 'btcusd') |

**Returns:** *Promise‹[Price](../README.md#price)›*

___

###  getSummaries

▸ **getSummaries**(): *Promise‹[Summaries](../README.md#summaries)›*

*Defined in [src/rest/RESTClient.ts:131](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/rest/RESTClient.ts#L131)*

Returns the market summary for all supported markets. Some values may be out of date by a few seconds.

**`see`** https://cryptowat.ch/docs/api#summaries

**Returns:** *Promise‹[Summaries](../README.md#summaries)›*

___

###  getSummary

▸ **getSummary**(`exchangeSymbol`: string, `pairSymbol`: string): *Promise‹[Summary](../interfaces/summary.md)›*

*Defined in [src/rest/RESTClient.ts:141](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/rest/RESTClient.ts#L141)*

Returns a single market summary.

**`see`** https://cryptowat.ch/docs/api#market-summary

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`exchangeSymbol` | string | string (Example: 'kraken') |
`pairSymbol` | string | string (Example: 'btcusd') |

**Returns:** *Promise‹[Summary](../interfaces/summary.md)›*

___

###  getTrades

▸ **getTrades**(`exchangeSymbol`: string, `pairSymbol`: string): *Promise‹[Trade](../README.md#trade)[]›*

*Defined in [src/rest/RESTClient.ts:284](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/rest/RESTClient.ts#L284)*

Returns a market's most recent trades, incrementing chronologically.

**`see`** https://cryptowat.ch/docs/api#market-trades

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`exchangeSymbol` | string | string (Example: 'kraken') |
`pairSymbol` | string | string (Example: 'btcusd') |

**Returns:** *Promise‹[Trade](../README.md#trade)[]›*
