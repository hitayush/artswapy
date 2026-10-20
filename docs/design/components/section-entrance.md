# Section entrance (shared reveal system)

Once-only arrival choreography for Intro, Work, Services, About and Contact. Process and the hero have their own motion.

## Purpose
Serves every persona's first seconds in a section: content arrives in reading order and is never gated. It exists so adjacent sections can arrive differently (lines, rows, shutter, band) from one set of timings.

## Anatomy
A root carries `data-reveal-root`; parts carry `data-reveal="<manner>"` and `style="--i:n"` (reading order).

| Manner | Markup | Hidden state | Revealed |
| --- | --- | --- | --- |
| `lines` | `.line` (overflow hidden, `padding-bottom:.08em; margin-bottom:-.08em`) > `[data-reveal=line]` | `translateY(105%)` | `none` |
| `rise` | any block | `translateY(24px)`, opacity 0 | `none`, opacity 1 |
| `rows` | each `<li>` wrapper, never the interactive child | `translateY(32px)`, opacity 0 | `none`, opacity 1 |
| `band` | full-bleed tonal row | `clip-path: inset(0 100% 0 0)` | `inset(0)` |
| `shutter` | `.shutter` (overflow hidden) > `img` | wrapper `inset(0 0 100% 0)`, img `scale(1.08)` | `inset(0)`, `scale(1)` |

**Assignment (no two adjacent sections share a manner):** Intro `lines` + `rise` + `shutter`; Work `rows` + `rise` (no shutter); Services `lines` per poster word; Process own; About `lines` + `shutter`; Contact `band` + `lines`.

## Layout at 1440 / 768 / 390
No layout of its own. Travel: `rise` 24px, `rows` 32px at 1440; 16px / 24px at 768 and 390. Timings identical at every width.

## States
| State | Meaning |
| --- | --- |
| rest (SSR / no JS) | Everything visible; hidden CSS exists only under `html.js` |
| armed | `html.js` present, root not yet entered |
| in | `data-in="true"`: CSS transitions run once, then `data-done` |
| instant | Root was already above the viewport at creation, or keyboard/anchor jump past it: `data-in data-instant`, no transition |
| hover / focus / press / current | n/a: interactive children are never the reveal target |

## Micro-interactions and timings (v2.2 tokens)
Trigger: `ScrollTrigger.create({ trigger: root, start: 'top 88%', once: true })`. Never replays.

| Manner | Property | Duration | Easing | Delay |
| --- | --- | --- | --- | --- |
| lines | transform | `--t-reveal` 800ms | `--ease-out` | `i × 105ms` (1.5 × `--stagger`) |
| rise | opacity 600ms, transform 800ms | | `--ease-out` | `i × --stagger` |
| rows | opacity 500ms, transform 800ms | | `--ease-out` | `min(i,6) × --stagger` |
| band | clip-path | `--t-reveal` 800ms | `--ease-in-out` | `i × --stagger` |
| shutter (**the one definition**, from motion-system.md) | wrapper clip-path 1000ms `--ease-in-out`; img scale 1.08→1 1400ms `--ease-soft` | | | wrapper delay **0** everywhere |

Reading order per root: heading → text → picture/list → details; sequence under 1.4s. After the last transition `data-done` clears `transition-delay` and `will-change`, so a stale delay never slows hover. Leaving is not animated (once-only).

## Reduced motion
Every manner becomes opacity only, `--t-ui` 240ms, `--ease-out`, delay `min(i,3) × --stagger`. No translate, clip-path or scale. Handled in CSS (`@media (prefers-reduced-motion: reduce)`) and by `gsap.matchMedia()` (triggers still fire, so content never stays armed).

## Accessibility
Presentational only: no `aria-hidden`, no live regions; content is in the DOM and in server HTML from first paint; DOM order equals reading order. Interactive elements are never inside `.line` or `.shutter` (masks would clip focus rings). `@media print` removes hidden states. Check descenders (g, y, p) in every masked heading.

## Implementation notes
- Files: `src/lib/hooks/useReveal.ts`, `src/components/primitives/RevealRoot.client.tsx`, `MaskedLines.tsx`, `src/styles/reveal.css`.
- **Server shell + island:** sections are server components; they wrap their markup in the thin `"use client"` `<RevealRoot manner? as="section">`, children stay server-rendered.
- **Engine (DESIGN.md §4b):** GSAP ScrollTrigger only *triggers*; the motion is CSS transitions on `[data-in]`, so it is compositor-only and costs no per-frame JS. `useReveal` runs inside `useGSAP({ scope: ref })` so cleanup is automatic; `gsap.matchMedia()` branches reduced motion.
```ts
interface RevealOptions { start?: string /* 'top 88%' */; once?: true }
function useReveal<T extends HTMLElement>(opts?: RevealOptions): React.RefObject<T>
```
- **Gate:** layout.tsx inlines `document.documentElement.classList.add('js')` and a 4s timer adding `html.reveal-timeout` (CSS un-hides everything); `useReveal` sets `window.__revealReady = true` on mount, cancelling it. This covers hydration failure and keeps SSR content visible with no JS.
- **reactbits:** `MaskedLines` is built from RB *Masked Heading* (`@react-bits/MaskedHeading-TS-TW`), or RB *Split Text* (`@react-bits/SplitText-TS-TW`, GSAP SplitText `mask:'lines'`) for wrapped prose. We strip: its own scroll trigger, inline easing/duration (use tokens), per-character mode, default opacity fade. Headings stay authored as line arrays (no CLS).
- One ScrollTrigger per root; at most ~12 nodes animate at once.

## Content source
No keys of its own. Headings are `string[]` line arrays in `src/content/site.ts` (`intro.heading`, `contact.heading`).

## Changes in v2.2
- Engine: ScrollTrigger trigger + CSS transitions (was IntersectionObserver); `gsap.matchMedia` for reduced motion.
- Added `band` manner; one shutter definition (1000ms / 1.08→1 / 1400ms, delay 0); assignment table fixes adjacent manners.
- Gate: `html.js` plus 4s `reveal-timeout` failsafe (SSR content visible without JS).
- Easings are named tokens; no keyword curves.
