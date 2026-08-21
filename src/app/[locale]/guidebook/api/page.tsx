import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { GuidebookArticle } from "../_shared/guidebook-article";

type Props = { params: Promise<{ locale: string }> };

export default async function GuidebookApiPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Guidebook.pages.api");

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
            <Link href="/guidebook/api/endpoints">{t("linkEndpoints")}</Link>
          </li>
          <li>
            <Link href="/guidebook/api/validation">{t("linkValidation")}</Link>
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>{t("authentication")}</h2>
        <p>{t("authenticationBody")}</p>
      </section>
    </GuidebookArticle>
  );
}
