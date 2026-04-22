export default function GuidebookAutoForwardingOutlookPage() {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <header className="not-prose border-b border-slate-200 pb-6 dark:border-slate-800">
        <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
          Guides · Auto forwarding
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 md:text-4xl">
          Outlook (Microsoft 365)
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
          Automatically forward specific deal emails to Auto-margin for
          validation checks.
        </p>
      </header>

      <section className="mt-8">
        <h2>Recommended setup</h2>
        <ul>
          <li>
            Use a dedicated alias (e.g. <code>deals@your-company.com</code>)
          </li>
          <li>
            Create rules that only forward from known suppliers or patterns
          </li>
          <li>Test with one supplier before expanding</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2>Steps (Outlook on the web)</h2>
        <ol>
          <li>
            Open Outlook Web → <strong>Settings</strong>
          </li>
          <li>
            Go to <strong>Mail</strong> → <strong>Rules</strong>
          </li>
          <li>Create a new rule</li>
          <li>
            Add conditions (Sender is…, Subject contains…, Has attachment, etc.)
          </li>
          <li>
            Action: <strong>Forward to</strong> your Auto-margin intake address
          </li>
          <li>Save and send a test email to verify</li>
        </ol>
      </section>

      <section className="mt-10">
        <h2>Common IT constraints</h2>
        <ul>
          <li>Some orgs block external auto-forwarding by policy</li>
          <li>
            Your IT team may need to allowlist the intake address or tenant
            setting
          </li>
        </ul>
      </section>
    </article>
  );
}

