import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  children: ReactNode;
  className?: string;
}

export function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        'mb-5 inline-flex items-center gap-2 font-sans text-base font-semibold leading-7 text-foreground sm:text-lg md:text-xl',
        className
      )}
    >
      <span className='text-muted-foreground/50' aria-hidden='true'>[</span>
      <span>{children}</span>
      <span className='text-muted-foreground/50' aria-hidden='true'>]</span>
    </h2>
  );
}
