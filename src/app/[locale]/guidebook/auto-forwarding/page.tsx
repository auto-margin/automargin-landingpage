import { GuidebookArticle } from "../_shared/guidebook-article";

export default function GuidebookAutoForwardingPage() {
  return (
    <GuidebookArticle
      sectionLabel="Guides"
      title="Auto forwarding"
      description="Set up automatic forwarding so new deals sent to your inbox are routed to Auto-margin for validation checks. This keeps your workflow fast and consistent across the team."
    >
      <section className="mt-8">
        <h2>Before you start</h2>
        <ul>
          <li>
            Use a dedicated forwarding address (e.g.{" "}
            <code>deals@your-company.com</code> → Auto-margin)
          </li>
          <li>
            Forward only what you need (use rules/filters to avoid noise)
          </li>
          <li>
            If your organization blocks auto-forwarding, your IT team may need
            to approve it
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2>Outlook (Microsoft 365)</h2>
        <ol>
          <li>
            Open Outlook on the web and go to <strong>Settings</strong>
          </li>
          <li>
            Navigate to <strong>Mail</strong> → <strong>Rules</strong>
          </li>
          <li>
            Create a new rule (for example: Subject contains “Offer” or Sender
            is “supplier@…”)
          </li>
          <li>
            Set the action to <strong>Forward to</strong> the Auto-margin intake
            address
          </li>
          <li>
            Save the rule and send a test email to confirm forwarding works
          </li>
        </ol>
        <p>
          Tip: keep rules narrow (supplier list senders, auction notices, or a
          specific alias) to reduce false submissions.
        </p>
      </section>

      <section className="mt-10">
        <h2>Gmail</h2>
        <ol>
          <li>
            In Gmail, open <strong>Settings</strong> →{" "}
            <strong>See all settings</strong>
          </li>
          <li>
            Go to <strong>Forwarding and POP/IMAP</strong>
          </li>
          <li>
            Add the Auto-margin intake email as a forwarding address (Gmail may
            require verification)
          </li>
          <li>
            Create a filter: <strong>Settings</strong> →{" "}
            <strong>Filters and Blocked Addresses</strong> →{" "}
            <strong>Create a new filter</strong>
          </li>
          <li>
            Choose conditions (sender, subject keywords, has attachment, etc.)
          </li>
          <li>
            Select <strong>Forward it to</strong> and pick the intake address
          </li>
        </ol>
        <p>
          Tip: use labels + filters so your team can audit what was forwarded.
        </p>
      </section>

      <section className="mt-10">
        <h2>iCloud Mail</h2>
        <p>
          iCloud Mail does not support the same enterprise-grade auto-forwarding
          rules as web clients. For reliable auto-forwarding, set up the rule
          in your mailbox provider (Outlook or Gmail) instead.
        </p>
        <p>
          If you only need manual forwarding: open an email →{" "}
          <strong>Forward</strong> → enter the intake address.
        </p>
      </section>

      <section className="mt-10">
        <h2>What happens after forwarding?</h2>
        <ul>
          <li>We parse the email content and attachments (when applicable)</li>
          <li>We extract vehicle data (or prompt for missing fields)</li>
          <li>We run screening and return a result you can act on</li>
        </ul>
      </section>
    </GuidebookArticle>
  );
}

