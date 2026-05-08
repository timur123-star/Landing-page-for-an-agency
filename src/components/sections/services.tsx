"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedText } from "@/components/motion/animated-text";
import { services } from "@/data/services";

const layout = [
  {
    span: "lg:col-span-8",
    accent: "from-[#5159ff]/25 via-[#a855f7]/10 to-transparent",
    blob: "bg-[#5159ff]/30",
    height: "min-h-[320px]",
  },
  {
    span: "lg:col-span-4",
    accent: "from-fuchsia-500/20 via-rose-500/10 to-transparent",
    blob: "bg-fuchsia-500/25",
    height: "min-h-[320px]",
  },
  {
    span: "lg:col-span-4",
    accent: "from-cyan-500/20 via-blue-500/10 to-transparent",
    blob: "bg-cyan-400/25",
    height: "min-h-[280px]",
  },
  {
    span: "lg:col-span-4",
    accent: "from-amber-400/15 via-orange-500/10 to-transparent",
    blob: "bg-amber-400/25",
    height: "min-h-[280px]",
  },
  {
    span: "lg:col-span-4",
    accent: "from-emerald-400/20 via-teal-500/10 to-transparent",
    blob: "bg-emerald-400/25",
    height: "min-h-[280px]",
  },
  {
    span: "lg:col-span-12",
    accent: "from-violet-500/20 via-[#5159ff]/10 to-fuchsia-500/15",
    blob: "bg-violet-500/25",
    height: "min-h-[200px]",
  },
];

export function Services() {
  const t = useTranslations("services");

  return (
    <section
      id="services"
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

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {services.map((service, i) => {
            const cfg = layout[i] ?? layout[0];
            const Icon = service.icon;
            const isWide =
              cfg.span.includes("col-span-12") ||
              cfg.span.includes("col-span-8");
            const title = t(`items.${service.key}.title`);
            const description = t(`items.${service.key}.description`);
            const bullets = t.raw(`items.${service.key}.bullets`) as string[];

            return (
              <Reveal key={service.key} delay={i * 0.05} className={cfg.span}>
                <article
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty(
                      "--spotlight-x",
                      `${e.clientX - rect.left}px`,
                    );
                    e.currentTarget.style.setProperty(
                      "--spotlight-y",
                      `${e.clientY - rect.top}px`,
                    );
                  }}
                  className={`card-spotlight group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_28px_60px_-30px_hsl(var(--primary)/0.45)] sm:p-8 ${cfg.height}`}
                >
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${cfg.accent} opacity-80 transition-opacity duration-500 group-hover:opacity-100`}
                  />
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -right-20 -top-20 size-56 rounded-full blur-3xl ${cfg.blob} transition-transform duration-700 group-hover:scale-110`}
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="grid size-12 place-items-center rounded-2xl bg-background/70 ring-1 ring-border backdrop-blur-sm transition-all duration-300 group-hover:ring-primary/30 group-hover:shadow-[0_0_16px_-4px_hsl(var(--primary)/0.3)]">
                        <Icon className="size-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                      </span>
                      <span className="font-mono text-xs font-medium text-muted-foreground/50">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {service.badged ? (
                        <Badge
                          variant="primary"
                          className="border-primary/20 bg-primary/10 text-primary"
                        >
                          {t("popular")}
                        </Badge>
                      ) : null}
                      <span className="grid size-9 place-items-center rounded-full border border-border/70 bg-background/40 text-muted-foreground transition-all duration-300 group-hover:border-primary/30 group-hover:text-primary">
                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>

                  <div
                    className={`mt-auto pt-8 ${
                      isWide ? "lg:flex lg:items-end lg:gap-12" : ""
                    }`}
                  >
                    <div className="lg:flex-1">
                      <h3 className="font-display text-xl font-semibold tracking-tight text-balance sm:text-2xl">
                        {title}
                      </h3>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                        {description}
                      </p>
                    </div>
                    <ul className="mt-5 flex flex-wrap gap-1.5 lg:mt-0 lg:max-w-xs lg:justify-end">
                      {bullets.map((b) => (
                        <li
                          key={b}
                          className="rounded-full border border-border/80 bg-background/50 px-3 py-1 text-[11px] font-medium text-foreground/80 backdrop-blur-sm"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
