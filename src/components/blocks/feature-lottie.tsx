"use client";

import dynamic from "next/dynamic";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((m) => m.DotLottieReact),
  {
    ssr: false,
    loading: () => (
      <div className="bg-muted/50 h-full w-full animate-pulse rounded-xl" />
    ),
  },
);

type FeatureLottieProps = {
  align?: [number, number];
  className?: string;
  fit?: "contain" | "cover" | "fill" | "fit-height" | "fit-width" | "none";
  label: string;
  src: string;
};

export const FeatureLottie = ({
  align = [0.5, 0.5],
  className,
  fit = "contain",
  label,
  src,
}: FeatureLottieProps) => (
  <div role="img" aria-label={label} className={className}>
    <DotLottieReact
      src={src}
      autoplay
      loop
      layout={{ fit, align }}
      renderConfig={{ autoResize: true, devicePixelRatio: 2, quality: 100 }}
      className="h-full w-full"
    />
  </div>
);
