import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";

import { routing } from "@/i18n/routing";
import { cases, getCaseBySlug } from "@/data/cases";

export const runtime = "edge";
export const alt = "NOVA Agency · Case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    cases.map((c) => ({ locale, slug: c.slug })),
  );
}

const GRADIENT_BY_KEY: Record<string, string> = {
  lumen:
    "radial-gradient(ellipse at 30% 20%, #6366f1aa 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, #a855f7aa 0%, transparent 60%), #0b0b0f",
  atlas:
    "radial-gradient(ellipse at 30% 20%, #06b6d4aa 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, #22d3eeaa 0%, transparent 60%), #0b0b0f",
  north:
    "radial-gradient(ellipse at 30% 20%, #f59e0baa 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, #f43f5eaa 0%, transparent 60%), #0b0b0f",
  orbit:
    "radial-gradient(ellipse at 30% 20%, #10b981aa 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, #06b6d4aa 0%, transparent 60%), #0b0b0f",
  vault:
    "radial-gradient(ellipse at 30% 20%, #ec4899aa 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, #6366f1aa 0%, transparent 60%), #0b0b0f",
  pulse:
    "radial-gradient(ellipse at 30% 20%, #8b5cf6aa 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, #ec4899aa 0%, transparent 60%), #0b0b0f",
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
  const item = getCaseBySlug(slug);
  if (!item) {
    return new ImageResponse(<div style={{ display: "flex" }}>NOVA</div>, size);
  }
  const t = await getTranslations({ locale: safeLocale, namespace: "work" });
  const title = t(`items.${item.key}.title`);
  const summary = t(`items.${item.key}.summary`);
  const industry = t(`items.${item.key}.industry`);
  const background = GRADIENT_BY_KEY[item.key] ?? GRADIENT_BY_KEY.lumen;

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
            NOVA Agency
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
            {t("badge")} · {item.year}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 18,
              color: "rgba(255,255,255,0.7)",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
            }}
          >
            <span style={{ display: "flex" }}>{item.client}</span>
            <span style={{ display: "flex" }}>·</span>
            <span style={{ display: "flex" }}>{industry}</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              lineHeight: 1.05,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              maxWidth: 1040,
              backgroundImage:
                "linear-gradient(120deg, #ffffff 0%, #e5e7ff 60%, #ffd9f7 100%)",
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
            {summary}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <div style={{ display: "flex", gap: 28 }}>
            {item.metricValues.slice(0, 3).map((v, i) => (
              <span
                key={`${v}-${i}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 14px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "#fff",
                  fontWeight: 600,
                }}
              >
                {v}
              </span>
            ))}
          </div>
          <div style={{ display: "flex" }}>nova-agency.studio</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
