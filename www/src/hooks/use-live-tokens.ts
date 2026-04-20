import { useCallback, useEffect, useMemo, useState } from 'react';

import type { Token } from '../constants/mockData';
import { tokens as fallbackTokens } from '../constants/mockData';
import { fetchLiveTokens } from '../services/market';

let sharedTokens: Token[] = [];
let sharedLoaded = false;
let sharedError: string | null = null;

export function useLiveTokens() {
  const [tokens, setTokens] = useState<Token[]>(sharedTokens);
  const [loading, setLoading] = useState(!sharedLoaded);
  const [error, setError] = useState<string | null>(sharedError);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const live = await fetchLiveTokens();
      const mapped: Token[] = live.map((item: Awaited<ReturnType<typeof fetchLiveTokens>>[number]) => ({
        id: item.id,
        symbol: item.symbol,
        name: item.name,
        marketCap: item.marketCap,
        price: item.price,
        change: item.change,
        positive: item.positive,
        iconUrl: item.iconUrl,
      }));
      sharedTokens = mapped;
      sharedLoaded = true;
      sharedError = null;
      setTokens(mapped);
      setError(null);
    } catch (err) {
      if (!sharedTokens.length) {
        sharedTokens = fallbackTokens;
      }
      sharedLoaded = true;
      sharedError = err instanceof Error ? err.message : 'Unable to load market data';
      setTokens(sharedTokens);
      setError(sharedError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const timer = setInterval(load, 60_000);
    return () => clearInterval(timer);
  }, [load]);

  const hasLiveData = useMemo(() => tokens.length > 0, [tokens.length]);

  return { tokens, loading, error, hasLiveData, reload: load };
}
