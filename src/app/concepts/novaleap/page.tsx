"use client";

import { useState } from "react";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  ChevronRight,
  Menu,
  Phone,
  Wind,
  Gauge,
  MonitorSmartphone,
  X,
} from "lucide-react";
import {
  ConceptModal,
  Field,
  SelectField,
  SubmitButton,
  SuccessPanel,
  useSubmitState,
} from "@/components/concepts/primitives";

const VIOLET = "#a78bfa";
const INK = "#0c0e14";
const PANEL = "#12141c";

type CarKey = "phantom" | "spectra" | "pulse";

const CARS: Record<
  CarKey,
  {
    badge: string;
    name: string;
    price: string;
    bestFor: string;
    driveMood: string;
    seats: string;
    specs: [string, string][];
    blurb: string;
  }
> = {
  phantom: {
    badge: "Track Hypercar",
    name: "NV-X Phantom",
    price: "$420,000",
    bestFor: "Track-first buyers",
    driveMood: "Extreme and aggressive",
    seats: "2",
    specs: [
      ["Power", "1,180 hp"],
      ["0–60 mph", "2.1 s"],
      ["Top speed", "221 mph"],
      ["Range", "405 mi"],
    ],
    blurb: "All-electric hypercar with adaptive aero and launch telemetry — the flagship, engineered for apex discipline.",
  },
  spectra: {
    badge: "Grand Tourer",
    name: "NV-R Spectra",
    price: "$265,000",
    bestFor: "Luxury performance travel",
    driveMood: "Fast and composed",
    seats: "2+2",
    specs: [
      ["Power", "860 hp"],
      ["0–60 mph", "3.0 s"],
      ["Top speed", "198 mph"],
      ["Range", "510 mi"],
    ],
    blurb: "Long-range performance coupe — executive cabin, effortless pace, continent-crossing range.",
  },
  pulse: {
    badge: "Urban Performance EV",
    name: "NV-S Pulse",
    price: "$148,000",
    bestFor: "Daily performance use",
    driveMood: "Sharp and responsive",
    seats: "4",
    specs: [
      ["Power", "640 hp"],
      ["0–60 mph", "3.6 s"],
      ["Top speed", "171 mph"],
      ["Range", "360 mi"],
    ],
    blurb: "Compact sports EV — fast charging, route intelligence and city-to-weekend versatility.",
  },
};

function HypercarSilhouette({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 640 220" className="w-full" role="img" aria-label="Side silhouette of the NV-X Phantom hypercar">
      <defs>
        <linearGradient id="leapBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#232838" />
          <stop offset="55%" stopColor="#161a26" />
          <stop offset="100%" stopColor="#0c0e14" />
        </linearGradient>
        <linearGradient id="leapGlow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={accent} stopOpacity="0" />
          <stop offset="45%" stopColor={accent} stopOpacity="0.9" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="leapBeam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="leapGround" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ground glow — breathes with the car */}
      <ellipse className="leap-ground" cx="320" cy="205" rx="270" ry="18" fill="url(#leapGround)" />

      {/* Speed lines */}
      {[
        [10, 118, 120, 2.2, 0.5],
        [0, 142, 150, 1.6, 0.32],
        [30, 164, 96, 1.2, 0.25],
      ].map(([x, y, w, h, o], i) => (
        <rect
          key={i}
          className="leap-speed"
          style={{ animationDelay: `${i * 0.32}s` }}
          x={x as number}
          y={y as number}
          width={w as number}
          height={h as number}
          fill={accent}
          opacity={o as number}
        />
      ))}

      <defs>
        <clipPath id="leapBodyClip">
          <path d="M28 158 L58 128 C92 112 118 108 158 106 C208 60 288 44 372 46 C448 48 520 84 566 118 C606 124 626 136 626 150 L626 160 C600 168 566 171 528 171 L92 171 C58 170 36 166 28 158 Z" />
        </clipPath>
      </defs>

      {/* Body — wedge profile */}
      <path
        d="M28 158 L58 128 C92 112 118 108 158 106 C208 60 288 44 372 46 C448 48 520 84 566 118 C606 124 626 136 626 150 L626 160 C600 168 566 171 528 171 L92 171 C58 170 36 166 28 158 Z"
        fill="url(#leapBody)"
        stroke={accent}
        strokeOpacity="0.55"
        strokeWidth="1.6"
      />
      {/* Light sweep across the body — clipped, alternating */}
      <g className="leap-beam" clipPath="url(#leapBodyClip)" opacity="0.85">
        <rect x="-180" y="20" width="150" height="150" fill="url(#leapBeam)" transform="skewX(-18)" />
      </g>
      {/* Canopy */}
      <path
        d="M218 104 C258 68 322 56 388 58 C438 62 492 82 528 102 C428 96 312 98 218 104 Z"
        fill="#0a0c12"
        stroke={accent}
        strokeOpacity="0.4"
      />
      {/* Canopy glint */}
      <path d="M248 92 C300 74 356 68 420 72" stroke={accent} strokeOpacity="0.55" strokeWidth="1.4" fill="none" />
      {/* Beltline neon */}
      <path d="M44 152 L600 152" stroke="url(#leapGlow)" strokeWidth="2.6" strokeOpacity="0.9" />
      {/* Headlight flare at the nose */}
      <ellipse className="leap-flare" cx="40" cy="150" rx="16" ry="5.5" fill={accent} />
      <line className="leap-headbeam" x1="30" y1="149" x2="-60" y2="142" stroke={accent} strokeWidth="3" strokeOpacity="0.55" />

      {/* Wheels — dashed rims rotate continuously */}
      {[168, 478].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="158" r="36" fill="#05070c" stroke="#2a2f3d" strokeWidth="3" />
          <circle
            className="leap-wheel"
            cx={cx}
            cy="158"
            r="22"
            fill="none"
            stroke={accent}
            strokeOpacity="0.8"
            strokeWidth="2.4"
            strokeDasharray="6 7"
          />
          <circle cx={cx} cy="158" r="5.5" fill={accent} />
        </g>
      ))}

      {/* Aero fin */}
      <path d="M520 112 L596 96 L556 118 Z" fill="#1c2130" stroke={accent} strokeOpacity="0.5" />
    </svg>
  );
}

export default function NovaleapPage() {
  const [car, setCar] = useState<CarKey>("phantom");
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ offset: ["start start", "end start"] });
  const carDriftX = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const carScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.16, 0.3, 0.05]);
  const blurValue = useTransform(scrollYProgress, [0, 0.5, 1], [0, 2.5, 6]);
  const beamBlur = useMotionTemplate`blur(${blurValue}px)`;
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", financing: "Finance — 36 months" });
  const { state, submit, reset } = useSubmitState();
  const active = CARS[car];

  return (
    <main style={{ background: INK }} className="min-h-dvh text-[#e9e9ef]">
      {/* ── NAV ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0c0e14]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#top" className="flex items-center gap-2">
            <span aria-hidden className="h-5 w-5 rotate-45 border-2" style={{ borderColor: VIOLET }} />
            <span className="font-[family-name:var(--font-leap-display)] text-lg uppercase tracking-[0.06em] text-white">NOVA<span style={{ color: VIOLET }}>LEAP</span></span>
          </a>
          <nav aria-label="Sections" className="hidden items-center gap-7 font-[family-name:var(--font-leap-mono)] text-[0.62rem] uppercase tracking-[0.3em] text-white/50 md:flex">
            {[["Garage", "#garage"], ["Compare", "#compare"], ["Technology", "#technology"]].map(([l, h]) => (
              <a key={h} href={h} className="transition hover:text-white">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setModal(true)} className="hidden rounded-md px-5 py-2.5 font-[family-name:var(--font-leap-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-black transition hover:brightness-110 sm:flex sm:items-center sm:gap-2" style={{ background: VIOLET }}>
              <Phone size={13} aria-hidden /> Book a call
            </button>
            <button onClick={() => setMenu((v) => !v)} aria-label="Toggle menu" aria-expanded={menu} className="rounded-md border border-white/10 p-2 text-white/70 md:hidden">
              {menu ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {menu && (
          <div className="border-t border-white/5 px-5 py-4 md:hidden">
            {[["Garage", "#garage"], ["Compare", "#compare"], ["Technology", "#technology"]].map(([l, h]) => (
              <a key={h} href={h} onClick={() => setMenu(false)} className="block border-b border-white/5 py-3 font-[family-name:var(--font-leap-mono)] text-xs uppercase tracking-[0.3em] text-white/70">{l}</a>
            ))}
            <button onClick={() => { setMenu(false); setModal(true); }} className="mt-4 w-full rounded-md px-5 py-3 font-[family-name:var(--font-leap-mono)] text-xs font-semibold uppercase tracking-[0.25em] text-black" style={{ background: VIOLET }}>Book a call</button>
          </div>
        )}
      </header>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section id="top" className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(70% 60% at 65% 45%, rgba(167,139,250,0.10) 0%, transparent 60%)" }} />
        <div className="mx-auto max-w-6xl px-5 pb-10 pt-10 lg:pb-14 lg:pt-14">
          <p className="flex items-center gap-3 font-[family-name:var(--font-leap-mono)] text-[0.56rem] uppercase tracking-[0.32em] text-white/40">
            <span className="inline-block h-px w-10" style={{ background: VIOLET }} aria-hidden />
            2026 Release — NV-X Phantom
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-leap-display)] uppercase leading-[0.86] text-white">
            <span className="block text-[clamp(3.6rem,15vw,9rem)]">NV-X</span>
            <span className="block text-[clamp(3.6rem,15vw,9rem)]" style={{ color: VIOLET }}>Phantom<span className="text-white/25">.</span></span>
          </h1>
          <p className="mt-5 max-w-md text-[0.94rem] leading-relaxed text-white/60">
            All-electric hypercar engineered for apex discipline — adaptive aero,
            launch telemetry and one silence that folds into 221 mph.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 font-[family-name:var(--font-leap-mono)] text-[0.58rem] uppercase tracking-[0.2em] text-white/60">
            {[["1,180 HP"], ["0–60 · 2.1s"], ["221 MPH"], ["405 MI"]].map(([s]) => (
              <span key={s} className="rounded-md border border-white/10 px-3 py-2">{s}</span>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={() => setModal(true)} className="group inline-flex items-center gap-2 px-7 py-4 font-[family-name:var(--font-leap-mono)] text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-black transition hover:brightness-110" style={{ background: VIOLET }}>
              Reserve yours <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden />
            </button>
            <a href="#garage" className="rounded-md border border-white/15 px-7 py-4 font-[family-name:var(--font-leap-mono)] text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-white/75 transition hover:text-white">View garage</a>
          </div>
        </div>

        {/* Silhouette stage — drives in, then idles on the road; camera drifts with scroll */}
        <motion.div
          className="relative mx-auto -mt-2 max-w-6xl px-2 pb-10"
          initial={reduce ? false : { x: -160, opacity: 0 }}
          whileInView={reduce ? undefined : { x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ type: "spring", stiffness: 55, damping: 15, mass: 1.5 }}
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-40 w-full -translate-x-1/2 -translate-y-1/2"
            style={{ background: `radial-gradient(50% 100% at 50% 50%, rgba(167,139,250,0.16) 0%, transparent 70%)`, opacity: reduce ? 0.16 : glowOpacity }}
          />
          <motion.div
            animate={reduce ? undefined : { y: [0, -7, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            style={reduce ? undefined : { x: carDriftX, scale: carScale, filter: `blur(${beamBlur}px)` }}
          >
            <HypercarSilhouette accent={VIOLET} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── GARAGE (master–detail) ─────────────────────────────── */}
      <section id="garage" className="border-t border-white/5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="font-[family-name:var(--font-leap-mono)] text-[0.56rem] uppercase tracking-[0.32em]" style={{ color: VIOLET }}>01 — The Garage</p>
          <h2 className="mt-3 font-[family-name:var(--font-leap-display)] text-4xl uppercase leading-[0.9] text-white sm:text-6xl">Choose your<br />line.</h2>

          <div className="mt-10 grid gap-4 lg:grid-cols-12">
            {/* Selector */}
            <div role="tablist" aria-label="Models" aria-orientation="vertical" className="flex gap-2 overflow-x-auto pb-1 lg:col-span-4 lg:flex-col">
              {(Object.keys(CARS) as CarKey[]).map((k) => {
                const c = CARS[k];
                const selected = k === car;
                return (
                  <button
                    key={k}
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setCar(k)}
                    className="group min-w-56 rounded-2xl border p-5 text-left transition-all duration-300 lg:min-w-0"
                    style={{ background: PANEL, borderColor: selected ? `${VIOLET}77` : "rgba(255,255,255,0.07)", boxShadow: selected ? "0 0 50px -20px rgba(167,139,250,0.35)" : undefined }}
                  >
                    <p className="font-[family-name:var(--font-leap-mono)] text-[0.5rem] uppercase tracking-[0.28em]" style={{ color: selected ? VIOLET : "rgba(255,255,255,0.35)" }}>{c.badge}</p>
                    <p className="mt-2 font-[family-name:var(--font-leap-display)] text-2xl uppercase leading-none text-white">{c.name}</p>
                    <p className="mt-3 flex items-center justify-between border-t border-white/8 pt-3">
                      <span className="font-[family-name:var(--font-leap-mono)] text-[0.8rem] text-white/60">{c.price}</span>
                      <ArrowRight size={14} className={`transition-all duration-300 ${selected ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`} style={{ color: VIOLET }} aria-hidden />
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Spec panel */}
            <div className="rounded-2xl border border-white/8 p-6 sm:p-8 lg:col-span-8" style={{ background: PANEL }} role="tabpanel">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-[family-name:var(--font-leap-mono)] text-[0.52rem] uppercase tracking-[0.3em] text-white/35">{active.badge}</p>
                  <h3 className="mt-2 font-[family-name:var(--font-leap-display)] text-4xl uppercase leading-[0.9] text-white sm:text-6xl">{active.name}</h3>
                </div>
                <p className="font-[family-name:var(--font-leap-mono)] text-2xl font-semibold" style={{ color: VIOLET }}>{active.price}</p>
              </div>
              <p className="mt-4 max-w-lg text-[0.9rem] leading-relaxed text-white/60">{active.blurb}</p>
              <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/8 bg-white/8 sm:grid-cols-4">
                {active.specs.map(([k, v]) => (
                  <div key={k} className="bg-[#12141c] p-4">
                    <dt className="font-[family-name:var(--font-leap-mono)] text-[0.48rem] uppercase tracking-[0.22em] text-white/35">{k}</dt>
                    <dd className="mt-1.5 font-[family-name:var(--font-leap-mono)] text-lg font-semibold text-white">{v}</dd>
                  </div>
                ))}
              </dl>
              <dl className="mt-5 grid grid-cols-1 gap-3 text-[0.78rem] text-white/55 sm:grid-cols-3">
                {[["Best for", active.bestFor], ["Drive mood", active.driveMood], ["Seating", active.seats]].map(([k, v]) => (
                  <div key={k} className="rounded-lg border border-white/8 p-3.5">
                    <dt className="font-[family-name:var(--font-leap-mono)] text-[0.48rem] uppercase tracking-[0.22em] text-white/35">{k}</dt>
                    <dd className="mt-1 text-white/80">{v}</dd>
                  </div>
                ))}
              </dl>
              <button onClick={() => setModal(true)} className="mt-6 inline-flex items-center gap-2 px-6 py-4 font-[family-name:var(--font-leap-mono)] text-[0.66rem] font-semibold uppercase tracking-[0.25em] text-black transition hover:brightness-110" style={{ background: VIOLET }}>
                Reserve {active.name} <ArrowRight size={14} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARE MATRIX ─────────────────────────────────────── */}
      <section id="compare" className="border-t border-white/5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="font-[family-name:var(--font-leap-mono)] text-[0.56rem] uppercase tracking-[0.32em]" style={{ color: VIOLET }}>02 — Compare</p>
          <h2 className="mt-3 font-[family-name:var(--font-leap-display)] text-4xl uppercase leading-[0.9] text-white sm:text-6xl">Specs, side<br />by side.</h2>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-white/8" style={{ background: PANEL }}>
            <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
              <caption className="sr-only">NovaLeap model comparison — NV-X Phantom vs NV-R Spectra vs NV-S Pulse</caption>
              <thead>
                <tr className="border-b border-white/10">
                  <th scope="col" className="p-4 font-[family-name:var(--font-leap-mono)] text-[0.55rem] uppercase tracking-[0.25em] text-white/35">Metric</th>
                  {(Object.keys(CARS) as CarKey[]).map((k) => (
                    <th key={k} scope="col" className="p-4">
                      <span className="block font-[family-name:var(--font-leap-mono)] text-[0.5rem] uppercase tracking-[0.25em] text-white/35">{CARS[k].badge}</span>
                      <span className="mt-0.5 block font-semibold text-white">{CARS[k].name}{k === "phantom" && <span className="ml-2 rounded px-1.5 py-0.5 align-middle text-[0.45rem] font-bold uppercase tracking-widest text-black" style={{ background: VIOLET }}>Flagship</span>}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-[family-name:var(--font-leap-mono)] text-[0.78rem] text-white/80">
                {[
                  ["Power", "1,180 hp", "860 hp", "640 hp"],
                  ["0–60 mph", "2.1 s", "3.0 s", "3.6 s"],
                  ["Top speed", "221 mph", "198 mph", "171 mph"],
                  ["Range (EPA)", "405 mi", "510 mi", "360 mi"],
                  ["Seating", "2", "2+2", "4"],
                  ["Best for", "Track-first buyers", "Luxury GT travel", "Daily performance"],
                  ["Price", "$420,000", "$265,000", "$148,000"],
                ].map(([row, ...cells]) => (
                  <tr key={row as string} className="border-b border-white/5 transition-colors last:border-b-0 hover:bg-white/[0.03]">
                    <th scope="row" className="p-4 text-[0.55rem] font-medium uppercase tracking-[0.25em] text-white/40">{row}</th>
                    {cells.map((cell, i) => (
                      <td key={i} className="p-4" style={i === 0 ? { color: VIOLET } : undefined}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 font-[family-name:var(--font-leap-mono)] text-[0.55rem] uppercase tracking-[0.25em] text-white/25">All figures manufacturer-claimed · concept page</p>
        </div>
      </section>

      {/* ── TECHNOLOGY ───────────────────────────────────────── */}
      <section id="technology" className="border-t border-white/5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="font-[family-name:var(--font-leap-mono)] text-[0.56rem] uppercase tracking-[0.32em]" style={{ color: VIOLET }}>03 — Technology</p>
          <h2 className="mt-3 font-[family-name:var(--font-leap-display)] text-4xl uppercase leading-[0.9] text-white sm:text-6xl">Futuristic.<br />Believable.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { icon: Wind, title: "Adaptive Aero", copy: "Live body adjustments for braking, cornering and high-speed stability — upforce on demand, drag on tap." },
              { icon: Gauge, title: "Driver Intelligence", copy: "Telemetry dashboards, predictive maintenance and personalised drive modes that learn your hands." },
              { icon: MonitorSmartphone, title: "Cabin UX", copy: "Minimal cockpit hierarchy — the instruments recede, the road remains. Focus is the luxury." },
            ].map(({ icon: Icon, title, copy }) => (
              <div key={title} className="rounded-2xl border border-white/8 p-6" style={{ background: PANEL }}>
                <Icon size={22} style={{ color: VIOLET }} aria-hidden />
                <h3 className="mt-4 font-semibold text-white">{title}</h3>
                <p className="mt-2 text-[0.84rem] leading-relaxed text-white/55">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="relative overflow-hidden border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 pb-4 pt-6 font-[family-name:var(--font-leap-mono)] text-[0.55rem] uppercase tracking-[0.3em] text-white/30 sm:flex-row">
          <p>© 2026 NOVALEAP — Concept study. Fictional marque.</p>
          <p>Reserved builds via <span style={{ color: VIOLET }}>NOVALEAP Studio, Lagos</span></p>
        </div>
        <p aria-hidden className="select-none whitespace-nowrap text-center font-[family-name:var(--font-leap-display)] uppercase leading-[0.8] text-white/[0.035]" style={{ fontSize: "clamp(4rem, 18vw, 12rem)" }}>Novaleap</p>
      </footer>

      {/* ── RESERVATION DESK ──────────────────────────────────── */}
      <ConceptModal open={modal} onClose={() => setModal(false)} title="Reservation Desk" accent={VIOLET}>
        {state === "done" ? (
          <SuccessPanel title="Build slot requested." body={`A marque specialist will reach out within 24h to schedule your ${active.name} private reveal.`} accent={VIOLET} onReset={reset} />
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <Field label="Full name" name="name" autoComplete="name" placeholder="Kunle Adebayo" value={form.name} onChange={(v) => setForm({ ...form, name: v })} accent={VIOLET} />
            <Field label="Email address" name="email" type="email" autoComplete="email" placeholder="you@domain.com" value={form.email} onChange={(v) => setForm({ ...form, email: v })} accent={VIOLET} />
            <SelectField label="Model" name="model" options={(Object.keys(CARS) as CarKey[]).map((k) => CARS[k].name)} value={active.name} onChange={(v) => { const found = (Object.keys(CARS) as CarKey[]).find((k) => CARS[k].name === v); if (found) setCar(found); }} />
            <SelectField label="Financing" name="financing" options={["Finance — 36 months", "Finance — 48 months", "Outright purchase", "Fleet / corporate"]} value={form.financing} onChange={(v) => setForm({ ...form, financing: v })} />
            <SubmitButton state={state} label="Request my build slot" busyLabel="Requesting…" style={{ background: VIOLET }} />
            <p className="text-[0.6rem] text-white/30">Demo flow — nothing is transmitted or stored. NOVALEAP is a concept study.</p>
          </form>
        )}
      </ConceptModal>

      <style>{`
        .leap-wheel {
          transform-box: fill-box;
          transform-origin: center;
          animation: leap-spin 2.6s linear infinite;
        }
        @keyframes leap-spin {
          to { transform: rotate(360deg); }
        }
        .leap-speed {
          animation: leap-dash 1.35s ease-out infinite;
        }
        @keyframes leap-dash {
          0% { transform: translateX(-16px); opacity: 0; }
          35% { opacity: 1; }
          100% { transform: translateX(58px); opacity: 0; }
        }
        .leap-beam {
          animation: leap-sweep 3.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes leap-sweep {
          0%, 55% { transform: translateX(0); opacity: 0; }
          62% { opacity: 0.9; }
          78%, 100% { transform: translateX(840px); opacity: 0; }
        }
        .leap-flare {
          animation: leap-flare 2.8s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        @keyframes leap-flare {
          0%, 100% { opacity: 0.55; transform: scaleX(1); }
          42% { opacity: 1; transform: scaleX(1.55); }
          55% { opacity: 0.7; transform: scaleX(1.18); }
        }
        .leap-headbeam {
          animation: leap-headbeam 2.8s ease-in-out infinite;
        }
        @keyframes leap-headbeam {
          0%, 100% { stroke-opacity: 0.18; }
          42% { stroke-opacity: 0.65; }
        }
        .leap-ground {
          animation: leap-ground 3.8s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        @keyframes leap-ground {
          0%, 100% { opacity: 0.75; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .leap-wheel, .leap-speed, .leap-beam, .leap-flare, .leap-headbeam, .leap-ground { animation: none !important; }
        }
      `}</style>
    </main>
  );
}
