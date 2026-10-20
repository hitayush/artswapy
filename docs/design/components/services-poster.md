# Services poster ("One item per poster line")

## Purpose
Persona 2 (marketing lead): "what is the scope?" at a glance, set as a poster instead of a feature grid. Persona 1 (founder): is this more than a logo? Lines are short; detail is on demand.

## Anatomy
| Part | Spec |
| --- | --- |
| Section `#services` | `--bg`, padding-block `--section`; visually hidden `h2` "Services" (direction: no visible heading) |
| List | shadcn `Accordion` (`type="single" collapsible`), one item per service |
| Name | `h3` > trigger button; `--step-poster` (92 / 49 / 36px), Space Grotesk 700, leading 0.94, tracking -0.04em, `--ink`, one line |
| Fact | right margin, `--step-body`, tabular figures, `--ink`, baseline-aligned, max 2 lines ≈ 30ch |
| Description | `--step-body`, `--ink`, max 38ch; replaces the fact in the same cell (≥900) or opens under the name (<900) |
| Band | `::before` `--surface`, wiped with clip-path |
| Thread | `Thread` primitive, 3px `--thread`, under the name's width |

The five lines use the process vocabulary so the page says one thing twice, not two things: **Strategy, Identity, Packaging, Communications, Applications**. This splits the current "Packaging & Communications" and renames "Brand Experiences"; needs Swapnil's OK.

## The accent decision
The direction says hover swaps ink for the accent. DESIGN.md v2.2 says the accent is the action fill and the thread only, and display text never turns orange (about 3:1). **Ink never changes colour.** Hover/focus/open draws the thread under the name. The thread is the "orange" the direction wanted.

## Layout
- **1440:** name 92px; row ≈ 90px + padding; fact right-aligned in cols 9–12; first row 80px below the section top.
- **768:** name 49px; fact in a 40% right column, 2 lines.
- **390:** name 36px flush left at `--margin`, fact beneath (16px, 6px above / 22px below). Description appears on tap.

## States
| State | Behaviour |
| --- | --- |
| rest | Ink name, fact visible, no thread |
| hover (`hover:hover` + `pointer:fine`) | Band wipes in, name `translateX(12px)`, thread draws, fact crossfades to description |
| focus-visible | Same end state **instantly** (no transition) + 2px `--focus` ring around the row |
| press / `:active` | Name `scale(0.99)`, 140ms; on touch the thread draws on `:active` (touch cue) |
| open (`data-state=open`) | Description shown, band and thread stay drawn. One open at a time |

## Micro-interactions
- Band: clip-path wipe `--t-hover` 180ms `--ease-out`; out 126ms.
- Name: `translateX(0→12px)` 180ms `--ease-out` (126ms out).
- Thread: `Thread` clip-path, draw 260ms / undraw 180ms (`--t-thread`), no `scaleX`, no origin flip.
- Fact ⇄ description (≥900): fact `opacity→0`, `translateY(0→-6px)`; description `opacity 0→1`, `translateY(6px→0)`; `--t-ui` 240ms `--ease-out`, description delayed 70ms; exit 70%.
- Open on phone and click: Radix `Accordion` content wrapper animated with `grid-template-rows: 0fr→1fr` 320ms open / 220ms close, `--ease-out`; inner content `opacity 0→1` over `--t-ui`. (This is the catalogue's choice; see objections for the layout-property conflict.)
- Entrance: **`lines`**: each poster word rises from its own mask, 105ms apart (never `rows`, which Work uses); fact `rise` with its line.
- Hover on a row that is not open previews; click or Enter pins.

## Reduced motion
No translateX, thread draw, blur or mask rise. Band is an opacity toggle (`--t-hover`); thread is static under the open row; fact/description is an opacity crossfade; accordion opens instantly; entrance = `--t-ui` opacity.

## Accessibility
Radix Accordion semantics: `<h3><button aria-expanded aria-controls>`; description `role="region" aria-labelledby`. Fact stays in the DOM as the button's `aria-describedby` on ≥900. Tab to each trigger, Enter/Space toggles, Home/End/Arrow keys per Radix. Hover/focus preview never moves focus. Visually hidden `h2`. Ink on `--bg` ≈ 16:1. Trigger height ≥ 44px at every width. Inactive rows never faded.

## Implementation notes
- `src/components/sections/ServicesPoster/ServicesPoster.tsx` (server: maps `services`) + `ServicesAccordion.client.tsx` (`"use client"` because Radix state).
```ts
interface ServicesPosterProps { heading: string; services: Service[] }
interface ServicesAccordionProps { services: Service[] }
```
- **Built on** shadcn `Accordion` (`components/ui/accordion.tsx`). We strip: chevron icon, border-bottom, default `data-[state]` keyframe animations, padding, focus ring (replaced by `--focus`), radius and shadow.
- **Engine:** CSS for band, shift, press, thread (via `<Thread>`), grid-rows open; GSAP only for the entrance trigger. No Motion. Hover rules inside `(hover:hover) and (pointer:fine)`; `:focus-visible` twin with `transition-duration:0`.
- Entrance words: `MaskedLines` (RB *Masked Heading*, stripped as in `section-entrance.md`).

## Content source
`src/content/site.ts`, `Service` (`src/types/content.ts`): `{ id: string; title: string; poster: string; fact: string; description: string }`. Drop `num`. Posters: Strategy, Identity, Packaging, Communications, Applications. Facts (no invented numbers): 'Positioning, voice, story' / 'Logo, type, colour, system' / 'Packaging and print' / 'Campaign and voice' / 'Digital and physical touchpoints'. New: `services.heading = 'Services'`.

## Changes in v2.2
- Stale 130/69/56px removed: `--step-poster` only. Thread token `--thread`; `Thread` clip-path (no `scaleX` origin flip).
- Entrance `lines`, distinct from Work.
- Service names align with the five process stages.
- Keyboard focus is instant; exits at 70%; touch cue = thread on `:active`.
- Built on shadcn Accordion; TSX path, typed props, server shell + client island.
