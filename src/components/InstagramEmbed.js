"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Extracts Instagram post ID from various Instagram URL formats
 */
function getInstagramPostId(url) {
  // Handle various Instagram URL formats:
  // https://www.instagram.com/p/ABC123/
  // https://www.instagram.com/reel/ABC123/
  // https://instagram.com/p/ABC123/
  const patterns = [
    /instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/,
    /instagram\.com\/p\/([A-Za-z0-9_-]+)/,
    /instagram\.com\/reel\/([A-Za-z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

export function InstagramEmbed({ url, caption, className = "" }) {
  const containerRef = useRef(null);
  const embedRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const postId = getInstagramPostId(url);

  useEffect(() => {
    if (!postId || !containerRef.current) return;

    // Create a unique ID for this embed
    const embedId = `instagram-embed-${postId}`;
    let checkEmbedInterval;
    let timeoutId;

    // Load Instagram embed script if not already loaded
    const loadScript = () => {
      if (window.instgrm) {
        // Script already loaded, process embeds
        if (window.instgrm.Embeds && window.instgrm.Embeds.process) {
          window.instgrm.Embeds.process();
        }
        return;
      }

      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.instgrm && window.instgrm.Embeds && window.instgrm.Embeds.process) {
          window.instgrm.Embeds.process();
        }
      };
      document.body.appendChild(script);
    };

    // Create the blockquote element
    const blockquote = document.createElement("blockquote");
    blockquote.className = "instagram-media";
    blockquote.setAttribute("data-instgrm-permalink", url);
    blockquote.setAttribute("data-instgrm-version", "14");
    blockquote.style.cssText = `
      background: #FFF;
      border: 0;
      border-radius: 1rem;
      margin: 1px;
      max-width: 100%;
      min-width: 326px;
      padding: 0;
      width: calc(100% - 2px);
    `;

    // Clear container and add blockquote
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(blockquote);
      embedRef.current = blockquote;
    }

    // Load script and process
    loadScript();

    // Check if embed loaded successfully
    checkEmbedInterval = setInterval(() => {
      if (containerRef.current) {
        const iframe = containerRef.current.querySelector("iframe");
        if (iframe) {
          setIsLoading(false);
          clearInterval(checkEmbedInterval);
        }
      }
    }, 100);

    // Timeout after 5 seconds
    timeoutId = setTimeout(() => {
      clearInterval(checkEmbedInterval);
      setIsLoading((prev) => {
        if (prev) {
          setError(true);
          return false;
        }
        return prev;
      });
    }, 5000);

    return () => {
      clearInterval(checkEmbedInterval);
      clearTimeout(timeoutId);
      // Clear the container to prevent React from trying to remove modified DOM
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [postId, url]);

  if (!postId) {
    return (
      <div className={`flex items-center justify-center bg-neutral-100 ${className}`}>
        <p className="text-sm text-neutral-500">Invalid Instagram URL</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center bg-neutral-100 p-4 ${className}`}>
        <p className="mb-2 text-sm text-neutral-500">Unable to load Instagram post</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-brand-red hover:underline"
        >
          View on Instagram →
        </a>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-200">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-red border-t-transparent" />
        </div>
      )}
      {/* Container div that React controls - Instagram script will modify its children */}
      <div ref={containerRef} className="relative w-full" />
    </div>
  );
}

