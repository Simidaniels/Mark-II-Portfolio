import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

/* ── Collection card ─────────────────────────────────────────── */
function CollectionCard({
  eyebrow,
  title,
  tagline,
  image,
  imagePosition = "50% 40%",
  href,
  cta,
  accent,
  tags,
  className,
}: {
  eyebrow: string;
  title: string;
  tagline: string;
  image: string;
  imagePosition?: string;
  href: string;
  cta: string;
  accent: string;
  tags: string[];
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={`${title} — open collection`}
      className={cn(
        "group relative flex min-h-[20rem] flex-col justify-end overflow-hidden border border-line transition-colors duration-500 hover:border-white/20 sm:min-h-[26rem]",
        className
      )}
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 1024px) 100vw, 58vw"
        className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
        style={{ objectPosition: imagePosition }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(6,7,10,0.05) 0%, rgba(6,7,10,0.55) 55%, rgba(6,7,10,0.94) 100%), linear-gradient(120deg, rgba(6,7,10,0.35) 0%, transparent 60%)`,
        }}
      />
      <div className="relative p-6 sm:p-7">
        <p
          className="font-mono text-[0.55rem] uppercase tracking-[0.28em]"
          style={{ color: accent }}
        >
          {eyebrow}
        </p>
        <h3 className="mt-2 font-display text-4xl font-bold uppercase leading-[0.9] tracking-tight text-bone sm:text-6xl">
          {title}
        </h3>
        <p className="mt-3 max-w-sm text-[0.8rem] leading-snug text-fog">{tagline}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-white/15 bg-black/45 px-2.5 py-1 font-mono text-[0.52rem] uppercase tracking-[0.14em] text-bone/90 backdrop-blur-sm"
            >
              {t}
            </li>
          ))}
        </ul>
        <p
          className="mt-5 inline-flex items-center gap-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.22em]"
          style={{ color: accent }}
        >
          {cta}
          <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden />
        </p>
      </div>
    </Link>
  );
}

/* ── Compact library tile ────────────────────────────────────── */
function LibraryTile({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`${project.name} — case study`}
      className="group flex h-full flex-col overflow-hidden border border-line bg-graphite transition-colors duration-400 hover:border-accent/35"
    >
      <div className="relative h-24 w-full overflow-hidden sm:h-28">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} cover`}
            fill
            sizes="(max-width: 768px) 33vw, 14vw"
            className="object-cover object-[50%_20%] transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div aria-hidden className="blueprint-grid size-full bg-void" />
        )}
        <span
          aria-hidden
          className="absolute left-2 top-2 font-mono text-[0.5rem] uppercase tracking-[0.22em] text-bone/70"
        >
          {project.index}
        </span>
      </div>
      <div className="flex flex-1 items-center justify-between gap-2 p-2.5">
        <span className="font-display text-[0.68rem] font-bold uppercase leading-tight tracking-wide text-bone transition-colors group-hover:text-accent sm:text-[0.72rem]">
          {project.name}
        </span>
        <ArrowUpRight
          size={13}
          className="shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          aria-hidden
        />
      </div>
    </Link>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      aria-label="Selected work"
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
                <span className="text-accent">collections.</span>
              </>
            }
          />
          <Reveal className="max-w-xs pb-2" y={20}>
            <p className="text-sm leading-relaxed text-fog">
              Two bodies of work: the NOVA product family — six engineered
              concept systems — and DESIGN BROOKS, a real client product
              live in production.
            </p>
          </Reveal>
        </div>

        {/* ── Collections row ─────────────────────────────── */}
        <div className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-12">
          <Reveal className="flex lg:col-span-7" y={44}>
            <CollectionCard
              eyebrow="COLLECTION 01 — THE NOVA FAMILY"
              title="Nova Core"
              tagline="Crypto Nova · Nova Store · Nova Leap — plus Sport, Fashion and Finance. Six engineered concept systems, one universe."
              image="/images/nova/novaleap-hero.jpg"
              imagePosition="50% 55%"
              href="/collections/nova-core"
              cta="Open the family"
              accent="#7dd3fc"
              tags={["Crypto Nova", "Nova Store", "Nova Leap", "+ 3 more"]}
              className="w-full"
            />
          </Reveal>
          <Reveal className="flex lg:col-span-5" y={44} delay={0.08}>
            <CollectionCard
              eyebrow="COLLECTION 02 — CLIENT WORK"
              title="Design Brooks"
              tagline="A real architectural studio product — public website, admin console and private client document portal. Live."
              image="/images/design-brooks/house.jpg"
              imagePosition="50% 30%"
              href="/collections/design-brooks"
              cta="Open the engagement"
              accent="#f97316"
              tags={["Public Site", "Admin Console", "Client Portal"]}
              className="w-full"
            />
          </Reveal>
        </div>

        {/* ── Full library strip ─────────────────────────────── */}
        <div className="mt-8">
          <p className="tech-label flex items-center justify-between">
            <span>FULL LIBRARY — INDIVIDUAL EXHIBITS</span>
            <span className="text-accent">07</span>
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-7">
            {projects.map((project) => (
              <LibraryTile key={project.slug} project={project} />
            ))}
          </div>
        </div>

        <p className="mt-8 text-center font-mono text-[0.58rem] uppercase tracking-[0.26em] text-muted">
          Other projects — forthcoming · not yet published
        </p>
      </div>
    </section>
  );
}
