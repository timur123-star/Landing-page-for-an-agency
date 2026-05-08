export type CaseStudy = {
  key: string;
  slug: string;
  client: string;
  metricValues: string[];
  tags: string[];
  gradient: string;
  year: string;
  industryAccent: string;
  duration: string;
  team: string[];
  services: string[];
  link: string;
};

export const cases: CaseStudy[] = [
  {
    key: "lumen",
    slug: "lumen-saas",
    client: "Lumen Analytics",
    metricValues: ["+218%", "+34%", "3:42"],
    tags: ["Branding", "Web", "SaaS"],
    gradient: "from-indigo-500 via-violet-500 to-fuchsia-500",
    year: "2025",
    industryAccent: "#7c3aed",
    duration: "6 weeks",
    team: ["Strategy", "Brand", "Product", "Web"],
    services: ["branding", "product", "web"],
    link: "https://lumen.example.com",
  },
  {
    key: "atlas",
    slug: "atlas-fintech",
    client: "Atlas Capital",
    metricValues: ["×4.2", "98 / 100", "72"],
    tags: ["Fintech", "Branding", "Web"],
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    year: "2025",
    industryAccent: "#14b8a6",
    duration: "8 weeks",
    team: ["Strategy", "Brand", "Web", "Launch"],
    services: ["branding", "web", "launch"],
    link: "https://atlas.example.com",
  },
  {
    key: "north",
    slug: "north-edu",
    client: "North School",
    metricValues: ["9.4%", "−41%", "1 800+"],
    tags: ["EdTech", "Marketing", "Product"],
    gradient: "from-rose-400 via-orange-400 to-amber-300",
    year: "2024",
    industryAccent: "#fb7185",
    duration: "10 weeks",
    team: ["Strategy", "Brand", "Product", "Performance"],
    services: ["branding", "product", "performance"],
    link: "https://north.example.com",
  },
  {
    key: "orbit",
    slug: "orbit-mobility",
    client: "Orbit Mobility",
    metricValues: ["120K", "38%", "+62%"],
    tags: ["Mobility", "Mobile", "Branding"],
    gradient: "from-sky-500 via-blue-500 to-indigo-500",
    year: "2024",
    industryAccent: "#0ea5e9",
    duration: "12 weeks",
    team: ["Brand", "Product", "Content"],
    services: ["branding", "product", "content"],
    link: "https://orbit.example.com",
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}
