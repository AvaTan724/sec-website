// app/news/page.tsx
//
// Setup: npm i rss-parser
//
// How it works:
// - Server component. All feed fetching happens on the server (no CORS
//   problems, no API keys, no client JS).
// - `revalidate = 3600` → Next.js caches the rendered page and refreshes it
//   at most once an hour. Visitors get instant loads; feeds get polite,
//   infrequent hits.
// - Every headline is real because it comes from the publisher's own feed.
//   A feed that fails or times out degrades to a plain link to the source's
//   homepage — the page never shows placeholders or errors.

import Parser from 'rss-parser';
import Nav from '@/components/Nav';
import { CATEGORIES, type Source } from '@/lib/feeds';

export const revalidate = 3600;

export const metadata = {
  title: 'News — SEC',
  description:
    'A curated directory of business, finance, and tech coverage — live headlines from the sources worth reading.',
};

// ---------------------------------------------------------------------------

type Item = { title: string; link: string };
type FeedResult = { source: Source; items: Item[] };

const parser = new Parser({
  timeout: 8000,
  headers: { 'User-Agent': 'SEC-Club-News/1.0 (+https://sunwaysec.example)' },
});

const HEADLINES_PER_SOURCE = 4;

async function fetchFeed(source: Source): Promise<FeedResult> {
  try {
    const feed = await parser.parseURL(source.feed);
    const items = (feed.items ?? [])
      .filter((i) => i.title && i.link)
      .slice(0, HEADLINES_PER_SOURCE)
      .map((i) => ({ title: i.title as string, link: i.link as string }));
    return { source, items };
  } catch {
    // Feed down, moved, or slow — the source still renders as a link.
    return { source, items: [] };
  }
}

// ---------------------------------------------------------------------------

export default async function NewsPage() {
  // All feeds in parallel; each fetch catches its own failure.
  const categories = await Promise.all(
    CATEGORIES.map(async (cat) => ({
      ...cat,
      results: await Promise.all(cat.sources.map(fetchFeed)),
    }))
  );

  const updated = new Date().toLocaleString('en-MY', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Kuala_Lumpur',
  });

  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white antialiased">
      <Nav />

      <div className="py-16 md:py-24 px-6 sm:px-12 lg:px-24">
        <div className="max-w-[1600px] mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16 border-b-[3px] border-black pb-10 md:pb-12">
            <p className="text-xs md:text-sm font-black tracking-[0.3em] uppercase mb-6 text-black/50">
              The SEC Library
            </p>
            <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-black uppercase tracking-tighter leading-[0.85] mb-8">
              News
              <br />
              Directory
            </h1>
            <p className="text-base md:text-lg font-medium max-w-2xl mx-auto tracking-tight text-black/70">
              The sources worth a student&rsquo;s time — grouped by region and
              industry, with live headlines pulled straight from each
              publisher. We curate the directory; the reporting is theirs.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-black/40 mt-6">
              Updated {updated} MYT
            </p>
          </div>

          {/* Category cards — masonry via CSS columns */}
          <div className="columns-1 md:columns-2 xl:columns-4 gap-8 space-y-8">
            {categories.map((cat) => (
              <div
                key={cat.title}
                className="break-inside-avoid border-[3px] border-black bg-white"
              >
                <div className="bg-black text-white px-5 py-4">
                  <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">
                    {cat.title}
                  </h2>
                  <p className="text-[10px] font-medium tracking-wide text-white/50 mt-2">
                    {cat.blurb}
                  </p>
                </div>

                <div className="flex flex-col divide-y-2 divide-black/10">
                  {cat.results.map(({ source, items }) => (
                    <div key={source.name} className="p-4">
                      <a
                        href={source.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] font-black uppercase tracking-widest text-black hover:underline underline-offset-4"
                      >
                        {source.name} →
                      </a>

                      {items.length > 0 && (
                        <ul className="mt-3 flex flex-col gap-2.5">
                          {items.map((item) => (
                            <li key={item.link}>
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-sm font-bold leading-snug tracking-tight text-black/80 hover:text-black hover:underline decoration-2 underline-offset-4"
                              >
                                {item.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer band */}
          <div className="mt-20 md:mt-24 border-t-[12px] border-black pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <span className="text-2xl font-black uppercase tracking-tighter">
              SEC
            </span>
            <span className="text-xs font-medium tracking-tight text-black/50">
              Headlines belong to their publishers. SEC curates the directory.
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}