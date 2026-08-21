import { getTranslations, setRequestLocale } from "next-intl/server";

import { GuidebookArticle } from "../_shared/guidebook-article";
import { GuidebookPager } from "../guidebook-pager";

type Props = { params: Promise<{ locale: string }> };

export default async function GuidebookIsMyCarGoodPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Guidebook.pages.isMyCarGood");
  const tChrome = await getTranslations("Guidebook.chrome");

  const copyStrong = t("copyInfoStrong");
  const incorrectGuidance = t("incorrectResultGuidance");
  const copyIndex = incorrectGuidance.indexOf(copyStrong);

  return (
    <GuidebookArticle
      sectionLabel={t("section")}
      title={t("title")}
      description={t("description")}
    >
      <section className="mt-8">
        <h2>{t("decisionFramework")}</h2>
        <p>{t("decisionFrameworkIntro")}</p>
        <ul>
          <li>
            <strong>{t("marginStrong")}</strong>
            {t("margin").slice(t("marginStrong").length)}
          </li>
          <li>
            <strong>{t("confidenceStrong")}</strong>
            {t("confidence").slice(t("confidenceStrong").length)}
          </li>
          <li>
            <strong>{t("velocityStrong")}</strong>
            {t("velocity").slice(t("velocityStrong").length)}
          </li>
          <li>
            <strong>{t("riskStrong")}</strong>
            {t("risk").slice(t("riskStrong").length)}
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>{t("redFlags")}</h2>
        <ul>
          <li>{t("redFlagAskingPriceMissing")}</li>
          <li>{t("redFlagFewComparables")}</li>
          <li>{t("redFlagOutlierSpec")}</li>
          <li>{t("redFlagWideBand")}</li>
          <li>{t("redFlagAskingAtOrAboveMidpoint")}</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>{t("greenFlags")}</h2>
        <ul>
          <li>{t("greenFlagStableComparables")}</li>
          <li>{t("greenFlagClearGap")}</li>
          <li>{t("greenFlagDealerFit")}</li>
          <li>{t("greenFlagAskingBelowLowerEdge")}</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>{t("knownLimitations")}</h2>
        <p>{t("knownLimitationsIntro")}</p>
        <ol>
          <li>
            <strong>{t("limitationModelYearAmbiguityStrong")}</strong>
            {t("limitationModelYearAmbiguity").slice(
              t("limitationModelYearAmbiguityStrong").length,
            )}
          </li>
          <li>
            <strong>{t("limitationSourceListingErrorsStrong")}</strong>
            {t("limitationSourceListingErrors").slice(
              t("limitationSourceListingErrorsStrong").length,
            )}
          </li>
        </ol>
        <p>
          {copyIndex < 0 ? (
            incorrectGuidance
          ) : (
            <>
              {incorrectGuidance.slice(0, copyIndex)}
              <strong>{copyStrong}</strong>
              {incorrectGuidance.slice(copyIndex + copyStrong.length)}
            </>
          )}
        </p>
      </section>

      <section className="mt-8">
        <h2>{t("scopeOfTheRecommendation")}</h2>
        <p>{t("scopeBody1")}</p>
        <p>{t("scopeBody2")}</p>
      </section>

      <GuidebookPager
        nextHref="/guidebook/documentation"
        nextLabel={t("nextLabel")}
        nextSection={tChrome("continueSection")}
      />
    </GuidebookArticle>
  );
}
