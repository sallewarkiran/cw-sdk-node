import { ProtobufBroker, ProtobufClient, ProtobufStream } from '../../websocket/modules/proto';
import { TradeClient } from '../../websocket/TradeClient';
import { PlaceOrderOpt } from '../../websocket/types/trading';
import { getNumber } from '../../util/helpers';
import logger from '../../util/logger';
import { getConnOpts, getMockWebSocketServer, getTradeOpts, validToken } from './ws-test-server';

test('client-trade-session', () => {
  function createClientWithoutSubscriptions(): TradeClient {
    return new TradeClient(getConnOpts());
  }

  expect(createClientWithoutSubscriptions).toThrow('Missing parameter: tradeSubscriptions');
});

test('trade-sessions', async (done) => {
  expect.assertions(25);

  const wss = await getMockWebSocketServer();
  const marketID = 1;

  const tradeDate = new Date().getTime();
  const trades: ProtobufBroker.PrivateTrade[] = [
    ProtobufBroker.PrivateTrade.create({
      externalId: '12345',
      orderId: '12345',
      timeMillis: tradeDate,
      priceString: '1.09',
      amountString: '2.03',
      side: 1
    })
  ];

  const tradesParsed = [
    {
      amount: '2.03',
      id: '12345',
      orderID: '12345',
      price: '1.09',
      side: 'buy',
      timestamp: new Date(tradeDate)
    }
  ];

  const positionTime = Math.floor(new Date().getTime() / 1000);
  const positions: ProtobufBroker.PrivatePosition[] = [
    ProtobufBroker.PrivatePosition.create({
      id: '1234',
      time: positionTime,
      side: 0,
      avgPriceString: '1.3',
      amountOpenString: '1.0',
      amountClosedString: '0',
      orderIds: ['1234'],
      tradeIds: ['4312']
    })
  ];

  const positionsParsed = [
    {
      amountClosed: '0',
      amountOpen: '1.0',
      avgPrice: '1.3',
      id: '1234',
      orderIDs: ['1234'],
      tradeIDs: ['4312'],
      side: 'sell',
      timestamp: new Date(positionTime * 1000)
    }
  ];

  const order1Opts: PlaceOrderOpt = {
    side: 'buy',
    type: 'limit',
    price: '1',
    amount: '1',
    marketID,
    requestID: 'reqid1'
  };

  const order1ID = 'orderid1';
  let orderTime: Date;

  const cancelOrder1Opts = {
    marketID,
    orderID: order1ID,
    requestID: 'cancelid1'
  };

  const order2Opts: PlaceOrderOpt = {
    side: 'sell',
    type: 'market',
    amount: '1',
    marketID,
    requestID: 'reqid2'
  };

  let authHandled = false;
  let order1Handled = false;
  let order1Canceled = false;
  const order2Handled = false;

  wss.on('connection', (ws) => {
    ws.on('message', (data: Uint8Array) => {
      if (!authHandled) {
        const msg = ProtobufClient.ClientMessage.decode(data);
        if (
          msg.apiAuthentication &&
          msg.apiAuthentication.clientSubscriptions &&
          msg.apiAuthentication.clientSubscriptions.length > 0 &&
          msg.apiAuthentication.clientSubscriptions[0].tradeSubscription &&
          msg.apiAuthentication.clientSubscriptions[0].tradeSubscription.marketId
        ) {
          if (msg.apiAuthentication.token === validToken) {
            ws.send(
              ProtobufBroker.BrokerUpdateMessage.encode(
                ProtobufBroker.BrokerUpdateMessage.create({
                  authenticationResult: ProtobufStream.AuthenticationResult.create({
                    status: ProtobufStream.AuthenticationResult.Status.AUTHENTICATED
                  })
                })
              ).finish()
            );
          }

          expect(msg.apiAuthentication.clientSubscriptions[0].tradeSubscription.marketId).toBe(
            String(marketID)
          );

          // send syncing status
          ws.send(
            ProtobufBroker.BrokerUpdateMessage.encode(
              ProtobufBroker.BrokerUpdateMessage.create({
                marketId: marketID,
                sessionStatusUpdate: ProtobufBroker.SessionStatusUpdate.create({
                  initialized: true,
                  syncing: true,
                  lastSyncTime: 0,
                  syncError: 0
                })
              })
            ).finish()
          );

          // orders update
          ws.send(
            ProtobufBroker.BrokerUpdateMessage.encode(
              ProtobufBroker.BrokerUpdateMessage.create({
                marketId: marketID,
                ordersUpdate: ProtobufBroker.OrdersUpdate.create({
                  orders: []
                })
              })
            ).finish()
          );

          // trades update
          ws.send(
            ProtobufBroker.BrokerUpdateMessage.encode(
              ProtobufBroker.BrokerUpdateMessage.create({
                marketId: marketID,
                tradesUpdate: ProtobufBroker.TradesUpdate.create({
                  trades
                })
              })
            ).finish()
          );

          // positions update
          ws.send(
            ProtobufBroker.BrokerUpdateMessage.encode(
              ProtobufBroker.BrokerUpdateMessage.create({
                marketId: marketID,
                positionsUpdate: ProtobufBroker.PositionsUpdate.create({
                  positions
                })
              })
            ).finish()
          );

          authHandled = true;
          return;
          // TODO balances update
        }
      }

      if (authHandled && !order1Handled) {
        const br1 = ProtobufBroker.BrokerRequest.decode(data);

        if (br1.placeOrderRequest && br1.placeOrderRequest.order) {
          const newOrder = br1.placeOrderRequest.order;

          expect(newOrder.amountParamString).toBe('1');
          expect(newOrder.side).toBe(1); // buy
          expect(newOrder.type).toBe(1); // limit
          expect(newOrder.priceParams).toEqual([
            {
              valueString: String(order1Opts.price),
              type: 0 // absolute value
            }
          ]);

          newOrder.amountFilledString = '0.0';
          newOrder.id = order1ID;

          // Truncate date to seconds
          const t = Math.floor(new Date().getTime() / 1000);
          orderTime = new Date(t * 1000);
          newOrder.time = orderTime.getTime() / 1000;

          ws.send(
            ProtobufBroker.BrokerUpdateMessage.encode(
              ProtobufBroker.BrokerUpdateMessage.create({
                marketId: marketID,
                requestResolutionUpdate: ProtobufBroker.RequestResolutionUpdate.create({
                  id: order1Opts.requestID,
                  error: 0,
                  message: '',
                  placeOrderResult: {
                    order: newOrder
                  }
                })
              })
            ).finish()
          );

          ws.send(
            ProtobufBroker.BrokerUpdateMessage.encode(
              ProtobufBroker.BrokerUpdateMessage.create({
                marketId: marketID,
                ordersUpdate: ProtobufBroker.OrdersUpdate.create({
                  orders: [newOrder]
                })
              })
            ).finish()
          );
        }

        order1Handled = true;
        return;
      }

      if (order1Handled && !order1Canceled) {
        const br2 = ProtobufBroker.BrokerRequest.decode(data);
        expect(getNumber(br2.marketId)).toBe(marketID);
        expect(br2.cancelOrderRequest).toEqual({
          orderId: order1ID
        });

        ws.send(
          ProtobufBroker.BrokerUpdateMessage.encode(
            ProtobufBroker.BrokerUpdateMessage.create({
              marketId: marketID,
              requestResolutionUpdate: ProtobufBroker.RequestResolutionUpdate.create({
                id: cancelOrder1Opts.requestID,
                error: 0,
                message: '',
                cancelOrderResult: {
                  orderId: order1ID
                }
              })
            })
          ).finish()
        );

        order1Canceled = true;
        return;
      }

      if (!order2Handled) {
        const br3 = ProtobufBroker.BrokerRequest.decode(data);
        if (!br3.placeOrderRequest || !br3.placeOrderRequest.order) {
          done.fail();
          return;
        }
        const newOrder = br3.placeOrderRequest.order;
        expect(newOrder.side).toBe(0);
        expect(newOrder.type).toBe(0);
        expect(newOrder.fundingType).toBe(0);
        expect(newOrder.amountParamString).toBe('1');
        expect(getNumber(br3.marketId)).toBe(marketID);

        // end test
        wss.close();
        done();
      }
    });
  });

  const client = new TradeClient(
    getTradeOpts(
      {
        creds: {
          url: wss.url
        }
      },
      [{ marketID }]
    )
  );

  client.onReady(() => {
    expect(client.orders[marketID]).toStrictEqual([]);
    expect(client.positions[marketID]).toStrictEqual(positionsParsed);
    expect(client.trades[marketID]).toStrictEqual(tradesParsed);

    logger.debug('placing order...');
    client

      // Limit order
      .placeOrder(order1Opts)
      .then((order) => {
        logger.debug('place order resp %o', order);
        expect(client.orders[marketID][0]).toStrictEqual(order);

        logger.debug('cancelling order...');
        client
          .cancelOrder(cancelOrder1Opts)
          .then(() => {
            logger.debug('cancelled order');

            logger.debug('placing order 2...');
            // Market order
            client
              .placeOrder(order2Opts)
              .then((order2) => {
                logger.debug('place order 2 resp %o', order2);
                wss.close();
                done();
              })
              .catch((e) => {
                done.fail(e);
              });
          })
          .catch((e) => {
            done.fail(e);
          });
      })
      .catch((e) => {
        done.fail(e);
      });
  });

  // there should be two orders updates
  let check = 1;
  client.onOrdersUpdate((orders) => {
    if (check === 1) {
      expect(orders).toEqual([]);
      check++;
      return;
    }

    if (check === 2) {
      const o = orders[0];
      expect(o.id).toBe(order1ID);
      expect(o.timestamp).toStrictEqual(orderTime);
      expect(o.type).toBe('limit');
      expect(o.side).toBe('buy');
      expect(o.amount).toBe('1');
      expect(o.price).toBe('1');
    }
  });

  client.onTradesUpdate((tradesUpdate) => {
    expect(tradesUpdate).toStrictEqual(tradesParsed);
  });

  client.onPositionsUpdate((positionsUpdate) => {
    expect(positionsUpdate).toStrictEqual(positionsParsed);
  });

  client.connect();
});
