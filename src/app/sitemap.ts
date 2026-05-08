import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";
import { routing } from "@/i18n/routing";
import { cases } from "@/data/cases";
import { journalPosts } from "@/data/journal";

function localizedUrl(locale: string, path = "") {
  const root =
    locale === routing.defaultLocale
      ? siteConfig.url
      : `${siteConfig.url}/${locale}`;
  return path ? `${root}${path}` : root;
}

function alternatesFor(path = "") {
  return Object.fromEntries(
    routing.locales.map((alt) => [alt, localizedUrl(alt, path)]),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const home = routing.locales.map((locale) => ({
    url: localizedUrl(locale),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: { languages: alternatesFor() },
  }));

  const work = routing.locales.map((locale) => ({
    url: localizedUrl(locale, "/work"),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    alternates: { languages: alternatesFor("/work") },
  }));

  const workCases = routing.locales.flatMap((locale) =>
    cases.map((c) => ({
      url: localizedUrl(locale, `/work/${c.slug}`),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
      alternates: { languages: alternatesFor(`/work/${c.slug}`) },
    })),
  );

  const journal = routing.locales.map((locale) => ({
    url: localizedUrl(locale, "/journal"),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: { languages: alternatesFor("/journal") },
  }));

  const journalArticles = routing.locales.flatMap((locale) =>
    journalPosts.map((p) => ({
      url: localizedUrl(locale, `/journal/${p.slug}`),
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
      alternates: { languages: alternatesFor(`/journal/${p.slug}`) },
    })),
  );

  return [...home, ...work, ...workCases, ...journal, ...journalArticles];
}
