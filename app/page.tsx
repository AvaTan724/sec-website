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
    <main className="bg-white text-black font-sans min-h-screen selection:bg-black selection:text-white antialiased">
      
      {/* Navbar: High Contrast & Stark */}
      <header className="absolute top-0 w-full py-8 px-6 md:px-12 flex justify-between items-center z-50 border-b border-black/5">
        <div className="font-black text-2xl tracking-tighter leading-none text-black">
          SEC<br/>CLUB
        </div>
        <nav className="hidden md:flex space-x-8 text-[11px] font-bold tracking-[0.2em] uppercase text-black/60">
          <Link href="/" className="text-black hover:text-black/40 transition-colors">Podcast</Link>
          <a href="#" className="hover:text-black/40 transition-colors">Sponsors</a>
          <a href="#" className="hover:text-black/40 transition-colors">Newsletter</a>
          <a href="#" className="hover:text-black/40 transition-colors">About</a>
        </nav>
      </header>

      {/* Massive Hero Section (David Senra Header Style) */}
      <section className="relative w-full h-[90vh] flex flex-col justify-center items-center overflow-hidden pt-20 border-b-2 border-black">
        <div className="relative z-10 flex flex-col items-center text-center w-full px-4">
          <p className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase mb-4 text-black/40">
            Conversations with Sunway's greatest living entrepreneurs
          </p>
          
          <h1 className="text-[11vw] lg:text-[7.5rem] font-black tracking-tighter leading-[0.85] text-black uppercase select-none">
            SUNWAY<br/>ENTREPRENEURS<br/>CLUB
          </h1>
        </div>


        {/* Subscribe CTA (Bottom Right Layout) */}
        <div className="absolute bottom-12 right-6 md:right-12 z-30 hidden md:block text-right">
          <p className="text-xs font-bold uppercase tracking-wider mb-2 text-black/50">Available everywhere you listen</p>
          <button className="bg-black text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-black/80 transition-all shadow-md">
            Subscribe now
          </button>
        </div>
      </section>

      {/* Episodes List: Classic Archive Grid */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <h2 className="text-[11px] font-black tracking-[0.25em] uppercase text-black/40 mb-6 border-b-2 border-black pb-2">
          Recent Archives
        </h2>
        
        <div className="flex flex-col">
          {episodes && episodes.map((episode) => {
            const dateObj = new Date(episode.created_at);
            const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

            return (
              <Link 
                href={`/episode?id=${episode.id}`} 
                key={episode.id}
                className="group flex flex-col md:flex-row justify-between md:items-baseline py-6 border-b border-black/10 hover:bg-black/[0.02] px-2 transition-colors"
              >
                <span className="text-xl md:text-2xl font-black text-black/80 group-hover:text-black transition-colors mb-1 md:mb-0 max-w-3xl pr-4 tracking-tight uppercase">
                  {episode.title}
                </span>
                <span className="text-[11px] font-bold text-black/40 group-hover:text-black/70 transition-colors uppercase tracking-widest whitespace-nowrap">
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