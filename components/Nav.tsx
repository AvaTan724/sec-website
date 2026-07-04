// components/Nav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// Final page map: About · Team · News · Podcast + Register CTA.
// Events stays commented until the first booking (see below).
const LINKS: { label: string; href: string; match?: string[] }[] = [
  { label: 'About', href: '/#about' },
  { label: 'Team', href: '/team', match: ['/team'] },
  { label: 'News', href: '/news', match: ['/news'] },
  { label: 'Podcast', href: '/episodes', match: ['/episodes'] },
  // Uncomment the day the first speaker is booked — not before:
  // { label: 'Events', href: '/events', match: ['/events'] },
];

const CTA = { label: 'Register', href: '/#register' };

export default function Nav({ variant = 'bar' }: { variant?: 'bar' | 'overlay' }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close the menu on route change (hash links on the same page won't
  // change pathname, so those close via onClick below).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const wrap =
    variant === 'overlay'
      ? 'absolute top-0 left-0 w-full py-6 md:py-8 px-6 md:px-12 flex justify-between items-center z-50'
      : 'w-full py-6 md:py-8 px-6 md:px-12 flex justify-between items-center border-b border-black/5';

  return (
    <>
      <header className={wrap}>
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-black text-xl md:text-2xl tracking-tighter leading-none text-black hover:opacity-60 transition-opacity relative z-[70]"
        >
          SEC
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-[11px] font-black tracking-[0.2em] uppercase text-black/50">
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
          <Link
            href={CTA.href}
            className="border-2 border-black px-5 py-2.5 text-black hover:bg-black hover:text-white transition-colors"
          >
            {CTA.label}
          </Link>
        </nav>

        {/* Mobile trigger */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden relative z-[70] font-mono text-[11px] font-black uppercase tracking-[0.25em] transition-colors ${
            open ? 'text-white' : 'text-black'
          }`}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </header>

      {/* Mobile full-screen menu — black sheet, giant type, same design language as the wordmark */}
      <div
        className={`md:hidden fixed inset-0 z-[60] bg-black text-white flex flex-col justify-between px-6 pt-28 pb-10 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <nav className="flex flex-col">
          {[...LINKS, CTA].map(({ label, href }, i) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="py-4 border-b border-white/10 font-black uppercase tracking-tighter leading-none text-[13vw] text-white/90 active:text-white"
              style={{
                transition: 'opacity 0.4s ease, transform 0.4s ease',
                transitionDelay: open ? `${i * 60}ms` : '0ms',
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0)' : 'translateY(12px)',
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex justify-between items-end font-mono text-[10px] uppercase tracking-widest text-white/40">
          <span>Sunway Entrepreneurs Club</span>
          <a href="https://www.instagram.com/sunway_sec" className="text-white/60">
            Instagram
          </a>
        </div>
      </div>
    </>
  );
}