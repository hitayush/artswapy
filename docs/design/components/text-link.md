# Text link and nav link

`src/components/primitives/TextLink.tsx` (server component, CSS only); nav behaviour in `src/components/sections/Header/NavLinks.client.tsx`.

## Purpose
Non-primary navigation and secondary actions. Serves persona 2 (scanning for process, services) with an always-visible "you are here", and persona 3 (phone) with a touch cue.

## Anatomy
| Part | Spec |
| --- | --- |
| Text | DM Sans 500, `--step-body` (header/footer may use `--step-small`, never under 13px), `--ink`. Never wraps (standalone) |
| Thread | `.thread` span, `inset: auto 0 -4px 0`, 3px, `--thread` on light, `--accent` inside `[data-on-inverse]` |
| Hit area | `padding-block: 12px; margin-block: -12px` (44px minimum) |
| Inline variant | In running text: `text-decoration: underline 0.07em var(--muted); text-underline-offset: 0.18em` at rest (WCAG 1.4.1). On hover/focus the underline colour goes transparent as the thread draws over it |

## Layout
1440: nav starts col 5, 32px gap. 768: 24px gap. Under 600px: no row; links live in the menu sheet (header.md). Footer links stack, 44px rows.

## States
| State | Spec |
| --- | --- |
| Rest | Ink, no underline (inline: muted underline) |
| Hover (`hover:hover` and `pointer:fine`) | Thread draws left to right, `--t-thread` 260ms in, 180ms out, `--ease-out`, `clip-path` CSS transition. Siblings stay full ink |
| Focus-visible | 2px `--focus` ring, 3px offset, plus thread drawn **instantly** (`transition-duration: 0`) |
| Active/press | Thread draws on `:active` (260ms), the touch cue; no text movement |
| Current | `aria-current="location"`; thread stays drawn (`--thread`; `--accent` when header is `data-on-inverse`). Changes between sections cross in one beat (old out 180ms, new in 260ms, simultaneous), allowed as a state change |
| Disabled | not used |

## Reduced motion
Thread toggles instantly (colour/opacity-style state). No crossing animation.

## Accessibility
Native `<a>`; `<nav aria-label="Primary"><ul>`. `--thread` thread 5.6:1 on `--bg`; ink 16:1 on `--bg`. Targets 44px. Hover rules gated, so no sticky hover on touch; `:active` thread shows the tap landed. Current also exposed via `aria-current`.

## Implementation notes
```ts
interface TextLinkProps extends React.ComponentProps<'a'> { variant?: 'standalone'|'inline'; current?: boolean; onInverse?: boolean }
```
- `TextLink` is a server component (no JS). Use `next/link` for routes; in-page anchors render plain `<a href="#work">` and `NavLinks.client.tsx` intercepts click: `lenis.scrollTo(target, { offset: -64 })`, focus the target (`tabIndex={-1}`); with reduced motion Lenis is off, so fall back to `scrollIntoView()` with `scroll-margin-top: var(--header-h)`.
- `useActiveSection(ids)` (`lib/hooks`) uses one IntersectionObserver, `rootMargin: '-45% 0px -50% 0px'`, last section entering the band wins; none in the hero.
- Engine: CSS. No shadcn/reactbits base; Own. Lenis: anchor `scrollTo` only.
- Content: `navLinks` from `src/content/site.ts`.

## Changes in v2.2
- `--accent-text` removed, replaced by `--thread`/`--accent` rule.
- Inline prose links are underlined at rest (0.07em muted), as the law now says.
- Press = thread draws on `:active`; the 3 to 4px thickening is gone.
- Timings 260/180 `--ease-out`; keyboard focus does not animate; handoff delay removed.
- TSX/server/client split, Lenis anchor handling.
