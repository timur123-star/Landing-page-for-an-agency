"use client";

import * as React from "react";
import { Activity, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

type Scores = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
};

const FALLBACK: Scores = {
  performance: 98,
  accessibility: 100,
  bestPractices: 100,
  seo: 100,
};

export function LighthouseBadge({ className }: { className?: string }) {
  const t = useTranslations("lighthouse");
  const [scores, setScores] = React.useState<Scores | null>(null);
  const [state, setState] = React.useState<"idle" | "loading" | "error">(
    "loading",
  );

  React.useEffect(() => {
    let cancelled = false;
    const cacheKey = "nova-lh-scores";
    const cacheTime = "nova-lh-scores-ts";
    try {
      const ts = Number(localStorage.getItem(cacheTime) ?? "0");
      const cached = localStorage.getItem(cacheKey);
      if (cached && ts && Date.now() - ts < 6 * 60 * 60 * 1000) {
        setScores(JSON.parse(cached));
        setState("idle");
      }
    } catch {
      /* noop */
    }

    const controller = new AbortController();
    fetch("/api/lighthouse", { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((data: Scores) => {
        if (cancelled) return;
        setScores(data);
        setState("idle");
        try {
          localStorage.setItem(cacheKey, JSON.stringify(data));
          localStorage.setItem(cacheTime, String(Date.now()));
        } catch {
          /* noop */
        }
      })
      .catch(() => {
        if (cancelled) return;
        setScores((prev) => prev ?? FALLBACK);
        setState("error");
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  const display = scores ?? FALLBACK;

  return (
    <div
      title={t("tooltip")}
      className={cn(
        "inline-flex flex-wrap items-center gap-3 rounded-2xl border border-border/70 bg-background/60 px-4 py-2.5 text-xs backdrop-blur",
        className,
      )}
    >
      <span className="flex items-center gap-1.5 text-foreground/85">
        <Activity className="size-3.5 text-primary" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {t("label")}
        </span>
      </span>

      <Score label={t("perf")} value={display.performance} />
      <Score label={t("a11y")} value={display.accessibility} />
      <Score label={t("bp")} value={display.bestPractices} />
      <Score label={t("seo")} value={display.seo} />

      <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
        <Sparkles
          className={cn(
            "size-3 text-primary",
            state === "loading" && "animate-pulse",
          )}
        />
        {state === "loading"
          ? t("loading")
          : state === "error"
            ? t("error")
            : null}
      </span>
    </div>
  );
}

function Score({ label, value }: { label: string; value: number }) {
  const tone =
    value >= 90
      ? "text-emerald-400"
      : value >= 70
        ? "text-amber-400"
        : "text-rose-400";
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <span className={cn("font-mono text-sm font-semibold tabular-nums", tone)}>
        {Math.round(value)}
      </span>
    </span>
  );
}
