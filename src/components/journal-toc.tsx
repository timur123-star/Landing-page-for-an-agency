"use client";

import * as React from "react";
import { List } from "lucide-react";

import { cn } from "@/lib/utils";

type Heading = { id: string; text: string };

export function JournalTOC({
  headings,
  label,
}: {
  headings: Heading[];
  label: string;
}) {
  const [active, setActive] = React.useState<string | null>(
    headings[0]?.id ?? null,
  );

  React.useEffect(() => {
    if (!headings.length) return;
    if (typeof window === "undefined") return;
    const observers: IntersectionObserver[] = [];
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
        const firstVisible = headings.find((h) => visible.has(h.id));
        if (firstVisible) setActive(firstVisible.id);
      },
      { rootMargin: "-30% 0% -55% 0%", threshold: 0 },
    );

    for (const h of headings) {
      const node = document.getElementById(h.id);
      if (node) observer.observe(node);
    }
    observers.push(observer);

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [headings]);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (typeof document === "undefined") return;
    const node = document.getElementById(id);
    if (!node) return;
    const lenis = typeof window !== "undefined" ? window.__lenis : undefined;
    if (lenis) {
      lenis.scrollTo(node, { offset: -100, duration: 1 });
    } else {
      const top =
        node.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setActive(id);
  };

  if (!headings.length) return null;

  return (
    <aside className="sticky top-32 hidden self-start lg:block">
      <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <List className="size-3.5" />
        {label}
      </p>
      <ul className="mt-4 space-y-1.5 text-sm">
        {headings.map((h) => {
          const isActive = active === h.id;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={(e) => onClick(e, h.id)}
                className={cn(
                  "group flex gap-3 rounded-lg py-1 pl-3 text-foreground/70 transition-colors hover:text-foreground",
                  isActive && "text-foreground",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-1.5 inline-block h-px w-4 shrink-0 bg-border transition-all",
                    isActive
                      ? "w-7 bg-primary"
                      : "group-hover:w-7 group-hover:bg-foreground/40",
                  )}
                />
                <span className="text-pretty">{h.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
