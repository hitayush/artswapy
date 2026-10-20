# Intro ("Heading captions a panorama")

## Purpose
Answers the founder's and referred visitor's question after the hero ("what does this practice do?") in a heading and two captions, then hands over to a wide picture. For the marketing lead it says in one screen that strategy comes before form (JTBD 1).

## Anatomy
| Part | Spec |
| --- | --- |
| Section `#studio` | `--bg`, `min-height:100svh`, padding-top `--header-h + --space-6` |
| Heading `h2`, two authored lines | `--step-poster` (Space Grotesk 700, leading 0.94, tracking -0.04em), `--ink`, flush left at `--margin` |
| Caption A | `intro.lead`, `--step-body`, `--ink`, max 34ch, column 1 |
| Caption B | `intro.body`, `--step-body`, `--muted`, max 34ch, column 5 |
| Panorama `.shutter` | full-bleed, `aspect-ratio:21/9`, `--radius` 0, `img` cover, width/height set, lazy |
| Credit | `--step-small`, `--muted`, under the picture at `--margin` |
| `PlaceholderTag` | on the picture's bottom-left while `intro.panorama.placeholder` |

No eyebrow, no accent word, no rule. The picture is a drawn mark or a crop of the portrait (a credited trade-world photo only if it is about brand design, not a print shop).

## Layout
- **1440:** heading 92px × 2 lines ≈ 173px from y≈104. Captions 28px beneath (`--space-5`), 16–19px, up to 5 lines. Picture starts ≈ 40px below; ≈ 47% visible at the fold, rest arrives with scroll.
- **768:** heading 49px; captions side by side if 28ch fits, else stacked.
- **390:** heading 36px on two lines (each ≤ 14 characters), left aligned. Captions merge into one block (A then B). Picture from ≈ 45% of screen height, 4:5 crop via `<picture>`, full-bleed, runs off the bottom.

## States
| State | Behaviour |
| --- | --- |
| rest | Static type; picture closed (armed) or open (done) |
| hover / focus / press | None: no controls; the picture is not a link |
| current | None |

## Micro-interactions and scroll choreography
Shared system, root = section, manners per `section-entrance.md`:
1. Heading line 1 `lines` `i=0`, line 2 `i=1` (105ms later): `translateY(105%→0)` 800ms `--ease-out`.
2. Caption A `rise` `i=2`, Caption B `i=3`: 24px + opacity, 800ms `--ease-out`, 70ms stagger.
3. Panorama `shutter` (the one definition): wrapper `clip-path inset(0 0 100% 0)→inset(0)` 1000ms `--ease-in-out`, delay 0; img `scale(1.08→1)` 1400ms `--ease-soft`. It has **its own trigger** (`top 88%` of the picture), so it opens as it scrolls into view rather than offscreen.
4. Credit `rise` after the shutter ends.
No parallax on this image: the hero portrait is the page's one moving picture.

## Reduced motion
All steps become `--t-ui` opacity fades in reading order; no clip-path, no scale.

## Accessibility
`<section id="studio" aria-labelledby="intro-title">`; both heading lines inside one `h2` (trailing space in line 1). Panorama `alt` describes it. Ink on `--bg` ≈ 16:1, `--muted` 6.5:1. No tab stops. Headline ≤ 2 lines at 1440/768/390.

## Implementation notes
- `src/components/sections/Intro/Intro.tsx` (server) wrapped by `RevealRoot`; the picture island is `IntroPanorama.client.tsx` only to host its own trigger (or a second `RevealRoot`).
```ts
interface IntroProps { heading: [string, string]; lead: string; body: string; panorama: Panorama }
interface Panorama { src: string; alt: string; credit?: string; placeholder?: boolean; portraitSrc?: string }
```
- Engine: GSAP ScrollTrigger (trigger only) + CSS. `MaskedLines` from RB *Masked Heading*, stripped as in `section-entrance.md`. `next/image` with `sizes="100vw"`, `<picture>` art-direction for 4:5.
- No shadcn primitive.

## Content source
`src/content/site.ts`: `intro.lead`, `intro.body` (existing); remove `intro.eyebrow`. New: `intro.heading = ['Meaning first,', 'then the form.']` (proposal), `intro.panorama`.

## Changes in v2.2
- `--step-row` removed: heading is `--step-poster` (92 / 49 / 36px).
- Shutter delay 0 and the shared definition; trigger on the picture.
- Image brief: drawn mark or portrait crop preferred over "type case, loom" photos (m6).
- TSX tree, typed props, server shell + client island.
