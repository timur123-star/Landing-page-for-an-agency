"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

export function IntroSplash() {
  const reduced = useReducedMotion();
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    if (reduced) {
      setShow(false);
      return;
    }
    const seen =
      typeof window !== "undefined"
        ? sessionStorage.getItem("nova-intro-seen")
        : null;
    if (seen === "1") {
      setShow(false);
      return;
    }
    const t = setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem("nova-intro-seen", "1");
      } catch {
        /* noop */
      }
    }, 1400);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="intro-splash"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            clipPath: "inset(50% 0 50% 0)",
            transition: { duration: 0.7, ease: [0.7, 0, 0.3, 1] },
          }}
          className="fixed inset-0 z-[200] grid place-items-center bg-[#06060b]"
          aria-hidden="true"
        >
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="aurora-blob absolute inset-0 m-auto size-[420px] rounded-full bg-[#5159ff]" />
          <motion.div
            initial={{ opacity: 0, scale: 0.7, filter: "blur(14px)" }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            }}
            className="relative flex items-center gap-3"
          >
            <span
              aria-hidden="true"
              className="relative inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5159ff] via-violet-500 to-fuchsia-500 text-white shadow-[0_18px_60px_-10px_#5159ff80]"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 12V2L12 12V2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="font-display text-2xl font-semibold tracking-tight text-white">
              NOVA
              <span className="text-white/60">.studio</span>
            </span>
          </motion.div>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: 1,
              transition: { duration: 1.2, ease: [0.65, 0, 0.35, 1] },
            }}
            className="absolute bottom-16 left-1/2 h-px w-40 -translate-x-1/2 origin-left bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
