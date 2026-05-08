"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

export function ProcessConnector({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 35%"],
  });
  const dashoffset = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const dotDistance = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (reduced) return null;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 80"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 top-[50px] hidden h-[80px] w-full lg:block"
    >
      <defs>
        <linearGradient id="nova-process-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5159ff" stopOpacity="0" />
          <stop offset="20%" stopColor="#5159ff" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#a855f7" stopOpacity="0.85" />
          <stop offset="80%" stopColor="#22d3ee" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d="M30 40 C 270 -30, 330 110, 600 40 C 870 -30, 930 110, 1170 40"
        fill="none"
        stroke="url(#nova-process-line)"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={1}
        style={{ pathLength: 1, strokeDashoffset: dashoffset }}
        strokeDasharray="1"
      />
      <motion.circle
        r="3.5"
        fill="#a855f7"
        style={{
          offsetPath:
            "path('M30 40 C 270 -30, 330 110, 600 40 C 870 -30, 930 110, 1170 40')",
          offsetDistance: dotDistance,
          filter: "drop-shadow(0 0 6px #a855f7)",
        }}
      />
    </svg>
  );
}
