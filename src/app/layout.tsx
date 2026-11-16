import type { Metadata, Viewport } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/data/site";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Danny Adepitan — Software Developer | MARK II",
    template: "%s — Danny Adepitan · MARK II",
  },
  description:
    "MARK II — The Digital Laboratory. Daniel Adepitan is a software developer in Lagos, Nigeria building modern web applications, scalable products and thoughtful user experiences — from frontend interfaces to backend architecture.",
  keywords: [
    "Danny Adepitan",
    "Daniel Adepitan",
    "Software Developer",
    "Full-Stack Engineer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Lagos",
    "Nigeria",
    "Web Applications",
    "REST APIs",
  ],
  authors: [{ name: "Daniel Adepitan", url: site.url }],
  creator: "Daniel Adepitan",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: "MARK II — Danny Adepitan",
    title: "Danny Adepitan — Software Developer | MARK II",
    description:
      "I build digital experiences beyond the ordinary. Full-stack product engineering, from frontend interfaces to backend architecture.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Danny Adepitan — Software Developer | MARK II",
    description:
      "I build digital experiences beyond the ordinary. Full-stack product engineering, from frontend interfaces to backend architecture.",
  },
  robots: { index: true, follow: true },
  category: "portfolio",
};

export const viewport: Viewport = {
  themeColor: "#06070a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Daniel Adepitan",
  alternateName: "Danny",
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: "Software Developer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ikeja",
    addressRegion: "Lagos",
    addressCountry: "NG",
  },
  sameAs: ["https://github.com/Simidaniels"],
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Laravel",
    "PostgreSQL",
    "REST APIs",
    "Tailwind CSS",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body className="bg-void font-sans text-bone min-h-dvh antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-semibold focus:text-void"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScroll>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
