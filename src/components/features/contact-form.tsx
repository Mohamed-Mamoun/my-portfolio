"use client";

import { cloneElement, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ENDPOINT = "https://formspree.io/f/mlgowzqe";

type Status = "idle" | "sending" | "sent";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const inputClass = cn(
  "w-full rounded-md border border-default bg-surface-base px-3.5 py-2.5 text-body-sm text-primary",
  "transition-[border-color,box-shadow] duration-150",
  "placeholder:text-tertiary",
  "focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-subtle",
  "aria-[invalid=true]:border-danger",
);

export function ContactForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [failure, setFailure] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot — the previous form posted straight to Formspree with no
    // spam protection at all.
    if (data.get("company")) return;

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "Please tell me your name.";
    if (!email) nextErrors.email = "I need an email address to reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "That doesn't look like a valid email address.";
    }
    if (!message) nextErrors.message = "Please add a message.";

    setErrors(nextErrors);
    setFailure("");
    if (Object.keys(nextErrors).length > 0) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!response.ok) throw new Error("Request failed");
      // The confirmation persists — it doesn't self-destruct after 4s.
      setStatus("sent");
    } catch {
      setFailure("Something went wrong sending that. Email me directly instead?");
      setStatus("idle");
    }
  };

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-xl border border-subtle bg-surface-raised p-8 text-center edge-highlight"
      >
        <span
          aria-hidden="true"
          className="mx-auto grid size-12 place-items-center rounded-full bg-success-subtle text-success"
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 13 4 4L19 7" />
          </svg>
        </span>
        <h2 className="mt-5 text-heading-md">Message sent</h2>
        <p className="mt-2 text-body-sm text-secondary">
          Thanks for reaching out — I&rsquo;ll reply within two working days.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-subtle bg-surface-raised p-6 sm:p-8 edge-highlight"
    >
      <h2 className="text-heading-md">Send a message</h2>

      <div className="mt-6 flex flex-col gap-5">
        <Field id={`${id}-name`} label="Name" error={errors.name}>
          <input name="name" autoComplete="name" placeholder="Your name" className={inputClass} />
        </Field>

        <Field id={`${id}-email`} label="Email" error={errors.email}>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
          />
        </Field>

        <Field id={`${id}-message`} label="Message" error={errors.message}>
          <textarea
            name="message"
            rows={5}
            placeholder="What are you working on?"
            className={cn(inputClass, "resize-y")}
          />
        </Field>

        {/* Honeypot: off-screen, not display:none, and hidden from AT. */}
        <div aria-hidden="true" className="absolute left-[-9999px]">
          <label htmlFor={`${id}-company`}>Company</label>
          <input id={`${id}-company`} name="company" tabIndex={-1} autoComplete="off" />
        </div>

        {failure ? (
          <p role="alert" className="rounded-md border border-danger/30 bg-danger-subtle px-3.5 py-2.5 text-body-sm text-danger">
            {failure}
          </p>
        ) : null}

        <Button type="submit" size="lg" disabled={status === "sending"} className="w-full">
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}

/**
 * Errors are tied to their field with aria-describedby + aria-invalid.
 * The previous form put every error in one shared alert box, so screen
 * reader users heard *that* something was wrong but never *which field*.
 */
function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactElement<React.InputHTMLAttributes<HTMLInputElement>>;
}) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="block text-body-sm font-medium text-primary">
        {label}
      </label>
      <div className="mt-1.5">
        {cloneElement(children, {
          id,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": error ? errorId : undefined,
        })}
      </div>
      {error ? (
        <p id={errorId} className="mt-1.5 text-caption text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
