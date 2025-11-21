"use client";

import Image from "next/image";

import { Section } from "./Section";

export function SocialFeed({ items = [] }) {
  if (!items.length) return null;

  // Duplicate items multiple times for seamless infinite scroll
  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <Section background="white">
      <div className="py-16">
        <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white py-4">
          <div className="flex animate-marquee gap-4">
            {marqueeItems.map((item, index) => {
              const isInstagram = item.instagramUrl || (item.video && item.video.includes("instagram.com"));
              const instagramUrl = item.instagramUrl || (isInstagram ? item.video : null);
              const isMenuImage = item.isMenuImage === true;
              
              return (
                <div
                  key={`${item.id}-${index}`}
                  className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-neutral-100"
                >
                  {isInstagram && instagramUrl ? (
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full w-full"
                    >
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
                        <svg
                          className="h-8 w-8 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </div>
                    </a>
                  ) : item.video ? (
                    <video
                      src={item.video}
                      className="h-full w-full object-cover"
                      muted
                      loop
                      playsInline
                      autoPlay
                    />
                  ) : (
                    item.image && (
                      <Image
                        src={item.image}
                        alt={item.caption ?? "Gyro Cafe menu item"}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    )
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
