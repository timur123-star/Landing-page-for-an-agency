"use client";

import { motion } from "framer-motion";
import { ArrowRight, MousePointer2, Play, Star } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedText } from "@/components/motion/animated-text";
import { Magnetic } from "@/components/motion/magnetic";
import { RotatingWords } from "@/components/motion/rotating-words";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeroVisual } from "@/components/sections/hero-visual";

const particles = [
  { x: "12%", y: "18%", size: "size-1", delay: "0s" },
  { x: "78%", y: "22%", size: "size-1.5", delay: "1s" },
  { x: "35%", y: "72%", size: "size-1", delay: "2s" },
  { x: "88%", y: "55%", size: "size-1", delay: "3s" },
  { x: "55%", y: "85%", size: "size-1.5", delay: "1.5s" },
  { x: "22%", y: "45%", size: "size-1", delay: "4s" },
];

const proofAvatars = [
  { initials: "AK", gradient: "from-indigo-500 to-fuchsia-500" },
  { initials: "MO", gradient: "from-emerald-400 to-cyan-500" },
  { initials: "ДС", gradient: "from-rose-400 to-amber-300" },
  { initials: "ИП", gradient: "from-sky-500 to-indigo-500" },
];

export function Hero() {
  const t = useTranslations("hero");
  const tCta = useTranslations("cta");

  const title = t("title");
  const highlight = t("highlight");
  const highlightWords = highlight ? highlight.split(/\s+/).filter(Boolean) : [];

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-40 noise-overlay"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 grid-bg mask-radial-faded opacity-50 dark:opacity-30" />
        <div className="absolute inset-x-0 -top-32 mx-auto h-[640px] max-w-5xl bg-[radial-gradient(ellipse_at_center,#5159ff33,transparent_60%)] dark:bg-[radial-gradient(ellipse_at_center,#5159ff44,transparent_60%)]" />
        <div className="absolute -bottom-24 left-1/2 h-[400px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,#a855f733,transparent_60%)] dark:bg-[radial-gradient(ellipse_at_center,#a855f744,transparent_60%)]" />
        <div className="absolute left-[15%] top-[10%] h-[500px] w-[500px] bg-[radial-gradient(circle,#22d3ee22,transparent_55%)] dark:bg-[radial-gradient(circle,#22d3ee33,transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background" />
        {particles.map((p, i) => (
          <span
            key={i}
            className={`floating-particle absolute rounded-full bg-primary/50 motion-reduce:hidden ${p.size}`}
            style={{ left: p.x, top: p.y, animationDelay: p.delay }}
          />
        ))}
      </div>

      <div className="container-wide">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 flex flex-wrap items-center gap-3"
            >
              <Badge variant="primary" className="px-3 py-1.5">
                <span
                  aria-hidden="true"
                  className="relative inline-flex size-2 items-center justify-center"
                >
                  <span className="absolute inline-flex size-2 animate-ping rounded-full bg-emerald-400/70 motion-reduce:hidden" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                </span>
                {t("badge")}
              </Badge>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <span className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-3.5 fill-amber-400 stroke-amber-400"
                    />
                  ))}
                </span>
                <span className="ml-1">{t("rating")}</span>
              </span>
            </motion.div>

            <AnimatedText
              as="h1"
              text={title}
              highlight={highlightWords}
              className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[68px]"
            />

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {t("subtitlePrefix")}{" "}
              <RotatingWords
                words={t.raw("rotatingWords") as string[]}
                className="font-medium text-foreground"
              />
              {" "}{t("subtitleSuffix")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Magnetic strength={0.18}>
                <Button asChild size="xl">
                  <a href="#contact">
                    {tCta("primary")}
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              </Magnetic>
              <Magnetic strength={0.16}>
                <Button asChild size="xl" variant="ghost">
                  <a href="#cases">
                    <Play className="size-4" />
                    {tCta("secondary")}
                  </a>
                </Button>
              </Magnetic>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {proofAvatars.map((p) => (
                  <span
                    key={p.initials}
                    className={`inline-flex size-9 items-center justify-center rounded-full bg-gradient-to-br ${p.gradient} text-xs font-semibold text-white ring-2 ring-background`}
                  >
                    {p.initials}
                  </span>
                ))}
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-foreground ring-2 ring-background">
                  +40
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {t("socialPrefix")}{" "}
                <span className="font-medium text-foreground">
                  {t("socialBold")}
                </span>{" "}
                {t("socialSuffix")}
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <HeroVisual />
          </div>
        </div>

        <motion.a
          href="#why"
          aria-label={t("scrollHint")}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="group mt-16 hidden items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground sm:flex"
        >
          <MousePointer2 className="size-3.5 -rotate-12 text-primary/70 transition-colors duration-300 group-hover:text-primary" />
          <span>{t("scrollHint")}</span>
          <span
            aria-hidden="true"
            className="relative inline-flex h-6 w-[1px] overflow-hidden bg-border"
          >
            <span className="absolute inset-x-0 top-0 h-2 animate-[hero-scroll-dot_1.8s_ease-in-out_infinite] bg-gradient-to-b from-primary to-transparent motion-reduce:hidden" />
          </span>
        </motion.a>
      </div>
    </section>
  );
}
