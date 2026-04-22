export default function GuidebookApiValidationPage() {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <header className="not-prose border-b border-slate-200 pb-6 dark:border-slate-800">
        <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
          API
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 md:text-4xl">
          Validation (enterprise)
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
          Suggested validation rules to keep runs clean and auditable.
        </p>
      </header>

      <section className="mt-8">
        <h2>Required fields</h2>
        <ul>
          <li>At least one identifier (VIN or registration)</li>
          <li>Supplier price + currency</li>
          <li>Location / market context</li>
          <li>Year + mileage (or a reason it’s missing)</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Guardrails</h2>
        <ul>
          <li>Reject mixed currencies in one batch (unless explicitly allowed)</li>
          <li>Reject negative prices and impossible mileages</li>
          <li>Warn on thin comps or wide bands (low confidence)</li>
        </ul>
      </section>
    </article>
  );
}

