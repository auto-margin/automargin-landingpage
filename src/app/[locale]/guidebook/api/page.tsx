export default function GuidebookApiPage() {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <header className="not-prose border-b border-slate-200 pb-6 dark:border-slate-800">
        <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
          API
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 md:text-4xl">
          API overview
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
          A lightweight placeholder until the API surface is finalized.
        </p>
      </header>

      <section className="mt-8">
        <h2>Start here</h2>
        <ul>
          <li>
            <a href="/guidebook/api/endpoints">Endpoints</a>
          </li>
          <li>
            <a href="/guidebook/api/validation">Validation</a>
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Authentication</h2>
        <p>
          Enterprise customers typically use token-based auth with allowlisted
          origins and request signing.
        </p>
      </section>
    </article>
  );
}

