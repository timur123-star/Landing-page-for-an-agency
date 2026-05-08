"use client";

import * as React from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { siteConfig, navItems } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { Magnetic } from "@/components/motion/magnetic";
import { CommandTrigger } from "@/components/command-palette";
import { Link } from "@/i18n/navigation";

export function Header() {
  const t = useTranslations("nav");
  const tCta = useTranslations("cta");
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [activeAnchor, setActiveAnchor] = React.useState<string | null>(null);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  React.useEffect(() => {
    const ids = navItems
      .filter((item) => item.kind === "anchor")
      .map((item) => item.href.replace(/^#/, ""));
    if (typeof window === "undefined") return;
    if (window.location.pathname.replace(/\/$/, "").split("/").length > 2)
      return;

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActiveAnchor(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress, transformOrigin: "0% 50%" }}
        className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400"
      />
      <div className="container-wide">
        <nav
          className={cn(
            "relative flex items-center justify-between gap-3 rounded-full border bg-background/70 px-3 py-2 pl-4 backdrop-blur-xl transition-all duration-300",
            scrolled
              ? "border-border/80 shadow-[0_10px_40px_-12px_hsl(var(--primary)/0.25),0_0_0_1px_hsl(var(--primary)/0.08)]"
              : "border-border/60 shadow-none",
          )}
        >
          <Link href="/" className="inline-flex" aria-label={siteConfig.name}>
            <Logo />
          </Link>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive =
                item.kind === "anchor" && activeAnchor === item.href;
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={
                      item.kind === "anchor"
                        ? (`/${item.href}` as never)
                        : (item.href as never)
                    }
                    className={cn(
                      "relative rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-foreground",
                      isActive ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="header-nav-pill"
                        aria-hidden="true"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                        className="absolute inset-0 -z-10 rounded-full bg-accent/80 ring-1 ring-border/60"
                      />
                    ) : null}
                    {t(item.key)}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <CommandTrigger className="hidden xl:inline-flex" />
            <LocaleSwitcher />
            <ThemeToggle />
            <Magnetic>
              <Button asChild size="sm" className="h-10 px-5">
                <Link href="/#contact">{tCta("primary")}</Link>
              </Button>
            </Magnetic>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <CommandTrigger />
            <LocaleSwitcher />
            <ThemeToggle />
            <button
              type="button"
              aria-label={open ? t("closeMenu") : t("openMenu")}
              aria-expanded={open}
              onClick={() => setOpen((prev) => !prev)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-background/60 backdrop-blur"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-x-3 top-20 z-40 rounded-2xl border border-border bg-background/95 p-4 shadow-2xl backdrop-blur-xl lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={
                    item.kind === "anchor"
                      ? (`/${item.href}` as never)
                      : (item.href as never)
                  }
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-3 w-full">
            <Link href="/#contact" onClick={() => setOpen(false)}>
              {tCta("primary")}
            </Link>
          </Button>
        </motion.div>
      )}
    </motion.header>
  );
}
