"use client";

import { CreateWalletScreenView } from "@/shared/screens/create-wallet-screen";
import { useRouter } from "next/navigation";
import { MobileShell } from "@/components/app-shell";

export default function CreateWalletPage() {
  const router = useRouter();

  return (
    <MobileShell withFrame>
      <CreateWalletScreenView onContinue={() => router.replace("/home")} />
    </MobileShell>
  );
}
