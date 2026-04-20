import type { CoinRouteParams } from "@/shared/navigation";

export function coinHref(params: CoinRouteParams) {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (key === "slug" || value == null || value === "") continue;
    search.set(key, value);
  }

  const query = search.toString();
  return query
    ? `/coin/${encodeURIComponent(params.slug)}?${query}`
    : `/coin/${encodeURIComponent(params.slug)}`;
}
