import type { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "A quick guide to how teams screen supplier lists and validate margin with Auto-margin.",
};

export default function GuidebookPage() {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <header className="not-prose border-b border-slate-200 pb-6 dark:border-slate-800">
        <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
          Guides
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 md:text-4xl">
          From list to margin
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
          A practical handbook for enterprise sourcing teams: screen supplier
          lists, compare across markets, and prioritize outreach with margin
          signals.
        </p>
      </header>

      <section className="mt-8">
        <h2>What you’ll learn</h2>
        <ul>
          <li>How to structure supplier lists for bulk screening</li>
          <li>How to validate margin using comparable market signals</li>
          <li>How to turn results into dealer-fit outreach decisions</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Suggested flow</h2>
        <ol>
          <li>Upload / ingest your supplier list</li>
          <li>Run cross-market evaluation</li>
          <li>Review gaps and dealer-fit signals</li>
          <li>Export or act on the shortlist</li>
        </ol>
      </section>
    </article>
  );
}

