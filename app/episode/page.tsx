// app/episodes/page.tsx
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Nav from '@/components/Nav';

export const revalidate = 0;

export const metadata = {
  title: 'Podcast — SEC',
  description:
    'Curated episodes worth a builder’s time — watched, noted, and picked by SEC.',
};

export default async function EpisodesDirectory() {
  const { data: episodes } = await supabase
    .from('episodes')
    .select('*')
    .order('created_at', { ascending: false });

  const hasEpisodes = !!episodes && episodes.length > 0;

  return (
    <main className="bg-white text-black font-sans min-h-screen selection:bg-black selection:text-white antialiased pb-32">
      <Nav />

      <div className="max-w-[1400px] mx-auto px-6 mt-20 md:mt-32">
        
        {/* HEADER SECTION */}
        <section className="mb-16 md:mb-24 border-b-[3px] border-black pb-8 md:pb-12">
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-black/50 mb-6">
            SEC Intelligence
          </p>
          <h1 className="text-[5rem] md:text-[9rem] lg:text-[11rem] font-black uppercase tracking-tighter leading-[0.75] text-black mb-8">
            THE<br/>ARCHIVE
          </h1>
          <p className="text-lg md:text-2xl font-medium text-black/70 max-w-3xl leading-snug tracking-tight">
            Episodes worth a builder&rsquo;s time — watched, noted, and picked by
            SEC. The shows belong to their creators; the curation is ours.
          </p>
        </section>

        {/* EPISODE LIST SECTION */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xs md:text-sm font-black tracking-[0.25em] uppercase text-black">
              All Picks
            </h2>
            <span className="text-[10px] font-mono tracking-widest uppercase text-black/40">
              {episodes?.length || 0} Entries
            </span>
          </div>

          {!hasEpisodes && (
            <div className="py-24 border-t-2 border-black/10 border-b-2 text-center bg-gray-50/50">
              <p className="text-lg md:text-xl font-medium text-black/40 tracking-tight">
                First picks are being written up now.
              </p>
            </div>
          )}

          <div className="flex flex-col border-t-2 border-black/10">
            {hasEpisodes &&
              episodes.map((episode) => {
                const dateObj = new Date(episode.created_at);
                const formattedDate = dateObj.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });

                return (
                  <Link
                    href={`/episodes/${episode.id}`}
                    key={episode.id}
                    className="group flex flex-col md:flex-row justify-between items-start md:items-center py-8 md:py-12 border-b-2 border-black/10 hover:border-black transition-all duration-300"
                  >
                    {/* Left Side: Title & Show */}
                    <div className="max-w-4xl pr-4 mb-4 md:mb-0">
                      <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-black/70 group-hover:text-black transition-colors tracking-tighter uppercase leading-[0.9]">
                        {episode.title}
                      </h3>
                      {episode.source_show && (
                        <span className="inline-block mt-4 md:mt-6 px-3 py-1 bg-gray-100 text-[10px] md:text-xs font-bold uppercase tracking-widest text-black/60 group-hover:bg-black group-hover:text-white transition-colors">
                          {episode.source_show}
                        </span>
                      )}
                    </div>

                    {/* Right Side: Date & Arrow */}
                    <div className="flex items-center gap-6 md:gap-8 md:text-right mt-2 md:mt-0">
                      <span className="text-xs md:text-sm font-bold text-black/40 group-hover:text-black/80 transition-colors uppercase tracking-[0.2em] whitespace-nowrap">
                        {formattedDate}
                      </span>
                      <span className="hidden md:block text-3xl font-light opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        →
                      </span>
                    </div>
                  </Link>
                );
              })}
          </div>
        </section>

      </div>
    </main>
  );
}