"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

import type { DotLottie } from "@lottiefiles/dotlottie-web";
import {
  Calculator,
  Check,
  CheckCircle2,
  Copy,
  Info,
  Loader2,
  TriangleAlert,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";

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
import { Link } from "@/i18n/navigation";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((m) => m.DotLottieReact),
  { ssr: false },
);

const DEMO_CAR_EXAMPLE =
  "BMW X5 2020 30d xDrive, 85,000 km, diesel, automatic, asking price 32,000 EUR";

const recommendedFieldKeys = ["0", "1", "2", "3", "4"] as const;

type DemoStageEvent = {
  stage?: string;
  success?: boolean;
  message?: string;
  error?: string;
  limitReached?: boolean;
  recommendation?: {
    signal?: "MUSTHAVE" | "YES" | "MAYBE" | "NO" | string;
    text?: string;
    bestMarket?: string;
  };
  markets?: Record<
    string,
    {
      targetPrice?: number;
      currency?: string;
      profit?: number;
      profitPct?: number;
      signal?: string;
      listings?: {
        min?: number;
        median?: number;
        max?: number;
        sampleSize?: number;
      };
    }
  >;
  sources?: Record<string, string>;
  car?: {
    brand?: string;
    model?: string;
    year?: number;
    mileage?: number;
    fuelType?: string;
  };
  sourcePriceEur?: number;
  savedCarId?: number;
};

function parseSseDataLines(chunk: string) {
  const events: DemoStageEvent[] = [];
  const lines = chunk.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    const payload = trimmed.replace(/^data:\s?/, "");
    if (!payload || payload === "[DONE]") continue;
    try {
      events.push(JSON.parse(payload) as DemoStageEvent);
    } catch {
      // ignore invalid JSON events
    }
  }
  return events;
}

function formatMoney(value?: number, currency?: string) {
  if (value == null || Number.isNaN(value)) return "—";
  const cur = currency || "EUR";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cur,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${value.toFixed(0)} ${cur}`;
  }
}

function toneForSignal(signal?: string) {
  const s = (signal ?? "").toUpperCase();
  if (s === "MUSTHAVE" || s === "YES") {
    return "bg-emerald-500/12 text-emerald-700 ring-emerald-500/20 dark:text-emerald-300";
  }
  if (s === "MAYBE") {
    return "bg-amber-500/12 text-amber-700 ring-amber-500/20 dark:text-amber-300";
  }
  if (s === "NO") {
    return "bg-rose-500/12 text-rose-700 ring-rose-500/20 dark:text-rose-300";
  }
  return "bg-muted/40 text-muted-foreground ring-border";
}

function signalLabel(signal?: string) {
  const s = (signal ?? "").toUpperCase();
  if (s === "MUSTHAVE" || s === "YES") return "YES";
  if (s === "NO") return "NO";
  if (s === "MAYBE") return "MAYBE";
  return "—";
}

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

const BRAND_TOKENS = [
  "audi",
  "bmw",
  "citroën",
  "citroen",
  "cupra",
  "dacia",
  "fiat",
  "ford",
  "honda",
  "hyundai",
  "jaguar",
  "jeep",
  "kia",
  "land rover",
  "lexus",
  "mazda",
  "mercedes",
  "mercedes-benz",
  "mini",
  "mitsubishi",
  "nissan",
  "opel",
  "peugeot",
  "porsche",
  "renault",
  "seat",
  "skoda",
  "škoda",
  "subaru",
  "suzuki",
  "tesla",
  "toyota",
  "volkswagen",
  "vw",
  "volvo",
] as const;

function includesBrandToken(text: string) {
  const t = text.toLowerCase();
  return BRAND_TOKENS.some((b) => t.includes(b));
}

function getUrlLabel(raw: string) {
  try {
    const u = new URL(raw);
    const host = u.hostname.replace(/^www\./, "");
    const path = u.pathname.length > 1 ? u.pathname : "";
    return { host, path, ok: true };
  } catch {
    return { host: raw, path: "", ok: false };
  }
}

export function DemoCalculator() {
  const t = useTranslations("DemoPage.calculator");
  const searchParams = useSearchParams();
  const [input, setInput] = useState("");
  const [sourceCountry, setSourceCountry] = useState("DE");
  const [status, setStatus] = useState<
    "idle" | "running" | "complete" | "error"
  >("idle");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successAssetVersion, setSuccessAssetVersion] = useState(0);
  const [events, setEvents] = useState<DemoStageEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [exampleCopied, setExampleCopied] = useState(false);
  const exampleCopyResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  function stageCopy(stage?: string) {
    const s = (stage ?? "").toLowerCase();
    if (s.includes("parse")) return t("stages.parsing");
    if (s.includes("compar")) return t("stages.comparing");
    if (s.includes("calcul")) return t("stages.calculating");
    if (s.includes("analy")) return t("stages.analyzing");
    return t("stages.analyzing");
  }

  useEffect(() => {
    if (!helpOpen) {
      const id = window.requestAnimationFrame(() => setExampleCopied(false));
      if (exampleCopyResetRef.current) {
        clearTimeout(exampleCopyResetRef.current);
        exampleCopyResetRef.current = null;
      }
      return () => window.cancelAnimationFrame(id);
    }
    return;
  }, [helpOpen]);

  useEffect(() => {
    if (!helpOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setHelpOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [helpOpen]);

  const latest = events[events.length - 1] ?? null;
  const completeEvent = useMemo(() => {
    const found = [...events].reverse().find((e) => e.stage === "complete");
    return found ?? null;
  }, [events]);

  const signal = completeEvent?.recommendation?.signal ?? null;
  const successDotLottieRef = useRef<DotLottie | null>(null);
  const successCompleteHandlerRef = useRef<(() => void) | null>(null);

  function triggerSuccessAnim() {
    setSuccessAssetVersion((v) => v + 1);
    setShowSuccess(true);
  }

  function bindSuccessRef(next: DotLottie | null) {
    if (successDotLottieRef.current && successCompleteHandlerRef.current) {
      successDotLottieRef.current.removeEventListener(
        "complete",
        successCompleteHandlerRef.current,
      );
    }

    successDotLottieRef.current = next;

    if (!next) {
      successCompleteHandlerRef.current = null;
      return;
    }

    const handler = () => setShowSuccess(false);
    successCompleteHandlerRef.current = handler;
    next.addEventListener("complete", handler);
  }

  async function run() {
    setError(null);
    setEvents([]);
    bindSuccessRef(null);
    setShowSuccess(false);
    setStatus("running");

    const mockMode = searchParams.get("mockDemo");
    const useMock = mockMode && process.env.NODE_ENV !== "production";
    const endpoint = useMock
      ? `/api/demo/calculate/mock?mode=${encodeURIComponent(
          mockMode === "1" ? "success" : mockMode,
        )}`
      : "/api/demo/calculate";

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, sourceCountry }),
        signal: controller.signal,
      });

      const contentType = res.headers.get("content-type") ?? "";

      if (contentType.includes("application/json")) {
        const json = (await res.json().catch(() => null)) as any;
        setStatus("error");
        setError(
          json?.error ||
            json?.message ||
            (res.status === 429
              ? t("errors.limitReached")
              : t("errors.generic")),
        );
        return;
      }

      if (!res.ok || !contentType.includes("text/event-stream") || !res.body) {
        const text = await res.text().catch(() => "");
        setStatus("error");
        setError(text || t("errors.generic"));
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        // Process full lines; keep remainder in buffer.
        const parts = buffer.split(/\n\n/);
        buffer = parts.pop() ?? "";
        for (const part of parts) {
          const next = parseSseDataLines(part);
          if (!next.length) continue;
          setEvents((prev) => [...prev, ...next]);
          if (next.some((e) => e.stage === "complete")) {
            setStatus("complete");
            triggerSuccessAnim();
            controller.abort();
            return;
          }
        }
      }

      setStatus(completeEvent ? "complete" : "error");
      if (completeEvent) triggerSuccessAnim();
      if (!completeEvent) setError(t("errors.noResult"));
    } catch (e) {
      if ((e as any)?.name === "AbortError") return;
      setStatus("error");
      setError(t("errors.genericRetry"));
    }
  }

  function reset() {
    abortRef.current?.abort();
    bindSuccessRef(null);
    setStatus("idle");
    setShowSuccess(false);
    setEvents([]);
    setError(null);
  }

  const hasEnoughInput = input.trim().length >= 10;
  const brandOk = includesBrandToken(input);
  const showBrandError = hasEnoughInput && !brandOk;

  const canRun =
    hasEnoughInput && brandOk && status !== "running" && status !== "complete";

  return (
    <div className="bg-card/80 mt-10 rounded-3xl border p-4 shadow-sm sm:p-5 md:mt-14 md:p-8 lg:p-10">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-chart-1/15 text-chart-1 ring-chart-1/25 flex size-9 min-h-9 min-w-9 shrink-0 items-center justify-center rounded-full ring-1">
            <Calculator className="size-5" aria-hidden />
          </span>
          <div>
            <p className="text-muted-foreground text-xs md:text-sm">
              {t("intro")}
            </p>
          </div>
        </div>

        {status === "running" ? (
          <div className="text-muted-foreground hidden items-center gap-2 text-xs sm:flex">
            <Loader2 className="size-4 animate-spin" aria-hidden />
            {t("running")}
          </div>
        ) : status === "complete" ? (
          <div className="text-muted-foreground hidden items-center gap-2 text-xs sm:flex">
            <CheckCircle2 className="size-4 text-emerald-500" aria-hidden />
            {t("complete")}
          </div>
        ) : null}
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <div className="order-1 flex items-center justify-between gap-3 sm:order-2">
              <button
                type="button"
                onClick={() => setHelpOpen(true)}
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
                disabled={status === "running"}
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
              <Label
                htmlFor="source-country"
                className="text-foreground ml-0.25"
              >
                {t("countryLabel")}
              </Label>
              <Select
                value={sourceCountry}
                onValueChange={setSourceCountry}
                disabled={status === "running"}
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

        {/* Mobile-only: action buttons rendered above the result window. */}
        <div className="flex items-center justify-between gap-2 sm:hidden">
          <Button type="button" onClick={run} disabled={!canRun}>
            {status === "running"
              ? t("calculating")
              : status === "complete"
                ? t("completed")
                : t("calculate")}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={reset}
            disabled={status === "running" || status === "idle"}
            className={status === "idle" ? "invisible" : undefined}
          >
            {t("reset")}
          </Button>
        </div>

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
                  {stageCopy(latest?.stage)}
                </p>
                <div className="flex items-center justify-center py-1">
                  <DotLottieReact
                    src="/lottie/loader.lottie"
                    autoplay
                    loop
                    className="h-44 w-44 sm:h-48 sm:w-48"
                  />
                </div>
                <p className="text-muted-foreground text-xs">
                  {t("runningTip")}
                </p>
              </div>
            ) : status === "error" ? (
              <div className="flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-rose-700 dark:text-rose-300">
                <TriangleAlert className="mt-0.5 size-5" aria-hidden />
                <div>
                  <p className="text-sm font-semibold">{t("errorTitle")}</p>
                  <p className="mt-1 text-sm opacity-90">
                    {error ?? t("errorDefault")}
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
                      {Object.entries(completeEvent.sources).map(
                        ([market, url]) => (
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
                        ),
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-border/60 mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="hidden items-center justify-between gap-2 sm:flex">
          <Button type="button" onClick={run} disabled={!canRun}>
            {status === "running"
              ? t("calculating")
              : status === "complete"
                ? t("completed")
                : t("calculate")}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={reset}
            disabled={status === "running" || status === "idle"}
            className={status === "idle" ? "invisible" : undefined}
          >
            {t("reset")}
          </Button>
        </div>

        <div className="space-y-1 text-pretty">
          <p className="text-muted-foreground mt-2 text-xs sm:mt-0 md:text-xs">
            {t("rateLimitNotice")}
          </p>
          <p className="text-muted-foreground mt-2 text-xs">
            {t("privacyAgreement")}{" "}
            <Link href="/privacy" className="underline underline-offset-4">
              {t("privacyLink")}
            </Link>
            .
          </p>
          <p className="text-muted-foreground mt-2 text-xs">
            {t("abuseNotice")}
          </p>
        </div>
      </div>

      {helpOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={t("help.dialogAria")}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setHelpOpen(false);
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
                onClick={() => setHelpOpen(false)}
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
                        exampleCopied
                          ? t("help.copiedAria")
                          : t("help.copyAria")
                      }
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(DEMO_CAR_EXAMPLE);
                          setExampleCopied(true);
                          if (exampleCopyResetRef.current) {
                            clearTimeout(exampleCopyResetRef.current);
                          }
                          exampleCopyResetRef.current = setTimeout(() => {
                            setExampleCopied(false);
                            exampleCopyResetRef.current = null;
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
              <Button
                type="button"
                variant="outline"
                onClick={() => setHelpOpen(false)}
              >
                {t("help.ok")}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
