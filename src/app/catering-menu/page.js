import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export const metadata = {
  title: "Catering Menu · Gyro Cafe",
  description:
    "Gyro Cafe catering menu with pricing for gyro trays, curry trays, sides, and sauces. Half trays serve 15, full trays serve 30.",
};

export default function CateringMenuPage() {
  return (
    <main className="min-h-screen  py-8">
      {/* Flyer Canvas Container */}
      <div className="mx-auto max-w-[1024px] bg-[#800000] shadow-2xl border border-neutral-800">
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
            <h2 className="text-xl font-bold uppercase tracking-tight text-white mr-4">PROTEIN TRAYS</h2>
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
                <div className="text-sm font-bold text-[#b51212] text-center px-4 py-3">$182</div>
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
        <div className="grid grid-cols-1 lg:grid-cols-2  p-4 -mt-8">
          {/* Left Column */}
          <div className="flex flex-col">
            <div className="flex flex-col">
              {/* & SIDES ADD-ONS */}
              <div>
                <div className="bg-[#111] px-4 py-3 mb-0 rounded-t-lg">
                  <h2 className="text-xl font-bold uppercase tracking-tight text-[#f2b705]">& SIDES ADD-ONS</h2>
                  <div className="h-0.5 bg-[#f2b705] mt-1"></div>
                </div>
                <div className="bg-[#ededed] p-4 border border-neutral-300" style={{ backgroundImage: 'url(/tablebg.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                  <div className="space-y-2">
                    <div className="flex justify-between py-1 border-b border-neutral-300">
                      <span className="text-sm font-medium text-[#111]">Basmati Rice</span>
                      <div className="text-sm text-[#111]">
                        <span className="font-bold text-[#b51212]">$40</span> | <span>FULL TRAY $65</span>
                      </div>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-300">
                      <span className="text-sm font-medium text-[#111]">Pita Bread</span>
                      <div className="text-sm text-[#111]">
                        <span className="font-bold text-[#b51212]">$25</span> | <span>FULL TRAY $40</span>
                      </div>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-300">
                      <span className="text-sm font-medium text-[#111]">Falafel</span>
                      <span className="text-sm text-[#111]">25 pieces (30 pieces) <span className="font-bold text-[#b51212]">$55</span></span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-300">
                      <span className="text-sm font-medium text-[#111]">Hummus</span>
                      <span className="text-sm text-[#111]">One size tray <span className="font-bold text-[#b51212]">$45</span></span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-300">
                      <span className="text-sm font-medium text-[#111]">Garden Salad</span>
                      <div className="text-sm text-[#111]">
                        <span className="font-bold text-[#b51212]">$55</span> | <span>FULL TRAY $75</span>
                      </div>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-sm font-medium text-[#111]">Shepherd Salad</span>
                      <div className="text-sm text-[#111]">
                        <span className="font-bold text-[#b51212]">$65</span> | <span>FULL TRAY $95</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ADDITIONAL SAUCE OPTIONS */}
              <div>
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
            </div>

            {/* Fine Print */}
            <div className="space-y-1 text-xs text-white leading-tight mt-4">
              <p className="font-semibold uppercase whitespace-nowrap">PICKUP PRICING:</p>
              <p className="uppercase whitespace-nowrap">DELIVERY AVAILABLE: Delivery can be arranged for an additional fee based on distance and</p>
              <p className="italic whitespace-nowrap">*Prices listed do not include sales tax.</p>
            </div>
          </div>

          {/* Right Column: TRAY SIZE GUIDE */}
          <div className="flex flex-col lg:h-[86%]">
            <div className="bg-[#111] px-4 py-3 mb-0 rounded-t-lg">
              <h2 className="text-xl font-bold uppercase tracking-tight text-white">TRAY SIZE GUIDE</h2>
              <div className="h-0.5 bg-[#f2b705] mt-1"></div>
            </div>
            <div className="bg-[#ededed] p-4 border border-neutral-300 flex-1 flex flex-col justify-between" style={{ backgroundImage: 'url(/tablebg.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
              <div className="space-y-4 flex-1 flex flex-col justify-center">
                {/* Half Tray Placeholder */}
                <div className="space-y-2">
                  <div className="relative bg-[#b51212] rounded-lg p-6 border-4 border-red-800 shadow-inner">
                    {/* Inner tray lip effect */}
                    <div className="absolute inset-2 border-2 border-red-600 rounded"></div>
                    {/* Highlight gradient */}
                    <div className="absolute top-2 left-2 right-2 h-8 bg-gradient-to-b from-red-300/30 to-transparent rounded-t"></div>
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-[#111] text-center">
                    HALF TRAY – SERVES ~15
                  </p>
                </div>
                
                {/* Full Tray Placeholder */}
                <div className="space-y-2">
                  <div className="relative bg-[#b51212] rounded-lg p-8 border-4 border-red-800 shadow-inner">
                    {/* Inner tray lip effect */}
                    <div className="absolute inset-3 border-2 border-red-600 rounded"></div>
                    {/* Highlight gradient */}
                    <div className="absolute top-3 left-3 right-3 h-10 bg-gradient-to-b from-red-300/30 to-transparent rounded-t"></div>
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-[#111] text-center">
                    FULL TRAY – SERVES ~30
                  </p>
                </div>
              </div>
            </div>
          </div>
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
      </div>
    </main>
  );
}
