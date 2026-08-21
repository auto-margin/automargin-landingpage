"use client";

import { Ban, PencilLine, RefreshCw, TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import type { DemoErrorKind } from "@/features/demo/use-demo-run";
import { Link } from "@/i18n/navigation";

/** Errors the visitor cannot clear by trying again. */
const NON_RETRYABLE: ReadonlySet<DemoErrorKind> = new Set(["limit"]);

/** Errors caused by the description rather than by the service. */
const INPUT_ERRORS: ReadonlySet<DemoErrorKind> = new Set(["parse"]);

type RunErrorPanelProps = {
  errorKind: DemoErrorKind;
  onRetry: () => void;
  onEdit: () => void;
};

export function RunErrorPanel({
  errorKind,
  onRetry,
  onEdit,
}: RunErrorPanelProps) {
  const t = useTranslations("DemoPage.errors");
  const isLimit = errorKind === "limit";
  const canRetry = !NON_RETRYABLE.has(errorKind);
  const isInputProblem = INPUT_ERRORS.has(errorKind);

  return (
    <div
      role="alert"
      className="flex min-h-[320px] flex-col items-center justify-center gap-4 px-2 py-10 text-center"
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-300">
        {isLimit ? (
          <Ban className="size-6" aria-hidden />
        ) : (
          <TriangleAlert className="size-6" aria-hidden />
        )}
      </span>

      <div className="max-w-md space-y-2">
        <h2 className="text-foreground text-lg font-semibold text-balance">
          {t(`${errorKind}.title`)}
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {t(`${errorKind}.body`)}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {isInputProblem ? (
          <Button type="button" className="h-11 gap-2" onClick={onEdit}>
            <PencilLine className="size-4" aria-hidden />
            {t("actions.edit")}
          </Button>
        ) : null}

        {canRetry ? (
          <Button
            type="button"
            variant={isInputProblem ? "outline" : "default"}
            className="h-11 gap-2"
            onClick={onRetry}
          >
            <RefreshCw className="size-4" aria-hidden />
            {t("actions.retry")}
          </Button>
        ) : null}

        {isInputProblem ? null : (
          <Button asChild variant="outline" className="h-11">
            <Link href="/contact">{t("actions.contact")}</Link>
          </Button>
        )}

        {isInputProblem || isLimit ? null : (
          <Button
            type="button"
            variant="ghost"
            className="h-11 gap-2"
            onClick={onEdit}
          >
            <PencilLine className="size-4" aria-hidden />
            {t("actions.edit")}
          </Button>
        )}
      </div>
    </div>
  );
}
