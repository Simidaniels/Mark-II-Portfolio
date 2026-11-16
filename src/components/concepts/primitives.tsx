"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Shared interaction primitives for the six concept studies.
 * Intentionally primitive — not a design system. Each project keeps its
 * own visual identity; these only standardise accessible behaviour.
 */

/* ── Accessible modal ─────────────────────────────────────────── */
export function ConceptModal({
  open,
  onClose,
  title,
  children,
  accent = "#f5c518",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  accent?: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("input, select, textarea, button")?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      lastFocus.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center"
      role="presentation"
    >
      <button
        aria-label="Close dialog"
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        tabIndex={-1}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full max-w-md border border-white/10 bg-[#0d0f14] p-6 shadow-2xl sm:rounded-2xl"
        style={{ borderTop: `2px solid ${accent}` }}
      >
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-semibold tracking-wide text-white/95">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full border border-white/10 p-2 text-white/60 transition hover:text-white"
          >
            <X size={16} aria-hidden />
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}

/* ── Form primitives ──────────────────────────────────────────── */
export function Field({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  required = true,
  value,
  onChange,
  accent = "#f5c518",
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  accent?: string;
}) {
  const id = useId();
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block font-mono text-[0.58rem] uppercase tracking-[0.2em] text-white/45">
        {label}
      </span>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-white/30 focus:outline-none"
        style={{ caretColor: accent }}
      />
    </label>
  );
}

export function SelectField({
  label,
  name,
  options,
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const id = useId();
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block font-mono text-[0.58rem] uppercase tracking-[0.2em] text-white/45">
        {label}
      </span>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus:border-white/30 focus:outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#0d0f14]">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

/* ── Submit + success state ───────────────────────────────────── */
export function useSubmitState(onDone?: () => void) {
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const submit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setState("busy");
      // Deterministic demo: validate then resolve like a real request.
      window.setTimeout(() => {
        setState("done");
        onDone?.();
      }, 1100);
    },
    [onDone]
  );
  return { state, submit, reset: () => setState("idle") };
}

export function SubmitButton({
  state,
  label,
  busyLabel = "Working…",
  className,
  style,
}: {
  state: "idle" | "busy" | "done";
  label: string;
  busyLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <button
      type="submit"
      disabled={state === "busy"}
      className={cn(
        "inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3.5 font-semibold tracking-wide text-black transition disabled:opacity-70",
        className
      )}
      style={style}
    >
      {state === "busy" ? (
        <>
          {busyLabel}
          <Loader2 size={16} className="animate-spin" aria-hidden />
        </>
      ) : (
        label
      )}
    </button>
  );
}

export function SuccessPanel({
  title,
  body,
  accent = "#f5c518",
  onReset,
}: {
  title: string;
  body: string;
  accent?: string;
  onReset?: () => void;
}) {
  return (
    <div role="status" className="flex flex-col items-center gap-3 py-6 text-center">
      <CheckCircle2 size={40} style={{ color: accent }} aria-hidden />
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="max-w-xs text-sm leading-relaxed text-white/60">{body}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/40 hover:text-white/80"
        >
          Send another
        </button>
      )}
    </div>
  );
}
