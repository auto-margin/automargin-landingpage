export default function GuidebookIsMyCarGoodPage() {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <header className="not-prose border-b border-slate-200 pb-6 dark:border-slate-800">
        <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
          Guides
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 md:text-4xl">
          Is my car good?
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
          A simple decision framework: quality of deal = margin band + evidence
          + risk profile.
        </p>
      </header>

      <section className="mt-8">
        <h2>Decision framework</h2>
        <ul>
          <li>
            <strong>Margin</strong>: is there enough spread after fees,
            transport, reconditioning?
          </li>
          <li>
            <strong>Confidence</strong>: do we have enough comparable signals?
          </li>
          <li>
            <strong>Velocity</strong>: does this segment move quickly right now?
          </li>
          <li>
            <strong>Risk</strong>: spec issues, mileage anomalies, missing
            fields, market volatility.
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Red flags</h2>
        <ul>
          <li>Supplier price is missing or looks inconsistent with condition</li>
          <li>Not enough comps (thin segment)</li>
          <li>Outlier spec (rare trim, unusual options)</li>
          <li>Market band is wide (low confidence)</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Green flags</h2>
        <ul>
          <li>Stable comps across multiple sources</li>
          <li>Clear gap in local supply (structural scarcity)</li>
          <li>Dealer-fit evidence (who is short + why it fits)</li>
        </ul>
      </section>
    </article>
  );
}

