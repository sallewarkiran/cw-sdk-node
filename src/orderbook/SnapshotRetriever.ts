import { RESTClient } from 'rest';
import { OrderBookSnapshot, MarketSelector } from 'util/types/shared';

/**
 * Internal class to handle retrieving orderbook snapshots via the REST API.
 */
export class SnapshotRetriever {
  private restClient: RESTClient;
  private marketSelector: MarketSelector;

  constructor(marketSelector: MarketSelector, restClient: RESTClient) {
    this.restClient = restClient;
    this.marketSelector = marketSelector;
  }

  public async getOrderBookSnapshot(): Promise<OrderBookSnapshot> {
    if (typeof this.marketSelector === 'number') {
      return await this.restClient.getMarketByID(this.marketSelector).then((market) => {
        this.marketSelector = {
          exchangeSymbol: market.exchange.symbol,
          pairSymbol: market.instrument.base.symbol + market.instrument.quote.symbol
        };
        return this.restClient.getOrderBookSnapshot(
          this.marketSelector.exchangeSymbol,
          this.marketSelector.pairSymbol
        );
      });
    }
    return await this.restClient.getOrderBookSnapshot(
      this.marketSelector.exchangeSymbol,
      this.marketSelector.pairSymbol
    );
  }
}
