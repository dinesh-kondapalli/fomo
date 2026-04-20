"use client";

import { theme } from "@/constants/theme";
import type { ReactNode } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";

export function MobileShell({
  children,
  withFrame = false,
}: {
  children: ReactNode;
  withFrame?: boolean;
}) {
  const { width } = useWindowDimensions();
  const showFrame = withFrame && width >= 768;

  return (
    <View style={styles.page}>
      <View style={[styles.device, showFrame && styles.deviceFrame]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    minHeight: "100vh" as never,
    backgroundColor: "#02020A",
    justifyContent: "center",
    alignItems: "center",
  },
  device: {
    flex: 1,
    width: "100%",
    maxWidth: 430,
    backgroundColor: theme.colors.background,
    overflow: "hidden",
  },
  deviceFrame: {
    borderRadius: 36,
    borderWidth: 1,
    borderColor: "rgba(118, 123, 161, 0.22)",
    boxShadow: "0 20px 80px rgba(0, 0, 0, 0.45)" as never,
    minHeight: "100vh" as never,
  },
});
