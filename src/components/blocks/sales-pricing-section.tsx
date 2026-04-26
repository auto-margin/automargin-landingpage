"use client";

import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";

import { DashedLine } from "@/components/dashed-line";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const bullets = ["dealFlow", "markets", "workflow", "support"] as const;

export function SalesPricingSection({ className }: { className?: string }) {
  const t = useTranslations("Home.salesPricing");

  return (
    <section className={cn("py-20 lg:py-24", className)}>
      <div className="container">
        <div className="max-w-3xl">
          <h2 className="text-foreground text-2xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <div className="text-muted-foreground mt-4 max-w-2xl space-y-1 text-base leading-relaxed md:text-lg">
            <p>{t("description1")}</p>
            <p>{t("description2")}</p>
          </div>
        </div>

        <Card className="mt-8 rounded-2xl md:mt-12 lg:mt-20">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-[minmax(0,1fr)_auto_minmax(280px,0.42fr)]">
              <div className="flex items-center p-6 md:p-8 lg:p-10">
                <ul className="mx-auto grid w-full max-w-3xl gap-4 text-base md:grid-cols-2 md:gap-x-12 lg:text-lg">
                  {bullets.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="bg-foreground/5 text-foreground flex size-7 shrink-0 items-center justify-center rounded-full border lg:size-8">
                        <Check className="size-4" aria-hidden />
                      </span>
                      <span className="text-foreground/85">
                        {t(`bullets.${item}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative block md:hidden">
                <DashedLine />
              </div>
              <div className="relative hidden md:block">
                <DashedLine orientation="vertical" />
              </div>

              <div className="flex flex-col justify-between gap-8 p-6 md:p-8 lg:p-10">
                <div>
                  <h3 className="text-foreground text-lg font-semibold tracking-tight">
                    {t("proposal.title")}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {t("proposal.description")}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <Button className="w-full" asChild>
                    <Link href="/contact">{t("proposal.primaryCta")}</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-background h-auto w-full gap-2"
                    asChild
                  >
                    <Link href="/pricing">
                      {t("proposal.secondaryCta")}
                      <ArrowRight className="stroke-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
