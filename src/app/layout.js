import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NavigationProgress } from "@/components/NavigationProgress";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/components/cart/CartContext";
import { UpsellModalWrapper } from "@/components/UpsellModalWrapper";
import { UpgradeModalWrapper } from "@/components/UpgradeModalWrapper";
import { WingFlavorModalWrapper } from "@/components/WingFlavorModalWrapper";
import { siteConfig } from "@/lib/config";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${siteConfig.name} · Brooklyn's Classic Gyro Cafe`;
const description =
  "Gyro Cafe has served Brooklyn since 2007 with halal platters, gyros, naanwiches, and our signature SAÜCED trio. Order pickup and get it fresh.";

export const metadata = {
  title: {
    default: title,
    template: `%s · ${siteConfig.name}`,
  },
  description,
  openGraph: {
    title,
    description,
    url: "https://gyrocafe.example.com",
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }) {
  const googleTagId = siteConfig.googleTagId;
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white text-brand-dark antialiased`}
      >
        {/* Google tag (gtag.js) */}
        {googleTagId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleTagId}');
              `}
            </Script>
          </>
        )}
        <CartProvider>
          <NavigationProgress />
          <Header />
          <CartDrawer />
          <UpsellModalWrapper />
          <UpgradeModalWrapper />
          <WingFlavorModalWrapper />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
