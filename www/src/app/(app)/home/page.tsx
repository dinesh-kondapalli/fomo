"use client";

import { useRouter } from "next/navigation";
import { coinHref } from "@/lib/navigation";
import { HomeScreenView } from "@/shared/screens/home-screen";

export default function HomePage() {
  const router = useRouter();
  return (
    <HomeScreenView
      onOpenCoin={(params) => router.push(coinHref(params))}
      onCreateWallet={() => router.push("/create-wallet")}
    />
  );
}
