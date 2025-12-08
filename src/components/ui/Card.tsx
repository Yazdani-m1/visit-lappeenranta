// src/components/ui/Card.tsx
import type { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Card({ className = '', ...props }: CardProps) {
  return (
    <div
      className={
        'group relative flex flex-col overflow-hidden rounded-2xl border border-sky-100 bg-white/90 shadow-sm shadow-sky-100 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-200 ' +
        className
      }
      {...props}
    />
  );
}
