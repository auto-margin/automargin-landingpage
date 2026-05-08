import { GuidebookArticle } from "../../_shared/guidebook-article";

export default function GuidebookTipsAndTricksPage() {
  return (
    <GuidebookArticle
      sectionLabel="Documentation"
      title="Tips & tricks"
      description="Small optimizations that improve screening quality and reduce false positives."
    >
      <section className="mt-8">
        <h2>Input quality</h2>
        <ul>
          <li>Normalize mileage units and formatting</li>
          <li>Keep currency consistent per batch</li>
          <li>Prefer VIN/plate when available (reduces ambiguity)</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Market selection</h2>
        <ul>
          <li>Use 2–4 relevant markets instead of “all markets”</li>
          <li>Separate retail and wholesale comparisons</li>
          <li>Track seasonal effects for specific segments</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Decision hygiene</h2>
        <ul>
          <li>Always store “why this decision” as structured notes</li>
          <li>Review outliers weekly (tune your guardrails)</li>
          <li>Measure win-rate by segment to improve rules</li>
        </ul>
      </section>
    </GuidebookArticle>
  );
}

