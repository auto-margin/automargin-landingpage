import { getTranslations, setRequestLocale } from "next-intl/server";

import { GuidebookArticle } from "../../_shared/guidebook-article";

type Props = { params: Promise<{ locale: string }> };

export default async function GuidebookAutoForwardingIosMailPage({
  params,
}: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Guidebook.pages.autoForwardingIosMail");

  return (
    <GuidebookArticle
      sectionLabel={t("section")}
      title={t("title")}
      description={t("description")}
    >
      <section className="mt-8">
        <h2>{t("recommendation")}</h2>
        <p>{t("recommendationBody")}</p>
      </section>

      <section className="mt-10">
        <h2>{t("manualForwardingQuick")}</h2>
        <ol>
          <li>{t("manualStep1")}</li>
          <li>{t("manualStep2")}</li>
          <li>{t("manualStep3")}</li>
          <li>{t("manualStep4")}</li>
        </ol>
      </section>

      <section className="mt-10">
        <h2>{t("whenToUseICloudMail")}</h2>
        <ul>
          <li>{t("whenOnTheGo")}</li>
          <li>{t("whenQuickTriage")}</li>
        </ul>
      </section>
    </GuidebookArticle>
  );
}
