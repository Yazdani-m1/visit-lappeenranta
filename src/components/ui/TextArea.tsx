// src/components/ui/TextArea.tsx
import type { TextareaHTMLAttributes } from 'react';

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export function TextArea({ className = '', ...props }: TextAreaProps) {
  return (
    <textarea
      className={
        'w-full rounded-xl border border-sky-100 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-sky-100 placeholder:text-slate-400 focus:bg-white focus:ring-2 ' +
        className
      }
      {...props}
    />
  );
}
