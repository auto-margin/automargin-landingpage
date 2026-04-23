import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const About = () => {
  return (
    <section className="container mt-10 flex max-w-5xl flex-col-reverse gap-8 md:mt-14 md:gap-14 lg:mt-20 lg:flex-row lg:items-end">
      {/* Images Left - Text Right */}
      <div className="flex flex-col gap-8 lg:gap-16 xl:gap-20">
        <ImageSection
          images={[
            { src: "/about/1.webp", alt: "Analytical dashboard" },
            { src: "/about/2.webp", alt: "Europe wide market analysis" },
          ]}
          className="xl:-translate-x-10"
        />

        <TextSection
          title="The team"
          paragraphs={[
            "We're a lean, founder-owned team of car-industry insiders and builders. We're focused on one thing: turning real dealer know-how into one automated comparison tool.",
            "Every part of the tool is designed around how the best dealers actually work. We took our best dealers' insight and their way of comparing and finding deals, and turned it into a fully automated comparison tool.",
            "You get more than price difference: best brands, best dealers, country by country and more.",
          ]}
          ctaButton={{
            href: "/contact",
            text: "Get in touch",
          }}
        />
      </div>

      {/* Text Left - Images Right */}
      <div className="flex flex-col gap-8 lg:gap-16 xl:gap-20">
        <TextSection
          paragraphs={[
            "AutoMargin gives you more than price difference: live market data, margin analysis, and dealer-level insight in one place. We analyse manual work and listings from the biggest car marketplaces - AutoScout24, Mobile.de and others across Europe. So you can see which brands and dealers perform best, country by country and can spot the right deals faster.",
            "Whether you're a dealer comparing offers or a developer building on our data, the tool is built around how the best people actually work. You get clean, structured output - best brands, best dealers, and real margins - so you can focus on closing deals instead of digging through spreadsheets and cross-checking marketplaces by hand.",
          ]}
        />
        <ImageSection
          images={[
            { src: "/about/3.webp", alt: "Car specific dashboard" },
            { src: "/about/4.webp", alt: "Dealer leaderboard" },
          ]}
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
