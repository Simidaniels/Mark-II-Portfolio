"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
   MARK II — Route transition indicator
   Slim laboratory-amber progress bar + soft veil that darkens
   the current page while the next route is negotiating.

   App Router has no router events, so navigation is detected with
   a capture-phase click listener + popstate for history traversal,
   and completed when usePathname() commits the new route.
   ───────────────────────────────────────────────────────────── */

const SHOW_DELAY_MS = 110; // debounce — skip the bar on instant/prefetched navigations
const TRICKLE_MS = 170;
const DONE_HOLD_MS = 340; // keep the completed bar briefly before fading out
const FADE_OUT_MS = 280;
const SAFETY_MS = 5000; // hard stop so the bar can never get stuck
const MAX_TRICKLE = 0.92; // never visually "finish" before the route commits

type Phase = "idle" | "loading" | "done";

export function RouteProgress() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const [phase, setPhase] = useState<Phase>("idle");
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const phaseRef = useRef<Phase>("idle");
  const pathnameRef = useRef(pathname);
  const showTimer = useRef<number | undefined>(undefined);
  const trickleTimer = useRef<number | undefined>(undefined);
  const safetyTimer = useRef<number | undefined>(undefined);
  const doneTimer = useRef<number | undefined>(undefined);

  const clearPendingTimers = () => {
    window.clearTimeout(showTimer.current);
    window.clearInterval(trickleTimer.current);
    window.clearTimeout(safetyTimer.current);
  };

  const start = () => {
    window.clearTimeout(doneTimer.current);
    clearPendingTimers();

    phaseRef.current = "loading";
    setPhase("loading");
    setVisible(false);
    setProgress(0.08);

    showTimer.current = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    trickleTimer.current = window.setInterval(() => {
      setProgress((p) => Math.min(p + (MAX_TRICKLE - p) * (0.1 + Math.random() * 0.18), MAX_TRICKLE));
    }, TRICKLE_MS);
    safetyTimer.current = window.setTimeout(() => complete(), SAFETY_MS);
  };

  const complete = () => {
    if (phaseRef.current !== "loading") return;
    clearPendingTimers();

    phaseRef.current = "done";
    setPhase("done");
    setVisible(true);
    setProgress(1);

    doneTimer.current = window.setTimeout(() => {
      phaseRef.current = "idle";
      setPhase("idle");
      setVisible(false);
      window.setTimeout(() => setProgress(0), FADE_OUT_MS);
    }, DONE_HOLD_MS);
  };

  // Route committed → complete the bar. Also keeps the ref in sync for popstate.
  useEffect(() => {
    const changed = pathnameRef.current !== pathname;
    pathnameRef.current = pathname;
    if (changed) complete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Global navigation detection: internal link clicks + history traversal.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const raw = anchor.getAttribute("href");
      if (!raw || raw.startsWith("mailto:") || raw.startsWith("tel:") || raw.startsWith("blob:") || raw.startsWith("data:")) return;

      let url: URL;
      try {
        url = new URL(raw, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      // Same page (including hash-only anchors) — no route transition, no bar.
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      start();
    };

    const onPopState = () => {
      // Back/forward: start only when the route actually changes, never for same-page hashes.
      if (window.location.pathname !== pathnameRef.current) start();
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
      clearPendingTimers();
      window.clearTimeout(doneTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const engaged = phase !== "idle" && visible;

  return (
    <>
      {/* Slim signal bar — fixed to the very top edge, above all content. */}
      <div
        aria-hidden="true"
        className={cn("route-progress", engaged && "is-active")}
        data-phase={phase}
      >
        <div
          className="route-progress-bar"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* Soft veil — darkens the outgoing page so abrupt swaps never flash.
          Decorative only; never intercepts pointer events. Skipped entirely
          under prefers-reduced-motion. */}
      {!reduceMotion && (
        <div
          aria-hidden="true"
          className={cn("route-veil", phase === "loading" && visible && "is-active")}
        />
      )}

      {/* Screen-reader announcement for assistive tech */}
      <span role="status" aria-live="polite" className="sr-only">
        {phase === "loading" ? "Loading next page" : ""}
      </span>
    </>
  );
}
