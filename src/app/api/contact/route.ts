import { NextResponse } from "next/server";
import { Resend } from "resend";

import { contactSchema } from "@/lib/contact";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Некорректное тело запроса" },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Проверьте форму", details: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const { name, email, company, budget, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.CONTACT_INBOX || siteConfig.email;
  const fromAddress = process.env.RESEND_FROM || "NOVA Studio <onboarding@resend.dev>";

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px; max-width: 560px;">
      <h2 style="margin: 0 0 16px; font-size: 20px;">Новая заявка с сайта NOVA</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 6px 0; color: #6b7280;">Имя</td><td><strong>${escapeHtml(name)}</strong></td></tr>
        <tr><td style="padding: 6px 0; color: #6b7280;">E-mail</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        ${company ? `<tr><td style="padding: 6px 0; color: #6b7280;">Компания</td><td>${escapeHtml(company)}</td></tr>` : ""}
        ${budget ? `<tr><td style="padding: 6px 0; color: #6b7280;">Бюджет</td><td>${escapeHtml(budget)}</td></tr>` : ""}
      </table>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
      <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</p>
    </div>
  `;

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] RESEND_API_KEY is not set, logging payload only", {
        name,
        email,
        company,
        budget,
        message,
      });
    }
    return NextResponse.json(
      { ok: true, delivered: false, mode: "log-only" },
      { status: 200 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: inbox,
      replyTo: email,
      subject: `Заявка от ${name}${company ? ` (${company})` : ""}`,
      html,
    });

    if (error) {
      console.error("[contact] Resend error", error);
      return NextResponse.json(
        { ok: false, error: "Не удалось отправить письмо" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] unexpected error", err);
    return NextResponse.json(
      { ok: false, error: "Внутренняя ошибка" },
      { status: 500 },
    );
  }
}
