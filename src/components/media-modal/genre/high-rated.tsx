import { fetchTMDB } from '@/actions/fetch-tmdb';
import { SliderProvider } from '@/providers/slider/slider-provider';

import { GenreId, MediaType } from '@/types/global-types';
import { Movie, MovieResponse, Tv, TvResponse } from '@/types/tmdb-types';
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

const fetchMedia = async (
  mediaType: MediaType,
  genreId: GenreId
): Promise<Movie[] | Tv[] | null> => {
  if (mediaType === 'movie' && isMovieGenreId(genreId)) {
    const { results } = await fetchTMDB(MovieResponse, {
      category: 'discover',
      mediaType: 'movie',
      vote_average_gte: 8,
      page: 1,
      genreId,
    });
    return results;
  }

  if (mediaType === 'tv' && isTvGenreId(genreId)) {
    const { results } = await fetchTMDB(TvResponse, {
      category: 'discover',
      mediaType: 'tv',
      vote_average_gte: 8,
      page: 1,
      genreId,
    });
    return results;
  }

  return null;
};

const NewMovieTv = async ({ slug, mediaType, genreId }: SpotlightProps) => {
  const results = await fetchMedia(mediaType, genreId);
  if (!results || !results.length) return null;

  return (
    <SliderProvider content={results} mediaType={mediaType} section={mediaType}>
      <Slider
        headerTitle={`High Rated ${deslugify(slug)} ${capitalizeMedia(mediaType)}`}
      />
    </SliderProvider>
  );
};

export default NewMovieTv;
