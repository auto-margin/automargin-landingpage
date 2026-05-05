"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { DashedLine } from "@/components/dashed-line";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type PricingDriver = {
  key: "volume" | "markets" | "workflow" | "support";
};

const pricingDrivers: PricingDriver[] = [
  { key: "volume" },
  { key: "markets" },
  { key: "workflow" },
  { key: "support" },
];

const processSteps = [
  "request",
  "qualification",
  "proposal",
  "onboarding",
  "optimization",
] as const;

const engagementModels = ["automatic", "managed", "api"] as const;
const supplierPoints = ["quality", "drain", "control"] as const;

function AccessModelVisual({
  model,
}: {
  model: (typeof engagementModels)[number];
}) {
  if (model === "automatic") {
    return (
      <svg
        viewBox="20 0 220 72"
        className="text-primary h-20 w-full dark:text-sky-300"
        aria-hidden
      >
        <path
          d="M74 36H103M157 36H186"
          className="stroke-primary/70"
          fill="none"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray="6 7"
        />
        <rect
          x="23"
          y="18"
          width="48"
          height="36"
          rx="10"
          className="fill-primary/10 stroke-border dark:fill-sky-300/10 dark:stroke-sky-300/25"
        />
        <rect
          x="106"
          y="18"
          width="48"
          height="36"
          rx="10"
          className="fill-primary/10 stroke-border dark:fill-sky-300/10 dark:stroke-sky-300/25"
        />
        <rect
          x="189"
          y="18"
          width="48"
          height="36"
          rx="10"
          className="fill-primary/10 stroke-border dark:fill-sky-300/10 dark:stroke-sky-300/25"
        />
        <svg
          x="35"
          y="24"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="stroke-primary"
        >
          <path
            d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="2" />
        </svg>
        <svg
          x="118"
          y="24"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="stroke-primary"
        >
          <path
            d="M10.268 21a2 2 0 0 0 3.464 0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          x="201"
          y="24"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="stroke-primary"
        >
          <path
            d="M3 7V5a2 2 0 0 1 2-2h2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 3h2a2 2 0 0 1 2 2v2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 17v2a2 2 0 0 1-2 2h-2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 21H5a2 2 0 0 1-2-2v-2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="3" strokeWidth="2" />
          <path
            d="m16 16-1.9-1.9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <circle r="3" className="fill-primary">
          <animateMotion
            dur="2.4s"
            repeatCount="indefinite"
            path="M74 36H103"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>
        <circle r="3" className="fill-primary">
          <animateMotion
            dur="2.4s"
            begin=".65s"
            repeatCount="indefinite"
            path="M186 36H157"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="2.4s"
            begin=".65s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    );
  }

  if (model === "managed") {
    return (
      <svg
        viewBox="0 0 220 72"
        className="text-primary h-20 w-full dark:text-sky-300"
        aria-hidden
      >
        {[52, 110, 168].map((x, index) => (
          <g key={x}>
            <circle cx={x} cy="27" r="8" className="fill-primary/15" />
            <path
              d={`M${x - 14} 53c1.6-10 26.4-10 28 0`}
              className="stroke-primary/70"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              cx={x}
              cy="27"
              r="2.5"
              className="fill-primary"
              opacity=".35"
            >
              <animate
                attributeName="opacity"
                values=".35;1;.35"
                dur="2.4s"
                begin={`${index * 0.35}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
        <path
          d="M52 56H168"
          className="stroke-border"
          fill="none"
          strokeWidth="2"
          strokeDasharray="4 7"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 220 72"
      className="text-primary h-20 w-full dark:text-sky-300"
      aria-hidden
    >
      <rect
        x="21"
        y="18"
        width="48"
        height="36"
        rx="10"
        className="fill-primary/10 stroke-border dark:fill-sky-300/10 dark:stroke-sky-300/25"
      />
      <rect
        x="151"
        y="18"
        width="48"
        height="36"
        rx="10"
        className="fill-primary/10 stroke-border dark:fill-sky-300/10 dark:stroke-sky-300/25"
      />
      <path
        d="M82 28h56M138 44H82"
        className="stroke-primary/70"
        fill="none"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="6 7"
      />
      <svg
        x="33"
        y="24"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="stroke-primary"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="2" />
        <path
          d="M10 4v4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 8h20"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 4v4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        x="163"
        y="24"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="stroke-primary"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" strokeWidth="2" />
        <path
          d="M3 5V19A9 3 0 0 0 21 19V5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 12A9 3 0 0 0 21 12"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <circle r="4.8" className="fill-primary">
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          path="M82 28H138M138 44H82"
        />
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

export function SalesPricingPage({ className }: { className?: string }) {
  const t = useTranslations("PricingPage");

  return (
    <div className={cn("space-y-16 lg:space-y-20", className)}>
      <section className="pt-28 lg:pt-44">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-foreground text-3xl tracking-tight md:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="text-muted-foreground mt-5 text-lg leading-relaxed md:text-xl">
              {t("hero.description")}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" className="min-w-44 px-8" asChild>
                <Link href="/contact">{t("hero.cta")}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-background min-w-44 gap-2 px-8 shadow-md"
                asChild
              >
                <Link href="#usage-models">
                  {t("hero.secondaryCta")} <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="container">
          <div className="mx-auto max-w-6xl">
            <Card className="bg-primary text-primary-foreground overflow-hidden rounded-2xl shadow-sm">
              <CardContent className="flex h-full flex-col justify-between gap-6 p-6 md:p-8">
                <div>
                  <p className="text-primary-foreground/70 text-xs font-bold tracking-[0.18em] uppercase">
                    {t("supplierNetwork.eyebrow")}
                  </p>
                  <h2 className="mt-4 max-w-3xl text-3xl leading-[1.08] tracking-tight whitespace-pre-line md:text-4xl">
                    {t("supplierNetwork.title")}
                  </h2>
                  <p className="text-primary-foreground/75 my-5 max-w-2xl border-l border-white/25 pl-4 text-sm leading-relaxed italic md:text-base">
                    {t("supplierNetwork.comment")}
                  </p>
                  <p className="text-primary-foreground/75 mt-3 max-w-4xl text-sm leading-snug whitespace-pre-line md:text-base">
                    {t("supplierNetwork.description")}
                  </p>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  {supplierPoints.map((point) => (
                    <div
                      key={point}
                      className="rounded-xl border border-white/15 bg-white/10 p-4"
                    >
                      <CheckCircle2
                        className="mb-3 size-4 text-white"
                        aria-hidden
                      />
                      <h3 className="text-sm font-semibold">
                        {t(`supplierNetwork.points.${point}.title`)}
                      </h3>
                      <p className="text-primary-foreground/70 mt-2 text-sm leading-snug">
                        {t(`supplierNetwork.points.${point}.description`)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <DashedLine className="mx-auto max-w-[80%]" />

      <section className="py-6">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <h2 className="text-foreground text-2xl tracking-tight md:text-3xl">
                {t("drivers.title")}
              </h2>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                {t("drivers.description")}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {pricingDrivers.map((item) => (
                <Card key={item.key} className="rounded-2xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      {t(`drivers.items.${item.key}.title`)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-sm leading-relaxed">
                    {t(`drivers.items.${item.key}.description`)}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8">
              <h2 className="text-foreground text-2xl tracking-tight md:text-3xl">
                {t("process.title")}
              </h2>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                {t("process.description")}
              </p>
            </div>

            <ol className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {processSteps.map((step, idx) => (
                <li
                  key={step}
                  className="bg-card relative flex min-h-40 items-start gap-3 rounded-xl border p-4 shadow-sm xl:flex-col"
                >
                  {idx < processSteps.length - 1 && (
                    <span
                      className="bg-border absolute top-8 -right-3 hidden h-px w-3 xl:block"
                      aria-hidden
                    />
                  )}
                  <div
                    className="bg-primary text-primary-foreground flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold shadow-sm xl:mb-3"
                    aria-hidden
                  >
                    {idx + 1}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <h3 className="text-foreground text-sm leading-snug font-semibold text-balance">
                      {t(`process.steps.${step}`)}
                    </h3>
                    <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
                      {t(`process.details.${step}`)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="usage-models" className="scroll-mt-24 py-6">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-foreground text-2xl tracking-tight md:text-3xl">
                  {t("engagement.title")}
                </h2>
                <p className="text-muted-foreground mt-2 max-w-2xl">
                  {t("engagement.description")}
                </p>
              </div>
              <Button
                variant="outline"
                className="bg-background hidden gap-2 sm:inline-flex sm:w-auto"
                asChild
              >
                <Link href="/guidebook">
                  {t("engagement.cta")} <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            <div className="grid items-stretch gap-4 md:grid-cols-3">
              {engagementModels.map((model) => (
                <Card
                  key={model}
                  className="flex h-full min-h-[380px] rounded-2xl shadow-sm"
                >
                  <div className="flex h-full flex-col">
                    <CardHeader className="space-y-4 pb-3">
                      <AccessModelVisual model={model} />
                      <CardTitle className="text-base">
                        {t(`engagement.models.${model}.title`)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground flex flex-1 flex-col gap-4 text-sm leading-relaxed">
                      <p>{t(`engagement.models.${model}.description`)}</p>
                      <div className="bg-muted/40 mt-auto flex min-h-[72px] items-center rounded-xl border p-3">
                        <p className="text-foreground text-xs font-semibold">
                          {t(`engagement.models.${model}.fit`)}
                        </p>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            <Button
              variant="outline"
              className="bg-background mt-4 w-full gap-2 sm:hidden"
              asChild
            >
              <Link href="/guidebook">
                {t("engagement.cta")} <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="container">
          <div className="bg-card mx-auto flex max-w-5xl flex-col gap-5 rounded-2xl border p-6 shadow-sm md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <h2 className="text-foreground text-2xl tracking-tight md:text-3xl">
                {t("cta.title")}
              </h2>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                {t("cta.description")}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:shrink-0">
              <Button className="gap-2" asChild>
                <Link href="/contact">
                  {t("cta.primary")} <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button variant="outline" className="bg-background" asChild>
                <Link href="/demo">{t("cta.secondary")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <DashedLine className="mx-auto max-w-[80%]" />
    </div>
  );
}
