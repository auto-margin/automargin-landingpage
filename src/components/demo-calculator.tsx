"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useSearchParams } from "next/navigation";

import { Calculator } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  ActionButtons,
  DemoHeader,
  DemoInputPanel,
  HelpDialog,
  ResultPanel,
} from "@/components/demo-calculator-components";
import { getDemoEndpoint, streamDemoEvents } from "@/components/demo-calculator-runner";
import {
  type DemoStageEvent,
  includesBrandToken,
} from "@/components/demo-calculator-utils";
import { Link } from "@/i18n/navigation";


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
  const successDotLottieRef = useRef<any>(null);
  const successCompleteHandlerRef = useRef<(() => void) | null>(null);

  function triggerSuccessAnim() {
    setSuccessAssetVersion((v) => v + 1);
    setShowSuccess(true);
  }

  function bindSuccessRef(next: any) {
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

    const endpoint = getDemoEndpoint(searchParams);

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

      const streamResult = await streamDemoEvents(res, (next) => {
        if (!next.length) return;
        setEvents((prev) => [...prev, ...next]);
        if (next.some((e) => e.stage === "complete")) {
          setStatus("complete");
          triggerSuccessAnim();
          controller.abort();
        }
      });

      if (!streamResult.ok) {
        setStatus("error");
        setError(streamResult.errorText || t("errors.generic"));
        return;
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
      <DemoHeader
        icon={<Calculator className="size-5" aria-hidden />}
        intro={t("intro")}
        statusLabel={
          status === "running"
            ? { icon: "spinner", text: t("running") }
            : status === "complete"
              ? { icon: "check", text: t("complete") }
              : undefined
        }
      />

      <div className="grid gap-8 sm:grid-cols-2">
        <DemoInputPanel
          t={(key) => t(key as any)}
          input={input}
          setInput={setInput}
          showBrandError={showBrandError}
          onOpenHelp={() => setHelpOpen(true)}
          helpOpen={helpOpen}
          statusRunning={status === "running"}
          sourceCountry={sourceCountry}
          setSourceCountry={setSourceCountry}
        />

        {/* Mobile-only: action buttons rendered above the result window. */}
        <ActionButtons
          t={(key) => t(key as any)}
          canRun={canRun}
          status={status}
          onRun={run}
          onReset={reset}
          className="sm:hidden"
          hideOnIdle
        />

        <ResultPanel
          t={(key) => t(key as any)}
          status={status}
          latestStageText={stageCopy(latest?.stage)}
          errorText={error}
          showSuccess={showSuccess}
          successAssetVersion={successAssetVersion}
          bindSuccessRef={bindSuccessRef}
          completeEvent={completeEvent}
        />
      </div>

      <div className="border-border/60 mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
        <ActionButtons
          t={(key) => t(key as any)}
          canRun={canRun}
          status={status}
          onRun={run}
          onReset={reset}
          className="hidden sm:flex"
          hideOnIdle
        />

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

      <HelpDialog
        t={(key) => t(key as any)}
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        exampleCopied={exampleCopied}
        setExampleCopied={setExampleCopied}
      />
    </div>
  );
}
