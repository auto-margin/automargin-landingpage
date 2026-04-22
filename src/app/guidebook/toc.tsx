"use client";

import { useEffect, useMemo, useState } from "react";

type TocItem = { id: string; text: string; level: 2 | 3 };

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function GuidebookToc() {
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const root = document.querySelector('[data-guidebook-content="true"]');
    if (!root) return;

    const headings = Array.from(root.querySelectorAll("h2, h3")) as Array<
      HTMLHeadingElement
    >;

    const used = new Set<string>();
    const next: TocItem[] = [];

    for (const h of headings) {
      const level = h.tagName === "H2" ? 2 : 3;
      const text = (h.textContent ?? "").trim();
      if (!text) continue;

      let id = h.id?.trim();
      if (!id) {
        id = slugify(text);
        let candidate = id;
        let i = 2;
        while (used.has(candidate) || document.getElementById(candidate)) {
          candidate = `${id}-${i++}`;
        }
        id = candidate;
        h.id = id;
      }
      used.add(id);

      next.push({ id, text, level });
    }

    setItems(next);
  }, []);

  const hasItems = useMemo(() => items.length > 1, [items.length]);
  if (!hasItems) return null;

  return (
    <aside className="sticky top-10 hidden self-start lg:block">
      <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
        Table of contents
      </p>
      <nav className="mt-3 space-y-1">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={[
              "block rounded-md px-2 py-1 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-950",
              "dark:text-slate-300 dark:hover:bg-slate-950 dark:hover:text-slate-50",
              item.level === 3 ? "pl-4 text-[13px]" : "",
            ].join(" ")}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}

