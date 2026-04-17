import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { profilePromoAvatars } from '@/constants/mockData';
import { fonts, theme } from '@/constants/theme';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar style="light" />

      <View style={styles.headerArea}>
        <View style={styles.headerTopRow}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatarBubble}><Text style={styles.avatarText}>∞</Text></View>
            <View style={styles.editBadge}><Ionicons name="pencil" size={10} color={theme.colors.textPrimary} /></View>
          </View>
          <View style={styles.headerIcons}>
            <Ionicons name="gift-outline" size={24} color={theme.colors.textMuted} />
            <Ionicons name="refresh-circle-outline" size={24} color={theme.colors.textMuted} />
            <Ionicons name="settings" size={24} color={theme.colors.textMuted} />
          </View>
        </View>

        <Text style={styles.name}>DrabCuteEgret</Text>
        <Text style={styles.handle}>@DrabCuteEgret</Text>
        <Text style={styles.bio}>+ Add a bio</Text>

        <View style={styles.followRow}>
          <Text style={styles.followStat}><Text style={styles.followStatBold}>3</Text> Following</Text>
          <Text style={styles.followStat}><Text style={styles.followStatBold}>1</Text> Followers</Text>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}><Ionicons name="time-outline" size={14} color={theme.colors.textSubtle} /><Text style={styles.metaText}>No hold time</Text></View>
          <View style={styles.metaItem}><Ionicons name="flash-outline" size={14} color={theme.colors.textSubtle} /><Text style={styles.metaText}>0 trades</Text></View>
          <View style={styles.metaItem}><Ionicons name="calendar-outline" size={14} color={theme.colors.textSubtle} /><Text style={styles.metaText}>Joined Apr 2026</Text></View>
        </View>
      </View>

      <View style={styles.bodyArea}>
        <View style={styles.chartHeader}>
          <View>
            <Text style={styles.balance}>$0.00</Text>
            <Text style={styles.balanceSub}>--</Text>
          </View>
          <View style={styles.timeTabs}>
            <View style={styles.timePill}><Text style={styles.timePillText}>24h</Text></View>
            <Text style={styles.timeText}>7d</Text>
            <Text style={styles.timeText}>30d</Text>
            <Text style={styles.timeText}>All</Text>
          </View>
        </View>

        <View style={styles.chartPlaceholder}>
          <Text style={styles.noPositionsText}>No positions</Text>
        </View>

        <View style={styles.promoCard}>
          <View style={styles.promoLeft}>
            <Text style={styles.promoTitle}>Get your first token with Apple Pay</Text>
            <Text style={styles.promoSub}>$0 fee on your first purchase</Text>
            <Pressable><Text style={styles.promoCta}>Buy now →</Text></Pressable>
          </View>
          <View style={styles.promoAvatars}>
            {profilePromoAvatars.slice(0, 9).map((uri, idx) => (
              <Image key={`${uri}-${idx}`} source={{ uri }} style={[styles.promoAvatar, idx === 4 && styles.promoAvatarBig]} />
            ))}
          </View>
        </View>

        <Pressable style={styles.depositButton}><Text style={styles.depositText}>Deposit</Text></Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerArea: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 10,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  avatarWrap: {
    position: 'relative',
  },
  avatarBubble: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#FF8D53',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#1A1D34',
    fontFamily: fonts.heading,
    fontSize: 34,
  },
  editBadge: {
    position: 'absolute',
    right: -3,
    bottom: -3,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0D1022',
    borderWidth: 1,
    borderColor: 'rgba(117, 123, 161, 0.34)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  name: {
    color: theme.colors.textPrimary,
    fontFamily: fonts.headingSemi,
    fontSize: 28,
    lineHeight: 32,
  },
  handle: {
    color: theme.colors.textMuted,
    fontFamily: fonts.headingSemi,
    fontSize: 12,
    marginTop: -2,
  },
  bio: {
    color: theme.colors.accentBlue,
    fontFamily: fonts.headingSemi,
    fontSize: 11,
    marginTop: 6,
  },
  followRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  followStat: {
    color: theme.colors.textMuted,
    fontFamily: fonts.body,
    fontSize: 11,
  },
  followStatBold: {
    color: theme.colors.textPrimary,
    fontFamily: fonts.headingSemi,
  },
  metaRow: {
    marginTop: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    color: theme.colors.textSubtle,
    fontFamily: fonts.body,
    fontSize: 10,
  },
  bodyArea: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: 'rgba(117, 123, 161, 0.18)',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 102,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  balance: {
    color: theme.colors.textPrimary,
    fontFamily: fonts.headingSemi,
    fontSize: 36,
    lineHeight: 40,
  },
  balanceSub: {
    color: theme.colors.textMuted,
    fontFamily: fonts.body,
    fontSize: 12,
    marginTop: -2,
  },
  timeTabs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  timePill: {
    height: 24,
    borderRadius: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#161A2B',
    borderWidth: 1,
    borderColor: 'rgba(136, 142, 198, 0.42)',
  },
  timePillText: {
    color: theme.colors.textPrimary,
    fontFamily: fonts.headingSemi,
    fontSize: 10,
  },
  timeText: {
    color: theme.colors.textSubtle,
    fontFamily: fonts.headingSemi,
    fontSize: 10,
  },
  chartPlaceholder: {
    marginTop: 8,
    height: 144,
    borderRadius: 14,
    backgroundColor: '#050816',
    borderWidth: 1,
    borderColor: 'rgba(117, 123, 161, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noPositionsText: {
    color: theme.colors.textSubtle,
    fontFamily: fonts.body,
    fontSize: 12,
  },
  promoCard: {
    marginTop: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(117, 123, 161, 0.22)',
    backgroundColor: '#121527',
    minHeight: 126,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  promoLeft: {
    flex: 1,
    padding: 12,
  },
  promoTitle: {
    color: theme.colors.textPrimary,
    fontFamily: fonts.headingSemi,
    fontSize: 14,
    lineHeight: 18,
  },
  promoSub: {
    color: theme.colors.textMuted,
    fontFamily: fonts.body,
    fontSize: 11,
    marginTop: 5,
  },
  promoCta: {
    color: theme.colors.accentBlue,
    fontFamily: fonts.headingSemi,
    fontSize: 13,
    marginTop: 10,
  },
  promoAvatars: {
    width: 126,
    backgroundColor: '#2D3FA0',
    padding: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  promoAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginBottom: 4,
  },
  promoAvatarBig: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  depositButton: {
    marginTop: 12,
    height: 48,
    borderRadius: 12,
    backgroundColor: theme.colors.accentBlue,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3346C6',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  depositText: {
    color: theme.colors.textPrimary,
    fontFamily: fonts.headingSemi,
    fontSize: 15,
  },
});
