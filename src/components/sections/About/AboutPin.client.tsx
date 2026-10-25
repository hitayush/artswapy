'use client';

import { useRef } from 'react';
import RevealRoot from '@/components/primitives/RevealRoot';
import CTAButton from '@/components/primitives/CTAButton';
import PlaceholderTag from '@/components/primitives/PlaceholderTag';
import { gsap, useGSAP } from '@/lib/motion/gsap';
import type { AboutStat } from '@/types/content';

interface AboutProps {
  heading?: string;
  tag?: string;
  name: string;
  rolesLabel?: string;
  roles?: string[];
  story?: string[];
  statsLeft?: AboutStat[];
  statsRight?: AboutStat[];
  role: string;
  location?: string;
  lead?: string;
  bio?: { text: string; placeholder?: boolean };
  portrait: { src: string; alt: string; placeholder?: boolean };
  mailtoHref?: string;
}

const idx = (i: number) => ({ '--i': i }) as React.CSSProperties;

export default function AboutPin({
  tag = 'THE PERSON BEHIND ARTSWAPY',
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
  location = 'Nagpur, India · Working Worldwide',
  portrait,
  mailtoHref
}: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stagePlateRef = useRef<HTMLDivElement>(null);
  const portraitImgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const img = portraitImgRef.current;
      if (!section || !img) return;

      const mm = gsap.matchMedia();

      // Desktop parallax on the founder cutout relative to stage plate
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          img,
          { y: 24, scale: 0.98 },
          {
            y: -20,
            scale: 1.02,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
              fastScrollEnd: true
            }
          }
        );

        return () => {
          gsap.set(img, { clearProps: 'transform' });
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="about" className="about" aria-labelledby="about-title">
      <RevealRoot className="about-container">
        {/* Top Kicker Bar */}
        <div className="about-kicker-row">
          <span className="eyebrow" data-r="rise" style={idx(0)}>
            [ {tag} ]
          </span>
          <span className="small muted about-location-tag" data-r="rise" style={idx(1)}>
            {location}
          </span>
        </div>

        {/* Section Title Header */}
        <div className="about-header-row" data-r="rise" style={idx(1)}>
          <div className="about-title-group">
            <h2 id="about-title" className="poster about-heading">
              <span>{name}</span>
            </h2>
            <p className="about-role-lead mono">{role}</p>
          </div>
        </div>

        {/* 3-Column Magazine / Founder Stage Layout */}
        <div className="about-stage-grid">
          {/* Column 1 (Left): What I Do (Roles) + Left Stat Cards */}
          <div className="about-col-left" data-r="rise" style={idx(2)}>
            <div className="about-roles-section">
              <span className="eyebrow about-sub-kicker">[ {rolesLabel} ]</span>
              <ul className="about-roles-list" aria-label="Professional roles">
                {roles.map((r, i) => (
                  <li key={r} className="about-role-item">
                    <span className="role-index mono">0{i + 1}</span>
                    <span className="role-title">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="about-stats-stack">
              {statsLeft.map((stat, i) => (
                <div key={stat.label} className="about-stat-card" style={idx(i + 2)}>
                  <div className="about-stat-top">
                    <strong className="about-stat-num">{stat.number}</strong>
                    <span className="about-stat-dot" aria-hidden="true" />
                  </div>
                  <div className="about-stat-meta">
                    <span className="about-stat-label">{stat.label}</span>
                    {stat.subline && (
                      <span className="about-stat-subline small muted">{stat.subline}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 (Center): Founder Photo Stage with Architectural Typographic Backdrop */}
          <div className="about-col-center" data-r="rise" style={idx(3)}>
            <div className="founder-stage-plate" ref={stagePlateRef}>
              {/* Subtle background typography watermark inspired by poster reference */}
              <div className="founder-stage-watermark" aria-hidden="true">
                <span className="watermark-line line-1">SWAPNIL</span>
                <span className="watermark-line line-2">GATHIBANDHE</span>
              </div>

              {/* Pedestal backdrop gradient and architectural frame */}
              <div className="founder-stage-pedestal" aria-hidden="true" />

              {/* Founder Cutout Figure */}
              <figure className="founder-stage-figure">
                {portrait.placeholder ? (
                  <div className="founder-ph-fill" role="img" aria-label={`${portrait.alt} (to come)`}>
                    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
                      <rect width="400" height="500" fill="#ece9e1" />
                      <circle cx="200" cy="200" r="64" fill="#d8d3c6" />
                      <path d="M70 500c0-100 55-155 130-155s130 55 130 155z" fill="#d8d3c6" />
                    </svg>
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    ref={portraitImgRef}
                    src={portrait.src}
                    alt={portrait.alt}
                    width={880}
                    height={1100}
                    loading="lazy"
                    decoding="async"
                    className="founder-cutout-img"
                  />
                )}
                {portrait.placeholder && <PlaceholderTag>Portrait to come</PlaceholderTag>}
              </figure>

              {/* Grounding Base Label */}
              <div className="founder-stage-bottom-bar mono" aria-hidden="true">
                <span className="founder-base-dot" />
                <span className="founder-base-title">{name}</span>
                <span className="founder-base-sep">/</span>
                <span className="founder-base-desc">Founder &amp; Lead Designer</span>
              </div>
            </div>
          </div>

          {/* Column 3 (Right): Narrative Story + Right Stat Cards + CTA */}
          <div className="about-col-right" data-r="rise" style={idx(4)}>
            <div className="about-story-section">
              <span className="eyebrow about-sub-kicker">[ THE PHILOSOPHY ]</span>
              <div className="about-story-paragraphs">
                {story.map((paragraph, i) => (
                  <p key={i} className={`about-story-para ${i === 0 ? 'lead-para' : ''}`}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="about-stats-stack">
              {statsRight.map((stat, i) => (
                <div key={stat.label} className="about-stat-card" style={idx(i + 4)}>
                  <div className="about-stat-top">
                    <strong className="about-stat-num">{stat.number}</strong>
                    <span className="about-stat-dot" aria-hidden="true" />
                  </div>
                  <div className="about-stat-meta">
                    <span className="about-stat-label">{stat.label}</span>
                    {stat.subline && (
                      <span className="about-stat-subline small muted">{stat.subline}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Contact Action */}
            <div className="about-cta-box">
              <CTAButton
                href={mailtoHref ?? 'mailto:swapnilgathibandhe2494@gmail.com'}
                label="Start a conversation"
                block
              />
              <span className="small muted about-cta-note">
                Direct collaboration · No account managers
              </span>
            </div>
          </div>
        </div>
      </RevealRoot>
    </section>
  );
}
