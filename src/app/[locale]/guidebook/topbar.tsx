"use client";

import { ThemeToggle } from "@/components/theme-toggle";

const LAST_UPDATED = "Apr 22, 2026";

export function GuidebookTopbar() {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-base font-semibold tracking-tight text-slate-950 dark:text-slate-50">
          Auto-margin Documentation
        </p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Last updated: {LAST_UPDATED}
        </p>
      </div>

      <div className="shrink-0">
        <ThemeToggle />
      </div>
    </div>
  );
}

