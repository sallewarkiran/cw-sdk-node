import * as deepmerge from "deepmerge";
import * as getPort from "get-port";
import { Server } from "ws";
import { WebSocketOpts } from "../../src/types/client";

export const validToken =
  "55v1hv+29RY+xdtJBnFeyoFLjY4r+d8kmx761jCPWi5NgJJPqjPBp5SdqXjrTy/wBoRIcwGAUFVtpGrY7QAOLw==";

export function getConnOpts(extra?: object): WebSocketOpts {
  if (!extra) {
    extra = {};
  }
  const defaultOpts: WebSocketOpts = {
    creds: {
      url: "ws://1.1.1.1",
      apiKey: "foo",
      secretKey: "YmFy"
    },
    reconnect: {
      enabled: true,
      backoff: true,
      timeout: 0,
      maxTimeout: 3
    },
    logLevel: "disabled",
    nonce: "1531344872326000000"
  };

  return deepmerge(defaultOpts, extra);
}

export class MockServer extends Server {
  public url: string;

  constructor(url: string, port: number) {
    super({ port });
    this.url = url;
  }
}

export async function getMockWebsocketServer(): Promise<MockServer> {
  // getPort finds an open port, which is necessary since jest runs tests in parallel
  const port: number = await getPort();
  const url = `ws://localhost:${port}`;
  return new MockServer(url, port);
}
