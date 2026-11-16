"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { SuccessPanel } from "@/components/concepts/primitives";

const ROSE = "#c98f8f";
const BONE = "#ece7dd";
const BG = "#141010";
const PANEL = "#1a1517";

const CHAPTERS = [
  {
    n: "I",
    name: "Atelier Neutrals",
    mood: "Precision tailoring, soft structure, calm palette — elevated daywear that whispers.",
    swatches: ["#d8cfc2", "#a89a8a", "#6e6258", "#2e2824"],
    tag: "Daywear",
  },
  {
    n: "II",
    name: "Evening Noir",
    mood: "Dark textures and sculpted silhouettes, developed for campaign contrast.",
    swatches: ["#171114", "#33262b", "#5b464d", "#c98f8f"],
    tag: "Evening",
  },
  {
    n: "III",
    name: "Soft Atelier",
    mood: "Muted tones, feminine detail, clean composition for modern seasonal edits.",
    swatches: ["#e8dcd0", "#c9b4a6", "#96796b", "#40312b"],
    tag: "Resort",
  },
] as const;

const JOURNAL = [
  { date: "Mar 2026", title: "Shaping a more elevated colour story", tag: "Colour" },
  { date: "Feb 2026", title: "Designing digital editorials for collection launches", tag: "Craft" },
  { date: "Jan 2026", title: "Why quieter palettes read more premium than louder ones", tag: "Direction" },
] as const;

export default function NovaFashionPage() {
  const [menu, setMenu] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const active = CHAPTERS[chapter];

  return (
    <main style={{ background: BG, color: BONE }} className="min-h-dvh">
      {/* ── TOP BAR ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#141010]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5">
          <a href="#top" className="font-[family-name:var(--font-fashion-mono)] text-[0.72rem] font-medium uppercase tracking-[0.42em] text-white">
            Nova<span style={{ color: ROSE }}> Fashion</span>
          </a>
          <nav aria-label="Sections" className="hidden items-center gap-8 font-[family-name:var(--font-fashion-mono)] text-[0.58rem] uppercase tracking-[0.3em] text-white/50 md:flex">
            {[["Collections", "#collections"], ["Editorial", "#editorial"], ["Journal", "#journal"]].map(([l, h]) => (
              <a key={h} href={h} className="transition hover:text-white">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#lookbook" className="hidden rounded-full border px-5 py-2 font-[family-name:var(--font-fashion-mono)] text-[0.55rem] uppercase tracking-[0.28em] transition sm:block" style={{ borderColor: `${ROSE}88`, color: ROSE }}>
              Book Styling
            </a>
            <button onClick={() => setMenu((v) => !v)} aria-label="Toggle menu" aria-expanded={menu} className="rounded-md border border-white/10 p-2 text-white/70 md:hidden">
              {menu ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {menu && (
          <div className="border-t border-white/5 px-5 py-4 md:hidden">
            {[["Collections", "#collections"], ["Editorial", "#editorial"], ["Journal", "#journal"], ["Book Styling", "#lookbook"]].map(([l, h]) => (
              <a key={h} href={h} onClick={() => setMenu(false)} className="block border-b border-white/5 py-3 font-[family-name:var(--font-fashion-mono)] text-xs uppercase tracking-[0.3em] text-white/70">{l}</a>
            ))}
          </div>
        )}
      </header>

      {/* ── COVER ────────────────────────────────────────────── */}
      <section id="top" className="relative overflow-hidden border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(75% 60% at 85% 15%, rgba(201,143,143,0.10) 0%, transparent 60%)` }} />
        <div className="mx-auto max-w-7xl px-5 pb-28 pt-12 lg:pb-32 lg:pt-16">
          <div className="flex items-center justify-between font-[family-name:var(--font-fashion-mono)] text-[0.52rem] uppercase tracking-[0.34em] text-white/35">
            <span>Issue 01 — Spring / Summer 2026</span>
            <span className="hidden sm:inline">Est. MMXXVI</span>
          </div>

          <h1 className="mt-8 font-[family-name:var(--font-fashion-serif)] leading-[0.98] text-white">
            <span className="block text-[clamp(2.7rem,9.4vw,6.6rem)] font-semibold">Signature</span>
            <span className="block text-[clamp(2.7rem,9.4vw,6.6rem)]"><em style={{ color: ROSE }}>tailoring.</em></span>
            <span className="block text-[clamp(2.7rem,9.4vw,6.6rem)] font-semibold">Quiet confidence<span style={{ color: ROSE }}>.</span></span>
          </h1>

          <div className="mt-10 flex flex-col justify-between gap-8 border-t border-white/10 pt-8 md:flex-row md:items-end">
            <p className="max-w-sm text-[0.92rem] leading-relaxed text-white/55">
              A luxury-ready concept for designer labels, capsule launches and editorial
              retail — mood first, merchandise second, restraint always.
            </p>
            <div className="flex items-center gap-8">
              <a href="#collections" className="group inline-flex items-center gap-2 border-b pb-1 font-[family-name:var(--font-fashion-mono)] text-[0.6rem] uppercase tracking-[0.34em]" style={{ borderColor: ROSE, color: BONE }}>
                View collection <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" aria-hidden />
              </a>
              <p aria-hidden className="hidden font-[family-name:var(--font-fashion-mono)] text-[0.52rem] uppercase leading-relaxed tracking-[0.28em] text-white/25 md:block">
                12 curated<br />looks · SS26
              </p>
            </div>
          </div>
        </div>

        {/* Cover index strip */}
        <div className="border-t border-white/8">
          <ol className="mx-auto flex max-w-7xl divide-x divide-white/8 px-0">
            {CHAPTERS.map((c, i) => (
              <li key={c.name} className="flex-1">
                <button onClick={() => setChapter(i)} aria-pressed={chapter === i} className="flex h-full w-full flex-col gap-1 px-4 py-4 text-left transition-colors sm:px-6" style={{ background: chapter === i ? "rgba(201,143,143,0.08)" : "transparent" }}>
                  <span className="font-[family-name:var(--font-fashion-mono)] text-[0.5rem] uppercase tracking-[0.3em]" style={{ color: chapter === i ? ROSE : "rgba(255,255,255,0.3)" }}>Chapter {c.n}</span>
                  <span className="font-[family-name:var(--font-fashion-serif)] text-xs italic text-white/80 sm:text-sm">{c.name}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── COLLECTIONS ───────────────────────────────────────── */}
      <section id="collections" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-[family-name:var(--font-fashion-serif)] text-4xl italic text-white sm:text-6xl">Chapters<span style={{ color: ROSE }}>, not categories.</span></h2>
            <p className="hidden font-[family-name:var(--font-fashion-mono)] text-[0.52rem] uppercase leading-relaxed tracking-[0.28em] text-white/30 md:block">Tap a chapter<br />to preview</p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/8 md:grid-cols-12" style={{ background: "rgba(255,255,255,0.06)" }}>
            {/* Swatch plate */}
            <div className="relative flex min-h-72 flex-col justify-between overflow-hidden p-7 md:col-span-5" style={{ background: `linear-gradient(160deg, ${active.swatches[1]} 0%, ${active.swatches[0]} 55%, ${active.swatches[2]} 130%)` }}>
              <p className="font-[family-name:var(--font-fashion-mono)] text-[0.55rem] uppercase tracking-[0.32em] text-black/50">Chapter {active.n} — {active.tag}</p>
              <div>
                <p aria-hidden className="select-none font-[family-name:var(--font-fashion-serif)] font-bold leading-[0.8] text-black/15" style={{ fontSize: "clamp(6rem, 22vw, 11rem)" }}>{active.n}</p>
                <div className="mt-4 flex gap-2">
                  {active.swatches.map((s) => (
                    <span key={s} className="size-6 rounded-full border border-black/20" style={{ background: s }} aria-hidden />
                  ))}
                </div>
              </div>
            </div>
            {/* Chapter copy */}
            <div className="flex flex-col justify-between p-7 sm:p-10 md:col-span-7" style={{ background: PANEL }}>
              <div>
                <h3 className="font-[family-name:var(--font-fashion-serif)] text-4xl text-white sm:text-6xl">{active.name}</h3>
                <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-white/60">{active.mood}</p>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-6">
                <p className="font-[family-name:var(--font-fashion-mono)] text-[0.52rem] uppercase tracking-[0.3em] text-white/35">SS26 · 12 looks · Limited run of 300</p>
                <a href="#lookbook" className="group inline-flex items-center gap-2 font-[family-name:var(--font-fashion-mono)] text-[0.6rem] uppercase tracking-[0.3em] transition" style={{ color: ROSE }}>
                  Request access <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL ─────────────────────────────────────────── */}
      <section id="editorial" className="border-t border-white/5 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-[family-name:var(--font-fashion-mono)] text-[0.55rem] uppercase tracking-[0.34em]" style={{ color: ROSE }}>Editorial Direction</p>
            <blockquote className="mt-6 font-[family-name:var(--font-fashion-serif)] text-[clamp(1.9rem,4.6vw,3.4rem)] leading-[1.08] text-white">
              “Mood before merchandise. <em style={{ color: ROSE }}>Atmosphere</em> before inventory.”
            </blockquote>
            <p className="mt-6 max-w-md text-[0.92rem] leading-relaxed text-white/55">
              Nova Fashion treats every collection as a story with a beginning and a hush —
              campaign imagery, journal cadence and retail rhythm all serving one emotional register.
            </p>
          </div>
          <ol className="lg:col-span-5">
            {[
              ["01", "Luxury layouts", "Large-format spacing, refined type, controlled visual rhythm."],
              ["02", "Collection storytelling", "Every drop gets a mood, a pace and a named identity."],
              ["03", "Retail clarity", "Editorial presentation without sacrificing shopping intent."],
            ].map(([n, t, d]) => (
              <li key={n} className="flex items-start gap-5 border-b border-white/8 py-5 first:pt-0 last:border-b-0">
                <span className="font-[family-name:var(--font-fashion-mono)] text-xs" style={{ color: ROSE }}>{n}</span>
                <span>
                  <h3 className="font-semibold text-white">{t}</h3>
                  <p className="mt-1 text-[0.82rem] leading-relaxed text-white/50">{d}</p>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Highlights strip */}
        <div className="mx-auto mt-14 grid max-w-7xl grid-cols-3 divide-x divide-white/8 border-y border-white/8 px-0 text-center">
          {[["12", "curated campaign looks"], ["03", "editorial directions"], ["SS26", "seasonal launch positioning"]].map(([n, l]) => (
            <div key={l as string} className="py-6">
              <p className="font-[family-name:var(--font-fashion-serif)] text-3xl text-white sm:text-5xl">{n}</p>
              <p className="mt-1.5 px-2 font-[family-name:var(--font-fashion-mono)] text-[0.5rem] uppercase leading-snug tracking-[0.24em] text-white/35">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── JOURNAL ───────────────────────────────────────────── */}
      <section id="journal" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5">
          <p className="font-[family-name:var(--font-fashion-mono)] text-[0.55rem] uppercase tracking-[0.34em]" style={{ color: ROSE }}>Journal</p>
          <h2 className="mt-3 font-[family-name:var(--font-fashion-serif)] text-4xl italic text-white sm:text-6xl">Notes from<br />the studio.</h2>
          <ul className="mt-10 divide-y divide-white/8 border-t border-white/8">
            {JOURNAL.map((j) => (
              <li key={j.title}>
                <a href="#lookbook" className="group flex items-baseline justify-between gap-6 py-6 transition-colors hover:bg-white/[0.02]">
                  <span className="flex items-baseline gap-5">
                    <span className="w-14 shrink-0 font-[family-name:var(--font-fashion-mono)] text-[0.55rem] uppercase tracking-[0.2em] text-white/30">{j.date}</span>
                    <span className="font-[family-name:var(--font-fashion-serif)] text-lg text-white/85 transition-colors group-hover:text-white sm:text-2xl">{j.title}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2 font-[family-name:var(--font-fashion-mono)] text-[0.52rem] uppercase tracking-[0.25em] text-white/30 transition-colors group-hover:text-rose-200">
                    {j.tag} <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── LOOKBOOK CAPTURE ──────────────────────────────────── */}
      <section id="lookbook" className="border-t border-white/5 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-[family-name:var(--font-fashion-mono)] text-[0.55rem] uppercase tracking-[0.34em]" style={{ color: ROSE }}>SS26 Lookbook</p>
            <h2 className="mt-4 font-[family-name:var(--font-fashion-serif)] text-4xl italic leading-[1.02] text-white sm:text-6xl">First look,<br />before the world.</h2>
            <p className="mt-5 max-w-sm text-[0.92rem] leading-relaxed text-white/55">Leave your email for the SS26 lookbook, private previews and the occasional studio note. Nothing else.</p>
          </div>
          {done ? (
            <SuccessPanel title="Welcome to the studio." body="The SS26 lookbook will land in your inbox first. Until then — silence, silhouette, tailoring." accent={ROSE} onReset={() => { setDone(false); setEmail(""); }} />
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) setDone(true); }} className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <label htmlFor="lookbook-email" className="sr-only">Email address</label>
              <input
                id="lookbook-email"
                type="email"
                required
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-white/15 bg-transparent px-6 py-4 text-sm text-white placeholder:text-white/25 focus:border-[#c98f8f] focus:outline-none lg:max-w-xs"
              />
              <button type="submit" className="shrink-0 rounded-full border px-7 py-4 font-[family-name:var(--font-fashion-mono)] text-[0.6rem] uppercase tracking-[0.3em] transition hover:bg-[#c98f8f] hover:text-black" style={{ borderColor: ROSE, color: ROSE }}>
                Request
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="relative overflow-hidden border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 pb-4 pt-6 font-[family-name:var(--font-fashion-mono)] text-[0.55rem] uppercase tracking-[0.3em] text-white/30 sm:flex-row">
          <p>© 2026 Nova Fashion — Concept study. Fictional house.</p>
          <p><span style={{ color: ROSE }}>styling@novafashion.co</span> · Via <a href="https://github.com/Simidaniels" className="underline-offset-4 hover:underline">Simidaniels</a></p>
        </div>
        <p aria-hidden className="select-none whitespace-nowrap text-center font-[family-name:var(--font-fashion-serif)] font-bold italic leading-[0.8] text-white/[0.04]" style={{ fontSize: "clamp(3.4rem, 15.5vw, 10rem)" }}>Nova Fashion</p>
      </footer>
    </main>
  );
}
