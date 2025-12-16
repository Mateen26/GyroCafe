"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FeaturedVideoSlider({ items = [], collageItems = [] }) {
  // Combine all videos: first item is main, rest go to collage
  const allVideos = [...items, ...collageItems];
  const [mainVideoIndex, setMainVideoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const mainVideoRef = useRef(null);
  const videoRefs = useRef({});

  if (!allVideos.length) return null;

  const mainVideo = allVideos[mainVideoIndex];
  const collageVideos = allVideos.filter((_, index) => index !== mainVideoIndex);

  const handleVideoClick = (clickedIndex) => {
    if (isTransitioning || clickedIndex === mainVideoIndex) return;
    
    setIsTransitioning(true);
    
    // Pause current main video
    if (mainVideoRef.current) {
      mainVideoRef.current.pause();
      mainVideoRef.current.currentTime = 0;
    }

    // Pause the clicked video if it's playing in collage
    const clickedVideoRef = videoRefs.current[allVideos[clickedIndex].id];
    if (clickedVideoRef) {
      clickedVideoRef.pause();
      clickedVideoRef.currentTime = 0;
    }

    // Update main video index
    setMainVideoIndex(clickedIndex);
    
    // Reset transition state after animation
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <section className="bg-black py-20">
      <div className="mx-auto max-w-[100rem] px-4 sm:px-6 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,_1.7fr)_minmax(0,_0.9fr)] lg:gap-12 items-start">
          {/* Main Video - Left Side (Large) */}
          <div className="order-1 w-full lg:max-w-[900px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={mainVideo.id}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ 
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1]
                }}
                className="h-full"
              >
                <MainVideoPlayer
                  item={mainVideo}
                  videoRef={mainVideoRef}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Collage Grid - Right Side (Small Thumbnails) */}
          <div className="order-2 w-full lg:max-w-[65rem] mt-0 lg:mt-0">
            <div className="grid grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 max-h-[510px] overflow-y-auto pr-2 lg:pr-0 custom-scrollbar" style={{ WebkitOverflowScrolling: "touch" }}>
              {collageVideos.map((item, index) => {
                // Find original index in allVideos array
                const originalIndex = allVideos.findIndex(v => v.id === item.id);
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ 
                      duration: 0.3,
                      layout: { duration: 0.4 }
                    }}
                    className="cursor-pointer"
                    onClick={() => handleVideoClick(originalIndex)}
                  >
                    <CollageVideoThumbnail
                      item={item}
                      isActive={false}
                      videoRef={(ref) => {
                        if (ref) {
                          videoRefs.current[item.id] = ref;
                        }
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MainVideoPlayer({ item, videoRef }) {
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
            // Main video plays with sound
            video.muted = false;
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  setAutoplayFailed(false);
                  setIsPlaying(true);
                })
                .catch((error) => {
                  // If autoplay with sound fails, try muted
                  video.muted = true;
                  video.play().then(() => {
                    setAutoplayFailed(false);
                    setIsPlaying(true);
                  }).catch(() => {
                    setAutoplayFailed(true);
                    setIsLoading(false);
                  });
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
  }, [item.video, videoRef]);

  return (
    <article
      ref={containerRef}
      className="group relative h-full w-full overflow-hidden rounded-2xl bg-neutral-900"
    >
      {/* Large main video */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
        <video
          ref={videoRef}
          src={item.video}
          className="h-full w-full object-cover"
          loop
          playsInline
          preload="auto"
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-800">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
        )}
        {autoplayFailed && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.muted = false;
                  videoRef.current.play();
                }
              }}
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
     
    </article>
  );
}

function CollageVideoThumbnail({ item, isActive, videoRef: setVideoRef }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  
  // Register video ref with parent if callback provided
  useEffect(() => {
    if (setVideoRef && videoRef.current) {
      setVideoRef(videoRef.current);
    }
  }, [setVideoRef]);

  // Load thumbnail frame for iOS compatibility
  useEffect(() => {
    if (!item.video || !videoRef.current) return;

    const video = videoRef.current;

    const loadThumbnail = () => {
      // Seek to first frame to show thumbnail on iOS
      if (video.readyState >= 2) {
        video.currentTime = 0.1;
        setThumbnailLoaded(true);
      }
    };

    const handleLoadedMetadata = () => {
      video.currentTime = 0.1;
      setThumbnailLoaded(true);
    };

    const handleLoadedData = () => {
      if (!thumbnailLoaded) {
        video.currentTime = 0.1;
        setThumbnailLoaded(true);
      }
    };

    // Try to load thumbnail immediately if metadata is already loaded
    if (video.readyState >= 1) {
      loadThumbnail();
    }

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("loadeddata", handleLoadedData);

    // Force load on iOS
    video.load();

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("loadeddata", handleLoadedData);
    };
  }, [item.video, thumbnailLoaded]);

  useEffect(() => {
    if (!item.video || !videoRef.current) return;

    const video = videoRef.current;
    const container = containerRef.current;

    // Only play on hover, no autoplay
    if (isHovered && container) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && isHovered) {
              // Play on hover when in view
              video.currentTime = 0;
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          });
        },
        {
          threshold: 0.5,
        }
      );

      observer.observe(container);

      return () => {
        observer.unobserve(container);
      };
    } else {
      // Pause when not hovered and reset to first frame
      video.pause();
      if (!isHovered) {
        video.currentTime = 0.1;
      }
    }
  }, [item.video, isHovered]);

  return (
    <article
      ref={containerRef}
      className={`group relative overflow-hidden rounded-xl bg-neutral-900 transition-all ${
        isActive ? "ring-2 ring-white" : ""
      } ${isHovered ? "scale-105" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Small thumbnail - aspect-square */}
      <div className="relative aspect-square w-full overflow-hidden">
        <video
          ref={videoRef}
          src={item.video}
          className="h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="auto"
          style={{
            WebkitTransform: "translateZ(0)",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        />
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black shadow-lg">
            <svg
              className="ml-1 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
}
