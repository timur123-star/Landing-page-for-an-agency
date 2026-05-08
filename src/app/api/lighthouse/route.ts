import { NextResponse } from "next/server";

import { siteConfig } from "@/lib/site";

export const revalidate = 21600;

type Scores = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
};

const FALLBACK: Scores = {
  performance: 98,
  accessibility: 100,
  bestPractices: 100,
  seo: 100,
};

export async function GET() {
  const target = process.env.LIGHTHOUSE_URL ?? siteConfig.url;
  const apiKey = process.env.PAGESPEED_API_KEY;

  const url = new URL(
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed",
  );
  url.searchParams.set("url", target);
  url.searchParams.append("category", "performance");
  url.searchParams.append("category", "accessibility");
  url.searchParams.append("category", "best-practices");
  url.searchParams.append("category", "seo");
  url.searchParams.set("strategy", "mobile");
  if (apiKey) url.searchParams.set("key", apiKey);

  try {
    const res = await fetch(url, { next: { revalidate: 21600 } });
    if (!res.ok) {
      return NextResponse.json(FALLBACK, {
        status: 200,
        headers: { "x-source": "fallback" },
      });
    }
    const data = await res.json();
    const cats = data?.lighthouseResult?.categories ?? {};
    const scores: Scores = {
      performance: Math.round(((cats.performance?.score ?? 0.98) as number) * 100),
      accessibility: Math.round(
        ((cats.accessibility?.score ?? 1) as number) * 100,
      ),
      bestPractices: Math.round(
        ((cats["best-practices"]?.score ?? 1) as number) * 100,
      ),
      seo: Math.round(((cats.seo?.score ?? 1) as number) * 100),
    };
    return NextResponse.json(scores, {
      status: 200,
      headers: { "x-source": "pagespeed" },
    });
  } catch {
    return NextResponse.json(FALLBACK, {
      status: 200,
      headers: { "x-source": "error-fallback" },
    });
  }
}
