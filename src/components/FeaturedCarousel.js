"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { HiMiniChevronLeft, HiMiniChevronRight } from "react-icons/hi2";

import { Button } from "./Button";
import { Section } from "./Section";

const AUTOPLAY_INTERVAL = 4500;

export function FeaturedCarousel({
  slides = [],
  title = "Featured from the Grill",
  subtitle = "Fresh off the line — served hot, stacked high, and SAÜCED.",
  cta,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const validSlides = useMemo(() => slides.filter(Boolean), [slides]);
  const totalSlides = validSlides.length;

  useEffect(() => {
    if (totalSlides <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % totalSlides);
    }, AUTOPLAY_INTERVAL);
    return () => window.clearInterval(timer);
  }, [totalSlides]);

  const goToSlide = (index) => {
    if (!totalSlides) return;
    setActiveIndex((index + totalSlides) % totalSlides);
  };

  if (!totalSlides) return null;

  const activeSlide = validSlides[activeIndex];

  const slideAtOffset = (offset) => {
    if (!totalSlides) return null;
    const nextIndex = (activeIndex + offset + totalSlides) % totalSlides;
    return {
      slide: validSlides[nextIndex],
      index: nextIndex,
      offset,
    };
  };

  const desktopSlides = [-1, 0, 1].map((offset) => slideAtOffset(offset));

  const handlePrev = () => goToSlide(activeIndex - 1);
  const handleNext = () => goToSlide(activeIndex + 1);

  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[1.05fr,1.2fr] lg:items-center">
        <div className="space-y-8">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-brand-red">
              Fresh · Local · Halal
            </p>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-brand-dark md:text-4xl">
              {title}
            </h2>
            <p className="text-base leading-relaxed text-neutral-600 md:text-lg">
              {subtitle}
            </p>
            <div
              key={activeSlide?.id ?? activeIndex}
              className="rounded-3xl border border-brand-red/10 bg-brand-red/5 p-5 transition duration-500"
            >
              <p className="text-xs uppercase tracking-wide text-brand-red">
                On the Line
              </p>
              <h3 className="mt-2 text-lg font-semibold uppercase tracking-wide text-brand-dark">
                {activeSlide?.name}
              </h3>
              {activeSlide?.description ? (
                <p className="text-sm text-neutral-600">
                  {activeSlide.description}
                </p>
              ) : null}
            </div>
          </div>
          {cta ? (
            <Button href={cta.href} variant={cta.variant ?? "outline"}>
              {cta.label}
            </Button>
          ) : null}
          <CarouselControls
            className="hidden lg:flex"
            slides={validSlides}
            activeIndex={activeIndex}
            onPrev={handlePrev}
            onNext={handleNext}
            onSelect={goToSlide}
          />
        </div>

        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-neutral-200 shadow-xl shadow-brand-red/10 lg:hidden">
            <div
              key={activeSlide?.id ?? activeIndex}
              className="relative aspect-[4/3] w-full overflow-hidden"
            >
              <SlideMedia slide={activeSlide} />
            </div>
          </div>

          <div className="hidden lg:flex items-end justify-center gap-6">
            {desktopSlides.map(({ slide, offset, index }) => {
              if (!slide) return null;
              const isActive = offset === 0;
              return (
                <div
                  key={`${slide.id ?? index}-${offset}`}
                  className={`transition-all duration-500 ease-out ${
                    isActive
                      ? "basis-[45%] scale-100 opacity-100"
                      : "basis-[27%] scale-95 opacity-75"
                  }`}
                >
                  <div
                    className={`relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-2xl transition-all duration-500 ${
                      isActive
                        ? "shadow-brand-red/20 -translate-y-2"
                        : "shadow-brand-red/10 translate-y-2"
                    }`}
                  >
                    <SlideMedia
                      slide={slide}
                      sizes="(min-width: 1280px) 480px, (min-width: 1024px) 360px, 100vw"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <CarouselControls
            className="flex justify-start lg:hidden"
            slides={validSlides}
            activeIndex={activeIndex}
            onPrev={handlePrev}
            onNext={handleNext}
            onSelect={goToSlide}
          />
        </div>
      </div>
    </Section>
  );
}

function SlideMedia({
  slide,
  sizes = "(min-width: 1024px) 480px, 100vw",
  className = "",
}) {
  if (!slide) return null;

  if (slide?.type === "video") {
    return (
      <video
        src={slide.src}
        autoPlay
        muted
        loop
        playsInline
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <Image
      src={slide.image}
      alt={slide.name ?? "Featured item"}
      fill
      className={`object-cover ${className}`}
      sizes={sizes}
      priority={slide.priority ?? false}
    />
  );
}

function CarouselControls({
  className = "",
  slides = [],
  activeIndex = 0,
  onPrev,
  onNext,
  onSelect,
}) {
  if (!slides.length) return null;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        type="button"
        onClick={onPrev}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition hover:border-brand-red hover:text-brand-red"
        aria-label="Previous featured item"
      >
        <HiMiniChevronLeft className="text-xl" />
      </button>
      <button
        type="button"
        onClick={onNext}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition hover:border-brand-red hover:text-brand-red"
        aria-label="Next featured item"
      >
        <HiMiniChevronRight className="text-xl" />
      </button>
      <div className="flex items-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide?.id ?? index}
            type="button"
            onClick={() => onSelect?.(index)}
            className={`h-2.5 w-6 rounded-full transition ${
              index === activeIndex
                ? "bg-brand-red"
                : "bg-neutral-200 hover:bg-neutral-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

