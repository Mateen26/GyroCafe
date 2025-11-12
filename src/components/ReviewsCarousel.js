"use client";

import { useEffect, useMemo, useState } from "react";
import { FaStar } from "react-icons/fa";
import { HiMiniChevronLeft, HiMiniChevronRight } from "react-icons/hi2";

import { Button } from "./Button";
import { Section } from "./Section";

const AUTOPLAY_INTERVAL = 7000;

export function ReviewsCarousel({
  reviews = [],
  summary,
  cta,
  background = "red",
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = useMemo(() => reviews.filter(Boolean), [reviews]);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % items.length);
    }, AUTOPLAY_INTERVAL);
    return () => window.clearInterval(timer);
  }, [items.length]);

  if (!items.length) return null;

  const active = items[activeIndex];

  return (
    <Section background={background}>
      <div className="grid gap-10 lg:grid-cols-[1fr,1.2fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.4em]">
            Our Community Speaks
          </p>
          <h2 className="text-3xl font-bold uppercase tracking-tight md:text-4xl">
            Loved in Brooklyn
          </h2>
          {summary ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-2xl font-extrabold">
                <span>{summary.rating.toFixed(1)}</span>
                <Stars count={5} />
              </div>
              <p className="text-sm font-semibold uppercase tracking-wide opacity-80">
                {summary.count}+ reviews across{" "}
                {summary.platforms?.slice(0, 3).join(", ")}
              </p>
            </div>
          ) : null}
          {cta ? (
            <Button
              href={cta.href}
              external={cta.external}
              variant={cta.variant ?? "light"}
            >
              {cta.label}
            </Button>
          ) : null}
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-lg backdrop-blur md:p-8">
            <div className="flex items-center gap-3 text-brand-red">
              <Stars count={active.rating} />
              <span className="text-xs font-semibold uppercase tracking-wide text-white/80">
                {active.platform}
              </span>
            </div>
            <blockquote className="mt-4 text-lg font-semibold text-white">
              “{active.quote}”
            </blockquote>
            <footer className="mt-6 text-sm text-white/70">
              <span className="font-semibold uppercase tracking-wide text-white">
                {active.name}
              </span>{" "}
              · {active.date}
            </footer>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                setActiveIndex((index) =>
                  (index - 1 + items.length) % items.length
                )
              }
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-white hover:bg-white/10"
              aria-label="Previous review"
            >
              <HiMiniChevronLeft className="text-xl" />
            </button>
            <div className="flex items-center gap-2">
              {items.map((review, index) => (
                <button
                  key={review.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 w-6 rounded-full transition ${
                    index === activeIndex ? "bg-white" : "bg-white/30"
                  }`}
                  aria-label={`Show review ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                setActiveIndex((index) => (index + 1) % items.length)
              }
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-white hover:bg-white/10"
              aria-label="Next review"
            >
              <HiMiniChevronRight className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Stars({ count = 5 }) {
  return (
    <div className="flex items-center gap-1 text-brand-red">
      {Array.from({ length: Math.round(count) }).map((_, index) => (
        <FaStar key={index} />
      ))}
    </div>
  );
}

