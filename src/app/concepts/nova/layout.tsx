import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nova-display",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-nova-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CryptoNova — Secure. Fast. Cross-chain.",
  description:
    "CryptoNova concept study: a trust-first crypto platform — simple onboarding, passive earning, cross-chain access and a calmer way into DeFi.",
  robots: { index: false, follow: false },
};

export default function NovaLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${display.variable} ${mono.variable} font-[family-name:var(--font-nova-display)]`}>
      {children}
    </div>
  );
}
