/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';
import { v4 as uuid } from 'uuid';

import { Pages } from '@/lib/types';
import { Movie } from '@/lib/zod-types.ts/modelSchema/MovieSchema';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { useValidators } from '@/components/slider/hooks/use-validators';

type SetMapTilesParams = {
  firstTileCurrentPage: Movie;
  firstTileCurrentPageIndex: number;
  isFirstPage?: boolean;
  isLastPage?: boolean;
};

export const useMapPages = () => {
  const TILES = useSliderStore(state => state.TILES);
  const setPages = useSliderStore(state => state.setPages);
  const { validatePages } = useValidators();
  const { getTileCountPerPage, getTileCount, getStartIndex, updateUuids } = usePageUtils();

  const setMapPages = ({
    firstTileCurrentPage,
    firstTileCurrentPageIndex,
    isFirstPage,
    isLastPage,
  }: SetMapTilesParams) => {
    const newPages: Pages = new Map<number, Movie[]>();
    const newTileCountPerPage = getTileCountPerPage();
    let newFirstPageLength = newTileCountPerPage;
    let newLastPageLength = newTileCountPerPage;

    const leftTileCount = getTileCount(firstTileCurrentPageIndex / newTileCountPerPage);
    const rightTileCount = getTileCount((TILES.length - firstTileCurrentPageIndex) / newTileCountPerPage);

    const newTileCount = leftTileCount + rightTileCount;
    const newMaxPages = newTileCount / newTileCountPerPage;
    let newCurrentPage = -1;

    let startIndex = getStartIndex(firstTileCurrentPageIndex, leftTileCount);
    let currentPageTiles: Movie[] = [];

    for (let i = 0; i < newTileCount; i++) {
      if (startIndex >= TILES.length) startIndex = 0;

      const pageNumber = Math.floor(i / newTileCountPerPage);
      const isFirstPage = pageNumber === 0;
      const isLastPage = pageNumber === newMaxPages - 1;
      const isLeftPlaceholder = pageNumber === 1;
      const isRightPlaceholder = pageNumber === newMaxPages - 2;

      const idMatches = currentPageTiles.some(tile => tile.id === firstTileCurrentPage.id);
      if (idMatches && pageNumber > 1 && newCurrentPage === -1) newCurrentPage = pageNumber;

      const tile = TILES[startIndex++];
      const tileToPush = isFirstPage || isLastPage ? { ...tile, uuid: uuid() } : tile;
      currentPageTiles.push(tileToPush);

      if (currentPageTiles.length !== newTileCountPerPage) continue;

      const firstTileIndex = currentPageTiles.findIndex(tile => tile.id === TILES.at(0)?.id);
      if (firstTileIndex > 0) {
        const tileLengthUpToFirstIndex = currentPageTiles.slice(0, firstTileIndex).length;

        if (isLeftPlaceholder) {
          newFirstPageLength = newTileCountPerPage - tileLengthUpToFirstIndex;
          currentPageTiles = updateUuids({ currentPageTiles, firstTileIndex, isFirstPage: true });
        }
        if (isRightPlaceholder) {
          newLastPageLength = tileLengthUpToFirstIndex;
          currentPageTiles = updateUuids({ currentPageTiles, firstTileIndex, isLastPage: true });
        }
      }

      newPages.set(pageNumber, currentPageTiles);
      currentPageTiles = [];
    }

    // console.table({
    //   startIndex: startIndex,
    //   newCurrentPage: newCurrentPage,
    //   leftTileCount: leftTileCount,
    //   rightTileCount: rightTileCount,
    //   totalTiles: leftTileCount + rightTileCount,
    //   newMaxPages: newMaxPages,
    //   newFirstPageLength: newFirstPageLength,
    //   newLastPageLength: newLastPageLength,
    // });
    //
    // [...newPages.entries()]
    //   .sort((a, b) => a[0] - b[0])
    //   .forEach(([pageIndex, tiles]) => {
    //     console.log(
    //       `Page ${pageIndex}:`,
    //       tiles.map(card => (card ? card.id : undefined))
    //     );
    //   });

    validatePages({
      label: 'useMapPages()',
      pages: newPages,
      expectedMaxPages: newMaxPages,
      expectedTilesPerPage: newTileCountPerPage,
    });

    const getNewCurrentPage = () => {
      if (isFirstPage) return 1;
      if (isLastPage) return newMaxPages - 2;
      return newCurrentPage;
    };

    setPages({
      pages: newPages,
      currentPage: getNewCurrentPage(),
      maxPages: newMaxPages,
      tileCountPerPage: newTileCountPerPage,
      firstPageLength: newFirstPageLength,
      lastPageLength: newLastPageLength,
      isMounted: true,
    });
  };

  return { setMapPages };
};
