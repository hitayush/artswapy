# Load thread (formerly Loader)

`src/components/sections/Hero/LoadThread.client.tsx`; helper `src/lib/hooks/useStableCallback.ts`; a 6-line inline script in `src/app/layout.tsx`.

## Purpose
A signature moment for first-time visitors (personas 1 and 2) that costs persona 3 (phone, referred, under a minute) nothing. There is **no curtain**: the hero is painted and tappable from first paint. A thread signs the name once.

## Sequence (first visit of the session only; 900ms maximum)
| t (ms) | Event | Timing |
| --- | --- | --- |
| 0 | Hero is already visible. Thread starts drawing left to right along the gap under the name (`top: --hero-baseline + 12px`), `--thread`, 3px, margin to margin | 700ms, `--t-thread-hero`, `--ease-in-out` |
| 200 | Sentence rises (`translateY(16px)` and opacity 0 to rest) | 480ms `--ease-out` |
| 270 | Action rises | 480ms `--ease-out` (`--stagger` 70ms) |
| 700 | Thread exits right | 180ms (`inset(0 0 0 100%)`), ends at 880ms |
Total 880ms. Nothing is hidden or blocked: no overlay, no `fonts.ready` gate, no scroll lock, no `pointer-events` change.

## Skip rules
Never play when: `prefers-reduced-motion`, `sessionStorage['artswapy:intro']` set, `location.hash` set, or `scrollY > 0`. Decided **before first paint** by the inline script, which sets `<html data-intro="play|done">`; CSS hides the sentence/action offset (opacity 0, translateY 16px) only under `[data-intro="play"]`, so no-JS and repeat visits render the final state at once. Any pointer press, key press or scroll during playback finishes immediately (animations `.finish()`), without cancelling the tap's own action. The flag is written when the sequence ends (try/catch for private modes).

## States
Single timeline: idle, playing, done. Nothing is focusable or hoverable; no feedback states. Reduced motion: `data-intro="done"`, thread not rendered.

## Accessibility
No `aria-live`, no "Loaded" announcement, no overlay; the thread is `aria-hidden`. Content is in the DOM, readable and operable from t=0. Thread `--thread` is decorative.

## Implementation notes
```ts
interface LoadThreadProps { onDone?: () => void }
```
- Client island rendered once by the server `Hero`. Engine: WAAPI via `useThread` for the thread; sentence/action offsets are a CSS animation keyed on `[data-intro="play"]` (no JS timers).
- **Stable-callback fix** (the old bug: inline callbacks in the effect deps re-ran the effect on every parent render and restarted the timers):
```ts
export function useStableCallback<A extends unknown[], R>(fn: (...a: A) => R) {
  const ref = useRef(fn);
  useLayoutEffect(() => { ref.current = fn; });
  return useCallback((...a: A) => ref.current(...a), []);
}
// const done = useStableCallback(onDone); useEffect(() => { ...; return cleanup }, [done]);
```
Never list a raw prop callback in an effect dependency list; the effect has one cleanup that cancels the animation; a `finished` ref makes late callbacks no-ops (StrictMode double mount is then harmless).
- No shadcn/reactbits base. Lenis: untouched; it runs normally and the load never locks scroll.
- Content: none (`site.name` is in the hero).

## Changes in v2.2
- No overlay, no `fonts.ready` gate, no `done()` unmount, thread over a visible hero.
- 880ms budget (was 1600ms); skipped on repeat, hash, scrolled, reduced motion; never blocks input.
- Thread colour `--thread`; tokens `--t-thread-hero`, `--ease-in-out`.
- Pre-paint inline script instead of React state for the skip decision.
- TSX path and engine ownership.
