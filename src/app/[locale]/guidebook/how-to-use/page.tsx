import { getTranslations, setRequestLocale } from "next-intl/server";

import { GuidebookArticle } from "../_shared/guidebook-article";
import { GuidebookPager } from "../guidebook-pager";

type Props = { params: Promise<{ locale: string }> };

export default async function GuidebookHowToUsePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Guidebook.pages.howToUse");

  const decideStrong = t("workflowDecideStrong");
  const decideRest = t("workflowDecide").slice(decideStrong.length);
  const decideEm = t("workflowDecideEm");
  const decideEmIndex = decideRest.indexOf(decideEm);

  return (
    <GuidebookArticle
      sectionLabel={t("section")}
      title={t("title")}
      description={t("description")}
    >
      <section className="mt-8">
        <h2>{t("inputDataRequirements")}</h2>
        <p>{t("inputDataRequirementsIntro")}</p>
        <h3>{t("required")}</h3>
        <p>{t("requiredIntro")}</p>
        <ul>
          <li>{t("requiredMakeAndModel")}</li>
          <li>{t("requiredFirstRegistrationDate")}</li>
          <li>{t("requiredMileage")}</li>
          <li>{t("requiredFuelType")}</li>
          <li>{t("requiredTransmission")}</li>
          <li>{t("requiredAskingPrice")}</li>
        </ul>
        <p>{t("askingPriceOmittedNote")}</p>
        <h3>{t("stronglyRecommended")}</h3>
        <ul>
          <li>{t("recommendedTrimOrEquipmentLevel")}</li>
          <li>{t("recommendedPowerOutput")}</li>
          <li>{t("recommendedBodyStyle")}</li>
        </ul>
        <h3>{t("optional")}</h3>
        <ul>
          <li>{t("optionalVin")}</li>
          <li>{t("optionalCountryOfOrigin")}</li>
          <li>{t("optionalNotableOptions")}</li>
          <li>{t("optionalConditionNotes")}</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>{t("noteOnTrimLevels")}</h2>
        <p>{t("noteOnTrimLevelsBody")}</p>
      </section>

      <section className="mt-8">
        <h2>{t("comparisonLogic")}</h2>
        <p>{t("comparisonLogicIntro")}</p>
        <ul>
          <li>{t("comparisonBrandModelTrim")}</li>
          <li>{t("comparisonFirstRegistration")}</li>
          <li>{t("comparisonMileage")}</li>
          <li>{t("comparisonAskingPrice")}</li>
          <li>{t("comparisonFuelType")}</li>
          <li>{t("comparisonBodyType")}</li>
          <li>{t("comparisonPowerOutput")}</li>
        </ul>
        <p>{t("equipmentFlagsIntro")}</p>
        <ul>
          <li>{t("equipmentPanoramicRoof")}</li>
          <li>{t("equipmentTowbar")}</li>
          <li>{t("equipmentAllWheelDrive")}</li>
          <li>{t("equipmentSevenSeater")}</li>
        </ul>
        <p>{t("fewComparablesNote")}</p>
      </section>

      <section className="mt-8">
        <h2>{t("workflow")}</h2>
        <ol>
          <li>
            <strong>{t("workflowPrepareInputStrong")}</strong>
            {t("workflowPrepareInput").slice(t("workflowPrepareInputStrong").length)}
          </li>
          <li>
            <strong>{t("workflowSelectTargetMarketStrong")}</strong>
            {t("workflowSelectTargetMarket").slice(
              t("workflowSelectTargetMarketStrong").length,
            )}
          </li>
          <li>
            <strong>{t("workflowRunEvaluationStrong")}</strong>
            {t("workflowRunEvaluation").slice(
              t("workflowRunEvaluationStrong").length,
            )}
          </li>
          <li>
            <strong>{t("workflowReviewResultStrong")}</strong>
            {t("workflowReviewResult").slice(t("workflowReviewResultStrong").length)}
          </li>
          <li>
            <strong>{decideStrong}</strong>
            {decideEmIndex < 0 ? (
              decideRest
            ) : (
              <>
                {decideRest.slice(0, decideEmIndex)}
                <em>{decideEm}</em>
                {decideRest.slice(decideEmIndex + decideEm.length)}
              </>
            )}
          </li>
        </ol>
      </section>

      <section className="mt-8">
        <h2>{t("readingResults")}</h2>
        <ul>
          <li>{t("readingResultsPriceBand")}</li>
          <li>{t("readingResultsConfidence")}</li>
          <li>{t("readingResultsOutliers")}</li>
          <li>{t("readingResultsMargin")}</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>{t("fileAndLanguageSupport")}</h2>
        <p>
          {t("fileAndLanguageSupportBody")
            .split(/(price|mileage|first_registration)/)
            .map((part, index) =>
              part === "price" ||
              part === "mileage" ||
              part === "first_registration" ? (
                <code key={`${part}-${index}`}>{part}</code>
              ) : (
                <span key={`text-${index}`}>{part}</span>
              ),
            )}
        </p>
      </section>

      <GuidebookPager
        nextHref="/guidebook/find-dealers"
        nextLabel={t("nextLabel")}
      />
    </GuidebookArticle>
  );
}
