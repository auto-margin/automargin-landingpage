export default function GuidebookDocumentationPage() {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <header className="not-prose border-b border-slate-200 pb-6 dark:border-slate-800">
        <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
          Documentation
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 md:text-4xl">
          Data inputs and outputs
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
          A reference for the fields teams typically provide, and the outputs
          Auto-margin returns for screening and margin validation.
        </p>
      </header>

      <section className="mt-8">
        <h2>Start here</h2>
        <ul>
          <li>
            <a href="/guidebook/documentation/how-to-setup">How to setup</a>
          </li>
          <li>
            <a href="/guidebook/documentation/installation">Installation</a>
          </li>
          <li>
            <a href="/guidebook/documentation/tips-and-tricks">Tips &amp; tricks</a>
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Typical inputs</h2>
        <ul>
          <li>Vehicle identifier (VIN / registration)</li>
          <li>Make, model, trim, year</li>
          <li>Mileage, fuel type, transmission</li>
          <li>Supplier price and location</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Typical outputs</h2>
        <ul>
          <li>Comparable market ranges per region</li>
          <li>Margin estimate and confidence</li>
          <li>Gap / scarcity signals</li>
          <li>Dealer-fit / outreach hints</li>
        </ul>
      </section>
    </article>
  );
}

