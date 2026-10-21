'use client';

import { useEffect, useRef, useState } from 'react';
import { mailto } from '@/lib/mailto';
import type { MailtoTemplate } from '@/types/content';

async function copyText(text: string, selectEl: HTMLElement | null): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    if (selectEl) {
      const range = document.createRange();
      range.selectNodeContents(selectEl);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
    return false;
  }
}

/**
 * Copy email: Stamp. `variant="row"` shows the address as large type (pointer: click copies;
 * touch: mailto link plus a visible Copy control). `variant="button"` is a plain labelled button.
 */
export default function CopyEmail({
  address,
  variant = 'row',
  template
}: {
  address: string;
  variant?: 'row' | 'button';
  template?: MailtoTemplate;
}) {
  const [state, setState] = useState<'idle' | 'copied' | 'selected'>('idle');
  const addrRef = useRef<HTMLSpanElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const run = async () => {
    const ok = await copyText(address, addrRef.current);
    setState(ok ? 'copied' : 'selected');
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState('idle'), 1600);
  };

  const announce = (
    <span className="sr-only" role="status" aria-live="polite">
      {state === 'copied' ? 'Email address copied' : state === 'selected' ? 'Email address selected' : ''}
    </span>
  );

  const stamp = (
    <span className="stamp" data-show={state !== 'idle'} aria-hidden="true">
      {state === 'selected' ? 'Selected' : 'Copied'}
    </span>
  );

  if (variant === 'button') {
    return (
      <span className="copy-btn-row">
        <button type="button" onClick={run} className="link" style={{ minHeight: 44, display: 'inline-flex', alignItems: 'center' }}>
          Copy email
          <span ref={addrRef} className="sr-only">{address}</span>
        </button>
        {stamp}
        {announce}
      </span>
    );
  }

  return (
    <span className="copy-btn-row">
      <span className="copy-pointer">
        <button type="button" onClick={run} className="link poster email-poster" aria-label={`Copy email address ${address}`}>
          <span className="copy-state" data-copied={state !== 'idle'}>
            <span className="idle" ref={addrRef}>{address}</span>
            <span className="done" aria-hidden="true">Copied</span>
          </span>
        </button>
      </span>
      <span className="copy-touch">
        <a href={mailto(template ?? { to: address, subject: 'Hello', body: '' })} className="poster email-poster">
          {address}
        </a>
        <button type="button" onClick={run} className="copy-small link" aria-label="Copy email address">
          Copy
        </button>
      </span>
      {stamp}
      {announce}
    </span>
  );
}
