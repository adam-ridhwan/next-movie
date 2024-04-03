/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';

import { log } from '@/components/slider/hooks/use-pagination/use-pagination';

export const useGoToPrevPage = () => {
  const currentPage = useSliderStore(state => state.currentPage);
  const setCurrentPage = useSliderStore(state => state.setCurrentPage);

  const goToPrevPage = () => {
    log('PREV');
    setCurrentPage(currentPage - 1);
  };

  return { goToPrevPage };
};
