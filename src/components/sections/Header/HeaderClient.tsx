'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import TextLink from '@/components/primitives/TextLink';
import CTAButton from '@/components/primitives/CTAButton';
import CopyEmail from '@/components/primitives/CopyEmail';
import ThemeToggle from '@/components/primitives/ThemeToggle.client';
import ArtSwapyLogo from '@/components/primitives/ArtSwapyLogo';
import { getLenis, scrollToHash } from '@/lib/motion/lenis';
import type { MailtoTemplate, NavLink } from '@/types/content';

interface HeaderProps {
  name: string;
  nav: NavLink[];
  cta: string;
  mailto: string;
  address: string;
  template: MailtoTemplate;
}

/* Keep the latest callback without re-subscribing observers. */
function useStableCallback<A extends unknown[]>(fn: (...args: A) => void) {
  const ref = useRef(fn);
  useEffect(() => {
    ref.current = fn;
  });
  return useCallback((...args: A) => ref.current(...args), []);
}

export default function HeaderClient({ name, nav, cta, mailto, address, template }: HeaderProps) {
  const [onInverse, setOnInverse] = useState(false);
  const [hideCta, setHideCta] = useState(false);
  const [current, setCurrent] = useState<string>('');
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const setInverse = useStableCallback((v: boolean) => setOnInverse(v));
  const setHide = useStableCallback((v: boolean) => setHideCta(v));
  const setCur = useStableCallback((v: string) => setCurrent(v));

  /* Ink switching: header takes data-on-inverse while an inverse section is under it. */
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-inverse-section]'));
    let io: IntersectionObserver | null = null;
    const build = () => {
      io?.disconnect();
      const live = new Set<Element>();
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => (e.isIntersecting ? live.add(e.target) : live.delete(e.target)));
          setInverse(live.size > 0);
        },
        // Trigger slightly ahead of the 64px header band so inverse ink cross-fades seamlessly
        { rootMargin: `0px 0px -${Math.max(0, window.innerHeight - 108)}px 0px` }
      );
      els.forEach((el) => io?.observe(el));
    };
    build();
    window.addEventListener('resize', build);
    return () => {
      window.removeEventListener('resize', build);
      io?.disconnect();
    };
  }, [setInverse]);

  /* Header action fades out while a tagged primary action is in view. */
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-primary-action]')).filter(
      (el) => !el.closest('header')
    );
    const live = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? live.add(e.target) : live.delete(e.target)));
      setHide(live.size > 0);
    });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [setHide]);

  /* Current section (nav threads stay drawn). */
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const live = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) live.set(e.target.id, e.intersectionRatio);
          else live.delete(e.target.id);
        });
        const top = ids.find((id) => live.has(id));
        setCur(top ? `#${top}` : '');
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [nav, setCur]);

  const openMenu = () => {
    const dlg = dialogRef.current;
    const trig = triggerRef.current;
    if (!dlg || !trig) return;
    const r = trig.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    dlg.showModal();
    setOpen(true);
    getLenis()?.stop();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      dlg.animate({ opacity: [0, 1] }, { duration: 240 });
      return;
    }
    dlg.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(150vmax at ${x}px ${y}px)`] },
      { duration: 420, easing: 'cubic-bezier(0.32, 0.72, 0, 1)' }
    );
    dlg.querySelectorAll<HTMLElement>('.menu-links a span').forEach((el, i) => {
      el.animate(
        { transform: ['translateY(105%)', 'translateY(0)'] },
        { duration: 400, delay: 120 + i * 50, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'backwards' }
      );
    });
  };

  const closeMenu = useCallback(() => {
    const dlg = dialogRef.current;
    if (!dlg || !dlg.open) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finish = () => {
      dlg.close();
      setOpen(false);
      getLenis()?.start();
      triggerRef.current?.focus();
    };
    if (reduce) return finish();
    const a = dlg.animate({ opacity: [1, 0] }, { duration: 260, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
    a.onfinish = finish;
  }, []);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      closeMenu();
    };
    dlg.addEventListener('cancel', onCancel);
    return () => {
      dlg.removeEventListener('cancel', onCancel);
      getLenis()?.start();
    };
  }, [closeMenu]);

  return (
    <header
      className="header"
      data-on-inverse={onInverse ? '' : undefined}
      data-hide-cta={hideCta ? '' : undefined}
    >
      <div className="header-bg" aria-hidden="true" />
      <div className="header-bg inverse" aria-hidden="true" />
      <div className="header-inner">
        <div className="wordmark-group">
          <TextLink href="#top" className="wordmark logo-link" ariaLabel={`${name}, back to top`}>
            <ArtSwapyLogo />
          </TextLink>
        </div>
        <nav aria-label="Primary" className="nav">
          {nav.map((n) => (
            <TextLink key={n.href} href={n.href} current={current === n.href}>
              {n.label}
            </TextLink>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <span className="header-cta">
            <CTAButton href={mailto} label={cta} size="sm" />
          </span>
          <button
            ref={triggerRef}
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="menu"
            onClick={openMenu}
          >
            Menu
          </button>
        </div>
      </div>

      <dialog id="menu" ref={dialogRef} className="menu" aria-label="Menu">
        <div className="menu-inner">
          <nav aria-label="Menu" className="menu-links">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="poster"
                onClick={(e) => {
                  e.preventDefault();
                  closeMenu();
                  window.setTimeout(() => scrollToHash(n.href), 280);
                }}
              >
                <span>{n.label}</span>
              </a>
            ))}
          </nav>
          <div className="menu-foot">
            <div className="menu-theme-row">
              <span className="eyebrow">Appearance</span>
              <ThemeToggle showLabel />
            </div>
            <CTAButton href={mailto} label={cta} block />
            <CopyEmail address={address} variant="button" template={template} />
          </div>
        </div>
        <button type="button" className="menu-close" onClick={closeMenu}>
          Close
        </button>
      </dialog>
    </header>
  );
}
