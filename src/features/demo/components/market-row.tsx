"use client";

import Image from "next/image";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import type { DemoMarketView } from "@/features/demo/analysis";
import { DASH, type DemoFormatters } from "@/features/demo/format";
import { cn } from "@/lib/utils";

/** Codes with both a flag asset and a translated country name. */
const KNOWN_MARKETS = new Set([
  "AT",
  "BE",
  "CH",
  "DE",
  "ES",
  "FR",
  "IT",
  "NL",
  "SE",
]);

function marginTone(percent?: number) {
  if (percent == null) return undefined;
  if (percent >= 3) return "text-emerald-700 dark:text-emerald-400";
  if (percent >= 0) return "text-amber-700 dark:text-amber-400";
  return "text-rose-700 dark:text-rose-400";
}

/**
 * One labelled figure. Stacks on narrow screens so a wrapping label can never
 * collide with the value beside it.
 */
function Detail({
  label,
  value,
  sub,
  valueClassName,
}: {
  label: string;
  value: string;
  sub?: string;
  valueClassName?: string;
}) {
  return (
    <div className="border-border/50 flex flex-col gap-0.5 border-b py-3 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <div className="min-w-0">
        <p className="text-foreground text-sm">{label}</p>
        {sub ? (
          <p className="text-muted-foreground mt-0.5 text-sm">{sub}</p>
        ) : null}
      </div>
      <p
        className={cn(
          "text-foreground text-sm font-semibold tabular-nums sm:text-right",
          valueClassName,
        )}
      >
        {value}
      </p>
    </div>
  );
}

type MarketRowProps = {
  market: DemoMarketView;
  format: DemoFormatters;
  /** All-in buy-in price, always in the currency the car is bought in. */
  buyIn?: number;
  buyInCurrency: string;
  onCompareClick: (marketCode: string) => void;
};

/**
 * A country reads as a single line — its name plus one number — and opens on
 * tap for the rest.
 *
 * Every country renders the same fields, in the same order, with the same
 * wording; an unmeasured one shows a dash rather than disappearing. The
 * upstream pipeline fills the two markets unevenly (Germany returns
 * days-to-sell but no margin, Switzerland the reverse), and letting the layout
 * follow whatever happened to arrive made the two rows read like different
 * products.
 */
export function MarketRow({
  market,
  format,
  buyIn,
  buyInCurrency,
  onCompareClick,
}: MarketRowProps) {
  const t = useTranslations("DemoPage.result");
  const tMarkets = useTranslations("DemoPage.markets");

  const known = KNOWN_MARKETS.has(market.code);
  const countryName = known ? tMarkets(market.code) : market.name;
  const flag = known ? `/flags/${market.code.toLowerCase()}.svg` : null;

  const daysValue =
    market.holdingDays != null
      ? t("daysValue", { days: format.days(market.holdingDays) })
      : DASH;

  const marginValue =
    market.marginPercent != null
      ? [
          format.percent(market.marginPercent),
          market.marginAmount != null
            ? format.money(market.marginAmount, market.currency)
            : null,
        ]
          .filter(Boolean)
          .join(" · ")
      : DASH;

  const resaleValue =
    market.sellingB2C != null || market.sellingB2B != null
      ? `${t("resaleB2C")} ${format.money(market.sellingB2C, market.currency)} · ${t(
          "resaleB2B",
        )} ${format.money(market.sellingB2B, market.currency)}`
      : DASH;

  const pricesValue = market.pricePoints.length
    ? market.pricePoints
        .map((price) => format.money(price, market.currency))
        .join(" · ")
    : DASH;

  return (
    <details className="group border-border/60 bg-card/70 overflow-hidden rounded-2xl border shadow-sm">
      <summary className="focus-visible:ring-ring/50 flex min-h-14 cursor-pointer list-none items-center gap-2 px-3 py-2.5 focus-visible:ring-[3px] focus-visible:outline-none sm:min-h-16 sm:gap-4 sm:px-5 sm:py-3 [&::-webkit-details-marker]:hidden">
        {flag ? (
          <Image
            src={flag}
            alt=""
            width={36}
            height={36}
            className="size-7 shrink-0 rounded-full object-cover sm:size-9"
          />
        ) : (
          <span className="bg-muted text-muted-foreground ring-border flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ring-1 sm:size-9 sm:text-xs">
            {market.code}
          </span>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="text-foreground truncate text-sm font-semibold sm:text-base">
            {countryName}
          </h3>
          <p className="text-muted-foreground truncate text-xs sm:text-sm">
            {t("daysLabel")}
          </p>
        </div>

        <p className="text-foreground shrink-0 text-base font-semibold tabular-nums sm:text-2xl">
          {daysValue}
        </p>

        <ChevronDown
          className="text-muted-foreground size-4 shrink-0 transition-transform group-open:rotate-180 sm:size-5"
          aria-hidden
        />
      </summary>

      <div className="border-border/60 border-t px-4 pt-1 pb-4 sm:px-5">
        {market.isEmpty ? (
          <p className="text-muted-foreground border-border/50 border-b py-3 text-sm leading-relaxed">
            {t("emptyMarketBody")}
          </p>
        ) : null}

        <Detail
          label={t("marginLabel")}
          value={marginValue}
          valueClassName={marginTone(market.marginPercent)}
        />
        <Detail
          label={t("daysLabel")}
          value={daysValue}
          sub={
            market.soldSample != null
              ? t("daysSub", { count: format.count(market.soldSample) })
              : undefined
          }
        />
        <Detail
          label={t("comparedLabel")}
          value={format.count(market.comparedCount)}
        />
        <Detail label={t("pricesLabel")} value={pricesValue} />
        <Detail
          label={t("yourCost")}
          value={format.money(buyIn, buyInCurrency)}
        />
        <Detail label={t("resaleLabel")} value={resaleValue} />

        {market.compareLink ? (
          <a
            href={market.compareLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onCompareClick(market.code)}
            className="text-foreground border-border/70 bg-background/70 hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring/50 mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border px-4 text-sm font-semibold transition-colors focus-visible:ring-[3px] focus-visible:outline-none sm:w-auto sm:justify-start"
          >
            <span className="sm:hidden">{t("openComparisonShort")}</span>
            <span className="hidden sm:inline">{t("openComparison")}</span>
            <ArrowUpRight className="size-4" aria-hidden />
            <span className="sr-only">{t("opensInNewTab")}</span>
          </a>
        ) : null}
      </div>
    </details>
  );
}
