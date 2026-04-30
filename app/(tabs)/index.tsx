import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { HomeScreenView } from '../../shared/screens/home-screen';

export default function HomeScreen() {
  return (
    <>
      <StatusBar style="light" />
      <HomeScreenView
        onOpenCoin={(params) => router.push({ pathname: '/coin/[slug]', params })}
        onCreateWallet={() => router.push('/create-wallet')}
      />
    </>
  );
}
