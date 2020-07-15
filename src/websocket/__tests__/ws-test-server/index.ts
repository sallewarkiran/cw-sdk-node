import deepmerge from 'deepmerge';
import getPort from 'get-port';
import { Server } from 'ws';
import { ProtobufClient, ProtobufStream } from 'websocket/modules/proto';
import { TradeOpts, WebSocketOpts } from 'websocket/types/client';

export const validToken =
  '55v1hv+29RY+xdtJBnFeyoFLjY4r+d8kmx761jCPWi5NgJJPqjPBp5SdqXjrTy/wBoRIcwGAUFVtpGrY7QAOLw==';
export const badAPIKey = 'bad-api-key';
export const badNonce = 'bad-nonce';
export const expiredNonce = 'expired-nonce';

export function getConnOpts(extra?: object): WebSocketOpts {
  if (!extra) {
    extra = {};
  }
  const defaultOpts: WebSocketOpts = {
    creds: {
      url: 'ws://localhost',
      apiKey: 'foo',
      secretKey: 'YmFy'
    },
    reconnect: {
      enabled: true,
      backoff: true,
      timeout: 0,
      maxTimeout: 3
    },
    logLevel: 'disabled',
    nonce: '1531344872326000000'
  };

  return deepmerge(defaultOpts, extra);
}

export function getTradeOpts(connOpts?: object, tradeSubs?: object[]): TradeOpts {
  const wsopts = getConnOpts(connOpts);
  const tradeOpts = {
    tradeSubscriptions: tradeSubs
  };

  return deepmerge(tradeOpts, wsopts) as TradeOpts;
}

export class MockServer extends Server {
  public url: string;

  constructor(url: string, port: number) {
    super({ port });
    this.url = url;
  }
}

export async function getMockWebSocketServer(): Promise<MockServer> {
  // getPort finds an open port, which is necessary since jest runs tests in parallel
  const port: number = await getPort();
  const url = `ws://localhost:${port}`;
  return new MockServer(url, port);
}

// Mock broker/stream server with auth
export async function getMockStreamServer(): Promise<MockServer> {
  const wss = await getMockWebSocketServer();

  wss.on('connection', (ws) => {
    ws.on('message', (data: Uint8Array) => {
      const msg: ProtobufClient.ClientMessage = ProtobufClient.ClientMessage.decode(data);
      if (msg.apiAuthentication) {
        if (msg.apiAuthentication.apiKey === badAPIKey) {
          ws.send(
            ProtobufStream.StreamMessage.encode(
              ProtobufStream.StreamMessage.create({
                authenticationResult: ProtobufStream.AuthenticationResult.create({
                  status: ProtobufStream.AuthenticationResult.Status.BAD_TOKEN
                })
              })
            ).finish()
          );
        }

        if (msg.apiAuthentication.nonce === badNonce) {
          ws.send(
            ProtobufStream.StreamMessage.encode(
              ProtobufStream.StreamMessage.create({
                authenticationResult: ProtobufStream.AuthenticationResult.create({
                  status: ProtobufStream.AuthenticationResult.Status.BAD_NONCE
                })
              })
            ).finish()
          );
        }

        if (msg.apiAuthentication.nonce === expiredNonce) {
          ws.send(
            ProtobufStream.StreamMessage.encode(
              ProtobufStream.StreamMessage.create({
                authenticationResult: ProtobufStream.AuthenticationResult.create({
                  status: ProtobufStream.AuthenticationResult.Status.TOKEN_EXPIRED
                })
              })
            ).finish()
          );
        }

        // This would normally authenticate properly, but we're testing the UNKNOWN error
        if (msg.apiAuthentication.token === validToken) {
          ws.send(
            ProtobufStream.StreamMessage.encode(
              ProtobufStream.StreamMessage.create({
                authenticationResult: ProtobufStream.AuthenticationResult.create({
                  status: ProtobufStream.AuthenticationResult.Status.AUTHENTICATED
                })
              })
            ).finish()
          );
        }
      }
    });
  });

  return wss;
}
