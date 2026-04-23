export default function GuidebookFindDealersPage() {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <header className="not-prose border-b border-slate-200 pb-6 dark:border-slate-800">
        <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
          Guides
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 md:text-4xl">
          Find dealers (dealer-fit outreach)
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
          Turn screening results into outreach. Start with who is short, in
          which segment, and why the vehicle fits.
        </p>
      </header>

      <section className="mt-8">
        <h2>Dealer-fit checklist</h2>
        <ul>
          <li>
            <strong>Segment fit</strong>: dealer historically sells this class
            (e.g. SUV, hybrid, age band)
          </li>
          <li>
            <strong>Inventory gap</strong>: current stock is structurally low
          </li>
          <li>
            <strong>Geo fit</strong>: logistics + local demand supports the move
          </li>
          <li>
            <strong>Price band fit</strong>: vehicle sits inside the dealer’s
            typical band
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Outreach sequencing</h2>
        <ol>
          <li>Start with dealers that are short in the segment</li>
          <li>Prioritize by repeat behavior (turnover, replenishment cadence)</li>
          <li>Use evidence: “gap + comps + margin band”</li>
        </ol>
      </section>

      <section className="mt-8">
        <h2>What to include in an outreach note</h2>
        <ul>
          <li>Vehicle summary (key fields)</li>
          <li>Comparable market band (not a single number)</li>
          <li>Why it fits the dealer (gap / segment / turnover)</li>
          <li>Next action (call, hold, reserve, or pass)</li>
        </ul>
      </section>
    </article>
  );
}

