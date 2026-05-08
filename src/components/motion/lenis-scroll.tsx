"use client";

import * as React from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function LenisScroll() {
  const reduced = useReducedMotion();

  React.useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1,
    });

    window.__lenis = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onAnchorClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const id = href.slice(1);
      if (!id) return;
      const node = document.getElementById(id);
      if (!node) return;
      event.preventDefault();
      lenis.scrollTo(node, { offset: -80, duration: 1.2 });
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onAnchorClick);
      lenis.destroy();
      if (window.__lenis === lenis) {
        window.__lenis = undefined;
      }
    };
  }, [reduced]);

  return null;
}
