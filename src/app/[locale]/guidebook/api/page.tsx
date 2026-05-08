import { GuidebookArticle } from "../_shared/guidebook-article";

export default function GuidebookApiPage() {
  return (
    <GuidebookArticle
      sectionLabel="API"
      title="API overview"
      description="A lightweight placeholder until the API surface is finalized."
    >
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
    </GuidebookArticle>
  );
}

