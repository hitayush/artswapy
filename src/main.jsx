import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, MotionConfig, useReducedMotion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import BlurText from './BlurText.jsx';
import { site, navLinks, hero, intro, projects, services, about, contact, brandQuotes } from './content.js';
import './styles.css';

const EASE = [0.22, 1, 0.36, 1];

/* --------------------------------------------------------------------------
   Shared helpers
   -------------------------------------------------------------------------- */

// Fades/slides children in when they enter the viewport.
// Renders immediately (no animation) when reduced motion is preferred.
function Reveal({ children, className = '', delay = 0, y = 32, as = 'div' }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

// Small visible label for any content that still needs confirming.
function PlaceholderTag({ children = 'Placeholder' }) {
  return <span className="placeholder-tag">{children}</span>;
}

function Wordmark() {
  return (
    <a href="#home" className="wordmark" aria-label={`${site.name} — home`}>
      <span className="brand-dot" aria-hidden="true" />
      art<span className="wordmark-light">swapy</span>
    </a>
  );
}

// Brand-Story Connector: guides the eye with an animated vertical stitch line and diamond node.
// Decorative element, strictly hidden from assistive technology with aria-hidden="true".
function SectionConnector({ variant = 'light', label = 'STITCH LINK' }) {
  const reduce = useReducedMotion();

  return (
    <div
      className={`section-connector connector-${variant}`}
      aria-hidden="true"
      role="presentation"
    >
      <div className="connector-inner">
        {/* Top vertical stitch line */}
        <motion.div
          className="connector-thread-line thread-top"
          initial={reduce ? false : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45, ease: EASE }}
        />

        {/* Center orange diamond stitch node */}
        <motion.div
          className="connector-thread-dot"
          initial={reduce ? false : { scale: 0, rotate: 0, opacity: 0 }}
          whileInView={{ scale: 1, rotate: 45, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.35, delay: 0.18, ease: [0.34, 1.56, 0.64, 1] }}
        />

        {/* Micro monospace spec label */}
        {label && (
          <motion.span
            className="connector-thread-label"
            initial={reduce ? false : { opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.35, delay: 0.26, ease: EASE }}
          >
            {label}
          </motion.span>
        )}

        {/* Bottom vertical stitch line */}
        <motion.div
          className="connector-thread-line thread-bottom"
          initial={reduce ? false : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45, delay: 0.22, ease: EASE }}
        />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Art Swapy Bespoke Loading Screen with Split Curtain Reveal
   -------------------------------------------------------------------------- */
function ArtSwapyLoader({ onRevealStart, onComplete }) {
  const [percent, setPercent] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [statusStep, setStatusStep] = useState('[01/03] CALIBRATING STITCH MESH & PALETTE...');
  const [phase, setPhase] = useState('loading'); // 'loading' | 'release' | 'parting'
  const reduce = useReducedMotion();
  const hasFinishedRef = useRef(false);

  // Safe skip handler: immediately starts parting and exits cleanly
  const handleSkip = () => {
    if (hasFinishedRef.current) return;
    setPhase('parting');
    document.body.style.overflow = '';
    onRevealStart?.();
    setTimeout(() => {
      hasFinishedRef.current = true;
      onComplete?.();
    }, 280);
  };

  // Progress counter and staged release (calibrated for ~1.8-2.4s total cinematic flow)
  useEffect(() => {
    // If user prefers reduced motion, show site immediately with zero delay
    if (reduce) {
      document.body.style.overflow = '';
      onRevealStart?.();
      onComplete?.();
      return undefined;
    }

    document.body.style.overflow = 'hidden';

    // Reliability safety fallback: ensure loader never blocks the page
    const safetyTimer = setTimeout(() => {
      if (!hasFinishedRef.current) {
        document.body.style.overflow = '';
        hasFinishedRef.current = true;
        onRevealStart?.();
        onComplete?.();
      }
    }, 3000);

    let current = 0;
    let releaseTimer = null;
    let partingTimer = null;
    let completeTimer = null;

    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 3) + 2;
      if (current >= 100) {
        current = 100;
        setPercent(100);
        setStatusStep('CANVAS READY. RELEASING STAGE...');
        clearInterval(interval);

        // Step 2: Brief controlled release of centered stage content
        releaseTimer = setTimeout(() => {
          setPhase('release');

          // Step 3: Animate curtains away & coordinate Hero entrance
          partingTimer = setTimeout(() => {
            setPhase('parting');
            document.body.style.overflow = '';
            onRevealStart?.();

            completeTimer = setTimeout(() => {
              hasFinishedRef.current = true;
              onComplete?.();
            }, 780);
          }, 180);
        }, 150);
      } else {
        setPercent(current);
        if (current > 75) {
          setStatusStep('[03/03] ALIGNING EDITORIAL CONTENT HIERARCHY...');
        } else if (current > 40) {
          setStatusStep('[02/03] WEAVING TYPOGRAPHIC ARCHITECTURE...');
        } else {
          setStatusStep('[01/03] CALIBRATING STITCH MESH & PALETTE...');
        }
      }
    }, 34);

    return () => {
      clearInterval(interval);
      clearTimeout(releaseTimer);
      clearTimeout(partingTimer);
      clearTimeout(completeTimer);
      clearTimeout(safetyTimer);
      document.body.style.overflow = '';
    };
  }, [onComplete, onRevealStart, reduce]);

  // Quote cycling during loading
  useEffect(() => {
    if (reduce) return undefined;
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % brandQuotes.length);
    }, 1250);
    return () => clearInterval(quoteInterval);
  }, [reduce]);

  // Keyboard escape listener to skip
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeQuote = brandQuotes[quoteIndex] || brandQuotes[0];
  const isParting = phase === 'parting';
  const isReleasing = phase === 'release' || phase === 'parting';

  return (
    <div
      className={`artswapy-loader ${isParting ? 'is-parting' : ''}`}
      aria-live="polite"
      aria-label="Loading ArtSwapy Experience"
    >
      {/* Top Split Curtain */}
      <motion.div
        className="loader-curtain loader-curtain-top"
        initial={{ y: '0%' }}
        animate={isParting ? { y: '-100%' } : { y: '0%' }}
        transition={{ duration: 0.78, ease: [0.76, 0, 0.24, 1] }}
      >
        <span className="curtain-stitch-line curtain-stitch-bottom" aria-hidden="true" />
      </motion.div>

      {/* Bottom Split Curtain */}
      <motion.div
        className="loader-curtain loader-curtain-bottom"
        initial={{ y: '0%' }}
        animate={isParting ? { y: '100%' } : { y: '0%' }}
        transition={{ duration: 0.78, ease: [0.76, 0, 0.24, 1] }}
      >
        <span className="curtain-stitch-line curtain-stitch-top" aria-hidden="true" />
      </motion.div>

      {/* Center Tactical Stage Content with Controlled Release */}
      <motion.div
        className="loader-stage-content"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={
          isReleasing
            ? { opacity: 0, scale: 0.97, filter: 'blur(6px)' }
            : { opacity: 1, scale: 1, filter: 'blur(0px)' }
        }
        transition={
          isReleasing
            ? { duration: 0.22, ease: [0.4, 0, 0.2, 1] }
            : { duration: 0.4, ease: EASE }
        }
      >
        <div className="loader-header-seam">
          <span className="loader-brand">
            <span className="brand-dot" aria-hidden="true" />
            ARTSWAPY // STITCH EDITION
          </span>
          <button
            type="button"
            className="skip-loader-btn"
            onClick={handleSkip}
            aria-label="Skip loading intro"
          >
            [ESC] SKIP INTRO ➔
          </button>
        </div>

        <div className="loader-center-body">
          <div className="loader-counter-wrap">
            <span className="loader-counter-tag">
              <span>✛</span> INITIALIZING STITCH ARCHITECTURE
            </span>
            <div className="loader-counter-num">
              {percent < 10 ? `0${percent}` : percent}
              <span className="counter-pct-mark">%</span>
            </div>
            <div className="loader-progress-seam">
              <div
                className="loader-progress-fill"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="loader-status-step">
              <span className="hud-pill" aria-hidden="true" />
              {statusStep}
            </div>
          </div>

          {/* Cycling Quotes Card on Loading Screen with BlurText */}
          <div className="loader-quote-box">
            <div className="loader-quote-badge">
              <span>✳</span> BRAND THOUGHT · {activeQuote.topic}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeQuote.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <BlurText
                  key={`quote-${activeQuote.id}`}
                  text={`“${activeQuote.quote}”`}
                  className="loader-quote-text"
                  animateBy="words"
                  direction="top"
                  blur={8}
                  delay={35}
                  stepDuration={0.22}
                  trigger="load"
                />
                <div className="loader-quote-author">
                  — <span>{activeQuote.author}</span> · {activeQuote.role}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="loader-footer-seam">
          <span>SWAPNIL GATHIBANDHE</span>
          <span>BRAND DESIGN & CONSULTING PRACTICE</span>
          <span>EST. 2024</span>
        </div>
      </motion.div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   1. Site header
   -------------------------------------------------------------------------- */
function Header({ isRevealing = true }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const navRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (e) => {
      if (!navRef.current?.contains(e.target) && !buttonRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    const desktop = window.matchMedia('(min-width: 861px)');
    const onBreakpoint = (e) => e.matches && setOpen(false);

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    desktop.addEventListener('change', onBreakpoint);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      desktop.removeEventListener('change', onBreakpoint);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <motion.header
      className="header"
      initial={reduce ? false : { opacity: 0, y: -14 }}
      animate={reduce || isRevealing ? { opacity: 1, y: 0 } : { opacity: 0, y: -14 }}
      transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
    >
      <Wordmark />

      <button
        ref={buttonRef}
        type="button"
        className="menu-toggle"
        aria-controls="site-nav"
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="menu-toggle-label" aria-hidden="true">{open ? 'Close' : 'Menu'}</span>
        <span className={`menu-icon ${open ? 'is-open' : ''}`} aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      <nav
        id="site-nav"
        ref={navRef}
        className={`site-nav ${open ? 'is-open' : ''}`}
        aria-label="Main navigation"
      >
        <ul>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={close}>{link.label}</a>
            </li>
          ))}
        </ul>
        <a className="header-cta" href="#contact" onClick={close}>
          Start a project <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </motion.header>
  );
}

/* --------------------------------------------------------------------------
   2. Hero
   -------------------------------------------------------------------------- */
function Portrait({ isRevealing = true }) {
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState(false);

  return (
    <motion.figure
      className="hero-portrait"
      initial={reduce ? false : { opacity: 0, y: 28 }}
      animate={reduce || isRevealing ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.9, delay: 0.22, ease: EASE }}
    >
      <span className="portrait-offset" aria-hidden="true" />

      <div className="portrait-card">
        <span className="corner-bracket bracket-tl" aria-hidden="true">⌜</span>
        <span className="corner-bracket bracket-tr" aria-hidden="true">⌝</span>
        <span className="corner-bracket bracket-bl" aria-hidden="true">⌞</span>
        <span className="corner-bracket bracket-br" aria-hidden="true">⌟</span>

        <motion.div
          className="portrait-frame"
          initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={reduce || isRevealing ? { clipPath: 'inset(0% 0% 0% 0%)' } : { clipPath: 'inset(100% 0% 0% 0%)' }}
          transition={{ duration: 1.05, delay: 0.36, ease: EASE }}
        >
          {failed ? (
            <div
              className="portrait-fallback"
              role="img"
              aria-label={`Portrait placeholder for ${site.founder}`}
            >
              <span className="portrait-fallback-mark" aria-hidden="true">SG</span>
              <PlaceholderTag>Portrait placeholder</PlaceholderTag>
              <code>public{hero.portrait.src}</code>
            </div>
          ) : (
            <img
              src={hero.portrait.src}
              alt={hero.portrait.alt}
              width="800"
              height="1000"
              fetchPriority="high"
              onError={() => setFailed(true)}
            />
          )}
        </motion.div>

        <figcaption>{hero.portrait.caption}</figcaption>
      </div>
    </motion.figure>
  );
}

function Hero({ isRevealing = true }) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      className="hero"
      id="home"
      aria-labelledby="hero-title"
      initial={reduce ? false : { opacity: 0, scale: 1.025 }}
      animate={reduce || isRevealing ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.025 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
    >
      <div className="hero-grid-canvas" aria-hidden="true" />

      <div className="hero-copy">
        <motion.p
          className="hero-eyebrow"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={reduce || isRevealing ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.65, delay: 0.12, ease: EASE }}
        >
          <span className="brand-dot" aria-hidden="true" />
          {site.name} · {hero.eyebrow}
        </motion.p>

        <motion.h1
          id="hero-title"
          className="hero-title"
          initial={reduce ? false : 'hidden'}
          animate={reduce || isRevealing ? 'visible' : 'hidden'}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.09,
                delayChildren: 0.16
              }
            },
            hidden: {}
          }}
        >
          {hero.headline.map((line) => (
            <span className="line-mask" key={line.text}>
              <motion.span
                className={`line ${line.accent ? 'accent' : ''}`}
                variants={{
                  hidden: { y: '110%' },
                  visible: { y: '0%', transition: { duration: 0.85, ease: EASE } }
                }}
              >
                {line.text}
              </motion.span>{' '}
            </span>
          ))}
        </motion.h1>

        <BlurText
          as="p"
          text={hero.supporting}
          className="hero-supporting"
          animateBy="words"
          direction="bottom"
          blur={6}
          delay={25}
          stepDuration={0.24}
          trigger={isRevealing ? 'load' : 'manual'}
        />
      </div>

      <Portrait isRevealing={isRevealing} />

      <motion.div
        className="hero-strip"
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={reduce || isRevealing ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.75, delay: 0.44, ease: EASE }}
      >
        <dl className="hero-meta">
          {hero.meta.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>
                {item.value}
                {item.placeholder && <PlaceholderTag>Editable</PlaceholderTag>}
              </dd>
            </div>
          ))}
        </dl>
        <a href={hero.scrollCue.href} className="scroll-cue">
          {hero.scrollCue.label} <span aria-hidden="true">↓</span>
        </a>
      </motion.div>
    </motion.section>
  );
}

/* --------------------------------------------------------------------------
   3. Studio introduction
   -------------------------------------------------------------------------- */
function StudioIntro() {
  return (
    <section className="intro section-pad" id="studio" aria-labelledby="intro-title">
      <Reveal>
        <p className="eyebrow"><span>01</span> {intro.eyebrow}</p>
      </Reveal>
      <div className="intro-grid">
        <BlurText
          as="h2"
          id="intro-title"
          text={intro.lead}
          className="intro-lead"
          animateBy="words"
          direction="top"
          blur={8}
          delay={35}
          stepDuration={0.25}
          trigger="view"
          threshold={0.15}
        />
        <Reveal delay={0.15}>
          <p className="intro-body">{intro.body}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   4. Selected work — Horizontal Scroll Showcase with Subtle Parallax Depth
   -------------------------------------------------------------------------- */

// WorkPanel: Dedicated sub-component for project showcase panels.
// Implements restrained parallax depth for internal artwork while keeping
// project cards, typography, tags, and action buttons 100% stable and legible.
function WorkPanel({ project, scrollYProgress, reduce }) {
  // Parallax: Artwork inside the frame shifts slightly slower than its frame as visitor scrolls horizontally.
  // Because horizontal track moves left (-scrollDistance), shifting the artwork from -32 to +32 produces
  // a gentle, physical lag relative to the frame.
  const artParallaxX = useTransform(scrollYProgress, [0, 1], [-32, 32]);
  const markParallaxX = useTransform(scrollYProgress, [0, 1], [-14, 14]);

  return (
    <article className="work-panel" aria-labelledby={`project-${project.no}`}>
      <div className={`work-panel-canvas ${project.className}`}>
        <span className="corner-bracket bracket-tl" aria-hidden="true">⌜</span>
        <span className="corner-bracket bracket-tr" aria-hidden="true">⌝</span>
        <span className="corner-bracket bracket-bl" aria-hidden="true">⌞</span>
        <span className="corner-bracket bracket-br" aria-hidden="true">⌟</span>

        <motion.div
          className="work-panel-art-frame"
          style={reduce ? {} : { x: artParallaxX }}
        >
          <span className="art-top">ARTSWAPY // ARCHIVE {project.no}</span>
          <motion.span
            className="art-mark"
            style={reduce ? {} : { x: markParallaxX }}
          >
            {project.mark}
          </motion.span>
          <span className="art-line">{project.line}</span>
          <span className="art-stamp">SPEC {project.no} · {project.year}</span>
        </motion.div>
      </div>

      <div className="work-panel-footer">
        <div className="work-panel-meta-row">
          <span className="work-year-pill">{project.year}</span>
          <span className="work-industry">{project.industry}</span>
          <span className="work-category">{project.category}</span>
        </div>

        <div className="work-panel-title-row">
          <div className="work-title-wrap">
            <span className="work-panel-no">{project.no} /</span>
            <h3 id={`project-${project.no}`} className="work-panel-name">{project.name}</h3>
            <span className="work-panel-tag"><PlaceholderTag /></span>
          </div>

          <a
            href="#contact"
            className="work-panel-circle-btn"
            aria-label={`Commission a project like ${project.name}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

function Work() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const reduce = useReducedMotion();

  // Measure track width dynamically to prevent hardcoding scroll distances
  useEffect(() => {
    if (reduce) return undefined;

    const measureDistance = () => {
      if (!trackRef.current || !viewportRef.current) return;
      const trackW = trackRef.current.scrollWidth;
      const viewW = viewportRef.current.clientWidth;
      const distance = Math.max(0, trackW - viewW + 48);
      setScrollDistance(distance);
    };

    measureDistance();
    window.addEventListener('resize', measureDistance);
    return () => window.removeEventListener('resize', measureDistance);
  }, [reduce]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Dynamic X translation from measured track size
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  // Update active project index dynamically as visitor scrolls
  useEffect(() => {
    if (reduce) return undefined;
    return scrollYProgress.on('change', (latest) => {
      const idx = Math.min(projects.length - 1, Math.floor(latest * projects.length));
      setActiveProject(idx);
    });
  }, [scrollYProgress, reduce]);

  return (
    <section className="work-scroll-container" id="work" ref={containerRef} aria-labelledby="work-title">
      <div className="work-sticky-viewport">
        {/* Sticky viewport header */}
        <div className="work-viewport-header">
          <div className="work-header-left">
            <p className="eyebrow">
              <span>02</span> Selected work
              <span className="work-active-pill" aria-live="polite">
                [0{activeProject + 1} / 0{projects.length}] {projects[activeProject]?.name}
              </span>
            </p>
            <h2 id="work-title" className="work-viewport-title">
              Good work leaves a <em>mark.</em>
            </h2>
          </div>
          <div className="work-header-right">
            <PlaceholderTag>Concept placeholders</PlaceholderTag>
            <span className="work-scroll-hint" aria-hidden="true">
              SCROLL DOWN TO EXPLORE ➔
            </span>
          </div>
        </div>

        {/* Horizontal moving filmstrip with dynamic viewport measurement */}
        <div className="work-track-wrapper" ref={viewportRef}>
          <motion.div 
            ref={trackRef}
            className="work-horizontal-track"
            style={reduce ? {} : { x }}
          >
            {projects.map((p) => (
              <WorkPanel
                key={p.no}
                project={p}
                scrollYProgress={scrollYProgress}
                reduce={reduce}
              />
            ))}

            {/* Concluding Story Panel */}
            <div className="work-panel work-panel-finale">
              <div className="finale-card">
                <span className="corner-bracket bracket-tl" aria-hidden="true">⌜</span>
                <span className="corner-bracket bracket-tr" aria-hidden="true">⌝</span>
                <span className="corner-bracket bracket-bl" aria-hidden="true">⌞</span>
                <span className="corner-bracket bracket-br" aria-hidden="true">⌟</span>

                <div className="finale-content">
                  <span className="finale-eyebrow">THE CRAFT PHILOSOPHY</span>
                  <BlurText
                    as="h3"
                    text="Every identity is a story stitched to endure."
                    className="finale-title"
                    animateBy="words"
                    direction="top"
                    blur={8}
                    delay={45}
                    stepDuration={0.26}
                    trigger="view"
                    threshold={0.15}
                  />
                  <p className="finale-desc">
                    These concept studies explore how conviction, tactile packaging, and typographic character unite into cohesive systems.
                  </p>
                  <a href="#contact" className="finale-cta">
                    Start a project with us <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom progress seam */}
        <div className="work-viewport-seam" aria-hidden="true">
          <motion.div 
            className="work-viewport-progress" 
            style={reduce ? { width: '100%' } : { scaleX: scrollYProgress }} 
          />
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   5. Services preview — Coordinated Staggered Narrative Reveal
   -------------------------------------------------------------------------- */
const serviceContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08
    }
  }
};

const serviceRowVariants = {
  hidden: {
    opacity: 0,
    y: 24
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASE
    }
  }
};

function Services() {
  const reduce = useReducedMotion();

  return (
    <section className="services section-pad" id="services" aria-labelledby="services-title">
      <div className="section-heading">
        <Reveal>
          <p className="eyebrow"><span>03</span> Services</p>
          <h2 id="services-title">
            From first idea<br /><em>to every touchpoint.</em>
          </h2>
        </Reveal>
      </div>

      <motion.ul
        className="service-list"
        variants={reduce ? undefined : serviceContainerVariants}
        initial={reduce ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {services.map((item) => (
          <motion.li
            key={item.num}
            className="service-row"
            variants={reduce ? undefined : serviceRowVariants}
          >
            <span className="service-num">{item.num} //</span>
            <h3>{item.title}</h3>
            <p className="service-desc">{item.description}</p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}

/* --------------------------------------------------------------------------
   6. About / founder preview
   -------------------------------------------------------------------------- */
function About() {
  return (
    <section className="about section-pad" id="about" aria-labelledby="about-title">
      <Reveal>
        <p className="eyebrow"><span>04</span> {about.eyebrow}</p>
        <h2 id="about-title" className="about-title">{about.heading}</h2>
      </Reveal>

      <div className="about-grid">
        <Reveal delay={0.08}>
          <p className="about-lead">{about.lead}</p>
        </Reveal>
        <Reveal delay={0.14} className="about-body-col">
          <p>
            {about.bio.placeholder && <PlaceholderTag />}
            {about.bio.text}
          </p>
          <p className="process-label">{about.processLabel}</p>
          <ol className="craft-pill-list">
            {about.process.map((step) => (
              <motion.li 
                className="craft-pill" 
                key={step}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {step}
              </motion.li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   7. Contact call to action
   -------------------------------------------------------------------------- */
function Contact() {
  const reduce = useReducedMotion();

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <motion.div
        className="contact-narrative-wrapper"
        initial={reduce ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE }}
      >
        <p className="eyebrow"><span>05</span> {contact.eyebrow}</p>

        <div className="contact-headline-wrap">
          <BlurText
            as="h2"
            id="contact-title"
            text="Ready to stand out?"
            className="contact-headline"
            animateBy="words"
            direction="top"
            blur={12}
            delay={50}
            stepDuration={0.3}
            trigger="view"
            threshold={0.2}
          />
          <motion.p
            className="contact-subheadline"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            {contact.heading[1]}
          </motion.p>
        </div>

        <div className="contact-bottom">
          <p className="contact-story-text">{contact.text}</p>
          <div className="contact-action">
            <motion.a
              className="contact-button"
              href={`mailto:${site.email.address}`}
              whileHover={{ scale: 1.05, x: 10 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {contact.cta} <span aria-hidden="true">↗</span>
            </motion.a>
            <p className="contact-email">
              {site.email.address}
              {site.email.placeholder && <PlaceholderTag>Confirm email</PlaceholderTag>}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   8. Footer
   -------------------------------------------------------------------------- */
function Footer() {
  return (
    <footer className="site-footer">
      <Wordmark />
      <nav aria-label="Footer navigation">
        <ul>
          {navLinks.map((link) => (
            <li key={link.href}><a href={link.href}>{link.label}</a></li>
          ))}
        </ul>
      </nav>
      <p>© {new Date().getFullYear()} {site.name}</p>
      <a href="#home">Back to top <span aria-hidden="true">↑</span></a>
    </footer>
  );
}

/* --------------------------------------------------------------------------
   App
   -------------------------------------------------------------------------- */
function App() {
  const reduce = useReducedMotion();
  const [loading, setLoading] = useState(!reduce);
  const [isRevealing, setIsRevealing] = useState(Boolean(reduce));

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {loading && (
          <ArtSwapyLoader
            onRevealStart={() => setIsRevealing(true)}
            onComplete={() => setLoading(false)}
          />
        )}
      </AnimatePresence>

      <a className="skip-link" href="#main">Skip to content</a>
      <div className="bg-stitch-mesh" aria-hidden="true" />
      <Header isRevealing={isRevealing} />
      <main id="main" tabIndex={-1}>
        <Hero isRevealing={isRevealing} />
        <SectionConnector variant="light" label="THREAD // 01 · STUDIO THESIS" />
        <StudioIntro />
        <SectionConnector variant="light" label="THREAD // 02 · SELECTED ARCHIVE" />
        <Work />
        <SectionConnector variant="transition" label="THREAD // 03 · DISCIPLINE SUITE" />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}

const rootEl = document.getElementById('root');
if (!rootEl._reactRoot) {
  rootEl._reactRoot = createRoot(rootEl);
}
rootEl._reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
