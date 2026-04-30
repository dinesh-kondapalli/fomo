import { StatusBar } from 'expo-status-bar';

import { ComingSoonScreenView } from '../../shared/screens/coming-soon-screen';

export default function LeaderboardScreen() {
  return (
    <>
      <StatusBar style="light" />
      <ComingSoonScreenView title="Leaderboard coming soon" />
    </>
  );
}
