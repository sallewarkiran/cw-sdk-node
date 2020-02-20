[cw-sdk-node - v1.0.0-beta.3](../README.md) › [OrderBook](orderbook.md)

# Class: OrderBook

Internal class for handling OrderBook delta transforms

## Hierarchy

* **OrderBook**

## Implements

* [OrderBookSnapshot](../interfaces/orderbooksnapshot.md)

## Index

### Constructors

* [constructor](orderbook.md#constructor)

### Properties

* [asks](orderbook.md#asks)
* [bids](orderbook.md#bids)
* [seqNum](orderbook.md#seqnum)

### Methods

* [applyDelta](orderbook.md#applydelta)
* [applySnapshot](orderbook.md#applysnapshot)
* [getSnapshot](orderbook.md#getsnapshot)

## Constructors

###  constructor

\+ **new OrderBook**(`snapshot?`: [OrderBookSnapshot](../interfaces/orderbooksnapshot.md)): *[OrderBook](orderbook.md)*

Defined in src/orderbook/OrderBook.ts:16

**Parameters:**

Name | Type |
------ | ------ |
`snapshot?` | [OrderBookSnapshot](../interfaces/orderbooksnapshot.md) |

**Returns:** *[OrderBook](orderbook.md)*

## Properties

###  asks

• **asks**: *[PublicOrder](../interfaces/publicorder.md)[]* =  []

*Implementation of [OrderBookSnapshot](../interfaces/orderbooksnapshot.md).[asks](../interfaces/orderbooksnapshot.md#asks)*

Defined in src/orderbook/OrderBook.ts:16

___

###  bids

• **bids**: *[PublicOrder](../interfaces/publicorder.md)[]* =  []

*Implementation of [OrderBookSnapshot](../interfaces/orderbooksnapshot.md).[bids](../interfaces/orderbooksnapshot.md#bids)*

Defined in src/orderbook/OrderBook.ts:15

___

###  seqNum

• **seqNum**: *number* = 0

*Implementation of [OrderBookSnapshot](../interfaces/orderbooksnapshot.md).[seqNum](../interfaces/orderbooksnapshot.md#seqnum)*

Defined in src/orderbook/OrderBook.ts:14

## Methods

###  applyDelta

▸ **applyDelta**(`delta`: [OrderBookDelta](../interfaces/orderbookdelta.md), `ignoreSeqNum`: boolean): *[OrderBook](orderbook.md)*

Defined in src/orderbook/OrderBook.ts:38

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`delta` | [OrderBookDelta](../interfaces/orderbookdelta.md) | - |
`ignoreSeqNum` | boolean | false |

**Returns:** *[OrderBook](orderbook.md)*

___

###  applySnapshot

▸ **applySnapshot**(`snapshot`: [OrderBookSnapshot](../interfaces/orderbooksnapshot.md)): *void*

Defined in src/orderbook/OrderBook.ts:32

**Parameters:**

Name | Type |
------ | ------ |
`snapshot` | [OrderBookSnapshot](../interfaces/orderbooksnapshot.md) |

**Returns:** *void*

___

###  getSnapshot

▸ **getSnapshot**(): *[OrderBookSnapshot](../interfaces/orderbooksnapshot.md)*

Defined in src/orderbook/OrderBook.ts:24

**Returns:** *[OrderBookSnapshot](../interfaces/orderbooksnapshot.md)*
