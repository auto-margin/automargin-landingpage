export type AliceAnswer = {
  answer: string;
  suggestions?: string[];
};

const navLinks = {
  home: "/",
  features: "/#features",
  demo: "/demo",
  pricing: "/pricing",
  faq: "/faq",
  contact: "/contact",
  about: "/about",
  guidebook: "/guidebook",
  privacy: "/privacy",
  enterprise: "/enterprise",
  browserExtension: "/browser-extension",
};

const navLabels: Record<keyof typeof navLinks, string> = {
  home: "Home page",
  features: "Features section",
  demo: "Demo page",
  pricing: "Pricing page",
  faq: "FAQ page",
  contact: "Contact page",
  about: "About page",
  guidebook: "Guidebook",
  privacy: "Privacy policy",
  enterprise: "Enterprise page",
  browserExtension: "Browser extension page",
};

function pageLink(key: keyof typeof navLinks) {
  return `[${navLabels[key]}](${navLinks[key]})`;
}

const staticAnswers: Array<{
  id: string;
  keywords: string[];
  answer: string;
  suggestions?: string[];
}> = [
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "good morning", "good afternoon"],
    answer:
      "Hi, I am Bot. I can help you understand Auto-margin, find the right page, explain pricing, or point you to the demo and contact form.",
    suggestions: ["What does Auto-margin do?", "How does pricing work?"],
  },
  {
    id: "product",
    keywords: [
      "what is automargin",
      "what does automargin do",
      "how does it work",
      "product",
      "platform",
      "tool",
    ],
    answer:
      "Auto-margin helps professional car dealers review incoming offers and focus on better deals. You upload the offers you already receive, and Auto-margin shows which cars create margin, which ones will sit, and which ones are already placed.",
    suggestions: ["Which files are supported?", "Can I try a demo?"],
  },
  {
    id: "features",
    keywords: [
      "features",
      "market price",
      "margin",
      "competitor",
      "insights",
      "supplier",
      "intake",
    ],
    answer: `Core features include uploaded offer intake, market-backed margin checks, supplier visibility, offer triage, notifications, and support for uploaded files. See the ${pageLink("features")}.`,
    suggestions: ["Which markets are supported?", "Which files are supported?"],
  },
  {
    id: "markets",
    keywords: [
      "markets",
      "countries",
      "europe",
      "autoscout",
      "mobile.de",
      "mobilede",
      "germany",
      "france",
      "poland",
      "italy",
      "belgium",
      "switzerland",
      "spain",
      "netherlands",
      "sweden",
      "south korea",
      "china",
    ],
    answer:
      "Auto-margin checks offers against current European market context, including Germany, France, Poland, Italy, Switzerland, Spain, Netherlands, Belgium, Sweden, and Czech Republic. The homepage also shows connected context for South Korea and China where relevant.",
    suggestions: ["Can I trust the prices?", "How do I get started?"],
  },
  {
    id: "pricing",
    keywords: [
      "price",
      "pricing",
      "cost",
      "plans",
      "subscription",
      "quote",
      "proposal",
    ],
    answer: `Auto-margin uses tailored pricing at launch. The price depends on offer volume, target markets, workflow setup, API or managed access needs, onboarding, and support level. Visit the ${pageLink("pricing")} or contact sales on the ${pageLink("contact")}.`,
    suggestions: ["What are the engagement models?", "Contact sales"],
  },
  {
    id: "engagement",
    keywords: [
      "automatic access",
      "managed access",
      "enterprise api",
      "api access",
      "engagement",
    ],
    answer:
      "The current engagement models are automatic access, managed access, and enterprise API access. Automatic access processes offers for your team, managed access lets users upload and handle offers in Auto-margin, and API access gives your team keys and documentation to build its own workflow.",
    suggestions: ["How does onboarding work?", "How do I contact sales?"],
  },
  {
    id: "demo",
    keywords: ["demo", "try", "test", "trial", "free trial", "sample"],
    answer: `You can try Auto-margin with a real car offer on the ${pageLink("demo")}. Upload or write an offer and see how the review flow works.`,
    suggestions: ["Which files are supported?", "Go to contact"],
  },
  {
    id: "files",
    keywords: [
      "file",
      "files",
      "pdf",
      "excel",
      "csv",
      "word",
      "google sheets",
      "email",
      "upload",
    ],
    answer:
      "Auto-margin supports vehicle offers from emails, PDFs, Excel, Word, Google Sheets, CSV-style workflows, and mixed batches. The goal is to work with the offers dealers already receive instead of forcing more manual review.",
    suggestions: ["How does supplier verification work?", "Try the demo"],
  },
  {
    id: "security",
    keywords: ["security", "safe", "data", "privacy", "encrypted", "gdpr"],
    answer: `The site states that files are encrypted, processed in secure environments, and not shared with third parties. You can also review the ${pageLink("privacy")}.`,
    suggestions: ["Contact the team", "Read privacy policy"],
  },
  {
    id: "contact",
    keywords: ["contact", "email", "sales", "support", "talk", "book", "call"],
    answer: `You can contact Auto-margin at to@auto-margin.com or use the form on the ${pageLink("contact")}. The site says the team typically responds within 1 business day, Monday-Friday 9:00-17:00 CET.`,
    suggestions: ["How does pricing work?", "How do I get started?"],
  },
  {
    id: "audience",
    keywords: [
      "who is it for",
      "customers",
      "dealers",
      "dealer",
      "trading company",
      "marketplace",
      "b2b",
    ],
    answer:
      "Auto-margin is built for independent car dealers, automotive trading companies, vehicle import/export businesses, dealer networks, and B2B marketplaces handling high volumes of offers and supplier relationships.",
    suggestions: ["How does it identify deals?", "How do I get started?"],
  },
  {
    id: "best-deals",
    keywords: [
      "best deals",
      "identify",
      "recommend",
      "rank",
      "profitable",
      "profit",
    ],
    answer:
      "Auto-margin checks each offer against current market context and turns it into a clear next step. The goal is to help dealers spend less time reviewing cars and more time acting on the right suppliers and stock.",
    suggestions: ["Can I trust the prices?", "Which markets are supported?"],
  },
  {
    id: "prices-trust",
    keywords: [
      "trust",
      "accurate",
      "prices",
      "market prices",
      "data updates",
      "live listings",
    ],
    answer:
      "Market prices are checked against current European marketplace context and refreshed regularly, so your team works from market movement instead of static guesses.",
    suggestions: ["Which markets are supported?", "Try the demo"],
  },
  {
    id: "getting-started",
    keywords: [
      "get started",
      "start",
      "onboarding",
      "setup",
      "sign up",
      "request access",
    ],
    answer: `To get started, submit a request through the ${pageLink("contact")}. The process is request access, qualification call, commercial proposal, onboarding, then ongoing optimization.`,
    suggestions: ["How does pricing work?", "Contact sales"],
  },
  {
    id: "about",
    keywords: ["about", "team", "company", "founded", "story", "mission"],
    answer: `Auto-margin is a lean, founder-owned team with car-industry experience across Europe and a network in Switzerland. The company mission is to help dealers control intake and build stronger supplier networks. Read more on the ${pageLink("about")}.`,
    suggestions: ["Who is Auto-margin for?", "Contact the team"],
  },
  {
    id: "navigation",
    keywords: ["where", "page", "navigate", "link", "find", "go to"],
    answer: `Useful pages: ${pageLink("demo")}, ${pageLink("pricing")}, ${pageLink("faq")}, ${pageLink("contact")}, ${pageLink("about")}, ${pageLink("guidebook")}, and ${pageLink("privacy")}.`,
    suggestions: ["Open demo", "Open pricing"],
  },
];

function normalize(input: string) {
  return input.toLowerCase().replace(/[^a-z0-9åäöüéèñøæß.\s-]/gi, " ");
}

function isShortGreeting(message: string) {
  return /^(hi|hello|hey|hej|hola|hallo|good morning|good afternoon)\b/i.test(
    message.trim(),
  );
}

export function findStaticAliceAnswer(message: string): AliceAnswer | null {
  const normalized = normalize(message);
  const words = normalized.split(/\s+/).filter(Boolean);

  if (isShortGreeting(message)) {
    return staticAnswers[0] ?? null;
  }

  let best: {
    score: number;
    item: (typeof staticAnswers)[number];
  } | null = null;

  for (const item of staticAnswers) {
    let score = 0;

    for (const keyword of item.keywords) {
      const normalizedKeyword = normalize(keyword);
      if (normalized.includes(normalizedKeyword)) {
        score += normalizedKeyword.includes(" ") ? 4 : 2;
      } else if (words.includes(normalizedKeyword)) {
        score += 1;
      }
    }

    if (!best || score > best.score) {
      best = { score, item };
    }
  }

  if (!best || best.score < 2) return null;

  return {
    answer: best.item.answer,
    suggestions: best.item.suggestions,
  };
}

export const ALICE_SITE_CONTEXT = `
Auto-margin is a platform for professional vehicle traders and dealerships in Europe.
It helps dealers review incoming offers faster, see which cars create margin, which ones will sit, and which ones are already placed.
The broader goal is intake control: better supplier decisions, less time reviewing cars, and more time making deals.
Target customers: independent dealers, trading companies, import/export businesses, dealer networks, and B2B marketplaces.
Core features: uploaded offer intake, market-backed margin checks, supplier visibility, offer triage, notifications, and multi-market context.
Supported inputs mentioned on the site: email, PDF, Excel, Word, Google Sheets, and mixed offer batches.
Market and data context: current European market context including Germany, France, Poland, Italy, Switzerland, Spain, Netherlands, Belgium, Sweden, and Czech Republic. The homepage also shows connected context for South Korea and China where relevant.
Pricing: custom/tailored pricing at launch. Pricing depends on offer volume, target markets, workflow setup, API or managed access, onboarding, reporting, account support, and operational assistance.
Engagement models: automatic access, managed access, and enterprise API access.
Contact: to@auto-margin.com. Contact form: /contact. Hours: Monday-Friday 9:00-17:00 CET. Typical response: within 1 business day.
Useful pages: /demo, /pricing, /faq, /contact, /about, /guidebook, /privacy, /enterprise, /browser-extension.
`;
