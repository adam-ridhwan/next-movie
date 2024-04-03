import { useSliderStore } from '@/providers/slider-provider';

import { logToConsoleUsePagination } from '@/components/slider/hooks/use-pagination/use-pagination';

export const useGoToPrevPage = () => {
  const currentPage = useSliderStore(state => state.currentPage);
  const setCurrentPage = useSliderStore(state => state.setCurrentPage);

  const goToPrevPage = () => {
    logToConsoleUsePagination('PREV');
    setCurrentPage(currentPage - 1);
  };

  return { goToPrevPage };
};
