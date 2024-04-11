import { getMapItem } from '@/lib/utils';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { usePagination } from '@/components/slider/hooks/use-pagination/use-pagination';
import TileItem from '@/components/slider/tiles/tile-item';

const PrevPage = () => {
  const {
    state: { currentPage, pages },
  } = usePagination();
  const { hasPaginated } = usePageUtils();
  const { getTilesPerPage } = usePageUtils();

  if (!hasPaginated) return null;

  const prevPageTiles = getMapItem({
    label: 'PrevPage: prevPageTiles',
    map: pages,
    key: currentPage - 1,
  });

  return prevPageTiles.map((tile, i) => (
    <TileItem
      key={`PrevPage-${tile.id}`}
      tile={tile}
      displayNumber={i === getTilesPerPage() - 1 ? 0 : ''}
      isVisibleOnScreen={true}
    />
  ));
};

export default PrevPage;
