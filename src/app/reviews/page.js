import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/config";
import { reviews, reviewsSummary } from "@/lib/reviewsData";

export const metadata = {
  title: "Reviews · Gyro Cafe Brooklyn",
  description:
    "See why Gyro Cafe holds a 5.0 rating across Google, Yelp, UberEats, DoorDash, and Grubhub.",
};

const platforms = [
  { name: "Google", tagline: "5.0 · 203 reviews" },
  { name: "Yelp", tagline: "Top-rated Halal Spot" },
  { name: "UberEats", tagline: "Fast delivery • High rating" },
  { name: "DoorDash", tagline: "Loved by late-night diners" },
  { name: "Grubhub", tagline: "Brooklyn favorite" },
];

export default function ReviewsPage() {
  return (
    <main className="flex flex-col">
      <ReviewsCarousel
        reviews={reviews}
        summary={reviewsSummary}
        cta={{
          label: "Leave a Review",
          href: siteConfig.googleReviewUrl,
          external: true,
        }}
      />

      <Section background="white">
        <div className="space-y-8">
          <header className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-brand-red">
              Across the Platforms
            </p>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-brand-dark md:text-4xl">
              5 Stars, Every Night
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-neutral-600">
              From post-concert bites to family dinners, locals and visitors keep
              sharing the love. Here’s how they describe the Gyro Cafe experience.
            </p>
          </header>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="flex flex-col gap-3 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between text-sm uppercase tracking-wide text-brand-red">
                  <span>{review.platform}</span>
                  <span>★★★★★</span>
                </div>
                <p className="text-lg font-semibold text-brand-dark">
                  “{review.quote}”
                </p>
                <p className="text-xs uppercase tracking-wide text-neutral-500">
                  {review.name} · {review.date}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section background="red">
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="rounded-3xl border border-white/20 bg-white/10 p-6 text-white shadow-lg"
            >
              <p className="text-lg font-semibold uppercase tracking-wide">
                {platform.name}
              </p>
              <p className="mt-2 text-sm text-white/80">{platform.tagline}</p>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}

