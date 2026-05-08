import { GuidebookArticle } from "../../_shared/guidebook-article";

export default function GuidebookAutoForwardingIosMailPage() {
  return (
    <GuidebookArticle
      sectionLabel="Guides · Auto forwarding"
      title="iCloud Mail"
      description="What’s possible with iCloud Mail, and the recommended enterprise approach."
    >
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
    </GuidebookArticle>
  );
}

