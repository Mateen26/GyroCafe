"use client";

import { useEffect, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

export function FeaturedVideoSlider({ items = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 640) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, items.length - itemsPerView);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  const goPrev = () => {
    if (canGoPrev) {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const goNext = () => {
    if (canGoNext) {
      setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    }
  };

  if (!items.length) return null;

  return (
    <section className="bg-black py-20 mt-10 sm:mt-40">
      <div className="mx-auto max-w-[150rem] px-4 sm:px-6 lg:px-16">
        <div className="relative">
          {/* Slider Container */}
          <div
            ref={containerRef}
            className="overflow-hidden rounded-3xl"
          >
            <motion.div
              className="flex gap-4"
              animate={{
                x: `-${currentIndex * (100 / itemsPerView)}%`,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  className="shrink-0"
                  style={{
                    width: `${100 / itemsPerView}%`,
                  }}
                >
                  <VideoCard item={item} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          {items.length > itemsPerView && (
            <>
              <button
                onClick={goPrev}
                disabled={!canGoPrev}
                className={`absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 text-black shadow-lg transition hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed ${
                  !canGoPrev ? "cursor-not-allowed" : ""
                }`}
                aria-label="Previous video"
              >
                <HiChevronLeft className="text-2xl" />
              </button>
              <button
                onClick={goNext}
                disabled={!canGoNext}
                className={`absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 text-black shadow-lg transition hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed ${
                  !canGoNext ? "cursor-not-allowed" : ""
                }`}
                aria-label="Next video"
              >
                <HiChevronRight className="text-2xl" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {items.length > itemsPerView && (
            <div className="mt-6 flex justify-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition ${
                    index === currentIndex
                      ? "w-8 bg-white"
                      : "w-2 bg-white/40"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function VideoCard({ item }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [autoplayFailed, setAutoplayFailed] = useState(false);

  useEffect(() => {
    if (!item.video || !videoRef.current) return;

    const video = videoRef.current;
    const container = containerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.setAttribute("autoplay", "");
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  setAutoplayFailed(false);
                })
                .catch((error) => {
                  setAutoplayFailed(true);
                  setIsLoading(false);
                });
            }
          } else {
            video.pause();
            setIsPlaying(false);
            video.removeAttribute("autoplay");
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "50px",
      }
    );

    if (container) {
      observer.observe(container);
    }

    const handlePlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
      setAutoplayFailed(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setAutoplayFailed(true);
    };

    video.addEventListener("playing", handlePlaying);
    video.addEventListener("pause", handlePause);
    video.addEventListener("error", handleError);

    return () => {
      if (container) {
        observer.unobserve(container);
      }
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("error", handleError);
    };
  }, [item.video]);

  return (
    <article
      ref={containerRef}
      className="group relative overflow-hidden rounded-2xl bg-neutral-900"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <video
          ref={videoRef}
          src={item.video}
          className="h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-800">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
        )}
        {autoplayFailed && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <button
              onClick={() => videoRef.current?.play()}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition hover:bg-white hover:scale-110"
              aria-label="Play video"
            >
              <svg
                className="ml-1 h-8 w-8"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        )}
      </div>
      {item.caption && (
        <div className="border-t border-neutral-800 bg-black p-5">
          <p className="text-sm font-semibold text-white">
            {item.caption}
          </p>
        </div>
      )}
    </article>
  );
}

