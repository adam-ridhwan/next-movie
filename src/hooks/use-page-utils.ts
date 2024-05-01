/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider/slider-provider';
import { v4 as uuid } from 'uuid';

import { TODO } from '@/types/global';
import { MEDIA_QUERY } from '@/lib/constants';

type UsePageUtilsReturn = {
  state: {
    firstPageLength: number;
    lastPageLength: number;
    hasPaginated: boolean;
    isMounted: boolean;
  };
  actions: {
    markAsPaginated: () => void;
    getTileCountPerPage: () => number;
    getTileCount: (num: number) => number;
    getStartIndex: (currentIndex: number, leftTilesTotal: number) => number;
    updateUuids: (params: UpdateUuidsParams) => TODO[];
  };
};

type UpdateUuidsParams = {
  newContentList: TODO[];
  firstTileIndex: number;
  isFirstPage?: boolean;
  isLastPage?: boolean;
};

export const usePageUtils = (): UsePageUtilsReturn => {
  const CONTENT = useSliderStore(state => state.CONTENT);
  const section = useSliderStore(state => state.section);
  const firstPageLength = useSliderStore(state => state.firstPageLength);
  const lastPageLength = useSliderStore(state => state.lastPageLength);
  const hasPaginated = useSliderStore(state => state.hasPaginated);
  const markAsPaginated = useSliderStore(state => state.markAsPaginated);
  const isMounted = useSliderStore(state => state.isMounted);

  const getTileCountPerPage = () => {
    const windowWidth = typeof window === 'undefined' ? 0 : window.innerWidth;

    if (section === 'cast') {
      if (windowWidth < MEDIA_QUERY.SM) return 5;
      if (windowWidth < MEDIA_QUERY.MD) return 6;
      if (windowWidth < MEDIA_QUERY.LG) return 7;
      return 8;
    }

    if (windowWidth < MEDIA_QUERY.SM) return 2;
    if (windowWidth < MEDIA_QUERY.MD) return 3;
    if (windowWidth < MEDIA_QUERY.LG) return 4;
    return 5;
  };

  // +1 for left/right placeholders
  const getTileCount = (num: number) => (Math.ceil(num) + 1) * getTileCountPerPage();

  const getStartIndex = (currentIndex: number, leftTilesTotal: number) => {
    // Prevents negative modulo
    return (
      (((currentIndex - leftTilesTotal + CONTENT.length) % CONTENT.length) + CONTENT.length) % CONTENT.length
    );
  };

  const updateUuids = ({
    newContentList,
    firstTileIndex,
    isFirstPage = false,
    isLastPage = false,
  }: UpdateUuidsParams) => {
    if (isFirstPage) {
      const updatedFirstElements = newContentList.slice(0, firstTileIndex).map(tile => ({
        ...tile,
        uuid: uuid(),
      }));
      return [...updatedFirstElements, ...newContentList.slice(firstTileIndex)];
    }

    if (isLastPage) {
      const updatedLastElements = newContentList.slice(firstTileIndex).map(tile => ({
        ...tile,
        uuid: uuid(),
      }));
      return [...newContentList.slice(0, firstTileIndex), ...updatedLastElements];
    }

    return newContentList.map(tile => ({ ...tile, uuid: uuid() }));
  };

  return {
    state: {
      firstPageLength,
      lastPageLength,
      hasPaginated,
      isMounted,
    },
    actions: {
      markAsPaginated,
      getTileCountPerPage,
      getTileCount,
      getStartIndex,
      updateUuids,
    },
  };
};
