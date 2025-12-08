// src/components/layout/Container.tsx
import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div
      className={
        'mx-auto w-full max-w-6xl px-4 pb-16 pt-10 md:pb-24 md:pt-16 ' +
        className
      }
    >
      {children}
    </div>
  );
}
