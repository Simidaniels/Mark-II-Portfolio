"use client";

import { useState } from "react";
import {
  ArrowRight,
  Ban,
  Briefcase,
  Building2,
  Check,
  Eye,
  EyeOff,
  Landmark,
  Lock,
  Menu,
  Plane,
  ShieldCheck,
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

const BRASS = "#c9a86a";
const INK = "#0b1120";
const PANEL = "#101830";
const LINE = "rgba(233,230,222,0.08)";

const ALLOCATION = [
  ["Cash reserve", 22, "+0.4%", "Stable"],
  ["Equities", 38, "+8.6%", "Growing"],
  ["Private funds", 18, "+5.1%", "Locked"],
  ["Digital assets", 12, "+16.2%", "Volatile"],
  ["Real assets", 10, "+4.3%", "Defensive"],
] as const;

const INITIAL_APPROVALS = [
  { id: "a1", label: "Outbound wire — $86,400", to: "Meridian Acquisitions Ltd", time: "Today · 09:12" },
  { id: "a2", label: "Transfer — $12,050", to: "CHEUR — Furniture consignment", time: "Yesterday · 16:40" },
  { id: "a3", label: "FX order — EUR 40,000", to: "Estate settlement, CH-Zug", time: "Yesterday · 11:05" },
];

export default function NovaFinancePage() {
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const [masked, setMasked] = useState(true);
  const [frozen, setFrozen] = useState(false);
  const [approvals, setApprovals] = useState(INITIAL_APPROVALS);
  const [form, setForm] = useState({ name: "", email: "", focus: "Portfolio review" });
  const { state, submit, reset } = useSubmitState();

  const mask = (v: string) => (masked ? "••••••••" : v);

  return (
    <main style={{ background: INK }} className="min-h-dvh text-[#e9e6de]">
      {/* ── NAV ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0b1120]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#top" className="flex items-center gap-2.5">
            <Landmark size={17} style={{ color: BRASS }} aria-hidden />
            <span className="text-[0.8rem] font-semibold tracking-[0.2em] text-white">NOVA <span style={{ color: BRASS }}>FINANCE</span></span>
            <span className="hidden items-center gap-1 rounded-full border px-2 py-0.5 font-[family-name:var(--font-finance-mono)] text-[0.48rem] uppercase tracking-[0.25em] sm:flex" style={{ borderColor: `${BRASS}55`, color: BRASS }}>
              <Lock size={9} aria-hidden /> Private
            </span>
          </a>
          <nav aria-label="Sections" className="hidden items-center gap-7 font-[family-name:var(--font-finance-mono)] text-[0.58rem] uppercase tracking-[0.28em] text-white/50 md:flex">
            {[["Products", "#products"], ["Dashboard", "#dashboard"], ["Allocation", "#allocation"]].map(([l, h]) => (
              <a key={h} href={h} className="transition hover:text-white">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setModal(true)} className="hidden rounded-md px-5 py-2.5 text-[0.7rem] font-semibold text-black transition hover:brightness-110 sm:block" style={{ background: BRASS }}>
              Book a call
            </button>
            <button onClick={() => setMenu((v) => !v)} aria-label="Toggle menu" aria-expanded={menu} className="rounded-md border border-white/10 p-2 text-white/70 md:hidden">
              {menu ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {menu && (
          <div className="border-t border-white/5 px-5 py-4 md:hidden">
            {[["Products", "#products"], ["Dashboard", "#dashboard"], ["Allocation", "#allocation"]].map(([l, h]) => (
              <a key={h} href={h} onClick={() => setMenu(false)} className="block border-b border-white/5 py-3 font-[family-name:var(--font-finance-mono)] text-xs uppercase tracking-[0.28em] text-white/70">{l}</a>
            ))}
            <button onClick={() => { setMenu(false); setModal(true); }} className="mt-4 w-full rounded-md px-5 py-3 text-xs font-semibold text-black" style={{ background: BRASS }}>Book a call</button>
          </div>
        )}
      </header>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section id="top" className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(75% 60% at 82% 20%, rgba(201,168,106,0.10) 0%, transparent 60%)" }} />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-14 pt-12 lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-16">
          <div className="lg:col-span-6">
            <p className="flex items-center gap-3 font-[family-name:var(--font-finance-mono)] text-[0.56rem] uppercase tracking-[0.32em]" style={{ color: BRASS }}>
              <span className="inline-block h-px w-10" style={{ background: BRASS }} aria-hidden />
              Private Banking — Lagos · Zurich
            </p>
            <h1 className="mt-6 font-[family-name:var(--font-finance-serif)] leading-[0.98] text-white">
              <span className="block text-[clamp(2.6rem,9vw,5rem)] font-semibold">Wealth,</span>
              <span className="block text-[clamp(2.6rem,9vw,5rem)]">made</span>
              <span className="block text-[clamp(2.6rem,9vw,5rem)]"><em style={{ color: BRASS }}>legible.</em></span>
            </h1>
            <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-white/60">
              A calm, high-trust home for serious capital — portfolio visibility,
              card control and advisory access in one considered interface.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#products" className="group inline-flex items-center gap-2 rounded-md px-6 py-4 text-[0.72rem] font-semibold text-black transition hover:brightness-110" style={{ background: BRASS }}>
                Explore products <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden />
              </a>
              <button onClick={() => setModal(true)} className="rounded-md border border-white/15 px-6 py-4 text-[0.72rem] font-semibold text-white/80 transition hover:border-[#c9a86a] hover:text-[#c9a86a]">
                Book advisory
              </button>
            </div>
            <p className="mt-6 flex items-center gap-2 font-[family-name:var(--font-finance-mono)] text-[0.52rem] uppercase tracking-[0.26em] text-white/30">
              <ShieldCheck size={12} style={{ color: BRASS }} aria-hidden /> Client illustration — figures are fictional
            </p>
          </div>

          {/* Net-worth card */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border p-6 sm:p-7" style={{ background: PANEL, borderColor: LINE, boxShadow: "0 50px 100px -40px rgba(0,0,0,0.9)" }}>
              <div className="flex items-center justify-between">
                <p className="font-[family-name:var(--font-finance-mono)] text-[0.55rem] uppercase tracking-[0.3em] text-white/40">Net worth — consolidated</p>
                <button onClick={() => setMasked((v) => !v)} aria-pressed={!masked} aria-label={masked ? "Show figures" : "Hide figures"} className="rounded-md border border-white/10 p-2 text-white/50 transition hover:text-white">
                  {masked ? <Eye size={14} aria-hidden /> : <EyeOff size={14} aria-hidden />}
                </button>
              </div>
              <p className="mt-4 font-[family-name:var(--font-finance-mono)] text-4xl font-semibold tabular-nums text-white sm:text-5xl">{mask("$4,284,910")}</p>
              <p className="mt-2 text-[0.75rem]"><span style={{ color: BRASS }} className="font-semibold">+12.4%</span> <span className="text-white/40">this quarter · all entities</span></p>

              {/* Donut */}
              <div className="mt-6 flex items-center gap-6 border-t pt-6" style={{ borderColor: LINE }}>
                <svg viewBox="0 0 120 120" className="size-28 shrink-0 -rotate-90" role="img" aria-label="Allocation: equities 38 percent, cash 22 percent, funds 18 percent, digital 12 percent, real assets 10 percent">
                  {(() => {
                    const R = 46, C = 2 * Math.PI * R;
                    const segs = [
                      { pct: 0.38, color: "#c9a86a" },
                      { pct: 0.22, color: "#8b9dc3" },
                      { pct: 0.18, color: "#5e6f8f" },
                      { pct: 0.12, color: "#3c4a5e" },
                      { pct: 0.10, color: "#232c3d" },
                    ];
                    let offset = 0;
                    return segs.map((s, i) => {
                      const dash = s.pct * C;
                      const el = (
                        <circle key={i} cx="60" cy="60" r={R} fill="none" stroke={s.color} strokeWidth="16" strokeDasharray={`${dash} ${C - dash}`} strokeDashoffset={-offset} />
                      );
                      offset += dash;
                      return el;
                    });
                  })()}
                  <circle cx="60" cy="60" r="26" fill={PANEL} />
                </svg>
                <ul className="flex-1 space-y-1.5 font-[family-name:var(--font-finance-mono)] text-[0.58rem] uppercase tracking-[0.14em] text-white/55">
                  {[["Equities", "38%"], ["Cash", "22%"], ["Funds", "18%"], ["Digital", "12%"], ["Real assets", "10%"]].map(([l, v]) => (
                    <li key={l} className="flex items-center justify-between border-b border-white/5 pb-1.5"><span>{l}</span><span className="text-white/80">{mask(v)}</span></li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-xl border px-4 py-3 text-[0.68rem]" style={{ borderColor: LINE, background: "rgba(201,168,106,0.05)" }}>
                <span className="flex items-center gap-2 text-white/55"><Plane size={13} style={{ color: BRASS }} aria-hidden /> Quarterly review — scheduled Apr 30</span>
                <button onClick={() => setModal(true)} className="font-[family-name:var(--font-finance-mono)] text-[0.52rem] uppercase tracking-[0.22em]" style={{ color: BRASS }}>Confirm →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT SUITE ─────────────────────────────────────── */}
      <section id="products" className="border-t border-white/5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="font-[family-name:var(--font-finance-mono)] text-[0.55rem] uppercase tracking-[0.32em]" style={{ color: BRASS }}>01 — Product Suite</p>
          <h2 className="mt-3 font-[family-name:var(--font-finance-serif)] text-4xl font-semibold text-white sm:text-6xl">Arranged the way<br />you actually <em style={{ color: BRASS }}>browse.</em></h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { icon: Landmark, title: "Private Banking", copy: "High-trust account management, premium cards, transfer control and tailored relationship support.", chip: "From $250k relationship" },
              { icon: Briefcase, title: "Wealth Portfolio", copy: "Multi-asset views across equities, funds and digital assets — with quiet performance attribution.", chip: "Discretionary or advisory" },
              { icon: Building2, title: "Business Treasury", copy: "Cash movement, invoice scheduling and liquidity planning for founders and operators.", chip: "NGN · USD · EUR · GBP" },
            ].map(({ icon: Icon, title, copy, chip }) => (
              <article key={title} className="group rounded-2xl border p-6 transition-colors duration-300 hover:border-[#c9a86a]/40" style={{ background: PANEL, borderColor: LINE }}>
                <Icon size={22} style={{ color: BRASS }} aria-hidden />
                <h3 className="mt-5 font-[family-name:var(--font-finance-serif)] text-2xl text-white">{title}</h3>
                <p className="mt-2 text-[0.83rem] leading-relaxed text-white/55">{copy}</p>
                <p className="mt-5 inline-block rounded-full border px-3 py-1.5 font-[family-name:var(--font-finance-mono)] text-[0.48rem] uppercase tracking-[0.24em] text-white/40" style={{ borderColor: LINE }}>{chip}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── DASHBOARD (functional) ────────────────────────────── */}
      <section id="dashboard" className="border-t border-white/5 py-16 sm:py-20" style={{ background: "linear-gradient(180deg, #0b1120 0%, #0d1428 50%, #0b1120 100%)" }}>
        <div className="mx-auto max-w-6xl px-5">
          <p className="font-[family-name:var(--font-finance-mono)] text-[0.55rem] uppercase tracking-[0.32em]" style={{ color: BRASS }}>02 — Client Dashboard</p>
          <h2 className="mt-3 font-[family-name:var(--font-finance-serif)] text-4xl font-semibold text-white sm:text-6xl">Control, <em style={{ color: BRASS }}>quietly.</em></h2>

          <div className="mt-10 grid gap-4 lg:grid-cols-12">
            {/* Card control */}
            <div className="rounded-2xl border p-6 lg:col-span-4" style={{ background: PANEL, borderColor: LINE }}>
              <div className="flex items-center justify-between">
                <p className="font-[family-name:var(--font-finance-mono)] text-[0.55rem] uppercase tracking-[0.3em] text-white/40">Nova Debit — Black</p>
                <span className="font-[family-name:var(--font-finance-mono)] text-[0.48rem] uppercase tracking-[0.22em] text-white/30">•• 4291</span>
              </div>
              <div
                className="relative mt-5 overflow-hidden rounded-2xl border p-5 transition-colors duration-500"
                style={{ background: frozen ? "linear-gradient(145deg, #2a2f38, #14171f)" : "linear-gradient(145deg, #1e2540, #0b0e1a)", borderColor: frozen ? "rgba(255,255,255,0.08)" : `${BRASS}44` }}
              >
                <p className="font-[family-name:var(--font-finance-mono)] text-[0.48rem] uppercase tracking-[0.3em] text-white/40">{frozen ? "Card frozen" : "Active — worldwide"}</p>
                <p className="mt-6 font-[family-name:var(--font-finance-mono)] text-lg tracking-[0.3em] text-white/85">{mask("4291 ···· ···· 0097")}</p>
                <div className="mt-5 flex items-center justify-between">
                  <p className="font-[family-name:var(--font-finance-mono)] text-[0.52rem] uppercase tracking-[0.25em] text-white/35">DACI ADEBAYO</p>
                  <Landmark size={18} style={{ color: frozen ? "rgba(255,255,255,0.25)" : BRASS }} aria-hidden />
                </div>
                {frozen && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-[1px]">
                    <p className="rounded-full border border-white/20 px-4 py-1.5 font-[family-name:var(--font-finance-mono)] text-[0.55rem] uppercase tracking-[0.3em] text-white/80"><Ban size={11} className="mr-1 inline" aria-hidden /> Frozen</p>
                  </div>
                )}
              </div>
              <button
                role="switch"
                aria-checked={frozen}
                onClick={() => setFrozen((v) => !v)}
                className="mt-5 flex w-full items-center justify-between rounded-xl border px-4 py-3.5 transition-colors"
                style={{ borderColor: frozen ? `${BRASS}66` : LINE, background: frozen ? "rgba(201,168,106,0.08)" : "transparent" }}
              >
                <span className="text-[0.78rem] text-white/70">{frozen ? "Unfreeze card" : "Freeze card instantly"}</span>
                <span aria-hidden className="relative h-6 w-11 rounded-full border border-white/15 transition-colors" style={{ background: frozen ? BRASS : "rgba(255,255,255,0.08)" }}>
                  <span className="absolute top-0.5 size-[18px] rounded-full bg-white shadow transition-all" style={{ left: frozen ? 21 : 2 }} />
                </span>
              </button>
              <p className="mt-3 text-[0.62rem] leading-relaxed text-white/30">Freeze halts all authorisations instantly. Settlement follows network rules.</p>
            </div>

            {/* Approvals */}
            <div className="rounded-2xl border p-6 lg:col-span-5" style={{ background: PANEL, borderColor: LINE }}>
              <p className="flex items-center justify-between font-[family-name:var(--font-finance-mono)] text-[0.55rem] uppercase tracking-[0.3em] text-white/40">
                Transfers awaiting approval
                <span className="rounded-full border px-2 py-0.5 text-[0.55rem]" style={{ borderColor: `${BRASS}55`, color: BRASS }}>{approvals.length}</span>
              </p>
              <ul className="mt-4 space-y-3">
                {approvals.length === 0 && <li className="rounded-xl border border-white/8 p-5 text-center text-[0.8rem] text-white/40">Inbox zero — every transfer is authorised.</li>}
                {approvals.map((a) => (
                  <li key={a.id} className="rounded-xl border p-4" style={{ borderColor: LINE }}>
                    <p className="text-[0.82rem] font-medium text-white/85">{a.label}</p>
                    <p className="mt-1 font-[family-name:var(--font-finance-mono)] text-[0.52rem] uppercase tracking-[0.18em] text-white/35">{a.to} · {a.time}</p>
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => setApprovals((v) => v.filter((x) => x.id !== a.id))} className="flex items-center gap-1.5 rounded-md px-4 py-2 font-[family-name:var(--font-finance-mono)] text-[0.55rem] uppercase tracking-[0.2em] text-black transition hover:brightness-110" style={{ background: BRASS }}><Check size={12} aria-hidden /> Approve</button>
                      <button onClick={() => setApprovals((v) => v.filter((x) => x.id !== a.id))} className="rounded-md border border-white/12 px-4 py-2 font-[family-name:var(--font-finance-mono)] text-[0.55rem] uppercase tracking-[0.2em] text-white/60 transition hover:border-white/30 hover:text-white">Reject</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Wallets */}
            <div className="rounded-2xl border p-6 lg:col-span-3" style={{ background: PANEL, borderColor: LINE }}>
              <p className="font-[family-name:var(--font-finance-mono)] text-[0.55rem] uppercase tracking-[0.3em] text-white/40">Asset wallets</p>
              <ul className="mt-4 space-y-4">
                {[["NGN", "84,210,000"], ["USD", "1,940,300"], ["EUR", "612,400"]].map(([ccy, amt]) => (
                  <li key={ccy} className="flex items-baseline justify-between border-b pb-3" style={{ borderColor: LINE }}>
                    <span className="font-[family-name:var(--font-finance-mono)] text-[0.7rem] uppercase tracking-[0.25em] text-white/45">{ccy}</span>
                    <span className="font-[family-name:var(--font-finance-mono)] tabular-nums text-white/90">{mask(amt)}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => setModal(true)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-md border py-3 font-[family-name:var(--font-finance-mono)] text-[0.55rem] uppercase tracking-[0.25em] transition" style={{ borderColor: `${BRASS}55`, color: BRASS }}>
                Move funds <ArrowRight size={13} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALLOCATION TABLE ──────────────────────────────────── */}
      <section id="allocation" className="border-t border-white/5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="font-[family-name:var(--font-finance-mono)] text-[0.55rem] uppercase tracking-[0.32em]" style={{ color: BRASS }}>03 — Allocation & Signals</p>
              <h2 className="mt-3 font-[family-name:var(--font-finance-serif)] text-4xl font-semibold text-white sm:text-6xl">The quarter,<br /><em style={{ color: BRASS }}>summarised.</em></h2>
            </div>
            <p className="hidden font-[family-name:var(--font-finance-mono)] text-[0.5rem] uppercase leading-relaxed tracking-[0.25em] text-white/30 md:block">As of last<br />quarter close</p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border" style={{ background: PANEL, borderColor: LINE }}>
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Portfolio allocation and quarterly performance</caption>
              <thead>
                <tr className="border-b border-white/10 font-[family-name:var(--font-finance-mono)] text-[0.52rem] uppercase tracking-[0.25em] text-white/35">
                  <th scope="col" className="p-4">Segment</th>
                  <th scope="col" className="p-4">Weight</th>
                  <th scope="col" className="hidden p-4 sm:table-cell">Quarter</th>
                  <th scope="col" className="p-4">Posture</th>
                </tr>
              </thead>
              <tbody>
                {ALLOCATION.map(([seg, weight, qoq, posture]) => (
                  <tr key={seg as string} className="border-b border-white/5 transition-colors last:border-b-0 hover:bg-white/[0.02]">
                    <th scope="row" className="p-4 font-medium text-white/85">{seg}</th>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="w-8 font-[family-name:var(--font-finance-mono)] tabular-nums text-white/80">{weight}%</span>
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/8 sm:w-40">
                          <div className="h-full rounded-full" style={{ width: `${weight}%`, background: BRASS, opacity: 0.9 }} />
                        </div>
                      </div>
                    </td>
                    <td className="hidden p-4 font-[family-name:var(--font-finance-mono)] tabular-nums sm:table-cell" style={{ color: (qoq as string).startsWith("+") ? "#7fd6a8" : "#e8e6de" }}>{qoq}</td>
                    <td className="p-4 font-[family-name:var(--font-finance-mono)] text-[0.55rem] uppercase tracking-[0.2em] text-white/45">{posture}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 font-[family-name:var(--font-finance-mono)] text-[0.5rem] uppercase tracking-[0.28em] text-white/25">Illustrative portfolio · fictional client · past performance never guarantees future returns</p>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="relative overflow-hidden border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 pb-4 pt-6 font-[family-name:var(--font-finance-mono)] text-[0.55rem] uppercase tracking-[0.3em] text-white/30 sm:flex-row">
          <p>© 2026 Nova Finance — Concept study. Fictional bank.</p>
          <p>Advisory via <span style={{ color: BRASS }}>Nova Finance Studio</span></p>
        </div>
        <p aria-hidden className="select-none whitespace-nowrap text-center font-[family-name:var(--font-finance-serif)] font-bold leading-[0.85] text-white/[0.035]" style={{ fontSize: "clamp(3.2rem, 14.5vw, 9.5rem)" }}>Nova Finance</p>
      </footer>

      {/* ── ADVISORY MODAL ────────────────────────────────────── */}
      <ConceptModal open={modal} onClose={() => setModal(false)} title="Book your advisory call" accent={BRASS}>
        {state === "done" ? (
          <SuccessPanel title="Calendar hold placed." body="A private banker will reach out within one business day to confirm your slot and prepare your brief." accent={BRASS} onReset={reset} />
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <Field label="Full name" name="name" autoComplete="name" placeholder="Damilola Osei" value={form.name} onChange={(v) => setForm({ ...form, name: v })} accent={BRASS} />
            <Field label="Email address" name="email" type="email" autoComplete="email" placeholder="you@familyoffice.com" value={form.email} onChange={(v) => setForm({ ...form, email: v })} accent={BRASS} />
            <SelectField label="Focus area" name="focus" options={["Portfolio review", "Card & account control", "Business treasury", "Succession planning", "Digital assets"]} value={form.focus} onChange={(v) => setForm({ ...form, focus: v })} />
            <SubmitButton state={state} label="Request advisory call" busyLabel="Placing hold…" style={{ background: BRASS }} />
            <p className="text-[0.6rem] text-white/30">Demo flow — nothing is transmitted or stored. Nova Finance is a concept study.</p>
          </form>
        )}
      </ConceptModal>
    </main>
  );
}
