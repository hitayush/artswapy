# CopyEmail

`src/components/primitives/CopyEmail.tsx` (client island) inside the footer, contact rows and menu sheet.

## Purpose
Persona 3 (referred, phone, in an in-app browser with maybe no mail client) and persona 2 (forwards the address to a team). Copy must work everywhere, including touch; the primary `mailto:` route is the Start-a-project button.

## Anatomy
```
<button type="button" class="copy-email text-link" aria-label? (none) >
  <span class="copy-email__label">hello@artswapy.com</span>
  <span class="copy-email__done" aria-hidden>Copied</span>
</button>
{placeholder && <PlaceholderTag/>}
```
A `<button>` (it performs an action, never navigates). Styled as a standalone TextLink (thread, 44px hit area), DM Sans 500 `--step-body`, nowrap. When the Clipboard API is missing or rejects, it falls back to `window.location.href = mailto:...` (and the toast is skipped). The accessible name is the address; "Copied" is visual only.

## Layout
1440: footer link column (cols 10-12) and contact rows. 768/390: own row, 44px tall, left aligned.

## States
| State | Spec |
| --- | --- |
| Rest | Address, ink |
| Hover / focus-visible | Thread (text-link.md); cursor `copy` on fine pointers |
| Active/press | Thread draws (touch cue) |
| Done | Label swaps to "Copied" (Motion `AnimatePresence`, exiting label `translateY(0 to -100%)`, entering `100% to 0`, 200ms `--ease-out`, exit 140ms), `--thread` colour on light (`--inverse-ink` on inverse). Holds 1600ms then swaps back. Keyboard activation swaps instantly (no animation on keyboard-driven changes) |
| Error | Falls back to `mailto:`; no state change |
| Disabled | n/a |

## Announcement
Sonner (`toast('Email address copied', { duration: 1600 })`) provides the one polite live region (its `Toaster` is mounted in `layout.tsx` and exists before any toast). Do not add a second `aria-live` span, or screen readers hear it twice. The toast is the visible confirmation on touch, where the label may be off the thumb's line of sight; on desktop the label swap is enough, so the toast fires only when `(pointer: coarse)`, and a visually hidden `role="status"` is not needed because Sonner announces both cases (call `toast` with `unstyled` and a visually quiet class on fine pointers).

## Reduced motion
Label swap by opacity only (`--t-ui`); toast uses Sonner's own reduced-motion handling. Timers unchanged.

## Accessibility
Native button, 44px+. Contrast: ink 16:1; `--thread` "Copied" 5.6:1 on `--bg`; `--inverse-ink` 16.5:1 on inverse. `PlaceholderTag` (13px+) shown while `site.email.placeholder`.

## Implementation notes
```ts
interface CopyEmailProps { address: string; placeholder?: boolean; tone?: 'light'|'inverse'; mailto?: string }
```
- `"use client"` island (clipboard, timers). Engine: CSS thread + Motion `AnimatePresence` for the swap.
- Built on shadcn `Sonner` (`<Toaster />` restyled: square, `--inverse-bg` ground, `--inverse-ink` text, no shadow) and nothing from reactbits.
- `navigator.clipboard.writeText` needs a secure context; wrap in try/catch; clear the timer in effect cleanup; restarts on repeat clicks.
- Lenis: none.
- Content: `site.email.address`, `site.email.placeholder`; new `site.email.copiedLabel`, `site.email.copiedAnnouncement`.

## Changes in v2.2
- Copy now works on touch (Clipboard API) with `mailto:` fallback; Sonner toast.
- It is a button, not an intercepted link; `--accent-text` gone for `--thread`.
- Timings: 200ms enter, 140ms exit, 1600ms hold; keyboard swap instant.
- TSX path, props, Sonner restyle.
