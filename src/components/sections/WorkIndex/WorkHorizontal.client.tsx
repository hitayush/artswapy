'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/motion/gsap';
import Mark from '@/components/primitives/Mark';
import PlaceholderTag from '@/components/primitives/PlaceholderTag';
import CTAButton from '@/components/primitives/CTAButton';
import { mailto } from '@/lib/mailto';
import type { MailtoTemplate, Project } from '@/types/content';

interface Props {
  projects: Project[];
  to: string;
  enquiry: { subjectPrefix: string; body: string };
  heading: string;
}

export default function WorkHorizontal({ projects, to, enquiry, heading }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        const getDistance = () => (track ? Math.max(0, track.scrollWidth - window.innerWidth) : 0);

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            pinSpacing: true,
            scrub: 0.6,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            invalidateOnRefresh: true,
            refreshPriority: 5,
            anticipatePin: 1,
            fastScrollEnd: true,
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.style.width = `${Math.round(self.progress * 100)}%`;
              }
              // Update active index directly on DOM to prevent React re-renders during scrub
              if (counterRef.current) {
                const idx = Math.min(
                  projects.length,
                  Math.max(1, Math.round(self.progress * (projects.length + 1)))
                );
                counterRef.current.textContent = `[ ${String(idx).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')} ]`;
              }
            }
          }
        });

        const refresh = () => {
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        };

        window.addEventListener('resize', refresh);
        window.addEventListener('orientationchange', refresh);
        document.fonts?.ready.then(refresh);

        // Re-measure once project images finish loading
        const images = track.querySelectorAll('img');
        images.forEach((img) => {
          if (!img.complete) {
            img.addEventListener('load', refresh, { once: true });
          }
        });

        ScrollTrigger.sort();
        ScrollTrigger.refresh();

        return () => {
          window.removeEventListener('resize', refresh);
          window.removeEventListener('orientationchange', refresh);
          images.forEach((img) => img.removeEventListener('load', refresh));
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(track, { clearProps: 'transform' });
        };
      });

      mm.add('(max-width: 899px), (prefers-reduced-motion: reduce)', () => {
        const track = trackRef.current;
        if (track) gsap.set(track, { clearProps: 'transform' });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [projects.length] }
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="work-horizontal-section"
      aria-label="Selected Work Showcase"
    >
      {/* Top sticky bar inside pinned section */}
      <div className="work-h-topbar">
        <div className="work-h-meta">
          <span className="ph-tag orange-tag">[ ✦ SELECTED WORK ]</span>
          <span ref={counterRef} className="small muted mono">[ 01 / {String(projects.length).padStart(2, '0')} ]</span>
        </div>
        <div className="work-h-cue small mono">
          <span className="hide-mobile">Scroll to explore</span>
          <span className="show-mobile-inline">Swipe to explore</span>{' '}
          <span className="arrow-cue">→</span>
        </div>
      </div>

      {/* The horizontal scrolling track */}
      <div className="work-h-viewport">
        <div ref={trackRef} className="work-h-track">
          {/* Slide 0: Intro Header Card (desktop panoramic lead-in) */}
          <article className="work-h-card work-h-intro-card hide-mobile">
            <div className="intro-card-inner">
              <div className="intro-badge-row">
                <span className="ph-tag orange-tag">[ ✦ SELECTED WORK ]</span>
                <span className="small muted mono">01 / {String(projects.length).padStart(2, '0')}</span>
              </div>
              <h2 className="heading work-h-heading">
                Strategic Craft.<br />Distinctive Brands.
              </h2>
              <p className="body muted work-h-intro-body">
                A curated selection of identities, packaging systems, and digital architectures built for founders ready to stand out.
              </p>
              <div className="work-h-scroll-hint">
                <span className="small mono">Explore work</span>
                <span className="arrow-thread" aria-hidden="true">→</span>
              </div>
            </div>
          </article>

          {/* Project Cards (Dzinr Studio signature scale) */}
          {projects.map((p, i) => {
            const isFeatured = p.id === 'good-habit' || p.id === 'dhara';
            return (
              <article
                className={`work-h-card work-h-project-card ${isFeatured ? 'card-featured' : ''}`.trim()}
                key={p.id}
                style={{
                  '--card-bg': p.theme?.bg ?? '#161614',
                  '--card-ink': p.theme?.text ?? '#f6f4ef',
                  '--card-accent': p.theme?.accent ?? '#ff551f',
                } as React.CSSProperties}
              >
                <div className="project-card-frame">
                  {p.href ? (
                    <a
                      href={p.href}
                      className="project-frame-link"
                      aria-label={`View ${p.name} case study`}
                    >
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.preview.alt}
                          className="project-card-photo"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="project-card-image" role="img" aria-label={p.preview.alt}>
                          <Mark id={p.preview.mark} />
                        </div>
                      )}
                    </a>
                  ) : p.image ? (
                    <img
                      src={p.image}
                      alt={p.preview.alt}
                      className="project-card-photo"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="project-card-image" role="img" aria-label={p.preview.alt}>
                      <Mark id={p.preview.mark} />
                    </div>
                  )}
                  <div className="project-frame-tag mono">
                    [ 0{i + 1} ] {p.placeholder && <span style={{ marginLeft: 6 }}><PlaceholderTag>Concept</PlaceholderTag></span>}
                  </div>
                </div>

                <div className="project-card-content">
                  {/* 3-Column Metadata Row matching Dzinr Studio */}
                  <div className="project-meta-bar">
                    <span className="project-year-badge mono">[ {p.year} ]</span>
                    <span className="project-category-center mono">{p.category}</span>
                    <span className="project-discipline-right mono">{p.discipline ?? 'Brand & Identity'}</span>
                  </div>

                  {/* Monumental Title Row */}
                  <div className="project-title-row">
                    <div className="project-title-group">
                      <h3 className="project-title-monument">
                        {p.href ? (
                          <a href={p.href} className="project-title-link">
                            {p.name}
                          </a>
                        ) : (
                          p.name
                        )}
                      </h3>
                      <p className="project-summary-line">{p.summary}</p>
                    </div>
                    <a
                      href={p.href ?? mailto({ to, subject: enquiry.subjectPrefix + p.name, body: enquiry.body } satisfies MailtoTemplate)}
                      className="project-circle-btn"
                      aria-label={p.href ? `View ${p.name} case study` : `Start a project like ${p.name}`}
                    >
                      <span className="circle-arrow" aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}

          {/* Outro / Next Section Bridge Card */}
          <article className="work-h-card work-h-outro-card">
            <div className="outro-card-inner">
              <span className="ph-tag orange-tag">[ ✦ NEXT STAGE ]</span>
              <h3 className="heading work-h-outro-title">
                Ready to build your brand?
              </h3>
              <p className="body muted work-h-outro-body">
                From positioning and naming to visual identity and digital touchpoints — let&apos;s build something unforgettable.
              </p>
              <div className="work-h-outro-action">
                <CTAButton href="#services" label="Explore Capabilities" />
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* Real-time horizontal progress thread */}
      <div className="work-h-bottom-bar">
        <div className="work-h-progress-track">
          <div ref={progressRef} className="work-h-progress-fill" />
        </div>
      </div>
    </section>
  );
}
