"use client";

import { HomeScreenView } from "@root/shared/screens/home-screen";
import { useRouter } from "next/navigation";
import { coinHref } from "@/lib/navigation";

export default function HomePage() {
  const router = useRouter();
  return (
    <HomeScreenView onOpenCoin={(params) => router.push(coinHref(params))} />
  );
}
