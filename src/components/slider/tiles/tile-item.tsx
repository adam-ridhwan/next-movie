import { useDomContext } from '@/providers/dom-provider';
import { Media } from '@/routes';

import { usePageUtils } from '@/lib/hooks/use-page-utils';
import { usePagination } from '@/lib/hooks/use-pagination';
import { MediaType, Movie } from '@/lib/types';
import { cn } from '@/lib/utils';
import { BonusTrailerThumbnail } from '@/components/slider/tiles/bonus-trailer-thumbnail';
import { CastThumbnail } from '@/components/slider/tiles/cast-thumbnail';
import { MovieTvThumbnail } from '@/components/slider/tiles/movie-tv-thumbnail';

type TileItemProps = {
  tile: Movie | void;
  i: number;
};

const TileItem = ({ tile, i }: TileItemProps) => {
  const { state: { mediaType } } = usePagination(); // prettier-ignore
  const { state: { isMounted } } = usePageUtils(); // prettier-ignore
  const { state: { hasPaginated }, actions: { getTileCountPerPage } } = usePageUtils(); // prettier-ignore
  const { state: { pages, currentPage } } = usePagination(); // prettier-ignore
  const { tileItemRef } = useDomContext();

  const tilesPerPage = getTileCountPerPage();

  const isTileVisible = (i: number) => {
    const lowerBound = tilesPerPage - 1;
    const upperBound = tilesPerPage * 2;
    return lowerBound < i && i < upperBound;
  };

  if (!tile) return null;

  // FIXME: This is not showing the first few tiles on the first render
  const displayNumber = hasPaginated ? i - tilesPerPage : i;
  const isVisible = isTileVisible(i) && isMounted;
  const firstTileCurrentPage = pages.get(currentPage)?.[0];

  return (
    <div
      ref={tile.uuid === firstTileCurrentPage?.uuid ? tileItemRef : undefined}
      className={cn(`tile-${isVisible ? displayNumber : ''}`, {
        'slider-tile': mediaType !== 'cast' && mediaType !== 'trailer' && mediaType !== 'bonus',
        'slider-tile-cast': mediaType === 'cast',
        'slider-tile-trailer': mediaType === 'trailer' || mediaType === 'bonus',
      })}
    >
      <ThumbnailSelector mediaType={mediaType} tile={tile} isVisible={isVisible} />
    </div>
  );
};

export default TileItem;

type ThumbnailSelectorProps = {
  mediaType: MediaType;
  tile: Movie;
  isVisible: boolean;
};

const ThumbnailSelector = ({ mediaType, tile, isVisible }: ThumbnailSelectorProps) => {
  switch (mediaType) {
    case 'movie':
    case 'tv':
      return <MovieTvThumbnail tile={tile} isVisible={isVisible} />;

    case 'trailer':
    case 'bonus':
      return <BonusTrailerThumbnail tile={tile} isVisible={isVisible} />;

    case 'cast':
      return <CastThumbnail tile={tile} isVisible={isVisible} />;

    default:
      return <></>;
  }
};
