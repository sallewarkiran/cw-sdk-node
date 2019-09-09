import { EventEmitter } from "events";
import { TradeSubscription } from "./types/client";

type Module = "placeOrder" | "orders" | "trades" | /*"balances" |*/ "positions";
const modules = ["placeOrder", "orders", "trades", /*"balances",*/ "positions"];

interface Session {
  [key: string]: boolean;
  initialized: boolean;
  orders: boolean;
  trades: boolean;
  positions: boolean;
}

/**
 * This class is used to keep trading sessions organized, and emit a ready status when the client
 * can trade.
 */
export default class SessionTracker extends EventEmitter {
  private ready: boolean;

  private markets: string[];

  private sessions: {
    [key: string]: Session;
  };

  constructor(tradeSubs: TradeSubscription[]) {
    super();
    this.ready = false;
    this.sessions = {};
    this.markets = [];
    tradeSubs.forEach(ts => {
      this.markets.push(ts.marketID);
    });
    this.reset();
  }

  public isReady(): boolean {
    return this.ready;
  }

  public setModuleReady(mID: string, m: Module): void {
    if (this.sessions[mID][m] === true) {
      return;
    }
    this.sessions[mID][m] = true;
    if (this.modulesReady()) {
      this.ready = true;
      this.emit("ready");
    }
  }

  public isModuleReady(mID: string, m: Module): boolean {
    return this.sessions[mID][m];
  }

  public reset() {
    this.markets.forEach(mID => {
      this.sessions[mID] = {
        initialized: false,
        orders: false,
        trades: false,
        positions: false
      };
    });
  }

  private modulesReady(): boolean {
    for (const mID of this.markets) {
      for (const m of modules) {
        if (this.sessions[mID][m] !== true) {
          return false;
        }
      }
    }
    return true;
  }
}
