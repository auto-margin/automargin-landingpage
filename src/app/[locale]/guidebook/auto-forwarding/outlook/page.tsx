import { GuidebookArticle } from "../../_shared/guidebook-article";

export default function GuidebookAutoForwardingOutlookPage() {
  return (
    <GuidebookArticle
      sectionLabel="Guides · Auto forwarding"
      title="Outlook (Microsoft 365)"
      description="Automatically forward specific deal emails to Auto-margin for validation checks."
    >
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
    </GuidebookArticle>
  );
}

