export function formatNumber(value: number): string {
  return new Intl.NumberFormat(undefined, {
    // Small values (e.g. 1 JPY in GBP) need more decimals to be meaningful.
    maximumFractionDigits: value < 1 ? 6 : 2,
  }).format(value);
}
