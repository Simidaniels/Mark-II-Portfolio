"use client";

import { Component, type ReactNode } from "react";

/**
 * Catches Canvas/WebGL failures at runtime and swaps in the static
 * fallback so the page never shows a broken canvas.
 */
export class SceneErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("[MARK II] 3D scene failed, rendering fallback:", error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/**
 * Static composition shown when WebGL is missing or the scene crashes.
 * Same visual language: void background, amber kernel, orbit rings.
 */
export function CoreFallback({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 400"
        className="h-full max-h-[34rem] w-full max-w-[34rem]"
        fill="none"
      >
        <defs>
          <radialGradient id="kernel" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f5c518" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#f5c518" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#f5c518" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="150" fill="url(#kernel)" />
        <ellipse cx="200" cy="200" rx="150" ry="52" stroke="#f5c518" strokeOpacity="0.75" strokeWidth="1.4" transform="rotate(-18 200 200)" />
        <ellipse cx="200" cy="200" rx="185" ry="64" stroke="#e8e4d8" strokeOpacity="0.3" strokeWidth="1" transform="rotate(24 200 200)" strokeDasharray="3 6" />
        <polygon
          points="200,132 258,176 236,252 164,252 142,176"
          stroke="#ece9e2"
          strokeOpacity="0.55"
          strokeWidth="1.4"
          fill="#101318"
          fillOpacity="0.85"
        />
        <circle cx="200" cy="200" r="22" fill="#f5c518" fillOpacity="0.9" />
        <circle cx="330" cy="156" r="4.5" fill="#f5c518" />
        <circle cx="72" cy="248" r="3" fill="#9fb6ff" />
      </svg>
    </div>
  );
}
