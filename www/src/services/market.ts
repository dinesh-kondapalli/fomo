import { formatMarketCap, formatMoney, formatPct } from '../utils/format';

const API_BASE = 'https://api.coingecko.com/api/v3';
const PER_PAGE = 250;
const MAX_PAGES = 3;
const LIVE_CACHE_TTL_MS = 120_000;
const DETAILS_CACHE_TTL_MS = 30_000;
const RETRY_COUNT = 3;

type MarketItem = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  price_change_percentage_1h_in_currency?: number;
  sparkline_in_7d?: { price?: number[] };
};

type ChartPoint = [number, number];

export type LiveToken = {
  id: string;
  coinId: string;
  symbol: string;
  name: string;
  iconUrl: string;
  priceNumber: number;
  marketCapNumber: number;
  changePct24h: number;
  marketCap: string;
  price: string;
  change: string;
  positive: boolean;
};

export type CoinDetails = {
  id: string;
  coinId: string;
  symbol: string;
  name: string;
  iconUrl: string;
  priceNumber: number;
  price: string;
  marketCap: string;
  change1h: number;
  change1hLabel: string;
  positive: boolean;
  chart: number[];
};

export type ChartRangeDays = '1' | '7' | '30' | '180' | '365';

let liveCache: LiveToken[] | null = null;
let liveCacheAt = 0;
let liveInFlight: Promise<LiveToken[]> | null = null;
const detailsCache = new Map<string, { value: CoinDetails; at: number }>();
const liveTokenById = new Map<string, LiveToken>();
const liveTokenBySymbol = new Map<string, LiveToken>();

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson<T>(url: string): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < RETRY_COUNT; attempt += 1) {
    const res = await fetch(url);
    if (res.ok) return (await res.json()) as T;

    const canRetry = res.status === 429 || res.status >= 500;
    lastError = new Error(`Failed request ${res.status}: ${url}`);
    if (!canRetry || attempt === RETRY_COUNT - 1) throw lastError;
    await wait((attempt + 1) * 500);
  }

  throw lastError ?? new Error(`Failed request: ${url}`);
}

function normalizeSeries(values?: number[]) {
  if (!values?.length) return [];
  return values.filter((value) => Number.isFinite(value));
}

function takeLast(values: number[], count: number) {
  if (values.length <= count) return values;
  return values.slice(values.length - count);
}

function chartFromSparkline(values: number[], days: ChartRangeDays) {
  if (!values.length) return [];
  if (days === '1') return takeLast(values, 48);
  if (days === '7') return values;
  if (days === '30') return takeLast(values, 120);
  return [];
}

function syntheticChart(basePrice: number) {
  const base = Number.isFinite(basePrice) && basePrice > 0 ? basePrice : 1;
  return [base * 0.9995, base * 1.0002, base * 0.9998, base * 1.0004, base * 1.0];
}

export function getCachedLiveToken(coinId: string) {
  return liveTokenById.get(coinId.toLowerCase());
}

export function resolveCoinIdFromLiveQuery(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return null;
  const byId = liveTokenById.get(normalized);
  if (byId) return byId.coinId;
  const bySymbol = liveTokenBySymbol.get(normalized);
  if (bySymbol) return bySymbol.coinId;
  return null;
}

export async function fetchLiveTokens(): Promise<LiveToken[]> {
  const now = Date.now();
  if (liveCache && now - liveCacheAt < LIVE_CACHE_TTL_MS) {
    if (!liveTokenById.size) {
      for (const token of liveCache) {
        liveTokenById.set(token.coinId.toLowerCase(), token);
        liveTokenBySymbol.set(token.symbol.toLowerCase(), token);
      }
    }
    return liveCache;
  }

  if (liveInFlight) return liveInFlight;

  liveInFlight = (async () => {
    const tokens: LiveToken[] = [];

    for (let page = 1; page <= MAX_PAGES; page += 1) {
      const url = `${API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${PER_PAGE}&page=${page}&sparkline=false&price_change_percentage=24h&locale=en`;

      let data: MarketItem[] = [];
      try {
        data = await fetchJson<MarketItem[]>(url);
      } catch {
        if (tokens.length > 0) break;
        throw new Error('Unable to fetch live markets from CoinGecko');
      }

      if (!data.length) break;

      for (const item of data) {
        const change = Number.isFinite(item.price_change_percentage_24h) ? item.price_change_percentage_24h : 0;
        tokens.push({
          id: item.id,
          coinId: item.id,
          symbol: item.symbol.toUpperCase(),
          name: item.name,
          iconUrl: item.image,
          priceNumber: item.current_price,
          marketCapNumber: item.market_cap,
          changePct24h: change,
          marketCap: formatMarketCap(item.market_cap),
          price: formatMoney(item.current_price),
          change: formatPct(change),
          positive: change >= 0,
        });
      }

      if (data.length < PER_PAGE) break;
    }

    if (!tokens.length) throw new Error('No market rows returned from CoinGecko');

    liveCache = tokens;
    liveCacheAt = Date.now();
    liveTokenById.clear();
    liveTokenBySymbol.clear();
    for (const token of tokens) {
      liveTokenById.set(token.coinId.toLowerCase(), token);
      liveTokenBySymbol.set(token.symbol.toLowerCase(), token);
    }
    return tokens;
  })();

  try {
    return await liveInFlight;
  } finally {
    liveInFlight = null;
  }
}

export async function fetchCoinDetails(coinId: string, days: ChartRangeDays = '1'): Promise<CoinDetails> {
  const normalizedId = coinId.trim().toLowerCase();
  const cacheKey = `${normalizedId}:${days}`;
  const cached = detailsCache.get(cacheKey);
  if (cached && Date.now() - cached.at < DETAILS_CACHE_TTL_MS) return cached.value;

  const staleCached = detailsCache.get(cacheKey)?.value;
  const cachedLive = getCachedLiveToken(normalizedId);
  const marketUrl = `${API_BASE}/coins/markets?vs_currency=usd&ids=${encodeURIComponent(normalizedId)}&sparkline=true&price_change_percentage=1h,24h,7d`;
  const chartUrl = `${API_BASE}/coins/${encodeURIComponent(normalizedId)}/market_chart?vs_currency=usd&days=${days}`;

  try {
    const marketRows = await fetchJson<MarketItem[]>(marketUrl);
    const market = marketRows[0];
    if (!market) throw new Error(`No market data for ${normalizedId}`);

    const sparkline = normalizeSeries(market.sparkline_in_7d?.price);
    let chart = chartFromSparkline(sparkline, days);
    const shouldLoadChartEndpoint = days === '180' || days === '365' || (days === '30' && chart.length < 2) || chart.length < 2;

    if (shouldLoadChartEndpoint) {
      try {
        const chartData = await fetchJson<{ prices: ChartPoint[] }>(chartUrl);
        const endpointChart = chartData.prices.map((point) => point[1]).filter((value) => Number.isFinite(value));
        if (endpointChart.length >= 2) chart = endpointChart;
      } catch {
        if (chart.length < 2) chart = syntheticChart(market.current_price);
      }
    }

    const oneHourChange = typeof market.price_change_percentage_1h_in_currency === 'number' ? market.price_change_percentage_1h_in_currency : 0;
    const result: CoinDetails = {
      id: market.id,
      coinId: market.id,
      symbol: market.symbol.toUpperCase(),
      name: market.name,
      iconUrl: market.image,
      priceNumber: market.current_price,
      price: formatMoney(market.current_price),
      marketCap: formatMarketCap(market.market_cap).replace(' MC', ''),
      change1h: oneHourChange,
      change1hLabel: formatPct(oneHourChange),
      positive: oneHourChange >= 0,
      chart,
    };

    detailsCache.set(cacheKey, { value: result, at: Date.now() });
    return result;
  } catch {
    if (staleCached) return staleCached;
    if (cachedLive) {
      let chart = syntheticChart(cachedLive.priceNumber);
      try {
        const chartData = await fetchJson<{ prices: ChartPoint[] }>(chartUrl);
        const endpointChart = chartData.prices.map((point) => point[1]).filter((value) => Number.isFinite(value));
        if (endpointChart.length >= 2) chart = endpointChart;
      } catch {
        // keep synthetic fallback
      }

      const pct = Math.abs(cachedLive.changePct24h);
      const signed = cachedLive.positive ? pct : -pct;
      const fallbackResult: CoinDetails = {
        id: cachedLive.id,
        coinId: cachedLive.coinId,
        symbol: cachedLive.symbol,
        name: cachedLive.name,
        iconUrl: cachedLive.iconUrl,
        priceNumber: cachedLive.priceNumber,
        price: cachedLive.price,
        marketCap: cachedLive.marketCap.replace(' MC', ''),
        change1h: signed,
        change1hLabel: formatPct(signed),
        positive: cachedLive.positive,
        chart,
      };

      detailsCache.set(cacheKey, { value: fallbackResult, at: Date.now() });
      return fallbackResult;
    }

    throw new Error(`Unable to fetch coin details for ${normalizedId}`);
  }
}
