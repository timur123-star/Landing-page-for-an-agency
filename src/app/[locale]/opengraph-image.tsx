import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

export const runtime = "edge";
export const alt = "NOVA Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Image({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const safeLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const tHero = await getTranslations({
    locale: safeLocale,
    namespace: "hero",
  });
  const tSite = await getTranslations({
    locale: safeLocale,
    namespace: "site",
  });
  const tProof = await getTranslations({
    locale: safeLocale,
    namespace: "hero",
  });

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
          background:
            "radial-gradient(ellipse at 30% 20%, #5159ff55 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, #a855f755 0%, transparent 60%), #0b0b0f",
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
              fontSize: 30,
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
              border: "1px solid rgba(255,255,255,0.18)",
              padding: "8px 16px",
              borderRadius: 999,
              fontSize: 16,
              color: "rgba(255,255,255,0.78)",
              display: "flex",
              alignItems: "center",
            }}
          >
            nova-agency.studio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 16px",
              borderRadius: 999,
              border: "1px solid rgba(81,89,255,0.5)",
              background: "rgba(81,89,255,0.15)",
              alignSelf: "flex-start",
              fontSize: 18,
              color: "#c5cbff",
            }}
          >
            {tSite("tagline")}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 80,
              lineHeight: 1.05,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              maxWidth: 1040,
              backgroundImage:
                "linear-gradient(120deg, #ffffff 0%, #d2d4ff 50%, #f0c8ff 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {tHero("title")}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "rgba(255,255,255,0.75)",
              maxWidth: 980,
            }}
          >
            {tHero("subtitle")}
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
          <div style={{ display: "flex", gap: 32 }}>
            <span style={{ display: "flex" }}>{tProof("socialBold")}</span>
            <span style={{ display: "flex" }}>{tProof("rating")}</span>
            <span style={{ display: "flex" }}>Lighthouse 95+</span>
          </div>
          <div style={{ display: "flex" }}>{tSite("address")}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
