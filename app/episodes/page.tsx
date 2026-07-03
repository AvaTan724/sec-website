// app/episodes/page.tsx
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Nav from '@/components/Nav';

export const revalidate = 0;

export default async function EpisodesDirectory() {
  const { data: episodes } = await supabase
    .from('episodes')
    .select('id, title, created_at')
    .order('created_at', { ascending: false });

  return (
    <main className="bg-white text-black font-sans min-h-screen selection:bg-black selection:text-white antialiased pb-24">
      <Nav />

      {/* Archive Title */}
      <section className="max-w-5xl mx-auto px-6 mt-16 mb-16">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-black">
          The Archive
        </h1>
      </section>

      {/* Episodes List */}
      <section className="max-w-5xl mx-auto px-6">
        <h2 className="text-[11px] font-black tracking-[0.25em] uppercase text-black/40 mb-6 border-b-2 border-black pb-2">
          All Episodes
        </h2>

        <div className="flex flex-col">
          {episodes && episodes.map((episode) => {
            const dateObj = new Date(episode.created_at);
            const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

            return (
              <Link
                href={`/episode?id=${episode.id}`}
                key={episode.id}
                className="group flex flex-col md:flex-row justify-between md:items-baseline py-6 border-b border-black/10 hover:bg-black/[0.03] px-2 transition-colors"
              >
                <span className="text-xl md:text-3xl font-black text-black/80 group-hover:text-black transition-colors mb-2 md:mb-0 max-w-3xl pr-4 tracking-tight uppercase">
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