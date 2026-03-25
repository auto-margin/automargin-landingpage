"use client";

import { useEffect, useRef, useState } from "react";

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
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const [isActive, setIsActive] = useState(() => {
    // Fallback for very old browsers/environments.
    // In that case we just start immediately.
    return typeof IntersectionObserver === "undefined";
  });

  // Start the timer only when the number becomes visible in the viewport.
  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isActive) return;
    onTick?.(value);
  }, [isActive, value, onTick]);

  useEffect(() => {
    if (!isActive) return;
    const steps = MAX - MIN;
    const stepMs = (duration * 1000) / steps;
    const id = setInterval(() => {
      setValue((prev) => (prev >= MAX ? MIN : prev + 1));
    }, stepMs);
    return () => clearInterval(id);
  }, [duration, isActive]);

  return (
    <span
      ref={spanRef}
      className={cn("inline-block tabular-nums", className)}
      aria-live="polite"
      aria-label={`${value} seconds`}
    >
      {value}
    </span>
  );
};
