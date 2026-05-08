"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  pauseOnHover?: boolean;
  reverse?: boolean;
  vertical?: boolean;
  duration?: number;
  repeat?: number;
};

export function Marquee({
  children,
  className,
  pauseOnHover = false,
  reverse = false,
  vertical = false,
  duration = 40,
  repeat = 2,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          className={cn(
            "flex shrink-0 items-center justify-around gap-10 px-5",
            vertical
              ? "animate-marquee-y flex-col"
              : "animate-marquee-x flex-row",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
