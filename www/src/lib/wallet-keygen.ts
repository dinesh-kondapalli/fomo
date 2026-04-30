import {
  Bip39,
  EnglishMnemonic,
  Random,
  ripemd160,
  Secp256k1,
  Slip10,
  Slip10Curve,
  sha256,
  stringToPath,
} from "@cosmjs/crypto";
import { toBech32 } from "@cosmjs/encoding";

import { bwickChain } from "./bwick-chain";

export type GeneratedWallet = {
  address: string;
  mnemonic: string;
  pubkey: Uint8Array;
  privkey: Uint8Array;
};

function walletFromMnemonic(mnemonic: string) {
  return Bip39.mnemonicToSeed(new EnglishMnemonic(mnemonic)).then((seed) => {
    const { privkey } = Slip10.derivePath(
      Slip10Curve.Secp256k1,
      seed,
      stringToPath(bwickChain.hdPath),
    );
    const keypair = Secp256k1.makeKeypair(privkey);
    const pubkey = Secp256k1.compressPubkey(keypair.pubkey);
    const address = toBech32(
      bwickChain.bech32Prefix,
      ripemd160(sha256(pubkey)),
    );
    return { address, mnemonic, pubkey, privkey };
  });
}

export function generateWallet(): Promise<GeneratedWallet> {
  const mnemonic = Bip39.encode(Random.getBytes(32)).toString();
  return walletFromMnemonic(mnemonic);
}

export function restoreWallet(mnemonic: string): Promise<GeneratedWallet> {
  return walletFromMnemonic(mnemonic.trim());
}
