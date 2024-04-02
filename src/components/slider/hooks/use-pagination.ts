import { useSliderStore } from '@/providers/slider-provider';

import { MEDIA_QUERY } from '@/lib/constants';
import { Pages, Tile } from '@/lib/types';
import { findIndexFromKey, getMapItem, log, validatePagesMap } from '@/lib/utils';

type UsePaginationState = {
  TILES: Tile[];
  pages: Pages;
  currentPage: number;
};

type UsePaginationConfig = {
  lastPageLength: number;
  isFirstPageVisited: boolean;
  isLastPageVisited: boolean;
  hasPaginated: boolean;
  getTilesPerPage: () => number;
  getMaxPages: () => number;
};

type UsePaginationActions = {
  goToNextPage: () => void;
  goToPrevPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
};

export const usePagination = (): [
  UsePaginationState,
  UsePaginationConfig,
  UsePaginationActions,
] => {
  const TILES = useSliderStore(state => state.TILES);
  const pages = useSliderStore(state => state.pages);
  const setAllPages = useSliderStore(state => state.setAllPages);
  const currentPage = useSliderStore(state => state.currentPage);
  const setCurrentPage = useSliderStore(state => state.setCurrentPage);

  const lastPageLength = useSliderStore(state => state.lastPageLength);
  const isFirstPageVisited = useSliderStore(state => state.isFirstPageVisited);
  const isLastPageVisited = useSliderStore(state => state.isLastPageVisited);
  const hasPaginated = useSliderStore(state => state.hasPaginated);
  const markAsPaginated = useSliderStore(state => state.markAsPaginated);

  function getTilesPerPage() {
    const windowWidth = typeof window === 'undefined' ? 0 : window.innerWidth;
    if (windowWidth < MEDIA_QUERY.SM) return 2;
    if (windowWidth < MEDIA_QUERY.MD) return 3;
    if (windowWidth < MEDIA_QUERY.LG) return 4;
    if (windowWidth < MEDIA_QUERY.XL) return 5;
    return 6;
  }

  function getMaxPages() {
    // +2 for the left and right placeholder pages
    return Math.ceil(TILES.length / getTilesPerPage()) + 2;
  }

  const goToFirstPage = () => {
    log('GO TO FIRST PAGE');
    const tilesPerPage = getTilesPerPage();
    const maxPages = getMaxPages();

    const initialPages: Pages = new Map<number, Tile[]>();

    // Left page placeholder
    initialPages.set(0, TILES.slice(-tilesPerPage));

    // Middle pages
    for (let pageIndex = 1; pageIndex < maxPages; pageIndex++) {
      const startIndex = (pageIndex - 1) * tilesPerPage;
      const endIndex = startIndex + tilesPerPage;
      initialPages.set(pageIndex, TILES.slice(startIndex, endIndex));
    }

    const lastPage = getMapItem({
      label: 'setInitialPages()',
      map: initialPages,
      key: maxPages - 2,
    });

    const tilesNeededForLastPage = tilesPerPage - lastPage.length;
    if (tilesNeededForLastPage) {
      initialPages.set(maxPages - 2, [...lastPage, ...TILES.slice(0, tilesNeededForLastPage)]);
    }

    // Right page placeholder
    initialPages.set(
      maxPages - 1,
      TILES.slice(tilesNeededForLastPage, tilesPerPage + tilesNeededForLastPage)
    );

    validatePagesMap({ label: 'setInitialPages()', tiles: TILES, pages: initialPages });

    setAllPages({
      pages: initialPages,
      currentPage: 1,
      maxPages: maxPages,
      tilesPerPage: tilesPerPage,
      lastPageLength: tilesPerPage - tilesNeededForLastPage,
      isFirstPageVisited: true,
      isLastPageVisited: false,
      isMounted: true,
    });
  };

  const goToLastPage = () => {
    log('GO TO LAST PAGE');
    const tilesPerPage = getTilesPerPage();
    const maxPages = getMaxPages();

    const newPages: Pages = new Map<number, Tile[]>();

    // Right page placeholder
    newPages.set(maxPages - 1, TILES.slice(0, tilesPerPage));

    // Middle pages
    let endIndex = TILES.length;
    let startIndex = TILES.length - tilesPerPage;
    const middlePagesLength = maxPages - 2;
    for (let i = middlePagesLength; i > 0; i--) {
      newPages.set(i, TILES.slice(Math.max(0, startIndex), endIndex));
      startIndex -= tilesPerPage;
      endIndex -= tilesPerPage;
    }

    const firstPage = getMapItem({
      label: 'goToLastPage()',
      map: newPages,
      key: 1,
    });

    const totalTilesNeededToComplete = tilesPerPage - firstPage.length;
    if (totalTilesNeededToComplete) {
      newPages.set(1, [...TILES.slice(-totalTilesNeededToComplete), ...firstPage]);
    }

    // Left page placeholder
    const firstItem = TILES.slice(-totalTilesNeededToComplete)[0];
    let firstItemIndex =
      findIndexFromKey({
        label: 'Left page placeholder goToLastPage()',
        array: TILES,
        key: 'id',
        value: firstItem.id,
      }) - 1;

    const leftArray = [];
    for (let i = 0; i < tilesPerPage; i++) {
      if (firstItemIndex < 0) firstItemIndex = TILES.length - 1;
      leftArray.unshift(TILES[firstItemIndex--]);
    }

    newPages.set(0, leftArray);

    validatePagesMap({ label: 'goToLastPage()', tiles: TILES, pages: newPages });

    setAllPages({
      pages: newPages,
      tilesPerPage: tilesPerPage,
      maxPages: maxPages,
      currentPage: maxPages - 2,
      lastPageLength: tilesPerPage - totalTilesNeededToComplete,
      isFirstPageVisited: false,
      isLastPageVisited: true,
    });
  };

  const goToPrevPage = () => {
    log('GO TO PREV PAGE');
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    log('GO TO NEXT PAGE');
    if (!hasPaginated) markAsPaginated();
    setCurrentPage(currentPage + 1);
  };

  return [
    { TILES, currentPage, pages },
    {
      getMaxPages,
      getTilesPerPage,
      lastPageLength,
      isFirstPageVisited,
      isLastPageVisited,
      hasPaginated,
    },
    { goToFirstPage, goToLastPage, goToPrevPage, goToNextPage },
  ];
};
