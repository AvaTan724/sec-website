// app/page.tsx
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const revalidate = 0;

export default async function Home() {
  const { data: episodes, error } = await supabase
    .from('episodes')
    .select('id, title, created_at')
    .order('created_at', { ascending: false });

  return (
    // 1. MAIN CONTAINER: Removed snap-scrolling. Now a standard min-h-screen scrolling page.
    <main className="bg-gradient-to-br from-[#000000] via-[#05051a] to-[#1a237e] text-white font-sans overflow-x-hidden selection:bg-white selection:text-blue-900 min-h-screen">
      
      {/* 2. NAVBAR */}
      <header className="absolute top-0 w-full py-8 px-6 md:px-12 flex justify-between items-center z-50">
        <div className="font-black text-2xl tracking-tighter leading-none">
          SEC<br/>CLUB
        </div>
        <nav className="hidden md:flex space-x-8 text-[11px] font-bold tracking-[0.2em] uppercase">
          <Link href="/" className="hover:text-blue-300 transition-colors">Podcast</Link>
          <a href="#" className="hover:text-blue-300 transition-colors">Sponsors</a>
          <a href="#" className="hover:text-blue-300 transition-colors">Newsletter</a>
          <a href="#" className="hover:text-blue-300 transition-colors">About</a>
        </nav>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden pt-10">
        
        {/* Logo and Typography Section */}
        <div className="relative z-10 flex flex-col items-center text-center w-full px-4">
          
          {/* Logo Integration */}
          <div className="mb-8">
            <img 
              src="/SEC_logo.jpeg" 
              alt="SEC Logo" 
              className="w-32 h-32 md:w-48 md:h-48 object-contain" 
            />
          </div>

          <p className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase mb-4 text-blue-200">
            Conversations with Sunway's greatest
          </p>
          
          <h1 className="text-[12vw] lg:text-[8rem] font-black tracking-tighter leading-[0.8] text-white drop-shadow-2xl">
            SUNWAY<br/>ENTREPRENEURS<br/>CLUB
          </h1>
        </div>

        {/* Subscribe CTA (Bottom Right) */}
        <div className="absolute bottom-12 right-6 md:right-12 z-30 hidden md:block text-right">
          <p className="text-xs md:text-sm font-medium mb-3 text-blue-100">Available everywhere you get podcasts.</p>
          <button className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm hover:bg-gray-200 hover:scale-105 transition-all shadow-lg">
            Subscribe now
          </button>
        </div>
      </section>

      {/* 4. EPISODES LIST: Users scroll down to reveal this section */}
      <section className="max-w-5xl mx-auto px-6 py-24 relative z-40">
        <h2 className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-blue-300/80 mb-2 border-b border-blue-900/50 pb-4">
          Episodes
        </h2>
        
        <div className="flex flex-col">
          {episodes && episodes.map((episode) => {
            const dateObj = new Date(episode.created_at);
            const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

            return (
              <Link 
                href={`/episode?id=${episode.id}`} 
                key={episode.id}
                className="group flex flex-col md:flex-row justify-between md:items-center py-6 border-b border-blue-900/30 hover:bg-blue-900/10 transition-colors"
              >
                <span className="text-xl md:text-2xl font-bold text-gray-200 group-hover:text-white transition-colors mb-2 md:mb-0 max-w-3xl pr-4">
                  {episode.title}
                </span>
                <span className="text-[10px] md:text-xs font-medium text-blue-300/60 group-hover:text-blue-300 transition-colors uppercase tracking-widest whitespace-nowrap">
                  {formattedDate}
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      
    </main>
  );
}