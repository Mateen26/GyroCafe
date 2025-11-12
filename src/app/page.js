import Image from "next/image";

import { Button } from "@/components/Button";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { Hero } from "@/components/Hero";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { Section } from "@/components/Section";
import { SocialFeed } from "@/components/SocialFeed";
import { siteConfig } from "@/lib/config";
import {
  featuredSlides,
  menuCategories,
  socialFeedItems,
} from "@/lib/menuData";
import { reviews, reviewsSummary } from "@/lib/reviewsData";

export default function Home() {
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

      <FeaturedCarousel
        slides={featuredSlides}
        cta={{ label: "See Full Menu", href: "/menu" }}
      />

      <Section background="red">
        <div className="grid gap-12 lg:grid-cols-[1fr,1fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-white/70">
              The Café Way
            </p>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
              Since 2007
            </h2>
            <p className="text-base leading-relaxed text-white/80 md:text-lg">
              For nearly two decades, our family-run restaurant in the heart of
              Brooklyn has served gyros with our signature sauces that keep
              customers coming back. Created by our father and unchanged since
              day one, these sauces are more than just a recipe — they’re a
              legacy.
            </p>
            <p className="text-base leading-relaxed text-white/80 md:text-lg">
              From our grill to your plate — from our family to yours.
            </p>
            <Button
              href="/about"
              variant="light"
              className="mt-2 w-fit"
            >
              Learn Our Story
            </Button>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/20 shadow-2xl shadow-black/30">
            <Image
              src="/slideshow/mix gyro platter.png"
              alt="Gyro Cafe platter served with sauces"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 520px, 100vw"
            />
          </div>
        </div>
      </Section>

      <SaucedBanner />

      <SocialFeed items={socialFeedItems} />

      <ReviewsCarousel
        reviews={reviews}
        summary={reviewsSummary}
        cta={{
          label: "Leave a Review",
          href: siteConfig.googleReviewUrl,
          external: true,
        }}
      />

      <ContactSection />
    </main>
  );
}

function SaucedBanner() {
  return (
    <Section background="transparent" className="p-0" noContainer>
      <div className="relative isolate flex min-h-[320px] w-full items-center justify-center overflow-hidden bg-brand-red py-16">
        <Image
          src="/threesouces.jpeg"
          alt="Gyro Cafe Sauced bottles"
          fill
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-red/70" />
        <div className="relative mx-auto flex w-full max-w-[140rem] flex-col items-center gap-6 px-6 text-center text-white sm:px-12 lg:px-14">
          <p className="text-xs uppercase tracking-[0.4em] text-white/70">
            Meet SAÜCED
          </p>
          <h2 className="text-3xl font-bold uppercase tracking-tight md:text-4xl">
            Our Original Mango, White & Hot Sauces — Bottled
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            Crafted in-house from our day-one recipes. Dress your platters, dip
            your fries, or take the Gyro Cafe flavor home.
          </p>
          <Button href="/sauced" variant="light">
            Get Sauced Now
          </Button>
        </div>
      </div>
    </Section>
  );
}

function ContactSection() {
  return (
    <Section background="white">
      <div className="grid gap-10 lg:grid-cols-[1fr,1.2fr]">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-red">
            Visit Gyro Cafe
          </p>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-brand-dark md:text-4xl">
            Brooklyn’s Late-Night Staple
          </h2>
          <ContactDetails />
          <div className="flex flex-wrap gap-3">
            <Button href="/contact" variant="outline">
              Contact Us
            </Button>
            <Button href="/order-pickup">Order Pickup</Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-neutral-200 shadow-lg">
          <iframe
            title="Gyro Cafe Brooklyn Map"
            src={siteConfig.map.embedUrl}
            className="h-[360px] w-full"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </Section>
  );
}

function ContactDetails() {
  return (
    <div className="space-y-4 text-sm text-neutral-600">
      <p className="text-base font-semibold uppercase tracking-wide text-brand-dark">
        {siteConfig.address}
      </p>
      <p className="uppercase tracking-wide">
        <span className="font-semibold text-brand-dark">Phone:</span>{" "}
        <a href={`tel:${siteConfig.phone}`} className="text-brand-red">
          {siteConfig.phone}
        </a>
      </p>
      <p className="uppercase tracking-wide">
        <span className="font-semibold text-brand-dark">Email:</span>{" "}
        <a href={`mailto:${siteConfig.email}`} className="text-brand-red">
          {siteConfig.email}
        </a>
      </p>
      <p className="uppercase tracking-wide text-brand-dark">
        {siteConfig.hours}
      </p>
      <div className="flex flex-wrap gap-3 pt-2 text-xs uppercase tracking-[0.3em] text-neutral-500">
        {menuCategories.slice(0, 4).map((category) => (
          <span key={category.id} className="rounded-full border border-neutral-200 px-3 py-1">
            {category.name}
          </span>
        ))}
      </div>
    </div>
  );
}
