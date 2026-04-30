import { StatusBar } from 'expo-status-bar';

import { ComingSoonScreenView } from '../../shared/screens/coming-soon-screen';

export default function FeedScreen() {
  return (
    <>
      <StatusBar style="light" />
      <ComingSoonScreenView title="Feed coming soon" />
    </>
  );
}
