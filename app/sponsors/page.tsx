// app/sponsors/page.tsx
import Link from 'next/link';

export default function SponsorsGuide() {
  return (
    <main className="bg-white text-black font-sans min-h-screen selection:bg-black selection:text-white antialiased pb-24">
      
      {/* Standardized Brutalist Navbar */}
      <header className="w-full py-8 px-6 md:px-12 flex justify-between items-center border-b border-black/10 mb-16">
        <Link href="/" className="font-black text-2xl tracking-tighter leading-none text-black">
          SEC<br/>CLUB
        </Link>
        <nav className="hidden md:flex space-x-12 text-[11px] font-black tracking-[0.2em] uppercase text-black/50">
        <Link href="/#about" className="hover:text-black transition-colors">About</Link>
        <Link href="/episodes" className="hover:text-black transition-colors">Podcast</Link>
        <Link href="/sponsors" className="hover:text-black transition-colors">Partners</Link>
        <Link href="/#register" className="hover:text-black transition-colors">Register</Link>
        <Link href="/news" className="hover:text-black transition-colors">News</Link>
        </nav>
      </header>

      {/* Massive Guide Title */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter uppercase text-black leading-[0.85] mb-8">
          Partner<br/>With Us
        </h1>
        <p className="text-xl md:text-3xl font-medium text-black/70 max-w-4xl leading-relaxed">
          Get direct access to Sunway's most ambitious student founders, engineers, and future industry leaders.
        </p>
      </section>

      {/* Partnership Value Proposition Grid */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 mb-32">
        <h2 className="text-[10px] md:text-xs font-black tracking-[0.25em] uppercase text-black mb-12 border-t-[3px] border-black pt-4 inline-block w-full">
          The Value
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b-[3px] border-black pb-24">
          <div className="flex flex-col">
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">Talent</h3>
            <p className="text-lg font-medium text-black/70">Recruit top-tier talent before they hit the open market. Our members are builders, not just students.</p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">Brand</h3>
            <p className="text-lg font-medium text-black/70">Position your company as a foundational supporter of the local startup ecosystem.</p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">Product</h3>
            <p className="text-lg font-medium text-black/70">Get your tools, APIs, and services directly into the hands of early-stage startups.</p>
          </div>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 mb-32">
        <h2 className="text-[10px] md:text-xs font-black tracking-[0.25em] uppercase text-black mb-12 border-t-[3px] border-black pt-4 inline-block w-full">
          Engagement Models
        </h2>
        
        <div className="flex flex-col">
          {/* Tier 1 */}
          <div className="group flex flex-col lg:flex-row justify-between lg:items-center py-10 border-b border-black/10 hover:bg-gray-50 px-4 transition-colors">
            <div className="lg:w-1/2 mb-6 lg:mb-0">
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black mb-2">Podcast Sponsor</h3>
              <p className="text-sm font-bold text-black/50 uppercase tracking-widest">Digital Reach</p>
            </div>
            <div className="lg:w-1/2 text-lg font-medium text-black/80">
              Native ad reads on the SEC Founders podcast, logo placement on all episode pages, and mentions in our newsletter dispatch.
            </div>
          </div>

          {/* Tier 2 */}
          <div className="group flex flex-col lg:flex-row justify-between lg:items-center py-10 border-b border-black/10 hover:bg-gray-50 px-4 transition-colors">
            <div className="lg:w-1/2 mb-6 lg:mb-0">
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black mb-2">Event Partner</h3>
              <p className="text-sm font-bold text-black/50 uppercase tracking-widest">In-Person Impact</p>
            </div>
            <div className="lg:w-1/2 text-lg font-medium text-black/80">
              Co-host workshops, hackathons, or founder mixers. Includes speaking slots, booth space, and direct recruitment access.
            </div>
          </div>

          {/* Tier 3 */}
          <div className="group flex flex-col lg:flex-row justify-between lg:items-center py-10 border-b border-black/10 hover:bg-gray-50 px-4 transition-colors">
            <div className="lg:w-1/2 mb-6 lg:mb-0">
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black mb-2">Annual Title</h3>
              <p className="text-sm font-bold text-black/50 uppercase tracking-widest">Maximum Integration</p>
            </div>
            <div className="lg:w-1/2 text-lg font-medium text-black/80">
              Total integration into the SEC brand. Premier logo placement everywhere, exclusive networking dinners, and first rights to all talent data.
            </div>
          </div>
        </div>
      </section>

      {/* Stark Call to Action */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="bg-black text-white p-12 md:p-24 flex flex-col items-center text-center">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">
            Ready to build?
          </h2>
          <p className="text-lg md:text-xl text-white/70 font-medium max-w-2xl mb-12">
            Reach out to our partnerships team to receive our full pitch deck and discuss custom integration opportunities.
          </p>
          <a 
            href="mailto:partnerships@sunwayentrepreneurs.com" 
            className="inline-block bg-white text-black px-10 py-5 font-black text-xs uppercase tracking-[0.2em] hover:bg-gray-200 transition-all"
          >
            Contact Partnerships
          </a>
        </div>
      </section>
      
    </main>
  );
}