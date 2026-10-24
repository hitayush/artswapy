'use client';

import { useRef } from 'react';
import RevealRoot from '@/components/primitives/RevealRoot';
import CTAButton from '@/components/primitives/CTAButton';
import PlaceholderTag from '@/components/primitives/PlaceholderTag';
import { gsap, useGSAP } from '@/lib/motion/gsap';

interface AboutPrinciple {
  num: string;
  title: string;
  body: string;
}

interface AboutProps {
  heading: string;
  tag?: string;
  name: string;
  role: string;
  location?: string;
  lead: string;
  bio: { text: string; placeholder?: boolean };
  principles?: AboutPrinciple[];
  disciplines?: string[];
  portrait: { src: string; alt: string; placeholder?: boolean };
  mailtoHref?: string;
}

const idx = (i: number) => ({ '--i': i }) as React.CSSProperties;

export default function About({
  tag = 'ABOUT THE FOUNDER',
  name,
  role,
  location = 'Nagpur, India · Working Worldwide',
  lead,
  bio,
  principles = [],
  disciplines = [],
  portrait,
  mailtoHref
}: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitImgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const img = portraitImgRef.current;
      if (!section || !img) return;

      const mm = gsap.matchMedia();

      // DESIGN.md §4.4: Portrait drift — image is 112% height inside frame and translates 0 -> -8% with scroll
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.set(img, { height: '112%', yPercent: 0 });
        gsap.to(img, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
            fastScrollEnd: true
          }
        });

        return () => {
          gsap.set(img, { clearProps: 'height,transform' });
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="about" className="about" aria-labelledby="about-title">
      <RevealRoot className="about-container">
        {/* Section kicker */}
        <div className="about-kicker-row">
          <span className="eyebrow" data-r="rise" style={idx(0)}>
            [ {tag} ]
          </span>
          <span className="small muted about-location-tag" data-r="rise" style={idx(1)}>
            {location}
          </span>
        </div>

        <div className="about-grid">
          {/* Left Column: Narrative, Philosophy, Principles */}
          <div className="about-content">
            <h2 id="about-title" className="poster about-heading" data-r="lines">
              <span>{name}</span>
            </h2>
            <div className="about-role-wrap" data-r="rise" style={idx(1)}>
              <span className="about-role">{role}</span>
              <span className="about-lead-text">{lead}</span>
            </div>

            <div className="about-bio-block" data-r="rise" style={idx(2)}>
              <p className="about-bio-text">
                {bio.text} {bio.placeholder && <PlaceholderTag>Placeholder</PlaceholderTag>}
              </p>
            </div>

            {/* Studio Principles */}
            {principles.length > 0 && (
              <div className="about-principles-block" data-r="rise" style={idx(3)}>
                <h3 className="eyebrow about-principles-title">[ STUDIO PHILOSOPHY ]</h3>
                <div className="about-principles-list">
                  {principles.map((p) => (
                    <div key={p.num} className="about-principle-item">
                      <div className="principle-head">
                        <span className="principle-num">{p.num}</span>
                        <h4 className="principle-title">{p.title}</h4>
                      </div>
                      <p className="principle-body small muted">{p.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Direct CTA */}
            <div className="about-cta-row" data-r="rise" style={idx(4)}>
              <CTAButton
                href={mailtoHref ?? 'mailto:swapnilgathibandhe2494@gmail.com'}
                label="Start a conversation"
              />
              <span className="small muted">Direct collaboration · No account managers</span>
            </div>
          </div>

          {/* Right Column: Framed Portrait & Badges */}
          <div className="about-sidebar" data-r="rise" style={idx(2)}>
            <div className="about-portrait-card">
              <figure className="about-portrait-figure">
                <div className="shutter" data-r="shutter">
                  {portrait.placeholder ? (
                    <div className="ph-fill" role="img" aria-label={`${portrait.alt} (to come)`}>
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
                      className="about-portrait-img"
                    />
                  )}
                  {portrait.placeholder && <PlaceholderTag>Portrait to come</PlaceholderTag>}
                </div>
              </figure>

              <div className="about-portrait-meta">
                <div className="portrait-meta-header">
                  <strong className="portrait-founder-name">{name}</strong>
                  <span className="small muted portrait-founder-role">{role}</span>
                </div>
                {disciplines.length > 0 && (
                  <div className="about-disciplines-wrap">
                    <span className="eyebrow portrait-disc-label">SPECIALISMS</span>
                    <ul className="about-disciplines-list">
                      {disciplines.map((d) => (
                        <li key={d} className="discipline-tag">
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="portrait-card-footer small muted">
                  <span>Based in Nagpur</span>
                  <span>·</span>
                  <span>Working Globally</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealRoot>
    </section>
  );
}
