/* ==========================================================================
   ArtSwapy — typed site content (replaces the old src/content.js)
   Anything with `placeholder: true` renders with a visible "Placeholder" tag.
   Replace with confirmed content, then flip the flag before launch.
   ========================================================================== */
import type {
  AboutStat,
  ClosingCTA,
  ContactRoute,
  MailtoTemplate,
  NavLink,
  PhoneContact,
  SocialLink,
  IntroContent,
  PreloaderConfig,
  ProcessStage,
  Project,
  Service,
  ShowreelContent
} from '@/types/content';

export const site = {
  name: 'ArtSwapy',
  founder: 'Swapnil Gathibandhe',
  url: 'https://www.artswapy.com',
  email: {
    address: 'swapnilgathibandhe2494@gmail.com',
    placeholder: false
  },
  phone: {
    display: '+91 98230 34567',
    value: '+919823034567',
    whatsapp: 'https://wa.me/919823034567',
    placeholder: false
  } satisfies PhoneContact,
  socials: [
    {
      id: 'instagram',
      label: 'Instagram',
      handle: '@artswapy',
      href: 'https://instagram.com/artswapy'
    },
    {
      id: 'youtube',
      label: 'YouTube',
      handle: '@artswapy',
      href: 'https://youtube.com/@artswapy'
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      handle: 'Swapnil Gathibandhe',
      href: 'https://linkedin.com/in/swapnil-gathibandhe'
    }
  ] satisfies SocialLink[],
  credits: {
    left: 'Brand design and consulting',
    developer: 'Developed with ❤️ & ☕ by Hitayush Dange',
    right: 'Independent practice'
  }
};

export const navLinks: NavLink[] = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' }
];

/* Editorial loading screen copy — authentic studio philosophy on branding, identity & craft. */
export const preloader: PreloaderConfig = {
  kicker: 'Editorial Opening · Studio Notes',
  placeholder: false,
  placeholderLabel: '',
  skipLabel: 'Skip intro',
  footerLeft: 'STRATEGY  CONSULTING  DESIGN',
  footerRight: 'NAGPUR, IN  WORKING WORLDWIDE',
  quotes: [
    {
      id: 'think',
      index: '01',
      pillar: 'Think clearly.',
      quote: "You're not here",
      note: 'Strategy'
    },
    {
      id: 'distinct',
      index: '02',
      pillar: 'Look distinct.',
      quote: 'just for a logo.',
      note: 'Consulting'
    },
    {
      id: 'remember',
      index: '03',
      pillar: 'Be remembered.',
      quote: "You're here to build a brand.",
      note: 'Design'
    }
  ]
};

export const hero = {
  tag: '01 // BRAND STRATEGY, CONSULTING & DESIGN',
  founderTitle: 'Swapnil Gathibandhe — Brand Strategy Consultant & Brand Designer',
  line: 'An independent brand practice led by Swapnil Gathibandhe: strategy, identity and packaging.',
  portrait: {
    src: '/images/founder-image.png',
    alt: 'Portrait of Swapnil Gathibandhe, founder of ArtSwapy',
    placeholder: false
  },
  stats: [
    {
      kicker: 'EXPERTISE',
      text: 'Brand Strategy, Consulting / & Brand Design'
    },
    {
      kicker: 'HOW I WORK',
      text: 'One-to-one with founders. / I consult, design and deliver.'
    },
    {
      kicker: 'WHAT YOU GET',
      text: 'A brand that makes sense / and makes an impression.'
    }
  ]
};

export const showreel: ShowreelContent = {
  tag: 'SHOWREEL : PORTFOLIO 2026',
  headline: '[ ! ] BE THE BRAND THEY NEVER STOP TALKING ABOUT',
  statement:
    'Most brands don’t have a design problem. They have a clarity problem. I bring brand strategy and design together to find what makes you different and turn it into a brand people notice, trust and remember.',
  title: 'Logo Design Process — From Start to Finish',
  youtubeId: 'pTjizuQOoYo',
  caption: 'Craft, strategy and execution in motion.',
  nextPreview: {
    kicker: '[ UP NEXT : SELECTED WORK ]',
    heading: 'Where Strategy Takes Shape',
    subline: 'Five complete brand systems — positioning, visual identity, structural packaging & digital application.',
    actionLabel: 'Explore Case Studies',
    projects: [
      { num: '01', name: 'Aaranya', cat: 'Skincare' },
      { num: '02', name: 'Common Ground', cat: 'Coffee' },
      { num: '03', name: 'Good Habit', cat: 'Beverage' },
      { num: '04', name: 'Kavita', cat: 'Editorial' },
      { num: '05', name: 'Dhara', cat: 'Ceramics' }
    ]
  }
};

export const intro: IntroContent = {
  label: 'EXPERTISE',
  sublabel: 'Strategy · Consulting · Design',
  heading: 'Brand Strategy, Consulting & Brand Design',
  points: [
    {
      kicker: 'HOW I WORK',
      statement: 'One-to-one with founders. I consult, design and deliver.'
    },
    {
      kicker: 'WHAT YOU GET',
      statement: 'A brand that makes sense and makes an impression.'
    }
  ],
  lead: 'One-to-one with founders. I consult, design and deliver.',
  body: 'A brand that makes sense and makes an impression.'
};

export const work = {
  sectionHeading: 'Case studies',
  supportingHeading: 'Where Strategy Takes Shape.',
  description:
    'From the first question to the final mark, see how clear thinking becomes a brand you can’t ignore.',
  // Aliases for compatibility with other components
  tag: 'Case studies',
  heading: 'Where Strategy Takes Shape.',
  body:
    'From the first question to the final mark, see how clear thinking becomes a brand you can’t ignore.',
  enquiry: {
    subjectPrefix: 'Project enquiry — like ',
    body: 'Hi Swapnil,\n\nI saw the concept project and would like something like it.\nMy business is …\nWhat I need help with: …\n\nThanks,'
  },
  nextStep: {
    tag: '[ ✦ NEXT STEP ]',
    headline: 'Have a business? Let’s give it a brand.',
    body: 'Start with a strategy session. Leave with clarity, a distinct identity and a brand ready to be remembered.',
    button: 'Book a Strategy Session'
  }
};

/* Selected work — CONCEPT PLACEHOLDERS ONLY, not client projects. */
/* Selected work — Curated showcase matching Dzinr Studio scale */
export const projects: Project[] = [
  {
    id: 'aaranya',
    name: 'Aaranya',
    year: '2025',
    category: 'Botanical Skincare',
    discipline: 'Brand & Packaging',
    summary: 'A luxury botanical identity and packaging architecture built for ritual and calm.',
    placeholder: true,
    href: '/work/aaranya',
    image: '/images/projects/aaranya.jpg',
    preview: { alt: 'Brand identity mockup for Aaranya skincare', mark: 'aaranya' },
    theme: {
      bg: '#141c15',
      text: '#f6f4ef',
      accent: '#ff551f'
    },
    caseStudy: {
      clientType: 'Organic Wellness & Skincare Atelier',
      timeline: '8 Weeks',
      deliverables: [
        'Brand Positioning & Voice',
        'Visual Identity & Custom Wordmark',
        'Cosmetic Packaging Architecture',
        'Tactile Print & Embossing Specs',
        'E-Commerce & Digital Direction'
      ],
      challenge: 'Botanical skincare was crowded with sterile clinical aesthetics or generic kraft-paper tropes. Aaranya needed a commanding, ritual-focused identity that felt ancient yet contemporary, establishing immediate luxury shelf presence.',
      solution: 'Crafted a contemplative visual world rooted in deep botanical greens, tactile linen textures, and a custom typographic signature. Packaging uses fluted glass, blind debossing, and warm copper thread cues that evoke mindful daily skincare rituals.',
      pillars: {
        strategy: {
          title: '01 · Strategy',
          summary: 'Rooted in stillness and Ayurvedic wisdom, repositioning skincare from hygiene to an essential restorative ritual.',
          details: [
            'Market whitespace analysis across premium Ayurvedic skincare',
            'Core brand narrative: "Botanical Stillness for Modern Lives"',
            'Bilingual tone-of-voice matrix balancing reverence and clarity'
          ]
        },
        identity: {
          title: '02 · Visual Identity',
          summary: 'A bespoke serif wordmark paired with organic botanical geometry and an earthy, enduring color system.',
          details: [
            'Drawn botanical icon system inspired by native Indian flora',
            'Refined serif typography with generous optical breathing room',
            'Palette of deep forest moss, warm parchment white, and terracotta earth'
          ]
        },
        packaging: {
          title: '03 · Packaging',
          summary: 'Sustainable amber and frosted glass vessels with tactile unboxing rituals and blind debossed carton sleeves.',
          details: [
            'Die-cut structural outer boxes with linen-textured paper wrap',
            'Waterproof screen-printed dropper bottles and cosmetic jars',
            'Signature copper thread closure indicating uncompromised purity'
          ]
        },
        communications: {
          title: '04 · Communications',
          summary: 'Editorial campaign imagery, brand monographs, and storytelling collateral celebrating ingredient provenance.',
          details: [
            'Founder manifesto and ingredient sourcebook',
            'Macro-botanical photography guidelines and lighting direction',
            'Minimalist social grid and print collateral'
          ]
        },
        applications: {
          title: '05 · Applications',
          summary: 'A serene digital flagship and physical boutique experience designed for seamless consumer discovery.',
          details: [
            'Responsive luxury e-commerce experience with smooth editorial transitions',
            'Architectural boutique signage and unboxing insert cards',
            'Comprehensive brand guidelines manual for global partners'
          ]
        }
      }
    }
  },
  {
    id: 'common-ground',
    name: 'Common Ground',
    year: '2025',
    category: 'Civic Culture & Cafe',
    discipline: 'Strategy · Identity',
    summary: 'A positioning and visual identity system for everyday civic dialogue and community culture.',
    placeholder: true,
    href: '/work/common-ground',
    image: '/images/projects/common-ground.jpg',
    preview: { alt: 'Brand identity mockup for Common Ground cafe and space', mark: 'common' },
    theme: {
      bg: '#1f1613',
      text: '#f6f4ef',
      accent: '#ff551f'
    },
    caseStudy: {
      clientType: 'Urban Cultural Hub & Micro-Roastery',
      timeline: '6 Weeks',
      deliverables: [
        'Civic Brand Manifesto & Naming',
        'Modular Typography System',
        'Custom Iconography & Wayfinding',
        'Packaging for Small-Batch Beans',
        'Spatial Signage & Event Posters'
      ],
      challenge: 'Urban coffee shops frequently oscillate between elitist specialty minimalism and kitschy communal warmth. Common Ground sought to be an unpretentious civic hearth—a place for debate, literature, and outstanding coffee.',
      solution: 'Developed an energetic, typographic identity rooted in vintage newsprint, modern civic posters, and bold contrast. Two overlapping circles form the core mark, representing community convergence.',
      pillars: {
        strategy: {
          title: '01 · Strategy',
          summary: 'Positioned as "The Third Place with a Point of View"—accessible, democratic, and intellectually curious.',
          details: [
            'Neighborhood cultural demographic survey',
            'Mission statement: "Coffee, Conversation, Common Ground"',
            'Community event programming and editorial guidelines'
          ]
        },
        identity: {
          title: '02 · Visual Identity',
          summary: 'Heavy grotesque display type combined with bold editorial rules and a vivid dual-circle emblem.',
          details: [
            'Geometric double-circle logomark representing dialogue',
            'Space Grotesk headline system paired with sturdy newsprint sans',
            'Warm terra-cotta, newsprint white, and high-contrast carbon black'
          ]
        },
        packaging: {
          title: '03 · Packaging',
          summary: 'Recycled foil-free coffee pouches with modular roast date stamps and origin story labels.',
          details: [
            'Kraft compostable bean bags with bright label bands',
            'Takeaway cups made with unbleached fiber and dynamic typography',
            'Custom ceramic diner mugs with debossed emblems'
          ]
        },
        communications: {
          title: '04 · Communications',
          summary: 'A monthly printed broadsheet newsletter, discussion posters, and vibrant street banners.',
          details: [
            'Bi-weekly cultural broadsheet "The Ground Wire"',
            'Screen-printed event posters for book launches and open forums',
            'High-contrast typographic Instagram announcements'
          ]
        },
        applications: {
          title: '05 · Applications',
          summary: 'Enamel spatial signage, menu boards, and digital mobile order interface.',
          details: [
            'Cast-iron architectural hanging blade signage',
            'Modular wooden magnetic menu boards behind the brew bar',
            'Quick-order mobile web experience with minimal friction'
          ]
        }
      }
    }
  },
  {
    id: 'good-habit',
    name: 'Good Habit',
    year: '2024',
    category: 'Sparkling Energy',
    discipline: 'Packaging · Campaign',
    summary: 'A high-octane consumer wellness drink with electric typography, citrus accents, and bold shelf presence.',
    placeholder: true,
    href: '/work/good-habit',
    image: '/images/projects/good-habit.jpg',
    preview: { alt: 'Product photography of Good Habit beverage cans', mark: 'habit' },
    theme: {
      bg: '#121110',
      text: '#f6f4ef',
      accent: '#ff551f'
    },
    caseStudy: {
      clientType: 'Functional Beverage Venture',
      timeline: '10 Weeks',
      deliverables: [
        'Category Positioning & Tone',
        'Can Packaging Architecture (4 Flavors)',
        'Display Typography & 3D Renders',
        'Retail Shipper Display Units',
        'Launch Campaign Art Direction'
      ],
      challenge: 'Energy drinks were trapped between hyper-masculine neon gaming cans and timid pastel seltzers. Good Habit needed a vibrant, punchy aesthetic that made clean natural caffeine look exciting on crowded supermarket shelves.',
      solution: 'Engineered an iconic slim-can design featuring ultra-condensed typography wrapping 180 degrees, vivid color-blocking, and an arched archway motif signaling routine and ritual.',
      pillars: {
        strategy: {
          title: '01 · Strategy',
          summary: 'Claiming the intersection of clean wellness and unstoppable kinetic momentum.',
          details: [
            'Shelf-impact audit across leading beverage retailers',
            'Brand positioning: "Energy without the Apology"',
            'Flavor taxonomy and functional benefit hierarchy'
          ]
        },
        identity: {
          title: '02 · Visual Identity',
          summary: 'Monumental condensed lettering with electric citrus accents on matte obsidian fields.',
          details: [
            'Custom flared grotesque wordmark with kinetic angles',
            'High-contrast electric citrus and vibrant orange accents',
            'Archway iconography symbolizing daily positive habits'
          ]
        },
        packaging: {
          title: '03 · Packaging',
          summary: 'Tactile matte slim aluminum cans with gloss spot UV varnish highlighting flavor bursts.',
          details: [
            '330ml sleek can packaging with 360-degree typography wrap',
            'Full color-coded flavor architecture: Yuzu Ginger, Blood Orange, Lime Mint',
            'Point-of-sale corrugated retail endcap display units'
          ]
        },
        communications: {
          title: '04 · Communications',
          summary: 'High-speed motion graphics, outdoor billboard campaigns, and athletic sponsorship collateral.',
          details: [
            'Animated 3D can reveals and liquid splash direction',
            'Wild-posting poster campaigns in urban financial and transit hubs',
            'Digital creator launch kit with branded merchandise'
          ]
        },
        applications: {
          title: '05 · Applications',
          summary: 'DTC subscription web store, refrigerated retail point-of-sale displays, and event sampling bars.',
          details: [
            'High-conversion Shopify Plus e-commerce storefront',
            'Custom event beverage cart and sampling tent for festivals',
            'Production guidelines and color calibration for aluminum can printing'
          ]
        }
      }
    }
  },
  {
    id: 'kavita',
    name: 'Kavita',
    year: '2024',
    category: 'Independent Press',
    discipline: 'Editorial · Publishing',
    summary: 'A contemporary poetry press with bespoke linen bindings, blind debossing, and signature bookmark thread.',
    placeholder: true,
    href: '/work/kavita',
    image: '/images/projects/kavita.jpg',
    preview: { alt: 'Editorial book design mockup for Kavita press', mark: 'kavita' },
    theme: {
      bg: '#0f1722',
      text: '#f6f4ef',
      accent: '#ff551f'
    },
    caseStudy: {
      clientType: 'Literary Publisher & Translation House',
      timeline: '8 Weeks',
      deliverables: [
        'Editorial Strategy & Colophon',
        'Book Series Grid & Typographic Standards',
        'Cover Design System (12 Titles)',
        'Paper & Binding Production Specifications',
        'Publishing Website & Catalogue'
      ],
      challenge: 'Poetry publishing often succumbs to sterile academic austerity or decorative amateurism. Kavita required a deeply collectible, tactile format that honored modern voices in translation while commanding space in independent bookstores.',
      solution: 'Created an enduring editorial system with strict grid proportions, linen-wrapped hardcovers, and an iconic orange ribbon bookmark that threads through every edition.',
      pillars: {
        strategy: {
          title: '01 · Strategy',
          summary: 'Re-imagining poetry as a tactile collector\'s artifact and accessible literary refuge.',
          details: [
            'Comparative analysis of international art press imprints',
            'Editorial mission: "Words that Demand to be Held"',
            'Distribution strategy targeting museum shops and premier bookshops'
          ]
        },
        identity: {
          title: '02 · Visual Identity',
          summary: 'A contemplative logotype set in refined proportions with poetic restraint and quiet dignity.',
          details: [
            'Subtle ligature-rich wordmark inspired by early 20th-century typesetting',
            'Deep midnight indigo, stone gray, and signature vermillion orange thread',
            'Minimalist book colophon and publisher seal'
          ]
        },
        packaging: {
          title: '03 · Packaging',
          summary: 'Bespoke cloth-bound volumes with foil debossing, deckled edges, and woven thread markers.',
          details: [
            'Archival Munken cream paper stock specification',
            'Cloth spine bindings with foil-stamped author signatures',
            'Protective slipcases for limited-edition author series'
          ]
        },
        communications: {
          title: '04 · Communications',
          summary: 'Literary catalogue brochures, poetry broadsides, and intimate reading salon invitations.',
          details: [
            'Quarterly seasonal release catalogue with excerpt typography',
            'Hand-pressed letterpress poetry bookmarks',
            'Audiobook covers and author interview podcast visual assets'
          ]
        },
        applications: {
          title: '05 · Applications',
          summary: 'An archival reader website, digital bookstore, and bookstore exhibition display units.',
          details: [
            'Minimalist online reading catalogue with excerpt previewers',
            'Modular wooden book displays for independent retailers',
            'Complete production handbook for print houses'
          ]
        }
      }
    }
  },
  {
    id: 'dhara',
    name: 'Dhara',
    year: '2023',
    category: 'Architectural Studio',
    discipline: 'Spatial · Monograph',
    summary: 'An architectural studio monograph and material branding system anchored in raw earth and quiet light.',
    placeholder: true,
    href: '/work/dhara',
    image: '/images/projects/dhara.jpg',
    preview: { alt: 'Architectural monograph mockup for Dhara studio', mark: 'dhara' },
    theme: {
      bg: '#1e1613',
      text: '#f6f4ef',
      accent: '#ff551f'
    },
    caseStudy: {
      clientType: 'Sustainable Architecture & Landscape Practice',
      timeline: '7 Weeks',
      deliverables: [
        'Studio Philosophy & Positioning',
        'Spatial Identity & Material Palette',
        '10-Year Retrospective Monograph',
        'Architectural Signage & Wayfinding',
        'Digital Portfolio & Project Archival System'
      ],
      challenge: 'Dhara builds with rammed earth, stone, and reclaimed teak, rejecting ostentatious glass towers. Their visual identity needed to feel carved from the land itself, reflecting spatial honesty rather than graphic gloss.',
      solution: 'Crafted an elemental branding system using brutalist geometric letterforms, raw textured unbleached stock, and a monograph that captures the tactile weight of architecture.',
      pillars: {
        strategy: {
          title: '01 · Strategy',
          summary: 'Grounding the studio\'s architectural narrative in ecological permanence and material truth.',
          details: [
            'Strategic positioning: "Architecture Born of the Earth"',
            'Narrative framework focusing on vernacular Indian craft and modernism',
            'Client pitch portfolio architecture for institutional commissions'
          ]
        },
        identity: {
          title: '02 · Visual Identity',
          summary: 'Monolithic letterforms and architectural grid ratios echoing structural floorplans.',
          details: [
            'Custom architectural monogram carved from geometric stone archetypes',
            'Space Grotesk typography applied as structural beams and columns',
            'Warm terra, raw plaster white, and basalt charcoal'
          ]
        },
        packaging: {
          title: '03 · Packaging',
          summary: 'Hardbound monograph encased in custom raw linen boards with terracotta pigmented dust jacket.',
          details: [
            '280-page retrospective monograph printed on uncoated recycled stock',
            'Blind debossed architectural blueprint diagrams on the cover',
            'Custom presentation boxes for client project handovers'
          ]
        },
        communications: {
          title: '04 · Communications',
          summary: 'Project monograph sheets, exhibition guides, and design competition submissions.',
          details: [
            'Exhibition design system for Venice Architecture Biennale collateral',
            'Technical project drawing presentation standards',
            'Press kit and architectural media release package'
          ]
        },
        applications: {
          title: '05 · Applications',
          summary: 'Site construction hoardings, brass project plaques, and a fast, minimal digital archive.',
          details: [
            'Brushed brass studio plaques with engraved typographic signature',
            'Minimalist digital archive organized by climate and material',
            'On-site safety and architectural signage standards'
          ]
        }
      }
    }
  }
];

export const services = {
  heading: 'Services',
  subtitle: 'Strategic thinking and hands-on design, from your first brand decision to long-term growth.',
  items: [
    {
      id: 'growth-strategy',
      title: 'Growth Strategy',
      fact: 'Positioning, audience, roadmap',
      description:
        'I help you define what your brand stands for, who it’s for and why it should be chosen over the rest. You get a clear strategy and growth roadmap that guides every design, marketing and business decision that follows.'
    },
    {
      id: 'logo-design',
      title: 'Logo Design',
      fact: 'Mark, type, colour, identity',
      description:
        'Your logo is the face of your brand, so I design it to be simple, distinctive and built to last. Every mark comes with a complete identity system of typography, colours and guidelines, so your brand stays consistent, clear and recognizable everywhere.'
    },
    {
      id: 'packaging',
      title: 'Packaging',
      fact: 'Structure, label, print-ready',
      description:
        'Packaging is often a customer’s first real touch of your brand, and I design it to win that moment on the shelf. From label design to finishes and print-ready files, every detail is crafted to look premium and sell.'
    },
    {
      id: 'social-media',
      title: 'Social Media',
      fact: 'Content direction, grid, voice',
      description:
        'I audit your social presence and show you exactly what to post, how it should look and how your brand should sound. You get a clear content direction and visual system that turns scrolling into following, and following into buying.'
    },
    {
      id: 'branding-partner',
      title: 'Branding Partner',
      fact: 'Ongoing strategy & design support',
      description:
        'For brands that are growing, I work as your long-term branding partner, a strategist and designer on call without the agency overhead. From new launches to campaigns and refreshes, your brand stays consistent, sharp and moving forward.'
    }
  ] satisfies Service[]
};

export const process = {
  label: '[ FIVE-STEP PROCESS ]',
  rightText: 'From First Conversation to Final Results',
  heading: 'How I Work',
  stages: [
    {
      id: 'audit',
      index: '01',
      shortName: 'Audit',
      phase: 'Phase 01 · Listen & Assess',
      name: 'Brand Audit',
      line: 'Where your brand stands today, honestly.',
      description:
        'We begin with a one-to-one audit meeting. I review your current brand, visuals, social presence and competitors to see what’s working, what’s not and where the real opportunity lies.',
      timeline: '2–3 Days · Direct Founder Collaboration',
      gives: 'Audit and insights',
      deliverablesBox: 'Audit and insights',
      deliverables: [
        'One-to-One Discovery Meeting',
        'Current Brand & Visual Audit',
        'Competitor & Market Snapshot',
        'Strengths, Gaps & Opportunities'
      ],
      duration: '2–3 Days',
      output: 'Brand Audit Report'
    },
    {
      id: 'discovery',
      index: '02',
      shortName: 'Discovery',
      phase: 'Phase 02 · Understand & Define',
      name: 'Discovery',
      line: 'What you need, and who you’re really for.',
      description:
        'I dig into your business goals, your customers and what makes you different. This step turns assumptions into clarity, so every decision after this has a reason behind it.',
      timeline: '3–5 Days · Direct Founder Collaboration',
      gives: 'Goals and audience',
      deliverablesBox: 'Goals and audience',
      deliverables: [
        'Business Goals & Challenges Brief',
        'Target Audience Profiles',
        'Customer Needs & Motivations',
        'Unique Value Definition'
      ],
      duration: '3–5 Days',
      output: 'Discovery & Audience Brief'
    },
    {
      id: 'strategy',
      index: '03',
      shortName: 'Strategy',
      phase: 'Phase 03 · Think & Plan',
      name: 'Strategy',
      line: 'A clear plan before a single pixel moves.',
      description:
        'I build your brand strategy, covering positioning, messaging and visual direction, and map out exactly what will be created, when and why. You approve the plan before any design begins.',
      timeline: '1–2 Weeks · Direct Founder Collaboration',
      gives: 'Strategy and roadmap',
      deliverablesBox: 'Strategy and roadmap',
      deliverables: [
        'Brand Positioning & Messaging',
        'Creative Direction & Moodboards',
        'Project Scope & Priorities',
        'Milestone Timeline'
      ],
      duration: '1–2 Weeks',
      output: 'Brand Strategy & Action Plan'
    },
    {
      id: 'execution',
      index: '04',
      shortName: 'Execution',
      phase: 'Phase 04 · Design & Deliver',
      name: 'Execution',
      line: 'The plan brought to life, on time.',
      description:
        'This is where strategy becomes design: logo, identity, packaging or social content, crafted with care and delivered on schedule. You get regular updates and review rounds, never surprises.',
      timeline: '2–4 Weeks · Direct Founder Collaboration',
      gives: 'Design and delivery',
      deliverablesBox: 'Design and delivery',
      deliverables: [
        'Logo & Identity Design',
        'Packaging & Print Assets',
        'Social Media Creatives',
        'Review Rounds & Refinements'
      ],
      duration: '2–4 Weeks',
      output: 'Final Design Assets'
    },
    {
      id: 'report',
      index: '05',
      shortName: 'Report',
      phase: 'Phase 05 · Review & Grow',
      name: 'Final Report',
      line: 'Everything delivered, documented and ready to grow.',
      description:
        'I hand over every file, guideline and recommendation in one organised package. You walk away knowing exactly how to use your brand and what to do next to keep it growing.',
      timeline: '2–3 Days · Direct Founder Collaboration',
      gives: 'Handover and next steps',
      deliverablesBox: 'Handover and next steps',
      deliverables: [
        'Complete Brand Guidelines',
        'Organised Master File Archive',
        'Project Summary Report',
        'Growth Recommendations'
      ],
      duration: '2–3 Days',
      output: 'Final Brand Report & Handover Kit'
    }
  ] satisfies ProcessStage[]
};

export const about = {
  heading: 'Swapnil Gathibandhe',
  tag: 'THE PERSON BEHIND ARTSWAPY',
  name: 'Swapnil Gathibandhe',
  rolesLabel: 'WHAT I DO',
  roles: [
    'Founder',
    'Brand Designer',
    'Brand Strategist',
    'Tech Creator'
  ],
  story: [
    'For over a decade, I’ve been building brands from the ground up.',
    'I start with strategy, because clarity always comes before design.',
    'Then I craft identities, packaging and content that people notice.',
    'One person, one vision, from first meeting to final result.'
  ],
  statsLeft: [
    {
      number: '50+',
      label: 'Brand Consultations',
      subline: 'Founders guided to clarity'
    },
    {
      number: '500+',
      label: 'Logos Designed',
      subline: 'Marks built to last'
    }
  ] as AboutStat[],
  statsRight: [
    {
      number: '10+',
      label: 'Years of Experience',
      subline: 'Strategy, design & content'
    },
    {
      number: '3X',
      label: 'Growth Delivered',
      subline: 'For brands I’ve partnered with'
    }
  ] as AboutStat[],
  role: 'Brand Strategy Consultant & Brand Designer',
  location: 'Nagpur, India · Working Worldwide',
  disciplines: [
    'Brand Strategy',
    'Brand Identity',
    'Logo Design',
    'Packaging Design',
    'Social Media Direction'
  ],
  lead: 'One person, one vision, from first meeting to final result.',
  bio: {
    text: 'For over a decade, I’ve been building brands from the ground up. I start with strategy, because clarity always comes before design. Then I craft identities, packaging and content that people notice.',
    placeholder: false
  },
  portrait: {
    src: '/images/founder-image.png',
    alt: 'Portrait of Swapnil Gathibandhe, founder of ArtSwapy',
    placeholder: false
  }
};

export const closingCTA: ClosingCTA = {
  tag: '[ ✦ NEXT STEP ]',
  headline: 'Have a business? Let’s give it a brand.',
  body: 'Start with a strategy session. Leave with clarity, a distinct identity and a brand ready to be remembered.',
  button: 'Book a Strategy Session',
  bookingUrl: undefined,
  href: '#contact'
};

export const contact = {
  tag: '[ ✦ NEXT STEP ]',
  heading: ['Have a business?', 'Let’s give it a brand.'] as [string, string],
  headline: 'Have a business? Let’s give it a brand.',
  body: 'Start with a strategy session. Leave with clarity, a distinct identity and a brand ready to be remembered.',
  cta: 'Book a Strategy Session',
  bookingUrl: undefined as string | undefined,
  hello: 'Hello',
  mailto: {
    to: site.email.address,
    subject: 'Strategy session enquiry',
    body: 'Hi Swapnil,\n\nI’d like to book a strategy session for my business.\n\nBusiness name: …\nCurrent stage: …\nGoals: …\n\nThanks,'
  } satisfies MailtoTemplate,
  setName: {
    label: 'Your business name',
    hint: 'Shown in our type, and added to your email subject.',
    placeholder: 'Your name',
    sample: 'Your name'
  },
  routes: [
    { id: 'email', label: 'Email', value: site.email.address, href: `mailto:${site.email.address}`, placeholder: false },
    { id: 'phone', label: 'Phone / WhatsApp', value: site.phone.display, href: site.phone.whatsapp, placeholder: false },
    { id: 'instagram', label: 'Instagram', value: '@artswapy', href: 'https://instagram.com/artswapy', placeholder: false },
    { id: 'youtube', label: 'YouTube', value: '@artswapy', href: 'https://youtube.com/@artswapy', placeholder: false },
    { id: 'linkedin', label: 'LinkedIn', value: 'Swapnil Gathibandhe', href: 'https://linkedin.com/in/swapnil-gathibandhe', placeholder: false },
    { id: 'location', label: 'Location', value: 'Nagpur, India', placeholder: false },
    { id: 'availability', label: 'Availability', value: 'Available for new projects', placeholder: false }
  ] satisfies ContactRoute[]
};
