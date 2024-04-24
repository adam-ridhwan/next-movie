import { PageIndicatorIcon } from '@/components/icons';
import { usePagination } from '@/components/slider/hooks/use-pagination';

const PageIndicator = () => {
  const { state: { pages, currentPage } } = usePagination(); // prettier-ignore

  const pageNumbers = Array.from(pages.entries());

  return (
    <div className='flex items-center justify-center opacity-0 group-hover/slider:opacity-100 max-sm:hidden'>
      {pageNumbers.map(([key], i) => {
        if (i === 0 || i === pageNumbers.length - 1) return null;
        return <PageIndicatorIcon key={key} isActive={currentPage === key} />;
      })}
    </div>
  );
};

export default PageIndicator;
