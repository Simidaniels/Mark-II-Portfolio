import type { ExpertiseCategory } from "@/types";

/**
 * Five interconnected disciplines. No invented proficiency scores —
 * only technologies genuinely used across shipped work.
 */
export const expertiseCategories: ExpertiseCategory[] = [
  {
    id: "frontend",
    code: "CAT.01",
    name: "Frontend Engineering",
    description:
      "Interfaces that carry products. From design-system discipline to complex interactive layers, with performance and accessibility treated as features.",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Material UI",
    ],
  },
  {
    id: "backend",
    code: "CAT.02",
    name: "Backend Engineering",
    description:
      "APIs and services that stay boring in production — explicit contracts, validation at the boundary, and access control that never trusts the client.",
    technologies: ["Node.js", "Express.js", "Laravel", "PHP", "REST APIs"],
  },
  {
    id: "databases",
    code: "CAT.03",
    name: "Databases",
    description:
      "Data models that reflect the domain. Relational design with Prisma, Postgres/MySQL, and reactive sync where the product calls for it.",
    technologies: ["PostgreSQL", "MySQL", "Prisma", "Convex"],
  },
  {
    id: "infrastructure",
    code: "CAT.04",
    name: "Infrastructure",
    description:
      "Boring, repeatable deploys. Vercel for the edge, Render and Railway for services, and object storage at the edge.",
    technologies: ["Vercel", "Render", "Railway", "Cloudflare R2"],
  },
  {
    id: "tools",
    code: "CAT.05",
    name: "Development Tools",
    description:
      "The workshop: fast iteration loops, reproducible environments and ruthless version control.",
    technologies: ["Git", "GitHub", "VS Code", "Docker"],
  },
];
