import Ionicons from '@expo/vector-icons/Ionicons';
import type { ImageSourcePropType } from 'react-native';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { getCoinBySlugOrSymbol } from '../constants/crypto';
import type { Token } from '../constants/mockData';
import { fonts, theme } from '../constants/theme';

function resolveCryptoIcon(id?: string, symbol?: string, iconUrl?: string): ImageSourcePropType | undefined {
  if (iconUrl) {
    return { uri: iconUrl };
  }
  return undefined;
}

export function Chip({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <View style={[styles.chip, active && styles.chipActive]}>
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </View>
  );
}

export function TopTradeCard({ name, value, avatar }: { name: string; value: string; avatar: string }) {
  return (
    <View style={styles.tradeCard}>
      <View style={styles.tradeTop}>
        <View style={styles.tradeAvatar}><Text style={styles.tradeAvatarText}>{avatar}</Text></View>
        <Text style={styles.tradeName}>{name}</Text>
      </View>
      <Text style={styles.tradeValue}>{value}</Text>
    </View>
  );
}

export function PriceDelta({ value, positive }: { value: string; positive: boolean }) {
  return <Text style={[styles.delta, positive ? styles.deltaPos : styles.deltaNeg]}>{positive ? '▲ ' : '▼ '}{value}</Text>;
}

export function TokenRow({ token, onPress }: { token: Token; onPress?: () => void }) {
  const iconSource = resolveCryptoIcon(token.id, token.symbol, token.iconUrl);
  const isVerified = Boolean(getCoinBySlugOrSymbol(token.id) ?? getCoinBySlugOrSymbol(token.symbol));

  return (
    <Pressable disabled={!onPress} onPress={onPress} style={styles.tokenRow}>
      <View style={styles.tokenLeft}>
        <View style={styles.tokenIcon}>
          {iconSource ? <Image source={iconSource} style={styles.tokenImage} resizeMode="contain" /> : <Text style={styles.tokenIconText}>{token.icon ?? token.symbol.slice(0, 1)}</Text>}
        </View>
        <View>
          <Text style={styles.tokenSymbol}>{token.symbol}</Text>
          <View style={styles.subline}>
            <Text style={styles.tokenCap}>{token.marketCap}</Text>
            {isVerified ? <Ionicons name="checkmark-circle" size={14} color={theme.colors.accentBlue} /> : null}
            {token.badges ? <View style={styles.badges}>{token.badges.map((badge) => <View style={styles.badgeBubble} key={`${token.id}-${badge}`}><Text style={styles.badgeText}>{badge}</Text></View>)}</View> : null}
          </View>
        </View>
      </View>
      <View style={styles.tokenRight}>
        <Text style={styles.price}>{token.price}</Text>
        <PriceDelta value={token.change} positive={token.positive} />
      </View>
    </Pressable>
  );
}

export function SearchRow({ symbol, marketCap, price, change, positive, icon, tokenId, iconUrl, onPress, showClose = true }: { symbol: string; marketCap: string; price: string; change: string; positive: boolean; icon?: string; tokenId?: string; iconUrl?: string; onPress?: () => void; showClose?: boolean; }) {
  const iconSource = resolveCryptoIcon(tokenId, symbol, iconUrl);
  const isVerified = Boolean(getCoinBySlugOrSymbol(tokenId) ?? getCoinBySlugOrSymbol(symbol));

  return (
    <Pressable disabled={!onPress} onPress={onPress} style={styles.searchRow}>
      <View style={styles.searchMain}>
        <View style={[styles.tokenLeft, styles.searchLeft]}>
          <View style={styles.tokenIcon}>
            {iconSource ? <Image source={iconSource} style={styles.tokenImage} resizeMode="contain" /> : <Text style={styles.tokenIconText}>{icon ?? symbol.slice(0, 1)}</Text>}
          </View>
          <View>
            <Text style={styles.tokenSymbol}>{symbol}</Text>
            <View style={styles.subline}>
              <Text style={styles.tokenCap}>{marketCap}</Text>
              {isVerified ? <Ionicons name="checkmark-circle" size={14} color={theme.colors.accentBlue} /> : null}
            </View>
          </View>
        </View>
        <View style={[styles.tokenRight, styles.searchRight]}>
          <Text style={styles.price}>{price}</Text>
          <PriceDelta value={change} positive={positive} />
        </View>
      </View>
      {showClose ? <Ionicons name="close" size={18} color={theme.colors.textSubtle} style={styles.closeIcon} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: { borderRadius: 14, borderWidth: 1, borderColor: theme.colors.border, backgroundColor: '#0E1020', height: 36, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center' },
  chipActive: { backgroundColor: '#161A2B', borderColor: 'rgba(136, 142, 198, 0.42)' },
  chipText: { color: theme.colors.textMuted, fontFamily: fonts.body, fontSize: 13 },
  chipTextActive: { color: theme.colors.textPrimary },
  tradeCard: { width: 194, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(111, 118, 163, 0.2)', backgroundColor: '#101221', overflow: 'hidden', marginRight: 10 },
  tradeTop: { paddingHorizontal: 12, paddingTop: 10, paddingBottom: 8, flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#171A2A' },
  tradeAvatar: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#26305A', alignItems: 'center', justifyContent: 'center' },
  tradeAvatarText: { fontSize: 12 },
  tradeName: { color: theme.colors.textPrimary, fontFamily: fonts.body, fontSize: 14 },
  tradeValue: { color: theme.colors.profit, fontFamily: fonts.headingSemi, fontSize: 14, paddingHorizontal: 12, paddingVertical: 10 },
  delta: { fontSize: 12, fontFamily: fonts.body },
  deltaPos: { color: theme.colors.profit },
  deltaNeg: { color: theme.colors.loss },
  tokenRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
  tokenLeft: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  tokenRight: { alignItems: 'flex-end', gap: 3 },
  tokenIcon: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#0F1020', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(117, 122, 163, 0.22)' },
  tokenIconText: { color: theme.colors.textPrimary, fontSize: 20, fontFamily: fonts.heading },
  tokenImage: { width: 34, height: 34, borderRadius: 17 },
  tokenSymbol: { color: theme.colors.textPrimary, fontSize: 16, fontFamily: fonts.headingSemi, marginBottom: 1 },
  subline: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  tokenCap: { color: theme.colors.textMuted, fontFamily: fonts.body, fontSize: 11 },
  price: { color: theme.colors.textPrimary, fontSize: 15, fontFamily: fonts.headingSemi },
  badges: { flexDirection: 'row', marginLeft: 5 },
  badgeBubble: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#1B1F35', borderWidth: 1, borderColor: '#2B2F47', alignItems: 'center', justifyContent: 'center', marginLeft: -5 },
  badgeText: { fontSize: 9 },
  searchRow: { paddingVertical: 10, flexDirection: 'row', alignItems: 'center' },
  searchMain: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  searchLeft: { flex: 1, minWidth: 0 },
  searchRight: { minWidth: 98 },
  closeIcon: { marginLeft: 10 },
});
