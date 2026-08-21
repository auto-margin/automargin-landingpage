"use client";

import { useMemo, useState } from "react";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

import { LanguageSelector } from "@/components/language-selector";
import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import { Link, useRouter } from "@/i18n/navigation";

const GUIDEBOOK_SEARCH_HREFS = [
  { href: "/guidebook", itemKey: "overview", groupKey: "general" },
  {
    href: "/guidebook/how-to-use",
    itemKey: "howToUseOptimally",
    groupKey: "general",
  },
  {
    href: "/guidebook/find-dealers",
    itemKey: "findDealers",
    groupKey: "general",
  },
  {
    href: "/guidebook/is-my-car-good",
    itemKey: "isMyCarGood",
    groupKey: "general",
  },
  {
    href: "/guidebook/auto-forwarding",
    itemKey: "autoForwarding",
    groupKey: "general",
  },
  {
    href: "/guidebook/auto-forwarding/outlook",
    itemKey: "outlook",
    groupKey: "general",
  },
  {
    href: "/guidebook/auto-forwarding/gmail",
    itemKey: "gmail",
    groupKey: "general",
  },
  {
    href: "/guidebook/auto-forwarding/ios-mail",
    itemKey: "iCloudMail",
    groupKey: "general",
  },
  {
    href: "/guidebook/documentation",
    itemKey: "documentationOverview",
    groupKey: "documentation",
  },
  {
    href: "/guidebook/documentation/how-to-setup",
    itemKey: "howToSetup",
    groupKey: "documentation",
  },
  {
    href: "/guidebook/documentation/installation",
    itemKey: "installation",
    groupKey: "documentation",
  },
  {
    href: "/guidebook/documentation/tips-and-tricks",
    itemKey: "tipsAndTricks",
    groupKey: "documentation",
  },
  { href: "/guidebook/api", itemKey: "apiOverview", groupKey: "api" },
  { href: "/guidebook/api/endpoints", itemKey: "endpoints", groupKey: "api" },
  { href: "/guidebook/api/validation", itemKey: "validation", groupKey: "api" },
] as const;

function normalize(input: string) {
  return input.toLowerCase().trim();
}

export function GuidebookTopbar() {
  const tChrome = useTranslations("Guidebook.chrome");
  const tNav = useTranslations("Guidebook.nav");
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const searchItems = useMemo(
    () =>
      GUIDEBOOK_SEARCH_HREFS.map((item) => ({
        href: item.href,
        label: tNav(`items.${item.itemKey}`),
        group: tNav(`groups.${item.groupKey}`),
      })),
    [tNav],
  );

  const results = useMemo(() => {
    const value = normalize(query);
    if (!value) return searchItems.slice(0, 6);

    return searchItems
      .filter((item) => {
        const haystack = normalize(`${item.group} ${item.label} ${item.href}`);
        return haystack.includes(value);
      })
      .slice(0, 8);
  }, [query, searchItems]);

  const showResults = focused && results.length > 0;

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-base font-semibold tracking-tight text-slate-950 dark:text-slate-50">
          {tChrome("productTitle")}
        </p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {tChrome("lastUpdatedPrefix")} {tChrome("lastUpdatedDate")}
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
            placeholder={tChrome("searchPlaceholder")}
            className="h-9 rounded-md border-slate-200 bg-white pr-3 pl-9 text-sm shadow-none dark:border-slate-800 dark:bg-slate-950"
            aria-label={tChrome("searchAriaLabel")}
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

        <LanguageSelector />
        <ThemeToggle />
      </div>
    </div>
  );
}
