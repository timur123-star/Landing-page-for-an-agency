import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru", "en", "uk", "es"] as const,
  defaultLocale: "ru",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

export const localeNames: Record<Locale, { label: string; flag: string }> = {
  ru: { label: "Русский", flag: "RU" },
  en: { label: "English", flag: "EN" },
  uk: { label: "Українська", flag: "UA" },
  es: { label: "Español", flag: "ES" },
};
