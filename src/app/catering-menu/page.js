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
          <div className="relative bg-[#800000] p-3 sm:p-4 border-b border-neutral-700">
            {/* Red Diagonal Corner Accent */}
            <div className="hidden sm:block absolute top-0 right-0 w-0 h-0 border-l-[120px] border-l-transparent border-t-[120px] border-t-[#351010]"></div>
            
            <div className="relative flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
              {/* Left: Logo + Wordmark */}
              <div className="flex items-center justify-center gap-4 sm:gap-3 flex-shrink-0 z-10">
                <div className="relative h-32 w-32 sm:h-36 sm:w-36 lg:h-40 lg:w-40">
                  <Image
                    src="/logo.jpeg"
                    alt="Gyro Cafe logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="relative h-32 w-32 sm:h-36 sm:w-36 lg:h-40 lg:w-40 opacity-90">
                  <Image
                    src="/catering/logo1.svg"
                    alt="Decorative food icon"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Center/Right: Title and Contact Info */}
              <div className="flex-1 text-center sm:text-right z-10">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white mb-2">
                  Catering Menu
                </h1>
                {/* Gold Divider Line */}
                <div className="h-0.5 bg-[#f2b705] mb-2"></div>
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-[#f2b705] mb-2">
                  HALF TRAY – SERVES APPROX. 15 | FULL TRAY – SERVES – 30
                </p>
                {/* Contact Info - Flex Row */}
                <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 text-xs sm:text-sm text-[#f2b705] mb-3 sm:mb-0">
                  <a href={`tel:${siteConfig.phone}`} className="hover:text-[#f2d466]">
                    {siteConfig.phone}
                  </a>
                  <span className="hidden sm:inline">|</span>
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-[#f2d466]">
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              {/* Top-Right: Social Icons Row */}
              <div className="flex flex-row sm:flex-col gap-3 sm:gap-2 z-10">
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
            <div className="bg-[#ededed] rounded-xs p-4 border border-neutral-300 relative" style={{ backgroundImage: 'url(/tablebg.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
              <div className="absolute inset-0 pointer-events-none opacity-15 rounded-xs" style={{ backgroundImage: 'url(/catering/logo1.svg), url(/catering/logo2.svg)', backgroundSize: '200px, 200px', backgroundPosition: 'top 15px left 15px, top 15px right 15px', backgroundRepeat: 'no-repeat, no-repeat' }}></div>
              <div className="relative z-10">
              {/* 3-Column Table Header - Yellow Background */}
              <div className="grid grid-cols-3 border-l border-r rounded-tl-lg rounded-tr-lg border-[#111] mb-0">
                <div className="bg-[#f2b705] font-bold uppercase text-sm text-[#111] px-4 py-3 border-r-2 border-[#111] rounded-tl-lg">GYRO TRAYS</div>
                <div className="bg-[#f2b705] font-bold uppercase text-sm text-[#111] text-center px-4 py-3 border-r-2 border-[#111]">15 People (half tray)</div>
                <div className="bg-[#f2b705] font-bold uppercase text-sm text-[#111] text-center px-4 py-3">30 People (full tray)</div>
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
            <div className="bg-[#ededed] p-4 border border-neutral-300 rounded-xs relative" style={{ backgroundImage: 'url(/tablebg.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
              <div className="absolute inset-0 pointer-events-none opacity-15 rounded-xs" style={{ backgroundImage: 'url(/catering/logo2.svg), url(/catering/logo1.svg)', backgroundSize: '200px, 200px', backgroundPosition: 'top 15px left 15px, top 15px right 15px', backgroundRepeat: 'no-repeat, no-repeat' }}></div>
              <div className="relative z-10">
              {/* 3-Column Table Header - Yellow Background */}
              <div className="grid grid-cols-3 border-l border-r rounded-tl-lg rounded-tr-lg border-[#111] mb-0">
                <div className="bg-[#f2b705] font-bold uppercase text-sm text-[#111] px-4 py-3 border-r-2 border-[#111]">CURRY TRAYS</div>
                <div className="bg-[#f2b705] font-bold uppercase text-sm text-[#111] text-center px-4 py-3 border-r-2 border-[#111]">15 People (half tray)</div>
                <div className="bg-[#f2b705] font-bold uppercase text-sm text-[#111] text-center px-4 py-3">30 People (full tray)</div>
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
                    <div className="bg-[#f2b705] font-bold uppercase text-sm text-[#111] text-center px-4 py-3 border-r-2 border-[#111]">15 people (half tray)</div>
                    <div className="bg-[#f2b705] font-bold uppercase text-sm text-[#111] text-center px-4 py-3">30 people (full tray)</div>
                  </div>
                  
                  {/* Rows */}
                  <div className="border-l border-r border-[#111]">
                    <div className="grid grid-cols-3 border-b-2 border-[#111]">
                      <div className="text-sm font-bold text-[#b51212] px-4 py-3 border-r-2 border-[#111]">Basmati Rice</div>
                      <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3 border-r-2 border-[#111]">$40</div>
                      <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3"> $65</div>
                    </div>
                    <div className="grid grid-cols-3 border-b-2 border-[#111]">
                      <div className="text-sm font-bold text-[#b51212] px-4 py-3 border-r-2 border-[#111]">Pita Bread</div>
                      <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3 border-r-2 border-[#111]">$25</div>
                      <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3"> $40</div>
                    </div>
                    <div className="grid grid-cols-3 border-b-2 border-[#111]">
                      <div className="text-sm font-bold text-[#b51212] px-4 py-3 border-r-2 border-[#111]">Falafel</div>
                      <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3 border-r-2 border-[#111]">$25 (30 pieces) </div>
                      <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3">$55 (60 pieces)</div>
                    </div>
                    <div className="grid grid-cols-3 border-b-2 border-[#111]">
                      <div className="text-sm font-bold text-[#b51212] px-4 py-3 border-r-2 border-[#111]">Hummus</div>
                      <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3 col-span-2">$45</div>
                    </div>
                    <div className="grid grid-cols-3 border-b-2 border-[#111]">
                      <div className="text-sm font-bold text-[#b51212] px-4 py-3 border-r-2 border-[#111]">Garden Salad</div>
                      <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3 border-r-2 border-[#111]">$55</div>
                      <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3"> $75</div>
                    </div>
                    <div className="grid grid-cols-3">
                      <div className="text-sm font-bold text-[#b51212] px-4 py-3 border-r-2 border-[#111]">Shepherd Salad</div>
                      <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3 border-r-2 border-[#111]">$65</div>
                      <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3"> $95</div>
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
              <div className="bg-[#111] px-4 py-3 mb-0 rounded-t-lg flex items-center gap-3">
                <div className="relative h-8 w-8 opacity-70">
                  <Image
                    src="/catering/logo2.svg"
                    alt="Decorative food icon"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold uppercase tracking-tight text-white">TRAY SIZE GUIDE</h2>
                  <div className="h-0.5 bg-[#f2b705] mt-1"></div>
                </div>
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
                  <div className="relative w-full h-[150px] sm:h-[170px] lg:h-[200px]">
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
          <div className="space-y-1  font-bold text-white leading-tight mt-4 text-center my-2">
                <p className="uppercase text-[11.8px] whitespace-nowrap " >These are only our classic menu items. We cater everything on our menu. please speak to a manager for details on catering any items not listed here. </p>
                <p className="italic whitespace-nowrap text-md text-[#f2b705]">LISTED PRICES ARE FOR PICKUP ONLY. DELIVERY CAN BE ARRANGED AT ADDITIONAL CHARGE. TAX NOT INCLUDED</p>
              </div>
          {/* <div className="space-y-1 text-md font-bold text-white leading-tight mt-4 text-center my-2">
                <p className="uppercase whitespace-nowrap"> <span className="text-[#f2b705]">DELIVERY AVAILABLE:</span> Delivery can be arranged for an additional fee based on distance and order total.</p>
                <p className="italic whitespace-nowrap">*Prices listed do not include sales tax.</p>
              </div> */}

          {/* Footer: Red Bar */}
          <div className="bg-[#b51212] p-4 text-white">
            <div className="text-center">
              <p className="text-lg font-bold">
                <span>{siteConfig.phone}</span>
                <span className="mx-4 text-[#f2b705]">|</span>
                <span>www.GyroCafeBK.com</span>
                <span className="mx-4 text-[#f2b705]">|</span>
                <span>{siteConfig.address}</span>
              </p>
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
