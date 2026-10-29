import Link from 'next/link';
import type { Project } from '@/types/content';
import { site, projects } from '@/content/site';
import CTAButton from '@/components/primitives/CTAButton';
import RevealRoot from '@/components/primitives/RevealRoot';
import ThemeToggle from '@/components/primitives/ThemeToggle.client';
import FooterClose from '@/components/sections/FooterClose/FooterClose';

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
  const cs = project.caseStudy;

  // Find related projects for section 21
  const relatedProjects = projects.filter((p) => p.id !== 'softtouch').slice(0, 2);

  return (
    <div className="cs-softtouch-flow">
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
          1. Full-width orange hero image with the four Softtouch paint buckets.
          Authoritative Asset: /images/projects/softtouch/softtouch case study-02.jpg (1919 x 982)
          ========================================================================= */}
      <section className="cs-section-1-hero" aria-label="Softtouch 4-Bucket Master Product Lineup">
        <div className="cs-hero-full-media">
          <img
            src="/images/projects/softtouch/softtouch case study-02.jpg"
            alt="Softtouch 4-bucket product family featuring Atmoshield, Evershield, Storm Shield, and Aura Interior Emulsions against a vibrant orange backdrop"
            width={1919}
            height={982}
            className="cs-hero-full-img"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </section>

      {/* =========================================================================
          2. Inset warm-white project introduction panel with metadata and a large Softtouch title,
             replacing the AARANYA template title.
          ========================================================================= */}
      <RevealRoot as="section" className="cs-section-2-intro" aria-label="Project Introduction">
        <div className="cs-container">
          <div className="cs-intro-card" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
            <div className="cs-intro-meta-top">
              <span className="cs-intro-kicker mono">[ CASE STUDY · {project.year} ]</span>
              <span className="cs-intro-cat mono">{project.category}</span>
              <span className="cs-intro-pill mono">Brand Identity &amp; Packaging Architecture</span>
            </div>

            <h1 className="cs-intro-monument-title">
              {project.name}
            </h1>

            <p className="cs-intro-lead-summary">
              {project.summary}
            </p>

            <div className="cs-intro-specs-grid">
              <div className="cs-intro-spec-item">
                <span className="spec-label mono">Discipline</span>
                <strong className="spec-value">{project.discipline ?? 'Packaging Architecture & Brand Identity'}</strong>
              </div>
              <div className="cs-intro-spec-item">
                <span className="spec-label mono">Sector</span>
                <strong className="spec-value">Architectural Coatings &amp; Chemicals</strong>
              </div>
              <div className="cs-intro-spec-item">
                <span className="spec-label mono">Manufacturing Base</span>
                <strong className="spec-value">MIDC Industrial Area, Butibori, Nagpur</strong>
              </div>
              <div className="cs-intro-spec-item">
                <span className="spec-label mono">Creative Direction</span>
                <strong className="spec-value">{site.founder} · ArtSwapy</strong>
              </div>
            </div>
          </div>
        </div>
      </RevealRoot>

      {/* =========================================================================
          3. Full-width orange panel with the Softtouch logo centered.
          Authoritative Asset: /images/projects/softtouch/softtouch case study-03.jpg (1918 x 883)
          ========================================================================= */}
      <RevealRoot as="section" className="cs-section-3-orange-logo" aria-label="Softtouch Brand Signature Panel">
        <div className="cs-orange-logo-inner" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
          <img
            src="/images/projects/softtouch/softtouch case study-03.jpg"
            alt="Softtouch brand logo centered on signature vibrant orange ground"
            width={1918}
            height={883}
            className="cs-orange-logo-img"
            loading="lazy"
          />
        </div>
      </RevealRoot>

      {/* =========================================================================
          4. Light two-column brand/story text section.
          ========================================================================= */}
      <RevealRoot as="section" className="cs-section-4-story" aria-label="Brand Story and Strategic Context">
        <div className="cs-container">
          <div className="cs-story-layout">
            <div className="cs-story-left-col" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
              <span className="ph-tag orange-tag mono">[ BRAND STORY &amp; STRATEGY ]</span>
              <h2 className="heading cs-story-heading">Packaging Architecture &amp; Identity</h2>
            </div>
            <div className="cs-story-right-col" data-r="rise" style={{ '--i': 1 } as React.CSSProperties}>
              <p className="body cs-story-lead-p">
                {cs?.challenge ?? 'The decorative paints and wallcare category is intensely crowded, dominated by legacy conglomerates with high distributor recall. Softtouch needed a distinctive, premium brand identity and packaging architecture that conveyed structural reliability, superior coating chemistry, and immediate shelf standout across tier-1 and tier-2 dealer distribution networks.'}
              </p>
              <p className="body muted cs-story-sub-p">
                {cs?.solution ?? 'ArtSwapy engineered an ergonomic container system across 20L, 10L, 4L, and 1L capacity pails paired with a fluid, high-coverage visual identity system, dynamic logomark, regional trade campaign motto, and standardized retail dealership environments.'}
              </p>
            </div>
          </div>
        </div>
      </RevealRoot>

      {/* =========================================================================
          5. Typography and colour palette composition.
          Slide image + live typography & swatches
          ========================================================================= */}
      <RevealRoot as="section" className="cs-section-5-type-palette" aria-label="Typography and Colour System">
        <div className="cs-container">
          <div className="cs-section-header" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
            <span className="ph-tag orange-tag mono">[ 01 · DESIGN SYSTEM FOUNDATIONS ]</span>
            <h2 className="heading cs-section-title">Typography &amp; Colour Palette System</h2>
            <p className="body muted cs-section-lead">
              A high-contrast typographic hierarchy paired with an industrial color system engineered for shelf standout and technical clarity on metallic and polymeric packaging substrates.
            </p>
          </div>

          <div className="cs-type-palette-composition" data-r="rise" style={{ '--i': 1 } as React.CSSProperties}>
            {/* Left: Typography */}
            <div className="cs-type-col-card">
              <span className="cs-card-sublabel mono">[ PRIMARY BRAND TYPEFACE · MONTSERRAT ]</span>
              <div className="cs-type-specimen-box">
                <div className="cs-type-sample-name">Montserrat</div>
                <div className="cs-type-sample-alphabet">
                  Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
                </div>
                <div className="cs-type-sample-numbers">0123456789</div>
                <div className="cs-type-sample-weights">
                  <span className="cs-weight-chip" style={{ fontWeight: 300 }}>Light 300</span>
                  <span className="cs-weight-chip" style={{ fontWeight: 400 }}>Regular 400</span>
                  <span className="cs-weight-chip" style={{ fontWeight: 500 }}>Medium 500</span>
                  <span className="cs-weight-chip" style={{ fontWeight: 600 }}>Semibold 600</span>
                  <span className="cs-weight-chip" style={{ fontWeight: 700 }}>Bold 700</span>
                  <span className="cs-weight-chip" style={{ fontWeight: 800 }}>Extrabold 800</span>
                </div>
              </div>
            </div>

            {/* Right: Palette Swatches */}
            <div className="cs-palette-col-card">
              <span className="cs-card-sublabel mono">[ OFFICIAL COLOUR CHIPS &amp; TONAL SCALE ]</span>
              <div className="cs-palette-chips-stack">
                <div className="cs-palette-chip-item" style={{ backgroundColor: '#E87124', color: '#ffffff' }}>
                  <div className="cs-chip-top">
                    <span className="cs-chip-hex-code mono">#E87124</span>
                    <span className="cs-chip-name-title">Softtouch Orange</span>
                  </div>
                  <div className="cs-chip-specs mono">
                    <span>RGB: 232, 113, 36</span>
                    <span>CMYK: 0, 64, 95, 0</span>
                  </div>
                </div>

                <div className="cs-palette-chip-item" style={{ backgroundColor: '#231F20', color: '#ffffff' }}>
                  <div className="cs-chip-top">
                    <span className="cs-chip-hex-code mono">#231F20</span>
                    <span className="cs-chip-name-title">Industrial Deep Ink</span>
                  </div>
                  <div className="cs-chip-specs mono">
                    <span>RGB: 35, 31, 32</span>
                    <span>CMYK: 70, 67, 64, 74</span>
                  </div>
                </div>

                <div className="cs-palette-chip-item cs-chip-white-border" style={{ backgroundColor: '#FFFFFF', color: '#161614' }}>
                  <div className="cs-chip-top">
                    <span className="cs-chip-hex-code mono">#FFFFFF</span>
                    <span className="cs-chip-name-title">Substrate White</span>
                  </div>
                  <div className="cs-chip-specs mono">
                    <span>RGB: 255, 255, 255</span>
                    <span>CMYK: 0, 0, 0, 0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealRoot>

      {/* =========================================================================
          6. Centered Softtouch logo on a light background.
          Authoritative Asset: /images/projects/softtouch/softtouch case study-04.jpg (1918 x 883)
          ========================================================================= */}
      <RevealRoot as="section" className="cs-section-6-light-logo" aria-label="Softtouch Logo on Light Ground">
        <div className="cs-container">
          <div className="cs-light-logo-panel" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
            <span className="cs-panel-badge mono">[ PRIMARY WORDMARK · INK &amp; ORANGE ON WARM PAPER ]</span>
            <div className="cs-light-logo-wrap">
              <img
                src="/images/projects/softtouch/softtouch case study-04.jpg"
                alt="Softtouch primary brand logo on warm paper ground showing fluid brush stroke detail"
                width={1918}
                height={883}
                className="cs-light-logo-img"
                loading="lazy"
              />
            </div>
            <p className="cs-panel-subcaption mono">
              Dynamic asterisk swoosh mark pairing structural chemistry with smooth surface spread
            </p>
          </div>
        </div>
      </RevealRoot>

      {/* =========================================================================
          7. Horizontal row of branded product/object images.
          Authoritative Assets:
          - /images/projects/softtouch/softtouch case study-07.jpg (634 x 425)
          - /images/projects/softtouch/softtouch case study-08.jpg (634 x 425)
          - /images/projects/softtouch/softtouch case study-09.jpg (634 x 425)
          ========================================================================= */}
      <RevealRoot as="section" className="cs-section-7-merch-strip" aria-label="Branded Utility Objects">
        <div className="cs-container">
          <div className="cs-section-header" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
            <span className="ph-tag orange-tag mono">[ 02 · BRAND TOUCHPOINTS ]</span>
            <h2 className="heading cs-section-title">Branded Collateral &amp; Utility Objects</h2>
            <p className="body muted cs-section-lead">
              Dealer-counter stoneware, double-wall contractor hydration flasks, and technical specification drives.
            </p>
          </div>

          <div className="cs-merch-triptych-grid" data-r="shutter">
            <div className="cs-merch-card-item">
              <img
                src="/images/projects/softtouch/softtouch case study-07.jpg"
                alt="Softtouch branded ceramic stoneware coffee mug on desk"
                width={634}
                height={425}
                className="cs-contain-media"
                loading="lazy"
              />
            </div>
            <div className="cs-merch-card-item">
              <img
                src="/images/projects/softtouch/softtouch case study-08.jpg"
                alt="Softtouch stainless steel hydration flask with branded canister packaging"
                width={634}
                height={425}
                className="cs-contain-media"
                loading="lazy"
              />
            </div>
            <div className="cs-merch-card-item">
              <img
                src="/images/projects/softtouch/softtouch case study-09.jpg"
                alt="Softtouch branded bamboo technical specification USB flash drive"
                width={634}
                height={425}
                className="cs-contain-media"
                loading="lazy"
              />
            </div>
          </div>
          <p className="cs-media-caption mono">
            [ Fig 2.1 · Branded utility items: Ceramic stoneware mug, double-wall stainless hydration bottle, and technical spec USB drive ]
          </p>
        </div>
      </RevealRoot>

      {/* =========================================================================
          8. Large orange-toned apparel/T-shirt image.
          Authoritative Asset: /images/projects/softtouch/softtouch case study-10.jpg (1918 x 818)
          ========================================================================= */}
      <RevealRoot as="section" className="cs-section-8-apparel" aria-label="Contractor Field Apparel">
        <div className="cs-apparel-inner" data-r="shutter">
          <img
            src="/images/projects/softtouch/softtouch case study-10.jpg"
            alt="Softtouch branded contractor crew polo apparel on signature orange ground"
            width={1918}
            height={818}
            className="cs-apparel-img"
            loading="lazy"
          />
        </div>
        <div className="cs-container">
          <p className="cs-media-caption mono cs-caption-on-orange">
            [ Fig 2.2 · Contractor field apparel: High-visibility saffron cotton crew polo with vertical chest branding ]
          </p>
        </div>
      </RevealRoot>

      {/* =========================================================================
          9. Orange Hindi campaign panel with the phone mockup.
          Authoritative Asset: /images/projects/softtouch/softtouch case study-11.jpg (1916 x 468)
          ========================================================================= */}
      <RevealRoot as="section" className="cs-section-9-campaign" aria-label="Regional Campaign and Digital Utility">
        <div className="cs-campaign-banner-media" data-r="shutter">
          <img
            src="/images/projects/softtouch/softtouch case study-11.jpg"
            alt="Regional brand campaign banner: Khushiyo Ke Rang Softtouch Ke Sang with mobile contractor application"
            width={1916}
            height={468}
            className="cs-campaign-banner-img"
            loading="lazy"
          />
        </div>
        <div className="cs-container">
          <div className="cs-campaign-content-grid" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
            <div className="cs-tagline-block">
              <span className="mono cs-block-kicker">[ OFFICIAL CAMPAIGN MOTTO ]</span>
              <p className="cs-hindi-text">“खुशियों के रंग सॉफ्टटच के संग”</p>
              <p className="cs-romanized-text mono">Khushiyo Ke Rang Softtouch Ke Sang</p>
              <p className="body cs-motto-desc">
                Emotional domestic resonance celebrating home transformations, family prosperity, and enduring wall protection.
              </p>
            </div>

            <div className="cs-mobile-app-block">
              <span className="mono cs-block-kicker">[ CONTRACTOR DIGITAL UTILITY ]</span>
              <h3 className="cs-app-heading">Contractor Mobile Companion</h3>
              <p className="body muted">
                Batch QR verification for authentic coating validation, painter loyalty reward points, surface area formulation calculator, and authorized stockist ordering.
              </p>
            </div>
          </div>
        </div>
      </RevealRoot>

      {/* =========================================================================
          10. Light two-column strategy/content panel.
          ========================================================================= */}
      <RevealRoot as="section" className="cs-section-10-strategy" aria-label="Strategic Problem and Solution Architecture">
        <div className="cs-container">
          <div className="cs-strategy-two-col">
            <div className="cs-strategy-col" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
              <span className="mono cs-section-tag">[ 03 · THE CHALLENGE ]</span>
              <h2 className="heading cs-strategy-h2">Breaking through category inertia.</h2>
              <p className="body cs-strategy-body">
                {cs?.challenge ?? 'The decorative paints and wallcare category is intensely crowded, dominated by legacy conglomerates with high distributor recall. Softtouch needed a distinctive, premium brand identity and packaging architecture that conveyed structural reliability, superior coating chemistry, and immediate shelf standout across tier-1 and tier-2 dealer distribution networks.'}
              </p>
            </div>
            <div className="cs-strategy-col" data-r="rise" style={{ '--i': 1 } as React.CSSProperties}>
              <span className="mono cs-section-tag">[ 03 · STRATEGIC SOLUTION ]</span>
              <h2 className="heading cs-strategy-h2">Form follows performance &amp; ergonomics.</h2>
              <p className="body cs-strategy-body">
                {cs?.solution ?? 'ArtSwapy engineered an ergonomic container system across 20L, 10L, 4L, and 1L capacity pails paired with a fluid, high-coverage visual identity system, dynamic logomark, regional trade campaign motto, and standardized retail dealership environments.'}
              </p>
            </div>
          </div>

          {/* Core Deliverables Architecture */}
          {cs?.deliverables && cs.deliverables.length > 0 && (
            <div className="cs-deliverables-panel" data-r="rise" style={{ '--i': 2 } as React.CSSProperties}>
              <span className="mono cs-deliverables-title">[ CORE DELIVERABLES ARCHITECTURE ]</span>
              <ul className="cs-deliverables-items-grid">
                {cs.deliverables.map((item, idx) => (
                  <li key={idx} className="cs-deliv-item">
                    <span className="bullet-thread" aria-hidden="true">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </RevealRoot>

      {/* =========================================================================
          11. Full-width hand-drawn concept and packaging sketches.
          Authoritative Asset: /images/projects/softtouch/softtouch case study-12.jpg (1916 x 950)
          ========================================================================= */}
      <RevealRoot as="section" className="cs-section-11-sketches" aria-label="Concept Ideation & Packaging Sketches">
        <div className="cs-container">
          <div className="cs-section-header" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
            <span className="ph-tag orange-tag mono">[ 04 · PROCESS &amp; STRUCTURAL ERGONOMICS ]</span>
            <h2 className="heading cs-section-title">Concept Exploration &amp; Container Mechanics</h2>
            <p className="body muted cs-section-lead">
              Structural ideation exploring industrial pail profiles, double-rib lid sealing geometry, molded load-dispersion handle ergonomics, and label surface proportions.
            </p>
          </div>

          <div className="cs-sketches-container" data-r="shutter">
            <img
              src="/images/projects/softtouch/softtouch case study-12.jpg"
              alt="Hand-drawn concept exploration and structural packaging sketches for Softtouch paint containers and bucket ergonomics"
              width={1916}
              height={950}
              className="cs-sketches-img"
              loading="lazy"
            />
          </div>
          <p className="cs-media-caption mono">
            [ Fig 4.1 · Concept &amp; packaging exploration: Ergonomic container geometries, wire bail mechanics, and lid locking seal profiles ]
          </p>

          <div className="cs-mechanics-grid" data-r="rise" style={{ '--i': 1 } as React.CSSProperties}>
            <div className="cs-mech-card">
              <span className="cs-mech-num mono">01</span>
              <h3 className="cs-mech-title">Wire-Bail Handle &amp; Molded Grip</h3>
              <p className="cs-mech-desc">
                High-tensile galvanized steel bail combined with an ergonomic rubberized load-dispersion grip for safe single-handed carry of 20kg wet payload.
              </p>
            </div>
            <div className="cs-mech-card">
              <span className="cs-mech-num mono">02</span>
              <h3 className="cs-mech-title">Airtight Double-Rib Seal</h3>
              <p className="cs-mech-desc">
                Precision interlocking rim seal preventing solvent VOC evaporation, skin formation, and perimeter leakage during multi-tier transport.
              </p>
            </div>
            <div className="cs-mech-card">
              <span className="cs-mech-num mono">03</span>
              <h3 className="cs-mech-title">Pallet Stacking Footprint</h3>
              <p className="cs-mech-desc">
                Recessed bottom collar mates securely with lid rim indents to ensure stable 4-high palletization in wholesale distributor warehouses.
              </p>
            </div>
          </div>
        </div>
      </RevealRoot>

      {/* =========================================================================
          12. Split packaging section: product container on one side and label/packaging artwork on the other.
          Authoritative Asset: /images/projects/softtouch/softtouch case study-13.jpg (1914 x 872)
          ========================================================================= */}
      <RevealRoot as="section" className="cs-section-12-split-packaging" aria-label="Container Substrates and Production Die-Lines">
        <div className="cs-container">
          <div className="cs-section-header" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
            <span className="ph-tag orange-tag mono">[ 05 · PACKAGING ARCHITECTURE &amp; DIE-LINES ]</span>
            <h2 className="heading cs-section-title">Container Substrates &amp; Production Die-Lines</h2>
            <p className="body muted cs-section-lead">
              Pairing industrial container forms with high-durability metallic label die-lines engineered for warehouse shelf standout and painter usability.
            </p>
          </div>

          <div className="cs-packaging-die-line-panel" data-r="shutter">
            <img
              src="/images/projects/softtouch/softtouch case study-13.jpg"
              alt="Softtouch container substrate pairing unprinted polypropylene pail with production wrap die-lines"
              width={1914}
              height={872}
              className="cs-cover-media"
              loading="lazy"
            />
          </div>
          <p className="cs-media-caption mono">
            [ Fig 5.1 · Packaging architecture: 20L polypropylene container substrate paired with high-adhesion wrap-around die-lines ]
          </p>
        </div>
      </RevealRoot>

      {/* =========================================================================
          13. Product-range photography in a multi-image layout.
          Authoritative Assets:
          - /images/projects/softtouch/softtouch case study-14.jpg (955 x 538)
          - /images/projects/softtouch/softtouch case study-15.jpg (955 x 538)
          ========================================================================= */}
      <RevealRoot as="section" className="cs-section-13-range-gallery" aria-label="Product-Range Photography">
        <div className="cs-container">
          <div className="cs-section-header" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
            <span className="ph-tag orange-tag mono">[ 06 · PRODUCT RANGE &amp; PHOTOGRAPHY ]</span>
            <h2 className="heading cs-section-title">Architectural Coatings Lineup &amp; Taxonomy</h2>
            <p className="body muted cs-section-lead">
              A cohesive packaging language spanning emulsions, all-weather coatings, primers, waterproofers, and industrial putties.
            </p>
          </div>

          <div className="cs-range-split-grid" data-r="shutter">
            <div className="cs-range-grid-item">
              <img
                src="/images/projects/softtouch/softtouch case study-14.jpg"
                alt="Softtouch studio product photography: 3-bucket architectural coating lineup"
                width={955}
                height={538}
                className="cs-contain-media"
                loading="lazy"
              />
            </div>
            <div className="cs-range-grid-item">
              <img
                src="/images/projects/softtouch/softtouch case study-15.jpg"
                alt="Softtouch complete coating family on showroom plinth"
                width={955}
                height={538}
                className="cs-contain-media"
                loading="lazy"
              />
            </div>
          </div>
          <p className="cs-media-caption mono">
            [ Fig 6.1 · Studio product photography: Premium emulsions, protective weather shields, primers, and construction chemicals ]
          </p>

          {/* 8 Product Classification Grid */}
          <div className="cs-range-taxonomy-grid" data-r="rise" style={{ '--i': 1 } as React.CSSProperties}>
            <div className="cs-tax-card">
              <span className="cs-tax-cat mono">Exterior Ultra-Luxury</span>
              <h3 className="cs-tax-name">Atmoshield</h3>
              <p className="cs-tax-desc">
                High-performance exterior silicone coating designed with anti-fungal barrier chemistry to withstand severe monsoonal weathering.
              </p>
              <span className="cs-tax-pack mono">Available: 20L · 10L · 4L · 1L</span>
            </div>

            <div className="cs-tax-card">
              <span className="cs-tax-cat mono">Interior Premium Velvet</span>
              <h3 className="cs-tax-name">Aura</h3>
              <p className="cs-tax-desc">
                Rich smooth interior emulsion with exceptional stain resistance, low VOC formulation, and high scrub durability for residential interiors.
              </p>
              <span className="cs-tax-pack mono">Available: 20L · 10L · 4L · 1L</span>
            </div>

            <div className="cs-tax-card">
              <span className="cs-tax-cat mono">Exterior All-Weather</span>
              <h3 className="cs-tax-name">Evershield</h3>
              <p className="cs-tax-desc">
                Elastomeric weatherproof exterior paint providing crack-bridging flexibility and UV-reflective thermal insulation properties.
              </p>
              <span className="cs-tax-pack mono">Available: 20L · 10L · 4L</span>
            </div>

            <div className="cs-tax-card">
              <span className="cs-tax-cat mono">Exterior Heavy Duty</span>
              <h3 className="cs-tax-name">Storm Shield</h3>
              <p className="cs-tax-desc">
                Industrial exterior emulsion engineered for masonry durability against heavy dust, rain, and intense summer temperature fluctuations.
              </p>
              <span className="cs-tax-pack mono">Available: 20L · 10L · 4L</span>
            </div>

            <div className="cs-tax-card">
              <span className="cs-tax-cat mono">Wood &amp; Metal Enamel</span>
              <h3 className="cs-tax-name">Oleo Enamel</h3>
              <p className="cs-tax-desc">
                Mirror-like synthetic resin enamel engineered for iron railings, gates, structural trims, and architectural timber with anti-rust inhibitors.
              </p>
              <span className="cs-tax-pack mono">Available: 4L · 1L · 500ml</span>
            </div>

            <div className="cs-tax-card">
              <span className="cs-tax-cat mono">Advanced Waterproofing</span>
              <h3 className="cs-tax-name">Dampfixx Ultra</h3>
              <p className="cs-tax-desc">
                2-in-1 co-polymer waterproofing primer and barrier compound preventing rising capillary dampness and efflorescence damage.
              </p>
              <span className="cs-tax-pack mono">Available: 20L · 10L · 4L · 1L</span>
            </div>

            <div className="cs-tax-card">
              <span className="cs-tax-cat mono">Masonry Substrate Primer</span>
              <h3 className="cs-tax-name">Primer Lite</h3>
              <p className="cs-tax-desc">
                Deep penetrating water-thinnable alkali-resistant primer that anchors topcoats to fresh plaster and porous concrete substrates.
              </p>
              <span className="cs-tax-pack mono">Available: 20L · 10L · 4L</span>
            </div>

            <div className="cs-tax-card">
              <span className="cs-tax-cat mono">Polymer Base Putty</span>
              <h3 className="cs-tax-name">Wall Care Putty</h3>
              <p className="cs-tax-desc">
                Polymer-fortified white cement skim coat providing a micro-porous, perfectly level satin surface for optimum paint adhesion.
              </p>
              <span className="cs-tax-pack mono">Available: 40kg · 20kg · 5kg Bags</span>
            </div>
          </div>
        </div>
      </RevealRoot>

      {/* =========================================================================
          14. Inset light Softtouch title/identity panel in the same position as the storyboard panel.
          Replacing template AARANYA title with Softtouch branding in the identical inset card visual treatment.
          ========================================================================= */}
      <RevealRoot as="section" className="cs-section-14-inset-title" aria-label="Softtouch Brand Identity Transition Panel">
        <div className="cs-container">
          <div className="cs-inset-identity-card" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
            <div className="cs-inset-card-header">
              <span className="cs-card-kicker mono">[ BRAND ARCHITECTURE · {project.year} ]</span>
              <span className="cs-card-cat mono">Collateral &amp; Commercial Environment</span>
            </div>
            <h2 className="cs-inset-monument-wordmark">
              SOFTTOUCH
            </h2>
            <p className="cs-inset-card-lead">
              Unified trade identity, collateral hierarchy, and standardized dealer presence across regional hardware corridors.
            </p>
          </div>
        </div>
      </RevealRoot>

      {/* =========================================================================
          15. Print and collateral mockups (brochure & standing display).
          Authoritative Assets:
          - /images/projects/softtouch/softtouch case study-16.jpg (955 x 538)
          - /images/projects/softtouch/softtouch case study-17.jpg (955 x 538)
          ========================================================================= */}
      <RevealRoot as="section" className="cs-section-15-collateral" aria-label="Print and Dealer Collateral">
        <div className="cs-container">
          <div className="cs-section-header" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
            <span className="ph-tag orange-tag mono">[ 07 · PRINT &amp; DEALER COLLATERAL ]</span>
            <h2 className="heading cs-section-title">Contractor Shade Guide &amp; Showroom Standees</h2>
            <p className="body muted cs-section-lead">
              Tangible sales enablement tools for distributor counters, dealer showrooms, and on-site painter consultations.
            </p>
          </div>

          <div className="cs-collateral-split-grid" data-r="shutter">
            <div className="cs-collateral-grid-item">
              <img
                src="/images/projects/softtouch/softtouch case study-16.jpg"
                alt="Softtouch folded contractor shade brochure on orange ground"
                width={955}
                height={538}
                className="cs-contain-media"
                loading="lazy"
              />
            </div>
            <div className="cs-collateral-grid-item">
              <img
                src="/images/projects/softtouch/softtouch case study-17.jpg"
                alt="Softtouch showroom rollup standee in dealer setting"
                width={955}
                height={538}
                className="cs-contain-media"
                loading="lazy"
              />
            </div>
          </div>
          <p className="cs-media-caption mono">
            [ Fig 7.1 · Print collateral: Trifold contractor product guide on orange ground and vertical showroom rollup banner ]
          </p>
        </div>
      </RevealRoot>

      {/* =========================================================================
          16. Full-width storefront/signage image.
          Authoritative Asset: /images/projects/softtouch/softtouch case study-18.jpg (1921 x 600)
          ========================================================================= */}
      <RevealRoot as="section" className="cs-section-16-storefront" aria-label="Environmental Branding and Signage" data-inverse-section="">
        <div className="cs-container">
          <div className="cs-section-header" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
            <span className="ph-tag orange-tag mono">[ 08 · ENVIRONMENTAL BRANDING &amp; SIGNAGE ]</span>
            <h2 className="heading cs-section-title cs-title-inverted">Authorized Dealership Storefront Fascia</h2>
            <p className="body cs-lead-inverted">
              Standardized regional retail canopy system deploying high-visibility saffron orange to command street presence across hardware corridors.
            </p>
          </div>

          <div className="cs-storefront-media-panel" data-r="shutter">
            <img
              src="/images/projects/softtouch/softtouch case study-18.jpg"
              alt="Softtouch authorized dealership storefront fascia: Rajeshree and Swastik Traders Umred with spotlights"
              width={1921}
              height={600}
              className="cs-contain-media"
              loading="lazy"
            />
          </div>
          <p className="cs-media-caption mono" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            [ Fig 8.1 · Retail dealership deployment: Authorized dealer storefront fascia for Rajeshree &amp; Swastik Traders, Umred ]
          </p>

          <div className="cs-retail-features-grid" data-r="rise" style={{ '--i': 1 } as React.CSSProperties}>
            <div className="cs-retail-feat-card">
              <span className="cs-feat-badge mono">Storefront Architecture</span>
              <h3 className="cs-feat-title">Rajeshree &amp; Swastik Traders · Umred</h3>
              <p className="cs-feat-desc">
                Modular dealer fascia integrating the signature saffron canopy with personalized dealer attribution and spotlight fixture channels.
              </p>
            </div>

            <div className="cs-retail-feat-card">
              <span className="cs-feat-badge mono">Point-of-Sale Presence</span>
              <h3 className="cs-feat-title">Hardware Corridor Legibility</h3>
              <p className="cs-feat-desc">
                Engineered for high contrast against congested regional market corridors, visible at distance from both pedestrian and vehicular traffic.
              </p>
            </div>

            <div className="cs-retail-feat-card">
              <span className="cs-feat-badge mono">Substrate &amp; Construction</span>
              <h3 className="cs-feat-title">Weatherproof ACP &amp; Acrylic</h3>
              <p className="cs-feat-desc">
                Fabricated from UV-stabilized aluminium composite panels with laser-cut acrylic logo relief and waterproof LED downlighting.
              </p>
            </div>
          </div>
        </div>
      </RevealRoot>

      {/* =========================================================================
          17. Light product-detail section with product image and its related copy.
          Authoritative Asset: /images/projects/softtouch/softtouch case study-19.jpg (331 x 410)
          ========================================================================= */}
      <RevealRoot as="section" className="cs-section-17-product-detail" aria-label="Product Detail Specification">
        <div className="cs-container">
          <div className="cs-detail-media-card" data-r="shutter">
            <div className="cs-detail-media-inner">
              <div className="cs-detail-thumb-box">
                <img
                  src="/images/projects/softtouch/softtouch case study-19.jpg"
                  alt="Softtouch product detail composition featuring 20L paint pail with technical specification caption"
                  width={331}
                  height={410}
                  className="cs-detail-thumb-img"
                  loading="lazy"
                />
              </div>
              <div className="cs-detail-lead-content">
                <span className="ph-tag orange-tag mono">[ STRUCTURAL PAIL ENGINEERING ]</span>
                <h3 className="cs-detail-headline">Injection-Molded Polypropylene Container</h3>
                <p className="body cs-detail-lead-p">
                  Engineered with reinforced perimeter hoop ribs, calibrated wire bail anchor sockets, and an airtight tamper-evident tear ring to guarantee factory formulation purity from production plant through high-speed dealer tinting machines.
                </p>
              </div>
            </div>
          </div>
          <p className="cs-media-caption mono">
            [ Fig 9.1 · Industrial pail detail: 20-litre container with tamper-evident rim seal and molded grip ]
          </p>

          <div className="cs-detail-notes-grid" data-r="rise" style={{ '--i': 1 } as React.CSSProperties}>
            <div className="cs-note-box">
              <span className="mono cs-note-tag">[ TAMPER-EVIDENT BAND ]</span>
              <h4 className="cs-note-title">Airtight Locking Seal</h4>
              <p className="cs-note-body">
                Interlocking rim groove guarantees factory batch integrity and stops solvent degradation during prolonged inventory cycles.
              </p>
            </div>
            <div className="cs-note-box">
              <span className="mono cs-note-tag">[ LOAD-DISPERSION BAIL ]</span>
              <h4 className="cs-note-title">Galvanized Wire Handle</h4>
              <p className="cs-note-body">
                Heavy-gauge galvanized steel bail coupled with a textured polypropylene roller distributes payload strain during manual transit.
              </p>
            </div>
            <div className="cs-note-box">
              <span className="mono cs-note-tag">[ SCRUFF-RESISTANT FILM ]</span>
              <h4 className="cs-note-title">In-Mold Label Substrate</h4>
              <p className="cs-note-body">
                High-opacity synthetic wrap fused into the container wall resists solvent scuffs, chemical splashes, and field abrasions.
              </p>
            </div>
          </div>
        </div>
      </RevealRoot>

      {/* =========================================================================
          18. Oversized Softtouch wordmark on a light background.
          Slide image or typography
          ========================================================================= */}
      <RevealRoot as="section" className="cs-section-18-oversized-wordmark" aria-label="Oversized Softtouch Wordmark">
        <div className="cs-oversized-wordmark-inner" data-r="shutter">
          <span className="cs-oversized-live-text">softtouch</span>
        </div>
      </RevealRoot>

      {/* =========================================================================
          19. Inset Softtouch identity panel with the dark colour block, replacing the AARANYA panel.
          Replacing template AARANYA panel with Softtouch identity and the dark contrast block.
          ========================================================================= */}
      <RevealRoot as="section" className="cs-section-19-dark-block" aria-label="Softtouch Contrast Identity Panel">
        <div className="cs-container">
          <div className="cs-dark-contrast-card" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
            <div className="cs-dark-contrast-top">
              <div className="cs-dark-header-meta">
                <span className="cs-dark-kicker mono">[ BRAND ARCHITECTURE · IDENTITY SIGNATURE ]</span>
                <span className="cs-dark-cat mono">Industrial Coatings &amp; Chemicals</span>
              </div>
              <h2 className="cs-dark-contrast-title">
                SOFTTOUCH
              </h2>
              <p className="cs-dark-contrast-lead">
                Engineered for maximum optical contrast and category authority across trade touchpoints, technical documentation, and distributor fleets.
              </p>
            </div>

            {/* Dark Color Block Bar */}
            <div className="cs-dark-color-block-bar">
              <div className="cs-dark-bar-segment cs-bar-ink">
                <span className="cs-bar-label mono">#231F20 · Deep Industrial Ink</span>
              </div>
              <div className="cs-dark-bar-segment cs-bar-orange">
                <span className="cs-bar-label mono">#E87124 · Softtouch Orange</span>
              </div>
            </div>
          </div>
        </div>
      </RevealRoot>

      {/* =========================================================================
          20. Orange product composition featuring the two tilted paint containers.
          Authoritative Asset: /images/projects/softtouch/softtouch case study-20.jpg (1919 x 1080)
          ========================================================================= */}
      <RevealRoot as="section" className="cs-section-20-tilted-pails" aria-label="Tilted Paint Containers Composition">
        <div className="cs-tilted-pails-media" data-r="shutter">
          <img
            src="/images/projects/softtouch/softtouch case study-20.jpg"
            alt="Softtouch signature orange product composition featuring two tilted paint containers in dynamic perspective"
            width={1919}
            height={1080}
            className="cs-tilted-pails-img"
            loading="lazy"
          />
        </div>
        <div className="cs-container">
          <p className="cs-media-caption mono cs-caption-on-orange">
            [ Fig 10.1 · Dynamic product perspective: Two tilted Softtouch paint containers showcased against signature brand orange ground ]
          </p>
        </div>
      </RevealRoot>

      {/* =========================================================================
          21. Project closing/related-work section with the same visual placement as the screenshot.
          Displaying adjacent curated case studies (Common Ground, Good Habit) + Next/Prev Navigation.
          ========================================================================= */}
      <RevealRoot as="section" className="cs-section-21-closing-related" aria-label="Project Closing and Related Work">
        <div className="cs-container">
          <div className="cs-section-header" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
            <span className="ph-tag orange-tag mono">[ SELECTED CASE STUDIES ]</span>
            <h2 className="heading cs-section-title">Explore Related Brand Systems</h2>
            <p className="body muted cs-section-lead">
              More brand positioning, visual identity, and structural packaging systems engineered by ArtSwapy.
            </p>
          </div>

          <div className="cs-related-projects-grid" data-r="rise" style={{ '--i': 1 } as React.CSSProperties}>
            {relatedProjects.map((p) => (
              <Link
                key={p.id}
                href={p.href ?? `/work/${p.id}/`}
                className="cs-related-card"
              >
                <div className="cs-related-media-wrap">
                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.preview.alt}
                      className="cs-related-img"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="cs-related-meta">
                  <div className="cs-related-top-row">
                    <span className="cs-related-cat mono">{p.category}</span>
                    <span className="cs-related-year mono">{p.year}</span>
                  </div>
                  <h3 className="cs-related-title">{p.name}</h3>
                  <p className="cs-related-summary">{p.summary}</p>
                  <span className="cs-related-link-text mono">View Case Study →</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Project Prev/Next Navigation Controls */}
          <div className="cs-pagination-nav-bar" data-r="rise" style={{ '--i': 2 } as React.CSSProperties}>
            <Link href={prevProject.href ?? `/work/${prevProject.id}/`} className="cs-page-nav cs-nav-prev">
              <span className="small mono muted">← Previous Study</span>
              <strong className="nav-project-name">{prevProject.name}</strong>
              <span className="small muted">{prevProject.category}</span>
            </Link>

            <Link href={nextProject.href ?? `/work/${nextProject.id}/`} className="cs-page-nav cs-nav-next">
              <span className="small mono muted">Next Study →</span>
              <strong className="nav-project-name">{nextProject.name}</strong>
              <span className="small muted">{nextProject.category}</span>
            </Link>
          </div>
        </div>
      </RevealRoot>

      {/* =========================================================================
          22. Existing ArtSwapy contact CTA and footer.
          ========================================================================= */}
      <FooterClose />
    </div>
  );
}
