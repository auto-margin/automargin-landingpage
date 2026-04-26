import { useTranslations } from "next-intl";

import { BentoDemo } from "@/components/blocks/bento-grid";
import { DashedLine } from "@/components/dashed-line";

export function BentoDemoSection() {
  const t = useTranslations("Home.bento");

  return (
    <section
      id="feature-modern-teams"
      className="overflow-hidden pb-20 lg:pb-24"
    >
      <div className="container mt-8 md:mt-12 lg:mt-20">
        {/* Top dashed line with text */}
        <div className="relative flex items-center justify-center">
          <DashedLine className="text-muted-foreground" />
          <span className="bg-muted text-muted-foreground absolute px-3 font-mono text-sm font-medium tracking-wide max-md:hidden">
            {t("label")}
          </span>
        </div>

        {/* Content */}
        <div className="mx-auto my-10 grid max-w-4xl items-center gap-3 md:gap-0 lg:mt-24 lg:grid-cols-2">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="text-muted-foreground leading-snug">
            {t("description")}
          </p>
        </div>
        <BentoDemo />
      </div>
    </section>
  );
}
