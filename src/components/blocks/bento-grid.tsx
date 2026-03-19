import Image from "next/image";

import { FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon, ShieldCheckIcon } from "lucide-react";

import { AnimatedListDemo } from "../animated-list";
import { AnimatedBeamMultipleOutputDemo } from "../animated-multiple-beams";
import { BentoCard, BentoGrid } from "../ui/bento-grid";
import { Marquee } from "../ui/marquee";
import { MountWhenInView } from "../ui/mount-when-in-view";

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
    description: "We support PDF, Excel, CSV, and more.",
    href: "#",
    cta: "Learn more",
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
    name: "Dealer verification",
    description:
      "See who sends the best offers—e.g. 1000 cars from 10 dealers.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute top-4 right-2 h-[300px] w-full max-w-none origin-top scale-90 overflow-hidden rounded-md border [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-95 md:h-[320px]">
        <div className="relative h-full min-h-[260px] w-full">
          <Image
            src="/resource-allocation/notifications.webp"
            alt="dealer verification"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center opacity-90"
          />
          <div className="from-background/40 pointer-events-none absolute inset-0 bg-linear-to-t via-transparent to-transparent" />
        </div>
      </div>
    ),
  },
  {
    Icon: Share2Icon,
    name: "Offer comparison across markets",
    description:
      "Compare offers from different markets to find the best price.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <MountWhenInView
        placeholderClassName="absolute top-4 right-2 h-[300px] w-full"
        rootMargin="300px"
        threshold={0.1}
      >
        <AnimatedBeamMultipleOutputDemo className="h-[300px] border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-105" />
      </MountWhenInView>
    ),
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description: "Attach an offer, receive insights and alerts by email.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <MountWhenInView
        placeholderClassName="absolute top-5 left-5 h-[285px] w-[285px] origin-top scale-75 sm:left-20 sm:h-[480px] sm:w-[480px] lg:left-5 lg:h-[380px] lg:w-[380px]"
        rootMargin="300px"
        threshold={0.1}
      >
        <AnimatedListDemo className="h-[285px] w-[285px] origin-top scale-75 border-none [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-80 sm:h-[480px] sm:w-[480px] lg:h-[380px] lg:w-[380px]" />
      </MountWhenInView>
    ),
  },
];

export function BentoDemo() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
