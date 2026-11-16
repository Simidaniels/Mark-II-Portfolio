/** Shared content types for MARK II. */

export type ProjectStatus = "live" | "in-development";

export interface Project {
  slug: string;
  index: string;
  name: string;
  category: string;
  year: string;
  status: ProjectStatus;
  /** One-line positioning shown on the gallery exhibit. */
  tagline: string;
  /** 2–3 sentence summary used on cards and case study hero. */
  summary: string;
  role: string;
  /** Only set when the collaboration model is known — never guessed. */
  collaboration?: "Solo" | "Collaborative";
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  /** Optional screenshot path (public/images/projects/<slug>/...). When unset, a labelled exhibit plate renders instead. */
  image?: string;
  featured?: boolean;
  accent: string;
  /** Case study body — structured, honest, no invented metrics. */
  caseStudy: {
    problem: string;
    roleDetail: string;
    contributions: string[];
    architecture: string[];
    features: string[];
    challenges: { challenge: string; solution: string }[];
  };
}

export interface ExpertiseCategory {
  id: string;
  code: string;
  name: string;
  description: string;
  technologies: string[];
}

export interface TimelineEntry {
  period: string;
  title: string;
  organisation: string;
  summary: string;
  tags: string[];
}
