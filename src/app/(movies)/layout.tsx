import { ReactNode } from 'react';
import { fetchTMDB } from '@/actions/fetch-tmdb';
import { SliderProvider } from '@/providers/slider/slider-provider';

import { FetchTMDBParams } from '@/types/global';
import { MovieListSchema } from '@/types/tmdb';
import Slider from '@/components/slider/slider';

const MoviesLayout = async ({ children }: { children: ReactNode }) => {
  const fetchTMDBParams: Array<FetchTMDBParams & { label: string }> = [
    { label: 'Action Movies', category: 'discover', mediaType: 'movie', genreId: 28, page: 2 },
    { label: 'Sci-Fi Movies', category: 'discover', mediaType: 'movie', genreId: 878, page: 3 },
    { label: 'Trending: Movies', category: 'trending', mediaType: 'movie' },
    { label: 'Popular: Movies', category: 'popular', mediaType: 'movie' },
  ];

  const content = await Promise.all(
    fetchTMDBParams.map(async params => {
      const media = await fetchTMDB({ ...params });
      const { success, data, error } = MovieListSchema.safeParse(media);
      if (!success) throw new Error(`BrowseLayout() Invalid Movies schema : ${error.message}`);

      return {
        ...params,
        results: data.results,
      };
    })
  );

  return (
    <>
      {content.map(content =>
        // prettier-ignore
        <SliderProvider
          key={content.label}
          content={content.results}
          mediaType='movie'
          section='movie'
        >
          <Slider headerTitle={content.label} />
        </SliderProvider>
      )}

      {children}
    </>
  );
};

export default MoviesLayout;
