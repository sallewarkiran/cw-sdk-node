import { Updater } from 'orderbook/Updater';
import { SnapshotRetriever } from 'orderbook/SnapshotRetriever';
import { mockDelta1, mockDelta4, mockDelta5 } from 'orderbook/__mocks__/data/deltas';
import { mockSnapshot } from 'orderbook/__mocks__/data/snapshot';

jest.mock('orderbook/SnapshotRetriever');

const MockSnapshotRetriever = SnapshotRetriever as jest.Mock<SnapshotRetriever>;
describe('Updater.js tests', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  describe('constructor tests', () => {
    it('initializes', (done) => {
      const updater = new Updater(new MockSnapshotRetriever());
      expect(updater).toBeDefined();
      done();
    });

    it('triggers snapshot retrieval after timeout', async (done) => {
      jest.useFakeTimers();
      const mock = new MockSnapshotRetriever();
      new Updater(mock);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      jest.runAllTimers();
      expect(mock.getOrderBookSnapshot).toHaveBeenCalledTimes(1);
      done();
    });

    it('applies the snapshot to the internal orderbook and triggers an update event', async (done) => {
      jest.useFakeTimers();
      const mock = new MockSnapshotRetriever();
      const updater = new Updater(mock);
      updater.onOrderBookUpdate((snapshot) => {
        expect(snapshot.seqNum).toEqual(mockSnapshot.seqNum);
        done();
      });
      jest.runAllTimers();
    });
  });

  describe('applyDelta tests', () => {
    it('ignores deltas applied with older sequence numbers', (done) => {
      jest.useFakeTimers();
      const mock = new MockSnapshotRetriever();
      const updater = new Updater(mock);
      updater.applyDelta(mockDelta1);
      updater.onOrderBookUpdate((snapshot) => {
        expect(snapshot.seqNum).toEqual(mockSnapshot.seqNum);
        done();
      });
      jest.runAllTimers();
    });

    it('applies cached deltas with new sequence numbers after initial snapshot retrieval', (done) => {
      jest.useFakeTimers();
      const mock = new MockSnapshotRetriever();
      const updater = new Updater(mock);
      updater.applyDelta(mockDelta4);
      updater.onOrderBookUpdate((snapshot) => {
        expect(snapshot.seqNum).toEqual(mockDelta4.seqNum);
        done();
      });
      jest.runAllTimers();
    });

    it('applies multiple cached deltas in the correct order', (done) => {
      jest.useFakeTimers();
      const mock = new MockSnapshotRetriever();
      const updater = new Updater(mock);
      updater.applyDelta(mockDelta4);
      updater.applyDelta(mockDelta5);
      updater.onOrderBookUpdate((snapshot) => {
        expect(snapshot.seqNum).toEqual(mockDelta5.seqNum);
        done();
      });
      jest.runAllTimers();
    });

    it('triggers an update for a snapshot retrieval, then for deltas as they come in', (done) => {
      jest.useFakeTimers();
      const mock = new MockSnapshotRetriever();
      const updater = new Updater(mock);

      let updateNumber = 0;
      updater.onOrderBookUpdate((snapshot) => {
        switch (updateNumber) {
          case 0: {
            expect(snapshot.seqNum).toEqual(mockSnapshot.seqNum);
            setTimeout(() => {
              updater.applyDelta(mockDelta4);
            }, 1);
            break;
          }
          case 1: {
            expect(snapshot.seqNum).toEqual(mockDelta4.seqNum);
            setTimeout(() => {
              updater.applyDelta(mockDelta5);
            }, 1);
            break;
          }
          case 2: {
            expect(snapshot.seqNum).toEqual(mockDelta5.seqNum);
            break;
          }
        }
        if (updateNumber == 2) {
          done();
        } else {
          updateNumber++;
          jest.runAllTimers();
        }
      });
      jest.runAllTimers();
    });

    it('updates state to out of sync if only snapshot is applied without deltas', (done) => {
      jest.useFakeTimers();
      const mock = new MockSnapshotRetriever();
      const updater = new Updater(mock);
      updater.onStateUpdate((state) => {
        expect(state.inSync).toEqual(false);
        done();
      });
      jest.runAllTimers();
    });

    it('updates state to in sync if snapshot and new delta is applied', (done) => {
      jest.useFakeTimers();
      const mock = new MockSnapshotRetriever();
      const updater = new Updater(mock);
      updater.applyDelta(mockDelta4);
      updater.onStateUpdate((state) => {
        expect(state.inSync).toEqual(true);
        done();
      });
      jest.runAllTimers();
    });

    it('updates state to in sync if a new delta is applied with time gap', (done) => {
      jest.useFakeTimers();
      const mock = new MockSnapshotRetriever();
      const updater = new Updater(mock);
      let firstUpdate = true;
      updater.onStateUpdate((state) => {
        if (firstUpdate) {
          setTimeout(() => {
            updater.applyDelta(mockDelta4);
          }, 1);
          firstUpdate = false;
          jest.runAllTimers();
        } else {
          expect(state.inSync).toEqual(true);
          done();
        }
      });
      jest.runAllTimers();
    });

    it('updates state to out of sync if a delta comes in out of order', (done) => {
      jest.useFakeTimers();
      const mock = new MockSnapshotRetriever();
      const updater = new Updater(mock);
      updater.applyDelta(mockDelta5);
      updater.onStateUpdate((state) => {
        expect(state.inSync).toEqual(false);
        done();
      });
      jest.runAllTimers();
    });

    it('updates state but stays out of sync if a delta comes in out of order with time gap', (done) => {
      jest.useFakeTimers();
      const mock = new MockSnapshotRetriever();
      const updater = new Updater(mock);
      jest.runAllTimers();
      let firstUpdate = true;
      updater.onStateUpdate((state) => {
        if (firstUpdate) {
          setTimeout(() => {
            updater.applyDelta(mockDelta5);
          }, 1);
          firstUpdate = false;
          jest.runAllTimers();
        } else {
          expect(state.inSync).toEqual(false);
          done();
        }
      });
      jest.runAllTimers();
    });
  });
});
