# Header

`src/components/sections/Header/Header.tsx` (server shell), `NavLinks.client.tsx`, `MenuSheet.client.tsx`; hooks `useHeaderInk`, `useActiveSection` in `src/lib/hooks/`.

## Purpose
Orientation and one way out. Persona 2 jumps between Work, About, Services; persona 3 on a phone must always have a way to write.

## Anatomy
| Part | Spec |
| --- | --- |
| Bar | `position: fixed; top:0`, `--header-h` 64px, flat `--bg`. No blur, shadow or rule. **Always visible: no hide on scroll** |
| Wordmark | "ArtSwapy", Space Grotesk 700, 20px, links to `#top`, col 1 |
| Nav (600px and up) | 4 `TextLink`s from `navLinks`, left edge col 5 |
| Action | `CTAButton size="sm"` "Start a project" (`data-primary-action` is NOT set on the header's own button) |
| Phone (under 600px) | wordmark, compact action (44px, no arrow), "Menu" button (44px) |
| Sheet | shadcn `Sheet` (Radix Dialog), full screen, `--inverse-bg` |
| Ink | `data-on-inverse` on `<header>` |

## Layout
1440: wordmark, nav at col 5, action at the right margin. 768: same, 24px gap. 390: wordmark 90px, action about 140px, Menu about 60px, 12px gaps (fits 358px).

## Action visibility
Elements tagged `data-primary-action` (hero button, footer button, any contact-rows button) are watched by one IntersectionObserver; the header action fades (opacity, 180ms) out while one is in view, so two orange buttons never share a screen, and in when none is. Space is reserved. On phones the hero button sits above the fold, so the bar action first appears once it scrolls away and then stays until the footer button is in view: it is the persistent route to contact.

## Ink switching
`useHeaderInk` observes `[data-inverse-section]` (process, footer) with `rootMargin: '0px 0px calc(-100% + 64px) 0px'`. On intersect set `header[data-on-inverse]`: text and wordmark `--inverse-ink`, nav thread `--accent`, bar fill `--inverse-bg`, `--t-ui` 240ms `--ease-color` (fill crossfaded with a stacked layer's opacity so only opacity animates). Background layers: two stacked bars, `--bg` and `--inverse-bg`, opacity swapped.

## States
| State | Spec |
| --- | --- |
| Link hover/focus/active | text-link.md |
| Current section | thread drawn (`aria-current`) |
| Menu closed/open | `aria-expanded`; trigger text "Menu"/"Close" (swap instant) |
| Press | trigger `scale(0.97)` 140ms; thread draws on `:active` |
| Keyboard | no motion on focus changes |

## Menu sheet
- Open: `AnimatePresence` + Motion. `clip-path: circle(0 at X Y)` to `circle(150vmax at X Y)` with X/Y the trigger centre, 420ms `--ease-drawer`. Links (`--step-poster`, Space Grotesk 700, `--inverse-ink`, 56px rows) rise from a mask, stagger 50ms starting at 120ms, 400ms `--ease-out`. Foot: full-width `CTAButton` then `CopyEmail tone="inverse"`.
- Close (Escape, trigger, link tap): 260ms, links fade 120ms; exit faster than enter.
- Radix gives focus trap, `aria-modal`, Escape and return focus to trigger. `lenis.stop()` on open, `lenis.start()` on close (and on unmount); Radix's scroll lock handles the native fallback.
- Link tap: close, then `lenis.scrollTo(target, { offset: -64 })`.

## Reduced motion
Sheet fades in by opacity (`--t-ui`), links appear together. Ink switch is a colour swap. Lenis is off, so anchors use `scrollIntoView` with `scroll-margin-top`.

## Accessibility
`<header>` with `<nav aria-label="Primary">`; skip link is the first focusable element. Trigger's visible text is its name. Contrast: ink on `--bg` 16:1; `--inverse-ink` on `--inverse-bg` 16.5:1; `--accent` thread on inverse 5.7:1. Targets 44px.

## Implementation notes
```ts
interface HeaderProps { nav: { href: string; label: string }[]; cta: string; mailto: string }
```
Header shell is a server component; `NavLinks`, `MenuSheet`, action visibility and ink are client islands (tiny). Engines: CSS (ink swap, links), Motion (sheet). shadcn `Sheet` restyled: `radius 0`, no shadow, its overlay removed (the clip-path circle is the surface), default slide animation removed. No reactbits component is installed; the "Staggered Menu" pattern is reimplemented (not copied). Use `useStableCallback` for observer handlers.

## Content source
`site.name`, `navLinks`, `contact.cta`, `site.email`, `contact.mailto` from `src/content/site.ts`.

## Changes in v2.2
- Breakpoint 600 (was 720); `data-on-inverse`; no hide-on-scroll.
- Persistent compact action on phones (after the hero button leaves view); `data-primary-action` tagging for all primary buttons.
- Menu links use `--step-poster`; sheet 420ms `--ease-drawer` (was 520ms), exit 260ms.
- shadcn Sheet + Radix focus trap, `lenis.stop()/start()`.
- Handoff delay and keyboard motion removed.
