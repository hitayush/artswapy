# Button (CTAButton, IconButton)

`src/components/primitives/CTAButton.tsx`, `IconButton.tsx`; base `src/components/ui/button.tsx` (shadcn); magnet from `src/components/reactbits/Magnet.tsx`.

## Purpose
The one must-do action for all personas: "Start a project" (founder emails, marketing lead sends a brief, referred visitor messages at once). One primary action per screen, so no secondary/ghost variant: secondary actions are text links.

## Anatomy
| Part | Spec |
| --- | --- |
| Box | square (`--radius` 0), 56px high (`size="sm"` 44px), padding-inline 24px (sm 20px), fill `--accent` |
| Base layer | `--accent` fill, label `--on-accent`, DM Sans 500 `--step-body` (sm `--step-small`), arrow slot right |
| Ink layer | `aria-hidden` duplicate of the content: `--ink` fill, label and arrow `--inverse-ink`; `clip-path: inset(0 100% 0 0)` at rest, so only one property animates and label colour changes in lockstep with the wipe |
| Arrow slot | 20px, `clip-path: inset(0)`; arrow A at 0, B parked at `translateX(-130%)`; one pair in each layer |
| Magnet wrapper | outer element carrying the Motion transform, so it never fights the press scale |

## Layout
1440: hero action bottom-right (cols 10-12), footer action under the invitation. 768: natural width under the sentence. 390: full width, in flow, label left and arrow right; never `position: fixed` (the header carries the persistent action, header.md).

## States
| State | Spec |
| --- | --- |
| Rest | `--accent` with ink label (5.7:1) |
| Hover (`hover:hover` and `pointer:fine`) | Ink layer wipes in left to right, 220ms `--ease-out`, out 150ms. Arrow pass: A to `translateX(130%)`, B to 0, 240ms `--ease-out` (the DESIGN.md "4px" cannot show a second arrow in a clipped slot, so the full slot is used). Hero and footer only: magnet |
| Focus-visible | 2px ring, 3px offset (`--focus` light, `--accent` inverse) plus wipe and arrow pass **instantly** (no animation on keyboard-driven changes) |
| Active/press | `scale(0.97)`, 140ms in, 200ms release, `--ease-out`; applies on touch (`whileTap` or `:active`) |
| Disabled | unused; `aria-disabled`, `--surface` fill, `--muted` label |
| Loading/done | n/a (a `mailto:` link) |

## Micro-interactions
- **Magnet** (hero and footer buttons only, `pointer:fine`, not reduced motion): window `pointermove` while in view; inside 72px of the edge, target = (pointer - centre) x 0.28 clamped to 8px; Motion `useMotionValue` + `useSpring` with `--spring-press` `{ stiffness: 500, damping: 45, mass: 1 }` (critical, no overshoot); leaves returns to 0. Apply as `style={{ transform }}` from a `useTransform` template (hardware accelerated). The label does not move (no parallax).
- Wipe, arrow pass and press are CSS; no JS for them.

## Reduced motion
No magnet, scale, wipe or arrow travel: hover/focus swap to the ink layer by opacity (`--t-hover`); arrow stays.

## Accessibility
`<a>` for navigation, `<button>` for actions. Ink layer and duplicate arrows are `aria-hidden`. Contrast: ink on `--accent` 5.7:1; `--inverse-ink` on `--ink` 16.5:1. Hit area 56px (44 min); magnet shifts at most 8px.

### IconButton
Square, 44x44 (56 in sheets), `--surface` fill, ink glyph. Hover/focus: `--ink` wipe (clip-path, 220ms in/150ms out), glyph `--inverse-ink`; an arrow glyph slides 3px in its direction, a close glyph rotates 90deg (`--t-ui`, `--ease-out`). Press `scale(0.94)`. Always has `aria-label`.

## Implementation notes
```ts
interface CTAButtonProps extends React.ComponentProps<'a'|'button'> { as?: 'a'|'button'; href?: string; size?: 'md'|'sm'; arrow?: boolean; magnetic?: boolean; primaryAction?: boolean /* adds data-primary-action */ }
interface IconButtonProps { label: string; icon: 'close'|'arrow'; size?: 44|56; onClick?: () => void }
```
- Server component for the markup and CSS; the magnetic variant is a small `"use client"` wrapper (`MagneticCTA.client.tsx`).
- Engine: CSS (wipe, arrow, press) + Motion (magnet only) per DESIGN.md 4b.
- Builds on shadcn `Button` (keep `Slot`/`asChild` and focus handling); strip its variants, radius, shadow, ring, `transition-colors`, and size classes. Magnet: `npx shadcn@latest add @react-bits/Magnet-TS-TW`; keep the pointer maths only, drop its `padding`/`magnetStrength` wrapper div, swap its spring for `--spring-press`, gate to fine pointer and `useReducedMotion`.
- Lenis: none.
- Content: `contact.cta`, `site.email.address`, `contact.mailto`.

## Changes in v2.2
- `--accent-strong` removed: hover is an ink wipe with `--inverse-ink` label.
- Spring damping 45; label parallax dropped; magnet limited to hero and footer.
- Timings: wipe 220/150, press 140/200, keyboard focus instant.
- IconButton: ink wipe, 90deg close, square.
- TSX path, props, shadcn/reactbits strip list.
