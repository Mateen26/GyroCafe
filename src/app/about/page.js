import Image from "next/image";

import { Button } from "@/components/Button";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { quickFacts, siteConfig } from "@/lib/config";

export const metadata = {
  title: "About Gyro Cafe · Brooklyn Classic Since 2007",
  description:
    "Discover the story of Gyro Cafe — a family-run halal staple on Coney Island Avenue serving Brooklyn since 2007.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col">
      <Hero
        backgroundImage="/IMG_4354.JPG"
        backgroundPosition="center 60%"
        eyebrow="Gyro Cafe · Coney Island Ave"
        title="Since 2007, a Brooklyn Classic."
        description={`What started as a small family run gyro spot on Coney Island Avenue grew into a neighborhood staple. A place where the grill’s always hot, the sauce is always fresh, and the faces are familiar.\n\nFor nearly two decades, Gyro Café has been serving Brooklyn’s heartbeat: late-night meals, lunch breaks, and everything in between — made fresh, made Halal, Gyro’s The Cafe Way.`}
        align="right"
        vertical="bottom"
        contentWidth="max-w-[150rem]"
        primaryCta={{
          label: "Order Pickup",
          href: siteConfig.ctas.pickup.href,
        }}
        secondaryCta={{
          label: "Order Delivery",
          href: siteConfig.deliveryUrl,
          external: true,
        }}
        subline="Open Late · Family-Owned · Serving Brooklyn Since 2007"
      />

      <Section background="white">
        <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-lg uppercase tracking-[0.4em] text-brand-red">
              Brooklyn Roots
            </p>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-brand-dark md:text-4xl">
              From Coney Island Ave with Love
            </h2>
            <p className="text-base leading-relaxed text-neutral-600 md:text-lg">
              Our family opened Gyro Cafe in 2007 with a simple promise: keep the
              grill running late, keep the sauces handcrafted, and keep Brooklyn
              fed. From lunch rushes to late-night cravings, we’ve served
              generations of neighbors, students, artists, and night-shift crews.
            </p>
            <p className="text-base leading-relaxed text-neutral-600 md:text-lg">
              The recipes you taste today are the same ones our father perfected
              back then — especially the mango, white, and hot sauces that sparked
              the SAÜCED line. Every platter, wrap, and naanwich is still
              prepared by the same hands that built this legacy.
            </p>
          </div>
          <div className="space-y-6">
            <ul className="grid gap-4 rounded-3xl border border-neutral-200 bg-neutral-50 p-6 text-sm uppercase tracking-widest text-neutral-600">
              {quickFacts.map((fact) => (
                <li key={fact} className="rounded-2xl bg-white px-4 py-3 text-brand-dark">
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section background="white">
        <div className="grid gap-8 lg:grid-cols-3 py-20">
          {[
            {
              title: "Halal & Handmade",
              description:
                "Every protein, sauce, and side is halal-certified and prepared from scratch daily in our kitchen.",
            },
            {
              title: "Neighborhood Love",
              description:
                "From Kings Theatre crowds to midnight commuters, we’ve become a staple for Brooklyn’s heartbeat.",
            },
            {
              title: "Sauced Legacy",
              description:
                "Our trio of sauces started as a family recipe. Today they bottle the very flavor of Gyro Cafe.",
            },
          ].map((item) => (
            <div key={item.title} className="space-y-3 text-brand-dark">
              <h3 className="text-xl font-bold uppercase tracking-wide">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section background="white">
        <div className="grid gap-10 lg:grid-cols-[1fr,1.1fr] lg:items-center">
          {/* <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-neutral-200">
            <Image
              src="/slideshow/loaded friesn enhanced.jpg"
              alt="Gyro Cafe staff preparing food"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 480px, 100vw"
            />
          </div> */}
          <div className="space-y-5 py-20">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-brand-dark md:text-4xl">
              Community, Culture, Convenience
            </h2>
            <p className="text-base leading-relaxed text-neutral-600 md:text-lg">
              Whether you’re stopping by for a quick lunch, fueling a late-night
              creative session, or grabbing sauces for the block party, Gyro Cafe
              is here. We’re tucked between Prospect Park and Ditmas Park —
              central to where Brooklyn comes together.
            </p>
            <p className="text-base leading-relaxed text-neutral-600 md:text-lg">
              We stay open until 1 AM because the city never really sleeps — and
              neither do the cravings. Consider us your go-to pit stop for energy,
              comfort, and that unmistakable red-and-white squeeze.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/order-pickup">Order Pickup</Button>
              <Button href="/reviews" variant="outline">
                Read Reviews
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}

