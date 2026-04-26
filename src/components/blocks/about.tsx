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

const About = () => {
  const t = useTranslations("About.content");

  return (
    <section className="container mt-10 flex max-w-5xl flex-col-reverse gap-8 md:mt-14 md:gap-14 lg:mt-20 lg:flex-row lg:items-end">
      <div className="flex flex-col gap-8 lg:gap-16 xl:gap-20">
        <ImageSection
          images={imageGroups.first.map((image) => ({
            src: image.src,
            alt: t(`images.${image.altKey}`),
          }))}
          className="xl:-translate-x-10"
        />

        <TextSection
          title={t("team.title")}
          paragraphs={[t("team.p1"), t("team.p2"), t("team.p3")]}
          ctaButton={{
            href: "/contact",
            text: t("team.cta"),
          }}
        />
      </div>

      <div className="flex flex-col gap-8 lg:gap-16 xl:gap-20">
        <TextSection paragraphs={[t("product.p1"), t("product.p2")]} />
        <ImageSection
          images={imageGroups.second.map((image) => ({
            src: image.src,
            alt: t(`images.${image.altKey}`),
          }))}
          className="hidden lg:flex xl:translate-x-10"
        />
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
  title?: string;
  paragraphs: string[];
  ctaButton?: {
    href: string;
    text: string;
  };
}

export function TextSection({
  title,
  paragraphs,
  ctaButton,
}: TextSectionProps) {
  return (
    <section className="flex-1 space-y-4 text-lg md:space-y-6">
      {title && <h2 className="text-foreground text-4xl">{title}</h2>}
      <div className="text-muted-foreground max-w-xl space-y-6">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
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
