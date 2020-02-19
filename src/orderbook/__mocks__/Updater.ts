import { SnapshotRetriever } from 'orderbook/SnapshotRetriever';
import { cachedMocks } from './mockCache';
import { OrderBookDelta } from 'util/types/shared';

export class Updater {
  snapshotRetriever: SnapshotRetriever;
  delta: OrderBookDelta;
  constructor(snapshotRetriever: SnapshotRetriever) {
    this.snapshotRetriever = snapshotRetriever;
    cachedMocks['Updater'] = this;
  }
  applyDelta = jest.fn().mockImplementation((delta: OrderBookDelta) => {
    this.delta = delta;
  });
}

export function getLastInitializedUpdater(): Updater {
  return cachedMocks['Updater'] as Updater;
}
