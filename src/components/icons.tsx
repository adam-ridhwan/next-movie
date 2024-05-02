import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

export type SVGProps = {
  isActive?: boolean;
  className?: string;
};

export const LogoIcon = ({ className }: SVGProps) => (
  <svg width='33' height='27' className={cn('fill-red', className)} xmlns='http://www.w3.org/2000/svg'>
    <path d='m26.463.408 3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-1.6a3.186 3.186 0 0 0-3.184 3.2l-.016 19.2a3.2 3.2 0 0 0 3.2 3.2h25.6a3.2 3.2 0 0 0 3.2-3.2V.408h-6.4Z' />
  </svg>
);

export const SearchIcon = ({ className }: SVGProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    className={cn('h-6 w-6 fill-white', className)}
  >
    <path d='M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z'></path>
  </svg>
);

export const LoadingIcon = ({ className }: SVGProps) => (
  <Loader2 className={cn('h-5 w-5 animate-spin', className)} />
);

export const ChevronLeftIcon = ({ className }: SVGProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.5'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={cn('', className)}
  >
    <path d='m15 18-6-6 6-6' />
  </svg>
);

export const ChevronRightIcon = ({ className }: SVGProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.5'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={cn('', className)}
  >
    <path d='m9 18 6-6-6-6' />
  </svg>
);

export const PageIndicatorIcon = ({ isActive, className }: SVGProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='3'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={cn(
      'h-4 w-4 scale-125 border-amber-400 stroke-muted-foreground/60',
      { 'stroke-primary': isActive },
      className
    )}
  >
    <path d='M5 12h14' />
  </svg>
);

export const ArrowRightCircleIcon = ({ className }: SVGProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='currentColor'
    className={cn('size-6', className)}
    viewBox='0 0 16 16'
  >
    <path d='M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z' />
  </svg>
);
