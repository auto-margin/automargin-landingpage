import { GuidebookArticle } from "../../_shared/guidebook-article";

export default function GuidebookApiValidationPage() {
  return (
    <GuidebookArticle
      sectionLabel="API"
      title="Validation (enterprise)"
      description="Suggested validation rules to keep runs clean and auditable."
    >
      <section className="mt-8">
        <h2>Required fields</h2>
        <ul>
          <li>At least one identifier (VIN or registration)</li>
          <li>Supplier price + currency</li>
          <li>Location / market context</li>
          <li>Year + mileage (or a reason it’s missing)</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Guardrails</h2>
        <ul>
          <li>Reject mixed currencies in one batch (unless explicitly allowed)</li>
          <li>Reject negative prices and impossible mileages</li>
          <li>Warn on thin comps or wide bands (low confidence)</li>
        </ul>
      </section>
    </GuidebookArticle>
  );
}

