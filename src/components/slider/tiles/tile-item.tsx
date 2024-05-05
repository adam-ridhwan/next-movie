import { forwardRef } from 'react';

import { Section, TODO } from '@/types/global-types';
import { cn } from '@/lib/utils';
import { useAnimation } from '@/hooks/use-animation';
import { usePageUtils } from '@/hooks/use-page-utils';
import { usePagination } from '@/hooks/use-pagination';
import { BonusTrailerThumbnail } from '@/components/slider/tiles/thumbnails/bonus-trailer-thumbnail';
import { CastThumbnail } from '@/components/slider/tiles/thumbnails/cast-thumbnail';
import GenresThumbnail from '@/components/slider/tiles/thumbnails/genres';
import { MovieThumbnail } from '@/components/slider/tiles/thumbnails/movie-thumbnail';
import { TvThumbnail } from '@/components/slider/tiles/thumbnails/tv-thumbnail';

import '../slider.css';

type TileItemProps = {
  tile: TODO;
  i: number;
};

// eslint-disable-next-line react/display-name
const TileItem = forwardRef<HTMLDivElement, TileItemProps>(
  ({ tile, i }, ref) => {
    const { state: {  section } } = usePagination(); // prettier-ignore
    const { state: { isMounted } } = usePageUtils(); // prettier-ignore
    const {
      state: { hasPaginated },
      actions: { getTileCountPerPage },
    } = usePageUtils();
    const { isAnimating } = useAnimation();

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

    const thumbnailStyles = {
      'slider-tile--movie': section === 'movie',
      'slider-tile--genre': section === 'genre',
      'slider-tile--tv': section === 'tv',
      'slider-tile--trailer': section === 'trailer',
      'slider-tile--bonus': section === 'bonus',
      'slider-tile--cast': section === 'cast',
      'pointer-events-none': isAnimating,
    };

    return (
      <div
        ref={ref}
        className={cn(`slider-tile tile-${label}`, thumbnailStyles)}
      >
        <ThumbnailSelector
          section={section}
          tile={tile}
          isVisible={isVisible}
        />
      </div>
    );
  }
);

export default TileItem;

type ThumbnailSelectorProps = {
  section: Section;
  tile: TODO;
  isVisible: boolean;
};

const ThumbnailSelector = ({
  section,
  tile,
  isVisible,
}: ThumbnailSelectorProps) => {
  switch (section) {
    case 'movie':
      return <MovieThumbnail tile={tile} isVisible={isVisible} />;

    case 'tv':
      return <TvThumbnail tile={tile} isVisible={isVisible} />;

    case 'trailer':
    case 'bonus':
      return <BonusTrailerThumbnail tile={tile} isVisible={isVisible} />;

    case 'cast':
      return <CastThumbnail tile={tile} isVisible={isVisible} />;

    case 'genre':
      return <GenresThumbnail tile={tile} isVisible={isVisible} />;

    default:
      return null;
  }
};
