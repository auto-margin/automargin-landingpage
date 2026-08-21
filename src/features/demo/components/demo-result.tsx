"use client";

import { useTranslations } from "next-intl";

import type { DemoAnalysis, DemoVerdict } from "@/features/demo/analysis";
import { ConversionCta } from "@/features/demo/components/conversion-cta";
import { MarketRow } from "@/features/demo/components/market-row";
import type { DemoFormatters } from "@/features/demo/format";
import { cn } from "@/lib/utils";

const VERDICT_CHIP: Record<DemoVerdict, string> = {
  profit:
    "bg-emerald-500/12 text-emerald-800 ring-emerald-600/25 dark:text-emerald-300",
  thin: "bg-amber-500/12 text-amber-900 ring-amber-600/25 dark:text-amber-300",
  negative: "bg-rose-500/12 text-rose-800 ring-rose-600/25 dark:text-rose-300",
  unknown: "bg-muted text-muted-foreground ring-border",
};

type DemoResultProps = {
  analysis: DemoAnalysis;
  format: DemoFormatters;
  onCompareClick: (marketCode: string) => void;
  onCtaClick: (target: "contact" | "pricing") => void;
};

export function DemoResult({
  analysis,
  format,
  onCompareClick,
  onCtaClick,
}: DemoResultProps) {
  const t = useTranslations("DemoPage.result");
  const { markets, profitMin, profitMax, profitCurrency, verdict } = analysis;

  const range = format.moneyRange(profitMin, profitMax, profitCurrency, {
    asLoss: verdict === "negative",
  });
  const isLoss = verdict === "negative" || range.kind === "loss";
  const headlineLabel = isLoss
    ? t("headlineLabelLoss")
    : t("headlineLabelProfit");

  return (
    <div className="flex min-h-0 flex-1 flex-col space-y-4">
      <section
        className="am-rise border-border/60 bg-muted/25 rounded-2xl border px-4 py-5 text-center sm:px-5"
        aria-labelledby="demo-verdict"
      >
        <span
          className={cn(
            "inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ring-1",
            VERDICT_CHIP[verdict],
          )}
        >
          {t(`verdict.${verdict}`)}
        </span>

        <p className="text-muted-foreground mt-4 text-sm">{headlineLabel}</p>
        <p
          id="demo-verdict"
          className={cn(
            "mt-0.5 text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl",
            isLoss ? "text-rose-700 dark:text-rose-400" : "text-foreground",
          )}
        >
          {range.text}
        </p>
      </section>

      {analysis.hasMeasurements ? null : (
        <p className="rounded-2xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm leading-relaxed text-amber-900 dark:text-amber-200">
          {t("partialBody")}
        </p>
      )}

      <section aria-label={t("marketsLabel")} className="space-y-2">
        <h2 className="font-text text-foreground pt-0.5 pl-0.5 text-base font-semibold!">
          {t("marketsLabel")}
        </h2>

        {markets.map((market, index) => (
          <div
            key={market.id}
            className="am-rise min-w-0"
            style={{ ["--am-delay" as string]: `${150 + index * 80}ms` }}
          >
            <MarketRow
              market={market}
              format={format}
              buyIn={analysis.buyingPrice}
              buyInCurrency={analysis.purchaseCurrency}
              onCompareClick={onCompareClick}
            />
          </div>
        ))}

        <p className="text-muted-foreground/80 pt-1 text-center text-sm leading-relaxed">
          {t("methodology")}
        </p>
      </section>

      <ConversionCta onCtaClick={onCtaClick} />
    </div>
  );
}
