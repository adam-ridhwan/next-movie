/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider/slider-provider';
import { v4 as uuid } from 'uuid';

import { Pages, TODO } from '@/types/global-types';
import { getMapValue } from '@/lib/utils';
import { usePageUtils } from '@/hooks/use-page-utils';
import { useValidators } from '@/hooks/use-validators';

type SetMapTilesParams = {
  firstTileCurrentPageIndex: number;
  isFirstPage?: boolean;
  isLastPage?: boolean;
};

export const useMapPages = () => {
  const CONTENT = useSliderStore(state => state.CONTENT);
  const pages = useSliderStore(state => state.pages);
  const setPages = useSliderStore(state => state.setPages);
  const currentPage = useSliderStore(state => state.currentPage);

  const { validatePages } = useValidators();
  const {
    actions: {
      getTileCountPerPage,
      getTileCountBidirectional,
      getStartIndex,
      updateUuids,
    },
  } = usePageUtils();

  const setMapPages = ({
    firstTileCurrentPageIndex,
    isFirstPage,
    isLastPage,
  }: SetMapTilesParams) => {
    const newPages: Pages = new Map<number, TODO[]>();
    const newTileCountPerPage = getTileCountPerPage();
    let newFirstPageLength = newTileCountPerPage;
    let newLastPageLength = newTileCountPerPage;

    const [firstTileCurrentPage] = getMapValue({
      label: 'setMapPages(): firstTileCurrentPage',
      map: pages,
      key: currentPage,
    });

    const leftTileCount = getTileCountBidirectional(
      firstTileCurrentPageIndex / newTileCountPerPage
    );
    const rightTileCount = getTileCountBidirectional(
      (CONTENT.length - firstTileCurrentPageIndex) / newTileCountPerPage
    );

    const newTileCount = leftTileCount + rightTileCount;
    const newMaxPages = newTileCount / newTileCountPerPage;
    let newCurrentPage = -1;

    let startIndex = getStartIndex(firstTileCurrentPageIndex, leftTileCount);
    let newContentList: TODO[] = [];

    for (let i = 0; i < newTileCount; i++) {
      if (startIndex >= CONTENT.length) startIndex = 0;

      const pageNumber = Math.floor(i / newTileCountPerPage);
      const isNewFirstPage = pageNumber === 1;
      const isNewLastPage = pageNumber === newMaxPages - 2;
      const isLeftPlaceholder = pageNumber === 0;
      const isRightPlaceholder = pageNumber === newMaxPages - 1;

      const idMatches = newContentList.some(
        tile => tile.id === firstTileCurrentPage.id
      );
      if (idMatches && pageNumber > 1 && newCurrentPage === -1) {
        newCurrentPage = pageNumber;
      }

      const newContentItem = CONTENT[startIndex++];

      newContentList.push(
        isLeftPlaceholder || isRightPlaceholder
          ? { ...newContentItem, uuid: uuid() }
          : newContentItem
      );

      if (newContentList.length !== newTileCountPerPage) continue;

      const firstTileIndex = newContentList.findIndex(
        tile => tile.id === CONTENT[0].id
      );

      if (isNewFirstPage && firstTileIndex > 0) {
        newFirstPageLength = newTileCountPerPage - firstTileIndex;
        newContentList = updateUuids({
          newContentList,
          firstTileIndex,
          isFirstPage: true,
        });
      }

      if (isNewLastPage && firstTileIndex > 0) {
        newLastPageLength = firstTileIndex;
        newContentList = updateUuids({
          newContentList,
          firstTileIndex,
          isLastPage: true,
        });
      }

      newPages.set(pageNumber, newContentList);
      newContentList = [];
    }

    // [...newPages.entries()]
    //   // .sort((a, b) => a[0] - b[0])
    //   .forEach(([pageIndex, tiles]) => {
    //     console.log(
    //       `Page ${pageIndex}:`,
    //       tiles.map(card => (card ? card.id : undefined))
    //     );
    //   });

    // validatePages({
    //   label: 'useMapPages()',
    //   pages: newPages,
    //   expectedMaxPages: newMaxPages,
    //   expectedTilesPerPage: newTileCountPerPage,
    // });

    const getNewCurrentPage = () => {
      if (isFirstPage) return 1;
      if (isLastPage) return newMaxPages - 2;
      return newCurrentPage;
    };

    // console.table({
    //   startIndex: startIndex,
    //   newCurrentPage: getNewCurrentPage(),
    //   tilesPerPage: newTileCountPerPage,
    //   leftTileCount: leftTileCount,
    //   rightTileCount: rightTileCount,
    //   totalTiles: leftTileCount + rightTileCount,
    //   newMaxPages: newMaxPages,
    //   newFirstPageLength: newFirstPageLength,
    //   newLastPageLength: newLastPageLength,
    // });

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
