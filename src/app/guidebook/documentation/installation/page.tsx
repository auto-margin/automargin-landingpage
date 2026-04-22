export default function GuidebookInstallationPage() {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <header className="not-prose border-b border-slate-200 pb-6 dark:border-slate-800">
        <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
          Documentation
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 md:text-4xl">
          Installation
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
          Integration options for enterprise teams (overview).
        </p>
      </header>

      <section className="mt-8">
        <h2>Input methods</h2>
        <ul>
          <li>CSV/XLSX upload</li>
          <li>Marketplace export ingestion</li>
          <li>API (batch screening)</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Output methods</h2>
        <ul>
          <li>Exports (CSV)</li>
          <li>Webhook / callback for completed runs</li>
          <li>Internal handoff (tasks / assignments)</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Security basics</h2>
        <ul>
          <li>Least privilege roles</li>
          <li>Log access and exports</li>
          <li>Data retention policy</li>
        </ul>
      </section>
    </article>
  );
}

