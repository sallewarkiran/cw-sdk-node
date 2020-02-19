import { OrderBook } from '../OrderBook';
import { mockSnapshot } from './data/snapshot';
import { mockDelta4, mockDelta1 } from './data/deltas';

describe('OrderBook.js tests', () => {
  describe('constructor tests', () => {
    it('initializes', (done) => {
      const ob = new OrderBook();
      expect(ob).toBeDefined();
      done();
    });

    it('initializes with snapshot', (done) => {
      const ob = new OrderBook(mockSnapshot);
      expect(ob).toBeDefined();
      done();
    });

    it('applies snapshot correctly', (done) => {
      const ob = new OrderBook(mockSnapshot);
      expect(ob.asks).toEqual(mockSnapshot.asks);
      expect(ob.bids).toEqual(mockSnapshot.bids);
      done();
    });
  });

  describe('applySnapshot', () => {
    it('applies snapshot correctly', (done) => {
      const ob = new OrderBook();
      expect(ob.asks).toHaveLength(0);
      expect(ob.bids).toHaveLength(0);
      ob.applySnapshot(mockSnapshot);
      expect(ob.asks).toEqual(mockSnapshot.asks);
      expect(ob.bids).toEqual(mockSnapshot.bids);
      done();
    });
  });

  describe('applyDelta', () => {
    it('accepts a delta when the sequence number is correct', (done) => {
      const ob = new OrderBook(mockSnapshot);
      ob.applyDelta(mockDelta4);
      done();
    });

    it('applies delta asks correctly', (done) => {
      const ob = new OrderBook(mockSnapshot);
      ob.applyDelta(mockDelta4);
      mockDelta4.asks.set.forEach((setAsk) => {
        expect(ob.asks).toContain(setAsk); // new asks set correctly
      });
      mockDelta4.asks.remove.forEach((removedAsk) => {
        expect(ob.asks.find((ask) => ask.price === removedAsk)).toBeUndefined(); // old asks removed correctly
      });
      done();
    });

    it('applies delta bids correctly', (done) => {
      const ob = new OrderBook(mockSnapshot);
      ob.applyDelta(mockDelta4);
      mockDelta4.bids.set.forEach((setBid) => {
        expect(ob.bids).toContain(setBid); // new bids set correctly
      });
      mockDelta4.bids.remove.forEach((removedBid) => {
        expect(ob.bids.find((bid) => bid.price === removedBid)).toBeUndefined(); // old bids removed correctly
      });
      done();
    });

    it('throws an error if incorrect sequence number is applied', (done) => {
      const ob = new OrderBook(mockSnapshot);
      expect(() => {
        ob.applyDelta(mockDelta1);
      }).toThrow();
      done();
    });
  });
});
