"use client";

import { Quote, Star } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedText } from "@/components/motion/animated-text";
import { Marquee } from "@/components/motion/marquee";
import { testimonials, type Testimonial } from "@/data/testimonials";

type LocalizedTestimonial = Testimonial & { quote: string; role: string };

function TestimonialCard({ t }: { t: LocalizedTestimonial }) {
  return (
    <figure className="group relative flex w-[340px] shrink-0 flex-col gap-5 overflow-hidden rounded-2xl border border-border/80 bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card hover:shadow-[0_20px_50px_-20px_hsl(var(--primary)/0.25)] sm:w-[400px] sm:p-7">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-3 -top-6 select-none font-display text-[140px] leading-none text-primary/[0.06] transition-colors duration-300 group-hover:text-primary/[0.12]"
      >
        &ldquo;
      </span>
      <div className="flex items-center justify-between">
        <Quote className="size-5 text-primary/70 transition-colors duration-300 group-hover:text-primary" />
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="size-3.5 fill-amber-400 stroke-amber-400"
            />
          ))}
        </div>
      </div>
      <blockquote className="relative text-pretty text-sm leading-relaxed text-foreground/90 sm:text-[15px]">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3 border-t border-border/60 pt-4">
        <span
          aria-hidden="true"
          className={`inline-flex size-10 items-center justify-center rounded-full bg-gradient-to-br ${t.accent} text-sm font-semibold text-white ring-2 ring-background shadow-[0_0_12px_-2px] shadow-primary/30 transition-shadow duration-300 group-hover:shadow-primary/50`}
        >
          {t.initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {t.author}
          </p>
          <p className="truncate text-xs text-muted-foreground">{t.role}</p>
          <p className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-foreground/70">
            <span className="size-1 rounded-full bg-primary/70" />
            {t.company}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const t = useTranslations("testimonials");
  const localized: LocalizedTestimonial[] = testimonials.map((item) => ({
    ...item,
    quote: t(`items.${item.key}.quote`),
    role: t(`items.${item.key}.role`),
  }));

  const half = Math.ceil(localized.length / 2);
  const row1 = localized.slice(0, half);
  const row2 = localized.slice(half);

  return (
    <section
      id="testimonials"
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

      <div className="mt-14 space-y-6">
        <div className="mask-fade-edges">
          <Marquee duration={55} pauseOnHover>
            {row1.map((item) => (
              <TestimonialCard key={item.key} t={item} />
            ))}
          </Marquee>
        </div>
        <div className="mask-fade-edges">
          <Marquee duration={65} pauseOnHover reverse>
            {row2.map((item) => (
              <TestimonialCard key={item.key} t={item} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
