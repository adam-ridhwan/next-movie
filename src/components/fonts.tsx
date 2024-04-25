import { cn } from '@/lib/utils';

type FontProps = {
  children: string;
  className?: string;
};

const HeadingLarge = ({ children, className }: FontProps) => (
  <span className={cn('text-[32px] font-medium leading-none text-primary/90', className)}>{children}</span>
);

const HeadingMedium = ({ children, className }: FontProps) => (
  <span className={cn('text-[24px] font-medium', className)}>{children}</span>
);

const HeadingSmall = ({ children, className }: FontProps) => (
  <span className={cn('text-[24px] font-medium', className)}>{children}</span>
);

const HeadingExtraSmall = ({ children, className }: FontProps) => (
  <span className={cn('text-[17px] font-medium', className)}>{children}</span>
);

const BodyMedium = ({ children, className }: FontProps) => (
  <span className={cn('text-[15px] font-light text-primary', className)}>{children}</span>
);

const BodySmall = ({ children, className }: FontProps) => (
  <span className={cn('text-[13px] font-light text-primary/70', className)}>{children}</span>
);

const NumberLabel = ({ children, className }: FontProps) => (
  <span className={cn('text-[40px] font-medium text-primary/80', className)}>{children}</span>
);

export { HeadingLarge, HeadingMedium, HeadingSmall, HeadingExtraSmall, BodyMedium, BodySmall, NumberLabel };
