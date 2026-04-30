import { fromBech32 } from '@cosmjs/encoding';

export const bwickChain = {
  chainId: 'bwick-1',
  chainName: 'BWICK Chain',
  rpc: 'http://174.138.87.223:26657',
  rest: 'http://174.138.87.223:1317',
  relayerApi: 'http://174.138.87.223:3080',
  bip44: { coinType: 118 },
  hdPath: "m/44'/118'/0'/0/0",
  bech32Prefix: 'bwick',
  bech32Config: {
    accountAddr: 'bwick',
    accountPub: 'bwickpub',
    validatorAddr: 'bwickvaloper',
    validatorPub: 'bwickvaloperpub',
    consensusAddr: 'bwickvalcons',
    consensusPub: 'bwickvalconspub',
  },
  currencies: [
    {
      coinDenom: 'BWICK',
      coinMinimalDenom: 'ubwick',
      coinDecimals: 6,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: 'BWICK',
      coinMinimalDenom: 'ubwick',
      coinDecimals: 6,
    },
  ],
  stakeCurrency: {
    coinDenom: 'BWICK',
    coinMinimalDenom: 'ubwick',
    coinDecimals: 6,
  },
  bridge: {
    solanaProgram: '5JCGZsiucAUkAK2sh1bbiz1EsorWs1cBdUat7yjQRNW8',
    testMint: '6urDAWfh1MpZzy1MCPxKmRsECagAiAuuPAXqb6Hcpump',
    finalMint: 'D367UTH5iaRdvR8MXLKuYdCa73yQt3Jx9xPiYPUypump',
    solanaRpc: 'https://api.mainnet-beta.solana.com',
  },
  contracts: {
    amm: 'bwick1wug8sewp6cedgkmrmvhl3lf3tulagm9hnvy8p0rppz9yjw0g4wtql49ren',
    launchpad: 'bwick1qg5ega6dykkxc307y25pecuufrjkxkaggkkxh7nad0vhyhtuhw3sg09vt0',
  },
} as const;

type NodeInfoResponse = {
  default_node_info?: {
    network?: string;
  };
};
type BalancesResponse = { balances?: Array<{ denom: string; amount: string }> };

export async function getBwickChainStatus() {
  const response = await fetch(`${bwickChain.rest}/cosmos/base/tendermint/v1beta1/node_info`);
  if (!response.ok) {
    throw new Error(`BWICK REST failed with ${response.status}`);
  }

  const data = (await response.json()) as NodeInfoResponse;
  return {
    connected: true,
    chainId: data.default_node_info?.network ?? bwickChain.chainId,
  };
}

export function isValidBwickAddress(address: string) {
  try {
    const decoded = fromBech32(address);
    return decoded.prefix === bwickChain.bech32Prefix && decoded.data.length === 20;
  } catch {
    return false;
  }
}

export function formatUbwick(amount: string) {
  const raw = BigInt(amount || '0');
  const decimals = BigInt(1_000_000);
  const whole = raw / decimals;
  const fraction = raw % decimals;
  const fractionLabel = fraction.toString().padStart(6, '0').replace(/0+$/, '');
  return `${whole.toString()}${fractionLabel ? `.${fractionLabel}` : ''} BWICK`;
}

export async function getBwickBalance(address: string) {
  if (!isValidBwickAddress(address)) {
    throw new Error('Invalid BWICK wallet address. Create a new wallet.');
  }

  const response = await fetch(`${bwickChain.rest}/cosmos/bank/v1beta1/balances/${address}`);
  if (response.status === 404) {
    return { amount: '0', display: '0 BWICK' };
  }
  if (!response.ok) {
    throw new Error(`BWICK balance failed with ${response.status}`);
  }

  const data = (await response.json()) as BalancesResponse;
  const ubwick = data.balances?.find((balance) => balance.denom === bwickChain.currencies[0].coinMinimalDenom);
  return {
    amount: ubwick?.amount ?? '0',
    display: formatUbwick(ubwick?.amount ?? '0'),
  };
}
