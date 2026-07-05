// app/page.tsx
"use client";

import Link from "next/link";
import { useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const CONTACT = "mailto:sunwayentrepreneursclub@gmail.com";

// --- DATA ---------------------------------------------------------------

// Verified, sourced quotes. Replace progressively with quotes from SEC's own
// speakers after each event — that's when this section becomes proof.
// TODO: source and verify a Tan Sri Jeffrey Cheah quote (Sunway's founder)
// from his published speeches — verify exact wording before shipping it.
const quotes = [
  {
    text: "Make something people want.",
    author: "Paul Graham", // Y Combinator's motto
  },
  {
    text: "Play long-term games with long-term people.",
    author: "Naval Ravikant",
  },
  {
    text: "Take a simple idea and take it seriously.",
    author: "Charlie Munger",
  },
  {
    text: "Your margin is my opportunity.",
    author: "Jeff Bezos",
  },
];

// Title = the member outcome. Description = the concrete vehicle.
const pillars = [
  {
    title: "Get in the room",
    desc: "Founder talks and corporate visits with the people running real companies.",
  },
  {
    title: "Learn the tools",
    desc: "Hands-on sessions on AI and the working stack operators actually use.",
  },
  {
    title: "Read sharper",
    desc: "SEC Reads and a curated library of the sources worth your time.",
  },
  {
    title: "Join the network",
    desc: "Sunway Nexus: members, alumni, partner clubs, and sponsors in one community.",
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
      // threshold 0 + rootMargin: fires even for sections taller than the
      // viewport (the old 0.15 threshold could leave tall sections invisible
      // forever on mobile).
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );

    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-white text-black font-sans min-h-screen selection:bg-black selection:text-white antialiased">
      <Nav variant="overlay" />

      {/* ============================== HERO ============================== */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <p className="font-mono text-[10px] md:text-sm uppercase tracking-[0.25em] text-black/50 mb-6 md:mb-10">
          Sunway University&rsquo;s Entrepreneurship Club · Reestablished 2026
        </p>

        <h1 className="font-display uppercase leading-[0.86] text-black text-[clamp(2.5rem,12vw,12.5rem)] max-w-[96vw]">
          {["Sunway", "Entrepreneurs", "Club"].map((word, i) => (
            <span key={i} className="block overflow-hidden pb-1">
              <span
                className="block animate-clip-up"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 md:mt-16 flex flex-col items-center gap-6 md:gap-7">
          <p className="text-base md:text-lg font-medium text-black/50">
            Open to every Sunway student.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4">
            <a
              href="#register"
              className="inline-block bg-black text-white px-12 py-5 font-black text-xs uppercase tracking-[0.2em] hover:bg-black/80 transition-all shadow-xl"
            >
              Register
            </a>
            <a
              href={CONTACT}
              className="inline-block px-6 py-5 text-xs font-black uppercase tracking-[0.2em] text-black/50 hover:text-black transition-colors"
            >
              Partner with us →
            </a>
          </div>
        </div>
      </section>

      {/* ============================== ABOUT ============================== */}
      <section
        id="about"
        className="w-full bg-black text-white px-6 md:px-12 py-16 md:py-32 selection:bg-white selection:text-black"
      >
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-4">
              <div className="md:sticky md:top-24 flex flex-col gap-6 md:gap-8">
                <h2 className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/50 scroll-reveal">
                  About The Club
                </h2>
                <p className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight scroll-reveal">
                  A home for the people who build.
                </p>
              </div>
            </div>

            <div className="md:col-span-8 flex flex-col gap-8">
              <p className="text-lg md:text-2xl lg:text-3xl font-medium leading-relaxed tracking-tight scroll-reveal">
                SEC is where Sunway&rsquo;s ideas meet the mentorship, network,
                and access to make them real — where builders become operators.
                We&rsquo;re building the institution its members will be proud
                they came from.
              </p>
            </div>
          </div>

          {/* WHAT WE DO */}
          <div className="w-full mt-20 md:mt-48">
            <h2 className="font-display text-[4rem] md:text-[8rem] lg:text-[11rem] uppercase leading-[0.85] text-white mb-12 md:mb-24 scroll-reveal">
              What
              <br />
              we do
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {pillars.map((pillar, index) => (
                <div
                  key={pillar.title}
                  className="scroll-reveal bg-white text-black p-8 flex flex-col h-full hover:scale-[1.02] transition-transform duration-300"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="font-mono text-sm text-black/40 font-bold mb-8">
                    0{index + 1}
                  </div>
                  <h3 className="font-black text-2xl uppercase tracking-tighter leading-[0.9] mb-4">
                    {pillar.title}
                  </h3>
                  <p className="font-medium text-black/80 text-sm leading-relaxed mt-auto">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================= QUOTES MARQUEE ========================= */}
      <section className="w-full py-20 md:py-48 bg-white overflow-hidden border-t border-black/10">
        <div className="px-6 md:px-12 mb-16 md:mb-32">
          <h2 className="font-display uppercase text-black leading-[0.8]">
            <span className="block text-3xl md:text-5xl mb-2">Words We</span>
            <span className="block text-[5rem] md:text-[12rem] lg:text-[14rem] leading-[0.78]">
              Build By
            </span>
          </h2>
        </div>

        <div className="relative w-full overflow-hidden flex items-center">
          <div className="animate-marquee hover:[animation-play-state:paused]">
            {[false, true].map((hidden) => (
              <div
                key={hidden ? "dup" : "main"}
                aria-hidden={hidden || undefined}
                className="flex gap-16 px-8"
              >
                {quotes.map((quote, index) => (
                  <div
                    key={index}
                    className="shrink-0 w-[85vw] md:w-[700px] border-l-[1.5px] border-black/15 pl-8 md:pl-12 flex flex-col justify-between py-2"
                  >
                    <p className="text-2xl md:text-3xl lg:text-4xl text-black font-medium leading-[1.3] tracking-tight mb-12">
                      &ldquo;{quote.text}&rdquo;
                    </p>
                    <p className="text-sm text-black/90 font-medium">
                      — {quote.author}
                    </p>
                  </div>
                ))}
              </div>
            ))}
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

      <Footer />
    </main>
  );
}