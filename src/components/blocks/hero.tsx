import {
  ArrowRight,
  BarChart3,
  Calculator,
  Globe,
  Sparkles,
} from "lucide-react";

import { HeroImageOverlays } from "@/components/blocks/hero-image-overlays";
import { DashedLine } from "@/components/dashed-line";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

const features = [
  {
    title: "Market price intelligence",
    description:
      "Analyze live listings across major European car marketplaces for realistic resale values.",
    icon: BarChart3,
  },
  {
    title: "Instant margin analysis",
    description:
      "Calculate potential profit before buying a vehicle - no manual research.",
    icon: Calculator,
  },
  {
    title: "Multi-market comparison",
    description:
      "See how similar vehicles are priced across different European markets.",
    icon: Globe,
  },
  {
    title: "AI-powered insights",
    description:
      "ML models detect pricing trends and opportunities in real time.",
    icon: Sparkles,
  },
];

export const Hero = () => {
  return (
    <section className="py-28 lg:py-32 lg:pt-44">
      <div className="container flex flex-col justify-between gap-8 md:gap-14 lg:flex-row lg:gap-20">
        {/* Left side - Main content */}
        <div className="flex-1">
          <h1 className="text-foreground max-w-160 text-3xl tracking-tight md:text-4xl lg:text-5xl xl:whitespace-nowrap">
            Analyze every car offer.
          </h1>

          <p className="text-muted-foreground mt-5 text-xl md:text-3xl">
            Automargin is a tool that helps you analyze, understand whether a
            car offer is profitable.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 lg:flex-nowrap">
            <Button asChild>
              <Link href="/contact">Get Started</Link>
            </Button>
            <Button
              variant="outline"
              className="from-background h-auto gap-2 bg-linear-to-r to-transparent shadow-md"
              asChild
            >
              <Link
                href="/demo"
                className="max-w-56 truncate text-start md:max-w-none"
              >
                Try Demo
                <ArrowRight className="stroke-3" />
              </Link>
            </Button>
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
        <HeroImageOverlays />
      </div>
    </section>
  );
};
