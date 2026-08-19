import { GuidebookArticle } from "../../_shared/guidebook-article";

/*
 * DRAFT CONTENT — the accepted-format table, the size limit and the retention
 * window below are placeholders written to give the page its shape. Confirm the
 * real values with the platform team before this is treated as policy.
 */

type FormatRow = {
  format: string;
  extension: string;
  note: string;
};

const ACCEPTED: FormatRow[] = [
  {
    format: "Comma-separated values",
    extension: ".csv",
    note: "Preferred. Smallest, fastest to process, nothing hidden inside it.",
  },
  {
    format: "Excel workbook",
    extension: ".xlsx",
    note: "The modern Excel format. Must not contain macros.",
  },
  {
    format: "OpenDocument spreadsheet",
    extension: ".ods",
    note: "LibreOffice and OpenOffice exports.",
  },
  {
    format: "Portable document",
    extension: ".pdf",
    note: "Dealer offer sheets and printed stock lists.",
  },
  {
    format: "Plain text",
    extension: ".txt",
    note: "Tab- or semicolon-separated exports from older DMS systems.",
  },
];

type RejectedGroup = {
  heading: string;
  reason: string;
  extensions: string[];
};

const REJECTED: RejectedGroup[] = [
  {
    heading: "Macro-enabled Office files",
    reason:
      "These formats exist specifically to carry executable code. A macro runs as soon as someone enables content, which makes them the most common delivery method for office-targeted malware. There is no version of a car list that needs a macro.",
    extensions: [".xlsm", ".xlsb", ".xltm", ".docm", ".dotm", ".pptm", ".potm"],
  },
  {
    heading: "Legacy Office binaries",
    reason:
      "The pre-2007 OLE2 container hides embedded objects and streams that are hard to inspect reliably. It has a long history of parser vulnerabilities, and modern tooling has largely stopped hardening it. Open the file and re-save it as .xlsx or .csv.",
    extensions: [".xls", ".xlt", ".xlw", ".doc", ".dot", ".ppt", ".pps"],
  },
  {
    heading: "Legacy and obscure spreadsheet formats",
    reason:
      "Formats from the Lotus, Quattro Pro and dBase era, plus interchange formats that predate any security model. SYLK in particular is still actively abused because it executes commands while looking like a harmless text file.",
    extensions: [
      ".slk",
      ".dif",
      ".wk1",
      ".wk3",
      ".wk4",
      ".wks",
      ".123",
      ".wq1",
      ".qpw",
      ".dbf",
      ".prn",
      ".sxc",
      ".xlr",
      ".wb2",
    ],
  },
  {
    heading: "Executables, installers and scripts",
    reason:
      "Nothing in this category is a vehicle list. If one arrives, it is either a mistake or an attack, and we treat both the same way.",
    extensions: [
      ".exe",
      ".msi",
      ".bat",
      ".cmd",
      ".com",
      ".scr",
      ".pif",
      ".vbs",
      ".vbe",
      ".js",
      ".jse",
      ".wsf",
      ".wsh",
      ".ps1",
      ".psm1",
      ".hta",
      ".jar",
      ".apk",
      ".app",
      ".sh",
    ],
  },
  {
    heading: "Archives and disk images",
    reason:
      "An archive hides its contents until it is opened, can be crafted to expand into far more data than it claims, and can be encrypted so that nothing can inspect it. Send the spreadsheet itself rather than a container holding it.",
    extensions: [
      ".zip",
      ".rar",
      ".7z",
      ".tar",
      ".gz",
      ".tgz",
      ".bz2",
      ".cab",
      ".arj",
      ".lzh",
      ".iso",
      ".img",
      ".vhd",
      ".dmg",
    ],
  },
  {
    heading: "Shortcuts, registry and help containers",
    reason:
      "These look inert and are not. Each one can point at or carry something that runs on the machine that opens it.",
    extensions: [".lnk", ".url", ".reg", ".chm", ".hlp", ".inf", ".scf"],
  },
  {
    heading: "Markup and vector formats that can carry script",
    reason:
      "HTML and SVG can both embed JavaScript, and RTF has been the vehicle for a long series of document exploits. If your export produces one of these, convert it before sending.",
    extensions: [".html", ".htm", ".mht", ".mhtml", ".svg", ".xml", ".rtf"],
  },
  {
    heading: "Encrypted or password-protected files",
    reason:
      "A file we cannot open is a file we cannot check. This applies even when the password is sent separately, and it applies to protected .xlsx and .pdf files as well as encrypted archives.",
    extensions: [],
  },
];

/** Prose styling wraps inline code in backticks. With this many extensions on
 *  the page that punctuation becomes noise, so they render as plain badges. */
function Ext({ children }: { children: React.ReactNode }) {
  return (
    <span className="not-prose inline-block rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[0.8em] text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
      {children}
    </span>
  );
}

function UploadFlow() {
  return (
    <div className="not-prose my-8 overflow-x-auto">
      <svg
        viewBox="0 0 720 190"
        role="img"
        aria-labelledby="upload-flow-title upload-flow-desc"
        className="h-auto w-full min-w-[560px]"
      >
        <title id="upload-flow-title">How an uploaded file is handled</title>
        <desc id="upload-flow-desc">
          A file you upload is checked for its type, its size and its contents.
          Files that pass are parsed into your stock list. Files that fail are
          rejected and deleted, and you are told which check failed.
        </desc>

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
            Your file
          </text>
          <text x="310" y="90" textAnchor="middle">
            Type, size and
          </text>
          <text x="587" y="32" textAnchor="middle">
            Parsed into your stock list
          </text>
          <text x="587" y="148" textAnchor="middle">
            Rejected and deleted
          </text>
        </g>

        <g className="fill-slate-500 dark:fill-slate-400" fontSize="12">
          <text x="83" y="108" textAnchor="middle">
            .csv · .xlsx · .pdf
          </text>
          <text x="310" y="108" textAnchor="middle">
            content checks
          </text>
          <text x="587" y="50" textAnchor="middle">
            You see it in the platform
          </text>
          <text x="587" y="166" textAnchor="middle">
            You are told which check failed
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

export default function GuidebookUploadingFilesPage() {
  return (
    <GuidebookArticle
      sectionLabel="Documentation"
      title="Uploading files"
      description="Which file types we accept for vehicle lists, which we refuse, and why the list of refusals is as long as it is."
    >
      <section className="mt-8">
        <h2>Why we are strict</h2>
        <p>
          Every file you send us arrives from a third party — a supplier, a
          trader, a marketplace export, a forwarded email. That is exactly the
          path attackers use to reach dealer systems, and a stock list is an
          unusually convincing disguise. Nobody thinks twice about opening a
          spreadsheet from a supplier.
        </p>
        <p>
          So we accept a deliberately small set of formats. If a format can
          carry code, hide its contents, or cannot be inspected, we refuse it —
          even when the specific file is certainly harmless. Keeping the list
          short is what makes it enforceable.
        </p>
        <UploadFlow />
      </section>

      <section className="mt-8">
        <h2>What we accept</h2>
        <table>
          <thead>
            <tr>
              <th>Format</th>
              <th>Extension</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {ACCEPTED.map((row) => (
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
        <p>
          Files are accepted up to 25 MB each. If your export is larger than
          that, it is almost always because it contains images — export again
          without them, or split the list.
        </p>
      </section>

      <section className="mt-8">
        <h2>What we do not accept</h2>
        <p>
          The list below is long on purpose. Most of these formats are years or
          decades past the point where anyone should still be sending them, and
          several are refused precisely <em>because</em> they are obsolete:
          little modern tooling can safely inspect them any more.
        </p>

        {REJECTED.map((group) => (
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
        <h2>Renaming a file does not help</h2>
        <p>
          We check what a file actually is, not what it is called. Renaming{" "}
          <Ext>stock.xlsm</Ext> to <Ext>stock.xlsx</Ext> gets it refused at the
          same step, and renaming an archive to <Ext>.csv</Ext> gets it refused
          faster. If your system can only export a format we refuse, open it
          once and save a clean copy as <Ext>.csv</Ext> or <Ext>.xlsx</Ext>.
        </p>
      </section>

      <section className="mt-8">
        <h2>A note on spreadsheet formulas</h2>
        <p>
          A cell that begins with <Ext>=</Ext>, <Ext>+</Ext>, <Ext>-</Ext> or{" "}
          <Ext>@</Ext> is treated as a formula by Excel, and a hostile one can
          run a command on whoever opens the file. This is worth knowing in both
          directions: we neutralise those cells on the way in, and you should be
          wary of any supplier list you open directly rather than through the
          platform.
        </p>
      </section>

      <section className="mt-8">
        <h2>Before you upload</h2>
        <ul>
          <li>
            One list per file. Combined workbooks are harder to reconcile.
          </li>
          <li>
            Keep the header row. Column names are how we map your fields, and a
            list without them takes longer to onboard.
          </li>
          <li>
            Remove password protection. A protected file is refused even if you
            send the password.
          </li>
          <li>
            Send the file itself, not a zipped copy of it, and not a screenshot
            of it.
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>If a file is rejected</h2>
        <p>
          You will be told which check the file failed, so you can fix it and
          send it again. Rejected files are not stored, not opened, and not
          forwarded to anyone — they are discarded at the point of refusal.
        </p>
        <p>
          If you believe a file was refused wrongly, or your system can only
          produce a format that is not on the accepted list, contact us and we
          will work out an ingestion route that does not require you to change
          your process.
        </p>
      </section>
    </GuidebookArticle>
  );
}
