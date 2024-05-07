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
  const currentDate = new Date().toLocaleDateString('en-CA');

  if (mediaType === 'movie' && isMovieGenreId(genreId)) {
    const { results } = await fetchTMDB(MovieResponse, {
      category: 'discover',
      primary_release_date_gte: '2024-01-01',
      primary_release_date_lte: currentDate,
      mediaType: 'movie',
      genreId,
    });
    return results;
  }

  if (mediaType === 'tv' && isTvGenreId(genreId)) {
    const { results } = await fetchTMDB(TvResponse, {
      category: 'discover',
      first_air_date_gte: '2024-01-01',
      first_air_date_lte: currentDate,
      mediaType: 'tv',
      genreId,
    });
    return results;
  }

  return null;
};

const Spotlight = async ({ slug, mediaType, genreId }: SpotlightProps) => {
  const results = await fetchMedia(mediaType, genreId);
  if (!results || !results.length) return null;

  console.log('spotlight', results);

  return (
    <SliderProvider content={results} mediaType={mediaType} section='spotlight'>
      <Slider
        headerTitle={`${deslugify(slug)} ${capitalizeMedia(mediaType)} released this year`}
      />
    </SliderProvider>
  );
};

export default Spotlight;
