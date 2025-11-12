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
        backgroundImage="/mainbackground.JPG"
        backgroundPosition="center 55%"
        eyebrow="Gyro Cafe · Brooklyn Born"
        title="Since 2007, A Brooklyn Classic."
        description={`What started as a small family-run gyro counter became a neighborhood landmark. Every night, our grill stays hot, our sauces stay fresh, and our team greets you like family.`}
        primaryCta={{ label: "View the Menu", href: "/menu" }}
        secondaryCta={{
          label: "Order Pickup",
          href: "/order-pickup",
        }}
        subline="Open Late · Family-Owned · Halal Always"
      />

      <Section background="white">
        <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.4em] text-brand-red">
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
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-neutral-200">
              <Image
                src="/template.jpeg"
                alt="Vintage Gyro Cafe storefront"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 520px, 100vw"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section background="red">
        <div className="grid gap-8 lg:grid-cols-3">
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
            <div key={item.title} className="space-y-3 text-white">
              <h3 className="text-xl font-bold uppercase tracking-wide">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/80">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section background="white">
        <div className="grid gap-10 lg:grid-cols-[1fr,1.1fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-neutral-200">
            <Image
              src="/slideshow/loaded friesn enhanced.jpg"
              alt="Gyro Cafe staff preparing food"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 480px, 100vw"
            />
          </div>
          <div className="space-y-5">
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

