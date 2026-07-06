// app/page.tsx
"use client";

import Link from "next/link";
import { useEffect } from "react";
import Nav from "@/components/Nav";

const CONTACT = "mailto:sunwayentrepreneursclub@gmail.com";

// --- DATA ---------------------------------------------------------------

// 15 unique quotes (5 Local Titans, 10 Global Operators) to ensure 
// the marquee loop is long enough to hide obvious repetition.
const track1Quotes = [
  { text: "Take a simple idea and take it seriously.", author: "Charlie Munger", width: "w-[300px] md:w-[400px]", rotate: "-rotate-2" },
  { text: "Education offers the best route out of poverty and provides the foundation for building a better tomorrow.", author: "Tan Sri Dr. Jeffrey Cheah", width: "w-[320px] md:w-[420px]", rotate: "rotate-3" },
  { text: "Make something people want.", author: "Paul Graham", width: "w-[280px] md:w-[350px]", rotate: "-rotate-1" },
  { text: "Play long-term games with long-term people.", author: "Naval Ravikant", width: "w-[310px] md:w-[380px]", rotate: "rotate-2" },
  { text: "Real artists ship.", author: "Steve Jobs", width: "w-[260px] md:w-[320px]", rotate: "-rotate-3" },
];

const track2Quotes = [
  { text: "Your margin is my opportunity.", author: "Jeff Bezos", width: "w-[280px] md:w-[360px]", rotate: "rotate-2" },
  { text: "Your local problem is actually a regional problem. If you can solve it well, you can scale it.", author: "Anthony Tan", width: "w-[340px] md:w-[450px]", rotate: "-rotate-3" },
  { text: "The most important thing is to have a long-term view.", author: "Sam Altman", width: "w-[300px] md:w-[380px]", rotate: "rotate-1" },
  { text: "Play by the rules, but be ferocious.", author: "Phil Knight", width: "w-[290px] md:w-[370px]", rotate: "-rotate-2" },
  { text: "Leadership is about making tough decisions in difficult times, not just riding the good waves.", author: "Datuk Seri Nazir Razak", width: "w-[320px] md:w-[410px]", rotate: "rotate-3" },
];

const track3Quotes = [
  { text: "Imagine how hard it is to start your business, then multiply that by infinity.", author: "Todd Graves", width: "w-[350px] md:w-[480px]", rotate: "-rotate-2" },
  { text: "Whenever I hear someone say 'it cannot be done', I will try all the more to do it.", author: "Tan Sri Robert Kuok", width: "w-[320px] md:w-[400px]", rotate: "rotate-2" },
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay", width: "w-[280px] md:w-[360px]", rotate: "-rotate-4" },
  { text: "You didn’t even have to be smart. You had to have good follow-up.", author: "Michael Ovitz", width: "w-[330px] md:w-[420px]", rotate: "rotate-1" },
  { text: "Dream the impossible. Believe in the unbelievable. Never take no for an answer.", author: "Tan Sri Tony Fernandes", width: "w-[340px] md:w-[430px]", rotate: "-rotate-1" },
];

// Title = the member outcome. Description = the concrete vehicle.
const pillars = [
  {
    title: "Bring operators to campus",
    desc: "Founder talks, corporate visits, and conversations with the people building real businesses.",
  },
  {
    title: "Build practical capability",
    desc: "Hands-on sessions on AI and the working stack operators actually use.AI workshops and hands-on sessions that equip members with tools and skills they can actually apply.",
  },
  {
    title: "Curate what matters",
    desc: "Through SEC Reads and the SEC Library, we filter the noise and bring members business ideas, industry insights, and resources worth their time.",
  },
  {
    title: "Build the community",
    desc: "From Sunway Nexus and Run Club to charity initiatives and member experiences, we create opportunities for people to connect, contribute, and grow together.",
  },
];

const sponsorPoints = [
  "Direct access to the SEC member base",
  "Branded sessions & workshops",
  "Cross-campus partnership brokering",
  "Year-round presence, not one-off events",
];

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSezVZpDlnnR1OT4z2wVl4s6lzZUPq9nj69xqHpwzTHpgBwy5A/viewform?embedded=true";

// -------------------------------------------------------------------------

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );

    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-white text-black font-sans min-h-screen selection:bg-black selection:text-white antialiased">
      <Nav variant="overlay" />

      {/* Marquee Keyframes */}
      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
        }
        /* Different durations create a random, desynced feel */
        .marquee-left-1 { animation: marquee-left 45s linear infinite; }
        .marquee-right { animation: marquee-right 55s linear infinite; }
        .marquee-left-2 { animation: marquee-left 65s linear infinite; }
        
        /* Pause on hover so users can read */
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>

      {/* HERO SECTION — single viewport */}
      <section className="relative w-full h-[100svh] flex flex-col items-center justify-center text-center px-6 md:px-12 overflow-hidden">
        <p className="font-mono text-[10px] md:text-sm uppercase tracking-[0.25em] text-black/50 mb-4 md:mb-6">
          Sunway University&rsquo;s Entrepreneurship Club
        </p>

        <h1 className="font-black uppercase tracking-tighter leading-[0.82] text-black text-[clamp(2rem,min(10vw,15vh),12rem)] max-w-[96vw]">
          {["Sunway", "Entrepreneurs", "Club"].map((word, i) => (
            <span key={i} className="block overflow-hidden pb-1">
              <span className="block animate-clip-up" style={{ animationDelay: `${i * 0.12}s` }}>
                {word}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-8 md:mt-10 flex flex-col items-center gap-5 md:gap-6">
          <p className="text-base md:text-lg font-medium text-black/50">
            Open to every Sunway student.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4">
            <a href="#register" className="inline-block bg-black text-white px-12 py-5 font-black text-xs uppercase tracking-[0.2em] hover:bg-black/80 transition-all shadow-xl">
              Register
            </a>
            <Link href="/sponsors" className="inline-block px-6 py-5 text-xs font-black uppercase tracking-[0.2em] text-black/50 hover:text-black transition-colors">
              Partner with us &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ============================== ABOUT ============================== */}
      <section
        id="about"
        className="w-full min-h-[100svh] bg-black text-white px-6 md:px-12 py-20 md:py-24 flex flex-col justify-between gap-16 selection:bg-white selection:text-black"
      >
        <div className="max-w-[1400px] mx-auto w-full flex flex-col justify-between flex-1 gap-16">
          <div className="flex flex-col gap-6 md:gap-8 max-w-5xl">
            <h2 className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/50 scroll-reveal">
              About The Club
            </h2>
            <p className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight scroll-reveal">
              A home for the people who build.
            </p>
            <p className="text-lg md:text-2xl lg:text-[1.75rem] font-medium leading-[1.4] tracking-tight text-white/80 scroll-reveal max-w-4xl">
              SEC is the community where builders find the support, network, and opportunities to turn ideas into reality. We&rsquo;re building the institution our members will be proud they came from.
            </p>
          </div>

          <div className="w-full">
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.85] text-white mb-8 md:mb-12 scroll-reveal">
              What we do
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 text-left">
              {pillars.map((pillar, index) => (
                <div
                  key={pillar.title}
                  className="scroll-reveal bg-white text-black p-6 md:p-7 flex flex-col h-full"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="font-mono text-xs md:text-sm text-black/40 font-bold mb-6">
                    0{index + 1}
                  </div>
                  <h3 className="font-black text-lg md:text-xl uppercase tracking-tighter leading-[0.95] mb-4 min-h-[3.5rem]">
                    {pillar.title}
                  </h3>
                  <p className="font-medium text-black/70 text-sm leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

{/* ===================== RANDOMIZED MARQUEE QUOTES ===================== */}
      <section className="w-full py-20 md:py-32 bg-[#fcfcfc] overflow-hidden border-t border-black/10 flex flex-col gap-12 md:gap-16 selection:bg-black selection:text-white">
        
        {/* TITLE SECTION (ABOVE MARQUEES) */}
        <div className="px-6 md:px-12 max-w-[1600px] mx-auto w-full">
          <h2 className="font-display uppercase text-black leading-[0.85]">
            <span className="block text-3xl md:text-5xl lg:text-6xl mb-2 tracking-tighter">Words We</span>
            <span className="block text-[5rem] md:text-[9rem] lg:text-[11rem] tracking-tighter">
              Build By
            </span>
          </h2>
        </div>

        {/* MARQUEE TRACKS CONTAINER */}
        <div className="flex flex-col gap-8 md:gap-12 py-4">
          
          {/* TRACK 1 (Scrolls Left) */}
          <div className="relative w-full overflow-hidden flex items-center">
            <div className="marquee-track marquee-left-1 gap-6 md:gap-10 px-4">
              {[...track1Quotes, ...track1Quotes].map((quote, index) => (
                <div 
                  key={index} 
                  className={`shrink-0 bg-white border-2 border-black p-5 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between ${quote.width} ${quote.rotate} mt-2 mb-4 cursor-crosshair`}
                >
                  <p className="text-xl md:text-2xl font-bold leading-[1.15] tracking-tight mb-6 md:mb-10">
                    &ldquo;{quote.text}&rdquo;
                  </p>
                  <p className="text-[9px] md:text-xs font-mono uppercase tracking-widest text-black/50">
                    — {quote.author}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* TRACK 2 (Scrolls Right) */}
          <div className="relative w-full overflow-hidden flex items-center">
            <div className="marquee-track marquee-right gap-6 md:gap-10 px-4" style={{ transform: 'translateX(-50%)' }}>
              {[...track2Quotes, ...track2Quotes].map((quote, index) => (
                <div 
                  key={index} 
                  className={`shrink-0 bg-white border-2 border-black p-5 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between ${quote.width} ${quote.rotate} mt-4 mb-2 cursor-crosshair`}
                >
                  <p className="text-xl md:text-2xl font-bold leading-[1.15] tracking-tight mb-6 md:mb-10">
                    &ldquo;{quote.text}&rdquo;
                  </p>
                  <p className="text-[9px] md:text-xs font-mono uppercase tracking-widest text-black/50">
                    — {quote.author}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* TRACK 3 (Scrolls Left) */}
          <div className="relative w-full overflow-hidden flex items-center">
            <div className="marquee-track marquee-left-2 gap-6 md:gap-10 px-4">
              {[...track3Quotes, ...track3Quotes].map((quote, index) => (
                <div 
                  key={index} 
                  className={`shrink-0 bg-white border-2 border-black p-5 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between ${quote.width} ${quote.rotate} mt-2 mb-4 cursor-crosshair`}
                >
                  <p className="text-xl md:text-2xl font-bold leading-[1.15] tracking-tight mb-6 md:mb-10">
                    &ldquo;{quote.text}&rdquo;
                  </p>
                  <p className="text-[9px] md:text-xs font-mono uppercase tracking-widest text-black/50">
                    — {quote.author}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========================== PARTNER BAND ========================== */}
      <section className="w-full bg-black text-white px-6 md:px-12 py-16 md:py-32 selection:bg-white selection:text-black">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-7 flex flex-col gap-8">
            <h2 className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/50 scroll-reveal">
              For Partners
            </h2>
            <p className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight scroll-reveal">
              Reach the builders before anyone else does.
            </p>
            <p className="text-lg md:text-xl font-medium text-white/60 leading-relaxed max-w-2xl scroll-reveal">
              Partner with SEC to reach Sunway&rsquo;s student builders through
              sessions, sponsorships, and cross-campus activations.
            </p>
            <div className="scroll-reveal">
              <a
                href={CONTACT}
                className="btn-oxblood inline-block border border-white/30 text-white px-12 py-5 font-mono text-xs uppercase tracking-[0.2em] hover:border-white transition-colors"
              >
                Partner with us
              </a>
            </div>
          </div>

          <div className="md:col-span-5 md:pt-16">
            <ul className="flex flex-col divide-y divide-white/10 scroll-reveal">
              {sponsorPoints.map((item, i) => (
                <li key={i} className="flex items-baseline gap-6 py-5">
                  <span className="font-mono text-xs text-white/40">
                    0{i + 1}
                  </span>
                  <span className="text-base md:text-lg font-medium text-white/90 leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* =========================== REGISTER =========================== */}
      <section
        id="register"
        className="w-full bg-[#050505] text-white py-20 md:py-40 border-t border-white/10 selection:bg-white selection:text-black"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
          <h2 className="font-serif text-4xl md:text-6xl leading-[1.1] mb-6 text-white">
            Join SEC.
          </h2>
          <p className="text-base md:text-lg font-medium text-white/60 mb-14 max-w-xl">
            One form covers everything — free community access through Sunway
            Nexus, or full membership.
          </p>

          <div className="w-full bg-white p-2 md:p-4 rounded-sm shadow-2xl">
            <iframe
              src={GOOGLE_FORM_URL}
              width="100%"
              height="900"
              title="SEC registration form"
              className="border-0"
            >
              Loading form…
            </iframe>
          </div>
        </div>
      </section>
    </main>
  );
}