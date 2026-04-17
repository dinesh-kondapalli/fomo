import { useCallback, useEffect, useState } from 'react';

import { fetchCoinDetails, type ChartRangeDays, type CoinDetails } from '@/services/market';

type State = {
  details: CoinDetails | null;
  loading: boolean;
  error: string | null;
};

const detailsStateByKey = new Map<string, State>();

export function useCoinDetails(coinId: string, days: ChartRangeDays) {
  const key = `${coinId.toLowerCase()}:${days}`;
  const [state, setState] = useState<State>({
    details: detailsStateByKey.get(key)?.details ?? null,
    loading: !detailsStateByKey.has(key),
    error: detailsStateByKey.get(key)?.error ?? null,
  });

  const load = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const details = await fetchCoinDetails(coinId, days);
      const nextState: State = { details, loading: false, error: null };
      detailsStateByKey.set(key, nextState);
      setState(nextState);
    } catch (err) {
      setState((prev) => {
        const nextState: State = {
          details: prev.details,
          loading: false,
          error: err instanceof Error ? err.message : 'Unable to load coin data',
        };
        detailsStateByKey.set(key, nextState);
        return nextState;
      });
    }
  }, [coinId, days, key]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    details: state.details,
    loading: state.loading,
    error: state.error,
    reload: load,
  };
}
