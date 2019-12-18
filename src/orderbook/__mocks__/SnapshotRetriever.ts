import { mockSnapshot } from './data/snapshot';

/**
 * Internal class to handle retrieving orderbook snapshots via the REST API.
 */
export class SnapshotRetriever {
  public getOrderBookSnapshot = jest.fn().mockImplementation(() => {
    return new Promise((resolve): void => {
      resolve(mockSnapshot);
    });
  });
}
