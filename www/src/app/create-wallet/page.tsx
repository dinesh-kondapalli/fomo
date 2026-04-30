"use client";

import { useRouter } from "next/navigation";
import { MobileShell } from "@/components/app-shell";
import { saveWallet } from "@/lib/wallet-store";
import { CreateWalletScreenView } from "@/shared/screens/create-wallet-screen";

export default function CreateWalletPage() {
  const router = useRouter();

  return (
    <MobileShell withFrame>
      <CreateWalletScreenView
        onContinue={(wallet) => {
          saveWallet(wallet);
          router.replace("/home");
        }}
      />
    </MobileShell>
  );
}
