"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { site, socials } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-lg border border-line bg-void px-4 py-3 font-sans text-sm text-bone placeholder:text-muted transition-colors duration-300 focus:border-accent focus:outline-none";

const labelClasses =
  "mb-1.5 block font-mono text-[0.58rem] uppercase tracking-[0.22em] text-fog";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", company: "" },
  });

  const onSubmit = async (values: ContactInput) => {
    setStatus("submitting");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (res.ok && data.ok) {
        setStatus("success");
        reset();
      } else {
        setServerError(data.error ?? "Could not send the message.");
        setStatus("error");
      }
    } catch {
      setServerError("Network error — please check your connection and retry.");
      setStatus("error");
    }
  };

  const linkedin = socials.find((s) => s.label === "LinkedIn");

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative scroll-mt-20 overflow-hidden border-t border-line bg-charcoal py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="blueprint-grid pointer-events-none absolute inset-0 opacity-30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/2 size-[38rem] -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(245,197,24,0.055) 0%, transparent 65%)" }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
        {/* ── Left: invitation ─────────────────────────────── */}
        <div className="flex flex-col justify-center lg:col-span-5">
          <SectionHeading
            code="SEC.06 — Open Channel"
            className="mb-6"
            title={
              <>
                Let&apos;s build
                <br />
                something
                <br />
                <span className="text-accent">meaningful.</span>
              </>
            }
          />
          <p className="max-w-sm leading-relaxed text-fog">
            Have an idea, an opportunity or a project worth exploring?
            Let&apos;s talk.
          </p>

          <ul className="mt-8 space-y-4 font-mono text-[0.72rem] uppercase tracking-[0.14em]">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="group flex items-center gap-3 text-fog transition-colors hover:text-accent"
              >
                <Mail className="size-4 shrink-0 text-accent" aria-hidden />
                {site.email}
                <ArrowRight className="size-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" aria-hidden />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Simidaniels"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 text-fog transition-colors hover:text-accent"
              >
                <GithubIcon size={16} className="shrink-0 text-accent" aria-hidden />
                github.com/Simidaniels
                <ArrowRight className="size-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" aria-hidden />
              </a>
            </li>
            <li className="flex items-center gap-3 text-muted">
              <LinkedinIcon size={16} className="shrink-0 text-accent" aria-hidden />
              {linkedin?.href ? "LinkedIn" : "LinkedIn — link pending verification"}
            </li>
            <li className="flex items-center gap-3 text-muted">
              <MapPin className="size-4 shrink-0 text-accent" aria-hidden />
              {site.location}
            </li>
          </ul>
        </div>

        {/* ── Right: form ──────────────────────────────────── */}
        <div className="lg:col-span-7">
          <div className="border border-line bg-void p-6 sm:p-8">
            {status === "success" ? (
              <div
                role="status"
                aria-live="polite"
                className="flex min-h-[26rem] flex-col items-center justify-center text-center"
              >
                <span className="flex size-16 items-center justify-center rounded-full border border-accent/40 bg-accent-soft">
                  <CheckCircle2 className="size-8 text-accent" aria-hidden />
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold uppercase tracking-tight text-bone">
                  Message received.
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-fog">
                  Thanks for reaching out — I read everything and reply
                  personally, usually within a day or two.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-accent underline-offset-4 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Honeypot — invisible to humans */}
                <div aria-hidden className="absolute left-[-9999px] top-[-9999px]">
                  <label>
                    Company
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      {...register("company")}
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className={labelClasses}>
                      Full name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Daniel Adepitan"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "err-name" : undefined}
                      className={cn(inputClasses, errors.name && "border-[#ff8a80]")}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p id="err-name" role="alert" className="mt-1.5 text-xs text-[#ff8a80]">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={labelClasses}>
                      Email address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "err-email" : undefined}
                      className={cn(inputClasses, errors.email && "border-[#ff8a80]")}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p id="err-email" role="alert" className="mt-1.5 text-xs text-[#ff8a80]">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="contact-subject" className={labelClasses}>
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="A product worth building"
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? "err-subject" : undefined}
                    className={cn(inputClasses, errors.subject && "border-[#ff8a80]")}
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <p id="err-subject" role="alert" className="mt-1.5 text-xs text-[#ff8a80]">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div className="mt-4">
                  <label htmlFor="contact-message" className={labelClasses}>
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Tell me about the idea, the opportunity or the problem worth solving…"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "err-message" : undefined}
                    className={cn(inputClasses, "resize-y", errors.message && "border-[#ff8a80]")}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p id="err-message" role="alert" className="mt-1.5 text-xs text-[#ff8a80]">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {status === "error" && (
                  <p
                    role="alert"
                    className="mt-4 border border-[#ff8a80]/40 bg-[#ff8a80]/10 px-4 py-3 text-sm text-[#ffb3ab]"
                  >
                    {serverError}{" "}
                    <a href={`mailto:${site.email}`} className="underline underline-offset-2">
                      Email me directly
                    </a>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-void transition-all duration-300 hover:bg-accent-hi disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {status === "submitting" ? (
                    <>
                      Transmitting
                      <Loader2 className="size-4 animate-spin" aria-hidden />
                    </>
                  ) : (
                    <>
                      Transmit message
                      <Send className="size-4" aria-hidden />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
