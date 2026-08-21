import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { GuidebookArticle } from "../_shared/guidebook-article";

type Props = { params: Promise<{ locale: string }> };

export default async function GuidebookDocumentationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Guidebook.pages.documentation");

  return (
    <GuidebookArticle
      sectionLabel={t("section")}
      title={t("title")}
      description={t("description")}
    >
      <section className="mt-8">
        <h2>{t("startHere")}</h2>
        <ul>
          <li>
            <Link href="/guidebook/documentation/how-to-setup">
              {t("linkHowToSetup")}
            </Link>
          </li>
          <li>
            <Link href="/guidebook/documentation/installation">
              {t("linkInstallation")}
            </Link>
          </li>
          <li>
            <Link href="/guidebook/documentation/tips-and-tricks">
              {t("linkTipsAndTricks")}
            </Link>
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>{t("typicalInputs")}</h2>
        <ul>
          <li>{t("inputVehicleIdentifier")}</li>
          <li>{t("inputMakeModelTrimYear")}</li>
          <li>{t("inputMileageFuelTransmission")}</li>
          <li>{t("inputSupplierPriceLocation")}</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>{t("typicalOutputs")}</h2>
        <ul>
          <li>{t("outputComparableRanges")}</li>
          <li>{t("outputMarginEstimate")}</li>
          <li>{t("outputGapScarcity")}</li>
          <li>{t("outputDealerFit")}</li>
        </ul>
      </section>
    </GuidebookArticle>
  );
}
