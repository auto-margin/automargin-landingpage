import {
  ArrowRight,
  BookOpen,
  CircleHelp,
  Clock,
  Linkedin,
  Mail,
  PlayCircle,
} from "lucide-react";

import { ContactForm } from "@/components/blocks/contact-form";
import { DashedLine } from "@/components/dashed-line";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

const EMAIL_GENERAL = "info@auto-margin.com";
const LINKEDIN_URL = "https://linkedin.com/company/auto-margin";
const OPEN_HOURS = "Mon–Fri, 9:00–17:00 (CET)";


function HelpCard({
  title,
  description,
  href,
  icon: Icon,
  external,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  external?: boolean;
}) {
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
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-chart-1/15 text-chart-1 ring-1 ring-chart-1/25">
            <Icon className="size-5" aria-hidden />
          </span>
        </div>

        {external ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-chart-1 hover:opacity-80"
          >
            Learn more <ArrowRight className="size-4" aria-hidden />
          </a>
        ) : (
          <Link
            href={href}
            className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-chart-1 hover:opacity-80"
          >
            Learn more <ArrowRight className="size-4" aria-hidden />
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

export default function Contact() {
  return (
    <section className="py-28 lg:py-32 lg:pt-44">
      <div className="container max-w-6xl">
        {/* Hero split */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-medium tracking-wide uppercase text-chart-1">
              Contact us
            </p>
            <h1 className="text-foreground mt-4 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              We’re here to help.
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl text-base leading-relaxed md:text-lg">
              Tell us what you need and we’ll route your request to the right
              person. We typically respond within 1 business day.
            </p>

            <div className="mt-10">
              <p className="text-foreground text-sm font-semibold">
                Contact details
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
                  <span>{OPEN_HOURS}</span>
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

        {/* Help options */}
        <div className="mt-16 lg:mt-20">
          <DashedLine className="text-muted-foreground" />
        </div>

        <div className="mt-12">
          <p className="text-xs font-medium tracking-wide uppercase text-chart-1">
            Next steps
          </p>
          <h2 className="text-foreground mt-4 text-4xl font-semibold tracking-tight">
            Guides to get started
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl text-sm leading-relaxed md:text-base">
            Explore the quickest path depending on what you’re looking for.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <HelpCard
              title="FAQ"
              description="Get quick answers about the product, plans, and how the demo works."
              href="/faq"
              icon={CircleHelp}
            />
            <HelpCard
              title="Guidebook"
              description="Read the Auto-margin workflow guide—how teams screen lists and validate margin."
              href="/guidebook"
              icon={BookOpen}
              external
            />
            <HelpCard
              title="Demo"
              description="Try a real car offer and see how the analysis works—no signup needed."
              href="/demo"
              icon={PlayCircle}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
