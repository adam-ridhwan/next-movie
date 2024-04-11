import { getMapItem } from '@/lib/utils';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { usePagination } from '@/components/slider/hooks/use-pagination/use-pagination';
import TileItem from '@/components/slider/tiles/tile-item';

const NextPage = () => {
  const {
    state: { currentPage, pages },
  } = usePagination();
  const { getTilesPerPage, isMounted } = usePageUtils();

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
