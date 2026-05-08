"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import {
  ArrowRight,
  ArrowUp,
  Compass,
  Layers,
  LayoutGrid,
  Mail,
  Notebook,
  Palette,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useLocale, useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { cases } from "@/data/cases";
import { journalPosts } from "@/data/journal";
import { useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const SECTION_ITEMS = [
  { key: "services", hash: "services", icon: Layers },
  { key: "process", hash: "process", icon: Compass },
  { key: "cases", hash: "cases", icon: LayoutGrid },
  { key: "pricing", hash: "pricing", icon: Sparkles },
  { key: "faq", hash: "faq", icon: Search },
] as const;

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const t = useTranslations("command");
  const tNav = useTranslations("nav");
  const tWork = useTranslations("work");
  const tJournal = useTranslations("journal");
  const tCta = useTranslations("cta");
  const router = useRouter();
  const locale = useLocale() as Locale;
  const { setTheme, resolvedTheme } = useTheme();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // e.code is layout-independent (KeyK fires for "к" on Russian layout too).
      // We also keep e.key checks for browsers/keyboards that report "k" only.
      const isK =
        e.code === "KeyK" ||
        e.key === "k" ||
        e.key === "K" ||
        e.key === "л" ||
        e.key === "Л";
      const isShortcut = isK && (e.metaKey || e.ctrlKey);
      const isSlash = e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey;
      const target = e.target as HTMLElement | null;
      const inField =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        (target as HTMLElement | null)?.isContentEditable;

      if (isShortcut) {
        e.preventDefault();
        e.stopPropagation();
        setOpen((prev) => !prev);
        return;
      }
      if (isSlash && !inField) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey, { capture: true });
    return () =>
      window.removeEventListener("keydown", onKey, { capture: true });
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const lenis = window.__lenis;
    if (!lenis) return;
    if (open) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [open]);

  const close = () => setOpen(false);

  const goSection = (hash: string) => {
    close();
    if (typeof window === "undefined") return;
    const path = locale === "ru" ? "/" : `/${locale}`;
    if (window.location.pathname !== path) {
      router.push("/");
      requestAnimationFrame(() => {
        const node = document.getElementById(hash);
        if (node) node.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }
    const node = document.getElementById(hash);
    if (node) node.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goCase = (slug: string) => {
    close();
    router.push(`/work/${slug}`);
  };

  const goJournal = (slug: string) => {
    close();
    router.push(`/journal/${slug}`);
  };

  const goWorkIndex = () => {
    close();
    router.push("/work");
  };

  const goJournalIndex = () => {
    close();
    router.push("/journal");
  };

  const goContact = () => {
    close();
    router.push("/");
    requestAnimationFrame(() => {
      const node = document.getElementById("contact");
      if (node) node.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const toggleTheme = () => {
    close();
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const scrollTop = () => {
    close();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[120] bg-background/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-label={t("title")}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="fixed left-1/2 top-[8%] z-[121] flex max-h-[84svh] w-[min(640px,calc(100vw-1rem))] -translate-x-1/2 flex-col overflow-hidden rounded-2xl border border-border bg-popover/95 text-popover-foreground shadow-[0_28px_80px_-20px_hsl(var(--primary)/0.45)] backdrop-blur-xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:top-[15%]"
        >
          <Dialog.Title className="sr-only">{t("title")}</Dialog.Title>
          <Command
            label={t("title")}
            shouldFilter
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="flex items-center gap-3 border-b border-border/70 px-4 py-3">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <Command.Input
                value={value}
                onValueChange={setValue}
                placeholder={t("placeholder")}
                className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
              />
              <kbd className="hidden rounded border border-border/80 bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:inline-flex">
                ESC
              </kbd>
              <Dialog.Close
                aria-label={t("close")}
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <X className="size-3.5" />
              </Dialog.Close>
            </div>

            <Command.List
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <Command.Empty className="px-3 py-8 text-center text-sm text-muted-foreground">
                {t("empty")}
              </Command.Empty>

              <Command.Group
                heading={t("sections.navigation")}
                className="px-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:text-muted-foreground"
              >
                {SECTION_ITEMS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <CommandItem
                      key={s.key}
                      onSelect={() => goSection(s.hash)}
                      keywords={[tNav(s.key)]}
                    >
                      <Icon className="size-4 text-muted-foreground" />
                      <span className="flex-1">{tNav(s.key)}</span>
                      <ArrowRight className="size-3.5 text-muted-foreground" />
                    </CommandItem>
                  );
                })}
                <CommandItem
                  onSelect={goWorkIndex}
                  keywords={[tWork("allCases")]}
                >
                  <LayoutGrid className="size-4 text-muted-foreground" />
                  <span className="flex-1">{tWork("allCases")}</span>
                  <ArrowRight className="size-3.5 text-muted-foreground" />
                </CommandItem>
                <CommandItem
                  onSelect={goJournalIndex}
                  keywords={[tJournal("all")]}
                >
                  <Notebook className="size-4 text-muted-foreground" />
                  <span className="flex-1">{tJournal("all")}</span>
                  <ArrowRight className="size-3.5 text-muted-foreground" />
                </CommandItem>
              </Command.Group>

              <Command.Group
                heading={t("sections.cases")}
                className="px-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:text-muted-foreground"
              >
                {cases.map((c) => {
                  const title = tWork(`items.${c.key}.title`);
                  return (
                    <CommandItem
                      key={c.slug}
                      onSelect={() => goCase(c.slug)}
                      keywords={[c.client, title]}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "size-4 rounded-sm bg-gradient-to-br",
                          c.gradient,
                        )}
                      />
                      <span className="flex-1 truncate">{c.client}</span>
                      <span className="hidden truncate text-xs text-muted-foreground sm:inline">
                        {title}
                      </span>
                      <ArrowRight className="size-3.5 text-muted-foreground" />
                    </CommandItem>
                  );
                })}
              </Command.Group>

              <Command.Group
                heading={t("sections.journal")}
                className="px-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:text-muted-foreground"
              >
                {journalPosts.map((p) => {
                  const title = tJournal(`posts.${p.key}.title`);
                  return (
                    <CommandItem
                      key={p.slug}
                      onSelect={() => goJournal(p.slug)}
                      keywords={[title, p.category]}
                    >
                      <Notebook className="size-4 text-muted-foreground" />
                      <span className="flex-1 truncate">{title}</span>
                      <ArrowRight className="size-3.5 text-muted-foreground" />
                    </CommandItem>
                  );
                })}
              </Command.Group>

              <Command.Group
                heading={t("sections.actions")}
                className="px-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:text-muted-foreground"
              >
                <CommandItem onSelect={toggleTheme}>
                  <Palette className="size-4 text-muted-foreground" />
                  <span className="flex-1">{t("actions.toggleTheme")}</span>
                </CommandItem>
                <CommandItem onSelect={goContact}>
                  <Mail className="size-4 text-muted-foreground" />
                  <span className="flex-1">{t("actions.contact")}</span>
                  <span className="hidden text-xs text-muted-foreground sm:inline">
                    {tCta("primary")}
                  </span>
                </CommandItem>
                <CommandItem onSelect={scrollTop}>
                  <ArrowUp className="size-4 text-muted-foreground" />
                  <span className="flex-1">{t("actions.scrollTop")}</span>
                </CommandItem>
              </Command.Group>
            </Command.List>

            <div className="flex items-center justify-between border-t border-border/70 bg-muted/30 px-4 py-2 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <kbd className="rounded border border-border/80 bg-background/80 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em]">
                  ↑↓
                </kbd>
                <span>·</span>
                <kbd className="rounded border border-border/80 bg-background/80 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em]">
                  ↵
                </kbd>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="size-3 text-primary" />
                {t("title")}
              </span>
            </div>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function CommandItem({
  children,
  onSelect,
  keywords,
}: {
  children: React.ReactNode;
  onSelect: () => void;
  keywords?: string[];
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      keywords={keywords}
      className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground/85 transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-foreground"
    >
      {children}
    </Command.Item>
  );
}

export function CommandTrigger({ className }: { className?: string }) {
  const t = useTranslations("command");
  const dispatch = () => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "k",
        metaKey: true,
        bubbles: true,
      }),
    );
  };
  return (
    <button
      type="button"
      aria-label={t("open")}
      title={t("open")}
      onClick={dispatch}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background/60 px-3 text-xs font-medium text-foreground/75 backdrop-blur transition-colors hover:bg-accent hover:text-foreground",
        className,
      )}
    >
      <Search className="size-3.5 text-muted-foreground" />
      <span className="hidden sm:inline">{t("openShort")}</span>
      <kbd className="hidden rounded border border-border/80 bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:inline-flex">
        {t("shortcut")}
      </kbd>
    </button>
  );
}
