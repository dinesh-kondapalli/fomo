export type Token = {
  id: string;
  symbol: string;
  name?: string;
  marketCap: string;
  price: string;
  change: string;
  positive: boolean;
  iconUrl?: string;
  icon?: string;
  badges?: string[];
};

export const topTrades = [
  { id: '1', name: 'INCOME', value: '+$542,214.34', avatar: '🧙' },
  { id: '2', name: 'fibs', value: '+$315,042.96', avatar: '🗿' },
  { id: '3', name: 'unc', value: '+$204,410.53', avatar: '😎' },
];

export const tokens: Token[] = [
  { id: 'btc', symbol: 'BTC', marketCap: '$1.4T MC', price: '$74,707.53', change: '0.47%', positive: false, icon: '₿' },
  { id: 'eth', symbol: 'ETH', marketCap: '$279.8B MC', price: '$2,320.33', change: '1.60%', positive: false, icon: '◆' },
  { id: 'xrp', symbol: 'XRP', marketCap: '$87.2B MC', price: '$1.43', change: '1.79%', positive: true, icon: '✕' },
  { id: 'bnb', symbol: 'BNB', marketCap: '$85.6B MC', price: '$628.28', change: '0.50%', positive: true, icon: '◈' },
  { id: 'sol', symbol: 'SOL', marketCap: '$42.7B MC', price: '$87.54', change: '2.50%', positive: true, icon: '≡', badges: ['🧙', '🧑‍🚀'] },
  { id: 'doge', symbol: 'DOGE', marketCap: '$13.8B MC', price: '$0.0969', change: '3.13%', positive: true, icon: 'Ð' },
];

export const feedPosts = [
  { id: 'pinned', user: 'fomo', age: '15h', pinned: true, type: 'Recap', title: 'Recap: April 15th, 2026', body: '$UNC maintains its center-stage on Crypto Twitter and among Solana-based memecoins...', reactions: '82' },
  { id: 'thesis', user: 'octoseaa', age: '1m', label: 'Thesis', body: 'Frog time', position: 'PEACE', value: '$16,883.67', pnl: '2.37%' },
  { id: 'buy', user: '0xCheffa', age: '2m', label: 'Buy', body: 'ASTEROID $4.7K at $6.9M MC' },
  { id: 'sell', user: '0xCheffa', age: '2m', label: 'Sell', body: 'unc $4.7K at $12.1M MC' },
  { id: 'gain', user: 'collectible', age: '2m', body: 'is ▲880.08%' },
];

export const leaderboard = [
  { id: '1', rank: '1', name: 'INCOME', handle: '@INCOME', gain: '+$145,635.60', avatars: ['🧙', '🐯', '🌙'], medal: '🥇' },
  { id: '2', rank: '2', name: 'Ily', handle: '@Ilyy', gain: '+$117,381.94', avatars: ['🐺', '🥚', '🪐'], medal: '🥈' },
  { id: '3', rank: '3', name: 'Zinc', handle: '@zinceth', gain: '+$71,692.97', avatars: ['😎', '🙏', '🪖'], medal: '🥉' },
  { id: '4', rank: '4', name: 'riskit', handle: '@riskit', gain: '+$53,237.25', avatars: ['🦉', '🐟', '🪙'] },
  { id: '5', rank: '5', name: 'iamfake', handle: '@0xiamfake', gain: '+$51,517.38', avatars: ['🙏', '🧑', '👻'] },
  { id: '6', rank: '6', name: 'iamh3nry', handle: '@iamh3nry', gain: '+$50,196.75', avatars: ['💎', '🧑'] },
  { id: '7', rank: '7', name: 'usernametaken', handle: '@usernametaken', gain: '+$46,433.59', avatars: ['🐺', '🧑‍🚀', '🌊'] },
  { id: '8', rank: '8', name: 'lil bro', handle: '@lilbro', gain: '+$43,013.59', avatars: ['🪙', '🐕'] },
  { id: '9', rank: '9', name: 'Hank', handle: '@Hankusun', gain: '+$38,189.91', avatars: ['🦇'] },
];

export const friendsPnL = [
  { id: 'f1', name: 'INCOME', handle: '@INCOME', avatarUrl: 'https://i.pravatar.cc/120?img=52', gain: '+$208,081.25', positive: true, tags: ['WIZ', 'SOL', 'MEME'], extra: '4+' },
  { id: 'f2', name: 'remus (rtrd/acc)', handle: '@remusofmars', avatarUrl: 'https://i.pravatar.cc/120?img=11', gain: '-$77,071.13', positive: false, tags: ['NFT', 'ETH', 'L2'], extra: '52+' },
  { id: 'f3', name: 'logjam', handle: '@_logjam', avatarUrl: 'https://i.pravatar.cc/120?img=33', gain: '-$120,298.81', positive: false, tags: ['NFT', 'ETH', 'APE'], extra: '9+' },
];

export const recommendedFriends = [
  { id: 'r1', name: 'Zinc', handle: '@zinceth', avatarUrl: 'https://i.pravatar.cc/120?img=66' },
  { id: 'r2', name: 'Brah', handle: '@unnattybrah', avatarUrl: 'https://i.pravatar.cc/120?img=45' },
  { id: 'r3', name: 'uncle dns', handle: '@DNS_ERR', avatarUrl: 'https://i.pravatar.cc/120?img=15' },
  { id: 'r4', name: 'fibs', handle: '@fibs', avatarUrl: 'https://i.pravatar.cc/120?img=17' },
  { id: 'r5', name: 'case', handle: '@number1eulerkol', avatarUrl: 'https://i.pravatar.cc/120?img=25' },
];

export const profilePromoAvatars = [
  'https://i.pravatar.cc/120?img=13',
  'https://i.pravatar.cc/120?img=14',
  'https://i.pravatar.cc/120?img=15',
  'https://i.pravatar.cc/120?img=16',
  'https://i.pravatar.cc/120?img=17',
  'https://i.pravatar.cc/120?img=18',
  'https://i.pravatar.cc/120?img=19',
  'https://i.pravatar.cc/120?img=20',
  'https://i.pravatar.cc/120?img=21',
];
