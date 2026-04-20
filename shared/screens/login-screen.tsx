import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { GoogleLogo } from '../../components/google-logo';
import { fonts } from '../../constants/theme';
import { SafeAreaView } from '../lib/safe-area';

export function LoginScreenView({ onAuthenticated }: { onAuthenticated: () => void }) {
  return (
    <LinearGradient colors={['#576AF1', '#8F9CFF']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <View style={[styles.floatingEmoji, styles.doge]}>
          <Text style={styles.emojiText}>🐕</Text>
        </View>
        <View style={[styles.floatingEmoji, styles.cat]}>
          <Text style={styles.emojiText}>🐱</Text>
        </View>
        <View style={[styles.floatingEmoji, styles.hamster]}>
          <Text style={styles.emojiText}>🐹</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.logo}>fomo</Text>
          <Text style={styles.subtitle}>Start trading tokens{`\n`}in an instant.</Text>

          <Pressable onPress={onAuthenticated} style={styles.appleButton}>
            <FontAwesome name="apple" size={22} color="#080A13" />
            <Text style={styles.appleText}>Sign in with Apple</Text>
          </Pressable>

          <Pressable onPress={onAuthenticated} style={styles.googleButton}>
            <GoogleLogo size={22} />
            <Text style={styles.googleText}>Sign in with Google</Text>
          </Pressable>

          <Text style={styles.terms}>By signing up, you agree to our{`\n`}Terms of Service and Privacy Policy.</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safe: {
    flex: 1,
    paddingHorizontal: 20,
  },
  floatingEmoji: {
    position: 'absolute',
    opacity: 0.6,
  },
  doge: {
    top: 92,
    left: -18,
  },
  cat: {
    top: 142,
    right: -14,
  },
  hamster: {
    bottom: 220,
    left: -16,
  },
  emojiText: {
    fontSize: 96,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 28,
  },
  logo: {
    textAlign: 'center',
    color: '#DEE2FF',
    fontSize: 62,
    fontFamily: fonts.heading,
    marginBottom: 54,
  },
  subtitle: {
    textAlign: 'center',
    color: '#E8EAFC',
    fontSize: 16,
    lineHeight: 22,
    fontFamily: fonts.body,
    marginBottom: 24,
  },
  appleButton: {
    height: 56,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    shadowColor: '#212654',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  appleText: {
    color: '#090A14',
    fontSize: 14,
    fontFamily: fonts.headingSemi,
  },
  googleButton: {
    height: 56,
    borderRadius: 14,
    backgroundColor: '#101122',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  googleText: {
    color: '#F7F8FF',
    fontSize: 14,
    fontFamily: fonts.headingSemi,
  },
  terms: {
    textAlign: 'center',
    color: '#D7DAF5',
    fontSize: 11,
    lineHeight: 16,
    fontFamily: fonts.bodyRegular,
    opacity: 0.9,
  },
});
