import { StreamClient, RESTClient, OrderBookWatcher } from 'cw-sdk-node';
const restClient = new RESTClient();
const streamClient = new StreamClient({
  creds: {
    // These can also be read from ~/.cw/credentials.yml
    apiKey: '<your api key>',
    secretKey: '<your secret key>'
  },
  subscriptions: [
    // Subscription key for all trades from all markets
    'markets:*:trades'
  ]
});

let orderBookWatcher = null;

function run() {
  // Get the ID of the market you want to watch
  restClient
    .getMarketBySymbol({
      exchange: 'kraken',
      base: 'btc',
      quote: 'usd'
    })
    .then((market) => {
      // Set up an OrderBookWatcher
      orderBookWatcher = new OrderBookWatcher(market.id, streamClient, restClient);

      // Set up event callbacks
      orderBookWatcher.onUpdate((marketId, snapshot) => {
        console.log(`Market ${marketId} OrderBook updated!`, snapshot);
      });

      orderBookWatcher.onError((marketID, error) => {
        console.error(`Error updating OrderBook on Marked "${marketID}"!`, error);
      });

      // Connect to stream
      streamClient.connect();
    });
}

run();

// When finished with OrderBookWatcher, be sure to destroy it!
// This unsubscribes from the orderbook stream and prevents it from retrieving more snapshot data.
function cleanUp() {
  streamClient.disconnect();
  orderBookWatcher.destroy();
}
