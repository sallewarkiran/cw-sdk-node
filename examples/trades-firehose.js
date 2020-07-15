import { StreamClient, RESTClient } from 'cw-sdk-node';
const rc = new RESTClient();
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

async function run() {
  const markets = await rc.getMarkets();
  const marketCache = {};
  markets.forEach((market) => {
    marketCache[market.id] = market; // Cache all market identifiers
  });

  // Listen for received trades and print them
  streamClient.onMarketUpdate((marketData) => {
    const tradesUpdate = marketData.tradesUpdate;
    if (tradesUpdate) {
      tradesUpdate.trades.forEach((tradeUpdate) => {
        console.log(
          marketCache[marketData.market.id], // access market info from cache
          tradeUpdate.side,
          'Price: ',
          tradeUpdate.price,
          'Amount: ',
          tradeUpdate.amount
        );
      });
    }
  });

  // Connect to stream
  streamClient.connect();
}

run().catch((e) => {
  console.error(e);
});
