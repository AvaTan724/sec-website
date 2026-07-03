// components/Nav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Add or rename a nav item here once — it updates on every page automatically.
const LINKS: { label: string; href: string; match?: string[] }[] = [
  { label: 'About', href: '/#about' },
  { label: 'Team', href: '/team', match: ['/team'] },
  { label: 'Podcast', href: '/episodes', match: ['/episodes', '/episode'] },
  { label: 'Events', href: '/events', match: ['/events'] },
  { label: 'Partners', href: '/sponsors', match: ['/sponsors'] },
  { label: 'Register', href: '/#register' },
  { label: 'News', href: '/news', match: ['/news'] },
];

export default function Nav({ variant = 'bar' }: { variant?: 'bar' | 'overlay' }) {
  const pathname = usePathname();

  const wrap =
    variant === 'overlay'
      ? 'absolute top-0 left-0 w-full py-8 px-6 md:px-12 flex justify-between items-center z-50'
      : 'w-full py-8 px-6 md:px-12 flex justify-between items-center border-b border-black/5';

  return (
    <header className={wrap}>
      <Link
        href="/"
        className="font-black text-2xl tracking-tighter leading-none text-black hover:opacity-60 transition-opacity"
      >
        SEC<br />CLUB
      </Link>

      <nav className="hidden md:flex space-x-6 lg:space-x-8 text-[11px] font-black tracking-[0.2em] uppercase text-black/50">
        {LINKS.map(({ label, href, match }) => {
          const isActive = match?.some(
            (m) => pathname === m || pathname?.startsWith(m + '/')
          );
          return (
            <Link
              key={label}
              href={href}
              className={isActive ? 'text-black' : 'hover:text-black transition-colors'}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}