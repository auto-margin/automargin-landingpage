"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

import dynamic from "next/dynamic";

import { Check, Copy, Info, Loader2, TriangleAlert, X } from "lucide-react";

import {
  DEMO_CAR_EXAMPLE,
  type DemoStageEvent,
  formatMoney,
  getUrlLabel,
  recommendedFieldKeys,
  signalLabel,
  toneForSignal,
} from "@/components/demo-calculator-utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((m) => m.DotLottieReact),
  { ssr: false },
);

function SignalBadge({ signal }: { signal?: string }) {
  const s = (signal ?? "").toUpperCase();
  const isUp = s === "MUSTHAVE" || s === "YES";
  const isDown = s === "NO";

  return (
    <span
      className={[
        "inline-flex size-8 items-center justify-center rounded-md text-xs font-semibold ring-1",
        toneForSignal(signal),
      ].join(" ")}
    >
      {isUp ? (
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
        >
          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
          <path d="M7 10v12" />
        </svg>
      ) : isDown ? (
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
        >
          <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
          <path d="M17 14V2" />
        </svg>
      ) : s === "MAYBE" ? (
        <span aria-hidden="true" className="text-[12px] leading-none">
          ?
        </span>
      ) : (
        <span aria-hidden="true" className="text-[12px] leading-none">
          —
        </span>
      )}

      <span className="sr-only">{signalLabel(signal)}</span>
    </span>
  );
}

export function DemoHeader({
  icon,
  intro,
  statusLabel,
}: {
  icon: ReactNode;
  intro: string;
  statusLabel?: { icon: "spinner" | "check"; text: string };
}) {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="bg-chart-1/15 text-chart-1 ring-chart-1/25 flex size-9 min-h-9 min-w-9 shrink-0 items-center justify-center rounded-full ring-1">
          {icon}
        </span>
        <div>
          <p className="text-muted-foreground text-xs md:text-sm">{intro}</p>
        </div>
      </div>

      {statusLabel ? (
        <div className="text-muted-foreground hidden items-center gap-2 text-xs sm:flex">
          {statusLabel.icon === "spinner" ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : (
            <span
              className="inline-flex size-4 items-center justify-center"
              aria-hidden
            >
              <svg viewBox="0 0 24 24" className="size-4 text-emerald-500">
                <path
                  fill="currentColor"
                  d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"
                />
              </svg>
            </span>
          )}
          {statusLabel.text}
        </div>
      ) : null}
    </div>
  );
}

export function DemoInputPanel({
  t,
  input,
  setInput,
  showBrandError,
  onOpenHelp,
  helpOpen,
  statusRunning,
  sourceCountry,
  setSourceCountry,
}: {
  t: (key: string) => string;
  input: string;
  setInput: (v: string) => void;
  showBrandError: boolean;
  onOpenHelp: () => void;
  helpOpen: boolean;
  statusRunning: boolean;
  sourceCountry: string;
  setSourceCountry: (v: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="order-1 flex items-center justify-between gap-3 sm:order-2">
          <button
            type="button"
            onClick={onOpenHelp}
            className="text-foreground inline-flex items-center gap-2 rounded-md py-2 text-sm font-semibold underline underline-offset-4 opacity-90 hover:opacity-100"
            aria-haspopup="dialog"
            aria-expanded={helpOpen}
          >
            <Info className="text-chart-1 size-5" aria-hidden />
            {t("helpButton")}
          </button>
        </div>

        <div className="order-2 space-y-2 sm:order-1">
          <Label htmlFor="demo-input" className="text-foreground ml-0.25">
            {t("enterVehicle")}
          </Label>
          <Textarea
            id="demo-input"
            rows={6}
            placeholder={t("placeholder")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={800}
            className="resize-none text-sm placeholder:text-sm sm:text-base sm:placeholder:text-base"
            disabled={statusRunning}
          />
          {showBrandError ? (
            <p className="ml-0.25 text-xs font-medium text-rose-700 dark:text-rose-300">
              {t("brandError")}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr),minmax(0,1fr)]">
        <div className="space-y-2">
          <Label htmlFor="source-country" className="text-foreground ml-0.25">
            {t("countryLabel")}
          </Label>
          <Select
            value={sourceCountry}
            onValueChange={setSourceCountry}
            disabled={statusRunning}
          >
            <SelectTrigger id="source-country" className="w-full">
              <SelectValue placeholder={t("countryPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DE">{t("country.DE")}</SelectItem>
              <SelectItem value="CH">{t("country.CH")}</SelectItem>
              <SelectItem value="BE">{t("country.BE")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="text-muted-foreground text-xs leading-relaxed md:text-sm">
          <p>{t("weCompare")}</p>
          <p>{t("weEstimate")}</p>
        </div>
      </div>
    </div>
  );
}

export function ActionButtons({
  t,
  canRun,
  status,
  onRun,
  onReset,
  className,
  hideOnIdle,
}: {
  t: (key: string) => string;
  canRun: boolean;
  status: "idle" | "running" | "complete" | "error";
  onRun: () => void;
  onReset: () => void;
  className?: string;
  hideOnIdle?: boolean;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-2", className)}>
      <Button type="button" onClick={onRun} disabled={!canRun}>
        {status === "running"
          ? t("calculating")
          : status === "complete"
            ? t("completed")
            : t("calculate")}
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onReset}
        disabled={status === "running" || status === "idle"}
        className={hideOnIdle && status === "idle" ? "invisible" : undefined}
      >
        {t("reset")}
      </Button>
    </div>
  );
}

export function ResultPanel({
  t,
  status,
  latestStageText,
  errorText,
  showSuccess,
  successAssetVersion,
  bindSuccessRef,
  completeEvent,
}: {
  t: (key: string) => string;
  status: "idle" | "running" | "complete" | "error";
  latestStageText: string;
  errorText: string | null;
  showSuccess: boolean;
  successAssetVersion: number;
  bindSuccessRef: (next: any) => void;
  completeEvent: DemoStageEvent | null;
}) {
  return (
    <div className="am-scrollbar border-border/60 bg-muted/20 flex h-[500px] flex-col overflow-auto rounded-lg border p-4 sm:h-[540px] sm:p-5">
      {status !== "complete" ? (
        <p className="text-foreground text-sm font-semibold">{t("result")}</p>
      ) : null}

      <div className="flex min-h-0 flex-1 flex-col pt-3 pr-2 pb-3 sm:pb-4">
        {status === "idle" ? (
          <p className="text-muted-foreground text-sm leading-relaxed">
            {t("idleHint")}
          </p>
        ) : status === "running" ? (
          <div className="space-y-3">
            <p className="text-muted-foreground text-center text-sm">
              {latestStageText}
            </p>
            <div className="flex items-center justify-center py-1">
              <DotLottieReact
                src="/lottie/loader.lottie"
                autoplay
                loop
                className="h-44 w-44 sm:h-48 sm:w-48"
              />
            </div>
            <p className="text-muted-foreground text-xs">{t("runningTip")}</p>
          </div>
        ) : status === "error" ? (
          <div className="flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-rose-700 dark:text-rose-300">
            <TriangleAlert className="mt-0.5 size-5" aria-hidden />
            <div>
              <p className="text-sm font-semibold">{t("errorTitle")}</p>
              <p className="mt-1 text-sm opacity-90">
                {errorText ?? t("errorDefault")}
              </p>
            </div>
          </div>
        ) : showSuccess ? (
          <div className="flex flex-1 items-center justify-center">
            <DotLottieReact
              src={`/lottie/Verification%20success.lottie?v=${successAssetVersion}`}
              autoplay
              loop={false}
              dotLottieRefCallback={bindSuccessRef}
              className="h-44 w-44 bg-transparent sm:h-48 sm:w-48"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-foreground text-center text-sm font-semibold">
                {t("buySignal")}
              </p>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="space-y-2">
                  {completeEvent?.recommendation?.text ? (
                    <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
                      {completeEvent.recommendation.text}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {completeEvent?.markets ? (
              <div className="space-y-2">
                <p className="text-foreground ml-1 text-sm font-semibold">
                  {t("markets")}
                </p>
                <div className="grid gap-2">
                  {Object.entries(completeEvent.markets).map(([key, m]) => (
                    <details
                      key={key}
                      className="border-border/60 bg-background/40 group rounded-xl border"
                    >
                      <summary className="hover:bg-background/55 focus-visible:ring-chart-1/40 flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-3 py-3 focus-visible:ring-2 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
                        <div className="flex min-w-0 items-center gap-2">
                          <SignalBadge signal={m.signal} />
                          <span className="text-foreground truncate text-sm font-semibold">
                            {key}
                          </span>
                        </div>

                        <div className="shrink-0">
                          <div className="flex items-center gap-2">
                            <div className="text-muted-foreground text-xs">
                              <span className="hidden sm:inline">
                                {t("basedOn")}{" "}
                              </span>
                              <span className="text-foreground font-semibold tabular-nums">
                                {m.listings?.sampleSize ?? "—"}
                              </span>{" "}
                              <span>{t("listings")}</span>
                            </div>
                            <svg
                              aria-hidden="true"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="text-muted-foreground size-4 transition-transform group-open:rotate-180"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </summary>

                      <div className="px-3 pb-3">
                        <div className="bg-muted/20 border-border/60 grid grid-cols-2 gap-3 rounded-lg border p-3">
                          <div>
                            <p className="text-muted-foreground text-[11px] font-semibold tracking-wide uppercase">
                              {t("profit")}
                            </p>
                            <p className="text-foreground mt-1 text-base font-semibold tabular-nums">
                              {formatMoney(m.profit, m.currency)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-muted-foreground text-[11px] font-semibold tracking-wide uppercase">
                              {t("margin")}
                            </p>
                            <p className="text-foreground mt-1 text-base font-semibold tabular-nums">
                              {m.profitPct != null
                                ? `${m.profitPct.toFixed(1)}%`
                                : "—"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ) : null}

            {completeEvent?.sources ? (
              <div className="space-y-2">
                <p className="text-foreground ml-1 text-sm font-semibold">
                  {t("sources")}
                </p>
                <div className="space-y-2 pb-3">
                  {Object.entries(completeEvent.sources).map(([market, url]) => (
                    <a
                      key={market}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-border/60 bg-background/40 hover:bg-background/55 group flex items-center justify-between gap-4 rounded-xl border px-3 py-3 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="bg-muted/20 text-muted-foreground ring-border inline-flex size-8 items-center justify-center rounded-md text-xs font-semibold ring-1">
                            {market}
                          </span>
                          <span className="text-foreground truncate text-sm font-semibold">
                            {getUrlLabel(url).host}
                          </span>
                        </div>
                      </div>

                      <span className="text-chart-1 shrink-0 text-sm font-semibold group-hover:opacity-80">
                        {t("open")}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export function HelpDialog({
  t,
  open,
  onClose,
  exampleCopied,
  setExampleCopied,
}: {
  t: (key: string) => string;
  open: boolean;
  onClose: () => void;
  exampleCopied: boolean;
  setExampleCopied: (v: boolean) => void;
}) {
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={t("help.dialogAria")}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-background text-foreground border-border w-full max-w-lg rounded-2xl border shadow-xl">
        <div className="border-border flex items-start justify-between gap-3 border-b px-5 py-4">
          <div>
            <p className="text-sm font-semibold">{t("help.title")}</p>
            <p className="text-muted-foreground mt-1 text-sm">
              {t("help.subtitle")}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/40 inline-flex size-9 items-center justify-center rounded-lg"
            aria-label={t("help.closeAria")}
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <div className="px-5 py-4">
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold">{t("help.recommendedTitle")}</p>
              <ul className="text-muted-foreground mt-2 list-disc space-y-1 pl-5">
                {recommendedFieldKeys.map((key) => (
                  <li key={key}>{t(`help.recommendedFields.${key}`)}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold">{t("help.exampleTitle")}</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="shrink-0 gap-1.5"
                  aria-label={
                    exampleCopied ? t("help.copiedAria") : t("help.copyAria")
                  }
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(DEMO_CAR_EXAMPLE);
                      setExampleCopied(true);
                      if (resetRef.current) clearTimeout(resetRef.current);
                      resetRef.current = setTimeout(() => {
                        setExampleCopied(false);
                        resetRef.current = null;
                      }, 2000);
                    } catch {
                      // Clipboard may be unavailable (e.g. non-secure context).
                    }
                  }}
                >
                  {exampleCopied ? (
                    <>
                      <Check className="size-3.5" aria-hidden />
                      {t("help.copied")}
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" aria-hidden />
                      {t("help.copy")}
                    </>
                  )}
                </Button>
              </div>
              <div className="bg-muted/30 border-border mt-2 rounded-xl border px-3 py-2 font-mono text-xs leading-relaxed">
                {DEMO_CAR_EXAMPLE}
              </div>
            </div>
          </div>
        </div>

        <div className="border-border flex items-center justify-end gap-2 border-t px-5 py-4">
          <Button type="button" variant="outline" onClick={onClose}>
            {t("help.ok")}
          </Button>
        </div>
      </div>
    </div>
  );
}

