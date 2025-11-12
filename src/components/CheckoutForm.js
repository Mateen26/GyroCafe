"use client";

import { useState } from "react";

import { Button } from "./Button";

const pickupWindows = ["ASAP", "In 15 minutes", "In 30 minutes", "Schedule"];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  pickupTime: pickupWindows[0],
  notes: "",
  paymentMethod: "pay_in_store",
};

export function CheckoutForm({
  defaultValues = {},
  onSubmit,
  isSubmitting = false,
  total,
  subtotal,
  promotion,
}) {
  const [form, setForm] = useState({ ...initialForm, ...defaultValues });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!form.phone.trim()) nextErrors.phone = "Mobile number is required.";
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    await onSubmit?.(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your full name"
          error={errors.name}
          required
        />
        <FormField
          label="Mobile Number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Where we can reach you"
          error={errors.phone}
          required
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Email (optional)"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="For receipt & updates"
        />
        <FormSelect
          label="Pickup Time"
          name="pickupTime"
          value={form.pickupTime}
          onChange={handleChange}
          options={pickupWindows}
        />
      </div>
      <FormTextarea
        label="Notes"
        name="notes"
        value={form.notes}
        onChange={handleChange}
        placeholder="Sauce on the side? Extra napkins?"
      />

      <fieldset className="space-y-3 rounded-3xl border border-neutral-200 p-4">
        <legend className="px-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Payment Method
        </legend>
        {[
          { value: "pay_online", label: "Pay Online (Card via Stripe)" },
          { value: "pay_in_store", label: "Pay In-Store (Cash or Card)" },
        ].map((option) => (
          <label
            key={option.value}
            className={`flex cursor-pointer items-start gap-3 rounded-2xl border border-neutral-200 p-3 transition ${
              form.paymentMethod === option.value
                ? "border-brand-red bg-brand-red/5"
                : "hover:border-brand-red/40"
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={option.value}
              checked={form.paymentMethod === option.value}
              onChange={handleChange}
              className="mt-1 h-4 w-4"
            />
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-dark">
              {option.label}
            </span>
          </label>
        ))}
      </fieldset>

      <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Order Summary
        </h3>
        <div className="mt-4 space-y-2 text-sm text-neutral-600">
          <SummaryLine label="Subtotal" value={subtotal} />
          {promotion?.discount ? (
            <SummaryLine
              label={promotion.label ?? "Promotion"}
              value={-promotion.discount}
              highlight
            />
          ) : null}
          <SummaryLine label="Total" value={total} bold />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full justify-center"
        disabled={isSubmitting}
      >
        {form.paymentMethod === "pay_online"
          ? "Continue to Secure Payment"
          : "Place Pickup Order"}
      </Button>
    </form>
  );
}

function FormField({
  label,
  name,
  error,
  required,
  className = "",
  ...props
}) {
  return (
    <label className={`space-y-2 text-sm font-semibold uppercase tracking-wide ${className}`}>
      <span className="text-neutral-500">
        {label}
        {required ? <span className="text-brand-red"> *</span> : null}
      </span>
      <input
        name={name}
        required={required}
        className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-base font-normal text-brand-dark transition focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
        {...props}
      />
      {error ? (
        <span className="block text-xs font-semibold uppercase tracking-wide text-brand-red">
          {error}
        </span>
      ) : null}
    </label>
  );
}

function FormSelect({ label, name, options, ...props }) {
  return (
    <label className="space-y-2 text-sm font-semibold uppercase tracking-wide text-neutral-500">
      <span>{label}</span>
      <select
        name={name}
        className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-base font-normal text-brand-dark transition focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function FormTextarea({ label, name, ...props }) {
  return (
    <label className="space-y-2 text-sm font-semibold uppercase tracking-wide text-neutral-500">
      <span>{label}</span>
      <textarea
        name={name}
        rows={4}
        className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-base font-normal text-brand-dark transition focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
        {...props}
      />
    </label>
  );
}

function SummaryLine({ label, value, highlight = false, bold = false }) {
  const formatted =
    typeof value === "number"
      ? (value < 0 ? "- $" : "$") + Math.abs(value).toFixed(2)
      : value;

  return (
    <div
      className={`flex items-center justify-between ${
        highlight ? "text-brand-red" : "text-neutral-700"
      } ${bold ? "font-semibold text-brand-dark" : ""}`}
    >
      <span className="uppercase tracking-wide">{label}</span>
      <span>{formatted}</span>
    </div>
  );
}

