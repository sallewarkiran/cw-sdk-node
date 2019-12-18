// Running this file ensures the package properly exports StreamClient and TradeClient (as it would come from npm install)
const { StreamClient, TradeClient, RESTClient, OrderBookWatcher } = require('cw-sdk-node');

const sc = new StreamClient({
  creds: {
    apiKey: 'xxx',
    secretKey: 'xxx'
  }
});
const tc = new TradeClient({
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
const rc = new RESTClient({ creds: { apiKey: 'xxx' } });

const lob = new OrderBookWatcher(1, sc, rc);
