// src/components/layout/Footer.tsx
export function Footer() {
  return (
    <footer className="mt-8 border-t border-slate-100 pt-4 text-[11px] text-slate-500 md:mt-10 md:pt-5">
      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
        <p>© 2025 Lappeenranta mini guide (demo).</p>
        <p>Built with Next.js · TypeScript · Tailwind CSS.</p>
      </div>
    </footer>
  );
}
