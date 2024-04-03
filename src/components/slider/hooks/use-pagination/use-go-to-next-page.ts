import { useSliderStore } from '@/providers/slider-provider';

import { log } from '@/components/slider/hooks/use-pagination/use-pagination';

export const useGoToNextPage = () => {
  const currentPage = useSliderStore(state => state.currentPage);
  const setCurrentPage = useSliderStore(state => state.setCurrentPage);
  const hasPaginated = useSliderStore(state => state.hasPaginated);
  const markAsPaginated = useSliderStore(state => state.markAsPaginated);

  const goToNextPage = () => {
    log('NEXT');
    if (!hasPaginated) markAsPaginated();
    setCurrentPage(currentPage + 1);
  };

  return { goToNextPage };
};
