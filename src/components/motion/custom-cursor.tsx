"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, [data-cursor="hover"]';

export function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = React.useState(false);
  const [hover, setHover] = React.useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 320, damping: 30, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 320, damping: 30, mass: 0.4 });

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduced) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const onOver = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        setHover(false);
        return;
      }
      setHover(!!target.closest(INTERACTIVE_SELECTOR));
    };
    const onLeave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{
          translateX: sx,
          translateY: sy,
        }}
        animate={{
          width: hover ? 56 : 14,
          height: hover ? 56 : 14,
          opacity: hover ? 0.18 : 0.85,
          backgroundColor: hover
            ? "hsl(var(--primary))"
            : "hsl(var(--foreground))",
        }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-difference"
      />
      <motion.div
        aria-hidden="true"
        style={{
          translateX: x,
          translateY: y,
        }}
        animate={{ opacity: hover ? 0 : 0.6 }}
        transition={{ duration: 0.15 }}
        className="pointer-events-none fixed left-0 top-0 z-[100] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"
      />
    </>
  );
}
