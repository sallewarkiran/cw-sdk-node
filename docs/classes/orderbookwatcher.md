[cw-sdk-node - v1.0.0-beta.4](../README.md) › [OrderBookWatcher](orderbookwatcher.md)

# Class: OrderBookWatcher

Allows user to subscribe to an orderbook and recieve updates. StreamClient must be
connected to start getting updates.

## Hierarchy

* **OrderBookWatcher**

## Index

### Constructors

* [constructor](orderbookwatcher.md#constructor)

### Accessors

* [inSync](orderbookwatcher.md#insync)

### Methods

* [destroy](orderbookwatcher.md#destroy)
* [onError](orderbookwatcher.md#onerror)
* [onSyncStatusChange](orderbookwatcher.md#onsyncstatuschange)
* [onUpdate](orderbookwatcher.md#onupdate)

## Constructors

###  constructor

\+ **new OrderBookWatcher**(`marketID`: number, `snapshotUpdater`: [Updater](updater.md), `streamClient`: [StreamClient](streamclient.md)): *[OrderBookWatcher](orderbookwatcher.md)*

*Defined in [src/orderbook/OrderBookWatcher.ts:21](https://github.com/cryptowatch/cw-sdk-node/blob/53b8a13/src/orderbook/OrderBookWatcher.ts#L21)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`marketID` | number | ID of market to montior orderbook |
`snapshotUpdater` | [Updater](updater.md) | Updater to handle orderbook deltas and snapshots |
`streamClient` | [StreamClient](streamclient.md) | StreamClient for OrderBookWatcher to subscribe to  |

**Returns:** *[OrderBookWatcher](orderbookwatcher.md)*

## Accessors

###  inSync

• **get inSync**(): *boolean*

*Defined in [src/orderbook/OrderBookWatcher.ts:19](https://github.com/cryptowatch/cw-sdk-node/blob/53b8a13/src/orderbook/OrderBookWatcher.ts#L19)*

true if a snpshot has been retrieved and all of the latest deltas have been applied successfully

**Returns:** *boolean*

## Methods

###  destroy

▸ **destroy**(): *void*

*Defined in [src/orderbook/OrderBookWatcher.ts:41](https://github.com/cryptowatch/cw-sdk-node/blob/53b8a13/src/orderbook/OrderBookWatcher.ts#L41)*

Unsubscribes from updates to the watched market from the supplied StreamClient,
clears all snapshot retrieval timeouts, and tears down all event listeners.
This should be called when the user is done with their live order book to avoid going over
their data limit.

**Returns:** *void*

___

###  onError

▸ **onError**(`callback`: function): *void*

*Defined in [src/orderbook/OrderBookWatcher.ts:77](https://github.com/cryptowatch/cw-sdk-node/blob/53b8a13/src/orderbook/OrderBookWatcher.ts#L77)*

Adds an event listener that triggers the supplied callback on any error caught

**Parameters:**

▪ **callback**: *function*

function that is passed the marketID and the caught error

▸ (`marketID`: number, `error`: Error): *void*

**Parameters:**

Name | Type |
------ | ------ |
`marketID` | number |
`error` | Error |

**Returns:** *void*

___

###  onSyncStatusChange

▸ **onSyncStatusChange**(`callback`: function): *void*

*Defined in [src/orderbook/OrderBookWatcher.ts:62](https://github.com/cryptowatch/cw-sdk-node/blob/53b8a13/src/orderbook/OrderBookWatcher.ts#L62)*

Adds an event listener that triggers the supplied callback any time the inSync status changes.

**Parameters:**

▪ **callback**: *function*

function that is passed the marketID and current inSync status

▸ (`marketID`: number, `inSync`: boolean): *void*

**Parameters:**

Name | Type |
------ | ------ |
`marketID` | number |
`inSync` | boolean |

**Returns:** *void*

___

###  onUpdate

▸ **onUpdate**(`callback`: function): *void*

*Defined in [src/orderbook/OrderBookWatcher.ts:50](https://github.com/cryptowatch/cw-sdk-node/blob/53b8a13/src/orderbook/OrderBookWatcher.ts#L50)*

Adds an event listener that triggers on each new update from an OrderBook snapshot and/or delta

**Parameters:**

▪ **callback**: *function*

function that is passed the marketID and latest OrderBookSnapshot as a parameter

▸ (`marketID`: number, `orderBookSnapshot`: [OrderBookSnapshot](../interfaces/orderbooksnapshot.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`marketID` | number |
`orderBookSnapshot` | [OrderBookSnapshot](../interfaces/orderbooksnapshot.md) |

**Returns:** *void*
