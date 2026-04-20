import Ionicons from '@expo/vector-icons/Ionicons';
import { useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Chip, TokenRow, TopTradeCard } from '../../components/fomo-ui';
import { topTrades } from '../../constants/mockData';
import { fonts, theme } from '../../constants/theme';
import { useLiveTokens } from '../../hooks/use-live-tokens';
import { SafeAreaView } from '../lib/safe-area';
import type { CoinRouteParams } from '../navigation';

export function HomeScreenView({ onOpenCoin }: { onOpenCoin: (params: CoinRouteParams) => void }) {
  const { tokens, loading, error } = useLiveTokens();
  const [activeMarketTab, setActiveMarketTab] = useState<'crypto' | 'trending' | 'mostHeld' | 'gainers'>('crypto');
  const [showDepositSheet, setShowDepositSheet] = useState(false);

  const sortedTokens = useMemo(() => {
    if (activeMarketTab === 'gainers') {
      return [...tokens].sort((a, b) => {
        const pa = Number.parseFloat(a.change.replace('%', ''));
        const pb = Number.parseFloat(b.change.replace('%', ''));
        return (Number.isFinite(pb) ? pb : 0) - (Number.isFinite(pa) ? pa : 0);
      });
    }

    if (activeMarketTab === 'trending') {
      return [...tokens].sort((a, b) => (a.symbol > b.symbol ? 1 : -1));
    }

    if (activeMarketTab === 'mostHeld') {
      return [...tokens].sort((a, b) => {
        const ma = Number.parseFloat(a.marketCap.replace(/[^0-9.]/g, ''));
        const mb = Number.parseFloat(b.marketCap.replace(/[^0-9.]/g, ''));
        return (Number.isFinite(mb) ? mb : 0) - (Number.isFinite(ma) ? ma : 0);
      });
    }

    return tokens;
  }, [activeMarketTab, tokens]);

  const header = (
    <>
      <View style={styles.headerRow}>
        <View style={styles.logoBubble}>
          <Text style={styles.logoText}>f</Text>
        </View>
      </View>

      <View style={styles.balanceRow}>
        <View>
          <Text style={styles.balance}>$0.00</Text>
          <Text style={styles.duration}>-- 24h</Text>
        </View>
        <Pressable style={styles.depositButton} onPress={() => setShowDepositSheet(true)}>
          <Text style={styles.depositText}>Deposit</Text>
        </Pressable>
      </View>

      <View style={styles.sectionHeader}>
        <Ionicons name="bulb-outline" size={14} color={theme.colors.textMuted} />
        <Text style={styles.sectionTitle}>Weekly Top Trades</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carousel}>
        {topTrades.map((trade) => (
          <TopTradeCard key={trade.id} name={trade.name} value={trade.value} avatar={trade.avatar} />
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
        <Chip label="☆" />
        <Pressable onPress={() => setActiveMarketTab('crypto')}><Chip label="Crypto" active={activeMarketTab === 'crypto'} /></Pressable>
        <Pressable onPress={() => setActiveMarketTab('trending')}><Chip label="Trending" active={activeMarketTab === 'trending'} /></Pressable>
        <Pressable onPress={() => setActiveMarketTab('mostHeld')}><Chip label="Most held" active={activeMarketTab === 'mostHeld'} /></Pressable>
        <Pressable onPress={() => setActiveMarketTab('gainers')}><Chip label="Gainers" active={activeMarketTab === 'gainers'} /></Pressable>
      </ScrollView>

      <View style={styles.promoBanner}>
        <Ionicons name="pricetag" size={13} color={theme.colors.accentBlue} />
        <Text style={styles.promoText}>Lowest fees on blue chip tokens, anywhere.</Text>
        <Ionicons name="information-circle-outline" size={15} color={theme.colors.textSubtle} />
      </View>

      {loading ? <Text style={styles.infoText}>Loading market data...</Text> : null}
      {error ? <Text style={styles.infoText}>Showing latest available market data.</Text> : null}
    </>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <FlatList
        data={sortedTokens}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={header}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        initialNumToRender={24}
        maxToRenderPerBatch={24}
        windowSize={9}
        renderItem={({ item }) => (
          <TokenRow
            token={item}
            onPress={() => {
              onOpenCoin({
                slug: item.id,
                symbol: item.symbol,
                name: item.name ?? item.symbol,
                iconUrl: item.iconUrl ?? '',
                price: item.price,
                marketCap: item.marketCap,
                change: item.change,
                positive: item.positive ? '1' : '0',
              });
            }}
          />
        )}
      />

      <Modal visible={showDepositSheet} transparent animationType="slide" onRequestClose={() => setShowDepositSheet(false)}>
        <View style={styles.sheetOverlay}>
          <Pressable style={styles.sheetBackdrop} onPress={() => setShowDepositSheet(false)} />
          <View style={styles.sheetContainer}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Deposit with</Text>

            <Pressable style={styles.sheetOption}>
              <View>
                <Text style={styles.sheetOptionTitle}>Crypto</Text>
                <Text style={styles.sheetOptionDesc}>Receive USDC from a crypto wallet</Text>
              </View>
              <Ionicons name="qr-code-outline" size={28} color={theme.colors.textPrimary} />
            </Pressable>

            <Pressable style={styles.sheetOption}>
              <View>
                <View style={styles.appleRow}>
                  <Text style={styles.sheetOptionTitle}>Apple Pay</Text>
                  <Text style={styles.newBadge}>New</Text>
                </View>
                <Text style={styles.sheetOptionDesc}>Buy PENGU, WIF, GIGA, and 20+ tokens</Text>
              </View>
              <Ionicons name="logo-apple" size={30} color={theme.colors.textPrimary} />
            </Pressable>

            <Pressable style={styles.sheetOption}>
              <View>
                <Text style={styles.sheetOptionTitle}>Debit</Text>
                <Text style={styles.sheetOptionDesc}>Deposit USDC with a debit card</Text>
              </View>
              <Ionicons name="card-outline" size={30} color={theme.colors.textPrimary} />
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 104,
  },
  headerRow: {
    marginTop: 6,
    marginBottom: 10,
  },
  logoBubble: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#DCE0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#24284A',
    fontFamily: fonts.heading,
    fontSize: 15,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  balance: {
    color: theme.colors.textPrimary,
    fontSize: 27,
    fontFamily: fonts.headingSemi,
  },
  duration: {
    marginTop: 1,
    color: theme.colors.textMuted,
    fontFamily: fonts.body,
    fontSize: 12,
  },
  depositButton: {
    width: 136,
    height: 44,
    borderRadius: 12,
    backgroundColor: theme.colors.accentBlue,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3442A8',
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  depositText: {
    color: theme.colors.textPrimary,
    fontFamily: fonts.headingSemi,
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  sectionTitle: {
    color: theme.colors.textPrimary,
    fontFamily: fonts.headingSemi,
    fontSize: 15,
  },
  carousel: {
    paddingBottom: 10,
  },
  chipsRow: {
    gap: 7,
    paddingBottom: 10,
  },
  promoBanner: {
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(118, 123, 161, 0.22)',
    backgroundColor: '#111424',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 10,
    marginBottom: 6,
  },
  promoText: {
    flex: 1,
    color: theme.colors.textMuted,
    fontFamily: fonts.body,
    fontSize: 11,
  },
  infoText: {
    color: theme.colors.textSubtle,
    fontFamily: fonts.body,
    fontSize: 11,
    marginBottom: 4,
  },
  sheetOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheetBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 7, 18, 0.55)',
  },
  sheetContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#07081B',
    borderTopWidth: 1,
    borderColor: 'rgba(130, 138, 190, 0.2)',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 26,
    gap: 12,
  },
  sheetHandle: {
    width: 62,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(164, 170, 208, 0.4)',
    alignSelf: 'center',
    marginBottom: 4,
  },
  sheetTitle: {
    color: theme.colors.textPrimary,
    fontFamily: fonts.headingSemi,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 4,
  },
  sheetOption: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(117, 123, 165, 0.2)',
    backgroundColor: '#131627',
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sheetOptionTitle: {
    color: theme.colors.textPrimary,
    fontFamily: fonts.headingSemi,
    fontSize: 15,
    marginBottom: 4,
  },
  sheetOptionDesc: {
    color: theme.colors.textMuted,
    fontFamily: fonts.body,
    fontSize: 11,
  },
  appleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  newBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 7,
    backgroundColor: theme.colors.accentBlue,
    color: theme.colors.textPrimary,
    fontFamily: fonts.headingSemi,
    fontSize: 10,
  },
});
