import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Nova Core — The NOVA Family",
  description:
    "The complete NOVA product family: CryptoNova, Nova Store, Nova Leap — plus Nova Sport, Nova Fashion and Nova Finance. Six engineered concept systems by Danny Adepitan.",
  alternates: { canonical: "/collections/nova-core" },
};

const FEATURED = ["nova-crypto", "nova-bike", "novaleap"];

function Cover({
  src,
  alt,
  accent,
  large = false,
}: {
  src?: string;
  alt: string;
  accent: string;
  large?: boolean;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={large ? "(max-width: 1024px) 100vw, 55vw" : "(max-width: 1024px) 100vw, 33vw"}
        className="object-cover object-[50%_18%]"
      />
    );
  }
  return (
    <div aria-hidden className="blueprint-grid absolute inset-0 bg-void">
      <svg viewBox="0 0 300 300" className="absolute inset-0 m-auto h-2/3 w-auto" fill="none">
        <polygon
          points="150,42 246,98 246,208 150,264 54,208 54,98"
          stroke={accent}
          strokeOpacity="0.7"
          strokeWidth="2"
          fill="#10131a"
        />
        <circle cx="150" cy="152" r="26" fill={accent} fillOpacity="0.9" />
      </svg>
    </div>
  );
}

export default function NovaCorePage() {
  const all = projects.filter((p) => p.slug !== "design-brooks");
  const featured = FEATURED.map((slug) => all.find((p) => p.slug === slug)!).filter(Boolean);
  const library = all.filter((p) => !FEATURED.includes(p.slug));

  return (
    <main className="min-h-dvh bg-void pb-24 pt-24 sm:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.24em] text-fog transition-colors hover:text-accent"
        >
          <ArrowLeft size={15} aria-hidden />
          Back to gallery
        </Link>

        <header className="mt-6 border-b border-line pb-10">
          <p className="tech-label" style={{ color: "#7dd3fc" }}>COLLECTION 01 — THE NOVA FAMILY</p>
          <h1 className="mt-4 font-display text-6xl font-bold uppercase leading-[0.9] tracking-tight text-bone sm:text-8xl">
            Nova<br />
            <span style={{ color: "#7dd3fc" }}>Core</span>.
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed text-fog">
            Six concept systems, engineered end-to-end — each a complete fictional
            brand built to prove a discipline: fintech, sports, mobility, fashion,
            automotive and private banking.
          </p>
          <p className="tech-label mt-6 text-muted">FEATURED 03 · LIBRARY 03 · ALL SOLO BUILDS · 2025–2026</p>
        </header>

        {/* ── FEATURED ─────────────────────────────────────── */}
        <p className="tech-label mt-12"><span className="text-accent">01</span> — Featured</p>
        <div className="mt-4 space-y-4">
          {featured.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group grid overflow-hidden border border-line bg-graphite transition-colors duration-400 hover:border-white/15 lg:grid-cols-12"
              aria-label={`${p.name} — open case study`}
            >
              <div className="relative h-44 overflow-hidden lg:col-span-7 lg:h-56">
                <Cover src={p.image} alt={p.name} accent={p.accent} large />
                {p.slug === "novaleap" && (
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 font-mono text-[0.52rem] uppercase tracking-[0.24em] text-[#a78bfa] backdrop-blur-sm">
                    <Sparkles size={11} aria-hidden /> Animated
                  </span>
                )}
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-5">
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.26em] text-muted">
                  {p.index} · {p.category.replace("Concept Study — ", "")} · {p.year}
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold uppercase leading-[0.92] tracking-tight text-bone transition-colors duration-300 group-hover:text-accent sm:text-5xl">
                  {p.name}
                </h2>
                <p className="mt-3 text-[0.85rem] leading-relaxed text-fog">{p.tagline}</p>
                <p className="mt-5 inline-flex items-center gap-2 font-mono text-[0.6rem] font-bold uppercase tracking-[0.22em] text-accent">
                  Case study
                  <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden />
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* ── LIBRARY ───────────────────────────────────────── */}
        <p className="tech-label mt-14"><span className="text-accent">02</span> — Library</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {library.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group overflow-hidden border border-line bg-graphite transition-colors duration-400 hover:border-white/15"
              aria-label={`${p.name} — open case study`}
            >
              <div className="relative h-40 overflow-hidden">
                <Cover src={p.image} alt={p.name} accent={p.accent} />
              </div>
              <div className="p-5">
                <p className="font-mono text-[0.52rem] uppercase tracking-[0.24em] text-muted">{p.index} · {p.year}</p>
                <h3 className="mt-1.5 font-display text-xl font-bold uppercase leading-tight text-bone transition-colors duration-300 group-hover:text-accent">
                  {p.name}
                </h3>
                <p className="mt-2 text-[0.78rem] leading-snug text-fog">{p.tagline}</p>
                <p className="mt-4 inline-flex items-center gap-2 font-mono text-[0.58rem] font-bold uppercase tracking-[0.2em] text-accent">
                  Case study
                  <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden />
                </p>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-12 border-t border-line pt-6 font-mono text-[0.58rem] uppercase leading-relaxed tracking-[0.24em] text-muted">
          Concept studies — fictional brands, real engineering · each links to a full case study · designed & built by Danny Adepitan
        </p>
      </div>
    </main>
  );
}
