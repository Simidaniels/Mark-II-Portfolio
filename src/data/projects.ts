import type { Project } from "@/types";

/**
 * MARK II — project registry.
 *
 * Honesty rules applied here:
 * - No invented metrics, users, revenue or production claims.
 * - URLs that have not been verified are omitted (never faked).
 * - Collaboration status is omitted unless known.
 * - Screenshots: real captures go in `public/images/projects/<slug>/`;
 *   until provided, the case study renders a clearly-labelled
 *   "screenshot pending" exhibit instead of a fabricated UI.
 */

export const projects: Project[] = [
  {
    slug: "rallypro",
    index: "01",
    name: "RallyPro",
    category: "SaaS / Sports Technology",
    year: "2025",
    status: "live",
    tagline: "Club operations, unified.",
    summary:
      "A sports club management platform designed to help clubs run administrators, members, court reservations and day-to-day operations through one digital system.",
    role: "Product engineer — frontend, backend & application architecture",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "REST APIs",
      "Prisma",
      "PostgreSQL",
    ],
    liveUrl: undefined, // pending owner verification
    githubUrl: undefined, // pending owner verification
    featured: true,
    accent: "#f5c518",
    caseStudy: {
      problem:
        "Sports clubs often juggle administration, membership and court scheduling across disconnected spreadsheets, chat threads and paper logs. RallyPro centralises those workflows into a single role-aware platform so club staff can manage members, reservations and operations without stitching tools together.",
      roleDetail:
        "End-to-end product engineering: schema and API design, authentication and access control, the reservation workflow, member and administrator management, and the Next.js application architecture that ties them together.",
      contributions: [
        "Designed and implemented authentication and role-based access control for administrators and members",
        "Built club administration tooling for managing members, roles and club operations",
        "Implemented court reservation workflows with server-side validation and conflict-aware scheduling rules",
        "Architected the Next.js application structure, API integration layer and data models",
        "Shipped a responsive Tailwind CSS interface used by both administrators and members",
      ],
      architecture: [
        "Next.js App Router application with server-rendered routes and client interactivity islands",
        "REST API layer consumed by the frontend for club, member and reservation domains",
        "Relational schema (Prisma + PostgreSQL) modelling clubs, administrators, members and reservations",
        "Role-based access control enforced on the server for every privileged mutation",
      ],
      features: [
        "Authentication and role-based access control",
        "Club administration dashboard",
        "Member management and onboarding flows",
        "Court reservation workflows with validation",
        "Unified operations surface for club staff",
      ],
      challenges: [
        {
          challenge:
            "Reservation systems live or die on conflict handling — two members booking the same court in the same slot.",
          solution:
            "Server-side validation treats the reservation write as the source of truth: availability is checked and committed atomically at the API layer, with the UI surfacing actionable errors instead of silent failures.",
        },
        {
          challenge:
            "Administrators and members need completely different capabilities within one product.",
          solution:
            "Role-based access control is enforced server-side on every privileged route and mutation; the client uses the same roles only to shape the interface, never to authorise.",
        },
      ],
    },
  },
  {
    slug: "nebulawallet",
    index: "02",
    name: "NebulaWallet",
    category: "Fintech / Cryptocurrency",
    year: "2025",
    status: "live",
    tagline: "Digital asset clarity.",
    summary:
      "A cryptocurrency dashboard focused on digital asset information and wallet-related experiences, built for fast, legible market scanning.",
    role: "Product engineer — frontend & real-time data layer",
    stack: ["Next.js", "React", "Convex"],
    liveUrl: undefined,
    githubUrl: undefined,
    accent: "#8ab4ff",
    caseStudy: {
      problem:
        "Crypto markets move constantly and wallet information is usually scattered across explorers and exchange UIs. NebulaWallet consolidates asset information into one dashboard built for quick, confident scanning.",
      roleDetail:
        "Frontend and real-time data engineering: the dashboard information architecture, React component system and the Convex-backed data layer.",
      contributions: [
        "Built the portfolio dashboard interface for browsing digital asset information",
        "Modelled wallet-related data access patterns on Convex with reactive queries",
        "Designed the information hierarchy for fast asset comparison and scanning",
      ],
      architecture: [
        "Next.js application shell with React client components for interactive dashboard regions",
        "Convex as the real-time database and query layer — reactive subscriptions keep balances and lists live without polling",
        "Component-driven UI with strict TypeScript across data boundaries",
      ],
      features: [
        "Asset overview dashboard",
        "Reactive data updates via Convex subscriptions",
        "Wallet-related information surfaces",
        "Responsive, dense-but-legible data layout",
      ],
      challenges: [
        {
          challenge:
            "Live-feeling financial data without a heavy polling loop draining the client.",
          solution:
            "Convex reactive queries push updates to subscribed components only when underlying data changes — no interval polling, no redundant renders.",
        },
      ],
    },
  },
  {
    slug: "talentflow",
    index: "03",
    name: "TalentFlow LMS",
    category: "Education Technology",
    year: "2024",
    status: "live",
    tagline: "Learning, structured.",
    summary:
      "A learning management platform designed to support digital learning experiences and structured course management for learners and instructors.",
    role: "Product engineer — frontend & platform UI",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: undefined,
    githubUrl: undefined,
    accent: "#7ef0c4",
    caseStudy: {
      problem:
        "Digital learning products tend to fragment the learner journey across enrolment, content, progress and review. TalentFlow organises those stages into a single, structured learning experience.",
      roleDetail:
        "Frontend and platform engineering: the learner-facing interface, course management surfaces and the typed Next.js codebase.",
      contributions: [
        "Built the learner-facing course and learning experience interface",
        "Structured the typed Next.js codebase with reusable course components",
        "Implemented responsive Tailwind layouts for course content across devices",
      ],
      architecture: [
        "Next.js with TypeScript end-to-end — strict types across routing, data and components",
        "Component library approach in Tailwind CSS for course, lesson and progress surfaces",
        "App Router routing structure organised around learner journeys",
      ],
      features: [
        "Course catalogue and enrolment surfaces",
        "Structured lesson / module presentation",
        "Learner progress surfaces",
        "Instructor-side course management views",
      ],
      challenges: [
        {
          challenge:
            "Long-form educational content must stay readable and structured across phone, tablet and desktop.",
          solution:
            "A restrained, single-column reading layout with consistent vertical rhythm, paired with a persistent course outline, keeps orientation clear on every viewport.",
        },
      ],
    },
  },
  {
    slug: "rine-marketplace",
    index: "04",
    name: "RINE Marketplace",
    category: "E-commerce / Marketplace",
    year: "2024",
    status: "live",
    tagline: "Two storefronts, one ecosystem.",
    summary:
      "A marketplace ecosystem featuring separate customer and vendor experiences — discovery for buyers, tooling for sellers.",
    role: "Product engineer — frontend & marketplace workflows",
    stack: ["Next.js", "Material UI", "Laravel", "PHP", "MySQL"],
    liveUrl: undefined,
    githubUrl: undefined,
    accent: "#ffb07c",
    caseStudy: {
      problem:
        "Marketplaces serve two audiences with opposing goals: customers want effortless discovery; vendors want control. RINE separates the two experiences while sharing one commerce ecosystem and fulfilment flow.",
      roleDetail:
        "Frontend engineering on the marketplace surfaces and integration with the Laravel backend powering vendor and customer domains.",
      contributions: [
        "Built customer-facing marketplace and discovery interfaces in Next.js",
        "Built vendor-facing storefront management views",
        "Integrated the frontend with Laravel REST APIs across both experiences",
        "Applied Material UI to unify the two surfaces under one design language",
      ],
      architecture: [
        "Next.js frontend applications consuming a Laravel + PHP REST API",
        "MySQL relational schema for products, vendors, orders and customers",
        "Material UI design system shared between customer and vendor surfaces",
      ],
      features: [
        "Customer storefront and product discovery",
        "Vendor storefront and catalog management",
        "Order and checkout flows",
        "Separate role-aware experiences for buyers and sellers",
      ],
      challenges: [
        {
          challenge:
            "One brand, two products: buyer and vendor experiences need different information density and workflows.",
          solution:
            "Shared Material UI foundations with distinct layout systems per role — airy discovery layouts for customers, dense operational tables for vendors.",
        },
      ],
    },
  },
  {
    slug: "chucks-kitchen",
    index: "05",
    name: "Chucks Kitchen",
    category: "Restaurant / Web Development",
    year: "2024",
    status: "live",
    tagline: "Flavour, plated in HTML.",
    summary:
      "A modern restaurant website designed to present the brand and its offerings with warmth and clarity.",
    role: "Frontend developer — design & build",
    stack: ["React", "Vite", "JavaScript"],
    liveUrl: undefined,
    githubUrl: undefined,
    accent: "#ff8a80",
    caseStudy: {
      problem:
        "An independent restaurant needed a digital presence as considered as its plates — one that communicates the menu, atmosphere and brand rather than a generic template feel.",
      roleDetail:
        "End-to-end frontend development: design direction, build and responsive delivery with React + Vite.",
      contributions: [
        "Designed and built the full responsive restaurant website",
        "Implemented menu presentation and brand storytelling sections",
        "Delivered lightweight, fast static delivery with Vite",
      ],
      architecture: [
        "React SPA bundled with Vite for fast loads and simple hosting",
        "Component-scoped styling with a warm, editorial type-led visual system",
      ],
      features: [
        "Brand-led hero and atmosphere presentation",
        "Menu showcase",
        "Reservations / contact pathways",
        "Fully responsive, image-forward layout",
      ],
      challenges: [
        {
          challenge:
            "Restaurant sites live or die on appetite appeal — imagery and typography carry the entire experience.",
          solution:
            "Large editorial photography slots, warm neutral palette and generous negative space put the food first while keeping the page unmistakably the brand's own.",
        },
      ],
    },
  },
  {
    slug: "paws-and-pets",
    index: "06",
    name: "Paws & Pets",
    category: "E-commerce",
    year: "2023",
    status: "live",
    tagline: "Everything your companion deserves.",
    summary:
      "A pet store platform focused on product discovery and online shopping experiences for pet owners.",
    role: "Frontend developer — storefront experience",
    stack: ["Next.js"],
    liveUrl: undefined,
    githubUrl: undefined,
    accent: "#c9a8ff",
    caseStudy: {
      problem:
        "Pet owners shop for dozens of recurring categories. Paws & Pets organises the catalogue around discovery and repeat purchase rather than a flat product grid.",
      roleDetail:
        "Frontend development of the storefront experience: catalogue, product and shopping surfaces in Next.js.",
      contributions: [
        "Built the storefront and product discovery experience",
        "Implemented category-led browsing for pet supplies",
        "Delivered responsive shopping flows in Next.js",
      ],
      architecture: [
        "Next.js storefront with server-rendered catalogue routes",
        "Component structure organised around category, product and cart domains",
      ],
      features: [
        "Category-led product discovery",
        "Product detail surfaces",
        "Shopping and cart flows",
        "Responsive, friendly retail visual system",
      ],
      challenges: [
        {
          challenge:
            "Large, repetitive catalogues overwhelm shoppers; categories must feel browsable, not like a database.",
          solution:
            "Human-legible category groupings with consistent card anatomy keep scanning effort low across hundreds of SKUs.",
        },
      ],
    },
  },
];

export const featuredProject = projects.find((p) => p.featured) ?? projects[0];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
