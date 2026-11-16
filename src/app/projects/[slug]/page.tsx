import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ExternalLink,
  Grid3X3,
  Lock,
  Lightbulb,
} from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { site } from "@/data/site";
import type { Project } from "@/types";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.name} — Case Study`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} — ${project.category}`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      type: "article",
    },
  };
}

function Block({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-line py-8 first:pt-0 last:border-b-0">
      <h2 className="flex items-baseline gap-3 font-mono text-[0.66rem] uppercase tracking-[0.24em] text-muted">
        <span className="text-accent">{index}</span>
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

/* ── Hero variants — per-product personality ───────────────────── */
function CaseHero({ project }: { project: Project }) {
  const variant = project.heroVariant ?? "split";
  const image = project.image;

  if (variant === "bleed" && image) {
    return (
      <div className="relative h-[52vh] min-h-[22rem] w-full overflow-hidden border border-line sm:h-[64vh]">
        <Image
          src={image}
          alt={`${project.name} — hero imagery`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_20%]"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,7,10,0.62) 0%, rgba(6,7,10,0.08) 34%, rgba(6,7,10,0.42) 68%, rgba(6,7,10,0.96) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-6 sm:px-6 sm:pb-8 lg:px-10">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-bone/70">
            {project.category} · {project.year}
          </p>
          <h1 className="mt-2 font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight text-bone drop-shadow-lg sm:text-7xl lg:text-8xl">
            {project.name}
            <span className="text-accent">.</span>
          </h1>
        </div>
      </div>
    );
  }

  if (variant === "editorial" && image) {
    return (
      <div className="grid overflow-hidden border border-line bg-graphite lg:grid-cols-12">
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-6">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-accent">
            {project.category} · {project.year}
          </p>
          <h1 className="mt-4 font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight text-bone sm:text-7xl">
            {project.name}
            <span className="text-accent">.</span>
          </h1>
          <p className="mt-5 max-w-md font-display text-lg italic leading-snug text-bone/85">
            {project.tagline}
          </p>
        </div>
        <div className="relative min-h-72 lg:col-span-6 lg:min-h-[30rem]">
          <Image
            src={image}
            alt={`${project.name} — editorial imagery`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-[50%_12%]"
            priority
          />
        </div>
      </div>
    );
  }

  // Default — split
  return (
    <div className="grid overflow-hidden border border-line bg-graphite lg:grid-cols-12">
      <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-6">
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-accent">
          {project.category} · {project.year}
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight text-bone sm:text-7xl">
          {project.name}
          <span className="text-accent">.</span>
        </h1>
        <p className="mt-5 max-w-md leading-relaxed text-fog">{project.summary}</p>
      </div>
      <div className="relative min-h-64 sm:min-h-80 lg:col-span-6 lg:min-h-[30rem]">
        <Image
          src={image ?? "/images/nova/novaleap-hero.jpg"}
          alt={`${project.name} — hero imagery`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-[50%_30%]"
          priority
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#11141b] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#11141b] lg:via-transparent lg:to-transparent" />
      </div>
    </div>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const position = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(position - 1 + projects.length) % projects.length];
  const next = projects[(position + 1) % projects.length];
  const isConcept = project.liveUrl?.startsWith("/concepts/");
  const isNova = slug !== "design-brooks";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    applicationCategory: project.category,
    author: { "@type": "Person", name: "Daniel Adepitan", url: site.url },
    url: project.liveUrl ?? `${site.url}/projects/${project.slug}`,
    description: project.summary,
  };

  return (
    <article className="relative min-h-dvh bg-void pb-20 pt-24 sm:pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* ── Breadcrumb + back ─────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-3">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-fog">
            <li>
              <Link href="/#projects" className="transition-colors hover:text-accent">
                Exhibits
              </Link>
            </li>
            <li aria-hidden className="text-muted">/</li>
            <li>
              <Link href="/collections/nova-core" className="transition-colors hover:text-accent">
                {isNova ? "Nova Core" : "Client Work"}
              </Link>
            </li>
            <li aria-hidden className="text-muted">/</li>
            <li aria-current="page" className="text-bone">
              {project.name}
            </li>
          </ol>
          <Link
            href="/collections/nova-core"
            className="inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-fog transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} aria-hidden />
            Back to Nova Core
          </Link>
        </nav>

        {/* ── Hero ───────────────────────────────────────────── */}
        <div className="mt-5">
          <CaseHero project={project} />
        </div>

        {/* Meta strip */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border border-line bg-charcoal px-5 py-4">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-muted">
            {project.index} / {String(projects.length).padStart(2, "0")} — {project.category} · {project.year}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-void transition hover:bg-accent-hi"
              >
                {isConcept ? "Launch concept" : "Visit live"}
                <ExternalLink size={13} aria-hidden />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-muted">
                <Lock size={12} aria-hidden />
                Link pending
              </span>
            )}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-bone transition-colors hover:border-accent hover:text-accent"
              >
                Source
                <ArrowUpRight size={13} aria-hidden />
              </a>
            ) : null}
          </div>
        </div>

        {/* ── Positioning + audience strip ────────────────────── */}
        <div className="mt-4 grid gap-px border border-line bg-line sm:grid-cols-2">
          <div className="bg-charcoal p-6">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.26em] text-muted">What this is</p>
            <p className="mt-2 leading-relaxed text-bone/90">{project.positioning}</p>
          </div>
          <div className="bg-charcoal p-6">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.26em] text-muted">Who it&apos;s for</p>
            <p className="mt-2 leading-relaxed text-bone/90">{project.audience}</p>
          </div>
        </div>

        {/* ── Body grid ──────────────────────────────────────── */}
        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Block index="01" title="The product">
              <p className="leading-relaxed text-fog">{project.summary}</p>
            </Block>

            <Block index="02" title="The problem it solves">
              <p className="leading-relaxed text-fog">{project.caseStudy.problem}</p>
            </Block>

            <Block index="03" title="My role">
              <p className="leading-relaxed text-fog">{project.caseStudy.roleDetail}</p>
            </Block>

            <Block index="04" title="In the concept build">
              <ul className="grid gap-2 sm:grid-cols-2">
                {project.caseStudy.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 border border-line bg-charcoal px-4 py-3 text-[0.85rem] leading-snug text-bone/90"
                  >
                    <Check size={14} className="mt-0.5 shrink-0 text-accent" strokeWidth={2.5} aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-3 font-mono text-[0.52rem] uppercase tracking-[0.2em] text-muted">
                Verified — everything above is implemented in the live concept
              </p>
            </Block>

            <Block index="05" title="Proposed direction">
              <ul className="grid gap-2 sm:grid-cols-2">
                {project.caseStudy.proposed.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 border border-line bg-void px-4 py-3 text-[0.85rem] leading-snug text-fog"
                  >
                    <Lightbulb size={14} className="mt-0.5 shrink-0 text-muted" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-3 font-mono text-[0.52rem] uppercase tracking-[0.2em] text-muted">
                Concept — proposed capabilities, not yet built. Nothing above is claimed as existing.
              </p>
            </Block>

            {project.secondaryImage && (
              <Block index="06" title="Imagery">
                <figure className="group overflow-hidden border border-line">
                  <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[21/10]">
                    <Image
                      src={project.secondaryImage}
                      alt={`${project.name} — product imagery`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="object-cover object-[50%_30%] transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                  </div>
                  <figcaption className="border-t border-line bg-charcoal px-4 py-2.5 font-mono text-[0.52rem] uppercase tracking-[0.22em] text-muted">
                    Licensed photography · Pexels License · product atmosphere study
                  </figcaption>
                </figure>
              </Block>
            )}

            <Block index="07" title="Architecture overview">
              <ol className="space-y-2 font-mono text-[0.78rem] leading-relaxed text-fog">
                {project.caseStudy.architecture.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border border-line bg-charcoal px-4 py-3"
                  >
                    <span className="text-accent">0{i + 1}</span>
                    <span className="font-sans text-[0.86rem] text-bone/90">{item}</span>
                  </li>
                ))}
              </ol>
            </Block>

            <Block index="08" title="Challenges & solutions">
              <div className="space-y-4">
                {project.caseStudy.challenges.map(({ challenge, solution }) => (
                  <div key={challenge} className="border border-line bg-charcoal">
                    <p className="border-b border-line px-5 py-3 text-[0.86rem] leading-relaxed text-fog">
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
                        Challenge —{" "}
                      </span>
                      {challenge}
                    </p>
                    <p className="px-5 py-3 text-[0.86rem] leading-relaxed text-bone/90">
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent">
                        Solution —{" "}
                      </span>
                      {solution}
                    </p>
                  </div>
                ))}
              </div>
            </Block>
          </div>

          {/* ── Sidebar ──────────────────────────────────────── */}
          <aside className="space-y-6 lg:col-span-4">
            <div className="border border-line bg-charcoal p-6">
              <h2 className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-muted">
                Technology stack
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-line-strong px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-bone"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-line bg-charcoal p-6 font-mono text-[0.68rem] uppercase tracking-[0.16em]">
              <h2 className="text-[0.62rem] tracking-[0.24em] text-muted">Details</h2>
              <dl className="mt-3 space-y-2.5">
                {[
                  ["Category", project.category],
                  ["Year", project.year],
                  ["Role", project.role],
                  ...(project.collaboration
                    ? [["Collaboration", project.collaboration]]
                    : []),
                ].map(([k, v]) => (
                  <div key={k} className="flex items-start justify-between gap-4">
                    <dt className="text-muted">{k}</dt>
                    <dd className="max-w-[16rem] text-right normal-case tracking-normal text-bone/90">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <nav aria-label="More case studies" className="border border-line bg-charcoal">
              <Link
                href={`/projects/${prev.slug}`}
                className="group flex items-center justify-between gap-4 border-b border-line p-6 transition-colors hover:bg-graphite"
              >
                <span>
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.24em] text-muted">
                    ← Prev exhibit
                  </span>
                  <span className="mt-1 block font-display text-lg font-bold uppercase leading-tight text-bone transition-colors group-hover:text-accent">
                    {prev.name}
                  </span>
                </span>
                <ArrowLeft className="size-5 shrink-0 text-muted transition-all duration-300 group-hover:-translate-x-1 group-hover:text-accent" aria-hidden />
              </Link>
              <Link
                href={`/projects/${next.slug}`}
                className="group flex items-center justify-between gap-4 p-6 transition-colors hover:bg-graphite"
              >
                <span>
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.24em] text-muted">
                    Next exhibit →
                  </span>
                  <span className="mt-1 block font-display text-lg font-bold uppercase leading-tight text-bone transition-colors group-hover:text-accent">
                    {next.name}
                  </span>
                </span>
                <ArrowRight className="size-5 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" aria-hidden />
              </Link>
            </nav>

            <div className="border border-line bg-charcoal p-6">
              <p className="font-mono text-[0.55rem] uppercase leading-relaxed tracking-[0.24em] text-muted">
                <Grid3X3 size={13} className="mr-1 inline-block -translate-y-px text-accent" aria-hidden />
                Part of NOVA CORE — six concept systems. All products ship with a
                working demo and an honest build/proposed map.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
