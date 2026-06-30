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

  // Split the guest name so we can stack it (e.g., "SCOTT" on top, "WU" on bottom)
  const nameParts = episode.guest_name ? episode.guest_name.split(' ') : ['Guest', ''];
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');
  
  // Automatically format the image name to look in your public folder (e.g., /Scott_Wu.jpg)
  const guestImageSrc = `/${firstName}_${lastName}.jpg`;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#000000] via-[#05051a] to-[#1a237e] text-white font-sans selection:bg-white selection:text-blue-900 pb-20">

      {/* Navbar */}
      <header className="w-full py-8 px-6 md:px-12 flex justify-between items-center z-50">
        <Link href="/" className="font-black text-2xl tracking-tighter leading-none hover:opacity-70 transition-opacity">
          SEC<br/>CLUB
        </Link>
        <nav className="hidden md:flex space-x-8 text-[11px] font-bold tracking-[0.2em] uppercase">
          <Link href="/" className="hover:text-blue-300 transition-colors">Podcast</Link>
          <a href="#" className="hover:text-blue-300 transition-colors">Sponsors</a>
          <a href="#" className="hover:text-blue-300 transition-colors">Newsletter</a>
          <a href="#" className="hover:text-blue-300 transition-colors">About</a>
        </nav>
      </header>

      {/* 1. Title Block */}
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
        <p className="text-xs md:text-sm font-medium text-blue-300/70 uppercase tracking-widest mb-4">
          Episode {episodeId.padStart(3, '0')} // {formattedDate}
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95]">
          {episode.title}
        </h1>
      </section>

      {/* 2. Video Player */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="w-full aspect-video bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden flex items-center justify-center shadow-2xl">
          {episode.media_url ? (
            <iframe
              src={episode.media_url}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <span className="text-blue-300/50 font-bold tracking-widest uppercase text-sm">
              [ Video Player Goes Here ]
            </span>
          )}
        </div>
      </section>

{/* 3 & 4. Combined Layout: Summary (Left) and About Guest (Right) */}
      <section className="max-w-7xl mx-auto px-6 mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* LEFT COLUMN: Summary */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-white">
            Summary
          </h2>
          <div className="text-lg md:text-xl leading-relaxed text-gray-300 whitespace-pre-line font-medium space-y-6">
            {episode.description}
          </div>
        </div>

        {/* RIGHT COLUMN: About This Guest */}
        {episode.guest_name && (
          <div>
            <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-blue-300/80 mb-6">
              About this guest
            </p>
            
            {/* Giant Stacked Name (Dynamically splits the DB name into two lines) */}
            <h3 className="text-7xl md:text-[7rem] lg:text-[8rem] font-black uppercase tracking-tighter leading-[0.8] mb-6 text-white drop-shadow-xl">
              {episode.guest_name.split(' ')[0]}
              <br />
              {episode.guest_name.split(' ').slice(1).join(' ')}
            </h3>
            
            {/* Bio Text (Pulls directly from DB) */}
            <p className="text-gray-300 leading-relaxed text-lg font-medium mb-8">
              {episode.guest_bio}
            </p>

            {/* Social Icons */}
            <div className="flex space-x-6 mb-10">
              <a href="#" className="text-white hover:text-blue-300 transition-colors">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="text-white hover:text-blue-300 transition-colors">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
              </a>
            </div>

            {/* Guest Portrait (Pulls image filename dynamically from DB) */}
            {episode.guest_image && (
              <div className="w-full aspect-[4/5] relative bg-black/20 rounded-2xl overflow-hidden border border-white/5 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
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

      {/* 5. Back Button */}
      <section className="max-w-5xl mx-auto px-6 mt-10">
        <Link
          href="/"
          className="inline-block px-8 py-4 border border-white/20 rounded-full font-bold text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300"
        >
          ← Back to Episodes
        </Link>
      </section>
      
    </main>
  );
}