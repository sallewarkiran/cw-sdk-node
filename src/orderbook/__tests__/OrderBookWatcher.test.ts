import { OrderBookWatcher } from '../OrderBookWatcher';
import { Substitute, Arg, SubstituteOf } from '@fluffy-spoon/substitute';
import { Updater } from '../Updater';
import { StreamClient } from '../../websocket/StreamClient';
import { OrderBookSnapshot, OrderBookState } from 'util/types/shared';

describe('OrderBookWatcher.js tests', () => {
  describe('constructor tests', () => {
    it('initializes with required parameters', (done) => {
      const mockUpdater = Substitute.for<Updater>();
      const mockStreamClient = Substitute.for<StreamClient>();
      const obw = new OrderBookWatcher(123, mockUpdater, mockStreamClient);
      expect(obw).toBeDefined();
      done();
    });

    it('subscribes correctly with streamclient', (done) => {
      const mockUpdater = Substitute.for<Updater>();
      const mockStreamClient = Substitute.for<StreamClient>();
      new OrderBookWatcher(123, mockUpdater, mockStreamClient);

      mockStreamClient
        .received(1)
        .subscribe(Arg.is((array) => array[0] === 'markets:123:book:deltas'));
      done();
    });
  });

  describe('destroy tests', () => {
    let obw: OrderBookWatcher,
      mockUpdater: SubstituteOf<Updater>,
      mockStreamClient: SubstituteOf<StreamClient>;
    beforeEach((done) => {
      mockUpdater = Substitute.for<Updater>();
      mockStreamClient = Substitute.for<StreamClient>();
      obw = new OrderBookWatcher(123, mockUpdater, mockStreamClient);
      done();
    });
    it('unsubscribes from the correct market', (done) => {
      obw.destroy();
      mockStreamClient
        .received(1)
        .unsubscribe(Arg.is((array) => array[0] === 'markets:123:book:deltas'));
      done();
    });

    it('destroys snapshot updater', (done) => {
      obw.destroy();
      mockUpdater.received(1).destroy();
      done();
    });
  });

  describe('onUpdate tests', () => {
    let obw: OrderBookWatcher,
      mockUpdater: SubstituteOf<Updater>,
      mockStreamClient: SubstituteOf<StreamClient>;
    beforeEach((done) => {
      mockUpdater = Substitute.for<Updater>();
      mockStreamClient = Substitute.for<StreamClient>();
      obw = new OrderBookWatcher(123, mockUpdater, mockStreamClient);
      done();
    });

    it("calls updater's onOrderBookUpdate", (done) => {
      obw.onUpdate(() => {
        return;
      });
      mockUpdater.received(1).onOrderBookUpdate(Arg.any());
      done();
    });

    it("passes marketID to callback handed to updater's onOrderBookUpdate", (done) => {
      expect.assertions(1);
      const callbackChecker = (callback: (snapshot: OrderBookSnapshot) => void): void => {
        callback(null);
        done();
      };
      mockUpdater.onOrderBookUpdate(Arg.any).mimicks(callbackChecker);
      obw.onUpdate((marketID: number) => {
        expect(marketID).toEqual(123);
        return;
      });
    });

    it("passes snapshot to callback handed to updater's onOrderBookUpdate", (done) => {
      expect.assertions(1);
      const snapshot: OrderBookSnapshot = {
        seqNum: 12345,
        asks: [],
        bids: []
      };
      const callbackChecker = (callback: (snapshot: OrderBookSnapshot) => void): void => {
        callback(snapshot);
        done();
      };
      mockUpdater.onOrderBookUpdate(Arg.any).mimicks(callbackChecker);
      obw.onUpdate((_, snapshot: OrderBookSnapshot) => {
        expect(snapshot).toEqual(snapshot);
        return;
      });
    });
  });

  describe('onSyncStatusChange tests', () => {
    let obw: OrderBookWatcher,
      mockUpdater: SubstituteOf<Updater>,
      mockStreamClient: SubstituteOf<StreamClient>;

    const fakeOrderBookStateInSync = {
      inSync: true,
      seqNum: 12345,
      minDeltaNum: 5,
      maxDeltaNum: 10
    };

    const fakeOrderBookStateNotInSync = {
      inSync: false,
      seqNum: 12345,
      minDeltaNum: 5,
      maxDeltaNum: 10
    };
    beforeEach((done) => {
      mockUpdater = Substitute.for<Updater>();
      mockStreamClient = Substitute.for<StreamClient>();
      obw = new OrderBookWatcher(123, mockUpdater, mockStreamClient);
      done();
    });

    it("calls updater's onStateUpdate", (done) => {
      obw.onSyncStatusChange(() => {
        return;
      });
      mockUpdater.received(1).onStateUpdate(Arg.any());
      done();
    });

    it('triggers on the first update with inSync state', (done) => {
      expect.assertions(1);
      const callbackChecker = (callback: (orderBookState: OrderBookState) => void): void => {
        callback(fakeOrderBookStateInSync);
        done();
      };
      mockUpdater.onStateUpdate(Arg.any).mimicks(callbackChecker);
      obw.onSyncStatusChange(() => {
        expect(true).toBeTruthy();
        return;
      });
    });

    it('triggers on the first update without inSync state', (done) => {
      expect.assertions(1);
      const callbackChecker = (callback: (orderBookState: OrderBookState) => void): void => {
        callback(fakeOrderBookStateNotInSync);
        done();
      };
      mockUpdater.onStateUpdate(Arg.any).mimicks(callbackChecker);
      obw.onSyncStatusChange(() => {
        expect(true).toBeTruthy();
        return;
      });
    });

    it('triggers on the second update if inSync status changes', (done) => {
      expect.assertions(2);
      const callbackChecker = (callback: (orderBookState: OrderBookState) => void): void => {
        callback(fakeOrderBookStateNotInSync);
        callback(fakeOrderBookStateInSync);
        done();
      };
      mockUpdater.onStateUpdate(Arg.any).mimicks(callbackChecker);
      obw.onSyncStatusChange(() => {
        expect(true).toBeTruthy();
        return;
      });
    });

    it('does not trigger on the second update if inSync status does not change', (done) => {
      expect.assertions(1);
      const callbackChecker = (callback: (orderBookState: OrderBookState) => void): void => {
        callback(fakeOrderBookStateNotInSync);
        callback(fakeOrderBookStateNotInSync);
        done();
      };
      mockUpdater.onStateUpdate(Arg.any).mimicks(callbackChecker);
      obw.onSyncStatusChange(() => {
        expect(true).toBeTruthy();
        return;
      });
    });

    it("passes marketID to callback handed to updater's onOrderBookUpdate", (done) => {
      expect.assertions(1);
      const callbackChecker = (callback: (orderBookState: OrderBookState) => void): void => {
        callback(fakeOrderBookStateInSync);
      };
      mockUpdater.onStateUpdate(Arg.any).mimicks(callbackChecker);
      obw.onSyncStatusChange((marketID: number) => {
        expect(marketID).toEqual(123);
        done();
        return;
      });
    });

    it("passes inSync status to callback handed to updater's onOrderBookUpdate", (done) => {
      expect.assertions(1);
      const callbackChecker = (callback: (orderBookState: OrderBookState) => void): void => {
        callback(fakeOrderBookStateInSync);
      };
      mockUpdater.onStateUpdate(Arg.any).mimicks(callbackChecker);
      obw.onSyncStatusChange((_, inSync: boolean) => {
        expect(inSync).toEqual(true);
        done();
        return;
      });
    });
  });

  describe('onError tests', () => {
    let obw: OrderBookWatcher,
      mockUpdater: SubstituteOf<Updater>,
      mockStreamClient: SubstituteOf<StreamClient>;
    beforeEach((done) => {
      mockUpdater = Substitute.for<Updater>();
      mockStreamClient = Substitute.for<StreamClient>();
      obw = new OrderBookWatcher(123, mockUpdater, mockStreamClient);
      done();
    });

    it("calls updater's onError", (done) => {
      obw.onError(() => {
        return;
      });
      mockUpdater.received(1).onError(Arg.any());
      done();
    });

    it("passes marketID to callback handed to updater's onError", (done) => {
      expect.assertions(1);
      const callbackChecker = (callback: (error: Error) => void): void => {
        callback(null);
        done();
      };
      mockUpdater.onError(Arg.any).mimicks(callbackChecker);
      obw.onError((marketID: number) => {
        expect(marketID).toEqual(123);
        return;
      });
    });

    it("passes error to callback handed to updater's onError", (done) => {
      expect.assertions(1);
      const error = new Error('Test Error');
      const callbackChecker = (callback: (error: Error) => void): void => {
        callback(error);
        done();
      };
      mockUpdater.onError(Arg.any).mimicks(callbackChecker);
      obw.onError((_, err: Error) => {
        expect(err).toEqual(error);
        return;
      });
    });
  });
});
