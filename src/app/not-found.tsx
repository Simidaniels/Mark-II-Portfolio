import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-dvh flex-col items-center justify-center bg-void px-6 text-center">
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-accent">
        Error 404 — Signal lost
      </p>
      <h1 className="mt-6 font-display text-6xl font-bold uppercase leading-[0.9] tracking-tight text-bone sm:text-8xl">
        Off the
        <br />
        <span className="text-outline">map.</span>
      </h1>
      <p className="mt-6 max-w-sm leading-relaxed text-fog">
        The page you requested isn&apos;t part of this laboratory. Let&apos;s
        get you back to solid ground.
      </p>
      <Link
        href="/#home"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-void transition-colors hover:bg-accent-hi"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Return home
      </Link>
    </section>
  );
}
