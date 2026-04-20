export function formatMoney(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(value);
}

export function formatMarketCap(value: number) {
  if (value >= 1_000_000_000_000) return `$${(value / 1_000_000_000_000).toFixed(1)}T MC`;
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B MC`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M MC`;
  return `$${Math.round(value)} MC`;
}

export function formatPct(value: number) {
  return `${Math.abs(value).toFixed(2)}%`;
}
