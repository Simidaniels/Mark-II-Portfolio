"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BatteryCharging,
  BrainCircuit,
  Check,
  ChevronRight,
  Cpu,
  Gauge,
  Menu,
  Navigation,
  Wrench,
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

const TEAL = "#2dd4bf";
const INK = "#0b1114";
const PANEL = "#10181d";

type ModelKey = "sky" | "drift" | "storm";

const MODELS: Record<
  ModelKey,
  {
    name: string;
    tag: string;
    price: number;
    was: number;
    range: string;
    zeroSixty: string;
    weight: string;
    image: string;
    specs: [string, number][];
    features: string[];
  }
> = {
  sky: {
    name: "Sky · White Star",
    tag: "The daily city glider",
    price: 3697,
    was: 4697,
    range: "90 km",
    zeroSixty: "4.2 s",
    weight: "24 kg",
    image: "/images/concepts/store/bycycle-2.webp",
    specs: [
      ["Range", 75],
      ["Acceleration", 60],
      ["Handling", 95],
    ],
    features: ["GPS theft tracking & remote lock", "Smart pedal boost with comfort tuning", "Doorstep maintenance scheduling"],
  },
  drift: {
    name: "Drift · Midnight Arc",
    tag: "The long-haul cruiser",
    price: 3997,
    was: 4997,
    range: "120 km",
    zeroSixty: "3.9 s",
    weight: "27 kg",
    image: "/images/concepts/store/bycycle-2-reverse.webp",
    specs: [
      ["Range", 100],
      ["Acceleration", 75],
      ["Comfort", 95],
    ],
    features: ["Dual-suspension feel for broken tarmac", "Night-ride lighting, wide-angle beam", "Long-form ride analytics in the app"],
  },
  storm: {
    name: "Storm · Full Adventure",
    tag: "The aggressive flagship",
    price: 4697,
    was: 5697,
    range: "120 km",
    zeroSixty: "3.4 s",
    weight: "26 kg",
    image: "/images/concepts/store/bycycle-3.webp",
    specs: [
      ["Range", 100],
      ["Acceleration", 100],
      ["Presence", 90],
    ],
    features: ["Turbo mode — instant 78 Nm torque", "Reinforced frame for weekend trails", "Storm-tuned assist for hills & headwinds"],
  },
};

const SUBSIDY: Record<string, number> = { Lagos: 0.15, Abuja: 0.1, "Port Harcourt": 0.08, Other: 0.05 };

function useCountdown() {
  const target = useRef(0);
  const [left, setLeft] = useState({ d: 21, h: 0, m: 0, s: 0 });
  useEffect(() => {
    target.current = Date.now() + 21 * 24 * 60 * 60 * 1000;
    const tick = () => {
      const ms = Math.max(0, target.current - Date.now());
      setLeft({
        d: Math.floor(ms / 86_400_000),
        h: Math.floor((ms / 3_600_000) % 24),
        m: Math.floor((ms / 60_000) % 60),
        s: Math.floor((ms / 1000) % 60),
      });
    };
    tick();
    const t = window.setInterval(tick, 1000);
    return () => window.clearInterval(t);
  }, []);
  return left;
}

export default function NovalikePage() {
  const [model, setModel] = useState<ModelKey>("sky");
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const [city, setCity] = useState("Lagos");
  const [form, setForm] = useState({ name: "", email: "", financing: "Pay once" });
  const { state, submit, reset } = useSubmitState();
  const cd = useCountdown();
  const active = MODELS[model];
  const subsidy = Math.round(active.price * SUBSIDY[city]);

  return (
    <main style={{ background: INK }} className="min-h-dvh text-[#e6f0ef]">
      {/* ── NAV ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0b1114]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#top" className="flex items-center gap-2">
            <Zap size={18} style={{ color: TEAL }} strokeWidth={2.5} aria-hidden />
            <span className="text-[0.95rem] font-bold tracking-[0.18em] text-white">NOVA<span style={{ color: TEAL }}>BIKE</span></span>
          </a>
          <nav aria-label="Section" className="hidden items-center gap-7 font-[family-name:var(--font-bike-mono)] text-[0.62rem] uppercase tracking-[0.25em] text-white/50 md:flex">
            {[["Models", "#models"], ["Technology", "#technology"], ["Story", "#story"], ["Subsidies", "#subsidies"]].map(([l, h]) => (
              <a key={h} href={h} className="transition hover:text-white">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setModal(true)} className="hidden rounded-full px-5 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.15em] text-black transition hover:brightness-110 sm:block" style={{ background: TEAL }}>
              Reserve
            </button>
            <button onClick={() => setMenu((v) => !v)} aria-label="Toggle menu" aria-expanded={menu} className="rounded-md border border-white/10 p-2 text-white/70 md:hidden">
              {menu ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {menu && (
          <div className="border-t border-white/5 px-5 py-4 md:hidden">
            {[["Models", "#models"], ["Technology", "#technology"], ["Story", "#story"], ["Subsidies", "#subsidies"]].map(([l, h]) => (
              <a key={h} href={h} onClick={() => setMenu(false)} className="block border-b border-white/5 py-3 font-[family-name:var(--font-bike-mono)] text-xs uppercase tracking-[0.25em] text-white/70">{l}</a>
            ))}
            <button onClick={() => { setMenu(false); setModal(true); }} className="mt-4 w-full rounded-full px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black" style={{ background: TEAL }}>Reserve</button>
          </div>
        )}
      </header>

      {/* ── HERO + MODEL SWITCHER ─────────────────────────────── */}
      <section id="top" className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(65% 55% at 78% 42%, rgba(45,212,191,0.12) 0%, transparent 62%)" }} />
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 pb-14 pt-10 lg:grid-cols-12 lg:gap-6 lg:pb-16 lg:pt-14">
          <div className="lg:col-span-5">
            <p className="font-[family-name:var(--font-bike-mono)] text-[0.56rem] uppercase tracking-[0.3em]" style={{ color: TEAL }}>2026 Flagship — Launch Batch</p>
            <h1 className="mt-4 font-bold uppercase leading-[0.92] tracking-tight text-white">
              <span className="block text-[clamp(3rem,12.5vw,5.6rem)]">Ride the</span>
              <span className="block text-[clamp(3rem,12.5vw,5.6rem)]" style={{ color: TEAL }}>Future.</span>
            </h1>
            <p className="mt-5 max-w-sm text-[0.92rem] leading-relaxed text-white/60">
              City e-bikes engineered like flagship gear — adaptive power,
              self-healing connectivity and range that actually clears the commute.
            </p>

            {/* Model selector */}
            <div role="tablist" aria-label="Choose a model" className="mt-7 flex flex-wrap gap-2">
              {(Object.keys(MODELS) as ModelKey[]).map((k) => (
                <button
                  key={k}
                  role="tab"
                  aria-selected={model === k}
                  onClick={() => setModel(k)}
                  className="rounded-full border px-4 py-2 font-[family-name:var(--font-bike-mono)] text-[0.6rem] uppercase tracking-[0.18em] transition"
                  style={model === k ? { borderColor: TEAL, background: TEAL, color: "#0b1114", fontWeight: 700 } : { borderColor: "rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.55)" }}
                >
                  {MODELS[k].name.split(" · ")[0]}
                </button>
              ))}
            </div>
            <div className="mt-4 border-l-2 pl-4" style={{ borderColor: TEAL }}>
              <p className="text-lg font-semibold text-white">{active.name}</p>
              <p className="text-[0.72rem] uppercase tracking-[0.18em] text-white/40">{active.tag}</p>
            </div>

            <div className="mt-6 flex items-center gap-6 font-[family-name:var(--font-bike-mono)]">
              {[[active.range, "smart range"], ["1.9h", "fast charge"], ["AI", "ride control"]].map(([n, l]) => (
                <div key={l as string}>
                  <p className="text-2xl font-semibold text-white">{n}</p>
                  <p className="text-[0.5rem] uppercase tracking-[0.22em] text-white/35">{l}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => setModal(true)} className="inline-flex items-center gap-2 rounded-full px-6 py-4 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-black transition hover:brightness-110" style={{ background: TEAL }}>
                Reserve {active.name.split(" · ")[0]} <ArrowRight size={15} aria-hidden />
              </button>
              <a href="#models" className="rounded-full border border-white/15 px-6 py-4 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/80 transition hover:text-white">All models</a>
            </div>
          </div>

          {/* Hero bike */}
          <div className="relative lg:col-span-7">
            <div className="relative aspect-[1/1] w-full sm:aspect-[4/3] lg:aspect-auto lg:h-[30rem]">
              <Image
                key={active.image}
                src={active.image}
                alt={`${active.name} electric bike in studio lighting`}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-contain drop-shadow-[0_30px_60px_rgba(45,212,191,0.14)] transition-all duration-500"
                priority
              />
              <div className="absolute bottom-2 left-2 rounded-xl border border-white/10 bg-[#0e151a]/90 px-4 py-3 backdrop-blur-sm">
                <p className="font-[family-name:var(--font-bike-mono)] text-[0.5rem] uppercase tracking-[0.25em] text-white/35">Launch price</p>
                <p className="font-[family-name:var(--font-bike-mono)] text-2xl font-semibold text-white">${active.price.toLocaleString()} <s className="text-sm text-white/30">${active.was.toLocaleString()}</s></p>
              </div>
            </div>
          </div>
        </div>
        {/* Marquee */}
        <div className="overflow-hidden border-t border-white/5 py-2 font-[family-name:var(--font-bike-mono)] text-[0.62rem] uppercase tracking-[0.3em] text-white/35">
          <div className="flex w-max animate-[ticker_26s_linear_infinite] gap-10 whitespace-nowrap">
            {[...Array(3)].map((_, i) => (
              <span key={i} aria-hidden={i > 0}>Nova Bike Sky <span style={{ color: TEAL }}>●</span> Drift <span style={{ color: TEAL }}>●</span> Storm <span style={{ color: TEAL }}>●</span> 120 km Smart Range <span style={{ color: TEAL }}>●</span> AI Ride Control <span style={{ color: TEAL }}>●</span></span>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODELS ───────────────────────────────────────────── */}
      <section id="models" className="border-t border-white/5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="font-[family-name:var(--font-bike-mono)] text-[0.56rem] uppercase tracking-[0.3em]" style={{ color: TEAL }}>01 — Lineup</p>
          <h2 className="mt-3 text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl">Three rides.<br />One standard.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {(Object.keys(MODELS) as ModelKey[]).map((k) => {
              const m = MODELS[k];
              const isActive = k === model;
              return (
                <article
                  key={k}
                  className="group overflow-hidden rounded-2xl border transition-all duration-300"
                  style={{ background: PANEL, borderColor: isActive ? `${TEAL}66` : "rgba(255,255,255,0.07)" }}
                >
                  <button onClick={() => setModel(k)} aria-pressed={isActive} aria-label={`Focus ${m.name}`} className="block w-full cursor-pointer">
                    <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-white/5 bg-black/40">
                      <Image src={m.image} alt={m.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-2 transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  </button>
                  <div className="p-6">
                    <p className="font-[family-name:var(--font-bike-mono)] text-[0.52rem] uppercase tracking-[0.25em] text-white/35">{m.tag}</p>
                    <h3 className="mt-1.5 text-xl font-semibold text-white">{m.name}</h3>
                    <p className="mt-3 font-[family-name:var(--font-bike-mono)] text-lg text-white">
                      ${m.price.toLocaleString()} <s className="text-[0.7rem] text-white/30">${m.was.toLocaleString()}</s>
                      <span className="ml-2 align-middle rounded px-1.5 py-0.5 text-[0.5rem] font-bold uppercase tracking-widest text-black" style={{ background: TEAL }}>Save ${(m.was - m.price).toLocaleString()}</span>
                    </p>
                    <ul className="mt-4 space-y-2 text-[0.78rem] text-white/60">
                      {m.features.map((f) => (
                        <li key={f} className="flex items-start gap-2"><Check size={13} className="mt-0.5 shrink-0" style={{ color: TEAL }} aria-hidden />{f}</li>
                      ))}
                    </ul>
                    {/* Spec bars */}
                    <div className="mt-4 space-y-1.5">
                      {m.specs.map(([label, pct]) => (
                        <div key={label as string} className="flex items-center gap-2 text-[0.52rem]">
                          <span className="w-20 font-[family-name:var(--font-bike-mono)] uppercase tracking-widest text-white/35">{label}</span>
                          <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/8">
                            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: TEAL }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => { setModel(k); setModal(true); }} className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg py-3 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-black transition hover:brightness-110" style={{ background: TEAL }}>
                      Reserve {m.name.split(" · ")[0]} <ChevronRight size={14} aria-hidden />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY ───────────────────────────────────────── */}
      <section id="technology" className="border-t border-white/5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="font-[family-name:var(--font-bike-mono)] text-[0.56rem] uppercase tracking-[0.3em]" style={{ color: TEAL }}>02 — Technology</p>
          <h2 className="mt-3 text-4xl font-bold uppercase leading-[0.95] text-white sm:text-6xl">Engineered,<br />not decorated.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { icon: BrainCircuit, title: "Adaptive Power", copy: "Torque curves that read gradient and effort 240 times a second. The bike meets you, not the trail.", chip: "Ride modes" },
              { icon: Cpu, title: "Connected Control", copy: "GPS, diagnostics and service history in one cockpit. Route data, maintenance nudges, theft recovery.", chip: "Companion app" },
              { icon: Gauge, title: "Precision Build", copy: "Monocoque frame, silent belt drive, hydraulic discs. Agile in motion, refined at every stop.", chip: "Materials" },
            ].map(({ icon: Icon, title, copy, chip }) => (
              <div key={title} className="rounded-2xl border border-white/8 p-6" style={{ background: PANEL }}>
                <div className="flex items-center justify-between">
                  <Icon size={22} style={{ color: TEAL }} aria-hidden />
                  <span className="rounded-full border border-white/10 px-2.5 py-1 font-[family-name:var(--font-bike-mono)] text-[0.5rem] uppercase tracking-[0.2em] text-white/35">{chip}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-[0.83rem] leading-relaxed text-white/55">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY + PRE-ORDER ─────────────────────────────────── */}
      <section id="story" className="border-t border-white/5">
        <div className="relative h-56 overflow-hidden sm:h-72">
          <Image src="/images/concepts/store/about.webp" alt="NOVABIKE rider on an open urban road at dusk" fill sizes="100vw" className="object-cover object-[50%_30%]" />
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(11,17,20,0.9) 0%, rgba(11,17,20,0.35) 55%, transparent 100%)" }} />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-6xl px-5">
              <p className="font-[family-name:var(--font-bike-mono)] text-[0.56rem] uppercase tracking-[0.3em]" style={{ color: TEAL }}>03 — Story</p>
              <p className="mt-2 max-w-md text-2xl font-semibold leading-tight text-white sm:text-4xl">The city is not traffic. It’s a route.</p>
            </div>
          </div>
        </div>

        {/* Pre-order countdown */}
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border p-6 sm:flex-row sm:items-center sm:p-8" style={{ background: "linear-gradient(120deg, rgba(45,212,191,0.12), rgba(45,212,191,0.02) 60%)", borderColor: "rgba(45,212,191,0.3)" }}>
            <div>
              <p className="flex items-center gap-2 font-[family-name:var(--font-bike-mono)] text-[0.56rem] uppercase tracking-[0.3em]" style={{ color: TEAL }}><BatteryCharging size={13} aria-hidden /> Launch batch closes in</p>
              <p className="mt-3 font-[family-name:var(--font-bike-mono)] text-4xl font-semibold tabular-nums text-white sm:text-5xl" aria-live="polite">
                {String(cd.d).padStart(2, "0")}<span className="text-white/30">d</span> {String(cd.h).padStart(2, "0")}<span className="text-white/30">h</span> {String(cd.m).padStart(2, "0")}<span className="text-white/30">m</span> {String(cd.s).padStart(2, "0")}<span className="text-white/30">s</span>
              </p>
              <p className="mt-2 text-[0.78rem] text-white/55">First-batch pricing, priority delivery and free year of servicing.</p>
            </div>
            <button onClick={() => setModal(true)} className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-black transition hover:brightness-110" style={{ background: TEAL }}>
              Reserve — 10% off <ArrowRight size={15} aria-hidden />
            </button>
          </div>
        </div>
      </section>

      {/* ── SUBSIDIES ESTIMATOR ───────────────────────────────── */}
      <section id="subsidies" className="border-t border-white/5 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-[family-name:var(--font-bike-mono)] text-[0.56rem] uppercase tracking-[0.3em]" style={{ color: TEAL }}>04 — Subsidies</p>
            <h2 className="mt-3 text-3xl font-bold uppercase leading-[0.97] text-white sm:text-5xl">Clean mobility<br />should pay back.</h2>
            <p className="mt-4 max-w-sm text-[0.9rem] leading-relaxed text-white/55">Many Nigerian states rebate zero-emission commuting. Pick your city — see the incentive on your {active.name.split(" · ")[0]}.</p>
          </div>
          <div className="rounded-2xl border border-white/8 p-6" style={{ background: PANEL }}>
            <SelectField label="Your city" name="city" options={Object.keys(SUBSIDY)} value={city} onChange={setCity} />
            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-white/8 p-4">
                <dt className="font-[family-name:var(--font-bike-mono)] text-[0.5rem] uppercase tracking-widest text-white/35">Indicative rebate</dt>
                <dd className="mt-1.5 font-[family-name:var(--font-bike-mono)] text-xl font-semibold" style={{ color: TEAL }}>${subsidy.toLocaleString()}</dd>
              </div>
              <div className="rounded-xl border border-white/8 p-4">
                <dt className="font-[family-name:var(--font-bike-mono)] text-[0.5rem] uppercase tracking-widest text-white/35">Your effective price</dt>
                <dd className="mt-1.5 font-[family-name:var(--font-bike-mono)] text-xl font-semibold text-white">${(active.price - subsidy).toLocaleString()}</dd>
              </div>
            </dl>
            <p className="mt-4 flex items-start gap-2 text-[0.62rem] leading-relaxed text-white/30"><Navigation size={12} className="mt-0.5 shrink-0" aria-hidden />Estimates only. Final rebate depends on state programme rules and dealer processing. NOVABIKE handles the paperwork.</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="relative overflow-hidden border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 pb-4 pt-6 font-[family-name:var(--font-bike-mono)] text-[0.55rem] uppercase tracking-[0.25em] text-white/30 sm:flex-row">
          <p>© 2026 NOVABIKE — Concept study. Fictional brand.</p>
          <p className="flex items-center gap-2"><Wrench size={12} aria-hidden /> Designed &amp; built by <span style={{ color: TEAL }}>Danny Adepitan</span></p>
        </div>
        <p aria-hidden className="select-none whitespace-nowrap text-center font-bold uppercase leading-[0.85] text-white/[0.035]" style={{ fontSize: "clamp(4rem, 17vw, 11rem)" }}>Novabike</p>
      </footer>

      {/* ── RESERVE MODAL ────────────────────────────────────── */}
      <ConceptModal open={modal} onClose={() => setModal(false)} title="Reserve your NOVABIKE" accent={TEAL}>
        {state === "done" ? (
          <SuccessPanel title="Reserved." body={`Your ${active.name.split(" · ")[0]} is held with launch pricing. We’ll confirm your pickup slot within 48 hours.`} accent={TEAL} onReset={reset} />
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <Field label="Full name" name="name" autoComplete="name" placeholder="Adeola Bello" value={form.name} onChange={(v) => setForm({ ...form, name: v })} accent={TEAL} />
            <Field label="Email address" name="email" type="email" autoComplete="email" placeholder="you@domain.com" value={form.email} onChange={(v) => setForm({ ...form, email: v })} accent={TEAL} />
            <SelectField label="Model" name="model" options={(Object.keys(MODELS) as ModelKey[]).map((k) => MODELS[k].name)} value={active.name} onChange={(v) => { const found = (Object.keys(MODELS) as ModelKey[]).find((k) => MODELS[k].name === v); if (found) setModel(found); }} />
            <SelectField label="Payment" name="financing" options={["Pay once", "24-month plan", "36-month plan"]} value={form.financing} onChange={(v) => setForm({ ...form, financing: v })} />
            <SubmitButton state={state} label="Hold my bike" busyLabel="Processing…" style={{ background: TEAL }} />
            <p className="text-[0.6rem] text-white/30">Demo flow — nothing is transmitted or stored.</p>
          </form>
        )}
      </ConceptModal>

      <style>{`
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
        @media (prefers-reduced-motion: reduce) { .animate-[ticker_26s_linear_infinite] { animation: none !important; } }
      `}</style>
    </main>
  );
}
