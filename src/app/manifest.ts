import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";
import { routing } from "@/i18n/routing";
import ru from "../../messages/ru.json";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: ru.site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0f",
    theme_color: "#0a0a0f",
    lang: routing.defaultLocale,
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
