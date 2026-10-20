# Work index ("Big names, fixed preview")

Replaces the horizontal-scroll Work section (`work-scroll-container`, `WorkPanel` in the Vite `src/main.jsx`). Why: it hijacks vertical scroll for three projects, hides names until scrubbed, adds a second pinned moment against the signature process, and cannot collapse cleanly (review finding #4).

## Purpose
Persona 1 ("can they make *my* brand look this good?") and the marketing lead: names scan at a glance, the preview answers "what does it look like?" without a click, and every project leads to a conversation (the research task: "find a project like your business and start a conversation"). All three are concept placeholders and stay tagged.

## Anatomy
| Part | Spec |
| --- | --- |
| Heading `h2` | `work.heading` "Selected work", `--step-h`, `--ink`, `--space-6` above the first row |
| List `<ul>` | cols 1–8, no rules between rows |
| Row `li` > `a` | padding-block `--space-4`; name `--step-poster`, `--ink` always. Meta (right, `--step-small`, `--muted`): category, then `year · Concept` |
| Row purpose | `<a>` to `project.href` if a case study exists, else `mailto:` with subject `Project enquiry — like {name}` and a prefilled body. On hover/focus the meta line swaps to "Start one like this" with an arrow |
| Band | `::before`, `--surface`, bleeds to both margins; wiped with clip-path (no colour animated) |
| Preview frame | cols 9–12, 4:5, `--radius` 0, `position:sticky; top:15vh`, stacked drawn marks; `PlaceholderTag` bottom-left inside the frame |
| Cursor thread | `Thread` primitive, 3px `--thread`, 72px, on the active row's baseline |

Order is not meaningful (`<ul>`, no numbers).

## Layout
- **1440:** 3 rows ≈ 92px name + 48px padding ≈ 140px each; frame 468px; sticky holds for up to nine projects. Meta right-aligned in col 8.
- **900–1199:** meta moves under the name; frame cols 9–12.
- **768 and 390 (< 900px): image then name.** Per project: 16:10 drawn mark (full width minus margins, `Concept` tag on the corner), name `--step-poster` (49 / 36px), meta, then a `TextLink` "Start a project like this" (touch cue: thread draws on `:active`). 40px between projects. No sticky, no band, no cursor thread, and the name is not itself a link here (tapping a name to open a mail app would surprise).

## States (≥900, `(hover:hover) and (pointer:fine)`)
| State | Behaviour |
| --- | --- |
| rest | Row 0 active: band, thread at name start, preview 0 |
| hover | Row becomes active (below) |
| focus-visible | Same end state but **instant** (`data-instant`: durations 0, no thread draw; thread simply drawn at the name start) plus 2px `--focus` ring, 3px offset |
| press | Name `scale(0.99)`, origin left, 140ms down / 200ms back, `--ease-out` |
| current | Last hovered/focused row keeps the band, static thread and preview (`data-active`) |

## Micro-interactions
- Band: `clip-path inset(0 100% 0 0)→inset(0)`, `--t-hover` 180ms `--ease-out`; out 126ms.
- Name `translateX(0→12px)`, 180ms `--ease-out` (126ms out). Meta line swap: `opacity` + 6px rise, `--t-ui`.
- Preview crossfade: incoming image `opacity 0→1` over `--t-ui` 240ms `--ease-out`, plus `scale(1.04→1)` 600ms `--ease-soft`; outgoing image `opacity 1→0` over 240ms with `filter: blur(0→2px)` (the 2px bridge). Only the pair in flight is promoted. Frame never moves.
- Cursor thread: `Thread` clip-path draws in 260ms / out 180ms (`--t-thread`) when a row becomes active; thereafter its x follows the pointer on `--spring-follow` (`{stiffness:400, damping:40, mass:0.6}`), written as `useMotionTemplate\`translateX(${x}px)\`` into `style.transform` (not `x`). Clamped to `[nameStart, rowEnd−72px]`. It moves to a new row on the same spring (not redrawn). This is the one moving thread on screen.
- Entrance: heading `lines`; rows `rows` (`i` per row); frame `rise` (no shutter, because Intro just used one). Reveal is on the `li`, hover on the `a`.

## Reduced motion
No thread following, translateX, scale or blur. Active change = band opacity toggle + preview opacity crossfade at `--t-ui`. A static 3px `--thread` underline sits under the active name. Layout unchanged.

## Accessibility
`<section id="work" aria-labelledby>`; `<ul>`; each row a real `<a>` whose name reads "Aaranya, Identity · Packaging, concept project. Start a project like this" (no `aria-pressed`: the semantics are navigation). Preview images are decorative duplicates of the row: `alt=""` except one text alternative on the frame ("Concept mark for {active name}"), updated on change but **not** an `aria-live` region. Touch targets ≥ 44px (rows ≈ 140px). Ink on `--bg` ≈ 16:1; meta `--muted` 6.5:1. Inactive rows never faded.

## Implementation notes
- `src/components/sections/WorkIndex/WorkIndex.tsx` (server: markup, phone stack) + `WorkIndexList.client.tsx` (state, pointer) + `marks/*.tsx` (drawn SVG).
```ts
interface WorkIndexProps { heading: string; projects: Project[]; enquiry: MailtoTemplate }
interface WorkIndexListProps { projects: Project[]; enquiry: MailtoTemplate }
```
- **Engine ownership:** CSS = band, name shift, press, preview opacity/blur; Motion = pointer spring (`useMotionValue`, `useSpring`, `useMotionTemplate`; x written by one `onPointerMove` on the `ul`, no React state per move); GSAP = entrance trigger only.
- `activeIndex` in `useState`, set on `onPointerEnter` and `onFocus`; keyboard detected with `e.currentTarget.matches(':focus-visible')` to set `data-instant`.
- No shadcn primitive (a link list). No reactbits component: RB *Flowing Menu* is rejected (motion-system.md). Hover rules inside `(hover:hover) and (pointer:fine)`.
- Desktop stack and phone stack are two lazy-image sets hidden by `display:none` per breakpoint.

## Content source
`src/content/site.ts`, `Project` (`src/types/content.ts`): `{ id; name; year; category; summary; placeholder: boolean; preview: { alt: string; mark: 'aaranya'|'common'|'habit' }; href?: string }`. Drop `no`, `className`, `mark`, `line`. New: `work.heading`, `work.enquiry = { subject: (name) => 'Project enquiry — like ' + name, body }`.

## Changes in v2.2
- `--step-row` and the 1.0/-0.03em overrides replaced by `--step-poster` (92 / 49 / 36px).
- Rows are real links (case study or prefilled mailto "like {name}"); `aria-pressed` buttons removed; phone gets "Start a project like this".
- Thread colour `--thread`; clip-path `Thread`, not `scaleX`; `--spring-follow` with a transform template; spring damping no longer 32.
- Keyboard focus swaps are instant; 2px blur bridge; exits at 70% (126ms band, 180ms thread).
- Entrance differs from Services (rows + rise vs lines); no shutter here.
- TSX path, typed props, server shell + client island.
