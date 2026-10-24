# ArtSwapy — Brand Portfolio

Portfolio website for **ArtSwapy**, a brand design and consulting practice founded by **Swapnil Gathibandhe**.

The site introduces the practice, showcases branding work and case studies, explains services, and gives prospective clients a way to get in touch.

---

## Design direction

The existing ArtSwapy MVP is the visual foundation for development. Preserve and refine its design rather than replacing it.

| Token | Value |
| ----- | ----- |
| **Palette** | Orange, white, and near-black |
| **Style** | Minimal, editorial, confident, and human |
| **Motion** | Purposeful scroll reveals and image transitions inspired by [DZ!NR Studio](https://dzinrstudio.com/), adapted to ArtSwapy's own identity |

> [!IMPORTANT]
> **Reference rule:** Do not copy another studio's branding, layout, copy, imagery, or exact animations.

---

## Planned pages

| Page | Notes |
| ---- | ----- |
| Home | Hero + intro |
| Work / Portfolio | Grid of projects |
| Case Study *(reusable)* | Strategy → identity → packaging → communications → applications |
| About | Founder story and values |
| Services | Offerings and process |
| Contact | Form / email / social |

Case studies should communicate the full branding process where content is available: strategy, identity, packaging, communications, and applications.

---

## Development principles

- Inspect the existing project before changing its structure or design.
- Reuse and extend the MVP's components, assets, layout, and styles where practical.
- Keep project content easy to edit.
- **Do not** invent clients, projects, testimonials, awards, team members, or business results. Mark sample content clearly as *placeholder content*.
- Use semantic HTML, responsive layouts, keyboard-accessible controls, visible focus states, and descriptive image text.
- Respect `prefers-reduced-motion` and keep essential content available without animation.
- Keep normal browser scrolling. Avoid unnecessary dependencies, heavy effects, and 3D/WebGL unless a real project requires them.

---

## Getting started

> [!NOTE]
> The commands below are examples. Confirm the scripts in `package.json` before running them.

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

---

## Deployment

The site is intended for deployment on **Vercel**.

| Setting | Value |
| ------- | ----- |
| Vercel project name | `artswapy` |
| Desired URL | [artswapy.vercel.app](https://artswapy.vercel.app) *(if available)* |

Connect the GitHub repository to Vercel so pushes can create preview deployments for review. Promote the approved version to production.

---

## Content and assets

Use approved Swapy Art assets and project information. Before launch, replace **all** placeholders with confirmed content, including:

- Founder portrait and any approved brand assets
- Project names, descriptions, images, and deliverables
- Services and About copy
- Contact email and social links

---

## Replace the content

- **All site copy, projects, services, process stages, and contact routes:** edit [`src/content/site.ts`](src/content/site.ts) (typed via [`src/types/content.ts`](src/types/content.ts)).
- **Founder portrait:** replace `public/images/swapnil-portrait.png` or update `hero.portrait.src` and `about.portrait.src` in `src/content/site.ts`.
- **Work cards & case studies:** edit the `projects` array in `src/content/site.ts` and place project images in `public/images/projects/`. Keep `placeholder: true` on any concept or unconfirmed work so it renders with a visible placeholder tag.
- **Contact:** update `site.email.address` and `contact.routes` in `src/content/site.ts`.
- **Colours, typography, spacing, and motion tokens:** edit [`src/styles/tokens.css`](src/styles/tokens.css) (see [`DESIGN.md`](DESIGN.md) for the full v2.2 token specification).

---

## Project status

The Next.js App Router MVP home page (`src/app/page.tsx`) is in place with Hero, Showreel, Intro, horizontal-scroll Work gallery, Services accordion, pinned Process spine, About, Contact rows, and interactive Footer close. Next steps include full reusable Case Study pages and progressive motion/content refinement.

---

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, static export) + [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/) + CSS custom property tokens (`src/styles/tokens.css`, `src/app/globals.css`)
- [GSAP + ScrollTrigger](https://gsap.com/), [Lenis](https://lenis.darkroom.engineering/), and [Motion](https://motion.dev/)
- [shadcn/ui](https://ui.shadcn.com/) / Base UI primitives restyled to ArtSwapy tokens

---

## License

Private — all rights reserved.
