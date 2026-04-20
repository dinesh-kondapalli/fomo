"use client";

import { SplashScreenView } from "@/shared/screens/splash-screen";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { MobileShell } from "@/components/app-shell";

export default function Page() {
  const router = useRouter();
  // const handleCreateWalletFinish = useCallback(() => {
  //   router.replace("/create-wallet");
  // }, [router]);
  const handleFinish = useCallback(() => {
    router.replace("/home");
  }, [router]);

  return (
    <MobileShell withFrame>
      <SplashScreenView onFinish={handleFinish} />
    </MobileShell>
  );
}
