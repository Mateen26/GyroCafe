import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { activePromotions } from "@/lib/promotionsConfig";

export const metadata = {
  title: "Promotions",
  description: "Exclusive pickup deals and promotions at Gyro Cafe.",
};

export default function PromotionsPage() {
  return (
    <main className="flex flex-col">
      <Section background="white" className="py-20">
        <div className="space-y-12">
          <header className="mx-auto max-w-[513px] space-y-2 text-center sm:max-w-3xl">
            <h1 className="text-2xl font-bold uppercase tracking-tight text-brand-dark sm:text-3xl md:text-4xl">
              Pickup Only Deals
            </h1>
            <p className="text-base font-medium text-neutral-700 sm:text-lg md:text-xl">
              Order Direct & Save
            </p>
          </header>

          <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
            {activePromotions
              .filter((promo) => promo.active)
              .map((promo) => (
                <PromoCard key={promo.id} promo={promo} />
              ))}
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-center">
            <p className="text-sm uppercase tracking-widest text-neutral-500">
              * Offers valid for a limited time. Pickup required.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}

function PromoCard({ promo }) {
  return (
    <article className="mx-auto flex w-full max-w-[513px] flex-col space-y-4 text-center">
      {/* Header Badge */}
      <div className="flex justify-center">
        <span className="inline-block rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-pink-700">
          {promo.badge}
        </span>
      </div>

      {/* Main Title */}
      <h2 className="text-2xl font-bold uppercase tracking-tight text-brand-dark sm:text-3xl">
        {promo.headline}
      </h2>

      {/* Description */}
      <p className="text-sm leading-relaxed text-neutral-700 sm:text-base">
        {promo.description}
      </p>

      {/* Inner Nested Card */}
      <div className="rounded-xl border-2 border-amber-900/30 bg-amber-50/50 p-4 shadow-md sm:p-5">
        <div className="space-y-3 text-center">
          {/* Inner Badge */}
          <div className="flex justify-center">
            <span className="inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-900 sm:px-3 sm:py-1 sm:text-xs">
              {promo.badge}
            </span>
          </div>

          {/* Inner Title */}
          {/* <h3 className="text-lg font-bold uppercase tracking-tight text-brand-dark sm:text-xl">
            {promo.headline}
          </h3>

          <p className="text-xs leading-relaxed text-neutral-700 sm:text-sm">
            {promo.description}
          </p> */}

          {/* Inner Button */}
          <Link href={promo.cta.href}>
            <button className="w-full rounded-lg bg-amber-900 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-amber-800 sm:px-6 sm:py-3 sm:text-sm">
              {promo.cta.label}
            </button>
          </Link>

          {/* Image */}
          {promo.image && (
            <div className="relative aspect-[513/887] w-full overflow-hidden rounded-lg bg-white sm:aspect-[4/3]">
              <Image
                src={promo.image}
                alt={promo.name}
                fill
                className="object-contain mt-3"
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            </div>
          )}
        </div>
      </div>

      {/* Fine Print */}
      {/* <p className="text-[10px] leading-relaxed text-neutral-600 sm:text-xs">
        {promo.details}
      </p> */}

      {/* Full-width CTA Button */}
      <Link href={promo.cta.href}>
        <button className="w-full rounded-full bg-brand-red px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-brand-red/20 transition hover:bg-brand-red/90 sm:px-6 sm:py-4 sm:text-base">
          {promo.cta.label}
        </button>
      </Link>
    </article>
  );
}


