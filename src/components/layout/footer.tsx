import { ArrowUpRight, Mail, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import { siteConfig } from "@/lib/site";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { LighthouseBadge } from "@/components/lighthouse-badge";
import { FooterNewsletter } from "@/components/layout/footer-newsletter";
import { Link } from "@/i18n/navigation";

const studioKeys = ["services", "process", "cases", "pricing"] as const;
const infoKeys = ["faq", "testimonials", "contact", "privacy"] as const;
const socialEntries = [
  { label: "Telegram", href: siteConfig.social.telegram },
  { label: "Behance", href: siteConfig.social.behance },
  { label: "Dribbble", href: siteConfig.social.dribbble },
  { label: "GitHub", href: siteConfig.social.github },
];

export function Footer() {
  const t = useTranslations("footer");
  const tSite = useTranslations("site");
  const tCta = useTranslations("cta");

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[10%] -top-[2px] h-[3px] bg-gradient-to-r from-transparent via-primary/25 to-transparent blur-sm"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 size-72 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-0 size-80 rounded-full bg-fuchsia-500/15 blur-3xl"
      />

      <div className="container-wide py-16">
        <div className="gradient-border mb-12 grid gap-8 rounded-3xl border border-border/70 bg-card/60 p-7 backdrop-blur-sm md:grid-cols-[1.4fr_1fr] md:items-center md:gap-14 md:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {t("ctaKicker")}
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              {t("ctaTitle")}
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <Button asChild size="lg">
              <Link href="/#contact">
                {tCta("primary")}
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`mailto:${siteConfig.email}`}>
                <Mail className="size-4" />
                {siteConfig.email}
              </a>
            </Button>
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo className="mb-4" />
            <p className="max-w-sm text-sm text-muted-foreground">
              {tSite("description")}
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {tSite("address")}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              {siteConfig.email} · {siteConfig.phone}
            </p>
          </div>

          <nav className="md:col-span-2">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {t("studio")}
            </p>
            <ul className="space-y-2.5">
              {studioKeys.map((key) => (
                <li key={key}>
                  <Link
                    href={`/#${key}`}
                    className="inline-flex items-center gap-1 text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {t(`studioLinks.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-2">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {t("info")}
            </p>
            <ul className="space-y-2.5">
              {infoKeys.map((key) => (
                <li key={key}>
                  <Link
                    href={`/#${key}`}
                    className="inline-flex items-center gap-1 text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {t(`infoLinks.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-2">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {t("social")}
            </p>
            <ul className="space-y-2.5">
              {socialEntries.map((entry) => (
                <li key={entry.label}>
                  <a
                    href={entry.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {entry.label}
                    <ArrowUpRight className="size-3 text-muted-foreground" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-12 lg:col-span-12">
            <FooterNewsletter />
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border/70 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div className="space-y-1.5">
            <p>
              © {new Date().getFullYear()} {siteConfig.name}.{" "}
              {tSite("rights")}
            </p>
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80">
              {tSite("portfolioNote")} · {tSite("author")}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:justify-end">
            <LighthouseBadge />
            <p className="flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-primary" />
              <span>{tSite("madeBy")}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
