import { StateWaitingToReconnect } from "../src/constants";
import WebSocketClient from "../src/WebSocketClient";
import { getConnOpts, getMockWebsocketServer } from "./mock-ws-server";

test("error-missing-credentials", () => {
  function createConnWithoutApiKey(): WebSocketClient {
    return new WebSocketClient(
      getConnOpts({
        creds: {
          apiKey: ""
        }
      })
    );
  }
  expect(createConnWithoutApiKey).toThrow("Missing credential apiKey");

  function createConnWithoutSecretKey(): WebSocketClient {
    return new WebSocketClient(
      getConnOpts({
        creds: {
          secretKey: ""
        }
      })
    );
  }
  expect(createConnWithoutSecretKey).toThrow("Missing credential secretKey");
});

test("error-connection-refused", done => {
  const client = new WebSocketClient(
    getConnOpts({
      reconnect: {
        enabled: false
      }
    })
  );

  client.onError(error => {
    expect(error).toBe("Connection failed");
    done();
  });

  client.connect();
});

test("reconnection-backoff", async done => {
  // This is for the reconnect timeouts
  jest.useFakeTimers();

  const wss = await getMockWebsocketServer();

  // Close the connection immediately to simulate not being able to connect
  wss.on("connection", ws => {
    ws.close();
  });

  const client = new WebSocketClient(
    getConnOpts({
      creds: {
        url: wss.url
      },
      reconnect: {
        maxTimeout: 3
      }
    })
  );

  // Using linear backoff, with a maxTimeout of 3s, these are the
  // first 7 expected timeouts
  const expectedTimeouts = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3];

  expect.assertions(expectedTimeouts.length);

  client.on(StateWaitingToReconnect, (time: number) => {
    // Ensure the client's reconnectTimeout has been updated with backoff
    expect(time).toBe(expectedTimeouts.shift());

    if (expectedTimeouts.length === 0) {
      wss.close();
      done();
    } else {
      // Advance the mocked setTimeouts
      jest.runOnlyPendingTimers();
    }
  });

  client.connect();
});
