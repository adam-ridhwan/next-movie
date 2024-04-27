import { useDomContext } from '@/providers/dom-provider';

import { usePageUtils } from '@/lib/hooks/use-page-utils';
import { usePagination } from '@/lib/hooks/use-pagination';
import { MediaType, Movie } from '@/lib/types';
import { cn } from '@/lib/utils';
import { BonusTrailerThumbnail } from '@/components/slider/tiles/bonus-trailer-thumbnail';
import { CastThumbnail } from '@/components/slider/tiles/cast-thumbnail';
import { MovieTvThumbnail } from '@/components/slider/tiles/movie-tv-thumbnail';

import '../slider.css';

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

  if (!tile) return null;

  const firstTileCurrentPage = pages.get(currentPage)?.[0];
  const ref = tile.uuid === firstTileCurrentPage?.uuid ? tileItemRef : undefined;

  const tilesPerPage = getTileCountPerPage();

  const isTileVisible = (i: number) => {
    const lowerBound = tilesPerPage - 1;
    const upperBound = tilesPerPage * 2;
    return lowerBound < i && i < upperBound;
  };

  // FIXME: This is not showing the first few tiles on the first render
  const displayNumber = hasPaginated ? i - tilesPerPage : i;
  const isVisible = isTileVisible(i) && isMounted;
  const label = isVisible ? displayNumber : '';

  return (
    <div
      ref={ref}
      className={cn('slider-tile', `tile-${label}`, {
        'slider-tile--movie': mediaType === 'movie',
        'slider-tile--tv': mediaType === 'tv',
        'slider-tile--trailer': mediaType === 'trailer',
        'slider-tile--bonus': mediaType === 'bonus',
        'slider-tile--cast': mediaType === 'cast',
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
