import { getTranslations, setRequestLocale } from "next-intl/server";

import { GuidebookArticle } from "../../_shared/guidebook-article";

type Props = { params: Promise<{ locale: string }> };

export default async function GuidebookApiValidationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Guidebook.pages.apiValidation");

  return (
    <GuidebookArticle
      sectionLabel={t("section")}
      title={t("title")}
      description={t("description")}
    >
      <section className="mt-8">
        <h2>{t("requiredFields")}</h2>
        <ul>
          <li>{t("requiredIdentifier")}</li>
          <li>{t("requiredSupplierPriceCurrency")}</li>
          <li>{t("requiredLocationMarket")}</li>
          <li>{t("requiredYearMileage")}</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>{t("guardrails")}</h2>
        <ul>
          <li>{t("guardrailMixedCurrencies")}</li>
          <li>{t("guardrailNegativePrices")}</li>
          <li>{t("guardrailThinComps")}</li>
        </ul>
      </section>
    </GuidebookArticle>
  );
}
