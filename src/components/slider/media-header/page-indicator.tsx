/* eslint no-restricted-imports: 0 */

'use client';

import { useSliderStore } from '@/providers/slider/slider-provider';

import { usePageUtils } from '@/hooks/use-page-utils';
import { PageIndicatorIcon } from '@/components/icons';

const PageIndicator = () => {
  const CONTENT = useSliderStore(state => state.CONTENT);
  const pages = useSliderStore(state => state.pages);
  const currentPage = useSliderStore(state => state.currentPage);
  const { actions: { getTileCountPerPage } } = usePageUtils(); // prettier-ignore

  if (CONTENT.length <= getTileCountPerPage()) return null;

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
