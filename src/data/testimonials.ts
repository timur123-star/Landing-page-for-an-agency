export type Testimonial = {
  key: string;
  author: string;
  company: string;
  initials: string;
  accent: string;
};

export const testimonials: Testimonial[] = [
  {
    key: "alina",
    author: "Алина Кузнецова",
    company: "Lumen Analytics",
    initials: "АК",
    accent: "from-indigo-500 to-fuchsia-500",
  },
  {
    key: "mikhail",
    author: "Михаил Орлов",
    company: "Atlas Capital",
    initials: "МО",
    accent: "from-emerald-400 to-cyan-500",
  },
  {
    key: "darya",
    author: "Дарья Светлова",
    company: "North School",
    initials: "ДС",
    accent: "from-rose-400 to-amber-300",
  },
  {
    key: "ivan",
    author: "Иван Петров",
    company: "Orbit Mobility",
    initials: "ИП",
    accent: "from-sky-500 to-indigo-500",
  },
  {
    key: "viktoria",
    author: "Виктория Лебедева",
    company: "Northwind",
    initials: "ВЛ",
    accent: "from-violet-500 to-pink-500",
  },
  {
    key: "artem",
    author: "Артём Гончаров",
    company: "Mosaic Studio",
    initials: "АГ",
    accent: "from-orange-500 to-rose-500",
  },
];
