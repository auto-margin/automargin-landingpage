"use client";

import { useCallback, useEffect, useRef } from "react";

import dynamic from "next/dynamic";

import { useTranslations } from "next-intl";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((m) => m.DotLottieReact),
  { ssr: false },
);

/** Animation length (~1.5s) plus a short beat before the dashboard. */
const DURATION_MS = 1800;

/**
 * Bridges the loading state and the dashboard so the result does not snap in.
 * Plays `verification-success.lottie` (dotLottie v2 repack of the original
 * Verification success asset — the v1 archive did not render in
 * @lottiefiles/dotlottie-react 0.18).
 */
export function SuccessFlourish({ onDone }: { onDone: () => void }) {
  const t = useTranslations("DemoPage.run");
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  });

  const finish = useCallback(() => onDoneRef.current(), []);

  useEffect(() => {
    const id = setTimeout(finish, DURATION_MS);
    return () => clearTimeout(id);
  }, [finish]);

  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 py-2 sm:gap-5 sm:py-5">
      <div
        className="flex size-24 items-center justify-center sm:size-32"
        role="img"
        aria-label={t("done")}
      >
        <DotLottieReact
          src="/lottie/verification-success.lottie"
          autoplay
          className="size-full"
        />
      </div>
      <p className="text-foreground text-sm font-semibold sm:text-base" aria-live="polite">
        {t("done")}
      </p>
    </div>
  );
}
