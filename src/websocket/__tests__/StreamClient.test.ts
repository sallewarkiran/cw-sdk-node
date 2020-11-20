import { ProtobufClient, ProtobufStream } from '../../websocket/modules/proto';
import { StreamClient } from '../../websocket/StreamClient';
import {
  badAPIKey,
  badNonce,
  expiredNonce,
  getConnOpts,
  getMockStreamServer,
  validToken,
  MockServer
} from './ws-test-server';

import WebSocket from 'ws';

// TODO test subscription results
describe('StreamClient tests', () => {
  let wss: MockServer;

  beforeEach(async (done) => {
    wss = await getMockStreamServer();
    done();
  });

  afterEach((done) => {
    wss.close(() => {
      done();
    });
  });

  test('authentication-failed-invalid-token', async (done) => {
    expect.assertions(1);

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
      done();
    });

    client.connect();
  });

  test('authentication-failed-invalid-nonce', async (done) => {
    expect.assertions(1);
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
      client.disconnect();
    });

    client.onDisconnect(() => {
      done();
    });

    client.connect();
  });

  test('authentication-failed-token-expired', async (done) => {
    expect.assertions(1);
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
      client.disconnect();
    });

    client.onDisconnect(() => {
      done();
    });

    client.connect();
  });

  test('authentication-failed-internal-error', async (done) => {
    expect.assertions(1);
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
      client.disconnect();
    });

    client.onDisconnect(() => {
      done();
    });

    client.connect();
  });

  // TODO test unsubscribe
  test('client-subscribe-unsubscribe', async (done) => {
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
    let verified = false;

    const connectionListener = (socket: WebSocket): void => {
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

        if (msg.subscribe && msg.subscribe.subscriptions && !verified) {
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
          verified = true;
          client.disconnect();
        }
      });
    };

    wss.on('connection', connectionListener);

    client.onConnect(() => {
      client.subscribe(subscribe2);
    });

    client.onDisconnect(() => {
      done();
    });

    client.connect();
  });
});
