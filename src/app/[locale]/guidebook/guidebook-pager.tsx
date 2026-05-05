import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";

type GuidebookPagerProps = {
  nextHref: string;
  nextLabel: string;
  nextSection?: string;
};

export function GuidebookPager({
  nextHref,
  nextLabel,
  nextSection = "Next page",
}: GuidebookPagerProps) {
  return (
    <footer className="not-prose mt-12 border-t border-slate-200 pt-6 dark:border-slate-800">
      <Link
        href={nextHref}
        className={[
          "group flex w-full items-center justify-between gap-4 rounded-2xl border border-slate-200",
          "bg-slate-50 px-5 py-4 transition-colors hover:border-slate-300 hover:bg-slate-100",
          "dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700 dark:hover:bg-slate-900",
        ].join(" ")}
      >
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            {nextSection}
          </p>
          <p className="mt-1 text-base font-semibold text-slate-950 dark:text-slate-50">
            {nextLabel}
          </p>
        </div>

        <span className="shrink-0 rounded-full border border-slate-200 p-2 text-slate-500 transition-colors group-hover:text-slate-950 dark:border-slate-700 dark:text-slate-300 dark:group-hover:text-slate-50">
          <ArrowRight className="size-4" />
        </span>
      </Link>
    </footer>
  );
}
