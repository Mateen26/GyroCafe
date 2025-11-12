import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

import { siteConfig } from "@/lib/config";

const footerLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "Order Pickup", href: siteConfig.ctas.pickup.href },
  {
    label: "Order Delivery",
    href: siteConfig.deliveryUrl,
    external: true,
  },
];

const socialIcons = [
  { label: "Instagram", href: "https://instagram.com/gyrocafebk", icon: FaInstagram },
  { label: "Facebook", href: "https://facebook.com/gyrocafe", icon: FaFacebookF },
  { label: "TikTok", href: "https://tiktok.com/@gyrocafe", icon: FaTiktok },
];

export function Footer() {
  return (
    <footer className="bg-brand-red text-white">
      <div className="mx-auto flex w-full max-w-[135rem] flex-col gap-10 px-6 py-14 lg:flex-row lg:items-start lg:justify-between lg:px-16">
        <div className="flex flex-col gap-4">
          <div className="relative h-16 w-32">
            <Image
              src="/logo.jpeg"
              alt="Gyro Cafe logo"
              fill
              className="object-contain"
            />
          </div>
          <p className="max-w-sm text-sm uppercase tracking-[0.3em] text-white/80">
            {siteConfig.tagline}
          </p>
          <p className="text-sm text-white/80">
            Serving Brooklyn since 2007 · {siteConfig.address} · {siteConfig.phone}
          </p>
        </div>

        <div className="flex flex-col gap-4 text-sm uppercase tracking-wide">
          <span className="font-semibold text-white">Quick Links</span>
          <nav className="flex flex-col gap-3">
            {footerLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-black"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition hover:text-black"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>

        <div className="flex flex-col gap-4 text-sm uppercase tracking-wide">
          <span className="font-semibold text-white">Stay Connected</span>
          <p className="text-white/80">
            {siteConfig.social?.[0]?.handle ?? "@GyroCafeBK"}
          </p>
          <div className="flex items-center gap-3">
            {socialIcons.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/40 text-lg transition hover:bg-white hover:text-brand-red"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-2 px-6 py-6 text-xs uppercase tracking-widest text-white/70 md:flex-row md:items-center md:justify-between lg:px-16">
          <span>© {new Date().getFullYear()} Gyro Cafe · Established 2007</span>
          <span>All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
}

