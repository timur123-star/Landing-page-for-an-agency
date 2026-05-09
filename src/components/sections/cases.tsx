"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedText } from "@/components/motion/animated-text";
import { cases, type CaseStudy } from "@/data/cases";
import { Link } from "@/i18n/navigation";

function MockBrowser({
  client,
  industry,
  gradient,
}: {
  client: string;
  industry: string;
  gradient: string;
}) {
  return (
    <div className="relative h-full w-full">
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-transform duration-700 group-hover:scale-105`}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_55%)] mix-blend-overlay"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-bg opacity-15 mix-blend-overlay"
      />

      <div className="absolute inset-x-6 top-6 sm:inset-x-8 sm:top-8">
        <div className="overflow-hidden rounded-xl border border-white/15 bg-black/30 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-2 border-b border-white/10 bg-black/30 px-3 py-2">
            <div className="flex gap-1">
              <span className="size-2 rounded-full bg-rose-300/80" />
              <span className="size-2 rounded-full bg-amber-300/80" />
              <span className="size-2 rounded-full bg-emerald-300/80" />
            </div>
            <span className="ml-2 truncate rounded bg-white/10 px-2 py-0.5 font-mono text-[9px] tracking-tight text-white/80">
              {client.toLowerCase().replace(/\s+/g, "")}.com
            </span>
          </div>
          <div className="grid grid-cols-12 gap-1.5 p-2.5">
            <div className="col-span-3 space-y-1">
              <div className="h-1.5 w-full rounded bg-white/30" />
              <div className="h-1.5 w-3/4 rounded bg-white/15" />
              <div className="h-1.5 w-2/3 rounded bg-white/15" />
              <div className="mt-2 h-6 w-full rounded bg-white/15" />
            </div>
            <div className="col-span-9 space-y-1.5">
              <div className="grid grid-cols-3 gap-1.5">
                <div className="h-7 rounded bg-white/15" />
                <div className="h-7 rounded bg-white/20" />
                <div className="h-7 rounded bg-white/15" />
              </div>
              <div className="h-12 rounded bg-white/10" />
              <div className="grid grid-cols-2 gap-1.5">
                <div className="h-5 rounded bg-white/15" />
                <div className="h-5 rounded bg-white/15" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-6 bottom-5 flex items-end justify-between sm:inset-x-8">
        <p className="font-display text-2xl font-semibold tracking-tight text-white drop-shadow-md sm:text-3xl">
          {client}
        </p>
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85">
          {industry}
        </span>
      </div>
    </div>
  );
}

type EnrichedCase = {
  c: CaseStudy;
  industry: string;
  title: string;
  result: string;
  metricLabels: string[];
};

function CaseCard({ c, industry, title, result, metricLabels }: EnrichedCase) {
  return (
    <Link
      href={`/work/${c.slug}` as never}
      className="group relative block h-full overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_28px_60px_-30px_hsl(var(--primary)/0.45)]"
    >
      <div className="relative h-72 overflow-hidden">
        <MockBrowser
          client={c.client}
          industry={`${industry} · ${c.year}`}
          gradient={c.gradient}
        />
        <div className="absolute left-5 top-5 flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full border border-white/25 bg-black/40 px-2.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur">
            <span className="size-1 rounded-full bg-emerald-300" />
            {c.year}
          </span>
          <span className="hidden rounded-full border border-white/20 bg-black/30 px-2.5 py-1 text-[10px] font-mono font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur sm:inline-flex">
            {c.duration}
          </span>
        </div>
        <div className="absolute right-5 top-5">
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-all duration-300 group-hover:bg-white/25">
            <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>

      <div className="p-6 sm:p-7">
        <h3 className="font-display text-xl font-semibold tracking-tight text-balance sm:text-2xl">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {result}
        </p>

        <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-border/70 pt-5">
          {metricLabels.map((label, idx) => (
            <div key={label}>
              <dt className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {label}
              </dt>
              <dd className="mt-1 font-display text-xl font-semibold tracking-tight text-foreground">
                {c.metricValues[idx]}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-6 flex flex-wrap gap-2">
          {c.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border/80 bg-background/40 px-3 py-1 text-xs text-foreground/80"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

function ScrollDot({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const scale = useTransform(
    progress,
    [index / total, (index + 0.5) / total, (index + 1) / total],
    [0.8, 1.5, 0.8],
  );
  const opacity = useTransform(
    progress,
    [index / total, (index + 0.5) / total, (index + 1) / total],
    [0.4, 1, 0.4],
  );
  return (
    <motion.span
      className="block size-1.5 rounded-full bg-primary"
      style={{ scale, opacity }}
    />
  );
}

function HorizontalCases({ data }: { data: EnrichedCase[] }) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const rowRef = React.useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  // Measure how far the row needs to translate so that the LAST card lines
  // up flush with the right edge of the viewport at progress=1. Using a real
  // pixel measurement keeps the math correct across mobile, tablet, ultrawide
  // and the `max-w-[680px]` per-card cap (which the previous %-based formula
  // ignored, sending the row hundreds of vw past the viewport).
  const [scrollDistance, setScrollDistance] = React.useState(0);
  React.useLayoutEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const update = () => {
      const overflow = el.scrollWidth - window.innerWidth;
      setScrollDistance(Math.max(0, overflow));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [data.length]);
  const move = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  if (reduced) {
    return (
      <div className="container-wide mt-14 grid gap-6 lg:grid-cols-2">
        {data.map((d, i) => (
          <Reveal key={d.c.slug} delay={i * 0.06}>
            <CaseCard {...d} />
          </Reveal>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative mt-14"
      style={{ height: `${data.length * 100}vh` }}
    >
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] items-center overflow-hidden">
        <motion.div
          ref={rowRef}
          style={{ x: move }}
          className="flex w-max gap-8 px-4 will-change-transform sm:px-8"
        >
          {data.map((d) => (
            <div
              key={d.c.slug}
              className="w-[88vw] max-w-[680px] flex-shrink-0 sm:w-[70vw]"
            >
              <CaseCard {...d} />
            </div>
          ))}
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
          <div className="flex items-center gap-3 rounded-full border border-border/70 bg-background/80 px-4 py-2 text-xs text-muted-foreground backdrop-blur">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
              {data.length} case studies
            </span>
            <span className="flex items-center gap-1.5" aria-hidden="true">
              {data.map((_, idx) => (
                <ScrollDot
                  key={idx}
                  index={idx}
                  total={data.length}
                  progress={scrollYProgress}
                />
              ))}
            </span>
            <span aria-hidden="true">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Cases() {
  const t = useTranslations("cases");
  const tWork = useTranslations("work");

  const enriched: EnrichedCase[] = cases.map((c) => ({
    c,
    industry: t(`items.${c.key}.industry`),
    title: t(`items.${c.key}.title`),
    result: t(`items.${c.key}.result`),
    metricLabels: t.raw(`items.${c.key}.metricLabels`) as string[],
  }));

  return (
    <section
      id="cases"
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
      </div>

      {/* Mobile + tablet: stacked grid */}
      <div className="container-wide lg:hidden">
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {enriched.map((d, i) => (
            <Reveal key={d.c.slug} delay={i * 0.06}>
              <CaseCard {...d} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Desktop: pinned horizontal scroll */}
      <div className="hidden lg:block">
        <HorizontalCases data={enriched} />
      </div>

      <div className="container-wide mt-12 flex justify-center lg:mt-16">
        <Link
          href="/work"
          className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-background/60 px-6 text-sm font-medium text-foreground/85 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-foreground"
        >
          {tWork("allCases")}
          <ArrowUpRight className="ml-1.5 size-4" />
        </Link>
      </div>
    </section>
  );
}
