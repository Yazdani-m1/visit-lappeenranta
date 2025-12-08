// src/components/ui/Input.tsx
import type { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={
        'w-full rounded-xl border border-sky-100 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-sky-100 placeholder:text-slate-400 focus:bg-white focus:ring-2 ' +
        className
      }
      {...props}
    />
  );
}
