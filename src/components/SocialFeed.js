import Image from "next/image";

import { Section } from "./Section";

export function SocialFeed({
  items = [],
  title = "Fresh from Our Grill · Live from @GyroCafeBK",
  subtitle = "Follow along for nightly specials, fresh drops, and behind-the-grill moments.",
}) {
  if (!items.length) return null;

  const gridItems = items.slice(0, 9);
  const marqueeItems = [...items, ...items].slice(0, 16);

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
          {gridItems.map((item) => (
            <PostCard key={item.id} item={item} />
          ))}
        </div>

        <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white py-4">
          <div className="flex animate-marquee gap-4">
            {marqueeItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-neutral-100"
              >
                <Image
                  src={item.image}
                  alt={item.caption ?? "Gyro Cafe post"}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function PostCard({ item }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-xl">
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.caption ?? "Gyro Cafe post"}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(min-width: 1024px) 360px, 100vw"
        />
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

