import { track } from "@vercel/analytics";

/**
 * Vercel Analytics only mounts in production (see `src/app/layout.tsx`), and
 * `track` logs a warning when the script is absent. Guard so development runs
 * stay free of console noise while production still records the funnel.
 */
export function trackDemoEvent(
  name: string,
  properties?: Record<string, string | number | boolean | null>,
) {
  if (process.env.NODE_ENV !== "production") return;
  try {
    track(name, properties);
  } catch {
    // Analytics must never break the demo.
  }
}
