"use client";

import * as React from "react";
import { Check, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedText } from "@/components/motion/animated-text";
import { Link } from "@/i18n/navigation";
import { pricingTiers } from "@/data/pricing";
import { cn } from "@/lib/utils";

export function Pricing() {
  const t = useTranslations("pricing");
  const includedAll = t.raw("includedAll") as string[];

  return (
    <section
      id="pricing"
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

        <Reveal delay={0.05}>
          <div className="mx-auto mt-10 flex max-w-3xl flex-col items-start gap-3 rounded-2xl border border-border/70 bg-card/40 p-4 backdrop-blur sm:flex-row sm:items-center sm:gap-5 sm:p-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
              <Sparkles className="size-3" />
              {t("includedTitle")}
            </span>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-foreground/80">
              {includedAll.map((item) => (
                <li key={item} className="inline-flex items-center gap-1.5">
                  <Check className="size-3 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier, i) => {
            const name = t(`tiers.${tier.key}.name`);
            const description = t(`tiers.${tier.key}.description`);
            const price = t(`tiers.${tier.key}.price`);
            const priceSuffix = t(`tiers.${tier.key}.priceSuffix`);
            const cta = t(`tiers.${tier.key}.cta`);
            const features = t.raw(`tiers.${tier.key}.features`) as string[];

            return (
              <Reveal key={tier.key} delay={i * 0.07}>
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
                  className={cn(
                    "card-spotlight relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card p-7 transition-all duration-300 sm:p-8",
                    tier.highlighted
                      ? "border-primary/40 ring-glow shimmer scale-[1.02] shadow-[0_30px_70px_-25px_hsl(var(--primary)/0.35)]"
                      : "border-border hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_28px_60px_-30px_hsl(var(--primary)/0.3)]",
                  )}
                >
                  {tier.highlighted ? (
                    <>
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-fuchsia-500/10"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-primary/15 blur-3xl"
                      />
                    </>
                  ) : null}
                  {tier.badged ? (
                    <Badge variant="primary" className="absolute right-6 top-6">
                      <Sparkles className="size-3.5" />
                      {t("popular")}
                    </Badge>
                  ) : null}

                  <div className="flex items-baseline gap-2">
                    <p className="font-display text-2xl font-semibold tracking-tight">
                      {name}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {description}
                  </p>

                  <div className="mt-6 flex items-baseline gap-2">
                    <p className="font-display text-3xl font-semibold tracking-tight sm:text-[36px]">
                      {price}
                    </p>
                    {priceSuffix ? (
                      <span className="text-sm text-muted-foreground">
                        {priceSuffix}
                      </span>
                    ) : null}
                  </div>

                  <ul className="mt-7 space-y-3">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                          <Check className="size-3" />
                        </span>
                        <span className="text-foreground/85">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    size="lg"
                    variant={tier.highlighted ? "default" : "outline"}
                    className="mt-8 w-full"
                  >
                    <Link href="/#contact">{cta}</Link>
                  </Button>
                </article>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          {t("footerPrefix")}{" "}
          <Link
            href="/#contact"
            className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
          >
            {t("footerLink")}
          </Link>
          {" "}{t("footerSuffix")}
        </p>
      </div>
    </section>
  );
}
