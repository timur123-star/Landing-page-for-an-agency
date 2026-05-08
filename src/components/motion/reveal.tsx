"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";

import { cn } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  once?: boolean;
};

const variants = (y: number, delay: number): Variants => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      delay,
    },
  },
});

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
  ...props
}: RevealProps) {
  const reduced = useReducedMotion();
  const offset = reduced ? 0 : y;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={variants(offset, reduced ? 0 : delay)}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
