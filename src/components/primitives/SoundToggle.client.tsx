'use client';

import { useEffect, useState } from 'react';
import { initSfx, isSfxMuted, registerUserGesture, toggleSfx } from '@/lib/audio/sfx';

export type SoundToggleVariant = 'pill' | 'circle';

interface SoundToggleProps {
  showLabel?: boolean;
  className?: string;
  variant?: SoundToggleVariant;
  labelPosition?: 'left' | 'right';
}

export default function SoundToggle({
  showLabel = false,
  className = '',
  variant = 'pill',
  labelPosition = 'right'
}: SoundToggleProps) {
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
    registerUserGesture();
    const nextMuted = toggleSfx();
    setMuted(nextMuted);
  };

  const isSoundActive = mounted && !muted;
  const label = isSoundActive ? 'Mute sound effects' : 'Enable sound effects';

  if (variant === 'circle') {
    const textLabel = (
      <span
        className="hero-sound-label mono hide-mobile"
        onClick={handleClick}
        title={label}
        aria-hidden="true"
      >
        <span className="hero-sound-label-text">
          SFX: <strong className="hero-sound-state">{isSoundActive ? 'ON' : 'OFF'}</strong>
        </span>
      </span>
    );

    return (
      <div className="hero-sound-control-group">
        {showLabel && labelPosition === 'left' && textLabel}
        <button
          type="button"
          className={`hero-sound-toggle ${isSoundActive ? 'is-active' : 'is-muted'} ${className}`.trim()}
          onClick={handleClick}
          aria-label={label}
          aria-pressed={isSoundActive}
          title={`${label} · SFX: ${isSoundActive ? 'ON' : 'OFF'}`}
          data-sfx="toggle"
        >
          <span className="hero-sound-icon-stage" aria-hidden="true">
            {isSoundActive ? (
              <svg
                className="sound-icon sound-icon-active"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" fillOpacity="0.18" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            ) : (
              <svg
                className="sound-icon sound-icon-muted"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </span>
          <span className="hero-theme-tooltip" role="tooltip" aria-hidden="true">
            {isSoundActive ? 'Mute Sound FX' : 'Enable Sound FX'}
          </span>
        </button>
        {showLabel && labelPosition === 'right' && textLabel}
      </div>
    );
  }

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
