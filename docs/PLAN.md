# ArtSwapy — Build Plan

**Stack (decided):** Next.js App Router + TypeScript · Tailwind v4 (needed by shadcn and the reactbits
TS+TW variants; tokens are exposed through `@theme`) · shadcn/ui · reactbits.dev · GSAP + ScrollTrigger + SplitText
(scroll) · Motion (pointer and state) · Lenis (smooth scroll) · Vercel.

The current Vite app (`src/main.jsx`, `src/styles.css`) is the reference until Phase 1 replaces it.

## Target folder structure

```
artswapy/
├── DESIGN.md                         # Design system: tokens, type, interaction grammar, stack ownership
├── README.md
├── next.config.ts                    # output: 'export' only if no server features are needed
├── tsconfig.json                     # strict; path alias @/*
├── components.json                   # shadcn config; registries: @react-bits
├── postcss.config.mjs
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── swapy-portrait.jpg        # Founder portrait (to be supplied)
│       ├── work/<project>/           # 4:5 and 16:10 crops per project
│       └── found/                    # Credited open-collection pictures + CREDITS.md
├── docs/
│   ├── PLAN.md
│   ├── research/user-research.md
│   └── design/
│       ├── direction-sheet.md · motion-system.md · critique.md
│       ├── lab/thread-interactions.html  # Live micro-interaction lab (open in a browser)
│       └── components/*.md           # One spec per component
└── src/
    ├── app/
    │   ├── layout.tsx                # next/font (Space Grotesk, DM Sans), <SmoothScroll>, <Toaster>, metadata, JSON-LD
    │   ├── page.tsx                  # Section order (server component)
    │   ├── globals.css               # @import tailwind; @theme maps tokens; base layer
    │   └── opengraph-image.tsx
    ├── content/
    │   └── site.ts                   # All copy and project data, typed (replaces content.js)
    ├── styles/
    │   └── tokens.css                # Raw design tokens: the only file with raw values
    ├── lib/
    │   ├── motion/
    │   │   ├── easing.ts             # Bezier tokens for Motion and GSAP CustomEase registration
    │   │   ├── gsap.ts               # registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP)
    │   │   └── lenis.ts              # Lenis ↔ ScrollTrigger ticker bridge
    │   ├── hooks/
    │   │   ├── useReveal.ts          # Once-only section entrance
    │   │   ├── useThread.ts          # Thread draw/undraw
    │   │   ├── useStableCallback.ts  # Fixes the old loader re-run bug
    │   │   └── useHeaderInk.ts       # data-on-inverse switching
    │   └── utils.ts                  # cn() from shadcn
    ├── components/
    │   ├── ui/                       # shadcn primitives restyled: button, sheet, input, accordion, sonner, tooltip
    │   ├── reactbits/                # Installed reactbits sources, re-tokened (masked-heading, split-text, …)
    │   ├── primitives/               # Own: Thread, TextLink, CTAButton, IconButton, CopyEmail, PlaceholderTag
    │   ├── providers/
    │   │   └── SmoothScroll.tsx      # "use client"; Lenis, off under reduced motion
    │   └── sections/                 # Header, Hero, Intro, WorkIndex, ServicesPoster, ProcessStory,
    │                                 # About, ContactRows, FooterClose (server shell + client island each)
    └── types/
        └── content.ts                # Project, Service, ProcessStage, ContactRoute
```

Conventions:
- Sections are server components that receive typed content. Only the animated part is a `"use client"` island
  (for example `WorkIndex.tsx` plus `WorkIndexPreview.client.tsx`).
- Raw values live only in `tokens.css`. Tailwind uses them through `@theme` (`--color-ink: var(--ink)`).
- reactbits files are copied in and owned by us. Each one gets a header comment naming its source and our changes.
- shadcn defaults are stripped: `--radius: 0`, no shadow utilities, and the ring is replaced by our focus token.

## Phases

| # | Phase | Output | Exit check |
| --- | --- | --- | --- |
| 0 | **Research and system** | DESIGN.md v2.2, research, direction sheet, motion system, specs, 2 critique rounds | Critique round-2 Blocking items fixed in the specs |
| 1 | **Next.js scaffold** | `create-next-app` (TS, App Router, Tailwind, `src/`), shadcn init, GSAP/Motion/Lenis installed and pinned, tokens plus `@theme`, fonts via `next/font`, `SmoothScroll` provider, content ported to `site.ts` | `next build` passes; the empty page shows tokens and fonts; Lenis is off under reduced motion |
| 2 | **Primitives** | Thread, TextLink, CTAButton (needle pass), IconButton (pull-through), TextLink (taut thread), CopyEmail (stamp + Sonner), shadcn restyles | Keyboard pass; Emil checklist on every control; taste lint clean |
| 3 | **Hero and load** | Monument name (fit-to-width), portrait drift, load thread, header with ink switching | `inspect.mjs`: no FAIL at 1440/768/390; CTA above the fold at 390 |
| 4 | **Sections** | Intro, WorkIndex, ServicesPoster, ProcessStory (signature), About, ContactRows, FooterClose with Set your name | Each section uses a different composition; at least 16 moving elements; the reduced-motion screenshot shows all content |
| 5 | **Imagery** | Portrait plus at least 4 real pictures, credits | Image floor passes |
| 6 | **Look-and-fix** | 3 critique rounds on screenshots | Score ≥ 7.5; Lighthouse a11y ≥ 95, CLS < 0.05 |
| 7 | **Validate and launch** | 5-second test plus 5 phone sessions; Vercel deploy; the Vite app is removed | Placeholders replaced or approved |

## Open questions for Swapnil

1. Final portrait and approved project imagery.
2. "ArtSwapy" vs "Swapy Art" as the public one-word name. The monument depends on it.
3. Real email, WhatsApp/phone number, city and availability.
4. Can 1–2 real projects replace the concept placeholders?
5. Services renamed to match the process vocabulary (Strategy / Identity / Packaging / Communications / Applications, splitting "Packaging & Communications" and renaming "Brand Experiences"). Approve or revert.
6. Draft process-stage copy and the hero line naming Swapnil (in the specs) need approval.
