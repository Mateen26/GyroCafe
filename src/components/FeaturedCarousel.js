"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMiniChevronLeft, HiMiniChevronRight } from "react-icons/hi2";

import { Button } from "./Button";
import { Section } from "./Section";

const AUTOPLAY_INTERVAL = 2500;

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
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1.05fr,1.2fr] lg:gap-10 lg:items-center">
        <div className="space-y-4 lg:space-y-8">
          <div className="space-y-4 lg:space-y-6">
            <p className="text-sm lg:text-xl uppercase tracking-[0.4em] text-brand-red">
              Fresh · Local · Halal
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-brand-dark">
              {title}
            </h2>
            <p className="text-sm md:text-base lg:text-lg leading-relaxed text-neutral-600">
              {subtitle}
            </p>
            <motion.div
              key={activeSlide?.id ?? activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl lg:rounded-3xl border border-brand-red/10 bg-brand-red/5 p-4 lg:p-5"
            >
              <p className="text-xs uppercase tracking-wide text-brand-red">
                On the Line
              </p>
              <h3 className="mt-1.5 lg:mt-2 text-base lg:text-lg font-semibold uppercase tracking-wide text-brand-dark">
                {activeSlide?.name}
              </h3>
              {activeSlide?.description ? (
                <p className="mt-1 text-xs lg:text-sm text-neutral-600">
                  {activeSlide.description}
                </p>
              ) : null}
            </motion.div>
          </div>
          {cta ? (
            <Button href={cta.href} variant={cta.variant ?? "outline"} className="w-full sm:w-auto">
              {cta.label}
            </Button>
          ) : null}
        </div>

        <div className="space-y-4 lg:space-y-6">
          {/* Mobile View */}
          <div className="relative overflow-hidden rounded-xl lg:hidden border border-neutral-200 shadow-lg shadow-brand-red/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide?.id ?? activeIndex}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 40,
                }}
                className="relative aspect-[16/10] w-full overflow-hidden"
              >
                <SlideMedia slide={activeSlide} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Desktop View with 3-slide layout */}
          <div className="hidden lg:block">
            <div className="relative flex items-end justify-center gap-6 pb-16 overflow-hidden">
              {desktopSlides.map(({ slide, offset, index }) => {
                if (!slide) return null;
                const isActive = offset === 0;

                return (
                  <motion.div
                    key={slide.id ?? `slide-${index}`}
                    layout
                    animate={{
                      scale: isActive ? 1 : 0.85,
                      opacity: isActive ? 1 : 0.7,
                    }}
                    transition={{
                      layout: {
                        type: "spring",
                        stiffness: 200,
                        damping: 40,
                      },
                      scale: {
                        type: "spring",
                        stiffness: 200,
                        damping: 35,
                      },
                      opacity: {
                        duration: 0.5,
                      },
                    }}
                    className={`${
                      isActive
                        ? "basis-[45%] z-10"
                        : "basis-[27%] z-0"
                    }`}
                  >
                    <motion.div
                      layout
                      animate={{
                        y: isActive ? -8 : 8,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 35,
                      }}
                      className={`relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-2xl ${
                        isActive
                          ? "shadow-brand-red/20"
                          : "shadow-brand-red/10"
                      }`}
                    >
                      <SlideMedia
                        slide={slide}
                        sizes="(min-width: 1280px) 480px, (min-width: 1024px) 360px, 100vw"
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation Controls - Bottom Center */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={handlePrev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 shadow-sm transition hover:border-brand-red hover:bg-brand-red hover:text-white"
                aria-label="Previous featured item"
              >
                <HiMiniChevronLeft className="text-lg" />
              </button>
              <div className="flex items-center gap-2">
                {validSlides.map((slide, index) => (
                  <button
                    key={slide?.id ?? index}
                    type="button"
                    onClick={() => goToSlide(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "w-8 bg-brand-red"
                        : "w-2.5 bg-neutral-300 hover:bg-neutral-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 shadow-sm transition hover:border-brand-red hover:bg-brand-red hover:text-white"
                aria-label="Next featured item"
              >
                <HiMiniChevronRight className="text-lg" />
              </button>
            </div>
          </div>

          {/* Mobile Controls */}
          <CarouselControls
            className="flex justify-center lg:hidden -mt-2"
            slides={validSlides}
            activeIndex={activeIndex}
            onPrev={handlePrev}
            onNext={handleNext}
            onSelect={goToSlide}
            compact
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
  compact = false,
}) {
  if (!slides.length) return null;

  return (
    <div className={`flex items-center ${compact ? "gap-2" : "gap-3"} ${className}`}>
      <button
        type="button"
        onClick={onPrev}
        className={`flex items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition hover:border-brand-red hover:text-brand-red ${
          compact ? "h-9 w-9" : "h-12 w-12"
        }`}
        aria-label="Previous featured item"
      >
        <HiMiniChevronLeft className={compact ? "text-lg" : "text-xl"} />
      </button>
      <div className={`flex items-center ${compact ? "gap-1.5" : "gap-2"}`}>
        {slides.map((slide, index) => (
          <button
            key={slide?.id ?? index}
            type="button"
            onClick={() => onSelect?.(index)}
            className={`rounded-full transition ${
              compact
                ? index === activeIndex
                  ? "h-2 w-6 bg-brand-red"
                  : "h-2 w-2 bg-neutral-200 hover:bg-neutral-300"
                : index === activeIndex
                ? "h-2.5 w-8 bg-brand-red"
                : "h-2.5 w-2.5 bg-neutral-200 hover:bg-neutral-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={onNext}
        className={`flex items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition hover:border-brand-red hover:text-brand-red ${
          compact ? "h-9 w-9" : "h-12 w-12"
        }`}
        aria-label="Next featured item"
      >
        <HiMiniChevronRight className={compact ? "text-lg" : "text-xl"} />
      </button>
    </div>
  );
}
