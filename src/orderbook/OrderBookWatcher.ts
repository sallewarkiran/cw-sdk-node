import { Updater } from '../orderbook/Updater';
import { OrderBookSnapshot } from '../util/types/shared';
import { StreamClient } from '../websocket';

/**
 * Allows user to subscribe to an orderbook and recieve updates. StreamClient must be
 * connected to start getting updates.
 */
export class OrderBookWatcher {
  private streamClient: StreamClient;
  private snapshotUpdater: Updater;
  private marketID: number;
  private firstSync = true;
  private _inSync = false;

  /**
   * true if a snpshot has been retrieved and all of the latest deltas have been applied successfully
   */
  public get inSync(): boolean {
    return this._inSync;
  }

  /**
   * @param marketID ID of market to montior orderbook
   * @param snapshotUpdater Updater to handle orderbook deltas and snapshots
   * @param streamClient StreamClient for OrderBookWatcher to subscribe to
   */
  constructor(marketID: number, snapshotUpdater: Updater, streamClient: StreamClient) {
    this.marketID = marketID;
    this.snapshotUpdater = snapshotUpdater;
    this.streamClient = streamClient;
    this.streamClient.subscribe([`markets:${this.marketID}:book:deltas`]);
  }

  /**
   * Unsubscribes from updates to the watched market from the supplied StreamClient,
   * clears all snapshot retrieval timeouts, and tears down all event listeners.
   * This should be called when the user is done with their live order book to avoid going over
   * their data limit.
   */
  public destroy(): void {
    this.streamClient.unsubscribe([`markets:${this.marketID}:book:deltas`]);
    this.snapshotUpdater.destroy();
  }

  /**
   * Adds an event listener that triggers on each new update from an OrderBook snapshot and/or delta
   * @param callback function that is passed the marketID and latest OrderBookSnapshot as a parameter
   */
  public onUpdate(
    callback: (marketID: number, orderBookSnapshot: OrderBookSnapshot) => void
  ): void {
    this.snapshotUpdater.onOrderBookUpdate((orderBookSnapshot) => {
      callback(this.marketID, orderBookSnapshot);
    });
  }

  /**
   * Adds an event listener that triggers the supplied callback any time the inSync status changes.
   * @param callback function that is passed the marketID and current inSync status
   */
  public onSyncStatusChange(callback: (marketID: number, inSync: boolean) => void): void {
    this.snapshotUpdater.onStateUpdate((orderBookState) => {
      if (this.firstSync || orderBookState.inSync !== this.inSync) {
        this.firstSync = false;
        this._inSync = orderBookState.inSync;
        callback(this.marketID, orderBookState.inSync);
      }
    });
  }

  /**
   * Adds an event listener that triggers the supplied callback on any error caught
   * @param callback function that is passed the marketID and the caught error
   */

  public onError(callback: (marketID: number, error: Error) => void): void {
    this.snapshotUpdater.onError((error) => {
      callback(this.marketID, error);
    });
  }
}
