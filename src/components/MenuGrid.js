"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { menuCategories } from "@/lib/menuData";

import { Button } from "./Button";
import { Section } from "./Section";
import { useCart } from "./cart/CartContext";

export function MenuGrid({
  categories = menuCategories,
  items = [],
  initialCategory,
  showFilters = true,
}) {
  const [activeCategory, setActiveCategory] = useState(
    initialCategory ?? categories[0]?.id
  );
  const { addItem, setShowWingFlavorModal, setPendingWingItem } = useCart();

  const filteredItems = useMemo(() => {
    if (!activeCategory) return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  return (
    <Section background="white">
      <div className="space-y-10 py-20">
        <header className="space-y-4">
          <p className="text-lg uppercase tracking-[0.4em] text-brand-red">
            Order for Pickup
          </p>
          <h1 className="text-4xl font-bold uppercase tracking-tight text-brand-dark">
            Menu · Gyros, Platters, Sauced
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-neutral-600">
            Authentic halal platters, wraps, and Brooklyn’s favorite SAÜCED
            bottles — prepped fresh, served fast, and ready when you arrive.
          </p>
        </header>

        {showFilters ? (
          <div className="space-y-4">
            <div className="rounded-2xl border-2 border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold uppercase tracking-wider text-neutral-500">
                Browse Categories
              </h2>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => {
                  const isActive = category.id === activeCategory;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setActiveCategory(category.id)}
                      className={`rounded-full border-2 px-4 py-3 text-sm md:text-[14px] font-bold uppercase tracking-wide transition-all duration-200 ${
                        isActive
                          ? "border-brand-red bg-brand-red text-white shadow-lg shadow-brand-red/40 scale-105 ring-2 ring-brand-red/20"
                          : "border-neutral-300 bg-white text-neutral-700 hover:border-brand-red hover:bg-brand-red/10 hover:text-brand-red hover:shadow-md hover:scale-105 active:scale-100"
                      }`}
                    >
                      {category.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-100">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain transition duration-700 group-hover:scale-105"
                    sizes="(min-width: 1280px) 360px, (min-width: 768px) 45vw, 100vw"
                  />
                ) : null}
                {/* Out of Stock Label */}
                {item.outOfStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="rounded-2xl bg-red-600 px-8 py-4 text-center shadow-2xl">
                      <span className="text-2xl font-bold uppercase tracking-wider text-white">
                        OUT OF STOCK
                      </span>
                    </div>
                  </div>
                )}
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  {item.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand-red"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between gap-4 p-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold uppercase tracking-wide text-brand-dark">
                      {item.name}
                    </h3>
                    <span className="text-sm font-semibold text-brand-red">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  {item.description ? (
                    <p className="text-sm text-neutral-600">{item.description}</p>
                  ) : null}
                </div>
                <Button
                  onClick={() => {
                    if (item.outOfStock) return;
                    
                    // If item requires flavor selection, open flavor modal
                    if (item.requiresFlavor) {
                      setPendingWingItem({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        category: item.category,
                        description: item.description,
                        metadata: {},
                      });
                      setShowWingFlavorModal(true);
                    } else {
                      // Regular item, add directly to cart
                      addItem({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        category: item.category,
                      });
                    }
                  }}
                  className={`w-full justify-center ${item.outOfStock ? 'opacity-50 cursor-not-allowed bg-gray-400 hover:bg-gray-400' : ''}`}
                  disabled={item.outOfStock}
                >
                  {item.outOfStock ? "Out of Stock" : "Add to Cart"}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

