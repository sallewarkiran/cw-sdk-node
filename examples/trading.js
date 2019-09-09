const { TradeClient } = require("../build");

const tc = new TradeClient({
  logLevel: "debug",
  conn: {
    apiKey: "4G3KILKXRU5JGGCN9O8W",
    secretKey: "yMXE4dMI+TnTGmoj8tZCbqpV/G9gPou8GClsklrm"
  },
  tradeSubscriptions: [
    {
      marketID: "65"
    }
  ]
});

tc.onOrdersUpdate(orders => {
  console.log("Orders update");
});

tc.onTradesUpdate(trades => {
  console.log("Trades update");
});

tc.onError(err => {
  console.log("on error", err);
});

// TODO complain if the market id is not one of the sessions
tc.onReady(() => {
  tc.placeOrder({
    marketID: "65",
    price: "0.01",
    amount: "0.01",
    side: "buy"
  })
    .then(res => {
      console.log("result", res);
    })
    .catch(e => {
      console.log("in error from place order", e);
    });
});

tc.connect();
