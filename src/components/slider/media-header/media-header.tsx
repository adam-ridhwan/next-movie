import { cn } from '@/lib/utils';
import { Divider } from '@/components/divider';
import PageIndicator from '@/components/slider/media-header/page-indicator';

type MediaHeaderProps = {
  children: string;
  className?: string;
};

const MediaHeader = ({ children, className }: MediaHeaderProps) => (
  <>
    <Divider />
    <div className='px-custom mx-[0.5%] flex justify-between'>
      <p className={cn('mb-2 w-fit text-[17px] font-medium', className)}>{children}</p>
      <PageIndicator />
    </div>
  </>
);

export default MediaHeader;
