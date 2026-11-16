import type { Project } from "@/types";

/**
 * MARK II — project registry.
 *
 * These are the six concept studies from the previous iteration of this
 * site, restored as full case studies. They are design/engineering concept
 * pages — not client work and not shipped products — and every entry says
 * so. The standalone pages are served from /public/concepts/<dir>/ and
 * linked from each case study.
 *
 * Honesty rules applied:
 * - No invented metrics, users, or production claims (brand figures shown
 *   inside the concept pages are fictional set-dressing for the narrative).
 * - URLs that do not exist are omitted rather than faked.
   * - Role and collaboration are stated exactly as they happened.
 */

export const projects: Project[] = [
  {
    slug: "nova-crypto",
    index: "01",
    name: "Nova Crypto",
    category: "Concept Study — Crypto / Fintech",
    year: "2025",
    status: "live",
    tagline: "A fintech identity, from zero.",
    summary:
      "CryptoNova is a fictional crypto-platform concept exploring how a trust-first fintech brand could feel: dark surfaces, cool neon accents, disciplined typography and a product story spanning onboarding, staking and ecosystem access.",
    role: "Design & frontend development (concept)",
    collaboration: "Solo",
    stack: ["HTML5", "CSS3", "JavaScript", "AOS"],
    liveUrl: "/concepts/nova/index.html",
    githubUrl: "https://github.com/Simidaniels/Mark-II-Portfolio",
    image: "/concepts/nova/lib/images/card-news.png",
    accent: "#7dd3fc",
    caseStudy: {
      problem:
        "Crypto landing pages default to noise — charts flying, glow everywhere, nothing legible. The brief I set myself: could a fintech concept feel engineered and calm while still being unmistakably crypto? I wanted to prove that brand discipline, not decoration, carries a complex product story.",
      roleDetail:
        "Solo concept study: art direction, page design and frontend build. I also re-rendered the page twice — the first version skewed template-generic, so I rebuilt it with a tighter grid, cooler palette and a clearer product narrative (onboarding → earn → ecosystem).",
      contributions: [
        "Art-directed and built the complete single-page experience — hero, features, ecosystem, metrics, community and news sections",
        "Designed the dark fintech visual system: cool neon accent discipline, Space Grotesk/Inter pairing and glow used sparingly as hierarchy",
        "Rebuilt the mobile navigation overlays after repeated real-world drawer bugs across the concept set (see challenges)",
        "Implemented AOS scroll choreography and Boxicons iconography with reduced-motion-friendly fallbacks",
      ],
      architecture: [
        "Static single-page build — no framework, no build step, deployable anywhere static files are served",
        "Hand-rolled CSS design system: custom properties for the palette, spacing and elevation scale",
        "AOS for scroll-reveal timing; vanilla JS for the sticky header, mobile drawer and scroll state",
        "Boxicons via web component for iconography",
      ],
      features: [
        "Dark fintech visual identity",
        "Product narrative: onboarding, staking, ecosystem",
        "Metrics and news sections with editorial rhythm",
        "Mobile drawer navigation with overlay handling",
        "AOS-driven scroll reveals",
      ],
      challenges: [
        {
          challenge:
            "The mobile drawer kept misbehaving across the concept set — overlays lingering, widths fighting the viewport, pages scrollable underneath.",
          solution:
            "Fixed systematically across all pages: the drawer now owns a single source of truth for open state, locks body scroll, closes on overlay tap and Escape, and clamps its width on small screens. Tracked in three fix commits.",
        },
        {
          challenge:
            "Making a fictional product believable — 112M locked capital, 20K community — without tipping into dishonesty.",
          solution:
            "All figures are set-dressing inside the concept and labelled as design content; the page sells the design discipline, not fabricated traction.",
        },
      ],
    },
  },
  {
    slug: "nova-sport",
    index: "02",
    name: "Nova Sport",
    category: "Concept Study — Sports / Club Experience",
    year: "2025",
    status: "live",
    tagline: "Elite basketball training, digitized.",
    summary:
      "NOVASPORT is a fictional basketball-performance club concept: programs, coaches, membership pricing and community — presented with the intensity of the training floor rather than template fitness-site energy.",
    role: "Design & frontend development (concept)",
    collaboration: "Solo",
    stack: ["HTML5", "CSS3", "JavaScript", "AOS"],
    liveUrl: "/concepts/sport/index.html",
    githubUrl: "https://github.com/Simidaniels/Mark-II-Portfolio",
    image: "/concepts/sport/lib/mentor.jpeg",
    accent: "#f97316",
    caseStudy: {
      problem:
        "Sports club sites either shout (all energy, no information) or read like spreadsheets (all membership tiers, no emotion). Nova Sport tests whether a single page can carry elite-club atmosphere and still answer the buyer question: what will I get, and what will it cost?",
      roleDetail:
        "Solo concept study: art direction, content architecture and frontend build — programs, coach bios, pricing tiers, testimonial and contact, wired into one high-energy single page.",
      contributions: [
        "Designed and built the full club experience — programs grid, coach roster, two-tier membership pricing and contact block",
        "Art-directed the monochrome 'athlete in shadow' photography system with ember-orange accents",
        "Built the responsive membership pricing tables and coach cards with hover-state emphasis",
        "Carried over the shared mobile drawer fixes from the re-render cycle",
      ],
      architecture: [
        "Static single-page build with a shared CSS foundation across the concept set",
        "CSS custom properties for the ember/monochrome palette",
        "AOS reveals tuned for high-contrast imagery; Boxicons iconography",
      ],
      features: [
        "Program cards: skill sessions, performance blocks, community runs",
        "Coach roster with role descriptions",
        "Two-tier membership pricing with feature lists",
        "Dark editorial photography treatment",
        "AOS scroll choreography",
      ],
      challenges: [
        {
          challenge:
            "Photography-led hero sections collapse on mobile if type and image fight for the same pixels.",
          solution:
            "Switched the hero to a stacked composition under 768px — portrait becomes a band above the copy — keeping the impact without clipping the face or the headline.",
        },
      ],
    },
  },
  {
    slug: "nova-bike",
    index: "03",
    name: "Nova Bike",
    category: "Concept Study — Electric Mobility",
    year: "2025",
    status: "live",
    featured: true,
    tagline: "Future-ready electric mobility.",
    summary:
      "NOVABIKE is a fictional electric-mobility concept: a city e-bike brand with model lineup, pricing, ride technology, pre-order flow and subsidy checker — built like a product launch page, not a catalog.",
    role: "Design & frontend development (concept)",
    collaboration: "Solo",
    stack: ["HTML5", "CSS3", "JavaScript", "AOS"],
    liveUrl: "/concepts/store/index.html",
    githubUrl: "https://github.com/Simidaniels/Mark-II-Portfolio",
    image: "/concepts/store/lib/bycycle-2.png",
    accent: "#2dd4bf",
    caseStudy: {
      problem:
        "Electric mobility sits between spec sheet and showroom. The concept asked: can a single static page sell three bike models — with pricing, pre-orders and subsidy logic — and still feel like a premium launch rather than an e-commerce grid?",
      roleDetail:
        "Solo concept study: brand direction, information architecture and frontend build — models, technology, story, pre-order and subsidy sections composed as one editorial scroll.",
      contributions: [
        "Designed and built the complete product experience — hero, technology pillars, model lineup (Sky / Drift / Storm), pre-order and subsidies",
        "Art-directed product photography on pure black with studio-style rim lighting",
        "Priced three fictional trims with coherent anchoring ($3,697 / $3,997 / $4,697 launch batch)",
        "Wired AOS reveals and the shared mobile drawer fixes across the page",
      ],
      architecture: [
        "Static single-page build, same shared foundation as the concept set",
        "CSS custom properties for the teal/graphite palette and elevation ramp",
        "Section-driven scroll: Technology → Models → Story → Pre-order, with anchor nav",
      ],
      features: [
        "Model lineup with distinct positioning (city / long-range / adventure)",
        "Launch-batch pricing with anchor strike-throughs",
        "Technology pillars: adaptive power, connected control, precision build",
        "Pre-order and subsidy-check narrative sections",
        "Full mobile responsiveness across the lineup grid",
      ],
      challenges: [
        {
          challenge:
            "Three product models, each with pricing and features, risk reading like a pricing table and losing all brand atmosphere.",
          solution:
            "Sequenced the page as a launch narrative instead — emotion first (hero, technology), proof second (models), action last (pre-order) — with the lineup rendered as large editorial cards rather than table rows.",
        },
      ],
    },
  },
  {
    slug: "nova-fashion",
    index: "04",
    name: "Nova Fashion",
    category: "Concept Study — Luxury Editorial",
    year: "2026",
    status: "live",
    tagline: "Quiet confidence, in pixels.",
    summary:
      "NOVA FASHION is a luxury-fashion concept: editorial direction, collection storytelling and lookbook presentation for a fictional seasonal launch — built around mood, restraint and rhythm rather than product grids.",
    role: "Design & frontend development (concept)",
    collaboration: "Solo",
    stack: ["HTML5", "CSS3", "JavaScript", "AOS"],
    liveUrl: "/concepts/fashion/index.html",
    githubUrl: "https://github.com/Simidaniels/Mark-II-Portfolio",
    accent: "#e8b4bc",
    caseStudy: {
      problem:
        "Fashion e-commerce defaults to catalog. This concept asked whether a digital editorial — typography-led, spacious, restrained — could sell the feeling of a luxury collection before it ever showed a product grid.",
      roleDetail:
        "Solo concept study: editorial direction, page design and frontend build. Collections, editorial direction, highlights and journal sections composed as a campaign, not a store.",
      contributions: [
        "Designed and built the full editorial experience — hero campaign, collections, editorial direction, highlights and journal",
        "Art-directed the serif/mono type pairing and dusty-rose palette for a 'digital fashion campaign' register",
        "Built collection cards as mood pieces with numbered editions (Atelier Neutrals / Evening Noir / Soft Atelier)",
        "Kept the mobile experience editorial — stacked imagery, generous type scale, no broken grids",
      ],
      architecture: [
        "Static single-page build on the shared concept-set foundation",
        "CSS custom properties for the rose/bone/ink palette",
        "Editorial section rhythm with generous vertical whitespace bands",
      ],
      features: [
        "Campaign-first hero with collection positioning",
        "Three collection editions with distinct moods",
        "Editorial direction and highlights sections",
        "Journal-style notes section",
        "Typography-led responsive layout",
      ],
      challenges: [
        {
          challenge:
            "Editorial layouts are fragile without art direction assets — fashion needs photography to breathe.",
          solution:
            "Designed type-and-space-first: oversized serif headlines, hairline rules and numbered editions carry the identity, so the page holds even before final imagery lands.",
        },
      ],
    },
  },
  {
    slug: "novaleap",
    index: "05",
    name: "NovaLeap",
    category: "Concept Study — Hypercar Showroom",
    year: "2026",
    status: "live",
    tagline: "A client-side car showroom.",
    summary:
      "NOVALEAP is a fictional hypercar concept: a client-facing lineup with per-model garage entries, a comparison matrix, technology pillars and a reservation desk — spec-led storytelling, not neon racing fantasy.",
    role: "Design & frontend development (concept)",
    collaboration: "Solo",
    stack: ["HTML5", "CSS3", "JavaScript", "AOS"],
    liveUrl: "/concepts/novaleap/index.html",
    githubUrl: "https://github.com/Simidaniels/Mark-II-Portfolio",
    accent: "#a78bfa",
    caseStudy: {
      problem:
        "Car sites split between fantasy (all drama) and dealer portals (all logistics). NovaLeap tests whether a fictional hypercar brand can speak to an actual buyer: models, numbers, comparison and a reservation path — with drama spent only where it converts.",
      roleDetail:
        "Solo concept study: product framing, comparison-table information design and frontend build — garage, compare matrix, technology and reservation desk.",
      contributions: [
        "Designed and built the full showroom — hero, garage lineup (NV-X Phantom / NV-R Spectra / NV-S Pulse), compare table and reservation desk",
        "Wrote coherent spec sheets per model (power, 0–60, top speed, range, price) with consistent formatting",
        "Built a comparison matrix covering buyer-relevant attributes: best-for, drive mood, seating",
        "Shifted the aesthetic from 'racing fantasy' to 'premium automotive presentation' in the re-render pass",
      ],
      architecture: [
        "Static single-page build on the shared concept-set foundation",
        "Spec data rendered as structured content, not images — easy to re-theme per model",
        "Anchor navigation: Garage → Compare → Technology → Reserve",
      ],
      features: [
        "Three-model garage with full spec sheets",
        "Comparison matrix across buyer attributes",
        "Technology pillars: adaptive aero, driver intelligence, cabin UX",
        "Reservation desk with consultation framing",
        "Responsive spec tables",
      ],
      challenges: [
        {
          challenge:
            "Spec tables are dense; phones are narrow. Buyers won't pinch-zoom a 0–60 column.",
          solution:
            "Reframed specs as label/value pairs stacked per model on mobile, preserving sortable two-column comparison only on desktop where the width exists.",
        },
      ],
    },
  },
  {
    slug: "nova-finance",
    index: "06",
    name: "Nova Finance",
    category: "Concept Study — Wealth / Private Banking",
    year: "2026",
    status: "live",
    tagline: "Calm money, clearly shown.",
    summary:
      "Nova Finance is a fictional private-banking concept: wealth dashboard, portfolio allocation, card controls and client reports — designed to feel calm, premium and trustworthy rather than loud fintech.",
    role: "Design & frontend development (concept)",
    collaboration: "Solo",
    stack: ["HTML5", "CSS3", "JavaScript", "AOS"],
    liveUrl: "/concepts/novaspace/index.html",
    githubUrl: "https://github.com/Simidaniels/Mark-II-Portfolio",
    accent: "#93c5fd",
    caseStudy: {
      problem:
        "Private wealth interfaces signal value with subtlety — or with clipart yachts. This concept tests whether restraint (fine grids, quiet type, one accent) can make a fictional balance sheet feel trustworthy and premium.",
      roleDetail:
        "Solo concept study: information design, dashboard composition and frontend build — products, dashboard, insights and advisory sections.",
      contributions: [
        "Designed and built the full private-banking concept — hero, product suite, client dashboard, allocation insights and advisory CTA",
        "Composed the asset-allocation display (22/38/18/12/10 split) as structured data, not flat art",
        "Art-directed the 'calm high-tech' register: hairline rules, mono numerals, one restrained accent",
        "Built the responsive dashboard modules: asset wallets, card control, transfer center, reports",
      ],
      architecture: [
        "Static single-page build on the shared concept-set foundation",
        "Dashboard modules composed as CSS grid cards with consistent density",
        "Dark navy-ink palette with desaturated blue accent",
      ],
      features: [
        "Private banking product suite (banking / wealth / treasury)",
        "Client dashboard modules: wallets, card control, transfers, reports",
        "Portfolio allocation with per-slice performance labels",
        "Advisory CTA with call scheduling framing",
        "Typography-first responsive layout",
      ],
      challenges: [
        {
          challenge:
            "Financial dashboards invite feature-creep — every module screaming for attention equally.",
          solution:
            "Enforced a strict three-tier hierarchy: one headline figure (net worth), four supporting modules, one action path (advisory). Everything else defers to that reading order.",
        },
      ],
    },
  },
];

export const featuredProject =
  projects.find((p) => p.featured) ?? projects[0];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
