[cw-sdk-node](../README.md) › [MockServer](mockserver.md)

# Class: MockServer

## Hierarchy

* Server

  ↳ **MockServer**

## Index

### Constructors

* [constructor](mockserver.md#constructor)

### Properties

* [clients](mockserver.md#clients)
* [options](mockserver.md#options)
* [path](mockserver.md#path)
* [url](mockserver.md#url)
* [defaultMaxListeners](mockserver.md#static-defaultmaxlisteners)

### Methods

* [addListener](mockserver.md#addlistener)
* [address](mockserver.md#address)
* [close](mockserver.md#close)
* [emit](mockserver.md#emit)
* [eventNames](mockserver.md#eventnames)
* [getMaxListeners](mockserver.md#getmaxlisteners)
* [handleUpgrade](mockserver.md#handleupgrade)
* [listenerCount](mockserver.md#listenercount)
* [listeners](mockserver.md#listeners)
* [off](mockserver.md#off)
* [on](mockserver.md#on)
* [once](mockserver.md#once)
* [prependListener](mockserver.md#prependlistener)
* [prependOnceListener](mockserver.md#prependoncelistener)
* [rawListeners](mockserver.md#rawlisteners)
* [removeAllListeners](mockserver.md#removealllisteners)
* [removeListener](mockserver.md#removelistener)
* [setMaxListeners](mockserver.md#setmaxlisteners)
* [shouldHandle](mockserver.md#shouldhandle)
* [listenerCount](mockserver.md#static-listenercount)

## Constructors

###  constructor

\+ **new MockServer**(`url`: string, `port`: number): *[MockServer](mockserver.md)*

*Overrides void*

Defined in websocket/__tests__/ws-test-server/index.ts:46

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |
`port` | number |

**Returns:** *[MockServer](mockserver.md)*

## Properties

###  clients

• **clients**: *Set‹WebSocket›*

*Inherited from void*

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/ws/index.d.ts:218

___

###  options

• **options**: *ServerOptions*

*Inherited from void*

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/ws/index.d.ts:216

___

###  path

• **path**: *string*

*Inherited from void*

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/ws/index.d.ts:217

___

###  url

• **url**: *string*

Defined in websocket/__tests__/ws-test-server/index.ts:46

___

### `Static` defaultMaxListeners

▪ **defaultMaxListeners**: *number*

*Inherited from void*

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/node/events.d.ts:9

## Methods

###  addListener

▸ **addListener**(`event`: "connection", `cb`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/ws/index.d.ts:235

**Parameters:**

▪ **event**: *"connection"*

▪ **cb**: *function*

▸ (`client`: WebSocket): *void*

**Parameters:**

Name | Type |
------ | ------ |
`client` | WebSocket |

**Returns:** *this*

▸ **addListener**(`event`: "error", `cb`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/ws/index.d.ts:236

**Parameters:**

▪ **event**: *"error"*

▪ **cb**: *function*

▸ (`err`: Error): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err` | Error |

**Returns:** *this*

▸ **addListener**(`event`: "headers", `cb`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/ws/index.d.ts:237

**Parameters:**

▪ **event**: *"headers"*

▪ **cb**: *function*

▸ (`headers`: string[], `request`: IncomingMessage): *void*

**Parameters:**

Name | Type |
------ | ------ |
`headers` | string[] |
`request` | IncomingMessage |

**Returns:** *this*

▸ **addListener**(`event`: "listening", `cb`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/ws/index.d.ts:238

**Parameters:**

▪ **event**: *"listening"*

▪ **cb**: *function*

▸ (): *void*

**Returns:** *this*

▸ **addListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/ws/index.d.ts:239

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

###  address

▸ **address**(): *AddressInfo | string*

*Inherited from void*

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/ws/index.d.ts:222

**Returns:** *AddressInfo | string*

___

###  close

▸ **close**(`cb?`: function): *void*

*Inherited from void*

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/ws/index.d.ts:223

**Parameters:**

▪`Optional`  **cb**: *function*

▸ (`err?`: Error): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err?` | Error |

**Returns:** *void*

___

###  emit

▸ **emit**(`event`: string | symbol, ...`args`: any[]): *boolean*

*Inherited from void*

*Overrides void*

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/node/events.d.ts:23

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`...args` | any[] |

**Returns:** *boolean*

___

###  eventNames

▸ **eventNames**(): *Array‹string | symbol›*

*Inherited from void*

*Overrides void*

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/node/events.d.ts:24

**Returns:** *Array‹string | symbol›*

___

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Inherited from void*

*Overrides void*

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/node/events.d.ts:20

**Returns:** *number*

___

###  handleUpgrade

▸ **handleUpgrade**(`request`: IncomingMessage, `socket`: Socket, `upgradeHead`: Buffer, `callback`: function): *void*

*Inherited from void*

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/ws/index.d.ts:224

**Parameters:**

▪ **request**: *IncomingMessage*

▪ **socket**: *Socket*

▪ **upgradeHead**: *Buffer*

▪ **callback**: *function*

▸ (`client`: WebSocket): *void*

**Parameters:**

Name | Type |
------ | ------ |
`client` | WebSocket |

**Returns:** *void*

___

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

*Inherited from void*

*Overrides void*

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/node/events.d.ts:25

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

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/node/events.d.ts:21

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

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/node/events.d.ts:17

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

▸ **on**(`event`: "connection", `cb`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/ws/index.d.ts:229

**Parameters:**

▪ **event**: *"connection"*

▪ **cb**: *function*

▸ (`this`: WebSocket, `socket`: WebSocket, `request`: IncomingMessage): *void*

**Parameters:**

Name | Type |
------ | ------ |
`this` | WebSocket |
`socket` | WebSocket |
`request` | IncomingMessage |

**Returns:** *this*

▸ **on**(`event`: "error", `cb`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/ws/index.d.ts:230

**Parameters:**

▪ **event**: *"error"*

▪ **cb**: *function*

▸ (`this`: WebSocket, `error`: Error): *void*

**Parameters:**

Name | Type |
------ | ------ |
`this` | WebSocket |
`error` | Error |

**Returns:** *this*

▸ **on**(`event`: "headers", `cb`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/ws/index.d.ts:231

**Parameters:**

▪ **event**: *"headers"*

▪ **cb**: *function*

▸ (`this`: WebSocket, `headers`: string[], `request`: IncomingMessage): *void*

**Parameters:**

Name | Type |
------ | ------ |
`this` | WebSocket |
`headers` | string[] |
`request` | IncomingMessage |

**Returns:** *this*

▸ **on**(`event`: "listening", `cb`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/ws/index.d.ts:232

**Parameters:**

▪ **event**: *"listening"*

▪ **cb**: *function*

▸ (`this`: WebSocket): *void*

**Parameters:**

Name | Type |
------ | ------ |
`this` | WebSocket |

**Returns:** *this*

▸ **on**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/ws/index.d.ts:233

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (`this`: WebSocket, ...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`this` | WebSocket |
`...args` | any[] |

**Returns:** *this*

___

###  once

▸ **once**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/node/events.d.ts:13

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

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/node/events.d.ts:14

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

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/node/events.d.ts:15

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

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/node/events.d.ts:22

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

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/node/events.d.ts:18

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

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/node/events.d.ts:16

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

###  setMaxListeners

▸ **setMaxListeners**(`n`: number): *this*

*Inherited from void*

*Overrides void*

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/node/events.d.ts:19

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*

___

###  shouldHandle

▸ **shouldHandle**(`request`: IncomingMessage): *boolean*

*Inherited from void*

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/ws/index.d.ts:226

**Parameters:**

Name | Type |
------ | ------ |
`request` | IncomingMessage |

**Returns:** *boolean*

___

### `Static` listenerCount

▸ **listenerCount**(`emitter`: EventEmitter, `event`: string | symbol): *number*

*Inherited from void*

Defined in /home/dave/src/cryptowatch/cw-sdk-node/node_modules/@types/node/events.d.ts:8

**`deprecated`** since v4.0.0

**Parameters:**

Name | Type |
------ | ------ |
`emitter` | EventEmitter |
`event` | string &#124; symbol |

**Returns:** *number*
