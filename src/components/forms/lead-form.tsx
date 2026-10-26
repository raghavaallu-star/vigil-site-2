"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, ArrowRight, CircleCheck, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { formCopy, industryOptions, interestOptions, regionOptions, roleOptions } from "@/content/forms";
import { siteConfig } from "@/config/site";
import { Button, ButtonLink } from "@/components/ui/button";
import { leadSchema, type LeadInput } from "@/lib/validators";
import { cn } from "@/lib/utils";

type Kind = LeadInput["kind"];
type Status = { state: "idle" } | { state: "success" } | { state: "error"; message: string };

const inputBase =
  "mt-1.5 block w-full rounded-[4px] border bg-white px-3.5 py-2.5 text-[0.95rem] text-ink-950 placeholder:text-ink-600 transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-kiln-700";

function Field({
  id,
  label,
  error,
  required,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: FieldError;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink-900">
        {label}
        {required && (
          <span className="text-kiln-700" aria-hidden="true">
            {" "}
            *
          </span>
        )}
        {required && <span className="sr-only"> ({formCopy.required})</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-ink-600">
          {hint}
        </p>
      )}
      {error?.message && (
        <p id={`${id}-error`} className="mt-1 text-sm text-alarm-700" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}

export function LeadForm({ kind }: { kind: Kind }) {
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const openedAt = useRef(Date.now());
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const statusRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: { kind, interests: [], website: "", plants: "", message: "" },
    shouldFocusError: true,
  });

  const onSubmit = async (values: LeadInput) => {
    setStatus({ state: "idle" });
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, kind, elapsedMs: Date.now() - openedAt.current }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: Record<string, string[]> };
      if (res.ok && data.ok) {
        setStatus({ state: "success" });
        requestAnimationFrame(() => statusRef.current?.focus());
        return;
      }
      if (res.status === 422 && data.fields) {
        for (const [k, msgs] of Object.entries(data.fields)) setError(k as keyof LeadInput, { message: msgs?.[0] });
        setStatus({ state: "error", message: formCopy.errors.fix });
      } else if (res.status === 429) {
        setStatus({ state: "error", message: formCopy.errors.rateLimited });
      } else {
        setStatus({ state: "error", message: formCopy.errors.generic });
      }
    } catch {
      setStatus({ state: "error", message: formCopy.errors.generic });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  if (status.state === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-[var(--radius-card)] border border-signal-700/30 bg-white p-8 outline-none"
      >
        <CircleCheck aria-hidden="true" className="h-10 w-10 text-signal-700" />
        <h2 className="mt-4 font-display text-2xl text-ink-950">{formCopy.success.heading}</h2>
        <p className="mt-2 text-ink-700">{formCopy.success.body}</p>
        <ButtonLink href="/approach" variant="dark" className="mt-6">
          {formCopy.success.cta}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </ButtonLink>
      </div>
    );
  }

  const describedBy = (n: keyof LeadInput, hint = false) => (errors[n] ? `${id(n)}-error` : hint ? `${id(n)}-hint` : undefined);
  const cls = (n: keyof LeadInput) => cn(inputBase, errors[n] ? "border-alarm-500" : "border-ink-950/15 hover:border-ink-950/30");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="card rounded-[var(--radius-card)] p-6 shadow-[0_30px_80px_-40px_rgb(16_21_28/0.4)] sm:p-8"
    >
      <div ref={statusRef} tabIndex={-1} className="outline-none" aria-live="assertive">
        {status.state === "error" && (
          <p className="mb-6 flex items-start gap-2 rounded-[4px] border border-alarm-500/30 bg-alarm-500/5 p-3 text-sm text-alarm-700">
            <AlertTriangle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              {status.message}{" "}
              {status.message === formCopy.errors.generic && (
                <a href={`mailto:${siteConfig.contact.email}`} className="underline">
                  {siteConfig.contact.email}
                </a>
              )}
            </span>
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id("name")} label={formCopy.fields.name} error={errors.name} required>
          <input
            id={id("name")}
            autoComplete="name"
            className={cls("name")}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            {...register("name")}
          />
        </Field>
        <Field id={id("email")} label={formCopy.fields.email} error={errors.email} required>
          <input
            id={id("email")}
            type="email"
            autoComplete="email"
            className={cls("email")}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            {...register("email")}
          />
        </Field>
        <Field id={id("company")} label={formCopy.fields.company} error={errors.company} required>
          <input
            id={id("company")}
            autoComplete="organization"
            className={cls("company")}
            aria-invalid={!!errors.company}
            aria-describedby={describedBy("company")}
            {...register("company")}
          />
        </Field>
        <Field id={id("role")} label={formCopy.fields.role} error={errors.role} required>
          <select
            id={id("role")}
            className={cls("role")}
            aria-invalid={!!errors.role}
            aria-describedby={describedBy("role")}
            defaultValue=""
            {...register("role")}
          >
            <option value="" disabled>
              {formCopy.fields.select}
            </option>
            {roleOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field id={id("industry")} label={formCopy.fields.industry} error={errors.industry} required>
          <select
            id={id("industry")}
            className={cls("industry")}
            aria-invalid={!!errors.industry}
            aria-describedby={describedBy("industry")}
            defaultValue=""
            {...register("industry")}
          >
            <option value="" disabled>
              {formCopy.fields.select}
            </option>
            {industryOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field id={id("region")} label={formCopy.fields.region} error={errors.region} required>
          <select
            id={id("region")}
            className={cls("region")}
            aria-invalid={!!errors.region}
            aria-describedby={describedBy("region")}
            defaultValue=""
            {...register("region")}
          >
            <option value="" disabled>
              {formCopy.fields.select}
            </option>
            {regionOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field id={id("plants")} label={formCopy.fields.plants} error={errors.plants} hint={formCopy.fields.plantsHint}>
          <input id={id("plants")} className={cls("plants")} aria-describedby={describedBy("plants", true)} {...register("plants")} />
        </Field>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-medium text-ink-900">{formCopy.fields.interests}</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {interestOptions.map((o) => (
            <label
              key={o}
              className="cursor-pointer rounded-[3px] border border-ink-950/15 px-3 py-1.5 text-sm text-ink-800 transition-colors has-[:checked]:border-kiln-600 has-[:checked]:bg-kiln-500 has-[:checked]:text-ink-950 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-kiln-700"
            >
              <input type="checkbox" value={o} className="sr-only" {...register("interests")} />
              {o}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <Field
          id={id("message")}
          label={kind === "assessment" ? formCopy.fields.messageAssessment : formCopy.fields.message}
          error={errors.message}
        >
          <textarea
            id={id("message")}
            rows={4}
            className={cls("message")}
            aria-invalid={!!errors.message}
            aria-describedby={describedBy("message")}
            {...register("message")}
          />
        </Field>
      </div>

      {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>{formCopy.fields.honeypot}</label>
        <input id={id("website")} tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="mt-6">
        <label className="flex items-start gap-3 text-sm text-ink-700">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 rounded accent-kiln-700"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? `${id("consent")}-error` : undefined}
            {...register("consent")}
          />
          <span>
            {formCopy.fields.consent}{" "}
            <Link href="/privacy" className="text-kiln-700 underline underline-offset-2">
              {formCopy.fields.consentLink}
            </Link>
            .
          </span>
        </label>
        {errors.consent?.message && (
          <p id={`${id("consent")}-error`} className="mt-1 text-sm text-alarm-700" role="alert">
            {errors.consent.message}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="mt-8 w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" />
            {formCopy.submitting}
          </>
        ) : (
          <>
            {formCopy.submit[kind]}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
