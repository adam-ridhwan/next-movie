/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';
import chalk from 'chalk';

import { DEVELOPMENT_MODE, MEDIA_QUERY } from '@/lib/constants';
import { Pages, Tile } from '@/lib/types';
import { findIndexFromKey, getMapItem } from '@/lib/utils';
import { useValidators } from '@/components/slider/hooks/use-validators';

export const log = (string: string) =>
  DEVELOPMENT_MODE
    ? console.log(chalk.bgGreenBright.black(' GO TO', chalk.underline.bold(`${string}`), 'PAGE '))
    : null;

type UsePaginationReturn = {
  state: {
    TILES: Tile[];
    pages: Pages;
    currentPage: number;
  };
  config: {
    lastPageLength: number;
    getTilesPerPage: () => number;
    getMaxPages: () => number;
  };
  status: {
    isFirstPageVisited: boolean;
    isLastPageVisited: boolean;
    hasPaginated: boolean;
    isMounted: boolean;
  };
  actions: {
    goToNextPage: () => void;
    goToPrevPage: () => void;
    goToFirstPage: () => void;
    goToLastPage: () => void;
  };
};

export const usePagination = (): UsePaginationReturn => {
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
  const isMounted = useSliderStore(state => state.isMounted);

  const { validatePages } = useValidators();

  const getTilesPerPage = () => {
    const windowWidth = typeof window === 'undefined' ? 0 : window.innerWidth;
    if (windowWidth < MEDIA_QUERY.SM) return 2;
    if (windowWidth < MEDIA_QUERY.MD) return 3;
    if (windowWidth < MEDIA_QUERY.LG) return 4;
    if (windowWidth < MEDIA_QUERY.XL) return 5;
    return 6;
  };

  // +2 for the left and right placeholder pages
  const getMaxPages = () => Math.ceil(TILES.length / getTilesPerPage()) + 2;

  const goToFirstPage = () => {
    log('FIRST');
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
      label: 'goToFirstPage()',
      map: initialPages,
      key: maxPages - 2,
    });

    const tilesNeeded = tilesPerPage - lastPage.length;
    if (tilesNeeded) initialPages.set(maxPages - 2, [...lastPage, ...TILES.slice(0, tilesNeeded)]);

    // Right page placeholder
    initialPages.set(maxPages - 1, TILES.slice(tilesNeeded, tilesPerPage + tilesNeeded));

    validatePages({
      label: 'goToFirstPage()',
      pages: initialPages,
      expectedMaxPages: maxPages,
      expectedTilesPerPage: tilesPerPage,
    });

    setAllPages({
      pages: initialPages,
      currentPage: 1,
      maxPages: maxPages,
      tilesPerPage: tilesPerPage,
      lastPageLength: tilesPerPage - tilesNeeded,
      isFirstPageVisited: true,
      isLastPageVisited: false,
      isMounted: true,
    });
  };

  const goToLastPage = () => {
    log('LAST');
    if (!hasPaginated) markAsPaginated();

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

    const tilesNeeded = tilesPerPage - firstPage.length;
    if (tilesNeeded) newPages.set(1, [...TILES.slice(-tilesNeeded), ...firstPage]);

    // Left page placeholder
    const firstItem = TILES.slice(-tilesNeeded)[0];
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

    validatePages({
      label: 'goToLastPage()',
      pages: newPages,
      expectedMaxPages: maxPages,
      expectedTilesPerPage: tilesPerPage,
    });

    setAllPages({
      pages: newPages,
      tilesPerPage: tilesPerPage,
      maxPages: maxPages,
      currentPage: maxPages - 2,
      lastPageLength: tilesPerPage - tilesNeeded,
      isFirstPageVisited: false,
      isLastPageVisited: true,
    });
  };

  const goToPrevPage = () => {
    log('PREV');
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    log('NEXT');
    if (!hasPaginated) markAsPaginated();
    setCurrentPage(currentPage + 1);
  };

  return {
    state: {
      TILES,
      currentPage,
      pages,
    },
    config: {
      lastPageLength,
      getTilesPerPage,
      getMaxPages,
    },
    status: {
      isFirstPageVisited,
      isLastPageVisited,
      hasPaginated,
      isMounted,
    },
    actions: {
      goToFirstPage,
      goToLastPage,
      goToPrevPage,
      goToNextPage,
    },
  };
};
