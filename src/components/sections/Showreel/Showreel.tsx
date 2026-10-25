'use client';

import { Fragment, useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/motion/gsap';
import { showreel } from '@/content/site';
import ShowreelPlayer from './ShowreelPlayer.client';

export default function Showreel() {
  const containerRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const kickerRowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const videoSlotRef = useRef<HTMLDivElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);
  const actionRowRef = useRef<HTMLDivElement>(null);

  const handleLearnMore = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string) => void } }).__lenis;
    const workEl = document.querySelector('#work');
    if (workEl) {
      if (lenis) lenis.scrollTo('#work');
      else workEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fullStatement = `${showreel.statement} ${showreel.subDesc}`;
  const words = fullStatement.split(/\s+/).filter(Boolean);

  useGSAP(
    () => {
      const container = containerRef.current;
      const viewport = viewportRef.current;
      const topBar = topBarRef.current;
      const kickerRow = kickerRowRef.current;
      const textEl = textRef.current;
      const videoSlot = videoSlotRef.current;
      const videoCard = videoCardRef.current;
      const actionRow = actionRowRef.current;

      if (!container || !viewport || !videoSlot || !videoCard || !textEl) return;

      const mm = gsap.matchMedia();

      // Desktop: Pinned scroll scrub where video shrinks into upper-left floated slot and text reveals line-by-line
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

        const getWordLines = () => {
          const wordEls = Array.from(textEl.querySelectorAll<HTMLElement>('.showreel-word'));
          const lines: HTMLElement[][] = [];
          let currentLine: HTMLElement[] = [];
          let currentTop = -1;

          wordEls.forEach((el) => {
            const top = Math.round(el.offsetTop);
            if (currentTop === -1 || Math.abs(top - currentTop) > 6) {
              if (currentLine.length > 0) lines.push(currentLine);
              currentLine = [el];
              currentTop = top;
            } else {
              currentLine.push(el);
            }
          });
          if (currentLine.length > 0) lines.push(currentLine);
          return lines;
        };

        let r = getRects();
        let lines = getWordLines();
        const allWords = Array.from(textEl.querySelectorAll<HTMLElement>('.showreel-word'));

        // Initial state at scroll = 0: Full screen video covering viewport
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

        if (topBar) gsap.set(topBar, { opacity: 0, y: -20 });
        if (kickerRow) gsap.set(kickerRow, { opacity: 0, y: -15 });
        if (actionRow) gsap.set(actionRow, { opacity: 0, y: 20 });
        gsap.set(allWords, { opacity: 0.12, y: 8 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=120%',
            pin: viewport,
            pinSpacing: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            refreshPriority: 10,
            anticipatePin: 1,
            fastScrollEnd: true,
            onRefresh: () => {
              r = getRects();
              lines = getWordLines();
              gsap.set(videoCard, { width: r.fullW, height: r.fullH });
            }
          }
        });

        // 1. Smoothly scale and reposition video into upper-left floated slot
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
            duration: 0.85
          },
          0
        );

        // 2. Top meta bar and kicker row fade in as video shrinks
        if (topBar) {
          tl.to(
            topBar,
            {
              opacity: 1,
              y: 0,
              ease: 'power2.out',
              duration: 0.3
            },
            0.1
          );
        }

        if (kickerRow) {
          tl.to(
            kickerRow,
            {
              opacity: 1,
              y: 0,
              ease: 'power2.out',
              duration: 0.35
            },
            0.15
          );
        }

        // 3. Reveal text line by line in sync with the scroll transition
        const textStart = 0.22;
        const textEnd = 0.88;
        const totalSpan = textEnd - textStart;
        const lineStep = lines.length > 1 ? totalSpan / lines.length : totalSpan;

        lines.forEach((lineWords, i) => {
          const start = textStart + i * lineStep;
          tl.to(
            lineWords,
            {
              opacity: 1,
              y: 0,
              ease: 'power2.out',
              duration: Math.max(0.12, lineStep * 1.2)
            },
            start
          );
        });

        // 4. Reveal bottom editorial action row
        if (actionRow) {
          tl.to(
            actionRow,
            {
              opacity: 1,
              y: 0,
              ease: 'power2.out',
              duration: 0.25
            },
            0.82
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
          gsap.set([videoCard, topBar, kickerRow, actionRow, allWords], { clearProps: 'all' });
        };
      });

      // Desktop with prefers-reduced-motion: show final layout immediately without animation
      mm.add('(min-width: 900px) and (prefers-reduced-motion: reduce)', () => {
        const setFinalState = () => {
          const vRect = viewport.getBoundingClientRect();
          const slotRect = videoSlot.getBoundingClientRect();
          const fullW = Math.max(1, vRect.width);
          const fullH = Math.max(1, vRect.height);
          const finalW = slotRect.width;
          const finalH = slotRect.height || slotRect.width * (9 / 16);
          const finalX = slotRect.left - vRect.left;
          const finalY = slotRect.top - vRect.top;

          gsap.set(videoCard, {
            left: 0,
            top: 0,
            width: fullW,
            height: fullH,
            x: finalX,
            y: finalY,
            scaleX: finalW / fullW,
            scaleY: finalH / fullH,
            transformOrigin: '0 0',
            borderRadius: '8px',
            boxShadow: '0 16px 36px -12px rgba(22, 22, 20, 0.14)',
            zIndex: 25
          });
        };

        setFinalState();
        if (topBar) gsap.set(topBar, { opacity: 1, y: 0 });
        if (kickerRow) gsap.set(kickerRow, { opacity: 1, y: 0 });
        if (actionRow) gsap.set(actionRow, { opacity: 1, y: 0 });
        const allWords = textEl.querySelectorAll<HTMLElement>('.showreel-word');
        gsap.set(allWords, { opacity: 1, y: 0 });

        window.addEventListener('resize', setFinalState);
        return () => {
          window.removeEventListener('resize', setFinalState);
          gsap.set([videoCard, topBar, kickerRow, actionRow, allWords], { clearProps: 'all' });
        };
      });

      // Mobile: natural vertical stacked flow without pinning
      mm.add('(max-width: 899px)', () => {
        const allWords = textEl.querySelectorAll<HTMLElement>('.showreel-word');
        gsap.set([videoCard, topBar, kickerRow, actionRow, allWords], { clearProps: 'all' });
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
            <span className="showreel-tag">{showreel.tag}</span>
          </div>
          <span className="showreel-cue showreel-sound-cue">Sound off by default · Click to unmute</span>
        </div>

        {/* Content stage: Kicker + Floated slot & Reflowed Manifesto Text + Action row */}
        <div className="showreel-content-stage">
          <div ref={kickerRowRef} className="showreel-kicker-row">
            <span className="showreel-quote-kicker">{showreel.headline}</span>
          </div>

          <div className="showreel-editorial-flow">
            {/* Floated Slot: reserves the upper-left media footprint in the flow */}
            <div ref={videoSlotRef} className="showreel-float-slot" aria-hidden="true" />

            {/* Manifesto text reflowing beside then below the floated video slot */}
            <p ref={textRef} className="showreel-flow-text">
              {words.map((word, i) => (
                <Fragment key={i}>
                  <span className="showreel-word">{word}</span>
                  {i < words.length - 1 ? ' ' : ''}
                </Fragment>
              ))}
            </p>
          </div>

          {/* Action Row */}
          <div ref={actionRowRef} className="showreel-action-row">
            <span className="showreel-sub-kicker">{showreel.subKicker}</span>

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

        {/* Animating Video Card: Starts full screen, scales & moves into the float slot */}
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
