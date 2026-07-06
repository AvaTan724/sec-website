// components/Nav.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Final page map: About · Team · News · Podcast + Register CTA.
// Events stays commented until the first booking.
const LINKS: { label: string; href: string; match?: string[] }[] = [
  { label: 'About', href: '/#about' },
  { label: 'Team', href: '/team', match: ['/team'] },
  { label: 'News', href: '/news', match: ['/news'] },
  { label: 'Podcast', href: '/episodes', match: ['/episodes'] },
  // { label: 'Events', href: '/events', match: ['/events'] },
];

const CTA = { label: 'Register', href: '/#register' };

export default function Nav({ variant = 'bar' }: { variant?: 'bar' | 'overlay' }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  
  // 1. Reference for detecting outside clicks
  const navRef = useRef<HTMLDivElement>(null);

  // 2. Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // 3. Close the menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // 4. Close the menu when clicking outside of the nav component
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const wrap =
    variant === 'overlay'
      ? 'absolute top-0 left-0 w-full py-6 md:py-8 px-6 md:px-12 flex justify-between items-center z-50'
      : 'w-full py-6 md:py-8 px-6 md:px-12 flex justify-between items-center border-b border-black/5';

  return (
    <div ref={navRef}>
      <header className={wrap}>
        {/* LOGO: Replaced text with favicon */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="relative z-[70] transition-transform hover:scale-105 duration-300"
        >
          <img 
            src="/favicon.ico" 
            alt="Sunway Entrepreneurs Club Logo" 
            className="w-30 h-30 md:w-20 md:h-20 object-contain" 
          />
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

      {/* Mobile full-screen menu */}
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
          <a href="https://www.instagram.com/sunwayentrepreneurs" className="text-white/60">
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
}