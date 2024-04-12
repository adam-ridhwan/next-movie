'use client';

import { PageIndicatorIcon } from '@/components/icons';
import { usePagination } from '@/components/slider/hooks/use-pagination/use-pagination';

const PageIndicator = () => {
  const {
    state: { pages, currentPage },
  } = usePagination();

  return (
    <div className='flex items-center justify-center'>
      {Array.from({ length: pages.size - 2 }).map((_, index) => (
        <PageIndicatorIcon key={index} isActive={currentPage - 1 === index} />
      ))}
    </div>
  );
};

export default PageIndicator;
