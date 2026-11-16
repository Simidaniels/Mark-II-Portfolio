import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  Lock,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { getProject, projects } from "@/data/projects";
import { site } from "@/data/site";
import { ProjectVisual } from "@/components/case-study/project-visual";

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
        {/* Back nav */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-fog transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-4" aria-hidden />
          All exhibits
        </Link>

        {/* Case study header */}
        <header className="mt-6 border-b border-line pb-8">
          <p className="tech-label flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>
              Case study {project.index} / {String(projects.length).padStart(2, "0")}
            </span>
            <span className="text-accent">{project.category}</span>
            <span>{project.year}</span>
          </p>
          <h1 className="mt-4 font-display text-5xl font-bold uppercase leading-[0.93] tracking-tight text-bone sm:text-7xl lg:text-8xl">
            {project.name}
            <span className="text-accent">.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-snug text-fog">
            {project.summary}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-void transition-all hover:bg-accent-hi"
              >
                {isConcept ? "Launch concept" : "Visit live"}
                <ExternalLink className="size-4" aria-hidden />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                <Lock className="size-3.5" aria-hidden />
                Live link pending verification
              </span>
            )}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-bone transition-colors hover:border-accent hover:text-accent"
              >
                <GithubIcon size={16} aria-hidden />
                Source
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                <GithubIcon size={14} aria-hidden />
                Repository private / pending
              </span>
            )}
          </div>
        </header>

        <div className="mt-8">
          <ProjectVisual project={project} />
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          {/* ── Narrative column ─────────────────────────────── */}
          <div className="lg:col-span-8">
            <Block index="01" title="The problem">
              <p className="leading-relaxed text-fog">{project.caseStudy.problem}</p>
            </Block>

            <Block index="02" title="My role">
              <p className="leading-relaxed text-fog">{project.caseStudy.roleDetail}</p>
            </Block>

            <Block index="03" title="What I contributed">
              <ul className="space-y-3">
                {project.caseStudy.contributions.map((item) => (
                  <li key={item} className="flex items-start gap-3 leading-relaxed text-fog">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2.5} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </Block>

            <Block index="04" title="Architecture overview">
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

            <Block index="05" title="Key features">
              <ul className="grid gap-2 sm:grid-cols-2">
                {project.caseStudy.features.map((item) => (
                  <li
                    key={item}
                    className="border border-line bg-charcoal px-4 py-3 text-[0.86rem] leading-snug text-bone/90"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Block>

            <Block index="06" title="Challenges & solutions">
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
          </aside>
        </div>
      </div>
    </article>
  );
}
