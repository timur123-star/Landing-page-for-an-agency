import { getTranslations, setRequestLocale } from "next-intl/server";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Logos } from "@/components/sections/logos";
import { ProblemSolution } from "@/components/sections/problem-solution";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Cases } from "@/components/sections/cases";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { SectionIndicator } from "@/components/section-indicator";
import { SectionDivider } from "@/components/section-divider";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "sectionIndicator" });
  const sections = [
    { id: "top", label: t("top") },
    { id: "why", label: t("why") },
    { id: "services", label: t("services") },
    { id: "process", label: t("process") },
    { id: "cases", label: t("cases") },
    { id: "testimonials", label: t("testimonials") },
    { id: "pricing", label: t("pricing") },
    { id: "faq", label: t("faq") },
    { id: "contact", label: t("contact") },
  ];

  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <Hero />
        <Logos />
        <SectionDivider />
        <ProblemSolution />
        <SectionDivider flip />
        <Services />
        <SectionDivider />
        <Process />
        <SectionDivider flip />
        <Cases />
        <Stats />
        <SectionDivider />
        <Testimonials />
        <SectionDivider flip />
        <Pricing />
        <SectionDivider />
        <FAQ />
        <SectionDivider flip />
        <Contact />
      </main>
      <SectionIndicator sections={sections} />
      <Footer />
    </>
  );
}
