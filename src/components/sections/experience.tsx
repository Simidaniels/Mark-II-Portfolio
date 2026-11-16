import { Download } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { timeline } from "@/data/experience";

export function Experience() {
  return (
    <section
      id="experience"
      aria-label="Experience and journey"
      className="relative scroll-mt-20 border-t border-line bg-charcoal py-20 sm:py-28"
    >
      <div aria-hidden className="blueprint-grid pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
        {/* Sticky rail */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              code="SEC.04 — The Journey"
              className="mb-6"
              title={
                <>
                  How I got
                  <br />
                  <span className="text-accent">here.</span>
                </>
              }
            />
            <p className="max-w-xs text-sm leading-relaxed text-fog">
              Verified milestones only. Employment history will appear here as
              it is confirmed — nothing on this rail is invented.
            </p>
            <a
              href="/resume/Daniel-Adepitan-Resume.pdf"
              download
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-bone transition-all hover:border-accent hover:text-accent"
            >
              <Download className="size-4" aria-hidden />
              Download resume
            </a>
          </div>
        </div>

        {/* Timeline */}
        <ol className="relative lg:col-span-8">
          <span
            aria-hidden
            className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent via-line-strong to-transparent sm:left-[9px]"
          />
          {timeline.map((entry, i) => (
            <Reveal
              key={`${entry.period}-${entry.title}`}
              as="li"
              delay={i * 0.06}
              y={36}
              className="relative pb-10 pl-8 last:pb-0 sm:pl-12"
            >
              {/* Node */}
              <span
                aria-hidden
                className="absolute left-0 top-1.5 flex size-[15px] items-center justify-center sm:size-[19px]"
              >
                <span className="size-2.5 rotate-45 border border-accent bg-void transition-colors duration-300 sm:size-3" />
              </span>

              <p className="font-mono text-[0.62rem] uppercase tracking-[0.26em] text-accent">
                {entry.period}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold uppercase leading-tight tracking-tight text-bone sm:text-2xl">
                {entry.title}
              </h3>
              <p className="mt-1 font-sans text-sm font-medium text-fog">
                {entry.organisation}
              </p>
              <p className="mt-3 max-w-2xl text-[0.92rem] leading-relaxed text-fog">
                {entry.summary}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {entry.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line bg-void/50 px-2.5 py-1 font-mono text-[0.54rem] uppercase tracking-[0.14em] text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
