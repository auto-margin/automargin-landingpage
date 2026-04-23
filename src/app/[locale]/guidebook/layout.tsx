import type { Metadata } from "next";

import { GuidebookSidebar } from "./sidebar";
import { GuidebookToc } from "./toc";
import { GuidebookTopbar } from "./topbar";

import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "Guidebook",
  description:
    "Handbook and documentation for how teams screen supplier lists and validate margin with Auto-margin.",
};

export default function GuidebookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100svh] bg-white text-slate-950 dark:bg-black dark:text-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-8 md:py-12">
        <header className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-800">
          <GuidebookTopbar />
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr] lg:grid-cols-[240px_1fr_220px]">
          <aside className="md:sticky md:top-10 md:self-start">
            <div className="flex items-center justify-end">
              <Link
                href="/contact"
                className="text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-50"
              >
                Contact
              </Link>
            </div>

            <div className="mt-6">
              <GuidebookSidebar />
            </div>
          </aside>

          <div className="min-w-0" data-guidebook-content="true">
            {children}
          </div>

          <GuidebookToc />
        </div>
      </div>
    </div>
  );
}

