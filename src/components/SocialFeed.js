"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HiMiniArrowsPointingOut, HiMiniPlay, HiMiniPause } from "react-icons/hi2";

import { Section } from "./Section";

export function SocialFeed({
  items = [],
  title = "Fresh from Our Grill · Live from @GyroCafeBK",
  subtitle = "Follow along for nightly specials, fresh drops, and behind-the-grill moments.",
}) {
  if (!items.length) return null;

  // Show exactly 8 video cards
  const gridItems = items.slice(0, 8);
  // Duplicate items multiple times for seamless infinite scroll
  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <Section background="white">
      <div className="space-y-10 py-20">
        <header className="max-w-3xl space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-red">
            Gyro Cafe on the Feed
          </p>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-brand-dark md:text-4xl">
            {title}
          </h2>
          <p className="text-base leading-relaxed text-neutral-600 md:text-lg">
            {subtitle}
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gridItems.slice(0, 6).map((item) => (
            <PostCard key={item.id} item={item} />
          ))}
          {/* Center the last two items in desktop view */}
          {gridItems[6] && (
            <div className="hidden lg:block lg:col-span-3">
              <div className="flex justify-center gap-4">
                <div className="w-full max-w-[calc(33.333%-0.67rem)]">
                  <PostCard item={gridItems[6]} />
                </div>
                {gridItems[7] && (
                  <div className="w-full max-w-[calc(33.333%-0.67rem)]">
                    <PostCard item={gridItems[7]} />
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Mobile view - show last two normally */}
          {gridItems.slice(6).map((item) => (
            <div key={item.id} className="lg:hidden">
              <PostCard item={item} />
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white py-4">
          <div className="flex animate-marquee gap-4">
            {marqueeItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-neutral-100"
              >
                {item.video ? (
                  <video
                    src={item.video}
                    className="h-full w-full object-cover"
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                ) : (
                  <Image
                    src={item.image}
                    alt={item.caption ?? "Gyro Cafe post"}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function PostCard({ item }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
            // Set autoplay attribute for Chrome compatibility
            video.setAttribute("autoplay", "");
            // Try to play programmatically
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  // Autoplay succeeded
                  setAutoplayFailed(false);
                })
                .catch((error) => {
                  // Autoplay failed - show play button overlay
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

    // Hide loader when video actually starts playing
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

  const handlePlayPause = async (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    try {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        await videoRef.current.play();
        setAutoplayFailed(false);
      }
    } catch (error) {
      console.warn("Play failed:", error);
      setAutoplayFailed(true);
    }
  };

  const handleFullscreen = async (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    try {
      if (videoRef.current.requestFullscreen) {
        await videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        await videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        await videoRef.current.msRequestFullscreen();
      }
    } catch (error) {
      console.warn("Fullscreen not available:", error);
    }
  };

  return (
    <article
      ref={containerRef}
      className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
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
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-200">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-red border-t-transparent" />
          </div>
        )}
        {(autoplayFailed || (!isPlaying && !isLoading)) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <button
              onClick={handlePlayPause}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-brand-red shadow-lg backdrop-blur-sm transition hover:bg-white hover:scale-110"
              aria-label="Play video"
            >
              <HiMiniPlay className="ml-1 text-2xl" />
            </button>
          </div>
        )}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-300 ${
            isHovered && isPlaying ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={handlePlayPause}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-brand-red shadow-lg backdrop-blur-sm transition hover:bg-white hover:scale-110"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <HiMiniPause className="text-xl" />
            ) : (
              <HiMiniPlay className="ml-1 text-xl" />
            )}
          </button>
          <button
            onClick={handleFullscreen}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-brand-red shadow-lg backdrop-blur-sm transition hover:bg-white hover:scale-110"
            aria-label="Fullscreen"
          >
            <HiMiniArrowsPointingOut className="text-xl" />
          </button>
        </div>
      </div>
      <div className="space-y-3 border-t border-neutral-100 p-5">
        <p className="text-sm font-semibold text-brand-dark">
          {item.caption}
        </p>
        <a
          href="https://instagram.com/gyrocafebk"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-red transition hover:text-black"
        >
          View on Instagram →
        </a>
      </div>
    </article>
  );
}
