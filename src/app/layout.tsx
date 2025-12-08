// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Shell } from '@/components/layout/Shell';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Visit Lappeenranta',
  description:
    'A calm lakeside city guide and simple trip planner for Lappeenranta, Finland.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-slate-900 antialiased`}>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
