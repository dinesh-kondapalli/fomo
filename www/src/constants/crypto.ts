export const trackedCoins = [
  { slug: 'btc', coinId: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { slug: 'eth', coinId: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { slug: 'xrp', coinId: 'ripple', symbol: 'XRP', name: 'XRP' },
  { slug: 'bnb', coinId: 'binancecoin', symbol: 'BNB', name: 'BNB' },
  { slug: 'sol', coinId: 'solana', symbol: 'SOL', name: 'Solana' },
  { slug: 'doge', coinId: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
] as const;

export type CoinSlug = (typeof trackedCoins)[number]['slug'];

const bySlug: Record<CoinSlug, (typeof trackedCoins)[number]> = {
  btc: trackedCoins[0],
  eth: trackedCoins[1],
  xrp: trackedCoins[2],
  bnb: trackedCoins[3],
  sol: trackedCoins[4],
  doge: trackedCoins[5],
};

const byCoinId = Object.fromEntries(trackedCoins.map((coin) => [coin.coinId, coin])) as Record<
  (typeof trackedCoins)[number]['coinId'],
  (typeof trackedCoins)[number]
>;

const bySymbol = Object.fromEntries(trackedCoins.map((coin) => [coin.symbol.toLowerCase(), coin])) as Record<
  string,
  (typeof trackedCoins)[number]
>;

export function getCoinBySlugOrSymbol(value?: string) {
  if (!value) return undefined;
  const lower = value.toLowerCase();
  return bySymbol[lower] ?? bySlug[lower as CoinSlug] ?? byCoinId[lower as (typeof trackedCoins)[number]['coinId']];
}

export function getCoinByAnyId(value?: string) {
  if (!value) return undefined;
  const lower = value.toLowerCase();
  return bySlug[lower as CoinSlug] ?? byCoinId[lower as (typeof trackedCoins)[number]['coinId']] ?? bySymbol[lower];
}
