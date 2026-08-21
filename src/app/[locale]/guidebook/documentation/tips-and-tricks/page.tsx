import { getTranslations, setRequestLocale } from "next-intl/server";

import { GuidebookArticle } from "../../_shared/guidebook-article";

type Props = { params: Promise<{ locale: string }> };

export default async function GuidebookTipsAndTricksPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Guidebook.pages.tipsAndTricks");

  return (
    <GuidebookArticle
      sectionLabel={t("section")}
      title={t("title")}
      description={t("description")}
    >
      <section className="mt-8">
        <h2>{t("inputQuality")}</h2>
        <ul>
          <li>{t("inputNormalizeMileage")}</li>
          <li>{t("inputKeepCurrencyConsistent")}</li>
          <li>{t("inputPreferVinPlate")}</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>{t("marketSelection")}</h2>
        <ul>
          <li>{t("marketUseRelevantMarkets")}</li>
          <li>{t("marketSeparateRetailWholesale")}</li>
          <li>{t("marketTrackSeasonalEffects")}</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>{t("decisionHygiene")}</h2>
        <ul>
          <li>{t("decisionStoreWhy")}</li>
          <li>{t("decisionReviewOutliers")}</li>
          <li>{t("decisionMeasureWinRate")}</li>
        </ul>
      </section>
    </GuidebookArticle>
  );
}
