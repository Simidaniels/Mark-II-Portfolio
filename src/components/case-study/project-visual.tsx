import Image from "next/image";
import type { Project } from "@/types";

/**
 * Hero visual for a case study. Uses the real screenshot when the owner
 * provides one (public/images/projects/<slug>/cover.*); otherwise renders
 * a clearly-labelled exhibit plate — never a fabricated interface.
 */
export function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="relative aspect-[16/9] w-full overflow-hidden border border-line bg-graphite sm:aspect-[21/10]">
        <Image
          src={project.image}
          alt={`${project.name} — product screenshot`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Exhibit plate for ${project.name} — screenshot pending`}
      className="blueprint-grid relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden border border-line bg-graphite sm:aspect-[21/10]"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(90% 80% at 76% 18%, ${project.accent}22 0%, transparent 55%)`,
        }}
      />
      <svg
        aria-hidden
        viewBox="0 0 460 200"
        className="relative h-[72%] w-auto max-w-[92%]"
        fill="none"
      >
        <ellipse cx="230" cy="100" rx="168" ry="46" stroke={project.accent} strokeOpacity="0.6" transform="rotate(-8 230 100)" />
        <ellipse cx="230" cy="100" rx="168" ry="46" stroke="#ece9e2" strokeOpacity="0.16" strokeDasharray="2 8" transform="rotate(14 230 100)" />
        <polygon points="230,38 288,72 288,140 230,174 172,140 172,72" stroke="#ece9e2" strokeOpacity="0.6" strokeWidth="1.6" fill="#12151c" fillOpacity="0.92" />
        <circle cx="230" cy="106" r="17" fill={project.accent} fillOpacity="0.95" />
        <circle cx="392" cy="66" r="4.5" fill={project.accent} />
        <circle cx="66" cy="142" r="3.5" fill="#9fb6ff" />
      </svg>
      <p className="absolute bottom-4 right-5 font-mono text-[0.55rem] uppercase tracking-[0.26em] text-muted">
        Exhibit {project.index} — screenshot pending
      </p>
    </div>
  );
}
