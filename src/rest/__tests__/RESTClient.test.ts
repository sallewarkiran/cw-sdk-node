/* eslint-disable @typescript-eslint/no-explicit-any */
import { RESTClient } from 'rest/RESTClient';
import superagent from 'superagent';
import superagentMocker from 'superagent-mocker';
import { loadRESTCredentials } from 'util/credentials';
import {
  EXCHANGES,
  EXCHANGE_KRAKEN,
  PAIRS_INDEX,
  PAIR,
  MARKETS,
  MARKETS_SUMMARIES,
  MARKETS_SUMMARY,
  EXCHANGE_MARKETS,
  MARKET_DESCRIPTION,
  MARKET_V2,
  ASSET_V2,
  OHLC,
  ORDERBOOK_SNAPSHOT,
  TRADES,
  EXCHANGE_NOT_FOUND
} from './data';

describe('RESTClient Tests', () => {
  let client: RESTClient;
  let mock: any;
  const REST_API_ROUTE: string = loadRESTCredentials().creds.url;

  beforeAll(() => {
    mock = superagentMocker(superagent);
    mock.timeout = 100;
  });

  beforeEach(() => {
    mock.clearRoutes();
  });

  it('can create a rest client', async (done) => {
    client = new RESTClient();
    expect(client).toBeTruthy();
    done();
  });

  it('cannot get allowance before a request is made', (done) => {
    expect(() => client.getAllowance()).toThrow();
    done();
  });

  it('can get allowance after a request is made', async (done) => {
    mock.get(REST_API_ROUTE + '/exchanges', () => {
      return { body: EXCHANGES };
    });
    await client.getExchanges();
    expect(client.getAllowance()).toBe(EXCHANGES.allowance);
    done();
  });

  it('sets the api key to request headers', async (done) => {
    expect.assertions(1);
    const _client = new RESTClient({ creds: { apiKey: '12345' } });
    mock.get(REST_API_ROUTE + '/exchanges', (req: any) => {
      expect(req.headers['x-cw-api-key']).toEqual('12345');
      return { body: EXCHANGES };
    });
    await _client.getExchanges();
    done();
  });

  it('can get exchanges', async (done) => {
    mock.get(REST_API_ROUTE + '/exchanges', () => ({
      body: EXCHANGES
    }));
    const response = await client.getExchanges();
    expect(response).toEqual(EXCHANGES.result);
    done();
  });

  it('can get a single exchange', async (done) => {
    mock.get(REST_API_ROUTE + '/exchanges/kraken', () => ({
      body: EXCHANGE_KRAKEN
    }));
    const response = await client.getExchange('kraken');
    expect(response).toEqual(EXCHANGE_KRAKEN.result);
    done();
  });

  it('can get pairs index', async (done) => {
    mock.get(REST_API_ROUTE + '/pairs', () => ({
      body: PAIRS_INDEX
    }));
    const response = await client.getPairsIndex();
    expect(response).toEqual(PAIRS_INDEX.result);
    done();
  });

  it('can get pair', async (done) => {
    mock.get(REST_API_ROUTE + '/pairs/btcusd', () => ({
      body: PAIR
    }));
    const response = await client.getPair('btcusd');
    expect(response).toEqual(PAIR.result);
    done();
  });

  it('can get markets', async (done) => {
    mock.get(REST_API_ROUTE + '/markets', () => ({
      body: MARKETS
    }));
    const response = await client.getMarkets();
    expect(response).toEqual(MARKETS.result);
    done();
  });

  it('can get summaries', async (done) => {
    mock.get(REST_API_ROUTE + '/markets/summaries', () => ({
      body: MARKETS_SUMMARIES
    }));
    const response = await client.getSummaries();
    expect(response).toEqual(MARKETS_SUMMARIES.result);
    done();
  });

  it('can get summary', async (done) => {
    mock.get(REST_API_ROUTE + '/markets/kraken/btcusd/summary', () => ({
      body: MARKETS_SUMMARY
    }));
    const response = await client.getSummary('kraken', 'btcusd');
    expect(response).toEqual(MARKETS_SUMMARY.result);
    done();
  });

  it('can get exchange markets', async (done) => {
    mock.get(REST_API_ROUTE + '/markets/kraken', () => ({
      body: EXCHANGE_MARKETS
    }));
    const response = await client.getExchangeMarkets('kraken');
    expect(response).toEqual(EXCHANGE_MARKETS.result);
    done();
  });

  it('can get market description', async (done) => {
    mock.get(REST_API_ROUTE + '/markets/kraken/btcusd', () => ({
      body: MARKET_DESCRIPTION
    }));
    const response = await client.getMarketDescription('kraken', 'btcusd');
    expect(response).toEqual(MARKET_DESCRIPTION.result);
    done();
  });

  it('can get market by symbol', async (done) => {
    mock.get(REST_API_ROUTE + '/v2/markets?exchange=kraken&base=btc&quote=usd', () => ({
      body: MARKET_V2
    }));
    const response = await client.getMarket({
      exchange: 'kraken',
      base: 'btc',
      quote: 'usd'
    });
    expect(response).toEqual(MARKET_V2.result[0]);
    done();
  });

  it('can get market by id', async (done) => {
    mock.get(REST_API_ROUTE + '/v2/markets/87', () => ({
      body: MARKET_V2
    }));
    const response = await client.getMarket(87);
    expect(response).toEqual(MARKET_V2.result);
    done();
  });

  it('can get asset by symbol', async (done) => {
    mock.get(REST_API_ROUTE + '/v2/assets?symbol=btc', () => ({
      body: ASSET_V2
    }));
    const response = await client.getAsset('btc');
    expect(response).toEqual(ASSET_V2.result);
    done();
  });

  it('can get asset by id', async (done) => {
    mock.get(REST_API_ROUTE + '/v2/assets/60', () => ({
      body: ASSET_V2
    }));
    const response = await client.getAsset(60);
    expect(response).toEqual(ASSET_V2.result);
    done();
  });

  it('can get ohlc candlestick data', async (done) => {
    mock.get(REST_API_ROUTE + '/markets/kraken/btcusd/ohlc', () => ({
      body: OHLC
    }));
    const response = await client.getOHLC('kraken', 'btcusd');
    expect(response['60'][0].closeTime).toEqual(OHLC.result['60'][0][0]);
    expect(response['60'][0].openPrice).toEqual(OHLC.result['60'][0][1].toString());
    expect(response['60'][0].highPrice).toEqual(OHLC.result['60'][0][2].toString());
    expect(response['60'][0].lowPrice).toEqual(OHLC.result['60'][0][3].toString());
    expect(response['60'][0].closePrice).toEqual(OHLC.result['60'][0][4].toString());
    expect(response['60'][0].volume).toEqual(OHLC.result['60'][0][5].toString());
    done();
  });

  it('can get orderbook snapshot data', async (done) => {
    mock.get(REST_API_ROUTE + '/markets/kraken/btcusd/orderbook', () => ({
      body: ORDERBOOK_SNAPSHOT
    }));
    const response = await client.getOrderBookSnapshot('kraken', 'btcusd');
    expect(response.seqNum).toEqual(ORDERBOOK_SNAPSHOT.result.seqNum);
    expect(response.asks[0].price).toEqual(ORDERBOOK_SNAPSHOT.result.asks[0][0].toString());
    expect(response.asks[0].amount).toEqual(ORDERBOOK_SNAPSHOT.result.asks[0][1].toString());
    expect(response.bids[0].price).toEqual(ORDERBOOK_SNAPSHOT.result.bids[0][0].toString());
    expect(response.bids[0].amount).toEqual(ORDERBOOK_SNAPSHOT.result.bids[0][1].toString());
    done();
  });

  it('can get trades', async (done) => {
    mock.get(REST_API_ROUTE + '/markets/kraken/btcusd/trades', () => ({
      body: TRADES
    }));
    const response = await client.getTrades('kraken', 'btcusd');
    expect(response[0].id).toEqual(TRADES.result[0][0]);
    expect(response[0].timestamp).toEqual(TRADES.result[0][1]);
    expect(response[0].price).toEqual(TRADES.result[0][2].toString());
    expect(response[0].amount).toEqual(TRADES.result[0][3].toString());
    done();
  });

  it('can handle errors from the rest API', async (done) => {
    mock.get(REST_API_ROUTE + '/exchanges/notarealexchange', () => ({
      body: EXCHANGE_NOT_FOUND,
      status: 404
    }));
    await expect(client.getExchange('notarealexchange')).rejects.toThrow('Exchange not found');
    done();
  });
});
