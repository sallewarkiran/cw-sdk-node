import { ProtobufMarkets } from '../modules/proto';
import { Pair, PairUpdate, PerformanceUpdate, TrendlineUpdate, VWAPUpdate } from '../types/pairs';
import { getDateFromSecs, getNumber } from '../../util/helpers';

export function pairUpdateFromProto(
  pairUpdate: ProtobufMarkets.IPairUpdateMessage | null | undefined
): PairUpdate | null {
  if (pairUpdate == null || pairUpdate.pair == null) {
    return null;
  }
  const pair: Pair = {
    id: getNumber(pairUpdate.pair)
  };
  if (pairUpdate.vwapUpdate && pairUpdate.vwapUpdate.vwap && pairUpdate.vwapUpdate.timestamp) {
    const vwapUpdate: VWAPUpdate = {
      vwap: String(pairUpdate.vwapUpdate.vwap),
      timestamp: getDateFromSecs(pairUpdate.vwapUpdate.timestamp)
    };
    return {
      pair,
      vwapUpdate
    };
  }
  if (
    pairUpdate.performanceUpdate &&
    pairUpdate.performanceUpdate.window &&
    pairUpdate.performanceUpdate.performance
  ) {
    const performanceUpdate: PerformanceUpdate = {
      window: pairUpdate.performanceUpdate.window,
      performance: String(pairUpdate.performanceUpdate.performance)
    };
    return {
      pair,
      performanceUpdate
    };
  }
  if (
    pairUpdate.trendlineUpdate &&
    pairUpdate.trendlineUpdate.window &&
    pairUpdate.trendlineUpdate.time &&
    pairUpdate.trendlineUpdate.price &&
    pairUpdate.trendlineUpdate.volume
  ) {
    const trendlineUpdate: TrendlineUpdate = {
      window: pairUpdate.trendlineUpdate.window,
      timestamp: getDateFromSecs(pairUpdate.trendlineUpdate.time),
      price: pairUpdate.trendlineUpdate.price,
      volume: pairUpdate.trendlineUpdate.volume
    };
    return {
      pair,
      trendlineUpdate
    };
  }
  return null;
}
