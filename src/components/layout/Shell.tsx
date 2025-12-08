// src/components/layout/Shell.tsx
import type React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-sky-50 via-white to-sky-100">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
