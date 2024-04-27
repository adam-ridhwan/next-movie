'use client';

import { cn } from '@/lib/utils';
import { Divider } from '@/components/divider';
import PageIndicator from '@/components/slider/page-indicator/page-indicator';

type MediaHeaderProps = {
  children: string;
  className?: string;
};

const MediaHeader = ({ children, className }: MediaHeaderProps) => (
  <>
    <Divider />
    <div className='mx-[0.5%] flex justify-between px-leftRightCustom'>
      <p className={cn('mb-2 w-fit text-[17px] font-medium', className)}>{children}</p>
      <PageIndicator />
    </div>
  </>
);

export default MediaHeader;
