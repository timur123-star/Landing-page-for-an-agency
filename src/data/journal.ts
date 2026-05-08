export type JournalPost = {
  key: string;
  slug: string;
  date: string;
  readingMinutes: number;
  category: string;
  accent: string;
  tags: string[];
};

export const journalPosts: JournalPost[] = [
  {
    key: "process",
    slug: "how-we-ship-in-six-weeks",
    date: "2025-04-12",
    readingMinutes: 7,
    category: "Process",
    accent: "from-indigo-500 via-violet-500 to-fuchsia-500",
    tags: ["Process", "Sprints", "Delivery"],
  },
  {
    key: "design-tokens",
    slug: "design-tokens-that-scale",
    date: "2025-03-04",
    readingMinutes: 9,
    category: "Design",
    accent: "from-emerald-400 via-teal-500 to-cyan-500",
    tags: ["Design", "Tokens", "Tailwind"],
  },
  {
    key: "analytics",
    slug: "analytics-that-drive-decisions",
    date: "2025-02-26",
    readingMinutes: 8,
    category: "Analytics",
    accent: "from-sky-400 via-blue-500 to-indigo-500",
    tags: ["Analytics", "Funnel", "Metrics"],
  },
  {
    key: "lumen-retro",
    slug: "lumen-retrospective",
    date: "2025-02-18",
    readingMinutes: 6,
    category: "Case study",
    accent: "from-rose-400 via-orange-400 to-amber-300",
    tags: ["Retro", "SaaS", "Conversion"],
  },
  {
    key: "design-review",
    slug: "design-review-without-pain",
    date: "2025-01-21",
    readingMinutes: 7,
    category: "Design",
    accent: "from-fuchsia-500 via-pink-500 to-rose-400",
    tags: ["Design", "Review", "Velocity"],
  },
];

export function getJournalPostBySlug(slug: string): JournalPost | undefined {
  return journalPosts.find((p) => p.slug === slug);
}
