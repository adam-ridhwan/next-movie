import { useDomContext } from '@/providers/dom-provider';

import { Content, Section, TODO } from '@/lib/types';
import { cn } from '@/lib/utils';
import { usePageUtils } from '@/hooks/use-page-utils';
import { usePagination } from '@/hooks/use-pagination';
import { BonusTrailerThumbnail } from '@/components/slider/tiles/thumbnails/bonus-trailer-thumbnail';
import { CastThumbnail } from '@/components/slider/tiles/thumbnails/cast-thumbnail';
import { MovieTvThumbnail } from '@/components/slider/tiles/thumbnails/movie-tv-thumbnail';

import '../slider.css';

import { useAnimation } from '@/hooks/use-animation';

type TileItemProps = {
  tile: Content;
  i: number;
};

const TileItem = ({ tile, i }: TileItemProps) => {
  const { state: {  section } } = usePagination(); // prettier-ignore
  const { state: { isMounted } } = usePageUtils(); // prettier-ignore
  const { state: { hasPaginated }, actions: { getTileCountPerPage } } = usePageUtils(); // prettier-ignore
  const { isAnimating } = useAnimation();
  const { tileItemRef } = useDomContext();

  if (!tile) return null;

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
      ref={tileItemRef}
      className={cn('slider-tile', `tile-${label}`, {
        'slider-tile--movie': section === 'movie',
        'slider-tile--tv': section === 'tv',
        'slider-tile--trailer': section === 'trailer',
        'slider-tile--bonus': section === 'bonus',
        'slider-tile--cast': section === 'cast',
        'pointer-events-none': isAnimating,
      })}
    >
      <ThumbnailSelector section={section} tile={tile} isVisible={isVisible} />
    </div>
  );
};

export default TileItem;

type ThumbnailSelectorProps = {
  section: Section;
  tile: TODO;
  isVisible: boolean;
};

const ThumbnailSelector = ({ section, tile, isVisible }: ThumbnailSelectorProps) => {
  switch (section) {
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
