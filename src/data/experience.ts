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
    period: "2024 — 2025",
    title: "Full-stack product engineering",
    organisation: "Independent product builds",
    summary:
      "Designed and shipped RallyPro (club management SaaS), NebulaWallet (crypto dashboard), TalentFlow LMS, RINE Marketplace (customer + vendor experiences), Chucks Kitchen and Paws & Pets — spanning frontend architecture, backend services, databases and deployment.",
    tags: ["Next.js", "TypeScript", "Node.js", "Laravel", "PostgreSQL", "Convex"],
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
