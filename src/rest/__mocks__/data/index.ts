export const EXCHANGES = {
  result: [
    {
      id: 4,
      symbol: 'kraken',
      name: 'Kraken',
      route: 'https://api.cryptowat.ch/exchanges/kraken',
      active: true
    },
    {
      id: 9,
      symbol: 'quoine',
      name: 'Quoine',
      route: 'https://api.cryptowat.ch/exchanges/quoine',
      active: true
    },
    {
      id: 22,
      symbol: 'mtgox',
      name: 'Mt. Gox',
      route: 'https://api.cryptowat.ch/exchanges/mtgox',
      active: false
    }
  ],
  allowance: {
    cost: 123456,
    remaining: 1234567890,
    upgrade:
      'Upgrade for a higher allowance, starting at $15/month for 16 seconds/hour. https://cryptowat.ch/pricing'
  }
};

export const EXCHANGE_KRAKEN = {
  result: {
    id: 4,
    symbol: 'kraken',
    name: 'Kraken',
    active: true,
    routes: { markets: 'https://api.cryptowat.ch/markets/kraken' }
  },
  allowance: {
    cost: 123456,
    remaining: 1234567890,
    upgrade:
      'Upgrade for a higher allowance, starting at $15/month for 16 seconds/hour. https://cryptowat.ch/pricing'
  }
};

export const PAIRS_INDEX = {
  result: [
    {
      id: 984,
      symbol: '1stbtc',
      base: {
        id: 404,
        symbol: '1st',
        name: 'FirstBlood',
        fiat: false,
        route: 'https://api.cryptowat.ch/assets/1st'
      },
      quote: {
        id: 60,
        symbol: 'btc',
        name: 'Bitcoin',
        fiat: false,
        route: 'https://api.cryptowat.ch/assets/btc'
      },
      route: 'https://api.cryptowat.ch/pairs/1stbtc'
    },
    {
      id: 809,
      symbol: '1steth',
      base: {
        id: 404,
        symbol: '1st',
        name: 'FirstBlood',
        fiat: false,
        route: 'https://api.cryptowat.ch/assets/1st'
      },
      quote: {
        id: 77,
        symbol: 'eth',
        name: 'Ethereum',
        fiat: false,
        route: 'https://api.cryptowat.ch/assets/eth'
      },
      route: 'https://api.cryptowat.ch/pairs/1steth'
    },
    {
      id: 2543,
      symbol: 'abbcbtc',
      base: {
        id: 1189,
        symbol: 'abbc',
        name: 'ABBC Coin',
        fiat: false,
        route: 'https://api.cryptowat.ch/assets/abbc'
      },
      quote: {
        id: 60,
        symbol: 'btc',
        name: 'Bitcoin',
        fiat: false,
        route: 'https://api.cryptowat.ch/assets/btc'
      },
      route: 'https://api.cryptowat.ch/pairs/abbcbtc'
    },
    {
      id: 2542,
      symbol: 'abbceth',
      base: {
        id: 1189,
        symbol: 'abbc',
        name: 'ABBC Coin',
        fiat: false,
        route: 'https://api.cryptowat.ch/assets/abbc'
      },
      quote: {
        id: 77,
        symbol: 'eth',
        name: 'Ethereum',
        fiat: false,
        route: 'https://api.cryptowat.ch/assets/eth'
      },
      route: 'https://api.cryptowat.ch/pairs/abbceth'
    }
  ],
  allowance: {
    cost: 123456,
    remaining: 1234567890,
    upgrade:
      'Upgrade for a higher allowance, starting at $15/month for 16 seconds/hour. https://cryptowat.ch/pricing'
  }
};

export const ERROR_NOT_FOUND = {
  error: 'Route not found',
  allowance: {
    cost: 123456,
    remaining: 1234567890,
    upgrade:
      'Upgrade for a higher allowance, starting at $15/month for 16 seconds/hour. https://cryptowat.ch/pricing'
  }
};

export const EXCHANGE_NOT_FOUND = {
  error: 'Exchange not found',
  allowance: {
    cost: 123456,
    remaining: 1234567890,
    upgrade:
      'Upgrade for a higher allowance, starting at $15/month for 16 seconds/hour. https://cryptowat.ch/pricing'
  }
};
