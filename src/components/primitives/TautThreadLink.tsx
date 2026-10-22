'use client';

import React from 'react';
import { clsx } from 'clsx';

/**
 * TautThreadLink
 * An SVG quadratic path that goes from 'slack' (9px sag) to 'taut' (0px sag) on hover.
 */
export function TautThreadLink({
  href,
  children,
  className,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      className={clsx('relative inline-block transition-colors duration-320 ease-out group', className)}
      {...props}
    >
      {children}
      <svg
        className="absolute left-0 -bottom-[7px] w-full h-[14px] overflow-visible pointer-events-none"
        viewBox="0 0 100 14"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 7 Q 50 16 100 7"
          className="fill-none stroke-[var(--thread)] stroke-[3px] transition-all duration-320 ease-out group-hover:d-[M 0 7 Q 50 7 100 7]"
          style={{
            vectorEffect: 'non-scaling-stroke',
            transitionProperty: 'd'
          }}
        />
      </svg>
    </a>
  );
}
