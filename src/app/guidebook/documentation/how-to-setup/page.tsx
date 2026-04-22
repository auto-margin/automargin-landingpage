export default function GuidebookHowToSetupPage() {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <header className="not-prose border-b border-slate-200 pb-6 dark:border-slate-800">
        <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
          Documentation
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 md:text-4xl">
          How to setup (enterprise)
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
          Recommended setup for teams: environments, roles, data sources, and
          operational guardrails.
        </p>
      </header>

      <section className="mt-8">
        <h2>Environment</h2>
        <ul>
          <li>Separate staging and production</li>
          <li>Allowlist outbound connections (if required)</li>
          <li>Define default comparison markets per region/team</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Roles and access</h2>
        <ul>
          <li>Admin: configuration + integrations</li>
          <li>Analyst: run screening + export</li>
          <li>Sales/outreach: view shortlist + notes</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Operational guardrails</h2>
        <ul>
          <li>Define max list size per run (or batching rules)</li>
          <li>Set minimum required fields before screening</li>
          <li>Keep an audit trail for decisions</li>
        </ul>
      </section>
    </article>
  );
}

