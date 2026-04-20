import { StatusBar } from 'expo-status-bar';

import { LeaderboardScreenView } from '../../shared/screens/leaderboard-screen';

export default function LeaderboardScreen() {
  return (
    <>
      <StatusBar style="light" />
      <LeaderboardScreenView />
    </>
  );
}
