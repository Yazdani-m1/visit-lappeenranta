// src/components/ui/Button.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'outline';
type ButtonSize = 'sm' | 'md';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-full font-medium transition shadow-sm disabled:cursor-not-allowed disabled:opacity-60';

  const variantClass =
    variant === 'primary'
      ? 'bg-sky-600 text-white hover:bg-sky-500 shadow-md shadow-sky-200'
      : 'border border-sky-200 bg-white text-sky-700 hover:bg-sky-50';

  const sizeClass = size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm';

  return (
    <button
      className={cn(base, variantClass, sizeClass, className)}
      {...rest}
    />
  );
}
