"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Image from "next/image";

import { ScrollReveal } from "@/components/scroll-reveal";
import { StatusCard } from "@/components/status-card";
import { StatusCardDealer } from "@/components/status-card-dealer";
import { StatusCardProfit } from "@/components/status-card-profit";
import { cn } from "@/lib/utils";

const DEALER_ANIMATION_DELAY_MS = 1000;

export function HeroImageOverlays() {
  const [dealerReveal, setDealerReveal] = useState(false);
  const delayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadHandledRef = useRef(false);

  const onHeroImageLoad = useCallback(() => {
    if (loadHandledRef.current) return;
    loadHandledRef.current = true;
    delayRef.current = setTimeout(() => {
      setDealerReveal(true);
      delayRef.current = null;
    }, DEALER_ANIMATION_DELAY_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (delayRef.current) clearTimeout(delayRef.current);
    };
  }, []);

  return (
    <div className="relative h-[793px] w-full max-lg:overflow-hidden lg:overflow-visible">
      <Image
        src="/test2.png"
        alt="hero"
        fill
        priority
        fetchPriority="high"
        loading="eager"
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="rounded-2xl object-cover object-left-top shadow-lg max-lg:rounded-tr-none"
        onLoad={onHeroImageLoad}
      />
      {/* Top-left: result card – only animates when user scrolls down into view */}
      <ScrollReveal
        variant="zoom"
        onlyAfterScroll
        scrollThreshold={180}
        className="absolute top-108 left-4 z-10 lg:top-18"
        rootMargin="0px 0px -80px 0px"
        threshold={0.1}
      >
        <div>
          <StatusCardProfit className="shadow-xl ring-1 ring-black/5" />
        </div>
      </ScrollReveal>
      {/* Right rail: Dealer info — 1s after hero image load; 1440px+ only */}
      <div className="absolute top-[18%] left-full z-10 hidden min-[1440px]:block min-[1440px]:-translate-x-1/2">
        <div
          className={cn(
            "origin-center",
            dealerReveal
              ? "animate-zoom-in-subtle"
              : "pointer-events-none opacity-0 [transform:scale(0.92)]",
          )}
        >
          <StatusCardDealer className="shadow-xl ring-1 ring-black/5" />
        </div>
      </div>
      {/* Bottom-left: status card – scroll-triggered fade-up */}
      <ScrollReveal
        className="absolute top-28 left-4 z-10 lg:top-auto lg:bottom-0 lg:left-9 xl:left-4"
        rootMargin="0px 0px -60px 0px"
        threshold={0.15}
      >
        <div className="max-lg:translate-x-0 max-lg:translate-y-0 lg:-translate-x-[20%] lg:translate-y-[20%]">
          <StatusCard className="shadow-xl ring-1 ring-black/5" />
        </div>
      </ScrollReveal>
    </div>
  );
}
