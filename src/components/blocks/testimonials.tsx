import Image from "next/image";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { DashedLine } from "../dashed-line";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const items = [
  {
    id: "offers",
    author: "Alex",
    company: "EuroMotors AG",
    image: "/testimonials/emotors.svg",
  },
  {
    id: "flow",
    author: "Besnik Rulani",
    company: "CarTrade24",
    image: "/testimonials/cartrade.svg",
  },
  {
    id: "stock",
    author: "Stepan K",
    company: "Swiss Select Import",
    image: "/testimonials/ssi1337.svg",
  },
  {
    id: "margin",
    author: "Kim B",
    company: "EuroMotors AG",
    image: "/testimonials/emotors.svg",
  },
  {
    id: "deals",
    author: "Patrik T",
    company: "CarTrade24",
    image: "/testimonials/cartrade.svg",
  },
] as const;

export const Testimonials = ({
  className,
  dashedLineClassName,
}: {
  className?: string;
  dashedLineClassName?: string;
}) => {
  const t = useTranslations("Home.testimonials");

  return (
    <>
      <section className={cn("overflow-hidden py-28 lg:py-32", className)}>
        <div className="container">
          <div className="space-y-4">
            <h2 className="text-2xl tracking-tight whitespace-pre-line md:text-4xl lg:text-5xl">
              {t("title")}
            </h2>
            <p className="text-muted-foreground max-w-md leading-snug">
              {t("description")}
            </p>
            <Button variant="outline" className="shadow-md" asChild>
              <Link href="/about">
                {t("cta")} <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="relative mt-8 -mr-[max(3rem,calc((100vw-80rem)/2+3rem))] md:mt-12 lg:mt-20">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="">
                {items.map((testimonial, index) => (
                  <CarouselItem
                    key={index}
                    className="xl:basis-1/3.5 grow basis-4/5 sm:basis-3/5 md:basis-2/5 lg:basis-[28%] 2xl:basis-[24%]"
                  >
                    <Card className="bg-muted h-full overflow-hidden border-none">
                      <CardContent className="flex h-full flex-col p-0">
                        <div className="relative h-[288px] lg:h-[328px]">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.author}
                            fill
                            className={cn(
                              "object-cover object-top opacity-70",
                              testimonial.image ===
                                "/testimonials/ssi1337.svg" && "dark:invert",
                            )}
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between gap-10 p-6">
                          <blockquote className="font-display text-lg leading-none! font-medium md:text-xl lg:text-2xl">
                            {t(`items.${testimonial.id}.quote`)}
                          </blockquote>
                          <div className="space-y-0.5">
                            <div className="text-primary-on-muted font-semibold">
                              {testimonial.author},{" "}
                              {t(`items.${testimonial.id}.role`)}
                            </div>
                            <div className="text-muted-foreground text-sm">
                              {testimonial.company}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-8 flex gap-3">
                <CarouselPrevious className="bg-muted hover:bg-muted/80 static size-14.5 translate-x-0 translate-y-0 transition-colors [&>svg]:size-6 lg:[&>svg]:size-8" />
                <CarouselNext className="bg-muted hover:bg-muted/80 static size-14.5 translate-x-0 translate-y-0 transition-colors [&>svg]:size-6 lg:[&>svg]:size-8" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="relative flex items-center justify-center">
          <DashedLine
            orientation="horizontal"
            className={cn("text-muted-foreground", dashedLineClassName)}
          />
        </div>
      </div>
    </>
  );
};
