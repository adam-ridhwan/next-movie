import { cn } from '@/lib/utils';

type DividerProps = {
  className?: string;
};

export const Divider = ({ className }: DividerProps) => {
  return <div className={cn('mx-leftRightCustom my-4 border border-b-muted-foreground/20', className)} />;
};
