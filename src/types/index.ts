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
  /** Optional cover path (public/images/nova/...). When unset, a labelled exhibit plate renders instead. */
  image?: string;
  /** Secondary in-page visual for the imagery section. */
  secondaryImage?: string;
  /** Hero composition personality used by the case-study template. */
  heroVariant?: "split" | "bleed" | "editorial";
  /** One-line product positioning (what this is). */
  positioning: string;
  /** Who this product speaks to. */
  audience: string;
  featured?: boolean;
  accent: string;
  /** Case study body — structured, honest, no invented metrics. */
  caseStudy: {
    problem: string;
    roleDetail: string;
    contributions: string[];
    architecture: string[];
    /** Capabilities implemented in the concept build — verified, not claimed beyond. */
    features: string[];
    /** Proposed / potential direction — concept, not yet built. Labelled as such on the page. */
    proposed: string[];
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
