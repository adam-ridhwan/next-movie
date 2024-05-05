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
      page: 2,
      genreId,
    };
  }

  if (mediaType === 'tv' && isTvGenreId(genreId)) {
    return {
      category: 'discover',
      first_air_date_gte: '2024-01-01',
      first_air_date_lte: currentDate,
      mediaType: 'tv',
      page: 2,
      genreId,
    };
  }

  throw new Error('getFetchTMDBParamsNew(): Invalid genreId');
};

const NewMovieTv = async ({ slug, mediaType, genreId }: SpotlightProps) => {
  const newMovies: TODO = await fetchTMDB(getParams(mediaType, genreId));

  if (!newMovies.results.length) return null;

  return (
    <SliderProvider
      content={newMovies.results}
      mediaType={mediaType}
      section={mediaType}
    >
      <Slider
        headerTitle={`New ${deslugify(slug)} ${capitalizeMedia(mediaType)}`}
      />
    </SliderProvider>
  );
};

export default NewMovieTv;
