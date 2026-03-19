"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Animation variant: "fade-up" (default) or "zoom" (scale + opacity). */
  variant?: "fade-up" | "zoom";
  /** Only trigger animation after user has scrolled (not on initial load if already in view). */
  onlyAfterScroll?: boolean;
  /** When onlyAfterScroll: min scroll Y (px) before animation can trigger. Default 120. */
  scrollThreshold?: number;
  /** Root margin for Intersection Observer (e.g. "0px 0px -50px 0px" = trigger when 50px from bottom of viewport). */
  rootMargin?: string;
  /** Threshold 0–1, e.g. 0.2 = trigger when 20% visible. */
  threshold?: number;
};

const variantClasses = {
  "fade-up": "scroll-reveal-fade-in-up",
  zoom: "scroll-reveal-zoom-in",
};

const DEFAULT_SCROLL_THRESHOLD_PX = 120;

export function ScrollReveal({
  children,
  className,
  variant = "fade-up",
  onlyAfterScroll = false,
  scrollThreshold = DEFAULT_SCROLL_THRESHOLD_PX,
  rootMargin = "0px 0px -80px 0px",
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const intersectingRef = useRef(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (!onlyAfterScroll) return;

    const onScroll = () => {
      if (window.scrollY > scrollThreshold) {
        setHasScrolled(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onlyAfterScroll, scrollThreshold]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          intersectingRef.current = entry.isIntersecting;
          if (entry.isIntersecting && (!onlyAfterScroll || hasScrolled)) {
            el.classList.add("is-visible");
          }
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, onlyAfterScroll, hasScrolled]);

  // When user scrolls for the first time, reveal if element is already in view
  useEffect(() => {
    if (!onlyAfterScroll || !hasScrolled) return;
    const el = ref.current;
    if (el && intersectingRef.current) {
      el.classList.add("is-visible");
    }
  }, [onlyAfterScroll, hasScrolled]);

  return (
    <div ref={ref} className={cn(variantClasses[variant], className)}>
      {children}
    </div>
  );
}
