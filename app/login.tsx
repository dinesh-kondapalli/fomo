import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { LoginScreenView } from '../shared/screens/login-screen';

export default function LoginScreen() {
  return (
    <>
      <StatusBar style="light" />
      <LoginScreenView onAuthenticated={() => router.replace('/(tabs)')} />
    </>
  );
}
