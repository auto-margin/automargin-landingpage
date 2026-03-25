"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  variant?: "fade-up" | "zoom";
  onlyAfterScroll?: boolean;
  scrollThreshold?: number;
  rootMargin?: string;
  threshold?: number;
};

const variantClasses = {
  "fade-up": "scroll-reveal-fade-in-up",
  zoom: "scroll-reveal-zoom-in",
};

const DEFAULT_SCROLL_THRESHOLD_PX = 120;

let scrollListenerAttached = false;
const scrollSubscribers = new Set<(scrollY: number) => void>();

const handleGlobalScroll = () => {
  const y = typeof window === "undefined" ? 0 : window.scrollY;
  scrollSubscribers.forEach((cb) => cb(y));
};

function subscribeToGlobalScroll(cb: (scrollY: number) => void) {
  scrollSubscribers.add(cb);
  if (scrollListenerAttached) return;
  if (typeof window === "undefined") return;

  scrollListenerAttached = true;
  window.addEventListener("scroll", handleGlobalScroll, { passive: true });
}

function unsubscribeFromGlobalScroll(cb: (scrollY: number) => void) {
  scrollSubscribers.delete(cb);
  if (scrollSubscribers.size > 0) return;
  if (typeof window === "undefined") return;

  scrollListenerAttached = false;
  window.removeEventListener("scroll", handleGlobalScroll);
}

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
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    if (!onlyAfterScroll) return;

    const onScroll = (scrollY: number) => {
      if (scrollY <= scrollThreshold) return;
      if (hasScrolledRef.current) return;
      hasScrolledRef.current = true;

      // If already intersecting when the threshold is reached, reveal immediately.
      if (intersectingRef.current) {
        ref.current?.classList.add("is-visible");
      }
    };

    subscribeToGlobalScroll(onScroll);
    return () => unsubscribeFromGlobalScroll(onScroll);
  }, [onlyAfterScroll, scrollThreshold]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          intersectingRef.current = entry.isIntersecting;
          if (
            entry.isIntersecting &&
            (!onlyAfterScroll || hasScrolledRef.current)
          ) {
            el.classList.add("is-visible");
          }
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, onlyAfterScroll]);

  return (
    <div ref={ref} className={cn(variantClasses[variant], className)}>
      {children}
    </div>
  );
}
