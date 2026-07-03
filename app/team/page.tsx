// app/team/page.tsx
import Nav from '@/components/Nav';

export const metadata = {
  title: 'Team & Advisors — SEC Club',
};

// --- DATA ---------------------------------------------------------------
// Org chart from the design team. null = section hidden (no placeholder box).
const orgChart: string | null = null; // e.g. "/team/org-chart.png"

type Person = {
  name: string;
  role: string;   // team: role · advisors: title
  line?: string;  // one line
  photo?: string; // e.g. "/team/name.jpg" — omit and the card shows initials, same crop
  tag?: string;   // e.g. "Principal Advisor"
};

// Team — photo, name, role, one line. Empty = section hidden.
const team: Person[] = [
  // { name: "Amadeus …", role: "President", line: "…", photo: "/team/amadeus.jpg" },
];

// Advisors — photo, name, title, one line.
// Fill Dr. Janitha's title / line / photo before launch — don't ship invented copy about a real person.
const advisors: Person[] = [
  { name: 'Dr. Janitha Nadarajah', role: '', line: '', photo: '', tag: 'Principal Advisor' },
];
// -----------------------------------------------------------------------

function initials(name: string) {
  return name
    .replace(/^Dr\.?\s+/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

// Every photo goes through this — identical crop, duotone, and grey→warm hover.
// This single component is what enforces the "one hand" uniformity.
function PersonCard({ p }: { p: Person }) {
  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-black transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-2xl">
        {p.photo ? (
          <img
            src={p.photo}
            alt={p.name}
            className="w-full h-full object-cover object-top grayscale contrast-110 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-mono text-2xl uppercase tracking-widest text-white/30">
              {initials(p.name)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
        {p.tag && (
          <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.2em] bg-white text-black px-2 py-1">
            {p.tag}
          </span>
        )}
      </div>

      <h3 className="font-serif text-xl md:text-2xl tracking-tight mt-4">{p.name}</h3>
      {p.role && (
        <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-black/50 mt-1">
          {p.role}
        </p>
      )}
      {p.line && <p className="text-sm text-black/60 mt-2 leading-relaxed">{p.line}</p>}
    </div>
  );
}

export default function TeamPage() {
  return (
    <main className="bg-white text-black font-sans min-h-screen selection:bg-black selection:text-white antialiased pb-28">
      <Nav />

      {/* Title */}
      <section className="max-w-[1500px] mx-auto px-6 md:px-12 pt-16 md:pt-20 mb-16">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-black leading-[0.85]">
          Team &amp;<br />Advisors
        </h1>
      </section>

      {/* 1 · Org chart on top — hidden until the design team's image lands */}
      {orgChart && (
        <section className="max-w-[1500px] mx-auto px-6 md:px-12 mb-24">
          <h2 className="font-mono text-[11px] font-black tracking-[0.25em] uppercase text-black/40 mb-6 border-b border-black/10 pb-3">
            Structure
          </h2>
          <div className="w-full border border-black/10 overflow-hidden">
            <img src={orgChart} alt="SEC organisational chart" className="w-full h-auto" />
          </div>
        </section>
      )}

      {/* 2 · Team grid */}
      {team.length > 0 && (
        <section className="max-w-[1500px] mx-auto px-6 md:px-12 mb-24">
          <h2 className="font-mono text-[11px] font-black tracking-[0.25em] uppercase text-black/40 mb-10 border-b border-black/10 pb-3">
            Team
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-14">
            {team.map((p, i) => (
              <PersonCard key={i} p={p} />
            ))}
          </div>
        </section>
      )}

      {/* 3 · Advisors */}
      {advisors.length > 0 && (
        <section className="max-w-[1500px] mx-auto px-6 md:px-12">
          <h2 className="font-mono text-[11px] font-black tracking-[0.25em] uppercase text-black/40 mb-10 border-b border-black/10 pb-3">
            Advisors
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-14">
            {advisors.map((p, i) => (
              <PersonCard key={i} p={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}