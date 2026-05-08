"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

export function BackToTop({
  threshold = 600,
  className,
}: {
  threshold?: number;
  className?: string;
}) {
  const [visible, setVisible] = React.useState(false);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      setVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const onClick = () => {
    if (typeof window === "undefined") return;
    const lenis = window.__lenis;
    if (lenis && !reduced) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={onClick}
          initial={{ opacity: 0, y: 12, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.92 }}
          transition={{
            duration: reduced ? 0 : 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={cn(
            "fixed bottom-6 right-6 z-[60] inline-flex size-11 items-center justify-center rounded-full border border-border bg-background/80 text-foreground/80 shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.35)] backdrop-blur transition-colors hover:bg-accent hover:text-foreground sm:bottom-8 sm:right-8",
            className,
          )}
        >
          <ArrowUp className="size-4" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
