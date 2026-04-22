export default function GuidebookAutoForwardingIosMailPage() {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <header className="not-prose border-b border-slate-200 pb-6 dark:border-slate-800">
        <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
          Guides · Auto forwarding
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 md:text-4xl">
          iCloud Mail
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
          What’s possible with iCloud Mail, and the recommended enterprise approach.
        </p>
      </header>

      <section className="mt-8">
        <h2>Recommendation</h2>
        <p>
          iCloud Mail does not offer the same reliable rule-based auto-forwarding
          as Outlook/Gmail web clients. For enterprise workflows, configure
          forwarding rules in the provider (Microsoft 365 or Gmail) instead.
        </p>
      </section>

      <section className="mt-10">
        <h2>Manual forwarding (quick)</h2>
        <ol>
          <li>Open the deal email</li>
          <li>Tap the forward icon</li>
          <li>Enter the Auto-margin intake address</li>
          <li>Send</li>
        </ol>
      </section>

      <section className="mt-10">
        <h2>When to use iCloud Mail</h2>
        <ul>
          <li>On-the-go forwarding of a single deal</li>
          <li>Quick triage before a full screening run</li>
        </ul>
      </section>
    </article>
  );
}

