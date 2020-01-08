import {
  ExchangeDescription,
  ExchangeBrief,
  MarketBrief,
  MarketDescription,
  MarketOHLCRaw,
  Price,
  OrderBookSnapshotRaw,
  PairBrief,
  PairDetails,
  Summary,
  Summaries,
  TradeRaw,
  MarketSymbol,
  Trade,
  MarketOHLC,
  Period,
  CandleData
} from './types/data';
import { RESTResponse, RESTOpts, RESTAllowance } from './types/client';
import superagent from 'superagent';
import { RestError } from './errors';
import { loadRESTCredentials } from '../util/credentials';
import { Market, Asset, OrderBookSnapshot } from '../util/types/shared';
import { transformSnapshot } from '../util/helpers';
import version from '../version';

export class RESTClient {
  private apiKey?: string;
  private apiRoute?: string;
  private lastAllowance?: RESTAllowance;

  constructor(options?: RESTOpts) {
    const restOpts = loadRESTCredentials(options);
    this.apiKey = restOpts.creds.apiKey;
    this.apiRoute = restOpts.creds.url;
  }

  private getRestURL(relativeRoute: string): string {
    return new URL(relativeRoute, this.apiRoute).href;
  }

  private async getRestData<T>(
    relativeRoute: string,
    params?: string | { [key: string]: string }
  ): Promise<T> {
    try {
      const request = superagent.get(this.getRestURL(relativeRoute));
      if (this.apiKey) {
        request.set('X-CW-API-Key', this.apiKey);
        request.set('User-Agent', `cw-sdk-node@${version}`);
      }
      if (params) {
        request.query(params);
      }
      const response = await request;
      this.lastAllowance = (response.body as RESTResponse<T>).allowance;

      return (response.body as RESTResponse<T>).result;
    } catch (e) {
      if (e.status !== undefined) {
        throw new RestError(e);
      }
      throw e;
    }
  }

  /**
   * Returns the most recently retrieved REST allowance data.
   */
  getAllowance(): RESTAllowance {
    if (this.lastAllowance) {
      return this.lastAllowance;
    } else {
      throw new Error('You must make a request before getting your allowance data.');
    }
  }

  /**
   * Returns a list of all supported exchanges.
   * @see https://cryptowat.ch/docs/api#pairs-index
   */
  async getExchanges(): Promise<ExchangeBrief[]> {
    return await this.getRestData('/exchanges');
  }

  /**
   * Returns a single exchange, with associated routes.
   * @param exchangeSymbol string (example: 'kraken')
   * @see https://cryptowat.ch/docs/api#exchange-details
   */
  async getExchange(exchangeSymbol: string): Promise<ExchangeDescription> {
    return await this.getRestData(`/exchanges/${exchangeSymbol}`);
  }

  /**
   * Returns all pairs (in no particular order).
   * @see https://cryptowat.ch/docs/api#pairs-index
   */
  async getPairsIndex(): Promise<PairBrief[]> {
    return await this.getRestData('/pairs');
  }

  /**
   * Returns a single pair. Lists all markets for this pair.
   * @param pairSymbol string (example: 'btcusd')
   * @see https://cryptowat.ch/docs/api#pair-details
   */
  async getPair(pairSymbol: string): Promise<PairDetails> {
    return await this.getRestData(`/pairs/${pairSymbol}`);
  }

  /**
   * Returns a list of all supported markets.
   * @see https://cryptowat.ch/docs/api#market-index
   */
  async getMarkets(): Promise<MarketBrief[]> {
    return await this.getRestData('/markets');
  }

  /**
   * Returns the market summary for all supported markets. Some values may be out of date by a few seconds.
   * @see https://cryptowat.ch/docs/api#summaries
   */
  async getSummaries(): Promise<Summaries> {
    return await this.getRestData('/markets/summaries');
  }

  /**
   * Returns a single market summary.
   * @param exchangeSymbol string (Example: 'kraken')
   * @param pairSymbol string (Example: 'btcusd')
   * @see https://cryptowat.ch/docs/api#market-summary
   */
  async getSummary(exchangeSymbol: string, pairSymbol: string): Promise<Summary> {
    return await this.getRestData(`/markets/${exchangeSymbol}/${pairSymbol}/summary`);
  }

  /**
   * Returns a list of supported markets for a specific exchange.
   * @param exchangeSymbol string (Example: 'kraken')
   * @see https://cryptowat.ch/docs/api#market-index
   */
  async getExchangeMarkets(exchangeSymbol: string): Promise<MarketDescription[]> {
    return await this.getRestData(`/markets/${exchangeSymbol}`);
  }

  /**
   * Returns a single market, with associated routes.
   * @param exchangeSymbol string (Example: 'kraken')
   * @param pairSymbol string (Example: 'btcusd')
   * @see https://cryptowat.ch/docs/api#market-details
   */
  async getMarketDescription(
    exchangeSymbol: string,
    pairSymbol: string
  ): Promise<MarketDescription> {
    return await this.getRestData(`/markets/${exchangeSymbol}/${pairSymbol}`);
  }

  /**
   * Returns a single market.
   * @param marketSymbol MarketSymbol (Example: {exchange: 'kraken', base: 'btc', quote:'usd'})
   */
  async getMarketBySymbol(marketSymbol: MarketSymbol): Promise<Market> {
    return this.getRestData<Market>(`/v2/markets`, marketSymbol);
  }

  /**
   * Returns a single market.
   * @param marketID number id of specific market.
   */
  async getMarketByID(marketID: number): Promise<Market> {
    return this.getRestData<Market>(`/v2/markets/${marketID}`);
  }

  /**
   * Returns a single asset, with associated routes.
   * @param assetSymbol string symbol for specific requested asset (Examples: 'btc', 'usd', 'eth', 'jpy', etc...)
   */
  async getAssetBySymbol(assetSymbol: string): Promise<Asset> {
    return this.getRestData<Asset>(`/v2/assets`, { symbol: assetSymbol });
  }

  /**
   * Returns a single market, with associated routes.
   * @param assetId number id of specific asset
   */
  async getAssetByID(assetId: number): Promise<Asset> {
    return this.getRestData<Asset>(`/v2/assets/${assetId}`);
  }

  /**
   * Returns a market's OHLC candlestick data.
   * @param exchangeSymbol string (Example: 'kraken')
   * @param pairSymbol string (Example: 'btcusd')
   * @see https://cryptowat.ch/docs/api#market-ohlc
   */
  async getOHLC(exchangeSymbol: string, pairSymbol: string): Promise<MarketOHLC> {
    return await this.getRestData<MarketOHLCRaw>(
      `/markets/${exchangeSymbol}/${pairSymbol}/ohlc`
    ).then<MarketOHLC>((marketOHLC) => {
      const result: Partial<MarketOHLC> = {};
      for (const key in marketOHLC) {
        result[key as Period] = marketOHLC[key as Period].map<CandleData>((value) => ({
          closeTime: value[0],
          openPrice: value[1].toString(),
          highPrice: value[2].toString(),
          lowPrice: value[3].toString(),
          closePrice: value[4].toString(),
          volume: value[5].toString()
        }));
      }
      return result as MarketOHLC;
    });
  }

  /**
   * Returns a market's order book.
   * @param exchangeSymbol string (Example: 'kraken')
   * @param pairSymbol string (Example: 'btcusd')
   * @see https://cryptowat.ch/docs/api#market-orderbook
   */
  async getOrderBookSnapshot(
    exchangeSymbol: string,
    pairSymbol: string
  ): Promise<OrderBookSnapshot> {
    return await this.getRestData<OrderBookSnapshotRaw>(
      `/markets/${exchangeSymbol}/${pairSymbol}/orderbook`
    ).then<OrderBookSnapshot>(transformSnapshot);
  }

  /**
   * Returns a market's last price.
   * @param exchangeSymbol string (Example: 'kraken')
   * @param pairSymbol string (Example: 'btcusd')
   * @see https://cryptowat.ch/docs/api#market-price
   */
  async getPrice(exchangeSymbol: string, pairSymbol: string): Promise<Price> {
    return await this.getRestData(`/markets/${exchangeSymbol}/${pairSymbol}/price`);
  }

  /**
   * Returns a market's most recent trades, incrementing chronologically.
   * @param exchangeSymbol string (Example: 'kraken')
   * @param pairSymbol string (Example: 'btcusd')
   * @see https://cryptowat.ch/docs/api#market-trades
   */
  async getTrades(exchangeSymbol: string, pairSymbol: string): Promise<Trade[]> {
    return await this.getRestData<TradeRaw[]>(
      `/markets/${exchangeSymbol}/${pairSymbol}/trades`
    ).then((tradeRaw) =>
      tradeRaw.map<Trade>((trade) => ({
        id: trade[0],
        timestamp: trade[1],
        price: trade[2].toString(),
        amount: trade[3].toString()
      }))
    );
  }
}
