"use client";

import { useEffect, useMemo, useState } from "react";

import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";

type NavItem = { label: string; href: string };
type NavTreeItem =
  | NavItem
  | {
      label: string;
      href: string;
      children: NavItem[];
    };
type NavGroup = { label: string; items: NavTreeItem[] };

function isActive(pathname: string, href: string) {
  if (href === "/guidebook") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function GuidebookSidebar() {
  const tChrome = useTranslations("Guidebook.chrome");
  const tNav = useTranslations("Guidebook.nav");
  const pathname = usePathname();

  const NAV: NavGroup[] = useMemo(
    () => [
      {
        label: tNav("groups.general"),
        items: [
          { label: tNav("items.overview"), href: "/guidebook" },
          {
            label: tNav("items.howToUseOptimally"),
            href: "/guidebook/how-to-use",
          },
          { label: tNav("items.findDealers"), href: "/guidebook/find-dealers" },
          {
            label: tNav("items.isMyCarGood"),
            href: "/guidebook/is-my-car-good",
          },
          {
            label: tNav("items.autoForwarding"),
            href: "/guidebook/auto-forwarding",
            children: [
              {
                label: tNav("items.outlook"),
                href: "/guidebook/auto-forwarding/outlook",
              },
              {
                label: tNav("items.gmail"),
                href: "/guidebook/auto-forwarding/gmail",
              },
              {
                label: tNav("items.iCloudMail"),
                href: "/guidebook/auto-forwarding/ios-mail",
              },
            ],
          },
        ],
      },
      {
        label: tNav("groups.documentation"),
        items: [
          {
            label: tNav("items.documentationOverview"),
            href: "/guidebook/documentation",
          },
          {
            label: tNav("items.howToSetup"),
            href: "/guidebook/documentation/how-to-setup",
          },
          {
            label: tNav("items.installation"),
            href: "/guidebook/documentation/installation",
          },
          {
            label: tNav("items.uploadingFiles"),
            href: "/guidebook/documentation/uploading-files",
          },
          {
            label: tNav("items.tipsAndTricks"),
            href: "/guidebook/documentation/tips-and-tricks",
          },
        ],
      },
      {
        label: tNav("groups.api"),
        items: [
          { label: tNav("items.apiOverview"), href: "/guidebook/api" },
          {
            label: tNav("items.endpoints"),
            href: "/guidebook/api/endpoints",
          },
          {
            label: tNav("items.validation"),
            href: "/guidebook/api/validation",
          },
        ],
      },
    ],
    [tNav],
  );

  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const group of NAV) {
      for (const item of group.items) {
        if ("children" in item && item.children?.length) {
          if (isActive(pathname, item.href)) initial[item.href] = true;
        }
      }
    }
    return initial;
  });

  const activeParents = useMemo(() => {
    const parents: string[] = [];
    for (const group of NAV) {
      for (const item of group.items) {
        if ("children" in item && item.children?.length) {
          if (isActive(pathname, item.href)) parents.push(item.href);
        }
      }
    }
    return parents;
  }, [NAV, pathname]);

  useEffect(() => {
    if (!activeParents.length) return;
    const id = window.requestAnimationFrame(() => {
      setExpanded((prev) => {
        let changed = false;
        const next = { ...prev };
        for (const href of activeParents) {
          if (!next[href]) {
            next[href] = true;
            changed = true;
          }
        }
        return changed ? next : prev;
      });
    });
    return () => window.cancelAnimationFrame(id);
  }, [activeParents]);

  return (
    <nav aria-label={tChrome("navAriaLabel")} className="space-y-6">
      <p className="text-xs font-semibold tracking-wide text-slate-950 dark:text-slate-50">
        {tChrome("contentLabel")}
      </p>
      {NAV.map((group) => (
        <div key={group.label}>
          <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
            {group.label}
          </p>
          <div className="mt-2 space-y-1">
            {group.items.map((item) => {
              if ("children" in item && item.children?.length) {
                const active = isActive(pathname, item.href);
                const isOpen = expanded[item.href] ?? false;

                return (
                  <div key={item.href} className="space-y-1">
                    <button
                      type="button"
                      onClick={() =>
                        setExpanded((prev) => ({
                          ...prev,
                          [item.href]: !(prev[item.href] ?? false),
                        }))
                      }
                      className={[
                        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        "hover:bg-slate-100 dark:hover:bg-slate-950",
                        active
                          ? "bg-slate-100 text-slate-950 dark:bg-slate-950 dark:text-slate-50"
                          : "text-slate-700 dark:text-slate-300",
                      ].join(" ")}
                      aria-expanded={isOpen}
                    >
                      <span>{item.label}</span>
                      <span
                        className={[
                          "text-slate-400 transition-transform dark:text-slate-500",
                          isOpen ? "rotate-90" : "rotate-0",
                        ].join(" ")}
                        aria-hidden
                      >
                        ›
                      </span>
                    </button>

                    {isOpen ? (
                      <div className="ml-3 border-l border-slate-200 pl-2 dark:border-slate-800">
                        {item.children.map((child) => {
                          const childActive = isActive(pathname, child.href);
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              aria-current={childActive ? "page" : undefined}
                              className={[
                                "flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                "hover:bg-slate-100 dark:hover:bg-slate-950",
                                childActive
                                  ? "bg-slate-100 text-slate-950 dark:bg-slate-950 dark:text-slate-50"
                                  : "text-slate-700 dark:text-slate-300",
                              ].join(" ")}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                );
              }

              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    "hover:bg-slate-100 dark:hover:bg-slate-950",
                    active
                      ? "bg-slate-100 text-slate-950 dark:bg-slate-950 dark:text-slate-50"
                      : "text-slate-700 dark:text-slate-300",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
