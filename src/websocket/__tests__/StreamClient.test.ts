import { ProtobufClient, ProtobufMarkets, ProtobufStream } from 'websocket/modules/proto';
import { StreamClient } from 'websocket/StreamClient';
import {
  badAPIKey,
  badNonce,
  expiredNonce,
  getConnOpts,
  getMockStreamServer,
  getMockWebSocketServer,
  validToken
} from './ws-test-server';

// TODO test subscription results

test('authentication-failed-invalid-token', async (done) => {
  expect.assertions(1);

  const wss = await getMockStreamServer();

  // Bad token
  const client = new StreamClient(
    getConnOpts({
      creds: {
        url: wss.url,
        apiKey: badAPIKey
      }
    })
  );

  client.onError((error) => {
    expect(error).toBe('Authentication failed: invalid token');
  });

  client.onDisconnect(() => {
    wss.close();
    done();
  });

  client.connect();
});

test('authentication-failed-invalid-nonce', async (done) => {
  expect.assertions(1);
  const wss = await getMockStreamServer();

  const client = new StreamClient(
    getConnOpts({
      creds: {
        url: wss.url
      },
      nonce: badNonce
    })
  );

  client.onError((error) => {
    expect(error).toBe('Authentication failed: invalid nonce');
  });

  client.onDisconnect(() => {
    wss.close();
    done();
  });

  client.connect();
});

test('authentication-failed-token-expired', async (done) => {
  expect.assertions(1);
  const wss = await getMockStreamServer();

  const client = new StreamClient(
    getConnOpts({
      creds: {
        url: wss.url
      },
      nonce: expiredNonce
    })
  );

  client.onError((error) => {
    expect(error).toBe('Authentication failed: token is expired');
  });

  client.onDisconnect(() => {
    wss.close();
    done();
  });

  client.connect();
});

test('authentication-failed-internal-error', async (done) => {
  expect.assertions(1);
  const wss = await getMockWebSocketServer();

  wss.on('connection', (ws) => {
    ws.on('message', (data: Uint8Array) => {
      const msg: ProtobufClient.ClientMessage = ProtobufClient.ClientMessage.decode(data);
      if (!msg.apiAuthentication) {
        return;
      }

      // This would normally authenticate properly, but we're testing the UNKNOWN error
      if (msg.apiAuthentication.token === validToken) {
        ws.send(
          ProtobufStream.StreamMessage.encode(
            ProtobufStream.StreamMessage.create({
              authenticationResult: ProtobufStream.AuthenticationResult.create({
                status: ProtobufStream.AuthenticationResult.Status.UNKNOWN
              })
            })
          ).finish()
        );
      }
    });
  });

  const client = new StreamClient(
    getConnOpts({
      creds: {
        url: wss.url
      }
    })
  );

  client.onError((error) => {
    expect(error).toBe('Authentication failed: internal error');
  });

  client.onDisconnect(() => {
    wss.close();
    done();
  });

  client.connect();
});

// TODO test unsubscribe
test('client-subscribe-unsubscribe', async (done) => {
  const wss = await getMockWebSocketServer();

  const subscribe1 = ['foo'];
  const subscribe2 = ['bar', 'baz', 'woo'];

  expect.assertions(3);

  const client = new StreamClient(
    getConnOpts({
      subscriptions: subscribe1,
      creds: {
        url: wss.url
      }
    })
  );

  wss.on('connection', (socket) => {
    socket.on('message', (data: Uint8Array) => {
      const msg: ProtobufClient.ClientMessage = ProtobufClient.ClientMessage.decode(data);

      if (
        msg.apiAuthentication &&
        msg.apiAuthentication.clientSubscriptions &&
        msg.apiAuthentication.clientSubscriptions[0].streamSubscription
      ) {
        expect(msg.apiAuthentication.clientSubscriptions[0].streamSubscription.resource).toEqual(
          subscribe1[0]
        );
        socket.send(
          ProtobufStream.StreamMessage.encode(
            ProtobufStream.StreamMessage.create({
              authenticationResult: ProtobufStream.AuthenticationResult.create({
                status: ProtobufStream.AuthenticationResult.Status.AUTHENTICATED
              })
            })
          ).finish()
        );
      }

      if (msg.subscribe && msg.subscribe.subscriptions) {
        const subscriptionStrings: string[] = [];
        msg.subscribe.subscriptions.forEach((s) => {
          if (s.streamSubscription && s.streamSubscription.resource) {
            subscriptionStrings.push(s.streamSubscription.resource);
          }
        });
        expect(subscriptionStrings).toEqual(subscribe2);
        expect(Object.keys(client.subscriptions).sort()).toEqual(
          ['foo', 'bar', 'baz', 'woo'].sort()
        );
        done();
        wss.close();
      }
    });
  });

  client.onConnect(() => {
    client.subscribe(subscribe2);
  });

  client.connect();
});

test('client-stream', async (done) => {
  expect.assertions(5);

  const REQ_MSG_1 = 'send pair update';
  const REQ_MSG_2 = 'send market update';
  const REQ_MSG_3 = 'send bad proto';

  const wss = await getMockWebSocketServer();

  wss.on('connection', (ws) => {
    // authenticate autimatically, trigger onConnect
    ws.send(
      ProtobufStream.StreamMessage.encode(
        ProtobufStream.StreamMessage.create({
          authenticationResult: ProtobufStream.AuthenticationResult.create({
            status: ProtobufStream.AuthenticationResult.Status.AUTHENTICATED
          })
        })
      ).finish()
    );
    ws.on('message', (msg: Buffer) => {
      switch (String(msg)) {
        case REQ_MSG_1:
          ws.send(
            ProtobufStream.StreamMessage.encode(
              ProtobufStream.StreamMessage.create({
                pairUpdate: ProtobufMarkets.PairUpdateMessage.create({
                  pair: 1,
                  vwapUpdate: ProtobufMarkets.PairVwapUpdate.create({
                    vwap: 10
                  })
                })
              })
            ).finish()
          );
          break;

        case REQ_MSG_2:
          ws.send(
            ProtobufStream.StreamMessage.encode(
              ProtobufStream.StreamMessage.create({
                marketUpdate: ProtobufMarkets.MarketUpdateMessage.create({
                  market: ProtobufMarkets.Market.create({
                    marketId: 1,
                    exchangeId: 1,
                    currencyPairId: 1
                  }),
                  orderBookUpdate: ProtobufMarkets.OrderBookUpdate.create({
                    seqNum: 0
                  })
                })
              })
            ).finish()
          );
          break;

        case REQ_MSG_3:
          ws.send(Buffer.from('bad-proto'));
      }
    });
  });

  const client = new StreamClient(
    getConnOpts({
      creds: {
        url: wss.url
      }
    })
  );

  client.onConnect(() => {
    client.send(Buffer.from(REQ_MSG_1));
  });

  client.onPairUpdate((pairUpdate) => {
    expect(pairUpdate.pair.id).toBe(1);
    if (pairUpdate.vwapUpdate) {
      expect(pairUpdate.vwapUpdate.vwap).toBe('10');
    }
    client.send(Buffer.from(REQ_MSG_2));
  });

  client.onMarketUpdate((marketUpdate) => {
    if (
      marketUpdate.orderBookSnapshot &&
      marketUpdate.orderBookSnapshot.asks &&
      marketUpdate.orderBookSnapshot.bids
    ) {
      expect(marketUpdate.orderBookSnapshot.asks.length).toBe(0);
      expect(marketUpdate.orderBookSnapshot.bids.length).toBe(0);
      client.send(Buffer.from(REQ_MSG_3));
    }
  });
  let complete = false;
  client.onError((error) => {
    if (!complete) {
      expect(error).toBe('Failed to deserialize ProtobufStream message');
      wss.close();
      complete = true;
      done();
    }
  });

  client.connect();
});
