// app/episode/page.tsx
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const revalidate = 0;

export default async function EpisodePage({ searchParams }: { searchParams: Promise<{ id: string }> }) {
  const resolvedParams = await searchParams;
  
  if (!resolvedParams.id) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <h1>Error: No episode ID provided in the URL.</h1>
      </main>
    );
  }

  const episodeId = Number(resolvedParams.id);

  const { data: episode, error } = await supabase
    .from('episodes')
    .select('*')
    .eq('id', episodeId)
    .maybeSingle();

  if (!episode || error) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-gray-200 flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-serif italic text-white mb-4">Episode Not Found</h1>
        <p className="text-gray-400 mb-8 text-center max-w-md">
          We tried to look for Episode ID: <strong>{episodeId}</strong>, but Supabase returned nothing. 
        </p>
        <Link href="/" className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition">
          ← Back to Homepage
        </Link>
      </main>
    );
  }

  const formattedDate = new Date(episode.created_at).toLocaleDateString('en-US', { 
    month: 'long', day: 'numeric', year: 'numeric' 
  });

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans pb-24">
      <header className="py-10 px-6 max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-serif italic font-bold text-white tracking-tight hover:opacity-80 transition">
          SEC Founders
        </Link>
      </header>

      <div className="max-w-3xl mx-auto px-6 mt-10">
        <Link href="/" className="text-sm text-gray-500 hover:text-white transition mb-12 inline-block">
          ← Back to all episodes
        </Link>

        <article className="space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              {episode.title}
            </h2>
            <div className="text-sm text-gray-500 flex items-center space-x-3">
              <span>{formattedDate}</span>
              <span>|</span>
              <span>Episode {episode.id}</span>
            </div>
          </div>

          <div className="flex items-center w-full pt-4">
            <audio 
              controls 
              className="w-full h-12 rounded-lg"
              style={{ filter: 'invert(1) hue-rotate(180deg) grayscale(1) contrast(1.2)' }}
            >
              <source src={episode.media_url} type="audio/mpeg" />
            </audio>
          </div>

          <div className="pt-8">
            <h3 className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-4 border-b border-gray-800 pb-2">
              Notes
            </h3>
            <p className="text-gray-300 leading-relaxed text-base whitespace-pre-wrap">
              {episode.description}
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}