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

export default async function GuidebookAutoForwardingGmailPage({
  params,
}: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Guidebook.pages.autoForwardingGmail");

  return (
    <GuidebookArticle
      sectionLabel={t("section")}
      title={t("title")}
      description={t("description")}
    >
      <section className="mt-8">
        <h2>{t("addForwardingAddress")}</h2>
        <ol>
          <li>
            {withStrongParts(t("addStep1"), [
              t("addStep1Settings"),
              t("addStep1SeeAllSettings"),
            ])}
          </li>
          <li>
            {withStrongParts(t("addStep2"), [
              t("addStep2Forwarding"),
              t("addStep2AddAddress"),
            ])}
          </li>
          <li>{t("addStep3")}</li>
        </ol>
      </section>

      <section className="mt-10">
        <h2>{t("createAFilter")}</h2>
        <ol>
          <li>
            {withStrongParts(t("filterStep1"), [
              t("filterStep1Filters"),
              t("filterStep1Create"),
            ])}
          </li>
          <li>{t("filterStep2")}</li>
          <li>{withStrong(t("filterStep3"), t("filterStep3Strong"))}</li>
          <li>{t("filterStep4")}</li>
        </ol>
      </section>

      <section className="mt-10">
        <h2>{t("tips")}</h2>
        <ul>
          <li>{t("tipStartNarrow")}</li>
          <li>{t("tipLabelForwarded")}</li>
        </ul>
      </section>
    </GuidebookArticle>
  );
}
