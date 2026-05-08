"use client";

import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedText } from "@/components/motion/animated-text";

export function ProblemSolution() {
  const t = useTranslations("problemSolution");
  const problems = t.raw("problems") as string[];
  const solutions = t.raw("solutions") as string[];

  return (
    <section
      id="why"
      className="relative scroll-mt-24 py-20 sm:py-28 lg:py-32"
    >
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

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--spotlight-x", `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty("--spotlight-y", `${e.clientY - rect.top}px`);
              }}
              className="card-spotlight group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:border-rose-500/30 hover:shadow-[0_20px_50px_-20px_rgb(244_63_94/0.2)] sm:p-9"
            >
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 size-56 rounded-full bg-rose-500/15 blur-3xl transition-transform duration-700 group-hover:scale-110"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-500">
                {t("problemKicker")}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-balance sm:text-[28px]">
                {t("problemHeading")}
              </h3>
              <ul className="mt-6 space-y-4">
                {problems.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-rose-500">
                      <X className="size-3.5" />
                    </span>
                    <span className="text-foreground/80">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--spotlight-x", `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty("--spotlight-y", `${e.clientY - rect.top}px`);
              }}
              className="card-spotlight group relative h-full overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-7 ring-glow transition-all duration-300 hover:shadow-[0_20px_50px_-20px_hsl(var(--primary)/0.35)] sm:p-9"
            >
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 size-56 rounded-full bg-primary/25 blur-3xl transition-transform duration-700 group-hover:scale-110"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {t("solutionKicker")}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-balance sm:text-[28px]">
                {t("solutionHeading")}
              </h3>
              <ul className="mt-6 space-y-4">
                {solutions.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="size-3.5" />
                    </span>
                    <span className="text-foreground/90">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
