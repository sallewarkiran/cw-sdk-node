[cw-sdk-node](../README.md) › [SnapshotRetriever](snapshotretriever.md)

# Class: SnapshotRetriever

Internal class to handle retrieving orderbook snapshots via the REST API.
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

\+ **new SnapshotRetriever**(`marketSelector`: [MarketSelector](../README.md#marketselector), `restClient`: [RESTClient](restclient.md)): *[SnapshotRetriever](snapshotretriever.md)*

Defined in orderbook/SnapshotRetriever.ts:9

**Parameters:**

Name | Type |
------ | ------ |
`marketSelector` | [MarketSelector](../README.md#marketselector) |
`restClient` | [RESTClient](restclient.md) |

**Returns:** *[SnapshotRetriever](snapshotretriever.md)*

## Methods

###  getOrderBookSnapshot

▸ **getOrderBookSnapshot**(): *Promise‹[OrderBookSnapshot](../interfaces/orderbooksnapshot.md)›*

Defined in orderbook/SnapshotRetriever.ts:16

**Returns:** *Promise‹[OrderBookSnapshot](../interfaces/orderbooksnapshot.md)›*
