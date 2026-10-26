'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/motion/gsap';
import { getLenis } from '@/lib/motion/lenis';
import Mark from '@/components/primitives/Mark';
import PlaceholderTag from '@/components/primitives/PlaceholderTag';
import CTAButton from '@/components/primitives/CTAButton';
import { mailto } from '@/lib/mailto';
import type { MailtoTemplate, Project } from '@/types/content';

interface Props {
  projects: Project[];
  to: string;
  sectionHeading?: string;
  supportingHeading?: string;
  description?: string;
  tag?: string;
  heading?: string;
  body?: string;
  enquiry: { subjectPrefix: string; body: string };
  nextStep: {
    tag: string;
    headline: string;
    body: string;
    button: string;
  };
}

export default function WorkHorizontal({
  projects,
  to,
  sectionHeading,
  supportingHeading,
  description,
  tag,
  heading,
  body,
  enquiry,
  nextStep
}: Props) {
  const finalSectionHeading = sectionHeading ?? tag ?? 'Case studies';
  const finalSupportingHeading = supportingHeading ?? heading ?? 'Where Strategy Takes Shape.';
  const finalDescription =
    description ??
    body ??
    'From the first question to the final mark, see how clear thinking becomes a brand you can’t ignore.';

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Keyboard accessibility: align pinned track when tabbing into off-screen cards
  const handleFocusCapture = (e: React.FocusEvent) => {
    const target = e.target as HTMLElement;
    const card = target.closest('.work-h-card') as HTMLElement | null;
    const track = trackRef.current;
    if (!card || !track) return;

    const st = ScrollTrigger.getById('work-scroll');
    if (st) {
      const maxDistance = track.scrollWidth - window.innerWidth;
      if (maxDistance > 0) {
        const cardOffset = card.offsetLeft;
        const progress = Math.min(1, Math.max(0, cardOffset / maxDistance));
        const scrollPos = st.start + (st.end - st.start) * progress;
        window.scrollTo({ top: scrollPos, behavior: 'smooth' });
      }
    }
  };

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
            id: 'work-scroll',
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
            }
          }
        });

        // Editorial text reveal on intro card
        gsap.fromTo(
          ['.work-h-section-heading', '.work-h-supporting-heading', '.work-h-intro-body', '.work-h-scroll-hint'],
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              once: true
            }
          }
        );

        // Horizontal trackpad gesture support (swiping sideways converts to vertical scroll through Lenis)
        const onWheel = (e: WheelEvent) => {
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 4) {
            const lenis = getLenis();
            if (lenis) {
              lenis.scrollTo(lenis.scroll + e.deltaX, { immediate: true });
            } else {
              window.scrollBy({ top: e.deltaX, behavior: 'auto' });
            }
          }
        };
        section.addEventListener('wheel', onWheel, { passive: true });

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
          section.removeEventListener('wheel', onWheel);
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
      aria-label="Case Studies Showcase"
    >
      {/* The horizontal scrolling track */}
      <div className="work-h-viewport">
        <div ref={trackRef} className="work-h-track" onFocusCapture={handleFocusCapture}>
          {/* Slide 0: Intro Header Card */}
          <article className="work-h-card work-h-intro-card" aria-label="Case studies introduction">
            <div className="intro-card-inner">
              <div className="intro-top-block">
                <div className="intro-title-block">
                  <h2 className="work-h-section-heading">{finalSectionHeading}</h2>
                  <p className="work-h-supporting-heading">{finalSupportingHeading}</p>
                  <p className="body muted work-h-intro-body">{finalDescription}</p>
                </div>
              </div>

              <div className="work-h-scroll-hint small mono">
                <span className="hide-mobile">Scroll to explore</span>
                <span className="show-mobile-inline">Swipe to explore</span>
                <span className="arrow-thread" aria-hidden="true">→</span>
              </div>
            </div>
          </article>

          {/* Project Cards */}
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
                <div className="project-card-frame" data-cursor="explore">
                  {p.href ? (
                    <Link
                      href={p.href}
                      className="project-frame-link"
                      data-cursor="explore"
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
                    </Link>
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
                  {/* 3-Column Metadata Row */}
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
                          <Link href={p.href} className="project-title-link">
                            {p.name}
                          </Link>
                        ) : (
                          p.name
                        )}
                      </h3>
                      <p className="project-summary-line">{p.summary}</p>
                    </div>
                    {p.href ? (
                      <Link
                        href={p.href}
                        className="project-circle-btn"
                        aria-label={`View ${p.name} case study`}
                      >
                        <span className="circle-arrow" aria-hidden="true">↗</span>
                      </Link>
                    ) : (
                      <a
                        href={mailto({ to, subject: enquiry.subjectPrefix + p.name, body: enquiry.body } satisfies MailtoTemplate)}
                        className="project-circle-btn"
                        aria-label={`Start a project like ${p.name}`}
                      >
                        <span className="circle-arrow" aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}

          {/* Outro / Next Section Bridge Card */}
          <article className="work-h-card work-h-outro-card" aria-label="Next steps">
            <div className="outro-card-inner">
              <div className="outro-top-block">
                <span className="eyebrow work-outro-kicker mono">{nextStep.tag}</span>
                <h3 className="heading work-h-outro-title">{nextStep.headline}</h3>
                <p className="body muted work-h-outro-body">{nextStep.body}</p>
              </div>
              <div className="work-h-outro-action">
                <CTAButton href="#contact" label={nextStep.button} />
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
