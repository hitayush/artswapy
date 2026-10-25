import React from 'react';

interface ArtSwapyLogoProps {
  className?: string;
  showSubtitle?: boolean;
}

/**
 * Official ArtSwapy Brand Logo mark and logotype.
 * Replaces plain unstyled text with the signature ArtSwapy diamond-thread insignia
 * paired with high-contrast architectural typography.
 */
export default function ArtSwapyLogo({ className = '', showSubtitle = false }: ArtSwapyLogoProps) {
  return (
    <span className={`artswapy-brand-logo ${className}`.trim()}>
      <span className="artswapy-logo-mark" aria-hidden="true">
        <svg
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="artswapy-mark-svg"
        >
          {/* Signature geometric diamond rhombus */}
          <rect
            x="14"
            y="2"
            width="17"
            height="17"
            rx="3.5"
            transform="rotate(45 14 2)"
            className="artswapy-mark-diamond"
          />
          {/* Inner needle core detail */}
          <circle cx="14" cy="14" r="2.5" className="artswapy-mark-core" />
        </svg>
      </span>
      <span className="artswapy-logo-text">
        <span className="artswapy-logo-name">ArtSwapy</span>
        {showSubtitle && <span className="artswapy-logo-sub">Studio</span>}
      </span>
    </span>
  );
}
