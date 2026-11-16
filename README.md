# MARK II — The Digital Laboratory

Interactive 3D developer portfolio for **Daniel "Danny" Adepitan** — software developer in Lagos, Nigeria.
Previously a static HTML/CSS site; now rebuilt as a production-grade Next.js application.

Live: [simidaniels.vercel.app](https://simidaniels.vercel.app) · Branch `mark-ii-rebuild` → preview · `main` → production

---

## Stack

| Layer      | Tech                                                        |
| ---------- | ----------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Cache Components) · React 19 · TS   |
| Styling    | Tailwind CSS 4 · shadcn-style UI primitives · Lucide icons  |
| 3D         | Three.js · React Three Fiber · Drei (hero core + expertise) |
| Animation  | GSAP (hero entrance) · Motion (UI) · Lenis (smooth scroll)  |
| Forms      | React Hook Form · Zod (shared client/server schema)         |
| Email      | Resend (server-only, `/api/contact`)                        |
| Deploy     | Vercel + GitHub                                             |

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in RESEND_API_KEY (see below)
npm run dev                  # http://localhost:3000
```

No environment variables are required to build or browse the site.
The contact form requires `RESEND_API_KEY`; without it the API returns
`503 Email service is not configured yet.` and the UI shows a mailto fallback.

### Environment variables

See [.env.example](.env.example). `RESEND_API_KEY` is **server-only** — never exposed to the client.

## Scripts

```bash
npm run dev              # dev server
npm run build            # production build
npm run start            # serve production build
npm run lint             # ESLint
npm run typecheck        # tsc --noEmit
npm run generate:resume  # regenerates public/resume/Daniel-Adepitan-Resume.pdf (pdfmake)
node scripts/verify-ui.mjs [url]   # headless-Chrome smoke test (routes, console errors, forms)
```

## Architecture

```
src/
├── app/                  # App Router: /, /projects/[slug], /api/contact, SEO routes
├── components/
│   ├── navigation/       # Navbar (scroll-aware, active-section, a11y mobile panel)
│   ├── sections/         # Hero · About · Expertise · Projects · Experience · Resume · Contact
│   ├── case-study/       # ProjectVisual (real screenshot or labelled exhibit plate)
│   ├── layout/           # SmoothScroll (Lenis), Footer, CurrentYear
│   ├── three/            # SceneErrorBoundary + CoreFallback (WebGL-less static visual)
│   └── ui/               # button · section-heading · reveal · brand-icons
├── three/                # 3D system — separated from DOM UI
│   ├── scenes/           # hero-scene, expertise-scene (Canvas wrappers)
│   ├── objects/          # DigitalCore, ParticleField
│   └── lights/           # StageLights
├── data/                 # All content lives here — edit these, not components
│   ├── projects.ts       # The six concept studies + full case-study bodies
│   ├── expertise.ts      # Five discipline categories + technologies
│   ├── experience.ts     # Verified milestones only (employment TBD)
│   └── site.ts           # Identity, nav, socials (unverified links marked pending)
├── hooks/                # use-active-section, use-media-query, use-webgl-supported
├── lib/                  # utils (cn), contact-schema (shared zod)
└── types/                # Project, ExpertiseCategory, TimelineEntry
public/
├── concepts/             # The original HTML/CSS concept pages, served verbatim
│   ├── nova/             #   CryptoNova · sport/ · store/ (Nova Bike)
│   └── fashion/          #   novaleap/ · novaspace/ (Nova Finance)
└── resume/               # Daniel-Adepitan-Resume.pdf (generated, in git)
```

Decisions worth knowing:

- **3D is a progressive enhancement.** Every canvas sits behind `SceneErrorBoundary` + a WebGL support check; failure renders `CoreFallback` and the page stays fully usable. Mobile gets a cheaper scene (fewer particles, capped DPR, no antialias). `prefers-reduced-motion` freezes motion everywhere (Lenis disabled, frameloop `demand`, CSS clamps).
- **Content in data files.** Adding/editing a project = edit `src/data/projects.ts`. Screenshots drop into `public/images/projects/<slug>/…` and set `image:` on the entry — case study and gallery pick it up automatically.
- **Case studies are honest by construction.** Concept pages are labelled *Concept Study*; no metrics are invented; `liveUrl`/`githubUrl` only appear when real (all concepts link to the static page in `public/concepts/` and to this repo).

## Testing

- `npm run build` — clean (Cache Components compliant; no `Date()` in prerendered scopes)
- `node scripts/verify-ui.mjs` — headless Chrome: routes 200/404, hero canvas present, expertise node interaction, contact validation + server round-trip, mobile menu, reduced motion
- Contact API: schema validation (422), honeypot silent-drop, in-memory rate limit (3/10min/IP), Resend 503 without key

## Deployment (Vercel)

Production (`simidaniels.vercel.app`) deploys from `main`.

1. Merge `mark-ii-rebuild` → `main` **only after visual approval**.
2. Set env vars in Vercel → Project → Settings → Environment Variables:
   `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (optional; defaults in .env.example), `NEXT_PUBLIC_SITE_URL`.
3. Instantiate access: push to `main` → Vercel builds → live site replaced.
4. Revert path: `git revert` the merge commit on `main` — the previous static site is preserved in history (`5467905` and ancestors).

## Content honesty

- Resume PDF lists only verified facts (BSc Physics 2025 — FUOYE; WAEC 2019; the six concept studies; current skills).
- Employment history has **not** been supplied; the timeline notes this explicitly instead of inventing roles.
- Social links: GitHub verified (`github.com/Simidaniels`). LinkedIn pending — rendered as "link pending verification" until confirmed.
