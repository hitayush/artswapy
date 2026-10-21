'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/motion/gsap';
import Mark from '@/components/primitives/Mark';
import PlaceholderTag from '@/components/primitives/PlaceholderTag';
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
  const [activeSlide, setActiveSlide] = useState(1);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 900px)', () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getDistance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          refreshPriority: 10,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${Math.round(self.progress * 100)}%`;
            }
            // Update active index (1 to projects.length)
            const idx = Math.min(
              projects.length,
              Math.max(1, Math.round(self.progress * (projects.length + 1)))
            );
            setActiveSlide(idx);
          }
        }
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('resize', refresh);
      document.fonts?.ready.then(refresh);

      return () => {
        window.removeEventListener('resize', refresh);
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, [projects.length]);

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
          <span className="ph-tag">Selected Work</span>
          <span className="small muted mono">[ {String(activeSlide).padStart(2, '0')} / {String(projects.length).padStart(2, '0')} ]</span>
        </div>
        <div className="work-h-cue small muted mono">
          Scroll to explore →
        </div>
      </div>

      {/* The horizontal scrolling track */}
      <div className="work-h-viewport">
        <div ref={trackRef} className="work-h-track">
          {/* Slide 0: Intro Header Card */}
          <article className="work-h-card work-h-intro-card">
            <div className="intro-card-inner">
              <span className="small muted mono">[ 01 / SHOWCASE ]</span>
              <h2 className="heading work-h-heading">
                Meaning first,<br />then the form.
              </h2>
              <p className="body muted work-h-intro-body">
                A collection of concept identities, packaging systems and brand architecture designed to demonstrate craft and strategic clarity.
              </p>
              <div className="work-h-scroll-hint">
                <span className="small mono">Explore projects</span>
                <span className="arrow-thread">→</span>
              </div>
            </div>
          </article>

          {/* Project Cards */}
          {projects.map((p, i) => (
            <article className="work-h-card work-h-project-card" key={p.id}>
              <div className="project-card-frame">
                <div className="project-card-image" role="img" aria-label={p.preview.alt}>
                  <Mark id={p.preview.mark} />
                  {p.placeholder && <PlaceholderTag>Concept placeholder</PlaceholderTag>}
                </div>
                <div className="project-card-badge mono small">
                  [ {p.year} ]
                </div>
              </div>

              <div className="project-card-info">
                <div className="project-card-header">
                  <span className="project-category small muted mono">{p.category}</span>
                  <h3 className="project-title poster">{p.name}</h3>
                </div>

                <p className="project-summary small muted">{p.summary}</p>

                <div className="project-card-action">
                  <a
                    href={p.href ?? mailto({ to, subject: enquiry.subjectPrefix + p.name, body: enquiry.body } satisfies MailtoTemplate)}
                    className="project-link-btn"
                    aria-label={`Start a project like ${p.name}`}
                  >
                    <span>Start a project like this</span>
                    <span className="arrow-icon" aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}

          {/* Outro / Next Section Bridge Card */}
          <article className="work-h-card work-h-outro-card">
            <div className="outro-card-inner">
              <span className="small muted mono">[ 02 / CAPABILITIES ]</span>
              <h3 className="heading work-h-outro-title">
                Next: What we do.
              </h3>
              <p className="body muted work-h-outro-body">
                Explore our full capabilities across brand strategy, visual identity systems, packaging, and digital touchpoints.
              </p>
              <a href="#services" className="cta cta-primary work-h-cta">
                <span>View Services</span>
                <span className="arrow" aria-hidden="true">↓</span>
              </a>
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
