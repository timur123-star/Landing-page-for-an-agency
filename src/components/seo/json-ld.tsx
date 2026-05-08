import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/lib/site";
import { routing, type Locale } from "@/i18n/routing";
import { cases } from "@/data/cases";
import { journalPosts } from "@/data/journal";

type FaqItem = { q: string; a: string };

export async function JsonLd({ locale }: { locale: Locale }) {
  const tSite = await getTranslations({ locale, namespace: "site" });
  const tFaq = await getTranslations({ locale, namespace: "faq" });
  const tWork = await getTranslations({ locale, namespace: "work" });
  const tJournal = await getTranslations({ locale, namespace: "journal" });

  const description = tSite("description");

  const baseUrl =
    locale === routing.defaultLocale
      ? siteConfig.url
      : `${siteConfig.url}/${locale}`;

  const faqRaw = tFaq.raw("items") as FaqItem[];

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
    description,
    sameAs: [
      siteConfig.social.telegram,
      siteConfig.social.behance,
      siteConfig.social.dribbble,
      siteConfig.social.github,
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: siteConfig.email,
        telephone: siteConfig.phone,
        contactType: "sales",
        availableLanguage: ["Russian", "English", "Ukrainian", "Spanish"],
      },
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: baseUrl,
    inLanguage: locale,
    description,
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqRaw.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const workCollection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: tWork("title"),
    url: `${baseUrl}/work`,
    inLanguage: locale,
    description: tWork("subtitle"),
    hasPart: cases.map((c) => ({
      "@type": "CreativeWork",
      name: tWork(`items.${c.key}.title`),
      url: `${baseUrl}/work/${c.slug}`,
      author: { "@type": "Organization", name: siteConfig.name },
      keywords: c.tags.join(", "),
      dateCreated: c.year,
    })),
  };

  const journalCollection = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: tJournal("title"),
    url: `${baseUrl}/journal`,
    inLanguage: locale,
    description: tJournal("subtitle"),
    blogPost: journalPosts.map((p) => ({
      "@type": "BlogPosting",
      headline: tJournal(`posts.${p.key}.title`),
      url: `${baseUrl}/journal/${p.slug}`,
      datePublished: p.date,
      author: { "@type": "Organization", name: siteConfig.name },
      keywords: p.tags.join(", "),
      articleSection: p.category,
      timeRequired: `PT${p.readingMinutes}M`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workCollection) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(journalCollection) }}
      />
    </>
  );
}
