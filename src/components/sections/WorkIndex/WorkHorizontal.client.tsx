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
    heading?: [string, string];
    body: string;
    button: string;
  };
}

export default function WorkHorizontal({
  projects,
  to,
  sectionHeading,
  tag,
  enquiry,
  nextStep
}: Props) {
  const finalSectionHeading = sectionHeading ?? tag ?? 'Case studies';

  const outroHeadingLines: [string, string] = nextStep.heading ?? (
    nextStep.headline.includes('?')
      ? [
          nextStep.headline.slice(0, nextStep.headline.indexOf('?') + 1).trim(),
          nextStep.headline.slice(nextStep.headline.indexOf('?') + 1).trim()
        ]
      : [nextStep.headline, '']
  );


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

        // Card 0: Smooth scroll-linked entrance as section scrolls into view
        const projectCards = Array.from(track.querySelectorAll<HTMLElement>('.work-h-project-card'));
        const card0 = projectCards[0];
        if (card0) {
          const maskWrap0 = card0.querySelector<HTMLElement>('.project-mask-wrap');
          const photoAnim0 = card0.querySelector<HTMLElement>('.project-photo-anim');
          const metaBar0 = card0.querySelector<HTMLElement>('.project-meta-bar');
          const titleMonument0 = card0.querySelector<HTMLElement>('.project-title-monument');
          const summary0 = card0.querySelector<HTMLElement>('.project-summary-line');
          const circleBtn0 = card0.querySelector<HTMLElement>('.project-circle-btn');
          const tag0 = card0.querySelector<HTMLElement>('.project-frame-tag');

          const tl0 = gsap.timeline({
            scrollTrigger: {
              id: 'work-card-0',
              trigger: section,
              start: 'top 80%',
              end: 'top top',
              scrub: 0.6,
              fastScrollEnd: true,
            }
          });

          if (maskWrap0) {
            tl0.fromTo(
              maskWrap0,
              { clipPath: 'inset(60% 0% 0% 0%)', opacity: 0.35 },
              { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, ease: 'power2.out', duration: 1 },
              0
            );
          }
          if (photoAnim0) {
            tl0.fromTo(
              photoAnim0,
              { y: 36, scale: 1.06 },
              { y: 0, scale: 1.0, ease: 'power2.out', duration: 1 },
              0
            );
          }
          if (metaBar0) {
            tl0.fromTo(metaBar0, { opacity: 0, y: 16 }, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.8 }, 0.15);
          }
          if (titleMonument0) {
            tl0.fromTo(titleMonument0, { opacity: 0, y: 24 }, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.85 }, 0.2);
          }
          if (summary0) {
            tl0.fromTo(summary0, { opacity: 0, y: 14 }, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.8 }, 0.25);
          }
          if (circleBtn0) {
            tl0.fromTo(circleBtn0, { opacity: 0, scale: 0.88, y: 14 }, { opacity: 1, scale: 1, y: 0, ease: 'power2.out', duration: 0.8 }, 0.3);
          }
          if (tag0) {
            tl0.fromTo(tag0, { opacity: 0, y: -8 }, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.7 }, 0.15);
          }
        }

        // Subsequent Cards (Index 1+): Scroll-linked entrance scrubbed horizontally as each card enters from the right
        const subsequentCards = projectCards.slice(1);
        subsequentCards.forEach((card, idx) => {
          const maskWrap = card.querySelector<HTMLElement>('.project-mask-wrap');
          const photoAnim = card.querySelector<HTMLElement>('.project-photo-anim');
          const metaBar = card.querySelector<HTMLElement>('.project-meta-bar');
          const titleMonument = card.querySelector<HTMLElement>('.project-title-monument');
          const summaryLine = card.querySelector<HTMLElement>('.project-summary-line');
          const circleBtn = card.querySelector<HTMLElement>('.project-circle-btn');
          const frameTag = card.querySelector<HTMLElement>('.project-frame-tag');

          const cardTl = gsap.timeline({
            scrollTrigger: {
              id: `work-card-${idx + 1}`,
              trigger: card,
              containerAnimation: tween,
              start: 'left 98%',
              end: 'left 20%',
              scrub: 0.6,
              fastScrollEnd: true,
            }
          });

          // 1. Reveal image from below with clean mask/crop transition
          if (maskWrap) {
            cardTl.fromTo(
              maskWrap,
              { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.2 },
              { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, ease: 'power2.out', duration: 1 },
              0
            );
          }

          // 2. Subtle upward movement and scale settle (sharp and undistorted at scale: 1)
          if (photoAnim) {
            cardTl.fromTo(
              photoAnim,
              { y: 44, scale: 1.07 },
              { y: 0, scale: 1.0, ease: 'power2.out', duration: 1 },
              0
            );
          }

          // 3. Reveal project year, category, and title in sync with image
          if (metaBar) {
            cardTl.fromTo(
              metaBar,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, ease: 'power2.out', duration: 0.8 },
              0.15
            );
          }

          if (titleMonument) {
            cardTl.fromTo(
              titleMonument,
              { opacity: 0, y: 28 },
              { opacity: 1, y: 0, ease: 'power2.out', duration: 0.85 },
              0.2
            );
          }

          if (summaryLine) {
            cardTl.fromTo(
              summaryLine,
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, ease: 'power2.out', duration: 0.8 },
              0.25
            );
          }

          if (circleBtn) {
            cardTl.fromTo(
              circleBtn,
              { opacity: 0, scale: 0.85, y: 16 },
              { opacity: 1, scale: 1.0, y: 0, ease: 'power2.out', duration: 0.8 },
              0.3
            );
          }

          if (frameTag) {
            cardTl.fromTo(
              frameTag,
              { opacity: 0, y: -10 },
              { opacity: 1, y: 0, ease: 'power2.out', duration: 0.7 },
              0.15
            );
          }
        });

        // Outro / Next Section Bridge Card: subtle entrance reveal
        const outroCard = track.querySelector<HTMLElement>('.work-h-outro-card');
        if (outroCard) {
          const outroInner = outroCard.querySelector<HTMLElement>('.outro-card-inner');
          if (outroInner) {
            gsap.fromTo(
              outroInner,
              { opacity: 0.2, y: 32 },
              {
                opacity: 1,
                y: 0,
                ease: 'power2.out',
                scrollTrigger: {
                  id: 'work-card-outro',
                  trigger: outroCard,
                  containerAnimation: tween,
                  start: 'left 95%',
                  end: 'left 35%',
                  scrub: 0.6,
                  fastScrollEnd: true,
                }
              }
            );
          }
        }

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

          ScrollTrigger.getById('work-card-0')?.kill();
          subsequentCards.forEach((_, idx) => {
            ScrollTrigger.getById(`work-card-${idx + 1}`)?.kill();
          });
          ScrollTrigger.getById('work-card-outro')?.kill();

          tween.scrollTrigger?.kill();
          tween.kill();

          gsap.set(track, { clearProps: 'transform' });
          const animatedElements = track.querySelectorAll(
            '.project-mask-wrap, .project-photo-anim, .project-meta-bar, .project-title-monument, .project-summary-line, .project-circle-btn, .project-frame-tag, .outro-card-inner'
          );
          gsap.set(animatedElements, { clearProps: 'all' });
        };
      });

      mm.add('(max-width: 899px), (prefers-reduced-motion: reduce)', () => {
        const track = trackRef.current;
        if (track) {
          gsap.set(track, { clearProps: 'transform' });
          const animatedElements = track.querySelectorAll(
            '.project-mask-wrap, .project-photo-anim, .project-meta-bar, .project-title-monument, .project-summary-line, .project-circle-btn, .project-frame-tag, .outro-card-inner'
          );
          gsap.set(animatedElements, { clearProps: 'all' });
        }
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
      <h2 className="sr-only">{finalSectionHeading}</h2>
      {/* The horizontal scrolling track */}
      <div className="work-h-viewport">
        <div ref={trackRef} className="work-h-track" onFocusCapture={handleFocusCapture}>
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
                      <div className="project-mask-wrap">
                        <div className="project-photo-anim">
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
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="project-mask-wrap">
                      <div className="project-photo-anim">
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
                      </div>
                    </div>
                  )}
                  <div className="project-frame-tag mono">
                    [ 0{i + 1} ] {p.placeholder && <span style={{ marginLeft: 6 }}><PlaceholderTag>Concept</PlaceholderTag></span>}
                  </div>
                </div>

                <div className="project-card-content">
                  {/* 3-Column Metadata Row */}
                  <div className="project-meta-bar">
                    <span className="project-year-badge mono">[ {p.year || 'CASE STUDY'} ]</span>
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
                <h3 className="heading work-h-outro-title">
                  <span className="work-h-outro-line">{outroHeadingLines[0]}</span>
                  {outroHeadingLines[1] ? (
                    <span className="work-h-outro-line">{outroHeadingLines[1]}</span>
                  ) : null}
                </h3>
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
