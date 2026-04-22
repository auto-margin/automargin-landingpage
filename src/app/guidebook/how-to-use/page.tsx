export default function GuidebookHowToUsePage() {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <header className="not-prose border-b border-slate-200 pb-6 dark:border-slate-800">
        <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
          Guides
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 md:text-4xl">
          How to use Auto-margin
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
          A step-by-step workflow for enterprise sourcing teams: from supplier
          list → screening → shortlist → dealer-fit outreach.
        </p>
      </header>

      <section className="mt-8">
        <h2>Workflow (fast)</h2>
        <ol>
          <li>
            <strong>Prepare your list</strong> — normalize fields (VIN/plate,
            price, location, mileage, year).
          </li>
          <li>
            <strong>Run bulk screening</strong> — evaluate every vehicle against
            live market signals.
          </li>
          <li>
            <strong>Review results</strong> — margin range, confidence, and
            outliers.
          </li>
          <li>
            <strong>Filter</strong> — focus on segments with structural gaps.
          </li>
          <li>
            <strong>Shortlist</strong> — export or route to your team for
            outreach.
          </li>
        </ol>
      </section>

      <section className="mt-8">
        <h2>What “good” looks like</h2>
        <ul>
          <li>Inputs are consistent (same currency, units, and formatting)</li>
          <li>Comparable markets are chosen (not “everything”)</li>
          <li>Decisions are auditable (why this car, why this dealer, why now)</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Common pitfalls</h2>
        <ul>
          <li>Mixed currencies or missing supplier price</li>
          <li>Over-broad comparison markets (adds noise)</li>
          <li>Blindly trusting a single listing price (needs bands + confidence)</li>
        </ul>
      </section>
    </article>
  );
}

