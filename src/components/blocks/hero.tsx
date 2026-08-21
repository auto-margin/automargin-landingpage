import {
  ArrowRight,
  BarChart3,
  Calculator,
  CirclePlay,
  Globe,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { HeroOverlaysClient } from "@/components/blocks/hero-overlays.client";
import { DashedLine } from "@/components/dashed-line";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

const featureIcons = [BarChart3, Calculator, Globe, Sparkles];
const featureKeys = ["market", "margin", "comparison", "insights"] as const;

export const Hero = () => {
  const t = useTranslations("Home.hero");
  const features = featureKeys.map((key, index) => ({
    title: t(`features.${key}.title`),
    description: t(`features.${key}.description`),
    icon: featureIcons[index]!,
  }));

  return (
    <section className="py-28 lg:py-32 lg:pt-44">
      <div className="container flex flex-col justify-between gap-8 md:gap-14 lg:flex-row lg:gap-20">
        {/* Left side - Main content */}
        <div className="flex-1">
          <h1 className="text-foreground max-w-160 text-3xl tracking-tight whitespace-pre-line md:text-4xl lg:text-5xl">
            {t("title")}
          </h1>

          <p className="text-muted-foreground mt-5 text-lg md:text-2xl">
            {t("subtitle")}
          </p>

          {/*
            The demo is the page's main conversion point, so it carries the solid
            brand gradient, the larger footprint and the only motion in the pair;
            "Request access" stays available as the quieter outline action.
          */}
          <div className="mt-8 flex flex-col gap-3.5">
            <div className="flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="am-cta-sheen group from-primary via-primary to-chart-3 shadow-primary/30 hover:shadow-primary/40 h-12 gap-2.5 rounded-lg bg-linear-to-br px-6 text-[0.95rem] font-semibold shadow-lg transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 sm:px-7"
              >
                <Link href="/demo">
                  <CirclePlay className="size-5" aria-hidden />
                  {t("demoCta")}
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-lg px-6 text-[0.95rem]"
              >
                <Link href="/contact">{t("accessCta")}</Link>
              </Button>
            </div>

            <p className="text-muted-foreground flex items-center gap-2 text-sm">
              <ShieldCheck className="size-4 shrink-0" aria-hidden />
              {t("demoCtaNote")}
            </p>
          </div>
        </div>

        {/* Right side - Features */}
        <div className="relative flex flex-1 flex-col justify-center space-y-5 max-lg:pt-10 lg:pl-10">
          <DashedLine
            orientation="vertical"
            className="absolute top-0 left-0 max-lg:hidden"
          />
          <DashedLine
            orientation="horizontal"
            className="absolute top-0 lg:hidden"
          />
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex gap-2.5 lg:gap-5">
                <Icon className="text-foreground mt-1 size-4 shrink-0 lg:size-5" />
                <div>
                  <h2 className="font-text text-foreground font-semibold">
                    {feature.title}
                  </h2>
                  <p className="text-muted-foreground max-w-76 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="animate-fade-in-up relative mt-12 max-lg:ml-6 max-lg:h-[550px] max-lg:overflow-hidden md:mt-20 lg:container lg:mt-24 lg:overflow-visible">
        <HeroOverlaysClient />
      </div>
    </section>
  );
};
