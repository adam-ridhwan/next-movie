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
  if (mediaType === 'movie' && isMovieGenreId(genreId)) {
    return {
      category: 'discover',
      mediaType: 'movie',
      vote_average_gte: 8,
      page: 1,
      genreId,
    };
  }

  if (mediaType === 'tv' && isTvGenreId(genreId)) {
    return {
      category: 'discover',
      mediaType: 'tv',
      vote_average_gte: 8,
      page: 1,
      genreId,
    };
  }

  throw new Error('NewMovieTv(): Invalid params');
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
        headerTitle={`High Rated ${deslugify(slug)} ${capitalizeMedia(mediaType)}`}
      />
    </SliderProvider>
  );
};

export default NewMovieTv;
