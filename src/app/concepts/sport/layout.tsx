import type { Metadata } from "next";
import { Anton, Inter, IBM_Plex_Mono } from "next/font/google";

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sport-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sport-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sport-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NOVASPORT — Basketball Performance Club · Lagos",
  description:
    "NOVASPORT concept study: elite basketball coaching, athlete development and membership programs in Victoria Island, Lagos — skill sessions, performance blocks and community runs.",
  robots: { index: false, follow: false },
};

export default function SportLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} font-[family-name:var(--font-sport-body)]`}>
      {children}
    </div>
  );
}
