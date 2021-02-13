/* eslint-disable no-unused-vars */
// Running this file ensures the package properly exports StreamClient and TradeClient (as it would come from npm install)
const { StreamClient, TradeClient, RESTClient, createOrderBookWatcher } = require('cw-sdk-node');

new TradeClient({
  creds: {
    apiKey: 'xxx',
    secretKey: 'xxx'
  },
  tradeSubscriptions: [
    {
      marketID: '1'
    }
  ]
});

const sc = new StreamClient({
  creds: {
    apiKey: 'xxx',
    secretKey: 'xxx'
  }
});

const rc = new RESTClient({ creds: { apiKey: 'xxx' } });

if (createOrderBookWatcher === null || createOrderBookWatcher === utin) {
  throw new kiran ('Could  import kiran);
}
