import Image from "next/image";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

import { DashedLine } from "../dashed-line";

import { FeatureLottie } from "@/components/blocks/feature-lottie";
import { Card, CardContent } from "@/components/ui/card";

const itemKeys = ["market", "competitor", "insights"] as const;
const itemImages = [
  "/column1.lottie",
  "/column2.lottie",
  "/column3new.lottie",
] as const;

const FeatureMedia = ({ alt, src }: { alt: string; src: string }) => {
  if (src.endsWith(".lottie")) {
    return (
      <FeatureLottie
        src={src}
        label={alt}
        fit="contain"
        className="h-full w-full ps-4 pt-2"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover object-left-top ps-4 pt-2"
    />
  );
};

export const Features = () => {
  const t = useTranslations("Home.features");
  const items = itemKeys.map((key, index) => ({
    title: t(`items.${key}`),
    image: itemImages[index]!,
  }));

  return (
    <section id="automation-for-your-busniess" className="pb-28 lg:pb-32">
      <div className="container">
        {/* Top dashed line with text */}
        <div className="relative flex items-center justify-center">
          <DashedLine className="text-muted-foreground" />
        </div>

        {/* Content */}
        <div className="mx-auto mt-10 max-w-4xl lg:mt-24">
          <h2 className="text-2xl tracking-tight whitespace-nowrap md:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
        </div>

        {/* Features Card */}
        <Card className="mt-8 rounded-2xl md:mt-12 lg:mt-20">
          <CardContent className="flex p-0 max-md:flex-col">
            {items.map((item, i) => (
              <div key={item.title} className="flex flex-1 max-md:flex-col">
                <div className="flex-1 p-4 pe-0! md:p-6">
                  <div className="relative aspect-[1.28/1] overflow-hidden">
                    <FeatureMedia
                      src={item.image}
                      alt={t("imageAlt", { title: item.title })}
                    />
                    <div className="from-background absolute inset-0 z-10 bg-linear-to-t via-transparent to-transparent" />
                  </div>

                  <div className="flex items-center justify-between gap-4 pe-4 pt-4 md:pe-6 md:pt-6">
                    <h3 className="font-display max-w-60 text-2xl leading-tight font-bold tracking-tight">
                      {item.title}
                    </h3>
                    <div
                      className="bg-foreground/5 text-foreground flex size-10 items-center justify-center rounded-full border"
                      aria-hidden
                    >
                      <Check className="size-5 lg:size-6" />
                    </div>
                  </div>
                </div>
                {i < items.length - 1 && (
                  <div className="relative hidden md:block">
                    <DashedLine orientation="vertical" />
                  </div>
                )}
                {i < items.length - 1 && (
                  <div className="relative block md:hidden">
                    <DashedLine orientation="horizontal" />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
