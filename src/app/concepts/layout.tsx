import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Shared frame for the concept studies. Each concept brings its own
 * brand, palette and typography — this only guarantees the escape hatch
 * back to the MARK II portfolio.
 */
export default function ConceptsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative min-h-dvh bg-black text-white antialiased">
      {children}
      <Link
        href="/collections/nova-core"
        className="group fixed bottom-4 left-4 z-[70] flex items-center gap-2 rounded-full border border-white/12 bg-black/70 py-2 pl-3 pr-4 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-white/60 backdrop-blur-md transition hover:border-white/30 hover:text-white"
        aria-label="Back to the NOVA CORE collection"
      >
        <ArrowLeft size={12} aria-hidden className="transition-transform group-hover:-translate-x-0.5" />
        NOVA&nbsp;CORE
      </Link>
    </div>
  );
}
