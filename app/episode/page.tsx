// app/episodes/[id]/page.tsx
//
// Dynamic route replaces the old /episode?id= query-param page.
// Run once in the Supabase SQL editor before deploying:
//
//   alter table episodes add column if not exists source_show text;
//   alter table episodes add column if not exists source_url  text;
//
// source_show = the show this episode belongs to (e.g. "Founders Podcast")
// source_url  = link to the original episode page / channel

import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';

export const revalidate = 0;

// Normalize whatever URL was pasted into Supabase into an embeddable one.
// A plain youtube.com/watch or youtu.be link fails silently inside an iframe.
function toEmbedUrl(url: string): string {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    if (u.hostname.endsWith('youtube.com')) {
      if (u.pathname === '/watch' && u.searchParams.get('v')) {
        return `https://www.youtube.com/embed/${u.searchParams.get('v')}`;
      }
      if (u.pathname.startsWith('/embed/')) return url;
      if (u.pathname.startsWith('/live/')) {
        return `https://www.youtube.com/embed/${u.pathname.split('/')[2]}`;
      }
    }
    return url; // non-YouTube embeds (Spotify etc.) pass through
  } catch {
    return url;
  }
}

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params) {
  const { id } = await params;
  const { data } = await supabase
    .from('episodes')
    .select('title, source_show')
    .eq('id', id)
    .single();
  if (!data) return { title: 'Podcast — SEC' };
  return {
    title: `${data.title} — SEC Picks`,
    description: data.source_show
      ? `From ${data.source_show}. Curated by Sunway Entrepreneurs Club.`
      : 'Curated by Sunway Entrepreneurs Club.',
  };
}

export default async function EpisodePage({ params }: Params) {
  const { id } = await params;
  if (!id) return notFound();

  const { data: episode, error } = await supabase
    .from('episodes')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !episode) return notFound();

  const formattedDate = new Date(episode.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const embedUrl = episode.media_url ? toEmbedUrl(episode.media_url) : null;
  const watchUrl = episode.source_url || episode.media_url || null;

  return (
    <main className="bg-white text-black font-sans min-h-screen selection:bg-black selection:text-white antialiased pb-24">
      <Nav />

      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 mt-8 mb-12">
        <p className="text-[11px] font-bold text-black/40 uppercase tracking-widest mb-3">
          {episode.source_show ? (
            <>
              {episode.source_url ? (
                <a
                  href={episode.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black hover:underline underline-offset-4 transition-colors"
                >
                  {episode.source_show}
                </a>
              ) : (
                episode.source_show
              )}
              {' · '}
              {formattedDate}
            </>
          ) : (
            <>SEC Session · {formattedDate}</>
          )}
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.9] uppercase text-black">
          {episode.title}
        </h1>
      </section>

      {/* Player — falls back to a link if there's nothing embeddable */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        {embedUrl ? (
          <div className="w-full aspect-video bg-black rounded-lg overflow-hidden border border-black/10 shadow-xl">
            <iframe
              src={embedUrl}
              className="w-full h-full"
              title={episode.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : watchUrl ? (
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-black px-10 py-4 font-black text-xs uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors"
          >
            Watch on the original platform →
          </a>
        ) : null}
      </section>

      {/* Notes + guest */}
      <section className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 border-t border-black/10 pt-16">
        <div className="lg:col-span-7">
          <h2 className="text-xs font-black tracking-[0.25em] uppercase text-black/40 mb-6">
            Why we picked it
          </h2>
          <div className="text-base md:text-lg leading-relaxed text-black/80 whitespace-pre-line font-medium space-y-6 tracking-tight">
            {episode.description}
          </div>
        </div>

        {episode.guest_name && (
          <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-black/10 pt-12 lg:pt-0 lg:pl-12">
            <p className="text-[11px] font-black tracking-[0.25em] uppercase text-black/40 mb-4">
              About the guest
            </p>

            <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.85] mb-6 text-black">
              {episode.guest_name.split(' ')[0]}
              <br />
              {episode.guest_name.split(' ').slice(1).join(' ')}
            </h3>

            {episode.guest_bio && (
              <p className="text-black/70 leading-relaxed text-sm font-medium mb-8 tracking-tight">
                {episode.guest_bio}
              </p>
            )}

            {episode.guest_image && (
              <div className="w-full aspect-[4/5] relative bg-gray-100 rounded-md overflow-hidden border border-black/10 grayscale hover:grayscale-0 transition-all duration-500 shadow-sm">
                <img
                  src={episode.guest_image}
                  alt={episode.guest_name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            )}
          </div>
        )}
      </section>

      <section className="max-w-4xl mx-auto px-6 mt-20">
        <Link
          href="/episodes"
          className="inline-block px-8 py-3 border-2 border-black text-black font-black text-xs tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all duration-300"
        >
          ← All picks
        </Link>
      </section>
    </main>
  );
}