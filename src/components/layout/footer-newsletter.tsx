"use client";

import * as React from "react";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function FooterNewsletter() {
  const t = useTranslations("footer.newsletter");
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) {
      toast.error(t("invalid"));
      return;
    }
    setSubmitted(true);
    toast.success(t("success"));
    setEmail("");
  };

  return (
    <div className="mt-12 flex flex-col gap-5 rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-3">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <Mail className="size-4" />
        </span>
        <div>
          <p className="font-display text-base font-semibold tracking-tight">
            {t("title")}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{t("subtitle")}</p>
        </div>
      </div>
      {submitted ? (
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-medium text-emerald-300">
          <CheckCircle2 className="size-4" />
          {t("done")}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md items-center gap-2"
        >
          <label htmlFor="footer-newsletter-email" className="sr-only">
            {t("placeholder")}
          </label>
          <input
            id="footer-newsletter-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={t("placeholder")}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-10 flex-1 rounded-full border border-border bg-background/60 px-4 text-sm outline-none ring-offset-background transition-colors placeholder:text-muted-foreground focus:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
          />
          <button
            type="submit"
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.6)] transition-transform hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
          >
            {t("cta")}
            <ArrowRight className="size-3.5" />
          </button>
        </form>
      )}
    </div>
  );
}
