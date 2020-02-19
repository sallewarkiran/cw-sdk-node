import { RESTClient } from '../rest';
import { OrderBookSnapshot, MarketSymbol } from '../util/types/shared';

/**
 * Internal class to handle retrieving orderbook snapshots via the REST API.
 */
export class SnapshotRetriever {
  private restClient: RESTClient;
  private marketSymbol: MarketSymbol;

  constructor(marketSymbol: MarketSymbol, restClient: RESTClient) {
    this.restClient = restClient;
    this.marketSymbol = marketSymbol;
  }

  public async getOrderBookSnapshot(): Promise<OrderBookSnapshot> {
    return await this.restClient.getOrderBookSnapshot(
      this.marketSymbol.exchange,
      this.marketSymbol.base + this.marketSymbol.quote
    );
  }
}
