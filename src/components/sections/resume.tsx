import { FileText, Download, GraduationCap, Hammer, Layers } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const resumeFacts = [
  { icon: GraduationCap, label: "Education", value: "BSc Physics — FUOYE, 2025" },
  { icon: Hammer, label: "Shipped", value: "06 full-stack products" },
  { icon: Layers, label: "Stack", value: "Next.js · TS · Node · Laravel · PostgreSQL" },
] as const;

export function Resume() {
  return (
    <section
      id="resume"
      aria-label="Resume"
      className="relative scroll-mt-20 border-t border-line bg-void py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionHeading
          code="SEC.05 — The Résumé"
          title={
            <>
              The fine
              <br />
              <span className="text-accent">print.</span>
            </>
          }
        />

        <div className="grid items-stretch gap-6 lg:grid-cols-12">
          {/* Copy + facts */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <Reveal>
              <p className="max-w-md text-lg leading-snug text-bone">
                One document, everything verified — education, shipped products,
                stack and contact.{" "}
                <span className="text-accent">No inflation, no filler.</span>
              </p>
            </Reveal>
            <ul className="mt-8 space-y-4">
              {resumeFacts.map(({ icon: Icon, label, value }) => (
                <li
                  key={label}
                  className="flex items-center gap-4 border border-line bg-charcoal px-5 py-4"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent-soft text-accent">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-mono text-[0.56rem] uppercase tracking-[0.24em] text-muted">
                      {label}
                    </span>
                    <span className="mt-0.5 block font-sans text-sm text-bone">
                      {value}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Document preview card */}
          <Reveal className="lg:col-span-6" delay={0.1}>
            <div className="group flex h-full flex-col border border-line bg-graphite p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <span className="flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.26em] text-muted">
                  <FileText className="size-4 text-accent" aria-hidden />
                  DANIEL-ADEPITAN — RESUME.PDF
                </span>
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-accent">
                  PDF · A4
                </span>
              </div>

              {/* Stylised document preview */}
              <div
                aria-hidden
                className="mt-6 flex-1 border border-line-strong bg-void p-5 transition-transform duration-500 group-hover:-translate-y-1"
              >
                <p className="font-display text-xl font-bold uppercase leading-none text-bone">
                  Daniel Adepitan
                </p>
                <p className="mt-1 font-mono text-[0.52rem] uppercase tracking-[0.22em] text-accent">
                  Software Developer — Lagos, Nigeria
                </p>
                <div className="mt-4 space-y-3">
                  {[92, 78, 84, 60].map((w, i) => (
                    <div key={i} className="h-1.5 rounded-full bg-steel" style={{ width: `${w}%` }} />
                  ))}
                  <div className="pt-2 font-mono text-[0.5rem] uppercase tracking-[0.2em] text-muted">
                    Experience / Projects
                  </div>
                  {[70, 88, 55, 81, 64].map((w, i) => (
                    <div key={i} className="h-1.5 rounded-full bg-steel/70" style={{ width: `${w}%` }} />
                  ))}
                  <div className="pt-2 font-mono text-[0.5rem] uppercase tracking-[0.2em] text-muted">
                    Education / Stack
                  </div>
                  {[58, 73].map((w, i) => (
                    <div key={i} className="h-1.5 rounded-full bg-steel/50" style={{ width: `${w}%` }} />
                  ))}
                </div>
              </div>

              <a
                href="/resume/Daniel-Adepitan-Resume.pdf"
                download
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-void transition-all duration-300 hover:bg-accent-hi hover:shadow-[0_0_44px_-8px_rgba(245,197,24,0.4)]"
              >
                <Download className="size-4" aria-hidden />
                Download resume
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
