import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

/** Grid span map — varied rhythm, shared system. */
const spans: Record<string, string> = {
  rallypro: "lg:col-span-7",
  nebulawallet: "lg:col-span-5",
  talentflow: "lg:col-span-4",
  "rine-marketplace": "lg:col-span-8",
  "chucks-kitchen": "lg:col-span-6",
  "paws-and-pets": "lg:col-span-6",
};

/** Elegant placeholder exhibit — clearly labelled, never fabricated UI. */
function ExhibitPlate({ project }: { project: Project }) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{
        background: `radial-gradient(120% 90% at 78% 12%, ${project.accent}1f 0%, transparent 55%)`,
      }}
    >
      <div className="blueprint-grid absolute inset-0 opacity-40" />
      {/* Orbital ornament */}
      <svg
        viewBox="0 0 300 300"
        className="relative h-[78%] w-auto max-w-none transition-transform duration-700 ease-out group-hover:scale-110"
        fill="none"
      >
        <ellipse cx="150" cy="150" rx="128" ry="42" stroke={project.accent} strokeOpacity="0.55" transform="rotate(-16 150 150)" />
        <ellipse cx="150" cy="150" rx="128" ry="42" stroke="#ece9e2" strokeOpacity="0.18" strokeDasharray="2 7" transform="rotate(22 150 150)" />
        <polygon points="150,96 200,126 200,186 150,216 100,186 100,126" stroke="#ece9e2" strokeOpacity="0.6" fill="#10131a" fillOpacity="0.9" strokeWidth="1.4" />
        <circle cx="150" cy="156" r="16" fill={project.accent} fillOpacity="0.92" />
        <circle cx="278" cy="128" r="4" fill={project.accent} />
        <circle cx="24" cy="190" r="3" fill="#9fb6ff" fillOpacity="0.9" />
      </svg>
      <p className="absolute right-4 top-4 font-mono text-[0.52rem] uppercase tracking-[0.26em] text-muted">
        Plate {project.index} — visual pending
      </p>
    </div>
  );
}

function Exhibit({ project }: { project: Project }) {
  const stack = project.stack.slice(0, 3);
  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`Open case study for ${project.name}`}
      className="group relative flex h-full min-h-[22rem] w-full flex-col overflow-hidden border border-line bg-graphite transition-colors duration-500 hover:border-accent/35 sm:min-h-[26rem]"
    >
      {/* Visual layer */}
      <div className="relative flex-1">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} — product screenshot`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
        ) : (
          <ExhibitPlate project={project} />
        )}
        {/* Index watermark */}
        <span
          aria-hidden
          className="absolute bottom-2 left-4 font-display text-7xl font-bold leading-none text-bone/[0.07] transition-colors duration-500 group-hover:text-accent/15 sm:text-8xl"
        >
          {project.index}
        </span>
      </div>

      {/* Meta deck */}
      <div className="relative border-t border-line bg-charcoal/90 p-5 backdrop-blur-sm sm:p-6">
        <div className="flex items-center justify-between gap-3 font-mono text-[0.56rem] uppercase tracking-[0.22em] text-muted">
          <span className="text-accent">{project.category}</span>
          <span>{project.year}</span>
        </div>
        <div className="mt-2 flex items-end justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-bold uppercase leading-none tracking-tight text-bone transition-colors duration-300 group-hover:text-accent sm:text-3xl">
              {project.name}
            </h3>
            <p className="mt-2 font-sans text-[0.8rem] leading-snug text-fog">
              {project.tagline}
            </p>
          </div>
          <span
            aria-hidden
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-fog transition-all duration-400 group-hover:border-accent group-hover:bg-accent group-hover:text-void"
          >
            <ArrowRight className="size-4 -rotate-45 transition-transform duration-400 group-hover:rotate-0" />
          </span>
        </div>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line bg-void/60 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-fog"
            >
              {tech}
            </li>
          ))}
          {project.stack.length > stack.length && (
            <li className="rounded-full border border-line bg-void/60 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-muted">
              +{project.stack.length - stack.length}
            </li>
          )}
        </ul>
      </div>
    </Link>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      aria-label="Selected projects"
      className="relative scroll-mt-20 border-t border-line bg-void py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            code="SEC.03 — The Digital Gallery"
            className="mb-0"
            title={
              <>
                Selected
                <br />
                <span className="text-accent">exhibits.</span>
              </>
            }
          />
          <Reveal className="max-w-xs pb-2" y={20}>
            <p className="text-sm leading-relaxed text-fog">
              Six shipped builds across SaaS, fintech, education, marketplaces
              and commerce — each with a full case study.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-12">
          {projects.map((project) => (
            <Reveal key={project.slug} className={cn("flex", spans[project.slug])} y={48}>
              <Exhibit project={project} />
            </Reveal>
          ))}
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-center font-mono text-[0.6rem] uppercase tracking-[0.24em] text-muted">
          Every exhibit opens into a full case study
          <ArrowUpRight className="size-3.5 text-accent" aria-hidden />
        </p>
      </div>
    </section>
  );
}
