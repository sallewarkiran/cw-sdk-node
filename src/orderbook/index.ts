import { OrderBookWatcher } from './OrderBookWatcher';
import { MarketSelector } from '../util/types/shared';
import { StreamClient, RESTClient } from '../index';
import { SnapshotRetriever } from './SnapshotRetriever';
import { Updater } from './Updater';
import logger from '../util/logger';

export async function createOrderBookWatcher(
  marketSelector: MarketSelector,
  streamClient: StreamClient,
  restClient: RESTClient
): Promise<OrderBookWatcher> {
  const market = await restClient.getMarket(marketSelector);
  const restRetriever = new SnapshotRetriever(
    {
      exchange: market.exchange.symbol,
      base: market.instrument.base.symbol,
      quote: market.instrument.quote.symbol
    },
    restClient
  );
  const snapshotUpdater = new Updater(restRetriever);
  const watcher = new OrderBookWatcher(market.id, snapshotUpdater, streamClient);

  streamClient.onMarketUpdate((marketUpdate) => {
    if (marketUpdate.orderBookDelta) snapshotUpdater.applyDelta(marketUpdate.orderBookDelta);
  });
  watcher.onError((marketID, error) => {
    logger.error(`Error occurred with marketID: ${marketID}.\n`, error);
  });
  return watcher;
}
