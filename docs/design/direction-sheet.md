# DIRECTION SHEET — The name as a monument
seed 1346330973 · drawn 2026-10-20 · sector agency
Brief: Independent brand design & consulting practice led by founder Swapnil Gathibandhe; strategy, identity, packaging

| | |
| --- | --- |
| Direction | The name as a monument |
| Hero | Pinned title over portraits |
| Type | kept from the brand |
| Colour | kept from the brand |
| Sections | intro (Heading captions a panorama) → work (Big names, fixed preview) → list (One item per poster line) → about (Pinned title, portraits pass) → contact (Address in display rows) → footer (Invitation over a cropped name) |
| Motion | Pinned story |
| Photographs | the "Fog and quiet" set, as atmosphere |

This is the direction for this build. Adopt it. Do not blend it with the layout you would have made anyway,
and do not redraw because it is unfamiliar: unfamiliar is the point. Redraw a slot only when it conflicts
with a stated brand constraint or needs an asset that does not exist, and say why in your report.

The parts of this sheet were written separately and will disagree in small ways. Settle every disagreement in this order:
**house rules** (including type no smaller than 13px and body text of 16px or more) → **the direction** (the idea, the composition habits, where the
one accent goes) → **the type system and the palette** (which face does which job, the five size steps, which colour is the ground and where the
accent goes) → **the hero blueprint** → **the section blueprints**. Under each blueprint below, "Adjusted for this page" lists where it disagrees.
In practice: take geometry from blueprints (columns, proportions, what sits where) and take everything else from above them. Map every size a
blueprint names onto one of your five type steps instead of adding a sixth. Use one button shape, one corner radius and one pair of page margins on
the whole page, whatever individual blueprints say. If a blueprint names a kind of typeface (a light serif, a heavy grotesk), use the dealt face.

## 1. The idea
The name is the headline. Set it so large that it becomes architecture: as wide as the viewport, cropped by an edge, or stacked to fill the screen. Nothing else on the first screen competes; the description of what this is drops to a single small sentence. The idea comes from treating the name's letters as material. Ask what the subject can do to its own name: a photograph of the work sits inside a counter or replaces a letter, the name repeats down the page like a reel, the letters are split to opposite corners and the page happens between them. In the study this was the single most common device among sites scoring 7.5 or more.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
First screen: the wordmark spans 88–100% of the viewport width (font-size 16–24vw, set with a clamp so it never wraps), anchored either to the bottom edge with its descenders nearly touching it, or dead centre with everything else pushed to the corners. One line of supporting text at 16–20px sits in a corner on a shared margin; navigation is three or four words in the opposite corner. After the hero the page is deliberately small and calm: a narrow text column or a simple two-column grid, so the contrast with the monument holds. The name returns once more at full width as the footer, in the inverse colours. Margins are tight (20–32px) so the type reaches the edges. Two type sizes do nearly all the work: the monument and a small text size, with one mid size for section headings.

## 3. Type
Kept from the brand. One family. The display cut must survive enormous sizes: tight tracking (-0.04 to -0.07em), leading 0.8–0.9, optical kerning on. Section headings are modest (28–40px) on purpose.

## 4. Colour
Kept from the brand. Two values carry the page (ground and ink). The accent, if used at all, appears on one thing only: the single action or the inset image frame. The footer inverts ground and ink.

## 5. Imagery
**The project has no photographs of its own yet.** First choice: **real pictures of the subject's world from the open collections**: its city and street in old postcards and photographs, an old map of the neighbourhood, its materials up close, its trade in engravings, museum objects of its kind (references/imagery.md §3). Start with `node /home/meshwa/.agents/skills/design-taste-frontend/scripts/assets.mjs "practice led"`, then queries from your inventory (its street, its materials, its trade's tools and history). Download what you use into the project with `--get` and credit every one on the page (`--credits` prints the footer line). They show the world around the client, never the client's own room, dish, product, person or team. Second, for what no honest picture exists of: draw the subject's own things in code, large, in one flat graphic language and the palette's real colours (its tiles, its windows, its objects; references/imagery.md §8). Third: the dealt photographs, only where an honestly generic picture fits (the sea, the weather, a material), never one a visitor could take for the thing itself and never an unrelated scene. One treatment for all of them. If this direction is built on photographs, plan the set before building (four to six pictures of one family) and reuse them at different crops and scales instead of finding or drawing a new picture for every slot; keep drawings as `<symbol>` + `<use>` or generate them with a small script so the page stays light. List every found picture (with its source and licence), every dealt photograph and every drawing that stands in for photography in your report.

Few images, used as inserts in the typography rather than as illustrations beside it: one photograph inside or behind the name (a 4:5 or 1:1 frame replacing a letter, or tucked between two words), then a short run of large full-width or half-width photographs further down. Square corners. No collage of small thumbnails.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "Fog and quiet" set (misty, muted, minimal landscapes and empty horizons; calm areas for text)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
- `https://picsum.photos/id/634/1600/1000` — Pine forest dissolving into fog beneath a pale pink sky · mid tone · dark green, pale pink, white · calm area: top · native landscape · photo: Jay Mantri
- `https://picsum.photos/id/941/1600/1000` — Small island on a pale, glassy sea beneath soft clouds · light tone · pale blue, soft white, grey · calm area: bottom · native landscape · photo: Ivan Slade
- `https://picsum.photos/id/994/1600/1000` — Silky long-exposure sea beneath a blue and orange sunset sky · mid tone · soft blue, peach, grey · calm area: all · native landscape · photo: Jonathan Bean
- `https://picsum.photos/id/266/1600/1000` — Three ships on a distant horizon across a calm blue sea · mid tone · pale blue, deep blue · calm area: all · native landscape · photo: John Maravelakis
- `https://picsum.photos/id/552/1600/1000` — Tiny sailboat on a calm sea with distant hills, black and white · mid tone · grey, white, black · black-and-white · calm area: all · native landscape · photo: Hugo Kerr
- `https://picsum.photos/id/510/1600/1000` — Small red-roofed church below a mountain under a blank white sky · light tone · white, olive brown, grey · calm area: top · native landscape · photo: Jeff Sheldon
- `https://picsum.photos/id/926/1600/1000` — Lone figure standing on a hilltop in thick beige fog · light tone · warm beige, olive grey · calm area: top · native landscape · photo: Harman Abiwardani
- `https://picsum.photos/id/70/1600/1000` — Road lined with tall trees fading into thick fog · mid tone · grey, dark green · calm area: centre · native landscape · photo: Dorothy Lin
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: architecture, city-day, hands-and-making, people — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Pinned title over portraits
A pale flat ground. The title runs on one line of extra-bold uppercase at clamp(90px, 10vw, 160px), centred, spanning about 82% of the width, its cap line 120px from the top. It lives in a sticky layer (`position: sticky; top: 0; height: 100svh`) stacked above the images and set in one saturated ink that reads on both ground and photograph. Beneath it a single portrait photograph, 2:3, sits centred on columns 5–8 (about 37% of the width) and runs from 90px below the top edge down to the bottom edge, so the title crosses its upper quarter and the middle letters sit on the image. The wordmark sits top-left at 24px in 15px bold; one 'Menu' word sits top-right. Bottom-left on columns 1–3: the supporting sentence as a narrow column at 16px bold, max 26ch, its last line 32px above the bottom edge. Bottom-right: the single action as a solid rectangular button. As the page scrolls, further portraits of identical ratio and position replace the first, five to eight in all, each bringing its own flat ground colour sampled from the photograph, before the layer releases.

On a phone: The title stays pinned at the top at 17vw on one line, or two lines at 15vw if longer than ten characters. Each portrait becomes full width minus 16px margins at 2:3 and starts behind the lower half of the title. The supporting sentence follows the first portrait at 16px. The action button is fixed to the bottom-right corner, 16px in. The wordmark shrinks to a monogram top-left.
Headline: The title of the series, or the name: one uppercase line of up to about 14 characters at 10vw, two short lines on a phone.

Adjusted for this page:
- It names a kind of typeface: use the brand faces.

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. intro — Heading captions a panorama (full-bleed)
The section is exactly 100svh. Its top third holds a two-line heading of three to six words at clamp(48px, 6.5vw, 96px) with leading 0.95, either centred or flush left on the page margin. 28px beneath the heading sit two small captions side by side, each two lines at 13px and 150px wide with a 48px gap, aligned to the heading (centred as a pair, or both starting at its left edge). 40px below them a full-bleed photograph begins and runs off the bottom of the viewport: it is 100vw wide at 21:9 or wider, and only its top 55–60svh is visible before the fold, the rest arriving with scroll. The heading therefore reads as a large caption to the picture. On an object-led page the image is the object on a flat dark panel inset by the page margin instead of bleeding to the edges.
On a phone: Heading at 12vw on two lines, left-aligned, taking the top 30% of the screen. The two captions merge into one four-line block at 14px. The photograph begins at 45% of the screen height in a 4:5 crop, full-bleed, and runs off the bottom.

### 2. work — Big names, fixed preview (index)
Project names are the index. In columns 1–8, five to nine names stack one per line at clamp(44px, 5.4vw, 80px), leading 1.0, each row a link with 10px of vertical padding. All names rest in the ink at 35% opacity except the active one, which is full ink; the first is active by default, and hover or keyboard focus moves the state. To the right of each name, on its baseline at 14px: the discipline and the year. In columns 9–12 a `position: sticky; top: 15vh` frame, 4:5 and 26vw wide with square corners, shows the active project's photograph; all images are stacked in the frame and swapped by opacity over 200ms. A two-word heading at 28px sits top-left, 48px above the first name. Nothing is drawn between rows: the size of the type and the dimming do the separating.
On a phone: Names at 9.5vw, all in full ink, one per line; discipline and year sit beneath each name at 13px. There is no sticky frame: each name is preceded by its own photograph at 16:10, full width, so the list becomes image then name, repeated, with 40px between projects.

Adjusted for this page:
- It fades text: anything a visitor reads, inactive items of a list included, is `--ink` or `--muted` at full strength (contrast 4.5:1 or more). The active item is told apart by `--ink` against `--muted`, weight or the accent, not by fading the rest.

### 3. list — One item per poster line (statement)
A short list set as a poster. Four to seven items (services, headline acts, courses, opening days) stack one per line at clamp(64px, 10vw, 150px) in the display weight, all capitals or all lowercase, leading 0.92, flush left at a 20px margin on a flat field. Its one detail (a price, a date, a time range) sits at the right margin on the same baseline at 18–20px with tabular figures, so the page has two alignments only: giant words left, small facts right. Items too long for one line at this size are shortened, not shrunk. Between items there is only the tight leading. Hovering an item swaps its ink for the accent. There is no heading: the first item starts 80px below the section top and the last ends 80px above the bottom. The list reuses the hero title's exact type size, so it reads as another poster.
On a phone: Items at 15vw, one per line, flush left with 16px margins. Each detail moves beneath its item at 15px, left-aligned, with 6px above and 22px below. If any single word is wider than the screen at 15vw, drop the whole list to 12vw rather than breaking a word.

Adjusted for this page:
- It names a kind of typeface: use the brand faces.

### 4. about — Pinned title, portraits pass (pinned)
A wrapper tall enough for its portraits: about 90svh per person, up to six people. A `position: sticky; top: 0` layer of 100svh holds the heading, two words at clamp(88px, 12vw, 180px), leading 0.85, centred at mid-height, in white with `mix-blend-mode: difference` so it reads over ground and photographs alike. Beneath it in the stacking order, portraits scroll past in normal flow: each a 4:5 photograph 26–30vw wide, alternately starting at column 2 and ending at column 11, 60svh apart, so each one passes behind a different half of the heading. Under each portrait's left corner: the name at 18px, the role at 14px in the soft ink, and one sentence of up to 30 words in a 280px measure. The last portrait is followed by 40svh of empty ground before the heading releases. Square corners. Nothing else is on screen.
On a phone: The heading shrinks to 17vw and pins 16px from the top instead of at mid-height. Portraits become 72% wide, alternating between the left and right margins, 48px apart, each with name, role and sentence beneath at the portrait's width.

Adjusted for this page:
- It names colours (white): map them onto this palette's roles (ground `--bg`, panels `--surface` and the fields, text `--ink`/`--muted`, the accent `--accent` on the primary action only).
- It blends text with `difference`: over anything but black, white or grey that gives random hues. Use a solid ink chosen for each ground instead.

### 5. contact — Address in display rows (list)
The contact block is a stack of five full-width rows, every one set at the same size, clamp(44px, 6vw, 88px), regular weight, left-aligned with a 20px inset and leading 1.0: the building or venue name, the street, the city with postcode, the opening hours as one compact line, the phone number. Each row is about 150px tall with the text sitting in its lower third; rows are told apart by alternating two flat tones of the section colour as full-width bands, or by 28px of space alone. A sixth row holds a one-word greeting at the same size followed, 24px to its right and centred on the x-height, by a solid round button 0.9em across with an arrow, which opens the email or booking link. Street and phone rows are links (map, call). No heading and no form. Optionally, one small round photograph sits at the right end of the first row.
On a phone: Rows at 9.6vw with 16px insets, about 84px tall; the hours break onto two rows (days, then times). The greeting row becomes a full-width band in the accent colour with the round arrow button at its right end, 56px across.

### 6. footer — Invitation over a cropped name (statement)
Close and footer in one full-viewport field of the inverse colour. Upper third, columns 1–7: a two-line invitation at about 5vw, three to five words, with one filled rectangular button beneath it. At columns 10–12, top-aligned with the invitation, three or four social or contact links stacked at 16px. The wordmark fills the bottom of the screen at 26–30vw on one line, `white-space: nowrap`, heavier and larger than the viewport can hold: it is pushed down with `transform: translateY(30%)` so the bottom edge cuts through the letters, and a long name also runs off the right edge. `overflow: hidden` on the footer does the cropping. One row of credits and legal links at 13px sits directly above the wordmark's cap line, spread left and right. The cropped name must be recognisable from its upper two-thirds alone; test that it is.
On a phone: Invitation at 11vw on two lines at the top with a full-width button. Links follow as one row of words at 15px. The wordmark sits at 34vw at the bottom, cropped by both the bottom and the right edge, with the legal row above it at 12px.

Adjusted for this page:
- It sets text at 12px: use your small step (13px or more) instead.

## 8. Motion — Pinned story
One element holds its place with `position: sticky` (a title, a frame, a product fragment) while the items that belong to it scroll past or swap inside it. The page's ordinary scrolling does the work; nothing is hijacked. Keep the pinned run under six screens. Recipe: 'Pinned story' in references/motion.md.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 9. Where the richness comes from
Scale. The size of the name against the smallness of everything else is the entire visual event, so protect both ends: do not shrink the name to make room, and do not let body text creep above 20px.

## 10. How this direction goes wrong
A long name set small is just a logo. If the name has more than about 12 characters, stack it on two lines or crop it with the viewport edge; never drop below 12vw. Do not add a second big headline under the name. Do not decorate the letters.

## 11. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **Produx Design** (Awwwards Site of the Day, studied score 7.4) `aww-produx-design`
  Idea: The wordmark is the hero, and the showreel image assembles itself from scattered square fragments as you scroll.
  Hero: Near-black field with 80px side margins. The wordmark, in a wide, light-weight uppercase sans with a slashed O, runs margin to margin (about 89% of the width) with a cap height near 20% of the viewport, starting 9% from the top. A large empty gap follows. In the lower half a two-line statement at 5.1vw sits flush left; opposite it, bottom-aligned to the statement and flush to the right margin, is a three-line paragraph in small monospace about a quarter of the width. No nav bar, button or image in the first viewport; the bottom quarter is empty.
  Worth taking: Run the wordmark margin to margin in a light weight rather than a heavy one; thin strokes at huge size read as assured instead of loud.
- **Paul Kalkbrenner** (Awwwards Site of the Day, studied score 8.1) `aww-paul-kalkbrenner`
  Idea: Swiss poster typography for a techno artist: the name as one black line with a photo set inside it like a glyph, then every chapter gets its own flat colour and visible grid.
  Hero: Pure white viewport. The artist's name sits on one line at exact vertical centre in bold black neo-grotesk, about 10.4vw, spanning roughly 78% of the width with equal side margins. The space between first and last name is replaced by a small landscape black-and-white photo, x-height tall and resting on the baseline. Top-left is a tiny circular monogram; eight nav links in 13px bold are spread at even intervals across the right half of the top edge. Bottom edge: equaliser bars with a grey label over a track title at left, a three-line bold blurb starting just left of centre, a sound toggle hard right. About 85% is empty.
  Worth taking: Replace the space between the two words of a giant name with a small photo cropped to x-height.
- **Glitch&Grit** (Awwwards Site of the Day, studied score 7.5) `aww-glitch-grit`
  Idea: Every screen is one project: two half-width footage columns with the project name stacked dead centre across their seam in a single flat pastel that changes per project.
  Hero: Black viewport split down its vertical centre. The left half holds a huge flat grey flower silhouette bleeding off the left and bottom edges; the right half is black with a few tiny video thumbnails drifting through. Dead centre, straddling the split, sits a two-line uppercase title in mint green, about 11vw per line, lines almost touching, spanning roughly 70% of the width. Two tiny category lines sit directly above it and a tiny 'view full project' link directly below, all in the same green. Navigation is six small bold white words pinned to the frame: three links across the top edge, the three-part studio name across the bottom edge.
  Worth taking: Break the studio name into three words pinned bottom-left, bottom-centre and bottom-right, mirroring three nav links across the top, so the viewport frame itself is the logo.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. `inspect.mjs` measures all of it.

Saved to /home/meshwa/Documents/Projects/artswapy/.taste-skill/direction.json · reprint with `node draw.mjs --show`
# Motion

Read this before adding any animation. The static page must already be finished and passing
`inspect.mjs`; motion is the last pass, never a way to rescue a weak layout.

## Contents

1. The budget
2. Four questions before any animation
3. Tokens
4. Recipes (copy, then adapt)
5. Signature moves
6. Reduced motion and performance
7. What gives generated motion away

## 1. The budget

A page that does not move reads as a mock-up; the inspector counts what moves while the page loads and
scrolls, and fails it under eight elements. The motion layer has four parts:

- **One signature moment:** the thing a visitor would describe an hour later: the headline that rises
  out of a mask, the image that opens like a shutter, the wordmark that scales with the scroll. The
  direction sheet from `draw.mjs` names one. Build that one well; it is the only move allowed to be
  loud.
- **Section entrances, choreographed per section:** the parts of each section arrive in reading order
  (heading, text, picture, details), staggered 60–90ms, rising 16–32px with opacity, once. Vary the
  manner with the content instead of stamping one preset everywhere: a list arrives row by row, a
  picture opens from a mask or settles from a slight scale, a figure counts up once, a statement rises
  line by line.
- **Feedback under the hand:** buttons that give on press, links that answer the pointer, cards and
  pictures that respond on hover, a menu that opens from where it was clicked.
- **One moving picture:** a found clip as a muted loop with a poster frame, a slow drift or scale on
  a large photograph, or a scroll-linked move on the hero picture.

What is still banned: the same fade-and-slide-up with the same timing on every block, which is the most
cited motion tell of generated pages; motion that hides content until a script runs, with no fallback;
bounce and elastic easing; anything that animates layout properties. Uniform motion says nobody decided
anything; choreographed motion with one protected moment says somebody did.

## 2. Four questions before any animation

1. **How often will someone see it?** Once per visit (hero load, a section reveal): it can take its
   time. Many times per visit (hover, menu, accordion): fast and small. Hundreds of times (keyboard
   actions, typing): no animation.
2. **What is it for?** Valid answers: it shows where something came from, it confirms an action, it
   keeps a change from being jarring, it explains how the product works, it is the signature moment.
   "It looks nice" is only valid for the signature moment.
3. **Which easing?** Entering or leaving: ease-out, so movement starts the instant the eye arrives.
   Moving between two places on screen: ease-in-out. Colour and opacity on hover: `ease`. Constant
   travel (marquee, progress): `linear`. `ease-in` makes interfaces feel slow because the first frames
   barely move; do not use it. The CSS keyword curves are weak, so use the tokens below.
4. **How long?** Press feedback 100–160ms. Hover 150–200ms. Menus and popovers 150–250ms. Dialogs and
   drawers 250–450ms. Section and hero reveals 500–900ms. Leaving is quicker than arriving (about 70%).

## 3. Tokens

```css
:root {
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);      /* enters, exits, reveals */
  --ease-in-out: cubic-bezier(0.76, 0, 0.24, 1);   /* things that travel while visible */
  --ease-soft: cubic-bezier(0.33, 1, 0.68, 1);     /* long quiet reveals, image scale */
  --t-press: 140ms;
  --t-hover: 180ms;
  --t-ui: 240ms;
  --t-reveal: 800ms;
}
```

Name the properties you animate. `transition: all` animates things you did not intend (and costs
layout); write `transition: transform var(--t-press) var(--ease-out)`.

## 4. Recipes

All recipes keep content visible when JavaScript is off or slow: the hidden state only applies under
`html.js`, which a one-line inline script sets.

```html
<script>document.documentElement.classList.add('js')</script>
```

### Hero load sequence (CSS only)

Stagger at most four things. With a headline of two lines this is short and reads as one gesture.

```css
@media (prefers-reduced-motion: no-preference) {
  .js [data-rise] {
    opacity: 0;
    transform: translateY(18px);
    animation: rise var(--t-reveal) var(--ease-out) forwards;
    animation-delay: calc(var(--i, 0) * 90ms + 120ms);
  }
}
@keyframes rise { to { opacity: 1; transform: none; } }
```

```html
<h1 data-rise style="--i:0">…</h1>
<p data-rise style="--i:1">…</p>
<a data-rise style="--i:2" class="button">…</a>
```

### Masked line reveal (the classic gallery headline)

Each line slides up from behind its own baseline. Because headlines are capped at two lines, you set
the line breaks yourself and wrap each line.

```html
<h1 class="lines">
  <span class="line"><span data-line style="--i:0">Stools for</span></span>
  <span class="line"><span data-line style="--i:1">small kitchens</span></span>
</h1>
```

```css
.lines .line { display: block; overflow: hidden; padding-bottom: 0.08em; margin-bottom: -0.08em; }
.lines [data-line] { display: block; }
@media (prefers-reduced-motion: no-preference) {
  .js .lines [data-line] {
    transform: translateY(105%);
    animation: line-up 900ms var(--ease-out) forwards;
    animation-delay: calc(var(--i) * 110ms + 150ms);
  }
}
@keyframes line-up { to { transform: none; } }
```

The `padding-bottom` / negative margin pair stops descenders (g, y, p) being clipped by the mask.
On a narrow phone the two authored lines may each wrap; check the mobile screenshot, and if they do,
author a shorter mobile break with a `<br class="only-wide">` pattern or reduce the size.

### Reveal on scroll (once)

For the two or three sections that deserve it, not for every block.

```css
@media (prefers-reduced-motion: no-preference) {
  .js [data-reveal] { opacity: 0; transform: translateY(24px); transition: opacity 700ms var(--ease-out), transform 900ms var(--ease-out); }
  .js [data-reveal].is-in { opacity: 1; transform: none; }
}
```

```js
const io = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
}, { rootMargin: '0px 0px -12% 0px', threshold: 0.1 });
document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
```

Never attach reveals with a scroll listener, never replay them when the element re-enters, and never
leave anything at `opacity: 0` if the observer fails to fire (the `html.js` gate handles no-JS; the
`unobserve` handles replays).

### Image shutter

An image opens from one edge while scaling down slightly inside its frame. Gallery staple; use it for
the one hero or showcase image.

```css
.shutter { overflow: hidden; }
@media (prefers-reduced-motion: no-preference) {
  .js .shutter { clip-path: inset(0 0 100% 0); transition: clip-path 1100ms var(--ease-in-out); }
  .js .shutter img { transform: scale(1.12); transition: transform 1500ms var(--ease-soft); }
  .js .shutter.is-in { clip-path: inset(0); }
  .js .shutter.is-in img { transform: none; }
}
```

### Press and hover

```css
.button { transition: transform var(--t-press) var(--ease-out), background-color var(--t-hover) ease, color var(--t-hover) ease; }
.button:active { transform: scale(0.97); }
.link { text-decoration: underline; text-decoration-color: transparent; text-underline-offset: 0.2em; text-decoration-thickness: 0.07em; transition: text-decoration-color var(--t-hover) ease; }
@media (hover: hover) and (pointer: fine) {
  .button:hover { background-color: var(--accent-strong); }
  .link:hover { text-decoration-color: currentColor; }
}
```

Hover styles go behind `(hover: hover)` because touch devices fire hover on tap and leave it stuck.
Hover should raise contrast, never lower it. Do not change font weight on hover (the text reflows).
Do not lift or scale every card on hover; one consistent, small response is enough.

### Scroll-linked progress without JavaScript

For a wordmark that scales as the hero leaves, an image that drifts a few percent, or a progress bar.
Wrap in `@supports` so browsers without scroll timelines get the static state.

```css
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .drift { animation: drift linear both; animation-timeline: view(); animation-range: entry 0% exit 100%; }
    @keyframes drift { from { transform: translateY(-4%); } to { transform: translateY(4%); } }
  }
}
```

Keep the travel small (under 8% of the element). Large parallax makes text hard to read and looks
dated.
