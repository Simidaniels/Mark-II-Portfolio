"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDownRight, Download, Menu, X } from "lucide-react";
import { navSections, site } from "@/data/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

const sectionIds = navSections.map((s) => s.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + wire Escape while the mobile panel is open.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const first = panelRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled
          ? "border-b border-line bg-void/78 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6 lg:px-10">
        {/* Brand */}
        <Link
          href="/#home"
          aria-label="MARK II — home"
          className="group flex shrink-0 items-baseline gap-2"
        >
          <span
            aria-hidden
            className="inline-block size-2.5 translate-y-[1px] rotate-45 bg-accent transition-transform duration-500 group-hover:rotate-[225deg]"
          />
          <span className="font-display text-lg font-bold tracking-[0.08em] text-bone sm:text-xl">
            MARK&nbsp;II
            <span className="text-accent">.</span>
          </span>
          <span className="hidden font-mono text-[0.6rem] tracking-[0.22em] text-muted md:inline">
            DANNY
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navSections.map((section) => {
            const isActive = active === section.id;
            return (
              <Link
                key={section.id}
                href={section.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] transition-colors duration-300",
                  isActive ? "text-accent" : "text-fog hover:text-bone"
                )}
              >
                {section.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3 -bottom-px h-px origin-left bg-accent transition-transform duration-400",
                    isActive ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right cluster */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div
            className="hidden items-center gap-2 rounded-full border border-line py-1.5 pl-2.5 pr-3 xl:flex"
            title={site.availability}
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-fog">
              Available for select opportunities
            </span>
          </div>

          <a
            href="/resume/Daniel-Adepitan-Resume.pdf"
            download
            className="hidden items-center gap-1.5 rounded-full border border-accent/40 bg-accent-soft px-4 py-2 font-mono text-[0.65rem] font-medium uppercase tracking-[0.18em] text-accent transition-all duration-300 hover:border-accent hover:bg-accent hover:text-void focus-visible:outline-2 sm:inline-flex"
          >
            Resume
            <Download className="size-3.5" strokeWidth={2} aria-hidden />
          </a>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line text-bone transition-colors hover:border-line-strong hover:text-accent lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            ref={panelRef}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-line bg-void/95 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto max-w-7xl px-5 pb-8 pt-2">
              <div className="mb-5 flex items-center gap-2 border-b border-line pb-4">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-fog">
                  {site.availability}
                </p>
              </div>
              <nav aria-label="Mobile" className="flex flex-col">
                {navSections.map((section, i) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.055, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={section.href}
                      onClick={() => setOpen(false)}
                      aria-current={active === section.id ? "true" : undefined}
                      className={cn(
                        "flex items-center justify-between border-b border-line py-4 font-display text-2xl font-semibold tracking-tight transition-colors",
                        active === section.id ? "text-accent" : "text-bone hover:text-accent"
                      )}
                    >
                      {section.label}
                      <ArrowDownRight className="size-5 text-muted" aria-hidden />
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <a
                href="/resume/Daniel-Adepitan-Resume.pdf"
                download
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-accent/40 bg-accent-soft px-5 py-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-void"
              >
                Download resume
                <Download className="size-4" aria-hidden />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
