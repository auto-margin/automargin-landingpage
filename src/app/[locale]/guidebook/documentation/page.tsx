import { GuidebookArticle } from "../_shared/guidebook-article";

export default function GuidebookDocumentationPage() {
  return (
    <GuidebookArticle
      sectionLabel="Documentation"
      title="Data inputs and outputs"
      description="A reference for the fields teams typically provide, and the outputs Auto-margin returns for screening and margin validation."
    >
      <section className="mt-8">
        <h2>Start here</h2>
        <ul>
          <li>
            <a href="/guidebook/documentation/how-to-setup">How to setup</a>
          </li>
          <li>
            <a href="/guidebook/documentation/installation">Installation</a>
          </li>
          <li>
            <a href="/guidebook/documentation/tips-and-tricks">Tips &amp; tricks</a>
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Typical inputs</h2>
        <ul>
          <li>Vehicle identifier (VIN / registration)</li>
          <li>Make, model, trim, year</li>
          <li>Mileage, fuel type, transmission</li>
          <li>Supplier price and location</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Typical outputs</h2>
        <ul>
          <li>Comparable market ranges per region</li>
          <li>Margin estimate and confidence</li>
          <li>Gap / scarcity signals</li>
          <li>Dealer-fit / outreach hints</li>
        </ul>
      </section>
    </GuidebookArticle>
  );
}

