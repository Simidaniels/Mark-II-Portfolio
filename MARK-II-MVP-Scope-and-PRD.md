# MARK II — MVP Scope & Product Requirements Document (PRD)

**Document status:** Product definition for implementation  
**Project:** MARK II — Interactive 3D Developer Portfolio  
**Owner:** Simi Daniels  
**Current portfolio:** https://simidaniels.vercel.app  
**Document purpose:** Define the MVP, product requirements, experience, technical scope, acceptance criteria, and delivery plan for rebuilding the existing portfolio.

---

# 1. Executive Summary

MARK II is a complete rebuild of the existing personal developer portfolio into a premium, interactive 3D web experience.

The product will combine an immersive digital-laboratory visual direction with minimalist 3D design, editorial typography, purposeful motion, and clear professional storytelling.

The portfolio must do more than look impressive. It must help visitors quickly understand:

1. Who the developer is.
2. What kind of software the developer builds.
3. Which technologies and engineering capabilities the developer uses.
4. What projects the developer has contributed to.
5. How to review relevant work and make contact.

The MVP will deliver a polished, responsive portfolio with a distinctive 3D hero, an interactive expertise experience, a featured project gallery, project detail pages, professional information, a downloadable resume, and a working contact form.

The 3D experience must enhance the content rather than obstruct it. All important information and navigation must remain usable if WebGL is unavailable or reduced motion is enabled.

## 1.1 Product Vision

Create a memorable digital portfolio that expresses the developer's identity through a coherent combination of software engineering, visual design, interaction, and 3D storytelling.

## 1.2 Product Positioning

**Positioning:** Software Developer | Full-Stack Engineer | Digital Product Builder

**Core message:** I build digital experiences beyond the ordinary.

**Supporting message:** I build modern web applications and digital products, working across frontend experiences, backend systems, and application architecture.

Personal statements and experience details must be confirmed against the developer's actual information before publication.

---

# 2. Goals and Success Criteria

## 2.1 Product Goals

- Establish a distinctive and credible personal developer brand.
- Present real projects with clear descriptions of role, contribution, and technology.
- Demonstrate frontend, backend, and product-building capabilities.
- Deliver an engaging but usable interactive 3D experience.
- Make it easy for recruiters, founders, clients, and collaborators to review work and make contact.
- Provide a fast, accessible, responsive experience across devices.
- Establish a maintainable foundation for future portfolio updates.

## 2.2 MVP Success Criteria

The MVP is successful when:

- The home page communicates the developer's identity and professional focus immediately.
- The hero contains a working, performant 3D experience with a useful fallback.
- Visitors can navigate all primary sections on desktop and mobile.
- Visitors can inspect the featured projects and open their case studies.
- Project information is accurate and does not contain invented claims.
- The expertise section communicates the developer's actual technical capabilities.
- The resume download works when a verified resume is supplied.
- The contact form validates submissions and delivers messages through the configured email provider.
- The production build succeeds.
- No critical accessibility, responsive, or navigation defects remain.
- The site is deployable to Vercel without exposing secrets.

## 2.3 Non-Goals for the MVP

The following are not required for the first release:

- User accounts or authentication.
- A content management system.
- A database-backed project editor.
- A blog or publishing platform.
- A custom admin dashboard.
- Visitor accounts, comments, or messaging inbox.
- Complex real-time multiplayer 3D interactions.
- A fully navigable virtual world.
- E-commerce or payment functionality.
- Artificial intelligence chat features.
- Custom analytics dashboards.
- A mobile application.

These may be considered after the MVP is live and validated.

---

# 3. Target Users and User Needs

## 3.1 Recruiters and Hiring Managers

They need to quickly understand the developer's professional focus, skills, experience, and quality of work.

**Primary actions:**
- Read the introduction.
- Review skills and experience.
- Inspect selected projects.
- Download the resume.
- Contact the developer.

## 3.2 Potential Clients and Founders

They need evidence that the developer can contribute to real digital products and understand product requirements.

**Primary actions:**
- Understand the services and capabilities.
- Review project case studies.
- Assess technologies and contributions.
- Initiate a conversation.

## 3.3 Developers and Technical Peers

They may want to inspect implementation choices, repositories, and technical problem-solving.

**Primary actions:**
- Review the technology stack.
- Read technical case studies.
- Visit public GitHub repositories.
- Explore live demonstrations where available.

## 3.4 General Visitors

They need a clear, memorable experience that is easy to understand and navigate.

**Primary actions:**
- Explore the portfolio.
- Learn about the developer.
- View projects.
- Find contact and social links.

---

# 4. Product Experience and Information Architecture

## 4.1 MVP Routes

| Route | Purpose | Priority |
|---|---|---|
| `/` | Main portfolio experience | P0 |
| `/projects/[slug]` | Individual project case study | P0 |
| `/robots.txt` | Search engine crawling rules | P1 |
| `/sitemap.xml` | Search engine discovery | P1 |

A separate About or Contact route is not required for MVP. These can be sections on the home page.

## 4.2 Main Page Sections

1. Navigation
2. 3D Hero
3. About
4. Interactive Expertise
5. Featured Projects
6. Experience
7. Resume
8. Contact
9. Footer

The page should have a clear content hierarchy and allow users to reach important information without being forced to complete or wait for a 3D sequence.

---

# 5. Functional Requirements

Priority definitions:

- **P0 — Must have:** Required for MVP release.
- **P1 — Should have:** Important, but can be completed after core functionality if necessary.
- **P2 — Could have:** Optional enhancement for a later release.

## 5.1 Navigation

**Priority:** P0

Requirements:

- Display MARK II or the approved personal brand mark.
- Provide links to Home, About, Expertise, Projects, Experience, and Contact.
- Provide a resume action when a verified resume is available.
- Show a clear active-section state.
- Support smooth section navigation without scroll hijacking.
- Provide a responsive mobile menu.
- Support keyboard navigation.
- Keep navigation usable independently of the 3D canvas.

Acceptance criteria:

- Every navigation item reaches the correct section.
- The mobile menu opens and closes using keyboard and touch.
- Menu items close the mobile menu after navigation.
- Focus indicators are visible.
- No navigation control depends exclusively on hover.

## 5.2 3D Hero

**Priority:** P0

Purpose: Create a distinctive first impression and establish the digital-laboratory identity.

Required content:

- Personal brand/name.
- Professional positioning.
- Primary headline.
- Supporting introduction.
- Location, if confirmed.
- Primary CTA: Explore My Work.
- Secondary CTA: Contact Me.
- Resume action, if a verified resume is available.
- Scroll indicator.

Visual requirements:

- Dark, atmospheric environment.
- One central abstract 3D sculpture or geometric digital core.
- Controlled lighting and depth.
- Subtle particle or orbital details where performance permits.
- Responsive composition.
- Readable text with sufficient contrast.

Interaction requirements:

- Subtle pointer-responsive movement on supported desktop devices.
- Controlled object or camera animation.
- Scroll-triggered transition where it improves the experience.
- Touch-compatible behavior without requiring dragging.
- No interaction may block access to the main content.

Fallback requirements:

- Detect WebGL availability or handle rendering failure.
- Provide a static visual fallback.
- Preserve all hero text and CTAs.
- Respect `prefers-reduced-motion`.
- Avoid rendering a broken or blank canvas.

Acceptance criteria:

- The hero renders on supported desktop and mobile devices.
- The fallback remains visually intentional.
- The hero text and CTAs remain usable if 3D fails.
- No continuous animation is required when the scene is not visible or when reduced motion is enabled.

## 5.3 About Section

**Priority:** P0

Purpose: Explain the developer's identity, interests, and approach to software development.

Required content:

- Short professional introduction.
- Development interests.
- Approach to building software.
- Relevant personal or professional highlights.
- Optional authentic portrait.

Content rules:

- Do not invent qualifications, employment, awards, clients, or achievements.
- Do not publish private information.
- Use an approved portrait only.
- If no portrait is available, use a designed abstract visual.

Acceptance criteria:

- The section communicates professional identity in concise language.
- Content is readable on mobile and desktop.
- Visual effects do not interfere with reading.

## 5.4 Interactive Expertise Section

**Priority:** P0

Purpose: Present technical capabilities in an engaging and understandable way.

Required categories:

**Frontend**
- HTML5
- CSS3
- JavaScript
- TypeScript
- React
- Next.js
- Tailwind CSS
- Material UI

**Backend**
- Node.js
- Express.js
- Laravel
- PHP
- REST APIs

**Databases and data tools**
- PostgreSQL
- MySQL
- Prisma
- Convex

**Development tools**
- Git
- GitHub
- Visual Studio Code
- Docker

**Infrastructure and deployment**
- Vercel
- Render
- Railway
- Cloudflare R2

These are candidate technologies based on known project context. Confirm the final list with the owner before publication.

Interaction requirements:

- Display categories as selectable 3D objects or nodes.
- Selecting an object reveals its category and technology list.
- Selected state must be visible.
- Provide click/tap selection.
- Provide a conventional accessible list as a fallback.
- Do not assign arbitrary skill percentages or unsupported proficiency ratings.

Acceptance criteria:

- All categories can be selected using pointer and touch.
- The selected category's content is readable.
- A non-3D alternative provides the same information.
- Selection is keyboard accessible.

## 5.5 Featured Projects

**Priority:** P0

Purpose: Demonstrate real development work and provide evidence of technical capability.

Initial candidate projects:

| Project | Category | Initial description |
|---|---|---|
| RallyPro | SaaS / Sports Technology | Sports club management platform |
| NebulaWallet | Fintech / Cryptocurrency | Cryptocurrency dashboard and wallet-related experience |
| TalentFlow LMS | Education Technology | Learning management platform |
| Rine Marketplace | E-commerce / Marketplace | Customer and vendor marketplace ecosystem |
| Chucks Kitchen | Restaurant / Web Development | Restaurant website |
| Paws & Pets | E-commerce | Pet store platform |

The project owner must verify project ownership, contribution, implementation status, public availability, and technology details before publication.

Each project card must support:

- Project name.
- Category.
- Concise description.
- Project image or screenshot.
- Technology labels.
- Case study link.
- Live demo link, only when valid and approved.
- Repository link, only when public and approved.

The gallery may use perspective, depth, layered previews, or subtle 3D transitions. Project information must remain accessible as ordinary page content.

Acceptance criteria:

- All approved featured projects display correctly.
- Project links are valid.
- No fabricated metrics or claims appear.
- Cards are keyboard and touch accessible.
- Images have appropriate alternative text.

## 5.6 Project Case Studies

**Priority:** P0

Route pattern: `/projects/[slug]`

Initial candidate slugs:

- `/projects/rallypro`
- `/projects/nebulawallet`
- `/projects/talentflow`
- `/projects/rine-marketplace`
- `/projects/chucks-kitchen`
- `/projects/paws-and-pets`

Each case study should support the following fields:

1. Project title.
2. Category.
3. Short summary.
4. Project status.
5. My role and contribution.
6. Problem or motivation.
7. Solution overview.
8. Key features.
9. Technology stack.
10. Architecture or implementation notes, where appropriate.
11. Challenges and solutions, where verified.
12. Screenshots.
13. Live demo URL, if available.
14. Public repository URL, if available.
15. Next/previous project navigation.

Content rules:

- Distinguish individual work from collaborative work.
- Explain the owner's actual contribution.
- Do not claim ownership of an entire project if the work was collaborative.
- Do not invent user counts, revenue, performance improvements, or business outcomes.
- Do not expose confidential code, credentials, internal URLs, or private company information.
- Do not publish screenshots containing personal data or secrets.

Acceptance criteria:

- Every published project has a working detail page.
- Missing optional fields are omitted cleanly.
- Invalid or unpublished slugs return a proper not-found page.
- Case studies are responsive and accessible.
- Page metadata is unique.

## 5.7 Experience Timeline

**Priority:** P1

Purpose: Present relevant professional experience, internships, and development milestones.

Each entry may include:

- Organisation.
- Role.
- Date range.
- Description.
- Responsibilities.
- Technical contributions.
- Technologies.

Only verified details may be published.

If information is not available, do not invent it. The section may initially show only confirmed entries or be omitted until content is supplied.

## 5.8 Resume

**Priority:** P0

Requirements:

- Provide a downloadable PDF resume when the owner supplies an approved document.
- Use a stable asset path.
- Provide a clear download action.
- Provide an optional short summary.
- Ensure the file works on mobile and desktop.

If no approved resume exists at implementation time:

- Build the section and download component.
- Use a clearly documented placeholder state during development.
- Do not present a fake resume as the owner's real CV.
- Do not show a broken download link in production.

## 5.9 Contact Form

**Priority:** P0

Fields:

- Full name.
- Email address.
- Subject.
- Message.

Requirements:

- Client-side usability validation.
- Server-side validation using Zod.
- React Hook Form for form state.
- Resend integration through a server-side route or server action.
- Loading, success, and error states.
- Spam protection or rate limiting.
- Safe handling of user input.
- Environment variables for credentials.
- No email API key in browser bundles.

Required environment variables should be documented in `.env.example`, for example:

```env
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
```

The sender address/domain must be verified with the email provider before production delivery can be considered complete.

Acceptance criteria:

- Invalid submissions are rejected with useful messages.
- Valid submissions are processed server-side.
- Success is shown only after the email provider confirms acceptance.
- Errors are handled without exposing secrets or internal stack traces.
- The form is keyboard accessible.

## 5.10 Footer

**Priority:** P0

Include:

- Brand/name.
- Short professional statement.
- Section navigation.
- Approved social links.
- Email contact link.
- Copyright year.
- Back-to-top action.

All external links must be verified.

---

# 6. Visual and Interaction Requirements

## 6.1 Creative Direction

**Theme:** Futuristic Digital Laboratory + Minimalist 3D + Premium Editorial.

The experience should be visually distinctive but restrained.

Suggested visual system:

- Deep black, charcoal, and graphite surfaces.
- Off-white primary text.
- One carefully selected accent colour.
- Large editorial headings.
- Monospace labels for technical metadata.
- Fine borders and subtle grid details.
- Controlled highlights and lighting.
- Generous spacing.
- Purposeful transitions.

The exact accent colour, typography, and component tokens should be established during the design phase.

## 6.2 3D Design Principles

- Use 3D to explain or reinforce content, not as decoration everywhere.
- Keep the hero as the primary immersive scene.
- Keep expertise interactions simple and purposeful.
- Use 3D project-gallery effects only when they improve browsing.
- Avoid making visitors navigate a complex virtual world to find information.
- Avoid excessive particle systems, heavy shadows, and expensive post-processing.
- Provide accessible HTML equivalents for meaningful content.

## 6.3 Animation Responsibilities

Use each library for a clear purpose:

| Technology | Responsibility |
|---|---|
| React Three Fiber | Declarative 3D scene composition |
| Three.js | 3D rendering and graphics |
| Drei | Reusable 3D helpers and controls |
| GSAP | Sequenced and scroll-linked animation |
| ScrollTrigger | Scroll-based animation triggers |
| Motion | UI transitions and component interaction |
| Lenis | Optional smooth scrolling |

Do not let multiple animation libraries control the same property on the same element.

Avoid scroll hijacking and excessive motion.

---

# 7. Technical Architecture

## 7.1 Approved Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16, stable patched release |
| UI | React 19 |
| Language | TypeScript |
| Routing | Next.js App Router |
| Styling | Tailwind CSS 4 |
| Components | shadcn/ui where useful |
| 3D | Three.js |
| React 3D integration | React Three Fiber |
| 3D helpers | Drei |
| Timeline animation | GSAP and ScrollTrigger |
| UI animation | Motion for React |
| Smooth scrolling | Lenis, optional |
| Forms | React Hook Form |
| Validation | Zod |
| Email | Resend |
| Hosting | Vercel |
| Source control | GitHub |

Use compatible stable package versions. Verify compatibility between Next.js, React, React Three Fiber, Three.js, GSAP, and other dependencies before installation.

Do not upgrade or downgrade packages blindly to resolve peer dependency warnings.

## 7.2 Suggested Project Structure

```text
MARK-II/
├── public/
│   ├── images/
│   ├── models/
│   ├── textures/
│   ├── fonts/
│   └── resume/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── projects/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   │
│   ├── components/
│   │   ├── navigation/
│   │   ├── sections/
│   │   ├── projects/
│   │   ├── forms/
│   │   ├── layout/
│   │   └── ui/
│   │
│   ├── three/
│   │   ├── scenes/
│   │   ├── objects/
│   │   ├── materials/
│   │   ├── lights/
│   │   └── interactions/
│   │
│   ├── animations/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   └── types/
│
├── .env.example
├── package.json
└── README.md
```

The structure may be adjusted when the repository audit identifies a better arrangement. Do not create folders without a real implementation need.

## 7.3 Rendering Strategy

- Use Server Components for static content and project data where possible.
- Load browser-only 3D components client-side.
- Dynamically import heavy scenes where appropriate.
- Avoid importing Three.js into unrelated server components.
- Keep the page's essential text and navigation available before 3D assets finish loading.
- Handle loading and rendering errors gracefully.
- Clean up event listeners, animation frames, and GPU resources when components unmount.

## 7.4 Content Management

For MVP, project and portfolio content should live in typed local data files.

Do not introduce a database or CMS unless the audit demonstrates a genuine need.

Create a clear content structure so the owner can update:

- Personal introduction.
- Skills.
- Projects.
- Case studies.
- Experience.
- Social links.
- Resume asset path.

---

# 8. Non-Functional Requirements

## 8.1 Performance

Targets, to be measured rather than assumed:

- Lighthouse Performance: 90+
- Lighthouse Accessibility: 95+
- Lighthouse Best Practices: 95+
- Lighthouse SEO: 95+

Targets should be assessed on representative mobile and desktop conditions.

Requirements:

- Optimise images and fonts.
- Use modern image formats where appropriate.
- Compress 3D assets.
- Lazy-load non-critical scenes.
- Limit geometry, particles, and expensive materials.
- Avoid unnecessary JavaScript.
- Pause or reduce off-screen animation.
- Avoid unnecessary continuous rendering.
- Monitor layout shifts.
- Keep essential content visible during loading.

A 3D-heavy page may require trade-offs. Report actual results and known limitations.

## 8.2 Accessibility

Target WCAG 2.2 AA practices where practical.

Requirements:

- Semantic HTML.
- Logical heading order.
- Keyboard-accessible controls.
- Visible focus states.
- Sufficient text contrast.
- Form labels and useful error messages.
- Alt text for meaningful images.
- Reduced-motion support.
- Accessible alternatives to 3D interactions.
- No information communicated by colour alone.

## 8.3 Responsive Support

Test at minimum:

- 320px
- 375px
- 390px
- 768px
- 1024px
- 1440px
- 1920px

Requirements:

- No page-level horizontal overflow.
- No overlapping text or controls.
- Touch targets should be comfortably usable.
- The mobile experience must be deliberately designed.
- Reduce 3D complexity on lower-powered devices.
- Preserve readable content if 3D is disabled.

## 8.4 Browser Support

Test current stable versions of:

- Chrome.
- Edge.
- Firefox.
- Safari.

Test mobile browsers where available.

---

# 9. Security and Privacy

- Never commit `.env` files or API secrets.
- Validate all contact form data on the server.
- Apply rate limiting or appropriate spam controls.
- Do not expose internal error details.
- Do not publish confidential project information.
- Do not publish private company code or data.
- Use only approved project screenshots and links.
- Avoid collecting unnecessary visitor data.
- If analytics are enabled, document what is collected and configure privacy-respecting behavior.
- Add a privacy notice if the implementation introduces meaningful personal-data collection beyond basic contact-form handling.

---

# 10. Content and Asset Requirements

The owner or project maintainer must provide or confirm the following before final production release:

| Asset or information | Required for |
|---|---|
| Approved display name and brand wording | Navigation and hero |
| Final professional introduction | Hero and About |
| Authentic portrait, optional | About |
| Confirmed technology list | Expertise |
| Project descriptions and ownership | Project gallery |
| Project screenshots | Project cards and case studies |
| Live project URLs | Project links |
| Public GitHub URLs | Repository links |
| Verified work and internship details | Experience |
| Approved PDF resume | Resume download |
| GitHub and LinkedIn profile URLs | Footer and contact |
| Contact destination email | Contact form |
| Verified sender domain/email | Resend delivery |
| Approved accent colour and font direction | Visual identity |

If information is missing, use clearly marked development placeholders. Do not invent personal or professional facts.

---

# 11. MVP Delivery Phases

## Phase 0 — Audit and Discovery

Tasks:

- Inspect existing website.
- Inspect repository and package versions.
- Identify existing assets.
- Identify current hosting and deployment setup.
- Review existing content.
- Produce audit report.
- Confirm project content and design direction.

**Exit criteria:** Audit and implementation plan reviewed.

## Phase 1 — Foundation and Design System

Tasks:

- Set up or rebuild the Next.js application.
- Configure TypeScript and Tailwind.
- Establish fonts, colour tokens, spacing, and layout.
- Create navigation and shared components.
- Establish project data types and content files.
- Confirm build and development scripts.

**Exit criteria:** Application runs and design foundation is consistent.

## Phase 2 — 3D Hero

Tasks:

- Build the 3D scene.
- Add the central object.
- Configure camera and lighting.
- Implement controlled pointer interaction.
- Add hero typography and CTAs.
- Add loading and error states.
- Add WebGL and reduced-motion fallback.

**Exit criteria:** Hero works on supported devices and remains usable without 3D.

## Phase 3 — Core Portfolio Sections

Tasks:

- Build About.
- Build expertise categories.
- Implement interactive expertise objects.
- Provide accessible non-3D alternative.
- Build experience section.
- Build resume section.

**Exit criteria:** All core professional information is accessible and accurate.

## Phase 4 — Projects and Case Studies

Tasks:

- Build project gallery.
- Add approved project data.
- Build dynamic project detail route.
- Add screenshots and technology labels.
- Add verified live and repository links.
- Add not-found handling.

**Exit criteria:** Approved projects and case studies work end-to-end.

## Phase 5 — Contact and Footer

Tasks:

- Build contact UI.
- Add form validation.
- Configure Resend.
- Add server-side handling.
- Add spam controls.
- Add footer and social links.

**Exit criteria:** Contact form is tested with the production email configuration.

## Phase 6 — Motion and Responsive Refinement

Tasks:

- Implement GSAP sequences.
- Add ScrollTrigger where appropriate.
- Add Motion UI transitions.
- Add optional Lenis integration.
- Tune mobile 3D quality.
- Test reduced-motion behavior.
- Refine responsive layouts.

**Exit criteria:** Motion is coherent, accessible, and does not block content.

## Phase 7 — Quality Assurance

Tasks:

- Run production build.
- Run lint and type checks.
- Test all routes.
- Test navigation and CTAs.
- Test project links.
- Test form validation and email delivery.
- Test WebGL fallback.
- Test reduced motion.
- Test mobile layouts.
- Run Lighthouse.
- Resolve critical and high-severity defects.

**Exit criteria:** Release checklist passes or remaining limitations are explicitly documented.

## Phase 8 — Deployment

Tasks:

- Configure Vercel project.
- Configure production environment variables.
- Verify domain and asset paths.
- Deploy to a preview environment.
- Test preview deployment.
- Obtain owner approval.
- Promote or deploy the approved version.
- Verify production routes and contact form.

**Exit criteria:** Production deployment is verified and the previous portfolio can be restored if needed.

---

# 12. MVP Acceptance Checklist

## Product and content

- [ ] Professional identity is clear.
- [ ] About content is accurate.
- [ ] Technology list is confirmed.
- [ ] Project ownership and contributions are accurate.
- [ ] No fabricated metrics or achievements.
- [ ] All published external links are verified.
- [ ] Resume is authentic and downloadable, or the production download action is omitted.

## Design and interaction

- [ ] Visual design follows the approved creative direction.
- [ ] Hero is visually distinctive.
- [ ] Hero 3D interaction works.
- [ ] WebGL fallback works.
- [ ] Expertise selection works.
- [ ] Project gallery works.
- [ ] Case study pages work.
- [ ] Navigation works on desktop and mobile.
- [ ] Reduced-motion mode is supported.

## Contact

- [ ] Form validation works.
- [ ] Server-side validation works.
- [ ] Loading state works.
- [ ] Success state reflects provider acceptance.
- [ ] Error state works.
- [ ] Rate limiting or spam controls are configured.
- [ ] No secret is exposed in the browser.

## Engineering

- [ ] Production build succeeds.
- [ ] TypeScript checks pass.
- [ ] Lint checks pass.
- [ ] No critical console errors.
- [ ] No broken routes.
- [ ] No page-level horizontal overflow.
- [ ] 3D resources are cleaned up appropriately.
- [ ] Images and assets are optimised.
- [ ] Metadata and sitemap are configured.

## Deployment

- [ ] Preview deployment tested.
- [ ] Environment variables configured.
- [ ] Production deployment approved.
- [ ] Production pages verified.
- [ ] Contact form tested in production.
- [ ] Rollback path documented.

---

# 13. Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| 3D scenes make the site slow | High | Lazy loading, asset optimisation, adaptive quality, fallback |
| 3D libraries have incompatible versions | High | Verify package compatibility before installation |
| Too much animation harms usability | Medium | Define animation responsibilities and reduced-motion behavior |
| Project content is incomplete | High | Use verified content only and mark missing information |
| Contact email fails in production | High | Verify sender domain and test production configuration |
| Mobile GPU performance is poor | High | Simplify scenes and provide static alternatives |
| Scope expands beyond MVP | High | Keep non-goals out of the first release |
| Existing deployment is overwritten too early | High | Use a separate branch and preview deployment |
| Private project information is exposed | High | Obtain approval for screenshots, descriptions, and links |

---

# 14. Post-MVP Roadmap

Potential improvements after the first release:

- More elaborate interactive 3D project environments.
- Advanced project filtering.
- Blog or technical writing section.
- CMS for project and experience updates.
- More detailed case-study visualisations.
- Interactive architecture diagrams.
- Additional language support.
- Privacy-conscious analytics and conversion tracking.
- More advanced 3D transitions.
- Optional light theme if it supports the design direction.

These are not MVP release blockers.

---

# 15. Instructions to the Coding Agent

Treat this document as the product scope and source of truth for MARK II.

Before implementation:

1. Read this PRD completely.
2. Audit the existing repository.
3. Identify conflicts between the existing project and this specification.
4. Verify current stable package versions and compatibility.
5. Produce an implementation plan mapped to the phases above.
6. Identify missing content and assets.
7. Identify technical risks.
8. Do not modify production deployment settings prematurely.

During implementation:

- Work phase by phase.
- Keep components modular.
- Keep project data structured.
- Use TypeScript strictly.
- Avoid unnecessary dependencies.
- Do not invent personal information.
- Do not replace functional behavior with static mockups.
- Test each major feature before proceeding.
- Keep a progress log.
- Report blockers and trade-offs clearly.

At the end of each phase, report:

- Completed work.
- Files created or changed.
- Tests performed.
- Test results.
- Outstanding issues.
- Next phase.

Do not mark a task complete unless it has been implemented and verified.

Do not deploy over the existing production website without explicit approval.

---

# 16. Definition of Done

MARK II MVP is considered complete when:

1. The approved visual identity is implemented.
2. The 3D hero and its fallback work.
3. The About and expertise sections are complete.
4. The project gallery and approved case studies work.
5. Experience and resume information is accurate.
6. The contact form works with verified production email configuration.
7. The site is responsive and accessible.
8. Performance has been measured and optimised.
9. SEO metadata is configured.
10. Lint, type checks, and production build pass.
11. Critical defects are resolved.
12. Preview deployment is approved.
13. Production deployment is verified.
14. Setup, environment variables, and maintenance instructions are documented.

**Final product standard:** MARK II must be a premium, technically credible, interactive 3D developer portfolio—not a conventional portfolio template with a decorative 3D object added to it.
