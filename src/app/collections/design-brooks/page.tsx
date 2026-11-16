import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Globe, Lock, ShieldCheck, LayoutDashboard, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Design Brooks — Architecture Studio, Live",
  description:
    "Design Brooks: a production client product for an architectural studio — premium public website, session-authenticated admin console and token-gated client document portal. Live on Vercel.",
  alternates: { canonical: "/collections/design-brooks" },
};

export default function DesignBrooksPage() {
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

        {/* ── Header ─────────────────────────────────────────── */}
        <header className="mt-6 border-b border-line pb-10 lg:flex lg:items-end lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <p className="tech-label" style={{ color: "#f97316" }}>
              COLLECTION 02 — CLIENT WORK · ARCHITECTURE STUDIO
            </p>
            <h1 className="mt-4 font-display text-6xl font-bold uppercase leading-[0.88] tracking-tight text-bone sm:text-8xl">
              Design<br />
              <span style={{ color: "#f97316" }}>Brooks.</span>
            </h1>
            <p className="mt-6 leading-relaxed text-fog">
              Not a mockup — a shipped product. A premium public website, an
              admin console and a token-gated client document portal for a
              working architectural studio, built solo end-to-end and live in
              production.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="https://design-brooks.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-mono text-[0.66rem] font-bold uppercase tracking-[0.2em] text-black transition hover:brightness-110"
                style={{ background: "#f97316" }}
              >
                Visit live site
                <ExternalLink size={14} aria-hidden />
              </a>
              <Link
                href="/projects/design-brooks"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-bone transition-colors hover:border-accent hover:text-accent"
              >
                Case study
                <ArrowRight size={14} aria-hidden />
              </Link>
              <a
                href="https://github.com/Simidaniels/designBrooks"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-bone transition-colors hover:border-accent hover:text-accent"
              >
                Source
                <ArrowUpRight size={14} aria-hidden />
              </a>
            </div>
          </div>
          <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-line pt-6 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-10">
            {[["03", "connected surfaces"], ["01", "shared data model"], ["0", "third-party logins"]].map(([n, l]) => (
              <div key={l} className="text-center lg:text-left">
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-4xl font-bold text-bone sm:text-5xl">{n}</dd>
                <dd className="mt-1 font-mono text-[0.5rem] uppercase leading-snug tracking-[0.2em] text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </header>

        {/* ── Deliverable 01 — Public website ─────────────────── */}
        <section className="mt-14 grid items-stretch border border-line bg-graphite lg:grid-cols-12">
          <div className="relative min-h-56 lg:col-span-7 lg:min-h-96">
            <Image
              src="/images/design-brooks/house.jpg"
              alt="Design Brooks — Ikoyi Duplex House, modern residential architecture by the studio"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-[50%_22%]"
              priority
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0c0e13]/70 lg:bg-gradient-to-r lg:from-transparent lg:via-[#0c0e13]/10 lg:to-[#0c0e13]" />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-5">
            <p className="tech-label" style={{ color: "#f97316" }}>
              <Globe size={11} className="mr-1 inline -translate-y-px" aria-hidden />
              01 — Public Website
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight text-bone sm:text-5xl">
              The studio,<br />presented<br />properly.
            </h2>
            <p className="mt-4 text-[0.88rem] leading-relaxed text-fog">
              Editorial, photography-led studio presence — projects with deep-dives,
              services, insights, contact and consultation routing. SEO-complete,
              semantic, mobile-first. In production now.
            </p>
            <ul className="mt-5 space-y-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
              <li>→ / portfolio + project deep-dives</li>
              <li>→ / services + /insights</li>
              <li>→ /request-consultation inquiry flow</li>
            </ul>
            <a
              href="https://design-brooks.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-mono text-[0.64rem] font-bold uppercase tracking-[0.22em] transition"
              style={{ color: "#f97316" }}
            >
              design-brooks.vercel.app
              <ArrowUpRight size={14} aria-hidden />
            </a>
          </div>
        </section>

        {/* ── Deliverable 02 — Admin console ───────────────────── */}
        <section className="mt-6 grid items-stretch border border-line bg-graphite lg:grid-cols-12">
          <div className="order-last flex flex-col justify-center p-6 sm:p-10 lg:order-first lg:col-span-5">
            <p className="tech-label" style={{ color: "#f97316" }}>
              <LayoutDashboard size={11} className="mr-1 inline -translate-y-px" aria-hidden />
              02 — Admin Console
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight text-bone sm:text-5xl">
              The studio,<br />running<br />itself.
            </h2>
            <p className="mt-4 text-[0.88rem] leading-relaxed text-fog">
              Session-authenticated back-office for one principal: clients,
              projects, documents, access links, inquiries, activity log and
              settings — with server-enforced authorization on every action.
            </p>
            <ul className="mt-5 space-y-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
              <li>→ scrypt passwords · hashed session tokens</li>
              <li>→ clients / projects / documents CRUD</li>
              <li>→ cover image pipeline (EXIF → WebP)</li>
            </ul>
            <a
              href="https://design-brooks.vercel.app/admin/login"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-mono text-[0.64rem] font-bold uppercase tracking-[0.22em] transition"
              style={{ color: "#f97316" }}
            >
              /admin/login — sign-in required
              <ArrowUpRight size={14} aria-hidden />
            </a>
          </div>
          <div className="relative min-h-56 lg:col-span-7 lg:min-h-96">
            <Image
              src="/images/design-brooks/office.webp"
              alt="Design Brooks studio office with project model — the admin console's working context"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-[50%_35%]"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0c0e13]/10 to-[#0c0e13] lg:bg-gradient-to-l lg:from-transparent lg:via-[#0c0e13]/10 lg:to-[#0c0e13]" />
          </div>
        </section>

        {/* ── Deliverable 03 — Client document portal ──────────── */}
        <section className="mt-6 grid items-stretch border border-line bg-graphite lg:grid-cols-12">
          <div className="relative min-h-56 lg:col-span-7 lg:min-h-96">
            <Image
              src="/images/design-brooks/museum.jpg"
              alt="Children's Museum Renewal — cultural project delivered through the client portal"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-[50%_28%]"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0c0e13]/70 lg:bg-gradient-to-r lg:from-transparent lg:via-[#0c0e13]/10 lg:to-[#0c0e13]" />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-5">
            <p className="tech-label" style={{ color: "#f97316" }}>
              <Lock size={11} className="mr-1 inline -translate-y-px" aria-hidden />
              03 — Client Document Portal
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight text-bone sm:text-5xl">
              Drawings,<br />delivered.<br />Controlled.
            </h2>
            <p className="mt-4 text-[0.88rem] leading-relaxed text-fog">
              Token-gated private link per project — no client accounts, no
              passwords. Watermarked previews before payment, full pdf.js
              viewing and download after approval. Payment status never leaks:
              clients only ever see what they may access.
            </p>
            <ul className="mt-5 space-y-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
              <li>→ SHA-256-tokenised links, per-request validation</li>
              <li>→ RESTRICTED_PREVIEW · watermarked, no download</li>
              <li>→ FULL_ACCESS · viewer + authorized download route</li>
            </ul>
            <a
              href="https://design-brooks.vercel.app/client-access"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-mono text-[0.64rem] font-bold uppercase tracking-[0.22em] transition"
              style={{ color: "#f97316" }}
            >
              Client access portal
              <ArrowUpRight size={14} aria-hidden />
            </a>
          </div>
        </section>

        {/* ── Engineering strip ───────────────────────────────── */}
        <div className="mt-10 grid grid-cols-2 gap-4 border border-line p-6 sm:grid-cols-4 sm:p-8">
          {[
            ["Next.js 16", "App Router, RSC"],
            ["Prisma 6 + PG", "Neon pooled + direct"],
            ["Cloudflare R2", "Private object storage"],
            ["pdf-lib + sharp", "Server watermarking"],
          ].map(([a, b]) => (
            <div key={a}>
              <p className="font-mono text-[0.72rem] font-semibold text-bone">{a}</p>
              <p className="mt-1 font-mono text-[0.52rem] uppercase leading-snug tracking-[0.18em] text-muted">{b}</p>
            </div>
          ))}
        </div>

        {/* ── Footer note ─────────────────────────────────────── */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <p className="flex items-center gap-2 font-mono text-[0.55rem] uppercase leading-relaxed tracking-[0.22em] text-muted">
            <ShieldCheck size={13} style={{ color: "#f97316" }} aria-hidden />
            Real deployment · single principal · production since 2026
          </p>
          <Link
            href="/projects/design-brooks"
            className="inline-flex items-center gap-2 font-mono text-[0.6rem] font-bold uppercase tracking-[0.22em] text-bone transition-colors hover:text-accent"
          >
            <Users size={13} aria-hidden />
            Read the full engineering case study
            <ArrowRight size={13} aria-hidden />
          </Link>
        </div>
      </div>
    </main>
  );
}
