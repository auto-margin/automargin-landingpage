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

const MarketIcons = {
  autoscout: () => (
    <div className="relative h-full w-full">
      <Image
        src="/markets/autoscout.svg"
        alt="AutoScout24"
        fill
        className="object-contain"
        style={{ display: "block" }}
        unoptimized
      />
    </div>
  ),
  mobilede: () => (
    <div className="relative h-full w-full">
      <Image
        src="/markets/mobilede.svg"
        alt="Mobile.de"
        fill
        className="object-contain"
        style={{ display: "block" }}
        unoptimized
      />
    </div>
  ),
  otomoto: () => (
    <div className="relative h-full w-full">
      <Image
        src="/markets/otomoto.svg"
        alt="OttoMoto"
        fill
        className="object-contain"
        style={{ display: "block" }}
        unoptimized
      />
    </div>
  ),
  lacentrale: () => (
    <div className="relative h-full w-full">
      <Image
        src="/markets/lacentrale.svg"
        alt="LaCentrale"
        fill
        className="object-contain"
        style={{ display: "block" }}
        unoptimized
      />
    </div>
  ),
  cochenet: () => (
    <div className="relative h-full w-full">
      <Image
        src="/markets/cochenet.svg"
        alt="CoCHeNet"
        fill
        className="object-contain"
        style={{ display: "block" }}
        unoptimized
      />
    </div>
  ),
} as const;

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
            className="size-24 overflow-hidden p-2 shadow-[0_4px_14px_-6px_rgba(0,0,0,0.1)] min-[1440px]:size-[7.5rem] min-[1440px]:p-3.5 sm:size-[6.5rem] sm:p-2.5 md:size-28 md:p-3 lg:size-28"
          >
            <MarketIcons.autoscout />
          </Circle>
          <Circle
            ref={div2Ref}
            className="size-24 overflow-hidden p-2 min-[1440px]:size-[7.5rem] min-[1440px]:p-3.5 sm:size-[6.5rem] sm:p-2.5 md:size-28 md:p-3 lg:size-28"
          >
            <MarketIcons.mobilede />
          </Circle>
          <Circle
            ref={div3Ref}
            className="size-24 overflow-hidden p-2 min-[1440px]:size-[7.5rem] min-[1440px]:p-3.5 sm:size-[6.5rem] sm:p-2.5 md:size-28 md:p-3 lg:size-28"
          >
            <MarketIcons.cochenet />
          </Circle>
          <Circle
            ref={div4Ref}
            className="size-24 overflow-hidden p-2 min-[1440px]:size-[7.5rem] min-[1440px]:p-3.5 sm:size-[6.5rem] sm:p-2.5 md:size-28 md:p-3 lg:size-28"
          >
            <MarketIcons.lacentrale />
          </Circle>
          <Circle
            ref={div5Ref}
            className="size-24 overflow-hidden p-2 min-[1440px]:size-[7.5rem] min-[1440px]:p-3.5 sm:size-[6.5rem] sm:p-2.5 md:size-28 md:p-3 lg:size-28"
          >
            <MarketIcons.otomoto />
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
