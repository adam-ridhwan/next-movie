import { Fragment } from 'react';
import { useDomContext } from '@/providers/dom-provider';

import { DEVELOPMENT_MODE } from '@/lib/constants';
import { Tile } from '@/lib/types';
import { cn, findIndexFromKey, getMapItem } from '@/lib/utils';
import { useAnimation } from '@/components/slider/hooks/use-animation';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { usePagination } from '@/components/slider/hooks/use-pagination/use-pagination';
import { useSlide } from '@/components/slider/hooks/use-slide';
import TileItem from '@/components/slider/tiles/tile-item';

const TileList = () => {
  const {
    state: { TILES, pages, currentPage },
  } = usePagination();
  const { hasPaginated, getTilesPerPage } = usePageUtils();
  const { slideAmount } = useSlide();
  const { isAnimating } = useAnimation();
  const { isMounted } = usePageUtils();
  const { tileRef } = useDomContext();

  // TODO: Get the left and right placeholder tiles
  //  [x] LeftPlaceholder
  //  [x] RightPlaceholder
  //  [ ] Refactor the code and possibly extract the logic to a separate hook
  //  [ ] Delete old code

  const getPrevTile = () => {
    if (!isMounted || !hasPaginated) return;

    const prevPage = getMapItem({
      label: 'LeftPlaceholder: prevPage',
      map: pages,
      key: currentPage - 1,
    });

    const indexOfFirstItem = findIndexFromKey({
      label: 'LeftPlaceholder: indexOfFirstItem',
      array: TILES,
      key: 'id',
      value: prevPage[0].id,
    });

    const indexOfPreviousItem = indexOfFirstItem ? indexOfFirstItem - 1 : TILES.length - 1;
    return TILES[indexOfPreviousItem];
  };

  const getNextTile = (): Tile | void => {
    if (!isMounted) return;

    const lastIndex = getTilesPerPage() - 1;

    const nextPage = getMapItem({
      label: 'RightPlaceholder: nextPage',
      map: pages,
      key: currentPage + 1,
    });

    if (nextPage.length !== getTilesPerPage()) return;

    const indexOfLastItem = findIndexFromKey({
      label: 'RightPlaceholder: indexOfLastItem',
      array: TILES,
      key: 'id',
      value: nextPage[lastIndex]?.id,
    });

    const indexOfNextItem = indexOfLastItem === TILES.length - 1 ? 0 : indexOfLastItem + 1;
    return TILES[indexOfNextItem];
  };

  const prevPageTiles =
    !isMounted || !hasPaginated
      ? []
      : getMapItem({
          label: 'LeftPlaceholder: prevPage',
          map: pages,
          key: currentPage - 1,
        });

  const currentPageTiles = getMapItem({
    label: 'CurrentPage: currentPageTiles',
    map: pages,
    key: currentPage,
  });

  const nextPageTiles = !isMounted
    ? []
    : getMapItem({
        label: 'NextPage: nextPageTiles',
        map: pages,
        key: currentPage + 1,
      });

  const prevTile = getPrevTile();
  const nextTile = getNextTile();

  const tilesToRender: Tile[] = [
    ...(prevTile ? [prevTile] : []),
    ...prevPageTiles,
    ...currentPageTiles,
    ...nextPageTiles,
    ...(nextTile ? [nextTile] : []),
  ];

  return (
    <>
      <div
        className={cn(
          'slider relative flex w-full flex-row px-12',
          { 'justify-center': hasPaginated },
          { 'transition-transform duration-700': isAnimating },
          { 'bg-green-600': DEVELOPMENT_MODE }
        )}
        style={{
          transform: slideAmount ? `translate3d(${slideAmount}%, 0, 0)` : undefined,
        }}
      >
        {tilesToRender.map((tile, i) => (
          <Fragment key={i}>
            <TileItem
              ref={i === 0 ? tileRef : undefined}
              tile={tile}
              displayNumber={i + 1}
              isVisibleOnScreen={true}
            />
          </Fragment>
        ))}
        {/*{pagesArray.map((page, i) => (*/}
        {/*  <TileItem key={`TileItem-${i}`} tile={page} />*/}
        {/*))}*/}
        {/*<LeftPlaceholder />*/}
        {/*<PrevPage />*/}
        {/*<CurrentPage />*/}
        {/*<NextPage />*/}
        {/*<RightPlaceholder />*/}
      </div>
    </>
  );
};

export default TileList;
