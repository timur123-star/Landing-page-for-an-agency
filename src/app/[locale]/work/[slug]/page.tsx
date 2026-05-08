import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Compass, Layers, Link as LinkIcon, Users } from "lucide-react";
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
import { ReadingProgress } from "@/components/motion/reading-progress";
import { Link } from "@/i18n/navigation";
import { cases, getCaseBySlug } from "@/data/cases";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

type Params = { locale: string; slug: string };

type GalleryItem = { label: string; tone: string };

const TONES: Record<string, string> = {
  primary: "from-indigo-500 via-violet-500 to-fuchsia-500",
  fuchsia: "from-fuchsia-500 via-pink-500 to-rose-500",
  cyan: "from-cyan-500 via-sky-500 to-blue-500",
  amber: "from-amber-400 via-orange-400 to-rose-400",
  emerald: "from-emerald-400 via-teal-500 to-cyan-500",
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    cases.map((c) => ({ locale, slug: c.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const item = getCaseBySlug(slug);
  if (!item) return {};
  const t = await getTranslations({ locale, namespace: "work" });
  const title = t(`items.${item.key}.title`);
  const summary = t(`items.${item.key}.summary`);
  const path =
    locale === routing.defaultLocale
      ? `/work/${slug}`
      : `/${locale}/work/${slug}`;
  return {
    title,
    description: summary,
    alternates: {
      canonical: path,
      languages: Object.fromEntries(
        routing.locales.map((alt) => [
          alt,
          alt === routing.defaultLocale
            ? `/work/${slug}`
            : `/${alt}/work/${slug}`,
        ]),
      ),
    },
    openGraph: {
      title: `${title} · ${siteConfig.name}`,
      description: summary,
      url: `${siteConfig.url}${path}`,
    },
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const item = getCaseBySlug(slug);
  if (!item) notFound();
  setRequestLocale(locale);
  await getMessages();

  const t = await getTranslations({ locale, namespace: "work" });
  const tCta = await getTranslations({ locale, namespace: "cta" });
  const tServices = await getTranslations({ locale, namespace: "services" });

  const idx = cases.findIndex((c) => c.slug === item.slug);
  const next = cases[(idx + 1) % cases.length];
  const nextTitle = t(`items.${next.key}.title`);

  const industry = t(`items.${item.key}.industry`);
  const title = t(`items.${item.key}.title`);
  const summary = t(`items.${item.key}.summary`);
  const context = t(`items.${item.key}.context`);
  const challenge = t(`items.${item.key}.challenge`);
  const approach = t(`items.${item.key}.approach`);
  const results = t(`items.${item.key}.results`);
  const retrospective = t(`items.${item.key}.retrospective`);
  const deliverables = t.raw(`items.${item.key}.deliverables`) as string[];
  const gallery = t.raw(`items.${item.key}.gallery`) as GalleryItem[];

  return (
    <>
      <ReadingProgress />
      <Header />
      <main className="overflow-x-clip pt-32 sm:pt-36">
        <section className="container-wide pb-12 pt-8 sm:pt-12">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            {t("backToWork")}
          </Link>
        </section>

        <section className="container-wide pb-12">
          <Reveal>
            <Badge variant="primary">{t("badge")}</Badge>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
              <span className="gradient-text">{title}</span>
            </h1>
            <p className="mt-5 max-w-3xl text-pretty text-base text-muted-foreground sm:text-lg">
              {summary}
            </p>
          </Reveal>

          <Reveal
            delay={0.08}
            className={`relative mt-12 overflow-hidden rounded-3xl border border-border bg-gradient-to-br ${item.gradient}`}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_55%)] mix-blend-overlay"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 grid-bg opacity-15 mix-blend-overlay"
            />
            <div className="relative grid gap-6 p-8 sm:p-12">
              <p className="font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                {item.client}
              </p>
              <div className="grid gap-3 text-white/90 sm:grid-cols-3">
                <Stat label={t("meta.industry")} value={industry} />
                <Stat label={t("meta.year")} value={item.year} />
                <Stat label={t("meta.duration")} value={item.duration} />
              </div>
              <div className="grid gap-3 text-white/90 sm:grid-cols-3">
                {item.metricValues.map((v, i) => (
                  <div
                    key={`${v}-${i}`}
                    className="rounded-2xl border border-white/15 bg-black/15 p-4 backdrop-blur"
                  >
                    <p className="font-display text-2xl font-semibold tracking-tight">
                      {v}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <section className="container-wide pb-16 sm:pb-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="space-y-10 lg:col-span-8">
              <Block id="context" heading={t("sections.context")} body={context} />
              <Block id="challenge" heading={t("sections.challenge")} body={challenge} />
              <Block id="approach" heading={t("sections.approach")} body={approach} />
              <Block id="results" heading={t("sections.results")} body={results} />
              <Block
                id="retrospective"
                heading={t("sections.retrospective")}
                body={retrospective}
              />
            </Reveal>

            <aside className="space-y-6 lg:col-span-4">
              <Reveal delay={0.05}>
                <div className="rounded-3xl border border-border bg-card p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {t("sections.deliverables")}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-2 text-sm text-foreground/85"
                      >
                        <span className="mt-1 inline-block size-1.5 rounded-full bg-primary" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-3xl border border-border bg-card p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {t("meta.team")}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-foreground/85">
                    {item.team.map((role) => (
                      <li key={role} className="flex items-center gap-2">
                        <Users className="size-3.5 text-muted-foreground" />
                        {role}
                      </li>
                    ))}
                  </ul>
                  <hr className="my-5 border-border/70" />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {t("meta.services")}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-foreground/85">
                    {item.services.map((s) => (
                      <li key={s} className="flex items-center gap-2">
                        <Layers className="size-3.5 text-muted-foreground" />
                        {tServices(`items.${s}.title`)}
                      </li>
                    ))}
                  </ul>
                  <hr className="my-5 border-border/70" />
                  <ul className="space-y-2 text-sm text-foreground/85">
                    <li className="flex items-center gap-2">
                      <Calendar className="size-3.5 text-muted-foreground" />
                      {t("meta.year")}: {item.year}
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="size-3.5 text-muted-foreground" />
                      {t("meta.duration")}: {item.duration}
                    </li>
                    <li className="flex items-center gap-2">
                      <Compass className="size-3.5 text-muted-foreground" />
                      {t("meta.industry")}: {industry}
                    </li>
                    <li className="flex items-center gap-2">
                      <LinkIcon className="size-3.5 text-muted-foreground" />
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate text-primary hover:underline"
                      >
                        {item.link.replace(/^https?:\/\//, "")}
                      </a>
                    </li>
                  </ul>
                </div>
              </Reveal>
            </aside>
          </div>
        </section>

        <section className="container-wide pb-20 sm:pb-28">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {t("sections.gallery")}
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((g, i) => {
              const tone = TONES[g.tone] ?? TONES.primary;
              return (
                <Reveal key={`${g.label}-${i}`} delay={i * 0.05}>
                  <div
                    className={`relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-gradient-to-br ${tone}`}
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_55%)] mix-blend-overlay"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 grid-bg opacity-20 mix-blend-overlay"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-1.5 font-display text-lg font-semibold text-white">
                        {g.label}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="container-wide pb-24 sm:pb-32">
          <Reveal className="overflow-hidden rounded-3xl border border-border bg-card">
            <Link
              href={`/work/${next.slug}` as never}
              className="group grid items-stretch gap-0 lg:grid-cols-[1fr_auto]"
            >
              <div className="p-7 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {t("sections.nextCase")}
                </p>
                <p className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  {nextTitle}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {next.client}
                </p>
              </div>
              <div
                className={`relative flex items-center justify-center bg-gradient-to-br ${next.gradient} p-7 lg:w-72`}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_55%)] mix-blend-overlay"
                />
                <span className="relative inline-flex size-14 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-all group-hover:scale-110 group-hover:bg-white/25">
                  <ArrowUpRight className="size-6" />
                </span>
              </div>
            </Link>
          </Reveal>
        </section>

        <section className="container-wide pb-24 sm:pb-32">
          <div className="rounded-3xl border border-border bg-card p-8 text-center sm:p-12">
            <p className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {tCta("primary")}
            </p>
            <Link
              href="/#contact"
              className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_8px_30px_-6px_hsl(var(--primary)/0.45)] transition-all hover:-translate-y-0.5"
            >
              {tCta("primary")}
              <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Block({
  id,
  heading,
  body,
}: {
  id?: string;
  heading: string;
  body: string;
}) {
  return (
    <div>
      <h2
        id={id}
        className="scroll-mt-32 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
      >
        {heading}
      </h2>
      <p className="mt-4 text-pretty text-base leading-relaxed text-foreground/85 sm:text-lg">
        {body}
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-black/15 p-4 backdrop-blur">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
        {label}
      </p>
      <p className="mt-1 font-display text-base font-semibold tracking-tight">
        {value}
      </p>
    </div>
  );
}

export const dynamic = "force-static";
