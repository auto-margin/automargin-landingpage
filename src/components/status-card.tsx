"use client";

import { useState } from "react";

import { ChevronDown } from "lucide-react";

import { MultipleText } from "@/components/ui/animation/multiple-text";
import { NumberCounting } from "@/components/ui/animation/number-counting";
import { ProgressBar } from "@/components/ui/animation/progress-bar";
import { SpinnerLoader } from "@/components/ui/animation/spinner-loader";
import { cn } from "@/lib/utils";

type StatusCardProps = {
  className?: string;
  activeCount?: number;
  statusLabel?: string;
  /** Total duration in seconds for 1→100 (1 real second per step = 99s). */
  countDuration?: number;
};

export const StatusCard = ({
  className,
  activeCount = 1,
  statusLabel = "Processing — 98 cars to database...",
  countDuration = 99,
}: StatusCardProps) => {
  const [progress, setProgress] = useState(1);

  return (
    <div
      className={cn(
        "dark:bg-card relative shrink-0 overflow-hidden rounded-xl bg-white shadow-lg",
        "w-[248px] max-lg:text-xs sm:w-[288px] lg:w-[332px] lg:text-sm xl:w-[372px]",
        className,
      )}
    >
      {/* Blue left accent */}
      <div
        className="absolute top-0 left-0 h-full w-0.5 rounded-l-xl rounded-r-sm bg-blue-500 lg:w-1"
        aria-hidden
      />

      <div className="py-2.5 pr-3 pl-3.5 lg:py-4 lg:pr-4 lg:pl-5">
        {/* Top row: active instance + chevron */}
        <div className="flex items-center justify-between gap-1">
          <span className="text-muted-foreground truncate text-xs lg:text-sm">
            {activeCount} active instance{activeCount !== 1 ? "s" : ""}
          </span>
          <button
            type="button"
            className="text-foreground/70 hover:text-foreground shrink-0 rounded p-0.5 transition-colors"
            aria-label="Expand"
          >
            <ChevronDown className="size-4" />
          </button>
        </div>

        {/* Middle row: spinner + main status + time */}
        <div className="mt-1.5 flex items-center gap-2 lg:mt-2.5">
          <SpinnerLoader size="sm" className="shrink-0" />
          <span className="text-foreground min-w-0 truncate text-xs leading-tight font-semibold lg:text-sm">
            {statusLabel}
          </span>
          <span className="text-muted-foreground ml-auto flex shrink-0 items-center gap-0.5 text-xs lg:text-sm">
            <NumberCounting duration={countDuration} onTick={setProgress} />s
          </span>
        </div>

        {/* Bottom: progress label + bar + percent */}
        <div className="mt-2.5 lg:mt-3.5">
          <span className="text-muted-foreground text-xs lg:text-sm">
            <MultipleText />
          </span>
          <ProgressBar fillWidth={progress} className="mt-1.5 lg:mt-2" />
          <span className="text-foreground mt-1 text-xs font-medium lg:mt-1.5 lg:text-sm">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
};
