/* ==========================================================================
   ArtSwapy — typed site content (replaces the old src/content.js)
   Anything with `placeholder: true` renders with a visible "Placeholder" tag.
   Replace with confirmed content, then flip the flag before launch.
   ========================================================================== */
import type {
  ContactRoute,
  MailtoTemplate,
  NavLink,
  PreloaderConfig,
  ProcessStage,
  Project,
  Service
} from '@/types/content';

export const site = {
  name: 'ArtSwapy',
  founder: 'Swapnil Gathibandhe',
  url: 'https://artswapy.com',
  email: {
    address: 'swapnilgathibandhe2494@gmail.com',
    placeholder: false
  },
  credits: { left: 'Brand design and consulting', right: 'Independent practice' }
};

export const navLinks: NavLink[] = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' }
];

/* Editorial loading screen copy — editable placeholder thoughts on branding, identity & craft (unattributed). */
export const preloader: PreloaderConfig = {
  kicker: 'Editorial Opening · Studio Notes',
  placeholder: true,
  placeholderLabel: 'Placeholder quotes',
  skipLabel: 'Skip intro',
  quotes: [
    {
      id: 'conviction',
      index: '01',
      pillar: 'Brand Strategy',
      quote: 'Clarity precedes form. A lasting brand begins with the quiet conviction of what it stands for.',
      note: 'Positioning & Narrative'
    },
    {
      id: 'architecture',
      index: '02',
      pillar: 'Visual Identity',
      quote: 'Identity is silent architecture—built to be recognised at a glance and trusted over time.',
      note: 'Systems, Marks & Type'
    },
    {
      id: 'tactile',
      index: '03',
      pillar: 'Tactile Craft',
      quote: 'Every surface, package, and word is a physical conversation between strategy and human touch.',
      note: 'Packaging & Applications'
    }
  ]
};

export const hero = {
  line: 'An independent brand practice led by Swapnil Gathibandhe: strategy, identity and packaging.',
  portrait: {
    src: '/images/swapnil-portrait.png',
    alt: 'Portrait of Swapnil Gathibandhe, founder of ArtSwapy',
    placeholder: false
  }
};

export const showreel = {
  tag: 'Showreel',
  title: 'Logo Design Process — From Start to Finish',
  youtubeId: 'pTjizuQOoYo',
  caption: 'Craft, strategy and execution in motion.'
};

export const intro = {
  heading: ['Meaning first,', 'then the form.'] as [string, string],
  lead: 'ArtSwapy helps businesses find what makes them distinct, then shapes it into a brand people can recognise, trust and remember.',
  body: 'Work starts with strategy and carries through to identity, packaging, communications and the everyday places a brand shows up.',
  panorama: {
    alt: 'Drawn concept marks for three brand identities, set side by side in flat colour',
    credit: 'Concept marks drawn for this site',
    placeholder: true
  }
};

export const work = {
  heading: 'Selected work',
  enquiry: {
    subjectPrefix: 'Project enquiry — like ',
    body: 'Hi Swapnil,\n\nI saw the concept project and would like something like it.\nMy business is …\nWhat I need help with: …\n\nThanks,'
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
  items: [
    {
      id: 'strategy',
      title: 'Strategy',
      fact: 'Positioning, voice, story',
      description: 'Positioning, voice and the story that holds a brand together.'
    },
    {
      id: 'identity',
      title: 'Identity',
      fact: 'Logo, type, colour, system',
      description: 'The name, mark, type and colour, built as a system that scales.'
    },
    {
      id: 'packaging',
      title: 'Packaging',
      fact: 'Packaging and print',
      description: 'Packaging and print built from the identity, ready for the shelf.'
    },
    {
      id: 'communications',
      title: 'Communications',
      fact: 'Campaign and voice',
      description: 'How the brand speaks in campaigns, print and everyday messages.'
    },
    {
      id: 'applications',
      title: 'Applications',
      fact: 'Digital and physical touchpoints',
      description: 'Digital and physical touchpoints that feel like one brand.'
    }
  ] satisfies Service[]
};

export const process = {
  heading: 'How a project moves',
  stages: [
    {
      id: 'strategy',
      index: '01',
      phase: 'Phase 01 · Discovery & Strategy',
      name: 'Strategy',
      line: 'Who you are, who it is for, and why anyone should care.',
      description: 'Uncovering the authentic core of your business. We analyze competitive whitespace, audience psychology, and brand positioning before sketching a single mark.',
      gives: 'Positioning and voice',
      deliverables: [
        'Brand Architecture & Positioning',
        'Target Audience Matrix & Personas',
        'Competitive Whitespace Audit',
        'Core Narrative & Brand Voice'
      ],
      duration: '1–2 Weeks',
      output: 'Strategic Deck & Creative Brief'
    },
    {
      id: 'identity',
      index: '02',
      phase: 'Phase 02 · System & Form',
      name: 'Identity',
      line: 'The name, mark, type and colour that carry it.',
      description: 'Translating strategy into an unmistakable visual signature. Bespoke typography, responsive logomarks, dynamic grids, and curated color palettes built to endure.',
      gives: 'Logo and identity system',
      deliverables: [
        'Primary & Responsive Logo Marks',
        'Bespoke Typographic System',
        'Color Harmony & Contrast Rules',
        'Comprehensive Brand Guidelines'
      ],
      duration: '2–3 Weeks',
      output: 'Complete Brand Identity System'
    },
    {
      id: 'packaging',
      index: '03',
      phase: 'Phase 03 · Tactile & Physical',
      name: 'Packaging',
      line: 'The identity made physical, shelf-ready.',
      description: 'Bringing the brand to life in the physical world. Precision die-lines, label typography, material selection, foil stamping, and tactile print finishes.',
      gives: 'Packaging design',
      deliverables: [
        'Custom Structural Box Die-Lines',
        'Label Hierarchy & Typography Specs',
        'Specialty Finishes (Foil, Emboss, UV)',
        'Production-Ready Print Files'
      ],
      duration: '2 Weeks',
      output: 'Print-Ready Production Files'
    },
    {
      id: 'communications',
      index: '04',
      phase: 'Phase 04 · Voice & Culture',
      name: 'Communications',
      line: 'How the brand speaks in print and campaign.',
      description: 'Creating high-impact advertising, editorial print, launch campaigns, and social design systems that command attention and ignite engagement.',
      gives: 'Campaign and print',
      deliverables: [
        'Campaign Art Direction & Concepts',
        'Editorial Print & Poster Series',
        'Social Grid & Motion Design Kit',
        'Headline & Storytelling Toolkit'
      ],
      duration: '1–2 Weeks',
      output: 'Launch Campaign Asset Library'
    },
    {
      id: 'applications',
      index: '05',
      phase: 'Phase 05 · Touchpoints & Scale',
      name: 'Applications',
      line: 'Every place it shows up, kept consistent.',
      description: 'Ensuring seamless consistency across digital products, web experiences, retail signage, merchandise, and scalable design token systems.',
      gives: 'Touchpoints and guidelines',
      deliverables: [
        'Responsive Web UI Design System',
        'Environmental & Retail Signage',
        'Stationery, Collateral & Merch',
        'Digital Design Tokens & Assets'
      ],
      duration: '2 Weeks',
      output: 'Design System & Master Asset Archive'
    }
  ] satisfies ProcessStage[]
};

export const about = {
  heading: 'Swapnil Gathibandhe',
  tag: 'ABOUT THE FOUNDER',
  name: 'Swapnil Gathibandhe',
  role: 'Founder & Creative Director',
  location: 'Nagpur, India · Working Worldwide',
  lead: 'ArtSwapy is an independent brand design and consulting practice founded by Swapnil Gathibandhe.',
  bio: {
    text: 'Independent brand designer and creative director focused on branding, identity systems, packaging, and digital experiences. Working closely with visionary founders to build distinct, enduring brands that turn everyday communication into memorable brand experiences.',
    placeholder: false
  },
  principles: [
    {
      num: '01',
      title: 'Meaning First',
      body: 'Strategy and positioning before decoration. Every visual decision is anchored in clear business rationale and cultural resonance.'
    },
    {
      num: '02',
      title: 'Systematic Craft',
      body: 'Identity systems built to scale with precision — from tactile packaging and print to digital products and motion.'
    },
    {
      num: '03',
      title: 'Independent Focus',
      body: 'Direct collaboration with the founder from day one. No agency bloat, no intermediate layers, pure creative velocity.'
    }
  ],
  disciplines: ['Brand Identity', 'Visual Strategy', 'Packaging Design', 'Digital Direction', 'Art Direction'],
  portrait: {
    src: '/images/swapnil-portrait.png',
    alt: 'Portrait of Swapnil Gathibandhe, founder of ArtSwapy',
    placeholder: false
  }
};

export const contact = {
  heading: ['Let’s make it', 'meaningful.'] as [string, string],
  cta: 'Start a project',
  hello: 'Hello',
  mailto: {
    to: site.email.address,
    subject: 'Project enquiry',
    body: 'Hi Swapnil,\n\nMy business is …\nWhat I need help with: …\nTimeline: …\n\nThanks,'
  } satisfies MailtoTemplate,
  setName: {
    label: 'Your business name',
    hint: 'Shown in our type, and added to your email subject.',
    placeholder: 'Your name',
    sample: 'Your name'
  },
  routes: [
    { id: 'email', label: 'Email', value: site.email.address, placeholder: site.email.placeholder },
    { id: 'whatsapp', label: 'WhatsApp', value: 'https://wa.me/919823034567', placeholder: true },
    { id: 'location', label: 'Location', value: 'Nagpur, India', placeholder: false },
    { id: 'availability', label: 'Availability', value: 'Available for new projects', placeholder: false }
  ] satisfies ContactRoute[]
};
