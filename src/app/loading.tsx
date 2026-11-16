/**
 * Instant route fallback, streamed by the App Router while a
 * segment resolves. Shared chrome (navbar/footer) stays mounted
 * and interactive — only the page slot shows this.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading page"
      className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-void px-6"
    >
      <div aria-hidden className="blueprint-grid pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative flex flex-col items-center gap-7">
        {/* Pulsing signal diamond — echoes the MARK II brand mark */}
        <span aria-hidden className="route-loading-mark">
          <span className="route-loading-diamond" />
        </span>

        <p className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-muted">
          MARK<span className="text-accent">&nbsp;II</span>
          <span className="mx-2 text-line-strong">/</span>
          Loading<span className="route-loading-dots">…</span>
        </p>

        {/* Skeleton hairlines — reserve the shape of incoming content */}
        <div aria-hidden className="w-44 space-y-2.5 sm:w-56">
          <div className="skeleton-line" style={{ width: "100%" }} />
          <div className="skeleton-line" style={{ width: "72%" }} />
          <div className="skeleton-line" style={{ width: "38%" }} />
        </div>
      </div>
    </div>
  );
}
