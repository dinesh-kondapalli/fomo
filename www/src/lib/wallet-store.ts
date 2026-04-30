import type { GeneratedWallet } from "./wallet-keygen";

const walletKey = "fomo.bwick.wallet";

export type StoredWallet = Pick<GeneratedWallet, "address" | "mnemonic">;

export function saveWallet(wallet: StoredWallet) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(walletKey, JSON.stringify(wallet));
}

export function getStoredWallet(): StoredWallet | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(walletKey);
  if (!value) return null;

  try {
    const wallet = JSON.parse(value) as Partial<StoredWallet>;
    if (
      typeof wallet.address === "string" &&
      typeof wallet.mnemonic === "string"
    ) {
      return { address: wallet.address, mnemonic: wallet.mnemonic };
    }
  } catch {
    window.localStorage.removeItem(walletKey);
  }

  return null;
}

export function clearStoredWallet() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(walletKey);
}
