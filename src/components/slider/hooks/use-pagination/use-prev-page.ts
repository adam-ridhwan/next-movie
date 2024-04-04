/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';

import { usePaginationLogger } from '@/lib/logger';

export const usePrevPage = () => {
  const currentPage = useSliderStore(state => state.currentPage);
  const setCurrentPage = useSliderStore(state => state.setCurrentPage);

  const goToPrevPage = () => {
    usePaginationLogger.prev();
    setCurrentPage(currentPage - 1);
  };

  return { goToPrevPage };
};
