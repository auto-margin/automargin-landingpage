"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { LottieIcon } from "@/components/excel-lottie";

const LOTTIE_SRC = "/lottiefiles/Untitled file (5).lottie";
// If you see "Failed to load animation with id": rename .lottie to .zip, open manifest.json and set animations[0].id here.
const LOTTIE_ANIMATION_ID: string | undefined = undefined;
// If colors look wrong: in manifest.json check "themes" or the animation's themeId and set it here.
const LOTTIE_THEME_ID: string | undefined = undefined;

export function ExtraFeaturesLottie() {
  const ref = useRef<HTMLElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldLoad(true);
          }
        }
      },
      {
        rootMargin: "100px 0px",
        threshold: 0.01,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="z-10 hidden w-full overflow-hidden pb-20 md:block lg:pb-24"
      aria-label="Extra features overview"
    >
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8">
        <div className="relative mx-auto aspect-[16/10] w-full max-w-4xl xl:max-w-3xl">
          {shouldLoad && (
            <LottieIcon
              src={LOTTIE_SRC}
              animationId={LOTTIE_ANIMATION_ID}
              themeId={LOTTIE_THEME_ID}
              className="absolute inset-0 size-full"
              width="100%"
              height="100%"
              loop={false}
              autoplay
              ariaLabel="Extra features animation"
            />
          )}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            aria-hidden
          >
            <Image
              src="/vectorized (1).svg"
              alt=""
              width={100}
              height={100}
              className="h-32 w-32 object-contain opacity-18 md:h-54 md:w-54"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
