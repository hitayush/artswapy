import React, { useRef, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useScroll, useTransform, useSpring, useReducedMotion, AnimatePresence } from 'motion/react';
import './styles.css';

const brandQuotes = [
  {
    id: 'rand',
    tab: 'Paul Rand',
    quote: 'Design is the silent ambassador of your brand.',
    author: 'Paul Rand',
    role: 'Pioneer of Modern Corporate Identity',
    topic: 'Visual Ambassador'
  },
  {
    id: 'zeldman',
    tab: 'Jeffrey Zeldman',
    quote: 'Content precedes design. Design in the absence of content is not design, it’s decoration.',
    author: 'Jeffrey Zeldman',
    role: 'Father of Web Standards',
    topic: 'Content Strategy'
  },
  {
    id: 'gansky',
    tab: 'Lisa Gansky',
    quote: 'A brand is a voice and a product is a souvenir.',
    author: 'Lisa Gansky',
    role: 'Author & Entrepreneur',
    topic: 'Brand Longevity'
  },
  {
    id: 'swapy',
    tab: 'Art Swapy',
    quote: 'Identity is not a superficial veneer. It is what you stand for when the noise fades and the room goes quiet.',
    author: 'Art Swapy Studio',
    role: 'Studio Core Axiom',
    topic: 'Radical Authenticity'
  },
  {
    id: 'maeda',
    tab: 'John Maeda',
    quote: 'Simplicity is about subtracting the obvious and adding the meaningful.',
    author: 'John Maeda',
    role: 'The Laws of Simplicity',
    topic: 'Craft Reduction'
  }
];

const projects = [
  { 
    no: '01', 
    name: 'Aaranya', 
    category: 'Identity · Packaging', 
    filter: 'identity',
    year: '2025', 
    className: 'aaranya', 
    mark: 'A', 
    line: 'ROOTED IN\nSOMETHING REAL',
    stamp: 'STITCH SPEC 01\nORGANIC BOTANICAL'
  },
  { 
    no: '02', 
    name: 'Common Ground', 
    category: 'Strategy · Identity', 
    filter: 'strategy',
    year: '2024', 
    className: 'common', 
    mark: 'CG', 
    line: 'A LITTLE MORE\nHUMAN',
    stamp: 'STITCH SPEC 02\nTERRACOTTA DUST'
  },
  { 
    no: '03', 
    name: 'Good Habit', 
    category: 'Identity · Campaign', 
    filter: 'packaging',
    year: '2024', 
    className: 'habit', 
    mark: 'GH', 
    line: 'MAKE ROOM\nFOR BETTER',
    stamp: 'STITCH SPEC 03\nVIVID REDUCTION'
  },
  { 
    no: '04', 
    name: 'Stitch Lab', 
    category: 'Digital Craft · Systems', 
    filter: 'digital',
    year: '2025', 
    className: 'stitchlab', 
    mark: 'AS', 
    line: 'SEWN IN CODE\nBUILT IN TYPE',
    stamp: 'STITCH SPEC 04\nKINETIC PROTOTYPE'
  }
];

/* --------------------------------------------------------------------------
   Art Swapy Bespoke Loading Screen with Split Curtain Reveal
   -------------------------------------------------------------------------- */
function ArtSwapyLoader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [statusStep, setStatusStep] = useState('CALIBRATING STITCH MESH...');
  const [isExiting, setIsExiting] = useState(false);
  const reduce = useReducedMotion();

  // Progress counter animation
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 4) + 2;
      if (current >= 100) {
        current = 100;
        setPercent(100);
        setStatusStep('SYSTEM INITIALIZED. UNZIPPING CANVAS.');
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 850);
        }, 350);
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
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Quote cycling during loading
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % brandQuotes.length);
    }, 1100);
    return () => clearInterval(quoteInterval);
  }, []);

  // Keyboard escape listener to skip
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsExiting(true);
        setTimeout(() => onComplete(), 400);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => onComplete(), 400);
  };

  const activeQuote = brandQuotes[quoteIndex];

  return (
    <div className="artswapy-loader" aria-live="polite" aria-label="Loading Art Swapy Experience">
      {/* Top Split Curtain */}
      <motion.div 
        className="loader-curtain loader-curtain-top"
        animate={isExiting ? { y: '-100%' } : { y: '0%' }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Bottom Split Curtain */}
      <motion.div 
        className="loader-curtain loader-curtain-bottom"
        animate={isExiting ? { y: '100%' } : { y: '0%' }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Center Tactical Stage */}
      <motion.div 
        className="loader-stage-content"
        animate={isExiting ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="loader-header-seam">
          <span className="loader-brand">
            <span className="brand-dot" />
            ART SWAPY // STITCH BOOTSTRAP 2025
          </span>
          <button 
            type="button" 
            className="skip-loader-btn" 
            onClick={handleSkip}
            aria-label="Skip loading screen"
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
              <span style={{ color: 'var(--orange)', fontSize: '0.6em', marginLeft: '4px' }}>%</span>
            </div>
            <div className="loader-progress-seam">
              <div 
                className="loader-progress-fill" 
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="loader-status-step">
              <span className="hud-pill" />
              {statusStep}
            </div>
          </div>

          {/* Cycling Quotes Card on Loading Screen */}
          <div className="loader-quote-box">
            <div className="loader-quote-badge">
              <span>✳</span> BRAND THOUGHT · {activeQuote.topic}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeQuote.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <p className="loader-quote-text">
                  “{activeQuote.quote}”
                </p>
                <div className="loader-quote-author">
                  — <span>{activeQuote.author}</span> · {activeQuote.role}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="loader-footer-seam">
          <span>BHARAT · WORLDWIDE</span>
          <span>CURATED BRAND STRATEGY & TACTILE SYSTEMS</span>
          <span>[REF. 04]</span>
        </div>
      </motion.div>
    </div>
  );
}

function Reveal({ children, className = '', delay = 0, y = 32 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ScrollHud({ onReplayIntro }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 280, damping: 30 });
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <div className="scroll-hud" aria-label="Scroll HUD">
      <span className="hud-pill" />
      <span>STITCH HUD</span>
      <div className="hud-bar">
        <motion.div className="hud-fill" style={{ scaleX }} />
      </div>
      <span>{percent}%</span>
      <button 
        type="button" 
        className="hud-replay-btn" 
        onClick={onReplayIntro}
        title="Replay Intro Loading Screen"
      >
        INTRO ↺
      </button>
    </div>
  );
}

function Header() {
  return (
    <>
      <div className="top-seam-bar">
        <span className="status-live">ART SWAPY STUDIO · AVAILABLE FOR SELECT COMMISSIONS</span>
        <span>EST. 2024 · BHARAT / WORKING WORLDWIDE</span>
      </div>
      <header className="header">
        <a href="#home" className="wordmark" aria-label="Art Swapy home">
          <span className="brand-dot" />
          art<span className="wordmark-light">swapy</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#manifesto">Manifesto</a>
          <a href="#case-story">Story</a>
          <a href="#about">Philosophy</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-cta" href="#contact">
          Start a project <span>↗</span>
        </a>
      </header>
    </>
  );
}

function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const bgGridY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section className="hero" id="home" ref={ref}>
      <div className="hero-top">
        <span>Independent Brand & Digital Practice<br />Tactile Systems · Kinetic Identity</span>
        <span className="hero-index">STITCH EDITION 2025 // [REF 04]</span>
      </div>

      <div className="hero-stage">
        <span className="corner-bracket bracket-tl">⌜</span>
        <span className="corner-bracket bracket-tr">⌝</span>
        <span className="corner-bracket bracket-bl">⌞</span>
        <span className="corner-bracket bracket-br">⌟</span>

        <motion.div className="hero-grid-canvas" style={reduce ? {} : { y: bgGridY }} />

        <div className="hero-headline-wrap">
          <div className="hero-spec-tag">
            <span>✛</span> BRAND CRAFT & STITCH SPECIFICATION 01
          </div>
          <motion.div 
            className="hero-title"
            style={reduce ? {} : { y: titleY }}
            initial={reduce ? false : 'hidden'}
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
            }}
          >
            <motion.span variants={{ hidden: { y: '105%' }, visible: { y: 0 } }}>
              MAKE
            </motion.span>
            <motion.span className="orange-accent" variants={{ hidden: { y: '105%' }, visible: { y: 0 } }}>
              YOUR
            </motion.span>
            <motion.span variants={{ hidden: { y: '105%' }, visible: { y: 0 } }}>
              MARK.
            </motion.span>
          </motion.div>
        </div>

        {/* Interactive Tactical Swatches in Hero */}
        <div className="hero-swatch-stage">
          <motion.div 
            className="stitch-swatch-card"
            drag
            dragConstraints={{ top: -20, bottom: 20, left: -20, right: 20 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="swatch-meta-top">
              <span>SPEC 01 // STRATEGY</span>
              <span className="swatch-badge">STITCH ✛</span>
            </div>
            <div className="swatch-name">Rooted Conviction</div>
            <p className="swatch-desc">Strategy that uncovers who you are before deciding how you look.</p>
            <div className="swatch-thread-line" />
          </motion.div>

          <motion.div 
            className="stitch-swatch-card"
            drag
            dragConstraints={{ top: -20, bottom: 20, left: -20, right: 20 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42 }}
          >
            <div className="swatch-meta-top">
              <span>SPEC 02 // IDENTITY</span>
              <span className="swatch-badge">AS LAB</span>
            </div>
            <div className="swatch-name">Tactile Character</div>
            <p className="swatch-desc">Bold typography, raw texture, and a point of view that sticks.</p>
            <div className="swatch-thread-line" style={{ filter: 'hue-rotate(45deg)' }} />
          </motion.div>

          <motion.div 
            className="stitch-swatch-card"
            drag
            dragConstraints={{ top: -20, bottom: 20, left: -20, right: 20 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.54 }}
          >
            <div className="swatch-meta-top">
              <span>SPEC 03 // SYSTEMS</span>
              <span className="swatch-badge">2025</span>
            </div>
            <div className="swatch-name">Cohesive Stitching</div>
            <p className="swatch-desc">Seamlessly scaled from digital experiences to physical print.</p>
            <div className="swatch-thread-line" style={{ filter: 'brightness(1.3)' }} />
          </motion.div>
        </div>

        <div className="hero-seam-strip">
          <span>DRAG ARTIFACTS TO EXPLORE TACTILITY</span>
          <a href="#work" className="scroll-cue">
            SCROLL TO COMMENCE <span>↓</span>
          </a>
          <span>ART SWAPY DESIGN FRAMEWORK</span>
        </div>
      </div>

      <div className="hero-bottom">
        <span>BRAND ARCHITECTURE / VISUAL IDENTITY / DIGITAL INTERFACES</span>
        <span>A BOUTIQUE PRACTICE FOR AMBITIOUS FOUNDERS</span>
      </div>
    </section>
  );
}

function KineticMarquee() {
  const items = [
    'ART SWAPY',
    'TACTILE BRAND STRATEGY',
    'STITCHED IDENTITY SYSTEMS',
    'PRECISION CRAFT',
    'KINETIC CHOREOGRAPHY',
    'NO TEMPLATES',
    'BUILT WITH CONVICTION'
  ];

  return (
    <div className="marquee-ribbon" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items, ...items].map((text, idx) => (
          <span className="marquee-item" key={idx}>
            {text} <span className="seam-cross">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   FourTwo / Studio Freight Style Kinetic Scroll Text Reveal Section
   -------------------------------------------------------------------------- */
function FourTwoManifesto() {
  const containerRef = useRef(null);
  const [selectedQuoteId, setSelectedQuoteId] = useState('rand');
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 30%']
  });

  const manifestoWords = [
    { text: 'WE', highlight: false },
    { text: 'BELIEVE', highlight: false },
    { text: 'THAT', highlight: false },
    { text: 'ICONIC', highlight: true },
    { text: 'BRANDS', highlight: true },
    { text: 'DO', highlight: false },
    { text: 'NOT', highlight: false },
    { text: 'WIN', highlight: false },
    { text: 'BY', highlight: false },
    { text: 'SHOUTING', highlight: false },
    { text: 'INTO', highlight: false },
    { text: 'THE', highlight: false },
    { text: 'VOID.', highlight: false },
    { text: 'THEY', highlight: false },
    { text: 'WIN', highlight: false },
    { text: 'BY', highlight: false },
    { text: 'CRAFTING', highlight: false },
    { text: 'A', highlight: false },
    { text: 'VOICE', highlight: true },
    { text: 'SO', highlight: false },
    { text: 'GROUNDED,', highlight: true },
    { text: 'A', highlight: false },
    { text: 'SYSTEM', highlight: true },
    { text: 'SO', highlight: false },
    { text: 'COHESIVE,', highlight: true },
    { text: 'AND', highlight: false },
    { text: 'CONTENT', highlight: true },
    { text: 'SO', highlight: false },
    { text: 'MEANINGFUL', highlight: true },
    { text: 'THAT', highlight: false },
    { text: 'RECOGNITION', highlight: true },
    { text: 'BECOMES', highlight: true },
    { text: 'INEVITABLE.', highlight: true }
  ];

  const activeQuote = brandQuotes.find(q => q.id === selectedQuoteId) || brandQuotes[0];

  return (
    <section className="fourtwo-manifesto" id="manifesto" ref={containerRef}>
      <div className="fourtwo-sticky-container">
        <div className="fourtwo-meta-top">
          <span className="eyebrow">
            <span>02</span> FOURTWO STYLE KINETIC REVEAL
          </span>
          <span style={{ color: 'var(--orange)' }}>STITCH SPECIFICATION 2025 // [REF 05]</span>
        </div>

        {/* Dynamic Scroll Text Reveal */}
        <h2 className="fourtwo-big-text" aria-label="Studio Manifesto">
          {manifestoWords.map((wordObj, i) => {
            const wordStart = i / manifestoWords.length;
            const wordEnd = (i + 1) / manifestoWords.length;
            return (
              <FourTwoWord 
                key={i} 
                word={wordObj.text} 
                isHighlight={wordObj.highlight} 
                scrollYProgress={scrollYProgress} 
                start={wordStart} 
                end={wordEnd}
                reduce={reduce}
              />
            );
          })}
        </h2>

        {/* Brand Designing & Content Quotes Deck */}
        <div className="quotes-deck-wrap">
          <div className="quotes-deck-header">
            <span className="eyebrow">
              <span>✳</span> CURATED BRAND & CONTENT QUOTES
            </span>
            <div className="quotes-deck-tabs">
              {brandQuotes.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  className={`quote-tab-pill ${selectedQuoteId === q.id ? 'active' : ''}`}
                  onClick={() => setSelectedQuoteId(q.id)}
                >
                  {q.tab}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            key={activeQuote.id}
            className="quote-featured-card"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="quote-featured-body">
              {activeQuote.quote}
            </div>
            <div className="quote-featured-footer">
              <div>
                <span className="quote-author-name">{activeQuote.author}</span>
                <span className="quote-author-role"> — {activeQuote.role}</span>
              </div>
              <span className="quote-topic-tag">{activeQuote.topic}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FourTwoWord({ word, isHighlight, scrollYProgress, start, end, reduce }) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
  const y = useTransform(scrollYProgress, [start, end], [10, 0]);
  const color = useTransform(
    scrollYProgress,
    [start, end],
    ['rgba(22, 22, 20, 0.2)', isHighlight ? '#ff551f' : '#161614']
  );

  if (reduce) {
    return (
      <span className={`fourtwo-word-span ${isHighlight ? 'fourtwo-word-highlight' : 'fourtwo-word-active'}`}>
        {word}
      </span>
    );
  }

  return (
    <motion.span 
      className="fourtwo-word-span"
      style={{ opacity, y, color }}
    >
      {word}
    </motion.span>
  );
}

function Work() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.filter === activeFilter);

  return (
    <section className="work section-pad" id="work">
      <div className="section-heading">
        <Reveal>
          <p className="eyebrow">
            <span>03</span> SELECTED WORKS · 2024—25
          </p>
          <h2>
            Good work<br />leaves a <em>mark.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="section-intro">
            A curated collection of identities built with weight, intention, and cohesive visual stitching.
          </p>
        </Reveal>
      </div>

      <div className="filter-bar">
        {[
          { key: 'all', label: 'All Works [04]' },
          { key: 'identity', label: 'Identity' },
          { key: 'strategy', label: 'Strategy' },
          { key: 'packaging', label: 'Packaging' },
          { key: 'digital', label: 'Digital Craft' }
        ].map((f) => (
          <button
            key={f.key}
            type="button"
            className={`filter-btn ${activeFilter === f.key ? 'active' : ''}`}
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {filteredProjects.map((p, i) => (
          <Reveal 
            key={p.no} 
            className={`project-card ${i % 2 === 1 ? 'project-card-asym' : ''}`}
            delay={i * 0.08}
          >
            <motion.a 
              className={`project-art ${p.className}`} 
              href="#case-story"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              aria-label={`${p.name} case study preview`}
            >
              <div className="art-frame">
                <span className="art-top">ART SWAPY // STITCH ARCHIVE</span>
                <span className="art-view-tag">INSPECT CASE ↗</span>
                <span className="art-mark">{p.mark}</span>
                <span className="art-line">{p.line}</span>
                <span className="art-stamp">{p.stamp}</span>
              </div>
            </motion.a>
            <div className="project-meta">
              <div>
                <span className="project-no">{p.no} /</span>
                <h3>{p.name}</h3>
              </div>
              <p>{p.category}<br />{p.year}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Story() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });

  const stepLabel = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    ['01 // STRATEGIC BLUEPRINT', '02 // TYPOGRAPHIC STITCH', '03 // COHESIVE SYSTEM', '03 // COHESIVE SYSTEM']
  );

  const tileRotate1 = useTransform(scrollYProgress, [0, 1], [-10, 8]);
  const tileY1 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const tileRotate2 = useTransform(scrollYProgress, [0, 1], [10, -6]);
  const tileY2 = useTransform(scrollYProgress, [0, 1], [-15, 30]);
  const tileRotate3 = useTransform(scrollYProgress, [0, 1], [-4, 12]);
  const scaleVisual = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1.02, 1]);

  return (
    <section className="story" id="case-story" ref={ref}>
      <div className="story-sticky">
        <div className="story-head">
          <p className="eyebrow">
            <span>04</span> DECONSTRUCTED PROCESS
          </p>
          <motion.span className="story-step-indicator">{stepLabel}</motion.span>
        </div>

        <div className="story-content">
          <div className="story-copy">
            <p className="eyebrow">A CONCEPT CASE STUDY</p>
            <h2>
              One clear idea.<br />
              <em>Stitched seamlessly</em><br />
              across every medium.
            </h2>
            <p>
              From the initial strategic truth to the tactile printed artifact, an authentic identity doesn't just look cohesive—it feels unmistakably alive.
            </p>
            <a href="#contact" className="header-cta" style={{ marginTop: '28px', display: 'inline-flex' }}>
              Commission a system <span>↗</span>
            </a>
          </div>

          <motion.div 
            className="story-visual-canvas"
            style={reduce ? {} : { scale: scaleVisual }}
            aria-label="Interactive layered brand architecture"
          >
            <div className="story-grid-overlay" />
            <div className="story-orbit-ring" />
            <div className="story-orbit-ring story-orbit-inner" />

            <motion.div 
              className="story-tile-piece tile-orange-stitch"
              style={reduce ? {} : { rotate: tileRotate1, y: tileY1 }}
            >
              AS
            </motion.div>

            <motion.div 
              className="story-tile-piece tile-white-stitch"
              style={reduce ? {} : { rotate: tileRotate2, y: tileY2 }}
            >
              Aa
            </motion.div>

            <motion.div 
              className="story-tile-piece tile-dark-stitch"
              style={reduce ? {} : { rotate: tileRotate3 }}
            >
              01
              <small>IDENTITY SYSTEM</small>
            </motion.div>
          </motion.div>
        </div>

        <div className="story-progress-seam">
          <motion.div 
            className="story-progress-bar"
            style={{ scaleX: scrollYProgress }} 
          />
        </div>
      </div>
      <div className="story-scroll-space" aria-hidden="true" />
    </section>
  );
}

function About() {
  return (
    <section className="about section-pad" id="about">
      <Reveal>
        <p className="eyebrow">
          <span>05</span> THE PHILOSOPHY
        </p>
        <h2>
          Thoughtful by nature.<br />
          <span>Distinct by design.</span>
        </h2>
      </Reveal>

      <div className="about-grid">
        <Reveal delay={0.1}>
          <p className="about-lead">
            Art Swapy is an independent brand practice partnering with people who want their business to feel unmistakably theirs.
          </p>
        </Reveal>

        <div className="about-body-col">
          <Reveal delay={0.15}>
            <p>
              We connect the dots between what you stand for and what the world sees. Clear thinking first. A visual identity with a sharp point of view. Then a flexible system that carries the idea across every detail.
            </p>
            <p>
              No bloated agency layers. You work directly with the creators shaping your vision from first spark to production delivery.
            </p>
            <div className="craft-pill-list">
              <span className="craft-pill">Dashed Seam Layouts</span>
              <span className="craft-pill">Kinetic Typography</span>
              <span className="craft-pill">Tactile Packaging</span>
              <span className="craft-pill">Stitch Design Systems</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const serviceList = [
    { num: '01', title: 'Brand Strategy', tag: 'POSITIONING · VOICE · NARRATIVE' },
    { num: '02', title: 'Visual Identity', tag: 'LOGOMARK · TYPOGRAPHY · PALETTE' },
    { num: '03', title: 'Packaging Design', tag: 'STRUCTURAL · PRINT · TACTILITY' },
    { num: '04', title: 'Digital Experiences', tag: 'CREATIVE WEBSITES · INTERACTION' },
    { num: '05', title: 'Design Systems', tag: 'STITCH SPEC · GUIDELINES · TOKENS' }
  ];

  return (
    <section className="services section-pad" id="services">
      <div className="section-heading" style={{ borderBottomColor: 'rgba(245, 242, 235, 0.2)' }}>
        <Reveal>
          <p className="eyebrow" style={{ color: '#9e9a91' }}>
            <span>06</span> CAPABILITIES & OFFERINGS
          </p>
          <h2>
            Small team.<br />
            <em>Full picture.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="section-intro">
            From the first exploratory session to production deployment, we build brands that command attention.
          </p>
        </Reveal>
      </div>

      <div className="service-list">
        {serviceList.map((item, idx) => (
          <Reveal key={item.num} delay={idx * 0.05}>
            <div className="service-row">
              <span className="service-num">{item.num} //</span>
              <h3>{item.title}</h3>
              <span className="service-tag">{item.tag}</span>
              <span className="service-arrow">↗</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer className="contact" id="contact">
      <div className="contact-top">
        <p className="eyebrow">
          <span>07</span> HAVE A PROJECT IN MIND?
        </p>
        <span className="contact-spark">✳</span>
      </div>

      <Reveal>
        <h2 className="contact-headline">
          Let’s make<br />
          a <em>mark.</em>
        </h2>
      </Reveal>

      <div className="contact-bottom">
        <p>
          Have a challenge, a big idea, or just want to explore how a tailored identity can elevate your business?<br />
          We respond within 24 hours.
        </p>
        <a className="contact-button" href="mailto:hello@artswapy.com">
          START A PROJECT <span>↗</span>
        </a>
      </div>

      <div className="footer-line">
        <a className="wordmark" href="#home">
          <span className="brand-dot" />
          art<span className="wordmark-light">swapy</span>
        </a>
        <span>INDEPENDENT BY DESIGN · BHARAT / WORLDWIDE</span>
        <a href="mailto:hello@artswapy.com">HELLO@ARTSWAPY.COM</a>
        <a href="#home">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <ArtSwapyLoader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <div className="bg-stitch-mesh" aria-hidden="true" />
      <ScrollHud onReplayIntro={() => setLoading(true)} />
      <Header />
      <main>
        <Hero />
        <KineticMarquee />
        <FourTwoManifesto />
        <Work />
        <Story />
        <About />
        <Services />
      </main>
      <Contact />
    </>
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
