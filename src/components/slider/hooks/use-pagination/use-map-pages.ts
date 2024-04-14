/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';
import { v4 as uuid } from 'uuid';

import { Pages } from '@/lib/types';
import { getMapItem } from '@/lib/utils';
import { Movie } from '@/lib/zod-types.ts/modelSchema/MovieSchema';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { useValidators } from '@/components/slider/hooks/use-validators';

type SetMapTilesParams = {
  firstTileCurrentPageIndex: number;
  isFirstPage?: boolean;
  isLastPage?: boolean;
};

export const useMapPages = () => {
  const TILES = useSliderStore(state => state.TILES);
  const pages = useSliderStore(state => state.pages);
  const setPages = useSliderStore(state => state.setPages);
  const currentPage = useSliderStore(state => state.currentPage);

  const { validatePages } = useValidators();
  const { getTileCountPerPage, getTileCount, getStartIndex, updateUuids } = usePageUtils();

  const setMapPages = ({ firstTileCurrentPageIndex, isFirstPage, isLastPage }: SetMapTilesParams) => {
    const newPages: Pages = new Map<number, Movie[]>();
    const newTileCountPerPage = getTileCountPerPage();
    let newFirstPageLength = newTileCountPerPage;
    let newLastPageLength = newTileCountPerPage;

    const [firstTileCurrentPage] = getMapItem({
      label: 'setMapPages(): firstTileCurrentPage',
      map: pages,
      key: currentPage,
    });

    const leftTileCount = getTileCount(firstTileCurrentPageIndex / newTileCountPerPage);
    const rightTileCount = getTileCount((TILES.length - firstTileCurrentPageIndex) / newTileCountPerPage);

    const newTileCount = leftTileCount + rightTileCount;
    const newMaxPages = newTileCount / newTileCountPerPage;
    let newCurrentPage = -1;

    let startIndex = getStartIndex(firstTileCurrentPageIndex, leftTileCount);
    let newTileList: Movie[] = [];

    for (let i = 0; i < newTileCount; i++) {
      if (startIndex >= TILES.length) startIndex = 0;

      const pageNumber = Math.floor(i / newTileCountPerPage);
      const isNewFirstPage = pageNumber === 1;
      const isNewLastPage = pageNumber === newMaxPages - 2;
      const isLeftPlaceholder = pageNumber === 0;
      const isRightPlaceholder = pageNumber === newMaxPages - 1;

      const idMatches = newTileList.some(tile => tile.id === firstTileCurrentPage.id);
      if (idMatches && pageNumber > 1 && newCurrentPage === -1) newCurrentPage = pageNumber;

      const newTileItem = TILES[startIndex++];
      const newTileListToPush =
        isLeftPlaceholder || isRightPlaceholder
          ? { ...newTileItem, uuid: uuid() }
          : newTileItem; // prettier-ignore
      newTileList.push(newTileListToPush);

      if (newTileList.length !== newTileCountPerPage) continue;

      const firstTileIndex = newTileList.findIndex(tile => tile.id === TILES[0].id);

      if (isNewFirstPage && firstTileIndex > 0) {
        newFirstPageLength = newTileCountPerPage - firstTileIndex;
        newTileList = updateUuids({ newTileList, firstTileIndex, isFirstPage: true });
      }

      if (isNewLastPage && firstTileIndex > 0) {
        newLastPageLength = firstTileIndex;
        newTileList = updateUuids({ newTileList, firstTileIndex, isLastPage: true });
      }

      newPages.set(pageNumber, newTileList);
      newTileList = [];
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
