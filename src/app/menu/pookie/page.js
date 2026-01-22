import { Metadata } from "next";

import { Button } from "@/components/Button";
import { MenuGrid } from "@/components/MenuGrid";
import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/config";
import { menuCategories, menuItems } from "@/lib/menuData";

export const metadata = {
  title: "Pookie (Big Body Cookies) · Menu · Gyro Cafe",
  description:
    "Pookie is the home of the Big-Body Cookie— Thicc, bold, 6 oz Cookies made to hit every time. Order pickup directly from our Brooklyn kitchen.",
};

export default function PookieMenuPage() {
  return (
    <main className="flex flex-col">
      <Section background="red">
        <div className="grid gap-8 lg:grid-cols-[1.2fr,1fr] lg:items-center py-20">
          <div className="space-y-4 text-white">
            <p className="text-lg uppercase tracking-[0.4em] text-white">
              Pick It Up, Keep It Sauced
            </p>
            <h1 className="text-4xl font-bold uppercase tracking-tight md:text-5xl">
              Pookie · Big Body Cookies
            </h1>
            <p className="text-base leading-relaxed text-white/80 md:text-lg">
              Thicc, bold, 6 oz Cookies made to hit every time. We don't just bake treats; we create moments. From giant chocolate-packed cookies to bakery staples, Pookie brings the fun back into dessert. Order directly for pickup and skip the delivery fees.
            </p>
          
          </div>
          <div className="space-y-4 rounded-3xl border border-white/20 bg-white/10 p-6 text-white shadow-lg backdrop-blur">
            <h2 className="text-sm font-semibold uppercase tracking-wide">
              Pickup Hours
            </h2>
            <p className="text-lg font-bold uppercase tracking-tight">
              10 AM – 1 AM · 7 Days a Week
            </p>
            <p className="text-sm text-white/80">
              Call ahead at{" "}
              <a href={`tel:${siteConfig.phone}`} className="underline">
                {siteConfig.phone}
              </a>{" "}
              or place your order below.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/order-pickup" variant="light">
                Start Checkout
              </Button>
              <Button href={siteConfig.deliveryUrl} external variant="ghost">
                Prefer Delivery?
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <MenuGrid 
        categories={menuCategories} 
        items={menuItems} 
        initialCategory="pookie"
      />
    </main>
  );
}
