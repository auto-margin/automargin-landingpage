export default function GuidebookApiEndpointsPage() {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <header className="not-prose border-b border-slate-200 pb-6 dark:border-slate-800">
        <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
          API
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 md:text-4xl">
          Endpoints (draft)
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
          Example endpoints you’d expect in an enterprise screening workflow.
        </p>
      </header>

      <section className="mt-8">
        <h2>POST /screen</h2>
        <p>Submit a batch to be screened.</p>
        <pre>
          <code>{`{
  "market": "EU",
  "vehicles": [{ "vin": "…", "supplierPrice": 12300, "currency": "EUR" }]
}`}</code>
        </pre>
      </section>

      <section className="mt-8">
        <h2>GET /results/{`{id}`}</h2>
        <p>Fetch completed results for a screening run.</p>
      </section>

      <section className="mt-8">
        <h2>GET /markets</h2>
        <p>List supported markets, sources, and constraints.</p>
      </section>
    </article>
  );
}

