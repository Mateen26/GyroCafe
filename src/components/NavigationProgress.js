"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export function NavigationProgress() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const previousPathname = useRef(pathname);
  const hideTimerRef = useRef(null);

  useEffect(() => {
    // Show loader immediately when pathname changes
    if (pathname !== previousPathname.current) {
      // Clear any pending hide timer
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }

      setIsLoading(true);
      setIsVisible(true);
      previousPathname.current = pathname;

      // Hide loader after navigation completes (when DOM is ready)
      hideTimerRef.current = setTimeout(() => {
        setIsLoading(false);
        // Fade out after loading completes
        setTimeout(() => {
          setIsVisible(false);
        }, 300); // Fade out duration
      }, 150); // Small delay to ensure page starts loading
    }

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [pathname]);

  // Also listen for link clicks to show loader immediately
  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      // Only show loader for internal links (not external or anchor links)
      if (
        href &&
        !href.startsWith("http") &&
        !href.startsWith("mailto:") &&
        !href.startsWith("#") &&
        href !== pathname
      ) {
        setIsLoading(true);
        setIsVisible(true);
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-sm transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ pointerEvents: isLoading ? "auto" : "none" }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Spinner - Red theme */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-neutral-200"></div>
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-brand-red border-r-brand-red"></div>
        </div>
        {/* Loading text */}
        <p className="text-sm font-semibold text-brand-dark">Loading...</p>
      </div>
    </div>
  );
}

