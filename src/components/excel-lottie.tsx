"use client";

import dynamic from "next/dynamic";

type LottieIconBaseProps = {
  className?: string;
  width?: number | string;
  height?: number | string;
  loop?: boolean;
  autoplay?: boolean;
  ariaLabel?: string;
};

export type LottieIconProps = LottieIconBaseProps & {
  src: string;
  /** Only if your .lottie has multiple animations and no default – set from manifest.json. */
  animationId?: string;
  /** Only if colors look wrong – set from manifest.json themes. */
  themeId?: string;
};

const DotLottieReact = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false },
);

export const LottieIcon = ({
  src,
  className,
  width = 48,
  height = 48,
  loop = true,
  autoplay = true,
  ariaLabel,
  animationId,
  themeId,
}: LottieIconProps) => {
  return (
    <div
      className={className}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      <DotLottieReact
        src={src}
        loop={loop}
        autoplay={autoplay}
        animationId={animationId}
        themeId={themeId}
        style={{ width, height }}
      />
    </div>
  );
};

export const ExcelLottie = ({
  className,
  width = 48,
  height = 48,
  loop = true,
  autoplay = true,
  ariaLabel = "Excel file upload animation",
}: LottieIconBaseProps) => {
  return (
    <LottieIcon
      src="/lottiefiles/excel.lottie"
      className={className}
      width={width}
      height={height}
      loop={loop}
      autoplay={autoplay}
      ariaLabel={ariaLabel}
    />
  );
};
