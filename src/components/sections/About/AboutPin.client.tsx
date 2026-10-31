'use client';

import { useEffect, useRef } from 'react';
import CTAButton from '@/components/primitives/CTAButton';
import PlaceholderTag from '@/components/primitives/PlaceholderTag';
import { playCharHover, playSfx } from '@/lib/audio/sfx';
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

    const statsData = Array.from(statElements).map((el) => {
      const targetStr = el.getAttribute('data-target') || el.textContent?.trim() || '';
      const match = targetStr.match(/^(\d+)(.*)$/);
      return {
        el,
        targetStr,
        targetVal: match ? parseInt(match[1], 10) : null,
        suffix: match ? match[2] || '' : ''
      };
    });

    const startTime = performance.now();
    const duration = 1200;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      statsData.forEach((item) => {
        if (item.targetVal === null) {
          item.el.textContent = item.targetStr;
        } else {
          const current = Math.round(item.targetVal * ease);
          item.el.textContent = `${current}${item.suffix}`;
        }
      });

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        statsData.forEach((item) => {
          item.el.textContent = item.targetStr;
        });
        playSfx('hover');
      }
    };

    requestAnimationFrame(tick);
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

        // 0. Soft architectural grid & ambient orange atmosphere
        if (gridLinesEl) {
          tl.from(gridLinesEl, { opacity: 0, duration: 0.9, ease: 'power2.out' }, 0);
        }
        if (glowEl) {
          tl.from(glowEl, { opacity: 0, scale: 0.84, duration: 1.1, ease: 'power2.out' }, 0);
        }

        // 1. Staggered typographic entrance for oversized name lines
        const nameLines = bgName.querySelectorAll('.about-name-line');
        if (nameLines.length > 0) {
          tl.from(
            nameLines,
            {
              y: 45,
              opacity: 0,
              stagger: 0.1,
              duration: 0.85,
              ease: 'power3.out'
            },
            0.08
          );
        }

        // 2. Founder portrait emerges grounded with subtle scale & depth
        tl.from(
          portraitImg,
          {
            scale: 0.93,
            y: 44,
            opacity: 0,
            transformOrigin: 'bottom center',
            ease: 'power3.out',
            duration: 0.9
          },
          0.12
        );

        // 3. Left Column: Roles kicker and individual items staggered from left
        if (rolesBox) {
          const rolesKicker = rolesBox.querySelector('.about-label-kicker');
          if (rolesKicker) {
            tl.from(rolesKicker, { opacity: 0, x: -16, duration: 0.45, ease: 'power2.out' }, 0.2);
          }
          const roleItems = rolesBox.querySelectorAll('.about-role-item');
          tl.from(
            roleItems,
            {
              x: -26,
              opacity: 0,
              stagger: 0.07,
              duration: 0.55,
              ease: 'power2.out'
            },
            0.26
          );
        }

        // 4. Right Column: Bio kicker, paragraphs, and CTA button
        if (bioBox) {
          const bioKicker = bioBox.querySelector('.about-label-kicker');
          if (bioKicker) {
            tl.from(bioKicker, { opacity: 0, x: 16, duration: 0.45, ease: 'power2.out' }, 0.22);
          }
          const bioLines = bioBox.querySelectorAll('.about-bio-line');
          tl.from(
            bioLines,
            {
              y: 16,
              opacity: 0,
              stagger: 0.06,
              duration: 0.5,
              ease: 'power2.out'
            },
            0.28
          );
          const ctaGroup = bioBox.querySelector('.about-cta-group');
          if (ctaGroup) {
            tl.from(
              ctaGroup,
              {
                y: 18,
                opacity: 0,
                scale: 0.97,
                duration: 0.5,
                ease: 'power3.out'
              },
              0.42
            );
          }
        }

        // 5. Stat cards staggered upward glide
        if (statCards.length > 0) {
          tl.from(
            statCards,
            {
              y: 22,
              opacity: 0,
              scale: 0.96,
              stagger: 0.08,
              ease: 'power3.out',
              duration: 0.55
            },
            0.38
          );
        }

        // 6. Trigger odometer count-up as cards settle
        tl.call(animateCounters, [], 0.45);

        // If the section is already in view, play immediately
        if (ScrollTrigger.isInViewport(section, 0.1)) {
          tl.play();
          animateCounters();
        }

        return () => {
          gsap.set([bgName, portraitImg], { clearProps: 'all' });
          if (gridLinesEl) gsap.set(gridLinesEl, { clearProps: 'all' });
          if (glowEl) gsap.set(glowEl, { clearProps: 'all' });
          if (rolesBox) {
            gsap.set(rolesBox.querySelectorAll('.about-label-kicker, .about-role-item'), { clearProps: 'all' });
          }
          if (bioBox) {
            gsap.set(bioBox.querySelectorAll('.about-label-kicker, .about-bio-line, .about-cta-group'), { clearProps: 'all' });
          }
          if (statCards.length > 0) gsap.set(statCards, { clearProps: 'all' });
        };
      });

      // Mobile & tablet: unpinned, trigger staggered entrance once when section enters view
      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        const bgName = bgNameRef.current;
        const portraitImg = portraitImgRef.current;
        const rolesBox = colLeftRef.current?.querySelector('.about-roles-box');
        const bioBox = colRightRef.current?.querySelector('.about-bio-box');
        const statCards = section.querySelectorAll('.about-stat-card');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
            onEnter: () => animateCounters()
          }
        });

        if (bgName) {
          tl.from(bgName, { opacity: 0, y: 24, duration: 0.6, ease: 'power2.out' }, 0);
        }
        if (portraitImg) {
          tl.from(portraitImg, { opacity: 0, y: 30, scale: 0.94, duration: 0.7, ease: 'power3.out' }, 0.1);
        }
        if (rolesBox) {
          const items = rolesBox.querySelectorAll('.about-role-item');
          tl.from(items, { opacity: 0, x: -18, stagger: 0.06, duration: 0.5, ease: 'power2.out' }, 0.22);
        }
        if (bioBox) {
          tl.from(bioBox, { opacity: 0, y: 18, duration: 0.5, ease: 'power2.out' }, 0.32);
        }
        if (statCards.length > 0) {
          tl.from(statCards, { opacity: 0, y: 18, scale: 0.96, stagger: 0.06, duration: 0.5, ease: 'power3.out' }, 0.4);
        }

        if (ScrollTrigger.isInViewport(section, 0.1)) {
          tl.play();
          animateCounters();
        }

        return () => {
          if (bgName) gsap.set(bgName, { clearProps: 'all' });
          if (portraitImg) gsap.set(portraitImg, { clearProps: 'all' });
          if (rolesBox) gsap.set(rolesBox.querySelectorAll('.about-role-item'), { clearProps: 'all' });
          if (bioBox) gsap.set(bioBox, { clearProps: 'all' });
          if (statCards.length > 0) gsap.set(statCards, { clearProps: 'all' });
        };
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
            <span className="about-name-line line-1">
              {(name.trim().split(/\s+/)[0] || 'SWAPNIL').split('').map((ch, i) => {
                const fName = name.trim().split(/\s+/)[0] || 'SWAPNIL';
                const lName = name.trim().split(/\s+/).slice(1).join(' ') || 'GATHIBANDHE';
                const total = fName.length + lName.length;
                return (
                  <span
                    key={i}
                    className="about-name-char"
                    onPointerEnter={() => playCharHover(i, total)}
                  >
                    {ch}
                  </span>
                );
              })}
            </span>
            <span className="about-name-line line-2">
              {(name.trim().split(/\s+/).slice(1).join(' ') || 'GATHIBANDHE').split('').map((ch, i) => {
                const fName = name.trim().split(/\s+/)[0] || 'SWAPNIL';
                const lName = name.trim().split(/\s+/).slice(1).join(' ') || 'GATHIBANDHE';
                const total = fName.length + lName.length;
                return (
                  <span
                    key={i}
                    className="about-name-char"
                    onPointerEnter={() => playCharHover(fName.length + i, total)}
                  >
                    {ch}
                  </span>
                );
              })}
            </span>
          </div>
        </div>

        {/* 3-Column Magazine / Stage Layout */}
        <div className="about-stage-grid">
          {/* Top Left: What I Do */}
          <div className="about-col-left-top" ref={colLeftRef}>
            <div className="about-roles-box">
              <span className="about-label-kicker">[ {rolesLabel} ]</span>
              <ul className="about-roles-list" aria-label="Professional roles">
                {roles.map((r, i) => (
                  <li
                    key={r}
                    className="about-role-item"
                    tabIndex={0}
                    onPointerEnter={() => playSfx('hover')}
                  >
                    <span className="about-role-num mono">0{i + 1}</span>
                    <span className="about-role-title">{r}</span>
                    <span className="about-role-arrow" aria-hidden="true">→</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Center Column: Portrait Cutout with Dynamic Interactive Orange Aura */}
          <div className="about-col-center">
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

          {/* Top Right: Narrative Bio + CTA */}
          <div className="about-col-right-top" ref={colRightRef}>
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
          </div>

          {/* Bottom Left: Left Metric Cards */}
          <div className="about-col-left-bottom">
            <div className="about-stats-stack">
              {statsLeft.map((stat) => (
                <div
                  key={stat.label}
                  className="about-stat-card"
                  tabIndex={0}
                  onPointerEnter={() => playSfx('hover')}
                >
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

          {/* Bottom Right: Right Metric Cards */}
          <div className="about-col-right-bottom">
            <div className="about-stats-stack">
              {statsRight.map((stat) => (
                <div
                  key={stat.label}
                  className="about-stat-card"
                  tabIndex={0}
                  onPointerEnter={() => playSfx('hover')}
                >
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
