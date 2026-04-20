"use client";

import type { ReactNode } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

const initialMetrics = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, right: 0, bottom: 0, left: 0 },
};

export function Providers({ children }: { children: ReactNode }) {
  return <SafeAreaProvider initialMetrics={initialMetrics}>{children}</SafeAreaProvider>;
}
