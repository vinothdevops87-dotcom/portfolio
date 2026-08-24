"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Send } from "lucide-react";
import { profile } from "@/data/profile";
import { Icon } from "@/components/ui/icons";
import { SocialIconButton, socialEntries } from "@/components/ui/SocialButtons";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Reveal } from "@/components/ui/Reveal";
import type { IconKey } from "@/components/ui/icons";

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY_FORM: FormValues = { name: "", email: "", subject: "", message: "" };

const CONTACT_METHODS: {
  key: string;
  label: string;
  value: string;
  icon: IconKey;
  href?: string;
}[] = [
  {
    key: "email",
    label: "Email",
    value: profile.email,
    icon: "mail",
    href: `mailto:${profile.email}`,
  },
  {
    key: "location",
    label: "Location",
    value: profile.location,
    icon: "pin",
  },
];

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (values.subject.trim().length < 3) {
    errors.subject = "Please add a short subject.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Please write at least a few words about your opportunity or question.";
  }

  return errors;
}

const inputClass = (hasError: boolean) =>
  `w-full rounded-lg border bg-white/[0.04] px-3.5 py-2.5 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:bg-white/[0.06] focus:ring-2 ${
    hasError
      ? "border-red-400/50 focus:border-red-400/60 focus:ring-red-400/15"
      : "border-white/10 focus:border-cyan-300/50 focus:ring-cyan-400/15"
  }`;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
      <AlertTriangle className="size-3" aria-hidden="true" />
      {message}
    </p>
  );
}

export function Contact() {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const update =
    (field: keyof FormValues) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setValues((previous) => ({ ...previous, [field]: event.target.value }));
      if (errors[field]) {
        setErrors((previous) => ({ ...previous, [field]: undefined }));
      }
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus("sending");

    const subject = encodeURIComponent(`[Portfolio] ${values.subject.trim()}`);
    const body = encodeURIComponent(
      `${values.message.trim()}\n\n—\n${values.name.trim()} (${values.email.trim()})`,
    );

    // The portfolio is static — compose the message in the visitor's mail client.
    window.setTimeout(() => {
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
    }, 600);
  };

  return (
    <section id="contact" className="scroll-mt-20 py-24" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — intro + channels */}
          <div>
            <Reveal>
              <h2 id="contact-heading" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Get In Touch
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-zinc-400">
                Have a DevOps, cloud infrastructure, automation, or platform engineering
                opportunity? Let&apos;s connect.
              </p>
            </Reveal>

            <div className="mt-8 space-y-3">
              {CONTACT_METHODS.map((method, index) => {
                const content = (
                  <>
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-cyan-300">
                      <Icon name={method.icon} className="size-4.5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                        {method.label}
                      </span>
                      <span className="block truncate text-sm text-zinc-200">{method.value}</span>
                    </span>
                  </>
                );

                return method.href ? (
                  <Reveal key={method.key} delay={index * 0.06}>
                    <a
                      href={method.href}
                      className="glass flex items-center gap-3.5 rounded-xl px-4 py-3 transition-colors hover:border-cyan-300/30"
                    >
                      {content}
                    </a>
                  </Reveal>
                ) : (
                  <Reveal key={method.key} delay={index * 0.06}>
                    <div className="glass flex items-center gap-3.5 rounded-xl px-4 py-3">
                      {content}
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.15}>
              <div className="mt-6 flex items-center gap-2.5">
                {socialEntries().map((network) => (
                  <SocialIconButton key={network} network={network} />
                ))}
              </div>
              <p className="mt-4 font-mono text-[11px] text-zinc-600">
                {"$ echo \"response time: usually within 24-48h\""}
              </p>
            </Reveal>
          </div>

          {/* Right — form */}
          <Reveal delay={0.1}>
            <SpotlightCard className="glass relative overflow-hidden rounded-2xl p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  >
                    <span className="grid size-14 place-items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                      <CheckCircle2 className="size-7" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold text-white">Message ready</h3>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-400">
                      Your email client should open with the message pre-filled. If it did not,
                      reach me directly at{" "}
                      <a
                        href={`mailto:${profile.email}`}
                        className="text-cyan-300 underline decoration-cyan-300/40 underline-offset-2"
                      >
                        {profile.email}
                      </a>
                      .
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setValues(EMPTY_FORM);
                        setStatus("idle");
                      }}
                      className="mt-6 rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-zinc-200 transition hover:border-cyan-300/40 hover:text-cyan-100"
                    >
                      Write another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    noValidate
                    aria-label="Contact form"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium text-zinc-300">
                          Name
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Jane Doe"
                          value={values.name}
                          onChange={update("name")}
                          aria-invalid={Boolean(errors.name)}
                          className={inputClass(Boolean(errors.name))}
                        />
                        <FieldError message={errors.name} />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium text-zinc-300">
                          Email
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="jane@company.com"
                          value={values.email}
                          onChange={update("email")}
                          aria-invalid={Boolean(errors.email)}
                          className={inputClass(Boolean(errors.email))}
                        />
                        <FieldError message={errors.email} />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-medium text-zinc-300">
                        Subject
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        placeholder="DevOps / Platform Engineering role"
                        value={values.subject}
                        onChange={update("subject")}
                        aria-invalid={Boolean(errors.subject)}
                        className={inputClass(Boolean(errors.subject))}
                      />
                      <FieldError message={errors.subject} />
                    </div>

                    <div className="mt-4">
                      <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium text-zinc-300">
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={6}
                        placeholder="Tell me about the team, stack, and what you are building…"
                        value={values.message}
                        onChange={update("message")}
                        aria-invalid={Boolean(errors.message)}
                        className={`${inputClass(Boolean(errors.message))} resize-y`}
                      />
                      <FieldError message={errors.message} />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="btn-shine mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                    >
                      <Send className="size-4" aria-hidden="true" />
                      {status === "sending" ? "Opening email client…" : "Send Message"}
                    </button>

                    <p className="mt-3 text-center text-[11px] text-zinc-600">
                      This form composes an email in your mail app — no data is stored.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
