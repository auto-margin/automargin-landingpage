"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  Calculator,
  CheckCircle2,
  Info,
  Loader2,
  TriangleAlert,
  X,
} from "lucide-react";

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
  const searchParams = useSearchParams();
  const [input, setInput] = useState("");
  const [sourceCountry, setSourceCountry] = useState("DE");
  const [status, setStatus] = useState<
    "idle" | "running" | "complete" | "error"
  >("idle");
  const [events, setEvents] = useState<DemoStageEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

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
  const signalTone =
    signal === "MUSTHAVE" || signal === "YES"
      ? "bg-emerald-500/12 text-emerald-700 ring-emerald-500/20 dark:text-emerald-300"
      : signal === "MAYBE"
        ? "bg-amber-500/12 text-amber-700 ring-amber-500/20 dark:text-amber-300"
        : signal === "NO"
          ? "bg-rose-500/12 text-rose-700 ring-rose-500/20 dark:text-rose-300"
          : "bg-muted/40 text-muted-foreground ring-border";

  async function run() {
    setError(null);
    setEvents([]);
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
              ? "Rate limit reached. Please try again later."
              : "Unable to run demo right now."),
        );
        return;
      }

      if (!res.ok || !contentType.includes("text/event-stream") || !res.body) {
        const text = await res.text().catch(() => "");
        setStatus("error");
        setError(text || "Unable to run demo right now.");
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
            controller.abort();
            return;
          }
        }
      }

      setStatus(completeEvent ? "complete" : "error");
      if (!completeEvent) setError("No result was returned. Please try again.");
    } catch (e) {
      if ((e as any)?.name === "AbortError") return;
      setStatus("error");
      setError("Unable to run demo right now. Please try again.");
    }
  }

  function reset() {
    abortRef.current?.abort();
    setStatus("idle");
    setEvents([]);
    setError(null);
  }

  const canRun = input.trim().length >= 10 && status !== "running";

  return (
    <div className="bg-card/80 mt-10 rounded-3xl border p-5 shadow-sm md:mt-14 md:p-8 lg:p-10">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-chart-1/15 text-chart-1 ring-chart-1/25 flex size-9 items-center justify-center rounded-full ring-1">
            <Calculator className="size-5" aria-hidden />
          </span>
          <div>
            <h2 className="text-base font-semibold md:text-lg">
              Price validation demo
            </h2>
            <p className="text-muted-foreground text-xs md:text-sm">
              Paste a car offer. We’ll stream the analysis and show the result.
            </p>
          </div>
        </div>

        {status === "running" ? (
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Running…
          </div>
        ) : status === "complete" ? (
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <CheckCircle2 className="size-4 text-emerald-500" aria-hidden />
            Complete
          </div>
        ) : null}
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="demo-input" className="text-foreground">
              Enter vehicle
            </Label>
            <Textarea
              id="demo-input"
              rows={6}
              placeholder="Details about the vehicle…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={800}
              className="resize-none"
              disabled={status === "running"}
            />
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setHelpOpen(true)}
                className="text-foreground hover:bg-muted/40 inline-flex items-center gap-2 rounded-md py-2 text-sm font-semibold underline underline-offset-4 opacity-90 hover:opacity-100"
                aria-haspopup="dialog"
                aria-expanded={helpOpen}
              >
                <Info className="text-chart-1 size-5" aria-hidden />
                What should I include?
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr),minmax(0,1fr)]">
            <div className="space-y-2">
              <Label htmlFor="source-country" className="text-foreground">
                Country to compare from
              </Label>
              <Select
                value={sourceCountry}
                onValueChange={setSourceCountry}
                disabled={status === "running"}
              >
                <SelectTrigger id="source-country" className="w-full">
                  <SelectValue placeholder="Choose country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DE">DE — Germany</SelectItem>
                  <SelectItem value="CH">CH — Switzerland</SelectItem>
                  <SelectItem value="BE">BE — Belgium</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-muted-foreground text-xs leading-relaxed md:text-sm">
              <p>We compare against live listings.</p>
              <p>We estimate resale + margin by market.</p>
            </div>
          </div>
        </div>

        <div className="border-border/60 bg-muted/20 rounded-2xl border p-5">
          <p className="text-foreground text-sm font-semibold">Result</p>

          {status === "idle" ? (
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              Paste an offer and run the demo to see a streamed result here.
            </p>
          ) : status === "running" ? (
            <div className="mt-4 space-y-3">
              <p className="text-muted-foreground text-sm">
                Working… showing latest stage as it arrives.
              </p>
              <div className="border-border/60 rounded-xl border p-4">
                <p className="text-foreground text-sm font-medium">
                  Latest stage
                </p>
                <p className="text-muted-foreground mt-1 text-sm">
                  {latest?.stage ?? "processing"}
                </p>
              </div>
              <p className="text-muted-foreground text-xs">
                Tip: if nothing happens, you may have reached the demo limit or
                the backend endpoint is unavailable.
              </p>
            </div>
          ) : status === "error" ? (
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-rose-700 dark:text-rose-300">
              <TriangleAlert className="mt-0.5 size-5" aria-hidden />
              <div>
                <p className="text-sm font-semibold">Couldn’t run demo</p>
                <p className="mt-1 text-sm opacity-90">
                  {error ?? "Please try again."}
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span
                  className={[
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1",
                    signalTone,
                  ].join(" ")}
                >
                  {signal ?? "Result"}
                </span>
                {completeEvent?.savedCarId ? (
                  <span className="text-muted-foreground text-xs">
                    Saved: #{completeEvent.savedCarId}
                  </span>
                ) : null}
              </div>

              {completeEvent?.recommendation?.text ? (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {completeEvent.recommendation.text}
                </p>
              ) : null}

              {completeEvent?.markets ? (
                <div className="space-y-2">
                  <p className="text-foreground text-sm font-semibold">
                    Markets
                  </p>
                  <div className="grid gap-2">
                    {Object.entries(completeEvent.markets).map(([key, m]) => (
                      <div
                        key={key}
                        className="border-border/60 bg-background/40 flex items-center justify-between rounded-xl border px-3 py-2"
                      >
                        <div className="min-w-0">
                          <p className="text-foreground text-sm font-semibold">
                            {key}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {m.signal ?? "—"} · sample{" "}
                            {m.listings?.sampleSize ?? "—"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-foreground text-sm font-semibold tabular-nums">
                            {formatMoney(m.profit, m.currency)}
                          </p>
                          <p className="text-muted-foreground text-xs tabular-nums">
                            {m.profitPct != null
                              ? `${m.profitPct.toFixed(1)}%`
                              : "—"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {completeEvent?.sources ? (
                <div className="space-y-2">
                  <p className="text-foreground text-sm font-semibold">
                    Sources
                  </p>
                  <div className="space-y-2">
                    {Object.entries(completeEvent.sources).map(
                      ([market, url]) => (
                        <a
                          key={market}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border-border/60 bg-background/40 hover:bg-background/55 group flex items-center justify-between gap-3 rounded-xl border px-3 py-2 transition-colors"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="bg-muted/40 text-muted-foreground ring-border inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ring-1">
                                {market}
                              </span>
                              <span className="text-foreground truncate text-sm font-semibold">
                                {getUrlLabel(url).host}
                              </span>
                            </div>
                          </div>

                          <span className="text-chart-1 shrink-0 text-sm font-semibold group-hover:opacity-80">
                            Open
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

      <div className="border-border/60 mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-muted-foreground text-xs md:text-sm">
            Limited to one demo run per IP / 24 hours.
          </p>
          <div className="text-muted-foreground text-xs">
            <p>
              By running the demo, you agree to our{" "}
              <Link href="/privacy" className="underline underline-offset-4">
                privacy policy.
              </Link>
            </p>
            <p className="mt-1">
              We may log requests and apply rate limits to prevent abuse.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {status !== "idle" ? (
            <Button
              type="button"
              variant="outline"
              onClick={reset}
              disabled={status === "running"}
            >
              Reset
            </Button>
          ) : null}
          <Button type="button" onClick={run} disabled={!canRun}>
            {status === "running" ? "Calculating…" : "Calculate profit"}
          </Button>
        </div>
      </div>

      {helpOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Car description help"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setHelpOpen(false);
          }}
        >
          <div className="bg-background text-foreground border-border w-full max-w-lg rounded-2xl border shadow-xl">
            <div className="border-border flex items-start justify-between gap-3 border-b px-5 py-4">
              <div>
                <p className="text-sm font-semibold">What to paste</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  The more detail, the better the validation.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setHelpOpen(false)}
                className="text-muted-foreground hover:text-foreground hover:bg-muted/40 inline-flex size-9 items-center justify-center rounded-lg"
                aria-label="Close"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>

            <div className="px-5 py-4">
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold">Recommended fields</p>
                  <ul className="text-muted-foreground mt-2 list-disc space-y-1 pl-5">
                    <li>Brand + model + year</li>
                    <li>Mileage</li>
                    <li>Fuel type + transmission</li>
                    <li>Asking price + currency</li>
                    <li>Any notable options / trim</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold">Example</p>
                  <div className="bg-muted/30 border-border mt-2 rounded-xl border px-3 py-2 font-mono text-xs leading-relaxed">
                    BMW X5 2020 30d xDrive, 85,000 km, diesel, automatic, asking
                    price 32,000 EUR
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
                OK
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
