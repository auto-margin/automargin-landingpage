import type { ReactNode } from "react";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { GuidebookArticle } from "../_shared/guidebook-article";

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

function withStrongParts(
  text: string,
  parts: Array<{ key: string; value: string }>,
): ReactNode {
  if (parts.length === 0) return text;

  const [first, ...rest] = parts;
  const index = text.indexOf(first.value);
  if (index < 0) return withStrongParts(text, rest);

  return (
    <>
      {text.slice(0, index)}
      <strong>{first.value}</strong>
      {withStrongParts(text.slice(index + first.value.length), rest)}
    </>
  );
}

export default async function GuidebookAutoForwardingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Guidebook.pages.autoForwarding");

  const dedicatedAddress = "deals@your-company.com";
  const beforeDedicated = t("beforeDedicatedForwardingAddress");
  const dedicatedIndex = beforeDedicated.indexOf(dedicatedAddress);

  const iCloudBody2 = t("iCloudMailBody2");
  const forwardStrong = t("iCloudMailForwardStrong");
  const forwardIndex = iCloudBody2.indexOf(forwardStrong);

  return (
    <GuidebookArticle
      sectionLabel={t("section")}
      title={t("title")}
      description={t("description")}
    >
      <section className="mt-8">
        <h2>{t("beforeYouStart")}</h2>
        <ul>
          <li>
            {dedicatedIndex < 0 ? (
              beforeDedicated
            ) : (
              <>
                {beforeDedicated.slice(0, dedicatedIndex)}
                <code>{dedicatedAddress}</code>
                {beforeDedicated.slice(
                  dedicatedIndex + dedicatedAddress.length,
                )}
              </>
            )}
          </li>
          <li>{t("beforeForwardOnlyWhatYouNeed")}</li>
          <li>{t("beforeItApproval")}</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2>{t("outlookHeading")}</h2>
        <ol>
          <li>{withStrong(t("outlookStep1"), t("outlookStep1Strong"))}</li>
          <li>
            {withStrongParts(t("outlookStep2"), [
              { key: "mail", value: t("outlookStep2Mail") },
              { key: "rules", value: t("outlookStep2Rules") },
            ])}
          </li>
          <li>{t("outlookStep3")}</li>
          <li>{withStrong(t("outlookStep4"), t("outlookStep4Strong"))}</li>
          <li>{t("outlookStep5")}</li>
        </ol>
        <p>{t("outlookTip")}</p>
      </section>

      <section className="mt-10">
        <h2>{t("gmailHeading")}</h2>
        <ol>
          <li>
            {withStrongParts(t("gmailStep1"), [
              { key: "settings", value: t("gmailStep1Settings") },
              { key: "seeAll", value: t("gmailStep1SeeAllSettings") },
            ])}
          </li>
          <li>{withStrong(t("gmailStep2"), t("gmailStep2Strong"))}</li>
          <li>{t("gmailStep3")}</li>
          <li>
            {withStrongParts(t("gmailStep4"), [
              { key: "settings", value: t("gmailStep4Settings") },
              { key: "filters", value: t("gmailStep4Filters") },
              { key: "create", value: t("gmailStep4Create") },
            ])}
          </li>
          <li>{t("gmailStep5")}</li>
          <li>{withStrong(t("gmailStep6"), t("gmailStep6Strong"))}</li>
        </ol>
        <p>{t("gmailTip")}</p>
      </section>

      <section className="mt-10">
        <h2>{t("iCloudMailHeading")}</h2>
        <p>{t("iCloudMailBody1")}</p>
        <p>
          {forwardIndex < 0 ? (
            iCloudBody2
          ) : (
            <>
              {iCloudBody2.slice(0, forwardIndex)}
              <strong>{forwardStrong}</strong>
              {iCloudBody2.slice(forwardIndex + forwardStrong.length)}
            </>
          )}
        </p>
      </section>

      <section className="mt-10">
        <h2>{t("whatHappensAfterForwarding")}</h2>
        <ul>
          <li>{t("afterParseEmail")}</li>
          <li>{t("afterExtractVehicleData")}</li>
          <li>{t("afterRunScreening")}</li>
        </ul>
      </section>
    </GuidebookArticle>
  );
}
