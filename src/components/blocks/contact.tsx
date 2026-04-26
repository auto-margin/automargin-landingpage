import {
  ArrowRight,
  BookOpen,
  CircleHelp,
  Clock,
  Linkedin,
  Mail,
  PlayCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { ContactForm } from "@/components/blocks/contact-form";
import { DashedLine } from "@/components/dashed-line";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

const EMAIL_GENERAL = "info@auto-margin.com";
const LINKEDIN_URL = "https://linkedin.com/company/auto-margin";
const helpCards = ["faq", "guidebook", "demo"] as const;
const helpIcons = {
  faq: CircleHelp,
  guidebook: BookOpen,
  demo: PlayCircle,
} as const;
const helpHrefs = {
  faq: "/faq",
  guidebook: "/guidebook",
  demo: "/demo",
} as const;
const externalHelpCards = new Set<(typeof helpCards)[number]>(["guidebook"]);

function HelpCard({
  title,
  description,
  href,
  icon: Icon,
  external,
  linkLabel,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  external?: boolean;
  linkLabel: string;
}) {
  const linkClass =
    "mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-chart-1 hover:opacity-80";

  return (
    <Card className="bg-card/60 rounded-2xl">
      <CardContent className="flex h-full flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-foreground text-lg font-semibold">{title}</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              {description}
            </p>
          </div>
          <span className="bg-chart-1/15 text-chart-1 ring-chart-1/25 inline-flex size-10 shrink-0 items-center justify-center rounded-xl ring-1">
            <Icon className="size-5" aria-hidden />
          </span>
        </div>

        {external ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            {linkLabel} <ArrowRight className="size-4" aria-hidden />
          </a>
        ) : (
          <Link href={href} className={linkClass}>
            {linkLabel} <ArrowRight className="size-4" aria-hidden />
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

export default function Contact() {
  const t = useTranslations("Contact");

  return (
    <section className="py-28 lg:py-32 lg:pt-44">
      <div className="container max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-chart-1 text-xs font-medium tracking-wide uppercase">
              {t("eyebrow")}
            </p>
            <h1 className="text-foreground mt-4 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              {t("title")}
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl text-base leading-relaxed md:text-lg">
              {t("description")}
            </p>

            <div className="mt-10">
              <p className="text-foreground text-sm font-semibold">
                {t("detailsTitle")}
              </p>
              <div className="mt-4 space-y-3 text-sm">
                <a
                  href={`mailto:${EMAIL_GENERAL}`}
                  className="text-muted-foreground hover:text-foreground flex items-center gap-2"
                >
                  <Mail className="size-4 opacity-80" aria-hidden />
                  {EMAIL_GENERAL}
                </a>
                <div className="text-muted-foreground flex items-center gap-2">
                  <Clock className="size-4 opacity-80" aria-hidden />
                  <span>{t("openHours")}</span>
                </div>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-2 pt-1"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="size-4 opacity-80" aria-hidden />
                  <span className="text-sm">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          <Card className="bg-card/60 rounded-2xl">
            <CardContent className="p-6 md:p-8">
              <ContactForm />
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 lg:mt-20">
          <DashedLine className="text-muted-foreground" />
        </div>

        <div className="mt-12">
          <p className="text-chart-1 text-xs font-medium tracking-wide uppercase">
            {t("nextSteps.eyebrow")}
          </p>
          <h2 className="text-foreground mt-4 text-4xl font-semibold tracking-tight">
            {t("nextSteps.title")}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl text-sm leading-relaxed md:text-base">
            {t("nextSteps.description")}
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {helpCards.map((card) => (
              <HelpCard
                key={card}
                title={t(`nextSteps.cards.${card}.title`)}
                description={t(`nextSteps.cards.${card}.description`)}
                href={helpHrefs[card]}
                icon={helpIcons[card]}
                external={externalHelpCards.has(card)}
                linkLabel={t("nextSteps.linkLabel")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
