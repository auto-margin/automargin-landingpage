import { GuidebookPager } from "../guidebook-pager";

export default function GuidebookHowToUsePage() {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <header className="not-prose border-b border-slate-200 pb-6 dark:border-slate-800">
        <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
          General
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 md:text-4xl">
          How to use optimally
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
          Auto-margin generates a result only as accurate as the vehicle data
          provided. This page covers the inputs, comparison logic, and workflow
          that produce reliable evaluations.
        </p>
      </header>

      <section className="mt-8">
        <h2>Input data requirements</h2>
        <p>The fields below determine result precision.</p>
        <h3>Required</h3>
        <p>Without these fields, an evaluation cannot be completed reliably.</p>
        <ul>
          <li>Make and model</li>
          <li>First registration date</li>
          <li>Mileage</li>
          <li>Fuel type</li>
          <li>Transmission</li>
          <li>Asking price</li>
        </ul>
        <p>
          If asking price is omitted, Auto-margin will still generate a market
          band and listing comparison, but margin cannot be calculated.
        </p>
        <h3>Strongly recommended</h3>
        <ul>
          <li>Trim or equipment level</li>
          <li>Power output in kW or HP</li>
          <li>Body style</li>
        </ul>
        <h3>Optional</h3>
        <ul>
          <li>VIN</li>
          <li>Country of origin</li>
          <li>Notable options</li>
          <li>Condition notes</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Note on trim levels</h2>
        <p>
          Auto-margin filters comparable listings using mid-tier and higher
          trims only, such as R-Line, AMG Line, M Sport, Style, or Sportline.
          Lower trims are not used as hard filters because a higher trim can be
          priced equivalently to or below a lower trim depending on
          configuration.
        </p>
      </section>

      <section className="mt-8">
        <h2>Comparison logic</h2>
        <p>Auto-margin matches the input vehicle against listings using:</p>
        <ul>
          <li>Brand, model, and trim</li>
          <li>First registration</li>
          <li>Mileage</li>
          <li>Asking price</li>
          <li>Fuel type</li>
          <li>Body type</li>
          <li>Power output</li>
        </ul>
        <p>When present, four equipment flags are also applied:</p>
        <ul>
          <li>Panoramic roof (PANO)</li>
          <li>Towbar (TOW)</li>
          <li>All-wheel drive (4x4)</li>
          <li>Seven-seater configuration (7-seater)</li>
        </ul>
        <p>
          If a result returns few comparable listings, equipment flags or a
          less common trim may be narrowing the comp pool. Removing one flag and
          re-running can widen the pool.
        </p>
      </section>

      <section className="mt-8">
        <h2>Workflow</h2>
        <ol>
          <li>
            <strong>Prepare the input.</strong> Normalize fields to a consistent
            format. Use a single currency. Use kilometers and either kW or HP
            consistently across the list.
          </li>
          <li>
            <strong>Select the target market.</strong> Choose the country or
            region where the vehicle will be sold, not where it is sourced.
          </li>
          <li>
            <strong>Run the evaluation.</strong> Auto-margin retrieves
            comparable live listings, calculates the market price band, and
            returns a margin estimate against the asking price.
          </li>
          <li>
            <strong>Review the result.</strong> Check the market price band,
            confidence level, and margin estimate where asking price was
            provided.
          </li>
          <li>
            <strong>Decide.</strong> Use the <em>Is my car good?</em> page as
            the decision framework.
          </li>
        </ol>
      </section>

      <section className="mt-8">
        <h2>Reading results</h2>
        <ul>
          <li>The price band, not the midpoint, is the result.</li>
          <li>Confidence reflects market depth.</li>
          <li>Outliers are excluded from the band where detected.</li>
          <li>
            Margin estimates apply typical market costs. User-specific costs
            must be added separately.
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>File and language support</h2>
        <p>
          The Auto-margin ingestion engine supports a range of file formats and
          languages. If an upload fails or returns unexpected results, retry the
          upload first. If the error persists, rename column headers to standard
          English equivalents such as <code>price</code>, <code>mileage</code>,
          and <code>first_registration</code> and retry.
        </p>
      </section>

      <GuidebookPager
        nextHref="/guidebook/find-dealers"
        nextLabel="Find dealers"
      />
    </article>
  );
}
