import { Category, Provider, ServiceRequest } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'tech_dev',
    name: 'Web & App Development',
    iconName: 'Code',
    description: 'Custom web apps, portals, automations & business digital tools',
    activeProviders: 24,
    sampleQuery: 'Need a custom web app and customer portal for my business in Alagbaka',
  },
  {
    id: 'branding_marketing',
    name: 'Branding & Marketing',
    iconName: 'Palette',
    description: 'Brand identity systems, logo design, automation & marketing',
    activeProviders: 31,
    sampleQuery: 'Logo and brand identity package for a new agribusiness in Ijapo',
  },
  {
    id: 'electrical_solar',
    name: 'Electrical & Solar',
    iconName: 'Zap',
    description: 'Solar installations, hybrid inverters, DB wiring & fault tracing',
    activeProviders: 38,
    sampleQuery: 'Electrical fault inspection and solar inverter calibration in Isinkan',
  },
  {
    id: 'plumbing',
    name: 'Plumbing & Water',
    iconName: 'Wrench',
    description: 'PPR pipe installation, borehole pumps, leak repairs & taps',
    activeProviders: 29,
    sampleQuery: 'Fix leaking kitchen pipe and inspect water pump in Oke-Aro',
  },
  {
    id: 'cleaning',
    name: 'Deep Cleaning',
    iconName: 'Sparkles',
    description: 'Move-in deep cleans, post-construction sanitization & hygiene',
    activeProviders: 35,
    sampleQuery: 'Deep cleaning for a 3-bedroom apartment around Oba Ile',
  },
  {
    id: 'painting',
    name: 'Painting & Screeding',
    iconName: 'Paintbrush',
    description: 'Interior & exterior painting, pop screeding & surface prep',
    activeProviders: 22,
    sampleQuery: 'Repaint 4-bedroom duplex interior and screeding in Alagbaka',
  },
  {
    id: 'photography_livestream',
    name: 'Photography & Media',
    iconName: 'Camera',
    description: 'Commercial photography, live streaming, video coverage & media',
    activeProviders: 27,
    sampleQuery: 'Photography and multi-camera livestream for conference at FUTA area',
  },
  {
    id: 'carpentry',
    name: 'Carpentry & Woodwork',
    iconName: 'Hammer',
    description: 'Custom cabinetry, modern wardrobes, doors & furniture repairs',
    activeProviders: 19,
    sampleQuery: 'Build custom kitchen cabinets and repair bedroom wardrobe doors',
  },
  {
    id: 'fashion',
    name: 'Fashion & Tailoring',
    iconName: 'Scissors',
    description: 'Bespoke native wear, corporate suits, alterations & styling',
    activeProviders: 26,
    sampleQuery: 'Bespoke senator material tailoring for event this weekend in Oke Eda',
  },
  {
    id: 'repairs_cooling',
    name: 'AC & Refrigeration',
    iconName: 'FlameKindling',
    description: 'AC servicing, inverter AC diagnosis, gas refills & repairs',
    activeProviders: 21,
    sampleQuery: 'Inverter AC gas refill and general servicing in Adebayo',
  },
];

export const MOCK_PROVIDERS: Provider[] = [
  {
    id: 'p-uthman',
    name: 'Uthman Adesola',
    businessName: 'Adesola Digital Solutions',
    avatar: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400&auto=format&fit=crop&q=80',
    service: 'Web/App Development',
    subCategories: ['Web/App Development', 'Branding', 'Automation', 'Marketing'],
    rating: 4.98,
    completedJobs: 87,
    reviewsCount: 74,
    locationCity: 'Akure',
    serviceAreas: ['Alagbaka', 'Ijapo', 'FUTA area', 'Oba Ile', 'Akure South'],
    availability: 'Available for new client consultation',
    startingPrice: '₦250,000',
    priceType: 'fixed',
    responseRate: '100%',
    responseTime: '< 15 mins',
    repeatCustomersPercent: 44,
    bio: 'Professional technology consultant specializing in full-stack web and mobile application development, brand identity design, workflow automation, and growth marketing. Delivers production-grade digital tools that simplify operations for growing businesses.',
    experienceYears: 7,
    verified: true,
    verifications: {
      identity: true,
      phone: true,
      service: true,
      credentials: true,
    },
    featured: true,
    portfolio: [
      {
        id: 'port-u1',
        title: 'Enterprise Business Workflow & Client Portal',
        category: 'Web/App Development',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
        description: 'Developed automated client billing, project tracking, and dashboard system for regional firm.'
      },
      {
        id: 'port-u2',
        title: 'Complete Corporate Identity & Brand Manual',
        category: 'Branding',
        image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&auto=format&fit=crop&q=80',
        description: 'Delivered brand strategy, color psychology, vector identity assets, and marketing guidelines.'
      },
      {
        id: 'port-u3',
        title: 'Inventory Automation & Multi-Channel Marketing',
        category: 'Automation',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
        description: 'Integrated WhatsApp order notifications with real-time stock ledger and email campaigns.'
      }
    ],
    reviews: [
      {
        id: 'rev-u1',
        authorName: 'Engr. Dapo Akintola',
        authorLocation: 'Alagbaka, Akure',
        rating: 5,
        date: '2 days ago',
        comment: 'Uthman developed our company web portal ahead of schedule. Crisp UI, thoughtful automation, and extremely clear communication. Má fo indeed — he handled everything professionally.',
        serviceTitle: 'Corporate Web Application & Lead Engine',
        metrics: { quality: 5, professionalism: 5, communication: 5, reliability: 5 },
        verifiedJob: true,
      },
      {
        id: 'rev-u2',
        authorName: 'Mrs. Yemisi Fagbemi',
        authorLocation: 'Ijapo, Akure',
        rating: 5,
        date: '1 week ago',
        comment: 'Brilliant work on our brand identity and marketing assets. He transformed our brand from looking amateur to commanding industry respect.',
        serviceTitle: 'Full Brand Redesign & Marketing Assets',
        metrics: { quality: 5, professionalism: 5, communication: 5, reliability: 5 },
        verifiedJob: true,
      },
      {
        id: 'rev-u3',
        authorName: 'Bolanle Olowo',
        authorLocation: 'FUTA area, Akure',
        rating: 4.9,
        date: '3 weeks ago',
        comment: 'Automated our invoice generation and customer onboarding workflow. Saved our team at least 15 hours every week.',
        serviceTitle: 'Business Process Automation',
        metrics: { quality: 5, professionalism: 5, communication: 4.8, reliability: 5 },
        verifiedJob: true,
      }
    ]
  },
  {
    id: 'p-gbolahan',
    name: 'Gbolahan Ayinla',
    businessName: 'Ayinla Premium Finishes',
    avatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&auto=format&fit=crop&q=80',
    service: 'Painting & Screeding',
    subCategories: ['Interior Painting', 'Exterior Screeding', 'POP Finishing', 'Stucco & Textures'],
    rating: 4.94,
    completedJobs: 112,
    reviewsCount: 96,
    locationCity: 'Akure',
    serviceAreas: ['Ijapo', 'Alagbaka', 'Oba Ile', 'Oke-Aro'],
    availability: 'Available tomorrow (8:30 AM)',
    startingPrice: '₦35,000',
    priceType: 'quote',
    responseRate: '98%',
    responseTime: '< 20 mins',
    repeatCustomersPercent: 39,
    bio: 'Master decorative painter and wall finishing specialist with 8+ years across Ondo State. Known for flawless wall screeding, satin emulsion finishes, sharp color cut-ins, and meticulous site clean-up.',
    experienceYears: 8,
    verified: true,
    verifications: {
      identity: true,
      phone: true,
      service: true,
      credentials: true,
    },
    featured: true,
    portfolio: [
      {
        id: 'port-g1',
        title: 'Modern Duplex Wall Screeding & Satin Coating',
        category: 'Painting & Screeding',
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80',
        description: 'Complete interior screeding with 3 coats of washable matte emulsion in Ijapo Estate.'
      }
    ],
    reviews: [
      {
        id: 'rev-g1',
        authorName: 'Elder Segun Adeleke',
        authorLocation: 'Ijapo, Akure',
        rating: 5,
        date: '5 days ago',
        comment: 'Gbolahan delivered clean, dust-free screeding and sharp corners. No paint splatters on the floor tiles. Very respectful craftsman.',
        serviceTitle: 'Living Room & Dining POP Screeding',
        metrics: { quality: 5, professionalism: 5, communication: 5, reliability: 5 },
        verifiedJob: true,
      }
    ]
  },
  {
    id: 'p-oshodi',
    name: 'Oshodi Ayomide',
    businessName: 'Ayomide Media & Stream Lab',
    avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&auto=format&fit=crop&q=80',
    service: 'Photography & Media',
    subCategories: ['Livestream Services', 'Multi-Camera Broadcasting', 'Audio Engineering', 'Event Media'],
    rating: 4.96,
    completedJobs: 68,
    reviewsCount: 54,
    locationCity: 'Akure',
    serviceAreas: ['FUTA area', 'Alagbaka', 'Ijapo', 'Ilesha Road'],
    availability: 'Available this weekend',
    startingPrice: '₦65,000',
    priceType: 'fixed',
    responseRate: '100%',
    responseTime: '< 10 mins',
    repeatCustomersPercent: 42,
    bio: 'Broadcast technician and live media director. Provides seamless 1080p/4K multi-camera livestreaming for corporate events, church convocations, and celebrations with dedicated bonded internet redundancy.',
    experienceYears: 6,
    verified: true,
    verifications: {
      identity: true,
      phone: true,
      service: true,
      credentials: true,
    },
    featured: true,
    portfolio: [
      {
        id: 'port-o1',
        title: '3-Camera Hybrid Conference Broadcast',
        category: 'Livestream Services',
        image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&auto=format&fit=crop&q=80',
        description: 'Live broadcast to YouTube and Zoom with crystal clear direct audio board feed.'
      }
    ],
    reviews: [
      {
        id: 'rev-o1',
        authorName: 'Pastor David Olatunji',
        authorLocation: 'FUTA area, Akure',
        rating: 5,
        date: '1 week ago',
        comment: 'Zero video buffering throughout our 4-hour symposium. Oshodi had his own backup 4G router and switchers. Truly dependable.',
        serviceTitle: 'Annual Conference Livestream & Recording',
        metrics: { quality: 5, professionalism: 5, communication: 5, reliability: 5 },
        verifiedJob: true,
      }
    ]
  },
  {
    id: 'p-ayodele',
    name: 'Ayodele Victor',
    businessName: 'Victor Electrical & Solar Works',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    service: 'Electrical & Solar',
    subCategories: ['Inverter Systems', 'Solar Panels', 'Breaker Panels', 'Fault Diagnostic'],
    rating: 4.97,
    completedJobs: 145,
    reviewsCount: 128,
    locationCity: 'Akure',
    serviceAreas: ['Oba Ile', 'Alagbaka', 'Isinkan', 'Adebayo', 'Oke-Aro'],
    availability: 'Available today (from 1:00 PM)',
    startingPrice: '₦45,000',
    priceType: 'quote',
    responseRate: '99%',
    responseTime: '< 12 mins',
    repeatCustomersPercent: 47,
    bio: 'Registered electrical technician with deep expertise in hybrid solar systems, surge suppression, automated changeover switches, and residential wiring balance across Akure neighborhoods.',
    experienceYears: 9,
    verified: true,
    verifications: {
      identity: true,
      phone: true,
      service: true,
      credentials: true,
    },
    featured: true,
    portfolio: [
      {
        id: 'port-av1',
        title: '3.5kVA Solar Inverter & Battery Bank Installation',
        category: 'Solar Systems',
        image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80',
        description: 'Installed 3.5kVA pure sine wave inverter with heavy-duty DC surge arresters in Oba Ile.'
      }
    ],
    reviews: [
      {
        id: 'rev-av1',
        authorName: 'Dr. (Mrs) Folake Adegoke',
        authorLocation: 'Oba Ile, Akure',
        rating: 5,
        date: '4 days ago',
        comment: 'Victor traced a stubborn electrical leakage in our DB board in under 30 minutes. Clean wiring and reasonable pricing.',
        serviceTitle: 'DB Board Rewiring & Surge Protection',
        metrics: { quality: 5, professionalism: 5, communication: 5, reliability: 5 },
        verifiedJob: true,
      }
    ]
  },
  {
    id: 'p-bayegun',
    name: 'Bayegun Damilola',
    businessName: 'Dami Bayegun Visuals',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    service: 'Photography & Media',
    subCategories: ['Event Photography', 'Corporate Portraits', 'Product Shots', 'Documentary'],
    rating: 4.95,
    completedJobs: 92,
    reviewsCount: 81,
    locationCity: 'Akure',
    serviceAreas: ['Alagbaka', 'Ijapo', 'FUTA area', 'Oke Eda'],
    availability: 'Available this Thursday & Friday',
    startingPrice: '₦55,000',
    priceType: 'fixed',
    responseRate: '100%',
    responseTime: '< 15 mins',
    repeatCustomersPercent: 38,
    bio: 'Visual storyteller and commercial photographer capturing authentic moments with cinematic lighting and true-to-life tones. Rapid photo turnaround within 48 hours.',
    experienceYears: 6,
    verified: true,
    verifications: {
      identity: true,
      phone: true,
      service: true,
      credentials: true,
    },
    featured: true,
    portfolio: [
      {
        id: 'port-b1',
        title: 'Executive Portraiture & Brand Media Session',
        category: 'Photography',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80',
        description: 'Corporate executive portraits with high-key lighting for Akure tech enterprise.'
      }
    ],
    reviews: [
      {
        id: 'rev-b1',
        authorName: 'Tunde Omotosho',
        authorLocation: 'Alagbaka, Akure',
        rating: 5,
        date: '1 week ago',
        comment: 'Damilola covered our product unveiling ceremony. The photos were delivered color-graded in 2 days. Top tier craft.',
        serviceTitle: 'Product Unveiling & Event Coverage',
        metrics: { quality: 5, professionalism: 5, communication: 5, reliability: 5 },
        verifiedJob: true,
      }
    ]
  },
  {
    id: 'p-folashade',
    name: 'Folashade Adeyemi',
    businessName: 'SparklePro Cleaning Services',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    service: 'Deep Cleaning',
    subCategories: ['Residential Deep Clean', 'Move-In Sanitation', 'Fumigation', 'Tile Degreasing'],
    rating: 4.93,
    completedJobs: 130,
    reviewsCount: 110,
    locationCity: 'Akure',
    serviceAreas: ['Oke-Aro', 'Alagbaka', 'Ijapo', 'Oba Ile', 'Isinkan'],
    availability: 'Available tomorrow (8:00 AM)',
    startingPrice: '₦25,000',
    priceType: 'fixed',
    responseRate: '99%',
    responseTime: '< 10 mins',
    repeatCustomersPercent: 51,
    bio: 'Certified sanitation supervisor managing a dedicated 4-person crew. Equipped with industrial steam extractors, non-toxic tile restorers, and eco-friendly disinfectants.',
    experienceYears: 5,
    verified: true,
    verifications: {
      identity: true,
      phone: true,
      service: true,
      credentials: true,
    },
    featured: true,
    portfolio: [
      {
        id: 'port-f1',
        title: 'Post-Construction 3-Bedroom Move-in Deep Clean',
        category: 'Deep Cleaning',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80',
        description: 'Complete tile paint residue scraping, window tracks vacuuming, and bathroom disinfection.'
      }
    ],
    reviews: [
      {
        id: 'rev-f1',
        authorName: 'Adeola Ajibola',
        authorLocation: 'Oke-Aro, Akure',
        rating: 5,
        date: '6 days ago',
        comment: 'Folashade and her team left our apartment spotless. The kitchen cabinets and bathroom tiles looked brand new.',
        serviceTitle: '3-Bedroom Flat Move-In Sanitization',
        metrics: { quality: 5, professionalism: 5, communication: 5, reliability: 5 },
        verifiedJob: true,
      }
    ]
  },
  {
    id: 'p-babatunde',
    name: 'Babatunde Adeleke',
    businessName: 'Adeleke Plumbing Infrastructure',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    service: 'Plumbing & Water',
    subCategories: ['PPR Pipe Installation', 'Leak Detection', 'Pumping Machines', 'Tank Automation'],
    rating: 4.92,
    completedJobs: 168,
    reviewsCount: 142,
    locationCity: 'Akure',
    serviceAreas: ['Isinkan', 'Adebayo', 'Oke-Aro', 'Alagbaka', 'Akure South'],
    availability: 'Available today (from 11:30 AM)',
    startingPrice: '₦18,000',
    priceType: 'fixed',
    responseRate: '98%',
    responseTime: '< 15 mins',
    repeatCustomersPercent: 46,
    bio: 'Experienced plumbing technician specializing in concealed piping leak repairs, copper & PPR pressure lines, automated float switches, and sanitary fixture fittings.',
    experienceYears: 10,
    verified: true,
    verifications: {
      identity: true,
      phone: true,
      service: true,
      credentials: true,
    },
    featured: true,
    portfolio: [
      {
        id: 'port-ba1',
        title: 'Concealed Water Pressure Leak Diagnostics',
        category: 'Plumbing',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80',
        description: 'Located and resolved buried wall pipe fissure with minimal tile interruption.'
      }
    ],
    reviews: [
      {
        id: 'rev-ba1',
        authorName: 'Chief Rotimi Alonge',
        authorLocation: 'Isinkan, Akure',
        rating: 5,
        date: '1 week ago',
        comment: 'Babatunde came with proper diagnostic gauges and repaired our pumping machine bypass cleanly. Highly recommended.',
        serviceTitle: 'Pumping Machine Overhaul & Bypass Valve',
        metrics: { quality: 5, professionalism: 5, communication: 5, reliability: 5 },
        verifiedJob: true,
      }
    ]
  },
  {
    id: 'p-bukola',
    name: 'Bukola Ogunleye',
    businessName: 'Bukky Royale Couturier',
    avatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=400&auto=format&fit=crop&q=80',
    service: 'Fashion & Tailoring',
    subCategories: ['Bespoke Senator Wear', 'Agbada & Embroidery', 'Corporate Gowns', 'Fittings'],
    rating: 4.96,
    completedJobs: 84,
    reviewsCount: 71,
    locationCity: 'Akure',
    serviceAreas: ['Oke Eda', 'Alagbaka', 'Ijapo', 'Ilesha Road'],
    availability: 'Available for design consultation',
    startingPrice: '₦20,000',
    priceType: 'fixed',
    responseRate: '100%',
    responseTime: '< 20 mins',
    repeatCustomersPercent: 54,
    bio: 'High-precision pattern maker and custom tailor specializing in African contemporary tailoring, hand-finished senator materials, and flawless event attire with door-to-door measurement service.',
    experienceYears: 7,
    verified: true,
    verifications: {
      identity: true,
      phone: true,
      service: true,
      credentials: true,
    },
    featured: true,
    portfolio: [
      {
        id: 'port-bu1',
        title: 'Hand-Cut Bespoke Senator Attire with French Cuffs',
        category: 'Fashion & Tailoring',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
        description: 'Tailored 3-piece luxury senator wear with geometric embroidery in Oke Eda.'
      }
    ],
    reviews: [
      {
        id: 'rev-bu1',
        authorName: 'Barrister Wale Ojo',
        authorLocation: 'Oke Eda, Akure',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Fitting was spot-on on the first trial. The stitching and fabric collar precision are world-class.',
        serviceTitle: '2 Sets of Custom Senator Attire',
        metrics: { quality: 5, professionalism: 5, communication: 5, reliability: 5 },
        verifiedJob: true,
      }
    ]
  },
];

export const INITIAL_REQUESTS: ServiceRequest[] = [
  {
    id: 'REQ-AK-1042',
    customerName: 'Olumide Fashola',
    customerPhone: '+234 803 219 4018',
    customerLocation: 'Alagbaka, Akure',
    providerId: 'p-uthman',
    providerName: 'Uthman Adesola',
    providerAvatar: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400&auto=format&fit=crop&q=80',
    providerService: 'Web/App Development',
    serviceTitle: 'Custom Web Application & Client Portal Engine',
    taskDescription: 'Need a responsive web platform for our business with client onboarding, document uploads, and automated invoice delivery. Requires modern design and reliable performance.',
    urgency: 'This week',
    scheduledDate: 'Tomorrow, Sep 16',
    scheduledTime: '10:00 AM',
    budgetPreference: 'Agreed Package (₦250,000)',
    estimatedPrice: '₦250,000',
    status: 'in_progress',
    createdAt: 'Today at 09:15 AM',
    timeline: [
      {
        status: 'request_sent',
        timestamp: 'Today at 09:15 AM',
        note: 'Request initiated by Olumide Fashola under MAFO escrow.'
      },
      {
        status: 'provider_reviewing',
        timestamp: 'Today at 09:22 AM',
        note: 'Uthman reviewed technical scope and confirmed availability.'
      },
      {
        status: 'accepted',
        timestamp: 'Today at 09:30 AM',
        note: 'Uthman accepted request at agreed rate: ₦250,000.'
      },
      {
        status: 'scheduled',
        timestamp: 'Today at 09:35 AM',
        note: 'Sprint kickoff confirmed for Tomorrow, 10:00 AM.'
      },
      {
        status: 'in_progress',
        timestamp: 'Today at 10:00 AM',
        note: 'Uthman has initiated architecture setup and wireframe review.'
      }
    ],
    messages: [
      {
        id: 'm-u1',
        requestId: 'REQ-AK-1042',
        sender: 'system',
        text: 'Request initiated under MAFO protection. Milestones and agreed quotes are protected by MAFO escrow.',
        timestamp: '09:15 AM',
        isSystemNote: true,
      },
      {
        id: 'm-u2',
        requestId: 'REQ-AK-1042',
        sender: 'customer',
        text: 'Good day Uthman. I have prepared our brand guide and current customer workflow document for our review session.',
        timestamp: '09:32 AM',
      },
      {
        id: 'm-u3',
        requestId: 'REQ-AK-1042',
        sender: 'provider',
        text: 'Good day Mr. Olumide. Má fo! I will review the workflow document this morning and prepare the initial architecture roadmap before our 10:00 AM sync.',
        timestamp: '09:40 AM',
      }
    ]
  },
  {
    id: 'REQ-AK-1039',
    customerName: 'Kemi Balogun',
    customerPhone: '+234 812 904 1172',
    customerLocation: 'Ijapo, Akure',
    providerId: 'p-gbolahan',
    providerName: 'Gbolahan Ayinla',
    providerAvatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&auto=format&fit=crop&q=80',
    providerService: 'Painting & Screeding',
    serviceTitle: 'Living Room POP Screeding & Washable Matte Paint',
    taskDescription: 'Applied smooth white putty screeding across living room walls and finished with 2 coats of washable emerald-toned matte emulsion.',
    urgency: 'Completed yesterday',
    scheduledDate: 'Yesterday, Sep 13',
    scheduledTime: '9:00 AM',
    budgetPreference: 'Agreed Quote (₦38,000)',
    estimatedPrice: '₦38,000',
    status: 'completed',
    createdAt: 'Sep 13 at 08:30 AM',
    timeline: [
      {
        status: 'request_sent',
        timestamp: 'Sep 13 at 08:30 AM',
        note: 'Request submitted by Kemi Balogun.'
      },
      {
        status: 'accepted',
        timestamp: 'Sep 13 at 08:45 AM',
        note: 'Gbolahan accepted service request.'
      },
      {
        status: 'in_progress',
        timestamp: 'Sep 13 at 09:15 AM',
        note: 'Surface screeding and masking started on site in Ijapo.'
      },
      {
        status: 'completed',
        timestamp: 'Sep 13 at 05:00 PM',
        note: 'Gbolahan marked painting job as successfully completed.'
      }
    ],
    messages: [
      {
        id: 'm-g1',
        requestId: 'REQ-AK-1039',
        sender: 'provider',
        text: 'Hello Mrs. Kemi, all walls have been coated and dried. I have removed the protective masking tape from the skirting boards and swept the floor.',
        timestamp: '05:00 PM',
      },
      {
        id: 'm-g2',
        requestId: 'REQ-AK-1039',
        sender: 'system',
        text: 'Service marked complete by Gbolahan. Please inspect your walls and confirm completion to release provider payout.',
        timestamp: '05:01 PM',
        isSystemNote: true,
      }
    ]
  },
  {
    id: 'REQ-AK-1025',
    customerName: 'Dr. Kehinde Ayoola',
    customerPhone: '+234 705 441 9901',
    customerLocation: 'Oba Ile, Akure',
    providerId: 'p-ayodele',
    providerName: 'Ayodele Victor',
    providerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    providerService: 'Electrical & Solar',
    serviceTitle: 'Solar Inverter Inspection & Automatic Changeover Setup',
    taskDescription: 'Inspect existing inverter setup, test surge suppressors, and wire automatic transfer switch for generator transition.',
    urgency: 'Thursday, Sep 17',
    scheduledDate: 'Thursday, Sep 17',
    scheduledTime: '9:00 AM',
    budgetPreference: 'Diagnostic Quote (₦45,000)',
    estimatedPrice: '₦45,000',
    status: 'provider_reviewing',
    createdAt: 'Today at 01:15 PM',
    timeline: [
      {
        status: 'request_sent',
        timestamp: 'Today at 01:15 PM',
        note: 'Request sent to Ayodele Victor.'
      },
      {
        status: 'provider_reviewing',
        timestamp: 'Today at 01:25 PM',
        note: 'Ayodele is verifying parts inventory and team schedule for Thursday.'
      }
    ],
    messages: [
      {
        id: 'm-av1',
        requestId: 'REQ-AK-1025',
        sender: 'system',
        text: 'Request is awaiting specialist confirmation. Guaranteed response within 30 minutes under MAFO SLA.',
        timestamp: '01:15 PM',
        isSystemNote: true,
      }
    ]
  }
];

export const AKURE_AREAS = [
  'All Akure Areas',
  'Alagbaka',
  'Ijapo',
  'FUTA area',
  'Oba Ile',
  'Oke-Aro',
  'Isinkan',
  'Adebayo',
  'Oke Eda',
  'Ilesha Road',
  'Akure South',
];

export const NIGERIAN_CITIES = [
  'Akure (Pilot City)',
  'All Cities',
  'Lagos',
  'Ibadan',
  'Abuja',
  'Port Harcourt',
];
