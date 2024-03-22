import { cn } from '@/lib/utils';

export type FontProps = {
  children: string;
  className?: string;
};

export const AppFonts = {
  headingLarge,
  headingMedium,
  headingSmall,
  headingExtraSmall,
  bodyMedium,
  bodySmall,
};

function headingLarge({ children, className }: FontProps) {
  return <span className={(cn('text-[32px] font-light'), className)}>{children}</span>;
}

function headingMedium({ children, className }: FontProps) {
  return <span className={(cn('text-[24px] font-light'), className)}>{children}</span>;
}

function headingSmall({ children, className }: FontProps) {
  return <span className={(cn('text-[24px] font-medium'), className)}>{children}</span>;
}
function headingExtraSmall({ children, className }: FontProps) {
  return <span className='text-[18px] font-medium'>{children}</span>;
}

function bodyMedium({ children, className }: FontProps) {
  return <span className={cn('text-[15px] font-light', className)}>{children}</span>;
}

function bodySmall({ children, className }: FontProps) {
  return <span className={cn('text-[13px] font-light', className)}>{children}</span>;
}
