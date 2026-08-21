import type { Metadata } from "next";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { GuidebookArticle } from "./_shared/guidebook-article";
import { GuidebookPager } from "./guidebook-pager";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Guidebook.pages.overview",
  });
  return { description: t("metaDescription") };
}

export default async function GuidebookPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Guidebook.pages.overview");

  return (
    <GuidebookArticle
      sectionLabel={t("section")}
      title={t("title")}
      description={t("description")}
    >
      <section className="mt-8">
        <h2>{t("sectionsInThisGuide")}</h2>
        <ul>
          <li>
            <strong>{t("howToUseOptimallyStrong")}</strong>
            {t("howToUseOptimallyItem").slice(t("howToUseOptimallyStrong").length)}
          </li>
          <li>
            <strong>{t("findDealersStrong")}</strong>
            {t("findDealersItem").slice(t("findDealersStrong").length)}
          </li>
          <li>
            <strong>{t("isMyCarGoodStrong")}</strong>
            {t("isMyCarGoodItem").slice(t("isMyCarGoodStrong").length)}
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>{t("corePrinciple")}</h2>
        <p>{t("corePrincipleBody")}</p>
        <ol>
          <li>{t("corePrinciplePoint1")}</li>
          <li>{t("corePrinciplePoint2")}</li>
        </ol>
      </section>

      <GuidebookPager
        nextHref="/guidebook/how-to-use"
        nextLabel={t("nextLabel")}
      />
    </GuidebookArticle>
  );
}
