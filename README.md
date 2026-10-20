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

- **Portrait:** replace `public/images/swapy-portrait.png` with the final portrait, keeping the same filename or updating the image path in `src/main.jsx`.
- **Work cards:** edit the `projects` array near the top of `src/main.jsx`. The current entries are concept placeholders, not client work.
- **Contact:** replace `hello@swapyart.com` in `src/main.jsx` with the approved contact address.
- **Copy and services:** edit the text in `src/main.jsx`.
- **Colours and layout:** edit the CSS variables at the top of `src/styles.css`.

---

## Project status

Development is in progress. Build incrementally, starting with the home page and hero, then continue page by page after review.

---

## Tech stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Motion](https://motion.dev/) (scroll reveals & transitions)
- Vanilla CSS with custom properties

---

## License

Private — all rights reserved.
