export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  overview: string;
  benefits: string[];
  outcomes: string[];
  iconName: string;
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
    title: "Integrity",
    description: "We believe in direct honesty, ensuring all decisions are made uprightly and with the clients' and workers' best interests at heart.",
    iconName: "ShieldCheck"
  },
  {
    title: "Transparency",
    description: "No hidden charges, markups, or obscure commissions. We lay bare the entire value chain format so benefits are crystal clear.",
    iconName: "Eye"
  },
  {
    title: "Efficiency",
    description: "Every unnecessary handoff, delay, and layer of management is overhead. We trim the fat to optimize resource paths.",
    iconName: "Zap"
  },
  {
    title: "Partnership",
    description: "We are not standard transactional vendors; we act as aligning partners, sharing risks and building mutually rewarding structures.",
    iconName: "Users"
  },
  {
    title: "Long-Term Value Creation",
    description: "By anchoring value back into the hands of real workers and direct buyers, we lay the groundwork for durable, decade-long expansion.",
    iconName: "TrendingUp"
  }
];

export const SERVICES: Service[] = [
  {
    id: "process-optimization",
    title: "Business Process Optimization",
    shortDesc: "Eliminate administrative waste, streamline operations, and drive optimal throughput.",
    overview: "Our Business Process Optimization focuses on stripping away structural bottlenecks that slow down transactions and communication. We dissect your internal workflows to ensure your people perform high-value operations instead of wrestling with bureaucratic overhead.",
    benefits: [
      "Up to 35% reduction in administrative task timelines",
      "Standardization of high-efficiency operational templates",
      "Integration of automated task management protocols"
    ],
    outcomes: [
      "Accelerated response times for incoming buyer queries",
      "Substantially reduced stress and overhead for on-the-ground staff",
      "Predictable, repeatable delivery structures"
    ],
    iconName: "Sliders"
  },
  {
    id: "value-chain-analysis",
    title: "Value Chain Analysis",
    shortDesc: "Identify where unnecessary middleman markups occur and reroute value backwards.",
    overview: "Every intermediary that touches a service or product extracts a fee, frequently without appending equal worth. Our deep-dive Value Chain Analysis maps the entire journey of your offerings to locate and eliminate redundant fee structures.",
    benefits: [
      "Granular visibility into every fee, commission, and markup",
      "Direct action items to bypass non-contributing intermediaries",
      "Enhanced direct alignment between original suppliers and ultimate shoppers"
    ],
    outcomes: [
      "Lower acquisition costs for buyers with heightened margins",
      "Higher payout rates and incentives for actual product/service creators",
      "More durable resource pathways"
    ],
    iconName: "Network"
  },
  {
    id: "strategic-alignment",
    title: "Strategic Alignment Consulting",
    shortDesc: "Synchronize company incentives, compensation, and operational goals for growth.",
    overview: "A business slows down when different teams pull in separate directions. We partner with executive teams to realign internal incentives, supply contracts, and performance goals so that everyone's reward aligns directly with customer satisfaction and quality delivery.",
    benefits: [
      "Consolidated goals across distinct organizational layers",
      "Cooperative risk-and-reward sharing blueprints",
      "Incentive structures designed to attract and retain top workers"
    ],
    outcomes: [
      "Elimination of internal conflict or siloed goals",
      "A culture focused purely on client value delivery",
      "Consistent, strategic agility across departments"
    ],
    iconName: "Compass"
  },
  {
    id: "cost-reduction",
    title: "Cost Reduction Initiatives",
    shortDesc: "Prune wasteful third-party overhead and redirect savings directly to your bottom line.",
    overview: "Administrative tool bloat, expensive intermediary software, and excessive brokerage commissions drain vital resources. We systematically audit third-party expenses to find cost structures that can be consolidated or replaced with lean, direct-path solutions.",
    benefits: [
      "Comprehensive vendor expense audit down to individual licenses",
      "Consolidation of overlapping digital software tools",
      "Design of zero-commission direct-dealing pathways"
    ],
    outcomes: [
      "Immediate, material reduction in monthly operating overhead",
      "More competitive market pricing for buyers",
      "Resilient capital structure ready to weather market shifts"
    ],
    iconName: "TrendingDown"
  },
  {
    id: "operational-efficiency",
    title: "Operational Efficiency Solutions",
    shortDesc: "Fine-tune asset and labor allocation to maximize quality while keeping fees minimal.",
    overview: "Traditional operations often use complex scheduling patterns that waste labor hours and material capital. We build custom, data-driven scheduling and resource management strategies that keep service delivery highly efficient and completely reliable.",
    benefits: [
      "Smart resource schedules that match labor straight to demand peaks",
      "Elimination of underutilized assets and deadweight costs",
      "Optimized logistics and dispatch channels"
    ],
    outcomes: [
      "Maximized uptime and output rate for existing resources",
      "No compromise on product quality despite lower overall operating budgets",
      "Empowered employees working in a highly optimized workplace"
    ],
    iconName: "Cpu"
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "What does MCT Aligned mean by 'aligning value'?",
    answer: "Historically, middlemen, brokers, and overlapping agents squeeze are major factors in driving up costs for buyers while lowering earnings for actual builders and workers. MCT Aligned LLC is dedicated to restructuring resource chains so that more money stays in the pockets of the buyer and the worker, and less is wasted on middlemen commissions."
  },
  {
    question: "How do your solutions benefit buyers?",
    answer: "By removing intermediary markups and process waste, buyers receive the same premium quality services and products at a lower direct price. We enable transparent pricing, where a buyer knows exactly what portion of their spending goes to production rather than administration."
  },
  {
    question: "Do you replace current workers or staff?",
    answer: "Absolutely not. In fact, we empower and protect your workers. By eliminating excessive administrative hierarchies and redirects, we ensure workers can focus on what they do best, frequently earning better compensation because the value they produce isn't diluted by unnecessary administrative costs."
  },
  {
    question: "How do you evaluate our company's inefficiencies?",
    answer: "We perform a thorough Value Chain Analysis. We look at every handoff, vendor bill, software licensing fee, and middleware markup. Within a few weeks, we deliver a clear, visual diagnostic identifying precisely where margins are leaking, followed by a roadmap for optimization."
  },
  {
    question: "What industries do you work with?",
    answer: "Any sector that experiences complex distribution channels, high vendor reliance, or heavy administrative overhead. This includes professional services, trade logistics, manufacturing, and technical project management organizations."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "MCT Aligned did a thorough value review of our contracting operations. We bypassed a massive commercial broker, which reduced our purchasing costs by 18% while our supply laborers actually saw a wage bump. Everyone won.",
    author: "Elena Rostov",
    title: "VP of Operations",
    company: "Apex Distribution Services",
    rating: 5
  },
  {
    quote: "By aligning our project teams' incentives directly with quality benchmarks, our delivery timeline decreased by 25%. Brian and his team cut right through the corporate buzzwords to deliver real, measurable efficiency.",
    author: "Jameson Miller",
    title: "CEO",
    company: "Pinnacle Engineering Corp",
    rating: 5
  },
  {
    quote: "Our software and administrative broker overhead had grown out of control. MCT Aligned consolidation protocols consolidated our tool stack, saving us thousands of dollars monthly with zero drop in productivity.",
    author: "Chloe Jenkins",
    title: "Director of Digital Strategy",
    company: "Sentry Logistics",
    rating: 5
  }
];
