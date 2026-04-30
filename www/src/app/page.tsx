"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { MobileShell } from "@/components/app-shell";
import { SplashScreenView } from "@/shared/screens/splash-screen";

export default function Page() {
  const router = useRouter();
  const handleFinish = useCallback(() => {
    router.replace("/create-wallet");
  }, [router]);

  return (
    <MobileShell withFrame>
      <SplashScreenView onFinish={handleFinish} />
    </MobileShell>
  );
}
