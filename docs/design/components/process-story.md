# Process story (the signature move)

Pinned process on the inverse field: Strategy, Identity, Packaging, Communications, Applications. One thread draws across the screen and ties the stages together. Pinned at ≥900px only; below that it is a normal stacked list.

## Purpose
Persona 2 (marketing lead, JTBD 2: understand the process and what I would get at the end) and persona 1's fear of "a logo and nothing strategic". The structure is the proof: strategy visibly leads to everything else. It is the one loud moment; the rest of the page stays calm.

## Anatomy
| Part | Spec |
| --- | --- |
| Section `#process` | `--inverse-bg`; ≥900: pinned layer 100svh + scrub run `+=350%` (3.5 screens, **under 6**) |
| Heading `h2` | `process.heading` "How a project moves", `--step-h`, `--inverse-ink`, top-left under `--header-h` |
| Stage list `<ol>` | Five `li` stacked in one grid cell (≥900); each holds `h3` name, description, gives |
| Stage name | `--step-poster` (92 / 49 / 36px), 700, leading 0.94, `--inverse-ink`, one line in a mask. "Communications" (14 chars) obeys the phone rule `min(--step-poster, 11.5vw)` below 600px |
| Description | `--step-body`, `--inverse-ink`, max 40ch, col 9 on desktop |
| Gives | `--step-small`, `--inverse-muted`, one line |
| Rail / spine | One 3px `--accent` `Thread` along the bottom, full width, `clip-path` driven by progress |
| Knots | Five 14px squares at x = 10 / 30 / 50 / 70 / 90%. Rest `--inverse-ink`; passed or current `--accent` |
| Knot labels | ≥900: stage names, `--step-small`, `--inverse-ink`, full contrast, as `button`s |

Inactive stages are masked out of frame, not faded; labels stay full ink.

## Layout
- **1440:** name at left, baseline ≈ 58% of the layer, col 1; description and gives at col 9 on the same row (giant word left, small facts right). Rail at 88% height, labels beneath.
- **900–1199:** name 57–76px; description under the name.
- **768 and 390 (<900): no pin.** Normal flow: heading, then the `<ol>` as five blocks, each name at `--step-poster`, description and gives beneath, `--space-6` between. Each block has its own short `Thread` (3px `--accent`) that draws once under the name on entrance (`rise`) and stays drawn. No knots, no rail.

## States
| State | Behaviour |
| --- | --- |
| rest (pin start) | Stage 0 visible, thread at 10%, knot 0 accent |
| scroll, stage n | Stage n visible; knots 0..n accent; thread at x = min(1, 0.1 + p) |
| hover (label) | Label gets the `TextLink` thread (260ms in / 180ms out) |
| focus-visible | Ring `--accent` 2px offset 3px + thread; a keyboard jump swaps the stage **instantly** |
| press / `:active` | Thread draws; `scale(0.97)` 140ms |
| current | `aria-current="step"` on the active `li` and knot |

## Scroll choreography (≥900 only)
`ScrollTrigger.create({ trigger: section, start: 'top top', end: '+=350%', pin: layer, scrub: 0.6, onUpdate })` on Lenis. Progress `p` 0→1; the p→clip mapping is the one linear curve in the system.
- **Thread:** `clip-path: inset(0 ${(1 − min(1, 0.1 + p)) × 100}% 0 0)`. Slot *i* starts at p = i/5, exactly when the thread reaches knot *i* (x = 0.1 + i/5), so the thread arrives and the stage changes together.
- **Stage change** (time-based, 600ms in): incoming name `translateY(105%→0)` in its mask, `--ease-out`; outgoing `0→-105%` over 420ms (70%), reverses when scrolling up. Description and gives: opacity + `translateY(16px→0)`, 500ms `--ease-out`, delayed 70 and 140ms. Stage index written to `data-active` only when it changes (no per-frame state).
- **Knot** on arrival: fill → `--accent`, `scale(1→1.5→1.25)`, `--t-thread-hero` 700ms `--ease-out`.
- It reads as a progress rail with knots; the names do not join into one line.
- Knot buttons jump with `lenis.scrollTo(y, { immediate: isKeyboard })`.
- Header takes `data-on-inverse` while this section is under it.

## Reduced motion and fallbacks
`gsap.matchMedia('(min-width: 900px) and (min-height: 541px) and (prefers-reduced-motion: no-preference)')` creates the pin and scrub; any other condition gets the stacked list above, so reduced motion, short landscape viewports, <900px and no-JS all collapse to normal flow. Lenis is not started under reduced motion. Threads show drawn (opacity fade only).

## Accessibility
A true `<ol>`; all five descriptions are in the DOM from first paint (stacked and masked, never `display:none`), so a screen reader reads the story linearly. Rail and knots `aria-hidden`; labels are buttons. Section `aria-labelledby`. `--inverse-ink` on `--inverse-bg` 16.5:1, `--inverse-muted` 7.3:1, `--accent` 5.7:1. Headings one line. Touch targets 44px. Nothing captures the wheel.

## Implementation notes
- `src/components/sections/ProcessStory/ProcessStory.tsx` (server: `<ol>` markup, stacked fallback) + `ProcessSpine.client.tsx` (`"use client"`: `useGSAP({ scope })`, ScrollTrigger pin/scrub, `data-active`, label buttons).
```ts
interface ProcessStoryProps { heading: string; stages: ProcessStage[] }
interface ProcessSpineProps { count: number; onJump?: (i: number) => void }
```
- **Engine:** GSAP ScrollTrigger pin + scrub on the Lenis ticker bridge (`lib/motion/lenis.ts`); CSS transitions for the mask swaps (toggled by `data-active`); no Motion. `useReducedMotion()` read first, then branch (Rules of Hooks).
- No shadcn or reactbits component: RB *Scroll Stack*-style stacks are not used; the spine is bespoke. Reuse `Thread` with `progress`.
- Re-measure rail on `ResizeObserver` and once on `document.fonts.ready` (v2.2).

## Content source
`src/content/site.ts`: `process: { heading: string; stages: ProcessStage[] }`, `ProcessStage = { id: string; name: string; line: string; gives: string }`. Remove `about.process` and `about.processLabel`. Draft copy:
Strategy "Who you are, who it is for, and why anyone should care." / Identity "The name, mark, type and colour that carry it." / Packaging "The identity made physical, shelf-ready." / Communications "How the brand speaks in print and campaign." / Applications "Every place it shows up, kept consistent." Gives: Positioning and voice / Logo and identity system / Packaging design / Campaign and print / Touchpoints and guidelines.

## Changes in v2.2
- Pin only at ≥900px; stacked list with a thread per item below (R2-M2).
- Stale 56/69px and the 11.5vw rule removed (kept only for 14-char names under 600px).
- Thread driven by `clip-path` (not `scaleX`); `--accent` on inverse; knot timing `--t-thread-hero`.
- Exit 70%; keyboard jumps swap instantly; `gsap.matchMedia` for reduced motion.
- Stage names align with Services; dropped the "one continuous line" claim.
- TSX path, typed props, server shell + client island.
