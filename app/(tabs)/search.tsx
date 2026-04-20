import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { SearchScreenView } from '../../shared/screens/search-screen';

export default function SearchScreen() {
  return (
    <>
      <StatusBar style="light" />
      <SearchScreenView onOpenCoin={(params) => router.push({ pathname: '/coin/[slug]', params })} />
    </>
  );
}
