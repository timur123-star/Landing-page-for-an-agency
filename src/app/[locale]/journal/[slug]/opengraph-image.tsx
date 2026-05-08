import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";

import { routing } from "@/i18n/routing";
import { journalPosts, getJournalPostBySlug } from "@/data/journal";

export const runtime = "edge";
export const alt = "NOVA Agency · Journal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    journalPosts.map((p) => ({ locale, slug: p.slug })),
  );
}

const GRADIENT_BY_KEY: Record<string, string> = {
  process:
    "radial-gradient(ellipse at 30% 20%, #5159ffaa 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, #a855f7aa 0%, transparent 60%), #0b0b0f",
  "design-tokens":
    "radial-gradient(ellipse at 30% 20%, #06b6d4aa 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, #6366f1aa 0%, transparent 60%), #0b0b0f",
  "lumen-retro":
    "radial-gradient(ellipse at 30% 20%, #ec4899aa 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, #f59e0baa 0%, transparent 60%), #0b0b0f",
};

export default async function Image({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  const safeLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const post = getJournalPostBySlug(slug);
  if (!post) {
    return new ImageResponse(<div style={{ display: "flex" }}>NOVA</div>, size);
  }
  const t = await getTranslations({
    locale: safeLocale,
    namespace: "journal",
  });
  const title = t(`posts.${post.key}.title`);
  const excerpt = t(`posts.${post.key}.excerpt`);
  const background = GRADIENT_BY_KEY[post.key] ?? GRADIENT_BY_KEY.process;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background,
          color: "#fafafa",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #5159ff 0%, #a855f7 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
              color: "white",
              boxShadow: "0 18px 60px -10px #5159ff80",
            }}
          >
            N
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              display: "flex",
              alignItems: "center",
            }}
          >
            NOVA Agency · {t("badge")}
          </div>
          <div
            style={{
              marginLeft: "auto",
              border: "1px solid rgba(255,255,255,0.22)",
              padding: "8px 16px",
              borderRadius: 999,
              fontSize: 15,
              color: "rgba(255,255,255,0.86)",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              display: "flex",
              alignItems: "center",
            }}
          >
            {post.category}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              lineHeight: 1.06,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              maxWidth: 1040,
              backgroundImage:
                "linear-gradient(120deg, #ffffff 0%, #d6d8ff 50%, #ffd5fa 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "rgba(255,255,255,0.78)",
              maxWidth: 980,
            }}
          >
            {excerpt}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            color: "rgba(255,255,255,0.65)",
          }}
        >
          <div style={{ display: "flex", gap: 28 }}>
            <span style={{ display: "flex" }}>{post.date}</span>
            <span style={{ display: "flex" }}>·</span>
            <span style={{ display: "flex" }}>
              {post.readingMinutes} {t("minRead")}
            </span>
          </div>
          <div style={{ display: "flex" }}>nova-agency.studio</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
