# ArtSwapy design critique

Framework: `design:design-critique` (first impression, usability, hierarchy, consistency, accessibility) plus the micro-interaction audit that was asked for.
Personas: **P1** founder with a growing business (phone, 1-3 min), **P2** marketing lead (desktop, process and depth), **P3** referred visitor (phone, under 1 min, "is this person real").
Screenshots: `/tmp/claude-1000/-home-meshwa-Documents-Projects-artswapy/de539a32-3eb2-48ba-8a67-9e746fdab0b5/scratchpad/critique/`, named `<width>-<nn>-<section>.png`. `1440-h-*` are hover and focus states. Measurements come from Playwright against the dev server.

---

## Round 1 — Current site

### Overall impression
A competent, warm v1 page. The Space Grotesk headline and the orange fills carry real personality, and the first two seconds read "brand studio, craft, orange", which is right. But the biggest object on the first screen is a placeholder box that shows `public/images/swapy-portrait.png`, and the page is wrapped in scaffolding (grid canvas, dashed seams, mono tags, `EDITABLE`, `PLACEHOLDER`, `CONFIRM EMAIL`). It reads as a template with its labels still on, not as a person's practice.

### Blocking

**B1. The hero's dominant element is a placeholder, so the page cannot answer P3 ("is this person real?") or P1 ("can they do this for my brand?").**
- Evidence: `1440-01-first.png`, `390-01-first.png`. The portrait card takes about 40% of the 1440 screen and shows "SG", `PORTRAIT PLACEHOLDER` and a file path. The meta strip below reads `CITY, COUNTRY [EDITABLE]` and `ADD CURRENT AVAILABILITY [EDITABLE]`.
- Why: P3 decides on the founder's face and name within a minute. P1 decides on work quality. Both bounce when they see dev text.
- Recommend: do not launch without a real portrait. Until then, hide the card and the meta strip instead of tagging them. Gate every `placeholder: true` item behind a build flag so a launch build cannot render a tag.

**B2. Scaffolding is visible in every section.**
- Evidence: `1440-02-work.png` (`CONCEPT PLACEHOLDERS`, `PLACEHOLDER` beside AARANYA, `ARTSWAPY // ARCHIVE 01`, `SPEC 01`), `1440-02-about.png` (`PLACEHOLDER Add a short founder bio here`), `1440-03-footer.png` (`CONFIRM EMAIL`).
- Why: honesty is correct, since the README forbids invented proof. But per-item tags make the whole page feel like a draft, and P2 (who judges case-study depth) finds no case study at all.
- Recommend: one page-level honest note ("Concept projects; client work coming") in place of per-item tags. Cut the "ARCHIVE" and "SPEC" mono furniture. The real blocker is content (bio, portrait, contact), which design cannot fix. Flag it to the owner.

### Major

**M1. Micro-interactions are basic and inconsistent.** Audit of the CSS (`src/styles.css` hover rules at lines 197-224, 445, 728-771, 896-902, 966, 1010-1023, 1154, 1187):

| Control | Hover today | Press | Verdict |
| --- | --- | --- | --- |
| Nav link | Orange-ink colour plus underline `scaleX` (`1440-h-nav.png`) | none | The one good one. |
| Header CTA | Outline button, arrow nudges 2px (`1440-h-cta.png`) | none | Barely noticeable at 36px tall. |
| Work card | Whole card plus art-mark and circle button react | none | Lifts the entire card, which is the generated-site tell. |
| Service row | Near-invisible tint (`rgba(255,85,31,.05)`), name turns orange and shifts 8px (`1440-h-service.png`) | none | Closest to v2's index row. The tint is almost invisible. |
| Finale CTA | Offset-shadow button | none | A hard shadow at rest is a different visual language from every other button. |
| Footer links | Colour only | none | Fine. |

- There is no `:active` rule anywhere, so no control gives click feedback.
- Hover rules are not scoped to `(hover: hover)`, so hover sticks after a tap on phones (P1, P3).
- There are five different hover grammars (underline draw, tint, shift, shadow, colour). Nothing teaches "orange means act".
- On touch there is effectively no interaction layer.
- Recommend: adopt one grammar, as DESIGN.md section 3 does, but add the touch and press columns it lacks (see D4, D6).

**M2. Type below any sane floor, mostly mono caps.**
- Evidence: text nodes under 13px by size: 8.5px (3), 9px (6), 9.5px (9), 10px (1), 10.5px (11), 11px (38), 11.5px (2), 12px (10). Nearly all are DM Mono, uppercase and tracked (chips in `1440-02-work.png`, "HOW A PROJECT MOVES" pills in `1440-02-about.png`).
- Why: unreadable for P1 on a phone, and they flatten hierarchy. Seventy-odd micro labels leave no signal.
- Recommend: 13px floor in sentence case (v2 already says this). Delete roughly half the labels outright (`[01 / 03] AARANYA`, `02 SELECTED WORK`).

**M3. Targets under 44px.**
- Evidence: at 1440, nav links are 28px tall, the header CTA 36px, footer links 14px, the wordmark 22px. At 390, footer nav links (29-58 x 14px), the wordmark (22px) and "Back to top" (14px) fail. `finale-cta` is 43px.
- Why: P1 and P3 use thumbs.
- Recommend: pad hit areas to 44px. Make this an acceptance criterion in v2.

**M4. Work is a horizontal pinned scroller that hides the proof.**
- Evidence: `1440-02-work.png` shows one card and a clipped second, with "Scroll down to explore" moving sideways. At 390 (`390-02-work.png`) it falls back to stacked cards, which is better.
- Why: P1 wants to scan fast for "a project like mine". A scroll-converted lane costs a screen per project and gives keyboard users no way to jump.
- Recommend: v2's name-index plus fixed preview fixes this. Keep it, with image-then-name stacking on phones.

**M5. Contact: unfinished feel, and `mailto:` is the only route.**
- Evidence: `1440-02-contact.png`. The CTA has a hard offset shadow, a dashed red rule runs under the subhead, and the email carries a `CONFIRM EMAIL` tag.
- Why: P1 inside an Instagram or in-app browser often has no mail client, so `mailto:` does nothing. P3 wants to message right away.
- Recommend: keep "Start a project" as the one primary, and add a visible secondary (WhatsApp or phone, copy address).

### Minor
- m1. The scroll-spy "current" ring and the keyboard focus ring look the same (`1440-h-service.png` shows a ringed "About" while Services is on screen), so visitors cannot tell "current" from "focused".
- m2. The loader (shutter, counter, quote) is heavy for P3. A skip button exists, which is good.
- m3. The grid canvas and dashed header seam add noise behind the headline. v2 retires them, agreed.
- m4. Services has 4 rows ("Brand Experiences") but the process has 5 stages ("Applications"). Two taxonomies will confuse P2.

### What works
- Display type and tone (Space Grotesk, tight tracking, one orange word) is the strongest asset.
- Honest content policy, a skip link, `aria-labelledby` on every section, and no horizontal overflow at 390, 768 or 1440 (measured).
- The orange-on-dark Services section has real contrast and personality.
- The nav underline draw is the right idea, and v2 generalises it.

---

## Round 1 — DESIGN.md v2 foundations

### Overall verdict
The idea is strong and fits the audience. A name-as-monument first screen answers P3 in two seconds, and the pinned process answers P2's "how do they work". But there are three real problems. Some contrast claims are wrong or fail. The monument as specified breaks on phones. The "thread" rule contradicts itself and has no touch equivalent, and two of three personas are on phones.

### Contrast check (computed, WCAG relative luminance)

| Pair | Ratio | Claim in DESIGN.md | Result |
| --- | --- | --- | --- |
| `--muted` #5b5850 on `--bg` #f6f4ef | **6.46** | "≥ 4.5:1" | Pass |
| `--muted` on `--surface` #ece9e1 | 5.85 | n/a | Pass |
| `--accent-text` #c13a0b on `--bg` | **4.93** | "AA at 16px and up" | Passes at any size. The size caveat is misleading, so drop it. |
| `--accent-text` on `--surface` | **4.46** | not stated | **Fails** AA. It is used on the active row and panels. |
| `--ink` #161614 on `--accent` #ff551f | **5.67** | "6.1:1" | Passes, but the number in the doc is wrong. |
| `--ink` on `--accent-strong` #e8430f | **4.52** | n/a | Barely passes. The hover and press fill has no headroom. |
| `--accent` on `--bg` (thread, non-text) | **2.91** | n/a | **Fails** 3:1 for UI state indicators (WCAG 1.4.11) when the thread is the only cue. |
| `--accent` on `--inverse-bg` | 5.67 | focus on inverse | Pass |
| `--accent-text` on `--inverse-bg` | 3.35 | n/a | Fails for text. Add the rule: on inverse use `--accent`, never `--accent-text`. |
| `--muted` on `--inverse-bg` | 2.55 | n/a | Fails. No `--inverse-muted` token exists. |
| white on `--accent` | 3.20 | "white fails" | Correct |
| `--bg` on `--inverse-bg` | 16.48 | n/a | Pass |

### Blocking

**D1. The monument cannot fit a phone as specified (`DESIGN.md` line 66).**
- Evidence: `--step-mon: clamp(96px, 19vw, 320px)`, 8 capitals ("ARTSWAPY"), -0.06em tracking, "one line, never wraps". At 390px, 19vw is 74px but the floor forces 96px. Space Grotesk bold caps average roughly 0.65-0.7em, so the word is about 8 x 0.67 x 96 = 500px or more against a 358px content width. The "Y" clips or overflows, and "never wraps" removes the fallback. The floor dominates up to roughly 560px. This is an estimate from typical glyph widths, so verify with a real measurement.
- Why: P1 and P3 are on phones and land here first. The direction sheet itself says the name spans 88-100% of the width and never drops below 12vw.
- Recommend: remove the px floor and fit to width, either by measuring text with a ResizeObserver after `document.fonts.ready` or by deriving a vw ratio from the real glyph widths. Add an acceptance test: the whole "Y" is visible at 320, 360, 390 and 768.

**D2. The first-visit loader and hidden hero delay the one thing P3 came for.**
- Evidence: line 75 hides the name behind the loader until `document.fonts.ready`, and line 127 allows 1.6s. A referred P3 visitor is always a first visit, so the `sessionStorage` skip never helps them. The research table asks for a skippable first visit. Fonts load by CSS `@import` from Google (`src/styles.css` line 1), which is render-blocking. On a slow network the hero stays invisible.
- Why: P3 has under a minute and the name must appear at once.
- Recommend: render the name immediately in a metric-matched fallback (size-adjust) and swap with no reflow. Draw the thread over the visible name in about 700ms. Put a hard 1s timeout on `fonts.ready`, and preload the two display weights.

**D3. The thread rule contradicts itself, so builds will diverge.**
- Evidence: lines 18-19 say the thread is "never a divider" and "only shows up as motion". But line 112-113 leaves it statically drawn for `aria-current`. Line 114 makes it follow the cursor. Line 15-16 and the process spec use it to tie stages together, which is a connecting line. The intro uses it through a letter. "One thread per screen at most" cannot hold alongside a drawn nav thread plus a hovered link thread plus a process thread. Line 57 says the accent has "two jobs only", yet the focus ring, active row, thread, primary fill and `--accent-text` all use orange.
- Recommend: write a testable rule. For example: "Orange is (a) the primary action fill and (b) the thread. The thread may be static only as a current-state underline. At most one animating thread is on screen at a time." Drop "only as motion".

### Major

**D4. The thread is the sole cue for current and hover at 2.91:1, and it does not exist on touch.** Nav current, link hover and index-row feedback all rely on a 3px orange line. That fails 1.4.11 against `--bg`, and hover is `pointer: fine` only (line 120). For P1 and P3 on phones the whole interaction system is invisible. Recommend: use `--accent-text` (4.93) for the state stroke, or pair the thread with an ink change. Add a touch column: on tap, the thread draws once as the press response, and the Work row opens its preview inline.

**D5. The phone Work index is unspecified in DESIGN.md.** Line 114 ties the preview to hover. The research table says "fixed preview on hover/tap" but no tap behaviour is written down. The direction sheet's phone layout (image then name, repeated) lives only in the sheet. P1's key task is "find a project like mine". Recommend: write the phone composition into DESIGN.md or the component spec, with one inline image per project and 44px tappable rows.

**D6. The interaction grammar breaks its own rules and has gaps.**
- Line 123 says "animate only transform, opacity, clip-path". But line 114 steps the row `background` to `--surface` and line 116 steps a fill. Either allow `background-color` and `color`, or change those rows.
- Line 87 says `--radius: 0` and "buttons are square, decided once". But line 116 is a circle icon button, and the direction sheet specifies round arrow buttons for contact. Pick one.
- `--accent` #ff551f to `--accent-strong` #e8430f is a minimal change, so the hover wipe is nearly invisible and the arrow pass carries the whole effect. Strengthen the delta.
- Text-link press (thread 3px to 4px) is a 1px change that nobody perceives.
- Missing: disabled, loading, error and empty states (needed for "Set your name"), and no breakpoint tokens at all, only fluid clamps, so "phone composition" has no token.

**D7. "Set your name" is the right instinct but risky as specified.**
- It serves P1 well (my brand in your type) and is memorable. P2 and P3 get nothing from it. It sits beside the primary action at the moment of conversion and adds something to learn.
- Risks: names over about 12 characters need the D1 fit logic. Empty, whitespace and emoji input. Profanity shown at monument size and screenshotted beside the brand. The typed text is discarded, which wastes the best part.
- Recommend: keep it, but feed the typed name into the `mailto:` subject and body ("Brief: Aaranya"). Cap at about 20 characters, fit to width, and show a default ("Your name here") so it is never empty. Keep the CTA visually dominant, and make the CTA work with no input.

**D8. The pinned process story has no length or content limits here.** The spec file is referenced at line 130, and I did not review it. Five stages pinned "under six screens" (direction sheet) is a lot on a phone for P2. Services (4, in `content.js`) and process (5) are two taxonomies. Recommend: pin for about 3 screens on desktop, no pin under 768px (stacked list with the thread drawn per item), and use the same five names in Services.

**D9. Contact is `mailto:` only.** The research says "contact must be effortless", yet there is no fallback for in-app browsers or a missing mail client, and nothing for P3's "save the contact". Recommend: a secondary row with WhatsApp or phone, "Copy email" (already at line 117), and a vCard link.

### Minor
- n1. Imagery order (section 6) puts open-collection photos of "type cases, print blocks, thread and looms" third. For a brand-design practice these read as a print or textile shop, and as stock. The direction sheet's "fog" set is also unrelated. Prefer the portrait and the code-drawn project marks, with at most one atmosphere image.
- n2. At leading 0.82 the monument must be all caps. Mixed case would clip descenders (the "p" and "y" in the current `artswapy` wordmark). State this.
- n3. `--t-thread: 520ms` is slow for something seen on every nav hover, against the doc's own "fast and small for repeated interactions". Use about 260-320ms for hover threads and keep 520ms for load.
- n4. The cursor-following thread (line 114) has no keyboard behaviour. "Same as hover" gives no x position. Define it (full row width on focus).
- n5. Add `--inverse-muted` (about #a8a49a, roughly 7:1 on #161614), and forbid `--accent-text` on `--surface`.
- n6. Reduced motion: state that the static current-state thread stays.
- n7. The doc cites "review finding #3/#4/#5/#7", which are not in this repo's docs, so nobody can verify them.

### What works in v2
- One big idea, committed to, that fits a founder-led practice and matches the personas' "the founder is the product".
- Retiring mono caps, dashed seams, `[01]` numbering and glass is correct and matches the current-site audit.
- Honest-content rules, `(hover: fine)` scoping, "hover never lowers sibling contrast", the single focus ring and the 13px floor are good and testable.
- The interaction grammar as a table is the right shape. It needs the touch and press columns.

---

## Priority list
1. D1 (monument overflows phones) and D2 (hidden hero and loader). Both threaten P1 and P3 in the first two seconds.
2. D3 and D4: settle the thread rule and give it a contrast-safe, touch-safe form.
3. B1 and B2 on the current site: with no real portrait there is no credibility, whatever the system says. This needs content.
4. D6, D7, D9: resolve round versus square, give the live input states and a purpose, add a non-`mailto` route.
5. Correct the numbers in DESIGN.md: ink on accent is 5.67 (not 6.1), accent-text on surface is 4.46 (fails), the thread is 2.91 (fails as a state cue).

---

## Round 2 — Component specs

Scope: all 15 specs in `docs/design/components/` plus both notes files, read against DESIGN.md v2.1 (the law). Line numbers are `file:line`. Measurements: `--name-em` was measured in Playwright (Space Grotesk 700, uppercase, -0.06em tracking, 100px): advance width **4.69em**, so DESIGN.md's "about 4.9" is safe (monument fills about 96% of the content width) and designer A's "about 4.5" is too tight. Phone fold arithmetic below is an estimate from the specs' own numbers.

### Overall
The two specs are good craft and mostly one family (thread, wipe, mask-rise). Designer B's work (work-index, services, process, about, contact, intro) is the more careful on states and fallbacks. But the specs were written against v2.0, and v2.1 landed afterwards, so about half of them now contradict the law. Most contradictions are mechanical (stale tokens, stale sizes), but three are structural: the loader, the contact routes, and header/inverse. The biggest design risk is not decoration. It is that on a phone the referred visitor still has no reliable way to reach Swapnil.

### Blocking

**R2-B1. The loader and hero specs still implement the v2.0 curtain that v2.1 abolished.**
- `loader.md:9` (name rises from behind a thread-line), `:14` (fixed full-screen `--bg` overlay, z-index 100), `:16` and `hero.md:40,43` (name masked until `revealed`), `loader.md:22` and `hero.md:57` (waits on `document.fonts.ready`, up to 900ms), `loader.md:25` (up to 1600ms), `loader.md:31` (repeat visits still play a 500ms masked entrance, v2.1 says skipped).
- Extra harm: the overlay swallows any tap for about 1.2s (`loader.md:30` turns a press into "skip"), so P3 tapping the hero button during load triggers nothing.
- v2.1 §4.1: hero paints at once, one 700ms thread draw over the visible name, 900ms total, no hiding, skipped on repeat and under reduced motion.
- Fix: rewrite loader.md as "Thread draw" with no overlay, no `fonts.ready` gate, no `done()` unmount path; hero.md entrance becomes opacity/translate on sentence and button only. Draw the thread in `--thread`, see B3.

**R2-B2. No spec delivers the third contact route, and "copy email (always)" is false on touch.**
- v2.1 "Contact routes" requires copy, prefilled `mailto:`, and WhatsApp or phone. Grep finds no `whatsapp` or `tel:` in any spec. `contact-rows.md:9-14` lists email, location, availability, greeting only.
- `copy-email.md:38-39`: copying runs only for `(pointer: fine)`; on a phone the tap opens the mail app. A phone visitor with no mail client (Instagram or WhatsApp in-app browser, exactly P3's arrival path) gets a dead tap and no copy.
- Why: P3's job is "save the contact or message right away" on a phone; P1 is mostly on a phone too.
- Fix: contact-rows gets a fifth control, "Message on WhatsApp" (`https://wa.me/…`, placeholder-tagged) or "Call". copy-email gets a touch path: a visible secondary "Copy" control (44px) beside the address on touch, or a long-press-free `Copy` text link. Add a `vCard` or "Save contact" link if Swapnil agrees.

**R2-B3. Stale and undefined tokens throughout; some produce failing contrast.**
- Removed in v2.1 but still referenced: `--accent-strong` (`button.md:14,39,44`, `contact-rows.md:29`), `--accent-text` (`text-link.md:12,30,46`, `thread.md:16,56`, `copy-email.md:33,45,50`), and `--step-row` (never existed in DESIGN.md: `intro.md:10,21`, `work-index.md:19,29`, `contact-rows.md:16,23`). An undefined custom property in `color` or `background` silently inherits or goes transparent, so the build "works" and shows wrong colours.
- Bright `--accent` used as the thread on light grounds, 2.91:1, which v2.1 explicitly forbids: `loader.md:15` (on `--bg`), `thread.md:16,20` (default `--thread-color`), `work-index.md:22`, `services-poster.md:15`. Should be `--thread`.
- Wrong numbers: ink on accent "6.1:1" at `contact-rows.md:45` (it is 5.67), "about 5.6:1" at `button.md:25` is fine.
- Stale literal: `--spring-press` `damping: 32` at `button.md:35` and `work-index.md:46` (v2.1: 45).
- Fix: global replace per the Fix list; add a lint rule or a token-only check (`grep` for any `--accent-text|--accent-strong|--step-row`) to the acceptance criteria.

### Major

**R2-M1. Header: no `data-on-inverse` state, and the phone loses its way to contact.**
- `header.md:11` fixes the bar at flat `--bg` with no inverse variant, though v2.1 §3 requires `data-on-inverse` over the pinned process and the footer. Designer B raised it (`_designer-b-notes.md:16`); header.md ignores it. Over `process-story.md`'s inverse field a paper bar sits on black.
- `header.md:15`: menu collapses under **720px**; v2.1 breakpoints are 600/900/1200.
- `header.md:26`: the bar hides on scroll-down after 160px. On a phone the only persistent route to "Start a project" is therefore Menu, behind a flick up and two taps; `button.md:20` forbids `position: fixed`, and the direction sheet's phone rule (button fixed bottom-right) is dropped. That serves P3 and P1 worst exactly when they are convinced (mid-page, after Work).
- `header.md:18`: "no pair of orange buttons" is enforced only for elements tagged `data-primary-action`. The footer button is tagged (`footer-close.md:14`); the contact greeting button (`contact-rows.md:14,18`) is not, so the header's orange button appears next to the greeting row's.
- Fix: add `data-on-inverse` (observed via the same IntersectionObserver on `#process` and the footer; `--inverse-ink` text, `--accent` thread, `--t-ui`); move the breakpoint to 600 (menu) with the bar action starting at 900; do not hide the bar on phones (or show a compact action beside Menu after the hero button leaves); tag the contact button `data-primary-action`.

**R2-M2. Pinned layouts run at every width; v2.1 says they switch on at 900px.**
- `process-story.md:24-27` specifies a pinned 450svh run at 390 with 44px knot buttons; `about.md:28` pins at 390 (150svh). v2.1 breakpoint row: 900px is where "index and pinned layouts switch on". My round 1 D8 asked for no pin under 768 (stacked list, thread per item). `process-story.md:48` does stack for reduced motion and short viewports but not for narrow ones.
- Why: P2 reads the process mainly on desktop; on a phone a 4.5-screen pin is a scroll tax on P1 and P3 and fights iOS toolbar resize (`svh` jitter).
- Fix: collapse process (and About's pin) to normal flow below 900px, reuse the existing fallback block (`process-story.md:49`), and keep the 3.5-screen pin for desktop only.

**R2-M3. Work rows are dead controls, and there is no bridge from a project to contact.**
- `work-index.md:19,53`: each row is a `<button aria-pressed>` that does nothing on click (no case study exists). They look like links (large type, shift on hover) and take three tab stops that produce no action. `aria-pressed` for a hover-driven preview is also the wrong semantic.
- The research usability task is "Find a project like your business and start a conversation". On the phone stack (`work-index.md:29`) there is image, name and meta, then nothing. No "Start a project like this".
- Fix: until case studies exist, make rows non-interactive for pointer (keep keyboard focus for the preview with `tabindex` and no `aria-pressed`), or make click open the summary (`projects[].summary` already exists) inline. Add one text link under the list, "Start a project like this" carrying the project name into `mailto:` (reuse footer's `{name}` subject mechanism).

**R2-M4. Text-link spec contradicts v2.1 on inline links and on touch cues.**
- `text-link.md:16`: inline links rest with the thread already drawn. v2.1 §3: a 0.07em `--muted` underline at rest, thread replaces it on hover. (The 3px solid orange inline would also be the loudest thing in a paragraph.)
- `text-link.md:29`: press = thread thickens 3→4px (a 1px change nobody perceives, my round 1 D6). v2.1: the thread **draws on `:active`**, which is the touch cue.
- `text-link.md:47`: "On touch the only persistent thread is current." v2.1 gives touch its own cues.
- `text-link.md:35`: 520ms draw plus 364ms undraw is slow for a hover that happens constantly (the spec itself admits it). Keep `--t-thread` for load and spine; add `--t-thread-hover` of about 300ms.
- Fix: rewrite those four lines to v2.1.

**R2-M5. Thread primitive: two implementations, and the arbitration is heavier than the rule.**
- `thread.md:9-10` chooses `clip-path` because `scaleX` with an origin flip jumps on interruption. But `services-poster.md:39` and `work-index.md:46` use `scaleX` with `transform-origin` flipping (the exact bug), and DESIGN.md §3 still says `scaleX`. One primitive, two behaviours.
- `thread.md:39-42` defines "event" and "state" tiers and a `useThreadSlot` context that grants one slot by section nearest the viewport centre. v2.1 states the simple rule: at most one *moving* thread, static state may coexist. In practice the moving ones (loader, spine, cursor, name stitch) live in different sections and cannot overlap, so the context is machinery for a case that doesn't occur. The footer "name stitch" (`footer-close.md:29`, `thread.md:36`) is a fifth role that v2.1's list of four does not name.
- Fix: move Services and Work onto `<Thread>`; amend DESIGN.md §3 to say clip-path (and add "stitch" as a role or fold it into Live thing); delete `useThreadSlot` unless a real overlap is found.

**R2-M6. Footer close drifts from v2.1 on the live thing and on scale.**
- `footer-close.md:26,28`: `maxlength="28"` and "Max 28 characters". v2.1: 24.
- `footer-close.md:30`: subject "Project enquiry: {name}"; v2.1: "Project enquiry — {name}" (em dash).
- `footer-close.md:28`: preview cap "`--step-poster`, 148px"; v2.1 Poster maxes at 92px. `:12,:23`: invitation "56px at 390"; v2.1 Poster is 36px there.
- `footer-close.md:18`: wordmark `--step-mon * 1.15` "about 98% of width". With the measured 4.69em and fit-to-width monument, it is about 110% of the content width, so roughly two-thirds of the "Y" is cut off by the right edge before the bottom crop. The brand reads "ARTSWAP". Direction sheet only asks that it be recognisable from the upper two-thirds. Use 1.05 to 1.08 so the Y is clipped at most 30%.
- Fix: apply the numbers; change `--step-mon-crop` multiplier in DESIGN.md (and verify visually).

**R2-M7. Contact rows and footer close are two conversion blocks back to back.**
- Contact rows end with a "Hello" row carrying an orange arrow button (a primary action, `contact-rows.md:14`). Straight after it, the footer close repeats an invitation, an input and another orange "Start a project" (`footer-close.md:12-14`). The same address then appears three times (contact row 1, footer links `footer-close.md:16`, menu sheet `header.md:41`).
- Why: two near-identical asks in about two screens dilutes the one primary action, which button.md itself argues against (`button.md:6`).
- Fix: keep the rows for the information (email, location, availability, new WhatsApp row) and drop the greeting-button row, so the footer owns the single primary action. Or merge contact into the footer (the direction sheet lists them as separate sections, but the persona research supports one ask).

**R2-M8. Hero on a phone and the portrait-letter trick.**
- First-screen fold at 390x844 (estimate from `hero.md:27-30`): header 64, name block to about 148, portrait top about 118, 358 wide at 2:3 = 537 tall, ending near 655; the sentence (about 100px) and the 56px button follow in flow. The CTA lands at the fold at 844 and well below it on a 667-740px phone. The spec's own purpose (`hero.md:6`) says P3 "must see the name, the face and one way to write".
- Fix: portrait at 4:5 (or `max-height: 52svh`) below 600px so sentence and button end above the fold; the name still spans the width.
- `hero.md:16-18,53`: letters that flip ink to paper over the portrait rely on a second aligned copy of the name and a portrait with a dark top 25% (mean luminance under 0.27). The portrait file does not exist, so the whole treatment is conditional on an asset nobody has. The fit-to-width monument makes the alignment calc (`--stage-w`, `--frame-left`) a second thing to keep in sync on every resize and font swap.
- Fix: ship the simple version first (name above the portrait, no overlap, no second copy), and make the overlap an enhancement that turns on only when the portrait passes a luminance check at design time.
- `hero.md:44` drift is +6% with `scale 1.04 to 1` on a 112% image at `top: -6%`; v2.1 §4.4 says 112% and 0 to -8%, no scale. Both avoid empty edges, but they are different numbers. Pick v2.1.

**R2-M9. Entrance system: the shared rule is broken by the specs that use it.**
- `section-entrance.md:42`: "Do not give two adjacent sections the same manner." Work uses `rows` plus `shutter` (`work-index.md:47`); Services directly after it uses `rows` again (`services-poster.md:42`). Intro uses `shutter` and Work ends in one.
- Shutter timing is defined four ways: `section-entrance.md:40` 1100ms ease-in-out, `hero.md:43` 900ms `--ease-soft`, `intro.md:38` 1100ms with a 280ms delay (the shared table says 0), `about.md:35` 1100ms.
- `contact-rows.md:39` introduces a band-wipe manner (and a `scale 0.6 to 1` on the button) that the "shared system" does not define; `contact-rows.md:39` also quotes total about 1.2s while the shared budget is under 1.4s, tight.
- `about.md:35` adds a second moving picture (scale on the inner image), against v2.1 §4.4 "one moving picture" and `intro.md:39`, which explicitly forbids it.
- Fix: give Services a different manner (lines or a mask swap), drop the extra About drift, add `band` to section-entrance.md, and set one shutter timing.

**R2-M10. The five-step scale: stale sizes, and a sixth step by stealth.**
- Literal sizes from the old Poster are everywhere: `services-poster.md:23-25` (130/69/56px), `process-story.md:15,25-27` (56, 69), `about.md:26` (130px), `footer-close.md:12,23,28`, `header.md:40` (56px menu links). v2.1 Poster is `clamp(36px, 6.4vw, 92px)`: 92 at 1440, 49 at 768, 36 at 390.
- `min(var(--step-poster), 11.5vw)` (`process-story.md:15`, `about.md:28`, DESIGN.md §2) is now a no-op above 313px (11.5vw of 390 is 45px, poster is already 36px). "Communications" at 36px is about 280px wide, which fits.
- Rows keep per-spec leading and tracking that differ from Poster (`work-index.md:19`: 1.0 and -0.03em; `contact-rows.md:16`: weight 600, 1.0, -0.02em; `intro.md:10`: 0.95; Poster is 0.94 and -0.04em). That is the `--step-row` token B proposed, without the name. Pick Poster's values.
- Design consequence for the lead: with Poster capped at 92px, Services, Work names, Contact rows, Intro heading and process stages all share one size under a 281px monument. The direction sheet wanted Services to read as a poster. Differentiate those sections by ground (inverse), weight of layout, and motion, not by size, or accept five sections of identical scale.

### Minor
- **m1.** Button extras beyond the grammar: magnetic pull plus label counter-parallax (`button.md:35`) on top of ink wipe, arrow pass and press scale is four layers on the one control that most needs to be unmistakable. Keep the magnet on the hero and footer button only, drop the label parallax. The arrow-pass "4px" in DESIGN.md §3 cannot show a second arrow in a clipped slot; the spec's full-slot pass (`button.md:34`) is right, so amend DESIGN.md.
- **m2.** IconButton: `button.md:55` rotates close 45° and fills `--accent`; v2.1 §3: 90° and an `--ink` wipe with `--inverse-ink` glyph.
- **m3.** Copy-email: live region clears after 1.8s, visual holds 1.6s (`copy-email.md:21,33`); done-swap 240ms (`copy-email.md:33`) vs 400ms in `contact-rows.md:37` for the same swap.
- **m4.** Off-token durations: 126, 360, 364, 400, 450, 500, 520 (sheet), 600, 640, 700, 900, 1100, 1500 ms appear across specs while the token table has six. Either add `--t-mask: 400ms`, `--t-travel: 600ms` and `--t-shutter: 1100ms`, or snap to existing tokens. Derived "70% leave" values are fine if stated once.
- **m5.** Taxonomy still diverges: Services are Strategy, Identity, Packaging, Experiences (`services-poster.md:17`); the process is Strategy, Identity, Packaging, Communications, Applications (`process-story.md:60-65`). P2 reads both on one page.
- **m6.** Intro panorama and DESIGN §6.3 still lead with "type case, thread, loom" (`intro.md:57`); for a brand-design practice that reads as a print shop. A code-drawn mark or the portrait crop is more honest.
- **m7.** `process-story.md:44` claims the thread makes "the five names read as one continuous line"; names are stacked in one cell and only one is visible at a time, so it reads as a progress bar with knots. Fine as a progress device; drop the claim.
- **m8.** `thread.md:29` plus `text-link.md:36` "current handoff" (old thread undraws, new draws 120ms later) is a lovely detail but is a second moving thread on screen during handoff, which the one-moving-thread rule disallows by the letter. Allow it explicitly or drop it.
- **m9.** `hero.md:32` and `_designer-a-notes.md:5` still refer to a 64px floor and the 19vw clamp. Strike them.
- **m10.** DESIGN.md §4 lists item 6 before item 5; `--name-em` text says estimate 4.9 (measured 4.69, keep 4.9 with 4% slack or hard-code 4.75).

### Are the micro-interactions rich, crafted, and still one grammar?
Mostly yes. The vocabulary is small and shared: a left-to-right **wipe** (button fill, index band, contact bands, thread), a **mask rise** (headlines, copy label, stage names, menu links), **press scale**. Every control has rest, hover, focus, press and a stated touch fallback, which is a big step from v1. That is crafted, not over-designed, with three exceptions that should be trimmed:
1. **Button stack** (m1): wipe, arrow pass, magnet, label parallax, press. Drop the parallax.
2. **Work row**: band wipe, 12px shift, crossfade, image settle scale, spring-following thread, press scale, six things at once. The cursor thread is the most expendable and the one Services already omits (`_designer-b-notes.md:15`), so "index row" is two controls in practice. Keep it for Work only, state that in DESIGN.md.
3. **Header**: scroll-hide, action fade, circle-reveal sheet at 520ms, staggered links with an extra 180ms delay, nav-current handoff. Hide-on-scroll is the one that costs users (M1).
Entrances are choreographed per section, which is right, but shutter is the default for pictures in four places, so it will start to read as the template's tic.

### Do the two specs fit together?
- **Header vs process (inverse):** no. Header has no inverse state (R2-M1). Also the header hides on scroll-down, so during the pin it is gone until the first flick up, which then lands light-on-dark.
- **Hero vs loader:** no. Both still describe the curtain (R2-B1). If the loader is rewritten as a draw-over, hero's name must be visible from first paint and its entrance reduced to the sentence and button.
- **Footer-close vs header action hiding:** mechanics fit (footer button is tagged `data-primary-action`), but the contact greeting button is not tagged (R2-M1), and the footer is inverse, so the header must be in `data-on-inverse` while its action is hidden. When the action is hidden its reserved space (`header.md:18`) leaves an empty right end of the bar over the hero and footer, which is fine but should be checked at 768.
- **Contact rows vs footer:** two asks in a row (R2-M7).
- **Thread users:** Services and Work implement the thread differently from `thread.md` (R2-M5).

### Does each persona's top job work on a phone?
| Persona | Top job | Verdict on a phone |
| --- | --- | --- |
| P1 founder | See work like mine, then start a conversation | Partly. Stacked image-then-name list is right and scannable. But no project-to-contact bridge (R2-M3), no persistent action (R2-M1), and the hero CTA sits at or below the fold (R2-M8). |
| P2 marketing lead | Understand the process, send a brief | Desktop is strong: pinned process, prefilled brief. On a phone the pin is a scroll tax (R2-M2). No credentials content exists to ask for. |
| P3 referred visitor | Confirm who Swapnil is, then message or save contact, in under a minute | Weakest. Name, portrait and CTA should be on one screen and are not (R2-M8). The loader overlay still eats taps (R2-B1). Copy never works on touch and there is no WhatsApp or phone route (R2-B2). |

### Fix list
| File | Change |
| --- | --- |
| `loader.md` | Rewrite to v2.1: no overlay, no `fonts.ready` gate, 700ms thread draw over a visible name, 900ms max, skipped on repeat and reduced motion; thread in `--thread` (`:9,14,16,22,25,30,31`). |
| `hero.md` | Name visible at first paint (`:40,43,57`); entrance only for sentence and button; drop the 64px-floor text (`:32`); drift = 112% image, 0 to -8%, no scale (`:44`); phone portrait 4:5 or max 52svh so the CTA clears the fold (`:27-30`); make the paper-copy overlap optional (`:16-18,53`). |
| `button.md` | `--accent-strong` becomes an `--ink` wipe with `--inverse-ink` label (`:14,39,44`); damping 45 (`:35`); IconButton: ink wipe, 90° close (`:55`); drop label parallax (`:35`); remove stale contrast note. |
| `text-link.md` | `--accent-text` becomes `--thread` (`:12,30,46`); inline link = 0.07em muted underline at rest (`:16`); press = thread draws on `:active` (`:29`); fix touch note (`:47`); add `--t-thread-hover` about 300ms (`:35`). |
| `thread.md` | Default `--thread-color` = `--thread` on light, `--accent` on inverse (`:16,20,56`); delete `useThreadSlot`, restate the v2.1 rule (`:39-42`); name the stitch role (`:36`). |
| `copy-email.md` | `--accent-text` becomes `--thread` (`:33,45,50`); touch path for copy (visible Copy control) (`:38-39`); align timings, 1.6s and 240ms (`:21`). |
| `header.md` | Add `data-on-inverse` (`:11`); breakpoint 720 becomes 600 (`:15`); do not hide the bar on phones or add a compact action (`:26`); tag all primary actions (`:18`); menu links use Poster (`:40`). |
| `footer-close.md` | `maxlength` 24 (`:26,28`); subject with em dash (`:30`); preview cap 92px, invitation 36px at 390 (`:12,23,28`); wordmark crop 1.05 to 1.08 (`:18`). |
| `contact-rows.md` | Remove round button, use Button/IconButton square (`:14,18,55`); `--accent-strong` gone (`:29`); `--step-row` becomes Poster (`:16,23`); add WhatsApp or phone row; drop the greeting-button row or merge with footer; contrast 5.67 (`:45`). |
| `work-index.md` | `--step-row` becomes Poster (`:19,29`); thread colour `--thread` (`:22`); damping 45 (`:46`); rows not `aria-pressed` buttons, add project-to-mailto link (`:19,53`); use `<Thread>` not scaleX (`:46`). |
| `services-poster.md` | `--thread` (`:15`); `<Thread>` clip-path (`:39`); drop stale 130/69/56px (`:23-25`); different entrance manner from Work (`:42`). |
| `process-story.md` | Collapse to flow below 900px (`:24-27,48`); drop 56/69px and the 11.5vw rule (`:15,25-27`); align Services names with the five stages (`:60-65`). |
| `about.md` | Pin only at 900px and up (`:28`); remove extra scale drift (`:35`); stale 130px (`:26`). |
| `intro.md` | `--step-row` becomes Poster (`:10,21`); shutter delay 0 or add to shared table (`:38`); prefer a drawn or portrait image (`:57`). |
| `section-entrance.md` | Add `band` manner; one shutter timing; resolve adjacent-manner rule with Work and Services (`:40,42`). |
| DESIGN.md | State clip-path thread, name the stitch role, say the cursor thread is Work only; add `--t-thread-hover`, `--t-mask`/`--t-shutter` or snap values; correct the arrow-pass wording; `--step-mon-crop` multiplier; `--name-em` 4.75 to 4.9; fix §4 numbering. |
