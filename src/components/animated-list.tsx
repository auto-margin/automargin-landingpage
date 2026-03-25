"use client";

import { AnimatedList } from "./ui/animated-list";

import { cn } from "@/lib/utils";

interface Item {
  name: string;
  description: string;
  icon: string;
  time: string;
}

let notifications = [
  {
    name: "Your analysis is ready",
    description: "Auto-margin",
    time: "7m ago",
    icon: "/logos/gmail.svg",
  },
  {
    name: "Offer has been validated",
    description: "Auto-margin",
    time: "9m ago",
    icon: "/logos/outlook.svg",
  },
  {
    name: "This dealer is selling t...",
    description: "Auto-margin",
    time: "5m ago",
    icon: "/logos/apple-mail.svg",
  },
  {
    name: "New message received",
    description: "Auto-margin",
    time: "2m ago",
    icon: "/logos/outlook.svg",
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[min(100%,18.5rem)] cursor-pointer overflow-hidden rounded-xl px-2.5 py-2 sm:max-w-[19.5rem] sm:px-3 sm:py-2.5 md:max-w-[20rem] lg:max-w-full lg:px-2 lg:py-2 xl:max-w-[18.5rem]",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)]",
      )}
    >
      <div className="flex flex-row items-center gap-2 max-md:gap-2.5 sm:gap-2.5">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg max-md:size-9 sm:size-9">
          {/* Use native img for deterministic SVG sizing inside this card */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={icon}
            alt={`${name} icon`}
            className="h-full w-full object-contain p-0.5"
            draggable={false}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "text-sm leading-tight font-medium sm:text-[0.9375rem] dark:text-white",
              "max-md:text-balance max-md:break-words",
              "sm:max-lg:whitespace-nowrap lg:whitespace-nowrap xl:whitespace-nowrap",
            )}
          >
            <span>{name}</span>
            <span className="text-[0.6875rem] font-normal text-gray-500 sm:text-xs">
              {" "}
              · {time}
            </span>
          </p>
          <p className="mt-0.5 text-[0.6875rem] leading-tight text-gray-500 sm:text-xs dark:text-white/55">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedListDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col overflow-hidden p-1.5 sm:p-2",
        className,
      )}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>

      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t sm:h-1/5"></div>
    </div>
  );
}
