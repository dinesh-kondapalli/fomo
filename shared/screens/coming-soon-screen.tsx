import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { fonts, theme } from '../../constants/theme';
import { SafeAreaView } from '../lib/safe-area';

export function ComingSoonScreenView({ title = 'Coming soon' }: { title?: string }) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <Ionicons name="sparkles-outline" size={28} color={theme.colors.textPrimary} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>This section is being connected to live data.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingBottom: 96,
  },
  iconWrap: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(210, 214, 229, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(216, 220, 238, 0.22)',
    marginBottom: 18,
  },
  title: {
    color: theme.colors.textPrimary,
    fontFamily: fonts.headingSemi,
    fontSize: 28,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    color: theme.colors.textMuted,
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
  },
});
