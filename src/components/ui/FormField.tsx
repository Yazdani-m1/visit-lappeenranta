// src/components/ui/FormField.tsx
import type { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  description?: string;
  children: ReactNode;
}

export function FormField({
  label,
  htmlFor,
  error,
  description,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-1 text-sm">
      <label
        htmlFor={htmlFor}
        className="block text-xs font-medium text-slate-200"
      >
        {label}
      </label>
      {description && (
        <p className="text-[11px] text-slate-400">{description}</p>
      )}
      {children}
      {error && (
        <p className="text-[11px] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
