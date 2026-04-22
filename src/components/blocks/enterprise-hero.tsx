import Link from "next/link";

import { Check, Database, Factory, Globe, MapPin, Target } from "lucide-react";

import { EnterprisePricingCta } from "@/components/blocks/enterprise-pricing-cta";
import { DashedLine } from "@/components/dashed-line";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const capabilities = [
  {
    title: "Bulk Screening",
    description:
      "Process supplier lists of any size. Evaluate every vehicle against live market conditions in minutes — not manually over days.",
    icon: Database,
  },
  {
    title: "Structural Demand Detection",
    description:
      "Identify segments where supply is structurally low before the market adjusts pricing. Act on real gaps — not assumed demand.",
    icon: Target,
  },
  {
    title: "B2B Matching with Need Score",
    description:
      "Continuously profile dealers based on inventory and behavior. Know who is short in which segment — and why a vehicle fits.",
    icon: Factory,
  },
  {
    title: "Postcode-Level Lead Generation",
    description:
      "Marketing follows inventory. Target postcodes where demand exists and local supply is missing — not broad demographics.",
    icon: MapPin,
  },
  {
    title: "Dealer Intelligence",
    description:
      "Track dealer activity across the market. See growth, contraction, and inventory gaps with each refresh.",
    icon: Check,
  },
  {
    title: "Multi-Market Evaluation",
    description:
      "Evaluate vehicles across marketplaces and auction sources simultaneously — with one consistent view of the market pipeline.",
    icon: Globe,
  },
];

function CapabilityCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}) {
  return (
    <div className="border-border bg-card/40 hover:bg-card/55 rounded-2xl border p-5 shadow-sm transition-colors sm:p-6">
      <div className="flex items-start gap-3">
        <span className="bg-chart-1/15 text-chart-1 ring-chart-1/25 mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl ring-1">
          <Icon className="size-4.5" aria-hidden />
        </span>
        <div className="min-w-0">
          <h3 className="text-foreground text-base font-semibold tracking-tight">
            {title}
          </h3>
          <p className="text-muted-foreground mt-1 text-sm leading-snug">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function EnterpriseMockup() {
  const rows = [
    { label: "Supplier list", value: "3,240 vehicles" },
    { label: "Markets compared", value: "DE · CH · AT · PL" },
    { label: "Time to score", value: "~2m 14s" },
    { label: "Highest gaps", value: "SUV · Hybrid · 2021–2023" },
  ];

  return (
    <div
      className={cn(
        "border-chart-1/25 bg-card/40 ring-border/50 dark:border-chart-1/25 dark:bg-card/25 dark:ring-border/40",
        "space-y-4 rounded-2xl border p-5 shadow-sm ring-1 sm:p-6",
      )}
      aria-hidden
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-display text-foreground text-sm font-semibold tracking-tight">
          Enterprise pipeline
        </span>
        <span className="bg-chart-1/15 text-chart-1 ring-chart-1/25 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1">
          Live
        </span>
      </div>

      <div className="border-border bg-muted/40 grid gap-3 rounded-xl border p-4">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs">{row.label}</span>
            <span className="text-foreground text-xs font-semibold tabular-nums">
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <div className="border-border grid gap-3 rounded-xl border border-dashed p-4">
        <p className="text-muted-foreground text-xs leading-snug">
          Prioritize acquisitions based on structural gaps, pricing bands, and
          dealer-fit signals — in one workflow.
        </p>
        <div className="flex flex-wrap gap-2">
          {["Need score", "Gap alerts", "Cross-market comps"].map((tag) => (
            <span
              key={tag}
              className="bg-chart-1/15 text-chart-1 ring-chart-1/25 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function EnterpriseHero() {
  return (
    <section className="py-28 lg:py-32 lg:pt-44">
      <header className="container">
        <div className="max-w-4xl text-left">
          <p className="text-chart-1 mb-4 text-xs font-medium tracking-wide uppercase">
            Enterprise
          </p>
          <h1 className="text-foreground text-3xl tracking-tight md:text-4xl lg:text-5xl">
            Enterprise sourcing,{" "}
            <span className="whitespace-nowrap">powered by margin.</span>
          </h1>
          <p className="text-muted-foreground mt-5 max-w-2xl text-base leading-relaxed md:text-lg">
            Exclusive capabilities for enterprise teams.
          </p>
        </div>
      </header>

      <div className="container mt-12 lg:mt-16">
        <div className="border-border bg-card/35 rounded-2xl border p-6 shadow-sm sm:p-8">
          <p className="text-foreground text-base font-semibold tracking-tight md:text-lg">
            Auto-margin is not built around listings. It is built around margin.
          </p>
          <div className="text-muted-foreground mt-4 space-y-3 text-sm leading-relaxed md:text-base">
            <p>
              Most vehicle trading still starts with lists: supplier stock,
              dealer inventory, scraped market results, email offers. The
              problem isn’t lack of data — it’s turning those lists into
              decisions.
            </p>
            <p>
              Auto-margin takes vehicles in whatever format they arrive,
              evaluates them against live market conditions, dealer gaps, and
              local demand, and shows where margin actually exists — where it
              makes money, for whom, and why.
            </p>
            <p className="text-foreground font-medium">
              From list to margin — one system, one logic.
            </p>
          </div>
        </div>
      </div>

      <div className="container mt-14 grid items-center gap-8 lg:mt-20 lg:grid-cols-2 lg:gap-12">
        <div className="order-2 lg:order-1">
          <EnterpriseMockup />
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
            From bulk screening to dealer outreach.
          </h2>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed md:text-base">
            Auto-margin helps teams move beyond spreadsheet-based sourcing.
            Evaluate every vehicle against live market context, highlight
            under-supplied segments, and prioritize outreach with signals rooted
            in inventory reality.
          </p>

          <ul className="mt-6 space-y-3">
            {[
              "Bulk screening for large supplier lists.",
              "Cross-market evaluation in one consistent view.",
              "Dealer-level signals to prioritize outreach and inventory.",
            ].map((line) => (
              <li key={line} className="flex items-center gap-3">
                <span className="bg-chart-1/15 text-chart-1 ring-chart-1/25 flex size-6 shrink-0 items-center justify-center rounded-full ring-1">
                  <Check className="size-3.5 stroke-[2.5]" aria-hidden />
                </span>
                <span className="text-muted-foreground text-sm leading-snug md:text-base">
                  {line}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild>
              <Link href="/contact">Talk to sales</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/demo">Try the demo</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mt-14 md:mt-18 lg:mt-24">
        <div>
          <h2 className="text-foreground text-4xl font-semibold tracking-tight">
            Enterprise capabilities
          </h2>
          <p className="text-muted-foreground mt-4 max-w-3xl text-sm leading-relaxed md:text-base">
            Designed for teams that evaluate inventory across suppliers,
            marketplaces, and regions with repeatable decisions and auditable
            workflows.
          </p>
          <div className="relative mt-6">
            <DashedLine className="text-muted-foreground" />
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:mt-10 lg:grid-cols-3">
          {capabilities.map((cap) => (
            <CapabilityCard key={cap.title} {...cap} />
          ))}
        </div>
      </div>

      <EnterprisePricingCta className="mt-10 lg:mt-16" />
    </section>
  );
}
