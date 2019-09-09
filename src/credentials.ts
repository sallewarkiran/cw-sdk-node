import * as fs from "fs";
import * as yaml from "js-yaml";
import * as os from "os";
import * as path from "path";
import {
  Credentials,
  CredentialsType,
  StreamOpts,
  TradeOpts
} from "./types/client";
import logger from "./util/logger";

/**
 * Credentials precedence:
 * 1. environment variables CW_API_KEY, CW_SECRET_KEY
 * 2. provided via constructor
 * 3. provided via credentials file ~/.cw/credentials.yml OR environment variable CW_CREDENTIALS
 */

const defaultCredsPath = path.join(os.homedir(), ".cw", "credentials.yml");

const defaultStreamURL = "wss://stream.cryptowat.ch";
const defaultTradeURL = "wss://trading.service.cryptowat.ch";

export function loadStreamCredentials(opts: StreamOpts): StreamOpts {
  if (!opts.creds) {
    opts.creds = {
      apiKey: "",
      secretKey: "",
      url: defaultStreamURL
    };
  }
  if (!opts.creds.url) {
    opts.creds.url = defaultStreamURL;
  }
  loadCredentials(opts.creds, "stream");
  return opts;
}

export function loadTradeCredentials(opts: TradeOpts): TradeOpts {
  if (!opts.creds) {
    opts.creds = {
      apiKey: "",
      secretKey: "",
      url: defaultTradeURL
    };
  }
  if (!opts.creds.url) {
    opts.creds.url = defaultTradeURL;
  }
  loadCredentials(opts.creds, "trade");
  return opts;
}

function loadCredentials(creds: Credentials, ctype: CredentialsType): void {
  if (process.env.CW_API_KEY && process.env.CW_SECRET_KEY) {
    creds.apiKey = process.env.CW_API_KEY;
    creds.secretKey = process.env.CW_SECRET_KEY;
    logger.debug("loaded credentials from CW_API_KEY and CW_SECRET_KEY");
    return;
  }

  if (creds.apiKey) {
    // apiKey (and secretKey, we assume) has been loaded via constructor
    logger.debug("loaded credentials from constructor");
    return;
  }

  // If nothing was passed via constructor, attempt to read a credentials file
  let credsPath = defaultCredsPath;
  if (process.env.CW_CREDENTIALS) {
    credsPath = path.resolve(process.env.CW_CREDENTIALS);
  }

  try {
    const credsFile = yaml.safeLoad(fs.readFileSync(credsPath, "utf8"));
    creds.apiKey = credsFile.api_key;
    creds.secretKey = credsFile.secret_key;
    if (ctype === "stream" && credsFile.stream_url) {
      creds.url = credsFile.stream_url;
    } else if (ctype === "trade" && credsFile.trade_url) {
      creds.url = credsFile.trade_url;
    }
    logger.debug("loaded credentials file: %s" + credsPath);
  } catch (e) {
    logger.debug("couldn't find credentials file: %s" + credsPath);
  }
}
