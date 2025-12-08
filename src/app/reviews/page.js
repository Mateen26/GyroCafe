import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/config";
import { reviews, reviewsSummary, platformStats } from "@/lib/reviewsData";
import { FaStar } from "react-icons/fa";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";

export const metadata = {
  title: "Reviews · Gyro Cafe Brooklyn",
  description:
    "See why Gyro Cafe holds a 4.8+ rating across Google, Grubhub, UberEats, and DoorDash with thousands of reviews.",
};

export default function ReviewsPage() {
  // Group reviews by platform
  const reviewsByPlatform = {
    Grubhub: reviews.filter((r) => r.platform === "Grubhub"),
    DoorDash: reviews.filter((r) => r.platform === "DoorDash"),
    "Uber Eats": reviews.filter((r) => r.platform === "Uber Eats"),
    Google: reviews.filter((r) => r.platform === "Google"),
  };

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

      {/* Platform Links Section */}
      <Section background="white">
        <div className="space-y-8 py-20">
          <header className="space-y-3 text-center">
            <p className="text-lg uppercase tracking-[0.4em] text-brand-red">
              Reviews
            </p>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-brand-dark md:text-4xl">
              See What Our Customers Say
            </h2>
            <p className="max-w-2xl mx-auto text-base leading-relaxed text-neutral-600">
              Read thousands of reviews across all platforms. See why Brooklyn keeps coming back.
            </p>
          </header>

          {/* Marketing Lines */}
          <div className="grid gap-3 md:grid-cols-2 max-w-3xl mx-auto text-center">
            <p className="text-sm font-medium text-neutral-700">
              See <span className="font-bold text-brand-red">{platformStats.grubhub.count.toLocaleString()}</span> reviews on{" "}
              <a
                href={platformStats.grubhub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-red underline hover:opacity-80 transition"
              >
                Grubhub
              </a>
            </p>
            <p className="text-sm font-medium text-neutral-700">
              See <span className="font-bold text-brand-red">{platformStats.doordash.countLabel || platformStats.doordash.count.toLocaleString()}</span> reviews on{" "}
              <a
                href={platformStats.doordash.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-red underline hover:opacity-80 transition"
              >
                DoorDash
              </a>
            </p>
            <p className="text-sm font-medium text-neutral-700">
              See <span className="font-bold text-brand-red">{platformStats.ubereats.countLabel || platformStats.ubereats.count.toLocaleString()}</span> reviews on{" "}
              <a
                href={platformStats.ubereats.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-red underline hover:opacity-80 transition"
              >
                Uber Eats
              </a>
            </p>
            <p className="text-sm font-medium text-neutral-700">
              See <span className="font-bold text-brand-red">{platformStats.google.count.toLocaleString()}</span> reviews on{" "}
              <a
                href={platformStats.google.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-red underline hover:opacity-80 transition"
              >
                Google
              </a>
            </p>
          </div>

          {/* Platform Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {Object.values(platformStats).map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 rounded-2xl border-2 border-neutral-200 bg-white p-6 shadow-md transition-all hover:border-brand-red hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold uppercase tracking-wide text-brand-dark">
                    {platform.name}
                  </h3>
                  <HiArrowTopRightOnSquare className="h-5 w-5 text-neutral-400 transition group-hover:text-brand-red" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <span className="text-xl font-bold">{platform.rating.toFixed(1)}</span>
                    <FaStar className="h-4 w-4 fill-current" />
                  </div>
                  <span className="text-sm text-neutral-600">
                    {platform.countLabel || platform.count.toLocaleString()} reviews
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Section>

      {/* Reviews by Platform */}
      <Section background="light">
        <div className="space-y-12 py-20">
          {Object.entries(reviewsByPlatform).map(([platformName, platformReviews]) => {
            if (platformReviews.length === 0) return null;
            
            // Map platform names to keys
            const platformKeyMap = {
              "Grubhub": "grubhub",
              "DoorDash": "doordash",
              "Uber Eats": "ubereats",
              "Google": "google",
            };
            const platformKey = platformKeyMap[platformName];
            const platform = platformStats[platformKey];
            
            return (
              <div key={platformName} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold uppercase tracking-tight text-brand-dark">
                      {platformName}
                    </h3>
                    {platform && (
                      <p className="mt-1 text-sm text-neutral-600">
                        {platform.rating.toFixed(1)} <span className="text-yellow-400">⭐</span> · {platform.countLabel || platform.count.toLocaleString()} reviews
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {platformReviews.map((review) => (
                    <article
                      key={review.id}
                      className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wide text-brand-red">
                          {review.platform}
                        </span>
                        <div className="flex items-center gap-1 text-yellow-400">
                          {Array.from({ length: Math.round(review.rating) }).map((_, i) => (
                            <FaStar key={i} className="h-3 w-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-base font-semibold leading-relaxed text-brand-dark">
                        "{review.quote}"
                      </p>
                      <div className="mt-auto space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-700">
                            {review.name}
                          </p>
                          {review.isTopReviewer && (
                            <span className="rounded-full bg-brand-red/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-red">
                              Top Reviewer
                            </span>
                          )}
                          {review.isLocalGuide && (
                            <span className="rounded-full bg-brand-red/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-red">
                              Local Guide
                            </span>
                          )}
                          {review.isEmergingExpert && (
                            <span className="rounded-full bg-brand-red/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-red">
                              Expert
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-500">{review.date}</p>
                        {review.orderDetails && (
                          <p className="text-xs text-neutral-400 italic">
                            Ordered: {review.orderDetails}
                          </p>
                        )}
                        {review.recommendedDishes && (
                          <p className="text-xs text-neutral-400">
                            Recommended: {review.recommendedDishes}
                          </p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>

                {/* See More Link */}
                {platform && (
                  <div className="text-center">
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-brand-red bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-brand-red transition hover:bg-brand-red hover:text-white"
                    >
                      See more for {platform.countLabel || platform.count.toLocaleString()} reviews
                      <HiArrowTopRightOnSquare className="h-4 w-4" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Section>
    </main>
  );
}
