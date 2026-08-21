import { getTranslations, setRequestLocale } from "next-intl/server";

import { GuidebookArticle } from "../../_shared/guidebook-article";

type Props = { params: Promise<{ locale: string }> };

export default async function GuidebookInstallationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Guidebook.pages.installation");

  return (
    <GuidebookArticle
      sectionLabel={t("section")}
      title={t("title")}
      description={t("description")}
    >
      <section className="mt-8">
        <h2>{t("inputMethods")}</h2>
        <ul>
          <li>{t("inputCsvXlsxUpload")}</li>
          <li>{t("inputMarketplaceExport")}</li>
          <li>{t("inputApiBatchScreening")}</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>{t("outputMethods")}</h2>
        <ul>
          <li>{t("outputExportsCsv")}</li>
          <li>{t("outputWebhookCallback")}</li>
          <li>{t("outputInternalHandoff")}</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>{t("securityBasics")}</h2>
        <ul>
          <li>{t("securityLeastPrivilege")}</li>
          <li>{t("securityLogAccessExports")}</li>
          <li>{t("securityDataRetention")}</li>
        </ul>
      </section>
    </GuidebookArticle>
  );
}
