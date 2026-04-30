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
  showCode = true,
}: {
  alt: string;
  code: string;
  src: string;
  showCode?: boolean;
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
      {showCode ? (
        <span className="absolute inset-0 flex items-center justify-center text-[0.65rem] font-black tracking-[0.02em] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] min-[1440px]:text-sm sm:text-xs">
          {code}
        </span>
      ) : null}
    </div>
  );
}

const marketCircleClass =
  "border-border h-10 w-[4.75rem] overflow-hidden rounded-lg border p-0 shadow-[0_10px_22px_-20px_rgba(15,23,42,0.75)] min-[1440px]:h-12 min-[1440px]:w-[5.6rem] sm:h-11 sm:w-[5.1rem] md:h-12 md:w-[5.7rem] lg:h-12 lg:w-[5.45rem]";
const miniMarketClass =
  "border-border h-6 w-8 overflow-hidden rounded-lg border bg-white p-0 shadow-[0_10px_18px_-18px_rgba(15,23,42,0.7)] sm:h-7 sm:w-9";

export function AnimatedBeamMultipleOutputDemo({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
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
          "relative z-10 flex size-full max-w-full flex-row items-stretch justify-between gap-2 min-[1440px]:max-w-xl min-[1440px]:gap-12 sm:max-w-lg sm:gap-4 md:gap-8 lg:gap-9",
          "max-sm:origin-top max-sm:scale-[0.94] sm:scale-100",
        )}
      >
        <div className="flex flex-col justify-center">
          <Circle ref={div7Ref} className="size-11 min-[1440px]:size-13">
            <FileInput className="text-black" />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle
            ref={div6Ref}
            className="size-[4rem] overflow-hidden p-0 min-[1440px]:size-[5.1rem] md:size-[4.4rem] lg:size-[4.5rem]"
          >
            <Image
              src="/vectorized (1).svg"
              alt="Logo"
              width={100}
              height={100}
              className="h-full w-full object-cover p-3 min-[1440px]:p-[0.95rem]"
              style={{ display: "block" }}
            />
          </Circle>
        </div>
        <div className="flex flex-col justify-center gap-2 sm:gap-2 md:gap-2.5">
          <Circle ref={div1Ref} className={marketCircleClass}>
            <MarketFlag alt="Europe" code="EU" src="/flags/eu.svg" />
          </Circle>
          <Circle ref={div3Ref} className={marketCircleClass}>
            <MarketFlag alt="China" code="CN" src="/flags/cn.svg" />
          </Circle>
          <Circle ref={div2Ref} className={marketCircleClass}>
            <MarketFlag alt="South Korea" code="KR" src="/flags/kr.svg" />
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
        fromRef={div6Ref}
        toRef={div7Ref}
        duration={3}
      />
    </div>
  );
}
