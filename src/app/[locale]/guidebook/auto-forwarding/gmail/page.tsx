export default function GuidebookAutoForwardingGmailPage() {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <header className="not-prose border-b border-slate-200 pb-6 dark:border-slate-800">
        <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
          Guides · Auto forwarding
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 md:text-4xl">
          Gmail
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
          Use forwarding + filters to automatically route relevant offers to
          Auto-margin.
        </p>
      </header>

      <section className="mt-8">
        <h2>1) Add a forwarding address</h2>
        <ol>
          <li>
            Gmail → <strong>Settings</strong> → <strong>See all settings</strong>
          </li>
          <li>
            <strong>Forwarding and POP/IMAP</strong> →{" "}
            <strong>Add a forwarding address</strong>
          </li>
          <li>
            Enter your Auto-margin intake address and complete verification if
            prompted
          </li>
        </ol>
      </section>

      <section className="mt-10">
        <h2>2) Create a filter</h2>
        <ol>
          <li>
            Settings → <strong>Filters and Blocked Addresses</strong> →{" "}
            <strong>Create a new filter</strong>
          </li>
          <li>
            Choose conditions (From, Subject keywords, Has attachment, etc.)
          </li>
          <li>
            Select <strong>Forward it to</strong> and pick the intake address
          </li>
          <li>Optional: apply a label for auditability</li>
        </ol>
      </section>

      <section className="mt-10">
        <h2>Tips</h2>
        <ul>
          <li>
            Start narrow: supplier sender domains + specific subject keywords
          </li>
          <li>Label forwarded emails so the team can review what was sent</li>
        </ul>
      </section>
    </article>
  );
}

