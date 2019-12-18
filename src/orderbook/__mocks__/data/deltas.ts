import { OrderBookDelta } from 'util/types/shared';

export const mockDelta1: OrderBookDelta = {
  seqNum: 1012075,
  bids: {
    set: [
      { price: '8.6554', amount: '129' },
      { price: '8.6551', amount: '128' }
    ],
    remove: ['8.469']
  },
  asks: {
    set: [
      { price: '8.8124', amount: '85.77432774' },
      { price: '9.1', amount: '75.97997644' },
      { price: '8.8173', amount: '100' },
      { price: '8.8165', amount: '171.54865549' }
    ],
    remove: ['8.8092', '8.8045', '8.8088', '8.8008']
  }
};

export const mockDelta2: OrderBookDelta = {
  seqNum: 1012076,
  bids: {
    set: [
      { price: '8.7569', amount: '4.48485416' },
      { price: '8.7399', amount: '22.6' },
      { price: '8.6654', amount: '204.29443169' },
      { price: '8.6514', amount: '0.6' }
    ],
    remove: ['8.47', '8.7493']
  },
  asks: { set: [], remove: [] }
};

export const mockDelta3: OrderBookDelta = {
  seqNum: 1012077,
  bids: { set: [{ price: '8.7563', amount: '4.48743395' }], remove: ['8.7569'] },
  asks: { set: [], remove: [] }
};

export const mockDelta4: OrderBookDelta = {
  seqNum: 1012078,
  bids: {
    set: [
      { price: '8.7561', amount: '20' },
      { price: '8.7564', amount: '9.86958519' }
    ],
    remove: ['8.4747', '8.6551', '8.7604', '8.7605']
  },
  asks: {
    set: [
      { price: '8.8628', amount: '85.77432774' },
      { price: '9.01', amount: '75.97997644' },
      { price: '9.12', amount: '171.54865549' }
    ],
    remove: ['9.1', '8.8165', '8.8173']
  }
};

export const mockDelta5: OrderBookDelta = {
  seqNum: 1012079,
  bids: {
    set: [
      { price: '8.7607', amount: '58.77510615' },
      { price: '8.7606', amount: '61.52150127' },
      { price: '8.7366', amount: '158.6' },
      { price: '8.6548', amount: '128' }
    ],
    remove: ['8.4792']
  },
  asks: { set: [], remove: [] }
};
