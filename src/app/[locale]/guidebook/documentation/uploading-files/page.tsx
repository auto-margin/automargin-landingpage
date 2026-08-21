import type { ReactNode } from "react";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { GuidebookArticle } from "../../_shared/guidebook-article";

type Props = { params: Promise<{ locale: string }> };

type FormatRow = {
  format: string;
  extension: string;
  note: string;
};

type RejectedGroup = {
  heading: string;
  reason: string;
  extensions: string[];
};

/** Prose styling wraps inline code in backticks. With this many extensions on
 *  the page that punctuation becomes noise, so they render as plain badges. */
function Ext({ children }: { children: ReactNode }) {
  return (
    <span className="not-prose inline-block rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[0.8em] text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
      {children}
    </span>
  );
}

type UploadFlowProps = {
  title: string;
  description: string;
  yourFile: string;
  yourFileSub: string;
  checks: string;
  checksSub: string;
  parsed: string;
  parsedSub: string;
  rejected: string;
  rejectedSub: string;
};

function UploadFlow({
  title,
  description,
  yourFile,
  yourFileSub,
  checks,
  checksSub,
  parsed,
  parsedSub,
  rejected,
  rejectedSub,
}: UploadFlowProps) {
  return (
    <div className="not-prose my-8 overflow-x-auto">
      <svg
        viewBox="0 0 720 190"
        role="img"
        aria-labelledby="upload-flow-title upload-flow-desc"
        className="h-auto w-full min-w-[560px]"
      >
        <title id="upload-flow-title">{title}</title>
        <desc id="upload-flow-desc">{description}</desc>

        <g
          className="fill-none stroke-slate-300 dark:stroke-slate-700"
          strokeWidth="1.5"
        >
          <rect x="8" y="66" width="150" height="58" rx="12" />
          <rect x="222" y="66" width="176" height="58" rx="12" />
          <rect x="462" y="8" width="250" height="58" rx="12" />
          <rect x="462" y="124" width="250" height="58" rx="12" />
        </g>

        <g
          className="fill-slate-900 dark:fill-slate-100"
          fontSize="14"
          fontWeight="600"
        >
          <text x="83" y="90" textAnchor="middle">
            {yourFile}
          </text>
          <text x="310" y="90" textAnchor="middle">
            {checks}
          </text>
          <text x="587" y="32" textAnchor="middle">
            {parsed}
          </text>
          <text x="587" y="148" textAnchor="middle">
            {rejected}
          </text>
        </g>

        <g className="fill-slate-500 dark:fill-slate-400" fontSize="12">
          <text x="83" y="108" textAnchor="middle">
            {yourFileSub}
          </text>
          <text x="310" y="108" textAnchor="middle">
            {checksSub}
          </text>
          <text x="587" y="50" textAnchor="middle">
            {parsedSub}
          </text>
          <text x="587" y="166" textAnchor="middle">
            {rejectedSub}
          </text>
        </g>

        <g
          className="fill-none stroke-slate-400 dark:stroke-slate-600"
          strokeWidth="1.5"
        >
          <path d="M158 95 H222" />
          <path d="M398 95 H430 V37 H462" />
          <path d="M398 95 H430 V153 H462" />
        </g>

        <g className="fill-slate-400 dark:fill-slate-600">
          <path d="M462 37 l-8 -4 v8 z" />
          <path d="M462 153 l-8 -4 v8 z" />
          <path d="M222 95 l-8 -4 v8 z" />
        </g>
      </svg>
    </div>
  );
}

function withEm(text: string, em: string) {
  const index = text.indexOf(em);
  if (index < 0) return text;
  return (
    <>
      {text.slice(0, index)}
      <em>{em}</em>
      {text.slice(index + em.length)}
    </>
  );
}

function withExtTokens(text: string, tokens: string[]): ReactNode {
  let earliestIndex = -1;
  let matched: string | null = null;

  for (const token of tokens) {
    const index = text.indexOf(token);
    if (index < 0) continue;
    if (
      earliestIndex < 0 ||
      index < earliestIndex ||
      (index === earliestIndex && token.length > (matched?.length ?? 0))
    ) {
      earliestIndex = index;
      matched = token;
    }
  }

  if (matched == null || earliestIndex < 0) return text;

  return (
    <>
      {text.slice(0, earliestIndex)}
      <Ext>{matched}</Ext>
      {withExtTokens(text.slice(earliestIndex + matched.length), tokens)}
    </>
  );
}

export default async function GuidebookUploadingFilesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Guidebook.pages.uploadingFiles");

  const acceptedRows = Object.values(
    t.raw("acceptedRows") as Record<string, FormatRow>,
  );
  const rejectedGroups = Object.values(
    t.raw("rejectedGroups") as Record<string, RejectedGroup>,
  );

  return (
    <GuidebookArticle
      sectionLabel={t("section")}
      title={t("title")}
      description={t("description")}
    >
      <section className="mt-8">
        <h2>{t("whyWeAreStrict")}</h2>
        <p>{t("whyWeAreStrictBody1")}</p>
        <p>{t("whyWeAreStrictBody2")}</p>
        <UploadFlow
          title={t("uploadFlowTitle")}
          description={t("uploadFlowDesc")}
          yourFile={t("uploadFlowYourFile")}
          yourFileSub={t("uploadFlowYourFileSub")}
          checks={t("uploadFlowChecks")}
          checksSub={t("uploadFlowChecksSub")}
          parsed={t("uploadFlowParsed")}
          parsedSub={t("uploadFlowParsedSub")}
          rejected={t("uploadFlowRejected")}
          rejectedSub={t("uploadFlowRejectedSub")}
        />
      </section>

      <section className="mt-8">
        <h2>{t("whatWeAccept")}</h2>
        <table>
          <thead>
            <tr>
              <th>{t("tableHeaderFormat")}</th>
              <th>{t("tableHeaderExtension")}</th>
              <th>{t("tableHeaderNotes")}</th>
            </tr>
          </thead>
          <tbody>
            {acceptedRows.map((row) => (
              <tr key={row.extension}>
                <td>{row.format}</td>
                <td>
                  <Ext>{row.extension}</Ext>
                </td>
                <td>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>{t("sizeLimitNote")}</p>
      </section>

      <section className="mt-8">
        <h2>{t("whatWeDoNotAccept")}</h2>
        <p>
          {withEm(t("whatWeDoNotAcceptIntro"), t("whatWeDoNotAcceptIntroEm"))}
        </p>

        {rejectedGroups.map((group) => (
          <div key={group.heading}>
            <h3>{group.heading}</h3>
            <p>{group.reason}</p>
            {group.extensions.length ? (
              <div className="not-prose mt-3 flex flex-wrap gap-1.5">
                {group.extensions.map((extension) => (
                  <Ext key={extension}>{extension}</Ext>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </section>

      <section className="mt-8">
        <h2>{t("renamingDoesNotHelp")}</h2>
        <p>
          {withExtTokens(t("renamingDoesNotHelpBody"), [
            "stock.xlsm",
            "stock.xlsx",
            ".csv",
            ".xlsx",
          ])}
        </p>
      </section>

      <section className="mt-8">
        <h2>{t("noteOnSpreadsheetFormulas")}</h2>
        <p>
          {withExtTokens(t("noteOnSpreadsheetFormulasBody"), [
            "=",
            "+",
            "-",
            "@",
          ])}
        </p>
      </section>

      <section className="mt-8">
        <h2>{t("beforeYouUpload")}</h2>
        <ul>
          <li>{t("beforeOneListPerFile")}</li>
          <li>{t("beforeKeepHeaderRow")}</li>
          <li>{t("beforeRemovePassword")}</li>
          <li>{t("beforeSendFileItself")}</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>{t("ifAFileIsRejected")}</h2>
        <p>{t("ifRejectedBody1")}</p>
        <p>{t("ifRejectedBody2")}</p>
      </section>
    </GuidebookArticle>
  );
}
