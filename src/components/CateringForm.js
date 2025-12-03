"use client";

import { useState } from "react";

import { Button } from "./Button";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  location: "",
  service: "pickup",
  guests: "",
  eventType: "corporate",
  isPublic: "private",
  message: "",
  consent: false,
};

export function CateringForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ state: "idle" });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const formatDate = (dateString) => {
    // Convert YYYY-MM-DD to DD/MM/YYYY
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const capitalizeFirst = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.consent) {
      setStatus({ state: "error", message: "Please acknowledge the consent checkbox." });
      return;
    }
    setStatus({ state: "submitting" });
    try {
      // Map form fields to API payload structure
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phoneNumber: form.phone,
        eventDate: formatDate(form.date),
        eventTime: form.time, // Already in HH:mm format
        eventLocation: form.location,
        numberOfGuests: parseInt(form.guests, 10),
        deliveryOrPickup: capitalizeFirst(form.service),
        eventType: capitalizeFirst(form.eventType),
        publicOrPrivate: capitalizeFirst(form.isPublic),
        eventDetails: form.message,
        acknowledge: form.consent,
      };

      const response = await fetch("/api/payment/catering-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || "Unable to send request. Please try again."
        );
      }

      setStatus({
        state: "success",
        message:
          "Request received! Our catering team will reach out within 24 hours.",
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          label="First Name"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <FormField
          label="Last Name"
          name="lastName"
          value={form.lastName}
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
        <FormField
          label="Phone Number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <FormField
          label="Event Date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <FormField
          label="Event Time"
          name="time"
          type="time"
          value={form.time}
          onChange={handleChange}
          required
        />
        <FormField
          label="Event Location"
          name="location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <FormField
          label="Number of Guests"
          name="guests"
          type="number"
          min="1"
          value={form.guests}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <FormSelect
          label="Delivery or Pickup"
          name="service"
          value={form.service}
          onChange={handleChange}
          options={[
            { value: "pickup", label: "Pickup" },
            { value: "delivery", label: "Delivery" },
          ]}
        />
        <FormSelect
          label="Event Type"
          name="eventType"
          value={form.eventType}
          onChange={handleChange}
          options={[
            { value: "corporate", label: "Corporate" },
            { value: "wedding", label: "Wedding" },
            { value: "family", label: "Family Gathering" },
            { value: "school", label: "School Event" },
            { value: "other", label: "Other" },
          ]}
        />
        <FormSelect
          label="Public or Private"
          name="isPublic"
          value={form.isPublic}
          onChange={handleChange}
          options={[
            { value: "public", label: "Public" },
            { value: "private", label: "Private" },
          ]}
        />
      </div>

      <FormTextarea
        label="Event Details"
        name="message"
        value={form.message}
        onChange={handleChange}
        required
        placeholder="Tell us what you’re serving, dietary needs, and anything else we should know."
      />

      <label className="flex items-start gap-3 text-sm text-neutral-600">
        <input
          type="checkbox"
          name="consent"
          checked={form.consent}
          onChange={handleChange}
          className="mt-1 h-4 w-4 rounded border-neutral-300 text-brand-red focus:ring-brand-red"
          required
        />
        <span>
          I acknowledge that submitting this request does not confirm my order.
          Gyro Cafe will follow up to confirm availability and pricing.
        </span>
      </label>

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
            Submitting...
          </>
        ) : (
          "Submit Catering Request"
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

function FormSelect({ label, options, className = "", ...props }) {
  return (
    <label className={`space-y-2 text-sm font-semibold uppercase tracking-wide text-neutral-500 ${className}`}>
      <span>{label}</span>
      <select
        className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-base font-normal text-brand-dark transition focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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
        rows={5}
        required={required}
        className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-base font-normal text-brand-dark transition focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
        {...props}
      />
    </label>
  );
}

