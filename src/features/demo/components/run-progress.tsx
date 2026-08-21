"use client";

import { useEffect, useState } from "react";

import dynamic from "next/dynamic";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { RUN_STAGES } from "@/features/demo/use-demo-run";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((m) => m.DotLottieReact),
  { ssr: false },
);

/** After this long the run is still healthy, but silence starts to feel broken. */
const SLOW_AFTER_MS = 45_000;

function ElapsedReadout({
  startedAt,
  slowLabel,
}: {
  startedAt: number | null;
  slowLabel: string;
}) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (startedAt == null) return;
    const tick = () => {
      const now =
        typeof performance !== "undefined" ? performance.now() : Date.now();
      setElapsed(Math.max(0, now - startedAt));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startedAt]);

  const seconds = Math.floor(elapsed / 1000);
  const label = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
    seconds % 60,
  ).padStart(2, "0")}`;

  return (
    <div className="flex flex-col items-center gap-1">
      <p className="text-muted-foreground text-xs tabular-nums">{label}</p>
      {elapsed >= SLOW_AFTER_MS ? (
        <p className="text-muted-foreground max-w-xs text-center text-xs">
          {slowLabel}
        </p>
      ) : null}
    </div>
  );
}

type RunProgressProps = {
  stageIndex: number;
  startedAt: number | null;
  onCancel: () => void;
};

export function RunProgress({
  stageIndex,
  startedAt,
  onCancel,
}: RunProgressProps) {
  const t = useTranslations("DemoPage.run");
  const total = RUN_STAGES.length;
  const current = Math.min(stageIndex, total - 1);
  const percent = Math.round(((current + 1) / total) * 100);
  const stageLabel = t(`stages.${RUN_STAGES[current]}`);

  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 py-2 sm:gap-6 sm:py-6">
      <div className="flex size-28 items-center justify-center sm:size-48">
        <DotLottieReact
          src="/lottie/loader.lottie"
          autoplay
          loop
          className="size-full"
        />
      </div>

      <div className="w-full max-w-md space-y-2 text-center sm:space-y-3">
        <p
          className="text-foreground text-sm font-semibold sm:text-base"
          aria-live="polite"
        >
          {stageLabel}
        </p>
        <p className="text-muted-foreground text-xs sm:text-sm">
          {t("stepCounter", { current: current + 1, total })}
        </p>

        <div
          className="bg-muted/60 h-1.5 w-full overflow-hidden rounded-full"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          aria-label={t("progressLabel")}
        >
          <div
            className="bg-primary h-full rounded-full transition-[width] duration-700 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>

        <ElapsedReadout startedAt={startedAt} slowLabel={t("slow")} />
      </div>

      <div className="flex flex-col items-center gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          {t("cancel")}
        </Button>
        <p className="text-muted-foreground max-w-sm text-center text-xs">
          {t("keepOpen")}
        </p>
      </div>
    </div>
  );
}
