"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface RotatingWordsProps {
  words: string[];
  interval?: number;
  className?: string;
}

export function RotatingWords({
  words,
  interval = 2800,
  className,
}: RotatingWordsProps) {
  const [index, setIndex] = React.useState(0);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    if (reduced || words.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval, reduced]);

  if (reduced || words.length <= 1) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 16, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -16, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
