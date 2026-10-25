'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/motion/gsap';
import { showreel } from '@/content/site';
import ShowreelPlayer from './ShowreelPlayer.client';

export default function Showreel() {
  const containerRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoSlotRef = useRef<HTMLDivElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);
  const quoteColRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const handleLearnMore = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string) => void } }).__lenis;
    const workEl = document.querySelector('#work');
    if (workEl) {
      if (lenis) lenis.scrollTo('#work');
      else workEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useGSAP(
    () => {
      const container = containerRef.current;
      const viewport = viewportRef.current;
      const topBar = topBarRef.current;
      const stage = stageRef.current;
      const videoSlot = videoSlotRef.current;
      const videoCard = videoCardRef.current;
      const quoteCol = quoteColRef.current;
      const bottomBar = bottomBarRef.current;

      if (!container || !viewport || !stage || !videoSlot || !videoCard || !quoteCol) return;

      const mm = gsap.matchMedia();

      // Desktop and Tablet: Pinned scroll scrub where video shrinks from full screen to compact left slot
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const getRects = () => {
          const vRect = viewport.getBoundingClientRect();
          const slotRect = videoSlot.getBoundingClientRect();

          const fullW = Math.max(1, vRect.width);
          const fullH = Math.max(1, vRect.height);

          const finalW = slotRect.width;
          const finalH = slotRect.height || slotRect.width * (9 / 16);
          const finalX = slotRect.left - vRect.left;
          const finalY = slotRect.top - vRect.top;

          return {
            fullW,
            fullH,
            finalX,
            finalY,
            scaleX: finalW / fullW,
            scaleY: finalH / fullH
          };
        };

        let r = getRects();

        // Initial state at scroll = 0: Full screen video covering viewport (GPU transform-only scrub)
        gsap.set(videoCard, {
          left: 0,
          top: 0,
          width: r.fullW,
          height: r.fullH,
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          transformOrigin: '0 0',
          borderRadius: 0,
          boxShadow: '0 32px 80px -16px rgba(0, 0, 0, 0.5)',
          zIndex: 30
        });

        if (topBar) {
          gsap.set(topBar, { opacity: 0, y: -20 });
        }
        gsap.set(quoteCol, { opacity: 0, x: 50 });
        if (bottomBar) {
          gsap.set(bottomBar, { opacity: 0, y: 20 });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=100%',
            pin: viewport,
            pinSpacing: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
            refreshPriority: 10,
            anticipatePin: 1,
            fastScrollEnd: true,
            onRefresh: () => {
              r = getRects();
              gsap.set(videoCard, { width: r.fullW, height: r.fullH });
            }
          }
        });

        // 1. Shrink video from full screen into left slot via GPU transform
        tl.to(
          videoCard,
          {
            x: () => r.finalX,
            y: () => r.finalY,
            scaleX: () => r.scaleX,
            scaleY: () => r.scaleY,
            borderRadius: '8px',
            boxShadow: '0 16px 36px -12px rgba(22, 22, 20, 0.14)',
            ease: 'power1.inOut',
            duration: 1
          },
          0
        );

        // 2. Top meta bar fades in as video begins shrinking
        if (topBar) {
          tl.to(
            topBar,
            {
              opacity: 1,
              y: 0,
              ease: 'power2.out',
              duration: 0.4
            },
            0.2
          );
        }

        // 3. Fade in and slide in the quote on the right as the video clears the space
        tl.to(
          quoteCol,
          {
            opacity: 1,
            x: 0,
            ease: 'power2.out',
            duration: 0.5
          },
          0.35
        );

        // 4. Reveal bottom editorial bar
        if (bottomBar) {
          tl.to(
            bottomBar,
            {
              opacity: 1,
              y: 0,
              ease: 'power2.out',
              duration: 0.45
            },
            0.5
          );
        }

        const refresh = () => {
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        };
        window.addEventListener('resize', refresh);
        window.addEventListener('orientationchange', refresh);
        document.fonts?.ready.then(refresh);

        ScrollTrigger.sort();
        ScrollTrigger.refresh();

        return () => {
          window.removeEventListener('resize', refresh);
          window.removeEventListener('orientationchange', refresh);
          tl.scrollTrigger?.kill();
          tl.kill();
          gsap.set([videoCard, topBar, quoteCol, bottomBar], { clearProps: 'all' });
        };
      });

      // Mobile and reduced motion: natural flow without pinning
      mm.add('(max-width: 899px), (prefers-reduced-motion: reduce)', () => {
        gsap.set([videoCard, topBar, quoteCol, bottomBar], { clearProps: 'all' });
      });

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="showreel"
      className="showreel-pinned-section"
      aria-label="Studio Showreel and Manifesto"
    >
      <div ref={viewportRef} className="showreel-pinned-viewport">
        {/* Top meta bar */}
        <div ref={topBarRef} className="showreel-topbar">
          <div className="showreel-meta">
            <span className="showreel-tag">SHOWREEL : PORTFOLIO 2026</span>
          </div>
          <span className="showreel-cue showreel-sound-cue">Sound off by default · Click to unmute</span>
        </div>

        {/* Main editorial presentation: Stage with video slot and quote */}
        <div ref={stageRef} className="showreel-main showreel-scroll-stage">
          {/* Static Slot for Grid Layout calculation */}
          <div ref={videoSlotRef} className="showreel-video-slot" aria-hidden="true" />

          {/* Right: Editorial Quote */}
          <div ref={quoteColRef} className="showreel-quote-col">
            <span className="showreel-quote-kicker">[ ! ] BE THE BRAND THEY NEVER STOP TALKING ABOUT</span>

            <blockquote className="showreel-quote-statement">
              Most brands don’t have a design problem. They have a clarity problem. I bring brand strategy and design together to find what makes you different and turn it into a brand people notice, trust and remember.
            </blockquote>
          </div>
        </div>

        {/* Bottom editorial split */}
        <div ref={bottomBarRef} className="showreel-bottom-bar">
          <div className="showreel-sub-left">
            <span className="showreel-sub-kicker">Designing Iconic Brands Daily.</span>
          </div>

          <div className="showreel-sub-right">
            <p className="showreel-sub-desc">
              Your brand has a story. We make sure it&apos;s seen, felt and remembered. We design logos, build brands and create moments that turn attention into action.
            </p>

            <a
              href="#work"
              onClick={handleLearnMore}
              className="showreel-learn-more"
              aria-label="Explore selected case studies"
            >
              <span>Explore Work</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="arrow-icon"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>

        {/* Absolute Animating Video Card that starts Full Screen and shrinks into slot */}
        <div ref={videoCardRef} className="showreel-animating-video">
          <ShowreelPlayer
            youtubeId={showreel.youtubeId}
            title={showreel.title}
            caption={showreel.caption}
          />
        </div>
      </div>
    </section>
  );
}
