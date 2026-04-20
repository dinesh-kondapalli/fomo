import type { NextConfig } from "next";

const { DefinePlugin } = require("webpack");

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: [
    "react-native",
    "react-native-web",
    "react-native-safe-area-context",
    "react-native-svg",
    "expo",
    "expo-blur",
    "expo-clipboard",
    "expo-linear-gradient",
    "expo-modules-core",
    "@expo/vector-icons",
  ],
  experimental: {
    externalDir: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "react-native$": "react-native-web",
      "@": "/home/arman/Code/fomo/www/src",
      "@root": "/home/arman/Code/fomo",
    };

    config.resolve.extensions = [
      ".web.ts",
      ".web.tsx",
      ".web.js",
      ".web.jsx",
      ...(config.resolve.extensions ?? []),
    ];

    config.module.rules.push({
      test: /\.(ttf|otf)$/i,
      type: "asset/resource",
    });

    config.plugins.push(
      new DefinePlugin({
        __DEV__: JSON.stringify(process.env.NODE_ENV !== "production"),
      }),
    );

    return config;
  },
};

export default nextConfig;
