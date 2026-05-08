"use client";

import * as React from "react";
import { Compass, PencilRuler, Code2, Rocket } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedText } from "@/components/motion/animated-text";
import { ProcessConnector } from "@/components/process-connector";

const steps = [
  { key: "discovery", n: "01", icon: Compass },
  { key: "strategy", n: "02", icon: PencilRuler },
  { key: "engineering", n: "03", icon: Code2 },
  { key: "launch", n: "04", icon: Rocket },
];

export function Process() {
  const t = useTranslations("process");
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <section
      id="process"
      className="relative scroll-mt-24 py-20 sm:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />
      <div className="container-wide">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge variant="primary" className="mx-auto">
            {t("badge")}
          </Badge>
          <AnimatedText
            as="h2"
            text={t("title")}
            highlightClassName="gradient-text"
            highlight={t("title").split(/\s+/)}
            className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl"
          />
          <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
            {t("subtitle")}
          </p>
        </Reveal>

        <div ref={containerRef} className="relative mt-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 top-[58px] hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-9 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-border to-transparent sm:hidden"
          />
          <ProcessConnector containerRef={containerRef} />

          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const title = t(`steps.${step.key}.title`);
              const duration = t(`steps.${step.key}.duration`);
              const description = t(`steps.${step.key}.description`);
              const deliverables = t.raw(
                `steps.${step.key}.deliverables`,
              ) as string[];

              return (
                <Reveal key={step.key} delay={i * 0.07}>
                  <li
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      e.currentTarget.style.setProperty("--spotlight-x", `${e.clientX - rect.left}px`);
                      e.currentTarget.style.setProperty("--spotlight-y", `${e.clientY - rect.top}px`);
                    }}
                    className="card-spotlight group relative flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_60px_-30px_hsl(var(--primary)/0.45)]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-primary/15 via-violet-500/15 to-fuchsia-500/15 text-primary ring-1 ring-primary/20 transition-shadow duration-300 group-hover:shadow-[0_0_20px_-4px_hsl(var(--primary)/0.4)]">
                        <Icon className="size-5" />
                      </span>
                      <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary/40 transition-colors duration-300 group-hover:text-primary/70">
                        {step.n}
                      </span>
                    </div>

                    <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">
                      {title}
                    </h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-primary/80">
                      {duration}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {description}
                    </p>

                    <ul className="mt-6 flex flex-wrap gap-1.5">
                      {deliverables.map((d) => (
                        <li
                          key={d}
                          className="rounded-full border border-border/70 bg-background/40 px-2.5 py-1 text-[11px] font-medium text-foreground/80"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
