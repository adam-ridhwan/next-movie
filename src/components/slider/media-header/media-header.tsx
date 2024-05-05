import { cn } from '@/lib/utils';
import PageIndicator from '@/components/slider/media-header/page-indicator';

type MediaHeaderProps = {
  children: string;
  className?: string;
};

const MediaHeader = ({ children, className }: MediaHeaderProps) => (
  <>
    <div className='mx-[0.5%] flex justify-between px-custom'>
      <p className={cn('mb-2 w-fit text-[17px] font-medium', className)}>
        {children}
      </p>
      <PageIndicator />
    </div>
  </>
);

export default MediaHeader;
