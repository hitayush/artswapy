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
        // 1. Immersive Orange Logo Transition Moment (full-viewport stage)
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

        // Softtouch Logo Reveal Video Scrubbing (Scroll-driven frame scrub)
        const lightLogoStage = root.querySelector<HTMLElement>('.cs-st-light-logo');
        const logoVideo = lightLogoStage?.querySelector<HTMLVideoElement>('.cs-st-logo-video');

        let videoScrubST: ScrollTrigger | null = null;
        let onVideoMetaLoaded: (() => void) | null = null;

        if (lightLogoStage && logoVideo) {
          logoVideo.pause();

          const initVideoScrub = () => {
            if (videoScrubST) return;
            const duration = !isNaN(logoVideo.duration) && logoVideo.duration > 0
              ? logoVideo.duration
              : 2.0;

            videoScrubST = ScrollTrigger.create({
              id: 'st-logo-reveal-scrub',
              trigger: lightLogoStage,
              start: 'top 85%',
              end: 'bottom 45%',
              scrub: true,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const targetTime = self.progress * duration;
                if (!isNaN(targetTime) && Math.abs(logoVideo.currentTime - targetTime) > 0.015) {
                  logoVideo.currentTime = targetTime;
                }
              }
            });
          };

          if (logoVideo.readyState >= 1) {
            initVideoScrub();
          } else {
            onVideoMetaLoaded = () => initVideoScrub();
            logoVideo.addEventListener('loadedmetadata', onVideoMetaLoaded, { once: true });
          }
        }

        // 3. Natural-proportion image stages (single & multi-column) — restrained scroll reveals
        const stages = Array.from(root.querySelectorAll<HTMLElement>('[data-st-stage]:not(.cs-st-orange-logo):not(.cs-st-light-logo)'));

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
          if (logoVideo && onVideoMetaLoaded) {
            logoVideo.removeEventListener('loadedmetadata', onVideoMetaLoaded);
          }
          if (videoScrubST) {
            videoScrubST.kill();
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
          Softtouch Logo Definition Section
          ========================================================================= */}
      <section className="cs-st-sec cs-st-story" aria-label="Softtouch Logo Definition">
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
          Centered Softtouch logo on warm-white ground — Animated Logo Reveal
          Video: /images/projects/softtouch/softtouch-logo-reveal.mp4
          Fallback poster: /images/projects/softtouch/softtouch case study-04.jpg (1918×883)
          ========================================================================= */}
      <section
        className="cs-st-sec cs-st-light-logo cs-st-guttered"
        data-st-stage
        aria-label="Softtouch Logo on Warm Paper Ground"
      >
        <div className="cs-st-panel-single cs-st-bg-warm-logo cs-st-video-container" data-st-media="single">
          <video
            className="cs-st-logo-video"
            poster="/images/projects/softtouch/softtouch case study-04.jpg"
            preload="metadata"
            muted
            playsInline
            aria-label="Softtouch animated logo reveal"
            tabIndex={-1}
          >
            <source
              src="/images/projects/softtouch/softtouch-logo-reveal.mp4"
              type="video/mp4"
            />
            {/* Fallback image */}
            <img
              src="/images/projects/softtouch/softtouch case study-04.jpg"
              alt="Softtouch brand logo on warm paper ground"
              width={1918}
              height={883}
              className="cs-st-img-natural"
              loading="lazy"
            />
          </video>
        </div>
      </section>

      {/* =========================================================================
          1. Collateral & Utility Objects — Compact row with mug, bottle, and USB drive
          Side by side in 3 balanced image tiles with contained product artwork.
          ========================================================================= */}
      <section
        className="cs-st-sec cs-st-merch-trio cs-st-guttered"
        data-st-stage
        aria-label="Branded Collateral and Utility Objects"
      >
        <div className="cs-st-paired-grid-3">
          <div className="cs-st-panel-cell cs-st-cell-mug" data-st-media="col">
            <img
              src="/images/projects/softtouch/softtouch case study-08.jpg"
              alt="Softtouch branded ceramic coffee mug"
              width={634}
              height={425}
              className="cs-st-collateral-img"
              loading="lazy"
            />
          </div>
          <div className="cs-st-panel-cell cs-st-cell-flask" data-st-media="col">
            <img
              src="/images/projects/softtouch/softtouch case study-07.jpg"
              alt="Softtouch branded hydration flask on original grey background"
              width={634}
              height={425}
              className="cs-st-collateral-img"
              loading="lazy"
            />
          </div>
          <div className="cs-st-panel-cell cs-st-cell-usb" data-st-media="col">
            <img
              src="/images/projects/softtouch/softtouch case study-09.jpg"
              alt="Softtouch branded USB flash drive"
              width={634}
              height={425}
              className="cs-st-collateral-img"
              loading="lazy"
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
            className="cs-st-apparel-img"
            loading="lazy"
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
            className="cs-st-campaign-img"
            loading="lazy"
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
          Brand Applications & Outdoor Media Panel (Centered)
          ========================================================================= */}
      <section className="cs-st-sec cs-st-second-title cs-st-outdoor-media" aria-label="Outdoor Media Brand Applications">
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
                  src="/images/projects/softtouch/softtouch case study-19.png"
                  alt="Softtouch Premium Oil Paint Bucket packaging detail"
                  width={331}
                  height={410}
                  className="cs-st-thumb-img"
                  loading="lazy"
                  data-st-thumb
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
        {/* Oversized full-bleed lowercase wordmark across warm-beige band */}
        <div className="cs-st-wordmark-strip" aria-hidden="true">
          <span className="cs-st-oversized-text" data-st-wordmark>
            softtouch
          </span>
        </div>
      </section>

      {/* =========================================================================
          Testimonial Panel — Swapnil Mohota (Founder)
          ========================================================================= */}
      <section className="cs-st-sec cs-st-split-panel" aria-label="Client Testimonial Panel">
        <div className="cs-st-container">
          <div className="cs-st-split-card" data-st-card>
            <div className="cs-st-split-left">
              <div className="cs-st-meta-row" data-st-item>
                <span className="cs-st-tag mono">[ TESTIMONIAL ]</span>
                <span className="cs-st-cat mono">SWAPNIL MOHOTA — FOUNDER</span>
              </div>
              <div className="cs-st-title-wrap">
                <h2 className="cs-st-split-title">Hear It From Our Client</h2>
                <span className="cs-st-title-thread" data-st-thread aria-hidden="true" />
              </div>
              <p className="cs-st-split-lead" data-st-item>
                A glimpse into our creative journey, the collaboration, and the impact of transforming Softtouch&apos;s brand identity and packaging.
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
