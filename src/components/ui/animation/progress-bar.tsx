"use client";

import { cn } from "@/lib/utils";

type ProgressBarProps = {
  /** Fixed fill width for "loading" look (0–100). Not animated to completion. */
  fillWidth?: number;
  className?: string;
  trackClassName?: string;
  fillClassName?: string;
};

export const ProgressBar = ({
  fillWidth = 42,
  className,
  trackClassName,
  fillClassName,
}: ProgressBarProps) => {
  const width = Math.min(100, Math.max(0, fillWidth));

  return (
    <div
      className={cn(
        "h-1.5 w-full overflow-hidden rounded-full lg:h-2.5",
        trackClassName ?? "bg-muted/60",
        className,
      )}
      role="progressbar"
      aria-valuenow={width}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading"
    >
      <div
        className={cn(
          "relative h-full overflow-hidden rounded-full bg-orange-500 transition-[width] duration-1000 ease-linear",
          fillClassName,
        )}
        style={{ width: `${width}%` }}
      >
        {/* Shimmer overlay: light stripe that moves across */}
        <span
          className="absolute inset-0 rounded-full bg-[length:200%_100%] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.35)_50%,transparent_100%)] bg-[position:200%_0] animate-[progress-shimmer_1.8s_ease-in-out_infinite]"
          aria-hidden
        />
      </div>
    </div>
  );
};
