import type { Metadata } from "next";
import { Playfair_Display, IBM_Plex_Mono, Inter } from "next/font/google";

const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-finance-serif",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-finance-mono",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-finance-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nova Finance — Wealth, Made Legible",
  description:
    "Nova Finance concept study: a fictional private-banking experience — wealth dashboard, portfolio allocation, card controls and client reporting for high-trust clients.",
  robots: { index: false, follow: false },
};

export default function FinanceLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${serif.variable} ${mono.variable} ${body.variable} font-[family-name:var(--font-finance-body)]`}>
      {children}
    </div>
  );
}
