[cw-sdk-node - v1.0.0-beta.6](../README.md) › [Updater](updater.md)

# Class: Updater

Internal class for handling orderbook update events and delta cache

## Hierarchy

* **Updater**

## Index

### Constructors

* [constructor](updater.md#constructor)

### Methods

* [applyDelta](updater.md#applydelta)
* [destroy](updater.md#destroy)
* [onError](updater.md#onerror)
* [onOrderBookUpdate](updater.md#onorderbookupdate)
* [onStateUpdate](updater.md#onstateupdate)

## Constructors

###  constructor

\+ **new Updater**(`snapshotRetriever`: [SnapshotRetriever](snapshotretriever.md)): *[Updater](updater.md)*

*Defined in [src/orderbook/Updater.ts:47](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/orderbook/Updater.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`snapshotRetriever` | [SnapshotRetriever](snapshotretriever.md) |

**Returns:** *[Updater](updater.md)*

## Methods

###  applyDelta

▸ **applyDelta**(`orderBookDelta`: [OrderBookDelta](../interfaces/orderbookdelta.md)): *void*

*Defined in [src/orderbook/Updater.ts:65](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/orderbook/Updater.ts#L65)*

Triggers event to add new delta to the cache and attempt to apply
it and any other cached deltas.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`orderBookDelta` | [OrderBookDelta](../interfaces/orderbookdelta.md) | delta obtained from StreamClient  |

**Returns:** *void*

___

###  destroy

▸ **destroy**(): *void*

*Defined in [src/orderbook/Updater.ts:96](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/orderbook/Updater.ts#L96)*

Tears down all set timeouts and event listeners.

**Returns:** *void*

___

###  onError

▸ **onError**(`callback`: function): *void*

*Defined in [src/orderbook/Updater.ts:89](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/orderbook/Updater.ts#L89)*

Adds an event listener that triggers the supplied callback on any error caught

**Parameters:**

▪ **callback**: *function*

function that is passed caught errors

▸ (`error`: Error): *void*

**Parameters:**

Name | Type |
------ | ------ |
`error` | Error |

**Returns:** *void*

___

###  onOrderBookUpdate

▸ **onOrderBookUpdate**(`callback`: function): *void*

*Defined in [src/orderbook/Updater.ts:73](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/orderbook/Updater.ts#L73)*

Adds an event listener that triggers the supplied callback on each new update from an OrderBook snapshot and/or delta

**Parameters:**

▪ **callback**: *function*

function that is passed the latest OrderBookSnapshot as a parameter

▸ (`snapshot`: [OrderBookSnapshot](../interfaces/orderbooksnapshot.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`snapshot` | [OrderBookSnapshot](../interfaces/orderbooksnapshot.md) |

**Returns:** *void*

___

###  onStateUpdate

▸ **onStateUpdate**(`callback`: function): *void*

*Defined in [src/orderbook/Updater.ts:81](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/orderbook/Updater.ts#L81)*

Adds an event listener that triggers the supplied callback on each change to the state of cached deltas and sync status

**Parameters:**

▪ **callback**: *function*

function that is passed the latest OrderBookState of cached deltas and sync status

▸ (`state`: [OrderBookState](../README.md#orderbookstate)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`state` | [OrderBookState](../README.md#orderbookstate) |

**Returns:** *void*
