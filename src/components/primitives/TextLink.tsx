'use client';

import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react';
import { useEffect, type ReactNode } from 'react';
import { ease } from '@/lib/motion/easing';
import { scrollToHash } from '@/lib/motion/lenis';

/**
 * Taut thread: a slack SVG path under the word pulls tight on hover/press,
 * and stays drawn when `current`. Pointer and touch animate; keyboard focus is instant.
 */
export default function TextLink({
  href,
  children,
  current = false,
  inText = false,
  className = '',
  ariaLabel,
  external = false,
  onNavigate
}: {
  href: string;
  children: ReactNode;
  current?: boolean;
  inText?: boolean;
  className?: string;
  ariaLabel?: string;
  external?: boolean;
  onNavigate?: () => void;
}) {
  const reduce = useReducedMotion();
  const sag = useMotionValue(current ? 0 : 9);
  const opacity = useMotionValue(current ? 1 : 0);
  const d = useTransform(sag, (s) => `M0 7 Q50 ${7 + s} 100 7`);

  useEffect(() => {
    if (current) {
      sag.set(0);
      opacity.set(1);
    } else {
      opacity.set(0);
      sag.set(9);
    }
  }, [current, sag, opacity]);

  const draw = (instant = false) => {
    if (reduce || instant) {
      sag.set(0);
      animate(opacity, 1, { duration: instant ? 0 : 0.12 });
      return;
    }
    if (opacity.get() < 0.05) sag.set(9);
    animate(opacity, 1, { duration: 0.12 });
    animate(sag, 0, { duration: 0.32, ease: [...ease.out] });
  };

  const undraw = () => {
    if (current) return;
    animate(opacity, 0, { duration: 0.16 }).then(() => {
      if (opacity.get() === 0) sag.set(9);
    });
  };

  const isHash = href.startsWith('#');

  return (
    <a
      href={href}
      className={`link ${inText ? 'in-text' : ''} ${className}`.trim()}
      aria-current={current ? 'true' : undefined}
      aria-label={ariaLabel}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onClick={(e) => {
        if (isHash) {
          e.preventDefault();
          scrollToHash(href, { immediate: e.detail === 0 });
          history.replaceState(null, '', href);
        }
        onNavigate?.();
      }}
      onPointerEnter={(e) => e.pointerType === 'mouse' && draw()}
      onPointerLeave={(e) => e.pointerType === 'mouse' && undraw()}
      onPointerDown={() => draw()}
      onPointerUp={(e) => e.pointerType !== 'mouse' && window.setTimeout(undraw, 320)}
      onPointerCancel={undraw}
      onFocus={(e) => e.currentTarget.matches(':focus-visible') && draw(true)}
      onBlur={undraw}
    >
      {children}
      <motion.svg className="taut" viewBox="0 0 100 14" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <motion.path d={d} style={{ opacity }} />
      </motion.svg>
    </a>
  );
}
