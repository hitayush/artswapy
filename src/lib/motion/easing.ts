/**
 * ArtSwapy Motion Easing Registry
 * Mirrored from DESIGN.md §2 "Motion"
 *
 * These arrays are used by motion/react and Framer Motion.
 * For GSAP, these are mirrored in the CustomEase registry.
 */

export const ART_EASING = {
  // Enters, exits, anything answering the user. The default.
  out: [0.23, 1, 0.32, 1],

  // Things already on screen travelling A→B: the thread draw, shutter, menu sheet.
  inOut: [0.77, 0, 0.175, 1],

  // Sheets and the phone menu (iOS-like settle).
  drawer: [0.32, 0.72, 0, 1],

  // Long quiet reveals, image scale, portrait drift.
  soft: [0.33, 1, 0.68, 1],

  // Colour and opacity only, on hover.
  color: [0.4, 0, 0.2, 1],
} as const;

export const ease = ART_EASING;

export type ArtEasingKey = keyof typeof ART_EASING;

export function getArtEasing(key: ArtEasingKey) {
  return ART_EASING[key];
}
