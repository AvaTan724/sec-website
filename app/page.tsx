// app/page.tsx
import Link from 'next/link';

// You can easily add or edit your quotes here!
const quotes = [
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
  return (
    <main className="bg-white text-black font-sans min-h-screen selection:bg-black selection:text-white antialiased">
      
      {/* Brutalist Navbar */}
      <header className="absolute top-0 w-full py-8 px-6 md:px-12 flex justify-between items-center z-50 border-b border-black/5">
        <Link href="/" className="font-black text-2xl tracking-tighter leading-none text-black">
          SEC<br/>CLUB
        </Link>
        <nav className="hidden md:flex space-x-12 text-[11px] font-black tracking-[0.2em] uppercase text-black/50">
        <Link href="/#about" className="hover:text-black transition-colors">About</Link>
        <Link href="/episodes" className="hover:text-black transition-colors">Podcast</Link>
        <Link href="/sponsors" className="hover:text-black transition-colors">Partners</Link>
        <Link href="/#register" className="hover:text-black transition-colors">Register</Link>
        </nav>
      </header>

      {/* Massive Hero Section */}
      <section className="relative w-full h-[90vh] flex flex-col justify-center items-center overflow-hidden pt-20 border-b-2 border-black">
        <div className="relative z-10 flex flex-col items-center text-center w-full px-4">
          <p className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase mb-4 text-black/40">
            Conversations with Sunway's greatest living entrepreneurs
          </p>
          
          <h1 className="text-[11vw] lg:text-[7.5rem] font-black tracking-tighter leading-[0.85] text-black uppercase select-none">
            SUNWAY<br/>ENTREPRENEURS<br/>CLUB
          </h1>
        </div>

        {/* Subscribe CTA */}
        <div className="absolute bottom-12 right-6 md:right-12 z-30 hidden md:block text-right">
          <p className="text-xs font-bold uppercase tracking-wider mb-2 text-black/50">Join the network</p>
          <a href="#register" className="inline-block bg-black text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-black/80 transition-all shadow-md">
            Register now
          </a>
        </div>
      </section>

      {/* Brutalist About Us Section */}
      <section id="about" className="max-w-5xl mx-auto px-6 py-32 border-b border-black/10 scroll-mt-10">
        <h2 className="text-[11px] font-black tracking-[0.25em] uppercase text-black/40 mb-8 border-b-2 border-black pb-2">
          About The Club
        </h2>
        
        <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-black mb-8">
          Fostering the next generation of founders.
        </h3>
        
        <p className="text-xl md:text-2xl text-black/70 font-medium leading-relaxed max-w-3xl mb-12">
          The Sunway Entrepreneurs Club (SEC) serves as the primary hub for student-led innovation, mentorship, and collaborative ventures. We bridge the gap between academic theory and real-world execution by providing a network of ambitious founders.
        </p>
        
        <Link href="/episodes" className="inline-block border-2 border-black text-black px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all">
          Explore The Podcasts
        </Link>
      </section>

      {/* NEW: Episode Quotes Slideshow */}
      <section className="w-full py-32 border-b border-black/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          {/* Stacked Brutalist Title */}
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase text-black leading-none mb-1">
            Episode
          </h2>
          <h3 className="text-7xl md:text-[9rem] font-black tracking-tighter uppercase text-black leading-[0.8]">
            Quotes
          </h3>
        </div>

        {/* The Scrolling Slider Container */}
        {/* 'snap-x' and 'overflow-x-auto' create the slideshow effect */}
        <div 
          className="flex overflow-x-auto snap-x snap-mandatory gap-8 px-6 md:px-12 pb-12"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hides scrollbar on Firefox/IE
        >
          {/* Custom style block to hide scrollbar on Chrome/Safari */}
          <style>{`
            div::-webkit-scrollbar { display: none; }
          `}</style>

          {quotes.map((quote, index) => (
            <div 
              key={index} 
              className="snap-center shrink-0 w-[85vw] md:w-[600px] border-l border-black/20 pl-8 md:pl-12 flex flex-col justify-center"
            >
              <p className="text-2xl md:text-3xl text-black font-medium leading-snug mb-8">
                "{quote.text}"
              </p>
              <div className="flex items-center text-[11px] font-bold uppercase tracking-[0.2em] text-black/60">
                — {quote.author} 
                <svg className="w-4 h-4 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stark Member Registration Section */}
      <section id="register" className="max-w-5xl mx-auto px-6 py-32 scroll-mt-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-black mb-6">
            Join The Network
          </h2>
          <p className="text-lg md:text-xl text-black/60 font-medium max-w-2xl mx-auto">
            Connect with ambitious student entrepreneurs. Complete the registration below to access our upcoming workshops and founder mixers.
          </p>
        </div>

        <div className="w-full bg-gray-50 border-2 border-black p-2 md:p-4">
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSezVZpDlnnR1OT4z2wVl4s6lzZUPq9nj69xqHpwzTHpgBwy5A/viewform?embedded=true"
            width="100%" 
            height="800" 
            frameBorder="0" 
            marginHeight={0} 
            marginWidth={0}
            className="grayscale"
          >
            Loading…
          </iframe>
        </div>
      </section>
      
    </main>
  );
}