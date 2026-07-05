// app/episodes/page.tsx
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Nav from '@/components/Nav';

export const revalidate = 0;

export const metadata = {
  title: 'Podcast — SEC',
  description:
    'Curated episodes worth a builder\u2019s time — watched, noted, and picked by SEC.',
};

export default async function EpisodesDirectory() {
  const { data: episodes } = await supabase
    .from('episodes')
    .select('*')
    .order('created_at', { ascending: false });

  const hasEpisodes = !!episodes && episodes.length > 0;

  return (
    <main className="bg-white text-black font-sans min-h-screen selection:bg-black selection:text-white antialiased pb-24">
      <Nav />

      <section className="max-w-5xl mx-auto px-6 mt-12 md:mt-16 mb-12 md:mb-16">
        <h1 className="font-display text-6xl md:text-8xl uppercase text-black leading-[0.85]">
          The Archive
        </h1>
        <p className="mt-6 text-base md:text-lg font-medium text-black/50 max-w-2xl">
          Episodes worth a builder&rsquo;s time — watched, noted, and picked by
          SEC. The shows belong to their creators; the curation is ours.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6">
        <h2 className="text-[11px] font-black tracking-[0.25em] uppercase text-black/40 mb-6 border-b-2 border-black pb-2">
          All Picks
        </h2>

        {!hasEpisodes && (
          <p className="py-16 text-base font-medium text-black/40">
            First picks are being written up now.
          </p>
        )}

        <div className="flex flex-col">
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
                  className="group flex flex-col md:flex-row justify-between md:items-baseline py-6 border-b border-black/10 hover:bg-black/[0.03] px-2 transition-colors"
                >
                  <span className="max-w-3xl pr-4 mb-2 md:mb-0">
                    <span className="block text-xl md:text-3xl font-black text-black/80 group-hover:text-black transition-colors tracking-tight uppercase">
                      {episode.title}
                    </span>
                    {episode.source_show && (
                      <span className="block font-mono text-[10px] uppercase tracking-widest text-black/40 mt-1.5">
                        {episode.source_show}
                      </span>
                    )}
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