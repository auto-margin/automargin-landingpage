import { GuidebookPager } from "../guidebook-pager";

export default function GuidebookFindDealersPage() {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <header className="not-prose border-b border-slate-200 pb-6 dark:border-slate-800">
        <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
          General
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 md:text-4xl">
          Find dealers
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
          This section applies to users conducting B2B outreach to other
          dealers. Users selling directly to end customers can skip this page.
        </p>
      </header>

      <section className="mt-8">
        <p>
          After a vehicle has been evaluated, the next step is identifying
          which dealers are most likely to buy it. Auto-margin supports this
          prioritization.
        </p>
      </section>

      <section className="mt-8">
        <h2>Dealer-fit checklist</h2>
        <ul>
          <li>
            <strong>Segment fit</strong>: the dealer historically sells this
            class of vehicle.
          </li>
          <li>
            <strong>Inventory gap</strong>: the dealer&apos;s current stock is
            structurally low in this segment.
          </li>
          <li>
            <strong>Geographic fit</strong>: logistics are workable and local
            demand supports the vehicle.
          </li>
          <li>
            <strong>Price band fit</strong>: the asking price falls within the
            dealer&apos;s typical operating band.
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Outreach sequencing</h2>
        <ol>
          <li>Begin with dealers who are short in the relevant segment.</li>
          <li>
            Prioritize dealers with high turnover or consistent replenishment
            activity.
          </li>
          <li>
            Lead with evidence rather than description: the inventory gap, the
            comparable market band, and the segment match.
          </li>
        </ol>
      </section>

      <section className="mt-8">
        <h2>Outreach note structure</h2>
        <p>Outreach messages perform better when concise and specific.</p>
        <ul>
          <li>Vehicle summary: year, model, trim, mileage, key options</li>
          <li>Asking price alongside the comparable market band as a range</li>
          <li>Fit rationale: the specific reason the vehicle suits this dealer</li>
          <li>Next action: call, hold, reserve, or pass</li>
        </ul>
      </section>

      <GuidebookPager
        nextHref="/guidebook/is-my-car-good"
        nextLabel="Is my car good?"
      />
    </article>
  );
}
