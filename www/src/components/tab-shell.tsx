"use client";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { BlurView } from "expo-blur";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import type { ViewStyle } from "react-native";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { theme } from "@/constants/theme";
import type { AppTabKey } from "@/shared/navigation";

const iconColor = theme.colors.textMuted;
const activeColor = theme.colors.textPrimary;

const tabToPath: Record<AppTabKey, string> = {
  home: "/home",
  search: "/search",
  feed: "/feed",
  leaderboard: "/leaderboard",
  profile: "/profile",
};

function getActiveTab(pathname: string): AppTabKey {
  if (pathname.startsWith("/search")) return "search";
  if (pathname.startsWith("/feed")) return "feed";
  if (pathname.startsWith("/leaderboard")) return "leaderboard";
  if (pathname.startsWith("/profile")) return "profile";
  return "home";
}

function TabIcon({ tab, focused }: { tab: AppTabKey; focused: boolean }) {
  if (tab === "home") {
    return (
      <Ionicons
        name={focused ? "home" : "home-outline"}
        size={24}
        color={focused ? activeColor : iconColor}
      />
    );
  }
  if (tab === "search") {
    return (
      <Ionicons
        name={focused ? "search" : "search-outline"}
        size={24}
        color={focused ? activeColor : iconColor}
      />
    );
  }
  if (tab === "feed") {
    return (
      <MaterialCommunityIcons
        name="infinity"
        size={26}
        color={focused ? activeColor : iconColor}
      />
    );
  }
  if (tab === "leaderboard") {
    return (
      <Ionicons
        name={focused ? "people" : "people-outline"}
        size={24}
        color={focused ? activeColor : iconColor}
      />
    );
  }
  return (
    <View style={[styles.profileIcon, focused && styles.profileIconActive]}>
      <FontAwesome6 name="infinity" size={14} color="#11162E" />
    </View>
  );
}

export function TabShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = getActiveTab(pathname);
  const webTabBarStyle: ViewStyle | null =
    Platform.OS === "web"
      ? ({
          position: "fixed",
          left: 0,
          right: 0,
          width: "calc(100% - 36px)",
          maxWidth: 394,
          marginLeft: "auto",
          marginRight: "auto",
          zIndex: 1000,
          elevation: 1000,
        } as unknown as ViewStyle)
      : null;

  return (
    <View style={styles.screen}>
      <View style={styles.content}>{children}</View>
      <View style={[styles.tabBar, webTabBarStyle]}>
        <View style={StyleSheet.absoluteFillObject}>
          <BlurView intensity={30} tint="dark" style={styles.blurFill} />
          <View style={styles.glassTint} />
        </View>
        {(["home", "search", "feed", "leaderboard", "profile"] as const).map(
          (tab) => {
            const focused = activeTab === tab;
            return (
              <Pressable
                key={tab}
                style={styles.tabItem}
                onPress={() => router.push(tabToPath[tab])}
              >
                <View
                  style={[
                    styles.iconWrap,
                    focused && tab !== "profile" && styles.iconWrapActive,
                  ]}
                >
                  <TabIcon tab={tab} focused={focused} />
                </View>
              </Pressable>
            );
          },
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  content: { flex: 1 },
  tabBar: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 42,
    height: 62,
    paddingHorizontal: 8,
    borderTopWidth: 0,
    borderWidth: 1,
    borderColor: "rgba(180, 185, 205, 0.2)",
    borderRadius: 31,
    backgroundColor: "rgba(8, 10, 18, 0.08)",
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 1000,
    elevation: 1000,
  },
  blurFill: { ...StyleSheet.absoluteFillObject },
  glassTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(12, 14, 22, 0.2)",
  },
  tabItem: { flex: 1, alignItems: "center", justifyContent: "center" },
  iconWrap: {
    width: 46,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  iconWrapActive: {
    backgroundColor: "rgba(210, 214, 229, 0.14)",
    borderWidth: 1,
    borderColor: "rgba(216, 220, 238, 0.22)",
  },
  profileIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#F38A4B",
    alignItems: "center",
    justifyContent: "center",
  },
  profileIconActive: {
    borderWidth: 1,
    borderColor: "rgba(218, 223, 241, 0.22)",
    backgroundColor: "#F59359",
  },
});
