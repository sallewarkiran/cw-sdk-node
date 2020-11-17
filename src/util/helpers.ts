import { isLong } from 'long';
import { DeltaItem, PublicOrder, OrderBookSnapshot } from './types/shared';
import { Decimal } from 'decimal.js-light';
import { OrderBookSnapshotRaw } from '../rest/types/data';

export function guardIsLong(value: number | Long): value is Long {
  return isLong(value);
}

export function getNumber(n: number | Long): number {
  return guardIsLong(n) ? n.toNumber() : n;
}

export function getString(n: number | Long): string {
  return String(getNumber(n));
}

export function getDateFromSecs(n: number | Long): Date {
  return new Date(getNumber(n) * 1000);
}

export function getDateFromMs(n: number | Long): Date {
  return new Date(getNumber(n));
}

export function getDateFromNs(n: number | Long): Date {
  return new Date(getNumber(n) / 1000000);
}

// Get rid of stupid Symbol() formatting
export function symbolString(s: symbol): string {
  return s.toString().substr(7, s.toString().length - 8);
}

export function transformSnapshot(orderBook: OrderBookSnapshotRaw): OrderBookSnapshot {
  return {
    seqNum: orderBook.seqNum,
    asks: orderBook.asks.map((ask) => ({
      price: ask[0].toString(),
      amount: ask[1].toString()
    })),
    bids: orderBook.bids.map((bid) => ({
      price: bid[0].toString(),
      amount: bid[1].toString()
    }))
  };
}

export function sortDeltaItems(i: DeltaItem, j: DeltaItem, reverse = false): number {
  const iPriceDecimal = new Decimal(i.order.price);
  const jPriceDecimal = new Decimal(j.order.price);

  const comparison = reverse ? jPriceDecimal.cmp(iPriceDecimal) : iPriceDecimal.cmp(jPriceDecimal);

  if (comparison !== 0) {
    return comparison;
  }

  if (i.index < j.index) {
    i.overridden = true;
    return 1;
  } else {
    j.overridden = true;
    return -1;
  }
}

export function binarySearchOrders(
  orders: PublicOrder[],
  price: string,
  startIndex: number,
  reverse = false
): { exists: boolean; index: number } {
  const priceDecimal = new Decimal(price);
  let end = orders.length;
  let start = startIndex;

  while (start < end) {
    const currentIndex = start + Math.floor((end - start) / 2);
    const order = orders[currentIndex];
    const comparison = priceDecimal.cmp(new Decimal(order.price));
    if (comparison === 0) {
      return { exists: true, index: currentIndex };
    } else {
      if (reverse != comparison < 0) {
        end = currentIndex;
      } else {
        start = currentIndex + 1;
      }
    }
  }
  return { exists: false, index: start };
}
