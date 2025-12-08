// src/components/layout/Header.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function Header() {
  return (
    <header className="flex items-center justify-between rounded-2xl border border-sky-100 bg-white/80 px-3 py-2 shadow-sm shadow-sky-100 backdrop-blur-sm md:px-4 md:py-3">
      <Link href="/" className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-xs font-semibold text-white shadow-sm shadow-sky-300">
          LP
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-800">
            Visit Lappeenranta
          </span>
          <span className="text-[11px] text-slate-500">
            Saimaa lakeside mini guide
          </span>
        </div>
      </Link>

      <nav className="flex items-center gap-2 text-xs md:gap-3 md:text-sm">
        <Link
          href="/places"
          className="rounded-full px-3 py-1 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        >
          Places
        </Link>
        <Link href="/trip-plan">
          <Button size="sm">Trip plan request</Button>
        </Link>
      </nav>
    </header>
  );
}
