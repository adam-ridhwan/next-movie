import { PageIndicatorIcon } from '@/components/icons';
import { usePagination } from '@/components/slider/hooks/use-pagination';

const PageIndicator = () => {
  const {
    state: { pages, currentPage },
  } = usePagination();

  const pageNumbers = Array.from(pages.entries());

  return (
    <div className='pr-leftRightCustom absolute -top-5 right-0 flex items-center justify-center opacity-0 group-hover/slider:opacity-100'>
      {pageNumbers.map(([key], i) => {
        if (i === 0 || i === pageNumbers.length - 1) return null;
        return <PageIndicatorIcon key={key} isActive={currentPage === key} />;
      })}
    </div>
  );
};

export default PageIndicator;
