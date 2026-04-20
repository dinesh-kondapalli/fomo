import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope, Sora } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope400 = Manrope({
  variable: "--font-manrope-400",
  subsets: ["latin"],
  weight: "400",
});

const manrope600 = Manrope({
  variable: "--font-manrope-600",
  subsets: ["latin"],
  weight: "600",
});

const sora600 = Sora({
  variable: "--font-sora-600",
  subsets: ["latin"],
  weight: "600",
});

const sora700 = Sora({
  variable: "--font-sora-700",
  subsets: ["latin"],
  weight: "700",
});

export const metadata: Metadata = {
  title: "fomo | The Social-First Crypto Trading Platform",
  description:
    "Download the new fomo App today and discover the only Social-First crypto trading platform for memecoins, altcoins and stablecoins. Never miss out again.",
  icons: {
    icon: "/apple-touch-icon.png",
    apple: "/apple-touch-icon.png",
    shortcut: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${manrope400.variable} ${manrope600.variable} ${sora600.variable} ${sora700.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
