import Image from "next/image";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const imageGroups = {
  first: [
    { src: "/about/1.webp", altKey: "dashboard" },
    { src: "/about/2.webp", altKey: "marketAnalysis" },
  ],
  second: [
    { src: "/about/3.webp", altKey: "carDashboard" },
    { src: "/about/4.webp", altKey: "dealerLeaderboard" },
  ],
} as const;

const painKeys = ["review", "handover", "supplierNoise"] as const;
const principleKeys = ["preAnalysed", "execution", "network"] as const;

const About = () => {
  const t = useTranslations("About.content");

  return (
    <section className="container mt-10 max-w-5xl md:mt-14 lg:mt-20">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-end lg:gap-14">
        <ImageSection
          images={imageGroups.first.map((image) => ({
            src: image.src,
            alt: t(`images.${image.altKey}`),
          }))}
          className="lg:order-1 xl:-translate-x-10"
        />

        <TextSection
          className="lg:order-2"
          title={t("story.title")}
          paragraphs={[t("story.p1"), t("story.p2"), t("story.p3")]}
          ctaButton={{
            href: "/contact",
            text: t("story.cta"),
          }}
        />
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-20">
        {painKeys.map((key) => (
          <div
            key={key}
            className="bg-card rounded-2xl border p-5 shadow-sm md:min-h-48"
          >
            <div className="text-muted-foreground mb-5 font-mono text-xs tracking-[0.18em] uppercase">
              {t(`pain.items.${key}.label`)}
            </div>
            <h3 className="text-foreground text-lg leading-snug font-semibold">
              {t(`pain.items.${key}.title`)}
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              {t(`pain.items.${key}.description`)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:gap-14">
        <TextSection
          title={t("product.title")}
          paragraphs={[t("product.p1"), t("product.p2")]}
        />
        <ImageSection
          images={imageGroups.second.map((image) => ({
            src: image.src,
            alt: t(`images.${image.altKey}`),
          }))}
          className="hidden lg:flex xl:translate-x-10"
        />
      </div>

      <div className="mt-14 p-0 md:bg-card md:rounded-2xl md:border md:p-8 md:shadow-sm lg:mt-20">
        <div className="mb-6 max-w-2xl">
          <p className="text-muted-foreground font-mono text-xs tracking-[0.18em] uppercase">
            {t("principles.eyebrow")}
          </p>
          <h2 className="text-foreground mt-3 text-2xl tracking-tight md:text-3xl">
            {t("principles.title")}
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {principleKeys.map((key) => (
            <div key={key} className="bg-muted/30 rounded-xl border p-4">
              <h3 className="text-foreground text-sm font-semibold">
                {t(`principles.items.${key}.title`)}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {t(`principles.items.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

interface ImageSectionProps {
  images: { src: string; alt: string }[];
  className?: string;
}

export function ImageSection({ images, className }: ImageSectionProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {images.map((image, index) => (
        <div
          key={index}
          className="relative aspect-[2/1.5] overflow-hidden rounded-2xl"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover grayscale"
          />
        </div>
      ))}
    </div>
  );
}

interface TextSectionProps {
  eyebrow?: string;
  title?: string;
  paragraphs: string[];
  ctaButton?: {
    href: string;
    text: string;
  };
  className?: string;
}

export function TextSection({
  eyebrow,
  title,
  paragraphs,
  ctaButton,
  className,
}: TextSectionProps) {
  return (
    <section className={cn("flex-1 space-y-4 text-lg md:space-y-6", className)}>
      {eyebrow && (
        <p className="text-muted-foreground font-mono text-xs tracking-[0.18em] uppercase">
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className="text-foreground text-3xl tracking-tight md:text-4xl">
          {title}
        </h2>
      )}
      <div className="text-muted-foreground max-w-xl space-y-5">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
      {ctaButton && (
        <div className="mt-8">
          <Link href={ctaButton.href}>
            <Button size="lg">{ctaButton.text}</Button>
          </Link>
        </div>
      )}
    </section>
  );
}
