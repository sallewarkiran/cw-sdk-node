[cw-sdk-node - v1.0.0-beta.6](../README.md) › [WebSocketClient](websocketclient.md)

# Class: WebSocketClient

## Hierarchy

* EventEmitter

  ↳ **WebSocketClient**

  ↳ [StreamClient](streamclient.md)

  ↳ [TradeClient](tradeclient.md)

## Index

### Constructors

* [constructor](websocketclient.md#constructor)

### Properties

* [connState](websocketclient.md#protected-connstate)
* [subscriptions](websocketclient.md#subscriptions)
* [defaultMaxListeners](websocketclient.md#static-defaultmaxlisteners)

### Methods

* [addListener](websocketclient.md#addlistener)
* [connect](websocketclient.md#connect)
* [disconnect](websocketclient.md#disconnect)
* [emit](websocketclient.md#emit)
* [error](websocketclient.md#error)
* [eventNames](websocketclient.md#eventnames)
* [getMaxListeners](websocketclient.md#getmaxlisteners)
* [getSubscriptions](websocketclient.md#getsubscriptions)
* [listenerCount](websocketclient.md#listenercount)
* [listeners](websocketclient.md#listeners)
* [off](websocketclient.md#off)
* [on](websocketclient.md#on)
* [onConnect](websocketclient.md#onconnect)
* [onDisconnect](websocketclient.md#ondisconnect)
* [onError](websocketclient.md#onerror)
* [onStateChange](websocketclient.md#onstatechange)
* [once](websocketclient.md#once)
* [prependListener](websocketclient.md#prependlistener)
* [prependOnceListener](websocketclient.md#prependoncelistener)
* [rawListeners](websocketclient.md#rawlisteners)
* [removeAllListeners](websocketclient.md#removealllisteners)
* [removeListener](websocketclient.md#removelistener)
* [send](websocketclient.md#send)
* [setMaxListeners](websocketclient.md#setmaxlisteners)
* [state](websocketclient.md#state)
* [listenerCount](websocketclient.md#static-listenercount)

## Constructors

###  constructor

\+ **new WebSocketClient**(`opts`: [WebSocketOpts](../interfaces/websocketopts.md)): *[WebSocketClient](websocketclient.md)*

*Defined in [src/websocket/WebSocketClient.ts:64](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/websocket/WebSocketClient.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`opts` | [WebSocketOpts](../interfaces/websocketopts.md) |

**Returns:** *[WebSocketClient](websocketclient.md)*

## Properties

### `Protected` connState

• **connState**: *symbol*

*Defined in [src/websocket/WebSocketClient.ts:58](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/websocket/WebSocketClient.ts#L58)*

___

###  subscriptions

• **subscriptions**: *object*

*Defined in [src/websocket/WebSocketClient.ts:47](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/websocket/WebSocketClient.ts#L47)*

#### Type declaration:

* \[ **key**: *string*\]: ClientSubscription

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

###  connect

▸ **connect**(): *void*

*Defined in [src/websocket/WebSocketClient.ts:101](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/websocket/WebSocketClient.ts#L101)*

**Returns:** *void*

___

###  disconnect

▸ **disconnect**(): *void*

*Defined in [src/websocket/WebSocketClient.ts:161](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/websocket/WebSocketClient.ts#L161)*

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

*Defined in [src/websocket/WebSocketClient.ts:133](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/websocket/WebSocketClient.ts#L133)*

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

*Defined in [src/websocket/WebSocketClient.ts:173](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/websocket/WebSocketClient.ts#L173)*

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

*Defined in [src/websocket/WebSocketClient.ts:138](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/websocket/WebSocketClient.ts#L138)*

**Parameters:**

▪ **fn**: *function*

▸ (): *void*

**Returns:** *void*

___

###  onDisconnect

▸ **onDisconnect**(`fn`: function): *void*

*Defined in [src/websocket/WebSocketClient.ts:142](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/websocket/WebSocketClient.ts#L142)*

**Parameters:**

▪ **fn**: *function*

▸ (): *void*

**Returns:** *void*

___

###  onError

▸ **onError**(`fn`: function): *void*

*Defined in [src/websocket/WebSocketClient.ts:150](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/websocket/WebSocketClient.ts#L150)*

**Parameters:**

▪ **fn**: *function*

▸ (`e`: Error): *void*

**Parameters:**

Name | Type |
------ | ------ |
`e` | Error |

**Returns:** *void*

___

###  onStateChange

▸ **onStateChange**(`fn`: function): *void*

*Defined in [src/websocket/WebSocketClient.ts:146](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/websocket/WebSocketClient.ts#L146)*

**Parameters:**

▪ **fn**: *function*

▸ (`s`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`s` | string |

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

*Defined in [src/websocket/WebSocketClient.ts:154](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/websocket/WebSocketClient.ts#L154)*

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

*Defined in [src/websocket/WebSocketClient.ts:169](https://github.com/cryptowatch/cw-sdk-node/blob/bf249b1/src/websocket/WebSocketClient.ts#L169)*

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
