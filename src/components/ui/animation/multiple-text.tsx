"use client";

import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const DEFAULT_PHRASES = [
  "Saving to database...",
  "Matching market data...",
  "Calculating prices...",
  "Parsing results...",
  "Finalizing analysis...",
];

const FADE_MS = 250;
const DEFAULT_INTERVAL_MS = 3000;

type MultipleTextProps = {
  /** Phrases to rotate through. */
  phrases?: string[];
  /** Time each phrase is visible (ms) before starting fade to next. */
  intervalMs?: number;
  className?: string;
};

export const MultipleText = ({
  phrases = DEFAULT_PHRASES,
  intervalMs = DEFAULT_INTERVAL_MS,
  className,
}: MultipleTextProps) => {
  const [index, setIndex] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);

  const advance = useCallback(() => {
    if (phrases.length <= 1) return;
    setIsLeaving(true);
  }, [phrases.length]);

  useEffect(() => {
    if (phrases.length <= 1) return;
    const id = setInterval(advance, intervalMs);
    return () => clearInterval(id);
  }, [phrases.length, intervalMs, advance]);

  useEffect(() => {
    if (!isLeaving) return;
    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % phrases.length);
      setIsLeaving(false);
    }, FADE_MS);
    return () => clearTimeout(id);
  }, [isLeaving, phrases.length]);

  if (phrases.length === 0) return null;

  return (
    <span
      className={cn(
        "inline-block transition-opacity duration-200 ease-out",
        isLeaving && "opacity-0",
        className,
      )}
      aria-live="polite"
      aria-label={phrases[index]}
    >
      {phrases[index]}
    </span>
  );
};
