"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  Menu,
  Phone,
  Quote,
  ShieldCheck,
  Users,
  X,
  Zap,
} from "lucide-react";
import {
  ConceptModal,
  Field,
  SelectField,
  SubmitButton,
  SuccessPanel,
  useSubmitState,
} from "@/components/concepts/primitives";

const EMBER = "#ff6a1f";
const INK = "#0e0b09";
const PANEL = "#161110";

const PROGRAMS = [
  {
    n: "01",
    title: "Skill Sessions",
    copy: "Technical repetition with coach-led correction — handles, finishing, footwork, shooting rhythm.",
    meta: "Tue · Thu 6:00 PM",
    level: "All levels",
  },
  {
    n: "02",
    title: "Performance Blocks",
    copy: "Speed, balance and conditioning for court movement — the athletic engine under the moves.",
    meta: "Wed · Sat 7:00 AM",
    level: "Competitive",
  },
  {
    n: "03",
    title: "Community Runs",
    copy: "High-energy group play that sharpens real match habits — pace, spacing, communication.",
    meta: "Sun 5:00 PM",
    level: "Open",
  },
] as const;

const COACHES = [
  { initials: "JH", name: "Jordan Hale", role: "Elite Skills Coach", spec: "Ball-handling · Shooting · Offense", yrs: "8 yrs on court" },
  { initials: "MD", name: "Marcus Dean", role: "Performance Mentor", spec: "S&C · Speed · Injury prevention", yrs: "6 yrs on court" },
  { initials: "AS", name: "Avery Stone", role: "Game IQ Specialist", spec: "Film · Decision-making · IQ", yrs: "5 yrs on court" },
  { initials: "EG", name: "Elias Grant", role: "Shot Development", spec: "Mechanics · Footwork · Catch & shoot", yrs: "7 yrs on court" },
] as const;

const PLANS = {
  starter: { monthly: 20, annual: 200, label: "Starter" },
  performance: { monthly: 25, annual: 250, label: "Performance" },
} as const;

type PlanKey = keyof typeof PLANS;

export default function NovasportPage() {
  const [menu, setMenu] = useState(false);
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [modal, setModal] = useState(false);
  const [plan, setPlan] = useState<PlanKey>("performance");
  const [form, setForm] = useState({ name: "", phone: "", position: "Point Guard", level: "Competitive" });
  const { state, submit, reset } = useSubmitState();

  useEffect(() => {
    // Escape closes mobile menu
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openEnroll = (p: PlanKey) => {
    setPlan(p);
    setModal(true);
  };

  const price = (k: PlanKey) => (billing === "monthly" ? PLANS[k].monthly : PLANS[k].annual);

  return (
    <main style={{ background: INK }} className="min-h-dvh text-[#f2ede6]">
      {/* ── NAV ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0e0b09]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#top" className="flex items-center gap-2">
            <span aria-hidden className="flex size-8 items-center justify-center rounded-md" style={{ background: EMBER }}>
              <Zap size={16} className="text-black" strokeWidth={2.5} />
            </span>
            <span className="font-[family-name:var(--font-sport-display)] text-lg uppercase tracking-wide text-white">
              NOVAS<span style={{ color: EMBER }}>PORT</span>
            </span>
          </a>
          <nav aria-label="Section" className="hidden items-center gap-6 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-white/50 md:flex">
            {[["Programs", "#programs"], ["Coaches", "#coaches"], ["Membership", "#membership"], ["Contact", "#contact"]].map(([l, h]) => (
              <a key={h} href={h} className="transition hover:text-white">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => openEnroll("performance")}
              className="hidden rounded-md px-5 py-2.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.2em] text-black transition hover:brightness-110 sm:block"
              style={{ background: EMBER }}
            >
              Join Training
            </button>
            <button onClick={() => setMenu((v) => !v)} aria-label="Toggle menu" aria-expanded={menu} className="rounded-md border border-white/10 p-2 text-white/70 md:hidden">
              {menu ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {menu && (
          <div className="border-t border-white/5 px-5 py-4 md:hidden">
            {[["Programs", "#programs"], ["Coaches", "#coaches"], ["Membership", "#membership"], ["Contact", "#contact"]].map(([l, h]) => (
              <a key={h} href={h} onClick={() => setMenu(false)} className="block border-b border-white/5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white/70">{l}</a>
            ))}
            <button onClick={() => { setMenu(false); openEnroll("performance"); }} className="mt-4 w-full rounded-md px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-black" style={{ background: EMBER }}>Join Training</button>
          </div>
        )}
      </header>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section id="top" className="relative overflow-hidden">
        {/* Court-line backdrop */}
        <svg aria-hidden viewBox="0 0 800 600" className="pointer-events-none absolute inset-0 size-full opacity-[0.07]" preserveAspectRatio="xMidYMid slice">
          <circle cx="400" cy="300" r="140" stroke="#ff6a1f" strokeWidth="2" fill="none" />
          <line x1="400" y1="0" x2="400" y2="600" stroke="#ff6a1f" strokeWidth="2" />
          <rect x="0" y="0" width="800" height="600" stroke="#ff6a1f" strokeWidth="3" fill="none" />
          <path d="M0 170 h120 a90 90 0 0 1 0 260 H0" stroke="#ff6a1f" strokeWidth="2" fill="none" />
          <path d="M800 170 h-120 a90 90 0 0 0 0 260 H800" stroke="#ff6a1f" strokeWidth="2" fill="none" />
        </svg>
        <div aria-hidden className="pointer-events-none absolute -right-32 top-1/3 size-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,106,31,0.14) 0%, transparent 70%)" }} />

        <div className="mx-auto grid max-w-6xl items-stretch gap-10 px-5 pb-14 pt-12 lg:grid-cols-12 lg:gap-8 lg:pb-16 lg:pt-16">
          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="flex items-center gap-3 font-mono text-[0.58rem] uppercase tracking-[0.3em] text-white/45">
              <span className="inline-block size-2 rotate-45" style={{ background: EMBER }} aria-hidden />
              Est. Lagos — Basketball Performance
            </p>
            <h1 className="mt-5 font-[family-name:var(--font-sport-display)] uppercase leading-[0.88] text-white">
              <span className="block text-[clamp(3.2rem,13vw,6.4rem)]">Train.</span>
              <span className="block text-[clamp(3.2rem,13vw,6.4rem)]">Compete.</span>
              <span className="block text-[clamp(3.2rem,13vw,6.4rem)]" style={{ color: EMBER }}>Dominate.</span>
            </h1>
            <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-white/60">
              Elite coaching, real reps and a competitive community — NOVASPORT turns raw
              athleticism into game-ready players. Skill sessions, performance blocks,
              community runs.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button onClick={() => openEnroll("performance")} className="group inline-flex items-center gap-2 rounded-md px-7 py-4 font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] text-black transition hover:brightness-110" style={{ background: EMBER }}>
                Join training
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
              </button>
              <a href="#membership" className="rounded-md border border-white/15 px-7 py-4 font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/80 transition hover:border-[#ff6a1f] hover:text-[#ff6a1f]">Membership</a>
            </div>
            <dl className="mt-9 grid grid-cols-3 gap-4 border-t border-white/8 pt-6">
              {[["150+", "guided athletes"], ["350+", "sessions coached"], ["800+", "signups & counting"]].map(([n, l]) => (
                <div key={l as string}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-[family-name:var(--font-sport-display)] text-3xl text-white">{n}</dd>
                  <dd className="mt-1 font-mono text-[0.52rem] uppercase leading-snug tracking-[0.18em] text-white/40">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Coach portrait plate */}
          <div className="relative lg:col-span-5">
            <div className="relative h-full min-h-[26rem] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/images/concepts/sport/mentor.webp"
                alt="NOVASPORT head coach under the stadium lights holding a basketball"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-[50%_18%]"
                priority
              />
              <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 45%, rgba(14,11,9,0.92) 100%)" }} />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-mono text-[0.52rem] uppercase tracking-[0.28em]" style={{ color: EMBER }}>Head of Performance</p>
                <p className="mt-1 font-[family-name:var(--font-sport-display)] text-2xl uppercase leading-none text-white">Jordan Hale</p>
                <p className="mt-1.5 flex items-center gap-2 text-[0.68rem] text-white/55"><ShieldCheck size={12} style={{ color: EMBER }} aria-hidden /> FIBA-certified coach · 8 seasons developing guards</p>
              </div>
            </div>
            <div aria-hidden className="absolute -left-3 top-6 hidden rotate-[-4deg] rounded-md px-3 py-2 font-mono text-[0.55rem] font-bold uppercase tracking-[0.2em] text-black shadow-lg sm:block" style={{ background: EMBER }}>
              Next session — Sat 7AM
            </div>
          </div>
        </div>

        {/* Ticker */}
        <div className="overflow-hidden border-y border-white/5 py-2 font-mono text-[0.66rem] uppercase tracking-[0.3em] text-white/40">
          <div className="flex w-max animate-[ticker_24s_linear_infinite] gap-10 whitespace-nowrap">
            {[...Array(3)].map((_, i) => (
              <span key={i} aria-hidden={i > 0}>Skill Sessions <span style={{ color: EMBER }}>✦</span> Performance Blocks <span style={{ color: EMBER }}>✦</span> Community Runs <span style={{ color: EMBER }}>✦</span> Game IQ <span style={{ color: EMBER }}>✦</span> Strength &amp; Conditioning <span style={{ color: EMBER }}>✦</span> Shot Mechanics <span style={{ color: EMBER }}>✦</span></span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ─────────────────────────────────────────── */}
      <section id="programs" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.3em]" style={{ color: EMBER }}>01 — Programs</p>
              <h2 className="mt-3 font-[family-name:var(--font-sport-display)] text-4xl uppercase leading-[0.92] text-white sm:text-6xl">Built for<br />the work.</h2>
            </div>
            <p className="hidden max-w-[16rem] text-[0.78rem] leading-relaxed text-white/45 sm:block">Three tracks, one standard: measurable improvement, every single week.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {PROGRAMS.map((p) => (
              <article key={p.n} className="group relative overflow-hidden rounded-2xl border border-white/8 p-6 transition-colors duration-300 hover:border-[#ff6a1f]/40" style={{ background: PANEL }}>
                <span aria-hidden className="font-[family-name:var(--font-sport-display)] text-7xl text-white/[0.05] transition-colors duration-300 group-hover:text-[#ff6a1f]/15">{p.n}</span>
                <h3 className="mt-2 font-[family-name:var(--font-sport-display)] text-2xl uppercase text-white">{p.title}</h3>
                <p className="mt-2 text-[0.83rem] leading-relaxed text-white/55">{p.copy}</p>
                <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-4 font-mono text-[0.56rem] uppercase tracking-[0.18em]">
                  <span className="flex items-center gap-1.5 text-white/45"><CalendarDays size={12} aria-hidden />{p.meta}</span>
                  <span style={{ color: EMBER }}>{p.level}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── COACHES ──────────────────────────────────────────── */}
      <section id="coaches" className="border-t border-white/5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.3em]" style={{ color: EMBER }}>02 — Coaches</p>
          <h2 className="mt-3 font-[family-name:var(--font-sport-display)] text-4xl uppercase leading-[0.92] text-white sm:text-6xl">Mentors who<br />demand more.</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COACHES.map((c) => (
              <div key={c.name} className="group rounded-2xl border border-white/8 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#ff6a1f]/40" style={{ background: PANEL }}>
                <div aria-hidden className="mx-auto flex size-20 items-center justify-center rounded-full border-2 font-[family-name:var(--font-sport-display)] text-2xl uppercase" style={{ borderColor: `${EMBER}55`, color: EMBER, background: `${EMBER}14` }}>
                  {c.initials}
                </div>
                <h3 className="mt-4 font-semibold text-white">{c.name}</h3>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em]" style={{ color: EMBER }}>{c.role}</p>
                <p className="mt-2 text-[0.75rem] leading-snug text-white/50">{c.spec}</p>
                <p className="mt-3 border-t border-white/8 pt-3 font-mono text-[0.52rem] uppercase tracking-[0.2em] text-white/30">{c.yrs}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEMBERSHIP ───────────────────────────────────────── */}
      <section id="membership" className="relative border-t border-white/5 py-16 sm:py-20" style={{ background: "linear-gradient(180deg, #0e0b09, #151010 55%, #0e0b09)" }}>
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.3em]" style={{ color: EMBER }}>03 — Membership</p>
              <h2 className="mt-3 font-[family-name:var(--font-sport-display)] text-4xl uppercase leading-[0.92] text-white sm:text-6xl">Pick your<br />standard.</h2>
            </div>
            {/* Billing toggle */}
            <div className="flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.2em]">
              <span className={billing === "monthly" ? "text-white" : "text-white/35"}>Monthly</span>
              <button
                role="switch"
                aria-checked={billing === "annual"}
                aria-label="Toggle annual billing"
                onClick={() => setBilling((b) => (b === "monthly" ? "annual" : "monthly"))}
                className="relative h-6 w-11 rounded-full border border-white/15 transition-colors"
                style={{ background: billing === "annual" ? EMBER : "rgba(255,255,255,0.08)" }}
              >
                <span aria-hidden className="absolute top-0.5 size-[18px] rounded-full bg-white shadow transition-all" style={{ left: billing === "annual" ? 22 : 2 }} />
              </button>
              <span className={billing === "annual" ? "text-white" : "text-white/35"}>Annual <span className="text-[#ff6a1f]">−17%</span></span>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {(Object.keys(PLANS) as PlanKey[]).map((key) => {
              const p = PLANS[key];
              const popular = key === "performance";
              return (
                <div key={key} className="relative flex flex-col rounded-2xl border p-7" style={{ background: PANEL, borderColor: popular ? `${EMBER}66` : "rgba(255,255,255,0.08)", boxShadow: popular ? `0 0 60px -20px rgba(255,106,31,0.35)` : undefined }}>
                  {popular && <span className="absolute -top-3 left-6 rounded-full px-3 py-1 font-mono text-[0.52rem] font-bold uppercase tracking-[0.22em] text-black" style={{ background: EMBER }}>Most chosen</span>}
                  <h3 className="font-[family-name:var(--font-sport-display)] text-2xl uppercase text-white">{p.label}</h3>
                  <p className="mt-1 text-[0.78rem] text-white/45">{popular ? "For athletes chasing measurable gains." : "Where every serious journey starts."}</p>
                  <p className="mt-6">
                    <span className="font-[family-name:var(--font-sport-display)] text-6xl text-white">${price(key)}</span>
                    <span className="ml-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/40">{billing === "monthly" ? "/month" : "/year (2 months free)"}</span>
                  </p>
                  <ul className="mt-6 flex-1 space-y-2.5 text-[0.85rem] text-white/70">
                    {(key === "starter"
                      ? ["Weekly skill session", "Coach feedback after every session", "Community run access", "Progress tracking dashboard", "Training resources library"]
                      : ["Everything in Starter", "Priority coach access (48h replies)", "Advanced skill blocks", "Conditioning + S&C programming", "Quarterly performance analysis", "Mental game sessions"]
                    ).map((f) => (
                      <li key={f} className="flex items-start gap-2.5"><Check size={15} className="mt-0.5 shrink-0" style={{ color: EMBER }} aria-hidden />{f}</li>
                    ))}
                  </ul>
                  <button onClick={() => openEnroll(key)} className="mt-7 rounded-md py-4 font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] transition" style={popular ? { background: EMBER, color: "#0e0b09" } : { border: "1px solid rgba(255,255,255,0.15)", color: "#f2ede6" }}>
                    Choose {p.label}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ──────────────────────────────────────── */}
      <section className="border-t border-white/5 py-14">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 md:grid-cols-12">
          <div className="md:col-span-7">
            <Quote size={34} style={{ color: EMBER }} aria-hidden />
            <blockquote className="mt-4 text-xl font-medium leading-snug text-white/90 sm:text-2xl">
              “NOVASPORT changed the way I train. Sessions are intense, specific and motivating — and every week I feel the difference in confidence, pace and decision-making.”
            </blockquote>
            <p className="mt-5 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-white/45">Michael Johnson <span style={{ color: EMBER }}>—</span> Performance Member</p>
          </div>
          <div className="md:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/images/concepts/sport/hand.webp"
                alt="Player gripping a basketball under stadium lights"
                width={519}
                height={803}
                className="h-64 w-full object-cover object-[50%_20%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────── */}
      <section id="contact" className="border-t border-white/5 py-14">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border p-7 sm:flex-row sm:items-center sm:p-10" style={{ background: "linear-gradient(120deg, rgba(255,106,31,0.14), rgba(255,106,31,0.03) 60%)", borderColor: "rgba(255,106,31,0.3)" }}>
            <div>
              <h2 className="font-[family-name:var(--font-sport-display)] text-3xl uppercase leading-[0.95] text-white sm:text-5xl">First session<br /><span style={{ color: EMBER }}>on the house.</span></h2>
              <p className="mt-3 max-w-sm text-[0.85rem] text-white/60">Walk in Saturday 7AM. Bring shoes and a bottle — we’ll handle the rest.</p>
            </div>
            <div className="space-y-2.5 font-mono text-[0.7rem] text-white/60">
              <p className="flex items-center gap-2"><MapPin size={14} style={{ color: EMBER }} aria-hidden /> 14 Adeola Odeku St, Victoria Island, Lagos</p>
              <p className="flex items-center gap-2"><Phone size={14} style={{ color: EMBER }} aria-hidden /> +234 913 999 8795</p>
              <p className="flex items-center gap-2"><Users size={14} style={{ color: EMBER }} aria-hidden /> novasupport@novasports.com</p>
              <button onClick={() => openEnroll("starter")} className="mt-3 flex w-full items-center justify-center gap-2 rounded-md px-6 py-3.5 font-mono text-[0.66rem] font-bold uppercase tracking-[0.2em] text-black" style={{ background: EMBER }}>
                Claim free session <ArrowRight size={14} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="relative overflow-hidden border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 pb-4 pt-6 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-white/30 sm:flex-row">
          <p>© 2026 NOVASPORT — Concept study. Fictional club.</p>
          <p>Designed &amp; built by <span style={{ color: EMBER }}>Danny Adepitan</span></p>
        </div>
        <p aria-hidden className="select-none whitespace-nowrap text-center font-[family-name:var(--font-sport-display)] uppercase leading-[0.8] text-white/[0.035]" style={{ fontSize: "clamp(4rem, 18vw, 12rem)" }}>Novasport</p>
      </footer>

      {/* ── ENROLLMENT MODAL ──────────────────────────────────── */}
      <ConceptModal open={modal} onClose={() => setModal(false)} title="Join NOVASPORT" accent={EMBER}>
        {state === "done" ? (
          <SuccessPanel title="You’re in the system." body="Coach Jordan will reach out on WhatsApp within 24h to confirm your first session and payment." accent={EMBER} onReset={reset} />
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <Field label="Full name" name="name" autoComplete="name" placeholder="Chinedu Okoro" value={form.name} onChange={(v) => setForm({ ...form, name: v })} accent={EMBER} />
            <Field label="Phone / WhatsApp" name="phone" type="tel" autoComplete="tel" placeholder="+234 …" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} accent={EMBER} />
            <div className="grid grid-cols-2 gap-3">
              <SelectField label="Position" name="position" options={["Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"]} value={form.position} onChange={(v) => setForm({ ...form, position: v })} />
              <SelectField label="Level" name="level" options={["Recreational", "Competitive", "Elite"]} value={form.level} onChange={(v) => setForm({ ...form, level: v })} />
            </div>
            <SelectField label="Plan" name="plan" options={["Starter — $20/mo", "Performance — $25/mo"]} value={plan === "starter" ? "Starter — $20/mo" : "Performance — $25/mo"} onChange={(v) => setPlan(v.startsWith("Starter") ? "starter" : "performance")} />
            <SubmitButton state={state} label="Claim my spot" busyLabel="Locking in…" style={{ background: EMBER }} />
            <p className="text-[0.6rem] text-white/30">Demo flow — nothing is transmitted or stored.</p>
          </form>
        )}
      </ConceptModal>

      <style>{`
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
        @media (prefers-reduced-motion: reduce) { .animate-[ticker_24s_linear_infinite] { animation: none !important; } }
      `}</style>
    </main>
  );
}
