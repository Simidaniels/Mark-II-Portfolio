import type { Metadata } from "next";
import { Anton, Inter, IBM_Plex_Mono } from "next/font/google";

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-leap-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-leap-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-leap-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NOVALEAP — NV-X Phantom · Electric Hypercar",
  description:
    "NOVALEAP concept study: a fictional client-side hypercar showroom — NV-X Phantom, NV-R Spectra and NV-S Pulse with spec-led comparison and a reservation desk.",
  robots: { index: false, follow: false },
};

export default function LeapLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} font-[family-name:var(--font-leap-body)]`}>
      {children}
    </div>
  );
}
