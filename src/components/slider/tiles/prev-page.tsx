import { getMapItem } from '@/lib/utils';
import { usePages } from '@/components/slider/hooks/use-pages';
import { usePagination } from '@/components/slider/hooks/use-pagination/use-pagination';
import TileItem from '@/components/slider/tiles/tile-item';

const PrevPage = () => {
  const {
    state: { currentPage, pages },
    status: { hasPaginated },
  } = usePagination();
  const { getTilesPerPage } = usePages();

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
