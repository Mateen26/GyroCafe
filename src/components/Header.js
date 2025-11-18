"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { HiMiniBars3, HiMiniXMark } from "react-icons/hi2";

import { siteConfig } from "@/lib/config";
import { useCart } from "./cart/CartContext";

const deliveryUrl = siteConfig.deliveryUrl;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount, openCart } = useCart();

  const primaryLinks = useMemo(
    () => siteConfig.navLinks ?? [],
    []
  );

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-600 items-center justify-between gap-4 px-4 py-0 lg:px-16">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-brand-dark shadow-sm md:hidden"
            aria-label="Open navigation menu"
          >
            <HiMiniBars3 className="text-2xl" />
          </button>

          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-24 w-32 shrink-0">
              <Image
                src="/logo.jpeg"
                alt="Gyro Cafe logo"
                fill
                priority
                className="object-contain"
              />
            </div>
            {/* <div className="hidden text-left sm:flex sm:flex-col">
              <span className="text-sm uppercase tracking-[0.2em] text-neutral-500">
                {siteConfig.since}
              </span>
              <span className="font-semibold uppercase tracking-tight text-brand-dark">
                {siteConfig.name}
              </span>
            </div> */}
          </Link>

          {/* {siteConfig.halalCertified ? (
            <span className="hidden rounded-full border border-brand-red/20 bg-brand-red/10 px-3 py-1 text-xs font-semibold uppercase text-brand-red md:inline-flex">
              Halal Certified
            </span>
          ) : null} */}
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium uppercase tracking-wide text-neutral-700 md:flex xl:gap-10">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-1.5 transition hover:text-brand-red"
            >
              {link.icon && (
                <span className="animate-fire text-base">{link.icon}</span>
              )}
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={siteConfig.ctas.pickup.href}
            className="hidden rounded-full border border-brand-red bg-brand-red px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-md shadow-brand-red/20 transition hover:opacity-90 md:inline-block"
          >
            {siteConfig.ctas.pickup.label}
          </Link>
          <a
            href={deliveryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-brand-red px-4 py-2 text-sm font-semibold uppercase tracking-wide text-brand-red transition hover:bg-brand-red/10 md:inline-block"
          >
            {siteConfig.ctas.delivery.label}
          </a>
          <button
            type="button"
            onClick={openCart}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 text-brand-dark transition hover:border-brand-red hover:text-brand-red"
            aria-label="Open cart"
          >
            <HiOutlineShoppingBag className="text-2xl" />
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-red px-1 text-[11px] font-semibold text-white">
                {cartCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      <MobileMenu
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        links={primaryLinks}
      />
    </header>
  );
}

function MobileMenu({ open, onClose, links }) {
  const [mounted, setMounted] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Ensure component is mounted before using portal
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const menuContent = (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
        style={{ zIndex: 9998 }}
      />

      {/* Menu Drawer */}
      <div
        className={`fixed left-0 top-0 h-full w-[85%] max-w-xs transform bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          zIndex: 9999,
          visibility: open ? "visible" : "visible",
          willChange: "transform",
        }}
      >
        <div className="flex h-full flex-col overflow-y-auto p-6">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">
              {siteConfig.since}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition hover:border-brand-red hover:text-brand-red"
            >
              <HiMiniXMark className="text-xl" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="flex items-center gap-2 text-lg font-semibold uppercase tracking-wide text-brand-dark transition hover:text-brand-red"
              >
                {link.icon && (
                  <span className="animate-fire text-lg">{link.icon}</span>
                )}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="mt-8 space-y-3">
            <Link
              href={siteConfig.ctas.pickup.href}
              onClick={onClose}
              className="block rounded-full border border-brand-red bg-brand-red px-5 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white shadow-md shadow-brand-red/20 transition hover:opacity-90"
            >
              {siteConfig.ctas.pickup.label}
            </Link>
            <a
              href={deliveryUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="block rounded-full border border-brand-red px-5 py-3 text-center text-sm font-semibold uppercase tracking-wide text-brand-red transition hover:bg-brand-red/10"
            >
              {siteConfig.ctas.delivery.label}
            </a>
          </div>

          {/* Footer Text */}
          <p className="mt-auto pt-6 text-xs uppercase tracking-wide text-neutral-500">
            Open Late · Family-Owned · Brooklyn Classic
          </p>
        </div>
      </div>
    </>
  );

  // Render menu in a portal at document.body level
  return createPortal(menuContent, document.body);
}

