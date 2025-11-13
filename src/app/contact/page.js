import { Button } from "@/components/Button";
import { ContactForm } from "@/components/ContactForm";
import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/config";

export const metadata = {
  title: "Contact Gyro Cafe",
  description:
    "Get in touch with Gyro Cafe for catering, events, or questions. Located at 580 Coney Island Ave, Brooklyn, NY 11218.",
};

export default function ContactPage() {
  return (
    <main className="flex flex-col">
      <Section background="red">
        <div className="space-y-5 text-white py-20">
          <p className="text-lg uppercase tracking-[0.4em] text-white">
            Say Hello
          </p>
          <h1 className="text-4xl font-bold uppercase tracking-tight md:text-5xl">
            Contact Gyro Cafe
          </h1>
          <p className="text-base leading-relaxed text-white/80 md:text-lg">
            Questions about catering, large orders, or special dietary requests?
            Drop us a line. We’re here 7 days a week and always down to talk
            sauce.
          </p>
          <div className="flex flex-wrap gap-3 text-xs uppercase tracking-widest text-white/70">
            <span>{siteConfig.address}</span>
            <span>Phone: {siteConfig.phone}</span>
            <span>Email: {siteConfig.email}</span>
          </div>
        </div>
      </Section>

      <Section background="white">
        <div className="grid gap-12 lg:grid-cols-[1fr,1.1fr] py-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-brand-dark">
              Visit or Reach Out
            </h2>
            <p className="text-sm text-neutral-600">
              We’re serving Brooklyn every day from 10 AM – 1 AM. Stop by, give us
              a call, or message us here. We’ll reply within a business day.
            </p>
            <div className="space-y-2 text-sm text-neutral-600">
              <p>
                <span className="font-semibold text-brand-dark">Pickup Only:</span>{" "}
                Order directly on this site for the best pricing.
              </p>
              <p>
                <span className="font-semibold text-brand-dark">Delivery:</span>{" "}
                Use our partners like UberEats and DoorDash for delivery service.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/order-pickup">Order Pickup</Button>
              <Button href={siteConfig.deliveryUrl} external variant="outline">
                Delivery Partners
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            <ContactForm />
            <div className="overflow-hidden rounded-3xl border border-neutral-200 shadow-lg">
              <iframe
                title="Gyro Cafe Brooklyn Map"
                src={siteConfig.map.embedUrl}
                className="h-[320px] w-full"
                loading="lazy"
                allowFullScreen
              />
              <a
                href={siteConfig.map.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-neutral-100 py-3 text-center text-xs font-semibold uppercase tracking-widest text-brand-red transition hover:bg-neutral-200"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}

