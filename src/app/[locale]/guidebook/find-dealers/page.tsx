import { getTranslations, setRequestLocale } from "next-intl/server";

import { GuidebookArticle } from "../_shared/guidebook-article";
import { GuidebookPager } from "../guidebook-pager";

type Props = { params: Promise<{ locale: string }> };

export default async function GuidebookFindDealersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Guidebook.pages.findDealers");

  return (
    <GuidebookArticle
      sectionLabel={t("section")}
      title={t("title")}
      description={t("description")}
    >
      <section className="mt-8">
        <p>{t("intro")}</p>
      </section>

      <section className="mt-8">
        <h2>{t("dealerFitChecklist")}</h2>
        <ul>
          <li>
            <strong>{t("segmentFitStrong")}</strong>
            {t("segmentFit").slice(t("segmentFitStrong").length)}
          </li>
          <li>
            <strong>{t("inventoryGapStrong")}</strong>
            {t("inventoryGap").slice(t("inventoryGapStrong").length)}
          </li>
          <li>
            <strong>{t("geographicFitStrong")}</strong>
            {t("geographicFit").slice(t("geographicFitStrong").length)}
          </li>
          <li>
            <strong>{t("priceBandFitStrong")}</strong>
            {t("priceBandFit").slice(t("priceBandFitStrong").length)}
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>{t("outreachSequencing")}</h2>
        <ol>
          <li>{t("outreachBeginWithShortDealers")}</li>
          <li>{t("outreachPrioritizeHighTurnover")}</li>
          <li>{t("outreachLeadWithEvidence")}</li>
        </ol>
      </section>

      <section className="mt-8">
        <h2>{t("outreachNoteStructure")}</h2>
        <p>{t("outreachNoteStructureIntro")}</p>
        <ul>
          <li>{t("outreachVehicleSummary")}</li>
          <li>{t("outreachAskingPrice")}</li>
          <li>{t("outreachFitRationale")}</li>
          <li>{t("outreachNextAction")}</li>
        </ul>
      </section>

      <GuidebookPager
        nextHref="/guidebook/is-my-car-good"
        nextLabel={t("nextLabel")}
      />
    </GuidebookArticle>
  );
}
