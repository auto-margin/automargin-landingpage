"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type NavItem = { label: string; href: string };
type NavTreeItem =
  | NavItem
  | {
      label: string;
      href: string;
      children: NavItem[];
    };
type NavGroup = { label: string; items: NavTreeItem[] };

const NAV: NavGroup[] = [
  {
    label: "Guides",
    items: [
      { label: "Overview", href: "/guidebook" },
      { label: "How to use", href: "/guidebook/how-to-use" },
      {
        label: "Auto forwarding",
        href: "/guidebook/auto-forwarding",
        children: [
          { label: "Outlook", href: "/guidebook/auto-forwarding/outlook" },
          { label: "Gmail", href: "/guidebook/auto-forwarding/gmail" },
          {
            label: "iCloud Mail",
            href: "/guidebook/auto-forwarding/ios-mail",
          },
        ],
      },
      { label: "Find dealers", href: "/guidebook/find-dealers" },
      { label: "Is my car good?", href: "/guidebook/is-my-car-good" },
    ],
  },
  {
    label: "Documentation",
    items: [
      { label: "Overview", href: "/guidebook/documentation" },
      { label: "How to setup", href: "/guidebook/documentation/how-to-setup" },
      { label: "Installation", href: "/guidebook/documentation/installation" },
      {
        label: "Tips & tricks",
        href: "/guidebook/documentation/tips-and-tricks",
      },
    ],
  },
  {
    label: "API",
    items: [
      { label: "Overview", href: "/guidebook/api" },
      { label: "Endpoints", href: "/guidebook/api/endpoints" },
      { label: "Validation", href: "/guidebook/api/validation" },
    ],
  },
];

function isActive(pathname: string, href: string) {
  if (href === "/guidebook") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function GuidebookSidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

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
  }, [pathname]);

  useEffect(() => {
    if (!activeParents.length) return;
    setExpanded((prev) => {
      const next = { ...prev };
      for (const href of activeParents) next[href] = true;
      return next;
    });
  }, [activeParents]);

  return (
    <nav aria-label="Guidebook navigation" className="space-y-6">
      <p className="text-xs font-semibold tracking-wide text-slate-950 dark:text-slate-50">
        CONTENT
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

