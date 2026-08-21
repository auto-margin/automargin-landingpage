import { getTranslations, setRequestLocale } from "next-intl/server";

import { GuidebookArticle } from "../../_shared/guidebook-article";

type Props = { params: Promise<{ locale: string }> };

export default async function GuidebookHowToSetupPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Guidebook.pages.howToSetup");

  return (
    <GuidebookArticle
      sectionLabel={t("section")}
      title={t("title")}
      description={t("description")}
    >
      <section className="mt-8">
        <h2>{t("environment")}</h2>
        <ul>
          <li>{t("envSeparateStagingProduction")}</li>
          <li>{t("envAllowlistOutbound")}</li>
          <li>{t("envDefaultComparisonMarkets")}</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>{t("rolesAndAccess")}</h2>
        <ul>
          <li>{t("roleAdmin")}</li>
          <li>{t("roleAnalyst")}</li>
          <li>{t("roleSalesOutreach")}</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>{t("operationalGuardrails")}</h2>
        <ul>
          <li>{t("guardrailMaxListSize")}</li>
          <li>{t("guardrailMinimumFields")}</li>
          <li>{t("guardrailAuditTrail")}</li>
        </ul>
      </section>
    </GuidebookArticle>
  );
}
