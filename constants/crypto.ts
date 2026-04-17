import type { ImageSourcePropType } from 'react-native';

export const trackedCoins = [
  {
    slug: 'btc',
    coinId: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    icon: require('../assets/images/crypto/btc.png') as ImageSourcePropType,
  },
  {
    slug: 'eth',
    coinId: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    icon: require('../assets/images/crypto/eth.png') as ImageSourcePropType,
  },
  {
    slug: 'xrp',
    coinId: 'ripple',
    symbol: 'XRP',
    name: 'XRP',
    icon: require('../assets/images/crypto/xrp.png') as ImageSourcePropType,
  },
  {
    slug: 'bnb',
    coinId: 'binancecoin',
    symbol: 'BNB',
    name: 'BNB',
    icon: require('../assets/images/crypto/bnb.png') as ImageSourcePropType,
  },
  {
    slug: 'sol',
    coinId: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    icon: require('../assets/images/crypto/sol.png') as ImageSourcePropType,
  },
  {
    slug: 'doge',
    coinId: 'dogecoin',
    symbol: 'DOGE',
    name: 'Dogecoin',
    icon: require('../assets/images/crypto/doge.png') as ImageSourcePropType,
  },
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

export function isCoinSlug(value: string): value is CoinSlug {
  return value in bySlug;
}

export function getCoinBySlug(slug: CoinSlug) {
  return bySlug[slug];
}

export function getCoinByCoinId(coinId: string) {
  return byCoinId[coinId as (typeof trackedCoins)[number]['coinId']];
}

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
