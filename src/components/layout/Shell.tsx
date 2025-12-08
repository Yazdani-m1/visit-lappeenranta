// src/components/layout/Shell.tsx
import type React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  return (
    <div className="min-h-screen bg-sky-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-8 pt-4 md:px-6 md:pb-10 md:pt-6">
        <Header />
        <main className="mt-6 flex-1 md:mt-8">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
