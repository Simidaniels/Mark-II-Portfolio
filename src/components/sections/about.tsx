import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const focusAreas = [
  {
    label: "Frontend Engineering",
    detail: "Modern frontend with React, Next.js and TypeScript — interfaces that stay fast and legible.",
  },
  {
    label: "Backend Architecture",
    detail: "Node.js services, Laravel APIs and explicit REST contracts — systems built to be debugged.",
  },
  {
    label: "Digital Products",
    detail: "SaaS thinking from onboarding to retention — building products, not just pages.",
  },
  {
    label: "Craft Continuous",
    detail: "Continuous technical improvement — every release ships cleaner than the last.",
  },
] as const;

const facts = [
  ["BASE", "LAGOS · NG"],
  ["EDUCATION", "BSc PHYSICS ’25"],
  ["MODE", "FULL-STACK"],
  ["STATUS", "MARK II — V2.0"],
] as const;

export function About() {
  return (
    <section
      id="about"
      aria-label="About Daniel Adepitan"
      className="relative scroll-mt-20 border-t border-line bg-void py-20 sm:py-28"
    >
      <div aria-hidden className="blueprint-grid pointer-events-none absolute inset-0 opacity-[0.35]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionHeading
          code="SEC.01 — The Personal Dimension"
          title={
            <>
              The person <span className="text-accent">behind</span>
              <br />
              the protocol.
            </>
          }
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Portrait plate */}
          <Reveal className="lg:col-span-4" y={34}>
            <figure className="relative border border-line bg-graphite p-3">
              <span aria-hidden className="absolute -left-px -top-px size-5 border-l-2 border-t-2 border-accent" />
              <span aria-hidden className="absolute -right-px -top-px size-5 border-r-2 border-t-2 border-accent" />
              <span aria-hidden className="absolute -bottom-px -left-px size-5 border-b-2 border-l-2 border-accent" />
              <span aria-hidden className="absolute -bottom-px -right-px size-5 border-b-2 border-r-2 border-accent" />
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-void">
                <Image
                  src="/images/portrait/danny.png"
                  alt="Portrait of Daniel 'Danny' Adepitan, software developer, in a red shirt against a dark backdrop"
                  fill
                  sizes="(max-width: 1024px) 92vw, 33vw"
                  className="object-cover object-[50%_18%]"
                  priority={false}
                />
              </div>
              <figcaption className="flex items-center justify-between px-1 pt-3 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-muted">
                <span>FIG.01 — The developer</span>
                <span className="text-accent">DANNY.EXE</span>
              </figcaption>
            </figure>
          </Reveal>

          {/* Editorial copy */}
          <div className="flex flex-col justify-center lg:col-span-8">
            <Reveal delay={0.08}>
              <p className="max-w-2xl font-sans text-xl leading-snug text-bone sm:text-2xl">
                I&apos;m a software developer who enjoys turning ideas into
                functional digital products. My work spans frontend engineering,
                backend development and application architecture — with a strong
                interest in products that combine{" "}
                <span className="text-accent">technical quality</span> with{" "}
                <span className="text-accent">thoughtful experiences</span>.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl leading-relaxed text-fog">
                Away from the editor I&apos;m usually dissecting how well-built
                products hold together — the layout under a clean UI, the
                choreography under a scroll. Nova Bike, Nova Crypto and Nova
                Sport — three of the concept studies in this gallery — are
                the current exhibits.
              </p>
            </Reveal>

            {/* Focus areas */}
            <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2">
              {focusAreas.map((f) => (
                <li
                  key={f.label}
                  className="group bg-charcoal p-5 transition-colors duration-300 hover:bg-graphite"
                >
                  <p className="flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.2em] text-accent">
                    {f.label}
                    <ArrowDownRight
                      className="size-3.5 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-accent"
                      aria-hidden
                    />
                  </p>
                  <p className="mt-2.5 font-sans text-[0.83rem] leading-relaxed text-fog">
                    {f.detail}
                  </p>
                </li>
              ))}
            </ul>

            {/* Fact strip */}
            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-6 sm:grid-cols-4">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-muted">
                    {k}
                  </dt>
                  <dd className="mt-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-bone">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
