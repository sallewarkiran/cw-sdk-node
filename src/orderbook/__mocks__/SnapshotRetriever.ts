import { mockSnapshot } from '../__tests__/data/snapshot';
import { RESTClient } from '../../rest';
import { MarketSymbol } from '../../util/types/shared';
import { cachedMocks } from './mockCache';

export class SnapshotRetriever {
  restClient: RESTClient;
  marketSymbol: MarketSymbol;

  constructor(marketSymbol: MarketSymbol, restClient: RESTClient) {
    this.restClient = restClient;
    this.marketSymbol = marketSymbol;
    cachedMocks['SnapshotRetriever'] = this;
  }

  public getOrderBookSnapshot = jest.fn().mockImplementation(() => {
    return new Promise((resolve): void => {
      resolve(mockSnapshot);
    });
  });
}

export function getLastInitializedSnapshotRetriever(): SnapshotRetriever {
  return cachedMocks['SnapshotRetriever'] as SnapshotRetriever;
}
