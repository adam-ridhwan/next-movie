import { PageIndicatorIcon } from '@/components/icons';
import { usePagination } from '@/components/slider/hooks/use-pagination';

const PageIndicator = () => {
  const {
    state: { pages, currentPage },
  } = usePagination();

  return (
    <div className='pr-leftRightCustom absolute -top-5 right-0 flex items-center justify-center opacity-100 group-hover/slider:opacity-100'>
      {Array.from({ length: pages.size - 2 }).map((_, index) => (
        <PageIndicatorIcon key={index} isActive={currentPage - 1 === index} />
      ))}
    </div>
  );
};

export default PageIndicator;
