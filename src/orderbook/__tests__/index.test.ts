import { createOrderBookWatcher } from '../index';
import Substitute, { Arg } from '@fluffy-spoon/substitute';
import { StreamClient } from '../../websocket';
import { RESTClient } from '../../rest';
import { getLastInitializedSnapshotRetriever } from '../__mocks__/SnapshotRetriever';
import { resetCache } from '../__mocks__/mockCache';
import { getLastInitializedUpdater } from '../__mocks__/Updater';
import { Market } from '../../util/types/shared';
import { getLastInitializedWatcher } from '../__mocks__/OrderBookWatcher';
import { MarketUpdate } from '../../websocket/types/markets';
import { mocked } from 'ts-jest/utils';

jest.mock('orderbook/Updater');
jest.mock('orderbook/OrderBookWatcher');
jest.mock('orderbook/SnapshotRetriever');

describe('index.ts tests', () => {
  afterEach((done) => {
    resetCache();
    done();
  });
  const mockMarket: Market = {
    id: 123,
    exchange: { id: 1, symbol: 'kraken' },
    instrument: { id: 2, base: { id: 3, symbol: 'btc' }, quote: { id: 4, symbol: 'usd' } }
  };

  const getMarketPromise = (): Promise<Market> =>
    new Promise((resolve) => {
      resolve(mockMarket);
    });

  describe('createOrderBookWatcher tests', () => {
    it('gets the market via the rest client', async (done) => {
      const mockStreamClient = Substitute.for<StreamClient>();
      const mockRestClient = Substitute.for<RESTClient>();
      await createOrderBookWatcher(123, mockStreamClient, mockRestClient);
      mockRestClient.received(1).getMarket(123);
      done();
    });
    it('constructs a SnapshotRetriever with the correct parameters', async (done) => {
      const mockStreamClient = Substitute.for<StreamClient>();
      const mockRestClient = Substitute.for<RESTClient>();
      mockRestClient.getMarket(123).returns(getMarketPromise());
      await createOrderBookWatcher(123, mockStreamClient, mockRestClient);

      const mockSnapshotRetriever = getLastInitializedSnapshotRetriever();

      expect(mockSnapshotRetriever.marketSymbol.exchange).toEqual('kraken');
      expect(mockSnapshotRetriever.marketSymbol.base).toEqual('btc');
      expect(mockSnapshotRetriever.marketSymbol.quote).toEqual('usd');
      expect(mockSnapshotRetriever.restClient).toBe(mockRestClient);
      done();
    });

    it('constructs an Updater with the correct parameter', async (done) => {
      const mockStreamClient = Substitute.for<StreamClient>();
      const mockRestClient = Substitute.for<RESTClient>();
      mockRestClient.getMarket(123).returns(getMarketPromise());
      await createOrderBookWatcher(123, mockStreamClient, mockRestClient);

      const mockSnapshotRetriever = getLastInitializedSnapshotRetriever();
      const mockUpdater = getLastInitializedUpdater();

      expect(mockUpdater.snapshotRetriever).toBe(mockSnapshotRetriever);
      done();
    });

    it('constructs an OrderBookWatcher with the correct parameters', async (done) => {
      const mockStreamClient = Substitute.for<StreamClient>();
      const mockRestClient = Substitute.for<RESTClient>();
      mockRestClient.getMarket(123).returns(getMarketPromise());
      await createOrderBookWatcher(123, mockStreamClient, mockRestClient);

      const mockUpdater = getLastInitializedUpdater();
      const mockWatcher = getLastInitializedWatcher();

      expect(mockWatcher.marketID).toBe(123);
      expect(mockWatcher.snapshotUpdater).toBe(mockUpdater);
      expect(mockWatcher.streamClient).toBe(mockStreamClient);
      done();
    });

    it('sets up a callback for StreamClient market updates', async (done) => {
      const mockStreamClient = Substitute.for<StreamClient>();
      const mockRestClient = Substitute.for<RESTClient>();
      mockRestClient.getMarket(123).returns(getMarketPromise());
      await createOrderBookWatcher(123, mockStreamClient, mockRestClient);
      mockStreamClient.received(1).onMarketUpdate(Arg.any());
      done();
    });

    it('handles orderBookDelta market updates', async (done) => {
      expect.assertions(2);
      const mockStreamClient = Substitute.for<StreamClient>();
      const mockRestClient = Substitute.for<RESTClient>();

      const callbackChecker = (callback: (snapshot: MarketUpdate) => void): void => {
        callback({
          market: { id: 123, currencyPairID: 321, exchangeID: 231 },
          orderBookDelta: {
            seqNum: 12345,
            asks: { set: [], remove: [] },
            bids: { set: [], remove: [] }
          }
        });
        const mockUpdater = mocked(getLastInitializedUpdater());
        expect(mockUpdater.applyDelta.mock.calls.length).toBe(1);
        expect(mockUpdater.delta.seqNum).toBe(12345);
        done();
      };
      mockStreamClient.onMarketUpdate(Arg.any).mimicks(callbackChecker);
      mockRestClient.getMarket(123).returns(getMarketPromise());

      await createOrderBookWatcher(123, mockStreamClient, mockRestClient);
    });

    it('ignores updates without orderBookDelta data', async (done) => {
      expect.assertions(1);
      const mockStreamClient = Substitute.for<StreamClient>();
      const mockRestClient = Substitute.for<RESTClient>();

      const callbackChecker = (callback: (snapshot: MarketUpdate) => void): void => {
        callback({
          market: { id: 123, currencyPairID: 321, exchangeID: 231 }
        });
        const mockUpdater = mocked(getLastInitializedUpdater());
        expect(mockUpdater.applyDelta.mock.calls.length).toBe(0);
        done();
      };
      mockStreamClient.onMarketUpdate(Arg.any).mimicks(callbackChecker);
      mockRestClient.getMarket(123).returns(getMarketPromise());

      await createOrderBookWatcher(123, mockStreamClient, mockRestClient);
    });

    it('sets up a default error handler', async (done) => {
      const mockStreamClient = Substitute.for<StreamClient>();
      const mockRestClient = Substitute.for<RESTClient>();
      mockRestClient.getMarket(123).returns(getMarketPromise());
      await createOrderBookWatcher(123, mockStreamClient, mockRestClient);
      const mockWatcher = mocked(getLastInitializedWatcher());

      expect(mockWatcher.onError.mock.calls.length).toBe(1);
      done();
    });
  });
});
