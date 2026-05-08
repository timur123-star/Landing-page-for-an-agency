export const siteConfig = {
  name: "NOVA Agency",
  shortName: "NOVA",
  url: "https://nova-agency.vercel.app",
  ogImage: "/og.png",
  email: "hello@nova-agency.studio",
  phone: "+7 (999) 000-00-00",
  social: {
    telegram: "https://t.me/nova_agency",
    behance: "https://behance.net/nova_agency",
    dribbble: "https://dribbble.com/nova_agency",
    github: "https://github.com/nova-agency",
  },
};

export const navItems = [
  { key: "services", href: "#services", kind: "anchor" as const },
  { key: "process", href: "#process", kind: "anchor" as const },
  { key: "work", href: "/work", kind: "route" as const },
  { key: "journal", href: "/journal", kind: "route" as const },
  { key: "pricing", href: "#pricing", kind: "anchor" as const },
  { key: "faq", href: "#faq", kind: "anchor" as const },
] as const;

export type SiteConfig = typeof siteConfig;
