import { GuidebookArticle } from "../../_shared/guidebook-article";

export default function GuidebookApiEndpointsPage() {
  return (
    <GuidebookArticle
      sectionLabel="API"
      title="Endpoints (draft)"
      description="Example endpoints you’d expect in an enterprise screening workflow."
    >
      <section className="mt-8">
        <h2>POST /screen</h2>
        <p>Submit a batch to be screened.</p>
        <pre>
          <code>{`{
  "market": "EU",
  "vehicles": [{ "vin": "…", "supplierPrice": 12300, "currency": "EUR" }]
}`}</code>
        </pre>
      </section>

      <section className="mt-8">
        <h2>GET /results/{`{id}`}</h2>
        <p>Fetch completed results for a screening run.</p>
      </section>

      <section className="mt-8">
        <h2>GET /markets</h2>
        <p>List supported markets, sources, and constraints.</p>
      </section>
    </GuidebookArticle>
  );
}

