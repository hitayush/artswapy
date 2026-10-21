/** Named bezier curves, mirrored in tokens.css (--ease-*) and the GSAP CustomEase registry. */
export const ease = {
  out: [0.23, 1, 0.32, 1],
  inOut: [0.77, 0, 0.175, 1],
  drawer: [0.32, 0.72, 0, 1],
  soft: [0.33, 1, 0.68, 1]
} as const;

export const cssEase = {
  out: 'cubic-bezier(0.23, 1, 0.32, 1)',
  inOut: 'cubic-bezier(0.77, 0, 0.175, 1)',
  drawer: 'cubic-bezier(0.32, 0.72, 0, 1)',
  soft: 'cubic-bezier(0.33, 1, 0.68, 1)'
} as const;
