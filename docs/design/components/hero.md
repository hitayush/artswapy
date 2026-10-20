# Hero

`src/components/sections/Hero/Hero.tsx` (server), `HeroPortrait.client.tsx` (GSAP drift), `LoadThread.client.tsx` (loader.md).

## Purpose
Five-second test, on a phone for persona 3: name, face, one way to write, all on the first screen. Persona 1 reads the sentence for category fit; persona 2 scrolls on.

## Adaptation of "Pinned title over portraits" (decision)
The blueprint needs 5-8 portraits to swap under a pinned title. We have one, so the pin and swap are dropped (the pinned signature is the process story). Kept: the monument name on one line, the portrait on cols 5-8, sentence bottom-left, action bottom-right, flat paper ground. **Shipped version has no overlap**: the name sits above the portrait. The ink-to-paper letter flip over the portrait (a second aligned copy of the name, `data-overlap`) is an enhancement that turns on only when a real portrait passes a luminance check (top 25% mean luminance under 0.27 for 3:1 paper letters); it is not built until the asset exists.

## Anatomy
| Part | Spec |
| --- | --- |
| Name | `<h1>` "ARTSWAPY" (uppercase via CSS, content `site.name`), Space Grotesk 700, `--step-mon` (fit to content width via `--name-em`), leading 0.82, tracking -0.06em, `nowrap`, `--ink`, one element (no letter splitting, so kerning holds). **Visible from first paint** |
| Portrait | `figure`, `overflow: clip`, square, image 112% of frame height inside it |
| Sentence | `--step-body`, `--ink`, max 26ch |
| Action | `CTAButton primaryAction magnetic` "Start a project" |

CSS variable `--hero-baseline` (name baseline y) is defined once for the load thread.

## Layout
| | 1440 x 900 | 768 x 1024 | 390 x 844 |
| --- | --- | --- | --- |
| Name | about 1330px wide, 281px type, top at 64+24 | 146px, one line | 73px, one line |
| Portrait | cols 5-8 (440px), top 24px under the name, bottom 32px above the fold | cols 5-10, same rule | full width minus margins, 4:5 with `max-height: 52svh` |
| Sentence | cols 1-3, last line 32px above bottom | cols 1-4 | in flow, below portrait |
| Action | bottom right, cols 10-12 | under the sentence, left | full width, in flow, 56px, ends above the fold (about y=783 at 844; shorter phones rely on the header's persistent action) |

Hero `min-height: 100svh`; grid rows `auto 1fr auto`.

## States
Name and portrait are static (no hover, no tilt, no zoom). Action: button.md. Entrance and thread: loader.md (sentence and action rise 16px/480ms behind the thread on the first visit only; every other visit paints final).

## Portrait drift (the one moving picture)
GSAP ScrollTrigger scrub 0.6: image `yPercent` 0 to -8 over the hero's scroll (`start: 'top top'`, `end: 'bottom top'`), **no scale**. Image is 112% tall at `top: 0`, so travel (8% of 112 = 9% of frame) stays inside the 12% bleed and no edge ever shows. The frame does not move. Created in `useGSAP` with a scope, `gsap.matchMedia()` guarded.

## Reduced motion
No drift (image at rest), no load thread, no rises. Everything is final from paint.

## Accessibility
One `<h1>`; the name is real text (no aria tricks). Portrait `alt` from content, `priority` + `sizes`, width/height set to avoid CLS. Contrast: ink on `--bg` 16:1. Action targets 56px.

## Implementation notes
```ts
interface HeroProps { name: string; line: string; portrait: { src: string; alt: string }; cta: string; mailto: string }
```
- Server component; only `HeroPortrait.client.tsx` (GSAP + `next/image`) and `LoadThread.client.tsx` are client islands. Engines: CSS (layout, entrance keyed on `[data-intro]`), GSAP (drift), Motion (magnet inside the button).
- shadcn/reactbits: none. `next/image` with `fill` and `priority`.
- Lenis: GSAP is driven by the Lenis ticker (lib/motion/lenis.ts); drift reads native scroll positions, so nothing special here. The first screen never waits on fonts: `font-display: swap` with a `size-adjust` fallback.
- Content: `site.name`, `hero.portrait.{src,alt}`, new `hero.line` (replaces `hero.supporting/eyebrow/headline/meta/scrollCue`), `contact.cta`, `contact.mailto`. Suggested `hero.line` (needs Swapnil's approval): "An independent brand practice led by Swapnil Gathibandhe: strategy, identity and packaging."

## Changes in v2.2
- Name visible at first paint; no mask, no `fonts.ready` wait; entrance only for sentence and action.
- Drift is 112% image, `yPercent` 0 to -8, no scale (GSAP scrub).
- Phone portrait 4:5 with `max-height: 52svh` so the action clears the fold.
- Paper-copy overlap demoted to an optional enhancement; shipped version has no overlap.
- Stale 64px-floor and 19vw text removed (monument is fit to width).
- TSX/client split and engines.
