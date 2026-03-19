import Image from "next/image";

import { DashedLine } from "../dashed-line";
import { LottieIcon } from "../excel-lottie";

import { cn } from "@/lib/utils";

const topItems = [
  {
    title: "Upload any format file type.",
    description:
      "PDF, images, spreadsheets—auto-forwarding handles any file type.",
    images: [
      {
        src: "/resource-allocation/templates.webp",
        alt: "Email upload interface",
        width: 495,
        height: 186,
      },
    ],
    className:
      "flex-1 [&>.title-container]:mb-5 md:[&>.title-container]:mb-8 xl:[&>.image-container]:translate-x-6 [&>.image-container]:translate-x-2",
    fade: [""],
  },
  {
    title: "Get analyzed and notified.",
    description: "Attach an offer, receive insights and alerts by email.",
    images: [
      { src: "/logos/jira.png", alt: "Outlook", width: 48, height: 48 },
      { src: "/logos/excel.svg", alt: "Excel", width: 48, height: 48 },
      { src: "/logos/word.svg", alt: "Word", width: 48, height: 48 },
      { src: "/logos/jira2.png", alt: "TXT", width: 48, height: 48 },
      { src: "/logos/monday.png", alt: "JPG", width: 48, height: 48 },
      { src: "/logos/asana.png", alt: "PDF", width: 48, height: 48 },
      { src: "/logos/gsheet.png", alt: "Google Sheets", width: 48, height: 48 },
      { src: "/logos/notion.png", alt: "Gmail", width: 48, height: 48 },
    ],
    className:
      "flex-1 [&>.title-container]:mb-5 md:[&>.title-container]:mb-8 md:[&>.title-container]:translate-x-2 xl:[&>.title-container]:translate-x-4 [&>.title-container]:translate-x-0",
    fade: [],
  },
];

const bottomItems = [
  {
    title: "Dealer verification.",
    description:
      "See who sends the best offers—e.g. 1000 cars from 10 dealers.",
    images: [
      {
        src: "/resource-allocation/graveyard.webp",
        alt: "Dealer verification dashboard",
        width: 305,
        height: 280,
      },
    ],
    className:
      "[&>.title-container]:mb-5 md:[&>.title-container]:mb-8 xl:[&>.image-container]:translate-x-6 [&>.image-container]:translate-x-2",
    fade: ["bottom"],
  },
  {
    title: "Dashboard overview.",
    description:
      "One view of all analyzed offers, dealer performance, and trends.",
    images: [
      {
        src: "/resource-allocation/discussions.webp",
        alt: "Dashboard overview",
        width: 320,
        height: 103,
      },
    ],
    className:
      "justify-normal [&>.title-container]:mb-5 md:[&>.title-container]:mb-0 [&>.image-container]:flex-1 md:[&>.image-container]:place-items-center md:[&>.image-container]:-translate-y-3",
    fade: [""],
  },
  {
    title: "Unified platforms.",
    description:
      "Insights from AutoScout24, Mobile.de, and leading marketplaces.",
    images: [
      {
        src: "/resource-allocation/notifications.webp",
        alt: "Unified platform insights",
        width: 305,
        height: 280,
      },
    ],
    className:
      "[&>.title-container]:mb-5 md:[&>.title-container]:mb-8 xl:[&>.image-container]:translate-x-6 [&>.image-container]:translate-x-2",
    fade: ["bottom"],
  },
];

export const ResourceAllocation = () => {
  return (
    <section
      id="resource-allocation"
      className="overflow-hidden pb-20 lg:pb-24"
    >
      <div className="">
        <h2 className="container text-center text-3xl tracking-tight text-balance sm:text-4xl md:text-5xl lg:text-6xl">
          Upload any format. Insights across leading platforms.
        </h2>

        <div className="mt-8 md:mt-12 lg:mt-20">
          <DashedLine
            orientation="horizontal"
            className="container scale-x-105"
          />

          {/* Top Features Grid - 2 items */}
          <div className="relative container flex max-md:flex-col">
            {topItems.map((item, i) => (
              <Item key={i} item={item} isLast={i === topItems.length - 1} />
            ))}
          </div>
          <DashedLine
            orientation="horizontal"
            className="container max-w-7xl scale-x-110"
          />

          {/* Bottom Features Grid - 3 items */}
          <div className="relative container grid max-w-7xl md:grid-cols-3">
            {bottomItems.map((item, i) => (
              <Item
                key={i}
                item={item}
                isLast={i === bottomItems.length - 1}
                className="md:pb-0"
              />
            ))}
          </div>
        </div>
        <DashedLine
          orientation="horizontal"
          className="container max-w-7xl scale-x-110"
        />
      </div>
    </section>
  );
};

interface ItemProps {
  item: (typeof topItems)[number] | (typeof bottomItems)[number];
  isLast?: boolean;
  className?: string;
}

const Item = ({ item, isLast, className }: ItemProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between px-0 py-6 md:px-6 md:py-8",
        className,
        item.className,
      )}
    >
      <div className="title-container text-balance">
        <h3 className="inline font-semibold">{item.title} </h3>
        <span className="text-muted-foreground"> {item.description}</span>
      </div>

      {item.fade.includes("bottom") && (
        <div className="from-muted/80 absolute inset-0 z-10 bg-linear-to-t via-transparent to-transparent md:hidden" />
      )}
      {item.images.length > 4 && item.title === "Get analyzed and notified." ? (
        <div className="relative overflow-hidden">
          <div className="flex flex-col gap-5">
            {/* First row - right aligned */}
            <div className="flex translate-x-4 justify-end gap-5">
              {item.images.slice(0, 4).map((image, j) => (
                <div
                  key={j}
                  className="bg-background grid aspect-square size-16 place-items-center rounded-2xl p-2 lg:size-20"
                >
                  {image.src === "/logos/jira.png" ? (
                    <LottieIcon
                      src="/lottiefiles/outlook.lottie"
                      width={image.width}
                      height={image.height}
                      ariaLabel={image.alt}
                    />
                  ) : (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      className="object-contain object-left-top"
                    />
                  )}
                  <div className="from-muted/80 absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l to-transparent" />
                </div>
              ))}
            </div>
            {/* Second row - left aligned */}
            <div className="flex -translate-x-4 gap-5">
              {item.images.slice(4).map((image, j) => (
                <div
                  key={j}
                  className="bg-background grid aspect-square size-16 place-items-center rounded-2xl p-2 lg:size-20"
                >
                  {image.src === "/logos/notion.png" ? (
                    <LottieIcon
                      src="/lottiefiles/gmail.lottie"
                      width={image.width}
                      height={image.height}
                      ariaLabel={image.alt}
                    />
                  ) : (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      className="object-contain object-left-top"
                    />
                  )}
                  <div className="from-muted absolute inset-y-0 bottom-0 left-0 z-10 w-14 bg-linear-to-r to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="image-container grid grid-cols-1 gap-4">
          {item.images.map((image, j) => (
            <Image
              key={j}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="object-contain object-left-top"
            />
          ))}
        </div>
      )}

      {!isLast && (
        <>
          <DashedLine
            orientation="vertical"
            className="absolute top-0 right-0 max-md:hidden"
          />
          <DashedLine
            orientation="horizontal"
            className="absolute inset-x-0 bottom-0 md:hidden"
          />
        </>
      )}
    </div>
  );
};
