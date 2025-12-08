// src/components/layout/Header.tsx
import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-sky-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-sky-600 text-xs font-semibold text-white shadow-md shadow-sky-200">
            LP
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-600">
              Visit
            </span>
            <span className="text-sm font-semibold text-slate-900">
              Lappeenranta
            </span>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-4 text-xs font-medium text-slate-600">
          <Link
            href="/places"
            className="hover:text-sky-700 hover:underline underline-offset-4"
          >
            Places
          </Link>
          <Link
            href="/trip-plan"
            className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-[11px] text-sky-700 shadow-sm shadow-sky-100 hover:bg-sky-100"
          >
            Trip plan request
          </Link>
        </nav>
      </div>
    </header>
  );
}
