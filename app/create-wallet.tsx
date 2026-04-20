import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { CreateWalletScreenView } from '../shared/screens/create-wallet-screen';

export default function CreateWalletScreen() {
  return (
    <>
      <StatusBar style="light" />
      <CreateWalletScreenView onContinue={() => router.replace('/(tabs)')} />
    </>
  );
}
