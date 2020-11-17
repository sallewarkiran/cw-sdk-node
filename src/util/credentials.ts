import fs from 'fs';
import yaml from 'js-yaml';
import os from 'os';
import path from 'path';
import logger from '../util/logger';
import { RESTOpts } from '../rest/types/client';
import { Credentials, CredentialsType } from './types/credentials';
import { StreamOpts, TradeOpts } from '../websocket/types/client';

const defaultCredsPath = path.join(os.homedir(), '.cw', 'credentials.yml');
const defaultStreamURL = 'wss://stream.cryptowat.ch';
const defaultTradeURL = 'wss://trading.service.cryptowat.ch';
const defaultRESTURL = 'https://api.cryptowat.ch';

/**
 * Credentials precedence:
 * 1. environment variables CW_API_KEY, CW_SECRET_KEY
 * 2. provided via constructor
 * 3. provided via credentials file ~/.cw/credentials.yml OR environment variable CW_CREDENTIALS
 */
function loadCredentials(creds: Credentials, ctype: CredentialsType): void {
  if (process.env.CW_API_KEY && process.env.CW_SECRET_KEY) {
    creds.apiKey = process.env.CW_API_KEY;
    creds.secretKey = process.env.CW_SECRET_KEY;
    logger.debug('loaded credentials from CW_API_KEY and CW_SECRET_KEY');
    return;
  }

  if (creds.apiKey) {
    // apiKey (and secretKey, we assume) has been loaded via constructor
    logger.debug('loaded credentials from constructor');
    return;
  }

  // If nothing was passed via constructor, attempt to read a credentials file
  let credsPath = defaultCredsPath;
  if (process.env.CW_CREDENTIALS) {
    credsPath = path.resolve(process.env.CW_CREDENTIALS);
  }

  try {
    const credsFile = yaml.safeLoad(fs.readFileSync(credsPath, 'utf8'));
    creds.apiKey = credsFile.api_key;
    creds.secretKey = credsFile.secret_key;
    if (ctype === 'stream' && credsFile.stream_url) {
      creds.url = credsFile.stream_url;
    } else if (ctype === 'trade' && credsFile.trade_url) {
      creds.url = credsFile.trade_url;
    } else if (ctype === 'REST' && credsFile.REST_url) {
      creds.url = credsFile.REST_url;
    }
    logger.debug('loaded credentials file: %s' + credsPath);
  } catch (e) {
    logger.debug("couldn't find credentials file: %s" + credsPath);
  }
}

export function loadStreamCredentials(opts: Partial<StreamOpts>): StreamOpts {
  if (!opts) {
    throw new Error('Missing stream options');
  }
  if (!opts.creds) {
    opts.creds = {
      apiKey: '',
      secretKey: '',
      url: defaultStreamURL
    };
  }
  if (!opts.creds.url) {
    opts.creds.url = defaultStreamURL;
  }

  loadCredentials(opts.creds, 'stream');

  // This assumes that opts is StreamOpts at this point. If it isn't,
  // it will result in a runtime error
  return opts as StreamOpts;
}

export function loadTradeCredentials(opts: Partial<TradeOpts>): TradeOpts {
  if (!opts) {
    throw new Error('Missing trade options');
  }
  if (!opts.creds) {
    opts.creds = {
      apiKey: '',
      secretKey: '',
      url: defaultTradeURL
    };
  }
  if (!opts.creds.url) {
    opts.creds.url = defaultTradeURL;
  }

  loadCredentials(opts.creds, 'trade');

  // This assumes that opts is valid TradeOpts at this point. If it isn't,
  // it will result in a runtime error
  return opts as TradeOpts;
}

export function loadRESTCredentials(opts?: Partial<RESTOpts>): { creds: Credentials } {
  if (!opts) {
    opts = {};
  }
  const creds: Credentials = {
    secretKey: '',
    apiKey: '',
    url: defaultRESTURL,
    ...opts.creds
  };

  loadCredentials(creds, 'REST');

  // This assumes that opts is valid RESTOpts at this point. If it isn't,
  // it will result in a runtime error
  return { creds };
}
