"use client";

import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Check, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { localeNames, routing, type Locale } from "@/i18n/routing";
import { usePathname } from "@/i18n/navigation";

export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations("site");
  const pathname = usePathname();
  const active = useLocale() as Locale;
  const [open, setOpen] = React.useState(false);
  const [pending, setPending] = React.useState(false);

  const onSelect = (next: Locale) => {
    setOpen(false);
    if (next === active) return;
    if (typeof window === "undefined") return;
    setPending(true);

    // Persist locale choice so the middleware does not redirect us back
    // to the previously-selected locale via the NEXT_LOCALE cookie. Set
    // both with and without an explicit Domain — some mobile browsers
    // (iOS Safari, in-app webviews) do not commit cookies set immediately
    // before window.location navigation reliably, so we set redundantly
    // and add a tiny delay below.
    const cookieValue = `NEXT_LOCALE=${next}; path=/; max-age=31536000; SameSite=Lax`;
    document.cookie = cookieValue;
    try {
      const host = window.location.hostname;
      if (host && host !== "localhost") {
        document.cookie = `${cookieValue}; domain=${host}`;
      }
    } catch {}
    try {
      window.localStorage.setItem("NEXT_LOCALE", next);
    } catch {}

    const cleanPath = pathname && pathname !== "/" ? pathname : "";
    const targetPath =
      next === routing.defaultLocale ? cleanPath || "/" : `/${next}${cleanPath}`;
    const targetUrl = `${targetPath}${window.location.search}${window.location.hash}`;

    // Defer one tick so the cookie write commits before navigation, then
    // hard-replace so the back button doesn't return to the stale locale.
    window.setTimeout(() => {
      window.location.replace(targetUrl);
    }, 30);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          aria-label={t("selectLanguage")}
          aria-busy={pending}
          className={cn(
            "inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/80 backdrop-blur transition-colors hover:bg-accent",
            className,
          )}
        >
          <Globe className="size-3.5 text-muted-foreground" />
          {localeNames[active].flag}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={10}
          className="z-50 min-w-[200px] rounded-2xl border border-border bg-popover/95 p-1.5 text-popover-foreground shadow-2xl backdrop-blur-xl data-[state=open]:animate-in data-[state=open]:fade-in-0"
        >
          <p className="px-3 pb-2 pt-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {t("selectLanguage")}
          </p>
          <ul className="flex flex-col gap-0.5">
            {routing.locales.map((locale) => {
              const isActive = locale === active;
              return (
                <li key={locale}>
                  <button
                    type="button"
                    onClick={() => onSelect(locale)}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/85 hover:bg-accent",
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {localeNames[locale].flag}
                      </span>
                      <span className="text-sm font-medium">
                        {localeNames[locale].label}
                      </span>
                    </span>
                    {isActive ? <Check className="size-3.5" /> : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
