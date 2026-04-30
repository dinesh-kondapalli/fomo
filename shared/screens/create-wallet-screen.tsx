import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { fonts } from '../../constants/theme';
import { getBwickChainStatus, isValidBwickAddress } from '../../lib/bwick-chain';
import { generateWallet, type GeneratedWallet } from '../../lib/wallet-keygen';
import { SafeAreaView } from '../lib/safe-area';

export function CreateWalletScreenView({ onContinue }: { onContinue: (wallet: GeneratedWallet) => void }) {
  const [creating, setCreating] = useState(false);
  const [address, setAddress] = useState('');
  const [chainStatus, setChainStatus] = useState('BWICK chain ready');
  const [error, setError] = useState('');

  async function handleCreateWallet() {
    if (creating) return;
    setCreating(true);
    setError('');

    try {
      const wallet = await generateWallet();
      if (!isValidBwickAddress(wallet.address)) {
        throw new Error('Generated BWICK address failed validation');
      }
      setAddress(wallet.address);

      try {
        const status = await getBwickChainStatus();
        setChainStatus(`Connected to ${status.chainId}`);
      } catch {
        setChainStatus('BWICK wallet created. Chain node is currently unreachable.');
      }

      onContinue(wallet);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create BWICK wallet');
    } finally {
      setCreating(false);
    }
  }

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
          <Text style={styles.subtitle}>Create your wallet and pick a social name.</Text>

          <View style={styles.inputWrap}>
            <Text style={styles.inputLabel}>Social name</Text>
            <TextInput
              placeholder="@yourname"
              placeholderTextColor="rgba(247,248,255,0.55)"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
            />
          </View>

          <Pressable onPress={handleCreateWallet} style={styles.primaryButton} disabled={creating}>
            <Text style={styles.primaryText}>{creating ? 'Creating BWICK wallet...' : 'Create wallet'}</Text>
          </Pressable>

          {address ? <Text style={styles.address}>{address}</Text> : null}
          <Text style={styles.chainStatus}>{chainStatus}</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Text style={styles.terms}>Your social name is how others find you in the app.</Text>
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
  inputWrap: {
    marginBottom: 14,
  },
  inputLabel: {
    color: '#F7F8FF',
    fontFamily: fonts.headingSemi,
    fontSize: 13,
    marginBottom: 8,
  },
  input: {
    height: 56,
    borderRadius: 14,
    backgroundColor: 'rgba(16,17,34,0.72)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    color: '#F7F8FF',
    fontFamily: fonts.body,
    fontSize: 15,
  },
  primaryButton: {
    height: 56,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#212654',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  address: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 11,
    lineHeight: 16,
    fontFamily: fonts.body,
    marginBottom: 8,
  },
  chainStatus: {
    textAlign: 'center',
    color: '#E8EAFC',
    fontSize: 11,
    lineHeight: 15,
    fontFamily: fonts.body,
    marginBottom: 8,
  },
  error: {
    textAlign: 'center',
    color: '#FFE2E2',
    fontSize: 11,
    lineHeight: 15,
    fontFamily: fonts.body,
    marginBottom: 8,
  },
  primaryText: {
    color: '#090A14',
    fontSize: 14,
    fontFamily: fonts.headingSemi,
  },
  terms: {
    textAlign: 'center',
    color: '#D7DAF5',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fonts.bodyRegular,
    opacity: 0.9,
  },
});
