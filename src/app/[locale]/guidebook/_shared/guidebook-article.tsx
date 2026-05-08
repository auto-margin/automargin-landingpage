type GuidebookArticleProps = {
  sectionLabel: string;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function GuidebookArticle({
  sectionLabel,
  title,
  description,
  children,
}: GuidebookArticleProps) {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <header className="not-prose border-b border-slate-200 pb-6 dark:border-slate-800">
        <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
          {sectionLabel}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 md:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
            {description}
          </p>
        ) : null}
      </header>

      {children}
    </article>
  );
}

