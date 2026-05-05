import type { Metadata } from "next";

import { GuidebookSidebar } from "./sidebar";
import { GuidebookToc } from "./toc";
import { GuidebookTopbar } from "./topbar";

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
    <div className="h-[100svh] overflow-hidden bg-white text-slate-950 dark:bg-black dark:text-slate-50">
      <div className="mx-auto flex h-full max-w-[90rem] flex-col px-6 py-4 md:px-8 md:py-5">
        <header className="shrink-0 border-b border-slate-200 pb-4 dark:border-slate-800">
          <GuidebookTopbar />
        </header>

        <div className="mt-4 grid min-h-0 flex-1 grid-cols-1 gap-8 md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)_220px]">
          <aside className="hidden self-start pr-2 md:block">
            <GuidebookSidebar />
          </aside>

          <div
            className="am-scrollbar min-h-0 min-w-0 overflow-y-auto pr-2"
            data-guidebook-content="true"
          >
            {children}
          </div>

          <GuidebookToc />
        </div>
      </div>
    </div>
  );
}

