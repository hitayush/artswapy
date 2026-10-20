# Contact rows ("Address in display rows")

## Purpose
Persona 3 ("save the contact or message right away") and persona 1 (start a conversation, mostly on a phone). Contact gives the **routes**; the footer close gives the **invitation** ("Set your name" and the one big button). The address appears **once on the page, here**. Every route works on touch and without a mail client.

## Anatomy
Five full-width rows at the same size (`--step-poster`: 92 / 49 / 36px, Space Grotesk 700, leading 0.94, tracking -0.04em, `--ink`), left aligned at `--margin`, text in the lower third of a ≈150px row. Bands alternate `--surface` / `--bg` (tone separates; no rules). No heading shown (visually hidden `h2` "Contact"), no form.

| Row | Content | Control |
| --- | --- | --- |
| 1 Email | `site.email.address` | `CopyEmail` primitive: pointer click copies; on `(pointer:coarse)` a visible 44px "Copy" `TextLink` sits at the row's right end, the address itself being a `mailto:` link |
| 2 WhatsApp | "WhatsApp" | `https://wa.me/<number>` link, `PlaceholderTag` until the number is confirmed (hidden href while placeholder: renders inert text) |
| 3 Location | `contact.location` | Plain text, `PlaceholderTag` |
| 4 Availability | `contact.availability` | Plain text, `PlaceholderTag` |
| 5 Hello | "Hello" + square ink `IconButton` (arrow) | Whole row is one `<a href="mailto:…" data-primary-action>` with subject and body prefilled |

The icon button is **square** (all buttons are), 0.9em (≈ 83px at 1440, 56px on phones), `--accent` fill, `--on-accent` arrow (5.7:1), 24px right of the word, centred on the x-height. It does not become an orange band on phones (accent = action + thread).

## Layout
- **1440:** rows 150px. "hello@artswapy.com" ≈ 18 × 0.5 × 92 ≈ 830px.
- **768:** rows 120px, text 49px.
- **390:** rows ≈ 84px, 16px insets, text 36px. Verify the email fits one line at 360px; if not, that row alone uses `min(--step-poster, 8.6vw)` (see notes). Location and availability may wrap, and `PlaceholderTag` drops beneath. The Hello button is 56px; the whole band is the tap target.

## States
| State | Email / WhatsApp rows | Hello row |
| --- | --- | --- |
| rest | Ink text, no underline | "Hello" ink; ink square button (the footer close keeps the one orange action) |
| hover (`hover:hover`) | `TextLink` thread draws under the text (260ms in, 180ms out) | Thread under "Hello"; button ink wipe + arrow pass-through (per `IconButton`); row band does not change |
| focus-visible | Thread + 2px `--focus` ring; **instant** | Same + ring around the row; instant |
| press / `:active` | Thread draws (touch cue) | Button `scale(0.94)`, 140ms down / 200ms back; thread draws |
| done | Email label becomes "Copied" 1.6s (label swap `aria-hidden`) + Sonner toast (the only live region) | Navigates to the mail app |
Location and availability are inert and have no hover.

## Micro-interactions
- Copy swap: address masks up, "Copied" rises in, `--t-ui` 240ms `--ease-out`; returns after 1.6s.
- `mailto:` built by `mailto(site.contact.mailto)`: `encodeURIComponent` on subject and body, `%0D%0A` newlines.
- Entrance (shared): `band` per row (`clip-path inset(0 100% 0 0)→inset(0)`, 800ms `--ease-in-out`, `i × --stagger`), text `lines` 80ms behind, placeholder tags and the Hello button `rise` last (button: opacity + 16px, `--t-ui`). Sequence ≈ 1.2s.

## Reduced motion
Bands and text become `--t-ui` opacity fades. Hover: thread appears without drawing; button ink wipe becomes an instant swap; no arrow pass; copy swap is an opacity change.

## Accessibility
`<section id="contact" aria-labelledby>` with a hidden `h2`; focus stops are only the email, WhatsApp (once real), Copy and Hello controls. Hello link `aria-label="Email Swapnil to start a project"`; the square button is decorative (`aria-hidden`). Copy works without a mail client. Ink on `--surface` ≥ 14:1; inverse-ink on ink 16.5:1. Touch targets ≥ 44px (rows ≥ 84px). Only one `data-primary-action` in view with the header's (the header hides its own while a tagged action is on screen).

## Implementation notes
- `src/components/sections/ContactRows/ContactRows.tsx` (server: rows from `contact.routes`) + `CopyEmail` and `IconButton` islands from `components/primitives/`.
```ts
interface ContactRowsProps { heading: string; routes: ContactRoute[]; hello: { word: string; mailto: MailtoTemplate } }
type ContactRoute = { id: 'email'|'whatsapp'|'location'|'availability'; label: string; value: string; href?: string; placeholder?: boolean }
interface MailtoTemplate { to: string; subject: string; body: string }
```
- **Engine:** CSS for hover, press, thread, bands (via `RevealRoot`); Motion only inside `CopyEmail` (`AnimatePresence` label morph). No GSAP beyond the entrance trigger.
- **Built on** shadcn `Button` (restyled `IconButton`) and `Sonner` (copy toast); no reactbits component (RB *Magnet* only on hero and footer buttons, not here). Strip: shadcn radius, shadow, ring, default `variant` colours.
- The footer close must not repeat the address; it reuses the same `mailto()` helper.

## Content source
`src/content/site.ts`: `contact: { heading: string[]; routes: ContactRoute[]; hello: string; mailto: MailtoTemplate }`; routes: email (from `site.email`), whatsapp `{ value: 'WhatsApp', href: 'https://wa.me/…', placeholder: true }`, location and availability (move from `hero.meta`, single source). Remove `contact.eyebrow`; `contact.heading` ('Let’s make it meaningful.') moves to the footer invitation. `mailto`: subject 'Project enquiry', body 'Hi Swapnil,\n\nMy business is …\nWhat I need help with: …\nTimeline: …\n\nThanks,'.

## Changes in v2.2
- Round button is a square `IconButton`; `--accent-strong` and `--step-row` gone (Poster only); contrast corrected to 5.7:1.
- Added a WhatsApp row (placeholder) and a touch Copy control, so copy works on touch (R2-B2).
- Greeting button tagged `data-primary-action`.
- Contact = routes, footer = invitation; address shown once (R2-M7).
- Hover/focus timings and instant keyboard focus; TSX path, typed props, server shell + client islands.
- Hello button is the ink IconButton, not orange: one orange action per screen (DESIGN.md §3); the copy confirmation is announced by Sonner only.
