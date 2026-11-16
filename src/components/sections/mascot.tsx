"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * MARK II — Cybernetic mascot companion.
 * Single flattened PNG, animated coherently: idle float, breathing scale,
 * pointer parallax (fine pointers only), scroll drift-out past the hero,
 * and a hover/tap greeting. GSAP is not used here (it owns hero type).
 */
export function Mascot({
  variant = "hero",
  scrollTarget,
}: {
  variant?: "hero" | "plate";
  /** Ref to the hero section for scroll-driven drift. Hero only. */
  scrollTarget?: React.RefObject<HTMLElement | null>;
}) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.15 });
  const [greeted, setGreeted] = useState(false);
  const cooldownRef = useRef(0);

  /* ── Pointer parallax (springs, transform-only) ─────────────── */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const tiltX = useSpring(useTransform(py, (v) => v * -7), { stiffness: 110, damping: 18, mass: 0.6 });
  const tiltY = useSpring(useTransform(px, (v) => v * 9), { stiffness: 110, damping: 18, mass: 0.6 });
  const driftX = useSpring(useTransform(px, (v) => v * 16), { stiffness: 90, damping: 20, mass: 0.7 });
  const driftY = useSpring(useTransform(py, (v) => v * 10), { stiffness: 90, damping: 20, mass: 0.7 });

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth - 0.5) * 2);
      py.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reduce]);

  /* ── Scroll drift-out (hero only) ───────────────────────────── */
  const { scrollYProgress } = useScroll(
    scrollTarget
      ? { target: scrollTarget, offset: ["start start", "end start"] }
      : { target: rootRef, offset: ["start start", "end start"] }
  );
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.55, 0]);

  const greet = () => {
    const now = Date.now();
    if (now - cooldownRef.current < 1600) return;
    cooldownRef.current = now;
    setGreeted(true);
    window.setTimeout(() => setGreeted(false), 2100);
  };

  const idle =
    !reduce && inView
      ? { y: [0, -13, 0], rotate: [0, 1.1, -0.8, 0], scale: [1, 1.013, 1] }
      : undefined;

  /* ── About/plate variant — calm, static composition ────────── */
  if (variant === "plate") {
    return (
      <div ref={rootRef} className="relative flex h-full w-full items-end justify-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-8 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(245,197,24,0.16) 0%, transparent 70%)" }}
        />
        <Image
          src="/images/mark-ii-mascot.png"
          alt="MARK II cybernetic mascot — white robotic armour, black visor with yellow lighting, waving hello"
          width={1024}
          height={1536}
          sizes="(max-width: 1024px) 92vw, 33vw"
          className="relative h-full w-auto object-contain object-bottom"
        />
      </div>
    );
  }

  /* ── Hero variant ───────────────────────────────────────────── */
  return (
    <motion.div
      ref={rootRef}
      className={cn(
        "relative z-20 flex h-64 w-full items-end justify-center pt-16 sm:h-80 sm:pt-20",
        "lg:absolute lg:right-0 lg:top-20 lg:order-none lg:h-[calc(100%-5rem)] lg:w-[46%] lg:justify-end lg:pr-0 xl:w-[44%]"
      )}
      style={reduce ? undefined : { y: scrollY, opacity: scrollOpacity, perspective: 900 }}
    >
      {/* Ambient amber halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full sm:h-72 sm:w-72 lg:bottom-24 lg:left-auto lg:right-8 lg:translate-x-0"
        style={{ background: "radial-gradient(circle, rgba(245,197,24,0.14) 0%, transparent 70%)" }}
      />

      {/* Pointer-tilt frame */}
      <motion.div
        className="relative flex h-full w-full cursor-pointer items-end justify-center outline-none"
        style={reduce ? undefined : { rotateX: tiltX, rotateY: tiltY, x: driftX, y: driftY, transformStyle: "preserve-3d" }}
        onPointerEnter={greet}
        onClick={greet}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") greet();
        }}
        role="button"
        tabIndex={0}
        aria-label="MARK II mascot — activate to say hello"
        aria-pressed={greeted}
      >
        {/* Idle float + breathing */}
        <motion.div
          className="flex h-full items-end"
          animate={idle}
          transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Entrance — scale-up + fade, synced with hero copy */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.82, y: 48 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.15, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-full items-end"
          >
            <Image
              src="/images/mark-ii-mascot.png"
              alt="MARK II cybernetic mascot — white robotic armour, black visor with glowing yellow eyes, NOVA shoulder branding, waving with a Hi! speech bubble"
              width={1024}
              height={1536}
              priority
              sizes="(max-width: 640px) 58vw, (max-width: 1024px) 40vw, 44vw"
              className="h-full w-auto select-none object-contain object-bottom drop-shadow-[0_24px_50px_rgba(0,0,0,0.55)]"
              draggable={false}
            />
          </motion.div>
        </motion.div>

        {/* Greeting pop */}
        <AnimatePresence>
          {greeted && (
            <motion.div
              key="greet"
              role="status"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -8 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
              className="pointer-events-none absolute left-2 top-2 rounded-xl border border-accent/50 bg-void/90 px-4 py-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-accent shadow-[0_0_36px_-8px_rgba(245,197,24,0.35)] backdrop-blur-sm sm:left-0 sm:top-1/4"
            >
              Hello, human.
              <span className="block text-[0.52rem] font-normal text-bone/80">Welcome to MARK II.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>


    </motion.div>
  );
}
