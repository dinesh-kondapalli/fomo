import { StatusBar } from 'expo-status-bar';

import { ComingSoonScreenView } from '../../shared/screens/coming-soon-screen';

export default function ProfileScreen() {
  return (
    <>
      <StatusBar style="light" />
      <ComingSoonScreenView title="Profile coming soon" />
    </>
  );
}
