"use client";

import { useEffect, useState } from "react";

import {
  Check,
  Calculator,
  ChartColumn,
  ChevronDown,
  CreditCard,
  Globe,
  RefreshCcw,
  Settings,
  Star,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

const bulletKeys = ["0", "1", "2"] as const;

function ChromeMark() {
  return (
    <span className="border-border/60 bg-background/80 inline-flex size-10 shrink-0 items-center justify-center rounded-full border shadow-sm backdrop-blur-sm">
      <svg viewBox="0 0 24 24" className="size-6 shrink-0" aria-hidden>
        <path
          d="M12 12 21.5 12A9.5 9.5 0 0 0 8.7 3.1Z"
          fill="#ea4335"
        />
        <path
          d="M12 12 7.3 20.2A9.5 9.5 0 0 0 21.5 12Z"
          fill="#34a853"
        />
        <path
          d="M12 12 8.7 3.1A9.5 9.5 0 0 0 7.3 20.2Z"
          fill="#fbbc04"
        />
        <circle cx="12" cy="12" r="4.3" fill="#4285f4" />
        <circle cx="12" cy="12" r="2.1" fill="#dbeafe" />
      </svg>
    </span>
  );
}

function ExtensionMockup() {
  const t = useTranslations("BrowserExtension.mockup");
  const [showContextMenu, setShowContextMenu] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowContextMenu(true);
    }, 1500);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[25rem] lg:max-w-[25rem]">
      <div
        className={`absolute -top-8 -left-16 z-20 hidden w-[17.5rem] rounded-2xl border border-black/8 bg-white/98 p-2 shadow-[0_18px_45px_rgba(15,23,42,0.18)] backdrop-blur-sm transition-all duration-500 ease-out md:block dark:border-white/10 dark:bg-slate-950/95 ${
          showContextMenu
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <div className="mb-2 inline-flex rounded-md bg-amber-300 px-2 py-1 text-sm font-semibold text-slate-950 shadow-sm">
          {t("selectedPrice")}
        </div>
        <div className="space-y-0.5 rounded-xl">
          <div className="text-foreground/88 grid grid-cols-[1.2rem_minmax(0,1fr)_auto] items-center gap-x-2 rounded-lg px-2.5 py-1.5 text-[12px]">
            <span />
            <span>{t("menuCopy")}</span>
            <span className="text-muted-foreground text-[10px]">Ctrl+C</span>
          </div>
          <div className="text-foreground/88 grid grid-cols-[1.2rem_minmax(0,1fr)_auto] items-center gap-x-2 rounded-lg px-2.5 py-1.5 text-[12px]">
            <span />
            <span>{t("menuNewTab")}</span>
            <span />
          </div>
          <div className="text-foreground/88 grid grid-cols-[1.2rem_minmax(0,1fr)_auto] items-center gap-x-2 rounded-lg px-2.5 py-1.5 text-[12px]">
            <span />
            <span>{t("menuCopyHighlight")}</span>
            <span />
          </div>
          <div className="text-foreground/88 grid grid-cols-[1.2rem_minmax(0,1fr)_auto] items-center gap-x-2 rounded-lg px-2.5 py-1.5 text-[12px]">
            <span />
            <span>{t("menuSearch")}</span>
            <span />
          </div>
          <div className="text-foreground/88 grid grid-cols-[1.2rem_minmax(0,1fr)_auto] items-center gap-x-2 rounded-lg px-2.5 py-1.5 text-[12px]">
            <span />
            <span>{t("menuPrint")}</span>
            <span className="text-muted-foreground text-[10px]">Ctrl+P</span>
          </div>
          <div className="my-1 h-px bg-black/8 dark:bg-white/10" />
          <div className="relative grid grid-cols-[1.2rem_minmax(0,1fr)_auto] items-center gap-x-2 rounded-xl bg-sky-50 px-2.5 py-1.75 ring-1 ring-sky-200 dark:bg-sky-500/10 dark:ring-sky-400/20">
            <span className="inline-flex h-4 w-[1.2rem] shrink-0 items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo2.svg"
                alt="Auto-margin logo"
                width={24}
                height={Math.round((24 * 75) / 396)}
                className="h-auto w-4.5 max-w-none dark:invert"
              />
            </span>
            <span className="text-foreground text-[12px] font-medium">
              {t("menuCommand")}
            </span>
            <span className="absolute -right-3 top-1/2 -translate-y-1/2 rotate-6">
              <svg
                viewBox="0 0 24 24"
                className="size-6 drop-shadow-[0_4px_8px_rgba(15,23,42,0.2)]"
                aria-hidden
              >
                <path
                  d="M4 3 18 13l-6 .8 2.3 5.2-2.4 1.1-2.3-5.2-3.9 4Z"
                  fill="white"
                  stroke="rgb(15 23 42 / 0.75)"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <div className="my-1 h-px bg-black/8 dark:bg-white/10" />
          <div className="text-foreground/88 grid grid-cols-[1.2rem_minmax(0,1fr)_auto] items-center gap-x-2 rounded-lg px-2.5 py-1.5 text-[12px]">
            <span />
            <span>{t("menuSource")}</span>
            <span />
          </div>
          <div className="text-foreground/88 grid grid-cols-[1.2rem_minmax(0,1fr)_auto] items-center gap-x-2 rounded-lg px-2.5 py-1.5 text-[12px]">
            <span />
            <span>{t("menuInspect")}</span>
            <span />
          </div>
        </div>
      </div>

      <div
        className="border-primary/15 bg-card/75 ring-border/40 overflow-hidden rounded-[1.75rem] border shadow-[0_18px_50px_rgba(15,23,42,0.08)] ring-1 backdrop-blur-sm"
        aria-hidden
      >
        <div className="bg-primary px-4 py-3 text-primary-foreground sm:px-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="bg-background inline-flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo2.svg"
                  alt="Auto-margin logo"
                  width={64}
                  height={Math.round((64 * 75) / 396)}
                  className="h-auto w-12 max-w-none dark:invert"
                />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium tracking-tight">
                  Auto-margin
                </p>
                <p className="text-primary-foreground/70 truncate text-[11px]">
                  {t("topbarHint")}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <span className="border-primary-foreground/15 bg-primary-foreground/8 inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-xs font-medium">
                <Globe className="size-3.5" aria-hidden />
                EN
                <ChevronDown className="size-3.5 opacity-80" aria-hidden />
              </span>
              <RefreshCcw
                className="text-primary-foreground/80 size-4"
                aria-hidden
              />
              <X className="text-primary-foreground/80 size-4" aria-hidden />
            </div>
          </div>
        </div>

        <div className="bg-background space-y-4 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-foreground text-[1.35rem] font-medium tracking-tight">
                {t("vehicleRoi")}
              </h3>
              <p className="text-muted-foreground mt-1 max-w-sm text-xs leading-5">
                {t("roiDescription")}
              </p>
            </div>
            <RefreshCcw
              className="text-foreground/70 mt-1 size-4 shrink-0"
              aria-hidden
            />
          </div>

          <div className="border-border/80 bg-card rounded-2xl border p-4 shadow-[0_10px_25px_rgba(15,23,42,0.04)] dark:border-white/10 dark:bg-[#12385a]">
            <div className="space-y-3">
              <div>
                <p className="text-foreground text-[0.7rem] font-medium tracking-wide uppercase dark:text-white">
                  {t("netPrice")}
                </p>
                <div className="mt-2 flex gap-2">
                  <div className="border-border bg-background text-foreground flex h-10 flex-1 items-center rounded-lg border px-3 text-[15px] dark:border-white/15 dark:bg-[#0d2b49] dark:text-white">
                    12000
                  </div>
                  <div className="border-border bg-background text-foreground inline-flex h-10 min-w-[4.5rem] items-center justify-between rounded-lg border px-3 text-[13px] dark:border-white/15 dark:bg-[#0d2b49] dark:text-white">
                    EUR
                    <ChevronDown
                      className="ml-2 size-3.5 text-foreground/60 dark:text-white/60"
                      aria-hidden
                    />
                  </div>
                </div>
                <p className="text-muted-foreground mt-1.5 text-[11px] dark:text-white/70">
                  {t("netPriceHint")}
                </p>
              </div>

              <div>
                <p className="text-foreground text-[0.7rem] font-medium tracking-wide dark:text-white">
                  {t("salePrice")}
                </p>
                <div className="border-border bg-background text-foreground mt-2 flex h-10 items-center rounded-lg border px-3 text-[15px] dark:border-white/15 dark:bg-[#0d2b49] dark:text-white">
                  18500
                </div>
                <p className="text-muted-foreground mt-1.5 text-[11px] dark:text-white/70">
                  {t("salePriceHint")}
                </p>
              </div>

              <div className="border-border/80 bg-card flex items-center justify-between gap-3 rounded-lg border px-3 py-2 dark:border-white/10 dark:bg-[#173f63]">
                <div className="min-w-0">
                  <p className="text-foreground text-[11px] font-medium dark:text-white/85">
                    {t("exchangeRates")}
                  </p>
                  <p className="text-muted-foreground truncate text-[10px] dark:text-white/75">
                    1 EUR = 0.9170 CHF · 10.85 SEK
                  </p>
                </div>
                <span className="inline-flex shrink-0 rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white uppercase">
                  {t("fetched")}
                </span>
              </div>

              <div className="bg-primary text-primary-foreground inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-medium">
                <Calculator className="size-4" aria-hidden />
                {t("calculate")}
              </div>
            </div>
          </div>

          <div className="bg-primary text-primary-foreground border-border/80 -mx-4 -mb-4 mt-5 grid grid-cols-4 border-t px-3 py-3 sm:-mx-5 sm:-mb-5">
            <div className="flex flex-col items-center gap-1.5">
              <Calculator className="size-4" aria-hidden />
              <span className="text-[11px]">{t("navCalculator")}</span>
            </div>
            <div className="text-primary-foreground/65 flex flex-col items-center gap-1.5">
              <ChartColumn className="size-4" aria-hidden />
              <span className="text-[11px]">{t("navMarket")}</span>
            </div>
            <div className="text-primary-foreground/65 flex flex-col items-center gap-1.5">
              <Star className="size-4" aria-hidden />
              <span className="text-[11px]">{t("navFavorites")}</span>
            </div>
            <div className="text-primary-foreground/65 flex flex-col items-center gap-1.5">
              <Settings className="size-4" aria-hidden />
              <span className="text-[11px]">{t("navSettings")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BrowserExtensionHero() {
  const t = useTranslations("BrowserExtension.hero");

  return (
    <section className="py-28 lg:py-32 lg:pt-44">
      <div className="container flex flex-col justify-between gap-8 md:gap-14 lg:flex-row lg:gap-20">
        <div className="flex-1">
          <p className="text-primary mb-4 text-xs font-medium tracking-wide uppercase">
            {t("eyebrow")}
          </p>
          <div className="inline-flex flex-wrap items-center gap-x-3 gap-y-2">
            <ChromeMark />
            <h1 className="text-foreground max-w-160 text-3xl tracking-tight md:text-4xl lg:text-5xl">
              {t("title")}
            </h1>
          </div>
          <p className="text-muted-foreground mt-5 text-xl md:text-3xl">
            {t("subtitle")}
          </p>
          <ul className="mt-8 max-w-160 space-y-3.5">
            {bulletKeys.map((key) => (
              <li key={key} className="flex items-center gap-3">
                <span className="bg-primary/20 text-primary ring-primary/30 flex size-6 shrink-0 items-center justify-center rounded-full ring-1">
                  <Check className="size-3.5 stroke-[2.5]" aria-hidden />
                </span>
                <span className="text-muted-foreground text-sm leading-[1.45] md:text-base">
                  {t(`bullets.${key}`)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-4 lg:flex-nowrap">
              <Button asChild>
                <Link href="/contact">{t("cta")}</Link>
              </Button>
            </div>
            <p className="text-muted-foreground flex items-center gap-2 text-sm">
              <CreditCard className="size-4 shrink-0 opacity-80" aria-hidden />
              {t("noCreditCard")}
            </p>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col justify-center max-lg:pt-10 lg:pl-10">
          <ExtensionMockup />
        </div>
      </div>
    </section>
  );
}
