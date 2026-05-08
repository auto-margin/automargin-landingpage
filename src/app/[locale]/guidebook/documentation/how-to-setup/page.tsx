import { GuidebookArticle } from "../../_shared/guidebook-article";

export default function GuidebookHowToSetupPage() {
  return (
    <GuidebookArticle
      sectionLabel="Documentation"
      title="How to setup (enterprise)"
      description="Recommended setup for teams: environments, roles, data sources, and operational guardrails."
    >
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
    </GuidebookArticle>
  );
}

