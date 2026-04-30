import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { CreateWalletScreenView } from '../shared/screens/create-wallet-screen';
import { saveWallet } from '../lib/wallet-store';

export default function CreateWalletScreen() {
  return (
    <>
      <StatusBar style="light" />
      <CreateWalletScreenView
        onContinue={(wallet) => {
          saveWallet(wallet);
          router.replace('/(tabs)');
        }}
      />
    </>
  );
}
