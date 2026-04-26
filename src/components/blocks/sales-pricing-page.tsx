"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

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

export function SalesPricingPage({ className }: { className?: string }) {
  const t = useTranslations("PricingPage");

  return (
    <div className={cn("space-y-18 lg:space-y-22", className)}>
      <section className="pt-28 lg:pt-44">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-foreground text-3xl tracking-tight md:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="text-muted-foreground mt-5 text-lg leading-relaxed md:text-xl">
              {t("hero.description")}
            </p>

            <div className="mt-8 flex justify-center">
              <Button size="lg" className="min-w-44 px-8" asChild>
                <Link href="/contact">{t("hero.cta")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
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
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <h2 className="text-foreground text-2xl tracking-tight md:text-3xl">
                {t("process.title")}
              </h2>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                {t("process.description")}
              </p>
            </div>

            <Card className="rounded-3xl">
              <CardContent className="p-6 md:p-8">
                <ol className="grid gap-4 md:grid-cols-5">
                  {processSteps.map((step, idx) => (
                    <li key={step} className="flex gap-3">
                      <div
                        className="bg-foreground/5 text-foreground flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold"
                        aria-hidden
                      >
                        {idx + 1}
                      </div>
                      <div className="text-sm leading-snug">
                        <div className="text-foreground font-medium">
                          {t(`process.steps.${step}`)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-10">
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
                className="bg-background w-full gap-2 sm:w-auto"
                asChild
              >
                <Link href="/contact">
                  {t("engagement.cta")} <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {engagementModels.map((model) => (
                <Card key={model} className="rounded-2xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      {t(`engagement.models.${model}.title`)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-sm leading-relaxed">
                    <p>{t(`engagement.models.${model}.description`)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
