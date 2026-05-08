"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";

import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";
import { useRadialTheme } from "@/components/motion/radial-theme";

const themeLabels: Record<Locale, string> = {
  ru: "Переключить тему",
  en: "Toggle theme",
  uk: "Переключити тему",
  es: "Cambiar tema",
};

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const locale = useLocale() as Locale;
  const radial = useRadialTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const next = isDark ? "light" : "dark";
    if (radial) {
      radial.trigger(next, { x: event.clientX, y: event.clientY });
    } else {
      setTheme(next);
    }
  };

  return (
    <button
      type="button"
      aria-label={themeLabels[locale] ?? themeLabels.en}
      onClick={handleClick}
      className={cn(
        "relative inline-flex size-10 items-center justify-center rounded-full border border-border bg-background/60 backdrop-blur transition-colors hover:bg-accent",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2 }}
          className="inline-flex"
        >
          {isDark ? (
            <Moon className="size-[18px]" />
          ) : (
            <Sun className="size-[18px]" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
