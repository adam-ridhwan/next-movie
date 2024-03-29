import { cn } from '@/app/_lib/utils';

type FontProps = {
  children: string;
  className?: string;
};

const headingLarge = ({ children, className }: FontProps) => (
  <span className={cn('text-[32px] font-light', className)}>{children}</span>
);

const headingMedium = ({ children, className }: FontProps) => (
  <span className={cn('text-[24px] font-light', className)}>{children}</span>
);

const headingSmall = ({ children, className }: FontProps) => (
  <span className={cn('text-[24px] font-medium', className)}>{children}</span>
);

const headingExtraSmall = ({ children, className }: FontProps) => (
  <span className={cn('text-[18px] font-medium', className)}>{children}</span>
);

const bodyMedium = ({ children, className }: FontProps) => (
  <span className={cn('font-light, className text-[15px]', className)}>{children}</span>
);

const bodySmall = ({ children, className }: FontProps) => (
  <span className={cn('font-light, className text-[13px]', className)}>{children}</span>
);

export const AppFonts = {
  headingLarge,
  headingMedium,
  headingSmall,
  headingExtraSmall,
  bodyMedium,
  bodySmall,
} as const;
