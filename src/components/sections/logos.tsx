"use client";

import { useTranslations } from "next-intl";

import { Marquee } from "@/components/motion/marquee";
import { logos } from "@/data/logos";

export function Logos() {
  const t = useTranslations("logos");
  const trust = t.raw("trust") as { value: string; label: string }[];
  return (
    <section className="relative border-y border-border/70 bg-secondary/30 py-10 sm:py-14">
      <div className="container-wide">
        <div className="mb-8 flex flex-col items-center gap-3">
          <p className="text-center text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {t("label")}
          </p>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-3 py-1 text-[11px] font-medium text-emerald-300">
            <span
              aria-hidden="true"
              className="relative inline-flex size-2 items-center justify-center"
            >
              <span className="absolute inline-flex size-2 animate-ping rounded-full bg-emerald-400/70 motion-reduce:hidden" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
            </span>
            {t("availability")}
          </span>
        </div>
        <div className="space-y-6">
          <div className="mask-fade-edges">
            <Marquee duration={45} pauseOnHover>
              {logos.slice(0, 5).map((logo) => (
                <span
                  key={logo.name}
                  className="group inline-flex items-center gap-2.5 text-foreground/50 grayscale transition-all duration-300 hover:text-foreground hover:grayscale-0"
                  style={{ minWidth: logo.width }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-6 shrink-0 opacity-60 transition-opacity duration-300 group-hover:opacity-100 sm:size-7"
                  >
                    <path d={logo.icon} />
                  </svg>
                  <span className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                    {logo.name}
                  </span>
                </span>
              ))}
            </Marquee>
          </div>
          <div className="mask-fade-edges">
            <Marquee duration={50} pauseOnHover reverse>
              {logos.slice(5).map((logo) => (
                <span
                  key={logo.name}
                  className="group inline-flex items-center gap-2.5 text-foreground/50 grayscale transition-all duration-300 hover:text-foreground hover:grayscale-0"
                  style={{ minWidth: logo.width }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-6 shrink-0 opacity-60 transition-opacity duration-300 group-hover:opacity-100 sm:size-7"
                  >
                    <path d={logo.icon} />
                  </svg>
                  <span className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                    {logo.name}
                  </span>
                </span>
              ))}
            </Marquee>
          </div>
        </div>

        {trust && trust.length > 0 ? (
          <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center">
            {trust.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <span className="font-display text-base font-semibold text-foreground sm:text-lg">
                  {item.value}
                </span>
                <span className="opacity-80">{item.label}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
