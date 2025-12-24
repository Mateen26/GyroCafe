import Image from "next/image";
import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/config";

export const metadata = {
  title: "Catering Menu · Gyro Cafe",
  description:
    "Gyro Cafe catering menu with pricing for gyro trays, curry trays, sides, and sauces. Half trays serve 15, full trays serve 30.",
};

export default function CateringMenuPage() {
  return (
    <main className="flex flex-col">
      {/* Header Section */}
      <Section background="red">
        <div className="space-y-4 text-white py-20">
          <h1 className="text-4xl font-bold uppercase tracking-tight md:text-5xl lg:text-6xl">
            Catering Menu
          </h1>
          <p className="text-base font-semibold uppercase tracking-wide text-white/90 md:text-lg">
            Half Tray: serves approx. 15 | Full Tray: serves approx. 30
          </p>
          <p className="text-sm text-white/80 md:text-base">
            Included with every protein tray: Half tray white sauce + Half tray hot sauce.
          </p>
        </div>
      </Section>

      {/* Main Content Section */}
      <Section background="white">
        <div className="py-20">
          <div className="grid gap-12 lg:grid-cols-[1.2fr,1fr] lg:gap-16">
            {/* Left Column - Gyro & Curry Trays */}
            <div className="space-y-10">
              {/* Gyro Trays Table */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold uppercase tracking-tight text-brand-red md:text-3xl">
                  Gyro Trays
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-brand-red text-white">
                        <th className="border border-brand-red/30 px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide">
                          Item
                        </th>
                        <th className="border border-brand-red/30 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide">
                          15 People
                        </th>
                        <th className="border border-brand-red/30 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide">
                          30 People
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-neutral-200">
                        <td className="border border-neutral-200 px-4 py-3 text-sm font-medium text-brand-dark">
                          Chicken Gyro
                        </td>
                        <td className="border border-neutral-200 px-4 py-3 text-center text-sm text-brand-dark">
                          $105
                        </td>
                        <td className="border border-neutral-200 px-4 py-3 text-center text-sm text-brand-dark">
                          $182
                        </td>
                      </tr>
                      <tr className="border-b border-neutral-200 bg-neutral-50">
                        <td className="border border-neutral-200 px-4 py-3 text-sm font-medium text-brand-dark">
                          Mixed Gyro (Chicken & Lamb)
                        </td>
                        <td className="border border-neutral-200 px-4 py-3 text-center text-sm text-brand-dark">
                          $120
                        </td>
                        <td className="border border-neutral-200 px-4 py-3 text-center text-sm text-brand-dark">
                          $210
                        </td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="border border-neutral-200 px-4 py-3 text-sm font-medium text-brand-dark">
                          Lamb Gyro
                        </td>
                        <td className="border border-neutral-200 px-4 py-3 text-center text-sm text-brand-dark">
                          $140
                        </td>
                        <td className="border border-neutral-200 px-4 py-3 text-center text-sm text-brand-dark">
                          $240
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Curry Trays Table */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold uppercase tracking-tight text-brand-red md:text-3xl">
                  Curry Trays
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-brand-red text-white">
                        <th className="border border-brand-red/30 px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide">
                          Item
                        </th>
                        <th className="border border-brand-red/30 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide">
                          15 People
                        </th>
                        <th className="border border-brand-red/30 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide">
                          30 People
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-neutral-200">
                        <td className="border border-neutral-200 px-4 py-3 text-sm font-medium text-brand-dark">
                          Chicken Curry
                        </td>
                        <td className="border border-neutral-200 px-4 py-3 text-center text-sm text-brand-dark">
                          $95
                        </td>
                        <td className="border border-neutral-200 px-4 py-3 text-center text-sm text-brand-dark">
                          $165
                        </td>
                      </tr>
                      <tr className="border-b border-neutral-200 bg-neutral-50">
                        <td className="border border-neutral-200 px-4 py-3 text-sm font-medium text-brand-dark">
                          Lamb Curry
                        </td>
                        <td className="border border-neutral-200 px-4 py-3 text-center text-sm text-brand-dark">
                          $130
                        </td>
                        <td className="border border-neutral-200 px-4 py-3 text-center text-sm text-brand-dark">
                          $225
                        </td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="border border-neutral-200 px-4 py-3 text-sm font-medium text-brand-dark">
                          Vegetarian Chickpea Curry
                        </td>
                        <td className="border border-neutral-200 px-4 py-3 text-center text-sm text-brand-dark">
                          $80
                        </td>
                        <td className="border border-neutral-200 px-4 py-3 text-center text-sm text-brand-dark">
                          $140
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column - Sides & Tray Guide */}
            <div className="space-y-10">
              {/* Sides & Add-ons Table */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold uppercase tracking-tight text-brand-red md:text-3xl">
                  Sides & Add-ons
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-brand-red text-white">
                        <th className="border border-brand-red/30 px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide">
                          Item
                        </th>
                        <th className="border border-brand-red/30 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide">
                          15 People
                        </th>
                        <th className="border border-brand-red/30 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide">
                          30 People
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-neutral-200">
                        <td className="border border-neutral-200 px-4 py-3 text-sm font-medium text-brand-dark">
                          Basmati Rice
                        </td>
                        <td className="border border-neutral-200 px-4 py-3 text-center text-sm text-brand-dark">
                          Half tray $40
                        </td>
                        <td className="border border-neutral-200 px-4 py-3 text-center text-sm text-brand-dark">
                          Full tray $65
                        </td>
                      </tr>
                      <tr className="border-b border-neutral-200 bg-neutral-50">
                        <td className="border border-neutral-200 px-4 py-3 text-sm font-medium text-brand-dark">
                          Pita Bread
                        </td>
                        <td className="border border-neutral-200 px-4 py-3 text-center text-sm text-brand-dark">
                          Half tray $25
                        </td>
                        <td className="border border-neutral-200 px-4 py-3 text-center text-sm text-brand-dark">
                          Full tray $40
                        </td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="border border-neutral-200 px-4 py-3 text-sm font-medium text-brand-dark">
                          Falafel (25 / 50 pcs)
                        </td>
                        <td className="border border-neutral-200 px-4 py-3 text-center text-sm text-brand-dark">
                          Half tray $30
                        </td>
                        <td className="border border-neutral-200 px-4 py-3 text-center text-sm text-brand-dark">
                          Full tray $55
                        </td>
                      </tr>
                      <tr className="border-b border-neutral-200 bg-neutral-50">
                        <td className="border border-neutral-200 px-4 py-3 text-sm font-medium text-brand-dark">
                          Hummus (tray)
                        </td>
                        <td className="border border-neutral-200 px-4 py-3 text-center text-sm text-brand-dark" colSpan={2}>
                          $45
                        </td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="border border-neutral-200 px-4 py-3 text-sm font-medium text-brand-dark">
                          Garden Salad
                        </td>
                        <td className="border border-neutral-200 px-4 py-3 text-center text-sm text-brand-dark">
                          Half tray $55
                        </td>
                        <td className="border border-neutral-200 px-4 py-3 text-center text-sm text-brand-dark">
                          Full tray $75
                        </td>
                      </tr>
                      <tr className="border-b border-neutral-200 bg-neutral-50">
                        <td className="border border-neutral-200 px-4 py-3 text-sm font-medium text-brand-dark">
                          Shepherd Salad
                        </td>
                        <td className="border border-neutral-200 px-4 py-3 text-center text-sm text-brand-dark">
                          Half tray $65
                        </td>
                        <td className="border border-neutral-200 px-4 py-3 text-center text-sm text-brand-dark">
                          Full tray $95
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            {/* Additional Sauce Options Section */}
          <Section background="red" className="bg-gradient-to-b from-brand-red to-red-700">
        <div className="py-16">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-8 text-center text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
              Additional Sauce Options
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex flex-col items-center rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                <div className="relative mb-4 h-40 w-40 overflow-hidden rounded-lg sm:h-48 sm:w-48">
                  <Image
                    src="/menu/GYRO SAUCES/WHITE SAUCE.jpg"
                    alt="White Sauce"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="mb-2 text-center text-sm font-medium text-white md:text-base">
                  Extra White Sauce (Half tray)
                </span>
                <span className="text-lg font-bold text-white md:text-xl">$25</span>
              </div>
              <div className="flex flex-col items-center rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                <div className="relative mb-4 h-40 w-40 overflow-hidden rounded-lg sm:h-48 sm:w-48">
                  <Image
                    src="/menu/GYRO SAUCES/RED SAUCE.jpg"
                    alt="Hot Sauce"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="mb-2 text-center text-sm font-medium text-white md:text-base">
                  Extra Hot Sauce (Half tray)
                </span>
                <span className="text-lg font-bold text-white md:text-xl">$25</span>
              </div>
              <div className="flex flex-col items-center rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                <div className="relative mb-4 h-40 w-40 overflow-hidden rounded-lg sm:h-48 sm:w-48">
                  <Image
                    src="/menu/GYRO SAUCES/MANGO.jpg"
                    alt="Mango Sauce"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="mb-2 text-center text-sm font-medium text-white md:text-base">
                  Mango Sauce (Half tray)
                </span>
                <span className="text-lg font-bold text-white md:text-xl">$30</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

              {/* Tray Size Guide */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold uppercase tracking-tight text-brand-red md:text-3xl">
                  Tray Size Guide
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 rounded-lg border-2 border-brand-red/20 bg-neutral-50 p-4 text-center">
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-200">
                      {/* Placeholder for Half Tray image */}
                      <div className="flex h-full items-center justify-center text-neutral-400">
                        <span className="text-xs">Half Tray Image</span>
                      </div>
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-brand-dark">
                      Half Tray
                    </p>
                    <p className="text-xs text-neutral-600">Serves ~15</p>
                  </div>
                  <div className="space-y-2 rounded-lg border-2 border-brand-red/20 bg-neutral-50 p-4 text-center">
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-200">
                      {/* Placeholder for Full Tray image */}
                      <div className="flex h-full items-center justify-center text-neutral-400">
                        <span className="text-xs">Full Tray Image</span>
                      </div>
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-brand-dark">
                      Full Tray
                    </p>
                    <p className="text-xs text-neutral-600">Serves ~30</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      
      {/* Footer Section */}
      <Section background="red">
        <div className="space-y-4 py-12 text-center text-white">
          <div className="space-y-2 text-sm md:text-base">
            <p className="font-semibold uppercase tracking-wide">
              Pickup Pricing: All prices listed are for pickup.
            </p>
            <p className="font-semibold uppercase tracking-wide">
              Delivery Available: Additional fee based on distance.
            </p>
            <p className="text-xs text-white/80 md:text-sm">
              Tax: Prices listed do not include sales tax.
            </p>
          </div>
          <div className="pt-4 text-sm text-white/70">
            <p>
              Questions? Call{" "}
              <a href={`tel:${siteConfig.phone}`} className="underline hover:text-white">
                {siteConfig.phone}
              </a>{" "}
              or email{" "}
              <a href={`mailto:${siteConfig.email}`} className="underline hover:text-white">
                {siteConfig.email}
              </a>
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}

