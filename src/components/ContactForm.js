"use client";

import { useState } from "react";

import { Button } from "./Button";
import { getApiEndpoint } from "@/lib/utils";

const initialState = {
  name: "",
  email: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ state: "idle" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ state: "submitting" });
    try {
      const response = await fetch(getApiEndpoint('contact'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || "Unable to send message. Please try again later."
        );
      }
      
      setStatus({
        state: "success",
        message: "Thanks for reaching out. We'll get back to you soon.",
      });
      setForm(initialState);
    } catch (error) {
      setStatus({
        state: "error",
        message: error.message ?? "Something went wrong. Please call us directly.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <FormTextarea
        label="Message"
        name="message"
        value={form.message}
        onChange={handleChange}
        required
      />

      {status.state === "error" ? (
        <p className="rounded-2xl border border-brand-red/30 bg-brand-red/10 px-4 py-3 text-sm font-semibold text-brand-red">
          {status.message}
        </p>
      ) : null}
      {status.state === "success" ? (
        <p className="rounded-2xl border border-emerald-400/40 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-600">
          {status.message}
        </p>
      ) : null}

      <Button
        type="submit"
        className="w-full justify-center md:w-auto"
        disabled={status.state === "submitting"}
      >
        {status.state === "submitting" ? (
          <>
            <svg
              className="h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}

function FormField({ label, required, className = "", ...props }) {
  return (
    <label className={`space-y-2 text-sm font-semibold uppercase tracking-wide text-neutral-500 ${className}`}>
      <span>
        {label}
        {required ? <span className="text-brand-red"> *</span> : null}
      </span>
      <input
        required={required}
        className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-base font-normal text-brand-dark transition focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
        {...props}
      />
    </label>
  );
}

function FormTextarea({ label, required, className = "", ...props }) {
  return (
    <label className={`space-y-2 text-sm font-semibold uppercase tracking-wide text-neutral-500 ${className}`}>
      <span>
        {label}
        {required ? <span className="text-brand-red"> *</span> : null}
      </span>
      <textarea
        rows={6}
        required={required}
        className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-base font-normal text-brand-dark transition focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
        {...props}
      />
    </label>
  );
}

