import { ReactNode } from 'react';
import { fetchTMDB } from '@/actions/fetch-tmdb';
import { DomContextProvider } from '@/providers/dom-provider';
import { SliderProvider } from '@/providers/slider-provider';

import EpicStage from '@/components/epic-stage';
import Slider from '@/components/slider/slider';

export default async function BrowseLayout({ children }: { children: ReactNode }) {
  const [
    popularMovies,
    trendingMovies,
    trendingTvShows,
    actionMovies,
    dramaMovies,
  ] = await Promise.all([
    fetchTMDB({ category: 'popular', mediaType: 'movie' }),
    fetchTMDB({ category: 'trending', mediaType: 'movie' }),
    fetchTMDB({ category: 'trending', mediaType: 'tv' }),
    fetchTMDB({ category: 'discover', mediaType: 'movie', genreId: 28 }),
    fetchTMDB({ category: 'discover', mediaType: 'movie', genreId: 18  }),
  ]); // prettier-ignore

  return (
    <>
      <EpicStage content={popularMovies.results[0]} mediaType='movie' />

      <SliderProvider content={trendingMovies.results} mediaType='movie'>
        <DomContextProvider>
          <Slider headerTitle='Trending: Movies' />
        </DomContextProvider>
      </SliderProvider>

      <SliderProvider content={trendingTvShows.results} mediaType='tv'>
        <DomContextProvider>
          <Slider headerTitle='Trending: TV Shows' />
        </DomContextProvider>
      </SliderProvider>

      <SliderProvider content={actionMovies.results} mediaType='movie'>
        <DomContextProvider>
          <Slider headerTitle='Action Movies' />
        </DomContextProvider>
      </SliderProvider>

      <SliderProvider content={dramaMovies.results} mediaType='movie'>
        <DomContextProvider>
          <Slider headerTitle='Drama Movies' />
        </DomContextProvider>
      </SliderProvider>

      {children}
    </>
  );
}
