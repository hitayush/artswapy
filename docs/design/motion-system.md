# Motion System — animated components

How every moving part of ArtSwapy is built on the new stack. Easing and duration tokens are in `DESIGN.md` §2,
and which library owns what is in §4b. Component anatomy, states and accessibility are in `components/*.md`.
This file decides **what animates, why, with what, and how it feels.**

Every animation below passes Emil Kowalski's four questions: *should it animate* (how often it's seen), *why*
(its purpose), *which easing*, and *how fast*. Motion terms follow the shared vocabulary (stagger, reveal,
origin-aware, interruptible, and so on) so that design and code use the same names.

## 1. Frequency → budget

| How often a visitor sees it | Components | Budget |
| --- | --- | --- |
| Tens of times per visit | Taut thread, unzip band, tug, colour changes | ≤ 320ms, interruptible, never on keyboard |
| A few times per visit | Phone menu sheet, Work preview swap, copied toast, Services disclosure | 180–400ms, `--ease-drawer` or `--ease-out`, origin-aware |
| Once per visit | Load thread, section entrances, masked headings | 600–900ms, stagger 60–80ms, never blocks input |
| Driven by scroll | Process spine, About pin, portrait drift | No duration: scrubbed with `scrub: 0.6` on Lenis |
| Rare delight | "Set your name" stitch | ≤ 700ms, the one playful moment |

## 2. Catalogue

`RB` means a reactbits.dev component, installed with `npx shadcn@latest add @react-bits/<Name>-TS-TW`.
`shadcn` means a shadcn/ui primitive. `Own` means written in this repo.

| Component | Built from | Engine | Motion (vocabulary) | Easing · duration | Purpose |
| --- | --- | --- | --- | --- | --- |
| **Load thread** | Own (`<Thread>`) | WAAPI | *Line drawing* via `clip-path` *reveal* across the name, then the sentence and button arrive in a *stagger* | `--ease-in-out` 700ms; stagger 70ms | Signs the page with the thread once; skipped on repeat visits |
| **Masked heading** | RB *Masked Heading*, or RB *Split Text* (GSAP SplitText) | GSAP | *Reveal*: each line *translates* up from behind its own mask | `art.out` 900ms, lines 110ms apart | Gives headings weight on entry |
| **Section entrance** | Own `useReveal` (pattern from RB *Animated Content*) | GSAP ScrollTrigger, `once: true` | *Scroll reveal*: heading → text → picture *orchestration* | `art.out` 800ms, 16–32px, stagger 70ms | Reading order made visible |
| **Image shutter** | Own | CSS + IntersectionObserver | `clip-path` *reveal* from the bottom while the image *scales* 1.08→1 | clip `--ease-in-out` 1000ms; scale `--ease-soft` 1400ms | The one hero-grade image entrance per section |
| **Primary button: Needle pass** | shadcn `Button` restyled | WAAPI (needle, letters, arrow) + CSS (tug) | A 2px ink *line* crosses the label; each letter does a vertical *roll* (an identical copy, so the rest state never changes) *timed to the needle's easing curve*; arrow *pulled through*. Fill never changes | needle 440ms `art.inOut`; letters 260ms `art.out`; tug 140/200ms | The one action gets craft instead of a colour swap. Plays once per hover |
| **Text and nav link: Taut thread** | Own `<Thread>` (SVG quadratic path) | Motion `animate()` on a motion value → path `d` | Slack thread *fades in* and *pulls taut* (sag 9px → 0); retracts by fading | pull 320ms `art.out`; in 120ms; out 160ms | The brand's thread as the state mark, with *follow-through* that feels physical |
| **Work row: Unzip** | Own | WAAPI (band) + CSS (name) | *Origin-aware* `clip-path` *reveal* from the pointer's entry x outward; closes toward the exit x; preview *crossfade* with a 2px *blur* bridge | open 300ms `art.out`; close 180ms; preview 240ms | Shows the work without leaving the list; keyboard focus is instant |
| **Service row: Fold** | shadcn `Accordion` (Radix) restyled | CSS | Description *unfolds* from its crease (`rotateX(-82deg)` → 0, perspective 900px) with an *accordion* height; plus mark rotates 135°; thread draws under the open row | unfold 460ms `art.out`; height 380ms; fold away 200ms | Paper and stationery are the practice's material; click/tap only, so it works on touch |
| **Process story** *(signature)* | Own | GSAP ScrollTrigger (pin + scrub) | *Scroll-driven animation*: the thread spine grows and each knot's stage name does a masked rise; *pinned* | scrub 0.6; knot rise `art.out` 600ms | Explains how a project moves, the marketing lead's question |
| **Portrait drift** | Own | GSAP scrub | *Parallax* inside the frame (image 112%, `yPercent` 0→-8) | scrub, linear mapping | The page's one moving picture |
| **Phone menu** | shadcn `Sheet` (Radix Dialog) + RB *Staggered Menu* pattern | Motion `AnimatePresence` | *Origin-aware* `clip-path: circle()` from the trigger; links do a masked rise with a *stagger* | open `--ease-drawer` 420ms, stagger 50ms; close 260ms | Navigation on phones; focus-trapped by Radix |
| **Copy email: Stamp** | Own + shadcn `Sonner` (announcement only) | WAAPI | "Copied" tag lands like an ink *stamp*: *scale in* from 1.35 with a tilt settling −9° → −4°, holds, then lifts | 220ms `art.out`; hold 1.4s; lift 180ms | Confirms an invisible action with a little character, since it's rare |
| **Icon button: Pull-through** | shadcn `Button` restyled | WAAPI + CSS | Ground *crossfades* to ink in place; arrow *slides* out right on a 2px orange thread; a fresh arrow is *pulled in* from the left | out 240ms `art.inOut`; in 280ms `art.out` (+90ms) | Direction made visible without a fill wipe |
| **Set your name** | shadcn `Input` + RB *Variable Proximity* (optional) | Motion | Typed letters *fit to width* (no animation on each keystroke); on blur the thread *stitches* over and under the letters (*line drawing*) | stitch `--ease-in-out` 700ms | The one live thing; a rare, playful delight |
| **Header** | Own | CSS | Ink swaps to inverse over dark sections (`data-on-inverse`, *crossfade* of colour) | 240ms `--ease-color` | Stays legible over every ground; **no hide-on-scroll** (per critique) |

### Rejected from reactbits, and why

| Component | Why not |
| --- | --- |
| Shiny Text, Gradient Text, Glitch, Fuzzy, Decrypted, Scrambled, ASCII, Tech Text | Ornament or gradients; they read as generated (house rules) |
| Splash Cursor, Target Cursor, Blob Cursor, Image Trail, Click Spark | Custom cursors and trails cost usability; they decorate rather than explain |
| Scroll Reveal (word dimming) | Fades readable text below 4.5:1 while it's on screen |
| Scroll Velocity, Curved Loop, Text Loop marquees | Constant linear motion with no purpose; the thread already carries the stitch idea |
| Flowing Menu | Marquee-in-row fights the Work index's fixed preview |
| Count Up | There are no real numbers to count, and the README forbids invented stats |
| Text Pressure | It competes with the monument; Variable Proximity is kept as an optional, smaller-scale cousin in the footer only |

## 3. Review against Emil's checklist (v2.0 specs → v2.2)

| Before | After | Why |
| --- | --- | --- |
| Thread hover draw 520ms `--ease-in-out` | 260ms in / 180ms out `--ease-out` | Hover is seen tens of times per visit, so UI motion stays under 300ms and exit is faster than enter |
| Thread animated with `scaleX` and an origin flip | `clip-path: inset()` on a span | Interrupting a hover mid-way no longer jumps; still compositor-friendly |
| Preview swap animated on keyboard focus | Instant under `:focus-visible` | Never animate keyboard-initiated actions |
| Preview crossfade showed two images overlapping | Crossfade plus `filter: blur(2px)` on the outgoing image | Blur bridges the two states so they read as one change |
| Menu sheet scales from centre | `clip-path: circle()` from the trigger's coordinates | Origin-aware: it grows out of the button that opened it |
| Loader: fixed overlay, name hidden until `fonts.ready`, 1.6s | No overlay; a 700ms thread over an already-painted hero | The overlay swallowed taps; perceived performance matters most for referred visitors |
| Magnet (pointer-follow) on the CTA, left→right ink fill wipe on hover | Needle pass, with the fill unchanged; tug on press | Both are stock defaults that read as cheap. The new move comes from the brand's own material (needle and thread) |
| Keyword curves (`ease-in-out`) in specs | Named bezier tokens mirrored in CSS, GSAP and Motion | Built-in curves lack punch; one source of truth |
| Motion `x`/`y` shorthands on the cursor thread | `style={{ transform }}` from a `useTransform` template | Stays hardware-accelerated while the page loads images |
| Header hides on scroll-down | Always visible; colour swap only | The critique found no persistent action on phones; it was motion without purpose |

## 4. Reduced motion

`useReducedMotion()` (Motion) and `matchMedia` (GSAP via `gsap.matchMedia()`) gate everything:

- Lenis is not started.
- Every ScrollTrigger pin and scrub is removed: Process and About collapse to a stacked `<ol>` and normal flow.
- Opacity and colour changes stay (the thread appears taut without the pull; the icon button still darkens).
- Load thread, needle, arrow pull-through, stamp tilt, portrait drift and stagger travel are all off.
