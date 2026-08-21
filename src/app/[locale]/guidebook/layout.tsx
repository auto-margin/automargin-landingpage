import type { Metadata } from "next";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { GuidebookSidebar } from "./sidebar";
import { GuidebookToc } from "./toc";
import { GuidebookTopbar } from "./topbar";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Guidebook.chrome" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function GuidebookLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

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
