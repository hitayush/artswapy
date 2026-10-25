'use client';

import { useEffect, useRef } from 'react';
import CTAButton from '@/components/primitives/CTAButton';
import PlaceholderTag from '@/components/primitives/PlaceholderTag';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/motion/gsap';
import type { AboutStat } from '@/types/content';

interface AboutProps {
  heading?: string;
  tag?: string;
  name?: string;
  rolesLabel?: string;
  roles?: string[];
  story?: string[];
  statsLeft?: AboutStat[];
  statsRight?: AboutStat[];
  role?: string;
  location?: string;
  portrait?: { src: string; alt: string; placeholder?: boolean };
  mailtoHref?: string;
}

export default function AboutPin({
  name = 'Swapnil Gathibandhe',
  rolesLabel = 'WHAT I DO',
  roles = ['Founder', 'Brand Designer', 'Brand Strategist', 'Tech Creator'],
  story = [
    'For over a decade, I’ve been building brands from the ground up.',
    'I start with strategy, because clarity always comes before design.',
    'Then I craft identities, packaging and content that people notice.',
    'One person, one vision, from first meeting to final result.'
  ],
  statsLeft = [
    { number: '50+', label: 'Brand Consultations', subline: 'Founders guided to clarity' },
    { number: '500+', label: 'Logos Designed', subline: 'Marks built to last' }
  ],
  statsRight = [
    { number: '10+', label: 'Years of Experience', subline: 'Strategy, design & content' },
    { number: '3X', label: 'Growth Delivered', subline: 'For brands I’ve partnered with' }
  ],
  role = 'Brand Strategy Consultant & Brand Designer',
  portrait = {
    src: '/images/founder-image.png',
    alt: 'Portrait of Swapnil Gathibandhe, founder of ArtSwapy',
    placeholder: false
  },
  mailtoHref
}: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const gridLinesRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const namePlaneRef = useRef<HTMLDivElement>(null);
  const bgNameRef = useRef<HTMLDivElement>(null);
  const portraitFigureRef = useRef<HTMLElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const portraitDepthRef = useRef<HTMLDivElement>(null);
  const portraitImgRef = useRef<HTMLImageElement>(null);
  const colLeftRef = useRef<HTMLDivElement>(null);
  const colRightRef = useRef<HTMLDivElement>(null);
  const hasCountedRef = useRef(false);

  const animateCounters = () => {
    if (hasCountedRef.current) return;
    hasCountedRef.current = true;

    const section = sectionRef.current;
    if (!section) return;

    const statElements = section.querySelectorAll<HTMLElement>('.about-stat-val');
    if (!statElements || statElements.length === 0) return;

    statElements.forEach((el) => {
      const targetStr = el.getAttribute('data-target') || el.textContent?.trim() || '';
      const match = targetStr.match(/^(\d+)(.*)$/);
      if (!match) {
        el.textContent = targetStr;
        return;
      }

      const targetVal = parseInt(match[1], 10);
      const suffix = match[2] || '';
      const startTime = performance.now();
      const duration = 1200;

      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(targetVal * ease);
        el.textContent = `${current}${suffix}`;
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = targetStr;
        }
      };

      requestAnimationFrame(tick);
    });
  };

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      // Desktop: entrance scroll narrative on arrival with coordinate reveals
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const bgName = bgNameRef.current;
        const portraitImg = portraitImgRef.current;
        const rolesBox = colLeftRef.current?.querySelector('.about-roles-box');
        const bioBox = colRightRef.current?.querySelector('.about-bio-box');
        const statCards = section.querySelectorAll('.about-stat-card');
        const glowEl = glowRef.current;
        const gridLinesEl = gridLinesRef.current;

        if (!bgName || !portraitImg) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
            onEnter: () => animateCounters()
          }
        });

        // 0. Soft atmosphere reveal: fine architectural grid & ambient orange glow
        if (gridLinesEl) {
          tl.from(gridLinesEl, { opacity: 0, duration: 1, ease: 'power2.out' }, 0);
        }
        if (glowEl) {
          tl.from(glowEl, { opacity: 0, scale: 0.88, duration: 1.2, ease: 'power2.out' }, 0);
        }

        // 1. Reveal oversized name from behind portrait using clean clip/mask reveal
        tl.from(
          bgName,
          {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
            y: 32,
            opacity: 0,
            ease: 'power3.out',
            duration: 0.8
          },
          0.1
        );

        // 2. Bring portrait into focus with subtle scale grounded to the footer seam
        tl.from(
          portraitImg,
          {
            scale: 0.94,
            opacity: 0.6,
            transformOrigin: 'bottom center',
            ease: 'power3.out',
            duration: 0.8
          },
          0.15
        );

        // 3. Reveal left and right founder information panels moving outward from behind portrait
        if (rolesBox) {
          tl.from(
            rolesBox,
            {
              x: 28,
              opacity: 0,
              ease: 'power2.out',
              duration: 0.6
            },
            0.25
          );
        }

        if (bioBox) {
          tl.from(
            bioBox,
            {
              x: -28,
              opacity: 0,
              ease: 'power2.out',
              duration: 0.6
            },
            0.3
          );
        }

        // 4. Reveal the 4 statistic cards with restrained stagger
        if (statCards.length > 0) {
          tl.from(
            statCards,
            {
              y: 10,
              opacity: 0,
              stagger: 0.08,
              ease: 'power2.out',
              duration: 0.5
            },
            0.45
          );
        }

        // 5. Trigger odometer count-up inside the timeline sequence
        tl.call(animateCounters, [], 0.3);

        // If the section is already in view (e.g. refreshed at #about anchor), play immediately
        if (ScrollTrigger.isInViewport(section, 0.1)) {
          tl.play();
          animateCounters();
        }

        return () => {
          gsap.set([bgName, portraitImg], { clearProps: 'all' });
          if (gridLinesEl) gsap.set(gridLinesEl, { clearProps: 'all' });
          if (glowEl) gsap.set(glowEl, { clearProps: 'all' });
          if (rolesBox) gsap.set(rolesBox, { clearProps: 'all' });
          if (bioBox) gsap.set(bioBox, { clearProps: 'all' });
          if (statCards.length > 0) gsap.set(statCards, { clearProps: 'all' });
        };
      });

      // Mobile & tablet: unpinned, trigger counters once when section enters view
      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 75%',
          once: true,
          onEnter: () => animateCounters()
        });

        if (ScrollTrigger.isInViewport(section, 0.1)) {
          animateCounters();
        }
      });

      return () => {
        hasCountedRef.current = false;
        const statElements = section.querySelectorAll<HTMLElement>('.about-stat-val');
        statElements.forEach((el) => {
          const target = el.getAttribute('data-target');
          if (target) el.textContent = target;
        });
        mm.revert();
      };
    },
    { scope: sectionRef }
  );

  // Fallback counter trigger for non-GSAP environments
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      animateCounters();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Multiplane Depth & Interactive Portrait Orange Aura Follower
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isFinePointer = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isFinePointer || prefersReducedMotion) {
      return;
    }

    let rafId: number | null = null;
    let isIntersecting = false;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    // Portrait rim aura coordinates
    let targetAuraX = 180;
    let targetAuraY = 220;
    let currentAuraX = 180;
    let currentAuraY = 220;
    let isAuraActive = false;

    // Measure initial center of portrait figure
    if (portraitFigureRef.current) {
      const rect = portraitFigureRef.current.getBoundingClientRect();
      targetAuraX = rect.width / 2;
      targetAuraY = rect.height * 0.45;
      currentAuraX = targetAuraX;
      currentAuraY = targetAuraY;
    }

    const updateTransforms = () => {
      // Damped, silky interpolation (5% for background planes, 7.5% for responsive aura)
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      currentAuraX += (targetAuraX - currentAuraX) * 0.075;
      currentAuraY += (targetAuraY - currentAuraY) * 0.075;

      // Deepest background layer: Atmospheric orange glow (highest responsiveness)
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(calc(-50% + ${(currentX * 24).toFixed(2)}px), calc(-50% + ${(currentY * 18).toFixed(2)}px))`;
      }

      // Background architectural grid (gentle subtle shift)
      if (gridLinesRef.current) {
        gridLinesRef.current.style.transform = `translate(${(currentX * 8).toFixed(2)}px, ${(currentY * 6).toFixed(2)}px)`;
      }

      // Mid-depth plane: Oversized founder name typography
      if (namePlaneRef.current) {
        namePlaneRef.current.style.transform = `translate(${(currentX * 12).toFixed(2)}px, ${(currentY * 8).toFixed(2)}px)`;
      }

      // Foreground layer: Founder portrait (minimal horizontal shift only, perfectly grounded)
      if (portraitDepthRef.current) {
        portraitDepthRef.current.style.transform = `translate(${(currentX * 3.5).toFixed(2)}px, 0px)`;
      }

      // Interactive Rim-Light Aura directly behind portrait contours
      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${currentAuraX.toFixed(1)}px, ${currentAuraY.toFixed(1)}px, 0) translate(-50%, -50%)`;
      }

      // Continue rAF loop only while active to save frame budget and idle CPU
      const diff =
        Math.abs(targetX - currentX) +
        Math.abs(targetY - currentY) +
        Math.abs(targetAuraX - currentAuraX) +
        Math.abs(targetAuraY - currentAuraY);

      if (diff > 0.001 && isIntersecting) {
        rafId = requestAnimationFrame(updateTransforms);
      } else {
        rafId = null;
      }
    };

    const startLoop = () => {
      if (!rafId && isIntersecting) {
        rafId = requestAnimationFrame(updateTransforms);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isIntersecting) return;
      const rect = section.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;
      targetX = Math.max(-1, Math.min(1, (relX - 0.5) * 2));
      targetY = Math.max(-1, Math.min(1, (relY - 0.5) * 2));

      // Calculate cursor position relative to portrait figure
      if (portraitFigureRef.current) {
        const figRect = portraitFigureRef.current.getBoundingClientRect();
        const cursorX = e.clientX - figRect.left;
        const cursorY = e.clientY - figRect.top;

        // Bound spotlight target smoothly around portrait perimeter ("aju baju")
        const minX = -40;
        const maxX = figRect.width + 40;
        const minY = 20;
        const maxY = figRect.height - 20;

        targetAuraX = Math.max(minX, Math.min(maxX, cursorX));
        targetAuraY = Math.max(minY, Math.min(maxY, cursorY));

        if (auraRef.current && !isAuraActive) {
          isAuraActive = true;
          auraRef.current.style.opacity = '1';
        }
      }

      startLoop();
    };

    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
      if (portraitFigureRef.current) {
        const figRect = portraitFigureRef.current.getBoundingClientRect();
        targetAuraX = figRect.width / 2;
        targetAuraY = figRect.height * 0.45;
      }
      if (auraRef.current) {
        isAuraActive = false;
        auraRef.current.style.opacity = '0';
      }
      startLoop();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isIntersecting = Boolean(entry?.isIntersecting);
        if (!isIntersecting) {
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
        } else {
          startLoop();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    section.addEventListener('pointermove', onPointerMove, { passive: true });
    section.addEventListener('pointerleave', onPointerLeave, { passive: true });

    return () => {
      observer.disconnect();
      section.removeEventListener('pointermove', onPointerMove);
      section.removeEventListener('pointerleave', onPointerLeave);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="about" aria-labelledby="about-heading">
      <h2 id="about-heading" className="sr-only">
        {name} — {role}
      </h2>

      {/* Background Architectural Box Grid */}
      <div className="about-bg-grid" aria-hidden="true">
        <div className="about-bg-grid-lines" ref={gridLinesRef} />
      </div>

      {/* Atmospheric Soft Orange Glow behind founder */}
      <div className="about-glow" ref={glowRef} aria-hidden="true" />

      <div className="about-pin-wrap" ref={pinWrapRef}>
        {/* Oversized background typography layered behind founder portrait */}
        <div className="about-name-plane" ref={namePlaneRef} aria-hidden="true">
          <div className="about-bg-name" ref={bgNameRef}>
            <span className="about-name-line line-1">SWAPNIL</span>
            <span className="about-name-line line-2">GATHIBANDHE</span>
          </div>
        </div>

        {/* 3-Column Magazine / Stage Layout */}
        <div className="about-stage-grid">
          {/* Column 1 (Left): Roles + 2 Left Stat Cards */}
          <div className="about-col about-col-left" ref={colLeftRef}>
            <div className="about-roles-box">
              <span className="about-label-kicker">[ {rolesLabel} ]</span>
              <ul className="about-roles-list" aria-label="Professional roles">
                {roles.map((r, i) => (
                  <li key={r} className="about-role-item">
                    <span className="about-role-num mono">0{i + 1}</span>
                    <span className="about-role-title">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="about-stats-stack">
              {statsLeft.map((stat) => (
                <div key={stat.label} className="about-stat-card">
                  <div className="about-stat-head">
                    <span className="about-stat-val" data-target={stat.number}>
                      {stat.number}
                    </span>
                    <span className="about-stat-pip" aria-hidden="true" />
                  </div>
                  <div className="about-stat-body">
                    <strong className="about-stat-label">{stat.label}</strong>
                    {stat.subline && (
                      <span className="about-stat-subline">{stat.subline}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 (Center): Portrait Cutout with Dynamic Interactive Orange Aura */}
          <div className="about-col about-col-center">
            <figure className="about-portrait-figure" ref={portraitFigureRef}>
              {/* Interactive Dynamic Orange Rim-Light Aura */}
              <div className="about-portrait-aura" ref={auraRef} aria-hidden="true" />

              {portrait.placeholder ? (
                <div className="founder-ph-fill" role="img" aria-label={`${portrait.alt} (to come)`}>
                  <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
                    <rect width="400" height="500" fill="#ece9e1" />
                    <circle cx="200" cy="200" r="64" fill="#d8d3c6" />
                    <path d="M70 500c0-100 55-155 130-155s130 55 130 155z" fill="#d8d3c6" />
                  </svg>
                  <PlaceholderTag>Portrait to come</PlaceholderTag>
                </div>
              ) : (
                <div className="about-portrait-depth" ref={portraitDepthRef}>
                  <picture>
                    <source type="image/webp" srcSet="/images/founder-image.webp" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      ref={portraitImgRef}
                      src={portrait.src}
                      alt={portrait.alt}
                      width={2133}
                      height={3074}
                      loading="lazy"
                      decoding="async"
                      className="about-portrait-img"
                    />
                  </picture>
                </div>
              )}
            </figure>
          </div>

          {/* Column 3 (Right): Narrative Bio + CTA + 2 Right Stat Cards */}
          <div className="about-col about-col-right" ref={colRightRef}>
            <div className="about-bio-box">
              <span className="about-label-kicker">{role}</span>
              <div className="about-bio-story">
                {story.map((paragraph, i) => (
                  <p key={i} className={`about-bio-line ${i === 0 ? 'lead' : ''}`}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="about-cta-group">
                <CTAButton
                  href={mailtoHref ?? '#contact'}
                  label="— Start a conversation"
                  block
                />
                <p className="about-cta-subline small muted">
                  Direct collaboration · No account managers
                </p>
              </div>
            </div>

            <div className="about-stats-stack">
              {statsRight.map((stat) => (
                <div key={stat.label} className="about-stat-card">
                  <div className="about-stat-head">
                    <span className="about-stat-val" data-target={stat.number}>
                      {stat.number}
                    </span>
                    <span className="about-stat-pip" aria-hidden="true" />
                  </div>
                  <div className="about-stat-body">
                    <strong className="about-stat-label">{stat.label}</strong>
                    {stat.subline && (
                      <span className="about-stat-subline">{stat.subline}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
