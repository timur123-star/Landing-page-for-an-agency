"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type Section = { id: string; label: string };

export function SectionIndicator({ sections }: { sections: Section[] }) {
  const [active, setActive] = React.useState<string | null>(
    sections[0]?.id ?? null,
  );

  React.useEffect(() => {
    if (!sections.length) return;
    if (typeof window === "undefined") return;
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        }
        const firstVisible = sections.find((s) => visible.has(s.id));
        if (firstVisible) setActive(firstVisible.id);
      },
      { rootMargin: "-40% 0% -45% 0%", threshold: 0 },
    );

    for (const s of sections) {
      const node = document.getElementById(s.id);
      if (node) observer.observe(node);
    }

    return () => observer.disconnect();
  }, [sections]);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (typeof document === "undefined") return;
    const node = document.getElementById(id);
    if (!node) return;
    const lenis = typeof window !== "undefined" ? window.__lenis : undefined;
    if (lenis) {
      lenis.scrollTo(node, { offset: -80, duration: 1.2 });
    } else {
      const top = node.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  if (!sections.length) return null;

  return (
    <nav
      aria-label="Section navigation"
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="pointer-events-auto flex flex-col items-end gap-1.5">
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => onClick(e, s.id)}
                className={cn(
                  "group relative flex items-center gap-2 rounded-full px-2 py-1.5 transition-colors",
                  "focus-visible:outline-none",
                )}
              >
                <span
                  className={cn(
                    "rounded-full bg-foreground/30 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground transition-all duration-300",
                    "max-w-0 overflow-hidden whitespace-nowrap opacity-0",
                    "group-hover:max-w-[160px] group-hover:bg-background/80 group-hover:px-3 group-hover:py-1 group-hover:opacity-100 group-hover:shadow-sm group-hover:backdrop-blur",
                    isActive &&
                      "bg-background/80 px-3 py-1 opacity-100 shadow-sm backdrop-blur",
                    !isActive && "group-hover:max-w-[160px]",
                  )}
                >
                  {isActive ? <ActiveLabel label={s.label} /> : s.label}
                </span>
                <span className="relative inline-flex">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "block size-1.5 rounded-full transition-all duration-300",
                      isActive
                        ? "bg-primary"
                        : "bg-foreground/35 group-hover:bg-foreground/60",
                    )}
                  />
                  {isActive ? (
                    <motion.span
                      layoutId="section-indicator-ring"
                      aria-hidden="true"
                      className="absolute inset-0 -m-[3px] rounded-full ring-1 ring-primary/40"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  ) : null}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function ActiveLabel({ label }: { label: string }) {
  return (
    <motion.span
      key={label}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className="inline-block"
    >
      {label}
    </motion.span>
  );
}
