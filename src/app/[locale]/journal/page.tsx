import type { Metadata } from "next";
import { ArrowUpRight, Clock } from "lucide-react";
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
import { journalPosts } from "@/data/journal";
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
  const t = await getTranslations({ locale, namespace: "journal" });
  const tSite = await getTranslations({ locale, namespace: "site" });
  const path =
    locale === routing.defaultLocale ? "/journal" : `/${locale}/journal`;
  return {
    title: t("all"),
    description: t("subtitle"),
    alternates: {
      canonical: path,
      languages: Object.fromEntries(
        routing.locales.map((alt) => [
          alt,
          alt === routing.defaultLocale ? "/journal" : `/${alt}/journal`,
        ]),
      ),
    },
    openGraph: {
      title: `${t("all")} · ${siteConfig.name}`,
      description: tSite("description"),
      url: `${siteConfig.url}${path}`,
    },
  };
}

export default async function JournalIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  await getMessages();
  const t = await getTranslations({ locale, namespace: "journal" });

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
              <span className="gradient-text">{t("all")}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
              {t("subtitle")}
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {journalPosts.map((p, i) => {
              const title = t(`posts.${p.key}.title`);
              const excerpt = t(`posts.${p.key}.excerpt`);
              return (
                <Reveal key={p.slug} delay={i * 0.06}>
                  <Link
                    href={`/journal/${p.slug}` as never}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_28px_60px_-30px_hsl(var(--primary)/0.45)]"
                  >
                    <div
                      aria-hidden="true"
                      className={`relative h-44 bg-gradient-to-br ${p.accent}`}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_55%)] mix-blend-overlay" />
                      <div className="absolute inset-x-6 bottom-5 flex items-end justify-between sm:inset-x-7">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85">
                          {p.category}
                        </p>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85">
                          {p.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <h2 className="font-display text-xl font-semibold tracking-tight text-balance sm:text-2xl">
                        {title}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {excerpt}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-6 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="size-3" />
                          {t("readingTime", { minutes: p.readingMinutes })}
                        </span>
                        <span className="inline-flex size-9 items-center justify-center rounded-full bg-secondary text-foreground/80 transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                          <ArrowUpRight className="size-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export const dynamic = "force-static";
