import { GuidebookArticle } from "../../_shared/guidebook-article";

export default function GuidebookInstallationPage() {
  return (
    <GuidebookArticle
      sectionLabel="Documentation"
      title="Installation"
      description="Integration options for enterprise teams (overview)."
    >
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
    </GuidebookArticle>
  );
}

