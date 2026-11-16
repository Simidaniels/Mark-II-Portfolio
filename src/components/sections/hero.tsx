"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowDown, ArrowDownRight, Download, MapPin } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useWebGLSupported } from "@/hooks/use-webgl-supported";
import { SceneErrorBoundary, CoreFallback } from "@/components/three/scene-error-boundary";
import { Button } from "@/components/ui/button";

const HeroScene = dynamic(() => import("@/three/scenes/hero-scene"), {
  ssr: false,
  loading: () => <CoreFallback className="absolute inset-0 opacity-60" />,
});

export function Hero() {
  const reduce = useReducedMotion();
  const webgl = useWebGLSupported();
  const rootRef = useRef<HTMLElement>(null);

  // Coordinated entrance choreography — GSAP owns these elements;
  // it is loaded on demand so the main bundle stays lean.
  useEffect(() => {
    if (reduce || !rootRef.current) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    void import("gsap").then(({ default: gsap }) => {
      if (cancelled || !rootRef.current) return;
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from("[data-hero='label']", { y: 24, opacity: 0, duration: 0.9 })
          .from(
            "[data-hero='line']",
            { yPercent: 118, rotate: 3.5, duration: 1.15, stagger: 0.09 },
            "-=0.55"
          )
          .from("[data-hero='copy']", { y: 26, opacity: 0, duration: 0.9 }, "-=0.7")
          .from(
            "[data-hero='cta']",
            { y: 20, opacity: 0, duration: 0.7, stagger: 0.08 },
            "-=0.6"
          )
          .from(
            "[data-hero='meta']",
            { opacity: 0, duration: 0.6, stagger: 0.08 },
            "-=0.45"
          );
      }, rootRef);
      cleanup = () => ctx.revert();
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [reduce]);

  return (
    <section
      ref={rootRef}
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-dvh scroll-mt-20 flex-col overflow-hidden bg-void"
    >
      {/* ── 3D volume ─────────────────────────────────────────── */}
      <div className="absolute inset-0 lg:left-[38%]">
        {webgl ? (
          <SceneErrorBoundary
            fallback={<CoreFallback className="absolute inset-0 opacity-80" />}
          >
            <HeroScene />
          </SceneErrorBoundary>
        ) : (
          <CoreFallback className="absolute inset-0 opacity-80" />
        )}
      </div>

      {/* Legibility scrims */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-void via-void/80 to-transparent lg:via-void/35"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/70"
      />
      <div aria-hidden className="stage-glow pointer-events-none absolute inset-0" />

      {/* Lab readout — decorative corners */}
      <p
        aria-hidden
        className="pointer-events-none absolute right-5 top-24 hidden font-mono text-[0.58rem] leading-relaxed tracking-[0.2em] text-muted md:block lg:right-10"
      >
        LAT 6.5244° N<br />
        LON 3.3792° E<br />
        <span className="text-accent">●</span> CORE STABLE
      </p>

      {/* ── Copy ──────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-28 pt-28 sm:px-6 sm:pt-32 lg:px-10">
        <div className="max-w-3xl">
          <p data-hero="label" className="tech-label flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-accent" aria-hidden />
            SYS.00 — Daniel Adepitan · Software Developer
          </p>

          <h1 className="mt-6 font-display font-bold uppercase leading-[0.94] tracking-tight text-bone">
            <span className="block overflow-hidden pb-1">
              <span data-hero="line" className="block text-[clamp(2.35rem,9.2vw,4.6rem)]">
                I build digital
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span data-hero="line" className="block text-[clamp(2.35rem,9.2vw,4.6rem)] text-accent">
                experiences
              </span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span data-hero="line" className="text-outline block text-[clamp(2.35rem,9.2vw,4.6rem)]">
                beyond the ordinary.
              </span>
            </span>
          </h1>

          <p
            data-hero="copy"
            className="mt-6 max-w-md font-sans text-[0.95rem] leading-relaxed text-fog sm:text-base"
          >
            I&apos;m a software developer focused on building modern web
            applications, scalable digital products and thoughtful user
            experiences. From frontend interfaces to backend architecture, I
            enjoy turning ideas into functional products.
          </p>

          <div data-hero="cta" className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <Button href="#projects" variant="primary" size="md" className="group">
              Explore my work
              <ArrowDownRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                aria-hidden
              />
            </Button>
            <Button href="#contact" variant="ghost" size="md">
              Let&apos;s connect
            </Button>
            <a
              href="/resume/Daniel-Adepitan-Resume.pdf"
              download
              className="group inline-flex items-center gap-2 py-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-fog transition-colors hover:text-accent"
            >
              <Download className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
              Resume
            </a>
          </div>

          {/* Identity triad + location */}
          <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between">
            <ul
              data-hero="meta"
              aria-label="Professional identity"
              className="flex flex-col gap-1.5 font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.22em] text-fog"
            >
              <li><span className="text-accent">01 /</span> Software Developer</li>
              <li><span className="text-accent">02 /</span> Full-Stack Engineer</li>
              <li><span className="text-accent">03 /</span> Digital Product Builder</li>
            </ul>
            <p
              data-hero="meta"
              className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-fog"
            >
              <MapPin className="size-3.5 text-accent" aria-hidden />
              Lagos, Nigeria
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        aria-label="Scroll to about section"
        className="group absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.3em] text-muted transition-colors group-hover:text-bone">
          Scroll
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-line-strong">
          <span className="absolute left-0 top-0 h-3 w-px animate-scroll-cue bg-accent" />
        </span>
        <ArrowDown className="size-3.5 text-muted transition-all duration-300 group-hover:translate-y-1 group-hover:text-accent" aria-hidden />
      </a>

      <style>{`
        @keyframes scroll-cue {
          0% { transform: translateY(-120%); }
          100% { transform: translateY(420%); }
        }
        .animate-scroll-cue { animation: scroll-cue 1.9s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        @media (prefers-reduced-motion: reduce) { .animate-scroll-cue { animation: none; } }
      `}</style>
    </section>
  );
}
