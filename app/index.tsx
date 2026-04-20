import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { SplashScreenView } from '../shared/screens/splash-screen';

export default function SplashScreen() {
  return (
    <>
      <StatusBar style="light" />
      <SplashScreenView onFinish={() => router.replace('/login')} />
    </>
  );
}
