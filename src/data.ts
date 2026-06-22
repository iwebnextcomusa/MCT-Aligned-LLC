export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  overview: string;
  benefits: string[];
  outcomes: string[];
  iconName: string;
  highlightStat?: string;
  markupStat?: string;
}

export interface ValueItem {
  title: string;
  description: string;
  iconName: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
  company: string;
  rating: number;
}

export const VALUES: ValueItem[] = [
  {
    title: "1. Pay Ahead",
    description: "Load credits for 6 months to fund production directly, bypassing high-interest commercial cash advances.",
    iconName: "ShieldCheck"
  },
  {
    title: "2. We Make the Batch",
    description: "Your credits transform directly into supply batches. Pooling demand drives volume discounts on raw execution.",
    iconName: "Cpu"
  },
  {
    title: "3. Pay Lowest Price Offered",
    description: "You receive direct-cost savings. We deliver the lowest price we can offer—not the highest you can afford.",
    iconName: "TrendingDown"
  },
  {
    title: "4. Credits Roll Forward",
    description: "Flexibility is built-in. Use your shared-production credits now, roll them to next batches, or save them for later.",
    iconName: "Users"
  }
];

export const SERVICES: Service[] = [
  {
    id: "food-growing",
    title: "Food & Growing Pipelines",
    shortDesc: "Bypassing intermediate logistics to return value directly to our primary growers.",
    overview: "In conventional food supply chains, farms receive only about 12¢ of each U.S. food dollar, and at restaurants, it drops to about 7¢. ShareLoop bypasses the bloated brokerage chains, letting growers secure direct buyer funding while offering buyers fresh premium commodities at absolute baseline prices.",
    benefits: [
      "Bypasses 3 to 4 secondary wholesale logistics stages",
      "Direct contract security for agricultural farms",
      "Transparent batch purchase order pools for crop security"
    ],
    outcomes: [
      "Growers retain more direct earnings for their harvests",
      "Fewer administrative business entities pocketing margins",
      "Predictable bulk direct delivery to consumer and food cooperatives"
    ],
    iconName: "Compass",
    highlightStat: "12¢ of each food dollar",
    markupStat: "USDA ERS, 2024"
  },
  {
    id: "machining-fabrication",
    title: "Machining & 3D Fabrication",
    shortDesc: "Pooling direct manufacturing runs to evade steep commercial retail markup chains.",
    overview: "Why pay high distributor overhead? A modern study proved that 3D printing household items that retail for $279 to $1,376 costs just $18.63 in raw fabrication output. By pooling batch runs directly to modern digital fabricators, we deliver custom industrial hardware with near-zero administrative waste.",
    benefits: [
      "Bypasses traditional distributor margins up to 90%",
      "Aggregates CAD/CAM print queues to optimize machinery uptime",
      "Saves high supply chain markup fees on household and custom hardware items"
    ],
    outcomes: [
      "Average cost reductions exceeding 75% on standard component acquisitions",
      "Custom parts fabricated exactly to order, eliminating excess warehouse inventory",
      "Stable direct manufacturing pipelines connected on clear credits"
    ],
    iconName: "Sliders",
    highlightStat: "$18.63 vs $1,376 Retail",
    markupStat: "Petersen & Pearce, 2017"
  },
  {
    id: "software-automations",
    title: "Software & Digital Automations",
    shortDesc: "Connecting core code architects directly to operations, bypassing SaaS fee margins.",
    overview: "SaaS markup bloat is higher than ever. Only about 12¢ of your software dollar keeps it online and pays the actual builders—the remaining 88¢ goes to sales, marketing, and corporate administration. We connect you directly with specialized engineering units and lightweight, custom-hosted digital assets.",
    benefits: [
      "Eliminates perpetual multi-user licensing and brokerage markup",
      "Dedicated server instance setup optimized strictly for active usage",
      "Keeps digital assets owned by you rather than locked in a corporate ecosystem"
    ],
    outcomes: [
      "Drastically lowered monthly utility and hosting fees for central apps",
      "Engineering resources spent purely on coding rather than sales commissions",
      "High security and complete control of your databases without SaaS intermediaries"
    ],
    iconName: "Network",
    highlightStat: "12¢ of software dollar used",
    markupStat: "SaaS Capital / BLS / Census-FRED"
  },
  {
    id: "expert-help",
    title: "Expert Help & Consulting",
    shortDesc: "Eliminating consulting firm markup loops to secure pure technical outcomes.",
    overview: "Traditional consulting agencies are highly bloated. Even counting all direct production payroll, technical and management output only adds up to about 38¢ of each corporate consulting dollar spent. Our direct expertise models align expert pools straight to buyers, completely stripping away agent overhead.",
    benefits: [
      "Eradicates standard 150%+ recruitment agency markups",
      "Direct expert tracking with zero middle management noise",
      "Direct project funding ensures builders are rewarded fully for outcomes"
    ],
    outcomes: [
      "Buyers get premium advisory services at a fraction of agency rates",
      "Experts retain a significantly larger share of their billable labor",
      "Highly streamlined milestones tracked through clear metrics"
    ],
    iconName: "Cpu",
    highlightStat: "38¢ of each dollar spent",
    markupStat: "U.S. Census / FRED, 2022"
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "What is ShareLoop?",
    answer: "ShareLoop is an interactive shared-production project of MCT-Aligned LLC. We flip the traditional chain on its head: members fund production first on stable credits, then we manufacture in batches. With fewer business entities sitting between your dollar and the actual work, we return maximum value to creators and buyers alike."
  },
  {
    question: "Why do you say 'The work isn't expensive. The chain is'?",
    answer: "Because traditional supply chains are cluttered with average lengths of 5.6 paid stages. A 'paid stage' is another redundant business standing between your dollar and the work. Each stage doesn't add tasks—it simply adds its own profit margin. That's why food growers receive only 12¢ of your dollar and software builders receive only 12¢."
  },
  {
    question: "How does the ShareLoop 4-step model work?",
    answer: "1. Pay Ahead (load credits for 6 months to fund production) -> 2. We Make the Batch (credits turn work directly into supply) -> 3. Pay the Lowest Price (you get direct-cost output, not marked-up retail pricing) -> 4. Credits Roll Forward (unspent credits stay yours and roll into future batches safely)."
  },
  {
    question: "Who is MCT Aligned LLC?",
    answer: "MCT Aligned LLC is the registered US parent operator of ShareLoop. We work to rebuild broken transaction models, streamline process software, and manage direct pipelines so that workers and buyers can enjoy durable, equitable commerce."
  },
  {
    question: "How do I join the next batch?",
    answer: "You can lock in your value and stretch your dollar today. Simply contact our support directly at (580) 826-7475 or submit a request on our secure client form. Our support is fully aligned to advise you on optimal credit allocations."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "By joining the ShareLoop shared-production batch, we bypassed three separate distribution levels. Our agricultural co-op secured 40% higher direct contract margins, while our urban buyers paid 15% less for bulk organic output. The chain is flipped!",
    author: "Elena Rostov",
    title: "Supply Director",
    company: "Apex Growers Union",
    rating: 5
  },
  {
    quote: "We fabricated our household and industrial widgets using the ShareLoop pooled batches. Bypassing the conventional wholesale distributor saved our contracting firm thousands of dollars month-over-month. We actually pay the lowest possible price.",
    author: "Jameson Miller",
    title: "Chief Engineer",
    company: "Pinnacle Fabrications",
    rating: 5
  },
  {
    quote: "We spent years losing 88% of our IT budget to bloated software sales intermediaries. Switching to ShareLoop's custom-hosted digital pipeline preserved our workflow speeds at a mere 15% of our former subscription expenses.",
    author: "Chloe Jenkins",
    title: "CIO",
    company: "Sentry Logistics",
    rating: 5
  }
];
