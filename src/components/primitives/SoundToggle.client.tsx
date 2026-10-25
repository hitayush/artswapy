'use client';

import { useEffect, useState } from 'react';
import { initSfx, isSfxMuted, toggleSfx } from '@/lib/audio/sfx';

interface SoundToggleProps {
  showLabel?: boolean;
  className?: string;
}

export default function SoundToggle({ showLabel = false, className = '' }: SoundToggleProps) {
  const [mounted, setMounted] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initSfx();
    setMuted(isSfxMuted());

    const onSfxChange = (e: Event) => {
      const detail = (e as CustomEvent<{ isMuted: boolean }>).detail;
      if (detail && typeof detail.isMuted === 'boolean') {
        setMuted(detail.isMuted);
      } else {
        setMuted(isSfxMuted());
      }
    };

    window.addEventListener('artswapy-sfx-change', onSfxChange);
    return () => window.removeEventListener('artswapy-sfx-change', onSfxChange);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = toggleSfx();
    setMuted(nextMuted);
  };

  const isSoundActive = mounted && !muted;
  const label = isSoundActive ? 'Mute sound effects' : 'Enable sound effects';

  return (
    <button
      type="button"
      className={`sound-toggle ${isSoundActive ? 'is-active' : 'is-muted'} ${className}`.trim()}
      onClick={handleClick}
      aria-label={label}
      aria-pressed={isSoundActive}
      title={label}
      data-sfx="toggle"
    >
      <span className="sound-toggle-box" aria-hidden="true">
        {isSoundActive ? (
          /* Active sound waves glyph */
          <svg
            className="sound-icon sound-icon-active"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="9 4 5 7 2 7 2 13 5 13 9 16 9 4" fill="currentColor" fillOpacity="0.15" />
            <path d="M13 7.5a4.5 4.5 0 0 1 0 5" />
            <path d="M15.5 5a8 8 0 0 1 0 10" />
          </svg>
        ) : (
          /* Muted speaker glyph */
          <svg
            className="sound-icon sound-icon-muted"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="9 4 5 7 2 7 2 13 5 13 9 16 9 4" />
            <line x1="14" y1="8" x2="18" y2="12" />
            <line x1="18" y1="8" x2="14" y2="12" />
          </svg>
        )}
      </span>

      {showLabel && (
        <span className="sound-toggle-label mono">
          SFX: {isSoundActive ? 'ON' : 'OFF'}
        </span>
      )}
    </button>
  );
}
