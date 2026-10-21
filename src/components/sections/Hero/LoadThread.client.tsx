'use client';

import { useEffect } from 'react';

/** The load thread itself is CSS (keyed on html[data-intro]); this only records that it has played. */
export default function LoadThread() {
  useEffect(() => {
    const t = window.setTimeout(() => {
      try {
        sessionStorage.setItem('as-intro', '1');
      } catch {
        /* storage blocked: the thread simply plays again next visit */
      }
    }, 1200);
    return () => window.clearTimeout(t);
  }, []);
  return null;
}
