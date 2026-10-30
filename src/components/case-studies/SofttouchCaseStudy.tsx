'use client';

import { useRef } from 'react';
import Link from 'next/link';
import type { Project } from '@/types/content';
import { site } from '@/content/site';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/motion/gsap';
import CTAButton from '@/components/primitives/CTAButton';
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
  const flowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = flowRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // 1. Hero smooth entrance (no cropping or stretching)
        const heroFrame = root.querySelector<HTMLElement>('.cs-st-hero .cs-st-stage-inner');
        if (heroFrame) {
          gsap.fromTo(
            heroFrame,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: 'art.out'
            }
          );
        }

        // 2. Immersive Orange Logo Transition Moment (full-viewport stage)
        const logoStage = root.querySelector<HTMLElement>('.cs-st-orange-logo');
        const logoMedia = logoStage?.querySelector<HTMLElement>('[data-st-media="single"]');
        if (logoStage && logoMedia) {
          gsap.fromTo(
            logoMedia,
            { y: 36, scale: 0.96, opacity: 0 },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: logoStage,
                start: 'top 88%',
                end: 'top 25%',
                scrub: 0.45,
                fastScrollEnd: true
              }
            }
          );
        }

        // 3. Natural-proportion image stages (single & multi-column) — restrained scroll reveals
        const stages = Array.from(root.querySelectorAll<HTMLElement>('[data-st-stage]:not(.cs-st-orange-logo)'));

        stages.forEach((stage) => {
          const singleMedia = stage.querySelector<HTMLElement>('[data-st-media="single"]');
          if (singleMedia) {
            gsap.fromTo(
              singleMedia,
              { y: 24, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.65,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: stage,
                  start: 'top 90%',
                  toggleActions: 'play none none none',
                  once: true
                }
              }
            );
          }

          const cols = Array.from(stage.querySelectorAll<HTMLElement>('[data-st-media="col"]'));
          if (cols.length > 0) {
            gsap.fromTo(
              cols,
              { y: 24, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                stagger: 0.08,
                duration: 0.65,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: stage,
                  start: 'top 90%',
                  toggleActions: 'play none none none',
                  once: true
                }
              }
            );
          }
        });

        // 4. Lower cards (excluding .cs-st-intro-card so the intro title, rule, description, and cards are always visible)
        const cards = Array.from(
          root.querySelectorAll<HTMLElement>('[data-st-card]:not(.cs-st-intro-card)')
        );
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 92%',
                toggleActions: 'play none none none',
                once: true
              }
            }
          );
        });

        const imgs = Array.from(root.querySelectorAll('img'));
        const onImgLoad = () => ScrollTrigger.refresh();
        imgs.forEach((img) => {
          if (!img.complete) {
            img.addEventListener('load', onImgLoad, { once: true });
          }
        });

        return () => {
          imgs.forEach((img) => img.removeEventListener('load', onImgLoad));
        };
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const allAnimated = root.querySelectorAll(
          '.cs-st-stage-inner, .cs-st-hero-img, [data-st-media], [data-st-media] img, [data-st-card], [data-st-thread], [data-st-item], [data-st-split-accent], [data-st-thumb], [data-st-wordmark]'
        );
        gsap.set(allAnimated, { clearProps: 'all' });
      });

      return () => mm.revert();
    },
    { scope: flowRef }
  );

  return (
    <div ref={flowRef} className="cs-softtouch-flow">
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
      <section className="cs-st-sec cs-st-hero" aria-label="Softtouch Product Lineup Hero">
        <div className="cs-st-stage-inner">
          <img
            src="/images/projects/softtouch/softtouch case study-02.jpg"
            alt="Softtouch paint buckets lineup on vibrant orange surface: Wall Putty, Aura, Storm Shield, and Evershield"
            width={1919}
            height={982}
            className="cs-st-img-natural cs-st-hero-img"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </section>

      {/* =========================================================================
          Inset Warm-White Identity Panel ("SOFTTOUCH", replacing AARANYA)
          ========================================================================= */}
      <section className="cs-st-sec cs-st-intro" aria-label="Project Introduction">
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
                <span className="spec-label mono">Discipline</span>
                <strong className="spec-value">{project.discipline ?? 'Brand Identity & Packaging'}</strong>
              </div>
              <div className="cs-st-spec-box" data-st-item>
                <span className="spec-label mono">Category</span>
                <strong className="spec-value">{project.category}</strong>
              </div>
              <div className="cs-st-spec-box" data-st-item>
                <span className="spec-label mono">Scope</span>
                <strong className="spec-value">Identity, Packaging &amp; Signage</strong>
              </div>
              <div className="cs-st-spec-box" data-st-item>
                <span className="spec-label mono">Creative Direction</span>
                <strong className="spec-value">{site.founder} · {site.name}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          Immersive Full-Viewport Logo Transition Moment (100svh on desktop)
          Asset: /images/projects/softtouch/softtouch case study-03.jpg (1918×883)
          ========================================================================= */}
      <section
        className="cs-st-sec cs-st-orange-logo cs-st-logo-viewport"
        data-st-stage
        aria-label="Softtouch Brand Signature on Orange"
      >
        <div className="cs-st-stage-inner" data-st-media="single">
          <img
            src="/images/projects/softtouch/softtouch case study-03.jpg"
            alt="Softtouch logo centered on signature vibrant orange ground"
            width={1918}
            height={883}
            className="cs-st-img-natural cs-st-logo-img"
            loading="lazy"
          />
        </div>
      </section>

      {/* =========================================================================
          Compact inset warm-white strip between orange logo and typography/palette
          ========================================================================= */}
      <section className="cs-st-sec cs-st-story" aria-label="Visual Identity System Note">
        <div className="cs-st-container">
          <div className="cs-st-compact-bar" data-st-card>
            <div className="cs-st-compact-left" data-st-item>
              <span className="cs-st-dot" aria-hidden="true" />
              <span className="mono cs-st-tag">[ VISUAL IDENTITY ]</span>
            </div>
            <p className="cs-st-compact-text" data-st-item>
              Wordmark, Montserrat typography, and signature Softtouch orange (#E87124) colour system.
            </p>
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
        className="cs-st-sec cs-st-type-palette cs-st-guttered"
        data-st-stage
        aria-label="Typography and Colour System"
      >
        <div className="cs-st-paired-grid-2">
          <div className="cs-st-panel-cell cs-st-cell-type" data-st-media="col">
            <img
              src="/images/projects/softtouch/softtouch case study-05.jpg"
              alt="Softtouch Montserrat brand typeface specimen on orange background"
              width={960}
              height={631}
              className="cs-st-img-natural"
              loading="lazy"
            />
          </div>
          <div className="cs-st-panel-cell cs-st-cell-palette" data-st-media="col">
            <img
              src="/images/projects/softtouch/softtouch case study-06.jpg"
              alt="Softtouch brand colour palette scale (#E87124 and #231F20)"
              width={960}
              height={631}
              className="cs-st-img-natural"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          Centered Softtouch logo on warm-white ground (natural 1918×883 proportions)
          Asset: /images/projects/softtouch/softtouch case study-04.jpg
          ========================================================================= */}
      <section
        className="cs-st-sec cs-st-light-logo cs-st-guttered"
        data-st-stage
        aria-label="Softtouch Logo on Warm Paper Ground"
      >
        <div className="cs-st-panel-single cs-st-bg-warm-logo" data-st-media="single">
          <img
            src="/images/projects/softtouch/softtouch case study-04.jpg"
            alt="Softtouch brand logo on warm paper ground"
            width={1918}
            height={883}
            className="cs-st-img-natural"
            loading="lazy"
          />
        </div>
      </section>

      {/* =========================================================================
          Branded Collateral & Utility Objects — Full-screen section (viewport height)
          Three products in spacious row:
          1. Softtouch mug on the left (softtouch case study-08.jpg)
          2. Softtouch bottle/flask in center with original grey background (softtouch case study-07.jpg)
          3. Softtouch USB drive on the right (softtouch case study-09.jpg)
          ========================================================================= */}
      <section
        className="cs-st-sec cs-st-merch-fullscreen"
        data-st-stage
        aria-label="Branded Collateral & Utility Objects"
      >
        <div className="cs-st-merch-header">
          <span className="ph-tag orange-tag mono">[ BRANDED UTILITY OBJECTS ]</span>
        </div>
        <div className="cs-st-merch-row">
          <div className="cs-st-merch-card-mug" data-st-media="col">
            <img
              src="/images/projects/softtouch/softtouch case study-08.jpg"
              alt="Softtouch branded ceramic coffee mug"
              width={634}
              height={425}
              className="cs-st-merch-img"
              loading="lazy"
            />
          </div>
          <div className="cs-st-merch-card-flask" data-st-media="col">
            <img
              src="/images/projects/softtouch/softtouch case study-07.jpg"
              alt="Softtouch branded hydration flask on original grey background"
              width={634}
              height={425}
              className="cs-st-merch-img"
              loading="lazy"
            />
          </div>
          <div className="cs-st-merch-card-usb" data-st-media="col">
            <img
              src="/images/projects/softtouch/softtouch case study-09.jpg"
              alt="Softtouch branded USB flash drive"
              width={634}
              height={425}
              className="cs-st-merch-img"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. Apparel — Peach/orange backdrop (#e7955d) with Softtouch T-shirt (1918×818)
          Asset: /images/projects/softtouch/softtouch case study-10.jpg
          ========================================================================= */}
      <section
        className="cs-st-sec cs-st-apparel cs-st-guttered"
        data-st-stage
        aria-label="Branded Apparel"
      >
        <div className="cs-st-panel-single cs-st-bg-apparel" data-st-media="single">
          <img
            src="/images/projects/softtouch/softtouch case study-10.jpg"
            alt="Softtouch branded orange T-shirt centered on peach-orange backdrop"
            width={1918}
            height={818}
            className="cs-st-img-natural"
            loading="lazy"
          />
        </div>
      </section>

      {/* =========================================================================
          3. Campaign — Orange campaign composition with phone mockup & Hindi artwork (1916×468)
          Asset: /images/projects/softtouch/softtouch case study-11.jpg
          ========================================================================= */}
      <section
        className="cs-st-sec cs-st-campaign cs-st-guttered"
        data-st-stage
        aria-label="Regional Campaign Banner"
      >
        <div className="cs-st-panel-single cs-st-bg-campaign" data-st-media="single">
          <img
            src="/images/projects/softtouch/softtouch case study-11.jpg"
            alt="Softtouch campaign banner: Khushiyo Ke Rang Softtouch Ke Sang with mobile application mockup on the right"
            width={1916}
            height={468}
            className="cs-st-img-natural"
            loading="lazy"
          />
        </div>
      </section>

      {/* =========================================================================
          Compact inset warm-white 2-column label panel before sketches
          ========================================================================= */}
      <section className="cs-st-sec cs-st-process-note" aria-label="Packaging Process and Label Architecture">
        <div className="cs-st-container">
          <div className="cs-st-story-box" data-st-card>
            <div className="cs-st-story-col" data-st-item>
              <span className="mono cs-st-cat">[ 01 · PACKAGING PROCESS ]</span>
              <p className="cs-st-story-lead">
                Container geometry, lid proportions, and wordmark placement sketches.
              </p>
            </div>
            <div className="cs-st-story-col" data-st-item>
              <span className="mono cs-st-cat">[ 02 · LABEL ARCHITECTURE ]</span>
              <p className="cs-st-story-lead">
                Wrap label die-lines across emulsions, primers, weather coats, and wall putty.
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
        className="cs-st-sec cs-st-sketches cs-st-guttered"
        data-st-stage
        aria-label="Process Sketches"
      >
        <div className="cs-st-panel-single cs-st-bg-sketches" data-st-media="single">
          <img
            src="/images/projects/softtouch/softtouch case study-12.jpg"
            alt="Hand-drawn concept exploration and structural packaging sketches for Softtouch paint containers and wordmark"
            width={1916}
            height={950}
            className="cs-st-img-natural"
            loading="lazy"
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
            className="cs-st-img-natural"
            loading="lazy"
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
              className="cs-st-img-natural"
              loading="lazy"
            />
          </div>
          <div className="cs-st-panel-cell cs-st-cell-range-right" data-st-media="col">
            <img
              src="/images/projects/softtouch/softtouch case study-15.jpg"
              alt="Softtouch primer buckets and wall putty bag lineup on showroom plinth"
              width={955}
              height={538}
              className="cs-st-img-natural"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          Second Inset Identity Panel ("SOFTTOUCH", replacing AARANYA)
          ========================================================================= */}
      <section className="cs-st-sec cs-st-second-title" aria-label="Softtouch Brand Applications Panel">
        <div className="cs-st-container">
          <div className="cs-st-intro-card" data-st-card>
            <div className="cs-st-meta-row" data-st-item>
              <span className="cs-st-tag mono">[ BRAND APPLICATIONS ]</span>
              <span className="cs-st-cat mono">Collateral &amp; Retail Signage</span>
            </div>
            <div className="cs-st-title-wrap">
              <h2 className="cs-st-monument-title">{project.name}</h2>
              <span className="cs-st-title-thread" data-st-thread aria-hidden="true" />
            </div>
            <p className="cs-st-lead-summary" style={{ marginBottom: 0 }} data-st-item>
              Print brochures, retail showroom standees, and dealer storefront signage.
            </p>
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
              className="cs-st-img-natural"
              loading="lazy"
            />
          </div>
          <div className="cs-st-panel-cell cs-st-cell-collateral-right" data-st-media="col">
            <img
              src="/images/projects/softtouch/softtouch case study-17.jpg"
              alt="Softtouch showroom standing display sign for Rajeshree and Swastik Traders"
              width={955}
              height={538}
              className="cs-st-img-natural"
              loading="lazy"
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
            className="cs-st-img-natural"
            loading="lazy"
          />
        </div>
      </section>

      {/* =========================================================================
          9. Product detail and identity — Product detail composition (331×410)
          and oversized Softtouch wordmark
          Asset: /images/projects/softtouch/softtouch case study-19.jpg
          ========================================================================= */}
      <section
        className="cs-st-sec cs-st-detail-wordmark"
        data-st-stage
        aria-label="Product Detail and Oversized Softtouch Wordmark"
      >
        <div className="cs-st-container cs-st-detail-wrap">
          <div className="cs-st-detail-card" data-st-card>
            <div className="cs-st-detail-layout">
              <div className="cs-st-detail-thumb">
                <img
                  src="/images/projects/softtouch/softtouch case study-19.jpg"
                  alt="Softtouch Oleo Premium Enamel metal tin container with wire handle"
                  width={331}
                  height={410}
                  className="cs-st-thumb-img"
                  loading="lazy"
                  data-st-thumb
                />
              </div>
              <div className="cs-st-detail-content">
                <span className="mono cs-st-cat" data-st-item>[ PACKAGING DETAIL ]</span>
                <h3 className="cs-st-detail-title" data-st-item>Oleo Premium Enamel</h3>
                <p className="body cs-st-detail-p" data-st-item>
                  Small-format metal enamel tin extending the Softtouch packaging system.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Oversized full-bleed lowercase wordmark across warm-beige band */}
        <div className="cs-st-wordmark-strip" aria-hidden="true">
          <span className="cs-st-oversized-text" data-st-wordmark>
            softtouch
          </span>
        </div>
      </section>

      {/* Split Identity Card: "SOFTTOUCH" (replacing AARANYA in template position) */}
      <section className="cs-st-sec cs-st-split-panel" aria-label="Softtouch Brand Summary Panel">
        <div className="cs-st-container">
          <div className="cs-st-split-card" data-st-card>
            <div className="cs-st-split-left">
              <div className="cs-st-meta-row" data-st-item>
                <span className="cs-st-tag mono">[ CASE STUDY ]</span>
                <span className="cs-st-cat mono">{project.category}</span>
              </div>
              <div className="cs-st-title-wrap">
                <h2 className="cs-st-split-title">{project.name}</h2>
                <span className="cs-st-title-thread" data-st-thread aria-hidden="true" />
              </div>
              <p className="cs-st-split-lead" data-st-item>
                Cohesive visual identity and packaging system across every product tier.
              </p>
            </div>
            <div className="cs-st-split-right" data-st-split-accent aria-hidden="true" />
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
            className="cs-st-img-natural"
            loading="lazy"
          />
        </div>
      </section>

      {/* =========================================================================
          11. Closing — Existing ArtSwapy related-work / contact / footer experience
          ========================================================================= */}
      <section className="cs-st-sec cs-st-closing" aria-label="Collaboration and Project Navigation">
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
    </div>
  );
}
