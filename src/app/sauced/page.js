import Image from "next/image";

import { Button } from "@/components/Button";
import { SaucedProductList } from "@/components/SaucedProductList";
import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/config";
import { menuItems } from "@/lib/menuData";

export const metadata = {
  title: "SAÜCED · Gyro Cafe Signature Sauces",
  description:
    "Take home Gyro Cafe’s original Mango, White, and Hot sauces. Bottled in-house, ready to pour, drip, and dip.",
};

const saucedItems = menuItems.filter((item) => item.category === "sauced");

export default function SaucedPage() {
  return (
    <main className="flex flex-col">
      <Section background="red">
        <div className="grid gap-10 lg:grid-cols-[1fr,1.1fr] lg:items-center">
          <div className="space-y-5 text-white">
            <p className="text-xs uppercase tracking-[0.4em] text-white/70">
              The Café Way · SAÜCED
            </p>
            <h1 className="text-4xl font-bold uppercase tracking-tight md:text-5xl">
              Bottled from the Original Recipe
            </h1>
            <p className="text-base leading-relaxed text-white/80 md:text-lg">
              Since day one, our mango-sweet, white, and hot sauces have been
              mixed in-house by our family. Now you can take the squeeze home —
              perfect for platters, late-night snacks, and Brooklyn cookouts.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/order-pickup" variant="light">
                Add to Pickup Order
              </Button>
              <Button href={siteConfig.deliveryUrl} external variant="ghost">
                Want Delivery?
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/5 shadow-2xl shadow-black/30">
            <Image
              src="/threesouces.jpeg"
              alt="Gyro Cafe Sauced bottles"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 420px, 90vw"
            />
          </div>
        </div>
      </Section>

      <Section background="white">
        <div className="space-y-6">
          <header className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-brand-red">
              SAÜCED Lineup
            </p>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-brand-dark md:text-4xl">
              Mango. White. Hot.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-neutral-600">
              Each squeeze bottle is filled on-site and sealed for freshness.
              Keep it in the fridge, shake well, and drizzle on everything —
              especially leftovers.
            </p>
          </header>

          <SaucedProductList items={saucedItems} />
        </div>
      </Section>
    </main>
  );
}

