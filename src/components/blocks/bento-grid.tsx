import { FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon, ShieldCheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedListDemo } from "../animated-list";
import { AnimatedBeamMultipleOutputDemo } from "../animated-multiple-beams";
import { BentoCard, BentoGrid } from "../ui/bento-grid";
import { Marquee } from "../ui/marquee";
import { MountWhenInView } from "../ui/mount-when-in-view";

import { DealerVerificationInboxMock } from "@/components/blocks/dealer-verification-inbox-mock";
import { cn } from "@/lib/utils";

const files = [
  {
    name: "volvoXC50.pdf",
    body: "PDF file is a file format that allows you to share and view documents, images, and other content in a portable way. It is a popular file format for sharing documents and images.",
  },
  {
    name: "offers.xlsx",
    body: "A spreadsheet is a file that allows you to organize and analyze data in a grid of rows and columns. It is a popular file format for organizing and analyzing data.",
  },
  {
    name: "car.png",
    body: "Image file is a file that allows you to store and view images in a digital format. It is a popular file format for sharing images.",
  },
  {
    name: "email.txt",
    body: "Normal text file is a file that allows you to store and view text in a digital format. It is a popular file format for sharing text.",
  },
  {
    name: "100cars.docx",
    body: "Word document file is a file that allows you to store and view text in a digital format. It is a popular file format for sharing text.",
  },
];

const features = [
  {
    Icon: FileTextIcon,
    name: "Upload any format",
    description: "We support PDF, Excel, CSV and more.",
    hoverText: "Files are securely stored and protected.",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:20s]"
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: ShieldCheckIcon,
    name: "Supplier verification",
    description: "See who sends the best offers.",
    hoverText: "Discover your favorite supplier.",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute top-4 right-4 left-4 flex h-[300px] justify-center overflow-hidden [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out md:right-6 md:left-6 md:h-[320px]">
        <div className="relative h-full w-full max-w-lg origin-top scale-90 transition-all duration-300 ease-out group-hover:scale-95">
          <DealerVerificationInboxMock className="h-full w-full" />
          {/* Mobile: taller/solid fade so inbox rows don’t show through behind the card title + icon */}
          <div className="md:from-background/50 pointer-events-none absolute inset-0 max-md:bg-[linear-gradient(to_top,var(--background)_0%,var(--background)_46%,color-mix(in_oklch,var(--background)_35%,transparent)_68%,transparent_100%)] max-sm:bg-[linear-gradient(to_top,var(--background)_0%,var(--background)_26%,color-mix(in_oklch,var(--background)_28%,transparent)_48%,transparent_100%)] md:bg-linear-to-t md:via-transparent md:to-transparent" />
        </div>
      </div>
    ),
  },
  {
    Icon: Share2Icon,
    name: (
      <>
        <span className="max-[424px]:hidden">
          Offer comparison across markets
        </span>
        <span className="hidden max-[424px]:inline">Offer Comparison</span>
      </>
    ),
    description:
      "Compare offers from different markets to find the best price.",
    hoverText: "Validate offers against your rules.",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="max-lg:pb-6 max-sm:pb-8">
        <MountWhenInView
          placeholderClassName="absolute top-4 right-2 h-[300px] w-full max-lg:top-2 max-sm:top-1.5 md:h-[315px] lg:top-4 lg:h-[300px] min-[1440px]:top-2 min-[1440px]:h-[340px]"
          rootMargin="300px"
          threshold={0.1}
        >
          <AnimatedBeamMultipleOutputDemo className="h-[280px] border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-transform duration-300 ease-out group-hover:scale-105 max-sm:h-[260px] min-[1440px]:h-[340px] sm:h-[290px] md:h-[315px] lg:h-[300px]" />
        </MountWhenInView>
      </div>
    ),
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description: "Attach offers, get email insights.",
    hoverText: "Get results and updates automatically.",
    className: "col-span-3 lg:col-span-1",
    background: (
      <MountWhenInView
        placeholderClassName="absolute top-5 left-5 h-[310px] w-[310px] origin-top max-md:scale-[0.92] md:scale-[0.82] sm:max-lg:left-20 sm:max-lg:h-[500px] sm:max-lg:w-[500px] lg:left-0 lg:right-0 lg:h-[400px] lg:w-auto lg:scale-[0.84] lg:group-hover:scale-[0.87] xl:left-5 xl:right-5 xl:h-[440px] xl:scale-[0.88] xl:group-hover:scale-[0.91] 2xl:scale-[0.9] 2xl:group-hover:scale-[0.93]"
        rootMargin="300px"
        threshold={0.1}
      >
        <AnimatedListDemo className="h-[310px] w-[310px] origin-top border-none [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] transition-all duration-300 ease-out max-md:scale-[0.92] max-md:group-hover:scale-[0.97] sm:max-lg:h-[500px] sm:max-lg:w-[500px] md:scale-[0.82] md:group-hover:scale-[0.86] lg:h-[400px] lg:w-full lg:max-w-full lg:scale-[0.84] lg:group-hover:scale-[0.87] xl:h-[440px] xl:scale-[0.88] xl:group-hover:scale-[0.91] 2xl:scale-[0.9] 2xl:group-hover:scale-[0.93]" />
      </MountWhenInView>
    ),
  },
];

export function BentoDemo() {
  const t = useTranslations("Home.bentoCards");
  const translatedFeatures = features.map((feature, index) => ({
    ...feature,
    name:
      index === 2 ? (
        <>
          <span className="max-[424px]:hidden">{t(`items.${index}.name`)}</span>
          <span className="hidden max-[424px]:inline">
            {t(`items.${index}.shortName`)}
          </span>
        </>
      ) : (
        t(`items.${index}.name`)
      ),
    description: t(`items.${index}.description`),
    hoverText: t(`items.${index}.hoverText`),
  }));

  return (
    <BentoGrid>
      {translatedFeatures.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
