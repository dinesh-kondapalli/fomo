import { StatusBar } from 'expo-status-bar';

import { FeedScreenView } from '../../shared/screens/feed-screen';

export default function FeedScreen() {
  return (
    <>
      <StatusBar style="light" />
      <FeedScreenView />
    </>
  );
}
