"use client";

import { useState } from "react";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const stats = ["margin", "won", "profit", "time"] as const;
const tags = ["fuel", "history", "market", "volume"] as const;
const chartPoints = [
  { x: 0, y: 132, week: "W1", margin: "18.1%", deals: "18 offers" },
  { x: 48, y: 118, week: "W2", margin: "19.0%", deals: "24 offers" },
  { x: 96, y: 125, week: "W3", margin: "18.5%", deals: "21 offers" },
  { x: 144, y: 100, week: "W4", margin: "20.2%", deals: "27 offers" },
  { x: 192, y: 88, week: "W5", margin: "21.0%", deals: "31 offers" },
  { x: 240, y: 94, week: "W6", margin: "20.6%", deals: "29 offers" },
  { x: 288, y: 80, week: "W7", margin: "21.5%", deals: "33 offers" },
  { x: 336, y: 58, week: "W8", margin: "23.0%", deals: "36 offers" },
  { x: 384, y: 48, week: "W9", margin: "23.7%", deals: "39 offers" },
  { x: 432, y: 54, week: "W10", margin: "23.3%", deals: "35 offers" },
  { x: 480, y: 36, week: "W11", margin: "24.5%", deals: "42 offers" },
  { x: 520, y: 26, week: "W12", margin: "24.6%", deals: "38 won" },
] as const;
const defaultChartPoint = "W7";
const mobileChartPoints = [
  { x: 0, y: 132 },
  { x: 104, y: 125 },
  { x: 208, y: 88 },
  { x: 312, y: 80 },
  { x: 416, y: 48 },
  { x: 520, y: 36 },
] as const;

export function SalesPricingSection({ className }: { className?: string }) {
  const t = useTranslations("Home.salesPricing");
  const [activeChartPoint, setActiveChartPoint] =
    useState<(typeof chartPoints)[number]["week"]>(defaultChartPoint);

  return (
    <section className={cn("py-20 lg:py-24", className)}>
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[minmax(600px,1.18fr)_minmax(0,0.82fr)] lg:items-center xl:grid-cols-[minmax(680px,1.25fr)_minmax(380px,0.75fr)]">
          <div className="border-border bg-card/60 rounded-2xl border p-5 shadow-sm max-sm:p-4 md:p-6 lg:p-8 xl:p-9">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-muted-foreground text-[10px] leading-snug font-bold tracking-[0.18em] uppercase max-sm:max-w-40">
                  {t("dashboard.best.eyebrow")}
                </p>
                <h3 className="text-foreground mt-2 text-2xl leading-tight font-semibold tracking-tight md:text-3xl">
                  <span className="whitespace-pre-line sm:hidden">
                    {t("dashboard.best.title").replace(" · ", " ·\n")}
                  </span>
                  <span className="hidden sm:inline">
                    {t("dashboard.best.title")}
                  </span>
                </h3>
              </div>
              <span className="bg-primary/10 text-primary ring-primary/15 max-w-16 rounded-full px-3 py-1 text-center text-[10px] leading-tight font-black tracking-[0.14em] uppercase ring-1 sm:max-w-none md:px-4 md:py-1.5">
                {t("dashboard.best.badge")}
              </span>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
              {stats.map((stat) => (
                <div
                  key={stat}
                  className="border-border bg-background/70 rounded-xl border p-4 shadow-xs lg:p-5"
                >
                  <p className="text-foreground text-2xl font-semibold tracking-tight">
                    {t(`dashboard.stats.${stat}.value`)}
                  </p>
                  <p className="text-muted-foreground mt-1 text-[11px] leading-tight">
                    {t(`dashboard.stats.${stat}.label`)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-border bg-muted/35 mt-6 rounded-xl border p-5 max-sm:p-5 lg:p-6">
              <div className="flex items-start justify-between gap-4">
                <p className="text-muted-foreground max-w-40 text-[10px] leading-snug font-bold tracking-[0.16em] uppercase sm:max-w-none">
                  <span className="whitespace-pre-line sm:hidden">
                    {t("dashboard.chart.title").replace(" · ", " ·\n")}
                  </span>
                  <span className="hidden sm:inline">
                    {t("dashboard.chart.title")}
                  </span>
                </p>
                <span className="text-primary max-w-24 text-right text-sm leading-snug font-bold sm:max-w-none">
                  {t("dashboard.chart.delta")}
                </span>
              </div>
              <svg
                viewBox="0 0 520 170"
                className="mt-5 hidden w-full overflow-visible sm:block sm:h-44 lg:h-52 xl:h-56"
                role="img"
                aria-label="Supplier margin trend by week"
              >
                <path
                  d="M0 42H520M0 90H520M0 138H520"
                  stroke="currentColor"
                  className="text-border"
                  strokeDasharray="2 6"
                />
                <path
                  d="M0 132L48 118L96 125L144 100L192 88L240 94L288 80L336 58L384 48L432 54L480 36L520 26V170H0Z"
                  className="fill-primary/10"
                />
                <path
                  d="M0 132L48 118L96 125L144 100L192 88L240 94L288 80L336 58L384 48L432 54L480 36L520 26"
                  className="stroke-primary"
                  fill="none"
                  strokeLinecap="round"
                  strokeWidth="3.2"
                />
                {chartPoints.map((point) => {
                  const tooltipX = Math.min(Math.max(point.x - 54, 4), 408);
                  const tooltipY = point.y > 68 ? point.y - 58 : point.y + 18;
                  const isActivePoint = point.week === activeChartPoint;

                  return (
                    <g
                      key={point.week}
                      className="group outline-none"
                      tabIndex={0}
                      aria-label={`${point.week}: ${point.margin} margin, ${point.deals}`}
                      onMouseEnter={() => setActiveChartPoint(point.week)}
                      onFocus={() => setActiveChartPoint(point.week)}
                      onMouseLeave={() =>
                        setActiveChartPoint(defaultChartPoint)
                      }
                      onBlur={() => setActiveChartPoint(defaultChartPoint)}
                    >
                      <line
                        x1={point.x}
                        x2={point.x}
                        y1="18"
                        y2="150"
                        stroke="currentColor"
                        strokeDasharray="3 5"
                        className={cn(
                          "text-primary/40 transition-opacity",
                          isActivePoint ? "opacity-100" : "opacity-0",
                        )}
                      />
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="13"
                        className="fill-transparent"
                      />
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="8"
                        className={cn(
                          "fill-primary/15 transition-opacity",
                          isActivePoint ? "opacity-100" : "opacity-0",
                        )}
                      />
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="3.6"
                        className="fill-primary"
                      />
                      <g
                        transform={`translate(${tooltipX} ${tooltipY})`}
                        className={cn(
                          "pointer-events-none transition-opacity",
                          isActivePoint ? "opacity-100" : "opacity-0",
                        )}
                      >
                        <rect
                          width="108"
                          height="46"
                          rx="9"
                          className="fill-background stroke-border drop-shadow-sm"
                        />
                        <text
                          x="10"
                          y="17"
                          className="fill-muted-foreground text-[9px] font-bold tracking-[0.12em]"
                        >
                          {point.week}
                        </text>
                        <text
                          x="10"
                          y="32"
                          className="fill-foreground text-[11px] font-bold"
                        >
                          {point.margin} margin
                        </text>
                        <text
                          x="10"
                          y="42"
                          className="fill-muted-foreground text-[9px] font-semibold"
                        >
                          {point.deals}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>
              <svg
                viewBox="0 0 520 170"
                className="mt-4 block h-36 w-full overflow-visible sm:hidden"
                role="img"
                aria-label="Supplier margin trend by week"
              >
                <path
                  d="M0 42H520M0 90H520M0 138H520"
                  stroke="currentColor"
                  className="text-border"
                  strokeDasharray="2 6"
                />
                <path
                  d="M0 132L104 125L208 88L312 80L416 48L520 36V170H0Z"
                  className="fill-primary/10"
                />
                <path
                  d="M0 132L104 125L208 88L312 80L416 48L520 36"
                  className="stroke-primary"
                  fill="none"
                  strokeLinecap="round"
                  strokeWidth="3.2"
                />
                {mobileChartPoints.map((point) => (
                  <circle
                    key={`${point.x}-${point.y}`}
                    cx={point.x}
                    cy={point.y}
                    r="3.8"
                    className="fill-primary"
                  />
                ))}
              </svg>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="border-border bg-background/70 text-muted-foreground rounded-full border px-2.5 py-1 text-[10px] leading-tight font-semibold shadow-xs sm:px-3 sm:text-[11px]"
                >
                  {t(`dashboard.tags.${tag}`)}
                </span>
              ))}
            </div>
          </div>

          <div className="max-w-2xl lg:justify-self-end">
            <h2 className="text-foreground text-3xl leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              {t("title")}
            </h2>
            <p className="text-muted-foreground mt-5 max-w-xl text-base leading-relaxed md:text-lg">
              {t("description")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="w-full sm:w-auto" asChild>
                <Link href="/contact">{t("proposal.primaryCta")}</Link>
              </Button>
              <Button
                variant="outline"
                className="w-full gap-2 shadow-md sm:w-auto"
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
      </div>
    </section>
  );
}
