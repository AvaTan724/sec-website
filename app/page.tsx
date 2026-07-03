"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import Nav from '@/components/Nav';

const quotes = [
  {
    text: "You didn’t even have to be smart. You had to have good follow-up. If you followed up, it kind of gave that extra point on the smart side of the scale.",
    author: "Michael Ovitz"
  },
  {
    text: "Imagine how hard it is to start your business, then multiply that by infinity. And if you’re still committed to do it, and you have the stamina to stick with that, then you’ll be successful.",
    author: "Todd Graves"
  },
  {
    text: "I want all A-players. If we have a relationship where someone is terminated, I want it to be done with respect. It’s about building a culture of elite performers.",
    author: "Brad Jacobs"
  },
  {
    text: "The most important thing is to have a long-term view. If you are building something that is going to take 10 years, you have to be patient and ignore the short-term noise.",
    author: "Sam Altman"
  }
];

export default function Home() {

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-white text-black font-sans min-h-screen selection:bg-black selection:text-white antialiased">

      <style jsx global>{`
        @keyframes clipUp {
          0% { transform: translateY(110%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-clip-up {
          animation: clipUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .scroll-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .scroll-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .btn-oxblood {
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        .btn-oxblood::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: #4a0404;
          z-index: -1;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-oxblood:hover::before {
          transform: scaleX(1);
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 40s linear infinite;
        }

        @keyframes bounceCue {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }
        .animate-cue { animation: bounceCue 1.6s ease-in-out infinite; }
      `}</style>

      <Nav variant="overlay" />

      {/* HERO SECTION — centered wordmark, David Senra style, no photo */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 pt-32 pb-24 overflow-hidden">

        {/* Tagline — the descriptor line above the name */}
        <p className="font-mono text-[10px] md:text-sm uppercase tracking-[0.25em] text-black/50 mb-8 md:mb-10">
          Where Sunway’s builders become operators
        </p>

        {/* Giant stacked wordmark */}
        <h1 className="font-black uppercase tracking-tighter leading-[0.82] text-black text-[clamp(2.25rem,11vw,11.5rem)] max-w-[96vw]">
          {["Sunway", "Entrepreneurs", "Club"].map((word, i) => (
            <span key={i} className="block overflow-hidden pb-1">
              <span className="block animate-clip-up" style={{ animationDelay: `${i * 0.12}s` }}>
                {word}
              </span>
            </span>
          ))}
        </h1>

        {/* CTA cluster — mirrors Senra's line + button */}
        <div className="mt-14 md:mt-16 flex flex-col items-center gap-7">
          <p className="text-base md:text-lg font-medium text-black/50">
            Open to every Sunway student.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4">
            <a href="#register" className="inline-block bg-black text-white px-12 py-5 font-black text-xs uppercase tracking-[0.2em] hover:bg-black/80 transition-all shadow-xl">
              Register
            </a>
            <Link href="/sponsors" className="inline-block px-6 py-5 text-xs font-black uppercase tracking-[0.2em] text-black/50 hover:text-black transition-colors">
              Partner with us →
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION (Dark Mode) */}
      <section id="about" className="w-full bg-black text-white px-6 md:px-12 py-24 md:py-32 selection:bg-white selection:text-black">
        <div className="max-w-[1600px] mx-auto">

          {/* Editorial two-column: label anchor left, prose right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-4">
              <div className="md:sticky md:top-24 flex flex-col gap-8">
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
                Sunway has no shortage of ambition. What it lacked was a home for the people who build. SEC is that home — where ideas meet the mentorship, network, and access to make them real, and where students stop waiting for permission to start. We’re building the institution its members will be proud they came from.
              </p>
              <p className="text-lg md:text-2xl lg:text-3xl font-medium leading-relaxed tracking-tight text-white/70 scroll-reveal">
                To build a community of aspiring entrepreneurs and innovators, fostering real-world skills, professional connections, and opportunities beyond campus to help members turn their ideas into reality and become future business leaders.
              </p>
              <div className="scroll-reveal mt-2">
                <Link
                  href="/sponsors"
                  className="inline-block rounded-full border border-white/40 px-8 py-3 text-sm font-medium hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                >
                  Learn more about how we work
                </Link>
              </div>
            </div>
          </div>

          {/* WHAT WE DO - GRID */}
          <div className="w-full mt-32 md:mt-48 scroll-reveal">
            <h2 className="text-[5rem] md:text-[8rem] lg:text-[11rem] font-black uppercase tracking-tighter leading-[0.8] text-white mb-16 md:mb-24">
              WHAT<br/>WE DO?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 text-left">
              {[
                { title: "Develop Innovation & Leadership", desc: "Practical skills and entrepreneurial thinking through training, mentorship, and hands-on projects." },
                { title: "Build An Active Network", desc: "Connecting students, alumni, business leaders, and sponsors through Sunway Nexus by SEC." },
                { title: "Empower Through Opportunities", desc: "Internship and working-experience pathways within Sunway Group and industry partners." },
                { title: "Strengthen Brand & Community", desc: "Positioning SEC as a recognised entrepreneurship ecosystem." },
                { title: "Broker Cross-Campus Partnerships", desc: "Connecting partner clubs to relevant sponsors and brands." }
              ].map((pillar, index) => (
                <div key={index} className="bg-white text-black p-8 flex flex-col h-full hover:scale-[1.02] transition-transform duration-300">
                  <div className="font-mono text-sm text-black/40 font-bold mb-8">0{index + 1}</div>
                  <h4 className="font-black text-2xl uppercase tracking-tighter leading-[0.9] mb-4">{pillar.title}</h4>
                  <p className="font-medium text-black/80 text-sm leading-relaxed mt-auto">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* AUTO-SLIDING QUOTES SECTION */}
      <section className="w-full py-32 md:py-48 bg-white overflow-hidden border-t border-black/10">
        <div className="px-6 md:px-12 mb-24 md:mb-32">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-black leading-none mb-2">
            Words We
          </h2>
          <h3 className="text-[7rem] md:text-[12rem] lg:text-[14rem] font-black tracking-tighter uppercase text-black leading-[0.75]">
            Build By
          </h3>
        </div>

        <div className="relative w-full overflow-hidden flex items-center">
          <div className="animate-marquee gap-16 px-6 hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
            {[...quotes, ...quotes].map((quote, index) => (
              <div
                key={index}
                className="shrink-0 w-[85vw] md:w-[700px] border-l-[1.5px] border-black/15 pl-8 md:pl-12 flex flex-col justify-between py-2"
              >
                <p className="text-2xl md:text-3xl lg:text-4xl text-black font-medium leading-[1.3] tracking-tight mb-12">
                  &ldquo;{quote.text}&rdquo;
                </p>
                <p className="text-sm text-black/90 font-medium flex items-center">
                  — {quote.author}
                  <span className="ml-3 text-black/40">→</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS / SUNWAY NEXUS BAND (opens the dark closing sequence) */}
      <section className="w-full bg-black text-white px-6 md:px-12 py-24 md:py-32 selection:bg-white selection:text-black">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          <div className="md:col-span-7 flex flex-col gap-8">
            <h2 className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/50 scroll-reveal">
              Sunway Nexus by SEC
            </h2>
            <p className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight scroll-reveal">
              Reach the builders before anyone else does.
            </p>
            <p className="text-lg md:text-xl font-medium text-white/60 leading-relaxed max-w-2xl scroll-reveal">
              Partner brands plug directly into Sunway’s most driven student operators — through sessions, sponsorships, and cross-campus activations.
            </p>
            <div className="scroll-reveal">
              <Link
                href="/sponsors"
                className="btn-oxblood inline-block border border-white/30 text-white px-12 py-5 font-mono text-xs uppercase tracking-[0.2em] hover:border-white transition-colors"
              >
                See the Sponsor Guide
              </Link>
            </div>
          </div>

          <div className="md:col-span-5 md:pt-16">
            <ul className="flex flex-col divide-y divide-white/10 scroll-reveal">
              {[
                "Direct access to an engaged member base",
                "Branded sessions & workshops",
                "Cross-campus partnership brokering",
                "Year-round presence, not one-off events"
              ].map((item, i) => (
                <li key={i} className="flex items-baseline gap-6 py-5">
                  <span className="font-mono text-xs text-white/40">0{i + 1}</span>
                  <span className="text-base md:text-lg font-medium text-white/90 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* INK BAND REGISTRATION SECTION */}
      <section id="register" className="w-full bg-[#050505] text-white py-32 md:py-48 border-t border-white/10 selection:bg-white selection:text-black">
        <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">

          <h2 className="font-serif text-4xl md:text-6xl leading-[1.1] mb-12 text-white">
            Join the network. Register through Sunway Nexus by SEC.
          </h2>

          <a
            href="#register"
            className="btn-oxblood inline-block border border-white/30 text-white px-12 py-5 font-mono text-xs uppercase tracking-[0.2em] mb-24 hover:border-white transition-colors"
          >
            Access The Form
          </a>

          <div className="w-full bg-white/5 border border-white/10 p-2 md:p-6 rounded-sm shadow-2xl">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSezVZpDlnnR1OT4z2wVl4s6lzZUPq9nj69xqHpwzTHpgBwy5A/viewform?embedded=true"
              width="100%"
              height="800"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="grayscale opacity-90 mix-blend-screen"
            >
              Loading Form…
            </iframe>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-black text-white px-6 md:px-12 pt-24 pb-12 border-t border-white/10 selection:bg-white selection:text-black">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 pb-20">
            <div className="md:col-span-6 flex flex-col gap-6">
              <span className="font-black text-4xl md:text-5xl tracking-tighter leading-none">SEC CLUB</span>
              <p className="text-white/50 text-base md:text-lg font-medium max-w-md leading-relaxed">
                A campus entrepreneurship ecosystem at Sunway University. Where builders become operators.
              </p>
            </div>

            <div className="md:col-span-3 flex flex-col gap-5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Explore</span>
              <Link href="/#about" className="text-white/70 hover:text-white transition-colors">About</Link>
              <Link href="/#register" className="text-white/70 hover:text-white transition-colors">Register</Link>
              <Link href="/sponsors" className="text-white/70 hover:text-white transition-colors">Partners</Link>
              <Link href="/news" className="text-white/70 hover:text-white transition-colors">News</Link>
            </div>

            <div className="md:col-span-3 flex flex-col gap-5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Connect</span>
              <a href="https://www.instagram.com/sunway_sec" className="text-white/70 hover:text-white transition-colors">Instagram</a>
              <a href="https://www.linkedin.com/company/sunway-entrepreneurs-club/" className="text-white/70 hover:text-white transition-colors">LinkedIn</a>
              <a href="https://www.facebook.com/sunway.sec/" className="text-white/70 hover:text-white transition-colors">Facebook</a>
              <a href="mailto:sunwayentrepreneursclub@gmail.com " className="text-white/70 hover:text-white transition-colors">sunwayentrepreneursclub@gmail.com</a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8 border-t border-white/10 font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/40">
            <span>© 2026 Sunway Entrepreneurs Club</span>
            <span>Sunway University · Malaysia</span>
          </div>
        </div>
      </footer>

    </main>
  );
}