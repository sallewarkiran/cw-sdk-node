[cw-sdk-node - v1.0.0-beta.4](../README.md) › [TradeClient](tradeclient.md)

# Class: TradeClient

## Hierarchy

  ↳ [WebSocketClient](websocketclient.md)

  ↳ **TradeClient**

## Index

### Constructors

* [constructor](tradeclient.md#constructor)

### Properties

* [connState](tradeclient.md#protected-connstate)
* [orders](tradeclient.md#orders)
* [positions](tradeclient.md#positions)
* [subscriptions](tradeclient.md#subscriptions)
* [trades](tradeclient.md#trades)
* [defaultMaxListeners](tradeclient.md#static-defaultmaxlisteners)

### Methods

* [addListener](tradeclient.md#addlistener)
* [cancelOrder](tradeclient.md#cancelorder)
* [connect](tradeclient.md#connect)
* [disconnect](tradeclient.md#disconnect)
* [emit](tradeclient.md#emit)
* [error](tradeclient.md#error)
* [eventNames](tradeclient.md#eventnames)
* [getMaxListeners](tradeclient.md#getmaxlisteners)
* [getSubscriptions](tradeclient.md#getsubscriptions)
* [listenerCount](tradeclient.md#listenercount)
* [listeners](tradeclient.md#listeners)
* [off](tradeclient.md#off)
* [on](tradeclient.md#on)
* [onConnect](tradeclient.md#onconnect)
* [onDisconnect](tradeclient.md#ondisconnect)
* [onError](tradeclient.md#onerror)
* [onOrdersUpdate](tradeclient.md#onordersupdate)
* [onPositionsUpdate](tradeclient.md#onpositionsupdate)
* [onReady](tradeclient.md#onready)
* [onStateChange](tradeclient.md#onstatechange)
* [onTradesUpdate](tradeclient.md#ontradesupdate)
* [once](tradeclient.md#once)
* [placeOrder](tradeclient.md#placeorder)
* [prependListener](tradeclient.md#prependlistener)
* [prependOnceListener](tradeclient.md#prependoncelistener)
* [rawListeners](tradeclient.md#rawlisteners)
* [removeAllListeners](tradeclient.md#removealllisteners)
* [removeListener](tradeclient.md#removelistener)
* [send](tradeclient.md#send)
* [setMaxListeners](tradeclient.md#setmaxlisteners)
* [state](tradeclient.md#state)
* [listenerCount](tradeclient.md#static-listenercount)

## Constructors

###  constructor

\+ **new TradeClient**(`opts`: Partial‹[TradeOpts](../interfaces/tradeopts.md)›): *[TradeClient](tradeclient.md)*

*Overrides [WebSocketClient](websocketclient.md).[constructor](websocketclient.md#constructor)*

*Defined in [src/websocket/TradeClient.ts:53](https://github.com/cryptowatch/cw-sdk-node/blob/53b8a13/src/websocket/TradeClient.ts#L53)*

**Parameters:**

Name | Type |
------ | ------ |
`opts` | Partial‹[TradeOpts](../interfaces/tradeopts.md)› |

**Returns:** *[TradeClient](tradeclient.md)*

## Properties

### `Protected` connState

• **connState**: *symbol*

*Inherited from [WebSocketClient](websocketclient.md).[connState](websocketclient.md#protected-connstate)*

*Defined in [src/websocket/WebSocketClient.ts:58](https://github.com/cryptowatch/cw-sdk-node/blob/53b8a13/src/websocket/WebSocketClient.ts#L58)*

___

###  orders

• **orders**: *object*

*Defined in [src/websocket/TradeClient.ts:36](https://github.com/cryptowatch/cw-sdk-node/blob/53b8a13/src/websocket/TradeClient.ts#L36)*

#### Type declaration:

* \[ **key**: *number*\]: [PrivateOrder](../interfaces/privateorder.md)[]

___

###  positions

• **positions**: *object*

*Defined in [src/websocket/TradeClient.ts:46](https://github.com/cryptowatch/cw-sdk-node/blob/53b8a13/src/websocket/TradeClient.ts#L46)*

#### Type declaration:

* \[ **key**: *number*\]: [PrivatePosition](../interfaces/privateposition.md)[]

___

###  subscriptions

• **subscriptions**: *object*

*Inherited from [WebSocketClient](websocketclient.md).[subscriptions](websocketclient.md#subscriptions)*

*Defined in [src/websocket/WebSocketClient.ts:47](https://github.com/cryptowatch/cw-sdk-node/blob/53b8a13/src/websocket/WebSocketClient.ts#L47)*

#### Type declaration:

* \[ **key**: *string*\]: ClientSubscription

___

###  trades

• **trades**: *object*

*Defined in [src/websocket/TradeClient.ts:41](https://github.com/cryptowatch/cw-sdk-node/blob/53b8a13/src/websocket/TradeClient.ts#L41)*

#### Type declaration:

* \[ **key**: *number*\]: [PrivateTrade](../interfaces/privatetrade.md)[]

___

### `Static` defaultMaxListeners

▪ **defaultMaxListeners**: *number*

*Inherited from void*

Defined in node_modules/@types/node/events.d.ts:19

## Methods

###  addListener

▸ **addListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:21

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  cancelOrder

▸ **cancelOrder**(`opts`: [CancelOrderOpts](../interfaces/cancelorderopts.md)): *Promise‹void›*

*Defined in [src/websocket/TradeClient.ts:156](https://github.com/cryptowatch/cw-sdk-node/blob/53b8a13/src/websocket/TradeClient.ts#L156)*

**Parameters:**

Name | Type |
------ | ------ |
`opts` | [CancelOrderOpts](../interfaces/cancelorderopts.md) |

**Returns:** *Promise‹void›*

___

###  connect

▸ **connect**(): *void*

*Inherited from [WebSocketClient](websocketclient.md).[connect](websocketclient.md#connect)*

*Defined in [src/websocket/WebSocketClient.ts:101](https://github.com/cryptowatch/cw-sdk-node/blob/53b8a13/src/websocket/WebSocketClient.ts#L101)*

**Returns:** *void*

___

###  disconnect

▸ **disconnect**(): *void*

*Inherited from [WebSocketClient](websocketclient.md).[disconnect](websocketclient.md#disconnect)*

*Defined in [src/websocket/WebSocketClient.ts:161](https://github.com/cryptowatch/cw-sdk-node/blob/53b8a13/src/websocket/WebSocketClient.ts#L161)*

**Returns:** *void*

___

###  emit

▸ **emit**(`event`: string | symbol, ...`args`: any[]): *boolean*

*Inherited from void*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:33

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`...args` | any[] |

**Returns:** *boolean*

___

###  error

▸ **error**(`e`: string): *void*

*Inherited from [WebSocketClient](websocketclient.md).[error](websocketclient.md#error)*

*Defined in [src/websocket/WebSocketClient.ts:133](https://github.com/cryptowatch/cw-sdk-node/blob/53b8a13/src/websocket/WebSocketClient.ts#L133)*

**Parameters:**

Name | Type |
------ | ------ |
`e` | string |

**Returns:** *void*

___

###  eventNames

▸ **eventNames**(): *Array‹string | symbol›*

*Inherited from void*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:34

**Returns:** *Array‹string | symbol›*

___

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Inherited from void*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:30

**Returns:** *number*

___

###  getSubscriptions

▸ **getSubscriptions**(): *ClientSubscription[]*

*Inherited from [WebSocketClient](websocketclient.md).[getSubscriptions](websocketclient.md#getsubscriptions)*

*Defined in [src/websocket/WebSocketClient.ts:173](https://github.com/cryptowatch/cw-sdk-node/blob/53b8a13/src/websocket/WebSocketClient.ts#L173)*

**Returns:** *ClientSubscription[]*

___

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

*Inherited from void*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:35

**Parameters:**

Name | Type |
------ | ------ |
`type` | string &#124; symbol |

**Returns:** *number*

___

###  listeners

▸ **listeners**(`event`: string | symbol): *Function[]*

*Inherited from void*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:31

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  off

▸ **off**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:27

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  on

▸ **on**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:22

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  onConnect

▸ **onConnect**(`fn`: function): *void*

*Inherited from [WebSocketClient](websocketclient.md).[onConnect](websocketclient.md#onconnect)*

*Defined in [src/websocket/WebSocketClient.ts:138](https://github.com/cryptowatch/cw-sdk-node/blob/53b8a13/src/websocket/WebSocketClient.ts#L138)*

**Parameters:**

▪ **fn**: *function*

▸ (): *void*

**Returns:** *void*

___

###  onDisconnect

▸ **onDisconnect**(`fn`: function): *void*

*Inherited from [WebSocketClient](websocketclient.md).[onDisconnect](websocketclient.md#ondisconnect)*

*Defined in [src/websocket/WebSocketClient.ts:142](https://github.com/cryptowatch/cw-sdk-node/blob/53b8a13/src/websocket/WebSocketClient.ts#L142)*

**Parameters:**

▪ **fn**: *function*

▸ (): *void*

**Returns:** *void*

___

###  onError

▸ **onError**(`fn`: function): *void*

*Inherited from [WebSocketClient](websocketclient.md).[onError](websocketclient.md#onerror)*

*Defined in [src/websocket/WebSocketClient.ts:150](https://github.com/cryptowatch/cw-sdk-node/blob/53b8a13/src/websocket/WebSocketClient.ts#L150)*

**Parameters:**

▪ **fn**: *function*

▸ (`e`: Error): *void*

**Parameters:**

Name | Type |
------ | ------ |
`e` | Error |

**Returns:** *void*

___

###  onOrdersUpdate

▸ **onOrdersUpdate**(`fn`: function): *void*

*Defined in [src/websocket/TradeClient.ts:103](https://github.com/cryptowatch/cw-sdk-node/blob/53b8a13/src/websocket/TradeClient.ts#L103)*

**Parameters:**

▪ **fn**: *function*

▸ (`o`: [PrivateOrder](../interfaces/privateorder.md)[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`o` | [PrivateOrder](../interfaces/privateorder.md)[] |

**Returns:** *void*

___

###  onPositionsUpdate

▸ **onPositionsUpdate**(`fn`: function): *void*

*Defined in [src/websocket/TradeClient.ts:115](https://github.com/cryptowatch/cw-sdk-node/blob/53b8a13/src/websocket/TradeClient.ts#L115)*

**Parameters:**

▪ **fn**: *function*

▸ (`p`: [PrivatePosition](../interfaces/privateposition.md)[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`p` | [PrivatePosition](../interfaces/privateposition.md)[] |

**Returns:** *void*

___

###  onReady

▸ **onReady**(`fn`: function): *void*

*Defined in [src/websocket/TradeClient.ts:97](https://github.com/cryptowatch/cw-sdk-node/blob/53b8a13/src/websocket/TradeClient.ts#L97)*

**Parameters:**

▪ **fn**: *function*

▸ (): *void*

**Returns:** *void*

___

###  onStateChange

▸ **onStateChange**(`fn`: function): *void*

*Inherited from [WebSocketClient](websocketclient.md).[onStateChange](websocketclient.md#onstatechange)*

*Defined in [src/websocket/WebSocketClient.ts:146](https://github.com/cryptowatch/cw-sdk-node/blob/53b8a13/src/websocket/WebSocketClient.ts#L146)*

**Parameters:**

▪ **fn**: *function*

▸ (`s`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`s` | string |

**Returns:** *void*

___

###  onTradesUpdate

▸ **onTradesUpdate**(`fn`: function): *void*

*Defined in [src/websocket/TradeClient.ts:109](https://github.com/cryptowatch/cw-sdk-node/blob/53b8a13/src/websocket/TradeClient.ts#L109)*

**Parameters:**

▪ **fn**: *function*

▸ (`t`: [PrivateTrade](../interfaces/privatetrade.md)[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`t` | [PrivateTrade](../interfaces/privatetrade.md)[] |

**Returns:** *void*

___

###  once

▸ **once**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:23

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  placeOrder

▸ **placeOrder**(`opts`: Partial‹[PlaceOrderOpt](../interfaces/placeorderopt.md)›): *Promise‹[PrivateOrder](../interfaces/privateorder.md)›*

*Defined in [src/websocket/TradeClient.ts:121](https://github.com/cryptowatch/cw-sdk-node/blob/53b8a13/src/websocket/TradeClient.ts#L121)*

**Parameters:**

Name | Type |
------ | ------ |
`opts` | Partial‹[PlaceOrderOpt](../interfaces/placeorderopt.md)› |

**Returns:** *Promise‹[PrivateOrder](../interfaces/privateorder.md)›*

___

###  prependListener

▸ **prependListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:24

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  prependOnceListener

▸ **prependOnceListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:25

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  rawListeners

▸ **rawListeners**(`event`: string | symbol): *Function[]*

*Inherited from void*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:32

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Inherited from void*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:28

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string &#124; symbol |

**Returns:** *this*

___

###  removeListener

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:26

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  send

▸ **send**(`data`: Buffer | Uint8Array): *void*

*Inherited from [WebSocketClient](websocketclient.md).[send](websocketclient.md#send)*

*Defined in [src/websocket/WebSocketClient.ts:154](https://github.com/cryptowatch/cw-sdk-node/blob/53b8a13/src/websocket/WebSocketClient.ts#L154)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Buffer &#124; Uint8Array |

**Returns:** *void*

___

###  setMaxListeners

▸ **setMaxListeners**(`n`: number): *this*

*Inherited from void*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:29

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*

___

###  state

▸ **state**(): *symbol*

*Inherited from [WebSocketClient](websocketclient.md).[state](websocketclient.md#state)*

*Defined in [src/websocket/WebSocketClient.ts:169](https://github.com/cryptowatch/cw-sdk-node/blob/53b8a13/src/websocket/WebSocketClient.ts#L169)*

**Returns:** *symbol*

___

### `Static` listenerCount

▸ **listenerCount**(`emitter`: EventEmitter, `event`: string | symbol): *number*

*Inherited from void*

Defined in node_modules/@types/node/events.d.ts:18

**`deprecated`** since v4.0.0

**Parameters:**

Name | Type |
------ | ------ |
`emitter` | EventEmitter |
`event` | string &#124; symbol |

**Returns:** *number*
