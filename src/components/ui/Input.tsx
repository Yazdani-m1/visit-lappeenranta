// src/components/ui/Input.tsx
import * as React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-emerald-400 ${className}`}
      {...props}
    />
  );
}
