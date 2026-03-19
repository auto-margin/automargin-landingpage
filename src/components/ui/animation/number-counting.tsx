"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const MIN = 1;
const MAX = 100;

type NumberCountingProps = {
  /** Total duration in seconds for 1→100 (99s = 1 real second per step). */
  duration?: number;
  /** Called when the count updates (e.g. to sync a progress bar). */
  onTick?: (value: number) => void;
  className?: string;
};

export const NumberCounting = ({
  duration = 99,
  onTick,
  className,
}: NumberCountingProps) => {
  const [value, setValue] = useState(MIN);

  useEffect(() => {
    onTick?.(value);
  }, [value, onTick]);

  useEffect(() => {
    const steps = MAX - MIN;
    const stepMs = (duration * 1000) / steps;
    const id = setInterval(() => {
      setValue((prev) => (prev >= MAX ? MIN : prev + 1));
    }, stepMs);
    return () => clearInterval(id);
  }, [duration]);

  return (
    <span
      className={cn("inline-block tabular-nums", className)}
      aria-live="polite"
      aria-label={`${value} seconds`}
    >
      {value}
    </span>
  );
};
