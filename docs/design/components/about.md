# About ("Pinned title, portraits pass", adapted to one founder)

## Purpose
Persona 3 (referred visitor, under a minute, on a phone): "who is this, and is the person I was told about real?"; persona 1: a sense of the person. The founder is the product, so the voice is first person. The blueprint assumes up to six people; with one founder it is adapted, not stretched.

## Honest adaptation
- One portrait, a short pin (≈ 190svh), only at ≥900px.
- Title is the founder's name, "Swapnil", solid `--ink` (the direction's `difference` blend is retired).
- The portrait passes **in front of** the title, covering part of it, so legibility never depends on the photograph.
- **No second moving picture** (v2.2 §4.4): the hero portrait is the only one that drifts. This portrait only has its entrance shutter (once), then scrolls in normal flow.
- The bio is a placeholder and stays tagged; no credentials, years or client names are invented.
- It needs a different crop or second photograph from the hero's.

## Anatomy
| Part | Spec |
| --- | --- |
| Wrapper `section#about` | `--bg`; ≥900: `height ≈ 190svh` |
| Title layer | pinned 100svh, title mid-height, flush left at `--margin` |
| Title `h2` | "Swapnil", `--step-poster` (92 / 49 / 36px), 700, leading 0.94, `--ink` |
| Portrait | 4:5, cols 7–10 (≈ 26vw), above the title in z-order, normal flow, starts below the fold |
| Caption (under portrait's left corner) | name "Swapnil Gathibandhe" `--step-body` 500; role "Founder" `--step-small` `--muted`; `about.lead` `--step-body`, 280px measure |
| Empty ground | 40svh after the portrait before release |
| Bio row | cols 5–10, `--step-body`, `--ink`, ≤ 60ch, `PlaceholderTag` while `bio.placeholder` |
| Portrait placeholder | `--surface` 4:5 block "Portrait to come" + `PlaceholderTag`; never stock |

## Layout
- **1440:** title 92px ≈ 480px wide at left; portrait 374×468 at col 8 passes beside and over the title's end, then exits above.
- **900–1199:** portrait 36vw at the right margin.
- **768 and 390 (<900px): no pin, no overlap.** Normal flow: title at `--step-poster` (49 / 36px), then portrait 72% wide aligned right, caption beneath at the portrait's width, then the bio row.

## States
No controls. The portrait is not a link. If an email link is later added it follows the `TextLink` grammar.

## Micro-interactions and scroll choreography
- Title `lines` entrance (800ms `--ease-out`) when the section intersects.
- Pin (≥900): `ScrollTrigger.create({ trigger: wrapper, start: 'top top', end: 'bottom bottom', pin: titleLayer, pinSpacing: false })`; the portrait and caption scroll normally. Nothing is scrubbed.
- Portrait entrance: the shared `shutter` (wrapper `clip-path inset(0 0 100% 0)→inset(0)` 1000ms `--ease-in-out`, img `scale(1.08→1)` 1400ms `--ease-soft`), own trigger, once. After it settles the image does not move relative to its frame.
- Caption: `rise` `i=1`, then role and sentence at 70ms stagger.
- Release: nothing animates.

## Reduced motion
`gsap.matchMedia` creates the pin only for `(min-width:900px) and (min-height:541px) and (prefers-reduced-motion:no-preference)`; otherwise the stacked flow above. Shutter becomes a `--t-ui` opacity fade; no scale.

## Accessibility
`<section id="about" aria-labelledby>`; `h2` "Swapnil". Portrait `alt`: "Portrait of Swapnil Gathibandhe, founder of ArtSwapy". The title is fully readable before and after the pass and the name is repeated in the caption. Ink on `--bg` ≈ 16:1; role `--muted` 6.5:1. No tab stops.

## Implementation notes
- `src/components/sections/About/About.tsx` (server: markup, stacked flow) + `AboutPin.client.tsx` (`"use client"`: `useGSAP({ scope })` pin only).
```ts
interface AboutProps { heading: string; role: string; lead: string; bio: { text: string; placeholder?: boolean }; portrait: Portrait }
interface Portrait { src: string; alt: string; placeholder?: boolean }
```
- **Engine:** GSAP ScrollTrigger pin on Lenis; CSS shutter via `RevealRoot`; no Motion. Layering is CSS: portrait `z-index:2`, title layer `z-index:1`, wrapper `isolation:isolate`.
- No shadcn or reactbits component (RB *Masked Heading* only for the title lines). `next/image` with exact 4:5 sizes.

## Content source
`src/content/site.ts`: `about: { heading: 'Swapnil'; role: 'Founder'; lead: string; bio: { text; placeholder }; portrait: Portrait }`. Remove `eyebrow`, `processLabel`, `process`, old `heading`.

## Changes in v2.2
- Pin only ≥900px; below it everything stacks (R2-M2). Stale 130px removed: `--step-poster`.
- The extra scale drift removed; no second moving picture.
- Shutter takes the shared definition (1000 / 1.08 / 1400ms).
- `gsap.matchMedia` for reduced motion; TSX path, typed props, server shell + client island.
