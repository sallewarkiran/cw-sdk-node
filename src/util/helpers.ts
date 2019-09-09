export function getNumber(n: number | Long): number {
  if (typeof n === "number") {
    return n;
  }
  return n.toNumber();
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
