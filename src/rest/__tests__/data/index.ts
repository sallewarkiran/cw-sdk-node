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

export const PAIR = {
  result: {
    id: 9,
    symbol: 'btcusd',
    base: {
      id: 60,
      symbol: 'btc',
      name: 'Bitcoin',
      fiat: false,
      route: 'https://api.cryptowat.ch/assets/btc'
    },
    quote: {
      id: 98,
      symbol: 'usd',
      name: 'United States dollar',
      fiat: true,
      route: 'https://api.cryptowat.ch/assets/usd'
    },
    route: 'https://api.cryptowat.ch/pairs/btcusd',
    markets: [
      {
        id: 368,
        exchange: 'bisq',
        pair: 'btcusd',
        active: true,
        route: 'https://api.cryptowat.ch/markets/bisq/btcusd'
      },
      {
        id: 87,
        exchange: 'kraken',
        pair: 'btcusd',
        active: true,
        route: 'https://api.cryptowat.ch/markets/kraken/btcusd'
      },
      {
        id: 174,
        exchange: 'cexio',
        pair: 'btcusd',
        active: true,
        route: 'https://api.cryptowat.ch/markets/cexio/btcusd'
      },
      {
        id: 185,
        exchange: 'quoine',
        pair: 'btcusd',
        active: true,
        route: 'https://api.cryptowat.ch/markets/quoine/btcusd'
      },
      {
        id: 1258,
        exchange: 'bittrex',
        pair: 'btcusd',
        active: true,
        route: 'https://api.cryptowat.ch/markets/bittrex/btcusd'
      },
      {
        id: 65,
        exchange: 'coinbase-pro',
        pair: 'btcusd',
        active: true,
        route: 'https://api.cryptowat.ch/markets/coinbase-pro/btcusd'
      },
      {
        id: 166,
        exchange: 'cryptsy',
        pair: 'btcusd',
        active: false,
        route: 'https://api.cryptowat.ch/markets/cryptsy/btcusd'
      },
      {
        id: 427,
        exchange: 'bitflyer',
        pair: 'btcusd',
        active: true,
        route: 'https://api.cryptowat.ch/markets/bitflyer/btcusd'
      },
      {
        id: 222,
        exchange: 'okcoin',
        pair: 'btcusd',
        active: true,
        route: 'https://api.cryptowat.ch/markets/okcoin/btcusd'
      },
      {
        id: 366,
        exchange: 'mtgox',
        pair: 'btcusd',
        active: false,
        route: 'https://api.cryptowat.ch/markets/mtgox/btcusd'
      },
      {
        id: 667,
        exchange: 'bitbay',
        pair: 'btcusd',
        active: true,
        route: 'https://api.cryptowat.ch/markets/bitbay/btcusd'
      },
      {
        id: 432,
        exchange: 'quadriga',
        pair: 'btcusd',
        active: false,
        route: 'https://api.cryptowat.ch/markets/quadriga/btcusd'
      },
      {
        id: 61122,
        exchange: 'binance-us',
        pair: 'btcusd',
        active: true,
        route: 'https://api.cryptowat.ch/markets/binance-us/btcusd'
      },
      {
        id: 5805,
        exchange: 'liquid',
        pair: 'btcusd',
        active: true,
        route: 'https://api.cryptowat.ch/markets/liquid/btcusd'
      },
      {
        id: 1,
        exchange: 'bitfinex',
        pair: 'btcusd',
        active: true,
        route: 'https://api.cryptowat.ch/markets/bitfinex/btcusd'
      },
      {
        id: 181,
        exchange: 'gemini',
        pair: 'btcusd',
        active: true,
        route: 'https://api.cryptowat.ch/markets/gemini/btcusd'
      },
      {
        id: 253,
        exchange: 'mexbt',
        pair: 'btcusd',
        active: false,
        route: 'https://api.cryptowat.ch/markets/mexbt/btcusd'
      },
      {
        id: 148,
        exchange: 'wex',
        pair: 'btcusd',
        active: false,
        route: 'https://api.cryptowat.ch/markets/wex/btcusd'
      },
      {
        id: 74,
        exchange: 'bitstamp',
        pair: 'btcusd',
        active: true,
        route: 'https://api.cryptowat.ch/markets/bitstamp/btcusd'
      }
    ]
  },
  allowance: {
    cost: 123456,
    remaining: 1234567890,
    upgrade:
      'Upgrade for a higher allowance, starting at $15/month for 16 seconds/hour. https://cryptowat.ch/pricing'
  }
};

export const MARKETS = {
  result: [
    {
      id: 1,
      exchange: 'bitfinex',
      pair: 'btcusd',
      active: true,
      route: 'https://api.cryptowat.ch/markets/bitfinex/btcusd'
    },
    {
      id: 2,
      exchange: 'bitfinex',
      pair: 'ltcusd',
      active: true,
      route: 'https://api.cryptowat.ch/markets/bitfinex/ltcusd'
    },
    {
      id: 3,
      exchange: 'bitfinex',
      pair: 'ltcbtc',
      active: true,
      route: 'https://api.cryptowat.ch/markets/bitfinex/ltcbtc'
    },
    {
      id: 4,
      exchange: 'bitfinex',
      pair: 'ethusd',
      active: true,
      route: 'https://api.cryptowat.ch/markets/bitfinex/ethusd'
    },
    {
      id: 5,
      exchange: 'bitfinex',
      pair: 'ethbtc',
      active: true,
      route: 'https://api.cryptowat.ch/markets/bitfinex/ethbtc'
    },
    {
      id: 6,
      exchange: 'bitfinex',
      pair: 'etcbtc',
      active: true,
      route: 'https://api.cryptowat.ch/markets/bitfinex/etcbtc'
    },
    {
      id: 7,
      exchange: 'bitfinex',
      pair: 'etcusd',
      active: true,
      route: 'https://api.cryptowat.ch/markets/bitfinex/etcusd'
    }
  ],
  allowance: {
    cost: 5491653,
    remaining: 3985798597,
    remainingPaid: 0,
    upgrade:
      'Upgrade for a higher allowance, starting at $15/month for 16 seconds/hour. https://cryptowat.ch/pricing'
  }
};

export const MARKETS_SUMMARIES = {
  result: {
    'binance-us:adausd': {
      price: {
        last: 0.0453,
        high: 0.0468,
        low: 0.0435,
        change: {
          percentage: 0.0342465753424658,
          absolute: 0.0015
        }
      },
      volume: 3123697.6,
      volumeQuote: 139543.2174
    },
    'binance-us:adausdt': {
      price: {
        last: 0.04536,
        high: 0.04679,
        low: 0.04364,
        change: {
          percentage: 0.0360895386021014,
          absolute: 0.00158
        }
      },
      volume: 1650554.5,
      volumeQuote: 74557.249467
    },
    'binance-us:algousd': {
      price: {
        last: 0.246,
        high: 0.255,
        low: 0.236,
        change: {
          percentage: 0.025,
          absolute: 0.006
        }
      },
      volume: 105161.356,
      volumeQuote: 25453.357069
    },
    'binance-us:atomusd': {
      price: {
        last: 4.706,
        high: 4.75,
        low: 4.464,
        change: {
          percentage: 0.032696949747641,
          absolute: 0.149
        }
      },
      volume: 43144.626,
      volumeQuote: 200232.56487
    },
    'binance-us:atomusdt': {
      price: {
        last: 4.668,
        high: 4.742,
        low: 4.51,
        change: {
          percentage: 0.0090791180285344,
          absolute: 0.042
        }
      },
      volume: 10250.768,
      volumeQuote: 47409.470397
    },
    'binance-us:batusd': {
      price: {
        last: 0.2159,
        high: 0.2253,
        low: 0.2117,
        change: {
          percentage: -0.0257220216606498,
          absolute: -0.0057
        }
      },
      volume: 76345.1,
      volumeQuote: 16802.871406
    },
    'binance-us:batusdt': {
      price: {
        last: 0.2166,
        high: 0.2261,
        low: 0.214,
        change: {
          percentage: -0.0273911091154019,
          absolute: -0.0061
        }
      },
      volume: 39189.5,
      volumeQuote: 8675.378788
    },
    'binance-us:bchbtc': {
      price: {
        last: 0.039069,
        high: 0.040454,
        low: 0.039069,
        change: {
          percentage: -0.0214402003757044,
          absolute: -0.000856
        }
      },
      volume: 38.509,
      volumeQuote: 1.52480061
    },
    'binance-us:bchusd': {
      price: {
        last: 340.58,
        high: 352.31,
        low: 333,
        change: {
          percentage: -0.0112065962141447,
          absolute: -3.86
        }
      },
      volume: 655.26957,
      volumeQuote: 224448.7271292
    },
    'binance-us:bchusdt': {
      price: {
        last: 341.33,
        high: 351.74,
        low: 332.76,
        change: {
          percentage: -0.0127838033261027,
          absolute: -4.42
        }
      },
      volume: 372.49159,
      volumeQuote: 127385.8274286
    }
  },
  allowance: {
    cost: 22993187,
    remaining: 3962805410,
    remainingPaid: 0,
    upgrade:
      'Upgrade for a higher allowance, starting at $15/month for 16 seconds/hour. https://cryptowat.ch/pricing'
  }
};

export const MARKETS_SUMMARY = {
  result: {
    price: {
      last: 8671.7,
      high: 8731.9,
      low: 8333,
      change: {
        percentage: 0.0014204217382267,
        absolute: 12.3
      }
    },
    volume: 4120.52255495,
    volumeQuote: 35448430.172865696
  },
  allowance: {
    cost: 4203390,
    remaining: 3898415262,
    remainingPaid: 0,
    upgrade:
      'Upgrade for a higher allowance, starting at $15/month for 16 seconds/hour. https://cryptowat.ch/pricing'
  }
};

export const EXCHANGE_MARKETS = {
  result: [
    {
      id: 16,
      exchange: 'kraken',
      pair: 'btceur',
      active: true,
      route: 'https://api.cryptowat.ch/markets/kraken/btceur'
    },
    {
      id: 4,
      exchange: 'kraken',
      pair: 'btcusd',
      active: true,
      route: 'https://api.cryptowat.ch/markets/kraken/btcusd'
    },
    {
      id: 83,
      exchange: 'kraken',
      pair: 'btcgbp',
      active: true,
      route: 'https://api.cryptowat.ch/markets/kraken/btcgbp'
    },
    {
      id: 84,
      exchange: 'kraken',
      pair: 'btcjpy',
      active: true,
      route: 'https://api.cryptowat.ch/markets/kraken/btcjpy'
    },
    {
      id: 40,
      exchange: 'kraken',
      pair: 'btccad',
      active: true,
      route: 'https://api.cryptowat.ch/markets/kraken/btccad'
    },
    {
      id: 93,
      exchange: 'kraken',
      pair: 'ltceur',
      active: true,
      route: 'https://api.cryptowat.ch/markets/kraken/ltceur'
    },
    {
      id: 32,
      exchange: 'kraken',
      pair: 'ltcbtc',
      active: true,
      route: 'https://api.cryptowat.ch/markets/kraken/ltcbtc'
    },
    {
      id: 23,
      exchange: 'kraken',
      pair: 'ltccad',
      active: false,
      route: 'https://api.cryptowat.ch/markets/kraken/ltccad'
    }
  ],
  allowance: {
    cost: 160476,
    remaining: 3898254786,
    remainingPaid: 0,
    upgrade:
      'Upgrade for a higher allowance, starting at $15/month for 16 seconds/hour. https://cryptowat.ch/pricing'
  }
};

export const MARKET_DESCRIPTION = {
  result: {
    id: 57,
    exchange: 'kraken',
    pair: 'btcusd',
    active: true,
    routes: {
      price: 'https://api.cryptowat.ch/markets/kraken/btcusd/price',
      summary: 'https://api.cryptowat.ch/markets/kraken/btcusd/summary',
      orderbook: 'https://api.cryptowat.ch/markets/kraken/btcusd/orderbook',
      trades: 'https://api.cryptowat.ch/markets/kraken/btcusd/trades',
      ohlc: 'https://api.cryptowat.ch/markets/kraken/btcusd/ohlc'
    }
  },
  allowance: {
    cost: 57834,
    remaining: 3898196952,
    remainingPaid: 0,
    upgrade:
      'Upgrade for a higher allowance, starting at $15/month for 16 seconds/hour. https://cryptowat.ch/pricing'
  }
};

export const MARKET_V2 = {
  result: [
    {
      id: 82,
      exchange: {
        id: 4,
        symbol: 'kraken'
      },
      instrument: {
        id: 4,
        base: {
          id: 60,
          symbol: 'btc'
        },
        quote: {
          id: 38,
          symbol: 'usd'
        },
        type: 'pair'
      },
      active: true
    }
  ],
  allowance: {
    cost: 2197941,
    remaining: 3895999011,
    remainingPaid: 0,
    upgrade:
      'Upgrade for a higher allowance, starting at $15/month for 16 seconds/hour. https://cryptowat.ch/pricing'
  }
};

export const ASSET_V2 = {
  result: {
    id: 61,
    symbol: 'btc'
  },
  allowance: {
    cost: 29265,
    remaining: 3889377307,
    remainingPaid: 0,
    upgrade:
      'Upgrade for a higher allowance, starting at $15/month for 16 seconds/hour. https://cryptowat.ch/pricing'
  }
};

export const OHLC = {
  result: {
    '60': [
      [1579605180, 8643.2, 8643.2, 8643.2, 8643.2, 0.024, 207.4368],
      [1579605240, 8644.7, 8644.7, 8643.2, 8643.2, 0.17754514, 1534.743964973],
      [1579605300, 8644.6, 8644.6, 8644.6, 8644.6, 0.75, 6483.45]
    ],
    '180': [
      [1579547700, 8652.8, 8655.6, 8652.8, 8655.6, 11.60605041, 100443.690816324],
      [1579547880, 8655.5, 8655.9, 8651, 8654.9, 86.25615518, 746317.810159589],
      [1579548060, 8654.4, 8657.1, 8651, 8652.8, 25.38793718, 219685.569142869]
    ],
    '300': [
      [1579489200, 8642.2, 8644.5, 8633.9, 8640, 21.67427027, 187227.533550377],
      [1579489500, 8646.1, 8648.9, 8646.1, 8647.8, 0.71915133, 6218.618461895],
      [1579489800, 8645.1, 8645.1, 8645, 8645, 0.19332796, 1671.3222142]
    ],
    '900': [
      [1579190400, 8680.1, 8700, 8675.1, 8699.6, 30.29670983, 263307.736980206],
      [1579191300, 8698.7, 8700, 8665, 8678.2, 18.21537108, 158205.272582849],
      [1579192200, 8676.5, 8676.5, 8630, 8637.4, 91.94668436, 795089.976626911]
    ],
    '1800': [
      [1578742200, 8050, 8061.5, 8012, 8054.9, 79.92174765, 641552.140175963],
      [1578744000, 8058.7, 8068.4, 8038, 8040.1, 20.8507498, 167870.780936224],
      [1578745800, 8029.6, 8059.3, 8020, 8037.1, 20.62980371, 165736.830156317]
    ],
    '3600': [
      [1577844000, 7155.7, 7200, 7150, 7194.4, 224.92120556, 1615144.901277256],
      [1577847600, 7195, 7223.5, 7189.9, 7222.5, 138.91052843, 1000954.919721359],
      [1577851200, 7223.5, 7223.5, 7192.4, 7201.5, 97.68745566, 703888.788326562]
    ],
    '7200': [
      [1576051200, 7191, 7220, 7168.7, 7210.9, 132.76595773, 955974.627111195],
      [1576058400, 7211.1, 7240, 7209.2, 7230.7, 79.15473718, 571918.830728214],
      [1576065600, 7230.7, 7233, 7190.7, 7223.1, 163.20045833, 1176299.545108415]
    ],
    '14400': [
      [1572465600, 9105, 9210, 9022.1, 9210, 953.24968109, 8695714.773709182],
      [1572480000, 9210, 9236.4, 9140, 9166.2, 588.4437708, 5406668.71082348],
      [1572494400, 9163.9, 9215.2, 9062, 9119.1, 460.5797853, 4202045.798058342]
    ],
    '21600': [
      [1568872800, 10157.7, 10180, 9633.8, 9887.1, 2513.97163726, 24833609.035540223],
      [1568894400, 9887, 9900, 9812, 9855, 621.90890513, 6133214.131815589],
      [1568916000, 9854.4, 10112.9, 9812.7, 10044.1, 1615.92628553, 16099153.79957984]
    ],
    '43200': [
      [1558094400, 7883.6, 7946.2, 6636, 7154.9, 12775.03885166, 93181688.59221128],
      [1558137600, 7154.4, 7385, 6886.3, 7350, 8284.08812454, 59067992.85655001],
      [1558180800, 7353.9, 7494.2, 7205, 7316.6, 3482.62860352, 25572465.363936517]
    ],
    '86400': [
      [1536537600, 6183.2, 6459.4, 6137.6, 6231.4, 3606.155, 22762630],
      [1536624000, 6232.8, 6371.3, 6231, 6304.5, 3364.1824, 21145642],
      [1536710400, 6301.2, 6410.9, 6162.4, 6282.3, 3493.6292, 21940868]
    ],
    '259200': [
      [1451001600, 440.56113, 458, 434.2929, 452.71225, 167.6243, 0],
      [1451260800, 455.33902, 457.95, 409, 427.29, 251.39384, 0],
      [1451520000, 427.29, 435, 418.7811, 424.31848, 305.79874, 0]
    ],
    '604800': [
      [1381968000, 125.85, 153, 125.85, 138.09, 42.634753, 0],
      [1382572800, 138.09, 203.45, 137.52, 203.45, 171.619985, 0],
      [1383177600, 203.45, 207.30246, 169.9201, 203.77, 242.176755, 0]
    ],
    '604800_Monday': [
      [1381708800, 123.61, 131.8408, 123.61, 131.8408, 13.0146, 0],
      [1382918400, 162.981, 207.30246, 150, 191, 296.726932, 0],
      [1384128000, 209.748, 400, 209.4001, 317, 245.444705, 0]
    ]
  },
  allowance: {
    cost: 22330262,
    remaining: 3854163366,
    remainingPaid: 0,
    upgrade:
      'Upgrade for a higher allowance, starting at $15/month for 16 seconds/hour. https://cryptowat.ch/pricing'
  }
};

export const ORDERBOOK_SNAPSHOT = {
  result: {
    asks: [
      [8687, 0.1],
      [8687.6, 7.22337232],
      [8688.1, 0.1093],
      [8688.3, 0.25],
      [8688.4, 0.1],
      [8689.7, 0.693],
      [8690, 0.04],
      [8690.7, 3],
      [8691.6, 3.4],
      [8691.8, 0.08],
      [8693.1, 0.24],
      [8693.5, 0.213],
      [8693.8, 0.3],
      [8694, 0.1],
      [8694.2, 0.60342283],
      [8694.3, 2],
      [8694.4, 1.2762],
      [8694.7, 0.376],
      [8694.8, 2.19029137],
      [8695, 0.01],
      [8695.3, 3.1],
      [8696.2, 0.94149525],
      [8697.3, 1.71431787],
      [8697.4, 0.09998365],
      [8697.5, 0.95340966],
      [8697.7, 1.5],
      [8697.8, 0.997081],
      [8698.1, 1.5606]
    ],
    bids: [
      [8684, 2],
      [8683.9, 0.31],
      [8683.8, 3],
      [8683.7, 0.41],
      [8683.4, 3.437],
      [8683.1, 0.04],
      [8682.7, 4],
      [8682.6, 1.1458],
      [8681, 0.1],
      [8680.8, 1.7604],
      [8680.5, 0.08],
      [8678.7, 2],
      [8678.5, 1.6191],
      [8678, 0.376],
      [8677.7, 0.01],
      [8677.5, 1.62208132],
      [8677.2, 3],
      [8676.7, 0.40297373],
      [8676.6, 6.01],
      [8676.3, 2.1],
      [8675, 9.89306431],
      [8674.8, 0.95579051],
      [8673.7, 0.193],
      [8673.2, 5.27428669],
      [8673.1, 4.1],
      [8672.4, 0.005886],
      [8672.2, 0.95607707],
      [8670.7, 2]
    ],
    seqNum: 3845142
  },
  allowance: {
    cost: 2142776,
    remaining: 3848217644,
    remainingPaid: 0,
    upgrade:
      'Upgrade for a higher allowance, starting at $15/month for 16 seconds/hour. https://cryptowat.ch/pricing'
  }
};

export const TRADES = {
  result: [
    [0, 1579639447, 8692.8, 0.595],
    [0, 1579639447, 8693, 0.184],
    [0, 1579639447, 8693, 1.8],
    [0, 1579639449, 8693, 0.70612425],
    [0, 1579639449, 8693, 4.71487575],
    [0, 1579639453, 8692.8, 1.33944921],
    [0, 1579639453, 8692.8, 8.1],
    [0, 1579639453, 8692.8, 0.253166],
    [0, 1579639456, 8692.8, 0.01670115],
    [0, 1579639458, 8692.8, 0.33],
    [0, 1579639459, 8692.8, 0.13383],
    [0, 1579639466, 8692.8, 0.82117],
    [0, 1579639466, 8692.8, 2],
    [0, 1579639466, 8692.8, 1.299],
    [0, 1579639466, 8692.8, 0.066],
    [0, 1579639466, 8692.8, 5.81383],
    [0, 1579639468, 8692.8, 0.4],
    [0, 1579639472, 8692.8, 0.168],
    [0, 1579639472, 8692.8, 0.17],
    [0, 1579639472, 8695, 0.162],
    [0, 1579639477, 8694.7, 0.04],
    [0, 1579639480, 8694.4, 0.03045847],
    [0, 1579639481, 8694.4, 0.05],
    [0, 1579639483, 8694.4, 0.035],
    [0, 1579639483, 8694.4, 2],
    [0, 1579639483, 8694.5, 0.76],
    [0, 1579639483, 8694.9, 0.1],
    [0, 1579639483, 8695.6, 0.25],
    [0, 1579639483, 8695.8, 0.1],
    [0, 1579639483, 8696.3, 0.1],
    [0, 1579639483, 8697.2, 1.655],
    [0, 1579639489, 8695.3, 0.01],
    [0, 1579639494, 8695, 0.23461739],
    [0, 1579639495, 8695, 0.0427333],
    [0, 1579639500, 8694, 0.2],
    [0, 1579639500, 8695, 0.8],
    [0, 1579639503, 8693.3, 0.01153437],
    [0, 1579639503, 8693.3, 0.00002991],
    [0, 1579639503, 8693.3, 8e-8],
    [0, 1579639508, 8696, 0.065],
    [0, 1579639508, 8696, 0.935],
    [0, 1579639513, 8697.4, 0.2],
    [0, 1579639515, 8694.2, 0.13],
    [0, 1579639543, 8695.8, 0.04],
    [0, 1579639543, 8695.8, 0.04],
    [0, 1579639566, 8696.3, 0.25],
    [0, 1579639567, 8694.3, 0.5],
    [0, 1579639567, 8693.2, 0.5],
    [0, 1579639595, 8695.5, 0.01143555],
    [0, 1579639625, 8695.5, 0.05]
  ],
  allowance: {
    cost: 1077887,
    remaining: 3842602968,
    remainingPaid: 0,
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
