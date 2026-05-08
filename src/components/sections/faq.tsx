"use client";

import * as React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedText } from "@/components/motion/animated-text";

type FaqItem = { q: string; a: string };

export function FAQ() {
  const t = useTranslations("faq");
  const faqs = t.raw("items") as FaqItem[];

  return (
    <section id="faq" className="relative scroll-mt-24 py-20 sm:py-28 lg:py-32">
      <div className="container-tight">
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

        <Reveal delay={0.05} className="mt-12">
          <Accordion.Root
            type="single"
            collapsible
            defaultValue="item-0"
            className="overflow-hidden rounded-3xl border border-border bg-card/60 backdrop-blur-sm"
          >
            {faqs.map((faq, i) => (
              <Accordion.Item
                key={faq.q}
                value={`item-${i}`}
                className="group/item border-b border-border/60 last:border-b-0 transition-colors duration-200 data-[state=open]:bg-accent/30"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-medium transition-colors hover:bg-accent/50 sm:px-8 sm:text-lg">
                    <span className="flex items-center gap-4">
                      <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-border/60 bg-background/60 font-mono text-[11px] font-semibold tabular-nums text-muted-foreground transition-colors duration-300 group-data-[state=open]:border-primary/40 group-data-[state=open]:bg-primary/10 group-data-[state=open]:text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-balance">{faq.q}</span>
                    </span>
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border/60 bg-background/40 text-muted-foreground transition-all duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:border-primary/40 group-data-[state=open]:bg-primary/10 group-data-[state=open]:text-primary">
                      <ChevronDown className="size-4" />
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden text-sm text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down sm:text-[15px]">
                  <p className="px-6 pb-5 pt-0 pl-[4rem] leading-relaxed sm:px-8 sm:pb-6 sm:pl-[4.5rem]">
                    {faq.a}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Reveal>
      </div>
    </section>
  );
}
