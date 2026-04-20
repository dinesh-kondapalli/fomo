import * as Clipboard from 'expo-clipboard';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { SearchRow } from '@/components/fomo-ui';
import { fonts, theme } from '@/constants/theme';
import { useLiveTokens } from '@/hooks/use-live-tokens';
import { SafeAreaView } from '../lib/safe-area';
import type { CoinRouteParams } from '../navigation';

export function SearchScreenView({ onOpenCoin }: { onOpenCoin: (params: CoinRouteParams) => void }) {
  const { tokens, loading, error } = useLiveTokens();
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();
  const filteredTokens = useMemo(() => !normalizedQuery ? [] : tokens.filter((item) => item.symbol.toLowerCase().includes(normalizedQuery) || (item.name ?? '').toLowerCase().includes(normalizedQuery) || item.id.toLowerCase().includes(normalizedQuery)), [normalizedQuery, tokens]);

  async function handlePaste() {
    const text = await Clipboard.getStringAsync();
    if (!text.trim()) {
      Alert.alert('Clipboard is empty');
      return;
    }
    setQuery(text.trim());
  }

  return <SafeAreaView style={styles.safe} edges={['top']}><View style={styles.content}><View style={styles.topRow}><Text style={styles.recents}>Search</Text>{normalizedQuery ? <Text style={styles.clear}>{filteredTokens.length} results</Text> : null}</View><View style={styles.searchBar}><Ionicons name="search" size={16} color={theme.colors.textSubtle} /><TextInput placeholder="Search coins, symbols, ids" placeholderTextColor={theme.colors.textSubtle} style={styles.input} value={query} onChangeText={setQuery} autoCapitalize="none" autoCorrect={false} returnKeyType="search" />{normalizedQuery ? <Pressable style={styles.clearPill} onPress={() => setQuery('')}><Ionicons name="close" size={14} color={theme.colors.textPrimary} /></Pressable> : null}<Pressable style={styles.pastePill} onPress={handlePaste}><Text style={styles.pasteText}>Paste</Text></Pressable></View>{loading && normalizedQuery ? <Text style={styles.infoText}>Loading market data...</Text> : null}{error && normalizedQuery ? <Text style={styles.infoText}>Showing latest available market data.</Text> : null}<FlatList style={styles.listWrap} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" data={filteredTokens} keyExtractor={(item) => item.id} initialNumToRender={20} maxToRenderPerBatch={20} windowSize={7} ListEmptyComponent={<View style={styles.emptyState}><Text style={styles.emptyTitle}>{normalizedQuery ? 'No matching coins' : 'Start searching'}</Text><Text style={styles.emptySub}>{normalizedQuery ? 'Try symbol, name, or coin id.' : 'Search by symbol, name, or coin id.'}</Text></View>} renderItem={({ item }) => <SearchRow symbol={item.symbol} marketCap={item.marketCap} price={item.price} change={item.change} positive={item.positive} icon={item.icon} iconUrl={item.iconUrl} tokenId={item.id} showClose={false} onPress={() => onOpenCoin({ slug: item.id, symbol: item.symbol, name: item.name ?? item.symbol, iconUrl: item.iconUrl ?? '', price: item.price, marketCap: item.marketCap, change: item.change, positive: item.positive ? '1' : '0' })} />} /></View></SafeAreaView>;
}

const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: theme.colors.background }, content: { flex: 1, paddingHorizontal: 16, paddingTop: 10 }, topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }, recents: { color: theme.colors.textPrimary, fontFamily: fonts.headingSemi, fontSize: 22 }, clear: { color: theme.colors.textSubtle, fontFamily: fonts.body, fontSize: 12 }, infoText: { color: theme.colors.textSubtle, fontFamily: fonts.body, fontSize: 11, marginTop: 8 }, listWrap: { marginTop: 10, flex: 1 }, listContent: { paddingBottom: 44, minHeight: 240 }, searchBar: { width: '92%', alignSelf: 'center', height: 48, borderRadius: 14, backgroundColor: '#171A2A', borderWidth: 1, borderColor: 'rgba(118, 124, 172, 0.25)', flexDirection: 'row', alignItems: 'center', paddingLeft: 12, paddingRight: 6 }, input: { flex: 1, color: theme.colors.textMuted, fontFamily: fonts.body, fontSize: 13, marginLeft: 8 }, clearPill: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#30334A', alignItems: 'center', justifyContent: 'center', marginRight: 6 }, pastePill: { width: 62, height: 32, borderRadius: 16, backgroundColor: '#3A3D51', alignItems: 'center', justifyContent: 'center' }, pasteText: { color: theme.colors.textPrimary, fontFamily: fonts.headingSemi, fontSize: 11 }, emptyState: { marginTop: 18, alignItems: 'center' }, emptyTitle: { color: theme.colors.textPrimary, fontFamily: fonts.headingSemi, fontSize: 14 }, emptySub: { marginTop: 6, color: theme.colors.textSubtle, fontFamily: fonts.body, fontSize: 11 } });
