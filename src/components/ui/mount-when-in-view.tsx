"use client";

import { useEffect, useRef, useState } from "react";

export function MountWhenInView({
  children,
  placeholderClassName,
  rootMargin = "200px",
  threshold = 0.15,
}: {
  children: React.ReactNode;
  placeholderClassName?: string;
  rootMargin?: string;
  threshold?: number | number[];
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  // Important: SSR + first client render must be identical.
  // We always start "not visible" and only flip to true after the effect runs.
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (isInView) return;
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      // If the browser doesn't support IntersectionObserver, mount immediately
      // after the client has rendered.
      const timeoutId = setTimeout(() => {
        setIsInView(true);
      }, 0);

      return () => clearTimeout(timeoutId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isInView, rootMargin, threshold]);

  return (
    <div ref={ref} className={placeholderClassName}>
      {isInView ? children : null}
    </div>
  );
}
