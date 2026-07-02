// app/sponsors/page.tsx
import Link from 'next/link';

// Add partners here once they're real: { name, logo, url? }.
// Empty array = the logo grid stays hidden. No placeholder boxes.
const partners: { name: string; logo: string; url?: string }[] = [];

export default function SponsorsGuide() {
  return (
    <main className="bg-white text-black font-sans min-h-screen selection:bg-black selection:text-white antialiased flex flex-col">

      {/* Navbar (unchanged) */}
      <header className="w-full py-8 px-6 md:px-12 flex justify-between items-center border-b border-black/10">
        <Link href="/" className="font-black text-2xl tracking-tighter leading-none text-black">
          SEC<br />CLUB
        </Link>
        <nav className="hidden md:flex space-x-12 text-[11px] font-black tracking-[0.2em] uppercase text-black/50">
          <Link href="/#about" className="hover:text-black transition-colors">About</Link>
          <Link href="/episodes" className="hover:text-black transition-colors">Podcast</Link>
          <Link href="/sponsors" className="hover:text-black transition-colors">Partners</Link>
          <Link href="/#register" className="hover:text-black transition-colors">Register</Link>
          <Link href="/news" className="hover:text-black transition-colors">News</Link>
          <Link href="/events" className="hover:text-black transition-colors">Events</Link>
        </nav>
      </header>

      {/* One line · (logos) · one button — lots of air */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 md:px-12 py-32 md:py-48">

        <p className="font-serif text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.2] tracking-tight text-black max-w-5xl">
          We partner with the companies, founders, and brands who want to reach Sunway&rsquo;s next generation of builders.
        </p>

        {partners.length > 0 && (
          <div className="mt-24 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-16 items-center">
            {partners.map((p, i) => (
              <a
                key={i}
                href={p.url || undefined}
                target={p.url ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-h-12 w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                />
              </a>
            ))}
          </div>
        )}

        <a
          href="mailto:sunwayentrepreneursclub@gmail.com"
          className="group relative inline-block overflow-hidden border-2 border-black px-12 py-5 mt-20 font-black text-xs uppercase tracking-[0.2em] text-black"
        >
          <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
            Partner with us
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-black origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
          />
        </a>

      </section>
    </main>
  );
}