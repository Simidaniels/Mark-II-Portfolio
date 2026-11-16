/**
 * Route enter transition.
 * Remounts on every pathname change, so the page wrapper replays
 * a short fade/rise. Purely CSS-driven (see globals.css) so it is
 * collapsed automatically under prefers-reduced-motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-enter">{children}</div>;
}
