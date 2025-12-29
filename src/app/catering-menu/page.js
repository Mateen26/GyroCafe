  "use client";

  import { useState, useEffect } from "react";
  import Image from "next/image";
  import { motion } from "framer-motion";
  import { siteConfig } from "@/lib/config";
  import { FaFacebookF, FaInstagram } from "react-icons/fa";
  import "./cateringMenuFx.css";

  export default function CateringMenuPage() {
    const [showEffects, setShowEffects] = useState(true);

    useEffect(() => {
      // Remove overlay elements after animations complete (~3.5s total)
      const timer = setTimeout(() => {
        setShowEffects(false);
      }, 3500);

      return () => clearTimeout(timer);
    }, []);

    return (
      <main className="min-h-screen py-8" style={{ backgroundImage: 'url(/cateringmainbg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        {/* Flyer Canvas Container with Framer Motion */}
        <motion.div
          className="mx-auto max-w-[1024px] bg-[#800000] relative rounded-2xl overflow-hidden"
          style={{
            boxShadow: `
              0 0 150px 40px rgba(0, 0, 0, 0.9),
              0 0 100px 20px rgba(139, 0, 0, 0.4),
              0 0 60px 10px rgba(0, 0, 0, 0.8),
              inset 0 0 120px 40px rgba(0, 0, 0, 0.5),
              inset 0 0 80px 20px rgba(80, 0, 0, 0.3)
            `
          }}
          initial={{ scale: 0.7, filter: "blur(10px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.65,
            type: "spring",
            bounce: 0.4,
            stiffness: 100,
          }}
        >
          {/* Top Header Area */}
          <div className="relative bg-[#800000] p-4 border-b border-neutral-700">
            {/* Red Diagonal Corner Accent */}
            <div className="absolute top-0 right-0 w-0 h-0 border-l-[120px] border-l-transparent border-t-[120px] border-t-[#351010]"></div>
            
            <div className="relative flex items-start justify-between gap-4">
              {/* Left: Logo + Wordmark */}
              <div className="flex items-center gap-3 flex-shrink-0 z-10">
                <div className="relative h-32 w-32">
                  <Image
                    src="/logo.jpeg"
                    alt="Gyro Cafe logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Center/Right: Title and Contact Info */}
              <div className="flex-1 text-right z-10">
                <h1 className="text-5xl font-bold uppercase tracking-tight text-white mb-2">
                  Catering Menu
                </h1>
                {/* Gold Divider Line */}
                <div className="h-0.5 bg-[#f2b705] mb-2"></div>
                <p className="text-sm font-semibold uppercase tracking-wide text-[#f2b705] mb-2">
                  HALF TRAY – SERVES APPROX. 15 | FULL TRAY – SERVES – 30
                </p>
                <div className="space-y-1 text-sm text-[#f2b705]">
                  <a href={`tel:${siteConfig.phone}`} className="block hover:text-[#f2d466]">
                    {siteConfig.phone}
                  </a>
                  <a href={`mailto:${siteConfig.email}`} className="block hover:text-[#f2d466]">
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              {/* Top-Right: Social Icons Stacked */}
              <div className="flex flex-col gap-2 z-10">
                <a
                  href={siteConfig.social?.[1]?.href || "https://facebook.com/gyrocafe"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="grid h-10 w-10 place-items-center rounded-full bg-[#b51212] text-white transition hover:bg-red-700"
                >
                  <FaFacebookF />
                </a>
                <a
                  href={siteConfig.social?.[0]?.href || "https://instagram.com/gyrocafebk"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="DoorDash"
                  className="grid h-10 w-10 place-items-center rounded-full bg-[#b51212] text-white font-bold transition hover:bg-red-700"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>

          {/* Protein Trays Section */}
          <div className="p-4">
            {/* Dark Header Bar */}
            <div className="bg-[#111] px-4 py-3 mb-0 rounded-t-lg flex items-center">
              <h2 className="text-xl font-bold uppercase tracking-tight text-white mr-4">GYRO TRAYS</h2>
              <div className="h-0.5 bg-[#f2b705] flex-1"></div>
            </div>
            
            {/* Light Gray Panel */}
            <div className="bg-[#ededed] rounded-xs p-4 border border-neutral-300" style={{ backgroundImage: 'url(/tablebg.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
              {/* 3-Column Table Header - Yellow Background */}
              <div className="grid grid-cols-3 border-l border-r rounded-tl-lg rounded-tr-lg border-[#111] mb-0">
                <div className="bg-[#f2b705] font-bold uppercase text-sm text-[#111] px-4 py-3 border-r-2 border-[#111] rounded-tl-lg">GYRO TRAYS</div>
                <div className="bg-[#f2b705] font-bold uppercase text-sm text-[#111] text-center px-4 py-3 border-r-2 border-[#111]">15 People</div>
                <div className="bg-[#f2b705] font-bold uppercase text-sm text-[#111] text-center px-4 py-3">30 People</div>
              </div>
              
              {/* Rows */}
              <div className="border-l border-r border-[#111]">
                <div className="grid grid-cols-3 border-b-2 border-[#111]">
                  <div className="text-sm font-bold text-[#b51212] px-4 py-3 border-r-2 border-[#111]">Chicken Gyro</div>
                  <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3 border-r-2 border-[#111]">$105</div>
                  <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3">$200</div>
                </div>
                <div className="grid grid-cols-3 border-b-2 border-[#111]">
                  <div className="text-sm font-bold text-[#b51212] px-4 py-3 border-r-2 border-[#111]">Mixed Gyro (Chicken & Lamb)</div>
                  <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3 border-r-2 border-[#111]">$120</div>
                  <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3">$210</div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="text-sm font-bold text-[#b51212] px-4 py-3 border-r-2 border-[#111]">Lamb Gyro</div>
                  <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3 border-r-2 border-[#111]">$140</div>
                  <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3">$240</div>
                </div>
              </div>
              
            </div>
          </div>
              {/* Note Below Table - Black Background, Yellow Text */}
              <div className="bg-[#111] px-4 mx-4 py-3  text-center -mt-2">
                <p className="text-md   text-[#f2b705] leading-relaxed">
                  All protein trays include one half tray of our signature white sauce and hot sauce.
                  <br />
                <p className="text-md  text-white leading-relaxed">Additional sauce trays available upon request.</p>
                </p>
              </div>

          {/* Curry Trays Section */}
          <div className="p-4 -mt-3">
            {/* Dark Header Bar */}
            <div className="bg-[#111] px-4 py-3 mb-0 rounded-t-lg flex items-center">
              <h2 className="text-xl font-bold uppercase tracking-tight text-white mr-4">CURRY TRAYS</h2>
              <div className="h-0.5 bg-[#f2b705] flex-1"></div>
            </div>
            
            {/* Light Gray Panel */}
            <div className="bg-[#ededed] p-4 border border-neutral-300 rounded-xs" style={{ backgroundImage: 'url(/tablebg.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
              {/* 3-Column Table Header - Yellow Background */}
              <div className="grid grid-cols-3 border-l border-r rounded-tl-lg rounded-tr-lg border-[#111] mb-0">
                <div className="bg-[#f2b705] font-bold uppercase text-sm text-[#111] px-4 py-3 border-r-2 border-[#111]">CURRY TRAYS</div>
                <div className="bg-[#f2b705] font-bold uppercase text-sm text-[#111] text-center px-4 py-3 border-r-2 border-[#111]">15 People</div>
                <div className="bg-[#f2b705] font-bold uppercase text-sm text-[#111] text-center px-4 py-3">30 People</div>
              </div>
              
              {/* Rows */}
              <div className="border-l border-r border-[#111]">
                <div className="grid grid-cols-3 border-b-2 border-[#111]">
                  <div className="text-sm font-bold text-[#b51212] px-4 py-3 border-r-2 border-[#111]">Chicken Curry</div>
                  <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3 border-r-2 border-[#111]">$95</div>
                  <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3">$165</div>
                </div>
                <div className="grid grid-cols-3 border-b-2 border-[#111]">
                  <div className="text-sm font-bold text-[#b51212] px-4 py-3 border-r-2 border-[#111]">Lamb Curry</div>
                  <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3 border-r-2 border-[#111]">$130</div>
                  <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3">$225</div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="text-sm font-bold text-[#b51212] px-4 py-3 border-r-2 border-[#111]">Vegetarian Chickpea Curry</div>
                  <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3 border-r-2 border-[#111]">$80</div>
                  <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3">$140</div>
                </div>
              </div>
            </div>
          </div>

          {/* Two-Column Bottom Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 items-start">
            {/* Left Column */}
            <div className="flex flex-col">
              {/* & SIDES ADD-ONS */}
              <div id="sides-add-ons-section">
                <div className="bg-[#111] px-4 py-3 mb-0 rounded-t-lg">
                  <h2 className="text-xl font-bold uppercase tracking-tight text-[#f2b705]">SIDES ADD-ONS</h2>
                  <div className="h-0.5 bg-[#f2b705] mt-1"></div>
                </div>
                <div className="bg-[#ededed] rounded-xs p-4 border border-neutral-300" style={{ backgroundImage: 'url(/tablebg.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                  {/* 3-Column Table Header - Yellow Background */}
                  <div className="grid grid-cols-3 border-l border-r rounded-tl-lg rounded-tr-lg border-[#111] mb-0">
                    <div className="bg-[#f2b705] font-bold uppercase text-sm text-[#111] px-4 py-3 border-r-2 border-[#111] rounded-tl-lg">SIDES ADD-ONS</div>
                    <div className="bg-[#f2b705] font-bold uppercase text-sm text-[#111] text-center px-4 py-3 border-r-2 border-[#111]">15 People</div>
                    <div className="bg-[#f2b705] font-bold uppercase text-sm text-[#111] text-center px-4 py-3">30 People</div>
                  </div>
                  
                  {/* Rows */}
                  <div className="border-l border-r border-[#111]">
                    <div className="grid grid-cols-3 border-b-2 border-[#111]">
                      <div className="text-sm font-bold text-[#b51212] px-4 py-3 border-r-2 border-[#111]">Basmati Rice</div>
                      <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3 border-r-2 border-[#111]">$40</div>
                      <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3">FULL TRAY $65</div>
                    </div>
                    <div className="grid grid-cols-3 border-b-2 border-[#111]">
                      <div className="text-sm font-bold text-[#b51212] px-4 py-3 border-r-2 border-[#111]">Pita Bread</div>
                      <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3 border-r-2 border-[#111]">$25</div>
                      <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3">FULL TRAY $40</div>
                    </div>
                    <div className="grid grid-cols-3 border-b-2 border-[#111]">
                      <div className="text-sm font-bold text-[#b51212] px-4 py-3 border-r-2 border-[#111]">Falafel</div>
                      <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3 border-r-2 border-[#111]">25 pieces</div>
                      <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3">(30 pieces) $55</div>
                    </div>
                    <div className="grid grid-cols-3 border-b-2 border-[#111]">
                      <div className="text-sm font-bold text-[#b51212] px-4 py-3 border-r-2 border-[#111]">Hummus</div>
                      <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3 border-r-2 border-[#111]">One size</div>
                      <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3">tray $45</div>
                    </div>
                    <div className="grid grid-cols-3 border-b-2 border-[#111]">
                      <div className="text-sm font-bold text-[#b51212] px-4 py-3 border-r-2 border-[#111]">Garden Salad</div>
                      <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3 border-r-2 border-[#111]">$55</div>
                      <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3">FULL TRAY $75</div>
                    </div>
                    <div className="grid grid-cols-3">
                      <div className="text-sm font-bold text-[#b51212] px-4 py-3 border-r-2 border-[#111]">Shepherd Salad</div>
                      <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3 border-r-2 border-[#111]">$65</div>
                      <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3">FULL TRAY $95</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ADDITIONAL SAUCE OPTIONS */}
              <div className="mt-0">
                <div className="bg-[#f2b705] px-4 py-3 mb-0 rounded-t-lg">
                  <h2 className="text-xl font-bold uppercase tracking-tight text-black">ADDITIONAL SAUCE OPTIONS</h2>
                </div>
                <div className="bg-[#ededed] p-4 border border-neutral-300" style={{ backgroundImage: 'url(/tablebg.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                  <div className="space-y-2">
                    <div className="flex justify-between py-1 border-b border-neutral-300">
                      <span className="text-sm font-medium text-[#111]">Extra White Sauce (half tray)</span>
                      <span className="text-sm font-bold text-[#b51212]">$25</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-300">
                      <span className="text-sm font-medium text-[#111]">Extra Hot Sauce (half tray)</span>
                      <span className="text-sm font-bold text-[#b51212]">$25</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-sm font-medium text-[#111]">Mango Sauce (half tray)</span>
                      <span className="text-sm font-bold text-[#b51212]">$30</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fine Print */}
             
            </div>

            {/* Right Column: TRAY SIZE GUIDE */}
            <div className="flex flex-col self-start h-fit">
              <div className="bg-[#111] px-4 py-3 mb-0 rounded-t-lg">
                <h2 className="text-xl font-bold uppercase tracking-tight text-white">TRAY SIZE GUIDE</h2>
                <div className="h-0.5 bg-[#f2b705] mt-1"></div>
              </div>
              <div className="bg-[#ededed] p-4 border border-neutral-300 sm:max-h-[430px] lg:max-h-[560px] sm:flex sm:flex-col sm:justify-between" style={{ backgroundImage: 'url(/tablebg.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                {/* Half Tray */}
                <div className="flex flex-col items-center justify-center flex-1">
                  <div className="relative w-full h-[150px] sm:h-[170px] lg:h-[220px]">
                    <Image
                      src="/catering/RED_ALUM_TRAY_HALF.png"
                      alt="Half Tray"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-[16px] font-bold uppercase tracking-wide text-[#db0909] text-center my-3">
                    HALF TRAY – SERVES ~15
                  </p>
                </div>
                
                {/* Full Tray */}
                <div className="flex flex-col items-center justify-center flex-1 mt-4 sm:mt-0">
                  <div className="relative w-full h-[150px] sm:h-[170px] lg:h-[190px]">
                    <Image
                      src="/catering/RED_ALUM_TRAY_FULL.png"
                      alt="Full Tray"
                      fill
                      className="object-contain my-2"
                    />
                  </div>
                  <p className="text-[16px] font-bold uppercase tracking-wide text-[#db0909] text-center mt-6">
                    FULL TRAY – SERVES ~30
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-1 text-md font-bold text-white leading-tight mt-4 text-center my-2">
                <p className="uppercase whitespace-nowrap"> <span className="text-[#f2b705]">DELIVERY AVAILABLE:</span> Delivery can be arranged for an additional fee based on distance and order total.</p>
                <p className="italic whitespace-nowrap">*Prices listed do not include sales tax.</p>
              </div>

          {/* Footer: Red Bar */}
          <div className="bg-[#b51212] p-4 text-white">
            <div className="space-y-2 text-sm text-center">
              <div className="space-y-1">
                <p className="whitespace-nowrap">{siteConfig.phone}</p>
                <p className="whitespace-nowrap">www.GyroCafeBK.com</p>
                <p className="whitespace-nowrap">{siteConfig.address}</p>
              </div>
            </div>
          </div>

          {/* Smoke Overlay Effects - Inside Menu Container */}
          {showEffects && (
            <>
              <div className="smoke-overlay smoke-left" />
              <div className="smoke-overlay smoke-right" />
              <div className="smoke-overlay smoke-top" />
              <div className="smoke-overlay smoke-bottom" />
            </>
          )}

          {/* Crack Overlay Effects - Inside Menu Container */}
          {showEffects && (
            <>
              <div className="crack-overlay crack-top-left" />
              <div className="crack-overlay crack-top-right" />
              <div className="crack-overlay crack-bottom-left" />
              <div className="crack-overlay crack-bottom-right" />
            </>
          )}
        </motion.div>
      </main>
    );
  }
