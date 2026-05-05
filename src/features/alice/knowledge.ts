import { routing, type Locale } from "@/i18n/routing";

export type AliceAnswer = {
  answer: string;
  suggestions?: string[];
};

export type AliceUiCopy = {
  welcomeMessage: string;
  quickPrompts: string[];
  botLabel: string;
  botSubtitle: string;
  openButton: string;
  typing: string;
  inputPlaceholder: string;
  aiBadge: string;
  minimizeAria: string;
  closeAria: string;
  openAria: string;
  sendAria: string;
  genericFailure: string;
  temporaryUnavailable: string;
};

type StaticAnswerDefinition = {
  id: string;
  keywords: string[];
  answer: string;
  suggestions?: string[];
};

type LocaleKnowledge = {
  ui: AliceUiCopy;
  staticAnswers: StaticAnswerDefinition[];
  siteContext: string;
  suggestions: {
    default: string[];
    ai: string[];
    rateLimit: string[];
  };
  fallbacks: {
    unavailable: string;
    unreadableMessage: string;
    shortMessage: string;
    rateLimit: string;
  };
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

type NavKey = keyof typeof navLinks;

function pageLink(labels: Record<NavKey, string>, key: NavKey) {
  return `[${labels[key]}](${navLinks[key]})`;
}

function normalize(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}.\s/-]/gu, " ");
}

function compactNormalized(input: string) {
  return normalize(input).replace(/[\s./-]+/g, "");
}

function isShortGreeting(message: string) {
  return /^(hi|hello|hey|hej|hola|hallo|guten tag|good morning|good afternoon|buenas|buenos dias|goddag)\b/i.test(
    message.trim(),
  );
}

const EN_NAV: Record<NavKey, string> = {
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

const SV_NAV: Record<NavKey, string> = {
  home: "Startsidan",
  features: "Funktionssektionen",
  demo: "Demosidan",
  pricing: "Prissidan",
  faq: "FAQ-sidan",
  contact: "Kontaktsidan",
  about: "Om oss-sidan",
  guidebook: "Guidebook",
  privacy: "Integritetspolicyn",
  enterprise: "Enterprisesidan",
  browserExtension: "Browser-tilläggssidan",
};

const DE_NAV: Record<NavKey, string> = {
  home: "Startseite",
  features: "Funktionsbereich",
  demo: "Demo-Seite",
  pricing: "Preis-Seite",
  faq: "FAQ-Seite",
  contact: "Kontakt-Seite",
  about: "Über-uns-Seite",
  guidebook: "Guidebook",
  privacy: "Datenschutzerklärung",
  enterprise: "Enterprise-Seite",
  browserExtension: "Browser-Erweiterungs-Seite",
};

const ES_NAV: Record<NavKey, string> = {
  home: "Página de inicio",
  features: "Sección de funciones",
  demo: "Página de demo",
  pricing: "Página de precios",
  faq: "Página de FAQ",
  contact: "Página de contacto",
  about: "Página sobre nosotros",
  guidebook: "Guidebook",
  privacy: "Política de privacidad",
  enterprise: "Página enterprise",
  browserExtension: "Página de extensión del navegador",
};

const DK_NAV: Record<NavKey, string> = {
  home: "Forsiden",
  features: "Funktionssektionen",
  demo: "Demosiden",
  pricing: "Prissiden",
  faq: "FAQ-siden",
  contact: "Kontaktsiden",
  about: "Om os-siden",
  guidebook: "Guidebook",
  privacy: "Privatlivspolitikken",
  enterprise: "Enterprise-siden",
  browserExtension: "Browser-udvidelses-siden",
};

const knowledgeByLocale: Record<Locale, LocaleKnowledge> = {
  en: {
    ui: {
      welcomeMessage:
        "Hi, I am Bot. Ask me about Auto-margin, pricing, the demo, supported files, supplier workflow, or how to contact the team.",
      quickPrompts: [
        "What does Auto-margin do?",
        "How does pricing work?",
        "Can I try a demo?",
      ],
      botLabel: "Bot",
      botSubtitle: "Auto-margin assistant",
      openButton: "Ask",
      typing: "Bot is typing...",
      inputPlaceholder: "Ask Bot...",
      aiBadge: "Assistant response",
      minimizeAria: "Minimize Bot",
      closeAria: "Close and reset Bot",
      openAria: "Open Bot chatbot",
      sendAria: "Send message",
      genericFailure:
        "I could not answer that right now. Please try again or use the [Contact page](/contact).",
      temporaryUnavailable:
        "I am temporarily unavailable. You can still reach Auto-margin on the [Contact page](/contact) or at to@auto-margin.com.",
    },
    suggestions: {
      default: [
        "What does Auto-margin do?",
        "How does pricing work?",
        "Can I try a demo?",
      ],
      ai: ["Contact sales", "Try the demo"],
      rateLimit: ["How does pricing work?", "Contact sales"],
    },
    fallbacks: {
      unavailable:
        "I can answer common Auto-margin questions here, but the assistant fallback is temporarily unavailable. For anything specific, use the [Contact page](/contact) or email to@auto-margin.com.",
      unreadableMessage: "I could not read that message. Please try again.",
      shortMessage:
        "Send me a short question about Auto-margin and I will help.",
      rateLimit:
        "I have reached the question limit for this browser/IP window. I can still help with common Auto-margin topics like pricing, demo, files, markets, and contact.",
    },
    staticAnswers: [
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
          "what does auto-margin do",
          "what is automargin",
          "what does automargin do",
          "how does it work",
          "product",
          "platform",
          "tool",
        ],
        answer:
          "Auto-margin helps dealers review incoming offers faster, focus on better deals, and spend less time checking every car manually. You upload the offers you already receive and Auto-margin shows which cars create margin, which ones may sit, and which ones are already placed.",
        suggestions: ["Which files are supported?", "Can I try a demo?"],
      },
      {
        id: "features",
        keywords: [
          "features",
          "market price",
          "margin",
          "partner",
          "supplier",
          "insights",
          "notifications",
          "intake",
        ],
        answer: `Core features include uploaded offer intake, live market comparison, partner visibility, margin-focused review, notifications, and support for mixed input formats. See the ${pageLink(EN_NAV, "features")}.`,
        suggestions: [
          "Which markets are supported?",
          "Which files are supported?",
        ],
      },
      {
        id: "markets",
        keywords: [
          "markets",
          "countries",
          "europe",
          "germany",
          "france",
          "poland",
          "italy",
          "belgium",
          "switzerland",
          "spain",
          "netherlands",
          "sweden",
          "czech republic",
          "south korea",
          "china",
        ],
        answer:
          "Auto-margin compares offers with live listings across Germany, France, Poland, Italy, Switzerland, Spain, Netherlands, Belgium, Sweden, and Czech Republic. The broader product story also references South Korea and China as extra market context.",
        suggestions: ["Can I trust the prices?", "How do I get started?"],
      },
      {
        id: "pricing",
        keywords: [
          "how does pricing work",
          "price",
          "pricing",
          "cost",
          "plans",
          "subscription",
          "quote",
          "proposal",
        ],
        answer: `Auto-margin uses tailored pricing. The proposal depends on offer volume, target markets, workflow setup, access model, onboarding, and support level. Visit the ${pageLink(EN_NAV, "pricing")} or contact sales on the ${pageLink(EN_NAV, "contact")}.`,
        suggestions: ["What are the access models?", "Contact sales"],
      },
      {
        id: "engagement",
        keywords: [
          "automatic access",
          "managed access",
          "enterprise api",
          "api access",
          "access model",
          "engagement",
        ],
        answer:
          "The current access models are automatic access, managed access, and enterprise API access. Automatic access lets Auto-margin process intake for you, managed access lets your team work inside the platform, and API access lets you build your own workflow on top of the analysis layer.",
        suggestions: ["How does onboarding work?", "How do I contact sales?"],
      },
      {
        id: "demo",
        keywords: [
          "can i try a demo",
          "demo",
          "try",
          "test",
          "trial",
          "sample",
        ],
        answer: `You can try Auto-margin on the ${pageLink(EN_NAV, "demo")}. The public demo shows how a single vehicle price validation can work, but not the full supplier-list workflow.`,
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
          "Auto-margin supports offers from email, PDF, Excel, Word, Google Sheets, CSV-style workflows, and mixed batches. The point is to work with the files dealers already receive.",
        suggestions: ["How does onboarding work?", "Try the demo"],
      },
      {
        id: "security",
        keywords: ["security", "safe", "data", "privacy", "encrypted", "gdpr"],
        answer: `The site states that files are encrypted, processed in secure environments, and not shared with third parties. You can also review the ${pageLink(EN_NAV, "privacy")}.`,
        suggestions: ["Contact the team", "Read privacy policy"],
      },
      {
        id: "money-back",
        keywords: [
          "money back guarantee",
          "refund",
          "refund policy",
          "guarantee",
          "cancel and refund",
        ],
        answer: `The site does not publicly state a money-back guarantee or refund policy. If you need contract or cancellation terms, the safest path is to ask the team through the ${pageLink(EN_NAV, "contact")}.`,
        suggestions: ["How does pricing work?", "Contact sales"],
      },
      {
        id: "browser-extension",
        keywords: [
          "browser extension",
          "chrome extension",
          "extension free",
          "is the browser extension free",
        ],
        answer: `Auto-margin has a ${pageLink(EN_NAV, "browserExtension")}, but the site does not publish a separate public free price for it. The page is framed around access, so use the ${pageLink(EN_NAV, "contact")} if you want extension access or pricing details.`,
        suggestions: ["How does pricing work?", "Open browser extension page"],
      },
      {
        id: "registration",
        keywords: [
          "register",
          "registration",
          "create account",
          "sign up",
          "open an account",
          "how can i register",
        ],
        answer: `There is no public self-serve registration flow on the site. The current path is to contact Auto-margin through the ${pageLink(EN_NAV, "contact")} so the team can understand your intake workflow, volume, and setup before granting access.`,
        suggestions: ["How do I get started?", "Contact sales"],
      },
      {
        id: "personal-data",
        keywords: [
          "personal data",
          "how is my data saved",
          "how does my data save",
          "store my data",
          "data retention",
          "delete my data",
          "private data",
        ],
        answer: `The privacy policy says personal data is used to provide and improve the service, stored only as needed for those purposes, and protected with encrypted backups and secure environments. It also says you can request access, correction, or deletion. See the ${pageLink(EN_NAV, "privacy")}.`,
        suggestions: ["Is my data safe?", "Read privacy policy"],
      },
      {
        id: "installation",
        keywords: [
          "do i need to install anything",
          "install",
          "installation",
          "download software",
          "local install",
        ],
        answer: `The public site is framed as a web platform, a browser extension, and guided access rather than a self-serve local software install. If you need the exact setup path for your team, use the ${pageLink(EN_NAV, "contact")}.`,
        suggestions: ["How do I get started?", "Open browser extension page"],
      },
      {
        id: "startup-speed",
        keywords: [
          "how fast can we get started",
          "how quickly can we start",
          "how long does setup take",
          "fast onboarding",
          "same day",
        ],
        answer: `The site says the path is contact, first meeting, proposal scoping, access proposal, then launch and optimization. It also says most users get started the same day once the setup is clear.`,
        suggestions: ["How do I get started?", "Contact sales"],
      },
      {
        id: "multi-user",
        keywords: [
          "can multiple people use it",
          "multiple users",
          "multi user",
          "team access",
          "seats",
        ],
        answer: `Yes. The pricing table shows plans with different seat levels, from a single seat up to larger team setups. If you need a specific team structure, use the ${pageLink(EN_NAV, "pricing")} or ${pageLink(EN_NAV, "contact")}.`,
        suggestions: ["How does pricing work?", "Open pricing"],
      },
      {
        id: "best-file-format",
        keywords: [
          "what file formats are best",
          "best format",
          "best file format",
          "which format should i use",
          "preferred file format",
        ],
        answer: `Auto-margin is designed to work with the files dealers already receive, including email, PDF, Excel, Word, Google Sheets, CSV-style workflows, and mixed batches. There is no single required format on the site.`,
        suggestions: [
          "Which files are supported?",
          "Can I upload offers from email?",
        ],
      },
      {
        id: "api-integrations",
        keywords: [
          "do you support api integrations",
          "api integration",
          "integrations",
          "api",
          "enterprise api access",
        ],
        answer: `Yes, the current access models include enterprise API access, and the pricing table also references integrations. The site does not publish detailed API terms in the chatbot context, so use the ${pageLink(EN_NAV, "contact")} or ${pageLink(EN_NAV, "guidebook")} for the next step.`,
        suggestions: ["What are the access models?", "Open guidebook"],
      },
      {
        id: "email-upload",
        keywords: [
          "can i upload offers from email",
          "upload from email",
          "email offers",
          "email import",
          "mail import",
        ],
        answer: `Yes. The site explicitly says Auto-margin supports offers from email, alongside PDF, Excel, Word, Google Sheets, CSV-style workflows, and mixed batches.`,
        suggestions: [
          "Which files are supported?",
          "How does onboarding work?",
        ],
      },
      {
        id: "contact",
        keywords: [
          "contact",
          "email",
          "sales",
          "support",
          "talk",
          "book",
          "call",
        ],
        answer: `You can contact Auto-margin at to@auto-margin.com or use the form on the ${pageLink(EN_NAV, "contact")}. The site says the team typically responds within 1 business day, Monday-Friday 9:00-17:00 CET.`,
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
          "Auto-margin is built for independent dealers, trading companies, import/export businesses, dealer networks, and B2B marketplaces handling high volumes of offers and supplier relationships.",
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
          "Auto-margin checks each offer against live market context and turns it into a clearer next step. The goal is less manual review and more time acting on the right cars and partners.",
        suggestions: [
          "Can I trust the prices?",
          "Which markets are supported?",
        ],
      },
      {
        id: "prices-trust",
        keywords: [
          "can i trust auto-margin",
          "trust",
          "accurate",
          "prices",
          "market prices",
          "data updates",
          "live listings",
        ],
        answer:
          "Yes, the site’s trust story is that Auto-margin checks offers against live marketplace listings across Europe, refreshes data regularly, encrypts files, and processes them in secure environments. For legal or contract assurances, contact the team directly.",
        suggestions: ["Which markets are supported?", "Read privacy policy"],
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
        answer: `To get started, submit a request through the ${pageLink(EN_NAV, "contact")}. The current setup path is contact, first meeting, proposal scoping, access proposal, then launch and optimization.`,
        suggestions: ["How does pricing work?", "Contact sales"],
      },
      {
        id: "about",
        keywords: ["about", "team", "company", "story", "mission"],
        answer: `Auto-margin is positioned as a lean team built around the buying work behind each vehicle deal. The company story focuses on helping dealers reduce manual review and improve partner decisions. Read more on the ${pageLink(EN_NAV, "about")}.`,
        suggestions: ["Who is Auto-margin for?", "Contact the team"],
      },
      {
        id: "navigation",
        keywords: ["where", "page", "navigate", "link", "find", "go to"],
        answer: `Useful pages: ${pageLink(EN_NAV, "demo")}, ${pageLink(EN_NAV, "pricing")}, ${pageLink(EN_NAV, "faq")}, ${pageLink(EN_NAV, "contact")}, ${pageLink(EN_NAV, "about")}, ${pageLink(EN_NAV, "guidebook")}, and ${pageLink(EN_NAV, "privacy")}.`,
        suggestions: ["Open demo", "Open pricing"],
      },
    ],
    siteContext: `
Auto-margin is a platform for professional vehicle traders and dealerships in Europe.
It helps dealers review incoming offers faster, focus on better deals, and spend less time checking every car manually.
You upload offers you already receive. Auto-margin compares them with live listings, shows which cars create margin, which ones may sit, and which ones are already placed.
The broader goal is intake control: better partner decisions, less time reviewing cars, and more time closing deals.
Target customers: independent dealers, trading companies, import/export businesses, dealer networks, and B2B marketplaces.
Core features on the site: uploaded offer intake, live market comparison, partner visibility, margin-focused review, notifications, and mixed-format support.
Supported inputs mentioned on the site: email, PDF, Excel, Word, Google Sheets, CSV-style workflows, and mixed offer batches.
Market coverage on the landing page: Germany, France, Poland, Italy, Switzerland, Spain, Netherlands, Belgium, Sweden, and Czech Republic. The site also references South Korea and China as extra context.
Pricing: tailored pricing. The proposal depends on offer volume, target markets, workflow setup, access model, onboarding, and support level.
Access models: automatic access, managed access, and enterprise API access.
Demo: the public demo shows a single-vehicle validation example, not the full supplier-list workflow.
Contact: to@auto-margin.com. Contact form: /contact. Hours: Monday-Friday 9:00-17:00 CET. Typical response: within 1 business day.
Useful pages: /demo, /pricing, /faq, /contact, /about, /guidebook, /privacy, /enterprise, /browser-extension.
`,
  },
  sv: {
    ui: {
      welcomeMessage:
        "Hej, jag är Bot. Fråga mig om Auto-margin, priser, demon, filformat, supplier workflow eller hur du kontaktar teamet.",
      quickPrompts: [
        "Vad gör Auto-margin?",
        "Hur fungerar prissättningen?",
        "Kan jag testa en demo?",
      ],
      botLabel: "Bot",
      botSubtitle: "Auto-margin-assistent",
      openButton: "Fråga",
      typing: "Bot skriver...",
      inputPlaceholder: "Fråga Bot...",
      aiBadge: "Assistentsvar",
      minimizeAria: "Minimera Bot",
      closeAria: "Stäng och återställ Bot",
      openAria: "Öppna Bot-chatten",
      sendAria: "Skicka meddelande",
      genericFailure:
        "Jag kunde inte svara på det just nu. Försök igen eller använd [Kontaktsidan](/contact).",
      temporaryUnavailable:
        "Jag är tillfälligt otillgänglig. Du kan fortfarande nå Auto-margin via [Kontaktsidan](/contact) eller på to@auto-margin.com.",
    },
    suggestions: {
      default: [
        "Vad gör Auto-margin?",
        "Hur fungerar prissättningen?",
        "Kan jag testa en demo?",
      ],
      ai: ["Kontakta sales", "Testa demon"],
      rateLimit: ["Hur fungerar prissättningen?", "Kontakta sales"],
    },
    fallbacks: {
      unavailable:
        "Jag kan svara på vanliga frågor om Auto-margin här, men AI-assistenten är tillfälligt otillgänglig. För något mer specifikt, använd [Kontaktsidan](/contact) eller mejla to@auto-margin.com.",
      unreadableMessage: "Jag kunde inte läsa det meddelandet. Försök igen.",
      shortMessage: "Skicka en kort fråga om Auto-margin så hjälper jag dig.",
      rateLimit:
        "Jag har nått frågegränsen för det här browser/IP-fönstret. Jag kan fortfarande hjälpa med vanliga ämnen som priser, demo, filer, marknader och kontakt.",
    },
    staticAnswers: [
      {
        id: "greeting",
        keywords: ["hej", "hallå", "hejsan", "god morgon"],
        answer:
          "Hej, jag är Bot. Jag kan hjälpa dig förstå Auto-margin, hitta rätt sida, förklara priser eller peka dig till demo och kontaktformulär.",
        suggestions: ["Vad gör Auto-margin?", "Hur fungerar prissättningen?"],
      },
      {
        id: "product",
        keywords: [
          "vad gör auto-margin",
          "vad gor automargin",
          "vad ar automargin",
          "hur fungerar det",
          "produkt",
          "plattform",
        ],
        answer:
          "Auto-margin hjälper handlare att granska inkommande offers snabbare, fokusera på bättre deals och lägga mindre tid på manuell kontroll av varje bil. Du laddar upp offers ni redan får och ser vilka bilar som skapar marginal, vilka som kan bli stående och vilka som redan är placerade.",
        suggestions: ["Vilka filer stöds?", "Kan jag testa en demo?"],
      },
      {
        id: "features",
        keywords: [
          "funktioner",
          "features",
          "marginal",
          "partner",
          "leverantor",
          "supplier",
          "notiser",
          "intake",
        ],
        answer: `Kärnfunktionerna är uppladdad offer intake, jämförelse mot live market data, partner visibility, marginalfokuserad review, notiser och stöd för blandade format. Se ${pageLink(SV_NAV, "features")}.`,
        suggestions: ["Vilka marknader stöds?", "Vilka filer stöds?"],
      },
      {
        id: "markets",
        keywords: [
          "marknader",
          "lander",
          "europa",
          "tyskland",
          "frankrike",
          "polen",
          "italien",
          "schweiz",
          "spanien",
          "nederlanderna",
          "belgien",
          "sverige",
          "tjeckien",
          "sydkorea",
          "kina",
        ],
        answer:
          "Auto-margin jämför offers med live listings i Tyskland, Frankrike, Polen, Italien, Schweiz, Spanien, Nederländerna, Belgien, Sverige och Tjeckien. Produktberättelsen refererar också till Sydkorea och Kina som extra marknadskontext.",
        suggestions: ["Kan jag lita på priserna?", "Hur kommer jag igång?"],
      },
      {
        id: "pricing",
        keywords: [
          "hur fungerar prissättningen",
          "pris",
          "priser",
          "kostnad",
          "plan",
          "offert",
          "proposal",
        ],
        answer: `Auto-margin använder anpassad prissättning. Förslaget beror på offervolym, målmarknader, workflow setup, accessmodell, onboarding och supportnivå. Se ${pageLink(SV_NAV, "pricing")} eller kontakta teamet via ${pageLink(SV_NAV, "contact")}.`,
        suggestions: ["Vilka accessmodeller finns?", "Kontakta sales"],
      },
      {
        id: "engagement",
        keywords: [
          "automatic access",
          "managed access",
          "api access",
          "enterprise api",
          "accessmodell",
        ],
        answer:
          "De nuvarande accessmodellerna är automatic access, managed access och enterprise API access. Automatic access låter Auto-margin processa intake åt dig, managed access låter teamet jobba i plattformen och API access låter er bygga eget workflow ovanpå analyslagret.",
        suggestions: ["Hur fungerar onboarding?", "Hur kontaktar jag sales?"],
      },
      {
        id: "demo",
        keywords: ["kan jag testa en demo", "demo", "testa", "prova", "trial"],
        answer: `Du kan testa Auto-margin på ${pageLink(SV_NAV, "demo")}. Den publika demon visar hur en validering av ett enskilt fordon kan fungera, men inte hela supplier-list-workflowet.`,
        suggestions: ["Vilka filer stöds?", "Gå till kontakt"],
      },
      {
        id: "files",
        keywords: [
          "fil",
          "filer",
          "pdf",
          "excel",
          "csv",
          "word",
          "google sheets",
          "mejl",
          "email",
          "upload",
        ],
        answer:
          "Auto-margin stöder offers från mejl, PDF, Excel, Word, Google Sheets, CSV-liknande workflows och blandade batcher. Poängen är att arbeta med filerna ni redan får.",
        suggestions: ["Hur fungerar onboarding?", "Testa demon"],
      },
      {
        id: "security",
        keywords: [
          "sakerhet",
          "data",
          "integritet",
          "privacy",
          "krypterad",
          "gdpr",
        ],
        answer: `Sajten säger att filer krypteras, behandlas i säkra miljöer och inte delas med tredje part. Du kan också läsa ${pageLink(SV_NAV, "privacy")}.`,
        suggestions: ["Kontakta teamet", "Läs integritetspolicyn"],
      },
      {
        id: "money-back",
        keywords: [
          "pengarna tillbaka",
          "aterbetalning",
          "refund",
          "garanti",
          "money back guarantee",
        ],
        answer: `Sajten anger ingen offentlig pengarna-tillbaka-garanti eller återbetalningspolicy. Om du behöver villkor för avtal, uppsägning eller återbetalning är det säkrast att fråga teamet via ${pageLink(SV_NAV, "contact")}.`,
        suggestions: ["Hur fungerar prissättningen?", "Kontakta sales"],
      },
      {
        id: "browser-extension",
        keywords: [
          "browser extension",
          "browser-tillagg",
          "tillagg",
          "ar browser extension gratis",
          "ar tillagget gratis",
        ],
        answer: `Auto-margin har en ${pageLink(SV_NAV, "browserExtension")}, men sajten visar inget separat publikt gratispris för den. Sidan är upplagd kring access, så använd ${pageLink(SV_NAV, "contact")} om du vill ha tillgång eller prisinformation.`,
        suggestions: [
          "Hur fungerar prissättningen?",
          "Öppna browser extension-sidan",
        ],
      },
      {
        id: "registration",
        keywords: [
          "registrera",
          "registrering",
          "skapa konto",
          "sign up",
          "oppna konto",
          "hur kan jag registrera mig",
        ],
        answer: `Det finns inget publikt self-serve-flöde för registrering på sajten. Den aktuella vägen är att kontakta Auto-margin via ${pageLink(SV_NAV, "contact")} så att teamet kan förstå ert intake-workflow, volym och setup innan access ges.`,
        suggestions: ["Hur kommer jag igång?", "Kontakta sales"],
      },
      {
        id: "personal-data",
        keywords: [
          "personuppgifter",
          "hur sparas min data",
          "hur sparas mina uppgifter",
          "lagras min data",
          "datalagring",
          "radera min data",
          "privat data",
        ],
        answer: `Integritetspolicyn säger att personuppgifter används för att leverera och förbättra tjänsten, sparas bara så länge det behövs för ändamålet och skyddas med krypterade backuper och säkra miljöer. Den säger också att du kan begära åtkomst, rättelse eller radering. Se ${pageLink(SV_NAV, "privacy")}.`,
        suggestions: ["Är min data säker?", "Läs integritetspolicyn"],
      },
      {
        id: "installation",
        keywords: [
          "maste jag installera nagot",
          "installera",
          "installation",
          "ladda ner programvara",
          "lokal installation",
        ],
        answer: `Den publika sajten är upplagd som en webbplattform, ett browser-tillägg och guidad access snarare än en self-serve lokal installation. Om du vill veta exakt setup för ert team, använd ${pageLink(SV_NAV, "contact")}.`,
        suggestions: ["Hur kommer jag igång?", "Öppna browser extension-sidan"],
      },
      {
        id: "startup-speed",
        keywords: [
          "hur snabbt kan vi komma igang",
          "hur snabbt kan vi starta",
          "hur lang tid tar setup",
          "snabb onboarding",
          "samma dag",
        ],
        answer: `Sajten säger att vägen är kontakt, första möte, proposal scoping, access proposal och sedan launch plus optimering. Den säger också att de flesta användare kommer igång samma dag när setupen är tydlig.`,
        suggestions: ["Hur kommer jag igång?", "Kontakta sales"],
      },
      {
        id: "multi-user",
        keywords: [
          "kan flera personer anvanda det",
          "flera anvandare",
          "team access",
          "seats",
          "multi user",
        ],
        answer: `Ja. Pristabellen visar planer med olika nivåer av seats, från en användare upp till större teamupplägg. Om ni behöver en specifik teamstruktur, se ${pageLink(SV_NAV, "pricing")} eller ${pageLink(SV_NAV, "contact")}.`,
        suggestions: ["Hur fungerar prissättningen?", "Öppna priser"],
      },
      {
        id: "best-file-format",
        keywords: [
          "vilka filformat ar bast",
          "basta format",
          "basta filformat",
          "vilket format ska jag anvanda",
          "prefererat filformat",
        ],
        answer: `Auto-margin är byggt för att fungera med filerna handlare redan får, inklusive mejl, PDF, Excel, Word, Google Sheets, CSV-liknande workflows och blandade batcher. Sajten anger inget enda obligatoriskt format.`,
        suggestions: [
          "Vilka filer stöds?",
          "Kan jag ladda upp offers från mejl?",
        ],
      },
      {
        id: "api-integrations",
        keywords: [
          "stoder ni api integrationer",
          "api integration",
          "integrationer",
          "api",
          "enterprise api access",
        ],
        answer: `Ja, de nuvarande accessmodellerna inkluderar enterprise API access, och pristabellen refererar också till integrationer. Sajten publicerar inte detaljerade API-villkor i chatbot-kontexten, så använd ${pageLink(SV_NAV, "contact")} eller ${pageLink(SV_NAV, "guidebook")} för nästa steg.`,
        suggestions: ["Vilka accessmodeller finns?", "Öppna guidebook"],
      },
      {
        id: "email-upload",
        keywords: [
          "kan jag ladda upp offers fran mejl",
          "ladda upp fran mejl",
          "mejl offers",
          "email import",
          "mail import",
        ],
        answer: `Ja. Sajten säger uttryckligen att Auto-margin stöder offers från mejl, tillsammans med PDF, Excel, Word, Google Sheets, CSV-liknande workflows och blandade batcher.`,
        suggestions: ["Vilka filer stöds?", "Hur fungerar onboarding?"],
      },
      {
        id: "contact",
        keywords: ["kontakt", "mejl", "email", "sales", "support", "prata"],
        answer: `Du kan kontakta Auto-margin på to@auto-margin.com eller via formuläret på ${pageLink(SV_NAV, "contact")}. Sajten säger att teamet normalt svarar inom 1 arbetsdag, måndag-fredag 9:00-17:00 CET.`,
        suggestions: ["Hur fungerar prissättningen?", "Hur kommer jag igång?"],
      },
      {
        id: "audience",
        keywords: [
          "vem ar det for",
          "kunder",
          "handlare",
          "dealer",
          "tradingbolag",
          "b2b",
          "marketplace",
        ],
        answer:
          "Auto-margin är byggt för oberoende handlare, tradingbolag, import/export-bolag, dealernätverk och B2B-marknadsplatser som hanterar många offers och leverantörsrelationer.",
        suggestions: ["Hur identifierar det deals?", "Hur kommer jag igång?"],
      },
      {
        id: "best-deals",
        keywords: [
          "basta deals",
          "identifiera",
          "rekommendera",
          "ranka",
          "profit",
          "marginal",
        ],
        answer:
          "Auto-margin kontrollerar varje offer mot live market context och gör det till ett tydligare nästa steg. Målet är mindre manuell review och mer tid på rätt bilar och partners.",
        suggestions: ["Kan jag lita på priserna?", "Vilka marknader stöds?"],
      },
      {
        id: "prices-trust",
        keywords: [
          "kan jag lita på auto-margin",
          "lita pa priserna",
          "korrekta priser",
          "market prices",
          "live listings",
        ],
        answer:
          "Ja, sajtens trust-berättelse är att Auto-margin kontrollerar offers mot live marketplace listings i Europa, uppdaterar data regelbundet, krypterar filer och behandlar dem i säkra miljöer. För juridiska eller avtalsmässiga garantier bör du kontakta teamet direkt.",
        suggestions: ["Vilka marknader stöds?", "Läs integritetspolicyn"],
      },
      {
        id: "getting-started",
        keywords: [
          "komma igang",
          "starta",
          "onboarding",
          "setup",
          "begar access",
        ],
        answer: `För att komma igång skickar du en förfrågan via ${pageLink(SV_NAV, "contact")}. Den aktuella vägen är kontakt, första möte, proposal scoping, access proposal och sedan launch samt optimering.`,
        suggestions: ["Hur fungerar prissättningen?", "Kontakta sales"],
      },
      {
        id: "about",
        keywords: ["om", "team", "bolag", "story", "mission"],
        answer: `Auto-margin positioneras som ett litet team byggt kring buying-arbetet bakom varje vehicle deal. Berättelsen fokuserar på att minska manuell review och förbättra partnerbeslut. Läs mer på ${pageLink(SV_NAV, "about")}.`,
        suggestions: ["Vem är Auto-margin för?", "Kontakta teamet"],
      },
      {
        id: "navigation",
        keywords: ["var", "sida", "navigera", "lank", "hitta", "ga till"],
        answer: `Användbara sidor: ${pageLink(SV_NAV, "demo")}, ${pageLink(SV_NAV, "pricing")}, ${pageLink(SV_NAV, "faq")}, ${pageLink(SV_NAV, "contact")}, ${pageLink(SV_NAV, "about")}, ${pageLink(SV_NAV, "guidebook")} och ${pageLink(SV_NAV, "privacy")}.`,
        suggestions: ["Öppna demo", "Öppna priser"],
      },
    ],
    siteContext: `
Auto-margin är en plattform för professionella fordons­handlare och bilföretag i Europa.
Den hjälper handlare att granska inkommande offers snabbare, fokusera på bättre deals och lägga mindre tid på manuell kontroll av varje bil.
Du laddar upp offers ni redan får. Auto-margin jämför dem med live listings, visar vilka bilar som skapar marginal, vilka som kan bli stående och vilka som redan är placerade.
Det bredare målet är intake control: bättre partnerbeslut, mindre tid på review och mer tid på closing.
Målgrupper: oberoende handlare, tradingbolag, import/export-bolag, dealernätverk och B2B-marknadsplatser.
Kärnfunktioner: uppladdad offer intake, live market comparison, partner visibility, marginalfokuserad review, notiser och stöd för blandade format.
Stödda inputformat: mejl, PDF, Excel, Word, Google Sheets, CSV-liknande workflows och blandade batcher.
Marknadstäckning på sajten: Tyskland, Frankrike, Polen, Italien, Schweiz, Spanien, Nederländerna, Belgien, Sverige och Tjeckien. Sajten refererar också till Sydkorea och Kina som extra kontext.
Prissättning: anpassad prissättning beroende på offervolym, målmarknader, workflow setup, accessmodell, onboarding och supportnivå.
Accessmodeller: automatic access, managed access och enterprise API access.
Demo: den publika demon visar ett exempel på en validering av ett enskilt fordon, inte hela supplier-list-workflowet.
Kontakt: to@auto-margin.com. Kontaktformulär: /contact. Tider: måndag-fredag 9:00-17:00 CET. Normalt svar inom 1 arbetsdag.
Användbara sidor: /demo, /pricing, /faq, /contact, /about, /guidebook, /privacy, /enterprise, /browser-extension.
`,
  },
  de: {
    ui: {
      welcomeMessage:
        "Hallo, ich bin Bot. Frag mich nach Auto-margin, Preisen, der Demo, Dateiformaten, Supplier-Workflow oder wie du das Team kontaktierst.",
      quickPrompts: [
        "Was macht Auto-margin?",
        "Wie funktioniert die Preisgestaltung?",
        "Kann ich eine Demo testen?",
      ],
      botLabel: "Bot",
      botSubtitle: "Auto-margin-Assistent",
      openButton: "Fragen",
      typing: "Bot schreibt...",
      inputPlaceholder: "Bot fragen...",
      aiBadge: "Assistentenantwort",
      minimizeAria: "Bot minimieren",
      closeAria: "Bot schließen und zurücksetzen",
      openAria: "Bot-Chat öffnen",
      sendAria: "Nachricht senden",
      genericFailure:
        "Ich konnte das gerade nicht beantworten. Bitte versuche es erneut oder nutze die [Kontakt-Seite](/contact).",
      temporaryUnavailable:
        "Ich bin vorübergehend nicht verfügbar. Du erreichst Auto-margin weiterhin über die [Kontakt-Seite](/contact) oder per Mail an to@auto-margin.com.",
    },
    suggestions: {
      default: [
        "Was macht Auto-margin?",
        "Wie funktioniert die Preisgestaltung?",
        "Kann ich eine Demo testen?",
      ],
      ai: ["Sales kontaktieren", "Demo testen"],
      rateLimit: [
        "Wie funktioniert die Preisgestaltung?",
        "Sales kontaktieren",
      ],
    },
    fallbacks: {
      unavailable:
        "Ich kann hier häufige Fragen zu Auto-margin beantworten, aber der KI-Assistent ist vorübergehend nicht verfügbar. Für etwas Spezifisches nutze bitte die [Kontakt-Seite](/contact) oder schreibe an to@auto-margin.com.",
      unreadableMessage:
        "Ich konnte diese Nachricht nicht lesen. Bitte versuche es erneut.",
      shortMessage:
        "Schick mir eine kurze Frage zu Auto-margin, dann helfe ich dir.",
      rateLimit:
        "Ich habe das Fragenlimit für dieses Browser/IP-Fenster erreicht. Ich kann weiterhin bei typischen Themen wie Preise, Demo, Dateien, Märkten und Kontakt helfen.",
    },
    staticAnswers: [
      {
        id: "greeting",
        keywords: ["hallo", "hi", "hey", "guten tag", "guten morgen"],
        answer:
          "Hallo, ich bin Bot. Ich kann dir helfen, Auto-margin zu verstehen, die richtige Seite zu finden, Preise zu erklären oder dich zur Demo und zum Kontaktformular zu führen.",
        suggestions: [
          "Was macht Auto-margin?",
          "Wie funktioniert die Preisgestaltung?",
        ],
      },
      {
        id: "product",
        keywords: [
          "was macht auto-margin",
          "was macht automargin",
          "was ist automargin",
          "wie funktioniert es",
          "produkt",
          "plattform",
        ],
        answer:
          "Auto-margin hilft Händlern, eingehende Offers schneller zu prüfen, bessere Deals zu priorisieren und weniger Zeit mit manueller Prüfung jedes Fahrzeugs zu verbringen. Du lädst Offers hoch, die du bereits erhältst, und Auto-margin zeigt, welche Fahrzeuge Marge schaffen, welche stehen bleiben könnten und welche bereits platziert sind.",
        suggestions: [
          "Welche Dateien werden unterstützt?",
          "Kann ich eine Demo testen?",
        ],
      },
      {
        id: "features",
        keywords: [
          "funktionen",
          "features",
          "marge",
          "partner",
          "lieferant",
          "supplier",
          "benachrichtigungen",
          "intake",
        ],
        answer: `Zu den Kernfunktionen gehören hochgeladener Offer-Intake, Vergleich mit Live-Marktdaten, Partnertransparenz, margenfokussierte Review, Benachrichtigungen und Support für gemischte Formate. Siehe ${pageLink(DE_NAV, "features")}.`,
        suggestions: [
          "Welche Märkte werden unterstützt?",
          "Welche Dateien werden unterstützt?",
        ],
      },
      {
        id: "markets",
        keywords: [
          "markte",
          "lander",
          "europa",
          "deutschland",
          "frankreich",
          "polen",
          "italien",
          "schweiz",
          "spanien",
          "niederlande",
          "belgien",
          "schweden",
          "tschechien",
          "sudkorea",
          "china",
        ],
        answer:
          "Auto-margin vergleicht Offers mit Live-Listings in Deutschland, Frankreich, Polen, Italien, der Schweiz, Spanien, den Niederlanden, Belgien, Schweden und Tschechien. Die Produktstory verweist zusätzlich auf Südkorea und China als erweiterten Marktkontext.",
        suggestions: ["Kann ich den Preisen vertrauen?", "Wie lege ich los?"],
      },
      {
        id: "pricing",
        keywords: [
          "wie funktioniert die preisgestaltung",
          "preis",
          "preise",
          "kosten",
          "plan",
          "angebot",
          "proposal",
        ],
        answer: `Auto-margin arbeitet mit individueller Preisgestaltung. Das Angebot hängt von Offer-Volumen, Zielmärkten, Workflow-Setup, Access-Modell, Onboarding und Supportniveau ab. Siehe ${pageLink(DE_NAV, "pricing")} oder kontaktiere das Team über ${pageLink(DE_NAV, "contact")}.`,
        suggestions: ["Welche Access-Modelle gibt es?", "Sales kontaktieren"],
      },
      {
        id: "engagement",
        keywords: [
          "automatic access",
          "managed access",
          "api access",
          "enterprise api",
          "access modell",
        ],
        answer:
          "Die aktuellen Access-Modelle sind automatic access, managed access und enterprise API access. Automatic access lässt Auto-margin den Intake für dich verarbeiten, managed access lässt dein Team direkt in der Plattform arbeiten und API access ermöglicht euch einen eigenen Workflow auf der Analyseebene.",
        suggestions: [
          "Wie funktioniert Onboarding?",
          "Wie kontaktiere ich Sales?",
        ],
      },
      {
        id: "demo",
        keywords: [
          "kann ich eine demo testen",
          "demo",
          "testen",
          "probe",
          "trial",
        ],
        answer: `Du kannst Auto-margin auf der ${pageLink(DE_NAV, "demo")} testen. Die öffentliche Demo zeigt eine einzelne Fahrzeugvalidierung, aber nicht den kompletten Supplier-List-Workflow.`,
        suggestions: [
          "Welche Dateien werden unterstützt?",
          "Zur Kontakt-Seite",
        ],
      },
      {
        id: "files",
        keywords: [
          "datei",
          "dateien",
          "pdf",
          "excel",
          "csv",
          "word",
          "google sheets",
          "email",
          "mail",
          "upload",
        ],
        answer:
          "Auto-margin unterstützt Offers aus E-Mail, PDF, Excel, Word, Google Sheets, CSV-artigen Workflows und gemischten Batches. Das Ziel ist, mit den Dateien zu arbeiten, die Händler ohnehin schon erhalten.",
        suggestions: ["Wie funktioniert Onboarding?", "Demo testen"],
      },
      {
        id: "security",
        keywords: [
          "sicherheit",
          "daten",
          "privacy",
          "datenschutz",
          "verschlusselt",
          "gdpr",
        ],
        answer: `Die Seite sagt, dass Dateien verschlüsselt, in sicheren Umgebungen verarbeitet und nicht mit Dritten geteilt werden. Du kannst auch die ${pageLink(DE_NAV, "privacy")} lesen.`,
        suggestions: ["Team kontaktieren", "Datenschutz lesen"],
      },
      {
        id: "money-back",
        keywords: [
          "geld zuruck garantie",
          "geld zuruck",
          "ruckerstattung",
          "refund",
          "garantie",
        ],
        answer: `Auf der Website wird keine öffentliche Geld-zurück-Garantie oder Rückerstattungsregel genannt. Wenn du Vertrags-, Kündigungs- oder Erstattungsbedingungen brauchst, frage das Team am besten über die ${pageLink(DE_NAV, "contact")}.`,
        suggestions: [
          "Wie funktioniert die Preisgestaltung?",
          "Sales kontaktieren",
        ],
      },
      {
        id: "browser-extension",
        keywords: [
          "browser extension",
          "browser erweiterung",
          "erweiterung",
          "ist die browser erweiterung kostenlos",
          "kostenlose erweiterung",
        ],
        answer: `Auto-margin hat eine ${pageLink(DE_NAV, "browserExtension")}, aber die Website nennt keinen separaten öffentlichen Gratispreis dafür. Die Seite ist auf Zugang ausgerichtet, daher nutze die ${pageLink(DE_NAV, "contact")}, wenn du Zugang oder Preisinformationen zur Erweiterung möchtest.`,
        suggestions: [
          "Wie funktioniert die Preisgestaltung?",
          "Browser-Extension-Seite öffnen",
        ],
      },
      {
        id: "registration",
        keywords: [
          "registrieren",
          "registrierung",
          "konto erstellen",
          "sign up",
          "account erstellen",
          "wie kann ich mich registrieren",
        ],
        answer: `Es gibt keinen öffentlichen Self-Serve-Registrierungsfluss auf der Website. Der aktuelle Weg ist, Auto-margin über die ${pageLink(DE_NAV, "contact")} zu kontaktieren, damit das Team euren Intake-Workflow, das Volumen und das Setup verstehen kann, bevor Zugang eingerichtet wird.`,
        suggestions: ["Wie lege ich los?", "Sales kontaktieren"],
      },
      {
        id: "personal-data",
        keywords: [
          "personenbezogene daten",
          "wie werden meine daten gespeichert",
          "speichert ihr meine daten",
          "datenspeicherung",
          "meine daten loschen",
          "private daten",
        ],
        answer: `Die Datenschutzerklärung sagt, dass personenbezogene Daten zur Bereitstellung und Verbesserung des Dienstes genutzt, nur so lange wie nötig gespeichert und mit verschlüsselten Backups sowie sicheren Umgebungen geschützt werden. Sie sagt auch, dass du Zugang, Berichtigung oder Löschung anfragen kannst. Siehe die ${pageLink(DE_NAV, "privacy")}.`,
        suggestions: ["Sind meine Daten sicher?", "Datenschutz lesen"],
      },
      {
        id: "installation",
        keywords: [
          "muss ich etwas installieren",
          "installieren",
          "installation",
          "software herunterladen",
          "lokale installation",
        ],
        answer: `Die öffentliche Website ist eher als Web-Plattform, Browser-Erweiterung und geführter Zugang aufgebaut als als Self-Serve-Lokalinstallation. Wenn du den genauen Setup-Weg für dein Team brauchst, nutze die ${pageLink(DE_NAV, "contact")}.`,
        suggestions: ["Wie lege ich los?", "Browser-Extension-Seite öffnen"],
      },
      {
        id: "startup-speed",
        keywords: [
          "wie schnell konnen wir starten",
          "wie schnell kann man loslegen",
          "wie lange dauert das setup",
          "schnelles onboarding",
          "am selben tag",
        ],
        answer: `Die Website sagt, der Weg ist Kontakt, erstes Meeting, Proposal-Scoping, Access-Proposal und danach Launch plus Optimierung. Außerdem steht dort, dass die meisten Nutzer noch am selben Tag starten, sobald das Setup klar ist.`,
        suggestions: ["Wie lege ich los?", "Sales kontaktieren"],
      },
      {
        id: "multi-user",
        keywords: [
          "konnen mehrere personen es nutzen",
          "mehrere nutzer",
          "team zugang",
          "seats",
          "multi user",
        ],
        answer: `Ja. Die Preistabelle zeigt Pläne mit unterschiedlichen Seat-Stufen, von einem einzelnen Sitz bis zu größeren Team-Setups. Wenn ihr eine konkrete Teamstruktur braucht, schaut auf die ${pageLink(DE_NAV, "pricing")} oder die ${pageLink(DE_NAV, "contact")}.`,
        suggestions: ["Wie funktioniert die Preisgestaltung?", "Preise öffnen"],
      },
      {
        id: "best-file-format",
        keywords: [
          "welche dateiformate sind am besten",
          "bestes format",
          "bestes dateiformat",
          "welches format soll ich verwenden",
          "bevorzugtes dateiformat",
        ],
        answer: `Auto-margin ist dafür ausgelegt, mit den Dateien zu arbeiten, die Händler ohnehin schon erhalten, darunter E-Mail, PDF, Excel, Word, Google Sheets, CSV-artige Workflows und gemischte Batches. Die Website nennt kein einzelnes Pflichtformat.`,
        suggestions: [
          "Welche Dateien werden unterstützt?",
          "Kann ich Offers aus E-Mail hochladen?",
        ],
      },
      {
        id: "api-integrations",
        keywords: [
          "unterstutzt ihr api integrationen",
          "api integration",
          "integrationen",
          "api",
          "enterprise api access",
        ],
        answer: `Ja, die aktuellen Access-Modelle enthalten enterprise API access, und die Preistabelle erwähnt auch Integrationen. Die Website veröffentlicht in diesem Chatbot-Kontext keine detaillierten API-Bedingungen, daher nutze die ${pageLink(DE_NAV, "contact")} oder das ${pageLink(DE_NAV, "guidebook")} als nächsten Schritt.`,
        suggestions: ["Welche Access-Modelle gibt es?", "Guidebook öffnen"],
      },
      {
        id: "email-upload",
        keywords: [
          "kann ich offers aus e-mail hochladen",
          "upload aus e-mail",
          "email offers",
          "email import",
          "mail import",
        ],
        answer: `Ja. Die Website sagt ausdrücklich, dass Auto-margin Offers aus E-Mail unterstützt, zusammen mit PDF, Excel, Word, Google Sheets, CSV-artigen Workflows und gemischten Batches.`,
        suggestions: [
          "Welche Dateien werden unterstützt?",
          "Wie funktioniert Onboarding?",
        ],
      },
      {
        id: "contact",
        keywords: ["kontakt", "email", "mail", "sales", "support", "sprechen"],
        answer: `Du erreichst Auto-margin unter to@auto-margin.com oder über das Formular auf der ${pageLink(DE_NAV, "contact")}. Laut Website antwortet das Team normalerweise innerhalb eines Werktags, Montag-Freitag 9:00-17:00 CET.`,
        suggestions: [
          "Wie funktioniert die Preisgestaltung?",
          "Wie lege ich los?",
        ],
      },
      {
        id: "audience",
        keywords: [
          "fur wen",
          "kunden",
          "handler",
          "dealer",
          "tradingunternehmen",
          "b2b",
          "marktplatz",
        ],
        answer:
          "Auto-margin ist für unabhängige Händler, Trading-Unternehmen, Import/Export-Betriebe, Dealer-Netzwerke und B2B-Marktplätze gedacht, die viele Offers und Supplier-Beziehungen steuern.",
        suggestions: ["Wie identifiziert es Deals?", "Wie lege ich los?"],
      },
      {
        id: "best-deals",
        keywords: [
          "beste deals",
          "identifizieren",
          "empfehlen",
          "ranken",
          "profit",
          "marge",
        ],
        answer:
          "Auto-margin prüft jedes Offer gegen Live-Marktkontext und macht daraus einen klareren nächsten Schritt. Ziel ist weniger manuelle Review und mehr Zeit für die richtigen Fahrzeuge und Partner.",
        suggestions: [
          "Kann ich den Preisen vertrauen?",
          "Welche Märkte werden unterstützt?",
        ],
      },
      {
        id: "prices-trust",
        keywords: [
          "kann ich auto-margin vertrauen",
          "preisen vertrauen",
          "genaue preise",
          "market prices",
          "live listings",
        ],
        answer:
          "Ja, die Vertrauensbasis auf der Website ist: Auto-margin prüft Offers gegen Live-Marketplace-Listings in Europa, aktualisiert Daten regelmäßig, verschlüsselt Dateien und verarbeitet sie in sicheren Umgebungen. Für rechtliche oder vertragliche Zusicherungen solltest du das Team direkt kontaktieren.",
        suggestions: ["Welche Märkte werden unterstützt?", "Datenschutz lesen"],
      },
      {
        id: "getting-started",
        keywords: [
          "loslegen",
          "starten",
          "onboarding",
          "setup",
          "zugang anfragen",
        ],
        answer: `Um zu starten, sende eine Anfrage über die ${pageLink(DE_NAV, "contact")}. Der aktuelle Weg ist Kontakt, erstes Meeting, Proposal-Scoping, Access-Proposal und danach Launch plus Optimierung.`,
        suggestions: [
          "Wie funktioniert die Preisgestaltung?",
          "Sales kontaktieren",
        ],
      },
      {
        id: "about",
        keywords: ["uber", "team", "unternehmen", "story", "mission"],
        answer: `Auto-margin wird als schlankes Team positioniert, das aus der Buying-Arbeit hinter jedem Fahrzeugdeal entstanden ist. Die Story fokussiert weniger manuelle Review und bessere Partnerentscheidungen. Mehr dazu auf der ${pageLink(DE_NAV, "about")}.`,
        suggestions: ["Für wen ist Auto-margin?", "Team kontaktieren"],
      },
      {
        id: "navigation",
        keywords: ["wo", "seite", "navigieren", "link", "finden", "gehe zu"],
        answer: `Nützliche Seiten: ${pageLink(DE_NAV, "demo")}, ${pageLink(DE_NAV, "pricing")}, ${pageLink(DE_NAV, "faq")}, ${pageLink(DE_NAV, "contact")}, ${pageLink(DE_NAV, "about")}, ${pageLink(DE_NAV, "guidebook")} und ${pageLink(DE_NAV, "privacy")}.`,
        suggestions: ["Demo öffnen", "Preise öffnen"],
      },
    ],
    siteContext: `
Auto-margin ist eine Plattform für professionelle Fahrzeughändler und Autohäuser in Europa.
Sie hilft Händlern, eingehende Offers schneller zu prüfen, bessere Deals zu priorisieren und weniger Zeit mit manueller Prüfung jedes Fahrzeugs zu verbringen.
Du lädst Offers hoch, die du bereits erhältst. Auto-margin vergleicht sie mit Live-Listings und zeigt, welche Fahrzeuge Marge schaffen, welche stehen bleiben könnten und welche bereits platziert sind.
Das übergeordnete Ziel ist Intake Control: bessere Partnerentscheidungen, weniger Zeit für Review und mehr Zeit für Closing.
Zielgruppen: unabhängige Händler, Trading-Unternehmen, Import/Export-Betriebe, Dealer-Netzwerke und B2B-Marktplätze.
Kernfunktionen: hochgeladener Offer-Intake, Live-Marktvergleich, Partnertransparenz, margenfokussierte Review, Benachrichtigungen und Unterstützung für gemischte Formate.
Unterstützte Eingaben: E-Mail, PDF, Excel, Word, Google Sheets, CSV-artige Workflows und gemischte Batches.
Marktabdeckung auf der Website: Deutschland, Frankreich, Polen, Italien, Schweiz, Spanien, Niederlande, Belgien, Schweden und Tschechien. Zusätzlich werden Südkorea und China als weiterer Kontext erwähnt.
Preisgestaltung: individuelle Preisgestaltung abhängig von Offer-Volumen, Zielmärkten, Workflow-Setup, Access-Modell, Onboarding und Supportniveau.
Access-Modelle: automatic access, managed access und enterprise API access.
Demo: die öffentliche Demo zeigt eine Beispiel-Validierung für ein einzelnes Fahrzeug, nicht den kompletten Supplier-List-Workflow.
Kontakt: to@auto-margin.com. Kontaktformular: /contact. Zeiten: Montag-Freitag 9:00-17:00 CET. Typische Antwortzeit: innerhalb eines Werktags.
Nützliche Seiten: /demo, /pricing, /faq, /contact, /about, /guidebook, /privacy, /enterprise, /browser-extension.
`,
  },
  es: {
    ui: {
      welcomeMessage:
        "Hola, soy Bot. Pregúntame sobre Auto-margin, precios, la demo, formatos de archivo, supplier workflow o cómo contactar con el equipo.",
      quickPrompts: [
        "¿Qué hace Auto-margin?",
        "¿Cómo funciona el pricing?",
        "¿Puedo probar una demo?",
      ],
      botLabel: "Bot",
      botSubtitle: "Asistente de Auto-margin",
      openButton: "Preguntar",
      typing: "Bot está escribiendo...",
      inputPlaceholder: "Pregunta a Bot...",
      aiBadge: "Respuesta del asistente",
      minimizeAria: "Minimizar Bot",
      closeAria: "Cerrar y reiniciar Bot",
      openAria: "Abrir el chat de Bot",
      sendAria: "Enviar mensaje",
      genericFailure:
        "No pude responder a eso ahora mismo. Inténtalo otra vez o usa la [Página de contacto](/contact).",
      temporaryUnavailable:
        "Estoy temporalmente no disponible. Aun así puedes contactar con Auto-margin en la [Página de contacto](/contact) o en to@auto-margin.com.",
    },
    suggestions: {
      default: [
        "¿Qué hace Auto-margin?",
        "¿Cómo funciona el pricing?",
        "¿Puedo probar una demo?",
      ],
      ai: ["Contactar sales", "Probar la demo"],
      rateLimit: ["¿Cómo funciona el pricing?", "Contactar sales"],
    },
    fallbacks: {
      unavailable:
        "Puedo responder aquí preguntas comunes sobre Auto-margin, pero el asistente de IA está temporalmente no disponible. Para algo más específico, usa la [Página de contacto](/contact) o escribe a to@auto-margin.com.",
      unreadableMessage: "No pude leer ese mensaje. Inténtalo de nuevo.",
      shortMessage:
        "Envíame una pregunta corta sobre Auto-margin y te ayudaré.",
      rateLimit:
        "He alcanzado el límite de preguntas para esta ventana de navegador/IP. Aun así puedo ayudar con temas comunes como precios, demo, archivos, mercados y contacto.",
    },
    staticAnswers: [
      {
        id: "greeting",
        keywords: ["hola", "buenas", "buenos dias", "hey"],
        answer:
          "Hola, soy Bot. Puedo ayudarte a entender Auto-margin, encontrar la página correcta, explicar precios o llevarte a la demo y al formulario de contacto.",
        suggestions: ["¿Qué hace Auto-margin?", "¿Cómo funciona el pricing?"],
      },
      {
        id: "product",
        keywords: [
          "qué hace auto-margin",
          "que hace automargin",
          "que es automargin",
          "como funciona",
          "producto",
          "plataforma",
        ],
        answer:
          "Auto-margin ayuda a los dealers a revisar offers entrantes más rápido, centrarse en mejores deals y dedicar menos tiempo a revisar cada coche manualmente. Subes los offers que ya recibes y Auto-margin muestra qué coches crean margen, cuáles pueden quedarse parados y cuáles ya están colocados.",
        suggestions: ["¿Qué archivos soporta?", "¿Puedo probar una demo?"],
      },
      {
        id: "features",
        keywords: [
          "funciones",
          "features",
          "margen",
          "partner",
          "supplier",
          "proveedor",
          "notificaciones",
          "intake",
        ],
        answer: `Las funciones principales incluyen offer intake por subida, comparación con live market data, visibilidad de partners, review centrada en margen, notificaciones y soporte para formatos mixtos. Mira la ${pageLink(ES_NAV, "features")}.`,
        suggestions: ["¿Qué mercados soporta?", "¿Qué archivos soporta?"],
      },
      {
        id: "markets",
        keywords: [
          "mercados",
          "paises",
          "europa",
          "alemania",
          "francia",
          "polonia",
          "italia",
          "suiza",
          "espana",
          "paises bajos",
          "belgica",
          "suecia",
          "chequia",
          "corea",
          "china",
        ],
        answer:
          "Auto-margin compara offers con live listings en Alemania, Francia, Polonia, Italia, Suiza, España, Países Bajos, Bélgica, Suecia y Chequia. La narrativa del producto también menciona Corea del Sur y China como contexto adicional de mercado.",
        suggestions: ["¿Puedo confiar en los precios?", "¿Cómo empiezo?"],
      },
      {
        id: "pricing",
        keywords: [
          "cómo funciona el pricing",
          "precio",
          "precios",
          "coste",
          "plan",
          "oferta",
          "proposal",
        ],
        answer: `Auto-margin usa pricing personalizado. La propuesta depende del volumen de offers, mercados objetivo, workflow setup, modelo de acceso, onboarding y nivel de soporte. Mira la ${pageLink(ES_NAV, "pricing")} o contacta al equipo en la ${pageLink(ES_NAV, "contact")}.`,
        suggestions: ["¿Qué modelos de acceso hay?", "Contactar sales"],
      },
      {
        id: "engagement",
        keywords: [
          "automatic access",
          "managed access",
          "api access",
          "enterprise api",
          "modelo de acceso",
        ],
        answer:
          "Los modelos de acceso actuales son automatic access, managed access y enterprise API access. Automatic access deja que Auto-margin procese el intake por ti, managed access permite que tu equipo trabaje dentro de la plataforma y API access permite construir vuestro propio workflow sobre la capa de análisis.",
        suggestions: [
          "¿Cómo funciona el onboarding?",
          "¿Cómo contacto con sales?",
        ],
      },
      {
        id: "demo",
        keywords: ["puedo probar una demo", "demo", "probar", "test", "trial"],
        answer: `Puedes probar Auto-margin en la ${pageLink(ES_NAV, "demo")}. La demo pública muestra cómo puede funcionar una validación de un solo vehículo, pero no el workflow completo de supplier lists.`,
        suggestions: ["¿Qué archivos soporta?", "Ir a contacto"],
      },
      {
        id: "files",
        keywords: [
          "archivo",
          "archivos",
          "pdf",
          "excel",
          "csv",
          "word",
          "google sheets",
          "email",
          "correo",
          "subir",
        ],
        answer:
          "Auto-margin soporta offers desde email, PDF, Excel, Word, Google Sheets, workflows tipo CSV y lotes mixtos. La idea es trabajar con los archivos que los dealers ya reciben.",
        suggestions: ["¿Cómo funciona el onboarding?", "Probar la demo"],
      },
      {
        id: "security",
        keywords: [
          "seguridad",
          "datos",
          "privacidad",
          "privacy",
          "cifrado",
          "gdpr",
        ],
        answer: `La web indica que los archivos se cifran, se procesan en entornos seguros y no se comparten con terceros. También puedes revisar la ${pageLink(ES_NAV, "privacy")}.`,
        suggestions: ["Contactar con el equipo", "Leer privacidad"],
      },
      {
        id: "money-back",
        keywords: [
          "garantia de devolucion",
          "devolucion",
          "refund",
          "garantia",
          "money back guarantee",
        ],
        answer: `La web no publica una garantía de devolución ni una política de reembolso. Si necesitas condiciones de contrato, cancelación o reembolso, lo más seguro es preguntarlo al equipo a través de la ${pageLink(ES_NAV, "contact")}.`,
        suggestions: ["¿Cómo funciona el pricing?", "Contactar sales"],
      },
      {
        id: "browser-extension",
        keywords: [
          "browser extension",
          "extension del navegador",
          "extension",
          "es gratis la extension",
          "es gratis la browser extension",
        ],
        answer: `Auto-margin tiene una ${pageLink(ES_NAV, "browserExtension")}, pero la web no publica un precio gratis separado para ella. La página está planteada alrededor del acceso, así que usa la ${pageLink(ES_NAV, "contact")} si quieres acceso o detalles de pricing de la extensión.`,
        suggestions: [
          "¿Cómo funciona el pricing?",
          "Abrir la página de la extensión",
        ],
      },
      {
        id: "registration",
        keywords: [
          "registrarme",
          "registrar",
          "registro",
          "crear cuenta",
          "sign up",
          "como puedo registrarme",
        ],
        answer: `No hay un flujo público de registro self-serve en la web. La vía actual es contactar con Auto-margin a través de la ${pageLink(ES_NAV, "contact")} para que el equipo entienda vuestro intake workflow, volumen y setup antes de dar acceso.`,
        suggestions: ["¿Cómo empiezo?", "Contactar sales"],
      },
      {
        id: "personal-data",
        keywords: [
          "datos personales",
          "como se guardan mis datos",
          "guardais mis datos",
          "retencion de datos",
          "borrar mis datos",
          "datos privados",
        ],
        answer: `La política de privacidad dice que los datos personales se usan para prestar y mejorar el servicio, se guardan solo el tiempo necesario para esos fines y se protegen con backups cifrados y entornos seguros. También dice que puedes solicitar acceso, corrección o eliminación. Mira la ${pageLink(ES_NAV, "privacy")}.`,
        suggestions: [
          "¿Mis datos están seguros?",
          "Leer la política de privacidad",
        ],
      },
      {
        id: "installation",
        keywords: [
          "tengo que instalar algo",
          "instalar",
          "instalacion",
          "descargar software",
          "instalacion local",
        ],
        answer: `La web pública está planteada como plataforma web, extensión de navegador y acceso guiado, más que como una instalación local self-serve. Si necesitas el camino exacto de setup para tu equipo, usa la ${pageLink(ES_NAV, "contact")}.`,
        suggestions: ["¿Cómo empiezo?", "Abrir la página de la extensión"],
      },
      {
        id: "startup-speed",
        keywords: [
          "que tan rapido podemos empezar",
          "cuan rapido podemos empezar",
          "cuanto tarda el setup",
          "onboarding rapido",
          "el mismo dia",
        ],
        answer: `La web dice que el camino es contacto, primera reunión, definición del proposal, access proposal y después launch más optimización. También indica que la mayoría de usuarios empieza el mismo día cuando el setup ya está claro.`,
        suggestions: ["¿Cómo empiezo?", "Contactar sales"],
      },
      {
        id: "multi-user",
        keywords: [
          "pueden usarlo varias personas",
          "multiples usuarios",
          "acceso de equipo",
          "seats",
          "multi user",
        ],
        answer: `Sí. La tabla de pricing muestra planes con distintos niveles de seats, desde un solo usuario hasta configuraciones de equipo más amplias. Si necesitáis una estructura concreta de equipo, mirad la ${pageLink(ES_NAV, "pricing")} o la ${pageLink(ES_NAV, "contact")}.`,
        suggestions: ["¿Cómo funciona el pricing?", "Abrir precios"],
      },
      {
        id: "best-file-format",
        keywords: [
          "que formatos de archivo son mejores",
          "mejor formato",
          "mejor formato de archivo",
          "que formato deberia usar",
          "formato preferido",
        ],
        answer: `Auto-margin está pensado para trabajar con los archivos que los dealers ya reciben, incluyendo email, PDF, Excel, Word, Google Sheets, workflows tipo CSV y lotes mixtos. La web no marca un único formato obligatorio.`,
        suggestions: [
          "¿Qué archivos soporta?",
          "¿Puedo subir offers desde email?",
        ],
      },
      {
        id: "api-integrations",
        keywords: [
          "soportais integraciones api",
          "integracion api",
          "integraciones",
          "api",
          "enterprise api access",
        ],
        answer: `Sí, los modelos de acceso actuales incluyen enterprise API access, y la tabla de pricing también menciona integraciones. La web no publica términos detallados de API en este contexto del chatbot, así que usa la ${pageLink(ES_NAV, "contact")} o la ${pageLink(ES_NAV, "guidebook")} como siguiente paso.`,
        suggestions: ["¿Qué modelos de acceso hay?", "Abrir guidebook"],
      },
      {
        id: "email-upload",
        keywords: [
          "puedo subir offers desde email",
          "subir desde email",
          "email offers",
          "email import",
          "importar correo",
        ],
        answer: `Sí. La web dice de forma explícita que Auto-margin soporta offers desde email, junto con PDF, Excel, Word, Google Sheets, workflows tipo CSV y lotes mixtos.`,
        suggestions: [
          "¿Qué archivos soporta?",
          "¿Cómo funciona el onboarding?",
        ],
      },
      {
        id: "contact",
        keywords: ["contacto", "email", "correo", "sales", "support", "hablar"],
        answer: `Puedes contactar con Auto-margin en to@auto-margin.com o usar el formulario de la ${pageLink(ES_NAV, "contact")}. La web dice que el equipo suele responder en 1 día laborable, de lunes a viernes de 9:00 a 17:00 CET.`,
        suggestions: ["¿Cómo funciona el pricing?", "¿Cómo empiezo?"],
      },
      {
        id: "audience",
        keywords: [
          "para quien es",
          "clientes",
          "dealers",
          "dealer",
          "trading",
          "b2b",
          "marketplace",
        ],
        answer:
          "Auto-margin está pensado para dealers independientes, empresas de trading, negocios de import/export, redes de dealers y marketplaces B2B que gestionan muchos offers y relaciones con suppliers.",
        suggestions: ["¿Cómo identifica los deals?", "¿Cómo empiezo?"],
      },
      {
        id: "best-deals",
        keywords: [
          "mejores deals",
          "identifica",
          "recomienda",
          "rankea",
          "beneficio",
          "margen",
        ],
        answer:
          "Auto-margin revisa cada offer contra live market context y lo convierte en un siguiente paso más claro. El objetivo es menos review manual y más tiempo actuando sobre los coches y partners correctos.",
        suggestions: [
          "¿Puedo confiar en los precios?",
          "¿Qué mercados soporta?",
        ],
      },
      {
        id: "prices-trust",
        keywords: [
          "puedo confiar en auto-margin",
          "confiar en los precios",
          "precios exactos",
          "market prices",
          "live listings",
        ],
        answer:
          "Sí, la base de confianza que muestra la web es que Auto-margin contrasta offers con live marketplace listings de Europa, actualiza los datos con regularidad, cifra los archivos y los procesa en entornos seguros. Para garantías legales o contractuales, lo correcto es hablar directamente con el equipo.",
        suggestions: [
          "¿Qué mercados soporta?",
          "Leer la política de privacidad",
        ],
      },
      {
        id: "getting-started",
        keywords: [
          "empezar",
          "arrancar",
          "onboarding",
          "setup",
          "solicitar acceso",
        ],
        answer: `Para empezar, envía una solicitud a través de la ${pageLink(ES_NAV, "contact")}. El camino actual es contacto, primera reunión, definición del proposal, access proposal y después launch más optimización.`,
        suggestions: ["¿Cómo funciona el pricing?", "Contactar sales"],
      },
      {
        id: "about",
        keywords: ["sobre", "equipo", "empresa", "historia", "mision"],
        answer: `Auto-margin se presenta como un equipo pequeño construido alrededor del trabajo de buying detrás de cada vehicle deal. La historia se centra en reducir review manual y mejorar decisiones sobre partners. Lee más en la ${pageLink(ES_NAV, "about")}.`,
        suggestions: ["¿Para quién es Auto-margin?", "Contactar con el equipo"],
      },
      {
        id: "navigation",
        keywords: ["donde", "pagina", "navegar", "link", "encontrar", "ir a"],
        answer: `Páginas útiles: ${pageLink(ES_NAV, "demo")}, ${pageLink(ES_NAV, "pricing")}, ${pageLink(ES_NAV, "faq")}, ${pageLink(ES_NAV, "contact")}, ${pageLink(ES_NAV, "about")}, ${pageLink(ES_NAV, "guidebook")} y ${pageLink(ES_NAV, "privacy")}.`,
        suggestions: ["Abrir demo", "Abrir precios"],
      },
    ],
    siteContext: `
Auto-margin es una plataforma para traders profesionales de vehículos y concesionarios en Europa.
Ayuda a los dealers a revisar offers entrantes más rápido, centrarse en mejores deals y dedicar menos tiempo a revisar cada coche manualmente.
Subes offers que ya recibes. Auto-margin los compara con live listings y muestra qué coches crean margen, cuáles pueden quedarse parados y cuáles ya están colocados.
El objetivo general es intake control: mejores decisiones sobre partners, menos tiempo en review y más tiempo cerrando deals.
Clientes objetivo: dealers independientes, empresas de trading, negocios de import/export, redes de dealers y marketplaces B2B.
Funciones principales: offer intake por subida, comparación con live market data, visibilidad de partners, review centrada en margen, notificaciones y soporte para formatos mixtos.
Inputs soportados: email, PDF, Excel, Word, Google Sheets, workflows tipo CSV y lotes mixtos.
Cobertura de mercado del sitio: Alemania, Francia, Polonia, Italia, Suiza, España, Países Bajos, Bélgica, Suecia y Chequia. El sitio también menciona Corea del Sur y China como contexto adicional.
Pricing: pricing personalizado según volumen de offers, mercados objetivo, workflow setup, modelo de acceso, onboarding y nivel de soporte.
Modelos de acceso: automatic access, managed access y enterprise API access.
Demo: la demo pública muestra un ejemplo de validación de un solo vehículo, no el workflow completo de supplier lists.
Contacto: to@auto-margin.com. Formulario de contacto: /contact. Horario: lunes-viernes 9:00-17:00 CET. Respuesta habitual: dentro de 1 día laborable.
Páginas útiles: /demo, /pricing, /faq, /contact, /about, /guidebook, /privacy, /enterprise, /browser-extension.
`,
  },
  dk: {
    ui: {
      welcomeMessage:
        "Hej, jeg er Bot. Spørg mig om Auto-margin, priser, demoen, filformater, supplier workflow eller hvordan du kontakter teamet.",
      quickPrompts: [
        "Hvad gør Auto-margin?",
        "Hvordan fungerer prissætningen?",
        "Kan jeg prøve en demo?",
      ],
      botLabel: "Bot",
      botSubtitle: "Auto-margin-assistent",
      openButton: "Spørg",
      typing: "Bot skriver...",
      inputPlaceholder: "Spørg Bot...",
      aiBadge: "Assistent-svar",
      minimizeAria: "Minimér Bot",
      closeAria: "Luk og nulstil Bot",
      openAria: "Åbn Bot-chatten",
      sendAria: "Send besked",
      genericFailure:
        "Jeg kunne ikke svare på det lige nu. Prøv igen eller brug [Kontaktsiden](/contact).",
      temporaryUnavailable:
        "Jeg er midlertidigt utilgængelig. Du kan stadig kontakte Auto-margin via [Kontaktsiden](/contact) eller på to@auto-margin.com.",
    },
    suggestions: {
      default: [
        "Hvad gør Auto-margin?",
        "Hvordan fungerer prissætningen?",
        "Kan jeg prøve en demo?",
      ],
      ai: ["Kontakt sales", "Prøv demoen"],
      rateLimit: ["Hvordan fungerer prissætningen?", "Kontakt sales"],
    },
    fallbacks: {
      unavailable:
        "Jeg kan svare på almindelige spørgsmål om Auto-margin her, men AI-assistenten er midlertidigt utilgængelig. For noget mere specifikt, brug [Kontaktsiden](/contact) eller skriv til to@auto-margin.com.",
      unreadableMessage: "Jeg kunne ikke læse den besked. Prøv igen.",
      shortMessage:
        "Send mig et kort spørgsmål om Auto-margin, så hjælper jeg dig.",
      rateLimit:
        "Jeg har nået spørgsmålsgrænsen for dette browser/IP-vindue. Jeg kan stadig hjælpe med almindelige emner som priser, demo, filer, markeder og kontakt.",
    },
    staticAnswers: [
      {
        id: "greeting",
        keywords: ["hej", "goddag", "hey", "god morgen"],
        answer:
          "Hej, jeg er Bot. Jeg kan hjælpe dig med at forstå Auto-margin, finde den rigtige side, forklare priser eller pege dig mod demoen og kontaktformularen.",
        suggestions: [
          "Hvad gør Auto-margin?",
          "Hvordan fungerer prissætningen?",
        ],
      },
      {
        id: "product",
        keywords: [
          "hvad gør auto-margin",
          "hvad gor automargin",
          "hvad er automargin",
          "hvordan virker det",
          "produkt",
          "platform",
        ],
        answer:
          "Auto-margin hjælper forhandlere med at reviewe indgående offers hurtigere, fokusere på bedre deals og bruge mindre tid på manuel kontrol af hver bil. Du uploader de offers, du allerede får, og Auto-margin viser hvilke biler der skaber margin, hvilke der kan stå stille, og hvilke der allerede er placeret.",
        suggestions: ["Hvilke filer understøttes?", "Kan jeg prøve en demo?"],
      },
      {
        id: "features",
        keywords: [
          "funktioner",
          "features",
          "margin",
          "partner",
          "leverandor",
          "supplier",
          "notifikationer",
          "intake",
        ],
        answer: `Kernefunktionerne er uploadet offer intake, sammenligning med live market data, partner visibility, marginfokuseret review, notifikationer og support for blandede formater. Se ${pageLink(DK_NAV, "features")}.`,
        suggestions: [
          "Hvilke markeder understøttes?",
          "Hvilke filer understøttes?",
        ],
      },
      {
        id: "markets",
        keywords: [
          "markeder",
          "lande",
          "europa",
          "tyskland",
          "frankrig",
          "polen",
          "italien",
          "schweiz",
          "spanien",
          "holland",
          "belgien",
          "sverige",
          "tjekkiet",
          "sydkorea",
          "kina",
        ],
        answer:
          "Auto-margin sammenligner offers med live listings i Tyskland, Frankrig, Polen, Italien, Schweiz, Spanien, Holland, Belgien, Sverige og Tjekkiet. Produktfortællingen nævner også Sydkorea og Kina som ekstra markedskontekst.",
        suggestions: [
          "Kan jeg stole på priserne?",
          "Hvordan kommer jeg i gang?",
        ],
      },
      {
        id: "pricing",
        keywords: [
          "hvordan fungerer prissætningen",
          "pris",
          "priser",
          "omkostning",
          "plan",
          "tilbud",
          "proposal",
        ],
        answer: `Auto-margin bruger skræddersyet prissætning. Forslaget afhænger af offer-volumen, målmarkeder, workflow setup, access-model, onboarding og supportniveau. Se ${pageLink(DK_NAV, "pricing")} eller kontakt teamet via ${pageLink(DK_NAV, "contact")}.`,
        suggestions: ["Hvilke access-modeller findes?", "Kontakt sales"],
      },
      {
        id: "engagement",
        keywords: [
          "automatic access",
          "managed access",
          "api access",
          "enterprise api",
          "access model",
        ],
        answer:
          "De nuværende access-modeller er automatic access, managed access og enterprise API access. Automatic access lader Auto-margin processere intake for dig, managed access lader teamet arbejde direkte i platformen, og API access lader jer bygge jeres eget workflow oven på analyselaget.",
        suggestions: [
          "Hvordan fungerer onboarding?",
          "Hvordan kontakter jeg sales?",
        ],
      },
      {
        id: "demo",
        keywords: ["kan jeg prøve en demo", "demo", "prove", "prøve", "test"],
        answer: `Du kan prøve Auto-margin på ${pageLink(DK_NAV, "demo")}. Den offentlige demo viser, hvordan en validering af et enkelt køretøj kan fungere, men ikke hele supplier-list-workflowet.`,
        suggestions: ["Hvilke filer understøttes?", "Gå til kontakt"],
      },
      {
        id: "files",
        keywords: [
          "fil",
          "filer",
          "pdf",
          "excel",
          "csv",
          "word",
          "google sheets",
          "email",
          "mail",
          "upload",
        ],
        answer:
          "Auto-margin understøtter offers fra email, PDF, Excel, Word, Google Sheets, CSV-lignende workflows og blandede batches. Målet er at arbejde med de filer, forhandlerne allerede modtager.",
        suggestions: ["Hvordan fungerer onboarding?", "Prøv demoen"],
      },
      {
        id: "security",
        keywords: [
          "sikkerhed",
          "data",
          "privacy",
          "privatliv",
          "krypteret",
          "gdpr",
        ],
        answer: `Sitet siger, at filer krypteres, behandles i sikre miljøer og ikke deles med tredjeparter. Du kan også læse ${pageLink(DK_NAV, "privacy")}.`,
        suggestions: ["Kontakt teamet", "Læs privatlivspolitikken"],
      },
      {
        id: "money-back",
        keywords: [
          "pengene tilbage",
          "refundering",
          "refund",
          "garanti",
          "money back guarantee",
        ],
        answer: `Sitet angiver ingen offentlig pengene-tilbage-garanti eller refusionspolitik. Hvis du har brug for vilkår om kontrakt, opsigelse eller refundering, er det sikrest at spørge teamet via ${pageLink(DK_NAV, "contact")}.`,
        suggestions: ["Hvordan fungerer prissætningen?", "Kontakt sales"],
      },
      {
        id: "browser-extension",
        keywords: [
          "browser extension",
          "browser udvidelse",
          "udvidelse",
          "er browser extension gratis",
          "er udvidelsen gratis",
        ],
        answer: `Auto-margin har en ${pageLink(DK_NAV, "browserExtension")}, men sitet viser ingen separat offentlig gratispris for den. Siden handler om adgang, så brug ${pageLink(DK_NAV, "contact")}, hvis du vil have adgang eller prisoplysninger om udvidelsen.`,
        suggestions: [
          "Hvordan fungerer prissætningen?",
          "Åbn browser extension-siden",
        ],
      },
      {
        id: "registration",
        keywords: [
          "registrere",
          "registrering",
          "opret konto",
          "sign up",
          "hvordan kan jeg registrere mig",
        ],
        answer: `Der er ikke et offentligt self-serve-registreringsflow på sitet. Den nuværende vej er at kontakte Auto-margin via ${pageLink(DK_NAV, "contact")}, så teamet kan forstå jeres intake-workflow, volumen og setup, før adgang gives.`,
        suggestions: ["Hvordan kommer jeg i gang?", "Kontakt sales"],
      },
      {
        id: "personal-data",
        keywords: [
          "persondata",
          "hvordan gemmes mine data",
          "gemmer i mine data",
          "datalagring",
          "slet mine data",
          "private data",
        ],
        answer: `Privatlivspolitikken siger, at persondata bruges til at levere og forbedre tjenesten, kun gemmes så længe det er nødvendigt til formålet og beskyttes med krypterede backups og sikre miljøer. Den siger også, at du kan bede om adgang, rettelse eller sletning. Se ${pageLink(DK_NAV, "privacy")}.`,
        suggestions: ["Er mine data sikre?", "Læs privatlivspolitikken"],
      },
      {
        id: "installation",
        keywords: [
          "skal jeg installere noget",
          "installere",
          "installation",
          "downloade software",
          "lokal installation",
        ],
        answer: `Det offentlige site er bygget som webplatform, browser-udvidelse og guidet adgang snarere end en self-serve lokal installation. Hvis du har brug for den præcise setup-vej for dit team, så brug ${pageLink(DK_NAV, "contact")}.`,
        suggestions: [
          "Hvordan kommer jeg i gang?",
          "Åbn browser extension-siden",
        ],
      },
      {
        id: "startup-speed",
        keywords: [
          "hvor hurtigt kan vi komme i gang",
          "hvor hurtigt kan vi starte",
          "hvor lang tid tager setup",
          "hurtig onboarding",
          "samme dag",
        ],
        answer: `Sitet siger, at vejen er kontakt, første møde, proposal-scoping, access proposal og derefter launch plus optimering. Det siger også, at de fleste brugere kommer i gang samme dag, når setup er afklaret.`,
        suggestions: ["Hvordan kommer jeg i gang?", "Kontakt sales"],
      },
      {
        id: "multi-user",
        keywords: [
          "kan flere personer bruge det",
          "flere brugere",
          "team adgang",
          "seats",
          "multi user",
        ],
        answer: `Ja. Pristabellen viser planer med forskellige niveauer af seats, fra én bruger op til større teamopsætninger. Hvis I har brug for en konkret teamstruktur, så se ${pageLink(DK_NAV, "pricing")} eller ${pageLink(DK_NAV, "contact")}.`,
        suggestions: ["Hvordan fungerer prissætningen?", "Åbn priser"],
      },
      {
        id: "best-file-format",
        keywords: [
          "hvilke filformater er bedst",
          "bedste format",
          "bedste filformat",
          "hvilket format skal jeg bruge",
          "foretrukket filformat",
        ],
        answer: `Auto-margin er bygget til at arbejde med de filer, forhandlere allerede modtager, herunder email, PDF, Excel, Word, Google Sheets, CSV-lignende workflows og blandede batches. Sitet angiver ikke ét obligatorisk format.`,
        suggestions: [
          "Hvilke filer understøttes?",
          "Kan jeg uploade offers fra email?",
        ],
      },
      {
        id: "api-integrations",
        keywords: [
          "understotter i api integrationer",
          "api integration",
          "integrationer",
          "api",
          "enterprise api access",
        ],
        answer: `Ja, de nuværende access-modeller inkluderer enterprise API access, og pristabellen nævner også integrationer. Sitet offentliggør ikke detaljerede API-vilkår i denne chatbot-kontekst, så brug ${pageLink(DK_NAV, "contact")} eller ${pageLink(DK_NAV, "guidebook")} som næste skridt.`,
        suggestions: ["Hvilke access-modeller findes?", "Åbn guidebook"],
      },
      {
        id: "email-upload",
        keywords: [
          "kan jeg uploade offers fra email",
          "upload fra email",
          "email offers",
          "email import",
          "mail import",
        ],
        answer: `Ja. Sitet siger direkte, at Auto-margin understøtter offers fra email sammen med PDF, Excel, Word, Google Sheets, CSV-lignende workflows og blandede batches.`,
        suggestions: [
          "Hvilke filer understøttes?",
          "Hvordan fungerer onboarding?",
        ],
      },
      {
        id: "contact",
        keywords: ["kontakt", "email", "mail", "sales", "support", "tale"],
        answer: `Du kan kontakte Auto-margin på to@auto-margin.com eller bruge formularen på ${pageLink(DK_NAV, "contact")}. Sitet siger, at teamet typisk svarer inden for 1 arbejdsdag, mandag-fredag 9:00-17:00 CET.`,
        suggestions: [
          "Hvordan fungerer prissætningen?",
          "Hvordan kommer jeg i gang?",
        ],
      },
      {
        id: "audience",
        keywords: [
          "hvem er det til",
          "kunder",
          "forhandlere",
          "dealer",
          "tradingfirma",
          "b2b",
          "markedsplads",
        ],
        answer:
          "Auto-margin er bygget til uafhængige forhandlere, tradingfirmaer, import/export-virksomheder, dealer-netværk og B2B-markedspladser, som håndterer mange offers og supplier-relationer.",
        suggestions: [
          "Hvordan identificerer det deals?",
          "Hvordan kommer jeg i gang?",
        ],
      },
      {
        id: "best-deals",
        keywords: [
          "bedste deals",
          "identificere",
          "anbefale",
          "rangere",
          "profit",
          "margin",
        ],
        answer:
          "Auto-margin tjekker hvert offer mod live market context og gør det til et klarere næste skridt. Målet er mindre manuel review og mere tid på de rigtige biler og partnere.",
        suggestions: [
          "Kan jeg stole på priserne?",
          "Hvilke markeder understøttes?",
        ],
      },
      {
        id: "prices-trust",
        keywords: [
          "kan jeg stole på auto-margin",
          "stole pa priserne",
          "korrekte priser",
          "market prices",
          "live listings",
        ],
        answer:
          "Ja, tillidsgrundlaget på sitet er, at Auto-margin tjekker offers mod live marketplace listings i Europa, opdaterer data løbende, krypterer filer og behandler dem i sikre miljøer. For juridiske eller kontraktmæssige garantier bør du kontakte teamet direkte.",
        suggestions: [
          "Hvilke markeder understøttes?",
          "Læs privatlivspolitikken",
        ],
      },
      {
        id: "getting-started",
        keywords: [
          "komme i gang",
          "starte",
          "onboarding",
          "setup",
          "anmod om adgang",
        ],
        answer: `For at komme i gang sender du en forespørgsel via ${pageLink(DK_NAV, "contact")}. Den aktuelle vej er kontakt, første møde, proposal-scoping, access proposal og derefter launch samt optimering.`,
        suggestions: ["Hvordan fungerer prissætningen?", "Kontakt sales"],
      },
      {
        id: "about",
        keywords: ["om", "team", "virksomhed", "historie", "mission"],
        answer: `Auto-margin beskrives som et lille team bygget omkring buying-arbejdet bag hver vehicle deal. Historien fokuserer på mindre manuel review og bedre partnerbeslutninger. Læs mere på ${pageLink(DK_NAV, "about")}.`,
        suggestions: ["Hvem er Auto-margin til?", "Kontakt teamet"],
      },
      {
        id: "navigation",
        keywords: ["hvor", "side", "navigere", "link", "finde", "ga til"],
        answer: `Nyttige sider: ${pageLink(DK_NAV, "demo")}, ${pageLink(DK_NAV, "pricing")}, ${pageLink(DK_NAV, "faq")}, ${pageLink(DK_NAV, "contact")}, ${pageLink(DK_NAV, "about")}, ${pageLink(DK_NAV, "guidebook")} og ${pageLink(DK_NAV, "privacy")}.`,
        suggestions: ["Åbn demo", "Åbn priser"],
      },
    ],
    siteContext: `
Auto-margin er en platform for professionelle bilhandlere og dealership-teams i Europa.
Den hjælper forhandlere med at reviewe indgående offers hurtigere, fokusere på bedre deals og bruge mindre tid på manuel kontrol af hver bil.
Du uploader offers, du allerede modtager. Auto-margin sammenligner dem med live listings og viser hvilke biler der skaber margin, hvilke der kan stå stille, og hvilke der allerede er placeret.
Det overordnede mål er intake control: bedre partnerbeslutninger, mindre tid på review og mere tid på closing.
Målgrupper: uafhængige forhandlere, tradingfirmaer, import/export-virksomheder, dealer-netværk og B2B-markedspladser.
Kernefunktioner: uploadet offer intake, sammenligning med live market data, partner visibility, marginfokuseret review, notifikationer og støtte til blandede formater.
Understøttede input: email, PDF, Excel, Word, Google Sheets, CSV-lignende workflows og blandede batches.
Markedsdækning på websitet: Tyskland, Frankrig, Polen, Italien, Schweiz, Spanien, Holland, Belgien, Sverige og Tjekkiet. Websitet nævner også Sydkorea og Kina som ekstra kontekst.
Prissætning: skræddersyet prissætning afhængigt af offer-volumen, målmarkeder, workflow setup, access-model, onboarding og supportniveau.
Access-modeller: automatic access, managed access og enterprise API access.
Demo: den offentlige demo viser et eksempel på validering af et enkelt køretøj, ikke hele supplier-list-workflowet.
Kontakt: to@auto-margin.com. Kontaktformular: /contact. Timer: mandag-fredag 9:00-17:00 CET. Typisk svartid: inden for 1 arbejdsdag.
Nyttige sider: /demo, /pricing, /faq, /contact, /about, /guidebook, /privacy, /enterprise, /browser-extension.
`,
  },
};

export function resolveAliceLocale(locale: unknown): Locale {
  return routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : routing.defaultLocale;
}

export function getAliceUiCopy(locale: Locale) {
  return knowledgeByLocale[locale].ui;
}

export function getAliceInstructions(locale: Locale, path: string) {
  const context = knowledgeByLocale[locale].siteContext;

  return `You are ALICE, the concise assistant for the Auto-margin landing page.
Reply in the same language as locale "${locale}" unless the user clearly asks for another language.
Use only the provided Auto-margin context and the current conversation.
If the user asks for something outside Auto-margin, politely say you can only help with Auto-margin, its website, pricing, demo, guidebook, contact, and product information.
Do not invent prices, legal claims, integrations, guarantees, or availability.
Prefer directing users to the Contact page at /contact for sales, partnership, support, custom pricing, account, or private-data questions.
Keep answers under 90 words.
Current page path: ${path || "/"}

Auto-margin context:
${context}`;
}

export function getAliceUnavailableAnswer(locale: Locale): AliceAnswer {
  const knowledge = knowledgeByLocale[locale];

  return {
    answer: knowledge.fallbacks.unavailable,
    suggestions: knowledge.suggestions.rateLimit,
  };
}

export function getAliceFallbackCopy(locale: Locale) {
  return knowledgeByLocale[locale].fallbacks;
}

export function getAliceAiSuggestions(locale: Locale) {
  return knowledgeByLocale[locale].suggestions.ai;
}

export function getAliceDefaultSuggestions(locale: Locale) {
  return knowledgeByLocale[locale].suggestions.default;
}

export function findStaticAliceAnswer(
  locale: Locale,
  message: string,
): AliceAnswer | null {
  const knowledge = knowledgeByLocale[locale];
  const normalized = normalize(message);
  const compact = compactNormalized(message);
  const words = normalized.split(/\s+/).filter(Boolean);

  if (isShortGreeting(message)) {
    return knowledge.staticAnswers[0] ?? null;
  }

  let best: {
    score: number;
    item: StaticAnswerDefinition;
  } | null = null;

  for (const item of knowledge.staticAnswers) {
    let score = 0;

    for (const keyword of item.keywords) {
      const normalizedKeyword = normalize(keyword);
      const compactKeyword = compactNormalized(keyword);

      if (normalized.includes(normalizedKeyword)) {
        score += normalizedKeyword.includes(" ") ? 4 : 2;
      } else if (compact.includes(compactKeyword)) {
        score += compactKeyword.length > 8 ? 4 : 2;
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
