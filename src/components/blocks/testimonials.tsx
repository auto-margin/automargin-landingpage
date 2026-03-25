import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

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
import { cn } from "@/lib/utils";

const items = [
  {
    quote: "We send offers by email and get margin analysis back in minutes.",
    author: "Marcus Nielsen",
    role: "Sale Manager",
    company: "EuroMotors AG",
    image: "/testimonials/emotors.svg",
  },
  {
    quote: "AutoMargin’s analysis is a game-changer for our buying decisions.",
    author: "Besnik Rulani",
    role: "CEO",
    company: "CarTrade24",
    image: "/testimonials/cartrade.svg",
  },
  {
    quote: "We cut hours of manual comparison down to seconds.",
    author: "Stepan K",
    role: "Vehicle Analyst",
    company: "Swiss Select Import",
    image: "/testimonials/ssi1337.svg",
  },
  {
    quote: "Very nice tool for analyzing market prices - simple endpoints",
    author: "Kim B",
    role: "Developer",
    company: "EuroMotors AG",
    image: "/testimonials/emotors.svg",
  },
  {
    quote: "We always use AutoMargin before we start negotiations.",
    author: "Patrik T",
    role: "Sales Consultant",
    company: "CarTrade24",
    image: "/testimonials/cartrade.svg",
  },
];

export const Testimonials = ({
  className,
  dashedLineClassName,
}: {
  className?: string;
  dashedLineClassName?: string;
}) => {
  return (
    <>
      <section className={cn("overflow-hidden py-28 lg:py-32", className)}>
        <div className="container">
          <div className="space-y-4">
            <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
              Trusted by well known dealers
            </h2>
            <p className="text-muted-foreground max-w-md leading-snug">
              Dealers use AutoMargin to analyze offers from AutoScout24,
              Mobile.de and other marketplaces.
            </p>
            <Button variant="outline" className="shadow-md" asChild>
              <Link href="/about">
                Read more About Us <ArrowRight className="size-4" />
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
                            {testimonial.quote}
                          </blockquote>
                          <div className="space-y-0.5">
                            <div className="text-primary-on-muted font-semibold">
                              {testimonial.author}, {testimonial.role}
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
      <DashedLine
        orientation="horizontal"
        className={cn("mx-auto max-w-[80%]", dashedLineClassName)}
      />
    </>
  );
};
