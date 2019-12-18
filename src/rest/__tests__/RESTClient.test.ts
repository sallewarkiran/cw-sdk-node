/* eslint-disable @typescript-eslint/no-explicit-any */
import { RESTClient } from 'rest/RESTClient';
import superagent from 'superagent';
import superagentMocker from 'superagent-mocker';
import { loadRESTCredentials } from 'util/credentials';
import { EXCHANGES, EXCHANGE_KRAKEN, PAIRS_INDEX, EXCHANGE_NOT_FOUND } from 'rest/__mocks__/data';

describe('RESTClient Tests', () => {
  let client: RESTClient;
  let mock: any;
  const REST_API_ROUTE: string = loadRESTCredentials().creds.url;
  beforeAll(() => {
    mock = superagentMocker(superagent);
    mock.timeout = 100;
  });
  it('can create a rest client', async (done) => {
    client = new RESTClient();
    expect(client).toBeTruthy();
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
    expect(response.length).toEqual(3);
    expect(response[0].symbol).toEqual('kraken');
    done();
  });

  it('can get a single exchange', async (done) => {
    mock.get(REST_API_ROUTE + '/exchanges/kraken', () => ({
      body: EXCHANGE_KRAKEN
    }));
    const response = await client.getExchange('kraken');
    expect(response.symbol).toEqual('kraken');
    done();
  });

  it('can get pairs index', async (done) => {
    mock.get(REST_API_ROUTE + '/pairs', () => ({
      body: PAIRS_INDEX
    }));
    const response = await client.getPairsIndex();
    expect(response.length).toEqual(4);
    expect(response[0].quote.symbol).toEqual('btc');
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
