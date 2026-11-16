"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  ChevronRight,
  Globe2,
  Layers,
  Menu,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import {
  ConceptModal,
  Field,
  SubmitButton,
  SuccessPanel,
  useSubmitState,
} from "@/components/concepts/primitives";

const MINT = "#34e0a1";
const BG = "#050b12";
const PANEL = "#0a1420";

/* ── Chart datasets (fictional Nova performance) ─────────────── */
const RANGES = {
  "1W": "M0 78 L40 70 L80 74 L120 58 L160 62 L200 44 L240 38 L280 26 L320 18",
  "1M": "M0 84 L40 82 L80 66 L120 70 L160 54 L200 48 L240 50 L280 30 L320 14",
  "1Y": "M0 90 L40 88 L80 80 L120 84 L160 68 L200 56 L240 60 L280 34 L320 8",
} as const;

const TICKER = [
  ["BTC", "$97,412", "+2.4%", true],
  ["ETH", "$4,208", "+3.1%", true],
  ["SOL", "$214.60", "-0.8%", false],
  ["NOVA", "$3.60", "+5.2%", true],
  ["BNB", "$692.10", "+1.1%", true],
  ["ARB", "$1.94", "-1.3%", false],
] as const;

const FEATURE_TABS = [
  {
    id: "onboarding",
    label: "Smart Onboarding",
    title: "From signup to holding in minutes.",
    copy: "Fund your wallet, verify once and land straight in buying — no jargon, no fourteen-step KYC maze, no hostage interfaces.",
    points: ["Guided wallet creation with recovery-phrase coaching", "Fiat on-ramp with transparent, disclosed fees", "Progressive security — start small, unlock more"],
    tag: "01 — Onboarding",
  },
  {
    id: "earning",
    label: "Passive Earning",
    title: "Put idle assets to work.",
    copy: "Curated staking and yield routes with the risks and returns shown before you commit — never after.",
    points: ["Staking routes with net APY shown up front", "Auto-compounding positions, withdraw anytime", "Risk-tiered strategies: conservative to balanced"],
    tag: "02 — Earning",
  },
  {
    id: "ecosystem",
    label: "Ecosystem Access",
    title: "Every chain you need, one dashboard.",
    copy: "Swap, bridge and track across networks without the tab explosion. One balance view, honest routing, clear fees.",
    points: ["Cross-chain swaps with MEV-aware routing", "Portfolio insights that explain, not just chart", "DeFi actions: liquidity, staking and LSD management"],
    tag: "03 — Ecosystem",
  },
] as const;

const ECOSYSTEM = [
  { icon: ShieldCheck, title: "Privacy-first wallet", copy: "Keys stay on-device. Recovery is layered, modern and actually understandable." },
  { icon: Globe2, title: "Cross-chain access", copy: "One dashboard for L1s and L2s — bridges abstracted, fees disclosed." },
  { icon: TrendingUp, title: "Portfolio insights", copy: "Net changes, allocation drift and yield performance, explained in plain language." },
  { icon: Zap, title: "Yield discovery", copy: "Curated staking routes with historical APY, lock terms and smart-contract audit status." },
  { icon: Layers, title: "DeFi tooling", copy: "Swaps, liquidity and liquid staking — power tools wrapped in humane UI." },
  { icon: Wallet, title: "Self-custody", copy: "You hold the keys. CryptoNova never custodies user assets — by design." },
] as const;

const NEWS = [
  { image: "/images/concepts/nova/card-news.webp", alt: "CryptoNova x Nova.AI mainnet announcement", kicker: "Announcement", title: "CryptoNova × Nova.AI — mainnet rollout enters final phase", meta: "Engineering notes" },
  { image: "/images/concepts/nova/globe.webp", alt: "CryptoNova global network coverage", kicker: "Network", title: "Cross-chain routing expands to 40+ networks and L2s", meta: "Ecosystem update" },
  { image: "/images/concepts/nova/news.webp", alt: "CryptoNova news coverage", kicker: "In the press", title: "The exchange built for humans, not degens", meta: "Market coverage" },
] as const;

export default function CryptoNovaPage() {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<keyof typeof RANGES>("1W");
  const [tab, setTab] = useState<(typeof FEATURE_TABS)[number]["id"]>("onboarding");
  const [stake, setStake] = useState("2500");
  const [menu, setMenu] = useState(false);
  const [newsletter, setNewsletter] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  const { state, submit, reset } = useSubmitState();
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = window.setTimeout(tick, 0);
    const t = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(t);
    };
  }, []);

  const activeFeature = FEATURE_TABS.find((f) => f.id === tab)!;
  const stakeAmount = Number.parseFloat(stake.replaceAll(",", "")) || 0;
  const apy = 0.086;
  const yearly = stakeAmount * apy;
  const monthly = yearly / 12;

  const chartPath = RANGES[range];
  const chartArea = `${chartPath} L320 96 L0 96 Z`;

  return (
    <main style={{ background: BG }} className="min-h-dvh text-[#e8edf3]">
      {/* ── NAV ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#050b12]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <a href="#top" className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="flex size-8 items-center justify-center rounded-lg"
              style={{ background: `linear-gradient(135deg, ${MINT}, #0e9f6e)` }}
            >
              <Globe2 size={17} className="text-black" strokeWidth={2.2} />
            </span>
            <span className="text-[0.95rem] font-bold tracking-[0.14em] text-white">
              CRYPTO<span style={{ color: MINT }}>NOVA</span>
            </span>
          </a>
          <nav aria-label="Section" className="hidden items-center gap-7 text-[0.72rem] font-medium tracking-wide text-white/55 md:flex">
            {[["Features", "#features"], ["Ecosystem", "#ecosystem"], ["Metrics", "#metrics"], ["News", "#news"]].map(([label, href]) => (
              <a key={href} href={href} className="transition-colors hover:text-white">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(true)}
              className="hidden rounded-lg px-4 py-2 text-[0.72rem] font-semibold text-white/70 transition hover:text-white sm:block"
            >
              Sign in
            </button>
            <button
              onClick={() => setOpen(true)}
              className="rounded-lg px-4 py-2 text-[0.72rem] font-bold text-black transition hover:brightness-110"
              style={{ background: MINT }}
            >
              Launch App
            </button>
            <button onClick={() => setMenu((v) => !v)} aria-label="Toggle menu" aria-expanded={menu} className="rounded-lg border border-white/10 p-2 text-white/70 md:hidden">
              {menu ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {menu && (
          <div className="border-t border-white/5 bg-[#050b12] px-5 py-4 md:hidden">
            {[["Features", "#features"], ["Ecosystem", "#ecosystem"], ["Metrics", "#metrics"], ["News", "#news"]].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenu(false)} className="block border-b border-white/5 py-3 text-sm text-white/75">
                {label}
              </a>
            ))}
          </div>
        )}
        {/* Ticker */}
        <div className="overflow-hidden border-t border-white/5 py-1.5 font-[family-name:var(--font-nova-mono)] text-[0.62rem]">
          <div className="flex w-max animate-[ticker_28s_linear_infinite] gap-8 whitespace-nowrap px-4">
            {[...TICKER, ...TICKER].map(([s, p, d, up], i) => (
              <span key={i} className="flex items-center gap-2 text-white/55">
                <span className="text-white/85">{s}</span> {p}{" "}
                <span style={{ color: up ? MINT : "#ff6b6b" }} className="flex items-center">
                  {up ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                  {d}
                </span>
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section id="top" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(70% 60% at 50% -10%, rgba(52,224,161,0.13) 0%, transparent 60%)` }}
        />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-14 pt-12 lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-16">
          <div className="lg:col-span-6">
            <p
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-[family-name:var(--font-nova-mono)] text-[0.58rem] uppercase tracking-[0.22em]"
              style={{ borderColor: "rgba(52,224,161,0.35)", color: MINT, background: "rgba(52,224,161,0.06)" }}
            >
              <Sparkles size={11} aria-hidden /> Nova.AI × CryptoNova — Mainnet rollout
            </p>
            <h1 className="mt-5 text-[clamp(2.6rem,8.2vw,4.2rem)] font-bold uppercase leading-[0.95] tracking-tight text-white">
              Secure. Fast.
              <br />
              <span style={{ color: MINT }}>Cross-chain.</span>
            </h1>
            <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-white/60">
              CryptoNova is a modern platform for onboarding into crypto —
              buy, stake, swap and track across chains from one calm,
              transparent interface.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setOpen(true)}
                className="group inline-flex items-center gap-2 rounded-xl px-6 py-4 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-black transition hover:brightness-110"
                style={{ background: MINT, boxShadow: `0 0 44px -10px rgba(52,224,161,0.45)` }}
              >
                Start free
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
              </button>
              <a href="#features" className="rounded-xl border border-white/15 px-6 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-white/80 transition hover:border-white/35 hover:text-white">
                Explore features
              </a>
            </div>
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/8 pt-5 font-[family-name:var(--font-nova-mono)]">
              {[["120+", "assets tracked"], ["24/7", "network access"], ["0", "custodial risk"]].map(([n, l]) => (
                <div key={l as string}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="text-xl font-semibold text-white">{n}</dd>
                  <dd className="text-[0.52rem] uppercase tracking-[0.2em] text-white/35">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Portfolio card */}
          <div className="relative lg:col-span-6">
            <div
              className="relative mx-auto max-w-md rounded-2xl border p-5 shadow-2xl"
              style={{ background: PANEL, borderColor: "rgba(255,255,255,0.08)", boxShadow: "0 40px 80px -30px rgba(0,0,0,0.8)" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-md" style={{ background: "rgba(52,224,161,0.15)", color: MINT }}>
                    <TrendingUp size={14} aria-hidden />
                  </span>
                  <p className="text-sm font-semibold text-white">Nova Portfolio</p>
                </div>
                <span className="font-[family-name:var(--font-nova-mono)] text-[0.52rem] uppercase tracking-[0.2em] text-white/35">Live · {now ? now.toLocaleTimeString("en-GB") : ""} UTC</span>
              </div>

              <p className="mt-5 font-[family-name:var(--font-nova-mono)] text-3xl font-semibold text-white">$24,380.12</p>
              <p className="mt-1 flex items-center gap-2 text-[0.72rem] text-white/50">
                <span style={{ color: MINT }} className="flex items-center gap-1 font-semibold">
                  <ArrowUpRight size={12} aria-hidden /> +$2,146 (7d)
                </span>
                staking rewards included
              </p>

              <svg viewBox="0 0 320 96" className="mt-4 w-full" role="img" aria-label="Portfolio performance chart">
                <defs>
                  <linearGradient id="novaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={MINT} stopOpacity="0.35" />
                    <stop offset="100%" stopColor={MINT} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={chartArea} fill="url(#novaFill)" />
                <path d={chartPath} fill="none" stroke={MINT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="mt-2 flex gap-1 rounded-lg border border-white/8 bg-black/30 p-1">
                {(Object.keys(RANGES) as Array<keyof typeof RANGES>).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRange(r)}
                    aria-pressed={range === r}
                    className="flex-1 rounded-md py-1.5 font-[family-name:var(--font-nova-mono)] text-[0.62rem] transition"
                    style={range === r ? { background: MINT, color: "#050b12", fontWeight: 700 } : { color: "rgba(255,255,255,0.5)" }}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {/* Allocation bars */}
              <div className="mt-4 space-y-2 border-t border-white/8 pt-4">
                {[["BTC", 38], ["ETH", 27], ["NOVA", 22], ["Staked yields", 13]].map(([label, pct]) => (
                  <div key={label as string} className="flex items-center gap-3 text-[0.62rem]">
                    <span className="w-16 font-[family-name:var(--font-nova-mono)] uppercase tracking-wider text-white/45">{label}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/8">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: MINT, opacity: 0.85 }} />
                    </div>
                    <span className="w-8 text-right text-white/60">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating chips */}
            <div
              aria-hidden
              className="absolute -left-2 top-10 hidden animate-[float_5s_ease-in-out_infinite] rounded-xl border border-white/10 bg-[#0d1826]/95 px-3.5 py-2.5 shadow-xl backdrop-blur-md sm:block"
            >
              <p className="flex items-center gap-1.5 font-[family-name:var(--font-nova-mono)] text-[0.55rem] uppercase tracking-[0.18em] text-white/40">Swap executed</p>
              <p className="mt-0.5 text-xs font-semibold text-white">1.2 ETH <span className="text-white/40">→</span> 1,284 NOVA</p>
            </div>
            <div
              aria-hidden
              className="absolute -right-2 top-1/2 hidden animate-[float_6s_ease-in-out_infinite_1.2s] rounded-xl border border-white/10 bg-[#0d1826]/95 px-3.5 py-2.5 shadow-xl backdrop-blur-md sm:block"
            >
              <p className="flex items-center gap-1.5 font-[family-name:var(--font-nova-mono)] text-[0.55rem] uppercase tracking-[0.18em] text-white/40">Stake reward</p>
              <p className="mt-0.5 text-xs font-semibold" style={{ color: MINT }}>+24.60 NOVA this epoch</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES (tabs) ──────────────────────────────────── */}
      <section id="features" className="border-t border-white/5 py-16">
        <div className="mx-auto max-w-6xl px-5">
          <p className="font-[family-name:var(--font-nova-mono)] text-[0.58rem] uppercase tracking-[0.28em]" style={{ color: MINT }}>01 — Core</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-[1.02] tracking-tight text-white sm:text-5xl">Tools that make crypto feel <span style={{ color: MINT }}>human.</span></h2>

          <div role="tablist" aria-label="Feature areas" className="mt-8 flex flex-wrap gap-2">
            {FEATURE_TABS.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={tab === f.id}
                onClick={() => setTab(f.id)}
                className="rounded-full border px-4 py-2 font-[family-name:var(--font-nova-mono)] text-[0.62rem] uppercase tracking-[0.18em] transition"
                style={tab === f.id ? { borderColor: MINT, background: MINT, color: "#050b12", fontWeight: 700 } : { borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.55)" }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div role="tabpanel" className="mt-6 grid gap-6 rounded-2xl border border-white/8 p-6 sm:p-8 lg:grid-cols-2" style={{ background: PANEL }}>
            <div>
              <p className="font-[family-name:var(--font-nova-mono)] text-[0.55rem] uppercase tracking-[0.24em] text-white/35">{activeFeature.tag}</p>
              <h3 className="mt-2 text-2xl font-bold text-white">{activeFeature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{activeFeature.copy}</p>
              <ul className="mt-5 space-y-2.5">
                {activeFeature.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-white/75">
                    <BadgeCheck size={16} className="mt-0.5 shrink-0" style={{ color: MINT }} aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            {/* Panel visual: staking calculator for earning, checklist plate otherwise */}
            {tab === "earning" ? (
              <div className="flex flex-col justify-center rounded-xl border border-white/8 bg-black/30 p-5">
                <p className="font-[family-name:var(--font-nova-mono)] text-[0.58rem] uppercase tracking-[0.22em] text-white/40">Staking calculator</p>
                <label htmlFor="stake" className="mt-3 block text-[0.6rem] uppercase tracking-widest text-white/50">Stake amount (NOVA)</label>
                <input
                  id="stake"
                  type="number"
                  min={0}
                  inputMode="decimal"
                  value={stake}
                  onChange={(e) => setStake(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#050b12] px-4 py-3 font-[family-name:var(--font-nova-mono)] text-lg text-white focus:border-[#34e0a1] focus:outline-none"
                />
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg border border-white/8 p-3">
                    <dt className="text-[0.55rem] uppercase tracking-widest text-white/40">Net APY</dt>
                    <dd className="mt-1 font-[family-name:var(--font-nova-mono)] text-xl font-semibold" style={{ color: MINT }}>8.6%</dd>
                  </div>
                  <div className="rounded-lg border border-white/8 p-3">
                    <dt className="text-[0.55rem] uppercase tracking-widest text-white/40">Est. / year</dt>
                    <dd className="mt-1 font-[family-name:var(--font-nova-mono)] text-xl font-semibold text-white">{yearly.toFixed(1)} <span className="text-xs text-white/40">NOVA</span></dd>
                  </div>
                  <div className="rounded-lg border border-white/8 p-3">
                    <dt className="text-[0.55rem] uppercase tracking-widest text-white/40">Est. / month</dt>
                    <dd className="mt-1 font-[family-name:var(--font-nova-mono)] text-xl font-semibold text-white">{monthly.toFixed(2)} <span className="text-xs text-white/40">NOVA</span></dd>
                  </div>
                  <div className="rounded-lg border border-white/8 p-3">
                    <dt className="text-[0.55rem] uppercase tracking-widest text-white/40">Lock term</dt>
                    <dd className="mt-1 font-[family-name:var(--font-nova-mono)] text-xl font-semibold text-white">Flexible</dd>
                  </div>
                </dl>
                <p className="mt-3 text-[0.6rem] text-white/30">Illustrative estimate. Rates vary by route and epoch.</p>
              </div>
            ) : (
              <div className="relative flex items-center justify-center overflow-hidden rounded-xl border border-white/8 bg-black/30 p-6">
                <Image
                  src="/images/concepts/nova/globe.webp"
                  alt="CryptoNova network globe"
                  width={208}
                  height={208}
                  className="size-40 object-contain opacity-90 sm:size-52"
                />
                <div className="absolute bottom-3 left-4 font-[family-name:var(--font-nova-mono)] text-[0.52rem] uppercase tracking-[0.22em] text-white/30">Network mesh — 40+ chains</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── ECOSYSTEM ─────────────────────────────────────────── */}
      <section id="ecosystem" className="border-t border-white/5 py-16">
        <div className="mx-auto max-w-6xl px-5">
          <p className="font-[family-name:var(--font-nova-mono)] text-[0.58rem] uppercase tracking-[0.28em]" style={{ color: MINT }}>02 — Ecosystem</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-[1.02] tracking-tight text-white sm:text-5xl">One connected <span style={{ color: MINT }}>workflow.</span></h2>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ECOSYSTEM.map(({ icon: Icon, title, copy }) => (
              <div key={title} className="group rounded-2xl border border-white/8 p-6 transition-all duration-300 hover:border-[#34e0a1]/35" style={{ background: PANEL }}>
                <Icon size={22} style={{ color: MINT }} aria-hidden />
                <h3 className="mt-4 font-semibold text-white">{title}</h3>
                <p className="mt-1.5 text-[0.8rem] leading-relaxed text-white/55">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── METRICS ───────────────────────────────────────────── */}
      <section id="metrics" className="border-t border-white/5 py-14" style={{ background: "linear-gradient(180deg, #050b12 0%, #071120 50%, #050b12 100%)" }}>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-5 md:grid-cols-4">
          {[["$112.8M", "locked capital"], ["20,150", "community members"], ["$320.4M", "network market cap"], ["$3.60", "$NOVA last price"]].map(([n, l]) => (
            <div key={l as string} className="text-center">
              <p className="font-[family-name:var(--font-nova-mono)] text-2xl font-semibold text-white sm:text-4xl">{n}</p>
              <p className="mt-2 font-[family-name:var(--font-nova-mono)] text-[0.55rem] uppercase tracking-[0.22em] text-white/35">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEWS ──────────────────────────────────────────────── */}
      <section id="news" className="border-t border-white/5 py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="font-[family-name:var(--font-nova-mono)] text-[0.58rem] uppercase tracking-[0.28em]" style={{ color: MINT }}>03 — Signals</p>
              <h2 className="mt-3 text-3xl font-bold leading-[1.02] tracking-tight text-white sm:text-5xl">From the <span style={{ color: MINT }}>network.</span></h2>
            </div>
            <a href="#newsletter" className="hidden items-center gap-1.5 font-[family-name:var(--font-nova-mono)] text-[0.62rem] uppercase tracking-[0.2em] text-white/45 hover:text-white sm:flex">All updates <ChevronRight size={13} aria-hidden /></a>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {NEWS.map((n) => (
              <article key={n.title} className="group overflow-hidden rounded-2xl border border-white/8" style={{ background: PANEL }}>
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={n.image}
                    alt={n.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full px-2.5 py-1 font-[family-name:var(--font-nova-mono)] text-[0.5rem] uppercase tracking-[0.2em] text-black" style={{ background: MINT }}>{n.kicker}</span>
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-semibold leading-snug text-white/90">{n.title}</h3>
                  <p className="mt-2 font-[family-name:var(--font-nova-mono)] text-[0.52rem] uppercase tracking-[0.2em] text-white/30">{n.meta}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER / CTA ──────────────────────────────────── */}
      <section id="newsletter" className="border-t border-white/5 py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-8 rounded-3xl border p-7 sm:p-10 lg:grid-cols-2 lg:items-center" style={{ background: "linear-gradient(135deg, rgba(52,224,161,0.10), rgba(52,224,161,0.02) 55%)", borderColor: "rgba(52,224,161,0.25)" }}>
            <div>
              <h2 className="text-2xl font-bold leading-tight text-white sm:text-4xl">One calm email.<br />Zero noise.</h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">Network milestones, shipping notes and listings — once a week, plain language, unsubscribe anytime.</p>
            </div>
            {newsletterDone ? (
              <SuccessPanel title="You're on the list." body="Expect one email per week. No hype, no chain letters." accent={MINT} onReset={() => { setNewsletterDone(false); setNewsletter(""); }} />
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (newsletter.includes("@")) setNewsletterDone(true); }} className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="nova-newsletter" className="sr-only">Email address</label>
                <input
                  id="nova-newsletter"
                  type="email"
                  required
                  placeholder="you@domain.com"
                  value={newsletter}
                  onChange={(e) => setNewsletter(e.target.value)}
                  className="w-full rounded-xl border border-white/12 bg-[#050b12] px-5 py-4 text-sm text-white placeholder:text-white/30 focus:border-[#34e0a1] focus:outline-none"
                />
                <button type="submit" className="shrink-0 rounded-xl px-6 py-4 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-black transition hover:brightness-110" style={{ background: MINT }}>
                  Join
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="relative overflow-hidden border-t border-white/5 pt-12">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-col justify-between gap-6 pb-10 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2.5">
              <Globe2 size={18} style={{ color: MINT }} aria-hidden />
              <span className="text-sm font-bold tracking-[0.14em] text-white">CRYPTO<span style={{ color: MINT }}>NOVA</span></span>
            </div>
            <nav aria-label="Footer" className="flex gap-6 font-[family-name:var(--font-nova-mono)] text-[0.6rem] uppercase tracking-[0.2em] text-white/35">
              <a href="#features" className="transition hover:text-white">Features</a>
              <a href="#ecosystem" className="transition hover:text-white">Ecosystem</a>
              <a href="#news" className="transition hover:text-white">News</a>
              <button onClick={() => setOpen(true)} className="transition hover:text-white">Launch App</button>
            </nav>
          </div>
          <p className="text-center font-[family-name:var(--font-nova-mono)] text-[0.55rem] uppercase tracking-[0.2em] text-white/20">CryptoNova concept study — fictional brand, designed as a portfolio piece. Not financial advice. © 2026</p>
          <p aria-hidden className="mt-6 select-none whitespace-nowrap text-center font-bold uppercase leading-none text-white/[0.04]" style={{ fontSize: "clamp(4rem, 17vw, 11rem)" }}>CryptoNova</p>
        </div>
      </footer>

      {/* ── LAUNCH APP MODAL ─────────────────────────────────── */}
      <ConceptModal open={open} onClose={() => setOpen(false)} title="Launch CryptoNova" accent={MINT}>
        {state === "done" ? (
          <SuccessPanel title="Welcome aboard." body="Your CryptoNova account request is in. Check your inbox for a secure sign-in link." accent={MINT} onReset={reset} />
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <Field label="Full name" name="name" autoComplete="name" placeholder="Ada Lovelace" value={form.name} onChange={(v) => setForm({ ...form, name: v })} accent={MINT} />
            <Field label="Email address" name="email" type="email" autoComplete="email" placeholder="you@domain.com" value={form.email} onChange={(v) => setForm({ ...form, email: v })} accent={MINT} />
            <SubmitButton state={state} label="Create account" busyLabel="Creating…" style={{ background: MINT }} />
            <p className="text-[0.6rem] leading-relaxed text-white/30">Demo flow — nothing is transmitted or stored. CryptoNova is a concept study.</p>
          </form>
        )}
      </ConceptModal>

      <style>{`
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @media (prefers-reduced-motion: reduce) { .animate-[ticker_28s_linear_infinite], .animate-[float_5s_ease-in-out_infinite], .animate-[float_6s_ease-in-out_infinite_1.2s] { animation: none !important; } }
      `}</style>
    </main>
  );
}
