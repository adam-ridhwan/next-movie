import { fetchTMDB } from '@/actions/fetch-tmdb';
import { SliderProvider } from '@/providers/slider/slider-provider';

import {
  FetchTMDBParams,
  GenreId,
  MediaType,
  TODO,
} from '@/types/global-types';
import {
  capitalizeMedia,
  deslugify,
  isMovieGenreId,
  isTvGenreId,
} from '@/lib/utils';
import Slider from '@/components/slider/slider';

type SpotlightProps = {
  slug: string;
  mediaType: MediaType;
  genreId: GenreId;
};

const getParams = (mediaType: MediaType, genreId: GenreId): FetchTMDBParams => {
  const currentDate = new Date().toLocaleDateString('en-CA');

  if (mediaType === 'movie' && isMovieGenreId(genreId)) {
    return {
      category: 'discover',
      primary_release_date_gte: '2024-01-01',
      primary_release_date_lte: currentDate,
      mediaType: 'movie',
      genreId,
    };
  }

  if (mediaType === 'tv' && isTvGenreId(genreId)) {
    return {
      category: 'discover',
      first_air_date_gte: '2024-01-01',
      first_air_date_lte: currentDate,
      mediaType: 'tv',
      genreId,
    };
  }

  throw new Error('getFetchTMDBParamsNew(): Invalid genreId');
};

const Spotlight = async ({ slug, mediaType, genreId }: SpotlightProps) => {
  const releasedThisYear: TODO = await fetchTMDB(getParams(mediaType, genreId));

  if (!releasedThisYear.results.length) return null;
  console.log('releasedThisYear', releasedThisYear.results);

  return (
    <SliderProvider
      content={releasedThisYear.results}
      mediaType={mediaType}
      section='spotlight'
    >
      <Slider
        headerTitle={`${deslugify(slug)} ${capitalizeMedia(mediaType)} released this year`}
      />
    </SliderProvider>
  );
};

export default Spotlight;
