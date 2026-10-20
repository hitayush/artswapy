# ArtSwapy Design System — v2 "The Thread & the Name"

This replaces v1, the "Kinetic Craft & Stitch Framework". **v2.1** applies the critique round 1 findings
(see `docs/design/critique.md`) and designer B's notes: the fit-to-width monument, the `--thread` and `--inverse-muted`
tokens, the four thread roles, touch cues, square buttons only, a loader with no curtain, and contact routes.
**v2.2** moves to the new stack (Next.js + TS, Lenis, shadcn, reactbits, GSAP and Motion; see §4b), adopts
named bezier easings mirrored across CSS, GSAP and Motion, shortens hover timings, and stops animating
keyboard-driven changes. The animated-component catalogue is in `docs/design/motion-system.md`. This file covers the foundations: tokens, type, colour, space,
motion and interaction rules. Component specs live in `docs/design/components/`. The full art-direction sheet
is in `docs/design/direction-sheet.md`, and the audience hypotheses are in `docs/research/user-research.md`.

## 1. The idea

> **On this page, the orange thread Swapnil runs through every brand becomes the one line that draws,
> underlines and binds the name ARTSWAPY, which is set as large as a building.**

- **Direction:** *The name as a monument*. The wordmark is the headline: it spans the full width on the first
  screen, comes back at the bottom as a cropped footer, and everything in between stays calm and small, so
  the contrast holds.
- **Signature move:** *Pinned story*. The process (Strategy → Identity → Packaging → Communications →
  Applications) stays pinned while each stage scrolls past. The page scrolls normally; nothing takes over
  scrolling.
- **The thread:** v1's dashed "stitch" borders become **a single solid thread, 3px wide**. It is never a
  divider and never decoration at rest. It has exactly four roles (taut and slack are the same thread, before and after the pull):
  1. **State**: under a link or row on hover, focus or press, and kept drawn for `aria-current` / selected.
  2. **Load**: drawn once across the first screen.
  3. **Spine**: ties the pinned process stages together, scrubbed by scroll.
  4. **Needle**: crosses the primary button label on hover (Needle pass), and pulls an arrow through an icon button.
  The rule is **at most one *moving* thread on screen at a time**. A static state thread (current nav item)
  may sit alongside it. On light grounds the thread uses `--thread` (#b23506, 5.6:1). The bright `--accent`
  is only used on `--inverse-bg`, because bright orange on paper is 2.9:1 and fails as a state cue.
- **Live thing:** *"Set your name"*. In the footer close, a visitor types their business name (up to 24
  characters) and sees it set in the monument type, fitted to the width and with the thread stitched through it. The
  name then fills the "Start a project" email: subject `Project enquiry — {name}`. It is visually secondary to the
  button and never replaces it. Without JavaScript the field is hidden and the plain `mailto:` button stays.

### Contact routes

Email is not enough for a phone-first audience. Contact offers three routes: **copy email** (always),
**`mailto:` with a prefilled subject and body** (primary), and **WhatsApp or phone** (placeholder until
Swapnil confirms a number). There is no form backend.

### What v2 retires from v1

| v1 | v2 | Why |
| --- | --- | --- |
| Dashed and dotted seams, crosshairs, `STITCH SPEC. 01` marks | One solid 3px thread, only as motion | Thin rules and registration marks read as costume. The thread keeps the stitch idea and gives it weight |
| DM Mono for metadata, uppercase tracked labels | DM Sans in sentence case, 13px minimum, with tabular figures | Monospace and tiny caps are the most common tells on generated pages |
| `[01]` index numbering | Order shown by position and size; `<ol>` where order matters | Numbering is ornament |
| Sage and terracotta as page colours | Project-only colours, used inside work imagery | One ground, one ink, one accent |
| Glass header (`backdrop-filter`) | A plain bar on a flat ground | No glass |
| Hover tilt and drag physics on tiles | One consistent, small response per control type | Generated sites lift every card |

## 2. Tokens

All values are CSS custom properties in `src/styles/tokens.css`. Components reference tokens only.

### Colour

| Token | Value | Role |
| --- | --- | --- |
| `--bg` | `#f6f4ef` | Page ground: warm paper, a little whiter than v1 |
| `--surface` | `#ece9e1` | One tone step for panels and the active row. Surfaces are separated by tone, never by a line |
| `--ink` | `#161614` | All running text and the monument |
| `--muted` | `#5b5850` | Secondary notes only (6.5:1 on `--bg`) |
| `--accent` | `#ff551f` | The primary action fill; the thread on `--inverse-bg` (5.7:1) |
| `--thread` | `#b23506` | The thread on light grounds, and orange used *as text* (5.6:1 on `--bg`, 5.1:1 on `--surface`) |
| `--on-accent` | `#161614` | Text on an orange fill (ink on orange is 5.7:1; white on orange fails) |
| `--inverse-bg` | `#161614` | Footer field and the pinned process |
| `--inverse-ink` | `#f6f4ef` | Text on inverse (16.5:1) |
| `--inverse-muted` | `#a8a497` | Secondary text on inverse (7.3:1) |
| `--focus` | `#b23506` | Focus ring on light grounds; `--accent` on inverse |

The accent carries one idea, the thread Swapnil runs through a brand, in two forms: the primary action's
fill and the thread itself. Nothing else is orange. Display text never turns orange on hover, because orange
display type on paper is about 3:1.

### Type

Two faces, down from three. Space Grotesk for display, DM Sans for everything else.

| Step | Token | Size | Leading | Tracking | Use |
| --- | --- | --- | --- | --- | --- |
| Monument (footer) | `--step-mon-crop` | `calc(var(--step-mon) * 1.08)` | 0.82 | -0.06em | The cropped footer name. It is deliberately wider than the viewport and cut by the bottom and right edges |
| Monument | `--step-mon` | `min(calc((100vw - 2 * var(--margin)) / var(--name-em)), 320px)` | 0.82 | -0.06em | The name, hero and footer. Sized to fit the content width exactly, so it never wraps or overflows |
| Poster | `--step-poster` | `clamp(36px, 6.4vw, 92px)` | 0.94 | -0.04em | Work names, Services, Contact rows, Intro heading, process stage names |
| Heading | `--step-h` | `clamp(28px, 3vw, 40px)` | 1.05 | -0.02em | Section headings, kept modest on purpose |
| Body | `--step-body` | `clamp(16px, 1.15vw, 19px)` | 1.55 | 0 | Running text, 45–70ch |
| Small | `--step-small` | `14px` (never under 13px) | 1.4 | 0.005em | Captions, meta, legal |

- That is five steps, the ceiling. Every size a blueprint names maps onto one of them. The direction's 5.4vw,
  6vw and 6.5vw rows and the 9–10vw poster list all map onto **Poster**. There is no sixth step.
- `--name-em` is the measured advance width of "ARTSWAPY" in Space Grotesk 700 at 1em with -0.06em tracking
  (measured at 4.69 in the browser; the token is set to **4.9**, which leaves about 4% slack for font-load variance). At 390px wide this gives about
  73px. A fixed 96px floor would overflow the content width.
- On phones (< 600px), Poster lines longer than 12 characters ("Communications") use `min(var(--step-poster), 11.5vw)`.
- Weights: Space Grotesk 600 and 700. DM Sans 400 and 500. No weight change on hover, because it reflows text.
- Numbers use `font-variant-numeric: tabular-nums` wherever they align.
- Fonts are loaded with `<link rel="preconnect">` and `<link rel="preload">` in `index.html`, never a CSS
  `@import`, which blocks rendering. Use `display=swap` with a `size-adjust`ed system fallback so the swap does not move the
  layout. **Nothing waits on `document.fonts.ready`.** Measured widths (process spine, needle timing)
  re-measure with a `ResizeObserver` and once more on `document.fonts.ready` (this fixes review finding #7).

### Space and layout

| Token | Value |
| --- | --- |
| `--margin` | `clamp(16px, 2.2vw, 32px)`: the one pair of page margins |
| `--gap` | `clamp(16px, 2vw, 28px)`: grid gap |
| `--space-1 … --space-7` | `4, 8, 16, 24, 40, 64, 104px` |
| `--section` | `clamp(120px, 14vw, 220px)`: the gap between sections, always larger than any gap inside a section |
| Grid | 12 columns, `--margin` outer, `--gap` inner. Text blocks share three left edges: col 1, col 5, col 9 |
| `--radius` | `0` for media and panels. Buttons are **square-cornered**. This is decided once |
| `--header-h` | `64px` |
| Breakpoints | `600px` (phone → tablet), `900px` (index and pinned layouts switch on), `1200px` (wide) |

### Motion

Nothing in the interface moves on a linear or keyword curve (`ease`, `ease-in-out`). Every curve is an
asymmetric cubic-bezier, mirrored in three places: `tokens.css`, the GSAP `CustomEase` registry, and the Motion
`ease` arrays in `lib/motion/easing.ts`. **Linear is used once:** the scroll-to-progress mapping of a scrubbed
timeline. Its feel comes from Lenis and from `scrub: 0.6` smoothing, not from the curve.

| Token | Value (CSS / GSAP / Motion) | Use |
| --- | --- | --- |
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` · `"art.out"` · `[0.23, 1, 0.32, 1]` | Enters, exits, anything answering the user. The default |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` · `"art.inOut"` · `[0.77, 0, 0.175, 1]` | Things already on screen travelling A→B: the thread draw, shutter, menu sheet |
| `--ease-drawer` | `cubic-bezier(0.32, 0.72, 0, 1)` · `"art.drawer"` · `[0.32, 0.72, 0, 1]` | Sheets and the phone menu (iOS-like settle) |
| `--ease-soft` | `cubic-bezier(0.33, 1, 0.68, 1)` · `"art.soft"` · `[0.33, 1, 0.68, 1]` | Long quiet reveals, image scale, portrait drift |
| `--ease-color` | `cubic-bezier(0.4, 0, 0.2, 1)` | Colour and opacity only, on hover |
| *(retired)* | magnet, pointer-follow, left→right fill wipes | Rejected as default and cheap-feeling. **No element follows the pointer anywhere on the site** |
| `--t-press` | `140ms` | Press feedback |
| `--t-hover` | `180ms` | Hover colour and underline |
| `--t-ui` | `240ms` | Menus, image swaps |
| `--t-thread` | `260ms` in / `180ms` out | Hover/focus thread draw. Hover is seen tens of times per visit, so it stays under 300ms |
| `--t-thread-hero` | `700ms` | The one-off load thread and the process-spine knots. Rare, so it can be slower |
| `--t-reveal` | `800ms` | Section entrances |
| `--stagger` | `70ms` | Between parts of one section (heading → text → picture → details) |

## 3. Interaction grammar

There is one response per control type, used everywhere. This is the part v1 left basic.

| Control | Rest | Hover (pointer: fine only) | Press | Focus-visible | Done / current |
| --- | --- | --- | --- | --- | --- |
| **Primary button: "Needle pass"** (orange, square) | `--accent` fill, ink label, arrow at the right | The fill **never changes**. A 2px ink needle crosses the label (440ms `--ease-in-out`). Each letter rolls to an identical copy the moment the needle crosses it (260ms `--ease-out`, timed from the curve), and the arrow is pulled out right and a fresh one pulled in from the left. It plays once per hover and never replays mid-run | **Tug**: `translateY(1px) scale(0.97)`, 140ms in / 200ms out | 2px `--focus` ring, 3px offset. No needle on keyboard focus | — |
| **Text link: "Taut thread"** | Ink. Standalone links (nav, footer) have no underline. **Links inside running text** keep a 0.07em `--muted` underline at rest (WCAG 1.4.1), and the thread replaces it on hover | A **slack thread appears under the word and pulls tight**: an SVG quadratic path whose sag goes 9px → 0 (320ms `--ease-out`), with opacity in over 120ms. On leave it fades over 160ms and resets slack. The tween keeps its current value, so it's interruptible | Thread draws on `:active` (this is the touch cue) | Thread drawn plus a focus ring | `aria-current`: thread stays drawn |
| **Nav link** | As text link | As text link. Siblings stay at full ink, because hover never lowers contrast | As text link | Ring | Current section: thread drawn (driven by IntersectionObserver), on the header and in the phone menu sheet |
| **Work row: "Unzip"** | Full ink | The `--surface` band **opens outward from the pointer's entry x** (clip-path `inset(0 100-x% 0 x%)` → `inset(0)`, 300ms `--ease-out`), like a seam unpicked from that stitch. On leave it closes toward the exit point (180ms). The name shifts 12px right, and the preview crossfades through a 2px blur (240ms). No cursor-following thread | Tug | Band and preview appear **instantly** (keyboard) | Selected row keeps the band |
| **Service row: "Fold"** | Full ink, a square plus at the right | Opens on click or tap only, never on hover: the description **unfolds down from its crease** (`rotateX(-82deg)` → 0, 460ms `--ease-out`, perspective 900px) while the height opens (`grid-template-rows`, 380ms). A thread draws under the open service, and the plus turns 135° into a close mark. It folds away in 200ms | Tug | Ring; Enter and Space toggle | Open row keeps its thread |
| **Image link** | Square, cover | Image scales 1.00→1.03 inside its frame over 900ms `--ease-soft`. The frame itself does not move | — | Ring on the frame | — |
| **Icon button: "Pull-through"** (square, like every button) | `--surface` fill, ink icon, 44×44 minimum | The ground darkens to `--ink` **in place** (opacity 220ms in / 160ms out, no wipe). The arrow is drawn out right on a 2px `--accent` thread (240ms `--ease-in-out`), and a fresh arrow is pulled in from the left 90ms behind it (280ms `--ease-out`). A close icon rotates 90° instead | Tug | Ring; colour change only | — |
| **Copy email: "Stamp"** | Address plus an ink "Copy email" button | — | Tug | Ring | A "Copied" tag in `--accent` **lands like an ink stamp** (scale 1.35→1, −9°→−4°, 220ms `--ease-out`), holds 1.4s, then lifts (180ms). If the clipboard is blocked, the address is selected and the stamp reads "Selected" |

Rules:
- **Keyboard-driven changes don't animate.** Arrowing or tabbing through Work rows swaps the preview instantly
  (`transition-duration: 0` under `:focus-visible`), and the focus ring is not animated. Only pointer and
  scroll changes animate.
- **Exit is always faster than enter** (about 70%). Release is always snappy: a press scales down over 140ms
  and returns over 200ms with `--ease-out`.
- Hover styles live inside `@media (hover: hover) and (pointer: fine)`. On touch, hover sticks after a tap.
  **Touch gets its own cues**: `:active` press transforms, the thread drawing on tap, selected and current states that stay drawn,
  and phone layouts that show what hover would have revealed (Work images inline, Services descriptions on tap).
- Corners are square everywhere, buttons included. The direction's round arrow button becomes a square icon button.
- The header takes `data-on-inverse` when it is over the pinned process or the footer. It switches to `--inverse-ink`
  with an `--accent` thread, over `--t-ui`.
- Every hover has a matching `:focus-visible` state. Keyboard users get the same feedback.
- No bounce or elastic easing, no glows, no shadows at rest, no hover lift on cards.
- Animate only `transform`, `opacity` and `clip-path`. The one accepted exception is the accordion's
  `grid-template-rows: 0fr → 1fr` (Services on phones). It is short and rare, and it opens to the real content height.
- **One orange action per screen.** When Contact and the footer close are both in view, Contact's greeting
  button uses the ink IconButton and the footer keeps the orange `CTAButton`.

## 4. Motion layer

1. **Load:** there is no curtain and nothing hides the page. The hero paints at once, so a referred visitor sees the
   name and the portrait on first paint. On the first visit of a session, the thread draws once across the name
   (700ms) and the supporting sentence and button rise behind it (stagger `--stagger`). The whole sequence is
   900ms or less, never blocks scrolling or input, and is skipped on repeat visits (`sessionStorage`) and under
   reduced motion.
2. **Signature, the pinned process:** see `components/process-story.md`.
3. **Section entrances:** each section sets its own choreography (a list arrives row by row, an image opens
   with a shutter, a heading rises from a mask). Stagger is `--stagger`, and travel is 16–32px. Each plays once.
4. **One moving picture:** the hero portrait drifts slowly with scroll. The image is 112% of its frame's height
   and translates 0→-8% inside it, so no empty edge ever shows.
6. **No JavaScript:** the page is client-rendered, so `index.html` carries a `<noscript>` block with the name,
   one sentence, the email and a `mailto:` link.
5. **Reduced motion:** opacity and colour changes stay. Travel, scale, parallax, the needle, the stamp tilt and the load thread
   are dropped, and the loader is replaced by an instant paint. Pinned and horizontal sections lose their height
   and stack normally (this fixes review finding #4).

## 4b. Stack and motion ownership

| Concern | Tool | Rule |
| --- | --- | --- |
| Framework | **Next.js (App Router) + TypeScript**, static export to Vercel | Sections are server components. Anything animated is a small `"use client"` island |
| Smooth scroll | **Lenis** (`lerp: 0.1`, `syncTouch: false`) | Mounted once in `<SmoothScroll>`. **Not started** under reduced motion. Touch keeps native scrolling. Anchor links go through `lenis.scrollTo(el, { offset: -headerH })`. Sticky positioning keeps working because Lenis drives native scroll |
| Scroll-driven motion | **GSAP + ScrollTrigger** (and SplitText) | Process spine, About pin, portrait drift, masked line splits. One ticker: `lenis.on('scroll', ScrollTrigger.update)` with `gsap.ticker.add(t => lenis.raf(t * 1000))` and `lagSmoothing(0)`. Every timeline is created in `useGSAP` with a scope, so cleanup is automatic |
| Interaction and state motion | **Motion** (`motion/react`) and **WAAPI** | Needle pass, pull-through, unzip and stamp are short WAAPI sequences: compositor-run, cancellable, and timed from the bezier. Taut thread uses Motion's `animate()` on a motion value driving the path's `d`. `AnimatePresence` handles the menu |
| Simple hover and press | **CSS transitions** | Tug, colour changes, fold, name shift. Interruptible and off the main thread |
| Primitives | **shadcn/ui** (Radix) restyled to the tokens: `Button`, `Sheet` (phone menu), `Input` (Set your name), `Accordion` (services on phone), `Sonner` (copied toast), `Tooltip` | Default shadcn styling (radius, shadows, ring) is removed. Only the a11y behaviour is kept |
| Animated components | **reactbits.dev**, installed as TS + Tailwind via the shadcn registry | Picked and adapted per `docs/design/motion-system.md`. Never used stock: every one is re-tokened and checked against the house rules |

Two engines never animate the same element. GSAP owns scroll, Motion owns the pointer, and CSS owns hover and press.

## 5. Accessibility floor

- Text contrast is 4.5:1 or more everywhere. Inactive list items stay at full `--ink` or `--muted`; they are
  never faded with opacity.
- The focus ring is always visible, and `outline` is never removed without a replacement.
- The loader carries no `aria-live` region (this fixes review finding #5). It has one visually hidden "Loaded" announcement at most.
- Touch targets are at least 44×44px.
- Every motion hook is safe under the Rules of Hooks: all hooks are called first, then the code branches on `reduce` (this fixes review finding #3).

## 6. Imagery

The project has no photography of its own yet, so imagery is filled in this order (details in the direction sheet, §5):
1. Swapnil's portrait and approved project imagery, when they are supplied.
2. Drawings in code of the concept projects' identities (the marks, packaging fronts), set flat in each
   project's own colours. Sage and terracotta live here.
3. Credited open-collection pictures of the trade's world: type cases, print blocks, thread and looms. They
   are shown as the world around the practice and never as client work.

Square corners and one treatment across the page. Placeholders stay visibly tagged until replaced.
