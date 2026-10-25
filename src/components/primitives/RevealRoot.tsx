'use client';

import { createElement, useEffect, useRef, type HTMLAttributes, type ReactNode } from 'react';

/** Once-only section entrance. Children opt in with data-r="rise|lines|band|shutter" and style --i. */
export default function RevealRoot({
  as = 'div',
  children,
  rootMargin = '0px 0px -8% 0px',
  threshold = 0.05,
  ...rest
}: {
  as?: 'div' | 'section' | 'footer';
  children: ReactNode;
  rootMargin?: string;
  threshold?: number;
} & HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.setAttribute('data-in', '');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.setAttribute('data-in', '');
          io.disconnect();
        }
      },
      { rootMargin, threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, threshold]);

  return createElement(as, { ref, 'data-reveal': '', ...rest }, children);
}
