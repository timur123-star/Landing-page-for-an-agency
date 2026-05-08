"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

type AnimatedTextProps = {
  text: string;
  className?: string;
  highlight?: string[];
  highlightClassName?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  staggerDelay?: number;
};

const containerVariants: Variants = {
  hidden: {},
  visible: (custom: { delay: number; stagger: number }) => ({
    transition: {
      delayChildren: custom.delay,
      staggerChildren: custom.stagger,
    },
  }),
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "60%",
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const reducedWordVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

export function AnimatedText({
  text,
  className,
  highlight = [],
  highlightClassName = "gradient-text-brand",
  as = "h1",
  delay = 0,
  staggerDelay = 0.06,
}: AnimatedTextProps) {
  const words = text.split(" ");
  const Tag = motion[as];
  const reduced = useReducedMotion();

  return (
    <Tag
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      custom={{
        delay: reduced ? 0 : delay,
        stagger: reduced ? 0 : staggerDelay,
      }}
      aria-label={text}
    >
      {words.map((word, index) => {
        const cleanWord = word.replace(/[.,!?;:]/g, "");
        const isHighlighted = highlight.includes(cleanWord);
        return (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-hidden align-bottom"
          >
            <motion.span
              variants={reduced ? reducedWordVariants : wordVariants}
              className={cn(
                "inline-block whitespace-pre",
                isHighlighted && highlightClassName,
              )}
            >
              {word}
              {index < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
