/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';

import { MEDIA_QUERY } from '@/lib/constants';

export const usePageUtils = () => {
  const TILES = useSliderStore(state => state.TILES);
  const firstPageLength = useSliderStore(state => state.firstPageLength);
  const lastPageLength = useSliderStore(state => state.lastPageLength);

  const getTilesPerPage = () => {
    const windowWidth = typeof window === 'undefined' ? 0 : window.innerWidth;
    if (windowWidth < MEDIA_QUERY.SM) return 2;
    if (windowWidth < MEDIA_QUERY.MD) return 3;
    if (windowWidth < MEDIA_QUERY.LG) return 4;
    if (windowWidth < MEDIA_QUERY.XL) return 5;
    return 6;
  };

  // +1 for left/right placeholders
  const getTotalTiles = (num: number) => (Math.ceil(num) + 1) * getTilesPerPage();

  const getStartIndex = (currentIndex: number, leftTilesTotal: number) => {
    // Prevents negative modulo
    return (
      (((currentIndex - leftTilesTotal + TILES.length) % TILES.length) + TILES.length) %
      TILES.length
    );
  };

  return { getTilesPerPage, getTotalTiles, getStartIndex, firstPageLength, lastPageLength };
};
