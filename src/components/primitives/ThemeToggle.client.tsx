'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { playSfx } from '@/lib/audio/sfx';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'artswapy-theme';
const THEME_EVENT = 'artswapy-theme-change';

type ViewTransitionDoc = Document & {
  startViewTransition?: (callback: () => void) => {
    finished: Promise<void>;
  };
};

function readDomTheme(): ThemeMode {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function applyThemeToDom(next: ThemeMode) {
  const root = document.documentElement;
  root.dataset.theme = next;
  root.classList.toggle('dark', next === 'dark');
  root.style.colorScheme = next;
  window.dispatchEvent(new CustomEvent<ThemeMode>(THEME_EVENT, { detail: next }));
}

interface ThemeToggleProps {
  showLabel?: boolean;
  className?: string;
}

export default function ThemeToggle({ showLabel = false, className = '' }: ThemeToggleProps) {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [mounted, setMounted] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const pulseRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setMounted(true);
    setTheme(readDomTheme());

    const onThemeEvent = (e: Event) => {
      const detail = (e as CustomEvent<ThemeMode>).detail;
      if (detail === 'dark' || detail === 'light') {
        setTheme(detail);
      } else {
        setTheme(readDomTheme());
      }
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && (e.newValue === 'dark' || e.newValue === 'light')) {
        applyThemeToDom(e.newValue);
      }
    };

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = (e: MediaQueryListEvent) => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved !== 'dark' && saved !== 'light') {
          applyThemeToDom(e.matches ? 'dark' : 'light');
        }
      } catch {
        applyThemeToDom(e.matches ? 'dark' : 'light');
      }
    };

    window.addEventListener(THEME_EVENT, onThemeEvent);
    window.addEventListener('storage', onStorage);
    mql.addEventListener('change', onSystemChange);

    return () => {
      window.removeEventListener(THEME_EVENT, onThemeEvent);
      window.removeEventListener('storage', onStorage);
      mql.removeEventListener('change', onSystemChange);
    };
  }, []);

  const handleToggle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      playSfx('toggle');
      const current = readDomTheme();
      const next: ThemeMode = current === 'dark' ? 'light' : 'dark';

      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Ignore storage errors in private/restricted browsing
      }

      const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isKeyboardTriggered = e.detail === 0;

      // Instant switch for reduced-motion or keyboard-triggered activation
      if (isReducedMotion || isKeyboardTriggered) {
        applyThemeToDom(next);
        return;
      }

      const root = document.documentElement;
      const btn = btnRef.current;
      const rect = btn?.getBoundingClientRect();
      const x = rect ? rect.left + rect.width / 2 : e.clientX || window.innerWidth - 48;
      const y = rect ? rect.top + rect.height / 2 : e.clientY || 32;
      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      root.style.setProperty('--theme-x', `${Math.round(x)}px`);
      root.style.setProperty('--theme-y', `${Math.round(y)}px`);
      root.style.setProperty('--theme-r', `${Math.ceil(maxRadius)}px`);

      // Subtle orange aperture ring on the toggle button itself
      if (pulseRef.current) {
        pulseRef.current.animate(
          [
            { transform: 'scale(0.85)', opacity: 0.75 },
            { transform: 'scale(1.65)', opacity: 0 }
          ],
          { duration: 360, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' }
        );
      }

      const doc = document as ViewTransitionDoc;
      if (typeof doc.startViewTransition === 'function') {
        root.dataset.themeTransition = 'view';
        try {
          const transition = doc.startViewTransition(() => {
            applyThemeToDom(next);
          });
          transition.finished.finally(() => {
            delete root.dataset.themeTransition;
          });
          return;
        } catch {
          delete root.dataset.themeTransition;
        }
      }

      // Smooth token crossfade fallback when View Transitions API is unavailable
      root.dataset.themeTransition = 'fade';
      applyThemeToDom(next);
      window.setTimeout(() => {
        delete root.dataset.themeTransition;
      }, 300);
    },
    []
  );

  const isDark = mounted && theme === 'dark';
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      ref={btnRef}
      type="button"
      className={`theme-toggle ${className}`.trim()}
      onClick={handleToggle}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      data-theme-state={isDark ? 'dark' : 'light'}
    >
      <span ref={pulseRef} className="theme-toggle-pulse" aria-hidden="true" />
      <span className="theme-toggle-track" aria-hidden="true">
        <span className="theme-toggle-icon-wrap">
          {/* Sun glyph */}
          <svg
            className="theme-icon theme-icon-sun"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="square"
          >
            <circle cx="10" cy="10" r="3.6" />
            <path d="M10 2.2v2.1M10 15.7v2.1M2.2 10h2.1M15.7 10h2.1M4.48 4.48l1.48 1.48M14.04 14.04l1.48 1.48M15.52 4.48l-1.48 1.48M5.96 14.04l-1.48 1.48" />
          </svg>
          {/* Moon glyph */}
          <svg
            className="theme-icon theme-icon-moon"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="square"
          >
            <path d="M15.6 12.6A6.4 6.4 0 0 1 7.4 4.4a6.4 6.4 0 1 0 8.2 8.2Z" />
          </svg>
        </span>
        <span className="theme-toggle-dot" />
      </span>
      {showLabel && (
        <span className="theme-toggle-label mono" aria-hidden="true">
          {isDark ? 'DARK' : 'LIGHT'}
        </span>
      )}
    </button>
  );
}
