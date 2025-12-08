// src/app/layout.tsx
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Visit Lappeenranta',
  description: 'A clean, modern guide to Lappeenranta for visitors and locals.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <div className="min-h-screen bg-gradient-to-b from-sky-50 via-slate-50 to-slate-100">
          {children}
        </div>
      </body>
    </html>
  );
}
