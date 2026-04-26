"use client";

import type { CSSProperties } from "react";

import Image from "next/image";

import styles from "./car-brand-logo-wall.module.css";

import { CAR_BRAND_LOGOS } from "@/lib/car-brands";
import { cn } from "@/lib/utils";

const columns = 10;
const rows = 5;
const logos = Array.from({ length: columns * rows }, (_, index) => ({
  ...CAR_BRAND_LOGOS[index % CAR_BRAND_LOGOS.length],
  _key: `${CAR_BRAND_LOGOS[index % CAR_BRAND_LOGOS.length]!.slug}-${index}`,
}));

type LogoWallStyles = CSSProperties & {
  "--tile": string;
  "--gap-x": string;
  "--gap-y": string;
};

export function CarBrandLogoWall({ className }: { className?: string }) {
  const viewportStyles: LogoWallStyles = {
    "--tile": "clamp(56px, 7vw, 104px)",
    "--gap-x": "clamp(8px, 1.15vw, 18px)",
    "--gap-y": "clamp(8px, 1vw, 16px)",
  };

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      aria-label="Car brand logos"
    >
      <div className="relative mx-auto w-full">
        <div className="bg-foreground/[0.02] pointer-events-none absolute -inset-16 -z-10 rounded-[3.5rem] blur-2xl" />
        <div className="pointer-events-none absolute -inset-12 -z-10 rounded-[3.25rem] shadow-[0_80px_220px_rgba(0,0,0,0.22)]" />
        <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] shadow-[0_40px_120px_rgba(0,0,0,0.18)]" />

        <div
          className={cn(
            "relative h-[clamp(300px,34vw,430px)] overflow-hidden",
            styles.logoWall,
          )}
          style={viewportStyles}
        >
          <div
            className={cn(
              "relative mx-auto grid w-fit -translate-x-[2%] -translate-y-[14%] place-items-center",
              "[grid-template-columns:repeat(10,var(--tile))]",
              "[grid-auto-rows:var(--tile)]",
              "gap-x-[var(--gap-x)] gap-y-[var(--gap-y)]",
            )}
          >
            {logos.map((brand) => (
              <div
                key={brand._key}
                className={cn(
                  "group relative flex aspect-square w-full items-center justify-center",
                  "bg-card text-card-foreground border-border rounded-2xl border shadow-sm",
                  "transition-[box-shadow,transform] duration-200 will-change-transform",
                  "hover:scale-[1.04] hover:shadow-md",
                )}
              >
                <div className="relative h-8.5 w-8.5 sm:h-9.5 sm:w-9.5 md:h-10.5 md:w-10.5 lg:h-12.5 lg:w-12.5">
                  <Image
                    src={brand.logoSrc}
                    alt={`${brand.name} logo`}
                    fill
                    sizes="(min-width: 1280px) 64px, (min-width: 768px) 56px, 44px"
                    className={cn(
                      "object-contain opacity-100 grayscale",
                      "transition duration-200",
                      "group-hover:grayscale-0",
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0">
            <div className="from-background via-background/88 absolute inset-x-0 top-0 h-24 bg-linear-to-b to-transparent" />
            <div className="from-background via-background/85 absolute inset-x-0 bottom-0 h-24 bg-linear-to-t to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CarBrandLogoWallSection({ className }: { className?: string }) {
  return (
    <section className={cn("overflow-hidden py-12 lg:py-16", className)}>
      <div className="container">
        <CarBrandLogoWall />
      </div>
    </section>
  );
}
