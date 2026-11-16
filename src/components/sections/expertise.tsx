"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Box, Check, MousePointerClick } from "lucide-react";
import { expertiseCategories } from "@/data/expertise";
import { SectionHeading } from "@/components/ui/section-heading";
import { SceneErrorBoundary, CoreFallback } from "@/components/three/scene-error-boundary";
import { useWebGLSupported } from "@/hooks/use-webgl-supported";
import { cn } from "@/lib/utils";

const ExpertiseScene = dynamic(() => import("@/three/scenes/expertise-scene"), {
  ssr: false,
  loading: () => <CoreFallback className="absolute inset-0 opacity-50" />,
});

export function Expertise() {
  const [selectedId, setSelectedId] = useState("frontend");
  const webgl = useWebGLSupported();
  const reduce = useReducedMotion();
  const selected =
    expertiseCategories.find((c) => c.id === selectedId) ?? expertiseCategories[0];

  return (
    <section
      id="expertise"
      aria-label="Technical expertise"
      className="relative scroll-mt-20 overflow-hidden border-t border-line bg-charcoal py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="blueprint-grid pointer-events-none absolute inset-0 opacity-25"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionHeading
          code="SEC.02 — Interactive 3D Expertise"
          title={
            <>
              The technology
              <br />
              <span className="text-accent">universe.</span>
            </>
          }
        />

        <div className="grid items-stretch gap-6 lg:grid-cols-12">
          {/* ── 3D stage ─────────────────────────────────────── */}
          <div className="relative min-h-[19rem] overflow-hidden border border-line bg-void sm:min-h-[26rem] lg:col-span-7 lg:min-h-[33rem]">
            <span aria-hidden className="absolute left-3 top-3 z-10 size-4 border-l border-t border-accent/60" />
            <span aria-hidden className="absolute right-3 top-3 z-10 size-4 border-r border-t border-accent/60" />
            <span aria-hidden className="absolute bottom-3 left-3 z-10 size-4 border-b border-l border-accent/60" />
            <span aria-hidden className="absolute bottom-3 right-3 z-10 size-4 border-b border-r border-accent/60" />

            <p className="tech-label absolute left-1/2 top-4 z-10 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap">
              <MousePointerClick className="size-3.5 text-accent" aria-hidden />
              Select a node
            </p>

            {webgl ? (
              <SceneErrorBoundary
                fallback={<CoreFallback className="absolute inset-0 opacity-70" />}
              >
                <ExpertiseScene selected={selectedId} onSelect={setSelectedId} />
              </SceneErrorBoundary>
            ) : (
              <CoreFallback className="absolute inset-0 opacity-70" />
            )}

            <p
              aria-hidden
              className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 font-mono text-[0.55rem] uppercase tracking-[0.28em] text-muted"
            >
              ORBITAL MAP — 5 DISCIPLINES
            </p>
          </div>

          {/* ── Detail panel + accessible index ───────────────── */}
          <div className="flex flex-col border border-line bg-graphite p-5 sm:p-7 lg:col-span-5">
            {/* Category buttons — keyboard-accessible control surface */}
            <div
              role="group"
              aria-label="Technology categories"
              className="flex flex-wrap gap-2"
            >
              {expertiseCategories.map((cat) => {
                const active = cat.id === selectedId;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedId(cat.id)}
                    aria-pressed={active}
                    className={cn(
                      "rounded-full border px-3.5 py-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] transition-all duration-300",
                      active
                        ? "border-accent bg-accent text-void shadow-[0_0_28px_-6px_rgba(245,197,24,0.5)]"
                        : "border-line-strong text-fog hover:border-accent/60 hover:text-accent"
                    )}
                  >
                    {cat.name.split(" ")[0]}
                  </button>
                );
              })}
            </div>

            {/* Selected category detail */}
            <div className="relative mt-6 min-h-[10.5rem] flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="tech-label flex items-center gap-2">
                    <Box className="size-3.5 text-accent" aria-hidden />
                    {selected.code}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight text-bone sm:text-3xl">
                    {selected.name}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-fog">
                    {selected.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <ul className="mt-2 grid grid-cols-2 gap-2 border-t border-line pt-5">
              {selected.technologies.map((tech) => (
                <li
                  key={tech}
                  className="flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-bone"
                >
                  <Check className="size-3.5 shrink-0 text-accent" strokeWidth={2.5} aria-hidden />
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Conventional list alternative — always available, fully accessible */}
        <details className="group mt-6 border border-line bg-charcoal">
          <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-fog transition-colors hover:text-bone [&::-webkit-details-marker]:hidden">
            View full technology index (text)
            <span className="font-sans text-accent transition-transform duration-300 group-open:rotate-45">＋</span>
          </summary>
          <div className="grid gap-6 border-t border-line px-5 py-6 sm:grid-cols-2 lg:grid-cols-5">
            {expertiseCategories.map((cat) => (
              <div key={cat.id}>
                <h4 className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-accent">
                  {cat.name}
                </h4>
                <ul className="mt-2 space-y-1.5">
                  {cat.technologies.map((t) => (
                    <li key={t} className="text-[0.8rem] text-fog">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
