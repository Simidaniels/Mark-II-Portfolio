import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bike-display",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-bike-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NOVABIKE — Ride the Future of Urban Mobility",
  description:
    "NOVABIKE concept study: a fictional electric-mobility brand — Sky, Drift and Storm e-bikes with adaptive power, connected control and launch-batch pricing.",
  robots: { index: false, follow: false },
};

export default function BikeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${display.variable} ${mono.variable} font-[family-name:var(--font-bike-display)]`}>
      {children}
    </div>
  );
}
