'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import type { Project } from '@/types/content';
import { site } from '@/content/site';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/motion/gsap';
import CTAButton from '@/components/primitives/CTAButton';
import ThemeToggle from '@/components/primitives/ThemeToggle.client';
import FooterClose from '@/components/sections/FooterClose/FooterClose';

/* ─── Chapter metadata for the scroll chapter indicator ─── */
const CHAPTERS = [
  { id: 'hero', label: 'Hero' },
  { id: 'intro', label: 'Introduction' },
  { id: 'logo-transition', label: 'Logo' },
  { id: 'logo-definition', label: 'Definition' },
  { id: 'type-palette', label: 'Typography' },
  { id: 'logo-reveal', label: 'Reveal' },
  { id: 'collateral', label: 'Collateral' },
  { id: 'packaging', label: 'Packaging' },
  { id: 'applications', label: 'Applications' },
  { id: 'closing', label: 'Contact' },
] as const;

interface SofttouchCaseStudyProps {
  project: Project;
  prevProject: Project;
  nextProject: Project;
  enquiryHref: string;
}

export default function SofttouchCaseStudy({
  project,
  prevProject,
  nextProject,
  enquiryHref
}: SofttouchCaseStudyProps) {
  const flowRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);

  /* ─── Lightbox state ─── */
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState('');
  const lightboxRef = useRef<HTMLDialogElement>(null);

  const openLightbox = useCallback((src: string, alt: string) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxSrc(null);
    setLightboxAlt('');
  }, []);

  /* Open/close the native <dialog> when lightboxSrc changes */
  useEffect(() => {
    const dialog = lightboxRef.current;
    if (!dialog) return;
    if (lightboxSrc) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [lightboxSrc]);

  /* Close on Escape or backdrop click */
  useEffect(() => {
    const dialog = lightboxRef.current;
    if (!dialog) return;
    const onClose = () => closeLightbox();
    const onClick = (e: MouseEvent) => {
      if (e.target === dialog) closeLightbox();
    };
    dialog.addEventListener('close', onClose);
    dialog.addEventListener('click', onClick);
    return () => {
      dialog.removeEventListener('close', onClose);
      dialog.removeEventListener('click', onClick);
    };
  }, [closeLightbox]);

  /* Handle image click for lightbox */
  const handleImageClick = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      openLightbox(img.src, img.alt);
    },
    [openLightbox]
  );

  useGSAP(
    () => {
      const root = flowRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        /* ═══════════════════════════════════════════════════════════
           SCROLL PROGRESS BAR — thin orange line at the very top
           ═══════════════════════════════════════════════════════════ */
        const progressBar = progressRef.current;
        if (progressBar) {
          gsap.to(progressBar, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.15
            }
          });
        }

        /* ═══════════════════════════════════════════════════════════
           CHAPTER INDICATOR — track active section
           ═══════════════════════════════════════════════════════════ */
        const chapterEl = chapterRef.current;
        const chapterSections = root.querySelectorAll<HTMLElement>('[data-chapter]');
        if (chapterEl && chapterSections.length > 0) {
          chapterSections.forEach((sec) => {
            ScrollTrigger.create({
              trigger: sec,
              start: 'top 50%',
              end: 'bottom 50%',
              onEnter: () => {
                const id = sec.dataset.chapter;
                if (chapterEl) chapterEl.setAttribute('data-active', id || '');
              },
              onEnterBack: () => {
                const id = sec.dataset.chapter;
                if (chapterEl) chapterEl.setAttribute('data-active', id || '');
              }
            });
          });
        }

        /* ═══════════════════════════════════════════════════════════
           1. HERO — cinematic entrance with clip-path mask reveal
           ═══════════════════════════════════════════════════════════ */
        const heroStage = root.querySelector<HTMLElement>('.cs-st-hero');
        const heroImg = heroStage?.querySelector<HTMLElement>('.cs-st-hero-img');
        const introCard = root.querySelector<HTMLElement>('.cs-st-intro-card');

        if (heroImg) {
          gsap.fromTo(
            heroImg,
            {
              clipPath: 'inset(8% 4% 8% 4%)',
              scale: 1.04,
              opacity: 0
            },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              scale: 1,
              opacity: 1,
              duration: 1.3,
              ease: 'art.soft',
              delay: 0.12
            }
          );
        }

        // Intro card sequence: tag/category -> monument title -> thread line -> summary -> specs
        if (introCard) {
          const metaRow = introCard.querySelector<HTMLElement>('.cs-st-meta-row');
          const title = introCard.querySelector<HTMLElement>('.cs-st-monument-title');
          const thread = introCard.querySelector<HTMLElement>('.cs-st-title-thread');
          const summary = introCard.querySelector<HTMLElement>('.cs-st-lead-summary');
          const specs = Array.from(introCard.querySelectorAll<HTMLElement>('.cs-st-spec-box'));

          const introTL = gsap.timeline({
            defaults: { ease: 'art.out' },
            scrollTrigger: {
              trigger: introCard,
              start: 'top 90%',
              toggleActions: 'play none none none',
              once: true
            }
          });

          if (metaRow) {
            introTL.fromTo(metaRow, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.05);
          }
          if (title) {
            introTL.fromTo(title, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7 }, 0.12);
          }
          if (thread) {
            introTL.fromTo(thread, { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.7, ease: 'art.inOut' }, 0.22);
          }
          if (summary) {
            introTL.fromTo(summary, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.32);
          }
          if (specs.length > 0) {
            introTL.fromTo(specs, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, 0.4);
          }
        }

        /* ═══════════════════════════════════════════════════════════
           2. DUAL-LAYER LOGO COLOR TRANSITION
           ═══════════════════════════════════════════════════════════ */
        const logoStage = root.querySelector<HTMLElement>('.cs-st-orange-logo');
        const logoDarkVariant = logoStage?.querySelector<HTMLElement>('.cs-st-logo-variant-dark');
        const logoLightVariant = logoStage?.querySelector<HTMLElement>('.cs-st-logo-variant-light');

        if (logoStage && logoDarkVariant && logoLightVariant) {
          // Clip-path mask reveal as logos enter
          gsap.fromTo(
            logoDarkVariant,
            { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0.5 },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              opacity: 1,
              duration: 1,
              ease: 'art.inOut',
              scrollTrigger: {
                trigger: logoStage,
                start: 'top 88%',
                end: 'top 40%',
                scrub: 0.45,
                fastScrollEnd: true
              }
            }
          );

          // Color transition crossfade
          const transitionTL = gsap.timeline({
            scrollTrigger: {
              trigger: logoStage,
              start: 'top 15%',
              end: 'bottom 50%',
              scrub: 0.5,
              fastScrollEnd: true
            }
          });

          transitionTL
            .to(logoStage, { backgroundColor: '#f5f4ef', ease: 'none' }, 0)
            .to(logoDarkVariant, { opacity: 0, ease: 'none' }, 0)
            .to(logoLightVariant, { opacity: 1, ease: 'none' }, 0);
        }

        /* ═══════════════════════════════════════════════════════════
           3. SEQUENTIAL LOGO REVEAL VIDEO
           ═══════════════════════════════════════════════════════════ */
        const lightLogoStage = root.querySelector<HTMLElement>('.cs-st-light-logo');
        const logoVideo = lightLogoStage?.querySelector<HTMLVideoElement>('.cs-st-logo-video');

        let videoST: ScrollTrigger | null = null;

        if (lightLogoStage && logoVideo) {
          const primeVideo = () => {
            try {
              logoVideo.pause();
              logoVideo.currentTime = 0.25;
            } catch (_) {}
          };

          if (logoVideo.readyState >= 2) {
            primeVideo();
          } else {
            logoVideo.addEventListener('loadeddata', primeVideo, { once: true });
          }

          videoST = ScrollTrigger.create({
            trigger: lightLogoStage,
            start: 'top 75%',
            once: false,
            onEnter: () => {
              logoVideo.currentTime = 0.25;
              const playPromise = logoVideo.play();
              if (playPromise !== undefined) {
                playPromise.catch(() => {});
              }
            },
            onEnterBack: () => {
              logoVideo.currentTime = 0.25;
              const playPromise = logoVideo.play();
              if (playPromise !== undefined) {
                playPromise.catch(() => {});
              }
            }
          });
        }

        /* ═══════════════════════════════════════════════════════════
           4. IMAGE STAGES — clip-path mask reveals + subtle parallax
           ═══════════════════════════════════════════════════════════ */
        const stages = Array.from(
          root.querySelectorAll<HTMLElement>(
            '[data-st-stage]:not(.cs-st-orange-logo):not(.cs-st-light-logo)'
          )
        );

        stages.forEach((stage, stageIdx) => {
          const singleMedia = stage.querySelector<HTMLElement>('[data-st-media="single"]');
          if (singleMedia) {
            // Alternate between vertical and horizontal mask reveals
            const isEven = stageIdx % 2 === 0;
            const fromClip = isEven
              ? 'inset(6% 0% 6% 0%)'
              : 'inset(0% 6% 0% 6%)';

            gsap.fromTo(
              singleMedia,
              { clipPath: fromClip, y: 24, opacity: 0 },
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                y: 0,
                opacity: 1,
                duration: 0.85,
                ease: 'art.out',
                scrollTrigger: {
                  trigger: stage,
                  start: 'top 88%',
                  toggleActions: 'play none none reverse'
                }
              }
            );

            // Subtle parallax depth on the inner image
            const img = singleMedia.querySelector<HTMLElement>('img');
            if (img) {
              gsap.fromTo(
                img,
                { scale: 1.03, y: 12 },
                {
                  scale: 1,
                  y: -8,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: stage,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.4
                  }
                }
              );
            }
          }

          const cols = Array.from(stage.querySelectorAll<HTMLElement>('[data-st-media="col"]'));
          if (cols.length > 0) {
            cols.forEach((col, i) => {
              // Staggered clip-path reveals for column items
              const delay = i * 0.08;
              gsap.fromTo(
                col,
                { clipPath: 'inset(8% 0% 8% 0%)', y: 20, opacity: 0 },
                {
                  clipPath: 'inset(0% 0% 0% 0%)',
                  y: 0,
                  opacity: 1,
                  duration: 0.75,
                  delay,
                  ease: 'art.out',
                  scrollTrigger: {
                    trigger: stage,
                    start: 'top 88%',
                    toggleActions: 'play none none reverse'
                  }
                }
              );

              // Per-column parallax
              const img = col.querySelector<HTMLElement>('img');
              if (img) {
                gsap.fromTo(
                  img,
                  { scale: 1.02 },
                  {
                    scale: 1,
                    duration: 0.8,
                    ease: 'art.soft',
                    scrollTrigger: {
                      trigger: stage,
                      start: 'top 88%',
                      toggleActions: 'play none none reverse'
                    }
                  }
                );
              }
            });
          }
        });

        /* ═══════════════════════════════════════════════════════════
           5. TEXT/NARRATIVE CARDS — sequenced content reveals
           ═══════════════════════════════════════════════════════════ */
        const cards = Array.from(
          root.querySelectorAll<HTMLElement>('[data-st-card]:not(.cs-st-intro-card)')
        );
        cards.forEach((card) => {
          const cardItems = Array.from(card.querySelectorAll<HTMLElement>('[data-st-item]'));
          const cardThread = card.querySelector<HTMLElement>('[data-st-thread]');
          const cardThumb = card.querySelector<HTMLElement>('[data-st-thumb]');

          const cardTL = gsap.timeline({
            defaults: { ease: 'art.out' },
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse'
            }
          });

          cardTL.fromTo(card, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, 0);

          if (cardThread) {
            cardTL.fromTo(
              cardThread,
              { scaleX: 0, transformOrigin: 'left center' },
              { scaleX: 1, duration: 0.6, ease: 'art.inOut' },
              0.15
            );
          }

          if (cardThumb) {
            cardTL.fromTo(cardThumb, { scale: 0.97, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 }, 0.1);
          }

          if (cardItems.length > 0) {
            cardTL.fromTo(
              cardItems,
              { y: 10, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, stagger: 0.05 },
              0.15
            );
          }
        });

        /* ═══════════════════════════════════════════════════════════
           6. CLOSING SECTION
           ═══════════════════════════════════════════════════════════ */
        const closingSec = root.querySelector<HTMLElement>('.cs-st-closing');
        if (closingSec) {
          const banner = closingSec.querySelector<HTMLElement>('.cs-enquiry-banner');
          const navBar = closingSec.querySelector<HTMLElement>('.cs-pagination-nav-bar');

          if (banner) {
            gsap.fromTo(
              banner,
              { y: 24, opacity: 0, clipPath: 'inset(4% 2% 4% 2%)' },
              {
                y: 0,
                opacity: 1,
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 0.75,
                ease: 'art.out',
                scrollTrigger: {
                  trigger: banner,
                  start: 'top 88%',
                  toggleActions: 'play none none reverse'
                }
              }
            );
          }

          if (navBar) {
            gsap.fromTo(
              navBar,
              { y: 16, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.65,
                ease: 'art.out',
                scrollTrigger: {
                  trigger: navBar,
                  start: 'top 92%',
                  toggleActions: 'play none none reverse'
                }
              }
            );
          }
        }

        // Refresh ScrollTrigger when images load
        const imgs = Array.from(root.querySelectorAll('img'));
        const onImgLoad = () => ScrollTrigger.refresh();
        imgs.forEach((img) => {
          if (!img.complete) {
            img.addEventListener('load', onImgLoad, { once: true });
          }
        });

        return () => {
          imgs.forEach((img) => img.removeEventListener('load', onImgLoad));
          if (videoST) {
            videoST.kill();
          }
        };
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const logoVideo = root.querySelector<HTMLVideoElement>('.cs-st-logo-video');
        if (logoVideo) {
          logoVideo.pause();
          if (!isNaN(logoVideo.duration) && logoVideo.duration > 0) {
            logoVideo.currentTime = logoVideo.duration;
          }
        }
        const allAnimated = root.querySelectorAll(
          '.cs-st-stage-inner, .cs-st-hero-img, [data-st-media], [data-st-media] img, [data-st-card], [data-st-thread], [data-st-item], [data-st-thumb]'
        );
        gsap.set(allAnimated, { clearProps: 'all' });
      });

      return () => mm.revert();
    },
    { scope: flowRef }
  );

  return (
    <div ref={flowRef} className="cs-softtouch-flow">
      {/* ═══ Scroll Progress Bar ═══ */}
      <div
        ref={progressRef}
        className="cs-st-progress-bar"
        aria-hidden="true"
        style={{ transform: 'scaleX(0)' }}
      />

      {/* ═══ Chapter Indicator (desktop only) ═══ */}
      <nav
        ref={chapterRef}
        className="cs-st-chapter-nav"
        aria-label="Case study sections"
        data-active="hero"
      >
        {CHAPTERS.map((ch) => (
          <a
            key={ch.id}
            href={`#${ch.id}`}
            className="cs-st-chapter-dot"
            data-chapter-id={ch.id}
            aria-label={`Jump to ${ch.label}`}
          >
            <span className="cs-st-chapter-indicator-pip" aria-hidden="true" />
            <span className="cs-st-chapter-label">{ch.label}</span>
          </a>
        ))}
      </nav>

      {/* Studio Top Navigation Bar */}
      <header className="cs-topbar">
        <div className="cs-topbar-inner">
          <Link href="/" className="cs-back-link" aria-label="Back to Studio">
            <span className="arrow-back" aria-hidden="true">←</span>
            <span>Back to Studio</span>
          </Link>
          <div className="cs-brand-mark">
            <Link href="/" className="wordmark">
              {site.name}
            </Link>
          </div>
          <div className="cs-topbar-action">
            <ThemeToggle />
            <CTAButton href={enquiryHref} label="Enquire like this" size="sm" />
          </div>
        </div>
      </header>

      {/* =========================================================================
          Hero: 4 paint buckets on vibrant orange ground (natural aspect ratio 1919×982)
          Asset: /images/projects/softtouch/softtouch case study-02.jpg
          ========================================================================= */}
      <section id="hero" className="cs-st-sec cs-st-hero" data-chapter="hero" aria-label="Softtouch Product Lineup Hero">
        <div className="cs-st-stage-inner">
          <img
            src="/images/projects/softtouch/softtouch case study-02.jpg"
            alt="Softtouch paint buckets lineup on vibrant orange surface: Wall Putty, Aura, Storm Shield, and Evershield"
            width={1919}
            height={982}
            className="cs-st-img-natural cs-st-hero-img cs-st-clickable-img"
            loading="eager"
            fetchPriority="high"
            onClick={handleImageClick}
          />
        </div>
      </section>

      {/* =========================================================================
          Inset Warm-White Identity Panel ("SOFTTOUCH", replacing AARANYA)
          ========================================================================= */}
      <section id="intro" className="cs-st-sec cs-st-intro" data-chapter="intro" aria-label="Project Introduction">
        <div className="cs-st-container">
          <div className="cs-st-intro-card" data-st-card>
            <div className="cs-st-meta-row" data-st-item>
              <span className="cs-st-tag mono">[ CASE STUDY ]</span>
              <span className="cs-st-cat mono">{project.category}</span>
              <span className="cs-st-pill mono">{project.discipline ?? 'Brand Identity & Packaging'}</span>
            </div>

            <div className="cs-st-title-wrap">
              <h1 className="cs-st-monument-title">{project.name}</h1>
              <span className="cs-st-title-thread" data-st-thread aria-hidden="true" />
            </div>

            <p className="cs-st-lead-summary" data-st-item>
              {project.summary}
            </p>

            <div className="cs-st-specs-grid">
              <div className="cs-st-spec-box" data-st-item>
                <span className="spec-label mono">WORK</span>
                <strong className="spec-value">Logo Design &amp; Packaging</strong>
              </div>
              <div className="cs-st-spec-box" data-st-item>
                <span className="spec-label mono">CATEGORY</span>
                <strong className="spec-value">Paint Industry</strong>
              </div>
              <div className="cs-st-spec-box" data-st-item>
                <span className="spec-label mono">LOCATION</span>
                <strong className="spec-value">Nagpur, India</strong>
              </div>
              <div className="cs-st-spec-box" data-st-item>
                <span className="spec-label mono">TIMELINE</span>
                <strong className="spec-value">20 Days</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          Immersive Full-Viewport Logo Transition Moment (100svh on desktop)
          Dual treatments:
          - Orange ground: /images/projects/softtouch/softtouch case study-03.jpg (white/orange logo)
          - Warm-white ground: /images/projects/softtouch/softtouch case study-04.jpg (orange/black logo)
          ========================================================================= */}
      <section
        id="logo-transition"
        className="cs-st-sec cs-st-orange-logo cs-st-logo-viewport"
        data-st-stage
        data-chapter="logo-transition"
        aria-label="Softtouch Brand Signature on Orange"
      >
        <div className="cs-st-stage-inner cs-st-transition-stage" data-st-media="single">
          {/* Orange ground variant (visible first) */}
          <img
            src="/images/projects/softtouch/softtouch case study-03.jpg"
            alt="Softtouch white and orange logo treatment on signature orange ground"
            width={1918}
            height={883}
            className="cs-st-img-natural cs-st-logo-variant cs-st-logo-variant-dark"
            loading="lazy"
          />
          {/* Warm-white ground variant (revealed as background shifts to warm white) */}
          <img
            src="/images/projects/softtouch/softtouch case study-04.jpg"
            alt="Softtouch orange and black logo treatment on warm paper ground"
            width={1918}
            height={883}
            className="cs-st-img-natural cs-st-logo-variant cs-st-logo-variant-light"
            loading="lazy"
          />
        </div>
      </section>

      {/* =========================================================================
          Softtouch Logo Definition Section
          ========================================================================= */}
      <section id="logo-definition" className="cs-st-sec cs-st-story" data-chapter="logo-definition" aria-label="Softtouch Logo Definition">
        <div className="cs-st-container">
          <div className="cs-st-story-box" data-st-card>
            <div className="cs-st-story-col" data-st-item>
              <p className="cs-st-story-lead">
                The Softtouch logo is inspired by a paint splash, designed in a clean and symmetrical style to reflect both creativity and control. While paint is usually free-flowing, the structured form shows the brand&apos;s focus on precision, consistency, and high-quality finishes. The radiating shape represents smooth coverage and the ability to transform any surface with a refined and professional touch.
              </p>
            </div>
            <div className="cs-st-story-col" data-st-item>
              <p className="cs-st-story-lead">
                The typography and color combination add to the brand&apos;s personality. The mix of black and orange creates a strong yet vibrant look &mdash;black representing trust and durability, and orange reflecting energy and creativity. The name &ldquo;Softtouch&rdquo; itself highlights the brand&apos;s promise of smooth application and elegant results, making it ideal for modern, high-quality painting solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          Typography & Colour Palette System: 2 original images side-by-side (960×631 each)
          Assets:
          - Left: /images/projects/softtouch/softtouch case study-05.jpg (Montserrat specimen)
          - Right: /images/projects/softtouch/softtouch case study-06.jpg (Colour palette scale)
          ========================================================================= */}
      <section
        id="type-palette"
        className="cs-st-sec cs-st-type-palette cs-st-guttered"
        data-st-stage
        data-chapter="type-palette"
        aria-label="Typography and Colour System"
      >
        <div className="cs-st-paired-grid-2">
          <div className="cs-st-panel-cell cs-st-cell-type" data-st-media="col">
            <img
              src="/images/projects/softtouch/softtouch case study-05.jpg"
              alt="Softtouch Montserrat brand typeface specimen on orange background"
              width={960}
              height={631}
              className="cs-st-img-natural cs-st-clickable-img"
              loading="lazy"
              onClick={handleImageClick}
            />
          </div>
          <div className="cs-st-panel-cell cs-st-cell-palette" data-st-media="col">
            <img
              src="/images/projects/softtouch/softtouch case study-06.jpg"
              alt="Softtouch brand colour palette scale (#E87124 and #231F20)"
              width={960}
              height={631}
              className="cs-st-img-natural cs-st-clickable-img"
              loading="lazy"
              onClick={handleImageClick}
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          Centered Softtouch logo on warm-white ground — Animated Logo Reveal
          Video: /images/projects/softtouch/softtouch-logo-reveal.mp4
          Fallback poster: /images/projects/softtouch/softtouch case study-04.jpg (1918×883)
          ========================================================================= */}
      <section
        id="logo-reveal"
        className="cs-st-sec cs-st-light-logo cs-st-guttered"
        data-st-stage
        data-chapter="logo-reveal"
        aria-label="Softtouch Logo on Warm Paper Ground"
      >
        <div className="cs-st-panel-single cs-st-bg-warm-logo cs-st-video-container" data-st-media="single">
          <video
            className="cs-st-logo-video"
            poster="/images/projects/softtouch/softtouch case study-04.jpg"
            preload="auto"
            muted
            playsInline
            aria-label="Softtouch animated logo reveal"
            tabIndex={-1}
          >
            <source
              src="/images/projects/softtouch/softtouch-logo-reveal.mp4"
              type="video/mp4"
            />
          </video>
          {/* Static fallback for reduced motion / immediate accessibility */}
          <img
            src="/images/projects/softtouch/softtouch case study-04.jpg"
            alt="Softtouch brand logo on warm paper ground"
            width={1918}
            height={883}
            className="cs-st-img-natural cs-st-logo-static-fallback"
            loading="lazy"
          />
        </div>
      </section>

      {/* =========================================================================
          1. Collateral & Utility Objects — Compact row with mug, bottle, and USB drive
          Side by side in 3 balanced image tiles with contained product artwork.
          ========================================================================= */}
      <section
        id="collateral"
        className="cs-st-sec cs-st-merch-trio cs-st-guttered"
        data-st-stage
        data-chapter="collateral"
        aria-label="Branded Collateral and Utility Objects"
      >
        <div className="cs-st-paired-grid-3">
          <div className="cs-st-panel-cell cs-st-cell-mug" data-st-media="col">
            <img
              src="/images/projects/softtouch/softtouch case study-08.jpg"
              alt="Softtouch branded ceramic coffee mug"
              width={634}
              height={425}
              className="cs-st-collateral-img cs-st-clickable-img"
              loading="lazy"
              onClick={handleImageClick}
            />
          </div>
          <div className="cs-st-panel-cell cs-st-cell-flask" data-st-media="col">
            <img
              src="/images/projects/softtouch/softtouch case study-07.jpg"
              alt="Softtouch branded hydration flask on original grey background"
              width={634}
              height={425}
              className="cs-st-collateral-img cs-st-clickable-img"
              loading="lazy"
              onClick={handleImageClick}
            />
          </div>
          <div className="cs-st-panel-cell cs-st-cell-usb" data-st-media="col">
            <img
              src="/images/projects/softtouch/softtouch case study-09.jpg"
              alt="Softtouch branded USB flash drive"
              width={634}
              height={425}
              className="cs-st-collateral-img cs-st-clickable-img"
              loading="lazy"
              onClick={handleImageClick}
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. Apparel — Warm peach/orange panel below with Softtouch T-shirt centered
          Asset: /images/projects/softtouch/softtouch case study-10.jpg (1918×883)
          ========================================================================= */}
      <section
        className="cs-st-sec cs-st-apparel cs-st-guttered"
        data-st-stage
        aria-label="Branded Apparel"
      >
        <div className="cs-st-panel-single cs-st-bg-apparel" data-st-media="single">
          <img
            src="/images/projects/softtouch/softtouch case study-10.jpg"
            alt="Softtouch branded orange T-shirt centered on warm peach-orange backdrop"
            width={1918}
            height={818}
            className="cs-st-apparel-img cs-st-clickable-img"
            loading="lazy"
            onClick={handleImageClick}
          />
        </div>
      </section>

      {/* =========================================================================
          3. Campaign — Orange campaign panel below with existing campaign artwork & phone visual
          Asset: /images/projects/softtouch/softtouch case study-11.jpg (1916×468)
          ========================================================================= */}
      <section
        className="cs-st-sec cs-st-campaign cs-st-guttered"
        data-st-stage
        aria-label="Softtouch Campaign Artwork and Mobile Application Visual"
      >
        <div className="cs-st-panel-single cs-st-bg-campaign" data-st-media="single">
          <img
            src="/images/projects/softtouch/softtouch case study-11.jpg"
            alt="Softtouch campaign banner featuring Khushiyo Ke Rang Softtouch Ke Sang artwork with mobile application on the right"
            width={1916}
            height={468}
            className="cs-st-campaign-img cs-st-clickable-img"
            loading="lazy"
            onClick={handleImageClick}
          />
        </div>
      </section>

      {/* =========================================================================
          Challenge and Strategic Solution
          ========================================================================= */}
      <section className="cs-st-sec cs-st-process-note" aria-label="The Challenge and Strategic Solution">
        <div className="cs-st-container">
          <div className="cs-st-story-box" data-st-card>
            <div className="cs-st-story-col" data-st-item>
              <span className="mono cs-st-cat" style={{ whiteSpace: 'pre' }}>[01  THE CHALLENGE]</span>
              <h2 className="cs-st-strategy-heading">
                Creating distinction across every product range.
              </h2>
              <p className="cs-st-strategy-body">
                The challenge was to build a cohesive brand identity for multiple product ranges while giving each category its own unique visual appeal. The designs needed to stand out on retail shelves, communicate product differentiation, and create a strong, recognisable brand presence.
              </p>
            </div>
            <div className="cs-st-story-col" data-st-item>
              <span className="mono cs-st-cat" style={{ whiteSpace: 'pre' }}>[02  STRATEGIC SOLUTION]</span>
              <h2 className="cs-st-strategy-heading">
                Every bucket tells a different story.
              </h2>
              <p className="cs-st-strategy-body">
                We developed innovative packaging designs where each bucket represents a distinct product category through its own visual language. By combining distinctive colours, graphics, and design elements, we created a unified packaging system that makes every range instantly recognisable and visually appealing on shelves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. Process sketches — Hand-drawn packaging and identity sketches (1916×950)
          Asset: /images/projects/softtouch/softtouch case study-12.jpg
          ========================================================================= */}
      <section
        id="packaging"
        className="cs-st-sec cs-st-sketches cs-st-guttered"
        data-st-stage
        data-chapter="packaging"
        aria-label="Process Sketches"
      >
        <div className="cs-st-panel-single cs-st-bg-sketches" data-st-media="single">
          <img
            src="/images/projects/softtouch/softtouch case study-12.jpg"
            alt="Hand-drawn concept exploration and structural packaging sketches for Softtouch paint containers and wordmark"
            width={2388}
            height={1668}
            className="cs-st-img-natural cs-st-clickable-img"
            loading="lazy"
            onClick={handleImageClick}
          />
        </div>
      </section>

      {/* =========================================================================
          5. Packaging — Split composition: plain bucket on left, label designs on right (1914×872)
          Asset: /images/projects/softtouch/softtouch case study-13.jpg
          ========================================================================= */}
      <section
        className="cs-st-sec cs-st-die-lines cs-st-guttered"
        data-st-stage
        aria-label="Packaging Bucket and Label Designs"
      >
        <div className="cs-st-panel-single cs-st-bg-dielines" data-st-media="single">
          <img
            src="/images/projects/softtouch/softtouch case study-13.jpg"
            alt="Plain white paint bucket on the left paired with Dampfixx Ultra and Aura packaging label designs on the right"
            width={1914}
            height={872}
            className="cs-st-img-natural cs-st-clickable-img"
            loading="lazy"
            onClick={handleImageClick}
          />
        </div>
      </section>

      {/* =========================================================================
          6. Product range — Balanced side-by-side product photography (955×538 each)
          Assets:
          - Left: /images/projects/softtouch/softtouch case study-14.jpg (Interior emulsions)
          - Right: /images/projects/softtouch/softtouch case study-15.jpg (Primers & wall putty)
          ========================================================================= */}
      <section
        className="cs-st-sec cs-st-range cs-st-guttered"
        data-st-stage
        aria-label="Product Range Photography"
      >
        <div className="cs-st-paired-grid-2">
          <div className="cs-st-panel-cell cs-st-cell-range-left" data-st-media="col">
            <img
              src="/images/projects/softtouch/softtouch case study-14.jpg"
              alt="Softtouch interior emulsion buckets: Astheta, Softflow, Grandeur, and Aura"
              width={955}
              height={538}
              className="cs-st-img-natural cs-st-clickable-img"
              loading="lazy"
              onClick={handleImageClick}
            />
          </div>
          <div className="cs-st-panel-cell cs-st-cell-range-right" data-st-media="col">
            <img
              src="/images/projects/softtouch/softtouch case study-15.jpg"
              alt="Softtouch primer buckets and wall putty bag lineup on showroom plinth"
              width={955}
              height={538}
              className="cs-st-img-natural cs-st-clickable-img"
              loading="lazy"
              onClick={handleImageClick}
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          Brand Applications & Outdoor Media Panel (Centered)
          ========================================================================= */}
      <section id="applications" className="cs-st-sec cs-st-second-title cs-st-outdoor-media" data-chapter="applications" aria-label="Outdoor Media Brand Applications">
        <div className="cs-st-container">
          <div className="cs-st-intro-card cs-st-card-centered" data-st-card>
            <div className="cs-st-meta-row cs-st-meta-centered" data-st-item>
              <span className="cs-st-tag mono">[ BRAND APPLICATIONS ]</span>
              <span className="cs-st-cat mono">Outdoor Media</span>
            </div>
            <div className="cs-st-title-wrap cs-st-title-centered">
              <h2 className="cs-st-monument-title">Outdoor Media</h2>
              <span className="cs-st-title-thread cs-st-thread-centered" data-st-thread aria-hidden="true" />
            </div>
            <p className="cs-st-lead-summary cs-st-lead-centered" style={{ marginBottom: 0 }} data-st-item>
              Print brochures, retail showroom standees, and dealer storefront signage.
            </p>
            {/* Structurally ready media slot for outdoor media asset when supplied */}
            <div className="cs-st-outdoor-media-frame" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. Print and collateral — Balanced side-by-side split (955×538 each)
          Assets:
          - Left: /images/projects/softtouch/softtouch case study-16.jpg (Brochures)
          - Right: /images/projects/softtouch/softtouch case study-17.jpg (Standing display)
          ========================================================================= */}
      <section
        className="cs-st-sec cs-st-collateral cs-st-guttered"
        data-st-stage
        aria-label="Print and Collateral"
      >
        <div className="cs-st-paired-grid-2">
          <div className="cs-st-panel-cell cs-st-cell-collateral-left" data-st-media="col">
            <img
              src="/images/projects/softtouch/softtouch case study-16.jpg"
              alt="Softtouch open and folded brochures on orange ground"
              width={955}
              height={538}
              className="cs-st-img-natural cs-st-clickable-img"
              loading="lazy"
              onClick={handleImageClick}
            />
          </div>
          <div className="cs-st-panel-cell cs-st-cell-collateral-right" data-st-media="col">
            <img
              src="/images/projects/softtouch/softtouch case study-17.jpg"
              alt="Softtouch showroom standing display sign for Rajeshree and Swastik Traders"
              width={955}
              height={538}
              className="cs-st-img-natural cs-st-clickable-img"
              loading="lazy"
              onClick={handleImageClick}
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. Environmental branding — Storefront/signage image (1921×600)
          Asset: /images/projects/softtouch/softtouch case study-18.jpg
          ========================================================================= */}
      <section
        className="cs-st-sec cs-st-storefront cs-st-guttered"
        data-st-stage
        aria-label="Environmental Branding Storefront Signage"
      >
        <div className="cs-st-panel-single cs-st-bg-storefront" data-st-media="single">
          <img
            src="/images/projects/softtouch/softtouch case study-18.jpg"
            alt="Softtouch dealership storefront fascia signage: Rajeshree and Swastik Traders, Umred Road, Udasa, Umred"
            width={1921}
            height={600}
            className="cs-st-img-natural cs-st-clickable-img"
            loading="lazy"
            onClick={handleImageClick}
          />
        </div>
      </section>

      {/* =========================================================================
          9. Packaging Detail — Specimen card with oil paint bucket artwork (331×410)
          Asset: /images/projects/softtouch/softtouch case study-19.png
          ========================================================================= */}
      <section
        className="cs-st-sec cs-st-detail-section"
        data-st-stage
        aria-label="Packaging Detail - Premium Oil Paint Bucket"
      >
        <div className="cs-st-container cs-st-detail-wrap">
          <div className="cs-st-detail-card" data-st-card>
            <div className="cs-st-detail-layout">
              <div className="cs-st-detail-thumb">
                <img
                  src="/images/projects/softtouch/softtouch case study-19.png"
                  alt="Softtouch Premium Oil Paint Bucket packaging detail"
                  width={331}
                  height={410}
                  className="cs-st-thumb-img cs-st-clickable-img"
                  loading="lazy"
                  data-st-thumb
                  onClick={handleImageClick}
                />
              </div>
              <div className="cs-st-detail-content">
                <span className="mono cs-st-cat" data-st-item>[ PACKAGING DETAIL ]</span>
                <h3 className="cs-st-detail-title" data-st-item>Premium Oil Paint Bucket</h3>
                <p className="body cs-st-detail-p" data-st-item>
                  Premium bucket packaging designed to elevate the oil paint range with distinctive visuals, strong shelf appeal, and a refined brand presence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. Final product composition — Orange background with angled buckets (1919×1080)
          Asset: /images/projects/softtouch/softtouch case study-20.jpg
          ========================================================================= */}
      <section
        className="cs-st-sec cs-st-tilted-pails cs-st-guttered"
        data-st-stage
        aria-label="Final Product Composition"
      >
        <div className="cs-st-panel-single cs-st-bg-tilted" data-st-media="single">
          <img
            src="/images/projects/softtouch/softtouch case study-20.jpg"
            alt="Softtouch Storm Shield and Evershield angled paint buckets on signature orange background"
            width={1919}
            height={1080}
            className="cs-st-img-natural cs-st-clickable-img"
            loading="lazy"
            onClick={handleImageClick}
          />
        </div>
      </section>

      {/* =========================================================================
          11. Closing — Existing ArtSwapy related-work / contact / footer experience
          ========================================================================= */}
      <section id="closing" className="cs-st-sec cs-st-closing" data-chapter="closing" aria-label="Collaboration and Project Navigation">
        <div className="cs-st-container">
          <div className="cs-enquiry-banner" data-st-card>
            <div className="cs-enquiry-content">
              <span className="ph-tag orange-tag mono" data-st-item>[ START A COLLABORATION ]</span>
              <h2 className="heading cs-enquiry-title" data-st-item>Ready for an enduring brand system?</h2>
              <p className="body muted" data-st-item>
                Direct founder-to-founder collaboration from initial positioning through production-ready packaging and digital applications.
              </p>
            </div>
            <div data-st-item>
              <CTAButton href={enquiryHref} label="Start your project" />
            </div>
          </div>

          {/* Project Prev/Next Navigation Controls */}
          <div className="cs-pagination-nav-bar" data-st-card>
            <Link href={prevProject.href ?? `/work/${prevProject.id}/`} className="cs-page-nav cs-nav-prev" data-st-item>
              <span className="small mono muted">← Previous Study</span>
              <strong className="nav-project-name">{prevProject.name}</strong>
              <span className="small muted">{prevProject.category}</span>
            </Link>

            <Link href={nextProject.href ?? `/work/${nextProject.id}/`} className="cs-page-nav cs-nav-next" data-st-item>
              <span className="small mono muted">Next Study →</span>
              <strong className="nav-project-name">{nextProject.name}</strong>
              <span className="small muted">{nextProject.category}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ArtSwapy Studio Footer */}
      <FooterClose />

      {/* ═══ Lightbox Dialog ═══ */}
      <dialog
        ref={lightboxRef}
        className="cs-st-lightbox"
        aria-label="Image detail view"
      >
        {lightboxSrc && (
          <div className="cs-st-lightbox-content">
            <button
              className="cs-st-lightbox-close"
              onClick={closeLightbox}
              aria-label="Close image detail"
              type="button"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <img
              src={lightboxSrc}
              alt={lightboxAlt}
              className="cs-st-lightbox-img"
            />
          </div>
        )}
      </dialog>
    </div>
  );
}
