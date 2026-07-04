// app/team/page.tsx
import Nav from '@/components/Nav';

export const metadata = {
  title: 'Team & Advisors — SEC',
};

// --- DATA ---------------------------------------------------------------
// Org chart from the design team. null = section hidden (no placeholder box).
const orgChart: string | null = null; // e.g. "/team/org-chart.png"

type Person = {
  name: string;
  role: string;   // team: role · advisors: title · alumni: what they did/do now
  line?: string;  // one line
  photo?: string; // e.g. "/team/name.jpg" — omit and the card shows initials
  tag?: string;   // e.g. "Principal Advisor"
};

// Team — photo, name, role, one line. Empty = section hidden.
const team: Person[] = [
  // { name: "Amadeus …", role: "President", line: "…", photo: "/team/amadeus.jpg" },
];

// Advisors — fill Dr. Janitha's real title / line / photo before launch.
// Don't ship invented copy about a real person.
const advisors: Person[] = [
  { name: 'Dr. Janitha Nadarajah', role: '', line: '', photo: '', tag: 'Principal Advisor' },
];

// Alumni — populate from next term onward. Same card, same crop.
// role = what they went on to do; that's the proof this page exists to show.
const alumni: Person[] = [];
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

// Every photo goes through this — identical crop, duotone, grey→warm hover.
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

function PeopleSection({ title, people }: { title: string; people: Person[] }) {
  if (people.length === 0) return null;
  return (
    <section className="max-w-[1500px] mx-auto px-6 md:px-12 mb-24">
      <h2 className="font-mono text-[11px] font-black tracking-[0.25em] uppercase text-black/40 mb-10 border-b border-black/10 pb-3">
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-14">
        {people.map((p, i) => (
          <PersonCard key={i} p={p} />
        ))}
      </div>
    </section>
  );
}

export default function TeamPage() {
  return (
    <main className="bg-white text-black font-sans min-h-screen selection:bg-black selection:text-white antialiased pb-28">
      <Nav />

      <section className="max-w-[1500px] mx-auto px-6 md:px-12 pt-12 md:pt-20 mb-12 md:mb-16">
        <h1 className="font-display text-6xl md:text-8xl uppercase text-black leading-[0.85]">
          Team &amp;<br />Advisors
        </h1>
      </section>

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

      <PeopleSection title="Team" people={team} />
      <PeopleSection title="Advisors" people={advisors} />
      <PeopleSection title="Alumni" people={alumni} />
    </main>
  );
}