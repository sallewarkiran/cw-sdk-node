import {
  PublicOrder,
  OrderBookSnapshot,
  OrderBookDelta,
  OrderDeltas,
  DeltaItem
} from 'util/types/shared';
import { sortDeltaItems, binarySearchOrders } from 'util/helpers';

/**
 * Internal class for handling OrderBook delta transforms
 */
export class OrderBook implements OrderBookSnapshot {
  public seqNum = 0;
  public bids: PublicOrder[] = [];
  public asks: PublicOrder[] = [];

  constructor(snapshot?: OrderBookSnapshot) {
    if (snapshot) {
      this.applySnapshot(snapshot);
    }
  }

  public getSnapshot(): OrderBookSnapshot {
    return {
      seqNum: this.seqNum,
      bids: this.bids,
      asks: this.asks
    };
  }

  public applySnapshot(snapshot: OrderBookSnapshot): void {
    this.seqNum = snapshot.seqNum;
    this.bids = snapshot.bids;
    this.asks = snapshot.asks;
  }

  public applyDelta(delta: OrderBookDelta, ignoreSeqNum = false): OrderBook {
    if (!ignoreSeqNum && delta.seqNum - 1 !== this.seqNum) {
      throw new Error(
        "New delta sequence number must be equal to the previous snapshot's sequence number plus 1.\n" +
          `Previous Snapshot SeqNum: ${this.seqNum}\n` +
          `New Delta SeqNum: ${delta.seqNum}`
      );
    }
    this.bids = this.applyOrderDeltas(delta.bids, 'bids');
    this.asks = this.applyOrderDeltas(delta.asks, 'asks');
    this.seqNum = delta.seqNum;
    return this;
  }

  private applyOrderDeltas(orderDeltas: OrderDeltas, deltaType: 'bids' | 'asks'): PublicOrder[] {
    const deltaItems: DeltaItem[] = [];
    orderDeltas.set.forEach((order, index) => {
      deltaItems.push({
        action: 'set',
        order,
        index,
        overridden: false
      });
    });

    orderDeltas.remove.forEach((order, index) => {
      deltaItems.push({
        action: 'remove',
        order: {
          amount: '0', // This value doesn't matter as far as I can tell
          price: order
        },
        index,
        overridden: false
      });
    });

    deltaItems.sort((i, j) => sortDeltaItems(i, j, deltaType === 'bids'));

    let newOrders: PublicOrder[] = [];
    let currentOrdersIndex = 0;

    for (const index in deltaItems) {
      if (deltaItems[index].overridden) {
        continue;
      }
      // eslint-disable-next-line prefer-const
      let { exists, index: insertionIndex } = binarySearchOrders(
        this[deltaType],
        deltaItems[index].order.price,
        currentOrdersIndex,
        deltaType === 'bids'
      );
      newOrders = [...newOrders, ...this[deltaType].slice(currentOrdersIndex, insertionIndex)];

      switch (deltaItems[index].action) {
        case 'set': {
          newOrders = [...newOrders, deltaItems[index].order];
          if (exists) {
            insertionIndex += 1;
          }
          break;
        }
        case 'remove': {
          if (!exists) {
            break;
          }
          insertionIndex += 1;
        }
      }
      currentOrdersIndex = insertionIndex;
    }
    newOrders = [
      ...newOrders,
      ...this[deltaType].slice(currentOrdersIndex, this[deltaType].length)
    ];
    return newOrders;
  }
}
