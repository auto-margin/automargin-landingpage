import type { ReactNode } from "react";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { GuidebookArticle } from "../../_shared/guidebook-article";

type Props = { params: Promise<{ locale: string }> };

function withStrong(text: string, strong: string): ReactNode {
  const index = text.indexOf(strong);
  if (index < 0) return text;
  return (
    <>
      {text.slice(0, index)}
      <strong>{strong}</strong>
      {text.slice(index + strong.length)}
    </>
  );
}

function withStrongParts(text: string, values: string[]): ReactNode {
  if (values.length === 0) return text;

  const [first, ...rest] = values;
  const index = text.indexOf(first);
  if (index < 0) return withStrongParts(text, rest);

  return (
    <>
      {text.slice(0, index)}
      <strong>{first}</strong>
      {withStrongParts(text.slice(index + first.length), rest)}
    </>
  );
}

export default async function GuidebookAutoForwardingOutlookPage({
  params,
}: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Guidebook.pages.autoForwardingOutlook");

  const dedicatedAlias = "deals@your-company.com";
  const setupDedicated = t("setupDedicatedAlias");
  const aliasIndex = setupDedicated.indexOf(dedicatedAlias);

  return (
    <GuidebookArticle
      sectionLabel={t("section")}
      title={t("title")}
      description={t("description")}
    >
      <section className="mt-8">
        <h2>{t("recommendedSetup")}</h2>
        <ul>
          <li>
            {aliasIndex < 0 ? (
              setupDedicated
            ) : (
              <>
                {setupDedicated.slice(0, aliasIndex)}
                <code>{dedicatedAlias}</code>
                {setupDedicated.slice(aliasIndex + dedicatedAlias.length)}
              </>
            )}
          </li>
          <li>{t("setupKnownSuppliers")}</li>
          <li>{t("setupTestOneSupplier")}</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2>{t("stepsOutlookOnTheWeb")}</h2>
        <ol>
          <li>{withStrong(t("stepOpenSettings"), t("stepOpenSettingsStrong"))}</li>
          <li>
            {withStrongParts(t("stepMailRules"), [
              t("stepMail"),
              t("stepRules"),
            ])}
          </li>
          <li>{t("stepCreateNewRule")}</li>
          <li>{t("stepAddConditions")}</li>
          <li>
            {withStrong(t("stepActionForwardTo"), t("stepActionForwardToStrong"))}
          </li>
          <li>{t("stepSaveAndTest")}</li>
        </ol>
      </section>

      <section className="mt-10">
        <h2>{t("commonItConstraints")}</h2>
        <ul>
          <li>{t("constraintExternalForwardingBlocked")}</li>
          <li>{t("constraintAllowlistIntake")}</li>
        </ul>
      </section>
    </GuidebookArticle>
  );
}
