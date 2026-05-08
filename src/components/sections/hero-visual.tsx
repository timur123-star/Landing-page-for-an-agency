"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";

const kpis = [
  { label: "MRR", value: "$48.2K", trend: "+12.4%" },
  { label: "Users", value: "12 412", trend: "+8.1%" },
  { label: "Churn", value: "2.1%", trend: "−0.4%" },
];

const sidebarItems = [
  { label: "Overview", active: true },
  { label: "Funnels" },
  { label: "Cohorts" },
  { label: "Revenue" },
  { label: "Settings" },
];

const activity = [
  { who: "Maya O.", action: "approved release v2.4", tone: "primary" as const },
  { who: "Lin C.", action: "shipped onboarding flow", tone: "emerald" as const },
  { who: "Anton K.", action: "added 3 brand tokens", tone: "fuchsia" as const },
];

export function HeroVisual() {
  const reduced = useReducedMotion();
  const t = useTranslations("hero");
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const floatY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -40]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -25]);
  const transition = reduced
    ? { duration: 0 }
    : { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const };

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-1, 1], [reduced ? 0 : -6, reduced ? 0 : 6]), {
    stiffness: 120,
    damping: 18,
    mass: 0.4,
  });
  const rotateX = useSpring(useTransform(pointerY, [-1, 1], [reduced ? 0 : 4, reduced ? 0 : -4]), {
    stiffness: 120,
    damping: 18,
    mass: 0.4,
  });

  const handlePointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (reduced) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      pointerX.set(Math.max(-1, Math.min(1, x)));
      pointerY.set(Math.max(-1, Math.min(1, y)));
    },
    [pointerX, pointerY, reduced],
  );

  const handlePointerLeave = React.useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative mx-auto aspect-[5/6] w-full max-w-[560px]"
      style={{ perspective: 1200 }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute inset-0 dot-bg mask-radial-faded opacity-50 dark:opacity-30" />
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-blob absolute -left-10 -top-6 size-72 rounded-full bg-[#5159ff] motion-safe:animate-drift-a" />
        <div className="aurora-blob absolute right-[-10%] top-[18%] size-80 rounded-full bg-[#a855f7] motion-safe:animate-drift-b" />
        <div className="aurora-blob absolute bottom-[-6%] left-[20%] size-72 rounded-full bg-[#22d3ee] motion-safe:animate-drift-c" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ ...transition, delay: 0.2 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative will-change-transform"
      >
        <div className="relative overflow-hidden rounded-[20px] border border-border/70 bg-card/90 shadow-[0_30px_80px_-30px_hsl(var(--primary)/0.45)] backdrop-blur-xl pulse-glow motion-reduce:animate-none">
          <div className="flex items-center gap-2 border-b border-border/60 bg-muted/40 px-4 py-3">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-rose-400/80" />
              <span className="size-2.5 rounded-full bg-amber-400/80" />
              <span className="size-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <div className="ml-2 flex flex-1 items-center gap-2 truncate rounded-md bg-background/60 px-3 py-1.5 font-mono text-[11px] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              {t("visualUrl")}
            </div>
            <span className="hidden rounded-md bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary sm:inline">
              {t("visualVersion")}
            </span>
          </div>

          <div className="grid grid-cols-12 gap-4 p-4 sm:p-5">
            <aside className="col-span-3 space-y-2 border-r border-border/60 pr-3">
              <div className="mb-3 flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-md bg-gradient-to-br from-[#5159ff] to-[#a855f7] text-white">
                  <Sparkles className="size-3.5" />
                </span>
                <p className="font-display text-xs font-semibold tracking-tight">
                  Lumen
                </p>
              </div>
              {sidebarItems.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[10px] font-medium transition-colors ${
                    item.active
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full ${
                      item.active ? "bg-primary" : "bg-muted-foreground/40"
                    }`}
                  />
                  {item.label}
                </div>
              ))}
            </aside>

            <div className="col-span-9 space-y-3">
              <div className="grid grid-cols-3 gap-2">
                {kpis.map((kpi, i) => (
                  <motion.div
                    key={kpi.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 + i * 0.08, duration: 0.5 }}
                    className="rounded-lg border border-border/50 bg-background/60 p-2.5"
                  >
                    <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                      {kpi.label}
                    </p>
                    <p className="mt-0.5 font-display text-sm font-semibold tabular-nums">
                      {kpi.value}
                    </p>
                    <p
                      className={`mt-0.5 text-[10px] font-semibold tabular-nums ${
                        kpi.trend.startsWith("−")
                          ? "text-emerald-500"
                          : "text-emerald-500"
                      }`}
                    >
                      {kpi.trend}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="relative overflow-hidden rounded-lg border border-border/50 bg-background/40 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {t("visualRevenue")}
                  </p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-semibold text-emerald-500">
                    <span className="size-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
                    {t("visualLive")}
                  </span>
                </div>
                <svg viewBox="0 0 220 80" className="h-24 w-full" fill="none">
                  <defs>
                    <linearGradient
                      id="hero-chart-fill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#5159ff" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#5159ff" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient
                      id="hero-chart-stroke"
                      x1="0"
                      x2="1"
                      y1="0"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#5159ff" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                  <g stroke="hsl(var(--border))" strokeWidth="0.4" opacity="0.6">
                    {[20, 40, 60].map((y) => (
                      <line key={y} x1="0" x2="220" y1={y} y2={y} />
                    ))}
                  </g>
                  <motion.path
                    initial={{ pathLength: reduced ? 1 : 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.4, delay: 0.8, ease: "easeOut" }}
                    d="M0 62 L22 56 L44 50 L66 38 L88 44 L110 28 L132 34 L154 22 L176 28 L198 14 L220 18"
                    stroke="url(#hero-chart-stroke)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <motion.path
                    initial={{ opacity: reduced ? 1 : 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.4, delay: 1.6 }}
                    d="M0 62 L22 56 L44 50 L66 38 L88 44 L110 28 L132 34 L154 22 L176 28 L198 14 L220 18 L220 80 L0 80 Z"
                    fill="url(#hero-chart-fill)"
                  />
                  <motion.circle
                    initial={{ opacity: reduced ? 1 : 0, scale: reduced ? 1 : 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 2.4 }}
                    cx="220"
                    cy="18"
                    r="3"
                    fill="#a855f7"
                  />
                </svg>
              </div>

              <div className="space-y-1.5">
                {activity.map((item, i) => (
                  <motion.div
                    key={item.who}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + i * 0.12, duration: 0.5 }}
                    className="flex items-center gap-2 rounded-md border border-border/40 bg-background/40 px-2.5 py-1.5"
                  >
                    <span
                      className={`size-5 rounded-full bg-gradient-to-br ${
                        item.tone === "primary"
                          ? "from-indigo-400 to-violet-500"
                          : item.tone === "emerald"
                            ? "from-emerald-400 to-teal-500"
                            : "from-fuchsia-400 to-rose-400"
                      }`}
                    />
                    <p className="flex-1 text-[10px]">
                      <span className="font-semibold text-foreground">
                        {item.who}
                      </span>{" "}
                      <span className="text-muted-foreground">
                        {item.action}
                      </span>
                    </p>
                    <ArrowUpRight className="size-3 text-muted-foreground" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -16, y: -8 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          style={{ y: floatY }}
          className="absolute -left-3 top-16 hidden rounded-2xl border border-border bg-card/95 p-3 shadow-xl backdrop-blur-xl motion-safe:animate-float sm:block"
        >
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-emerald-500/15 text-emerald-500">
              <TrendingUp className="size-4" />
            </span>
            <div>
              <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                {t("visualConversion")}
              </p>
              <p className="font-display text-base font-semibold tabular-nums text-emerald-500">
                +218%
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16, y: 8 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          style={{ y: floatY2 }}
          className="absolute -right-3 bottom-20 hidden rounded-2xl border border-border bg-card/95 p-3 shadow-xl backdrop-blur-xl motion-safe:animate-float sm:block"
        >
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-primary/15 text-primary">
              <Activity className="size-4" />
            </span>
            <div>
              <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                {t("visualLighthouse")}
              </p>
              <p className="font-display text-base font-semibold tabular-nums">
                98 / 100
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="absolute -bottom-4 left-8 hidden items-center gap-2 rounded-full border border-border bg-card/95 px-3 py-1.5 shadow-xl backdrop-blur-xl sm:inline-flex"
        >
          <Users className="size-3.5 text-primary" />
          <span className="text-[11px] font-medium">
            {t("visualOnline")}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
