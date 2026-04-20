"use client";

import { SearchScreenView } from "@root/shared/screens/search-screen";
import { useRouter } from "next/navigation";
import { coinHref } from "@/lib/navigation";

export default function SearchPage() {
  const router = useRouter();
  return (
    <SearchScreenView onOpenCoin={(params) => router.push(coinHref(params))} />
  );
}
