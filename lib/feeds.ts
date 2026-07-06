// lib/feeds.ts
// One place to manage the directory. Add/remove sources here — the page
// adapts automatically. If a feed URL dies, the source still renders as a
// link to its homepage, so the directory never shows a broken block.
//
// NOTE: RSS URLs rot. The ones below are the widely-published endpoints as
// of mid-2026, but verify each one renders before launch (open the URL in a
// browser — you should see XML). Anything marked VERIFY is less certain.
// Reuters has NOT offered public RSS since 2020 — do not add it.

export type Source = {
  name: string;
  site: string; // homepage — always linked, even if the feed dies
  feed: string; // RSS/Atom endpoint
};

export type Category = {
  title: string;
  blurb: string; // one honest line under the category header
  sources: Source[];
};

export const CATEGORIES: Category[] = [
  {
    title: 'Malaysia & SEA',
    blurb: 'Business and markets coverage closest to home.',
    sources: [
      {
        name: 'Free Malaysia Today',
        site: 'https://www.freemalaysiatoday.com',
        feed: 'https://www.freemalaysiatoday.com/feed/',
      },
      {
        name: 'CNA (Channel NewsAsia)',
        site: 'https://www.channelnewsasia.com/business',
        feed: 'https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml', // VERIFY
      },
      {
        name: 'Nikkei Asia',
        site: 'https://asia.nikkei.com',
        feed: 'https://asia.nikkei.com/rss/feed/nar', // VERIFY
      },
    ],
  },
  {
    title: 'AI',
    blurb: 'What is actually shipping, not what is being hyped.',
    sources: [
      {
        name: 'TechCrunch',
        site: 'https://techcrunch.com/category/artificial-intelligence/',
        feed: 'https://techcrunch.com/category/artificial-intelligence/feed/',
      },
      {
        name: 'MIT Technology Review',
        site: 'https://www.technologyreview.com',
        feed: 'https://www.technologyreview.com/feed/',
      },
      {
        name: 'Ars Technica',
        site: 'https://arstechnica.com/ai/',
        feed: 'https://feeds.arstechnica.com/arstechnica/technology-lab', // VERIFY
      },
    ],
  },
  {
    title: 'Markets & Finance',
    blurb: 'Global markets, rates, and capital flows.',
    sources: [
      {
        name: 'WSJ Markets',
        site: 'https://www.wsj.com/finance',
        feed: 'https://feeds.a.dj.com/rss/RSSMarketsMain.xml',
      },
      {
        name: 'CNBC Finance',
        site: 'https://www.cnbc.com/finance/',
        feed: 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=10000664', // VERIFY id
      },
      {
        name: 'MarketWatch',
        site: 'https://www.marketwatch.com',
        feed: 'https://feeds.content.dowjones.io/public/rss/mw_topstories', // VERIFY
      },
    ],
  },
  {
    title: 'Business & Tech',
    blurb: 'Company building, strategy, and the technology behind it.',
    sources: [
      {
        name: 'BBC Business',
        site: 'https://www.bbc.com/business',
        feed: 'https://feeds.bbci.co.uk/news/business/rss.xml',
      },
      {
        name: 'The Verge',
        site: 'https://www.theverge.com',
        feed: 'https://www.theverge.com/rss/index.xml',
      },
      {
        name: 'SCMP Business',
        site: 'https://www.scmp.com/business',
        feed: 'https://www.scmp.com/rss/92/feed', // VERIFY id
      },
    ],
  },
];