// app/episode/page.tsx
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const revalidate = 0;

export default async function EpisodePage({ searchParams }: { searchParams: Promise<{ id: string }> }) {
  const resolvedParams = await searchParams;
  
  if (!resolvedParams.id) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center font-sans">
        <h1 className="text-sm tracking-widest uppercase text-gray-500">No video ID provided in the URL.</h1>
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
      <main className="min-h-screen bg-[#0a0a0a] text-gray-200 flex flex-col items-center justify-center p-6 font-sans">
        <h1 className="text-2xl font-serif italic text-white mb-4">Content Not Found</h1>
        <p className="text-gray-400 mb-8 text-center max-w-md text-sm">
          We couldn't locate Video ID: <strong>{episodeId}</strong> inside your database table.
        </p>
        <Link href="/" className="bg-white text-black px-6 py-2 rounded-full text-xs font-bold hover:bg-gray-200 transition-all uppercase tracking-wider">
          ← Back to Hub
        </Link>
      </main>
    );
  }

  const formattedDate = new Date(episode.created_at).toLocaleDateString('en-US', { 
    month: 'long', day: 'numeric', year: 'numeric' 
  });

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans pb-24 antialiased">
      {/* Premium Minimalist Top Header */}
      <header className="py-10 px-6 max-w-5xl mx-auto flex justify-between items-center border-b border-gray-900">
        <Link href="/" className="text-2xl font-serif italic font-bold text-white tracking-tight hover:opacity-80 transition-all">
          SEC Founders
        </Link>
        <nav className="flex space-x-6 text-xs uppercase tracking-widest text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">Archive</Link>
          <span className="text-gray-800">/</span>
          <span className="text-white">Viewing Episode</span>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-6 mt-12">
        {/* Navigation Link */}
        <Link href="/" className="text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors mb-10 inline-block">
          ← Back to archive
        </Link>

        <article className="space-y-12">
          {/* Header Typography Block */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-none max-w-3xl">
              {episode.title}
            </h2>
            <div className="text-xs uppercase tracking-widest text-gray-500 flex items-center space-x-4 pt-2">
              <span>{formattedDate}</span>
              <span className="text-gray-800">•</span>
              <span>Episode {episode.id}</span>
              <span className="text-gray-800">•</span>
              <button className="hover:text-white transition-colors underline decoration-gray-700 underline-offset-4">Share</button>
            </div>
          </div>

          {/* Premium Widescreen Video Player Framework */}
          <div className="w-full bg-[#111] rounded-xl overflow-hidden border border-gray-900 shadow-2xl transition-all duration-300 hover:border-gray-800">
            <div className="relative aspect-video w-full">
              <iframe
                src={episode.media_url}
                title={episode.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full border-0"
              />
            </div>
          </div>

          {/* Structured Notes Block */}
          <div className="pt-6 max-w-3xl">
            <h3 className="text-xs font-bold tracking-[0.25em] text-gray-500 uppercase mb-6 border-b border-gray-900 pb-3">
              Analysis & Notes
            </h3>
            <p className="text-gray-300 leading-relaxed text-base whitespace-pre-wrap font-normal selection:bg-white selection:text-black">
              {episode.description || "No analytical notes attached to this session yet."}
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}