import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

import { Background } from "@/components/background";
import { DemoExperience } from "@/features/demo/demo-experience";

const includedKeys = ["0", "1"] as const;
const notIncludedKeys = ["0", "1", "2", "3", "4", "5"] as const;

/** Chevron for the collapsed lists; rotates with the parent `<details>`. */
function Chevron() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="text-muted-foreground size-4 shrink-0 transition-transform group-open:rotate-180"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ScopeList({
  items,
  variant,
}: {
  items: string[];
  variant: "included" | "excluded";
}) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li
          key={item}
          className="text-muted-foreground flex items-start gap-2 text-sm"
        >
          {variant === "included" ? (
            <Check
              className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
              aria-hidden
            />
          ) : (
            <span
              className="bg-muted-foreground/70 mt-2 size-1.5 shrink-0 rounded-full"
              aria-hidden
            />
          )}
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function DemoPage() {
  const t = useTranslations("DemoPage");
  const included = includedKeys.map((key) => t(`info.included.${key}`));
  const notIncluded = notIncludedKeys.map((key) =>
    t(`info.notIncluded.${key}`),
  );

  return (
    <Background fixedWash>
      <section className="py-28 lg:py-32 lg:pt-44">
        <div className="container max-w-6xl">
          <header className="mx-auto max-w-3xl text-center">
            <p className="text-chart-1 mb-3 text-xs font-semibold tracking-[0.2em] uppercase">
              {t("hero.eyebrow")}
            </p>
            <h1 className="text-foreground text-3xl font-semibold tracking-tight text-balance md:text-4xl lg:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-sm md:text-base">
              {t("hero.subtitle")}
            </p>
          </header>

          {/*
            Sits above the workspace so the scope is read before anyone spends
            their one run of the day. On phones the two lists collapse, which
            keeps the form itself within reach of the fold.
          */}
          <section
            className="border-border/60 bg-card/60 mt-8 rounded-3xl border p-6 shadow-sm md:mt-10 md:p-8"
            aria-labelledby="demo-scope"
          >
            <h2
              id="demo-scope"
              className="font-text text-foreground text-sm font-semibold!"
            >
              {t("info.title")}
            </h2>
            <p className="text-muted-foreground mt-2 max-w-3xl text-sm leading-relaxed">
              {t("info.body")}
            </p>

            <div className="mt-6 grid gap-4 md:hidden">
              <details className="group">
                <summary className="focus-visible:ring-ring/50 flex min-h-9 cursor-pointer list-none items-center justify-between gap-3 py-1 focus-visible:ring-[3px] focus-visible:outline-none [&::-webkit-details-marker]:hidden">
                  <span className="text-foreground text-sm font-semibold">
                    {t("info.includedTitle")}
                  </span>
                  <Chevron />
                </summary>
                <ScopeList items={included} variant="included" />
              </details>

              <details className="group">
                <summary className="focus-visible:ring-ring/50 flex min-h-9 cursor-pointer list-none items-center justify-between gap-3 py-1 focus-visible:ring-[3px] focus-visible:outline-none [&::-webkit-details-marker]:hidden">
                  <span className="text-foreground text-sm font-semibold">
                    {t("info.notIncludedTitle")}
                  </span>
                  <Chevron />
                </summary>
                <ScopeList items={notIncluded} variant="excluded" />
              </details>
            </div>

            <div className="mt-6 hidden gap-6 md:grid md:grid-cols-2">
              <div>
                <p className="text-foreground text-sm font-semibold">
                  {t("info.includedTitle")}
                </p>
                <ScopeList items={included} variant="included" />
              </div>
              <div>
                <p className="text-foreground text-sm font-semibold">
                  {t("info.notIncludedTitle")}
                </p>
                <ScopeList items={notIncluded} variant="excluded" />
              </div>
            </div>
          </section>

          <DemoExperience />
        </div>
      </section>
    </Background>
  );
}
