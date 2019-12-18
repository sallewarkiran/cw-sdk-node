export interface Credentials {
  // apiKey is required to use the REST data allowance for your account.
  // apiKey and secretKey are both required for streaming data. Obtain from https://cryptowat.ch/account/api-access
  // These defaults will be overwritten by environment variables CW_API_KEY and CW_SECRET_KEY,
  // and environment variables will be overwritten by settings passed to the constructor.
  apiKey: string;
  secretKey: string;
  url?: string;
}

export type CredentialsType = 'stream' | 'trade' | 'REST';
