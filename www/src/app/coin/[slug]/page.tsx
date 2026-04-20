"use client";

import type { CoinRouteParams } from "@/shared/navigation";
import { CoinScreenView } from "@/shared/screens/coin-screen";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { MobileShell } from "@/components/app-shell";

export default function CoinPage() {
  const router = useRouter();
  const routeParams = useParams<{ slug: string }>();
  const searchParams = useSearchParams();

  const params: CoinRouteParams = {
    slug: routeParams.slug,
    symbol: searchParams.get("symbol") ?? undefined,
    name: searchParams.get("name") ?? undefined,
    iconUrl: searchParams.get("iconUrl") ?? undefined,
    price: searchParams.get("price") ?? undefined,
    marketCap: searchParams.get("marketCap") ?? undefined,
    change: searchParams.get("change") ?? undefined,
    positive: searchParams.get("positive") ?? undefined,
  };

  return (
    <MobileShell withFrame>
      <CoinScreenView params={params} onBack={() => router.back()} />
    </MobileShell>
  );
}
