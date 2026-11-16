import type { TimelineEntry } from "@/types";

/**
 * Verified milestones only.
 *
 * Employment history has not yet been supplied — when it is, append entries
 * here in the same shape and the timeline renders them automatically.
 * Sources: owner-provided brief + the (stale) prior resume for education.
 */
export const timeline: TimelineEntry[] = [
  {
    period: "2025",
    title: "BSc Physics — Graduate",
    organisation: "Federal University, Oye-Ekiti, Nigeria",
    summary:
      "Completed a Bachelor of Science in Physics. The degree sharpened first-principles problem solving, measurement discipline and structured debugging — habits that carry directly into systems engineering.",
    tags: ["Physics", "Federal University Oye-Ekiti"],
  },
  {
    period: "2025 — 2026",
    title: "Frontend concept engineering",
    organisation: "Self-directed concept studies",
    summary:
      "Designed and built six concept studies in interface craft — Nova Crypto, Nova Sport and Nova Bike (2025), then Nova Fashion, NovaLeap and Nova Finance (2026) — each a complete branded single-page experience spanning art direction, responsive layout, scroll choreography and mobile navigation engineering.",
    tags: ["HTML5", "CSS3", "JavaScript", "AOS", "Art Direction"],
  },
  {
    period: "2023 — 2024",
    title: "Foundations to framework engineering",
    organisation: "Self-directed study & builds",
    summary:
      "Progressed from semantic HTML/CSS/JavaScript fundamentals through React and Next.js to TypeScript-first application development, shipping increasingly complex products and developing a bias for typed, maintainable systems.",
    tags: ["HTML5", "CSS3", "JavaScript", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    period: "2018 — 2019",
    title: "WAEC / WASSCE",
    organisation: "Cathedral Church of Our Savior College",
    summary:
      "West African Senior School Certificate Examination (WASSCE), completed 2019.",
    tags: ["WASSCE", "WAEC"],
  },
];
