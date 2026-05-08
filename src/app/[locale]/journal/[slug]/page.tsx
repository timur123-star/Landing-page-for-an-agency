import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Tag } from "lucide-react";
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
import { JournalTOC } from "@/components/journal-toc";
import { Link } from "@/i18n/navigation";
import { journalPosts, getJournalPostBySlug } from "@/data/journal";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import { slugify } from "@/lib/utils";

type Params = { locale: string; slug: string };

type Block = { type: "h2" | "p"; text: string };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    journalPosts.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const post = getJournalPostBySlug(slug);
  if (!post) return {};
  const t = await getTranslations({ locale, namespace: "journal" });
  const title = t(`posts.${post.key}.title`);
  const excerpt = t(`posts.${post.key}.excerpt`);
  const path =
    locale === routing.defaultLocale
      ? `/journal/${slug}`
      : `/${locale}/journal/${slug}`;
  return {
    title,
    description: excerpt,
    alternates: {
      canonical: path,
      languages: Object.fromEntries(
        routing.locales.map((alt) => [
          alt,
          alt === routing.defaultLocale
            ? `/journal/${slug}`
            : `/${alt}/journal/${slug}`,
        ]),
      ),
    },
    openGraph: {
      title: `${title} · ${siteConfig.name}`,
      description: excerpt,
      url: `${siteConfig.url}${path}`,
      type: "article",
    },
  };
}

export default async function JournalArticle({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const post = getJournalPostBySlug(slug);
  if (!post) notFound();
  setRequestLocale(locale);
  await getMessages();

  const t = await getTranslations({ locale, namespace: "journal" });
  const tCta = await getTranslations({ locale, namespace: "cta" });

  const idx = journalPosts.findIndex((p) => p.slug === post.slug);
  const next = journalPosts[(idx + 1) % journalPosts.length];

  const title = t(`posts.${post.key}.title`);
  const excerpt = t(`posts.${post.key}.excerpt`);
  const intro = t(`posts.${post.key}.intro`);
  const rawBlocks = t.raw(`posts.${post.key}.blocks`) as Block[];
  const seen = new Map<string, number>();
  const blocks = rawBlocks.map((b) => {
    if (b.type !== "h2") return { ...b, id: undefined as string | undefined };
    const base = slugify(b.text) || "section";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count}`;
    return { ...b, id };
  });
  const headings = blocks
    .filter((b): b is Block & { id: string } => b.type === "h2" && !!b.id)
    .map((b) => ({ id: b.id, text: b.text }));
  const nextTitle = t(`posts.${next.key}.title`);

  return (
    <>
      <ReadingProgress />
      <Header />
      <main className="overflow-x-clip pt-32 sm:pt-36">
        <section className="container-wide pb-12 pt-8 sm:pt-12">
          <Link
            href="/journal"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            {t("backToJournal")}
          </Link>
        </section>

        <article className="container-wide pb-20 sm:pb-24">
          <Reveal>
            <Badge variant="primary">{post.category}</Badge>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-5xl md:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-pretty text-base text-muted-foreground sm:text-lg">
              {excerpt}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {t("readingTime", { minutes: post.readingMinutes })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Tag className="size-3.5" />
                {post.tags.join(" · ")}
              </span>
            </div>
          </Reveal>

          <Reveal
            delay={0.06}
            className={`relative mt-10 aspect-[16/8] overflow-hidden rounded-3xl border border-border bg-gradient-to-br ${post.accent}`}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_55%)] mix-blend-overlay"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 grid-bg opacity-20 mix-blend-overlay"
            />
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <JournalTOC headings={headings} label={t("contents")} />

            <Reveal delay={0.1} className="prose prose-invert max-w-3xl">
              <p className="text-pretty text-base leading-relaxed text-foreground/85 sm:text-lg">
                {intro}
              </p>

              {blocks.map((b, i) => {
                if (b.type === "h2") {
                  return (
                    <h2
                      key={`${b.text}-${i}`}
                      id={b.id}
                      className="mt-10 scroll-mt-32 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
                    >
                      {b.text}
                    </h2>
                  );
                }
                return (
                  <p
                    key={`${b.text}-${i}`}
                    className="mt-3 text-pretty text-base leading-relaxed text-foreground/85 sm:text-lg"
                  >
                    {b.text}
                  </p>
                );
              })}
            </Reveal>
          </div>
        </article>

        <section className="container-wide pb-24 sm:pb-32">
          <Reveal className="overflow-hidden rounded-3xl border border-border bg-card">
            <Link
              href={`/journal/${next.slug}` as never}
              className="group grid items-stretch gap-0 lg:grid-cols-[1fr_auto]"
            >
              <div className="p-7 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {t("nextPost")}
                </p>
                <p className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  {nextTitle}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {next.category}
                </p>
              </div>
              <div
                className={`relative flex items-center justify-center bg-gradient-to-br ${next.accent} p-7 lg:w-72`}
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

export const dynamic = "force-static";
