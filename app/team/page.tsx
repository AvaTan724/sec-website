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
  role: string;   
  line?: string;  // Explicitly used to categorize them by Department
  photo?: string; 
  tag?: string;   
};

// --- 1. ADVISORS ---
const advisors: Person[] = [
  { 
    name: 'Dr. Janitha Nadarajah', 
    role: 'Principal Advisor', 
    line: 'Sunway University', 
    photo: 'janitha_sae.png', 
    tag: 'Principal Advisor' 
  },
  { 
    name: 'Ms. Fatimah Sakeenah', 
    role: 'Advisor', 
    line: 'Sunway College', 
    photo: '', 
    tag: 'Advisor' 
  },
  { 
    name: 'Assoc. Prof. Dr. Shehnaz Tehseen', 
    role: 'Advisor', 
    line: 'Sunway University', 
    photo: 'dr_shehnaz_tehseen.png', 
    tag: 'Advisor' 
  },
];

// --- 2. EXECUTIVE COMMITTEE ---
const exco: Person[] = [
  { name: "Amadeus Liew", role: "President", line: "Also serves as VP Brand & Content", photo: "" },
  { name: "Chin Kok Bing", role: "VP Partnership & Growth", line: "Executive Committee", photo: "" },
  { name: "Hwee Wei Shan", role: "VP Events", line: "Also serves as Treasurer", photo: "" },
];

// --- 3. SECRETARY & TREASURER ---
const secTreasury: Person[] = [
  { name: "Hilda", role: "Secretary", line: "Secretarial", photo: "" },
  { name: "Zaara", role: "Vice Secretary", line: "Secretarial", photo: "" },
  { name: "Hwee Wei Shan", role: "Treasurer", line: "Treasury (Also VP Events)", photo: "" },
];

// --- 4. HEADS OF DEPARTMENT ---
const hods: Person[] = [
  { name: "Ang Jia Wei", role: "Head of Department", line: "Brand & Content", photo: "" },
  { name: "Imtiyaz Muhammad", role: "Head of Department", line: "People & Operations", photo: "" },
  { name: "Davinia", role: "Head of Department", line: "Partnership & Growth", photo: "" },
  { name: "Praveena", role: "Head of Department", line: "Events", photo: "" },
];

// --- 5. vHOD & LEADERS ---
const leaders: Person[] = [
  { name: "Li Yen", role: "vHOD", line: "Brand & Content", photo: "" },
  { name: "Carlyn", role: "Operations vHOD", line: "People & Operations", photo: "" },
  { name: "Xin En", role: "People vHOD", line: "People & Operations", photo: "" },
  { name: "Alena", role: "Internal Partnership Leader", line: "Partnership & Growth", photo: "" },
  { name: "Tharshana", role: "External Partnership Leader", line: "Partnership & Growth", photo: "" },
  { name: "Kristina", role: "vHOD", line: "Events", photo: "" },
];

// --- 6. EXECUTIVES ---
const executives: Person[] = [
  { name: "Marjai", role: "Executive", line: "Brand & Content", photo: "" },
  { name: "Sajidur", role: "Executive", line: "Events", photo: "" },
];

// --- 7. OFFICERS ---
const officers: Person[] = [
  { name: "Tan Kher Er", role: "AWI Officer", line: "AI & Web Innovation", photo: "" },
  { name: "Ginnie", role: "AWI Officer", line: "AI & Web Innovation", photo: "" },
];

// Alumni — populate from next term onward.
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

// Every photo goes through this — identical crop, full color, no overlays.
function PersonCard({ p }: { p: Person }) {
  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-2xl">
        {p.photo ? (
          <img
            src={p.photo}
            alt={p.name}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="font-mono text-4xl uppercase tracking-widest text-black/20">
              {initials(p.name)}
            </span>
          </div>
        )}
        
        {/* We removed the dark overlay div that used to be here */}

        {p.tag && (
          <span className="absolute top-3 left-3 max-w-[calc(100%-1.5rem)] truncate font-mono text-[9px] uppercase tracking-[0.12em] bg-white text-black px-2 py-1">
            {p.tag}
          </span>
        )}
      </div>

      <h3 className="font-serif text-xl md:text-2xl tracking-tight mt-4">{p.name}</h3>
      {p.role && (
        <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-black/90 mt-1">
          {p.role}
        </p>
      )}
      {p.line && (
        <p className="text-[11px] md:text-xs font-bold text-black/40 mt-1 uppercase tracking-wider">
          {p.line}
        </p>
      )}
    </div>
  );
}

function PeopleSection({ title, people }: { title: string; people: Person[] }) {
  if (people.length === 0) return null;
  return (
    <section className="max-w-[1500px] mx-auto px-6 md:px-12 mb-24">
      <h2 className="font-mono text-[11px] font-black tracking-[0.25em] uppercase text-black/40 mb-10 border-b-[2px] border-black pb-3">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-14">
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

      <section className="max-w-[1500px] mx-auto px-6 md:px-12 pt-20 md:pt-32 mb-16 md:mb-24">
        <h1 className="font-display text-5xl md:text-8xl lg:text-[10rem] uppercase tracking-tighter text-black leading-[0.85]">
          Team &amp;<br />Advisors
        </h1>
      </section>

      {orgChart && (
        <section className="max-w-[1500px] mx-auto px-6 md:px-12 mb-24">
          <h2 className="font-mono text-[11px] font-black tracking-[0.25em] uppercase text-black/40 mb-6 border-b-[2px] border-black pb-3">
            Structure
          </h2>
          <div className="w-full border-2 border-black overflow-hidden bg-gray-50">
            <img src={orgChart} alt="SEC organisational chart" className="w-full h-auto mix-blend-multiply" />
          </div>
        </section>
      )}

      {/* Render team strictly ordered by requested seniority */}
      <PeopleSection title="Advisors" people={advisors} />
      <PeopleSection title="Executive Committee" people={exco} />
      <PeopleSection title="Secretary & Treasurer" people={secTreasury} />
      <PeopleSection title="Heads of Department" people={hods} />
      <PeopleSection title="vHOD & Leaders" people={leaders} />
      <PeopleSection title="Executives" people={executives} />
      <PeopleSection title="Officers" people={officers} />
      
      {/* Alumni */}
      <PeopleSection title="Alumni" people={alumni} />
    </main>
  );
}