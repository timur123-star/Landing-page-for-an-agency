"use client";

import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden px-6 py-24 noise-overlay">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 grid-bg mask-radial-faded opacity-50 dark:opacity-30" />
        <div className="aurora-blob absolute left-1/2 top-1/3 size-[460px] -translate-x-1/2 rounded-full bg-[#5159ff] motion-safe:animate-drift-a" />
        <div className="aurora-blob absolute left-[20%] bottom-0 size-72 rounded-full bg-[#a855f7] motion-safe:animate-drift-b" />
        <div className="aurora-blob absolute right-[10%] top-[10%] size-72 rounded-full bg-[#22d3ee] motion-safe:animate-drift-c" />
      </div>

      <div className="relative mx-auto max-w-xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-xs uppercase tracking-[0.32em] text-primary"
        >
          {t("kicker")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-display text-6xl font-semibold tracking-tight sm:text-7xl"
        >
          <span className="gradient-text-brand">404</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {t("title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 text-pretty text-base text-muted-foreground"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button asChild size="lg">
            <Link href="/">
              {t("back")}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <Link href="/#cases">
              <Compass className="size-4" />
              {t("discoverCases")}
            </Link>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
