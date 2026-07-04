"use client";

import React from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';

// --- TYPES ---
type Article = {
  headline: string;
  url: string;
  source: string;
};

type CategoryBlock = {
  category: string;
  articles: Article[];
};

// --- ALLTOP-STYLE MOCK DATA (STRICTLY REUTERS & OPEN-ACCESS) ---
const directoryData: CategoryBlock[] = [
  {
    category: "AI",
    articles: [
      { headline: "OpenAI releases new reasoning models for developers", url: "#", source: "Reuters" },
      { headline: "How AI hardware is dominating venture capital in Q3", url: "#", source: "Open-Access Source" },
      { headline: "Nvidia's latest earnings report shatters expectations", url: "#", source: "Reuters" },
      { headline: "The ethical debate around open-source AI weights", url: "#", source: "Open-Access Source" },
      { headline: "Google integrates Gemini into all enterprise workspace apps", url: "#", source: "Reuters" }
    ]
  },
  {
    category: "Finance",
    articles: [
      { headline: "Bank Negara Malaysia maintains OPR at 3.00%", url: "#", source: "Open-Access Source" },
      { headline: "Singapore FinTech investments hit a 2-year high", url: "#", source: "Open-Access Source" },
      { headline: "Wall Street closes higher as inflation fears ease", url: "#", source: "Reuters" },
      { headline: "The rise of private credit in Southeast Asia", url: "#", source: "Open-Access Source" },
      { headline: "Bitcoin stabilizes after weekend volatility", url: "#", source: "Reuters" }
    ]
  },
  {
    category: "Business",
    articles: [
      { headline: "Global shipping rates surge amid supply chain bottlenecks", url: "#", source: "Reuters" },
      { headline: "Corporate bankruptcies fall to lowest level since 2019", url: "#", source: "Reuters" },
      { headline: "Major retail chains announce holiday hiring plans", url: "#", source: "Open-Access Source" },
      { headline: "The transition back to in-office mandates accelerates", url: "#", source: "Reuters" },
      { headline: "Regional tech firms report strong Q2 profit margins", url: "#", source: "Open-Access Source" }
    ]
  },
  {
    category: "Tech",
    articles: [
      { headline: "Major redesign announced for next-gen consumer laptops", url: "#", source: "Open-Access Source" },
      { headline: "Cybersecurity firm uncovers massive zero-day exploit", url: "#", source: "Reuters" },
      { headline: "The decline of traditional search engines", url: "#", source: "Open-Access Source" },
      { headline: "Semiconductor giants begin construction on new European fabs", url: "#", source: "Reuters" },
      { headline: "Startup founders shift focus to profitability over growth", url: "#", source: "Open-Access Source" }
    ]
  },
  {
    category: "Sports",
    articles: [
      { headline: "Champions League format changes spark controversy", url: "#", source: "Reuters" },
      { headline: "Record-breaking contract signed in Formula 1", url: "#", source: "Reuters" },
      { headline: "Olympic committee announces new sports for 2028", url: "#", source: "Reuters" },
      { headline: "Data analytics revolutionizes professional tennis", url: "#", source: "Open-Access Source" },
      { headline: "The economic impact of global sporting events", url: "#", source: "Open-Access Source" }
    ]
  },
  {
    category: "Entertainment",
    articles: [
      { headline: "Box office numbers rebound with summer blockbusters", url: "#", source: "Reuters" },
      { headline: "Streaming platforms plan aggressive price hikes", url: "#", source: "Reuters" },
      { headline: "The strike's long-term impact on television production", url: "#", source: "Open-Access Source" },
      { headline: "Indie game studios see unprecedented market growth", url: "#", source: "Open-Access Source" },
      { headline: "The blending of interactive media and traditional cinema", url: "#", source: "Reuters" }
    ]
  },
  {
    category: "Music",
    articles: [
      { headline: "Major labels restructure royalties for streaming platforms", url: "#", source: "Reuters" },
      { headline: "The resurgence of vinyl outpaces CD sales again", url: "#", source: "Open-Access Source" },
      { headline: "AI-generated tracks banned from major music awards", url: "#", source: "Reuters" },
      { headline: "Live music revenues break records despite ticket pricing backlash", url: "#", source: "Open-Access Source" },
      { headline: "Independent artists leveraging social media for chart dominance", url: "#", source: "Open-Access Source" }
    ]
  }
];

// --- MAIN COMPONENT ---
export default function BusinessNewsPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Nav />

      <div className="py-24 px-6 sm:px-12 lg:px-24">
        <div className="max-w-[1600px] mx-auto">

          {/* Header Section */}
          <div className="text-center mb-16 border-b-[3px] border-black pb-12">
            <p className="text-xs md:text-sm font-black tracking-[0.3em] uppercase mb-6 text-black/50">
              The SEC Aggregator
            </p>
            <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black uppercase tracking-tighter leading-[0.85] mb-8">
              NEWS<br />DIRECTORY
            </h1>
            <p className="text-lg md:text-xl font-bold max-w-3xl mx-auto uppercase tracking-wider mb-6">
              High-signal links. Zero noise.
            </p>
            <p className="text-base md:text-lg font-medium max-w-3xl mx-auto tracking-tight text-black/70">
              Modeled after classic link directories. We aggregate the absolute best coverage across AI, Finance, Business, Tech, Sports, Entertainment, and Music into one brutalist dashboard. Sourced strictly from Reuters and open-access intelligence.
            </p>
          </div>

          {/* ALLTOP MASONRY LAYOUT */}
          {/* Using Tailwind's column count to create a masonry grid flow */}
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
            
            {directoryData.map((block, idx) => (
              <div 
                key={idx} 
                className="break-inside-avoid border-[3px] border-black bg-white"
              >
                {/* Category Header */}
                <div className="bg-black text-white px-5 py-4 border-b-[3px] border-black flex items-center justify-between">
                  <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">
                    {block.category}
                  </h2>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-white/50">
                    Live Feed
                  </span>
                </div>

                {/* Article Links List */}
                <ul className="flex flex-col divide-y-2 divide-black/10">
                  {block.articles.map((article, aIdx) => (
                    <li key={aIdx} className="p-4 hover:bg-gray-50 transition-colors group">
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <h4 className="font-bold text-sm md:text-base leading-snug tracking-tight group-hover:underline decoration-2 underline-offset-4 mb-2 text-black/90">
                          {article.headline}
                        </h4>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-black/50">
                          {article.source}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Footer of the Card */}
                <div className="p-3 border-t-2 border-black/10 text-right bg-gray-50">
                  <a href="#" className="text-[10px] font-black tracking-widest uppercase text-black hover:underline">
                    View More {block.category} →
                  </a>
                </div>
              </div>
            ))}

          </div>

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