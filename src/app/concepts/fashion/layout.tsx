import type { Metadata } from "next";
import { Playfair_Display, IBM_Plex_Mono, Inter } from "next/font/google";

const serif = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-fashion-serif",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-fashion-mono",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-fashion-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nova Fashion — Signature Tailoring. Quiet Confidence.",
  description:
    "Nova Fashion concept study: a luxury editorial experience for a fictional SS26 collection — mood, typography and collection storytelling over product grids.",
  robots: { index: false, follow: false },
};

export default function FashionLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${serif.variable} ${mono.variable} ${body.variable} font-[family-name:var(--font-fashion-body)]`}>
      {children}
    </div>
  );
}
