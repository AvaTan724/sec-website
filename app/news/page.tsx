"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav'; // Your global Nav component

// --- TYPES ---
type RegionBlock = {
  region: string;
  top: { name: string; url: string };
  links: { name: string; url: string }[];
};

// --- HELPER FUNCTION ---
function getFaviconUrl(link: string) {
  try {
    const url = new URL(link);
    return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=128`;
  } catch {
    return ""; 
  }
}

// --- DATA STRUCTURES (GEOGRAPHY) ---
const apacRegions: RegionBlock[] = [
  { region: "Malaysia", top: { name: "The Edge Malaysia", url: "https://theedgemalaysia.com" }, links: [] },
  { region: "Singapore", top: { name: "The Business Times", url: "https://www.businesstimes.com.sg/global" }, links: [] },
  { region: "Indonesia", top: { name: "Jakarta Post", url: "https://www.thejakartapost.com/business" }, links: [] },
  { region: "Thailand", top: { name: "Bangkok Post", url: "https://www.bangkokpost.com/business" }, links: [] },
  { region: "Philippines", top: { name: "BusinessWorld", url: "https://bworldonline.com/the-nation/" }, links: [] },
  { region: "Vietnam", top: { name: "VnExpress", url: "https://e.vnexpress.net/" }, links: [] },
  { region: "China", top: { name: "Caixin Global", url: "https://www.caixinglobal.com/" }, links: [] },
  { region: "India", top: { name: "Economic Times", url: "https://m.economictimes.com/" }, links: [] },
  { region: "Australia", top: { name: "Financial Review", url: "https://www.afr.com/" }, links: [] },
  { region: "Broader Asia", top: { name: "Nikkei Asia", url: "https://asia.nikkei.com/" }, links: [{ name: "The Diplomat", url: "https://thediplomat.com/" }] }
];

const westernRegions: RegionBlock[] = [
  { region: "United States", top: { name: "Wall Street Journal", url: "https://www.wsj.com" }, links: [] },
  { region: "UK & Europe", top: { name: "The Economist", url: "https://www.economist.com/" }, links: [] }
];

const globalAndMena: RegionBlock[] = [
  { region: "Middle East", top: { name: "Zawya", url: "https://www.zawya.com/" }, links: [{ name: "Arab News", url: "https://www.arabnews.com/economy" }, { name: "Gulf News", url: "https://gulfnews.com/business" }, { name: "The National", url: "https://www.thenationalnews.com/" }, { name: "Al Jazeera", url: "https://www.aljazeera.com/economy/" }] },
  { region: "Global", top: { name: "Trading Economics", url: "https://tradingeconomics.com/" }, links: [{ name: "IMF News", url: "https://www.imf.org/en/news" }] }
];

// --- DATA STRUCTURES (INDUSTRY) ---
const industriesCol1: RegionBlock[] = [
  { region: "Technology", top: { name: "The Information", url: "https://www.theinformation.com" }, links: [{ name: "Techmeme", url: "https://techmeme.com" }, { name: "Stratechery", url: "https://stratechery.com" }, { name: "Rest of World", url: "https://restofworld.org" }] },
  { region: "Startups & VC", top: { name: "TechCrunch", url: "https://techcrunch.com" }, links: [{ name: "Sifted", url: "https://sifted.eu" }, { name: "The Generalist", url: "https://www.generalist.com" }] },
  { region: "SE Asia", top: { name: "Tech in Asia", url: "https://www.techinasia.com" }, links: [{ name: "DealStreetAsia", url: "https://www.dealstreetasia.com" }, { name: "e27", url: "https://e27.co" }] },
  { region: "Finance & Markets", top: { name: "Wall Street Journal", url: "https://www.wsj.com" }, links: [{ name: "Bloomberg", url: "https://www.bloomberg.com" }, { name: "Financial Times", url: "https://www.ft.com" }] },
];

const industriesCol2: RegionBlock[] = [
  { region: "Fintech", top: { name: "Finextra", url: "https://www.finextra.com" }, links: [] },
  { region: "Fashion & Retail", top: { name: "Business of Fashion", url: "https://www.businessoffashion.com" }, links: [{ name: "Vogue Business", url: "https://www.voguebusiness.com" }] },
  { region: "Crypto & Web3", top: { name: "The Block", url: "https://www.theblock.co" }, links: [{ name: "CoinDesk", url: "https://www.coindesk.com" }] },
];

// --- REUSABLE REGION BLOCK ---
function RegionRows({ data }: { data: RegionBlock[] }) {
  return (
    <div className="space-y-0 border-t-[3px] border-black">
      {data.map((item, idx) => (
        <div key={idx} className="border-b-[3px] border-black py-5">
          <h3 className="text-lg font-black uppercase tracking-tight mb-3">
            {item.region}
          </h3>

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

          {item.links.length > 0 && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
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

// --- MAIN COMPONENT ---
export default function BusinessNewsPage() {
  const [view, setView] = useState<'geography' | 'industry'>('geography');

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      
      {/* Kept your Global Nav component! */}
      <Nav />

      {/* Deleted the secondary <header> that was causing the duplicate */}

      <div className="py-24 px-6 sm:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto">

          {/* Header Section */}
          <div className="text-center mb-16 border-b-[3px] border-black pb-12">
            <p className="text-xs md:text-sm font-black tracking-[0.3em] uppercase mb-6 text-black/50">
              Global Business Intelligence
            </p>
            <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black uppercase tracking-tighter leading-[0.85] mb-8">
              NEWS<br />DIRECTORY
            </h1>
            <p className="text-lg md:text-xl font-bold max-w-3xl mx-auto uppercase tracking-wider mb-6">
              We don&rsquo;t publish the news. We tell you who does it best.
            </p>
            <p className="text-base md:text-lg font-medium max-w-3xl mx-auto tracking-tight text-black/70">
              Financial journalism is fragmented &mdash; no single outlet covers Malaysia, the region, and global markets with equal depth. Rather than compete with premier reporting, SEC curates the definitive source for each market.
            </p>
            
            {/* Toggle Button Group */}
            <div className="flex justify-center mt-12">
              <div className="inline-flex border-2 border-black p-1 bg-white">
                <button
                  onClick={() => setView('geography')}
                  className={`px-8 py-3 text-xs font-black uppercase tracking-[0.2em] transition-colors ${
                    view === 'geography' ? 'bg-black text-white' : 'bg-transparent text-black hover:bg-gray-100'
                  }`}
                >
                  By Geography
                </button>
                <button
                  onClick={() => setView('industry')}
                  className={`px-8 py-3 text-xs font-black uppercase tracking-[0.2em] transition-colors ${
                    view === 'industry' ? 'bg-black text-white' : 'bg-transparent text-black hover:bg-gray-100'
                  }`}
                >
                  By Industry
                </button>
              </div>
            </div>
          </div>

          {/* Conditional Grid Layout */}
          {view === 'geography' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 animate-in fade-in duration-500">
              <section>
                <div className="mb-6">
                  <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">APAC Markets</h2>
                </div>
                <RegionRows data={apacRegions} />
              </section>

              <div className="space-y-16">
                <section>
                  <div className="mb-6">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Western Markets</h2>
                  </div>
                  <RegionRows data={westernRegions} />
                </section>
                <section>
                  <div className="mb-6">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Middle East & Global</h2>
                  </div>
                  <RegionRows data={globalAndMena} />
                </section>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 animate-in fade-in duration-500">
              <section>
                <div className="mb-6">
                  <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Core Sectors</h2>
                </div>
                <RegionRows data={industriesCol1} />
              </section>
              <section>
                <div className="mb-6">
                  <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Emerging Tech</h2>
                </div>
                <RegionRows data={industriesCol2} />
              </section>
            </div>
          )}

          {/* Footer Accent Line */}
          <div className="mt-24 border-t-[12px] border-black pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <span className="text-2xl font-black uppercase tracking-tighter">SEC Club</span>
            <span className="text-xs font-black tracking-[0.2em] uppercase text-black/50">Intelligence Division</span>
          </div>
          
        </div>
      </div>
    </div>
  );
}