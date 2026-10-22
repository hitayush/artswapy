'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/motion/gsap';
import { showreel } from '@/content/site';
import { scrollToHash } from '@/lib/motion/lenis';
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
    scrollToHash('#studio');
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

          // 1. Initial State: Full Screen spanning the entire viewport
          const fullW = vRect.width;
          const fullH = vRect.height;
          const fullX = 0;
          const fullY = 0;

          // 2. Final compact target dimensions matching the left slot in stage grid
          const finalW = slotRect.width;
          const finalH = slotRect.height || (slotRect.width * (9 / 16));
          const finalX = slotRect.left - vRect.left;
          const finalY = slotRect.top - vRect.top;

          return { fullW, fullH, fullX, fullY, finalW, finalH, finalX, finalY };
        };

        let r = getRects();

        // Initial state at scroll = 0: Full screen video covering viewport
        gsap.set(videoCard, {
          left: 0,
          top: 0,
          width: r.fullW,
          height: r.fullH,
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
            end: '+=130%',
            pin: viewport,
            pinSpacing: true,
            scrub: true,
            invalidateOnRefresh: true,
            refreshPriority: 10,
            anticipatePin: 1,
            onRefresh: () => {
              r = getRects();
            }
          }
        });

        // 1. Shrink video from full screen into left slot
        tl.to(videoCard, {
          left: () => r.finalX,
          top: () => r.finalY,
          width: () => r.finalW,
          height: () => r.finalH,
          borderRadius: '8px',
          boxShadow: '0 16px 36px -12px rgba(22, 22, 20, 0.14)',
          ease: 'power2.inOut',
          duration: 1
        }, 0);

        // 2. Top meta bar fades in as video begins shrinking
        if (topBar) {
          tl.to(topBar, {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            duration: 0.45
          }, 0.25);
        }

        // 3. Fade in and slide in the quote on the right as the video clears the space
        tl.to(quoteCol, {
          opacity: 1,
          x: 0,
          ease: 'power2.out',
          duration: 0.45
        }, 0.52);

        // 4. Reveal bottom editorial bar
        if (bottomBar) {
          tl.to(bottomBar, {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            duration: 0.4
          }, 0.6);
        }

        // 5. Brief hold so the viewer can read the settled quote and see the video
        tl.to({}, { duration: 0.3 });

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
            <span className="showreel-tag">
              [ ✦ SHOWREEL ]
            </span>
            <span className="showreel-cue">Craft in motion · 2025</span>
          </div>
          <span className="showreel-cue showreel-sound-cue">Sound off by default · Click to unmute</span>
        </div>

        {/* Main editorial presentation: Stage with video slot and quote */}
        <div ref={stageRef} className="showreel-main showreel-scroll-stage">
          {/* Static Slot for Grid Layout calculation */}
          <div ref={videoSlotRef} className="showreel-video-slot" aria-hidden="true" />

          {/* Right: Editorial Quote exactly matching reference website */}
          <div ref={quoteColRef} className="showreel-quote-col">
            <span className="showreel-quote-kicker">
              [ ! ] Be the brand they never stop talking about
            </span>

            <blockquote className="showreel-quote-statement">
              Design on the web isn&apos;t static anymore. Today&apos;s brands need energy, personality and meaning. We bring together strategy, design and storytelling to build digital experiences that grab attention, move fast and make people feel.
            </blockquote>
          </div>
        </div>

        {/* Bottom editorial split matching reference */}
        <div ref={bottomBarRef} className="showreel-bottom-bar">
          <div className="showreel-sub-left">
            <span className="showreel-sub-kicker">Designing Iconic Brands Daily.</span>
          </div>

          <div className="showreel-sub-right">
            <p className="showreel-sub-desc">
              Your brand has a story. We make sure it&apos;s seen, felt and remembered. We design logos, build brands and create moments that turn attention into action.
            </p>

            <a
              href="#studio"
              onClick={handleLearnMore}
              className="showreel-learn-more"
              aria-label="Learn more about our studio and philosophy"
            >
              <span>Learn More</span>
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

