// src/components/ui/TextArea.tsx
import * as React from 'react';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function TextArea({ className = '', ...props }: TextAreaProps) {
  return (
    <textarea
      className={`w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-emerald-400 ${className}`}
      {...props}
    />
  );
}
