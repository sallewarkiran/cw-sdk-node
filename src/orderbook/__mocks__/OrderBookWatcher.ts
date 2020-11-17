import { Updater } from './Updater';
import { StreamClient } from 'websocket';
import { cachedMocks } from './mockCache';

export class OrderBookWatcher {
  marketID: number;
  snapshotUpdater: Updater;
  streamClient: StreamClient;
  onErrorCB: (marketID: number, error: Error) => void;

  constructor(marketID: number, snapshotUpdater: Updater, streamClient: StreamClient) {
    this.marketID = marketID;
    this.snapshotUpdater = snapshotUpdater;
    this.streamClient = streamClient;
    cachedMocks['OrderBookWatcher'] = this;
  }

  onError = jest.fn().mockImplementation((callback: (marketID: number, error: Error) => void) => {
    this.onErrorCB = callback;
  });
}

export function getLastInitializedWatcher(): OrderBookWatcher {
  return cachedMocks['OrderBookWatcher'] as OrderBookWatcher;
}
