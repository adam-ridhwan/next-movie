import { fetchTMDB } from '@/actions/fetch-tmdb';
import { SliderProvider } from '@/providers/slider/slider-provider';

import { FetchTMDBParams, MOVIE_GENRES } from '@/types/global-types';
import { MovieResponse } from '@/types/tmdb-types';
import Slider from '@/components/slider/slider';

const MoviesPage = async () => {
  const fetchTMDBParams: Array<FetchTMDBParams & { label: string }> = [
    {
      label: 'Action Movies',
      category: 'discover',
      mediaType: 'movie',
      genreId: 28,
      page: 2,
    },
    {
      label: 'Sci-Fi Movies',
      category: 'discover',
      mediaType: 'movie',
      genreId: 878,
      page: 3,
    },
    {
      label: 'Trending: Movies',
      category: 'trending',
      mediaType: 'movie',
    },
    {
      label: 'Popular: Movies',
      category: 'popular',
      mediaType: 'movie',
    },
  ];

  const content = await Promise.all(
    fetchTMDBParams.map(async params => {
      const media = await fetchTMDB({ ...params });
      const { success, data, error } = MovieResponse.safeParse(media);
      if (!success)
        throw new Error(
          `MoviesPage() Invalid Movies schema : ${error.message}`
        );

      return {
        ...params,
        results: data.results,
      };
    })
  );

  const genresArray = Object.entries(MOVIE_GENRES).map(([key, value]) => {
    return { id: key, slug: value, mediaType: 'movies' };
  });

  return (
    <div className='pt-24'>
      <SliderProvider
        key='Genres'
        content={genresArray}
        mediaType='movie'
        section='genre'
      >
        <Slider headerTitle='Genres' />
      </SliderProvider>

      {content.map(content => (
        <SliderProvider
          key={content.label}
          content={content.results}
          mediaType='movie'
          section='movie'
        >
          <Slider headerTitle={content.label} />
        </SliderProvider>
      ))}
    </div>
  );
};

export default MoviesPage;
