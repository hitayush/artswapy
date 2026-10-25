// cubic-bezier(x1, y1, x2, y2) as a JS function, adapted from ClimbX (lib/ease.js)
// so JS-driven motion (Lenis smooth scroll) uses exact parametric bezier curves.
//
// A CSS easing curve is a parametric bezier: both x (time) and y (progress) are functions of
// some parameter t, and t is *not* the time. Evaluating it means first solving x(t) = time
// for t via Newton-Raphson, then reading y(t).

const A = (a: number, b: number) => 1 - 3 * b + 3 * a;
const B = (a: number, b: number) => 3 * b - 6 * a;
const C = (a: number) => 3 * a;

// value of the bezier polynomial at t, for one axis
const calc = (t: number, a: number, b: number) => ((A(a, b) * t + B(a, b)) * t + C(a)) * t;
// its derivative, i.e. how fast that axis moves at t
const slope = (t: number, a: number, b: number) => 3 * A(a, b) * t * t + 2 * B(a, b) * t + C(a);

export function cubicBezier(x1: number, y1: number, x2: number, y2: number): (x: number) => number {
  if (x1 === y1 && x2 === y2) return (x: number) => x;

  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;

    let t = x;
    for (let i = 0; i < 8; i++) {
      const d = slope(t, x1, x2);
      if (Math.abs(d) < 1e-6) break;
      t -= (calc(t, x1, x2) - x) / d;
      t = t < 0 ? 0 : t > 1 ? 1 : t;
    }
    return calc(t, y1, y2);
  };
}
