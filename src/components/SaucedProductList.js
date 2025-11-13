"use client";

import Image from "next/image";

import { Button } from "./Button";
import { useCart } from "./cart/CartContext";

export function SaucedProductList({ items = [] }) {
  const { addItem } = useCart();

  if (!items.length) return null;

  return (
    <div className="grid gap-6 md:grid-cols-3 max-w-[70%] mx-auto">
      {items.map((item) => (
        <article
          key={item.id}
          className="group flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(min-width: 1024px) 320px, 50vw"
              />
            ) : null}
          </div>
          <div className="flex flex-1 flex-col gap-4 p-6">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-brand-red">
                SAÜCED Signature
              </p>
              <h3 className="text-lg font-semibold uppercase tracking-wide text-brand-dark">
                {item.name}
              </h3>
              {item.description ? (
                <p className="text-sm text-neutral-600">{item.description}</p>
              ) : null}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-brand-red">
                ${item.price.toFixed(2)}
              </span>
              <Button
                onClick={() =>
                  addItem({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    category: item.category,
                  })
                }
                className="justify-center"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

