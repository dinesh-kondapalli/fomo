import { StatusBar } from 'expo-status-bar';

import { ProfileScreenView } from '../../shared/screens/profile-screen';

export default function ProfileScreen() {
  return (
    <>
      <StatusBar style="light" />
      <ProfileScreenView />
    </>
  );
}
