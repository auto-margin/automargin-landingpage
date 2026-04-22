export default function GuidebookTipsAndTricksPage() {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <header className="not-prose border-b border-slate-200 pb-6 dark:border-slate-800">
        <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
          Documentation
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 md:text-4xl">
          Tips &amp; tricks
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
          Small optimizations that improve screening quality and reduce false
          positives.
        </p>
      </header>

      <section className="mt-8">
        <h2>Input quality</h2>
        <ul>
          <li>Normalize mileage units and formatting</li>
          <li>Keep currency consistent per batch</li>
          <li>Prefer VIN/plate when available (reduces ambiguity)</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Market selection</h2>
        <ul>
          <li>Use 2–4 relevant markets instead of “all markets”</li>
          <li>Separate retail and wholesale comparisons</li>
          <li>Track seasonal effects for specific segments</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Decision hygiene</h2>
        <ul>
          <li>Always store “why this decision” as structured notes</li>
          <li>Review outliers weekly (tune your guardrails)</li>
          <li>Measure win-rate by segment to improve rules</li>
        </ul>
      </section>
    </article>
  );
}

