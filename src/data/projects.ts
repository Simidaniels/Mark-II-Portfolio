import type { Project } from "@/types";

/**
 * MARK II — project registry.
 *
 * These are the six concept studies from the previous iteration of this
 * site, re-presented with professional product positioning, refreshed
 * licensed imagery (Pexels License, downloaded locally) and a clear split
 * between what is built vs what is proposed — never blurred together.
 *
 * Honesty rules applied:
 * - No invented metrics, users, revenue or production claims. Brand
 *   figures shown inside the concept pages are fictional set-dressing.
 * - URLs that do not exist are omitted rather than faked.
 * - Role and collaboration are stated exactly as they happened.
 */

export const projects: Project[] = [
  {
    slug: "nova-crypto",
    index: "01",
    name: "Nova Crypto",
    category: "Cryptocurrency / Digital Assets",
    year: "2025",
    status: "live",
    tagline: "Crypto, made legible.",
    summary:
      "A dark fintech concept for the next generation of crypto investors — unified asset discovery, live market signals, portfolio intelligence and staking insights in one calm, trust-first interface.",
    positioning:
      "A modern cryptocurrency dashboard concept — one calm surface for asset discovery, price signals, portfolio monitoring and staking intelligence, replacing tab-chaos with a considered experience.",
    audience:
      "Crypto-curious retail investors — from first-time buyers to active portfolio trackers who want clarity over hype, and insight without degen-noise.",
    role: "Design & frontend development (concept)",
    collaboration: "Solo",
    stack: ["HTML5", "CSS3", "JavaScript", "AOS"],
    liveUrl: "/concepts/nova",
    githubUrl: "https://github.com/Simidaniels/Mark-II-Portfolio",
    image: "/images/nova/nova-crypto-hero.jpg",
    secondaryImage: "/images/nova/nova-crypto-secondary.jpg",
    heroVariant: "split",
    accent: "#34e0a1",
    caseStudy: {
      problem:
        "Crypto tooling splits the retail investor across five tabs — exchanges for prices, portfolio trackers for P/L, Twitter for signal, dashboards for news. Nova Crypto asks whether one disciplined surface can hold discovery, tracking and insight together without becoming a slot machine.",
      roleDetail:
        "Solo concept study: art direction, information architecture and frontend build. I wrote the fictional brand's content system — ticker, metrics, newsroom and staking calculator — to be believable, not just pretty.",
      contributions: [
        "Art-directed and built the complete single-page product — hero portfolio card, features, ecosystem, metrics, newsroom and signup",
        "Designed the live ticker marquee and portfolio card with range-toggle performance chart (1W / 1M / 1Y)",
        "Implemented the staking calculator — net APY, monthly and annual yield, computed client-side",
        "Rebuilt mobile navigation overlays after the concept set's drawer bugs (see git history — three fix commits)",
      ],
      architecture: [
        "Static single-page build — no framework, deployable anywhere static files are served",
        "Hand-rolled CSS design system: custom properties for surface, accent and elevation",
        "AOS choreography; vanilla JS for nav, drawer and range switching",
        "Pexels-licensed photography, downloaded locally and served from /images/nova",
      ],
      features: [
        "Live ticker marquee (BTC · ETH · SOL · NOVA · BNB · ARB)",
        "Interactive portfolio card — range-toggle chart (1W/1M/1Y)",
        "Allocation bars per asset (BTC/ETH/NOVA/yields)",
        "Staking calculator — APY, est. monthly & annual yield",
        "Tabbed feature explorer — Onboarding / Earning / Ecosystem",
        "Newsroom with category tagging and newsletter capture",
        "Launch-app signup modal with validation",
      ],
      proposed: [
        "Market discovery feed — trending movers, gainers/losers, volume",
        "Price alerts with configurable thresholds",
        "Historical portfolio P/L with cost-basis accounting",
        "Watchlists with per-asset deep dives",
        "News aggregation with source weighting",
        "Multi-exchange connectivity (read-only API keys)",
        "Staking route comparison across protocols",
      ],
      challenges: [
        {
          challenge:
            "Making a fictional product believable — $112M locked, 20K users — without tipping into dishonesty.",
          solution:
            "All figures are set-dressing inside the concept and labelled as such; the page sells the interface discipline, not fabricated traction.",
        },
        {
          challenge:
            "Fintech legibility under dark-mode — charts must read at a glance without becoming cockpit noise.",
          solution:
            "One mint accent for positive delta, flat red for negative, everything else muted bone. Chart bars are the loudest element on the page, by design.",
        },
      ],
    },
  },
  {
    slug: "nova-sport",
    index: "02",
    name: "Nova Sport",
    category: "Sports / Sports Technology",
    year: "2025",
    status: "live",
    tagline: "Performance, provable.",
    summary:
      "A sports technology concept for the modern athlete — structured programs, coach visibility, events and community in one high-energy interface built for competitive players.",
    positioning:
      "A sports club and athlete-performance concept — programs, coaches, membership and community in one disciplined dark interface, treating sport as a craft with a data layer.",
    audience:
      "Athletes, coaches, clubs and sports communities — competitive players seeking structured development, and clubs running programs, memberships and events.",
    role: "Design & frontend development (concept)",
    collaboration: "Solo",
    stack: ["HTML5", "CSS3", "JavaScript", "AOS"],
    liveUrl: "/concepts/sport",
    githubUrl: "https://github.com/Simidaniels/Mark-II-Portfolio",
    image: "/images/nova/nova-sport-hero.jpg",
    secondaryImage: "/images/nova/nova-sport-secondary.jpg",
    heroVariant: "bleed",
    accent: "#f97316",
    caseStudy: {
      problem:
        "Sports club sites split between hype reels and brochure bureaucracy. Nova Sport tests whether one page can carry elite-club atmosphere and answer the buyer's real questions — what's on, who's coaching, what does it cost, and when is the next session.",
      roleDetail:
        "Solo concept study: art direction, content architecture and frontend build — programs, coach roster, membership pricing, testimonial and contact, wired into one high-energy page.",
      contributions: [
        "Designed and built the full club experience — hero, stat band, programs grid, coach roster, membership tiers and contact",
        "Art-directed the monochrome athlete photography with ember-orange accent discipline",
        "Built responsive pricing tables and coach cards with hover-reveal emphasis",
        "Enrollment modal — name, phone, plan, position and level, with demo-flow success state",
      ],
      architecture: [
        "Static single-page build with the shared concept-set foundation",
        "CSS custom properties for the ember/monochrome palette",
        "AOS reveals tuned for high-contrast imagery; Boxicons glyphs",
      ],
      features: [
        "Hero with athlete artwork and live-stat band (athletes · sessions · signups)",
        "Program cards — Skill Sessions / Performance Blocks / Community Runs",
        "Coach roster with specialty and experience framing",
        "Membership pricing — Starter / Performance with monthly-annual toggle (−17%)",
        "Testimonial block and free-first-session contact CTA",
        "Enrollment modal with position, level and plan selection",
      ],
      proposed: [
        "Event calendar — fixtures, open sessions, trials and tournaments",
        "Live scores and fixture feeds for club matches",
        "Athlete profiles with verified performance benchmarks",
        "Training log and progress tracking per member",
        "Team announcements and squad communication",
        "Membership portal — renewals, invoices and attendance",
      ],
      challenges: [
        {
          challenge:
            "Photography-led heroes collapse on mobile when type and image fight for the same pixels.",
          solution:
            "Stacked composition under 768px — image becomes a band above the copy — keeping impact without clipping faces or headlines.",
        },
      ],
    },
  },
  {
    slug: "nova-bike",
    index: "03",
    name: "Nova Bike",
    category: "Mobility / Cycling",
    year: "2025",
    status: "live",
    featured: true,
    tagline: "Ride engineering you can see.",
    summary:
      "A mobility-first concept for the discerning rider — model discovery, specification-by-design, launch logistics and ownership economics in a calm, premium interface.",
    positioning:
      "A premium cycling concept — discover the bike, study the build, understand the ownership economics, reserve with confidence. Mobility as a considered purchase, not an impulse.",
    audience:
      "Performance cyclists, enthusiast riders and premium urban commuters comparing serious builds before committing — engineering-literate, detail-first buyers.",
    role: "Design & frontend development (concept)",
    collaboration: "Solo",
    stack: ["HTML5", "CSS3", "JavaScript", "AOS"],
    liveUrl: "/concepts/store",
    githubUrl: "https://github.com/Simidaniels/Mark-II-Portfolio",
    image: "/images/nova/nova-bike-hero.jpg",
    secondaryImage: "/images/nova/nova-bike-secondary.jpg",
    heroVariant: "split",
    accent: "#2dd4bf",
    caseStudy: {
      problem:
        "Bike buying online splits research from reality — spec sheets without soul, lifestyle imagery without numbers. Nova Bike tests whether a page can do both: feel like a studio shot, read like an engineer's notebook.",
      roleDetail:
        "Solo concept study: brand direction, information architecture and frontend build — interactive model lineup, technology pillars, story, pre-order and subsidy sections.",
      contributions: [
        "Designed and built the complete product experience — hero, technology pillars, lineup (Sky / Drift / Storm), pre-order and subsidies",
        "Interactive model switcher — Sky / Drift / Storm — driving render, pricing and spec bars in the hero",
        "Built a subsidy-aware pricing estimator (city → indicative rebate → effective price)",
        "Reserve modal with model select, financing options and demo-flow success state",
      ],
      architecture: [
        "Static single-page build on the shared concept-set foundation",
        "CSS custom properties for the teal/graphite palette and elevation ramp",
        "Launch countdown computed client-side from mount time; state-free re-render",
      ],
      features: [
        "Interactive model switcher — Sky / Drift / Storm in the hero",
        "Spec bars — range, acceleration, handling & comfort (per model)",
        "Launch countdown timer (days/hours/minutes/seconds)",
        "Technology pillars — Adaptive power / Connected control / Precision build",
        "Subsidy estimator — city selector with indicative rebate and effective price",
        "Reserve modal with financing options (outright / 24 / 36 months)",
      ],
      proposed: [
        "Full spec sheets with drivetrain, geometry and weight",
        "Head-to-head compare matrix across the lineup",
        "Dealer and demo-ride locator",
        "Trade-in valuation flow for existing bikes",
        "Test-ride booking with scheduling",
        "Ride-tracking integration and service scheduling",
      ],
      challenges: [
        {
          challenge:
            "Three models, each with pricing and features, risk reading like a table and losing brand atmosphere.",
          solution:
            "Sequence as a launch narrative — emotion first (hero, technology), proof second (lineup cards), action last (pre-order) — with the lineup as large editorial cards, never table rows.",
        },
      ],
    },
  },
  {
    slug: "nova-fashion",
    index: "04",
    name: "Nova Fashion",
    category: "Fashion / E-commerce",
    year: "2026",
    status: "live",
    tagline: "Retail as editorial.",
    summary:
      "A luxury editorial fashion concept — SS26 presented as chapters rather than catalogues, where art direction leads and the shopping intention follows naturally.",
    positioning:
      "A premium fashion editorial retail concept — SS26 told in three chapters (Atelier Neutrals, Evening Noir, Soft Atelier) with mood-led merchandising and restrained typography.",
    audience:
      "Style-conscious shoppers who prefer curation to catalogue — editorial readers, premium retail customers, and buyers drawn to considered seasonal stories.",
    role: "Design & frontend development (concept)",
    collaboration: "Solo",
    stack: ["HTML5", "CSS3", "JavaScript", "AOS"],
    liveUrl: "/concepts/fashion",
    githubUrl: "https://github.com/Simidaniels/Mark-II-Portfolio",
    image: "/images/nova/nova-fashion-secondary.jpg",
    secondaryImage: "/images/nova/nova-fashion-hero.jpg",
    heroVariant: "editorial",
    accent: "#e8b4bc",
    caseStudy: {
      problem:
        "Fashion e-commerce defaults to grid-and-filter. Nova Fashion tests whether a digital editorial — typography-led, spacious, restrained — can hold a collection's mood and still serve the shopper who wants to buy.",
      roleDetail:
        "Solo concept study: editorial direction, page design and frontend build — collections, editorial direction, highlights, journal and lookbook capture.",
      contributions: [
        "Designed and built the full editorial experience — cover story, collections, direction, highlights, journal",
        "Interactive chapter index — Atelier Neutrals / Evening Noir / Soft Atelier — with swatch plates and edition notes",
        "Built the journal index and SS26 highlights strip as editorial rhythm devices",
        "Lookbook email capture with validation and success state",
      ],
      architecture: [
        "Static single-page build on the shared concept-set foundation",
        "Playfair Display serif with Plex Mono labels — editorial voice against technical caption",
        "Chapter state drives swatch plate and copy without a page reload",
      ],
      features: [
        "Cover story hero — 'Signature tailoring. Quiet confidence.'",
        "Interactive chapter index with swatch-driven plate imagery",
        "Editorial direction block with curatorial pillar notes",
        "Highlights strip — 12 looks / 03 directions / SS26 positioning",
        "Journal index with dates and reading cues",
        "SS26 lookbook email capture with validated success state",
      ],
      proposed: [
        "Shoppable chapters — add-to-bag from lookbook spreads",
        "Clienteling — book a stylist appointment in-store or video",
        "Fit guidance with size recommendation by garment and silhouette",
        "Chapter waitlists with drop notifications",
        "Editorial shoppable video — runway-to-rail commerce",
        "VIP appointments and private previews",
      ],
      challenges: [
        {
          challenge:
            "Editorial layouts are fragile without art direction assets — fashion needs photography to breathe.",
          solution:
            "Type-and-space-first design: oversized serif headlines, hairline rules and numbered editions carry identity before final imagery lands.",
        },
      ],
    },
  },
  {
    slug: "novaleap",
    index: "05",
    name: "NovaLeap",
    category: "Automotive / Mobility Technology",
    year: "2026",
    status: "live",
    tagline: "The electric flagship, unveiled.",
    summary:
      "A cinematic automotive concept — the digital unveiling of an electric flagship: spec-led storytelling, head-to-head comparison and a reservation desk worthy of the car itself.",
    positioning:
      "A cinematic automotive concept — spec-led storytelling around an electric flagship, with animated presentation, garage master-detail and reservation-desk theatre.",
    audience:
      "Enthusiast buyers and premium EV shoppers exploring performance data, comparing flagship candidates, and reserving a build slot.",
    role: "Design & frontend development (concept)",
    collaboration: "Solo",
    stack: ["HTML5", "CSS3", "JavaScript", "AOS"],
    liveUrl: "/concepts/novaleap",
    githubUrl: "https://github.com/Simidaniels/Mark-II-Portfolio",
    image: "/images/nova/novaleap-hero.jpg",
    secondaryImage: "/images/nova/novaleap-secondary.jpg",
    heroVariant: "bleed",
    accent: "#a78bfa",
    caseStudy: {
      problem:
        "Car sites split between fantasy reels and dealership portals. NovaLeap tests whether a fictional hypercar brand can speak to an actual buyer — models, numbers, comparison and a reservation path — with drama spent only where it converts.",
      roleDetail:
        "Solo concept study: product framing, comparison-table information design and frontend build — garage, compare matrix, technology and reservation desk.",
      contributions: [
        "Designed and built the full showroom — hero silhouette, garage lineup, compare matrix, technology pillars, reservation desk",
        "Animated SVG hypercar — spring drive-in entrance, continuous wheel-rim spin, speed-line flow, idle hover bob",
        "Wrote coherent spec sheets per model (NV-X Phantom / NV-R Spectra / NV-S Pulse)",
        "Built a buyer-relevant comparison matrix — best-for, drive mood, seating",
      ],
      architecture: [
        "Static single-page build on the shared concept-set foundation",
        "Spec data rendered as structured content — re-themable per model",
        "Motion drives the silhouette: spring entrance, rAF-free CSS loops, reduced-motion safe",
      ],
      features: [
        "Animated SVG hypercar — spring drive-in, wheel spin, speed-line flow",
        "Garage master-detail — three models with live spec panel swap",
        "Comparison matrix — power, 0–60, top speed, range, price, best-for",
        "Technology pillars — Adaptive Aero / Driver Intelligence / Cabin UX",
        "Reservation desk modal — name, email, model, financing; 24h reveal call",
        "Cinematic full-bleed hero with letterbox composition",
      ],
      proposed: [
        "Full configurator — aero, cabin trim, paint, wheel design",
        "Delivery-slot scheduling with build-to-order queue",
        "Trade-in valuation flow for existing vehicles",
        "Charging-network map with route planning",
        "Ownership cost calculator — energy, insurance, servicing",
        "Press media kit with high-res asset licensing",
      ],
      challenges: [
        {
          challenge:
            "A fictional hypercar must feel engineered, not rendered.",
          solution:
            "Typography carries the fiction: Anton telemetry numerals, mono caption discipline, and a comparison table honest enough to feel like a spec sheet, not a poster.",
        },
      ],
    },
  },
  {
    slug: "nova-finance",
    index: "06",
    name: "Nova Finance",
    category: "Financial Technology",
    year: "2026",
    status: "live",
    tagline: "Wealth, made legible.",
    summary:
      "A refined personal-finance concept — financial clarity through considered design: tracking, insight, allocation and one-call advisory in a calm, premium interface.",
    positioning:
      "A personal-finance concept built for clarity — net worth, allocation, approvals and insight in one restrained interface, replacing the bank-app anxiety loop with legibility.",
    audience:
      "Individuals and families who want a calmer relationship with money — from budgeting discipline to portfolio-level awareness, served with dignity.",
    role: "Design & frontend development (concept)",
    collaboration: "Solo",
    stack: ["HTML5", "CSS3", "JavaScript", "AOS"],
    liveUrl: "/concepts/novaspace",
    githubUrl: "https://github.com/Simidaniels/Mark-II-Portfolio",
    image: "/images/nova/nova-finance-hero.jpg",
    secondaryImage: "/images/nova/nova-finance-secondary.jpg",
    heroVariant: "split",
    accent: "#c9a86a",
    caseStudy: {
      problem:
        "Finance apps shout — red alerts, streaks, guilt trips. Nova Finance asks whether a personal-finance interface can be premium and quiet: every figure visible, every action deliberate, every screen designed to be looked at calmly.",
      roleDetail:
        "Solo concept study: information design, dashboard composition and frontend build — products, client dashboard, allocation insights and advisory CTA.",
      contributions: [
        "Designed and built the complete private-banking experience — hero, product suite, client dashboard, allocation insights",
        "Functional dashboard — masked net-worth toggle, freeze-card switch, transfer approval queue that actually approves/rejects",
        "Composed the asset-allocation display (22/38/18/12/10) as structured data",
        "Art-directed the calm high-tech register — hairline rules, mono numerals, one restrained brass accent",
      ],
      architecture: [
        "Static single-page build on the shared concept-set foundation",
        "Dashboard modules as CSS grid — consistent density across wallets, cards, transfers",
        "Navy-ink palette with desaturated brass accent; figures never shout",
      ],
      features: [
        "Masked net-worth dashboard — $4.28M headline with eye-toggle privacy",
        "Freeze-card toggle with instant authorisation halt state",
        "Approvals queue — outbound wires with Approve / Reject actions",
        "Asset wallets (NGN / USD / EUR) with visibility toggle",
        "Allocation breakdown — cash/equities/funds/digital/real assets with posture labels",
        "Client report strip + advisory CTA with product-suite nav",
      ],
      proposed: [
        "Expense tracking and categorisation with monthly review",
        "Budgets with over-threshold alerts (never guilt, only clarity)",
        "Recurring bill detection and due-date calendar",
        "Savings goals with automated round-ups",
        "Weekly insight digest — net-worth delta and posture shifts",
        "Account aggregation — external banks via read-only connections",
      ],
      challenges: [
        {
          challenge:
            "Financial dashboards invite feature-creep — everything shouting for attention equally.",
          solution:
            "Enforced three-tier hierarchy: one headline (net worth), four supporting modules, one action path. Everything else defers to that reading order.",
        },
      ],
    },
  },
  {
    slug: "design-brooks",
    index: "07",
    name: "Design Brooks",
    category: "Client Work — Architecture Studio",
    year: "2026",
    status: "live",
    tagline: "Website. Console. Portal. One system.",
    summary:
      "Full-stack product for Design Brooks, an architectural studio: a premium public website, a session-authenticated admin console and a token-gated client document portal — one deployable, three experiences.",
    positioning:
      "A complete production platform for a real architectural studio — public presence, back-office operations and private document delivery, engineered as one system.",
    audience:
      "Design Brooks — a multidisciplinary architecture & interiors studio — and its clients: the principal running the practice, and project clients receiving drawings through controlled links.",
    role: "Full-stack product engineer — architecture, backend, frontend, infra",
    collaboration: "Solo",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "PostgreSQL",
      "Prisma 6",
      "Cloudflare R2",
      "pdf.js",
    ],
    liveUrl: "https://design-brooks.vercel.app",
    githubUrl: "https://github.com/Simidaniels/designBrooks",
    image: "/images/design-brooks/house.jpg",
    secondaryImage: "/images/design-brooks/office.webp",
    heroVariant: "split",
    accent: "#f97316",
    caseStudy: {
      problem:
        "An architecture studio needs three things at once: a public face that wins trust, a back office that runs the business, and a way to hand drawings to clients without emailing uncontrolled PDFs. Design Brooks commissioned all three as one product — with document access gated by payment status, without the client ever seeing that status.",
      roleDetail:
        "Solo engineer across the entire engagement: information architecture, public website, admin console, client portal, data model, auth, storage and deployment.",
      contributions: [
        "Built the complete public website — studio, portfolio deep-dives, services, insights, contact and consultation flow, all SEO-complete",
        "Designed and implemented the single-admin session console: scrypt-hashed passwords, 256-bit opaque tokens stored as SHA-256 hashes, rolling 7-day expiry, server-enforced authorization in every layout, action and route handler",
        "Engineered the document delivery pipeline: RESTRICTED_PREVIEW issues a server-generated watermarked preview (pdf-lib / sharp) — the original never leaves the server; FULL_ACCESS grants pdf.js viewing and an authorized download route that re-checks permission per request",
        "Built the client portal: one private link per project, raw token shown once, SHA-256-hashed storage, existence / status / expiry enforced on every request — no client accounts, no registration surface",
        "Implemented the cover-image pipeline: magic-byte validation, EXIF auto-rotation, WebP resize to ≤2000px, served only to signed-in admins at private, no-store URLs",
        "Hardened uploads and inquiries: allowlist + magic-byte sniffing, 25 MB cap, honeypot + throttle, nosniff headers, private non-public storage keys",
      ],
      architecture: [
        "One Next.js 16 App Router deployable with three route groups: (public), /admin (auth-guarded), /client portal",
        "PostgreSQL + Prisma 6 — clients, projects, documents, access links, sessions, inquiries, activity log",
        "Cloudflare R2 (S3-compatible, private bucket) in production; local private disk for development — switching is env-driven",
        "Neon pooled connection for runtime queries; direct connection for migrations",
        "Token links: raw token displayed once at generation; only the SHA-256 hash is stored; validation happens server-side per request",
      ],
      features: [
        "Public studio website — projects, services, insights, inquiry capture",
        "Admin console — clients, projects, documents, access links, inquiries, activity, settings",
        "Client portal — token-gated, watermarked pre-payment previews, full access after approval",
        "Server-side watermarking (pdf-lib / sharp) — originals never served",
        "Cover image pipeline — validated, EXIF-normalized, WebP, admin-only URLs",
        "Activity log and single-admin settings with password rotation",
      ],
      proposed: [
        "Email delivery of share links with view receipts",
        "Whiteboard-style comment pins on drawings for client review",
        "Per-document expiry and revocation visibility for the admin",
        "Engagement analytics — opens, views, downloads per link",
        "Multi-admin RBAC (principal / associates / admin)",
      ],
      challenges: [
        {
          challenge:
            "Clients must never see payment status — no labels, no hints, no leaked semantics.",
          solution:
            "Access is encoded only as permissions. The client surface sees documents and their granted actions; paid/unpaid exists solely as server-side access settings chosen by the admin, and route handlers refuse restricted downloads at the HTTP layer regardless of UI state.",
        },
        {
          challenge:
            "Showing a drawing without giving it away.",
          solution:
            "Restricted documents are rendered to watermarked previews server-side; the original file stays in private storage and is never URL-addressable. The download handler independently re-authorizes and returns 403 for restricted documents — even with a valid token.",
        },
        {
          challenge:
            "Single-admin security without a managed auth provider.",
          solution:
            "scrypt password hashing, 256-bit opaque session tokens stored as SHA-256, rolling 7-day expiry, and authorization re-checked in every layout, server action and route handler — never trusted from the UI.",
        },
      ],
    },
  },
];

export const featuredProject =
  projects.find((p) => p.featured) ?? projects[0];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);