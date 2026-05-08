"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import { stats } from "@/data/stats";

function StatProgress({ percent }: { percent: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const reduced = useReducedMotion();
  const target = Math.min(100, Math.max(0, percent));

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="relative mt-4 block h-[3px] w-full overflow-hidden rounded-full bg-foreground/10"
    >
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: inView ? target / 100 : 0 }}
        transition={{
          duration: reduced ? 0 : 1.6,
          ease: [0.22, 1, 0.36, 1],
          delay: reduced ? 0 : 0.2,
        }}
        style={{ transformOrigin: "0% 50%" }}
        className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500"
      />
    </span>
  );
}

export function Stats() {
  const t = useTranslations("stats");

  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-wide">
        <Reveal>
          <div className="gradient-border relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/8 via-card to-card p-8 sm:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-fuchsia-500/15 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-20 bottom-0 size-72 rounded-full bg-primary/20 blur-3xl"
            />
            <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, i) => {
                const label = t(`items.${stat.key}.label`);
                const description = t(`items.${stat.key}.description`);
                const suffix = stat.localizedSuffix
                  ? t(`items.${stat.key}.suffix`)
                  : stat.suffix;

                return (
                  <div
                    key={stat.key}
                    className={`group relative ${
                      i > 0
                        ? "lg:border-l lg:border-border/40 lg:pl-8"
                        : ""
                    }`}
                  >
                    {i > 0 && (
                      <span
                        aria-hidden="true"
                        className="absolute -left-[3px] top-1/2 hidden size-1.5 -translate-y-1/2 rounded-full bg-primary/40 lg:block"
                      />
                    )}
                    <p className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                      <span className="gradient-text-brand">
                        <Counter
                          to={stat.value}
                          prefix={stat.prefix}
                          suffix={suffix}
                          decimals={stat.decimals}
                        />
                      </span>
                    </p>
                    <StatProgress percent={stat.progressPercent ?? 100} />
                    <p className="mt-3 text-sm font-medium text-foreground">
                      {label}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
