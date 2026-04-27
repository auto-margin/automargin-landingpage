"use client";
import React, { forwardRef, useRef } from "react";

import Image from "next/image";

import { FileInput } from "lucide-react";

import { AnimatedBeam } from "./ui/animated-beam";

import { cn } from "@/lib/utils";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

function MarketFlag({
  alt,
  code,
  src,
}: {
  alt: string;
  code: string;
  src: string;
}) {
  return (
    <div className="relative h-full w-full">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        style={{ display: "block" }}
        unoptimized
      />
      <div className="absolute inset-0 bg-black/10" />
      <span className="absolute inset-0 flex items-center justify-center text-sm font-black tracking-normal text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] min-[1440px]:text-lg sm:text-base">
        {code}
      </span>
    </div>
  );
}

function GermanyFlag() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      role="img"
      aria-label="Germany"
    >
      <div className="absolute inset-0 grid grid-rows-3">
        <div className="bg-black" />
        <div className="bg-[#dd0000]" />
        <div className="bg-[#ffce00]" />
      </div>
      <div className="absolute inset-0 bg-black/10" />
      <span className="absolute inset-0 flex items-center justify-center text-sm font-black tracking-normal text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] min-[1440px]:text-lg sm:text-base">
        DE
      </span>
    </div>
  );
}

const marketCircleClass =
  "border-border size-24 overflow-hidden border p-0 shadow-none min-[1440px]:size-[7.5rem] sm:size-[6.5rem] md:size-28 lg:size-28";

export function AnimatedBeamMultipleOutputDemo({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full items-start justify-center overflow-hidden pt-1 max-sm:px-3 max-sm:pt-0.5 min-[1440px]:items-start min-[1440px]:px-11 min-[1440px]:pt-3 min-[1440px]:pb-11 sm:px-4 md:items-center md:px-8 md:pt-0 lg:items-center lg:p-10 lg:pt-0",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn(
          "relative z-10 flex size-full max-w-full flex-row items-stretch justify-between gap-2 min-[1440px]:max-w-xl min-[1440px]:gap-12 sm:max-w-lg sm:gap-5 md:gap-9 lg:gap-10",
          "max-sm:origin-top max-sm:scale-[0.94] sm:scale-100",
        )}
      >
        <div className="flex flex-col justify-center">
          <Circle ref={div7Ref} className="size-12 min-[1440px]:size-14">
            <FileInput className="text-black" />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle
            ref={div6Ref}
            className="size-[4.25rem] overflow-hidden p-0 min-[1440px]:size-24 md:size-[4.75rem] lg:size-20"
          >
            <Image
              src="/vectorized (1).svg"
              alt="Logo"
              width={100}
              height={100}
              className="h-full w-full object-cover p-3 min-[1440px]:p-4"
              style={{ display: "block" }}
            />
          </Circle>
        </div>
        <div className="flex flex-col justify-center gap-1 sm:gap-1.5 md:gap-1.5">
          <Circle
            ref={div1Ref}
            className={marketCircleClass}
          >
            <MarketFlag alt="Europe" code="EU" src="/flags/eu.svg" />
          </Circle>
          <Circle ref={div2Ref} className={marketCircleClass}>
            <GermanyFlag />
          </Circle>
          <Circle ref={div3Ref} className={marketCircleClass}>
            <MarketFlag alt="Switzerland" code="CH" src="/flags/ch.svg" />
          </Circle>
          <Circle ref={div4Ref} className={marketCircleClass}>
            <MarketFlag alt="Belgium" code="BE" src="/flags/be.svg" />
          </Circle>
          <Circle ref={div5Ref} className={marketCircleClass}>
            <MarketFlag alt="Sweden" code="SE" src="/flags/se.svg" />
          </Circle>
        </div>
      </div>

      {/* AnimatedBeams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div7Ref}
        duration={3}
      />
    </div>
  );
}
