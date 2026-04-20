"use client";

import { SplashScreenView } from "@root/shared/screens/splash-screen";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { MobileShell } from "@/components/app-shell";

export default function Page() {
  const router = useRouter();
  const handleFinish = useCallback(() => {
    router.replace("/login");
  }, [router]);

  return (
    <MobileShell withFrame>
      <SplashScreenView onFinish={handleFinish} />
    </MobileShell>
  );
}
