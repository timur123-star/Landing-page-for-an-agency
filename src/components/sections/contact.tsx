"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Copy,
  Loader2,
  Mail,
  Send,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedText } from "@/components/motion/animated-text";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";
import { createContactSchema, type ContactInput } from "@/lib/contact";

export function Contact() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = React.useState(false);

  const benefits = t.raw("benefits") as string[];
  const budgetOptions = t.raw("form.budgetOptions") as string[];
  const nextSteps = t.raw("nextSteps") as { title: string; description: string }[];

  const schema = React.useMemo(
    () =>
      createContactSchema({
        name: t("validation.name"),
        emailRequired: t("validation.emailRequired"),
        emailFormat: t("validation.emailFormat"),
        messageMin: t("validation.messageMin"),
      }),
    [t],
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      budget: "",
      message: "",
    },
  });

  const selectedBudget = watch("budget");
  const messageValue = watch("message") ?? "";
  const messageLength = messageValue.length;
  const messageLimit = 800;

  const onSubmit = async (data: ContactInput) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await response.json();

      if (!response.ok || !json.ok) {
        toast.error(t("toasts.error"));
        return;
      }

      setSubmitted(true);
      reset();
      if (json.delivered === false) {
        toast.success(t("toasts.received"));
      } else {
        toast.success(t("toasts.success"));
      }
    } catch (error) {
      console.error(error);
      toast.error(t("toasts.network"));
    }
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 py-20 sm:py-28 lg:py-32"
    >
      <div className="container-wide">
        <div className="gradient-border relative overflow-hidden rounded-3xl border border-border bg-card">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute -left-32 top-1/2 size-[460px] -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -right-32 top-0 size-[460px] rounded-full bg-fuchsia-500/15 blur-3xl" />
            <div className="absolute inset-0 grid-bg opacity-30 mask-radial-faded dark:opacity-20" />
          </div>

          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <Badge variant="primary">{t("badge")}</Badge>
              <AnimatedText
                as="h2"
                text={t("title")}
                highlightClassName="gradient-text"
                highlight={t("title").split(/\s+/)}
                className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-[44px]"
              />
              <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
                {t("subtitle")}
              </p>

              <ul className="mt-8 space-y-3">
                {benefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-sm text-foreground/90"
                  >
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <CheckCircle2 className="size-3" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/40 px-2.5 py-1">
                  <Clock3 className="size-3 text-emerald-400" />
                  {t("badges.response")}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/40 px-2.5 py-1">
                  <ShieldCheck className="size-3 text-primary" />
                  {t("badges.nda")}
                </span>
              </div>

              {nextSteps && nextSteps.length > 0 ? (
                <ol className="mt-8 space-y-3">
                  {nextSteps.map((step, idx) => (
                    <li
                      key={step.title}
                      className="group relative flex items-start gap-4 rounded-2xl border border-border/60 bg-background/30 px-4 py-3 backdrop-blur transition-colors hover:border-primary/30"
                    >
                      <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-[11px] font-semibold tabular-nums text-primary ring-1 ring-primary/20">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          {step.title}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : null}

              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-border/70 bg-background/40 p-4 backdrop-blur">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Mail className="size-4" />
                </span>
                <div className="min-w-0 flex-1 text-sm">
                  <p className="text-muted-foreground">{t("directLabel")}</p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-medium text-foreground hover:text-primary"
                  >
                    {siteConfig.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(siteConfig.email);
                      toast.success(t("toasts.copied"));
                    } catch {
                      toast.error(t("toasts.copyFailed"));
                    }
                  }}
                  className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 text-xs font-medium text-foreground/80 transition-colors hover:border-primary/30 hover:text-foreground"
                  aria-label={t("copyEmail")}
                >
                  <Copy className="size-3.5" />
                  {t("copyEmail")}
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-7">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex h-full flex-col items-center justify-center gap-4 rounded-3xl border border-primary/30 bg-background/40 p-10 text-center backdrop-blur"
                >
                  <span className="inline-flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <CheckCircle2 className="size-7" />
                  </span>
                  <h3 className="font-display text-2xl font-semibold tracking-tight">
                    {t("success.title")}
                  </h3>
                  <p className="max-w-md text-sm text-muted-foreground">
                    {t("success.description")}
                  </p>
                  <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                    <Button asChild variant="ghost">
                      <Link href="/#cases">{t("success.watchCases")}</Link>
                    </Button>
                    <Button onClick={() => setSubmitted(false)}>
                      {t("success.sendAnother")}
                      <ArrowRight className="size-4" />
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="rounded-3xl border border-border/80 bg-background/60 p-6 shadow-sm backdrop-blur sm:p-8"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("form.name")}</Label>
                      <Input
                        id="name"
                        autoComplete="name"
                        placeholder={t("form.namePlaceholder")}
                        aria-invalid={!!errors.name}
                        {...register("name")}
                      />
                      {errors.name ? (
                        <p className="text-xs text-destructive">
                          {errors.name.message}
                        </p>
                      ) : null}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("form.email")}</Label>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder={t("form.emailPlaceholder")}
                        aria-invalid={!!errors.email}
                        {...register("email")}
                      />
                      {errors.email ? (
                        <p className="text-xs text-destructive">
                          {errors.email.message}
                        </p>
                      ) : null}
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="company">{t("form.company")}</Label>
                      <Input
                        id="company"
                        autoComplete="organization"
                        placeholder={t("form.companyPlaceholder")}
                        {...register("company")}
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label>{t("form.budget")}</Label>
                      <div className="flex flex-wrap gap-2">
                        {budgetOptions.map((option) => {
                          const active = selectedBudget === option;
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() =>
                                setValue("budget", active ? "" : option, {
                                  shouldDirty: true,
                                })
                              }
                              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                                active
                                  ? "border-primary/40 bg-primary/15 text-primary"
                                  : "border-border bg-background/40 text-foreground/80 hover:border-primary/30"
                              }`}
                              aria-pressed={active}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                      <input type="hidden" {...register("budget")} />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="message">{t("form.message")}</Label>
                        <span
                          aria-hidden="true"
                          className={`font-mono text-[11px] tabular-nums transition-colors ${
                            messageLength > messageLimit
                              ? "text-destructive"
                              : messageLength > messageLimit * 0.8
                                ? "text-amber-400"
                                : "text-muted-foreground"
                          }`}
                        >
                          {messageLength} / {messageLimit}
                        </span>
                      </div>
                      <Textarea
                        id="message"
                        rows={5}
                        maxLength={messageLimit}
                        placeholder={t("form.messagePlaceholder")}
                        aria-invalid={!!errors.message}
                        {...register("message")}
                      />
                      {errors.message ? (
                        <p className="text-xs text-destructive">
                          {errors.message.message}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-muted-foreground">
                      {t("form.privacyPrefix")}{" "}
                      <Link
                        href="/#"
                        className="text-foreground underline underline-offset-2 hover:text-primary"
                      >
                        {t("form.privacyLink")}
                      </Link>
                      {t("form.privacySuffix")}
                    </p>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="sm:min-w-[200px]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          {t("form.submitting")}
                        </>
                      ) : (
                        <>
                          {t("form.submit")}
                          <Send className="size-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
