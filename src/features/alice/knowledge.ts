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
      "Auto-margin helps professional car dealers analyze vehicle offers before buying. It compares offers against live European market data, estimates resale value, calculates margin, and highlights profitable opportunities.",
    suggestions: ["Which files are supported?", "Can I try a demo?"],
  },
  {
    id: "features",
    keywords: [
      "features",
      "market price",
      "margin analysis",
      "competitor",
      "insights",
      "ai-powered",
    ],
    answer: `Core features include real-time market price comparisons, instant margin analysis, competitor pricing across markets, AI-powered insights, supplier verification, offer comparison, notifications, and support for uploaded files. See the ${pageLink("features")}.`,
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
      "belgium",
      "switzerland",
      "spain",
      "denmark",
      "sweden",
    ],
    answer:
      "Auto-margin currently compares vehicle offers against Belgium, Switzerland, Spain, Denmark, and Sweden. More European markets may be added over time, but those five are the MVP comparison markets right now.",
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
    answer: `Auto-margin uses tailored pricing at launch. The price depends on deal volume, target markets, workflow setup, API or managed access needs, onboarding, and support level. Visit the ${pageLink("pricing")} or contact sales on the ${pageLink("contact")}.`,
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
      "The current engagement models are automatic access, managed access, and enterprise API access. Automatic access validates offers for your team, managed access lets users validate offers in Auto-margin, and API access gives your team keys and documentation to build its own validation setup.",
    suggestions: ["How does onboarding work?", "How do I contact sales?"],
  },
  {
    id: "demo",
    keywords: ["demo", "try", "test", "trial", "free trial", "sample"],
    answer: `You can try Auto-margin with a real car offer on the ${pageLink("demo")}. Write your offer and click "Analyze".`,
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
      "Auto-margin supports vehicle offers from emails, PDFs, Excel, Word, Google Sheets, CSV-style workflows, and mixed batches. The goal is to parse offers automatically so dealers do not need manual spreadsheets.",
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
    answer: `You can contact Auto-margin at info@auto-margin.com or use the form on the ${pageLink("contact")}. The site says the team typically responds within 1 business day, Monday-Friday 9:00-17:00 CET.`,
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
      "Auto-margin is built for independent car dealers, automotive trading companies, vehicle import/export businesses, dealer networks, and B2B marketplaces handling high volumes of offers.",
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
      "Auto-margin evaluates each offer against real-time listings, estimates resale value, calculates potential margin, and ranks opportunities based on dealer criteria. The goal is faster, data-driven purchasing decisions.",
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
      "Market prices are cross-checked against live listings from AutoScout24, Mobile.de, and other trusted European marketplaces, with data updated daily to reflect market shifts.",
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
    answer: `Auto-margin is a lean, founder-owned team with car-industry experience across Europe and a network in Switzerland. The company mission is to remove uncertainty from vehicle sourcing. Read more on the ${pageLink("about")}.`,
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
Auto-margin is a data-driven analytics platform for professional vehicle traders and dealerships in Europe.
It helps dealers analyze vehicle offers, compare supplier prices with live market listings, estimate resale values, calculate profit margins, rank opportunities, and reduce manual spreadsheet work.
Target customers: independent dealers, trading companies, import/export businesses, dealer networks, and B2B marketplaces.
Core features: real-time market price intelligence, instant margin analysis, competitor price monitoring, multi-market comparison, supplier verification, offer comparison, notifications, and AI-powered insights.
Supported inputs mentioned on the site: email, PDF, Excel, Word, Google Sheets, and mixed offer batches.
Marketplaces and data context: AutoScout24, Mobile.de, and other European marketplaces. Current MVP comparison markets are Belgium, Switzerland, Spain, Denmark, and Sweden.
Pricing: custom/tailored pricing at launch. Pricing depends on deal volume, target markets, workflow setup, API or managed access, onboarding, reporting, account support, and operational assistance.
Engagement models: automatic access, managed access, and enterprise API access.
Contact: info@auto-margin.com. Contact form: /contact. Hours: Monday-Friday 9:00-17:00 CET. Typical response: within 1 business day.
Useful pages: /demo, /pricing, /faq, /contact, /about, /guidebook, /privacy, /enterprise, /browser-extension.
`;
