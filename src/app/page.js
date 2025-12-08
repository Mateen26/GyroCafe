import Image from "next/image";

import { Button } from "@/components/Button";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { FeaturedVideoSlider } from "@/components/FeaturedVideoSlider";
import { Hero } from "@/components/Hero";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { Section } from "@/components/Section";
import { SocialFeed } from "@/components/SocialFeed";
import { VideoSliderSection } from "@/components/VideoSliderSection";
import { siteConfig } from "@/lib/config";
import {
  featuredSlides,
  menuCategories,
  featuredVideos,
  remainingVideos,
  getMarqueeItems,
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

      {/* MEET SAÜCED Banner */}
      <Section background="red" className="py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="text-center px-4 sm:px-6 md:px-8 max-w-full">
          <h2 className="text-2xl font-bold uppercase tracking-tight leading-tight sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl whitespace-nowrap overflow-x-auto overflow-y-visible pb-3 sm:pb-0 scrollbar-hide">
            <span 
              className="bg-gradient-to-r from-black from-0% via-black via-33% via-white via-50% via-white via-66% to-[#FFD700] to-100% bg-clip-text text-transparent inline-block"
              style={{
                backgroundImage: 'linear-gradient(to right, #000000 0%, #000000 33%, #FFFFFF 50%, #FFFFFF 100%)'
              }}
            >
              MEET SA
            </span>
            <span className="relative inline-block bg-gradient-to-r from-[#FFFFFF] via-[#FFF500] to-[#FFD700] bg-clip-text text-transparent mx-0.5 sm:mx-1 pt-2 sm:pt-0">
              U
              <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 flex gap-1 sm:-top-3 sm:gap-5 pointer-events-none z-10">
                <span className="block w-1.5 h-1.5 sm:w-3.5 sm:h-3.5 rounded-full bg-gradient-to-br from-[#fefcbb] to-[#fefcbb] shadow-md" />
                <span className="block w-1.5 h-1.5 sm:w-3.5 sm:h-3.5 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] shadow-md relative left-[0.8px]" />
              </span>
            </span>
            <span className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] bg-clip-text text-transparent inline-block">
              CED
            </span>
          </h2>
        </div>
      </Section>

      {/* <Section background="red">
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
      </Section> */}

      <SaucedBanner />

      {/* Live from Our Feed Banner */}
      <Section background="red" className="py-16 md:py-20">
        <div className="text-center space-y-3">
          <p className="text-lg uppercase tracking-[0.4em] text-white/70">
            Gyro Cafe on the Feed
          </p>
          <h2 className="text-5xl font-bold uppercase tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Fresh from Our Grill · Live from @GyroCafeBK
          </h2>
          <p className="text-base leading-relaxed text-white/80 md:text-lg max-w-3xl mx-auto">
            Follow along for nightly specials, fresh drops, and behind-the-grill moments.
          </p>
        </div>
      </Section>

      <FeaturedVideoSlider items={featuredVideos} collageItems={remainingVideos} />

      <VideoSliderSection items={remainingVideos} />

      <SocialFeed items={getMarqueeItems()} />

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
    <Section className="p-0" noContainer>
      <div className="relative flex min-h-[600px] w-full items-center justify-center overflow-hidden py-16 md:min-h-[1020px]">
        <Image
          src="/threesouces.jpeg"
          alt="Gyro Cafe Sauced bottles"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 text-center text-white sm:px-12 lg:px-16">
          <h2 className="text-3xl font-bold uppercase tracking-tight md:text-4xl lg:text-5xl">
            Our Original Mango, White & Hot Sauces — Bottled
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
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
      <div className="grid gap-10 lg:grid-cols-[1fr,1.2fr] py-20">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-red">
            Visit Gyro Cafe
          </p>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-brand-dark md:text-4xl">
          BROOKLYN'S ALL-DAY STAPLE
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
      {/* <div className="flex flex-wrap gap-3 pt-2 text-xs uppercase tracking-[0.3em] text-neutral-500">
        {menuCategories.slice(0, 4).map((category) => (
          <span key={category.id} className="rounded-full border border-neutral-200 px-3 py-1">
            {category.name}
          </span>
        ))}
      </div> */}
    </div>
  );
}
