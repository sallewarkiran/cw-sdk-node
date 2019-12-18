import { OrderBookDelta, OrderBookSnapshot, OrderBookState } from '../util/types/shared';
import { SnapshotRetriever } from './SnapshotRetriever';
import { EventEmitter } from 'events';
import { OrderBook } from './OrderBook';

enum UpdaterEvents {
  OnSnapshotRetrieved = 'onSnapshotRetrieved',
  OnSnapshotRetrievedError = 'onSnapshotRetrievedError',
  OnOrderBookUpdate = 'onOrderBookUpdate',
  OnStateUpdate = 'onStateUpdate',
  OnDeltaRetrieved = 'onDeltaRetrieved',
  Error = 'error'
}

type DeltaCheckResult = {
  nextDeltaToApply: number;
  inSync: boolean;
};

/**
 * Internal class for handling orderbook update events and delta cache
 */
export class Updater {
  private currentOrderBook = new OrderBook();
  private deltaCache: {
    [sequenceNumber: number]: OrderBookDelta;
  } = {};

  private get state(): OrderBookState {
    return {
      inSync: this.inSync,
      maxDeltaNum: this.maxDeltaNumber,
      minDeltaNum: this.minDeltaNumber,
      seqNum: this.currentOrderBook ? this.currentOrderBook.seqNum : 0
    };
  }

  private firstSync = true;
  private inSync = false;
  private minDeltaNumber = -1;
  private maxDeltaNumber = -1;

  private fetchSnapshotTimer: NodeJS.Timeout | null = null;
  private fetchSnapshotAttempt = 0;

  private snapshotRetriever: SnapshotRetriever;
  private updaterEvents: EventEmitter;

  constructor(snapshotRetriever: SnapshotRetriever) {
    if (snapshotRetriever) {
      this.snapshotRetriever = snapshotRetriever;
    } else {
      throw new Error('A SnapshotRetriever must be supplied to retrieve orderbook snapshot data.');
    }
    this.updaterEvents = new EventEmitter();
    this.initializeEventHandlers();
    this.scheduleSnapshotRetrieval();
  }

  /**
   * Triggers event to add new delta to the cache and attempt to apply
   * it and any other cached deltas.
   * @param orderBookDelta delta obtained from StreamClient
   */
  public applyDelta(orderBookDelta: OrderBookDelta): void {
    this.updaterEvents.emit(UpdaterEvents.OnDeltaRetrieved, orderBookDelta);
  }

  /**
   * Adds an event listener that triggers the supplied callback on each new update from an OrderBook snapshot and/or delta
   * @param callback function that is passed the latest OrderBookSnapshot as a parameter
   */
  public onOrderBookUpdate(callback: (snapshot: OrderBookSnapshot) => void): void {
    this.updaterEvents.on(UpdaterEvents.OnOrderBookUpdate, callback);
  }

  /**
   * Adds an event listener that triggers the supplied callback on each change to the state of cached deltas and sync status
   * @param callback function that is passed the latest OrderBookState of cached deltas and sync status
   */
  public onStateUpdate(callback: (state: OrderBookState) => void): void {
    this.updaterEvents.on(UpdaterEvents.OnStateUpdate, callback);
  }

  /**
   * Adds an event listener that triggers the supplied callback on any error caught
   * @param callback function that is passed caught errors
   */
  public onError(callback: (error: Error) => void): void {
    this.updaterEvents.on(UpdaterEvents.Error, callback);
  }

  /**
   * Tears down all set timeouts and event listeners.
   */
  public destroy(): void {
    if (this.fetchSnapshotTimer) {
      clearTimeout(this.fetchSnapshotTimer);
      this.fetchSnapshotTimer = null;
    }
    this.updaterEvents.removeAllListeners();
  }

  private resetSnapshotTimer(): void {
    if (this.fetchSnapshotTimer) {
      clearTimeout(this.fetchSnapshotTimer);
      this.fetchSnapshotTimer = null;
    }
    this.fetchSnapshotAttempt = 0;
  }

  private initializeEventHandlers(): void {
    this.updaterEvents.on(UpdaterEvents.OnSnapshotRetrieved, this.onSnapshotRetrieved.bind(this));
    this.updaterEvents.on(
      UpdaterEvents.OnSnapshotRetrievedError,
      this.onSnapshotRetrievedError.bind(this)
    );
    this.updaterEvents.on(UpdaterEvents.OnDeltaRetrieved, this.onDeltaRetrieved.bind(this));
  }

  private scheduleSnapshotRetrieval(): void {
    if (this.fetchSnapshotTimer) {
      // already scheduled;
      return;
    }
    const delay = this.getSnapshotDelay(this.fetchSnapshotAttempt);
    this.fetchSnapshotTimer = setTimeout(() => {
      this.snapshotRetriever
        .getOrderBookSnapshot()
        .then((snapshot) => {
          this.updaterEvents.emit(UpdaterEvents.OnSnapshotRetrieved, snapshot);
        })
        .catch((error) => {
          this.updaterEvents.emit(UpdaterEvents.OnSnapshotRetrievedError, error);
        });
    }, delay);
  }

  private onSnapshotRetrieved(snapshot: OrderBookSnapshot): void {
    this.resetSnapshotTimer();
    this.currentOrderBook.applySnapshot(snapshot);
    this.applyCachedDeltas();

    this.updaterEvents.emit(UpdaterEvents.OnOrderBookUpdate, this.currentOrderBook.getSnapshot());
  }

  private onSnapshotRetrievedError(error: Error): void {
    if (this.fetchSnapshotTimer) {
      clearTimeout(this.fetchSnapshotTimer);
      this.fetchSnapshotTimer = null;
    }
    this.fetchSnapshotAttempt += 1;
    this.updaterEvents.emit(UpdaterEvents.Error, error);
    this.scheduleSnapshotRetrieval();
  }

  /**
   * Triggered when a new delta comes in via the stream client. Adds new
   * deltas to the cache and attempts to apply them.
   * If the orderbook is out of sync, it will schedule a new snapshot retrieval in
   * an attempt to get back in sync.
   * @param delta new snapshot delta coming from streamClient
   */
  private onDeltaRetrieved(delta: OrderBookDelta): void {
    if (
      this.minDeltaNumber !== -1 &&
      this.maxDeltaNumber !== -1 &&
      delta.seqNum === this.maxDeltaNumber + 1
    ) {
      this.deltaCache[delta.seqNum] = delta;
      this.maxDeltaNumber++;

      while (this.maxDeltaNumber - this.minDeltaNumber + 1 > this.maxDeltaNumber) {
        delete this.deltaCache[this.minDeltaNumber];
        this.minDeltaNumber++;
      }
    } else {
      this.minDeltaNumber = delta.seqNum;
      this.maxDeltaNumber = delta.seqNum;
      this.deltaCache = {};
      this.deltaCache[delta.seqNum] = delta;
    }

    this.applyCachedDeltas();
    if (!this.inSync) {
      this.scheduleSnapshotRetrieval();
      return;
    }

    this.updaterEvents.emit(UpdaterEvents.OnOrderBookUpdate, this.currentOrderBook.getSnapshot());
  }

  /**
   * Checks each cached delta and applies in order if still in sync
   * Resets snapshot timer if deltas are coming in correctly.
   */
  private applyCachedDeltas(): void {
    if (
      this.currentOrderBook.seqNum === 0 ||
      this.minDeltaNumber === -1 ||
      this.maxDeltaNumber === -1
    ) {
      this.inSync = false;
      this.updaterEvents.emit(UpdaterEvents.OnStateUpdate, this.state);
      return;
    }

    let deltaCheck = this.checkDeltas();
    while (deltaCheck.nextDeltaToApply !== -1) {
      this.currentOrderBook.applyDelta(this.deltaCache[deltaCheck.nextDeltaToApply]);
      deltaCheck = this.checkDeltas();
    }

    const wasInSync = this.inSync;
    this.inSync = deltaCheck.inSync;

    if (this.inSync !== wasInSync || this.firstSync) {
      this.updaterEvents.emit(UpdaterEvents.OnStateUpdate, this.state);
    }

    if (this.inSync) {
      this.firstSync = false;
      this.resetSnapshotTimer();
    }
  }

  private checkDeltas(): DeltaCheckResult {
    /**
     * Check if we have some deltas to apply.
     * numCachedDeltas is the total number of cached deltas we have, and
     * numCachedDeltasOld is the number of deltas which are not newer than the
     * curSeqNum. And then, there are 3 cases:
     * - numCachedDeltasOld < numCachedDeltas : we're in sync (cached deltas
     *   cover curSeqNum), and we have some new deltas to apply
     * - numCachedDeltasOld == numCachedDeltas : we're in sync (cached deltas
     *   cover curSeqNum), and we don't have any new deltas
     * - numCachedDeltasOld > numCachedDeltas : we're out of sync (cached deltas
     *   don't cover curSeqNum)
     */
    const numCachedDeltas = this.maxDeltaNumber - this.minDeltaNumber;
    const numCachedDeltasOld = this.currentOrderBook.seqNum - this.minDeltaNumber;

    const result = {
      nextDeltaToApply: -1,
      inSync: numCachedDeltasOld <= numCachedDeltas
    };

    if (numCachedDeltasOld < numCachedDeltas) {
      result.nextDeltaToApply = this.currentOrderBook.seqNum + 1;
      if (!this.deltaCache[result.nextDeltaToApply]) {
        result.nextDeltaToApply = -1;
        result.inSync = false;
      }
    }

    return result;
  }

  // getSnapshotDelay calculates a delay before fetching a snapshot:
  // randomized between 0 and 5 seconds, plus 5 seconds more after each subsequent attempt,
  // but not more than 40 seconds overall. This reduces the potential of connected clients
  // stressing the CW api.
  private getSnapshotDelay(fetchSnapshotAttempt: number): number {
    let delay = fetchSnapshotAttempt * 5 * 1000;
    if (delay > 30000) {
      delay = 30000;
    }

    // Add random delay: around a second when syncing first time after the page
    // loads, and up to 5 seconds afterwards.
    //
    // The initial small delay is needed because on popular markets fetching
    // the snapshot immediately is usually not helpful since it arrives too
    // late (after a few missed deltas). So we wait for at least one second
    // before fetching a snapshot, and thus we have some time to cache a few
    // deltas.
    if (this.firstSync) {
      delay += 800 + Math.floor(Math.random() * 500);
    } else {
      delay += Math.floor(Math.random() * 500) * 1000;
    }
    return delay;
  }
}
