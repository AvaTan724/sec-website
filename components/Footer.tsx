// components/Footer.tsx
import Link from "next/link";

const CONTACT = "mailto:sunwayentrepreneursclub@gmail.com";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white px-6 md:px-12 pt-20 md:pt-24 pb-12 border-t border-white/10 selection:bg-white selection:text-black">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 pb-20">
          <div className="md:col-span-6 flex flex-col gap-6">
            <span className="font-display text-4xl md:text-5xl uppercase leading-none">
              SEC
            </span>
            <p className="text-white/50 text-base md:text-lg font-medium max-w-md leading-relaxed">
              The entrepreneurs club at Sunway University
            </p>
          </div>

          <div className="md:col-span-3 flex flex-col gap-5">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
              Explore
            </span>
            <Link href="/#about" className="text-white/70 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/team" className="text-white/70 hover:text-white transition-colors">
              Team
            </Link>
            <Link href="/news" className="text-white/70 hover:text-white transition-colors">
              News
            </Link>
            <Link href="/episodes" className="text-white/70 hover:text-white transition-colors">
              Podcast
            </Link>
            <Link href="/#register" className="text-white/70 hover:text-white transition-colors">
              Register
            </Link>
          </div>

          <div className="md:col-span-3 flex flex-col gap-5">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
              Connect
            </span>
            {/* Handle per Club Charter 1.1: @sunwayentrepreneurs */}
            <a
              href="https://www.instagram.com/sunwayentrepreneurs"
              className="text-white/70 hover:text-white transition-colors"
            >
              Instagram
            </a>
            {/* TODO: verify these two URLs are the club's real accounts before launch,
                or delete the links — never link a profile you haven't confirmed. */}
            <a
              href="https://www.linkedin.com/company/sunway-entrepreneurs-club/"
              className="text-white/70 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a href={CONTACT} className="text-white/70 hover:text-white transition-colors">
              sunwayentrepreneursclub@gmail.com
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8 border-t border-white/10 font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/40">
          <span>© 2026 Sunway Entrepreneurs Club</span>
          <span>Sunway University · Malaysia</span>
        </div>
      </div>
    </footer>
  );
}