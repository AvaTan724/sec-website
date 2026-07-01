// app/episode/page.tsx
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 0;

export default async function EpisodePage({ searchParams }: { searchParams: Promise<{ id: string }> }) {
  const { id: episodeId } = await searchParams;
  if (!episodeId) return notFound();

  const { data: episode, error } = await supabase
    .from('episodes')
    .select('*')
    .eq('id', episodeId)
    .single();

  if (error || !episode) return notFound();

  const dateObj = new Date(episode.created_at);
  const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white pb-32 antialiased">

      {/* Navbar */}
      <header className="w-full py-8 px-6 md:px-12 flex justify-between items-center border-b border-black/5 mb-12">
        <Link href="/" className="font-black text-2xl tracking-tighter leading-none hover:opacity-60 transition-opacity text-black">
          SEC<br/>CLUB
        </Link>
        <nav className="hidden md:flex space-x-8 text-[11px] font-bold tracking-[0.2em] uppercase text-black/60">
          <Link href="/" className="hover:text-black transition-colors">Podcast</Link>
          <a href="#" className="hover:text-black transition-colors">Sponsors</a>
          <a href="#" className="hover:text-black transition-colors">Newsletter</a>
          <a href="#" className="hover:text-black transition-colors">About</a>
        </nav>
      </header>

      {/* Title Header Block */}
      <section className="max-w-4xl mx-auto px-6 mb-12">
        <p className="text-[11px] font-bold text-black/40 uppercase tracking-widest mb-3">
          Episode {episodeId.padStart(3, '0')} // {formattedDate}
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.9] uppercase text-black">
          {episode.title}
        </h1>
      </section>

      {/* Embedded Video Display Container */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden border border-black/10 shadow-xl">
          {episode.media_url ? (
            <iframe
              src={episode.media_url}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-black/30 font-bold tracking-widest uppercase text-xs">
                [ Dynamic Stream Offline ]
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Two-Column Structured Grid Layout */}
      <section className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 border-t border-black/10 pt-16">
        
        {/* Left Column: Extensive Notes (Spans 7 blocks) */}
        <div className="lg:col-span-7">
          <h2 className="text-xs font-black tracking-[0.25em] uppercase text-black/40 mb-6">
            Session Analysis & Notes
          </h2>
          <div className="text-base md:text-lg leading-relaxed text-black/80 whitespace-pre-line font-medium space-y-6 tracking-tight">
            {episode.description}
          </div>
        </div>

        {/* Right Column: Guest Overview Profile (Spans 5 blocks) */}
        {episode.guest_name && (
          <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-black/10 pt-12 lg:pt-0 lg:pl-12">
            <p className="text-[11px] font-black tracking-[0.25em] uppercase text-black/40 mb-4">
              Profile Overview
            </p>
            
            {/* Split Display Massive Stacked Name */}
            <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.85] mb-6 text-black">
              {episode.guest_name.split(' ')[0]}
              <br />
              {episode.guest_name.split(' ').slice(1).join(' ')}
            </h3>
            
            <p className="text-black/70 leading-relaxed text-sm font-medium mb-8 tracking-tight">
              {episode.guest_bio || "No biography overview captured for this target speaker profile."}
            </p>

            {/* Grayed Stark Portrait Integration */}
            {episode.guest_image && (
              <div className="w-full aspect-[4/5] relative bg-gray-100 rounded-md overflow-hidden border border-black/10 grayscale hover:grayscale-0 transition-all duration-500 shadow-sm">
                <img 
                  src={`/${episode.guest_image}`} 
                  alt={episode.guest_name} 
                  className="w-full h-full object-cover object-top"
                />
              </div>
            )}
          </div>
        )}
      </section>

      {/* Structural Back Navigation Button */}
      <section className="max-w-4xl mx-auto px-6 mt-20">
        <Link
          href="/"
          className="inline-block px-8 py-3 border-2 border-black text-black font-black text-xs tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all duration-300 rounded-none"
        >
          ← Return to Directory
        </Link>
      </section>
      
    </main>
  );
}