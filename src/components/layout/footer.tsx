import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { CurrentYear } from "@/components/layout/current-year";
import { navSections, site, socials } from "@/data/site";

const socialIcons = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Email: Mail,
} as const;

export function Footer() {


  return (
    <footer className="relative border-t border-line bg-void">
      {/* Oversized wordmark */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden px-4 pt-10">
        <p className="text-outline whitespace-nowrap text-center font-display text-[18vw] font-bold leading-[0.85] tracking-tighter lg:text-[13rem]">
          MARK II
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 border-t border-line px-4 py-10 sm:px-6 md:grid-cols-12 lg:px-10">
        <div className="md:col-span-4">
          <p className="font-display text-lg font-bold tracking-[0.08em] text-bone">
            MARK&nbsp;II<span className="text-accent">.</span>
          </p>
          <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-fog">
            The Digital Laboratory — software developed with the discipline of
            an engineer and the eye of a designer.
          </p>
          <p className="tech-label mt-6">{site.location} · UTC+1</p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="tech-label mb-3">Index</p>
          <ul className="space-y-2">
            {navSections.map((s) => (
              <li key={s.id}>
                <Link
                  href={s.href}
                  className="font-sans text-sm text-fog transition-colors hover:text-accent"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-5">
          <p className="tech-label mb-3">Elsewhere</p>
          <ul className="space-y-2">
            {socials.map((s) => {
              const Icon = socialIcons[s.label as keyof typeof socialIcons];
              const enabled = Boolean(s.href);
              return (
                <li key={s.label}>
                  {enabled ? (
                    <a
                      href={s.href ?? "#"}
                      target={s.href?.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 font-sans text-sm text-fog transition-colors hover:text-accent"
                    >
                      <Icon className="size-4" aria-hidden />
                      {s.handle}
                      <ArrowUpRight
                        className="size-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                        aria-hidden
                      />
                    </a>
                  ) : (
                    <span className="inline-flex cursor-default items-center gap-2 font-sans text-sm text-muted">
                      <Icon className="size-4" aria-hidden />
                      {s.label} — link pending verification
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted sm:flex-row sm:px-6 lg:px-10">
          <p>© <CurrentYear /> Daniel Adepitan. All rights reserved.</p>
          <p>
            Crafted with Next.js · Three.js · GSAP — <span className="text-accent">MARK II</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
