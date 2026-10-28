<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# ArtSwapy — Workspace Instructions

## 1. Practice & Audience
- **ArtSwapy** is an independent brand design and consulting practice founded by **Swapnil Gathibandhe** (Nagpur, India · working worldwide).
- **Audience:** Founders, business owners, and marketing leads seeking complete brand systems—from positioning strategy through visual identity, packaging, communications, and digital/physical applications.
- **Core Goal:** Present brand case studies and studio capabilities with editorial clarity, purposeful motion, and frictionless contact routes (`mailto:`, copy-email with toast/stamp feedback, and WhatsApp).

## 2. Visual Palette & Design Principles
- **Baseline:** Treat the existing Next.js MVP (`src/styles/tokens.css`, `src/app/globals.css`, and `DESIGN.md`) as the visual foundation. Preserve its established visual direction and do not replace the design system.
- **Palette (`src/styles/tokens.css`):**
  - Warm white paper ground: `--bg: #f6f4ef`, panel surface: `--surface: #ece9e1`
  - Near-black ink: `--ink: #161614`, secondary muted text: `--muted: #5b5850`
  - Bright orange accent: `--accent: #ff551f` (signature simple orange used universally across all buttons, threads, focus rings, and accents; `--thread: #ff551f`; ink on orange is `--on-accent: #161614`)
- **Typography:** `Space Grotesk` (`--font-display`, weights 600/700) for Monument, Poster, and Heading steps; `DM Sans` (`--font-body`, weights 400/500) for body and metadata.
- **Inspiration Rule:** Use https://dzinrstudio.com/ as inspiration for motion energy and presentation scale only. Never copy its branding, wording, assets, layout, or exact animation sequences.
- **Content Honesty:** Never invent real clients, testimonials, metrics, awards, or contact details. Clearly mark concept/sample work with `placeholder: true` and `<PlaceholderTag>`.

## 3. Page Structure & Case Study Content
- **Home (`src/app/page.tsx`):** `Header` → `Hero` → `Showreel` → `Intro` → `WorkIndex` (desktop horizontal scroll gallery) → `ServicesPoster` → `ProcessStory` (pinned 5-stage spine) → `About` → `ContactRows` → `FooterClose` (`SetYourName`).
- **Case Studies (`src/app/work/[slug]/page.tsx`):** Reusable route statically generated via `generateStaticParams()` (compatible with `output: 'export'`). Each case study showcases the 5 branding pillars where available:
  1. **Strategy** (positioning, audience, narrative)
  2. **Visual Identity** (logomark, typography, colour system, guidelines)
  3. **Packaging** (structural die-lines, labels, tactile finishes)
  4. **Communications** (campaigns, editorial print, voice)
  5. **Applications** (digital touchpoints, signage, collateral)

## 4. Animation, Responsive, Accessibility & Reduced-Motion Rules
- **Single-Engine Ownership:** Never animate the same DOM node with two engines.
  - **Lenis (`src/components/providers/SmoothScroll.tsx`):** Smooth vertical scroll on desktop; disabled under `prefers-reduced-motion: reduce`; native touch scroll (`syncTouch: false`).
  - **GSAP + ScrollTrigger (`src/lib/motion/gsap.ts`):** Scroll-pinned sections (`WorkHorizontal`, `Showreel`, `ProcessSpine`) and initial `LoadThread`. Always scope inside `useGSAP()` and gate desktop pins with `gsap.matchMedia()`.
  - **Motion / WAAPI / CSS (`src/lib/motion/easing.ts`):** Pointer interactions, `RevealRoot` section entrances, button needle-pass, taut-thread links, and accordion folds.
- **Performance:** Animate `transform`, `opacity`, and `clip-path` only (plus `grid-template-rows` for accordions). Never update React state on every scroll/animation frame when a ref or data attribute suffices.
- **Accessibility & Touch:**
  - Maintain WCAG AA contrast (4.5:1+ text), 44×44px minimum touch targets, semantic landmarks, and visible `:focus-visible` outlines.
  - Gate hover effects behind `@media (hover: hover) and (pointer: fine)`.
  - Never animate keyboard-driven focus changes (`transition-duration: 0ms` on `:focus-visible`).
  - Under `prefers-reduced-motion: reduce`, bypass travel/scale/parallax and collapse pinned/horizontal scroll sections into clean vertical stacked layouts.

## 5. Architecture & Commands
- `src/content/site.ts` & `src/types/content.ts`: Single source of truth for all copy, projects, services, process stages, and contact routes.
- `src/styles/tokens.css`: Raw CSS custom properties.
- `src/components/primitives/`: Reusable building blocks (`Thread`, `TextLink`, `CTAButton`, `IconButton`, `CopyEmail`, `RevealRoot`, `PlaceholderTag`, `Mark`).
- `src/components/sections/`: Server shell + `.client.tsx` interactive islands.
- **Commands:**
  - `npm run dev` — Start local Next.js development server
  - `npm run lint` — Run TypeScript typecheck (`tsc --noEmit`)
  - `npm run build` — Build static production export (`out/`)
  - `npm run start` — Serve production build

## 6. How to Add or Edit a Case Study
1. **Assets:** Place project imagery in `public/images/projects/<slug>/` (or `public/images/projects/<slug>.jpg`) and optional vector marks in `src/components/primitives/Mark.tsx`.
2. **Types:** Ensure any new case-study fields (overview, challenge, deliverables, 5-stage breakdown: strategy, identity, packaging, communications, applications, gallery) are typed in `src/types/content.ts`.
3. **Data:** Add or update the project entry in `projects` inside `src/content/site.ts`. Set `placeholder: true` if any copy/imagery is sample or concept work, and set `href: '/work/<id>'` once its case study route is active.
4. **Static Export Check:** Run `npm run lint` and `npm run build` to verify static generation and type safety.

## 7. Relevant Workspace Skills (`.agents/skills/`)
Always read the skill's `SKILL.md` before applying it:
- **Next.js App Router & Static Export:** `.agents/skills/nextjs-best-practices/SKILL.md`
- **Building & Reviewing Motion:** `.agents/skills/animate/SKILL.md`, `.agents/skills/emil-design-eng/SKILL.md`, `.agents/skills/improve-animations/SKILL.md`, `.agents/skills/find-animation-opportunities/SKILL.md`, `.agents/skills/animation-vocabulary/SKILL.md`
- **Animation Frame Budget & Debugging:** `.agents/skills/animation-performance/SKILL.md`
- **Editorial Design & Layout Quality:** `.agents/skills/design-taste-frontend/SKILL.md`
- **Accessibility & Interface Guidelines:** `.agents/skills/ui-a11y/SKILL.md`, `.agents/skills/web-design-guidelines/SKILL.md`
- **SEO & Deployment:** `.agents/skills/frontend-seo/SKILL.md`, `.agents/skills/vercel-deployment/SKILL.md`

