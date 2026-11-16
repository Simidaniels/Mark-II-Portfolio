import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

/* Naive per-instance rate limiter: 3 messages per 10 minutes per IP. */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

const escapeHtml = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export async function POST(request: Request) {
  // 1 — Parse
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // 2 — Validate
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { name, email, subject, message, company } = parsed.data;

  // 3 — Honeypot: pretend success, send nothing.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  // 4 — Rate limit
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages — please wait a few minutes." },
      { status: 429 }
    );
  }

  // 5 — Send via Resend (server-side only; key never reaches the client)
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "simidaniels0506@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL ?? "MARK II Portfolio <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not configured");
    return NextResponse.json(
      { ok: false, error: "Email service is not configured yet." },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `MARK II — ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: `
        <div style="font-family:'IBM Plex Mono',monospace;background:#06070a;color:#ece9e2;padding:32px;border-radius:12px">
          <p style="letter-spacing:0.2em;text-transform:uppercase;font-size:11px;color:#f5c518;margin:0 0 16px">MARK II — New message</p>
          <p style="margin:0 0 4px"><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>
          <p style="margin:0 0 16px;color:#b9bcc2;font-size:13px">${escapeHtml(subject)}</p>
          <div style="border-left:2px solid #f5c518;padding-left:16px;white-space:pre-wrap;font-family:'IBM Plex Sans',sans-serif;font-size:14px;line-height:1.6">${escapeHtml(message)}</div>
        </div>`,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Could not send the message. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our side." },
      { status: 500 }
    );
  }
}
