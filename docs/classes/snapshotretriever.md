[cw-sdk-node - v1.0.0-beta.7](../README.md) › [SnapshotRetriever](snapshotretriever.md)

# Class: SnapshotRetriever

Internal class to handle retrieving orderbook snapshots via the REST API.

## Hierarchy

* **SnapshotRetriever**

## Index

### Constructors

* [constructor](snapshotretriever.md#constructor)

### Methods

* [getOrderBookSnapshot](snapshotretriever.md#getorderbooksnapshot)

## Constructors

###  constructor

\+ **new SnapshotRetriever**(`marketSymbol`: [MarketSymbol](../README.md#marketsymbol), `restClient`: [RESTClient](restclient.md)): *[SnapshotRetriever](snapshotretriever.md)*

*Defined in [src/orderbook/SnapshotRetriever.ts:9](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/orderbook/SnapshotRetriever.ts#L9)*

**Parameters:**

Name | Type |
------ | ------ |
`marketSymbol` | [MarketSymbol](../README.md#marketsymbol) |
`restClient` | [RESTClient](restclient.md) |

**Returns:** *[SnapshotRetriever](snapshotretriever.md)*

## Methods

###  getOrderBookSnapshot

▸ **getOrderBookSnapshot**(): *Promise‹[OrderBookSnapshot](../interfaces/orderbooksnapshot.md)›*

*Defined in [src/orderbook/SnapshotRetriever.ts:16](https://github.com/cryptowatch/cw-sdk-node/blob/master/src/orderbook/SnapshotRetriever.ts#L16)*

**Returns:** *Promise‹[OrderBookSnapshot](../interfaces/orderbooksnapshot.md)›*
