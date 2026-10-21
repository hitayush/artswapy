'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/motion/gsap';
import PlaceholderTag from '@/components/primitives/PlaceholderTag';

/** The page's one moving picture: image is 112% of its frame and drifts 0 to -8% with scroll. */
export default function HeroPortrait({
  src,
  alt,
  placeholder
}: {
  src: string;
  alt: string;
  placeholder?: boolean;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const drift = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to(drift.current, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: { trigger: frame.current, start: 'top top', end: 'bottom top', scrub: 0.6 }
        });
      });
      return () => mm.revert();
    },
    { scope: frame }
  );

  return (
    <figure className="portrait" ref={frame}>
      <div className="drift" ref={drift} style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '112%' }}>
        {placeholder ? (
          <div className="ph-fill" style={{ height: '100%' }} role="img" aria-label={`${alt} (to come)`}>
            <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
              <rect width="400" height="560" fill="#ece9e1" />
              <circle cx="200" cy="210" r="72" fill="#d8d3c6" />
              <path d="M60 560c0-110 60-170 140-170s140 60 140 170z" fill="#d8d3c6" />
              <path d="M120 420 h160" stroke="#b23506" strokeWidth="3" />
            </svg>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} width={880} height={1100} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} fetchPriority="high" />
        )}
      </div>
      {placeholder && <PlaceholderTag>Portrait to come</PlaceholderTag>}
    </figure>
  );
}
