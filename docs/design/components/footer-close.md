# Footer close

`src/components/sections/FooterClose/FooterClose.tsx` (server), `SetYourName.client.tsx`, `Wordmark.tsx`.

## Purpose
The closing conversion for all personas, and the single home of the primary action (the contact rows keep information only). Persona 1 tries their own business name in the brand's type and sends it; persona 2 sends a brief; persona 3 taps once.

## Anatomy
Inverse field (`--inverse-bg`, `--inverse-ink`), `data-inverse-section`, `min-height: 100svh`, `overflow: hidden`.
| Part | Spec |
| --- | --- |
| Invitation | `contact.heading` on two lines, Space Grotesk 700, `--step-poster` (92px at 1440, 36px at 390), cols 1-7 |
| Name field | shadcn `Input` + visible `<label>` + hint, cols 1-4 |
| Action | `CTAButton primaryAction magnetic`, "Start a project" |
| Preview | typed name in the monument face (below) |
| Links | cols 10-12: `CopyEmail tone="inverse"`, WhatsApp/phone (placeholder-tagged until confirmed), `navLinks`; 16px, 44px rows |
| Credits | `--step-small`, spread left/right above the wordmark |
| Wordmark | "ARTSWAPY", `font-size: calc(var(--step-mon) * 1.08)`, `translateY(28%)`, `nowrap`, `aria-hidden` |

## Wordmark crop
With the monument fitted to 96% of the content width, 1.08x makes the name run about 1.3% of the viewport past the right edge: only the Y's right stroke is clipped, and the bottom 28% is cut. The name reads ARTSWAPY from its upper 70%. (DESIGN.md's `--step-mon-crop` 1.15 would cut about two-thirds of the Y; see notes.)

## Layout
1440: invitation and links row, then input + button, then preview (reserved 120px), credits, wordmark about 185px visible. 768: links under the button as one row. 390: invitation 36px two lines, full-width input, full-width button, preview, link words wrapping, wordmark about 22vw cropped.

## Set your name
1. **Field.** Label "Your business name" (16px). `maxLength={24}`, `autoComplete="organization"`, `enterKeyHint="send"`, `spellCheck={false}`. 56px, square, fill `--inverse-ink`, text `--ink` (16:1), placeholder `--muted` (6.5:1), caret `--accent`, focus ring `--accent`. Hint (14px, `aria-describedby`): "Shown in our type, and added to your email subject."
2. **Rendering.** Value in Space Grotesk 700, uppercase by CSS only, tracking -0.06em, leading 0.82, `--inverse-ink`, fitted to the content width and capped at `--step-poster`; empty shows the sample "Your name" at full strength. `aria-hidden` (the input is the accessible source). No animation per keystroke.
3. **Overflow.** One line when the fitted size is at least 28px; otherwise two lines broken at spaces, `overflow-wrap: anywhere` last resort, never three; 24 characters always fit two lines at 390. Reserved height never changes. Measure with a hidden span, `ResizeObserver` and once after `document.fonts.ready`; nothing else waits on fonts.
4. **Thread stitch.** A 3px `--accent` line through the cap-height middle, behind the letters, with front segments over every second letter (positions from `Range.getClientRects()` per character). Draws 700ms `--ease-in-out` when the section enters and **on blur/Enter** after editing; on the first keystroke it retracts (180ms). Reduced motion: static, drawn when the field is not focused.
5. **Mailto.** `mailto:{address}?subject={enc("Project enquiry — {name}")}&body={enc(body)}`; without a name, subject "Project enquiry". Strip control chars, trim, `encodeURIComponent` (em dash included). Updated on each change. Enter in the field clicks the button.
6. **No JS.** Server markup has the button with the generic mailto and the input `hidden`; the client island unhides it. `<noscript>` in the layout repeats name, sentence and a mailto link.

## States
Input: rest, focus-visible (ring, no animation), typing (preview updates instantly). Button, links: their specs. Wordmark rises from `translateY(110%)` to 28%, 800ms `--ease-out`, once on entry (GSAP ScrollTrigger `once`). Disabled/loading: n/a.

## Reduced motion
Wordmark and thread paint in place; preview text still updates; no magnet.

## Accessibility
Visible label, hint, no live region (the preview is decorative; CopyEmail's toast is the only announcer). Contrast: `--inverse-ink` 16.5:1, `--accent` 5.7:1, credits 14px at 16.5:1. Targets 44px+.

## Implementation notes
```ts
interface FooterCloseProps { content: FooterContent; nav: NavLink[] }
interface SetYourNameProps { address: string; maxLength?: 24; subject: string; subjectWithName: (n: string) => string; body: string }
```
- Server shell; `SetYourName.client.tsx` is the island (Motion/WAAPI for the stitch via `useThread`, `useInView`). Wordmark entrance: GSAP in a tiny `WordmarkReveal.client.tsx`.
- shadcn `Input` restyled (square, no shadow, `--inverse-ink` fill, our ring). reactbits *Variable Proximity* is not used; nothing installed.
- Lenis: the "Start a project" anchor from other sections uses `lenis.scrollTo('#contact', { offset: -64 })`; the field never traps scroll.
- Content: `contact.heading`, `contact.cta`, `contact.mailto`, `site.email`, `navLinks`, new `contact.setName.{label,hint,placeholder,sample}`, `contact.whatsapp` (placeholder), `site.credits`.

## Changes in v2.2
- 24 characters; subject `Project enquiry — {name}`.
- Preview cap and invitation use `--step-poster` (92px/36px), not literal sizes.
- Wordmark crop 1.08 so the Y stays recognisable.
- Stitch draws on blur, retracts on first keystroke; `--accent` used on inverse only.
- Footer owns the single primary action; WhatsApp/phone route added.
- shadcn Input, client island split, Lenis anchors.
