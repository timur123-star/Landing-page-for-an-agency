import type { Metadata, Viewport } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";

import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LenisScroll } from "@/components/motion/lenis-scroll";
import { CustomCursor } from "@/components/motion/custom-cursor";
import { IntroSplash } from "@/components/motion/intro-splash";
import { RadialThemeProvider } from "@/components/motion/radial-theme";
import { SectionHueShift } from "@/components/section-hue-shift";
import { CommandPalette } from "@/components/command-palette";
import { SkipToContent } from "@/components/skip-to-content";
import { BackToTop } from "@/components/back-to-top";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site";
import { routing, type Locale } from "@/i18n/routing";

const fontSans = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const fontDisplay = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const ogLocale: Record<Locale, string> = {
  ru: "ru_RU",
  en: "en_US",
  uk: "uk_UA",
  es: "es_ES",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: "site" });
  const tagline = t("tagline");
  const description = t("description");
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} — ${tagline}`,
      template: `%s · ${siteConfig.name}`,
    },
    description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale[locale as Locale] ?? "ru_RU",
      url: locale === routing.defaultLocale ? siteConfig.url : `${siteConfig.url}/${locale}`,
      siteName: siteConfig.name,
      title: `${siteConfig.name} — ${tagline}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} — ${tagline}`,
      description,
      creator: "@nova_agency",
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-icon.png",
    },
    manifest: "/manifest.webmanifest",
    alternates: {
      canonical:
        locale === routing.defaultLocale ? "/" : `/${locale}`,
      languages: {
        ru: "/",
        en: "/en",
        uk: "/uk",
        es: "/es",
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`}
    >
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <RadialThemeProvider>
              <SkipToContent />
              <JsonLd locale={locale as Locale} />
              <SectionHueShift />
              <LenisScroll />
              <IntroSplash />
              <CustomCursor />
              <CommandPalette />
              {children}
              <BackToTop />
              <Toaster
                position="top-right"
                toastOptions={{
                  classNames: {
                    toast:
                      "rounded-xl border border-border bg-card text-card-foreground shadow-lg",
                  },
                }}
              />
              <Analytics />
            </RadialThemeProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
