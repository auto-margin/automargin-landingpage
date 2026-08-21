import { getTranslations, setRequestLocale } from "next-intl/server";

import { GuidebookArticle } from "../../_shared/guidebook-article";

type Props = { params: Promise<{ locale: string }> };

export default async function GuidebookApiEndpointsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Guidebook.pages.apiEndpoints");

  return (
    <GuidebookArticle
      sectionLabel={t("section")}
      title={t("title")}
      description={t("description")}
    >
      <section className="mt-8">
        <h2>{t("postScreen")}</h2>
        <p>{t("postScreenBody")}</p>
        <pre>
          <code>{`{
  "market": "EU",
  "vehicles": [{ "vin": "…", "supplierPrice": 12300, "currency": "EUR" }]
}`}</code>
        </pre>
      </section>

      <section className="mt-8">
        <h2>{t("getResults")}</h2>
        <p>{t("getResultsBody")}</p>
      </section>

      <section className="mt-8">
        <h2>{t("getMarkets")}</h2>
        <p>{t("getMarketsBody")}</p>
      </section>
    </GuidebookArticle>
  );
}
