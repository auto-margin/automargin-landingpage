import { GuidebookPager } from "../guidebook-pager";

export default function GuidebookIsMyCarGoodPage() {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <header className="not-prose border-b border-slate-200 pb-6 dark:border-slate-800">
        <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
          General
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 md:text-4xl">
          Is my car good?
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
          A decision framework for evaluating an individual vehicle.
        </p>
      </header>

      <section className="mt-8">
        <h2>Decision framework</h2>
        <p>
          A strong deal clears all four criteria. A workable deal clears three.
          Two or fewer indicates the deal requires further investigation or
          should be passed.
        </p>
        <ul>
          <li>
            <strong>Margin</strong>: sufficient spread remains after fees,
            transport, reconditioning, and operational costs.
          </li>
          <li>
            <strong>Confidence</strong>: enough comparable listings support the
            price band to make the read reliable.
          </li>
          <li>
            <strong>Velocity</strong>: the segment is currently active in the
            target market.
          </li>
          <li>
            <strong>Risk</strong>: no significant red flags in spec, mileage,
            history, or market volatility.
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Red flags</h2>
        <ul>
          <li>Asking price missing or inconsistent with described condition</li>
          <li>Few comparable listings (thin segment)</li>
          <li>Outlier specification (rare trim, unusual options)</li>
          <li>Wide market band (low confidence)</li>
          <li>Asking price at or above market midpoint before added costs</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Green flags</h2>
        <ul>
          <li>Stable comparable listings across multiple sources</li>
          <li>Clear gap in local supply</li>
          <li>Dealer-fit evidence available</li>
          <li>Asking price below the lower edge of the market band</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Known limitations</h2>
        <p>
          Auto-margin&apos;s comparison engine is reliable across most
          evaluations, but some results may still be imprecise.
        </p>
        <ol>
          <li>
            <strong>Model-year ambiguity.</strong> Facelifts or new generations
            with the same name and power output can pull in listings from the
            wrong generation.
          </li>
          <li>
            <strong>Source listing errors.</strong> Human-entered mistakes in
            source platforms can pass through if they are not detectable during
            ingestion.
          </li>
        </ol>
        <p>
          If a result appears incorrect, use the <strong>Copy info</strong>
          button and include the copied vehicle information, the processing
          date, and a short description of what appears wrong.
        </p>
      </section>

      <section className="mt-8">
        <h2>Scope of the recommendation</h2>
        <p>
          Auto-margin evaluates whether a vehicle represents a good deal at the
          point of purchase: market price band, margin, comparable listings, and
          risk indicators in the target market.
        </p>
        <p>
          It does not currently predict how an individual vehicle will perform
          on a specific dealer&apos;s lot. The final purchase decision rests with
          the user.
        </p>
      </section>

      <GuidebookPager
        nextHref="/guidebook/documentation"
        nextLabel="Documentation overview"
        nextSection="Continue"
      />
    </article>
  );
}
