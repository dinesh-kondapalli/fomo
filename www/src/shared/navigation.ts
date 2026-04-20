export type AppTabKey = 'home' | 'search' | 'feed' | 'leaderboard' | 'profile';

export type CoinRouteParams = {
  slug: string;
  symbol?: string;
  name?: string;
  iconUrl?: string;
  price?: string;
  marketCap?: string;
  change?: string;
  positive?: string;
};
