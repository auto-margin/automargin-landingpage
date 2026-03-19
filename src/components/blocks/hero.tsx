import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  BarChart3,
  Calculator,
  Globe,
  Sparkles,
} from "lucide-react";

import { DashedLine } from "@/components/dashed-line";
import { ScrollReveal } from "@/components/scroll-reveal";
import { StatusCard } from "@/components/status-card";
import { StatusCardProfit } from "@/components/status-card-profit";
import { Button } from "@/components/ui/button";

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
      "Calculate potential profit before buying a vehicle—no manual research.",
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
        <div className="relative h-[793px] w-full max-lg:overflow-hidden lg:overflow-visible">
          <Image
            src="/test2.png"
            alt="hero"
            fill
            priority
            fetchPriority="high"
            loading="eager"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="rounded-2xl object-cover object-left-top shadow-lg max-lg:rounded-tr-none"
          />
          {/* Top-left: result card – only animates when user scrolls down into view */}
          <ScrollReveal
            variant="zoom"
            onlyAfterScroll
            scrollThreshold={180}
            className="absolute top-108 left-4 z-10 lg:top-18"
            rootMargin="0px 0px -80px 0px"
            threshold={0.1}
          >
            <div>
              <StatusCardProfit className="shadow-xl ring-1 ring-black/5" />
            </div>
          </ScrollReveal>
          {/* Bottom-left: status card – scroll-triggered fade-up */}
          <ScrollReveal
            className="absolute top-28 left-4 z-10 lg:top-auto lg:bottom-0 lg:left-9 xl:left-4"
            rootMargin="0px 0px -60px 0px"
            threshold={0.15}
          >
            <div className="max-lg:translate-x-0 max-lg:translate-y-0 lg:-translate-x-[20%] lg:translate-y-[20%]">
              <StatusCard className="shadow-xl ring-1 ring-black/5" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
