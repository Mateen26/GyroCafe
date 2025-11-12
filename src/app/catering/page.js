import { CateringForm } from "@/components/CateringForm";
import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/config";

export const metadata = {
  title: "Catering · Gyro Cafe",
  description:
    "Plan your next event with Gyro Cafe catering. Platters, wraps, sauces, and late-night favorites for corporate events, weddings, and celebrations.",
};

export default function CateringPage() {
  return (
    <main className="flex flex-col">
      <Section background="red">
        <div className="space-y-5 text-white">
          <p className="text-xs uppercase tracking-[0.4em] text-white/70">
            Catering · Brooklyn & Beyond
          </p>
          <h1 className="text-4xl font-bold uppercase tracking-tight md:text-5xl">
            Feed the Crew the Café Way
          </h1>
          <p className="text-base leading-relaxed text-white/80 md:text-lg">
            From late-night film shoots to family gatherings, we bring halal
            platters, wraps, and our signature SAÜCED trio to you. We recommend
            72 hours notice — submitting this form starts the conversation, but
            confirmation comes directly from our team.
          </p>
          <p className="text-sm uppercase tracking-widest text-white/70">
            Questions? Call {siteConfig.phone} or email {siteConfig.email}
          </p>
        </div>
      </Section>

      <Section background="white">
        <div className="mx-auto w-full max-w-3xl space-y-10">
          <header className="space-y-3 text-center">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-brand-dark">
              Catering Request Form
            </h2>
            <p className="text-sm text-neutral-600">
              Share your event details below. Our catering coordinator will
              follow up within 24 hours to confirm availability, pricing, and
              menu recommendations.
            </p>
          </header>

          <CateringForm />
        </div>
      </Section>
    </main>
  );
}

