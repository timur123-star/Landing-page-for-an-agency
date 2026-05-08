import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { hasLocale } from "next-intl";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { Link } from "@/i18n/navigation";
import { cases } from "@/data/cases";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "work" });
  const tSite = await getTranslations({ locale, namespace: "site" });
  const path = locale === routing.defaultLocale ? "/work" : `/${locale}/work`;
  return {
    title: t("allCases"),
    description: tSite("description"),
    alternates: {
      canonical: path,
      languages: Object.fromEntries(
        routing.locales.map((alt) => [
          alt,
          alt === routing.defaultLocale ? "/work" : `/${alt}/work`,
        ]),
      ),
    },
    openGraph: {
      title: `${t("allCases")} · ${siteConfig.name}`,
      description: tSite("description"),
      url: `${siteConfig.url}${path}`,
    },
  };
}

export default async function WorkIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  await getMessages();
  const t = await getTranslations({ locale, namespace: "work" });
  const tCta = await getTranslations({ locale, namespace: "cta" });

  return (
    <>
      <Header />
      <main className="overflow-x-clip pt-32 sm:pt-36">
        <section className="container-wide pb-20 pt-12 sm:pb-24 sm:pt-16">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Badge variant="primary" className="mx-auto">
              {t("badge")}
            </Badge>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
              <span className="gradient-text">{t("allCases")}</span>
            </h1>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {cases.map((c, i) => {
              const title = t(`items.${c.key}.title`);
              const summary = t(`items.${c.key}.summary`);
              const industry = t(`items.${c.key}.industry`);
              return (
                <Reveal key={c.slug} delay={i * 0.06}>
                  <Link
                    href={`/work/${c.slug}` as never}
                    className="group relative block h-full overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_28px_60px_-30px_hsl(var(--primary)/0.45)]"
                  >
                    <div
                      aria-hidden="true"
                      className={`relative h-44 bg-gradient-to-br ${c.gradient}`}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_55%)] mix-blend-overlay" />
                      <div className="absolute inset-x-6 bottom-5 flex items-end justify-between sm:inset-x-8">
                        <p className="font-display text-2xl font-semibold tracking-tight text-white drop-shadow-md sm:text-3xl">
                          {c.client}
                        </p>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85">
                          {industry} · {c.year}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 sm:p-7">
                      <div className="flex items-start justify-between gap-4">
                        <h2 className="font-display text-xl font-semibold tracking-tight text-balance sm:text-2xl">
                          {title}
                        </h2>
                        <span className="inline-flex size-9 items-center justify-center rounded-full bg-secondary text-foreground/80 transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                          <ArrowUpRight className="size-4" />
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {summary}
                      </p>
                      <ul className="mt-5 flex flex-wrap gap-2">
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
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-14 flex flex-col items-center gap-3 text-center">
            <Link
              href="/#contact"
              className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_8px_30px_-6px_hsl(var(--primary)/0.45)] transition-all hover:-translate-y-0.5"
            >
              {tCta("primary")}
              <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}

export const dynamic = "force-static";
