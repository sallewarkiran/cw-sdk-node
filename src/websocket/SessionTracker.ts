import { EventEmitter } from 'events';
import { TradeSubscription } from './types/client';

type Module = 'initialize' | 'orderUpdates' | 'tradeUpdates' | 'positionUpdates';

const modules = ['initialize', 'orderUpdates', 'tradeUpdates', 'positionUpdates'];

interface Session {
  [key: string]: boolean;
  initialize: boolean;
  orderUpdates: boolean;
  tradeUpdates: boolean;
  positionUpdates: boolean;
}

/**
 * This class is used to keep trading sessions organized, and emit a ready status when the client
 * can trade.
 */
export default class SessionTracker extends EventEmitter {
  private ready: boolean;

  private sessions: {
    [key: number]: Session;
  };

  constructor(tradeSubs: TradeSubscription[]) {
    super();
    this.ready = false;
    this.sessions = {};
    tradeSubs.forEach((ts) => {
      this.sessions[ts.marketID] = {
        orderUpdates: false,
        initialize: false,
        tradeUpdates: false,
        positionUpdates: false
      };
    });
  }

  public isReady(): boolean {
    return this.ready;
  }

  public setModuleReady(mID: number, m: Module): void {
    if (this.sessions[mID][m] === true) {
      return;
    }
    this.sessions[mID][m] = true;
    if (this.modulesReady()) {
      this.ready = true;
      this.emit('ready');
    }
  }

  public isModuleReady(mID: number, m: Module): boolean {
    return this.sessions[mID][m];
  }

  public reset(): void {
    for (const mID in this.sessions) {
      if (Object.prototype.hasOwnProperty.call(this.sessions, mID)) {
        this.sessions[mID] = {
          initialize: false,
          orderUpdates: false,
          tradeUpdates: false,
          positionUpdates: false
        };
      }
    }
    this.ready = false;
  }

  private modulesReady(): boolean {
    for (const mID in this.sessions) {
      if (Object.prototype.hasOwnProperty.call(this.sessions, mID)) {
        for (const m of modules) {
          if (this.sessions[mID][m] !== true) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
