import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import type { CoinRouteParams } from '../../shared/navigation';
import { CoinScreenView } from '../../shared/screens/coin-screen';

export default function CoinScreen() {
  const params = useLocalSearchParams<{
    slug?: string | string[];
    symbol?: string;
    name?: string;
    iconUrl?: string;
    price?: string;
    marketCap?: string;
    change?: string;
    positive?: string;
  }>();
  const router = useRouter();

  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const screenParams: CoinRouteParams = {
    slug: slug ?? 'bitcoin',
    symbol: params.symbol,
    name: params.name,
    iconUrl: params.iconUrl,
    price: params.price,
    marketCap: params.marketCap,
    change: params.change,
    positive: params.positive,
  };

  return (
    <>
      <StatusBar style="light" />
      <CoinScreenView params={screenParams} onBack={() => router.back()} />
    </>
  );
}
