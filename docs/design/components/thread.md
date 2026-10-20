# Thread (primitive)

`src/components/primitives/Thread.tsx` (client) + CSS class `.thread` for pure-CSS uses; `src/lib/hooks/useThread.ts`.

## Purpose
One recognisable craft detail that carries state across the page (JTBD 1: trust beyond a logo). Never a divider, never decoration at rest.

## Roles (exactly the v2.2 four; the footer stitch is part of the Live thing)
| Role | Where | Engine | Colour |
| --- | --- | --- | --- |
| State | Under links/rows on hover, focus, `:active`; kept drawn for `aria-current`/selected | CSS transition | `--thread` on light, `--accent` on inverse |
| Load | One draw across the hero on the first visit (loader.md) | WAAPI via `useThread` | `--thread` |
| Spine | Pinned process (process-story.md) | GSAP scrub | `--accent` (inverse field) |
| Cursor | Work rows, `pointer: fine` | Motion spring | `--thread` |
| Live thing | "Set your name" stitch (footer-close.md) | WAAPI | `--accent` (inverse) |

**Rule (v2.2):** at most one *moving* thread on screen. Static state threads (nav current) may coexist. The load, spine, cursor and stitch live in different sections, so no arbitration code is needed (the earlier `useThreadSlot` is deleted). A hover/focus draw that overlaps the nav-current thread is allowed: it is a state, not a mover.

## Anatomy
A solid 3px `<span aria-hidden>` (`height: 3px; width: 100%; background: var(--thread-color)`), `pointer-events: none`. `--thread-color` defaults to `var(--thread)`; any ancestor with `[data-on-inverse]` or `.on-inverse` sets it to `var(--accent)`. Animated property: **`clip-path: inset()` only** (no `scaleX` origin flip, which jumps when interrupted; no `stroke-dashoffset`). SVG `<path>` only for curved threads, same clip-path on the `<svg>`.

## Timings (v2.2 tokens)
| Use | In | Out | Easing |
| --- | --- | --- | --- |
| State (hover/focus/`:active`) | `--t-thread` 260ms | 180ms | `--ease-out` |
| Load, spine knots | `--t-thread-hero` 700ms | 180ms | `--ease-in-out` |
| Stitch | 700ms | 180ms | `--ease-in-out` |
Rest `inset(0 100% 0 0)`; drawn `inset(0)`. The CSS state version reverses along the same path on leave (interruptible, continuous). Exiting "to the right" needs JS keyframes, so only the JS uses (load, stitch) exit right: `inset(0 0 0 100%)` then snap to rest.

## States
| State | Spec |
| --- | --- |
| Rest | hidden |
| Hover (`hover:hover` and `pointer:fine`) | draws (CSS) |
| Focus-visible | drawn **instantly** (keyboard changes do not animate), plus the owner's ring |
| `:active` | draws (the touch cue; there is no thickening) |
| Current/selected | stays drawn |

## Reduced motion
No clip animation: state threads toggle instantly; load thread, cursor thread not rendered; spine static fully drawn; stitch static, drawn.

## Accessibility
Decorative, never the sole cue. `--thread` is 5.6:1 on `--bg`, 5.1:1 on `--surface`; `--accent` 5.7:1 on `--inverse-bg`. Bright `--accent` on light grounds (2.9:1) is forbidden.

## Implementation notes
- Props: `interface ThreadProps { state?: 'hidden'|'drawn'; duration?: number; delay?: number; orientation?: 'horizontal'|'vertical'; onDrawn?: () => void; className?: string }`.
- `"use client"` only for `Thread.tsx` and `useThread` (imperative `draw()/undraw()` returning a cancel; uses `element.animate()` clip-path keyframes; starts the next from the current computed clip). Link threads need no JS: the `.thread` class and CSS transitions live in `globals.css`.
- Engines per DESIGN.md 4b: CSS (state), WAAPI/Motion (load, stitch, cursor), GSAP (spine, owned by ProcessStory). Never two engines on one element.
- No shadcn/reactbits base; Own. Lenis: none.
- Content source: none.

## Changes in v2.2
- Colour: `--thread`/`--accent` rule replaces `--accent-text`.
- Timings 260/180 for state; 700 for hero-class draws; named bezier tokens.
- Deleted `useThreadSlot` and the two-tier rule; adopted the "one moving thread" rule.
- Press thickening removed; `:active` draws. Keyboard focus is instant.
- TSX path, props, engines added.
