"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { ChevronLeft, Gauge, PencilLine, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { buildAnalysis } from "@/features/demo/analysis";
import { trackDemoEvent } from "@/features/demo/analytics";
import { DemoForm } from "@/features/demo/components/demo-form";
import { DemoResult } from "@/features/demo/components/demo-result";
import { RunProgress } from "@/features/demo/components/run-progress";
import { RunErrorPanel } from "@/features/demo/components/run-states";
import { SuccessFlourish } from "@/features/demo/components/success-flourish";
import type { DemoStageEvent } from "@/features/demo/contract";
import {
  type DemoFormValues,
  EMPTY_FORM,
  getDraftSnapshot,
  getServerDraftSnapshot,
  isDemoInputReady,
  parseDraft,
  resolveCarInput,
  subscribeToDraft,
  writeDraft,
} from "@/features/demo/form-model";
import { useDemoFormatters } from "@/features/demo/format";
import { DEFAULT_SOURCE_MARKET } from "@/features/demo/markets";
import { useDemoRun } from "@/features/demo/use-demo-run";

type Phase = "form" | "running" | "flourish" | "result" | "error";

export function DemoExperience() {
  const t = useTranslations("DemoPage.workspace");
  const tForm = useTranslations("DemoPage.form");
  const format = useDemoFormatters();

  // The stored draft seeds the first render only; once the visitor touches the
  // form, `edited` owns the values.
  const draftSnapshot = useSyncExternalStore(
    subscribeToDraft,
    getDraftSnapshot,
    getServerDraftSnapshot,
  );
  const [edited, setEdited] = useState<DemoFormValues | null>(null);
  const restored = useMemo(() => parseDraft(draftSnapshot), [draftSnapshot]);
  const values = edited ?? restored ?? EMPTY_FORM;

  const [acknowledged, setAcknowledged] = useState<DemoStageEvent | null>(null);
  const [editing, setEditing] = useState(false);

  const { state, run, cancel, reset } = useDemoRun();

  const trackedResultRef = useRef<DemoStageEvent | null>(null);
  const trackedErrorRef = useRef<string | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  /** Keeps form → running → flourish at one height so the card does not jump. */
  const [stageMinHeight, setStageMinHeight] = useState<number | null>(null);

  const patch = useCallback(
    (changes: Partial<DemoFormValues>) => {
      setEdited((prev) => {
        const next = { ...(prev ?? restored ?? EMPTY_FORM), ...changes };
        writeDraft(next);
        return next;
      });
    },
    [restored],
  );

  const replace = useCallback((next: DemoFormValues) => {
    setEdited(next);
    writeDraft(next);
  }, []);

  // Remounting the form on clear throws away its touched/error bookkeeping,
  // which used to be reset by the button that now lives outside it.
  const [formEpoch, setFormEpoch] = useState(0);

  const clear = useCallback(() => {
    // Keep the active input mode — Clear empties data, it should not yank
    // the visitor back to the default "Fill fields" tab.
    const next = { ...EMPTY_FORM, inputMode: values.inputMode };
    setEdited(next);
    writeDraft(next);
    setFormEpoch((epoch) => epoch + 1);
  }, [values.inputMode]);

  const isPristine = useMemo(() => {
    const emptied = { ...EMPTY_FORM, inputMode: values.inputMode };
    return JSON.stringify(values) === JSON.stringify(emptied);
  }, [values]);

  const submit = useCallback(
    (snapshot?: DemoFormValues) => {
      const next = snapshot ?? values;
      if (!isDemoInputReady(next)) return;
      const carInput = resolveCarInput(next);
      trackDemoEvent("demo_run_started", {
        market: DEFAULT_SOURCE_MARKET,
        brand: (next.brand || carInput).slice(0, 40),
        mode: next.inputMode,
      });
      setEditing(false);
      setAcknowledged(null);
      void run({
        carInput,
        sourceCountry: DEFAULT_SOURCE_MARKET,
      });
    },
    [run, values],
  );

  // Report the outcome once per run. No state is touched here, so the effect
  // stays a pure side-channel to analytics.
  useEffect(() => {
    if (state.status !== "success" || !state.result) return;
    if (trackedResultRef.current === state.result) return;
    trackedResultRef.current = state.result;
    trackDemoEvent("demo_run_completed", {
      cached: state.result.cached === true,
      markets: state.result.markets?.length ?? 0,
    });
  }, [state.status, state.result]);

  useEffect(() => {
    if (state.status !== "error" || !state.errorKind) return;
    if (trackedErrorRef.current === state.errorKind) return;
    trackedErrorRef.current = state.errorKind;
    trackDemoEvent("demo_run_failed", { reason: state.errorKind });
  }, [state.status, state.errorKind]);

  const result = state.status === "success" ? state.result : null;
  const flourishing = result != null && acknowledged !== result;

  const phase: Phase = editing
    ? "form"
    : state.status === "running"
      ? "running"
      : state.status === "error"
        ? "error"
        : result
          ? flourishing
            ? "flourish"
            : "result"
          : "form";

  // Capture the form stage height and reuse it for running / flourish / result,
  // so those phases keep the same card footprint. Expanding a market row can
  // still grow past this floor.
  useLayoutEffect(() => {
    if (phase !== "form") return;
    const node = stageRef.current;
    if (!node) return;

    const measure = () => {
      const next = Math.round(node.getBoundingClientRect().height);
      if (next > 0) setStageMinHeight(next);
    };

    measure();
    const raf = window.requestAnimationFrame(measure);
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measure)
        : null;
    ro?.observe(node);
    window.addEventListener("resize", measure);
    return () => {
      window.cancelAnimationFrame(raf);
      ro?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [phase, formEpoch, values.inputMode]);

  // Running/flourish stay locked to the form footprint. Result uses the same
  // floor as minHeight only — expanding a market row must grow the card, not
  // introduce an inner scrollbar.
  const pinExactHeight = phase === "running" || phase === "flourish";
  const floorStageHeight = pinExactHeight || phase === "result";

  const analysis = useMemo(
    () => (result ? buildAnalysis(result) : null),
    [result],
  );

  const summaryLine = [
    values.brand,
    values.model,
    values.regYear,
    values.mileage ? `${values.mileage} km` : "",
  ]
    .filter(Boolean)
    .join(" · ");

  const startOver = () => {
    reset();
    setEditing(false);
    setAcknowledged(null);
  };

  const editInputs = () => {
    setEditing(true);
    setAcknowledged(result);
  };

  const mobileTitle =
    phase === "form"
      ? tForm("vehicleTitle")
      : phase === "result" && summaryLine
        ? summaryLine
        : phase === "result" || phase === "error"
          ? t("titleResult")
          : t("titleAnalysis");

  const mobileSubtitle =
    phase === "result" && summaryLine ? t("titleResult") : null;

  return (
    <div className="border-border/60 bg-card/70 mt-8 rounded-3xl border px-4 py-4 shadow-sm sm:p-6 md:mt-10 lg:p-8">
      <div
        ref={stageRef}
        className={floorStageHeight ? "flex min-h-0 flex-col" : undefined}
        style={
          floorStageHeight && stageMinHeight
            ? pinExactHeight
              ? {
                  height: stageMinHeight,
                  minHeight: stageMinHeight,
                  overflow: "hidden",
                }
              : { minHeight: stageMinHeight }
            : undefined
        }
      >
        {/* Mobile: title + actions as one quiet toolbar (desktop uses the row below).
            Hidden while the run animation plays so the loader stays centered. */}
        {phase === "running" || phase === "flourish" ? null : (
          <div className="mb-5 flex items-center justify-between gap-3 sm:hidden">
            <div className="min-w-0">
              {mobileSubtitle ? (
                <p className="text-muted-foreground text-xs">{mobileSubtitle}</p>
              ) : null}
              <p
                className={
                  mobileSubtitle
                    ? "text-foreground truncate text-sm font-semibold tracking-tight"
                    : "text-foreground truncate text-base font-semibold tracking-tight"
                }
              >
                {mobileTitle}
              </p>
            </div>

            {phase === "form" ? (
              <div className="bg-muted/60 flex shrink-0 items-center rounded-xl p-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground h-8 gap-1.5 rounded-lg px-2.5 text-xs"
                  disabled={isPristine}
                  onClick={clear}
                >
                  <RotateCcw className="size-3.5" aria-hidden />
                  {tForm("clear")}
                </Button>
              </div>
            ) : (
              <div className="bg-muted/60 flex shrink-0 items-center gap-0.5 rounded-xl p-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground size-8 rounded-lg"
                  onClick={editInputs}
                  aria-label={t("editInputs")}
                >
                  <PencilLine className="size-3.5" aria-hidden />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground size-8 rounded-lg"
                  onClick={startOver}
                  aria-label={t("startOver")}
                >
                  <RotateCcw className="size-3.5" aria-hidden />
                </Button>
              </div>
            )}
          </div>
        )}

        {phase === "running" || phase === "flourish" ? null : (
          <div className="mb-6 hidden items-center justify-between gap-3 sm:flex">
            <div className="min-w-0 flex-1 items-center gap-3 sm:flex">
              <span className="bg-primary/10 text-primary ring-primary/20 dark:text-foreground flex size-9 shrink-0 items-center justify-center rounded-full ring-1">
                <Gauge className="size-4.5" aria-hidden />
              </span>
              <div className="min-w-0">
                {/* The form already carries its own "Enter vehicle" heading, so the
                    input phase gets one plain intro line instead of a second
                    title/subtitle pair stacked on top of it. */}
                {phase === "form" ? (
                  <p className="text-muted-foreground text-sm text-pretty">
                    {t("intro")}
                  </p>
                ) : (
                  <>
                    <p className="text-foreground truncate text-sm font-semibold">
                      {t("titleAnalysis")}
                    </p>
                    <p className="text-muted-foreground truncate text-xs">
                      {phase === "result"
                        ? t("subtitleAnalysis")
                        : summaryLine || t("subtitleAnalysis")}
                    </p>
                  </>
                )}
              </div>
            </div>

            {phase === "form" ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground h-9 gap-1.5 px-3"
                disabled={isPristine}
                onClick={clear}
              >
                <RotateCcw className="size-3.5" aria-hidden />
                {tForm("clear")}
              </Button>
            ) : (
              <div className="flex shrink-0 items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-9 gap-1.5 px-3"
                  onClick={editInputs}
                >
                  <PencilLine className="size-3.5" aria-hidden />
                  {t("editInputs")}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground h-9 gap-1.5 px-3"
                  onClick={startOver}
                >
                  <RotateCcw className="size-3.5" aria-hidden />
                  {t("startOver")}
                </Button>
              </div>
            )}
          </div>
        )}

        <div
          className={
            pinExactHeight
              ? "flex min-h-0 flex-1 flex-col overflow-hidden"
              : floorStageHeight
                ? "flex min-h-0 flex-1 flex-col"
                : undefined
          }
        >
          {phase === "form" ? (
            <div className="space-y-5">
              {result ? (
                <div className="border-border/60 bg-muted/20 flex flex-wrap items-center justify-between gap-3 rounded-xl border px-4 py-3">
                  <p className="text-muted-foreground text-xs">
                    {t("resultKept")}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-9 gap-1.5"
                    onClick={() => setEditing(false)}
                  >
                    <ChevronLeft className="size-3.5" aria-hidden />
                    {t("backToResult")}
                  </Button>
                </div>
              ) : null}

              <DemoForm
                key={formEpoch}
                values={values}
                onChange={patch}
                onSubmit={submit}
                onReplace={replace}
                disabled={state.status === "running"}
              />
            </div>
          ) : phase === "running" ? (
            <RunProgress
              stageIndex={state.stageIndex}
              startedAt={state.startedAt}
              onCancel={cancel}
            />
          ) : phase === "flourish" ? (
            <SuccessFlourish onDone={() => setAcknowledged(result)} />
          ) : phase === "error" && state.errorKind ? (
            <RunErrorPanel
              errorKind={state.errorKind}
              onRetry={submit}
              onEdit={editInputs}
            />
          ) : analysis ? (
            <DemoResult
              analysis={analysis}
              format={format}
              onCompareClick={(marketCode) =>
                trackDemoEvent("demo_comparison_opened", { market: marketCode })
              }
              onCtaClick={(target) =>
                trackDemoEvent("demo_cta_click", { target })
              }
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
