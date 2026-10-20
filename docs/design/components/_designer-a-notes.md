# Designer A: issues with DESIGN.md

Found while writing button, text-link, thread, copy-email, loader, header, hero and footer-close specs. Each lists what is wrong and what the specs assume.

1. **`--step-mon` floor of 96px overflows at 390px.** ARTSWAPY on one line is about 4.5em wide (8 caps, -0.06em tracking, to be verified with the real face), so 96px gives about 430px against 358px of room. `19vw` alone (74px at 390) fits at about 85% of the width. Specs assume the floor is lowered to 64px: `clamp(64px, 19vw, 320px)`. The "never wraps" promise depends on it.
2. **Footer wordmark is larger than the Monument token.** The direction sheet wants the footer name at 26-30vw; the token tops out at 19vw. Specs use `calc(var(--step-mon) * 1.15)` (about 22vw, a multiplier, not a sixth step). 26-30vw would crop the right letters off, which breaks "recognisable".
3. **Drift as written exposes empty edges.** "translateY 0 to 6% with scale 1.04 to 1" gives a 2% overhang but moves 6%. Specs make the image 112% tall inside the frame and define 6% against the frame height.
4. **Round icon button contradicts "buttons are square-cornered, decided once".** Specs make `IconButton` square (the grammar row says circle). Edit the §3 row to match, or change the radius decision.
5. **Thread contrast.** `--accent` on `--bg` is about 2.9:1 (under 3:1 for non-text), so a thread alone cannot carry state. Specs use `--accent-text` (4.9:1) for the nav-current thread on light grounds, and always pair state with `aria-current`/focus ring. Hover thread stays `--accent`.
6. **Ink on `--accent-strong` is about 4.49:1**, a hair under AA for 16px medium text (and ink on `--accent` is about 5.6:1, not 6.1:1 as written). Suggest `--accent-strong: #ec470f` (about 4.7:1).
7. **"One thread per screen" conflicts with the persistent nav-current thread and hover underlines.** Specs define two tiers in thread.md: event threads (max one) and state threads (under a word, exempt).
8. **Thread draw via scaleX has an interruption jump** (origin flips between left and right). Specs animate `clip-path: inset()` instead, which is on the whitelist and continuous. Also: "thickens 3 to 4px" is a height change; specs use `scaleY(1.333)`.
9. **Primary button arrow "slides 4px"** cannot show the second arrow inside a clipped slot. Specs pass arrows through the full slot width.
10. **`--spring-press` `{ stiffness: 500, damping: 32 }` is slightly underdamped** (critical damping is about 45), so it overshoots about 4% against "no bounce". With the max 8px magnet offset the overshoot is under 0.4px, but use damping 45 for a strict no-bounce rule.
11. **No-JS fallback is not buildable for a client-rendered Vite SPA.** Nothing renders without JS. Needs a `<noscript>` block in `index.html` (name, sentence, `mailto:` link) or prerendering. Specs assume the `<noscript>` route.
12. **Text links with "no underline at rest" fail WCAG 1.4.1 inside prose** (ink on ink). Specs give the inline variant a permanently drawn thread.
13. **"Pinned title over portraits" needs 5-8 portraits.** Specs drop the pin and swap, keep the layout, and move the signature to the process story (see hero.md).
14. **Loader contradictions.** "Thread reaches the right edge, then the name rises" leaves a full-width line on the page unless it exits; specs undraw it to the right as the name rises. The "hero name hidden until `fonts.ready`" needs a timeout (900ms) so a failed font never blocks the page; budget stays 1.6s.
15. **Copy-email "label swaps to Copied" inside an `aria-live` span would rename the link.** Specs keep the address as the link's name and put the one polite live region in a separate hidden sibling.
16. **Content gaps** (not DESIGN.md errors): `hero.supporting` is two sentences (blueprint allows 26ch); no socials in `content.js`; email and city are still placeholders; the portrait file is not supplied (hero treatment depends on its backdrop tone).

## v2.2 objections
Items 1, 3 (thread contrast via `--thread`), 5, 6, 8 above are resolved by v2.2 (fit-to-width monument, `--thread`, damping 45). Remaining:
1. **`--step-mon-crop` is still 1.15 in DESIGN.md.** With the fitted monument that crops about two-thirds of the Y. footer-close.md uses 1.08; please change the token.
2. **Text-link "exits to the right" needs JS.** A pure-CSS clip-path transition can only reverse along its path, so link threads retreat left on leave. The JS threads (load, stitch) do exit right. Accept, or allow a keyframe pair.
3. **DESIGN.md §3 CopyEmail row calls for `aria-live` on one span.** Sonner already provides the polite region; adding a span would double announce. copy-email.md uses Sonner as the sole announcer.
4. **Set your name at `--step-poster` cap (36px on phones)** makes the preview no larger than a heading while DESIGN.md says "fitted to the width". Follows the critique's cap; consider capping at `--step-mon` instead if the extra height is acceptable.
5. **"Persistent" header action on phones** appears only after the hero button leaves view, to avoid two orange buttons on the first screen.
6. **Magnet** is kept to hero and footer buttons per the critique; the motion-system table lists it on "Primary button" generally.
