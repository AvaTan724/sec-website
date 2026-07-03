// app/events/page.tsx
import Nav from '@/components/Nav';

export const metadata = {
  title: 'Events — SEC Club',
};

const OXBLOOD = '#4a0404';

// --- DATA ---------------------------------------------------------------
// Set `upcoming` to an object the moment a speaker is booked; leave it null
// and the whole Upcoming cover stays hidden (no placeholder).
//   { speaker, built, date, image, lumaUrl? }
type Upcoming = {
  speaker: string;   // headline name
  built: string;     // what they built — the one line
  date: string;      // display date, e.g. "14 August 2026"
  image: string;     // portrait path, e.g. "/events/speaker.jpg"
  lumaUrl?: string;  // RSVP link
} | null;

const upcoming: Upcoming = null;

// Photos from events that actually happened. Empty = Past section hidden.
//   { image, caption? }  — keep captions rare; let the photos carry it.
type PastPhoto = { image: string; caption?: string };
const pastPhotos: PastPhoto[] = [];

// Luma calendar embed — replace with the real calendar id.
const LUMA_CALENDAR_ID = 'cal-XXXXXXXXXXXX';

// Runs behind the scenes — printed here only as a quiet label, never a grid.
const FORMATS = 'SEC Reads · Corporate Visit · AI Tools · Founder Talk';
// -----------------------------------------------------------------------

export default function EventsPage() {
  return (
      <main className="bg-white text-black font-sans min-h-screen selection:bg-black selection:text-white antialiased pb-24">
        <Nav />      

      {/* 1 · UPCOMING — the headline. Hidden entirely until a speaker is booked. */}
      {upcoming && (
        <section className="border-b border-black/10">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Duotone speaker portrait */}
            <div className="relative min-h-[55vh] lg:min-h-[82vh] overflow-hidden bg-black order-1 lg:order-none">
              <img
                src={upcoming.image}
                alt={upcoming.speaker}
                className="w-full h-full object-cover object-top grayscale"
              />
              <div
                className="absolute inset-0 mix-blend-color opacity-60 pointer-events-none"
                style={{ backgroundColor: OXBLOOD }}
              />
            </div>

            {/* Cover text */}
            <div className="flex flex-col justify-center px-6 md:px-12 lg:px-16 py-16 lg:py-0 gap-8">

              {/* Live oxblood signal */}
              <div className="inline-flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ backgroundColor: OXBLOOD }} />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: OXBLOOD }} />
                </span>
                <span
                  className="font-mono text-[11px] font-bold uppercase tracking-[0.35em] animate-pulse [animation-duration:2.5s]"
                  style={{ color: OXBLOOD }}
                >
                  Upcoming
                </span>
              </div>

              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-black">
                {upcoming.speaker}
              </h1>

              <p className="font-mono text-sm md:text-base uppercase tracking-wider text-black/60">
                {upcoming.built} <span className="text-black/30">·</span> {upcoming.date}
              </p>

              {upcoming.lumaUrl && (
                <a
                  href={upcoming.lumaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-block self-start overflow-hidden border-2 px-12 py-5 font-black text-xs uppercase tracking-[0.2em] mt-2"
                  style={{ borderColor: OXBLOOD, color: OXBLOOD }}
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Save your seat</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                    style={{ backgroundColor: OXBLOOD }}
                  />
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 2 · PAST — the proof. Photos carry it. Hidden until there are real ones. */}
      {pastPhotos.length > 0 && (
        <section className="px-6 md:px-12 py-20 md:py-28 max-w-[1500px] mx-auto w-full">
          <h2 className="font-mono text-[11px] font-black tracking-[0.25em] uppercase text-black/40 mb-10 border-b border-black/10 pb-3">
            Past
          </h2>

          <div className="columns-2 md:columns-3 gap-4 [column-fill:_balance]">
            {pastPhotos.map((photo, i) => (
              <figure key={i} className="mb-4 break-inside-avoid group">
                <div className="relative overflow-hidden transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-xl">
                  <img
                    src={photo.image}
                    alt={photo.caption || ''}
                    className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                  />
                  <div
                    className="absolute inset-0 mix-blend-color opacity-50 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none"
                    style={{ backgroundColor: OXBLOOD }}
                  />
                </div>
                {photo.caption && (
                  <figcaption className="font-mono text-[10px] uppercase tracking-widest text-black/40 mt-2">
                    {photo.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* 3 · FULL CALENDAR — Luma embed. Formats appear only as a quiet label. */}
      <section className="px-6 md:px-12 py-20 md:py-28 max-w-[1500px] mx-auto w-full border-t border-black/10">
        <h2 className="font-mono text-[11px] font-black tracking-[0.25em] uppercase text-black/40 mb-3 border-b border-black/10 pb-3">
          Calendar
        </h2>
        <p className="font-mono text-[11px] uppercase tracking-widest text-black/40 mb-8">
          {FORMATS}
        </p>

        <div className="w-full border border-black/10 rounded-lg overflow-hidden bg-white">
          <iframe
            src={`https://lu.ma/embed/calendar/${LUMA_CALENDAR_ID}/events`}
            width="100%"
            height="640"
            frameBorder="0"
            style={{ border: 'none' }}
            allowFullScreen
            aria-hidden="false"
          />
        </div>
      </section>
    </main>
  );
}