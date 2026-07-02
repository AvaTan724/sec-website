"use client";
import React from 'react';
import Link from 'next/link';


// --- TYPES ---
// This fixes your earlier TypeScript 'never' error
type RegionBlock = {
  region: string;
  top: { name: string; url: string };
  links: { name: string; url: string }[];
};

// --- HELPER FUNCTION ---
// Automatically extracts the domain from your link to grab the website's logo
function getFaviconUrl(link: string) {
  try {
    const url = new URL(link);
    return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=128`;
  } catch {
    return ""; 
  }
}

// --- NAV LINKS ---
// Same order as the home page nav. Events + Team go here once those pages exist.
const navLinks: [string, string][] = [
  ["About", "/#about"],
  ["Podcast", "/episodes"],
  ["Partners", "/sponsors"],
  ["Register", "/#register"],
];

// --- DATA STRUCTURES ---
const apacRegions: RegionBlock[] = [
  {
    region: "Malaysia",
    top: { name: "The Edge Malaysia", url: "https://theedgemalaysia.com" },
    links: []
  },
  {
    region: "Singapore",
    top: { name: "The Business Times", url: "https://www.businesstimes.com.sg/global" },
    links: []
  },
  {
    region: "Indonesia",
    top: { name: "Jakarta Post", url: "https://www.thejakartapost.com/business" },
    links: []
  },
  {
    region: "Thailand",
    top: { name: "Bangkok Post", url: "https://www.bangkokpost.com/business" },
    links: []
  },
  {
    region: "Philippines",
    top: { name: "BusinessWorld", url: "https://bworldonline.com/the-nation/" },
    links: []
  },
  {
    region: "Vietnam",
    top: { name: "VnExpress", url: "https://e.vnexpress.net/" },
    links: []
  },
  {
    region: "China",
    top: { name: "Caixin Global", url: "https://www.caixinglobal.com/" },
    links: []
  },
  {
    region: "India",
    top: { name: "Economic Times", url: "https://m.economictimes.com/" },
    links: []
  },
  {
    region: "Australia",
    top: { name: "Financial Review", url: "https://www.afr.com/" },
    links: []
  },
  {
    region: "Broader Asia",
    top: { name: "Nikkei Asia", url: "https://asia.nikkei.com/" },
    links: [
      { name: "The Diplomat", url: "https://thediplomat.com/" },
    ]
  }
];

const westernRegions: RegionBlock[] = [
  {
    region: "United States",
    top: { name: "Wall Street Journal", url: "https://www.wsj.com" },
    links: []
  },
  {
    region: "UK & Europe",
    top: { name: "The Economist", url: "https://www.economist.com/" },
    links: []
  }
];

const globalAndMena: RegionBlock[] = [
  {
    region: "Middle East",
    top: { name: "Zawya", url: "https://www.zawya.com/" },
    links: [
      { name: "Arab News", url: "https://www.arabnews.com/economy" },
      { name: "Gulf News", url: "https://gulfnews.com/business" },
      { name: "The National", url: "https://www.thenationalnews.com/" },
      { name: "Al Jazeera", url: "https://www.aljazeera.com/economy/" },
    ]
  },
  {
    region: "Global",
    top: { name: "Trading Economics", url: "https://tradingeconomics.com/" },
    links: [
      { name: "IMF News", url: "https://www.imf.org/en/news" },
    ]
  }
];

// --- REUSABLE REGION BLOCK ---
function RegionRows({ data }: { data: RegionBlock[] }) {
  return (
    <div className="space-y-0 border-t-2 border-black">
      {data.map((item, idx) => (
        <div key={idx} className="border-b-2 border-black py-5">
          <h3 className="text-lg font-bold uppercase tracking-tight mb-3">
            {item.region}
          </h3>

          {/* Top Platform Highlight */}
          <a
            href={item.top.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-2 border-black p-3 mb-4 hover:bg-black hover:text-white transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <img
                src={getFaviconUrl(item.top.url)}
                alt="Logo"
                className="w-6 h-6 object-contain grayscale group-hover:grayscale-0 transition-all duration-300 bg-white rounded-sm p-0.5"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              <span className="font-black text-lg uppercase tracking-tight">{item.top.name}</span>
            </div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase border border-current px-2 py-1 whitespace-nowrap">
              Premier Source
            </span>
          </a>

          {/* Other Links */}
          {item.links.length > 0 && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8">
              {item.links.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center gap-2 text-sm font-bold uppercase tracking-wide hover:underline underline-offset-4 decoration-2"
                  >
                    <img
                      src={getFaviconUrl(link.url)}
                      alt=""
                      className="w-4 h-4 object-contain grayscale group-hover/link:grayscale-0 transition-all duration-300"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

// --- COMPONENT ---

export default function BusinessNewsPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">

      {/* Top Nav (matches this page's style; same links as home) */}
      <header className="border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <Link href="/" className="font-black text-2xl tracking-tighter leading-none uppercase">
            SEC<br />CLUB
          </Link>
          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-[11px] font-black tracking-[0.2em] uppercase text-black/50">
            {navLinks.map(([label, href]) => (
              <Link key={label} href={href} className="hover:text-black transition-colors">
                {label}
              </Link>
            ))}
            {/* Current page — kept black to mark it active */}
            <Link href="/news" className="text-black">News</Link>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <div className="py-16 px-6 sm:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto">

          {/* Header Section */}
          <div className="text-center mb-16 border-b-2 border-black pb-8">
            <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4 text-black/70">
              Global Business Intelligence
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-black uppercase tracking-tighter leading-none mb-6">
              NEWS<br />DIRECTORY
            </h1>
            <p className="text-base md:text-lg font-bold max-w-3xl mx-auto uppercase tracking-wide mb-4">
              We don&rsquo;t publish the news. We tell you who does it best.
            </p>
            <p className="text-sm md:text-base font-medium max-w-3xl mx-auto uppercase tracking-wide text-black/70">
              Financial journalism is fragmented &mdash; no single outlet covers Malaysia, the region, and global markets with equal depth. Rather than compete with premier reporting, SEC curates the definitive source for each market. One directory, instead of a dozen bookmarks.
            </p>
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* APAC Column */}
            <section>
              <div className="mb-8 border-b-4 border-black pb-3">
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">APAC Markets</h2>
              </div>
              <RegionRows data={apacRegions} />
            </section>

            {/* Right Column: Western + Global/MENA */}
            <div className="space-y-16">

              {/* Western Section */}
              <section>
                <div className="mb-8 border-b-4 border-black pb-3">
                  <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Western Markets</h2>
                </div>
                <RegionRows data={westernRegions} />
              </section>

              {/* Global & Middle East Section */}
              <section>
                <div className="mb-8 border-b-4 border-black pb-3">
                  <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Middle East & Global</h2>
                </div>
                <RegionRows data={globalAndMena} />
              </section>

            </div>
          </div>

          {/* Footer Accent Line */}
          <div className="mt-16 border-t-[12px] border-black pt-6 flex justify-between items-center">
            <span className="text-xl font-black uppercase tracking-tighter">SEC Club</span>
            <span className="text-xs font-bold tracking-widest uppercase">Intelligence Division</span>
          </div>
        </div>
      </div>
    </div>
  );
}