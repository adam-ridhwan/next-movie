import { getMapItem } from '@/lib/utils';
import { usePagination } from '@/components/slider/hooks/use-pagination';
import TileItem from '@/components/slider/tiles/tile-item';

const NextPage = () => {
  const {
    state: { currentPage, pages },
    status: { isMounted },
    config: { getTilesPerPage },
  } = usePagination();

  if (!isMounted) return null;

  const nextPageTiles = getMapItem({
    label: 'NextPage: nextPageTiles',
    map: pages,
    key: currentPage + 1,
  });

  return nextPageTiles.map((tile, i) => (
    <TileItem
      key={`NextPage-${tile.id}`}
      tile={tile}
      displayNumber={i === 0 ? getTilesPerPage() + 1 : ''}
      isVisibleOnScreen={true}
    />
  ));
};

export default NextPage;
