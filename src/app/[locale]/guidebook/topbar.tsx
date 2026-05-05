"use client";

import { useMemo, useState } from "react";

import { Search } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import { Link, useRouter } from "@/i18n/navigation";

const LAST_UPDATED = "May 5, 2026";

const GUIDEBOOK_SEARCH_ITEMS = [
  { label: "Overview", href: "/guidebook", group: "General" },
  {
    label: "How to use optimally",
    href: "/guidebook/how-to-use",
    group: "General",
  },
  { label: "Find dealers", href: "/guidebook/find-dealers", group: "General" },
  {
    label: "Is my car good?",
    href: "/guidebook/is-my-car-good",
    group: "General",
  },
  {
    label: "Auto forwarding",
    href: "/guidebook/auto-forwarding",
    group: "General",
  },
  {
    label: "Outlook",
    href: "/guidebook/auto-forwarding/outlook",
    group: "General",
  },
  {
    label: "Gmail",
    href: "/guidebook/auto-forwarding/gmail",
    group: "General",
  },
  {
    label: "iCloud Mail",
    href: "/guidebook/auto-forwarding/ios-mail",
    group: "General",
  },
  {
    label: "Overview",
    href: "/guidebook/documentation",
    group: "Documentation",
  },
  {
    label: "How to setup",
    href: "/guidebook/documentation/how-to-setup",
    group: "Documentation",
  },
  {
    label: "Installation",
    href: "/guidebook/documentation/installation",
    group: "Documentation",
  },
  {
    label: "Tips & tricks",
    href: "/guidebook/documentation/tips-and-tricks",
    group: "Documentation",
  },
  { label: "Overview", href: "/guidebook/api", group: "API" },
  { label: "Endpoints", href: "/guidebook/api/endpoints", group: "API" },
  { label: "Validation", href: "/guidebook/api/validation", group: "API" },
];

function normalize(input: string) {
  return input.toLowerCase().trim();
}

export function GuidebookTopbar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const results = useMemo(() => {
    const value = normalize(query);
    if (!value) return GUIDEBOOK_SEARCH_ITEMS.slice(0, 6);

    return GUIDEBOOK_SEARCH_ITEMS.filter((item) => {
      const haystack = normalize(`${item.group} ${item.label} ${item.href}`);
      return haystack.includes(value);
    }).slice(0, 8);
  }, [query]);

  const showResults = focused && results.length > 0;

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-base font-semibold tracking-tight text-slate-950 dark:text-slate-50">
          Auto-margin Documentation
        </p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Last updated: {LAST_UPDATED}
        </p>
      </div>

      <div className="flex shrink-0 items-start gap-3">
        <div className="relative w-[18rem] md:w-[21rem]">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              window.setTimeout(() => setFocused(false), 120);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" && results[0]) {
                event.preventDefault();
                router.push(results[0].href);
                setFocused(false);
              }
            }}
            placeholder="Search documentation..."
            className="h-9 rounded-md border-slate-200 bg-white pr-3 pl-9 text-sm shadow-none dark:border-slate-800 dark:bg-slate-950"
            aria-label="Search guidebook pages"
          />

          {showResults ? (
            <div className="absolute top-full right-0 left-0 z-20 mt-2 overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-950">
              <div className="max-h-80 overflow-y-auto py-2">
                {results.map((item) => (
                  <Link
                    key={`${item.group}-${item.href}`}
                    href={item.href}
                    className="block px-4 py-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-900"
                  >
                    <p className="text-sm font-medium text-slate-950 dark:text-slate-50">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                      {item.group}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <ThemeToggle />
      </div>
    </div>
  );
}
