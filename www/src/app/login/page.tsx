"use client";

import { LoginScreenView } from "@/shared/screens/login-screen";
import { useRouter } from "next/navigation";
import { MobileShell } from "@/components/app-shell";

export default function LoginPage() {
  const router = useRouter();

  return (
    <MobileShell withFrame>
      <LoginScreenView onAuthenticated={() => router.replace("/home")} />
    </MobileShell>
  );
}
